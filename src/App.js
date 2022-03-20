import React, {useState, useEffect } from 'react'
import axios from 'axios';
import Card from './components/card/Card';
import './App.css'
import Navbar from './components/navbar/Navbar';

const App = () => {
  const [data, setData] = useState({accounts: null, 
          assets: null, customer: null, datapoints: null,
          devices: null, documents: null, forms: null,
          invites: null, media: null, messages: null,
          namespaces: null, orders: null, patiens: null,
          relationships: null, rules: null, templates: null,
          users: null, workflows: null 
        });

  const apis = ["accounts", "assets", "customers", "datapoints", 
     "devices", "documents", "forms", "invites", "media", "messages", 
     "namespaces", "orders", "patients", "relationships", "rules", 
     "templates", "users", "workflows"
   ]

  const getData = async (api) => {
    try {
      const res = await axios.get(`https://api.factoryfour.com/${api}/health/status`);
      setData(data => ({
        ...data,
        [api]: res.data 
      }));
    } catch (error) {
      setData(data => ({
        ...data,
        [api]: {error: error.message}
      }));
    }   
}  

const callApis = () => {
  apis.forEach((api) => {
    getData(api);
  })
}
  
  useEffect(() => {
    callApis();  //First time with no delay
    setInterval(() => {  //Calling with 15s of delay
      callApis();
    }, 15000)
    return () => {
      clearInterval()
    }
  }, [])


  return (
    <div className='main'>
      <Navbar/>
      {
        apis.map((api) => (
          <Card data={data[api]} title={api} />
        ))
      }
    </div>
  )
}

export default App
