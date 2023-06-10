import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery'

interface Props {
  rotateAngle: number,
  speed: number,
  children: JSX.Element,
  setImg: any
  iconScreenFlag: any,
  showBoat: any,
  boat: boolean
}

const Boop = ({ rotateAngle, speed, children, setImg, iconScreenFlag, showBoat, boat }: Props) => {
  
  const targetElemRef:any = useRef(null)

  const [isRotated, setIsRotated] = useState(false);


  useEffect(() => {
    let halfFassed:number = speed / 2 
    if (isRotated) {
      // Apply the rotation after a short delay to allow the transition to take effect
      const timeoutId = setTimeout(() => {
        // targetElemRef.current ? targetElemRef.current.style.border = "5px solid green" : []
        let elemCurrent = targetElemRef.current
        if (elemCurrent) {
          setTimeout( () => elemCurrent.style.transform = `rotate(${rotateAngle}deg)`, speed)
          setTimeout( () => elemCurrent.style.transform = `rotate(-${rotateAngle}deg)`, halfFassed)
          setTimeout( () => elemCurrent.style.transform = `rotate(0)`, speed * 1.5)
        } else {
          return
        }                  
      }, 5);
      return () => clearTimeout(timeoutId);
    } else {
      return
    }
  }, [isRotated, rotateAngle]);

  const boopBehaviorEnter = (event:any) => {
    let src:string = event.target.src
    targetElemRef.current = event.target
    let backSlice = src.slice(src.length - 20) 
    let url:string = src.slice(0, src.length - 19)
    let newurl:string = `${url}water_img/bikini.png`    
    let imagepath = src.slice()
    setIsRotated(true);
      if (backSlice === '/water_img/pants.png') {
        console.log("hey were over here")
        $(event.target).attr('src', `${url}water_img/bikini.png`)
      }
    }
  

  const boopBehaviorLeave = () => { setIsRotated(false); };

  const elemClick = (event:any) => { 
    let src:string = event.target.src    
    console.log('src')
    console.log(src)
    let length:number = src.length
    let hrefCheck:string = src.slice(0, 4);
    let imgCheck:string = src.slice(length - 3, length)    
    if (hrefCheck === 'http' && imgCheck === 'png' || imgCheck === 'jpeg') {
      setImg({ payload: event.target.src }) 
      iconScreenFlag()
      if (boat === false) showBoat()
      $(event.target)
      .css('border', '5px solid hotpink')
      .animate({
        top: '100px'
      }, 500)       
    }
    return
  }

  return (
    <div className="boop">
      {React.Children.map(children, (child, index) => {
        const styledChild = React.cloneElement(child, {
          className: 'boop-child',
          style: {
            margin: 0
          },
          onMouseEnter: boopBehaviorEnter,
          onMouseLeave: boopBehaviorLeave,
          onClick: elemClick
        });

        return styledChild;
      })}
    </div>
  );
};

export default Boop;
