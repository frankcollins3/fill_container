import React, { useState, useEffect } from 'react';

interface Props {
  rotateAngle: number;
  speed: number;
  children: JSX.Element;
}

const Boop = ({ rotateAngle, speed, children }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const childElement = children.props.children;

    childElement.addEventListener('mouseenter', handleMouseEnter);
    childElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      childElement.removeEventListener('mouseenter', handleMouseEnter);
      childElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [children]);

  const getTransformStyle = () => {
    if (isHovered) {
      return `rotate(${rotateAngle}deg)`;
    }
    return '';
  };

  return React.cloneElement(children, {
    style: {
      ...children.props.style,
      transform: getTransformStyle(),
      transition: `transform ${speed}ms`,
    },
  });
};

export default Boop;
