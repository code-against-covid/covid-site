import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { resources } from './data/resources'
import { states } from './data/states'
import { status } from './data/status'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Footer from './components/Footer/Footer';
import Drawer from './components/Drawer/Drawer';


const Database = () =>
{

    const [data, setData] = useState([])
    const [state, setState] = useState('')
    const [resource, setResource] = useState('')

    useEffect(() =>
    {
        async function fetchData()
        {
            const response = await axios.get("http://127.0.0.1:8000/form/")
            return setData(response.data)
        }
        fetchData();
    }
        , [])

    const handleSelect1 = (e) =>
    {
        setState(e.target.value)
        //     const response = await axios.get("http://127.0.0.1:8000/form/")
        //   const response2 = await axios.get(`http://127.0.0.1:8000/state/${states.indexOf(e.target.value) + 1}/`)
        //     setData(response.data.filter((item)=> response2.data.form_state.includes(JSON.stringify(item.id))))
    }

    const handleSelect2 = (e) =>
    {
        setResource(e.target.value)
        //     const response = await axios.get("http://127.0.0.1:8000/form/")
        //   const response2 = await axios.get(`http://127.0.0.1:8000/resource/${resources.indexOf(e.target.value) + 1}/`)
        //     setData(response.data.filter((item)=> response2.data.form_resource.includes(JSON.stringify(item.id))))
    }

    const handleSubmit = async () =>
    {
        const response = await axios.get("http://127.0.0.1:8000/form/")
        // const response2 = await axios.get(`http://127.0.0.1:8000/resource/${ resources.indexOf(resource) + 1 }/`)
        // const response3 = await axios.get(`http://127.0.0.1:8000/state/${ states.indexOf(state) + 1 }/`)
        setData(response.data.filter((item) => item.state === state && item.resource === resource))
    }

    return (
        <>
            <div className="database">

                <Drawer />
                {/* <div className='heading'>
                    <Link to='/' style={{ textDecoration: 'none' }}>Covid Information Bank</Link>
                </div> */}
                <h1 className="heading">Database </h1>
                <div className="dbsearchsec">

                    <div className="filter">

                        <Autocomplete

                            onSelect={handleSelect1}
                            options={states.map((option) => option)}
                            renderInput={(params) => (
                                <TextField {...params} label="Filter By State" margin="normal" variant="outlined" />
                            )}
                        />
                    </div>

                    <div className="filter">

                        <Autocomplete

                            onSelect={handleSelect2}
                            options={resources.map((option) => option)}
                            renderInput={(params) => (
                                <TextField {...params} label="Filter By Resource" margin="normal" variant="outlined" />
                            )}
                        />
                    </div>
                    <div className="searchbtn">
                        <Button variant="contained" size="large" onClick={handleSubmit}>Search</Button>
                    </div>
                    <div className="totaldbposts">
                        Total Number of Posts: {data.length}
                    </div>
                </div>
                <div>
                    <div className="dbwarning">
                        <h3>Warning!</h3>
                        <p>PLEASE VERIFY EVERY INFORMATION THAT YOU CHOOSE TO ACCEPT YOURSELF TO PREVENT ANY FRAUD. WE ARE JUST PROVIDING A PLATFORM FOR PEOPLE'S BENEFIT.</p>
                    </div>
                </div>
                {
                    <div className="tablecontainer">
                        <table className="dbtable">
                            <thead>
                                <tr>

                            <th style={{ width: "150px" }} />
                            <th style={{ width: "150px" }} />
                            <th style={{ width: "150px" }} />
                            <th style={{ width: "500px" }} />
                            <th style={{ width: "150px" }} />
                            <th style={{ width: "150px" }} />
                                </tr>
                           
                                <tr>
                                    <th>Name</th>
                                    <th>Resource</th>
                                    <th>State</th>
                                    <th>Additional Information</th>
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
                                            {status[item.status - 1] === 'Not Verified' ? <td style={{ background: 'red' }}>{status[item.status - 1]}</td> : status[item.status - 1] === 'Verified' ? <td style={{ background: 'green' }}>{status[item.status - 1]}</td> : status[item.status - 1] === 'WhatsApp Only' ? <td style={{ background: 'yellow' }}>{status[item.status - 1]}</td> : <td style={{ background: 'blue' }}>{status[item.status - 1]}</td>}
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
