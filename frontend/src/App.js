import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { states } from './data/states'
import { resources } from './data/resources'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Footer from './components/Footer/Footer';
import Drawer from './components/Drawer/Drawer';
const App = () =>
{

  const [organization, setOrganization] = useState([])
  const [announcement, setAnnouncement] = useState([])

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
    , [])


  const publicIp = require('public-ip');

  const [open, setOpen] = useState(false);

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

  const handleClickOpen = () =>
  {
    setOpen(true);
  };

  const handleClose = () =>
  {
    setOpen(false);

    axios.post("http://127.0.0.1:8000/form/", {
      name: name ? name : null,
      state: state,
      resource: resource,
      status: 1,
      ip_address: JSON.stringify(ip),
      additional_info: additional,
      created_at: date,
    })
  };
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const today = new Date();
  const date = today.getDate() + '-' + month[today.getMonth()];
  return (
    <>
      <div className="app">
        <Drawer />
        {/* <div className='heading'>
          <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>Covid Information Bank</Link>
        </div> */}
        <div className="frontpagecont">

          <div className="leftbox">
            <div className="announcement_heading">
              News and updates
            </div>
            <div className="marquee">
              {announcement.map((item) =>
              {
                return (
                  <div className="announcementlines" key={item.id}>{item.name}</div>
                );
              })}
            </div>
          </div>

          <div className="rightbox">
            <div className="form_heading">
              Resource Database
            </div>



            <div className="want">
              <Button className="helpbtn" variant="contained" color="secondary" size="large" onClick={handleClickOpen}>
                I want To Help
              </Button>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                  <Button onClick={handleClose} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </div>



            <div className="need">
              <Link to='/help' style={{ textDecoration: 'none' }}>
                <Button className="helpbtn" variant="contained" color="primary" size="large" >
                  I Need Help
              </Button>
              </Link>
            </div>
          </div>

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