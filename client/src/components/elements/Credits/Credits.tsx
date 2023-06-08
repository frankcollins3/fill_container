import React from 'react';
import './credits.css';
import { connect } from 'react-redux'

  function Credits( props: any ) {

  const { FLIP_FLOP_ICON, ICON_NOT_INPUT } = props

  console.log(FLIP_FLOP_ICON)
  console.log(ICON_NOT_INPUT)

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
          window.location.pathname === "/loginoutgoogle" ? (
            <img src="/water_img/sandals.png" />
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

   
  const ConnectedCredits = connect(mapStateToProps)(Credits)

  export default ConnectedCredits
