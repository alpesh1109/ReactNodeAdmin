
import {patchKnex} from './helper';
var moment=require('moment');
var Promise = require('bluebird');
var _ = require("lodash");
const knex = require('knex')

const options = {
  client: 'sqlite3',
  connection: {
    filename: "../client/public/core.sqlite"
  },

  useNullAsDefault: true
};
//const knex = require('knex')(options);
 var knx = patchKnex(knex(options));

export default class Graph {
  constructor(private knex) {}

demo(){
  const inner = knex.from('analytics_interactions')
  .where(knx.date.isBetween('ts',range['start'], range['end']))
  .andWhere('direction', '=', 'in')
  .groupBy('user_id')
  .select(knex.raw('count(*) as c'))
  .toString()
}
}