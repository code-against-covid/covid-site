import React from 'react';
import '../../App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

const News = () => {
     const [announcement, setAnnouncement] = useState([])


  // For fetching announcements and organizations details from backend.
  useEffect(() =>
  {
    async function fetchData()
    {
      const response = await axios.get("http://127.0.0.1:8000/announcement/")
      return (setAnnouncement(response.data))
    }
    fetchData();
  }
    , []) // [] renders only once
    return (
         <div className="frontpagecont">
          <div className="leftbox">
            <div className="heading">
              News and updates
            </div>
            <ul className="announcementcontent">
              {announcement.map((item) =>
              {
                return (
                  <li className="announcementlines" key={item.id}>{item.name}</li>
                );
              })}
            </ul>
          </div>
          </div>
    )
}

export default News
