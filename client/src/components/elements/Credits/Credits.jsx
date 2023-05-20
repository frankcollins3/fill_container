import React from 'react';
import './credits.css';

export default function Credits() {
  return (
    <div className="credits-container">
    <div>
        
          <img src="water_img/bottle.png" />          
      </div>

      <div>
        <a href="https://github.com/WAPP-Water-App">
          {/* <img src="water_img/wapp.png" /> */}
        </a>
      </div>
      <div>
        <ul>
          <img src="water_img/small_droplet.png"/>

          {/* <img src="water_img/water-park.png" />           */}
        </ul>
      </div>
    </div>
  );
}
