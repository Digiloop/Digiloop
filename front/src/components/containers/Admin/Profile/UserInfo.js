import UserInfo from '../../../ui/Admin/Profile/UserInfo'
import { connect } from 'react-redux'
import { login } from '../../../../actions'

const mapStateToProps = (state, props) =>
  ({
    userInfo: state.loginInfo
  })

const mapDispatchToProps = dispatch =>
  ({
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(UserInfo)

export default Container