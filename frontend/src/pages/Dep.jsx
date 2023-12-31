import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import { Avatar, List, Space, Skeleton, Typography, Icon } from "antd";
import '../styles/ProfStyle.css'
import NavBar from '../components/NavBar';
import axios from 'axios'
import ListEle from '../components/ListEle';
import { useNavigate } from 'react-router-dom';


function Dep() {
  // If the data is loading, show a skeleton

  const [complaints, setComplaints] = useState([]);
  const [imageURL, setImageURL] = useState();
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const params = useParams();
  useEffect(() => {
    // make an axios request to the server with the params.name as the parameter
    axios.get(`http://localhost:5000/dep/${params.name}`,{
      withCredentials : true
    })
      .then(res => {
        // get the image data as a blob object
        // let imageBlob = res.blob();
        let imageBlob = '';
  
        // get the json data as a javascript object
        // let jsonData = res.json();
  
        // return both the image blob and the json data as a promise
        return Promise.all([imageBlob, res]);
      })
      .then(([imageBlob, jsonData]) => {
        // create a URL for the image blob
        // setImageURL(URL.createObjectURL(imageBlob));
        console.log(jsonData)
        setComplaints(jsonData.data.complaints);
      })
      .catch(err => {
        // handle the error
        console.error(err);
        // display an error message to the user
        navigate('/login')
        setError('Something went Wrong!');
      });
  }, [params.name]); // use the params.name as the dependency for the useEffect hook
  

  const loading = false;

  if (loading) return <Skeleton active />;

  // If there is an error, show a message
  // if (error) return <Typography.Text type="danger">{error.message}</Typography.Text>;

  // If the data is loaded, show the user profile
  return (
    <>
      <NavBar/>
      <div className="profile-page">
        <Space direction="vertical" size="large" align="center" className="profile-detail">
          {/* Show the user's avatar and name */}
          <Avatar src={"https://www.bing.com/ck/a?!&&p=4ba7a761690fb0b4JmltdHM9MTcwMDY5NzYwMCZpZ3VpZD0wYjc3ZTJiOS1jMjEyLTY0ZjAtM2I4OS1mMDI4YzNiNDY1NGUmaW5zaWQ9NTU3NQ&ptn=3&ver=2&hsh=3&fclid=0b77e2b9-c212-64f0-3b89-f028c3b4654e&u=a1L2ltYWdlcy9zZWFyY2g_cT1hdmF0YXIgaW1nJkZPUk09SVFGUkJBJmlkPUFDRjk0NEEwNDdDQzlDMTcwQjQ4MzkyQkM0NjhGMjFERjY0Mzc5MUI&ntb=1"} size={128} />
          <Typography.Title level={3}>{params.name}</Typography.Title>

          {/* Show the user's posts in a list */}
          <List
            className="complaint-list"
            header={<Typography.Title level={3}>Complaints Recieved</Typography.Title>}
            dataSource={complaints}
            renderItem={(complaint, index) => <ListEle key={index} complaint={complaint}/>}
          />
          <Link to='/complaint'>Add complaint</Link>
        </Space>
      </div>
      </>
  );
}

export default Dep