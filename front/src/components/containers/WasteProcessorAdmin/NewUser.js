import NewUser from '../../ui/WasteProcessorAdmin/UserManagement/NewUser'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) =>
  ({
    companyInfo: state.loginInfo
  })

const mapDispatchToProps = dispatch =>
  ({
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(NewUser)

export default Container