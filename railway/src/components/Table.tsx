import React from 'react'
import { Location } from '../types'
import ReactTable from 'react-table'
import FontAwesome from 'react-fontawesome'
import matchSorter from 'match-sorter'

import 'react-table/react-table.css'

interface Props {
  locations: Location[]
}

const Table = ({
  locations
}: Props) => {

  const columns = [{
    Header: 'Passanger',
    accessor: 'passengerTraffic',
    width: 100,
    Cell: (row: { value: boolean }) => (
      <FontAwesome
        name='user'
        style={{
          color: row.value === false ? '#595959'
            : row.value === true ? '#33cc33'
              : '#000000',
          marginLeft: 30
        }}
        size='2x'
      />
    ),
  
    filterMethod: (filter: { value: string; id: string | number }, row: { [x: string]: boolean }) => {
      if (filter.value === 'all') {
  
        return true;
      }
      if (filter.value === 'true') {
        return row[filter.id] === true;
      }
      return row[filter.id] === false;
    },
  
    Filter: ({ filter, onChange }: any) =>
      <select
        onChange={event => onChange(event.target.value)}
        style={{ width: '100%' }}
        value={filter ? filter.value : 'all'}
      >
        <option value='all'>All</option>
        <option value='true'>True</option>
        <option value='false'>False</option>
      </select>
  
  
  }, {
    Header: 'Type',
    accessor: (d: { type: any }) => d.type,
    id: 'type',
    width: 270,
    filterMethod: (filter: { value: any }, rows: any) =>
      matchSorter(rows, filter.value, { keys: ['type'] }),
    filterAll: true
  }, {
    Header: 'Station name',
    accessor: 'stationName',
    filterMethod: (filter: { value: any }, rows: any) =>
      matchSorter(rows, filter.value, { keys: ['stationName'] }),
    filterAll: true
  }, {
    Header: 'Short',
    accessor: 'stationShortCode',
    width: 80,
    filterMethod: (filter: { value: any }, rows: any) =>
      matchSorter(rows, filter.value, { keys: ['stationShortCode'] }),
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
  }]

  return (
    <ReactTable
      data={locations}
      columns={columns}
      className='-striped -highlight'
      defaultPageSize={25}
      defaultFilterMethod={(filter, row) =>
        String(row[filter.id]) === filter.value}
      filterable
    />
  )
}

export default Table