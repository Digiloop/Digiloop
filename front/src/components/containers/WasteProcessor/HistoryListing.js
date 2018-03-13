import HistoryListing from '../../ui/WasteProcessor/HistoryListing'
import { connect } from 'react-redux'
import { setResList } from '../../../actions';

const mapStateToProps = (state, props) =>
  ({
    rLOpt: state.resListOpt,
    items: state.resList

  })

const mapDispatchToProps = dispatch =>
  ({
    itemsToStore(resList){
      dispatch(
        setResList(resList)
      )
    }
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(HistoryListing)

export default Container
