import React from 'react'

export function ConfirmMsg({ confirmRemove, isConfirmMsgOpen, tracksLength }) {
    return (
        <section className="confirm-msg" style={(isConfirmMsgOpen) ? { transform: `translateY(${-520 - (60 * tracksLength)}px)` }
         : { transform: `translateY(${-920 - (60 * tracksLength)}px)` }} >
            <h4>Remove track from list?</h4>
            <div className="flex" >
                <button onClick={() => confirmRemove(true)} >Remove</button>
                <button onClick={() => confirmRemove(false)} >Dont remove</button>
            </div>
        </section>
    )
}

