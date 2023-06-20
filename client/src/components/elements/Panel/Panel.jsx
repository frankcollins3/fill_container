import React from 'react';
import Boop from '../Boop';
import Streak from '../Streak';
import Timer from '../Timer';
import './panel.css';
import {connect} from 'react-redux'

 function Panel({ date, hydroIntake, hydroSchedule, BORDER_40_WATER_LIFE }) {


  const RenderPanel = () => {

    return (
      <>
        <div style={{ border: BORDER_40_WATER_LIFE ? " 7.5px solid #72d3fe" : "none"}} className="panel-card">
          <Boop rotation={10} timing={150}>
            <img src="/water_img/clock.png" />
          </Boop>
          <Timer hydroSchedule={hydroSchedule} />
        </div>
        <div style={{ border: BORDER_40_WATER_LIFE ? " 7.5px solid #72d3fe" : "none"}} className="panel-card">
          <Streak />
        </div>
        <div style={{ border: BORDER_40_WATER_LIFE ? " 7.5px solid #72d3fe" : "none"}} className="panel-card">
          <div>
            <Boop rotation={10} timing={150}>
              <img src="/water_img/calendar.png" />
            </Boop>
            <span style={{ color: 'silver', fontWeight: 'bolder' }}>{date}</span>
          </div>
          <div style={{ marginLeft: '10px'}}>
            <Boop rotation={10} timing={150}>
              <img src="/water_img/target.png" />
            </Boop>
            <span style={{ color: 'silver', fontWeight: 'bolder' }}>
              { hydroIntake ? hydroIntake.toFixed(3) : 0} fl oz
              {/* { hydroIntake ? hydroIntake.toFixed(3) : 0} fl oz / {(hydroIntake? hydroIntake: 0 / 8).toFixed(3) } cups */}
            </span>
          </div>
        </div>
      
      </>
    );
  } 

  return <div style={{ borderTop: BORDER_40_WATER_LIFE ? "none" : "7.5px dashed #dedede70", borderBottom: BORDER_40_WATER_LIFE ? "none" : "7.5px dashed #dedede70"}} className="panel-container"> {RenderPanel()} </div>

  }


const mapStateToProps = (state) => ({
    BORDER_40_WATER_LIFE: state.BORDER_40_WATER_LIFE
})

const ConnectedPanel = connect(mapStateToProps)(Panel)
export default ConnectedPanel
