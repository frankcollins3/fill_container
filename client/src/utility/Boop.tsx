import React, { useState, useEffect } from 'react';
import $ from 'jquery'

interface Props {
  rotateAngle: number,
  speed: number,
  children: JSX.Element
}

const Boop = ({ rotateAngle, speed, children }: Props) => {
  const [isRotated, setIsRotated] = useState(false);

  useEffect(() => {
    let halfFassed:number = speed / 2 
    if (isRotated) {
      // Apply the rotation after a short delay to allow the transition to take effect
      const timeoutId = setTimeout(() => {
        const elements = document.getElementsByClassName('boop-child');
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i] as HTMLElement;
          element.style.transform = `rotate(${rotateAngle}deg)`;
          setTimeout( () => element.style.transform = `rotate(-${rotateAngle}deg)`, halfFassed)
          setTimeout( () => element.style.transform = `rotate(0)`, speed)
          

        }
      }, 10);

      return () => clearTimeout(timeoutId);
    } else {
      // Reset the rotation
      const elements = document.getElementsByClassName('boop-child');
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement;
        element.style.transform = '';
      }
    }
  }, [isRotated, rotateAngle]);

  const boopBehaviorEnter = () => {
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
