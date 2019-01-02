import React from 'react';
import ReactTable from "react-table";
import FontAwesome from 'react-fontawesome';
import matchSorter from 'match-sorter'
import 'react-table/react-table.css'

class FTable extends React.Component{

    render()
    {
        const columns = [{
            Header: 'Passanger',
            accessor: "passengerTraffic",
            width: 100,
            Cell: row => (
                <FontAwesome
                    name='user'
                    style={{
                        color: row.value === false ? "#595959"
                            : row.value === true ? "#33cc33"
                            : "#000000",
                        marginLeft: 30
                    }}
                    size="2x"
                />
                
            ),

            filterMethod: (filter, row) => {
                if (filter.value === "all") {
                    
                    return true;
                }
                if (filter.value === "true") {
                    return row[filter.id] === true;
                }
                return row[filter.id] === false;
            },

            Filter: ({ filter, onChange }) =>
            <select
                onChange={event => onChange(event.target.value)}
                style={{ width: "100%" }}
                value={filter ? filter.value : "all"}
            >
                <option value="all">All</option>
                <option value="true">True</option>
                <option value="false">False</option>
            </select>
            

        },    {
            Header: 'Type',
            accessor: d => d.type,
            id: "type",
            width: 270,
            filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["type"] }),
            filterAll: true
        }, {
            Header: 'Station name',
            accessor: 'stationName',
            filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["stationName"] }),
            filterAll: true
        }, {
            Header: 'Short',
            accessor: 'stationShortCode',
            width: 80,
            filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["stationShortCode"] }),
            filterAll: true
        }, {
            Header: 'UICCode',
            accessor: 'stationUICCode',
            width: 80
        }, {
            Header: 'Longitude',
            accessor: 'longitude',
            width: 120
        }
        , {
            Header: 'Latitude',
            accessor: 'latitude',
            width: 120
        }];
        return(
            <ReactTable
                data={this.props.data}
                columns={columns}
                className="-striped -highlight"
                defaultPageSize={25}
                defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]) === filter.value}
                filterable
            />
        );
        
    }
}

export default FTable;