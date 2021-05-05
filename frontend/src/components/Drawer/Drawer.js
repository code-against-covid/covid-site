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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StorageIcon from '@material-ui/icons/Storage';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import ForumIcon from '@material-ui/icons/Forum';
import MenuIcon from '@material-ui/icons/Menu';

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
            <NavLink exact to="/" activeStyle={{ color: "blue" }} style={{ textDecoration: "none", color: "black" }} >
                <ListItem button key={text}>

                    <ListItemIcon><HomeIcon color="primary" /></ListItemIcon>
                    <ListItemText primary={text} />

                </ListItem>
            </NavLink>
        );
    }
    else if (text === 'Database')
    {
        return (
            <NavLink exact to="/help" activeStyle={{ color: "blue" }} style={{ textDecoration: "none", color: "black" }} >
                <ListItem button key={text}>

                    <ListItemIcon><StorageIcon color="primary" /></ListItemIcon>
                    <ListItemText primary={text} />

                </ListItem>
            </NavLink>
        );
    }
    else if (text === 'Our Team')
    {
        return (
            <NavLink exact to="/team" activeStyle={{ color: "blue" }} style={{ textDecoration: "none", color: "black" }} >
                <ListItem button key={text}>

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
                {['Home', 'Database', 'Our Team'].map((text, index) => (

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
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}><MenuIcon fontSize="large" color="primary" /></Button>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}