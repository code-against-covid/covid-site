import React from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios'
import {resources} from './data/resources'
import {states} from './data/states'
import {status} from './data/status'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Database = () => {

    const [data,setData] = useState([])
    const [state,setState] = useState('')
    const [resource,setResource] = useState('')


    useEffect(()=>{
        async function fetchData(){
        const response = await axios.get("http://127.0.0.1:8000/form/")
        return setData(response.data)
        }
        fetchData();
    }
    ,[])

    const handleSelect1 =(e)=>{
        setState(e.target.value)
    //     const response = await axios.get("http://127.0.0.1:8000/form/")
    //   const response2 = await axios.get(`http://127.0.0.1:8000/state/${states.indexOf(e.target.value) + 1}/`)
    //     setData(response.data.filter((item)=> response2.data.form_state.includes(JSON.stringify(item.id))))
    }

    const handleSelect2 = (e)=>{
        setResource(e.target.value)
    //     const response = await axios.get("http://127.0.0.1:8000/form/")
    //   const response2 = await axios.get(`http://127.0.0.1:8000/resource/${resources.indexOf(e.target.value) + 1}/`)
    //     setData(response.data.filter((item)=> response2.data.form_resource.includes(JSON.stringify(item.id))))
    }

    const handleSubmit = async () =>{
        const response = await axios.get("http://127.0.0.1:8000/form/")
      const response2 = await axios.get(`http://127.0.0.1:8000/resource/${resources.indexOf(resource) + 1}/`)
      const response3 = await axios.get(`http://127.0.0.1:8000/state/${states.indexOf(state) + 1}/`)
        setData(response.data.filter((item)=> response2.data.form_resource.includes(JSON.stringify(item.id)) && response3.data.form_state.includes(JSON.stringify(item.id))))
    }

    return (
        <>
        <div className='heading'>
Covid Information Bank
  </div>
  <h1>Database </h1>
  <div style={{display:'flex'}}>

<div style={{width:'20%',marginLeft:'5%'}}>

  <Autocomplete
        
        onSelect={handleSelect1}
        options={states.map((option) => option)}
        renderInput={(params) => (
            <TextField {...params} label="Filter By State" margin="normal" variant="outlined" />
            )}
            />
</div>

  <div style={{width:'20%',marginLeft:'5%'}}>

  <Autocomplete
        
        onSelect={handleSelect2}
        options={resources.map((option) => option)}
        renderInput={(params) => (
            <TextField {...params} label="Filter By Resource" margin="normal" variant="outlined" />
            )}
            />
</div>
<div style={{margin:'1.2% 0 0 5%',width:'10%'}}>
    <button style={{height:'85%',width:'120%',fontSize:'30px',background:'Black',color:'white'}} onClick={handleSubmit}>Search</button>
</div>
<div style={{margin:'1% 0 0 10%',fontSize:'30px',background:'orange'}}>
    Total Number of Posts: {data.length}
</div>
            </div>
            <div style={{color:'red',background:'blue',textAlign:'center',fontSize:'20px',marginTop:'2%'}}>
                PLEASE VERIFY EVERY INFORMATION THAT YOU CHOOSE TO ACCEPT AGAIN TO PREVENT ANY FRAUD. WE ARE JUST PROVIDING A PLATFORM FOR PEOPLE'S BENEFIT. 
            </div>
        <table>
            <tbody>
            <tr>
                <th>Name</th>
                <th>Resource</th>
                <th>State</th>
                <th>Additional Information</th>
                <th>Submitted On</th>
                <th>Status</th>
            </tr>
            {data.map((item)=>{
                return (
                    <tr key={item.id}>
                        {item.name ? <td>{item.name}</td> : <td>Anonymous</td>}
                        <td>{resources[item.resource - 1]}</td>
                        <td>{states[item.state - 1]}</td>
                        <td>{item.additional_info}</td>
                        <td>{item.created_at}</td>
                        {status[item.status - 1 ] === 'Not Verified' ? <td style={{background:'red'}}>{status[item.status - 1 ]}</td> : status[item.status - 1 ] === 'Verified' ? <td style={{background:'green'}}>{status[item.status - 1 ]}</td> : status[item.status - 1 ] === 'WhatsApp Only' ? <td style={{background:'yellow'}}>{status[item.status - 1 ]}</td> : <td style={{background:'blue'}}>{status[item.status - 1 ]}</td> } 
            </tr>
                )
            })}
            </tbody>
        </table>
        <div className="footer2">
    <div style={{width:'100%',textAlign:'center'}}>
      All Rights Reserved@2021
    </div>
  </div>
        </>
    )
}

export default Database
