import {observable} from 'mobx';
import {API} from './DataAccess';

const apiUrl = 'https://colossusdevtest.herokuapp.com/api/';

class TestStore {

  dataAccess;

  constructor() {
      this.dataAccess = new API(apiUrl);
  }

  validatePools (arr) {
      let res = [];
      for (let i=0; i<arr.length; i++) {
          if ((arr[i].type_code == 'HDA') || (arr[i].type_code == 'CORRECT_SCORE')) {
              res.push(arr[i]);
          }
      }
      return res;
  }

  // Fetch all Pools validated
  getPools() {
    var me = this;
    let onResponse = (( res ) => {
        let {success, data} = res;
        if (success) {
            var validPools = data.map(function(obj){
               var newObj = {};
               newObj.name = obj.display_group_name;
               newObj.pools = me.validatePools(obj.pools);
               for (let i=0; i<obj.groups.length; i++) {
                   newObj.pools = newObj.pools.concat(me.validatePools(obj.groups[i].pools));
               }
               return newObj;
            });
            return validPools;
        } else {
            return null;
        }
    });
    return this.dataAccess.get('pools.json').then(onResponse);
  }

  // Fetch one Pool
  getPool(id) {
    let onResponse = (( res ) => {
        let {success, data} = res;
        if (success) {
            return data;
        }
        return null;
    });
    return this.dataAccess.get('pools/'+id+'.json').then(onResponse);
  }

  postPool( json ) {

    let onResponse = ((response) => {
        return response;
    });

    return this.dataAccess
      .post('tickets.json', json)
      .then( onResponse )
  }

}

export default TestStore;
