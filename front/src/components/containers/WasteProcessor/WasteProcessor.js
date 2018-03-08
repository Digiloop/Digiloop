import WasteProcessor from '../../ui/WasteProcessor/WasteProcessor'
import { connect } from 'react-redux'
import { setResList } from '../../../actions';

const mapStateToProps = (state, props) =>
  ({
  })

const mapDispatchToProps = dispatch =>
  ({
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(WasteProcessor)

export default Container
