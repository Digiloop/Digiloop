import { connect } from 'react-redux'
import OrderMain from '../../../ui/EndUser/Order/OrderMain';

const mapStateToProps = (state, props) =>
  ({
    userInfo: state.loginInfo
  })

const mapDispatchToProps = dispatch =>
  ({
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(OrderMain)

export default Container