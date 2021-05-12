import React from 'react';
import '../../App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { states } from '../../data/states'
import { month } from '../../data/months'
import { resources } from '../../data/resources'
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import style from './styles/Form.module.css';

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

const DialogTitle = withStyles(styles)((props) =>
{
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={`${ classes.root }`} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={`${ classes.closeButton }`} onClick={onClose}>
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

const Form = () =>
{
  const [openPop, setOpenPop] = useState(false)
  const [openForm, setOpenForm] = useState(false)
  const [ip, setIp] = useState();
  const [name, setName] = useState('')
  const [state, setState] = useState('')
  const [resource, setResource] = useState('')
  const [additional, setAdditional] = useState('')


  const publicIp = require('public-ip'); // For catching the client's ipv4. 
  (async () =>
  {
    setIp(await publicIp.v4())
  })();



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
  // const handleSelect5 = (e) =>
  // {
  //   setMobile(e.target.value)
  // }
  // const handleSelect6 = (e) =>
  // {
  //   setAddress(e.target.value)
  // }

  // handlesubmit for the submit button in the post and display thank you message.
  const handleSubmit = () =>
  {
    // var additionalinfo = additional;
    // if (address.length > 0)
    // {
    //   additionalinfo = `Address: ${ address }, ` + additionalinfo;
    // }
    // if (mobile.length > 0)
    // {
    //   additionalinfo = `Mobile: ${ mobile }, ` + additionalinfo;
    // }
    axios.post(`${ process.env.REACT_APP_API_URL }/form/`, {
      name: name ? name : null,
      state: state,
      resource: resource,
      status: 1,
      ip_address: JSON.stringify(ip),
      additional_info: additional,
      created_at: date,
    }).catch((error) =>
    {
      console.log(error)
    })
    // Set timeout for 3 seconds. Had to use settimeout cause setopenform and setopenpop would simunltaneously close together.
    setTimeout(
      () =>
      {
        setOpenForm(false)
      }, 3500
    )
    setOpenPop(true);
  };
  const today = new Date();
  const date = today.getDate() + '-' + month[today.getMonth()]; //For capturing the post date.
  return (
    <div>
      <div className={`${ style.frontpagehome }`}>
        <div className={`${ style.frontpageheadingsecondary }`}><h1>A RESOURCE DATABASE, MADE BY YOU FOR YOU.</h1></div>
        <div className={`${ style.frontpagebtn }`}>
          {/* // Starting of I want to help */}
          <div className={`${ style.want }`}>
            <Button className={`${ style.helpbtn }`} variant="contained" color="primary" size="large" onClick={() =>
            {
              setOpenForm(true)
            }}>
              I want To Help
              </Button>
          </div>

          {/* // Starting of I need help. */}
          <div className={`${ style.need }`}>
            <Link to='/help' style={{ textDecoration: 'none' }}>
              <Button className={`${ style.helpbtn }`} variant="contained" color="secondary" size="large" >
                I Need Help
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Dialog open={openForm} onClose={() =>
      {
        setOpenForm(false);
      }} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details. All the information will be subject to verification by the volunteers.
          </DialogContentText>
          <TextField
            autoFocus
            onChange={handleSelect2}
            margin="dense"
            id="name"
            label="Your name(optional)"
            type="text"
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

          {/* <TextField
            autoFocus
            onChange={handleSelect5}
            margin="dense"
            id="mobile"
            label="Mobile of the resource provider(optional)"
            type="text"
            fullWidth
          />

          <TextField
            autoFocus
            onChange={handleSelect6}
            margin="dense"
            id="address"
            multiline
            rows={3}
            label="Address for the resource(optional)"
            type="text"
            fullWidth
          /> */}

          <TextField
            onChange={handleSelect4}
            autoFocus
            margin="dense"
            id="information"
            multiline
            rows={4}
            label="Information"
            placeholder="Information about the resource: Address, Phone, Availability, etc. Any information you provide will help thousands."
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleSubmit}>
            Submit
        </Button>
          <Dialog onClose={() =>
          {
            setOpenPop(false)
          }} aria-labelledby="customized-dialog-title" open={openPop}>
            <DialogTitle id="customized-dialog-title" onClose={() =>
            {
              setOpenPop(false)
            }}>
              Form Submitted Successfully
        </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                The team of United Against Covid thanks you for contributing to our project. Your valuable information will be very helpful in our fight against Covid-19.
          </Typography>
            </DialogContent>
          </Dialog>

          <Button variant="outlined" onClick={() =>
          {
            setOpenForm(false);
          }} color="primary">
            Close
                  </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Form
