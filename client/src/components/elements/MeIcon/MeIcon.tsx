import React from 'react'
import {connect} from 'react-redux'
import {useState, useEffect, useContext} from 'react'
import "./meicon.css"
import CSS from '../../../utility/CSS'
import MathRandom from '../../../utility/MathRandom'
import attributeJQ from '../../../utility/attributeJQ'
import deathCertificate from '../../../utility/deathCertificate'
import {AgeArray} from '../../../utility/UtilityValues'
import addIconToLocalStorageUser from '../../../utility/addIconToLocalStorageUser'

import Boop from '../../../utility/ParentchildParent/Boop'
import Boooooop from '../../../utility/ParentchildParent/Boooooop'
import {useImage} from '../../../utility/Contexts/ImgContext'
import {useRegex} from '../../../utility/Contexts/RegexMenu'
// import LetterLife from '../../../utility/ParentchildParent/LetterLife'
import $ from 'jquery'
import ConnectedSignupLoginChecker from '../SignupLoginChecker'
import ReusableImage from '../../../components/elements/ReusableImage'

import { SET_SPIN_BOTTLE_IMG, TOGGLE_SPIN_BOTTLE_SEARCHING, TOGGLE_SPIN_BOTTLE_SHOW_INPUT, SET_GOOGLE_IMG_URL, SET_NON_GOOGLE_IMG_URL, TOGGLE_SELECT_ICON_SCREEN, SET_PRE_SELECTED_ICON_SRC, TOGGLE_PSI_HOVER, TOGGLE_GLASS_SCREEN_B4_NAV, TOGGLE_GLASS_HALF_FULL_DB_CHOICE, TOGGLE_USER_ICON_CONFIRM, SET_LAST_ICON_SELECTION_TEXT, SET_SAVE_FOR_WEEKS_INPUT_VALUE} from '../../../redux/actions'

 function MeIcon (props:any) {

    const { boat, pants, shark, panda, bikini, turtle, dolphin, pool, target, bucket, puppetCup, cup, drink, bottle, bottles, mouseWaterCup, fullCup, confirmation, close, clock, TestUser } = useImage()

    const { RhasNums, RnoBackslash, MprePng } = useRegex()

    let img;
    let empty:string[]|undefined[] = ['empty']
    const emptyfunc = () => { return }

    useEffect( () => {
      (async() => {

      })()
      
    }, [])

    const {
       FLIP_FLOP_ICON, SPIN_BOTTLE_IMG, SPIN_BOTTLE_SEARCHING, SPIN_BOTTLE_SHOW_INPUT, GOOGLE_IMG_URL, NON_GOOGLE_IMG_URL, SELECT_ICON_SCREEN, PRE_SELECTED_ICON_SRC, PSI_HOVER, GLASS_SCREEN_B4_NAV, GLASS_HALF_FULL_DB_CHOICE, LAST_ICON_SELECTION_TEXT, SAVE_FOR_WEEKS_INPUT_VALUE,
       SET_SPIN_BOTTLE_IMG, TOGGLE_SPIN_BOTTLE_SEARCHING, TOGGLE_SPIN_BOTTLE_SHOW_INPUT, SET_GOOGLE_IMG_URL, SET_NON_GOOGLE_IMG_URL, TOGGLE_SELECT_ICON_SCREEN, SET_PRE_SELECTED_ICON_SRC, TOGGLE_PSI_HOVER, TOGGLE_GLASS_SCREEN_B4_NAV, TOGGLE_GLASS_HALF_FULL_DB_CHOICE, TOGGLE_USER_ICON_CONFIRM, SET_LAST_ICON_SELECTION_TEXT, SET_SAVE_FOR_WEEKS_INPUT_VALUE
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
                      console.log('imgSrc')
                      console.log(imgSrc)
                      SET_NON_GOOGLE_IMG_URL({ payload: imgSrc })                      
                      await SET_SPIN_BOTTLE_IMG( { payload: imgSrc })
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

        const SaveUserHalf = async (event:any) => {     
          SET_LAST_ICON_SELECTION_TEXT( {payload: "Save icon for how many Weeks?"})
             addIconToLocalStorageUser(NON_GOOGLE_IMG_URL)             
            .then( (wateruser:any) => {                
              TOGGLE_USER_ICON_CONFIRM()            
            }).catch( (err:any) => {
              console.log('err from .catch!')
            })                   
            $('.cups').detach()
            attributeJQ($('.clock'), 'src', boat)
            attributeJQ($('#boat'), 'src', clock)
            $('#boat').removeClass('Move-Boat');          
        }

        const saveForWeeksOnChange = async (event:any) => {        
          let currentUser:any = await localStorage.getItem('wateruser')
          let userJSON = await JSON.parse(currentUser)
          let preuser = JSON.parse(userJSON.value)
          let user = preuser.clone.data.userSignup
          let username = user.username
                  
          
          let value:string = event.target.value
          let key:string = event.key
          
          console.log('key')
          console.log(key)
          let oneThruNine = [1,2,3,4,5,6,7,8,9]
          // let oneThruNine = AgeArray.pop()   // from src/utility/UtilityValues        
          if (oneThruNine.includes(parseInt(key))) {
              parseInt(key) >= 4 ? SET_SAVE_FOR_WEEKS_INPUT_VALUE( { payload: 4 }) : SET_SAVE_FOR_WEEKS_INPUT_VALUE( { payload: key })
            } else {
              SET_SAVE_FOR_WEEKS_INPUT_VALUE( { payload: ' ' })
          }                  
          if (key === 'Enter') {

            console.log('key')
            console.log(`enter: ${key}`)
            console.log('NON_GOOGLE_IMG_URL')
            console.log(NON_GOOGLE_IMG_URL)
            let pre_img = NON_GOOGLE_IMG_URL.substring(NON_GOOGLE_IMG_URL.lastIndexOf('/'))
            let almost_img = pre_img.match(MprePng)
            let img = almost_img[1].replace(RnoBackslash, "")
            const dodgeJumpyTimeoutPromise = new Promise( (resolve:any, reject:any) => {
              SET_LAST_ICON_SELECTION_TEXT({ payload: `${username} ${img} dry out in ${parseInt(value) > 1 ? value : 1 } ${parseInt(value) > 1 ? 'weeks' : 'week'}`})
              let timer:any;
              resolve(timer)
              reject(empty)
            })
            dodgeJumpyTimeoutPromise
            .then( (timer:any) => {
                timer = setTimeout( () => {
                  window.location.href = "/"
                }, 2000)
            })
            
            
            // SET_LAST_ICON_SELECTION_TEXT({ payload: `${username} ${img} dry out in ${value === '4' || key === '3' || key === '2' ? key : 1 } ${parseInt(key) > 1 ? 'weeks' : 'week'}`})
          } 

          }

            

                  
        const SaveUserFull = () => {            
            const saveUserPromise = new Promise( (resolve:any, reject:any) => {
              let preUser = localStorage.getItem("user");              
              if (preUser !== null) {
                let userObj = JSON.parse(preUser);                
                let storageUserIcon:string = userObj.clone.data.userSignup.icon 
                storageUserIcon = NON_GOOGLE_IMG_URL // userObj.clone.data.userSignup.icon
                resolve(fetch(`http://localhost:5000/fill_cont?query={NonGoogleIconUpdate(id:3,icon:"${NON_GOOGLE_IMG_URL}"){id,icon}}`))
                reject(empty)
              }
            })
            saveUserPromise
            .then( (updatedUser:any) => {
              TOGGLE_USER_ICON_CONFIRM()
              // window.location.href = "/"
            }).catch( (err) => {
              
            })
        }

        const clickboat = () => {                      

        }

    const renderMeIcon = () => {
        return (
            <>
<div style={{ backgroundImage: `url('${puppetCup}')` }} className={Leftie} onMouseEnter={moveboat} onMouseLeave={dontMoveBoat}>

                    {
                          SPIN_BOTTLE_SHOW_INPUT 
                          ?
                    <img onClick={clickboat} className={ SPIN_BOTTLE_SEARCHING ? "Move-Boat" : '' } id="boat" style={{ position: 'relative', height: '10em', width: '10em' }} src={ boat || '/water_img/mouse_droplet.png'}/>
                          :
                          <div className="column">

                          <input id="PuppeteerSearch" onFocus={iFocus} onKeyDown={FakeClick} onMouseEnter={FakeFocus} style={{ color: 'blanchedalmond' }} type="text"/>
                          </div>                          
                    }

              </div>  

              <div id={SELECT_ICON_SCREEN ? "column" : ""} className={Rightie}>      
                                                            
                      {
                        SELECT_ICON_SCREEN 
                              ?                              
                              <>             
                                   {
                                GLASS_SCREEN_B4_NAV 
                                        ?
                                        <div className="SaveAllColumn">
                                          <h3 id="SavePre"> {LAST_ICON_SELECTION_TEXT ? LAST_ICON_SELECTION_TEXT : 'Save Icon? You can Edit in Settings'} </h3>
                                          <input value={SAVE_FOR_WEEKS_INPUT_VALUE || ''} style={{ display: LAST_ICON_SELECTION_TEXT.length > 1 ? '' : 'none', width: '30px', color: 'silver', fontWeight: 'bolder'}} onKeyDown={saveForWeeksOnChange} onChange={emptyfunc} type="text"/>
                                        <div className="space-between-row">                                        

                                          <img className="cups" onClick={SaveUserHalf} onMouseEnter={() => setSaveDropHover(true)} onMouseLeave={() => setSaveDropHover(false)} style={{ cursor: 'pointer', height: '100px', width: '100px' }} src={mouseWaterCup}/>                                                                          
                                          <img className="cups" onClick={SaveUserFull} style={{ cursor: 'pointer', height: '100px', width: '100px' }} src={fullCup}/>
                                          </div> 
                                            <img className="clock" src={clock}/>                                              
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
    USER_ICON_CONFIRM: state.USER_ICON_CONFIRM,
    LAST_ICON_SELECTION_TEXT: state.LAST_ICON_SELECTION_TEXT,
    SAVE_FOR_WEEKS_INPUT_VALUE: state.SAVE_FOR_WEEKS_INPUT_VALUE
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
    TOGGLE_GLASS_HALF_FULL_DB_CHOICE: () => dispatch(TOGGLE_GLASS_HALF_FULL_DB_CHOICE()),
    TOGGLE_USER_ICON_CONFIRM: () => dispatch(TOGGLE_USER_ICON_CONFIRM()),
    SET_LAST_ICON_SELECTION_TEXT: (action:any) => dispatch(SET_LAST_ICON_SELECTION_TEXT(action)),
    SET_SAVE_FOR_WEEKS_INPUT_VALUE: (action:any) => dispatch(SET_SAVE_FOR_WEEKS_INPUT_VALUE(action))    
})

const ConnectedMeIcon = connect(mapStateToProps, mapDispatchToProps)(MeIcon)

export default ConnectedMeIcon                                          
