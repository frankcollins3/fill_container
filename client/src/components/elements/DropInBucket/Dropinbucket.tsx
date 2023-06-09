import "./dropinbucket.css"
import {useImage} from '../../../utility/Contexts/ImgContext'
import React from 'react'

export default function Dropinbucket () {
    const { bucket, mouseDroplet } = useImage() 

    const renderDropinbucket = () => {
        return (
            <>  
                <div className="center-cont">
                <img id="loadingdroplet" src={mouseDroplet}/>
                </div>

                <div className="center-cont">
                <img id="loadingbucket"  src={bucket}/>
                <pre style={{ color: 'silver', fontWeight: 'bolder'}}> Just a Drop in the Bucket </pre>
                </div>
            </>
        )
    }

    return <div className="dropinbucket-cont"> {renderDropinbucket()} </div>
}