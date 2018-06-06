import Profile from '../../../ui/WasteProcessor/Profile/Profile'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) =>
  ({
    userInfo: state.loginInfo
  })

const mapDispatchToProps = dispatch =>
  ({
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(Profile)

export default Container