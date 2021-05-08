import React from 'react';
import { Link } from 'react-router-dom'
import styles from './styles/Footer.module.css';

const Footer = () =>
{
    return (
        <footer className={`${ styles.sitefooter }`}>
            <div className={`${ styles.footercontentsec }`}>
                <div className={`${ styles.about }`}>
                    <div className={`${ styles.aboutheading }`}><h3>About Us</h3></div>
                Just another group trying to help fight covid-19 and help bring people together
                in these difficult days for help and support. We need to break away form our differences and
                survive through these difficult times and this website is a just a way of assisting those who need
                to be assisted and giving a platform to those who want to assist.
            </div>
                <div className={`${ styles.quicklinks }`}>
                    <div className={`${ styles.quickheading }`}><h3>Quick Links</h3></div>
                    <ul>
                        <li><Link to="/help">Database</Link></li>
                        <li><Link to="/forum">Forum</Link></li>
                        <li><Link to="/team">Our Team</Link></li>
                    </ul>
                </div>
            </div>
            <div className={`${ styles.copyright }`}>
                &copy; copyright 2021
            </div>
            <a href='https://coolbackgrounds.io/white-background/'>background from coolbackgrounds.io</a>
        </footer >
    );
}

export default Footer;