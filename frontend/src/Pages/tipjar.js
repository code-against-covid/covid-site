import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog';
import Drawer from '../components/Drawer/Drawer'
import Footer from '../components/Footer/Footer'
import style from './styles/tipjar.module.css'
import { motion } from 'framer-motion'
import axios from 'axios'
import { month } from '../data/months'
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

const Tipjar = () =>
{

  const [tip, setTip] = useState('')
  const [openPop, setOpenPop] = useState(false)
  const [name, setName] = useState('')
  const [ip, setIp] = useState('')
  const [data, setData] = useState([])
  // const [loading, setLoading] = useState(true)


  const publicIp = require('public-ip'); // For catching the client's ipv4. 
  (async () =>
  {
    setIp(await publicIp.v4())
  })();

  const today = new Date();
  const date = today.getDate() + '-' + month[today.getMonth()];

  const handleSubmit = () =>
  {
    if (name && tip)
    {
      axios.post(`${ process.env.REACT_APP_API_URL }/suggestion/`, {
        name: name,
        description: tip,
        ip_address: ip,
        created_at: date,
        likes: null
      }).then((response) =>
        setOpenPop(true)).catch((error) =>
        {
          console.log(error)
        })
    }
  }

  useEffect(() =>
  {
    function fetchData()
    {
      axios.get(`${ process.env.REACT_APP_API_URL }/suggestion/`).then((response) =>
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
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <div>
      <Drawer />
      <p className={`${ style.heading } `}>
       Tipjar
      </p>
        <p className={`${style.disclaimer}`}>
          Here you can share fun anecdotes or tips\tricks that helped you through the 14 days quarantine period.
          </p>
      <div className={`${ style.form } `}>
        <div className={`${ style.subform1 } `}>
          <form>
            <textarea defaultValue='Tip...' onChange={(e) =>
            {
              setTip(e.target.value)
            }} className={`${ style.textarea1 } `}></textarea>
          </form>
        </div>
        <div className={`${ style.subform2 } `}>
          <form>
            <textarea defaultValue='Name' onChange={(e) =>
            {
              setName(e.target.value)
            }} className={`${ style.textarea2 } `}></textarea>
          </form>
        </div>
      </div>
      <div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`${ style.button } `}
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
      <p className={`${style.subheading}`}>
        Tips
      </p>
        <p className={`${style.tipwarning}`}>
WE ACCEPT NO RESPONSIBILITY OR LIABILITY FOR THE ACCURACY OR THE COMPLETENESS OF THE INFORMATION CONTAINED IN THIS WEBSITE. UNDER NO CIRCUMSTANCES WILL WE BE HELD RESPONSIBLE OR LIABLE IN ANY WAY FOR ANY CLAIMS, DAMAGES, LOSSES, EXPENSES, COSTS OR LIABILITIES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, ANY DIRECT OR INDIRECT DAMAGES FOR LOSS OF PROFITS, BUSINESS INTERRUPTION OR LOSS OF INFORMATION) RESULTING OR ARISING DIRECTLY OR INDIRECTLY FROM YOUR USE OF OR INABILITIY TO USE THIS WEBSITE OR ANY WEBSITES LINKED TO IT, OR FROM YOUR RELIANCE ON THE INFORMATION AND MATERIAL ON THIS WEBSITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES IN ADVANCE. WE ARE JUST TRYING TO HELP BY PROVIDING A PLATFORM FOR EVERYONE TO BENEFIT FROM. WHILE WE TRY TO VERIFY THE INFORMATION TO THE BEST OF OUR ABILITIES, WE CANNOT GUARANTEE THAT THERE ARE NO MISTAKES OR ERRORS. SHOULD YOU DECIDE TO ACT UPON ANY OF THE INFORMATION ON THIS WEBSITE, YOU DO SO AT YOUR OWN RISK.
        </p>
      <div className={`${ style.data } `}>
        {data.map((item) =>
        {
          return (

            <motion.div
              variants={fadeLeft}
              initial='hidden'
              animate='visible'
              transition={{ duration: 1 }}
              className={`${ style.description } `}
              key={item.id}>
              <p className={`${ style.authorname }`}>By {item.name},</p>
              <p className={`${ style.descriptioncontent }`}> {item.description} </p>
            </motion.div>
          )
        })}
      </div>
      <Footer />
    </div>
  )
}

export default Tipjar
