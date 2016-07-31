import React from 'react';

var DisplayAllButton = React.createClass({

    render:function (){
        var optionals = {
        };
        if(this.props.searchMode){
            optionals.value ='Display All Items';

        } else {
            optionals.value='Return to Searching';

        }

        return <input type="button" className="display-all" onClick={this.props.toggleSearchMode} {...optionals}/>
    }

});

export default DisplayAllButton;
