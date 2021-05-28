import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import StorageIcon from '@material-ui/icons/Storage';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import ForumIcon from '@material-ui/icons/Forum';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './styles/Drawer.module.css';
import { motion } from 'framer-motion'

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const renderIcon = (text) =>
{
    if (text === 'Home')
    {
        return (
            <NavLink exact to="/" key={text} activeStyle={{ color: "blue" }} style={{ textDecoration: "none", color: "black" }} >
                <ListItem button>

                    <ListItemIcon><HomeIcon color="primary" /></ListItemIcon>
                    <ListItemText primary={text} />

                </ListItem>
            </NavLink>
        );
    }
    else if (text === 'Database')
    {
        return (
            <NavLink exact to="/help" key={text} activeStyle={{ color: "blue" }} style={{ textDecoration: "none", color: "black" }} >
                <ListItem button >

                    <ListItemIcon><StorageIcon color="primary" /></ListItemIcon>
                    <ListItemText primary={text} />

                </ListItem>
            </NavLink>
        );
    }
    else if (text === 'Share your tips')
    {
        return (
            <NavLink exact to="/tipjar" key={text} activeStyle={{ color: "blue" }} style={{ textDecoration: "none", color: "black" }} >
                <ListItem button >

                    <ListItemIcon><LoyaltyIcon color="primary" /></ListItemIcon>
                    <ListItemText primary={text} />

                </ListItem>
            </NavLink>
        );
    }
    else if (text === 'Our Team')
    {
        return (
            <NavLink exact to="/team" key={text} activeStyle={{ color: "blue" }} style={{ textDecoration: "none", color: "black" }} >
                <ListItem button>

                    <ListItemIcon><EmojiPeopleIcon color="primary" /></ListItemIcon>
                    <ListItemText primary={text} />

                </ListItem>
            </NavLink>
        );
    }
    else if (text === 'Contributors')
    {
        return (
            <NavLink exact to="/donors" key={text} activeStyle={{ color: "blue" }} style={{ textDecoration: "none", color: "black" }} >
                <ListItem button>

                    <ListItemIcon><PeopleIcon color="primary" /></ListItemIcon>
                    <ListItemText primary={text} />

                </ListItem>
            </NavLink>
        );
    }
    return null;
}

export default function TemporaryDrawer()
{
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) =>
    {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))
        {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Home', 'Database', 'Share your tips', 'Our Team', 'Contributors'].map((text, index) => (

                    renderIcon(text)


                ))}
            </List>
            <Divider />
            <List>
                {['Forum (In Development)'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon><ForumIcon /></ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div className={`${ styles.navigation }`}>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <div className={`${ styles.menutogglediv }`}>
                        <div className={`${ styles.menubtn }`}>
                            <Button onClick={toggleDrawer(anchor, true)}><MenuIcon fontSize="large" style={{ color: "white" }} /></Button>
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className={`${ styles.mainheading }`}>
                            United Against Covid
                        </motion.div>
                    </div>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}