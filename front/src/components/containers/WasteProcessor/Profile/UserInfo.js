import UserInfo from '../../../ui/WasteProcessor/Profile/UserInfo'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) =>
  ({
    userInfo: state.loginInfo
  })

const mapDispatchToProps = dispatch =>
  ({
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(UserInfo)

export default Container