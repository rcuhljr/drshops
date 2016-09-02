
import React from 'react';
import SearchBox from '../SearchBox';
import DataDisplay from '../DataDisplay';
import DisplayAllButton from '../DisplayAllButton';
import _ from 'underscore';
import s from './StoreSearch.css';
import moment from 'moment';

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

  formatCost: function(cost){
    if(isNaN(cost))
        return cost;
    var newval = cost/10000;
    if(newval >= 1)
        return Math.round(newval)+' plat';
    return cost + ' copper';
  },

  formatData: function(store, surface, item){
    if (store['open_time']==undefined || store['close_time']==undefined){
        return {
        'city_name' : store['city'],
        'store_name' : store['name'],
        'store_owner' : store['owner'],
        'store_time' : 'By Appointment',
        'surface' : surface,
        'name' : item['long'],
        'cost' : this.formatCost(item['cost']),
        'updated' : moment.utc(store['updated_at']).fromNow(),
        'extra' : this.formatExtra(item)
        }
    } else
    return {
        'city_name' : store['city'],
        'store_name' : store['name'],
        'store_owner' : store['owner'],
        'store_time' : store['open_time'] + '-' + store['close_time'],
        'surface' : surface,
        'name' : item['long'],
        'cost' : this.formatCost(item['cost']),
        'updated' : moment.utc(store['updated_at']).fromNow(),
        'extra' : this.formatExtra(item)
       };
  },

  itemMatchesQuery: function(item, queryText){
    return item['long'].toLowerCase().indexOf(queryText) > -1;
  },

  doSearch: function(queryText){
        queryText = queryText.toLowerCase();
        //get query result
        var queryResult=[];

        if (queryText.length > 2){ //If query string is deleted, do not display entire database
            _.each(this.props.data, function(store, key, set){ //Look at all stores
                if(store['surfaces']){ //If the store has item surfaces
                    _.each(store['surfaces'], function(item_set, surface ){ //Look at each surface
                        _.each(item_set, function(item){ // Look at each item on the surface
                            if(this.itemMatchesQuery(item, queryText)){
                                queryResult.push(this.formatData(store, surface, item));
                            }
                        }, this)
                    }, this)
                }
            }, this);
         };

        this.setState({
            filteredData: queryResult
        })
    },

    getAll: function(){
        var queryResult=[];
        _.each(this.props.data, function(store, key, set){ //Look at all stores
            if(store['surfaces']){ //If the store has item surfaces
                _.each(store['surfaces'], function(item_set, surface ){ //Look at each surface
                    _.each(item_set, function(item){ // Look at each item on the surface
                        queryResult.push(this.formatData(store, surface, item));
                    }, this)
                }, this)
            }
        }, this);

        return queryResult;
    },
        //#TODO Test escape

    toggleSearchMode:function(){
        if (this.state.searchMode){
            this.setState({
                filteredData: this.getAll(),
                searchMode: !this.state.searchMode,
                oldData: this.state.filteredData
            });
        } else {
            this.setState({
                filteredData: this.state.oldData,
                searchMode: !this.state.searchMode
            });
        }

    },

    getInitialState:function(){
        return{
            filteredData: [],
            searchMode:true
        }
    },

  render:function () {
    return (
      <div className="storeSearch">
        <h2>Store search</h2>
        <div>Begin typing to view matching items, or toggle to display all items (Warning: Slow). Click a column header to sort by that column.</div>
        <SearchBox doSearch={_.debounce(this.doSearch,250)} searchMode={this.state.searchMode}/>
        <DisplayAllButton toggleSearchMode={this.toggleSearchMode} searchMode={this.state.searchMode}/>
        <DataDisplay data={this.state.filteredData} />
      </div>
        );
  }

});

export default StoreSearch;
