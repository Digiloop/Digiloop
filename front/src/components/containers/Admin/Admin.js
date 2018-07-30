import Admin from '../../ui/Admin/Admin'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) =>
  ({
    userInfo: state.loginInfo
  })

const mapDispatchToProps = dispatch =>
  ({
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(Admin)

export default Container
