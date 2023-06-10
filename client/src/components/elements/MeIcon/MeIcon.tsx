import React from 'react'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import "./meicon.css"
import CSS from '../../../utility/CSS'
import MathRandom from '../../../utility/MathRandom'
import attributeJQ from '../../../utility/attributeJQ'
import Boop from '../../../utility/ParentchildParent/Boop'
import Boooooop from '../../../utility/ParentchildParent/Boooooop'
import {useImage} from '../../../utility/ImgContext'
// import LetterLife from '../../../utility/ParentchildParent/LetterLife'
import $ from 'jquery'
import ConnectedSignupLoginChecker from '../SignupLoginChecker'
import ReusableImage from '../../../components/elements/ReusableImage'

import { SET_SPIN_BOTTLE_IMG, TOGGLE_SPIN_BOTTLE_SEARCHING, TOGGLE_SPIN_BOTTLE_SHOW_INPUT, SET_GOOGLE_IMG_URL, SET_NON_GOOGLE_IMG_URL, TOGGLE_SELECT_ICON_SCREEN, SET_PRE_SELECTED_ICON_SRC } from '../../../redux/actions'


 function MeIcon (props:any) {

    const { boat, pants, shark, panda, bikini, turtle, dolphin, pool, target, bucket, puppetCup, cup, drink, bottle, bottles, mouseWaterCup, puppeteerSearchTerms, ReusableImageObject } = useImage()
    
    let img;

    useEffect( () => {
      (async() => {

      })()
      
    }, [])

    const {
       FLIP_FLOP_ICON, SPIN_BOTTLE_IMG, SPIN_BOTTLE_SEARCHING, SPIN_BOTTLE_SHOW_INPUT, GOOGLE_IMG_URL, NON_GOOGLE_IMG_URL, SELECT_ICON_SCREEN, PRE_SELECTED_ICON_SRC,
       SET_SPIN_BOTTLE_IMG, TOGGLE_SPIN_BOTTLE_SEARCHING, TOGGLE_SPIN_BOTTLE_SHOW_INPUT, SET_GOOGLE_IMG_URL, SET_NON_GOOGLE_IMG_URL, TOGGLE_SELECT_ICON_SCREEN, SET_PRE_SELECTED_ICON_SRC,
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

    const moveboat = () =>  {
      let numbers = [1,2,3,4,5,6,7,8,9,10]
      let randomNumber = Math.floor(Math.random() * numbers.length)
      if (randomNumber >= 5) { setFlipCoin(!flipCoin) }
      setMoveBoat(true) 
    }

        const FakeClick = (event: any) => { 
          let key: string = event.key;
          console.log('key');
          console.log(key);
        
          let value: string = event.target.value;
          console.log('value');
          console.log(value);

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
                      SET_NON_GOOGLE_IMG_URL( { payload: imgSrc })
                      TOGGLE_SPIN_BOTTLE_SEARCHING()
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

        const clickboat = () => {
            // console.log('FLIP_FLOP_ICON')
            // console.log(FLIP_FLOP_ICON)

            // console.log('GOOGLE_IMG_URL')
            // console.log(GOOGLE_IMG_URL)          
            console.log('NON_GOOGLE_IMG_URL')
            console.log(NON_GOOGLE_IMG_URL)
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
                              <img src={NON_GOOGLE_IMG_URL}/>
                              :
                              <>                        
                              <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL} iconScreenFlag={TOGGLE_SELECT_ICON_SCREEN}>
                                <img style={{ transform: `rotate(0deg)` }} src="/water_img/bottles.png" />
                                </Boop>
    
                              {/* <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL}>                         
                              <img onMouseEnter={()=> setBathingSuit(!bathingSuit)} src={bathingSuit ? bikini: pants}></img>
                              </Boop>  
    
                            
                        <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL}>                        
                              <img src={shark}></img>
                              </Boop>
    
                            <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL}>                        
                                <img src={panda}></img>
                              </Boop>
                          <div className="column">
                        <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL}>                        
                        <img style={{ display: SPIN_BOTTLE_SEARCHING ? "none" : ""}}  src={SPIN_BOTTLE_IMG || target}></img>
                        </Boop>  
                          <pre style={{ display: SPIN_BOTTLE_SEARCHING ? "" : "none" }}> Pouring. Please Wait.  </pre>
                            </div>  
    
                        <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL}>                        
                        <img src={turtle}></img>
                        </Boop>
                              
                      <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL}>                        
                       <img src={dolphin}></img>
                        </Boop> 
    
                        <Boop rotateAngle={45} speed={800} setImg={SET_NON_GOOGLE_IMG_URL}>                        
                        <img src={pool}></img>
                        </Boop> */}
                     
                          
                        <img src={bucket}></img>
                          
                          {/* <Boop rotateAngle={45} speed={800} setImg={SET_GOOGLE_IMG_URL}>                        
                        <img src={bucket}></img>
                          </Boop>    */}
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
    PRE_SELECTED_ICON_SRC: state.PRE_SELECTED_ICON_SRC
    // NON_GOOGLE_IMG_URL: '',                      state doesn't matter since this page is navigated. one would need redux-persist. I'm using regular redux, GraphQl/prisma/postgres and localStorage to persist
})

const mapDispatchToProps = (dispatch:any) => ({
    SET_SPIN_BOTTLE_IMG: (action:any) => dispatch(SET_SPIN_BOTTLE_IMG(action)),
    TOGGLE_SPIN_BOTTLE_SEARCHING: () => dispatch(TOGGLE_SPIN_BOTTLE_SEARCHING()),
    TOGGLE_SPIN_BOTTLE_SHOW_INPUT: () => dispatch(TOGGLE_SPIN_BOTTLE_SHOW_INPUT()),
    SET_GOOGLE_IMG_URL: (action:any) => dispatch(SET_GOOGLE_IMG_URL(action)),
    SET_NON_GOOGLE_IMG_URL: (action:any) => dispatch(SET_NON_GOOGLE_IMG_URL(action)),    
    TOGGLE_SELECT_ICON_SCREEN: () => dispatch(TOGGLE_SELECT_ICON_SCREEN()),
    SET_PRE_SELECTED_ICON_SRC: (action:any) => dispatch(SET_PRE_SELECTED_ICON_SRC(action))
})

const ConnectedMeIcon = connect(mapStateToProps, mapDispatchToProps)(MeIcon)

export default ConnectedMeIcon
                            
                        

                


                 


             


         
                    
                                     
              
