
import React from 'react';

class DataDisplay extends React.Component {

    render(){
        var rows=[]; //[a, b, c]  [0, 1, 2]
        this.props.data.forEach(function(item, index) {
        rows.push(<tr key={index}><td>{item['name']}</td><td>{item['cost']}</td><td>{item['store_name']}</td><td>{item['surface']}</td><td>{item['store_owner']}</td><td>{item['store_time']}</td><td>{item['updated']}</td><td>{item['extra']}</td><td>{item['city_name']}</td></tr>)
        });
        return(
             <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Cost</th>
                        <th>Store</th>
                        <th>Surface</th>
                        <th>Owner</th>
                        <th>Hours</th>
                        <th>Last Updated</th>
                        <th>Extra</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }

}

export default DataDisplay;
