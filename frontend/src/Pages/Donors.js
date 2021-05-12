import React from 'react'
import Footer from '../components/Footer/Footer'
import Drawer from '../components/Drawer/Drawer';
import styles from './styles/donors.module.css';
import { donorslist } from '../data/donorslist'

const Doners = () =>
{
  return (
    <div className={`${ styles.donate }`}>
      <Drawer />
      <div className={`${ styles.heading }`}>
        Contributors
        </div>
      <div className={`${ styles.orgcardsec }`}>
        {donorslist.map((item) =>
        {
          return (
            <div className={`${ styles.orgcard }`} key={item.name}>
              <div className={`${ styles.orgicon }`}>
              </div>
              <div className={`${ styles.orgheading }`}>
                <div className={`${ styles.orgname }`}>
                  {item.name}
                </div>
                <div className={`${ styles.orgdesignationtag }`}>
                  <h4>{item.job}</h4>
                </div>
              </div>
              <div className={`${ styles.orgcontact }`}>
                <p>
                  {item.tag}
                </p>
                {item.email ? <p>Email: {item.email}</p> : null}
                {item.links ? <p>Links: {item.links}</p> : null}
              </div>
            </div>
          )
        })}
      </div>
      <Footer />
    </div>
  )
}

export default Doners
