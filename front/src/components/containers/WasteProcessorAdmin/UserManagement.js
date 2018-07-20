import UserManagement from '../../ui/WasteProcessorAdmin/UserManagement/UserManagement'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) =>
  ({
    companyInfo: state.loginInfo
  })

const mapDispatchToProps = dispatch =>
  ({
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(UserManagement)

export default Container