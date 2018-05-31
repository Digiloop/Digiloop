import App from '../../App'
import { connect } from 'react-redux'
import { setCategories, setSubCategories, setProxyCategories } from '../../actions'
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
    setProxyCategories(proxyCategories){
      dispatch(
        setProxyCategories(proxyCategories)
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
