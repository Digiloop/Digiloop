import ReservedListing from '../../ui/WasteProcessor/ReservedListing'
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

const Container = connect(mapStateToProps, mapDispatchToProps)(ReservedListing)

export default Container
