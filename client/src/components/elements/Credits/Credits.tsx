import React from 'react';
import './credits.css';
import { connect, useDispatch } from 'react-redux'

import {TOGGLE_FLIP_FLOP_ICON} from "../../../redux/actions"

  function Credits( props: any ) {

  const {
    FLIP_FLOP_ICON, ICON_NOT_INPUT,
    TOGGLE_FLIP_FLOP_ICON
  } = props

  console.log(FLIP_FLOP_ICON)
  console.log(ICON_NOT_INPUT)

  const stateToggle = () => {
    TOGGLE_FLIP_FLOP_ICON()
  }

  const RenderCredits = () => {

    return (
      <>
      <div>          
            <img src="water_img/bottle.png" />          
        </div>
  
        <div>
          {/* <a href="https://github.com/WAPP-Water-App">
          </a> */}
            
            {
          window.location.pathname === "/loginoutgoogle" && ICON_NOT_INPUT ? (
            <img style={ { opacity: FLIP_FLOP_ICON ? "1.0" : "0.333"}}
            onClick={stateToggle} src="/water_img/sandals.png" />
          ) : (
            <div></div>
          )
           }


        </div>
        <div>
          <ul>
            <img src="water_img/small_droplet.png"/>
  
          </ul>
        </div>  
      </>
    );

  } 

  return <div className="credits-container">{RenderCredits()}</div>

}
  

  const mapStateToProps = (state:any) => ({
    FLIP_FLOP_ICON: state.FLIP_FLOP_ICON,
    ICON_NOT_INPUT: state.ICON_NOT_INPUT
})

  const mapDispatchToProps = (dispatch:any) => ({
    TOGGLE_FLIP_FLOP_ICON: () => dispatch(TOGGLE_FLIP_FLOP_ICON())
  })

   
  const ConnectedCredits = connect(mapStateToProps,mapDispatchToProps)(Credits)

  export default ConnectedCredits
