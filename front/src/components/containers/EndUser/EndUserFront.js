import EndUserFront from '../../ui/EndUser/EndUserFront'
import { connect } from 'react-redux'
import { login, setCurrentPage } from '../../../actions'



const mapStateToProps = (state, props) =>
    ({
        loginInfo: state.loginInfo,
        pageName: state.currentPageName
    })

// check these
const mapDispatchToProps = dispatch =>
    ({
        onNewLogout(loginInfo) {
            dispatch(
                login(loginInfo)
            )
        },
        setNewPageName(currentPageName) {
            dispatch(
                setCurrentPage(currentPageName)
            )
        }
    })

export default connect(mapStateToProps, mapDispatchToProps)(EndUserFront)