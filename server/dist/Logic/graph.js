"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./helper");
var moment = require('moment');
var Promise = require('bluebird');
var _ = require("lodash");
const knex = require('knex');
const options = {
    client: 'sqlite3',
    connection: {
        filename: "../client/public/core.sqlite"
    },
    useNullAsDefault: true
};
//const knex = require('knex')(options);
var obj = helper_1.patchKnex(knex(options));
class Graph {
    constructor(knex) {
        this.knex = knex;
    }
    demo() {
        return obj.date;
    }
}
exports.default = Graph;
//# sourceMappingURL=graph.js.map