import React, { useState, useEffect } from 'react';
import './navbar.css';
import { animated, useSpring } from 'react-spring';
import $ from 'jquery'
import CSS from '../../../utility/CSS'
// import $ from 'jquery'

// import Profile from '../Profile';


export default function Navbar() {

  // let navbardropletJQ = $('.navbar-droplet')
  // let msgbottleJQ = $('.msg-bottle')

  let navbardropletJQ:any;
  let msgbottleJQ:any;
  



  

  // * *  gather id and join them.   // let navbarID = navbardropletJQ.id * * 
  // let msgbottleID = msgbottleJQ.id
  // let bothelem = [navbarID, msgbottleID].join()
  
  if (typeof window === 'undefined') {
    // dotenv.config()
  } else {
    // $('*').css('cursor', `url('/water_img/mouse_droplet.png'), auto`)
    CSS($('*'), 'cursor', `url('/water_img/mouse_droplet.png'), auto`)
    $('*').on('mouseenter', (event:any) => {
      let target = $(event.target)
      // target.css('cursor', `normal`)
      CSS(target, 'cursor', 'normal')
  })
  // CSS($(bothelem), 'border', '10px solid hotpink')
}

// console.log('bothelem')
// console.log(bothelem)

//   const Boop = ({ rotation, timing, children }) => {
    const [isBooped, setIsBooped] = useState(false);

    // const style = useSpring({
    //   display: 'inline-block',
    //   backfaceVisibility: 'hidden',
    //   transform: isBooped ? `rotate(${rotation}deg)` : `rotate(0deg)`,
    //   config: {
    //     tension: 300,
    //     friction: 10,
    //   },
    // });

    // useEffect(() => {
    //   if (!isBooped) {
    //     return;
    //   }
    //   const timeoutId = window.setTimeout(() => {
    //     setIsBooped(false);
    //   }, timing);
    //   return () => {
    //     window.clearTimeout(timeoutId);
    //   };
    // }, [isBooped, timing]);

    // const trigger = () => {
      // setIsBooped(true);
    // };

    // return (
    //   <animated.div onMouseEnter={trigger} style={style}>
        // {children}
    //   </animated.div>
    // );
  // };

  useEffect( () => {
    navbardropletJQ = $('.navbar-droplet')
    msgbottleJQ = $('.msg-bottle')
  }, [])

const homeclick = () => { window.location.href = "/"}
  const statclick = () => {  window.location.href = "/dashboard" }

  const test = () => {
    console.log('hey');
  
    console.log('navbardropletJQ')
    console.log(navbardropletJQ)

    console.log('msgbottleJQ')
    console.log(msgbottleJQ)


    let droplet = $('.navbar-droplet')
    let msgbottle = $('.msg-bottle')
    console.log('droplet')
    console.log(droplet)

    console.log('msgbottle')
    console.log(msgbottle)


  }

  return (
    <div className="navbar-container">
    <div className="logo">
    <img className="navbar-droplet" src="/water_img/small_droplet.png" />
    <img className="msg-bottle"  src="/water_img/msg-bottle.png" />
    <button onClick={test} ></button>
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
