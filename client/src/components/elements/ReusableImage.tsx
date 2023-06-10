import React from 'react'
export default function ReusableImage( src:string, size:number, unit:string, className:string|undefined, id:string|undefined, func:any, event:string ) { 

    const nothing = () => {return}

    return <img src={src} className={className ? className : ""} id={ id ? id : ""} 
    style={{ height: unit === 'absolute' ? `${size}em` : `${size}px`, width: unit === 'absolute' ? `${size}em` : `${size}px` }}
    onClick={event === 'click' ? func : nothing} onDoubleClick={event.toLowerCase() === 'doubleclick' ? func : nothing}
     onMouseEnter={event.toLowerCase() === 'mouseenter' ? func : nothing} onMouseLeave={event.toLowerCase() === 'mouseleave' ? func : nothing} onMouseMove={event.toLowerCase() === 'mousemove' ? func : nothing} 
    /> 
}