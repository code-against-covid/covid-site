import React from 'react';
import '../../App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './styles/Organization.module.css';
import {motion} from 'framer-motion'

const Organization = () =>
{

  const [organization, setOrganization] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() =>
  {
    if(loading){

      function fetchData()
      {
        axios.get(`${process.env.REACT_APP_API_URL}/organization/`).then((response) =>
        {
          setOrganization(response.data)
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

     const fadeLeft = {
    hidden: {opacity:0,x:-100},
    visible:{opacity:1,x:0}
     }

  return (
    <motion.div
     variants={fadeLeft}
    initial = 'hidden'
    animate = 'visible'
    transition = {{duration:1}}
    className={`${ styles.donation }`}>
      <div className={`${ styles.heading }`}>
        Helpful Organizations
          </div>
      <div className={`${ styles.orgcardsec }`}>
        {organization.map((item) =>
        {
          return (
            <div className={`${ styles.orgcard }`} key={item.id}>
              <div className={`${ styles.orgicon }`}>
              </div>
              <div className={`${ styles.orgname }`}>
                <h3>{item.name}</h3>
              </div>
              <div className={`${ styles.orgcontact }`}>
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
    </motion.div>
  )
}

export default Organization
