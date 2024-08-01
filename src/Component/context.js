import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
// Create the context
const AppContext = React.createContext();

// Provider component
const AppProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [gen, setGen] = useState('');
    const [country, setCountry] = useState('')
    const [sortedData, setSortedData] = useState([]);

    // api call 

    // eslint-disable-next-line 
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Construct URL with query parameters
                const response = await axios.get('https://dummyjson.com/users', {
                    params: {limit: 208}
                });
                let data = response.data.users;

                 // Filter by gender 
                if (gen) {
                    data = data.filter(user => user.gender === gen);
                }
                // filter by country
                if(country){
                    data = data.filter(user => user.address.country === country);
                }
                setUsers(data);
                setSortedData(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [gen, country]); // Fetch data whenever gender or country changes

    // sort and filter using gender and country
    const sortData = (data, sortField, sortDirection) => {
        return data.sort((a, b) => {
            if (sortDirection === 'asc') {
                return a[sortField] > b[sortField] ? 1 : -1;
            } else {
                return a[sortField] < b[sortField] ? 1 : -1;
            }
        });
    }


    // table colums and row
    const columns = [
        { name: "ID", selector: (row) => row.id, sortable: true },
        { name: "Image", selector: (row) => <img width={40} height={40} src={row.image} alt={row.image}/>},
        { name: "Full Name", selector: (row) => `${row.firstName} ${row.maidenName} ${row.lastName}`, sortable: true },
        { name: "Demography", selector: (row) => `${row.gender.charAt(0).toUpperCase()}/${row.age}`, sortable : true },
        { name: "Designation", selector: (row) => row.company.title },
        { name: "Location", selector: (row) => `${row.address.state} ${row.address.country}` },
    ]

    return (
        <AppContext.Provider value={{ users, setUsers, columns, gen, setGen, country, setCountry, sortData, setSortedData, sortedData}}>
            {children}
        </AppContext.Provider>
    );
};

// create golobal context to share data in child component
const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
