import React from 'react'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import "./meicon.css"
import CSS from '../../../utility/CSS'
import MathRandom from '../../../utility/MathRandom'
import attributeJQ from '../../../utility/attributeJQ'
import Boop from '../../../utility/ParentchildParent/Boop'
import Boooooop from '../../../utility/ParentchildParent/Boooooop'
import {useImage} from '../../../utility/Contexts/ImgContext'
// import LetterLife from '../../../utility/ParentchildParent/LetterLife'
import $ from 'jquery'
import ConnectedSignupLoginChecker from '../SignupLoginChecker'
import ReusableImage from '../../../components/elements/ReusableImage'

import { SET_SPIN_BOTTLE_IMG, TOGGLE_SPIN_BOTTLE_SEARCHING, TOGGLE_SPIN_BOTTLE_SHOW_INPUT, SET_GOOGLE_IMG_URL, SET_NON_GOOGLE_IMG_URL, TOGGLE_SELECT_ICON_SCREEN, SET_PRE_SELECTED_ICON_SRC, TOGGLE_PSI_HOVER, TOGGLE_GLASS_SCREEN_B4_NAV, TOGGLE_GLASS_HALF_FULL_DB_CHOICE } from '../../../redux/actions'


 function MeIcon (props:any) {

    const { boat, pants, shark, panda, bikini, turtle, dolphin, pool, target, bucket, puppetCup, cup, drink, bottle, bottles, mouseWaterCup, fullCup, confirmation, close, clock } = useImage()
    
    let img;

    useEffect( () => {
      (async() => {

      })()
      
    }, [])

    const {
       FLIP_FLOP_ICON, SPIN_BOTTLE_IMG, SPIN_BOTTLE_SEARCHING, SPIN_BOTTLE_SHOW_INPUT, GOOGLE_IMG_URL, NON_GOOGLE_IMG_URL, SELECT_ICON_SCREEN, PRE_SELECTED_ICON_SRC, PSI_HOVER, GLASS_SCREEN_B4_NAV, GLASS_HALF_FULL_DB_CHOICE,
       SET_SPIN_BOTTLE_IMG, TOGGLE_SPIN_BOTTLE_SEARCHING, TOGGLE_SPIN_BOTTLE_SHOW_INPUT, SET_GOOGLE_IMG_URL, SET_NON_GOOGLE_IMG_URL, TOGGLE_SELECT_ICON_SCREEN, SET_PRE_SELECTED_ICON_SRC, TOGGLE_PSI_HOVER, TOGGLE_GLASS_SCREEN_B4_NAV, TOGGLE_GLASS_HALF_FULL_DB_CHOICE,
     } = props

    const [bathingSuit, setBathingSuit] = useState<boolean>(false)
    const [moveBoat, setMoveBoat] = useState(false)
    const [flipCoin, setFlipCoin] = useState(false)
    const [saveDropHover, setSaveDropHover] = useState(false)
    // const [psiHover, setPsiHover] = useState(false)

    let googleUrl:string = props.GOOGLE_IMAGE_URL

    const Leftie = ["Left-Cont", "Cont"].join(" ")
    const Rightie = ["Right-Cont", "Cont"].join(" ")
    const PSI = $('#Pre-Selected-Icon')
    const Rejection = $('#PreSelectRejection')

        const moveboat = () =>  {
          let numbers = [1,2,3,4,5,6,7,8,9,10]
          let randomNumber = Math.floor(Math.random() * numbers.length)
          if (randomNumber >= 5) { setFlipCoin(!flipCoin) }
          setMoveBoat(true) 
        }

        const FakeClick = (event: any) => { 
          let key: string = event.key;          
          let value: string = event.target.value;

          if (key === ' ') {
            console.log('youre spacin out!')
            $('#PuppeteerSearch')
            .val('')
            attributeJQ('#PuppeteerSearch', 'value', '')         
      }
                   
          if (key === 'Enter') {            
            TOGGLE_SPIN_BOTTLE_SHOW_INPUT()
            let value:string = `lightblue${event.target.value}`                        
            const loadingicons:string[] = [cup, drink, bottle, bottles, mouseWaterCup]
                const randomIcon = MathRandom(loadingicons)
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
                      await SET_SPIN_BOTTLE_IMG( { payload: imgSrc })
                      await SET_NON_GOOGLE_IMG_URL( { payload: imgSrc })
                      await TOGGLE_SPIN_BOTTLE_SEARCHING()
                      await TOGGLE_SELECT_ICON_SCREEN()
                    } else {
                      TOGGLE_SPIN_BOTTLE_SEARCHING()
                      SET_SPIN_BOTTLE_IMG( { payload: "/water_img/bite.png"})
                    }
                })
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

        const HoverClose = () => {
          CSS($('#Pre-Selected-Icon'), 'opacity', '0.1')
          CSS($('#PreSelectConfirmation'), 'opacity', '0.1')
        }
        
        const UnHoverClose = () => {
          CSS($('#Pre-Selected-Icon'), 'opacity', '1.0')
          CSS($('#PreSelectConfirmation'), 'opacity', '1.0')
        }
        
        const FakeBoop = () => {     
          TOGGLE_PSI_HOVER()
        }        
        
        const StopBoop = () => { 
          TOGGLE_PSI_HOVER()
          CSS($('#PreSelectRejection'), 'opacity', '1.0')          
        }

        const clickElem = (event:any) => { 
          let src:string = event.target.src    
          let length:number = src.length
          let hrefCheck:string = src.slice(0, 4);
          let imgCheck:string = src.slice(length - 3, length)    
          if (hrefCheck === 'http' && imgCheck === 'png' || imgCheck === 'jpeg') {
            SET_NON_GOOGLE_IMG_URL({ payload: event.target.src }) 
            TOGGLE_SELECT_ICON_SCREEN()
            if (SPIN_BOTTLE_SHOW_INPUT) TOGGLE_SPIN_BOTTLE_SHOW_INPUT()
            $(event.target)
            .css('border', '5px solid hotpink')
            .animate({
              top: '100px'
            }, 500)       
          }
          return
        }
    
        const SelectIcon = () => {           
            TOGGLE_SPIN_BOTTLE_SEARCHING()
            TOGGLE_GLASS_SCREEN_B4_NAV()
        }

        const SaveUserHalf = async () => {
          try {
            let preUser = await localStorage.getItem("user");
            console.log('preUser')
            console.log(preUser)
            
            if (preUser !== null) {
              let userObj = JSON.parse(preUser);
              console.log('userObj')
              console.log(userObj);
              
              // Rest of your code here...
            } else {
              console.log('User data not found in localStorage.');
              // Handle the scenario when user data is not available...
            }
          } catch (error) {
            console.log('Error parsing JSON:', error);
            // Handle the error scenario...
          }
        };
            


        const SaveUserFull = () => {
            console.log("save the full user")
        }



    const renderMeIcon = () => {
        return (
            <>
<div style={{ backgroundImage: `url('${puppetCup}')` }} className={Leftie} onMouseEnter={moveboat} onMouseLeave={dontMoveBoat}>

                    {
                          SPIN_BOTTLE_SHOW_INPUT 
                          ?
                          <img className={ SPIN_BOTTLE_SEARCHING ? "Move-Boat" : '' } id="boat" style={{ position: 'relative', height: '10em', width: '10em' }} src={ boat || '/water_img/mouse_droplet.png'}/>
                          :
                          <div className="column">

                          <input id="PuppeteerSearch" onFocus={iFocus} onKeyDown={FakeClick} onMouseEnter={FakeFocus} style={{ color: 'blanchedalmond' }} type="text"/>
                          </div>                          
                    }

              </div>  
              {/* //     GLASS_SCREEN_B4_NAV: false,
    // GLASS_HALF_FULL_DB_CHOICE: false, */}
              <div id={SELECT_ICON_SCREEN ? "column" : ""} className={Rightie}>      
                                                            
                      {
                        SELECT_ICON_SCREEN 
                              ?
                              
                              <>             
                                   {
                                GLASS_SCREEN_B4_NAV 
                                        ?
                                        <div className="SaveAllColumn">
                                          <h3 id="SavePre"> Save Icon? You can Edit in Settings. </h3>
                                        <div className="space-between-row">                                        

                                          <img onClick={SaveUserHalf} onMouseEnter={() => setSaveDropHover(true)} onMouseLeave={() => setSaveDropHover(false)} style={{ cursor: 'pointer', height: '100px', width: '100px' }} src={mouseWaterCup}/>                                                                          
                                          <img onClick={SaveUserFull} style={{ cursor: 'pointer', height: '100px', width: '100px' }} src={fullCup}/>
                                          </div>                                        
                                            <img src={clock}/>

                                        </div>
                                          :                          
                                    <>                                      
                              <img className={PSI_HOVER ? "psiHoverAnimation" : ""} id="Pre-Selected-Icon" src={NON_GOOGLE_IMG_URL}/>
                                                           
                                <div className="row">
                                  <img id="PreSelectRejection" onClick={() => TOGGLE_SELECT_ICON_SCREEN() } onMouseEnter={HoverClose} onMouseLeave={UnHoverClose} style={{ margin: '0 1em', opacity: PSI_HOVER ? "0.1" : "1.0" }} src={close}></img>
                                  <img onClick={SelectIcon} id="PreSelectConfirmation" onMouseEnter={FakeBoop} onMouseLeave={FakeBoop} style={{ margin: '0 1em'}} src={confirmation}></img>
                                </div>
                                </>
                                }                 
                              </>
                              :                         
                              <>                        
                              <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
                                <img style={{ transform: `rotate(0deg)` }} src="/water_img/bottles.png" />
                                </Boop>
    
                                <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
                              <img onClick={clickElem} onMouseEnter={()=> setBathingSuit(!bathingSuit)} src={bathingSuit ? bikini: pants}></img>
                              </Boop>  
    
                            
                              <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>                      
                              <img src={shark}></img>
                              </Boop>
    
                              <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>                
                                <img src={panda}></img>
                              </Boop>

                          <div className="column">
                          <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
                        <img style={{ display: SPIN_BOTTLE_SEARCHING ? "none" : ""}}  src={SPIN_BOTTLE_IMG || target}></img>
                        </Boop>  
                          <pre style={{ display: SPIN_BOTTLE_SEARCHING ? "" : "none" }}> Pouring. Please Wait.  </pre>
                            </div>  
    
                            <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
                        <img src={turtle}></img>
                        </Boop>
                              
                        <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
                       <img src={dolphin}></img>
                        </Boop> 
    
                        <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
                        <img src={pool}></img>
                        </Boop>
                                               
                        <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN} showBoat={TOGGLE_SPIN_BOTTLE_SHOW_INPUT} boat={SPIN_BOTTLE_SHOW_INPUT}>
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
    GOOGLE_IMG_URL: state.GOOGLE_IMG_URL,
    NON_GOOGLE_IMG_URL: state.NON_GOOGLE_IMG_URL,
    SELECT_ICON_SCREEN: state.SELECT_ICON_SCREEN,
    PRE_SELECTED_ICON_SRC: state.PRE_SELECTED_ICON_SRC,
    PSI_HOVER: state.PSI_HOVER,
    GLASS_SCREEN_B4_NAV: state.GLASS_SCREEN_B4_NAV,
    GLASS_HALF_FULL_DB_CHOICE: state.GLASS_HALF_FULL_DB_CHOICE,
    // NON_GOOGLE_IMG_URL: '',                      state doesn't matter since this page is navigated. one would need redux-persist. I'm using regular redux, GraphQl/prisma/postgres and localStorage to persist
})

