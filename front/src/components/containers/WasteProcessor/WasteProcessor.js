import WasteProcessor from '../../ui/WasteProcessor/WasteProcessor'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) =>
  ({
    rLOpt: state.resListOpt
  })

const mapDispatchToProps = dispatch =>
  ({

  })

const Container = connect(mapStateToProps, mapDispatchToProps)(WasteProcessor)

export default Container
