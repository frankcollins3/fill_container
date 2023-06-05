import React from 'react'
import {connect} from 'react-redux'

export default function MeIcon (props:any) {
    const renderMeIcon = () => {
        return (
            <div>
                <h1> hey its me again </h1>
            </div>
        )
    }

    return <div className="MeIcon-Container"> {renderMeIcon()} </div>
}

const mapStateToProps = (state:any) => ({
    ICON_NOT_INPUT: state.ICON_NOT_INPUT
})

const mapDispatchToProps = (dispatch:any) => ({
    
})

const ConnectedMeIcon = connect(mapStateToProps, mapDispatchToProps)(MeIcon)