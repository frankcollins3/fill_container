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


 function MeIcon (props:any) {

    const { boat, pants, shark, panda, bikini, turtle, dolphin, pool, target, bucket  } = useImage()
    
    let img;

    useEffect( () => {
      (async() => {
        

      })()
      
    }, [])

    const { FLIP_FLOP_ICON } = props
    const boat2= `/water_img/`


    const [bathingSuit, setBathingSuit] = useState<boolean>(false)


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


    const renderMeIcon = () => {
        return (
            <>
              <div
              className={Leftie}>
                    <img style={{  height: '10em', width: '10em' }} src={ boat || '/water_img/mouse_droplet.png'}/>
                    {/* <img style={{  height: '10em', width: '10em' }} src="/water_img/boat.png"/> */}
              </div>  
                    {/* if there is a current user and they hover over the icon it will become a window so one can see into the profile  */}

              <div className={Rightie}>                        
                    {
                      FLIP_FLOP_ICON
                            ?
                            <div>
                              
                            <Boooooop rotateAngle={45} speed={800} keepGoing={FLIP_FLOP_ICON}>
                            <img onClick={test} style={{ transform: `rotate(0deg)` }} src="/water_img/bottles.png" />
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
                    <img src={turtle}></img>
                    </Boooooop>

                    <Boooooop rotateAngle={45} speed={800} keepGoing={FLIP_FLOP_ICON}>                        
                   <img src={dolphin}></img>
                    </Boooooop> 

                    <Boooooop rotateAngle={45} speed={800} keepGoing={FLIP_FLOP_ICON}>                        
                    <img src={pool}></img>
                    </Boooooop>
                                        
                    <Boooooop rotateAngle={45} speed={800} keepGoing={FLIP_FLOP_ICON}>                        
                    <img src={target}></img>
                    </Boooooop>

                    <Boooooop rotateAngle={45} speed={800} keepGoing={FLIP_FLOP_ICON}>                        
                    <img src={bucket}></img>
                    </Boooooop>   
                            </div>
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

                    <Boop rotateAngle={45} speed={800}>                        
                    <img src={turtle}></img>
                    </Boop>
                          
                  <Boop rotateAngle={45} speed={800}>                        
                   <img src={dolphin}></img>
                    </Boop> 

                    <Boop rotateAngle={45} speed={800}>                        
                    <img src={pool}></img>
                    </Boop>

                    <Boop rotateAngle={45} speed={800} >                        
                    <img src={target}></img>
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
    FLIP_FLOP_ICON: state.FLIP_FLOP_ICON
    // NON_GOOGLE_IMG_URL: '',                      state doesn't matter since this page is navigated. one would need redux-persist. I'm using regular redux, GraphQl/prisma/postgres and localStorage to persist
})

const ConnectedMeIcon = connect(mapStateToProps)(MeIcon)

export default ConnectedMeIcon
