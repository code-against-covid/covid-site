import React,{useState,useEffect} from 'react'
import Drawer from '../components/Drawer/Drawer'
import Footer from '../components/Footer/Footer'
import styles from './styles/blossom.module.css';
import {motion } from 'framer-motion'
import axios from 'axios'

const Blossom = () => {
    const [item, setItem] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() =>
  {
    if(loading){

      function fetchData()
      {
        axios.get(`${process.env.REACT_APP_API_URL}/blossom/`).then((response) =>
        {
          setItem(response.data)
        }).catch((error) =>
        {
          console.log(error)
        })
      }
      fetchData();
    }
    return()=>{
      setLoading(false)
    }
  }
    , [loading])
    return (
        <div className={`${styles.container}`}>
            <Drawer/>
            <div className={`${styles.bubble}`}>
                {item.map((item)=>{
                    return (
        <motion.div 
        drag={true}
        dragConstraints={{left:20,right:850,top:15,bottom:300}}
        initial={{opacity:0,y:-100}}
        animate={{opacity:1,y:0,transition:{duration:1}}}
        className={`${styles.bubble_item}`}
        >
            <motion.p
            className={`${styles.textindiv}`}
            whileHover={{scale:1.3}}
            onClick={()=>{
            window.open(item.link)
        }}
            >{item.name}</motion.p>
        </motion.div>
                    )
                })}
            </div>
            <Footer/>
        </div>
    )
}

export default Blossom
