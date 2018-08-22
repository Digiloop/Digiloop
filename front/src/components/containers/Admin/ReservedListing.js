import ReservedListing from '../../ui/Admin/ReservedListing'
import { connect } from 'react-redux'
import { setReservedResList } from '../../../actions';

const mapStateToProps = (state, props) =>
  ({
    reservedItems: state.reservedResList,
    userInfo: state.loginInfo
  })

const mapDispatchToProps = dispatch =>
  ({
    reservedToStore(reservedResList){
      dispatch(
        setReservedResList(reservedResList)
      )
    }
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(ReservedListing)

export default Container
