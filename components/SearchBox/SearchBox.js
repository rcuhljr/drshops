
import React from 'react';

var SearchBox = React.createClass({

    doSearch:function() {
        var query=this.refs.searchInput.value; // this is the search text
        this.props.doSearch(query);
    },

    render:function (){
        var optionals = {
        };
        if(!this.props.searchMode){
            optionals.disabled = true;
        }
        return <input type="text" ref="searchInput" placeholder="Item name" onChange={this.doSearch} {...optionals}/>
    }

});

export default SearchBox;
