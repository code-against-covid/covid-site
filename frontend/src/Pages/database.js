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
    const [loading, setLoading] = useState(true)

    useEffect(() =>
    {
        if(loading){
           
            async function fetchData()
            {
                const response = await axios.get(`${ process.env.REACT_APP_API_URL }/form/`)
                return setData(response.data)
            }
            fetchData();
        }
        return ()=>{
            setLoading(false)
           
        }
    }
        , [loading])

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
        const response = await axios.get(`${ process.env.REACT_APP_API_URL }/form/`)
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
                        <p>WE ACCEPT NO RESPONSIBILITY OR LIABILITY FOR THE ACCURACY OR THE COMPLETENESS OF THE INFORMATION CONTAINED IN THIS WEBSITE. UNDER NO CIRCUMSTANCES WILL WE BE HELD RESPONSIBLE OR LIABLE IN ANY WAY FOR ANY CLAIMS, DAMAGES, LOSSES, EXPENSES, COSTS OR LIABILITIES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, ANY DIRECT OR INDIRECT DAMAGES FOR LOSS OF PROFITS, BUSINESS INTERRUPTION OR LOSS OF INFORMATION) RESULTING OR ARISING DIRECTLY OR INDIRECTLY FROM YOUR USE OF OR INABILITIY TO USE THIS WEBSITE OR ANY WEBSITES LINKED TO IT, OR FROM YOUR RELIANCE ON THE INFORMATION AND MATERIAL ON THIS WEBSITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES IN ADVANCE. WE ARE JUST TRYING TO HELP BY PROVIDING A PLATFORM FOR EVERYONE TO BENEFIT FROM. WHILE WE TRY TO VERIFY THE INFORMATION TO THE BEST OF OUR ABILITIES, WE CANNOT GAURANTEE THAT THERE ARE NO MISTAKES OR ERRORS. SHOULD YOU DECIDE TO ACT UPON ANY OF THE INFORMATION ON THIS WEBSITE, YOU DO SO AT YOUR OWN RISK.</p>
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
                                            {status[item.status - 1] === 'Not Verified' ? <td style={{ background: 'red',textAlign:'center',color:'white' }}>{status[item.status - 1]}</td> : status[item.status - 1] === 'Verified' ? <td style={{ background: 'green',textAlign:'center',color:'white' }}>{status[item.status - 1]}</td> : status[item.status - 1] === 'WhatsApp Only' ? <td style={{ background: 'salmon',textAlign:'center',color:'white' }}>{status[item.status - 1]}</td> : <td style={{ background: 'blue',textAlign:'center',color:'white' }}>{status[item.status - 1]}</td>}
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
