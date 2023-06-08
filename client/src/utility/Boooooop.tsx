import React, { useState, useEffect } from 'react';

interface Props {
    rotateAngle: number,
    speed: number,
    children: JSX.Element,
    keepGoing: boolean
  }

//   setTimeout( () => elemCurrent.style.transform = `rotate(${rotateAngle}deg)`, speed)
//           setTimeout( () => elemCurrent.style.transform = `rotate(-${rotateAngle}deg)`, halfFassed)
//           setTimeout( () => elemCurrent.style.transform = `rotate(0)`, speed * 1.5)

  const Boooooop = ({ speed, rotateAngle, children, keepGoing }: Props) => {
    const [isRotated, setIsRotated] = useState(false);
  
    useEffect(() => {
      if (keepGoing) {
        // Apply the rotation after a short delay to allow the transition to take effect
        const timeoutId = setTimeout(() => {
          const elements = document.getElementsByClassName('boop-child');
          for (let i = 0; i < elements.length; i++) {
            const element = elements[i] as HTMLElement;
            element.style.transform = `rotate(${rotateAngle}deg)`;
            setInterval( () => element.style.transform = `rotate(-${rotateAngle}deg)`, speed / 2)
          }
        }, 10);
  
        // return () => clearTimeout(timeoutId);
      } else {
        // Reset the rotation
        const elements = document.getElementsByClassName('boop-child');
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i] as HTMLElement;
          element.style.transform = '';
        }
      }
    }, [isRotated, rotateAngle]);
  

  
    return (
      <div className="boop">
        {React.Children.map(children, (child, index) => {
          const styledChild = React.cloneElement(child, {
            className: 'boop-child',
            style: {
            //   border: '2px dotted #73defe'
            },
          });
  
          return styledChild;
        })}
      </div>
    );
  };
  
  export default Boooooop;
  