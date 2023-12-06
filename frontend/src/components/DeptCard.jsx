import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

function DeptCard(props) {

  const navigate = useNavigate();

  return (
    <Link to={`/dep/${props.depName}`} className="ag-courses_item">
      <div className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          {props.depName}
        </div>

        <div className="ag-courses-item_date-box">
          See Details
        </div>
      </div>
    </Link>
  )
}

export default DeptCard