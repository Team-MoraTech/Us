import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLocationDot, faClipboard } from '@fortawesome/free-solid-svg-icons';
import './SiteVisitFourInputContainer';
import SiViSingleButton from './SiViSingleButton';

export default function SiteVisitFourInputContainer() {
  return (
    <div className='SiViInputC'>
      <div className="input-container">
        <FontAwesomeIcon icon={faUser} className="icon" />
      <input type="text" placeholder="Vehicle Details" />
      </div>

      <div className="input-container">
        <FontAwesomeIcon icon={faLocationDot} className="icon" />
      <input type="text" placeholder="Location" />
      </div>

      <div className="input-container">
        <FontAwesomeIcon icon={faClipboard} className="icon" />
      <input type="text" placeholder="Job type" />



      </div>
      <SiViSingleButton value='Update'/>
    </div>
  )
}
