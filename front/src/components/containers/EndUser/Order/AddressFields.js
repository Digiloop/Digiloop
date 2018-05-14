import { connect } from 'react-redux'
import AddressFields from '../../../ui/EndUser/Order/AddressFields';

const mapStateToProps = (state, props) =>
  ({
    userInfo: state.loginInfo
  })

const mapDispatchToProps = dispatch =>
  ({
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(AddressFields)

export default Container