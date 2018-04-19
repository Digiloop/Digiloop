import EndUserFront from '../../ui/EndUser/EndUserFront'
import { connect } from 'react-redux'
import { login } from '../../../actions'



const mapStateToProps = (state, props) =>
    ({
        loginInfo: state.loginInfo
    })

// check these
const mapDispatchToProps = dispatch =>
    ({
        onNewLogout(loginInfo) {
            dispatch(
                login(loginInfo)
            )
        }
    })

export default connect(mapStateToProps, mapDispatchToProps)(EndUserFront)