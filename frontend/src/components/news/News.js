import React from 'react';
import '../../App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './styles/News.module.css';

const News = () =>
{
  const [announcement, setAnnouncement] = useState([])
  const [loading, setLoading] = useState(true)


  // For fetching announcements and organizations details from backend.
  useEffect(() =>
  {
    if(loading){

      function fetchData()
      {
        axios.get(`${process.env.REACT_APP_API_URL}/announcement/`).then((response) =>
        {
          setAnnouncement(response.data)
        }).catch((error) =>
        {
          console.log(error)
        })
      }
      fetchData();
    }
    return ()=>{
      setLoading(false)
    }
  }
    , [loading]) // [] renders only once
  return (
    <div className={`${ styles.frontpagecont }`}>
      <div className={`${ styles.leftbox }`}>
        <div className={`${ styles.heading }`}>
         Helpful Initiatives By People
            </div>
  
          <div className={`${ styles.orgcardsec }`}>
          {announcement.map((item) =>
          {
            return (
               <div className={`${ styles.orgcard }`} key={item.id}>
              <div className={`${ styles.orgicon }`}>
              </div>
              <div onClick={()=>{
                window.open(item.link)
              }} className={`${ styles.orgname }`}>
                <h3>{item.name}</h3>
              </div>
              <div className={`${ styles.orgcontact }`}>
                <p>
                  {item.description}
                </p>

              </div>
            </div>
              );
            })}
            </div>
      </div>
    </div>
  )
}

export default News
