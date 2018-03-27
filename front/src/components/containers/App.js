import App from '../../App'
import { connect } from 'react-redux'
import { setCategories, setSubCategories } from '../../actions'
import { login } from '../../actions'



const mapStateToProps = (state, props) =>
  ({
      userLevel: state.loggedIn
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
    onNewLogin(loginInfo){
      dispatch(
        login(loginInfo)
      )
    }
  })

  export default connect(mapStateToProps, mapDispatchToProps)(App)
