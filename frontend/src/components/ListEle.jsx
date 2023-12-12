import React, { useEffect, useState } from 'react'
import axios from 'axios';

function ListEle(props) {

  const liStyle = {
    // convert the CSS properties and values into JavaScript syntax
    marginBottom: '10px',
    border: '2px solid #ccc',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
  };

  const titleStyle = {
    fontWeight: 'bold',
    color: '#333',
    fontSize : '24px'
  };

  const statusStyle = {
    fontSize: '2rem',
    color: '#000',
    marginLeft: 'auto',
    minHeight : '40px'
  };

  // create a style object for each complaint status value
  const pendingStyle = {
    backgroundColor: '#ff0',
    color: '#000',
  };

  const resolvedStyle = {
    backgroundColor: '#0f0',
    color: '#fff',
  };

  const rejectedStyle = {
    backgroundColor: '#f00',
    color: '#fff',
  };

  const [state, setState] = useState(props.complaint.state)


  function handleState() {

    let val = window.confirm("Changes will be approved! You may not be able to change later");

    if(!val)  return;
    axios.post('http://localhost:5000/toggle', {
      id : props.complaint.id
    },{
      withCredentials : true
    },)
    .then(res => setState(''))
    .catch(err => console.log(err))
  }


  console.log(props.complaint)
  return (
    <li style={liStyle}>
      <div>
        <div style={titleStyle}>{props.complaint.title}</div>
        <p>{props.complaint.cdesc}</p>
      </div>
      <select style={{...statusStyle}} value={state} onChange={handleState}>
        <option value="Pending">{state}</option>
        {props.role == "user" ? <option value="Resolved">Resolved</option> : <option value="Review">Review</option>}
      </select>
      {/* <button style={{ ...statusStyle, ...stateStyle }} onClick={handleState}>{props.complaint.state}</button> */}
    </li>
  )
}

export default ListEle