import AdminWasteProcessor from '../../ui/Admin/WasteProcessor'
import { connect } from 'react-redux'
import { setResList } from '../../../actions';

const mapStateToProps = (state, props) =>
  ({
  })

const mapDispatchToProps = dispatch =>
  ({
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(AdminWasteProcessor)

export default Container
