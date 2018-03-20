import App from '../../App'
import { connect } from 'react-redux'
import { setCategories, setSubCategories } from '../../actions'


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
    }
  })

  export default connect(mapStateToProps, mapDispatchToProps)(App)
