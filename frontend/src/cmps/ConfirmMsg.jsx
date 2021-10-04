import React from 'react'

export function ConfirmMsg({confirmRemove}) {
    return (
        <section className="confirm-msg" >
            <h3>Are you sure?</h3>
            <div className="flex" >
                <button onClick={()=> confirmRemove(true)} >Remove</button>
                <button onClick={()=> confirmRemove(false)} >Dont remove</button>
            </div>
        </section>
    )
}

