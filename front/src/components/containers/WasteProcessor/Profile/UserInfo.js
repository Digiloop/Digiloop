import UserInfo from '../../../ui/WasteProcessor/Profile/UserInfo'
import { connect } from 'react-redux'
import { login } from '../../../../actions'

const mapStateToProps = (state, props) =>
  ({
    userInfo: state.loginInfo
  })

const mapDispatchToProps = dispatch =>
  ({
    localStorageLogin(userData){
      dispatch(
        login(userData)
      )
    }
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(UserInfo)

export default Container