import { connect } from 'react-redux'

const _UserMsg = ({ msg }) => {
    return (
        <div className={msg ? `shown user-msg ${msg?.type}` : 'user-msg'}>
            <h3>{msg?.txt}</h3>
        </div >
    )
}


const mapStateToProps = ({ userModule }) => {
    return {
        msg: userModule.msg
    }
}

export const UserMsg = connect(mapStateToProps, {})(_UserMsg)
