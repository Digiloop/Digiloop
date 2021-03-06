import WasteProcessor from '../../ui/WasteProcessor/WasteProcessor'
import { connect } from 'react-redux'
import { login } from '../../../actions'

const mapStateToProps = (state, props) =>
  ({
  })

const mapDispatchToProps = dispatch =>
  ({
    onNewLogout(loginInfo) {
      dispatch(
        login(loginInfo)
      )
    }
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(WasteProcessor)

export default Container
