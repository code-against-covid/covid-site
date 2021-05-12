import React from 'react'
import '../App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { resources } from '../data/resources'
import { states } from '../data/states'
import { status } from '../data/status'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Footer from '../components/Footer/Footer';
import Drawer from '../components/Drawer/Drawer';
import styles from './styles/database.module.css';


const Database = () =>
{

    const [data, setData] = useState([])
    const [state, setState] = useState('')
    const [resource, setResource] = useState('')

    useEffect(() =>
    {
        async function fetchData()
        {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/form/`)
            return setData(response.data)
        }
        fetchData();
    }
        , [])

    const handleSelect1 = (e) =>
    {
        setState(e.target.value)
    }

    const handleSelect2 = (e) =>
    {
        setResource(e.target.value)
    }

    const handleSubmit = async () =>
    {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/form/`)
        resource ? setData(response.data.filter((item) => item.state === state && item.resource === resource)) : setData(response.data.filter((item) => item.state === state))
    }

    return (
        <>
            <div className={`${ styles.database }`}>

                <Drawer />
                <h1 className={`${ styles.heading }`}>Database </h1>
                <div className={`${ styles.dbsearchsec }`}>

                    <div className={`${ styles.filter }`}>

                        <Autocomplete

                            onSelect={handleSelect1}
                            options={states.map((option) => option)}
                            renderInput={(params) => (
                                <TextField {...params} label="Filter By State" margin="normal" variant="outlined" />
                            )}
                        />
                    </div>

                    <div className={`${ styles.filter }`}>

                        <Autocomplete

                            onSelect={handleSelect2}
                            options={resources.map((option) => option)}
                            renderInput={(params) => (
                                <TextField {...params} label="Filter By Resource" margin="normal" variant="outlined" />
                            )}
                        />
                    </div>
                    <div className={`${ styles.searchbtn }`}>
                        <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>Search</Button>
                    </div>
                    <div className={`${ styles.totaldbposts }`}>
                        Total Number of Posts: {data.length}
                    </div>
                </div>
                <div>
                    <div className={`${ styles.dbwarning }`}>
                        <h3>Warning!</h3>
                        <p>PLEASE VERIFY EVERY INFORMATION THAT YOU CHOOSE TO ACCEPT YOURSELF TO PREVENT ANY FRAUD. WE ARE JUST PROVIDING A PLATFORM FOR PEOPLE'S BENEFIT.</p>
                    </div>
                </div>
                {
                    <div className={`${ styles.tablecontainer }`}>
                        <table className={`${ styles.dbtable }`}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Resource</th>
                                    <th>State</th>
                                    <th className={`${ styles.resourcerow }`}>Resource Information</th>
                                    <th>Submitted On</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) =>
                                {
                                    return (
                                        <tr key={item.id}>
                                            {item.name ? <td>{item.name}</td> : <td>Anonymous</td>}
                                            <td>{item.resource}</td>
                                            <td>{item.state}</td>
                                            <td>{item.additional_info}</td>
                                            <td>{item.created_at}</td>
                                            {status[item.status - 1] === 'Not Verified' ? <td style={{ background: 'red' }}>{status[item.status - 1]}</td> : status[item.status - 1] === 'Verified' ? <td style={{ background: 'green' }}>{status[item.status - 1]}</td> : status[item.status - 1] === 'WhatsApp Only' ? <td style={{ background: 'yellow' }}>{status[item.status - 1]}</td> : <td style={{ background: 'lightblue' }}>{status[item.status - 1]}</td>}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                }

            </div>
            <Footer />

        </>
    )
}

export default Database
