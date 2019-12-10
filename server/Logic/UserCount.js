
var moment=require('moment')
var _ = require("lodash");
var Promise = require('bluebird');

const options = {
  client: 'sqlite3',
  connection: {
    filename: "../client/public/core.sqlite"
  },
  useNullAsDefault: true
};
const knex = require('knex')(options);

class UserCountClass {
  
static getLastDaysRange() {
    const nbOfDays = 14
    
    const ranges = _.times(nbOfDays, Number)
    return ranges.map(n => {
      const date = moment(new Date()).subtract(n, 'days')
      // console.log(date.endOf('day').toDate());
      return {
        date: date.format('MMM Do'),
        start: date.startOf('day').toDate(),
        end: date.endOf('day').toDate(),
        day: date.format('l')
      }
    })
  }
static getDailyActiveUsers() {
  
    const ranges = _.reverse(this.getLastDaysRange())
   // console.log(ranges)
    return Promise.mapSeries(ranges, range => {
      return knex.from('analytics_interactions as ai')
        .select(knex.raw('count(*) as count, ai.channel'))
        .join('srv_channel_users', 'srv_channel_users.user_id', 'ai.user_id')
        .where(knex.date.isBetween('ts', range['start'], range['end']))
        .where('direction', '=', 'in')
        .groupBy(['ai.user_id', 'ai.channel'])
        .then(results => {
          return results.reduce(
            function(acc, curr) {
              const count = parseInt(curr.count)
              acc.total += count
              acc[curr.channel] = count
             //console.log(acc)
              return acc
            },
            {
              total: 0, 
              name: range['date']
            }
          )

        })
    })

  }
  // static demo(){
  //   const ranges = this.getDailyActiveUsers()
  //   return ranges;
  // }
    // static rangeDates() {
     
    // return knex.from('srv_channel_users').select(knex.raw('max(created_at) as max, min(created_at) as min'))
    //            .then()
    //            .get(0)
    //            .then(result => {
    //                         if (!result.min || !result.max) {
    //                           return undefined
    //                         }                  
    //                         const range = moment(result.max).diff(moment(result.min), 'days')
    //                         const ranges = []
    //                         for (let i = 1; i <= 10; i++) {
    //                           ranges.push(parseInt(result.min + (range / 10) * i))
    //                         }
    //                         const ret = {
    //                           min: result.min,
    //                           max: result.max,
    //                           format: undefined,
    //                           ranges: ranges
    //                         }
    //                         if (range < 360) {
    //                           ret.format = date => moment(date).format('MMM Do')
    //                         } else {
    //                           // > 1year period
    //                           ret.format = date => moment(date).format('MMM YY')
    //                         }
                        
    //                         return ret
    //                       })
    //                     .catch((err) => { console.log( err); throw err })
    //                     .finally(() => {
    //                         knex.destroy();
    //                     });
    //    }

      //  static getTotalUsers() {
      //   return rangeDates().then(dates => {
      //     if (!dates) {
      //       return
      //     }
         
      //     return knex.from('srv_channel_users')
      //       .select(knex.raw('distinct channel'))
      //       .then(channels => {
      //         const statsBase = channels.reduce(
      //           (acc, curr) => {
      //             acc[curr.channel] = 0
      //             return acc
      //           },
      //           { total: 0 }
      //         )
    
      //         return knex.from('srv_channel_users')
      //           .select(knex.raw('count(*) as count, max(created_at) as date, channel'))
      //           .groupBy(knex.raw('date(created_at), channel'))
      //           .orderBy(knex.raw('date(created_at)'))
      //           .then(rows => {
      //             let total = 0
      //             const totalChannel = {}
      //             const result = {}
      //             const min = dates.format(moment(new Date(dates.min)).subtract(1, 'day'))
                 
      //             result[min] = Object.assign({}, statsBase)
    
      //             rows.map(row => {
      //               const date = dates.format(row.date)
      //               if (!result[date]) {
      //                 result[date] = Object.assign({}, statsBase)
      //               }
      //               if (!totalChannel[row.channel]) {
      //                 totalChannel[row.channel] = 0
      //               }
      //               const count = parseInt(row.count)
      //               totalChannel[row.channel] += count
      //               result[date].total = total += count
      //               result[date][row.channel] = totalChannel[row.channel]
      //             })
    
      //             const max = dates.format(moment(new Date(dates.max)).add(1, 'hour'))
  
      //             result[max] = Object.assign({}, statsBase, { total: total }, totalChannel)
    
      //             return _.toPairs(result).map(([k, v]) => {
      //               v['name'] = k
                 
      //               return v
      //             })
      //           })
      //       })
      //   })
      //  }


    
}

module.exports = UserCountClass;