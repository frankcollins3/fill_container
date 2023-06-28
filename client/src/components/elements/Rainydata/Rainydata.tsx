import React, { useState } from 'react' 
import {useImage} from '../../../utility/Contexts/ImgContext'
import "./rainydata.css"
import {nothingFunc} from '../../../utility/UtilityValues'
import $ from 'jquery'

const RainyData = () => {
     
    const [peek, setPeek] = useState(false);
    const { window, curtain } = useImage();
    const [lastChar, setLastChar] = useState("");
    const [inputVal, setInputVal] = useState("city name");
    const [focusYet, setFocusYet] = useState(false);
    const [weatherCity, setWeatherCity] = useState("");

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
        const clickCondition = key === 'Tab' || key === 'Meta' || key === 'Control' || key === 'Shift' || key === 'Alt' || key === 'Option' || key === 'Enter' || key === 'ArrowRight' || key === 'CapsLock'
        if (clickCondition) {
            setLastChar(key)
            return
        }
        if (lastChar === "Shift" && key === "ArrowLeft") { setInputVal("")}
        if (key === "ArrowLeft") return
        else { key === "Backspace" ? setInputVal(`${inputVal.slice(0, -1)}`) : setInputVal(`${inputVal}${key}`) }    
        setLastChar('')
    }

    const checkCityRain = () => {
        

        // const prekey = await axios.get('http://localhost:5000/fill_cont?query={ENV_WEATHER}')
        // const key = prekey.data.data.ENV_WEATHER
        // console.log('prekey')
        // console.log(prekey)
    
        // let city:string = 'bergenfield'
    
        // // get input from user on city name to be used at the end of the /locations/ query so described below:       &q=bergenfield&offset=25
    
        // const rainPROMISE = new Promise(async (resolve:any, reject:any) => {
        //   const pre_data = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}&offset=25`)    
        //   // const pre_data = await axios.get('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=CG0C6JlnXhBUOi4R9JlJILWZGyBP6LkD&q=bergenfield&offset=25')    
        //   const weatherdata = await pre_data.data[0]
        //   let locationKey:string = weatherdata.Key
      
        //   const currentLocationConditions = await  axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${key}`)      
        //   resolve(currentLocationConditions ? currentLocationConditions : "no weather conditions or no city or both")
        // })
        // rainPROMISE
        // .then( (todayCityConditions:any) => {
        //       console.log('todayCityConditions')
        //       console.log(todayCityConditions)
        //       let rainToday = todayCityConditions.data[0].HasPrecipitation
        //       console.log('rainToday')
        //       console.log(rainToday)
        // })

    }
    


    const noValueFocus = () => { focusYet ? nothingFunc() : setInputVal('') }

    const RenderRainyData = () => {
        return (
            <>
            <img onClick={pullCurtain} className="curtain" src={peek ? window : curtain} />
            <h1 className="text"> { peek ? "Which City" : "Is it Raining Out there?" } </h1>
            <input style={{ display: peek ? "" : "none" }} onKeyDown={fakeChanger} onChange={nothingFunc} onFocus={noValueFocus} type="text" id="input-val" value={inputVal}/>

    <button onClick={checkCityRain} style={{ display: peek ? "" : "none", backgroundImage: `url('${curtain}')`}}> </button>    
            </>
        )
    }
    return <div id="rainydata-cont"> {RenderRainyData()} </div>

}

export default RainyData
