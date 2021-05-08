import React from 'react';
import '../../App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

const Organization = () => {

    const [organization, setOrganization] = useState([])

    useEffect(() =>
  {
    function fetchData()
    {
       axios.get("http://127.0.0.1:8000/organization/").then((response)=>{
         setOrganization(response.data)
       }).catch((error)=>{
         console.log(error)
       })
    }
    fetchData();
  }
    , []) // [] renders only once

    return (
            <div className="donation">
          <div className="heading">
            Helpful Organizations
          </div>
          <div className="orgcardsec">
            {organization.map((item) =>
            {
              return (
                <div className="orgcard" key={item.id}>
                  <div className="orgicon">
                  </div>
                  <div className="orgname">
                    <h3>{item.name}</h3>
                  </div>
                  <div className="orgcontact">
                    <p>
                      {item.address}
                    </p>
                    <p>
                      E-Mail: {item.email}
                    </p>
                    <p>
                      Phone: {item.phone}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>   
    )
}

export default Organization
