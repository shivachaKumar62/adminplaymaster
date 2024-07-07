import { useMemo } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import Card from '../../customcomponent/Card'
 const data = [
   {
     name: {
       firstName: 'John',
       lastName: 'Doe',
     },
     address: '261 Erdman Ford',
     city: 'East Daphne',
     state: 'Kentucky',
   },
   {
     name: {
       firstName: 'Jane',
       lastName: 'Doe',
     },
     address: '769 Dominic Grove',
     city: 'Columbus',
     state: 'Ohio',
   },
   {
     name: {
       firstName: 'Joe',
       lastName: 'Doe',
     },
     address: '566 Brakus Inlet',
     city: 'South Linda',
     state: 'West Virginia',
   },
   {
     name: {
       firstName: 'Kevin',
       lastName: 'Vandy',
     },
     address: '722 Emie Stream',
     city: 'Lincoln',
     state: 'Nebraska',
   },
   {
     name: {
       firstName: 'Joshua',
       lastName: 'Rolluffs',
     },
     address: '32188 Larkin Turnpike',
     city: 'Charleston',
     state: 'South Carolina',
   },
 ]
const Dashboard = () => {
 
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 150,
      },
      {
        accessorKey: 'state',
        header: 'State',
        size: 150,
      },
    ],
    [],
  )
    const table = useMaterialReactTable({
      columns,
      data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    })

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <Card textColor="blue-500" text="TOTAL CONTEST" count="36" />
        <Card textColor="green-500" text="TOTAL JOIN MEMBERS" count="142" />
      </div>
      <div className="grid grid-cols-3 gap-4 my-4">
        <Card textColor="yellow-500" text="TOTAL FIXTURE MATCH" count="74" />
        <Card textColor="green-500" text="TOTAL LIVE MATCH " count="14" />
        <Card textColor="red-500" text="TOTAL RESULT MATCH" count="102" />
      </div>
      <MaterialReactTable table={table} />
    </div>
  )
}

export default Dashboard
