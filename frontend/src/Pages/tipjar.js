import React, {useState,useEffect} from 'react'
import Dialog from '@material-ui/core/Dialog';
import Drawer from '../components/Drawer/Drawer'
import Footer from '../components/Footer/Footer'
import style from './styles/tipjar.module.css'
import {motion} from 'framer-motion'
import axios from 'axios'
import {month} from '../data/months'
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

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
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const Tipjar = () => {

    const [tip,setTip] = useState('')
    const [openPop, setOpenPop] = useState(false)
    const [name,setName] = useState('')
    const [ip,setIp] = useState('')
    const [data,setData] = useState([])
    // const [loading, setLoading] = useState(true)


    const publicIp = require('public-ip'); // For catching the client's ipv4. 
  (async () =>
  {
    setIp(await publicIp.v4())
  })();

    const today = new Date();
    const date = today.getDate() + '-' + month[today.getMonth()]; 

    const handleSubmit = () => {
          if(name && tip){
                           axios.post(`${ process.env.REACT_APP_API_URL }/suggestion/`,{
                               name : name,
                               description: tip,
                               ip_address : ip,
                               created_at: date,
                               likes: null
                           }).then((response)=>
                            setOpenPop(true)).catch((error)=>{
                               console.log(error)
                           })
                       }
    }

    useEffect(() =>
  {
      function fetchData()
      {
        axios.get(`${process.env.REACT_APP_API_URL}/suggestion/`).then((response) =>
        {
          setData(response.data)
        }).catch((error) =>
        {
          console.log(error)
        })
      }
      fetchData();
  }
    , [openPop])

    const fadeLeft = {
    hidden: {opacity:0,x:-100},
    visible:{opacity:1,x:0}
  }

    return (
        <div>
            <Drawer/>
               <p className={`${style.heading}`}>
                   Did you binge watch any sitcom or were you on a movie marathon ? Share your tips or hacks that helped you through the quanrantine !!
                   </p>
            <div className={`${style.form}`}>
                   <div className={`${style.subform1}`}>
                    <form>
  <textarea defaultValue='Tip...' onChange={(e)=>{
      setTip(e.target.value)
  }} className={`${style.textarea1}`}></textarea>
</form>
                   </div>
                   <div className={`${style.subform2}`}>
                       <form>
  <textarea defaultValue='Name' onChange={(e)=>{
      setName(e.target.value)
  }} className={`${style.textarea2}`}></textarea>
</form>
                   </div>
            </div>
            <div>
                   <motion.button 
                     whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                   className={`${style.button}`}
                   onClick={handleSubmit}
                   >
                       Submit
                   </motion.button>
            </div>
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
          </Dialog>
          <div className={`${style.data}`}>
              {data.map((item)=>{
                  return (
                     
                      <motion.div 
                       variants={fadeLeft}
    initial = 'hidden'
    animate = 'visible'
    transition = {{duration:1}}
                      className={`${style.description}`} >
                     <p>Tip: {item.description} </p>
                     <p>Author: {item.name}      </p>
                        
                      </motion.div>
                  )
              })}
          </div>
          <Footer/>
        </div>
    )
}

export default Tipjar
