import React, {useEffect} from 'react'
import DataTable from 'react-data-table-component';
import { useGlobalContext } from './context';
const UserTable = () => {

    // useGlobalContext to get parameter from context.js
    const { users, columns, gen, setGen, country, setCountry, sortData, setSortedData } = useGlobalContext()

  

    // Re-sort data when users change

    useEffect(() => {
        const sorted = sortData(users);
        // eslint-disable-next-line 
        setSortedData(sorted);
    }, [users]); // Re-sort data when users change

    // use the react data table component package
    return <DataTable title="Employees"
        columns={columns}
        data={users}
        pagination 
        fixedHeader
        fixedHeaderScrollHeight='530px'
        highlightOnHover
        subHeader
        subHeaderComponent={
            <div className='d-flex gap-5'>
                <select className="form-select"
                    aria-label="Default select example"
                    width={200} value={gen} onChange={(e)=>setGen(e.target.value)}>
                    <option disabled>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <select
                    className="form-select"
                    aria-label="Country select"
                    width={200}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                    <option value="">Country</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                </select>
            </div>
        } />



}

export default UserTable
