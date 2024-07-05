import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import ThirdComponent from './ThirdComponent';
import './SecondComp.css';

// Define the Post interface for data type consistency
interface Post {
  id: number;
  title: string;
  body: string;
}

const SecondComp: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user data is available in localStorage
    const user = localStorage.getItem('user');
    if (!user) {
      // If no user data, navigate to the home page
      navigate('/');
    } else {
      // Fetch posts data from the API
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => setData(data));
    }
  }, [navigate]);

  // Define the columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'body', headerName: 'Body', width: 400 },
  ];

  return (
    <section>
      <center>
        <div
          className='MainDiv'
          style={{
            height: 600,
            width: '800px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginTop: 100,
            gap: 50
          }}
        >
          {/* Render the DataGrid component with fetched data */}
          <DataGrid
            rows={data}
            columns={columns}
            style={{ width: '60rem', fontSize: '20px' }}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25 },
              },
            }}
            pageSizeOptions={[25]}
          />
        </div>
        <section className='deptSect' style={{ width: '60rem', fontSize: '20px' }}>
          <h1>Departments</h1>
          {/* Render the ThirdComponent */}
          <ThirdComponent />
        </section>
      </center>
    </section>
  );
};

export default SecondComp;
