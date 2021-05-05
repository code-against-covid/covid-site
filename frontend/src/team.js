import React from 'react'
import './App.css';
import Footer from './components/Footer/Footer'

const Team = () => {
    return (
        <>
    <div className='team'>
          <div className='heading'>
          Team Behind The Initiative
        </div> 
             <div className="orgcardsec">
                <div className="orgcard">
                  <div className="orgicon">
                  </div>
                  <div className="orgname">
                    <h3>Ayaachi Jha</h3>
                  </div>
                  <div className="orgcontact">
                    <p>
                      NSIT
                    </p>
                    <p>
                      Mechanical Engineering, 4th Year
                    </p>
                  </div>
                </div>    
                <div className="orgcard">
                  <div className="orgicon">
                  </div>
                  <div className="orgname">
                    <h3>Dhananjhay Bansal</h3>
                  </div>
                  <div className="orgcontact">
                    <p>
                      University Of Alberta
                    </p>
                    <p>
                      BSc Honors Astrophysics, 3rd Year
                    </p>
                  </div>
                </div>
          </div>
          <Footer/>
        {/* </div> */}
    </div>
       </>
    )
}

export default Team
