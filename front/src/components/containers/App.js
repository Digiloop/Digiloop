import App from '../../App'
import { connect } from 'react-redux'
import { setCategories, setSubCategories } from '../../actions'
import { login } from '../../actions'



const mapStateToProps = (state, props) =>
  ({
      loginInfo: state.loginInfo
  })

// check these
const mapDispatchToProps = dispatch =>
  ({
    setCategories(cats){
      dispatch(
        setCategories(cats)
      )
    },
    setSubCategories(subCats){
      dispatch(
        setSubCategories(subCats)
      )
    },
    onNewLogout(loginInfo){
      dispatch(
        login(loginInfo)
      )
    },
    localStorageLogin(userData){
      dispatch(
        login(userData)
      )
    }
  })

  export default connect(mapStateToProps, mapDispatchToProps)(App)
