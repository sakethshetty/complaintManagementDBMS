import React, {useEffect, useState} from 'react'
import '../styles/HomeBodyStyle.css'
import DeptCard from './DeptCard'
import axios from 'axios'

function HomeBody() {

    const [depList, setDepList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/dep")
        .then(res => {
            console.log(res.data)
            setDepList(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    return (
        <div className="ag-format-container">
            <div className="ag-courses_box">
                {
                    depList.map((value, index) => <DeptCard key={index} depName={value}/>)
                }
            </div>
        </div>
    )
}

export default HomeBody