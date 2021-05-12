import React from 'react'
import '../App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Footer from '../components/Footer/Footer'
import Drawer from '../components/Drawer/Drawer';
import styles from './styles/team.module.css';

const Team = () =>
{

  const [team, setTeam] = useState([])

  useEffect(() =>
  {
    function fetchData()
    {
      axios.get(`${process.env.REACT_APP_API_URL}/team/`).then((response) =>
      {
        setTeam(response.data)
      }).catch((error) =>
      {
        console.log(error)
      })
    }
    fetchData();
  }
    , [])
  return (
    <div className={`${ styles.team }`}>
      <Drawer />
      <div className={`${ styles.heading }`}>
        Team Behind The Initiative
        </div>
      <div className={`${ styles.orgcardsec }`}>

        <div className={`${ styles.orgcard }`}>
          <div className={`${ styles.orgicon }`}>
          </div>
          <div className={`${ styles.orgheading }`}>
            <div className={`${ styles.orgname }`}>
              <h3>Ayaachi Jha</h3>
            </div>
            <div className={`${ styles.orgdesignationtag }`}>
              <h4>Co-Founder</h4>
            </div>
          </div>
          <div className={`${ styles.orgcontact }`}>
            <p>
              Netaji Subhas University of Technology
            </p>
            <p>
              B.E. Mechanical Engineering, 4th Year
            </p>
          </div>
        </div>

        <div className={`${ styles.orgcard }`}>
          <div className={`${ styles.orgicon }`}>
          </div>
          <div className={`${ styles.orgheading }`}>
            <div className={`${ styles.orgname }`}>
              <h3>Dhananjhay Bansal</h3>
            </div>
            <div className={`${ styles.orgdesignationtag }`}>
              <h4>Co-Founder</h4>
            </div>
          </div>
          <div className={`${ styles.orgcontact }`}>
            <p>
              University Of Alberta
                    </p>
            <p>
              BSc Honors Astrophysics, 3rd Year
                    </p>
          </div>
        </div>
        
{team.map((item) =>
        {
          return (
            <div className={`${ styles.orgcard }`} key={item.id}>
              <div className={`${ styles.orgicon }`}>
              </div>
              <div className={`${ styles.orgheading }`}>
                <div className={`${ styles.orgname }`}>
              <h3>{item.name}</h3>
            </div>
              <div className={`${ styles.orgdesignationtag }`}>
              <h4>{item.job}</h4>
            </div>
            </div>
                 <div className={`${ styles.orgcontact }`}>
            <p>
              {item.university}
                    </p>
            <p>
              {item.qualification}
                    </p>
          </div>
        </div>
          )
        })}
      </div>
      <Footer />

    </div>
  )
}

export default Team
