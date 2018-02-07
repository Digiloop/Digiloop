import WasteProcessor from '../../ui/WasteProcessor/WasteProcessor'
import { connect } from 'react-redux'
import { setResList } from '../../../actions';

const mapStateToProps = (state, props) =>
  ({
    rLOpt: state.resListOpt,
    resListItems: state.resList

  })

const mapDispatchToProps = dispatch =>
  ({
    itemsToStore(resList){
      dispatch(
        setResList(resList)
      )
    }
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(WasteProcessor)

export default Container
