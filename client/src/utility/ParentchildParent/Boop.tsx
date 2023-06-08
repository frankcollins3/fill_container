import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery'

interface Props {
  rotateAngle: number,
  speed: number,
  children: JSX.Element
}

const Boop = ({ rotateAngle, speed, children }: Props) => {
  
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
    targetElemRef.current = event.target
    setIsRotated(true);
  };

  const boopBehaviorLeave = () => {
    setIsRotated(false);
  };

  return (
    <div className="boop">
      {React.Children.map(children, (child, index) => {
        const styledChild = React.cloneElement(child, {
          className: 'boop-child',
          style: {
            margin: 0
          },
          onMouseEnter: boopBehaviorEnter,
          onMouseLeave: boopBehaviorLeave
        });

        return styledChild;
      })}
    </div>
  );
};

export default Boop;
