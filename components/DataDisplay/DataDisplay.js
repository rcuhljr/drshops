
import React from 'react';
import { Table, TableHeader, DataTable } from 'react-mdl';

class DataDisplay extends React.Component {

    render(){
        var rows= this.props.data;

        return(
            <Table
                sortable
                shadow={0}
                rows={rows}
            >
                <TableHeader
                    name="name"
                    sortFn={(a, b, isAsc) => (isAsc ? a : b).localeCompare((isAsc ? b : a))}
                >
                    Name
                </TableHeader>
                <TableHeader
                    name="cost"
                    sortFn = {
                        function (costA, costB, isAsc) {
                            var [coinsA, typeA] = costA.split(' '),
                                [coinsB, typeB] = costB.split(' '),
                                [costA, costB] = [Number(coinsA)*(typeA === 'plat' ? 10000 : 1),Number(coinsB)*(typeB === 'plat' ? 10000 : 1)];

                            if (costA < costB){
                                return (isAsc ? -1 : 1);
                            }
                            else if (costA > costB) {
                                return (isAsc ? 1 : -1);
                            }
                            return 0;
                        }
                    }
                >
                Cost
                </TableHeader>
                <TableHeader
                    name="store_name"
                    sortFn={(a, b, isAsc) => (isAsc ? a : b).localeCompare((isAsc ? b : a))}
                >
                    Store
                </TableHeader>
                <TableHeader
                    name="surface"
                    sortFn={(a, b, isAsc) => (isAsc ? a : b).localeCompare((isAsc ? b : a))}
                >
                    Surface
                </TableHeader>
                <TableHeader
                    name="store_owner"
                    sortFn={(a, b, isAsc) => (isAsc ? a : b).localeCompare((isAsc ? b : a))}
                >
                    Owner
                </TableHeader>
                <TableHeader
                    name="store_time"
                    sortFn={(a, b, isAsc) => (isAsc ? a : b).localeCompare((isAsc ? b : a))}
                >
                    Hours
                </TableHeader>
                <TableHeader
                    name="updated"
                    sortFn={(a, b, isAsc) => (isAsc ? a : b).localeCompare((isAsc ? b : a))}
                >
                    Last Updated
                </TableHeader>
                <TableHeader
                    name="extra"
                    sortFn={(a, b, isAsc) => (isAsc ? a : b).localeCompare((isAsc ? b : a))}
                >
                    Extra
                </TableHeader>
                <TableHeader
                    name="city_name"
                    sortFn={(a, b, isAsc) => (isAsc ? a : b).localeCompare((isAsc ? b : a))}
                >
                    City
                </TableHeader>
            </Table>
        );
        // 'city_name' : store['city'],
        // 'store_name' : store['name'],
        // 'store_owner' : store['owner'],
        // 'store_time' : store['open_time'] + '-' + store['close_time'],
        // 'surface' : surface,
        // 'name' : item['long'],
        // 'cost' : this.formatCost(item['cost']),
        // 'updated' : moment.utc(store['updated_at']).fromNow(),
        // 'extra' : this.formatExtra(item)


            //  <table>
            //     <thead>
            //         <tr>
            //             <th>Item</th>
            //             <th>Cost</th>
            //             <th>Store</th>
            //             <th>Surface</th>
            //             <th>Owner</th>
            //             <th>Hours</th>
            //             <th>Last Updated</th>
            //             <th>Extra</th>
            //             <th>City</th>
            //         </tr>
            //     </thead>
            //     <tbody>{rows}</tbody>
            // </table>


    }

}

export default DataDisplay;
