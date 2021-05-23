import React from 'react';
import '../../App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './styles/News.module.css';
import {motion} from 'framer-motion'

const News = () =>
{
  const [announcement, setAnnouncement] = useState([])
  const [loading, setLoading] = useState(true)


  // For fetching announcements and organizations details from backend.
  useEffect(() =>
  {
    if (loading)
    {

      function fetchData()
      {
        axios.get(`${ process.env.REACT_APP_API_URL }/announcement/`).then((response) =>
        {
          setAnnouncement(response.data)
        }).catch((error) =>
        {
          console.log(error)
        })
      }
      fetchData();
    }
    return () =>
    {
      setLoading(false)
    }
  }
    , [loading]) // [] renders only once

    const fadeRight = {
    hidden: {opacity:0,x:100},
    visible:{opacity:1,x:0}
  }

  return (
    <motion.div
     variants={fadeRight}
    initial = 'hidden'
    animate = 'visible'
    transition = {{duration:1}}
    className={`${ styles.frontpagecont }`}>
      <div className={`${ styles.leftbox }`}>
        <div className={`${ styles.heading }`}>
          Other Helpful Initiatives
        </div>

        <div className={`${ styles.announcementsection }`}>
          {announcement.map((item) =>
          {
            return (

              <div key={item.id} className={`${ styles.card }`} >
                <p className={`${ styles.cardname }`}>
                  {item.name}
                </p>
                <p className={`${ styles.carddets }`}>
                  {item.description}
                </p>

                <div style={{ textAlign: 'center' }}>
                  <button className={`${ styles.explorebtn }`} onClick={() =>
                  {
                    window.open(item.link)
                  }}>
                    Explore
      </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default News
