"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const verror_1 = require("verror");
exports.patchKnex = (knex) => {
    const isLite = knex.client.config.client === 'sqlite3';
    const location = isLite ? knex.client.connectionSettings.filename : undefined;
    const dateParse = (exp) => {
        return isLite ? knex.raw(`strftime('%Y-%m-%dT%H:%M:%fZ', ${exp})`) : knex.raw(exp);
    };
    const dateFormat = (date) => {
        const iso = moment_1.default(date)
            .toDate()
            .toISOString();
        return dateParse(`'${iso}'`);
    };
    const columnOrDateFormat = (colOrDate) => {
        if (colOrDate.sql) {
            return colOrDate.sql;
        }
        return dateFormat(colOrDate);
    };
    const createTableIfNotExists = (tableName, cb) => __awaiter(this, void 0, void 0, function* () {
        return knex.schema.hasTable(tableName).then(exists => {
            if (exists) {
                return false;
            }
            return knex.schema.createTable(tableName, cb).then(() => true);
        });
    });
    // only works for single insert beause of SQLite
    const insertAndRetrieve = (tableName, data, returnColumns = 'id', idColumnName = 'id') => __awaiter(this, void 0, void 0, function* () {
        const handleResult = res => {
            if (!res || res.length !== 1) {
                throw new verror_1.VError('Error doing insertAndRetrieve');
            }
            return res[0];
        };
        // postgres supports 'returning' natively
        if (!isLite) {
            return knex(tableName)
                .insert(data)
                .returning(returnColumns)
                .then(handleResult);
        }
        return knex.transaction(trx => knex(tableName)
            .insert(data)
            .transacting(trx)
            .then(() => knex
            .select(knex.raw('last_insert_rowid() as id'))
            .transacting(trx)
            .then(([{ id: dbId }]) => {
            const id = (data && data.id) || dbId;
            if (returnColumns === idColumnName) {
                return id;
            }
            return knex(tableName)
                .select('*')
                .where(idColumnName, id)
                .limit(1)
                .transacting(trx)
                .then(handleResult);
        }))
            .then(trx.commit)
            .catch(trx.rollback));
    });
    const binary = {
        set: (data) => {
            if (isLite || typeof data !== 'string') {
                return data;
            }
            return new Buffer(data, 'utf8');
        }
    };
    const date = {
        format: dateFormat,
        now: () => (isLite ? knex.raw(`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`) : knex.raw('now()')),
        isBefore: (d1, d2) => {
            const exp1 = columnOrDateFormat(d1);
            const exp2 = columnOrDateFormat(d2);
            return knex.raw(exp1 + ' < ' + exp2);
        },
        isAfter: (d1, d2) => {
            const exp1 = columnOrDateFormat(d1);
            const exp2 = columnOrDateFormat(d2);
            return knex.raw(exp1 + ' > ' + exp2);
        },
        isBetween: (date, betweenA, betweenB) => {
            const exp1 = columnOrDateFormat(date);
            const exp2 = columnOrDateFormat(betweenA);
            const exp3 = columnOrDateFormat(betweenB);
            return knex.raw(`${exp1} BETWEEN ${exp2} AND ${exp3}`);
        },
        isSameDay: (d1, d2) => {
            const exp1 = columnOrDateFormat(d1);
            const exp2 = columnOrDateFormat(d2);
            return knex.raw(`date(${exp1}) = date(${exp2})`);
        },
        hourOfDay: (date) => {
            const exp1 = columnOrDateFormat(date);
            return isLite ? knex.raw(`strftime('%H', ${exp1})`) : knex.raw(`to_char(${exp1}, 'HH24')`);
        }
    };
    const bool = {
        true: () => (isLite ? 1 : true),
        false: () => (isLite ? 0 : false),
        parse: value => (isLite ? !!value : value)
    };
    const json = {
        set: obj => (isLite ? obj && JSON.stringify(obj) : obj),
        get: obj => (isLite ? obj && JSON.parse(obj) : obj)
    };
    const extensions = {
        isLite,
        location,
        binary,
        date,
        json,
        bool,
        createTableIfNotExists,
        insertAndRetrieve
    };
    return Object.assign(knex, extensions);
};
//# sourceMappingURL=helper.js.map