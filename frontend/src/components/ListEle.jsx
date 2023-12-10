import React,{useEffect, useState} from 'react'
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
      };
      
      const statusStyle = {
        fontSize: '0.8rem',
        color: '#999',
        marginLeft: 'auto',
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

      const [stateStyle, setStateStyle] = useState(pendingStyle)

    function handleState(){

      stateStyle == pendingStyle ? setStateStyle(resolvedStyle) : setStateStyle(pendingStyle);
    }

    return (
        <li style={liStyle}>
            <div style={titleStyle}>{props.complaint}</div>
            <div style={{ ...statusStyle, ...stateStyle }} onClick={handleState}>Pending</div>
        </li>
    )
}

export default ListEle