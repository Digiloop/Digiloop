import App from '../../App'
import { connect } from 'react-redux'
// import { login } from '../../../actions'


const mapStateToProps = (state, props) =>
  ({
      userLevel: state.loggedIn
  })

// check these
const mapDispatchToProps = dispatch =>
  ({

  })

  export default connect(mapStateToProps, mapDispatchToProps)(App)
