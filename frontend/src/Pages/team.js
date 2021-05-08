import React from 'react'
import '../App.css';
import Footer from '../components/Footer/Footer'
import Drawer from '../components/Drawer/Drawer';
import styles from './styles/team.module.css';

const Team = () =>
{
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
          <div className={`${ styles.orgname }`}>
            <h3>Ayaachi Jha</h3>
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
          <div className={`${ styles.orgname }`}>
            <h3>Dhananjhay Bansal</h3>
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
      </div>
      <Footer />
      {/* </div> */}
    </div>
  )
}

export default Team
