import HistoryListing from '../../ui/Admin/HistoryListing'
import { connect } from 'react-redux'
import { setReservedResList } from '../../../actions';

const mapStateToProps = (state, props) =>
  ({
    reservedItems: state.reservedResList
  })

const mapDispatchToProps = dispatch =>
  ({
    reservedToStore(reservedResList){
      dispatch(
        setReservedResList(reservedResList)
      )
    }
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(HistoryListing)

export default Container
