import Login from '../../ui/Login/Login'
import { connect } from 'react-redux'
import { login } from '../../../actions'


const mapStateToProps = state =>
  ({
    login: state.login
  })

// check these
const mapDispatchToProps = dispatch =>
  ({
    onNewLogin(Login){
      dispatch(
        login(login)
      )
    }
  })

  export default connect(mapStateToProps, mapDispatchToProps)(Login)
