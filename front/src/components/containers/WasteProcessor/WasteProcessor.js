import WasteProcessor from '../../ui/WasteProcessor/WasteProcessor'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) =>
  ({
    rLOpt: state.resListOpt,
    resListItems: state.resList.resListItems
  })

const mapDispatchToProps = dispatch =>
  ({

  })

const Container = connect(mapStateToProps, mapDispatchToProps)(WasteProcessor)

export default Container
