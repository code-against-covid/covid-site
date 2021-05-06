import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { states } from './data/states'
import { resources } from './data/resources'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Footer from './components/Footer/Footer';
import Drawer from './components/Drawer/Drawer';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';


// Styling added for the pop up after the form is submitted. Stars from here.....
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

// The styling ends here.

const App = () =>
{

  const [organization, setOrganization] = useState([])
  const [announcement, setAnnouncement] = useState([])
  const [openPop, setOpenPop] = useState(false)
  const [openForm, setOpenForm] = useState(false)
  

  // For fetching announcements and organizations details from backend.
  useEffect(() =>
  {
    async function fetchData()
    {
      const response = await axios.get("http://127.0.0.1:8000/announcement/")
      const response2 = await axios.get("http://127.0.0.1:8000/organization/")
      return (setAnnouncement(response.data), setOrganization(response2.data))
    }
    fetchData();
  }
    , []) // [] renders only once


  const publicIp = require('public-ip'); // For catching the client's ipv4. 
  const [ip, setIp] = useState();

  (async () =>
  {
    setIp(await publicIp.v4())
  })();

  const [name, setName] = useState('')
  const [state, setState] = useState('')
  const [resource, setResource] = useState('')
  const [additional, setAdditional] = useState('')


  const handleSelect1 = (e) =>
  {
    setState(e.target.value)
  }
  const handleSelect2 = (e) =>
  {
    setName(e.target.value)
  }
  const handleSelect3 = (e) =>
  {
    setResource(e.target.value)
  }
  const handleSelect4 = (e) =>
  {
    setAdditional(e.target.value)
  }
  
   // handlesubmit for the submit button in the post and display thank you message.
  const handleSubmit = () =>
  {
    axios.post("http://127.0.0.1:8000/form/", {
      name: name ? name : null,
      state: state,
      resource: resource,
      status: 1,
      ip_address: JSON.stringify(ip),
      additional_info: additional,
      created_at: date,
    })
    // Set timeout for 3 seconds. Had to use settimeout cause setopenform and setopenpop would simunltaneously close together.
    setTimeout( 
      ()=>{
        setOpenForm(false)
      },4000
      )
      setOpenPop(true);
  };
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const today = new Date();
  const date = today.getDate() + '-' + month[today.getMonth()]; //For capturing the post date.
  return (
    <>
      <div className="app">
        <Drawer /> 
        <div className="frontpagehome">
          <div className="frontpageheadingsecondary"><h1>A resource database, made by you for you.</h1></div>
          <div className="frontpagebtn">
            {/* // Starting of I want to help */}
            <div className="want">
              <Button className="helpbtn" variant="contained" color="secondary" size="large" onClick={()=>{
                setOpenForm(true)
              }}>
                I want To Help
              </Button>
            </div>
          
          {/* // Starting of I need help. */}
            <div className="need">
              <Link to='/help' style={{ textDecoration: 'none' }}>
                <Button className="helpbtn" variant="contained" color="primary" size="large" >
                  I Need Help
              </Button>
              </Link>
            </div>
          </div>
        </div>


        <div className="frontpagecont">
          <div className="leftbox">
            <div className="heading">
              News and updates
            </div>
            <ul className="announcementcontent">
              {announcement.map((item) =>
              {
                return (
                  <li className="announcementlines" key={item.id}>{item.name}</li>
                );
              })}
            </ul>
          </div>

          <Dialog open={openForm} onClose={() =>
          {
            setOpenForm(false);
          }} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Form</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please fill in the details. All information will be subject to verification by staff members.
                  </DialogContentText>
              <TextField
                autoFocus
                onChange={handleSelect2}
                margin="dense"
                id="name"
                label="Name(optional)"
                type="email"
                fullWidth
              />
              <Autocomplete

                onSelect={handleSelect1}
                options={states.map((option) => option)}
                renderInput={(params) => (
                  <TextField {...params} label="State/UT" margin="normal" variant="outlined" />
                )}
              />
              <Autocomplete
                onSelect={handleSelect3}

                options={resources.map((option) => option)}
                renderInput={(params) => (
                  <TextField {...params} label="Resource" margin="normal" variant="outlined" />
                )}
              />
              <TextField
                onChange={handleSelect4}
                autoFocus
                margin="dense"
                id="name"
                multiline
                rows={4}
                label="Information"
                placeholder="Information about the resource: Address, Phone, Availability, etc. Any information you provide will help thousands."
                type="email"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
               <Button variant="outlined" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      <Dialog onClose={()=>{
        setOpenPop(false)
      }} aria-labelledby="customized-dialog-title" open={openPop}>
        <DialogTitle id="customized-dialog-title" onClose={()=>{
          setOpenPop(false)
        }}>
          Form Submitted Successfully 
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            From behalf of team UnitedAgainstCovid, we sincerely thank you for sharing this valuable 
            information with our project. You might have just saved a life.
          </Typography>
        </DialogContent>
      </Dialog>
      
              <Button onClick={() =>
              {
                setOpenForm(false);
              }} color="primary">
                Close
                  </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div className="donation">
          <div className="heading">
            Helpful Organizations
          </div>
          <div className="orgcardsec">
            {organization.map((item) =>
            {
              return (
                <div className="orgcard" key={item.id}>
                  <div className="orgicon">
                  </div>
                  <div className="orgname">
                    <h3>{item.name}</h3>
                  </div>
                  <div className="orgcontact">
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
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
// Systematic links
// 1- 'Plasma',
// 2- 'Oxygen(o2)',
// 3- 'Remdesivir',
// 4- 'Medicine',
// 5- 'ICU Beds',
// 6- 'Free services',
// 7- 'Miscellaneous' 