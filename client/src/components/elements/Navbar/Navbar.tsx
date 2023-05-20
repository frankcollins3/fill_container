import React, { useState, useEffect } from 'react';
import './navbar.css';
import { animated, useSpring } from 'react-spring';
import $ from 'jquery'
// import $ from 'jquery'

// import Profile from '../Profile';


export default function Navbar() {

  if (typeof window === 'undefined') {
    // dotenv.config()
  } else {
    $('*').css('cursor', `url('/water_img/mouse_droplet.png'), auto`)
    $('*').on('mouseenter', (event:any) => {
      $(event.target).css('cursor', `normal`)
  })
}


//   const Boop = ({ rotation, timing, children }) => {
    const [isBooped, setIsBooped] = useState(false);

//     const style = useSpring({
//       display: 'inline-block',
//       backfaceVisibility: 'hidden',
//       transform: isBooped ? `rotate(${rotation}deg)` : `rotate(0deg)`,
//       config: {
//         tension: 300,
//         friction: 10,
//       },
//     });

//     useEffect(() => {
//       if (!isBooped) {
//         return;
//       }
//       const timeoutId = window.setTimeout(() => {
//         setIsBooped(false);
//       }, timing);
//       return () => {
//         window.clearTimeout(timeoutId);
//       };
//     }, [isBooped, timing]);
//     const trigger = () => {
//       setIsBooped(true);
//     };

//     return (
//     //   <animated.div onMouseEnter={trigger} style={style}>
//         {children}
//     //   </animated.div>
//     );
//   };

const homeclick = () => { window.location.href = "/"}
  const statclick = () => {  window.location.href = "/dashboard" }

  return (
    <div className="navbar-container">
    <div className="logo">
    <img src="/water_img/small_droplet.png" />
    <img  src="/water_img/msg-bottle.png" />
    </div>
      
      <div className="logo">
        {/* <Boop rotation={10} timing={150}> */}
          <img onClick={homeclick} src="/water_img/home.png" />
          <img onClick={statclick} src="/water_img/statistics.png" />
          <img  src="/water_img/settings.png" />
          
          <img src="/water_img/exit.png" />
        {/* </Boop> */}
      </div>
      {/* <Profile /> */}
 
    </div>
  );
}