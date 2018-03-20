import Login from '../../ui/Login/Login'
import { connect } from 'react-redux'
import { login } from '../../../actions'


const mapStateToProps = (state, props) =>
  ({
    
  })

// check these
const mapDispatchToProps = dispatch =>
  ({
    onNewLogin(username, password){
      dispatch(
        login(username, password)
      )
    }
  })

  export default connect(mapStateToProps, mapDispatchToProps)(Login)
