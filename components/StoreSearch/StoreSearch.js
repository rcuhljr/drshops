
import React from 'react';
import SearchBox from '../SearchBox';
import DataDisplay from '../DataDisplay';
import _ from 'underscore';
import s from './StoreSearch.css';

var StoreSearch = React.createClass({

  formatExtra: function(item){
    var elems = [];
    if(item['look'])
        elems.push('Look: '+item['look'])
    if(item['read'])
        elems.push('Read: '+item['read'])
    if(item['worn'])
        elems.push('Worn: '+item['worn'])
    return elems.join(', ')
  },

  doSearch: function(queryText){
        queryText = queryText.toLowerCase();
        //get query result
        var queryResult=[];

        _.each(this.props.data, function(store, key, set){
            if(store['surfaces']){
              _.each(store['surfaces'], function(item_set, surface ){
                _.each(item_set, function(item){
                  if(item['long'].toLowerCase().indexOf(queryText)!=-1){
                    queryResult.push({
                      'store_name' : store['name'],
                      'store_owner' : store['owner'],
                      'store_time' : store['open_time'] + '-' + store['close_time'],
                      'name' : item['long'],
                      'cost' : item['cost'],
                      'updated' : store['updated_at'],
                      'extra' : this.formatExtra(item)
                    });
                  }
                }, this)
              }, this)
            }
        }, this);

        this.setState({
            query:queryText,
            filteredData: queryResult
        })
    },

    getInitialState:function(){
        return{
            query:'',
            filteredData: []
        }
    },

  render:function () {
    return (
      <div className="storeSearch">
        <h2>Store search</h2>
        <SearchBox query={this.state.query} doSearch={this.doSearch}/>
        <DataDisplay data={this.state.filteredData}/>
      </div>
        );
  }

});

export default StoreSearch;
