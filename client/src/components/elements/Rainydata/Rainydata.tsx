import React, { useState } from 'react' 
import {useImage} from '../../../utility/Contexts/ImgContext'
import "./rainydata.css"
import {nothingFunc} from '../../../utility/UtilityValues'
import $ from 'jquery'

const RainyData = () => {
     
    const [peek, setPeek] = useState(false);
    const { window, curtain } = useImage();
    const [inputVal, setInputVal] = useState("city name")
    const [focusYet, setFocusYet] = useState(false)
    const [weatherCity, setWeatherCity] = useState("")

    const peeek = () => setPeek(!peek)

    const pullCurtain = () => {
        if (!peek) {
          console.log("no water peek")
          peeek()
        } else {
          peeek()
        }
    }

    const fakeChanger = (event:any) => {
        let key:string = event.key
        let value:string = event.target.value
        const valueLength:number = inputVal.length        
        console.log('key')
        console.log(key)
        const clickCondition = key === 'Backspace' || key === 'Tab' || key === 'Meta' || key === 'Control' || key === 'Shift' || key === 'Alt' || key === 'Option' || key === 'Enter'
        if (clickCondition) {
            console.log('Meta or friends')
            return
        } else { key === "Backspace" ? setInputVal(`${inputVal.slice(0, -1)}`) : setInputVal(`${inputVal}${key}`) }

    }

    


    const noValueFocus = () => { focusYet ? nothingFunc() : setInputVal('') }

    const RenderRainyData = () => {
        return (
            <>
            <img onClick={pullCurtain} className="curtain" src={peek ? window : curtain} />
            <h1 className="text"> { peek ? "Which City" : "Is it Raining Out there?" } </h1>
            <input style={{ display: peek ? "" : "none" }} onKeyDown={fakeChanger} onChange={nothingFunc} onFocus={noValueFocus} type="text" id="input-val" value={inputVal}/>
            {/* <input style={{ display: peek ? "" : "none" }}  onChange={changeHandler} onFocus={noValueFocus} type="text" id="input-val" value={inputVal}/> */}

            {/* <h1 className="text"> Is it Raining Out There ? </h1> */}
            </>
        )
    }
    return <div id="rainydata-cont"> {RenderRainyData()} </div>

}

export default RainyData
