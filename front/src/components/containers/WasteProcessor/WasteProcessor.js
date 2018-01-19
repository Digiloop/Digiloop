import WasteProcessor from '../../ui/WasteProcessor/WasteProcessor'
import { connect } from 'react-redux'
import { fetchResList } from '../../../actions';

const mapStateToProps = (state, props) =>
  ({
    rLOpt: state.resListOpt,
    resListItems: state.resList.resListItems,

  })

const mapDispatchToProps = dispatch =>
  ({
    onGetItems(){
      /*
      dispatch(
        fetchResList()
      )
      */
    }
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(WasteProcessor)

export default Container
