import React, { useState } from 'react' 
import {useImage} from '../../../utility/Contexts/ImgContext'
import "./rainydata.css"
import {nothingFunc} from '../../../utility/UtilityValues'
import $ from 'jquery'

const RainyData = () => {
     
    const [peek, setPeek] = useState(false);
    const { window, curtain } = useImage();
    const [inputVal, setInputVal] = useState("city name")

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
        console.log('key')
        console.log(key)

        console.log('value')
        console.log(value)

    }

    const noValueFocus = () => { setInputVal('') }

    const RenderRainyData = () => {
        return (
            <>
            <img onClick={pullCurtain} className="curtain" src={peek ? window : curtain} />
            <h1 className="text"> { peek ? "Which City" : "Is it Raining Out there?" } </h1>
            <input onKeyDown={fakeChanger} onChange={nothingFunc} onFocus={noValueFocus} type="text" id="input-val" value={inputVal}/>
            {/* <h1 className="text"> Is it Raining Out There ? </h1> */}
            </>
        )
    }
    return <div id="rainydata-cont"> {RenderRainyData()} </div>

}

export default RainyData