const mapDispatchToProps = (dispatch:any) => ({
    SET_SPIN_BOTTLE_IMG: (action:any) => dispatch(SET_SPIN_BOTTLE_IMG(action)),
    TOGGLE_SPIN_BOTTLE_SEARCHING: () => dispatch(TOGGLE_SPIN_BOTTLE_SEARCHING()),
    TOGGLE_SPIN_BOTTLE_SHOW_INPUT: () => dispatch(TOGGLE_SPIN_BOTTLE_SHOW_INPUT()),
    SET_GOOGLE_IMG_URL: (action:any) => dispatch(SET_GOOGLE_IMG_URL(action)),
    SET_NON_GOOGLE_IMG_URL: (action:any) => dispatch(SET_NON_GOOGLE_IMG_URL(action)),    
    TOGGLE_SELECT_ICON_SCREEN: () => dispatch(TOGGLE_SELECT_ICON_SCREEN()),
    SET_PRE_SELECTED_ICON_SRC: (action:any) => dispatch(SET_PRE_SELECTED_ICON_SRC(action)),
    TOGGLE_PSI_HOVER: () => dispatch(TOGGLE_PSI_HOVER()),
    TOGGLE_GLASS_SCREEN_B4_NAV: () => dispatch(TOGGLE_GLASS_SCREEN_B4_NAV()),
    TOGGLE_GLASS_HALF_FULL_DB_CHOICE: () => dispatch(TOGGLE_GLASS_HALF_FULL_DB_CHOICE())
})

const ConnectedMeIcon = connect(mapStateToProps, mapDispatchToProps)(MeIcon)

export default ConnectedMeIcon                                          
