
import React, { useState, useEffect } from 'react';
import './navbar.css';
import { animated, useSpring } from 'react-spring';
import $ from 'jquery'
import CSS from '../../../utility/CSS'
import LogInOutGoogle from '../LogInOutGoogle/LogInOutGoogle'
// import $ from 'jquery'

// import Profile from '../Profile';


export default function Navbar() {

  // let navbardropletJQ = $('.navbar-droplet')
  // let msgbottleJQ = $('.msg-bottle')

  let navbardropletJQ:any;
  let navbardropletID:string
  let msgbottleJQ:any;
  let msgbottleID:string
  let bothElemById:any
  
  // * *  gather id and join them.   // let navbarID = navbardropletJQ.id * * 
  // let msgbottleID = msgbottleJQ.id
  // let bothelem = [navbarID, msgbottleID].join()
  
  if (typeof window !== 'undefined') {
    CSS($('*'), 'cursor', `url('/water_img/mouse_droplet.png')`)   
      $('*').on('mouseenter', (event:any) => { CSS($(event.target), 'cursor', 'normal') })
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
    navbardropletJQ = $('#navbar-droplet')[0]
    navbardropletID = navbardropletJQ.id
    msgbottleJQ = $('#msg-bottle')[0]
    msgbottleID = msgbottleJQ.id
    bothElemById = [navbardropletID,msgbottleID].join(" ")

  }, [])

const homeclick = () => { window.location.href = "/"}
  const statclick = () => {  window.location.href = "/dashboard" }
  const settingsclick = () => {  window.location.href = "/settings" }

  const test = () => {
    console.log('hey');

    bothElemById = [navbardropletID, msgbottleID].join(" ")
    let bothElem = [navbardropletID, msgbottleID].join(" ")
  

    $([navbardropletID,msgbottleID].join(" ")).css('.border', '5px solid limegreen')
    // $(bothElemById).css('.border', '5px solid limegreen')

    // $('#msg-bottle').css('border', '7px solid orange')
    // $('#navbar-droplet').css('border', '7px solid hotpink')
    
    console.log('navbardropletJQ')
    console.log(navbardropletJQ)
    console.log(navbardropletID)

    console.log('msgbottleJQ')
    console.log(msgbottleJQ)
    console.log(msgbottleID)

    let droplet = $('#navbar-droplet')
    let msgbottle = $('#msg-bottle')
    console.log('droplet')
    console.log(droplet)
    console.log('msgbottle')
    console.log(msgbottle)
  }

    const testuser = { username: 'test', email: 'test', password: 'test', age: 'test' }

  return (
    <div className="navbar-container">
    <div className="logo">
    <img style={{ border: 'none'}} className={bothElemById} id="navbar-droplet" src="/water_img/small_droplet.png" />
    <img style={{ border: 'none'}} className={bothElemById} id="msg-bottle"  src="/water_img/msg-bottle.png" />

    </div>

    <img src="/water_img/panda.png"/>
      
      <div className="logo">
        {/* <Boop rotation={10} timing={150}> */}
          <img onClick={homeclick} src="/water_img/home.png" />
          <img onClick={statclick} src="/water_img/statistics.png" />
          <img onClick={settingsclick} src="/water_img/settings.png" />
          
          <LogInOutGoogle user={testuser}/>
          {/* <img src="/water_img/exit.png" /> */}
          
 
        {/* </Boop> */}
      </div>
      {/* <Profile /> */}
 
    </div>
  );
}
