import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DataFetchComponent.css'; // Import the CSS file for styling
import { useFetchDataQuery } from './apiroute.js'; // Import the query hook
const DataFetchComponent = () => {
        // const [data, setData] = useState([]);
        // const [loading, setLoading] = useState(true);
        // const [error, setError] = useState(null);
  const { data = [], isLoading: loading, error } = useFetchDataQuery(); // Use the query hook to fetch data
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/data');
  //       setData(response.data); // Store the fetched data in state
  //     } catch (err) {
  //       setError(err.message); // Handle any errors
  //     } finally {
  //       setLoading(false); // Set loading to false after the request completes
  //     }
  //   };

  //   fetchData(); // Call the fetch function
  // }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Show error message

  return (
    <div className="card-container">
      <h2>Fetched Data</h2>
      <div className="card-grid">
        {data.map((item) => (
          <div className="card" key={item.id}>
            <h3>{item.name}</h3>
            <p>Mobile: {item.mobile}</p>
            <p>City: {item.city}</p>
            <p>Pincode: {item.pincode}</p>
            <p>Address: {item.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataFetchComponent;