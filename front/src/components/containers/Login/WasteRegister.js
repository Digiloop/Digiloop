import WasteRegister from '../../ui/Login/WasteRegister'
import { connect } from 'react-redux'
import { login } from '../../../actions'


const mapStateToProps = (state, props) =>
  ({

  })

// check these
const mapDispatchToProps = dispatch =>
  ({
    onNewLogin(loginInfo) {
      dispatch(
        login(loginInfo)
      )
    }
  })

export default connect(mapStateToProps, mapDispatchToProps)(WasteRegister)
