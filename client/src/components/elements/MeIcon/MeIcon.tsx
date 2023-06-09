import React from 'react'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import "./meicon.css"
import CSS from '../../../utility/CSS'
import MathRandom from '../../../utility/MathRandom'
import Boop from '../../../utility/ParentchildParent/Boop'
import Boooooop from '../../../utility/ParentchildParent/Boooooop'
import {useImage} from '../../../utility/ImgContext'
// import LetterLife from '../../../utility/ParentchildParent/LetterLife'
import $ from 'jquery'
import ConnectedSignupLoginChecker from '../SignupLoginChecker'

import { SET_SPIN_BOTTLE_IMG, TOGGLE_SPIN_BOTTLE_SEARCHING, TOGGLE_SPIN_BOTTLE_SHOW_INPUT} from '../../../redux/actions'


 function MeIcon (props:any) {

    const { boat, pants, shark, panda, bikini, turtle, dolphin, pool, target, bucket, puppetCup, cup, drink, bottle, bottles, mouseWaterCup, puppeteerSearchTerms } = useImage()
    
    let img;

    useEffect( () => {
      (async() => {
        

      })()
      
    }, [])

    const {
       FLIP_FLOP_ICON, SPIN_BOTTLE_IMG, SPIN_BOTTLE_SEARCHING, SPIN_BOTTLE_SHOW_INPUT,
       SET_SPIN_BOTTLE_IMG, TOGGLE_SPIN_BOTTLE_SEARCHING, TOGGLE_SPIN_BOTTLE_SHOW_INPUT,
     } = props


    const [bathingSuit, setBathingSuit] = useState<boolean>(false)
    const [moveBoat, setMoveBoat] = useState(false)
    const [flipCoin, setFlipCoin] = useState(false)

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
      if (randomNumber >= 5) {
        
        setFlipCoin(!flipCoin)
      }
      setMoveBoat(true) 
    }

    const TextInput = (event:any) => {
        TOGGLE_SPIN_BOTTLE_SHOW_INPUT()
      let value:string = `lightblue${event.target.value}`
      console.log('value')
      console.log(value)
      
      const loadingicons:string[] = [cup, drink, bottle, bottles, mouseWaterCup]
          const randomIcon = MathRandom(loadingicons)
          console.log('randomIcon')
          console.log(randomIcon)  
          const PuppetPromise = new Promise( (resolve, reject) => {
            let terms:string[] = ["blue-ocean", "blue-water", "blue-river", "blue-seacreature", "blue-fish", "blue-octopus", "blue-shark", ]
            let randomTerm = MathRandom(terms)
            console.log(randomTerm)
              TOGGLE_SPIN_BOTTLE_SEARCHING()
              resolve(fetch(`http://localhost:5000/fill_cont?query={puppeteer(searchTerm:"light-blue-${value}")}`))    
              // resolve(fetch(`http://localhost:5000/fill_cont?query={puppeteer(searchTerm:"${MathRandom(puppeteerSearchTerms)}")}`))    
              reject(SET_SPIN_BOTTLE_IMG( { payload: randomIcon || '/water_img/squid.png' }))  
          })
          PuppetPromise.then(async (data:any) => {
              if (data) {
                data = await data.json()
                console.log('data')
                console.log(data)
                let imgSrc:string = data.data.puppeteer
                SET_SPIN_BOTTLE_IMG( { payload: imgSrc })
                TOGGLE_SPIN_BOTTLE_SEARCHING()
              } else {
                TOGGLE_SPIN_BOTTLE_SEARCHING()
                SET_SPIN_BOTTLE_IMG( { payload: "/water_img/bite.png"})
              }
          })
        }

        const FakeClick = (event:any) => { 
          let key:string = event.key
          console.log('key')
          console.log(key)

          let value:string = event.target.value
          console.log('value')
          console.log(value)

          if (event.target.value === 'Enter') {
            console.log(`enter us hitting: ${value}`)
            event.target.click() 
          }
        }

        const FakeFocus = (event:any) => {
          let myElement = document.getElementById(event.target.id)
          myElement !== null ? myElement.focus() : console.log(myElement)        
        }
        const iFocus = (event:any) => {
          event.target.style.border = "1px dashed #73defe";
        }

  
    const dontMoveBoat = () =>  setMoveBoat(false) 

    const renderMeIcon = () => {
        return (
            <>
<div style={{ backgroundImage: `url('${puppetCup}')` }} className={Leftie} onMouseEnter={moveboat} onMouseLeave={dontMoveBoat}>

{/* <div style={{ height: '100%', width: '100%', backgroundImage: `url('${puppetCup}')`, backgroundRepeat: 'no-repeat' }}> */}
                    {
                          SPIN_BOTTLE_SHOW_INPUT 
                          ?
                          <div className="column">

                          <input id="PuppeteerSearch" onFocus={iFocus} onChange={FakeClick} onMouseEnter={FakeFocus} style={{ color: 'blanchedalmond' }} type="text"/>
                          </div>
                          :
                          <img className={ SPIN_BOTTLE_SEARCHING ? "Move-Boat" : '' } id="boat" style={{ position: 'relative', height: '10em', width: '10em' }} src={ boat || '/water_img/mouse_droplet.png'}/>
                          
                    }

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
    SPIN_BOTTLE_SHOW_INPUT: state.SPIN_BOTTLE_SHOW_INPUT,
    SPIN_BOTTLE_SEARCHING: state.SPIN_BOTTLE_SEARCHING,
    // NON_GOOGLE_IMG_URL: '',                      state doesn't matter since this page is navigated. one would need redux-persist. I'm using regular redux, GraphQl/prisma/postgres and localStorage to persist
})

const mapDispatchToProps = (dispatch:any) => ({
    SET_SPIN_BOTTLE_IMG: (action:any) => dispatch(SET_SPIN_BOTTLE_IMG(action)),
    TOGGLE_SPIN_BOTTLE_SEARCHING: () => dispatch(TOGGLE_SPIN_BOTTLE_SEARCHING()),
    TOGGLE_SPIN_BOTTLE_SHOW_INPUT: () => dispatch(TOGGLE_SPIN_BOTTLE_SHOW_INPUT())
})

const ConnectedMeIcon = connect(mapStateToProps, mapDispatchToProps)(MeIcon)

export default ConnectedMeIcon
                            
                        

                


                 


             


         
                    
                                     
              
