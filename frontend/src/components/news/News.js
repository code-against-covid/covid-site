import React from 'react';
import '../../App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './styles/News.module.css';

const News = () =>
{
  const [announcement, setAnnouncement] = useState([])


  // For fetching announcements and organizations details from backend.
  useEffect(() =>
  {
    function fetchData()
    {
      axios.get("http://127.0.0.1:8000/announcement/").then((response) =>
      {
        setAnnouncement(response.data)
      }).catch((error) =>
      {
        console.log(error)
      })
    }
    fetchData();
  }
    , []) // [] renders only once
  return (
    <div className={`${ styles.frontpagecont }`}>
      <div className={`${ styles.leftbox }`}>
        <div className={`${ styles.heading }`}>
          News and updates
            </div>
        <ul className={`${ styles.announcementcontent }`}>
          {announcement.map((item) =>
          {
            return (
              <li className={`${ styles.announcementlines }`} key={item.id}>{item.name}</li>
            );
          })}
        </ul>
      </div>
    </div>
  )
}

export default News
