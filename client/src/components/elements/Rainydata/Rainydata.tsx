import React from 'react' 
import {useImage} from '../../../utility/Contexts/ImgContext'
import "./rainydata.css"

const RainyData = () => {

    const { window } = useImage();

    const RenderRainyData = () => {
        return (
            <>
            <img src={window} />
            <h6> Is it Raining Out There ? </h6>
            </>
        )
    }
    return <div className="rainydata-cont"> {RenderRainyData()} </div>

}

export default RainyData