import React from 'react'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import "./meicon.css"
import CSS from '../../../utility/CSS'
import Boop from '../../../utility/ParentchildParent/Boop'
import Boooooop from '../../../utility/ParentchildParent/Boooooop'
import {useImage} from '../../../utility/ImgContext'
// import LetterLife from '../../../utility/ParentchildParent/LetterLife'
import $ from 'jquery'
import ConnectedSignupLoginChecker from '../SignupLoginChecker'

import { SET_SPIN_BOTTLE_IMG, TOGGLE_SPIN_BOTTLE_SEARCHING,} from '../../../redux/actions'


 function MeIcon (props:any) {

    const { boat, pants, shark, panda, bikini, turtle, dolphin, pool, target, bucket, puppetCup } = useImage()
    
    let img;

    useEffect( () => {
      (async() => {
        

      })()
      
    }, [])

    const {
       FLIP_FLOP_ICON, SPIN_BOTTLE_IMG, SPIN_BOTTLE_SEARCHING,
       SET_SPIN_BOTTLE_IMG, TOGGLE_SPIN_BOTTLE_SEARCHING,
     } = props

    const boat2= `/water_img/`


    const [bathingSuit, setBathingSuit] = useState<boolean>(false)
    const [moveBoat, setMoveBoat] = useState(false)
    const [flipCoin, setFlipCoin] = useState(false)
    const boatClassArr = ['Move-Boat', 'Move-BoatR']


    let googleUrl:string = props.GOOGLE_IMAGE_URL

    const Leftie = ["Left-Cont", "Cont"].join(" ")
    const Rightie = ["Right-Cont", "Cont"].join(" ")


    const LetterLift= ({ children }: { children: JSX.Element }) => {
        return (
          <div className="boop">
            {React.Children.map(children, (child, index) => {
                const styledChild = React.cloneElement(child, {
                    style: {
                        border: '5px solid green'
                    },

                });
                
              return styledChild;
            })}
          </div>
        );
      }

    // const LetterLift = ({ children}: { children: JSX.Element}) => {
    //     return (
    //         <div>
    //             {React.Children.map(children, (child, index) => {
    //                 const styledChild =React.cloneElement(child, {
    //                     style; {
    //                         border: '5px solid orange'
    //                     },

    //                 });
    //                 return styledChild
    //             })}
    //         </div>
    //     )
    // }

    const test = () => {
        
    }

    const moveboat = () =>  {
      let numbers = [1,2,3,4,5,6,7,8,9,10]
      let randomNumber = Math.floor(Math.random() * numbers.length)
      console.log('randomNumber')
      console.log(randomNumber)
      console.log('flipCoin')
      console.log(flipCoin)
      if (randomNumber >= 5) {
        
        setFlipCoin(!flipCoin)
      }
      setMoveBoat(true) 
    }
    

    const dontMoveBoat = () =>  setMoveBoat(false) 

    const renderMeIcon = () => {
        return (
            <>
<div style={{ backgroundImage: `url('${puppetCup}')` }} className={Leftie} onMouseEnter={moveboat} onMouseLeave={dontMoveBoat}>

{/* <div style={{ height: '100%', width: '100%', backgroundImage: `url('${puppetCup}')`, backgroundRepeat: 'no-repeat' }}> */}
                    <img className={ SPIN_BOTTLE_SEARCHING ? "Move-Boat" : '' } id="boat" style={{ position: 'relative', height: '10em', width: '10em' }} src={ boat || '/water_img/mouse_droplet.png'}/>

              </div>  
                    {/* if there is a current user and they hover over the icon it will become a window so one can see into the profile  */}

              <div className={Rightie}>                        
              
                    {
                      FLIP_FLOP_ICON
                            ?
                            <>

                              
                            <Boooooop rotateAngle={45} speed={800} keepGoing={FLIP_FLOP_ICON}>
                            <img style={{ transform: `rotate(0deg)` }} src="/water_img/bottles.png" />
                            </Boooooop>

                          <Boooooop rotateAngle={45} speed={800} keepGoing={FLIP_FLOP_ICON}>                         
                          <img onMouseEnter={()=> setBathingSuit(!bathingSuit)} src={bathingSuit ? bikini: pants}></img>
                          </Boooooop>  

                          <Boooooop rotateAngle={45} speed={800} keepGoing={FLIP_FLOP_ICON}>                        
                    <img src={shark}></img>
                          </Boooooop>

                    <Boooooop rotateAngle={45} speed={800} keepGoing={FLIP_FLOP_ICON}>                        
                    <img src={panda}></img>
                    </Boooooop>

                    <Boooooop rotateAngle={45} speed={800} keepGoing={FLIP_FLOP_ICON}>                        
                    <img src={target}></img>
                    </Boooooop>

                    <Boooooop rotateAngle={45} speed={800} keepGoing={FLIP_FLOP_ICON}>                        
                    <img src={turtle}></img>
                    </Boooooop>

                    <Boooooop rotateAngle={45} speed={800} keepGoing={FLIP_FLOP_ICON}>                        
                   <img src={dolphin}></img>
                    </Boooooop> 

                    <Boooooop rotateAngle={45} speed={800} keepGoing={FLIP_FLOP_ICON}>                        
                    <img src={pool}></img>
                    </Boooooop>
                                        

                    <Boooooop rotateAngle={45} speed={800} keepGoing={FLIP_FLOP_ICON}>                        
                    <img src={bucket}></img>
                    </Boooooop>   
                            </>
                            :                        
                        <>                        
                          <Boop rotateAngle={45} speed={800}>
                            <img onClick={test} style={{ transform: `rotate(0deg)` }} src="/water_img/bottles.png" />
                            </Boop>

                          <Boop rotateAngle={45} speed={800}>                         
                          <img onMouseEnter={()=> setBathingSuit(!bathingSuit)} src={bathingSuit ? bikini: pants}></img>
                          </Boop>  

                        
                    <Boop rotateAngle={45} speed={800}>                        
                    <img src={shark}></img>
                          </Boop>

                        <Boop rotateAngle={45} speed={800}>                        
                            <img src={panda}></img>
                          </Boop>
                      <div className="column">
                    <Boop rotateAngle={45} speed={800} >                        
                    <img style={{ display: SPIN_BOTTLE_SEARCHING ? "none" : ""}}  src={SPIN_BOTTLE_IMG || target}></img>
                    </Boop>  
                      <pre style={{ display: SPIN_BOTTLE_SEARCHING ? "" : "none" }}> Pouring. Please Wait.  </pre>
                        </div>  

                    <Boop rotateAngle={45} speed={800}>                        
                    <img src={turtle}></img>
                    </Boop>
                          
                  <Boop rotateAngle={45} speed={800}>                        
                   <img src={dolphin}></img>
                    </Boop> 

                    <Boop rotateAngle={45} speed={800}>                        
                    <img src={pool}></img>
                    </Boop>
                 
                      <Boop rotateAngle={45} speed={800}>                        
                    <img src={bucket}></img>
                      </Boop>   
                        
                      </>
                            }
            </div>  
            </>
        )
    }

    return <div className="MeIcon-Container"> {renderMeIcon()} </div>
}

const mapStateToProps = (state:any) => ({
    ICON_NOT_INPUT: state.ICON_NOT_INPUT,
    FLIP_FLOP_ICON: state.FLIP_FLOP_ICON,
    SPIN_BOTTLE_IMG: state.SPIN_BOTTLE_IMG,
    SPIN_BOTTLE_SEARCHING: state.SPIN_BOTTLE_SEARCHING,
    // NON_GOOGLE_IMG_URL: '',                      state doesn't matter since this page is navigated. one would need redux-persist. I'm using regular redux, GraphQl/prisma/postgres and localStorage to persist
})

const mapDispatchToProps = (dispatch:any) => ({
    SET_SPIN_BOTTLE_IMG: (action:any) => dispatch(SET_SPIN_BOTTLE_IMG(action)),
    TOGGLE_SPIN_BOTTLE_SEARCHING: () => dispatch(TOGGLE_SPIN_BOTTLE_SEARCHING())
})

const ConnectedMeIcon = connect(mapStateToProps, mapDispatchToProps)(MeIcon)

export default ConnectedMeIcon
                            
                        

                


                 


             


         
                    
                                     
              
