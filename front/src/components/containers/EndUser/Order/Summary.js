import { connect } from 'react-redux'
import Summary from '../../../ui/EndUser/Order/Summary';

const mapStateToProps = (state, props) =>
  ({
    userInfo: state.loginInfo
  })

const mapDispatchToProps = dispatch =>
  ({
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(Summary)

export default Container