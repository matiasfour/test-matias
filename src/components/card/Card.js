import React from 'react'
import { convertMsToHMS } from '../../utils';
import './card.css'

const Card = ({data, title}) => {
  if(data?.error){
      console.log("hay error " + data.error )
  }
  return (
    <div className='card'>
        <h2 className='card-title'>{title}</h2>
        <div className='card-message' style={{backgroundColor: data?.error ? 'red' : 'green'}} >
            <span>{ data?.error ? data.error : data?.message}</span>
        </div>
        <span className='card-hostname'>{ data?.error ? 'Outage' : data?.hostname}</span>
        <span className='card-time'> { data?.error ?  null : convertMsToHMS(data?.time) }</span>
   
        
    </div>
  )
}

export default Card