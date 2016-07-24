
import React from 'react';

var SearchBox = React.createClass({

    doSearch:function() {
        var query=this.refs.searchInput.value; // this is the search text
        this.props.doSearch(query);
    },

    render:function (){
        return <input type="text" ref="searchInput" placeholder="Search Name" value={this.props.query} onChange={this.doSearch}/>
    }

});

export default SearchBox;
