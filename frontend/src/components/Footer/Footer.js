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
                We are just a group trying to bring together everyone who wants to help fight Covid 19. We created this website to help those who might need any information or help regarding particular resources or any help in general. The database is accessible to everyone through this website and anyone can contribute and help by providing any information they might want to share.
            </div>
                <div className={`${ styles.quicklinks }`}>
                    <div className={`${ styles.quickheading }`}><h3>Quick Links</h3></div>
                    <ul>
                        <li><Link to="/help">Database</Link></li>
                        <li><Link to="/forum">Forum</Link></li>
                        <li><Link to="/team">Our Team</Link></li>
                        <li><Link to="/donors">Donors List</Link></li>
                    </ul>
                </div>
            </div>
            <div className={`${ styles.copyright }`}>
                UnitedAgainstCovid19 &copy; copyright 2021
            </div>
        </footer>
    );
}

export default Footer;