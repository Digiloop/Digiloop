import ReservedListing from '../../ui/WasteProcessor/ReservedListing'
import { connect } from 'react-redux'
import { setResListOwners } from '../../../actions';

const mapStateToProps = (state, props) =>
  ({
    items: state.resList,
    itemsWithOwners: state.resListWithOwnersData,
    userInfo: state.loginInfo
  })

const mapDispatchToProps = dispatch =>
  ({
    junksToStore(resListWithOwnersData){
      dispatch(
        setResListOwners(resListWithOwnersData)
      )
    }
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(ReservedListing)

export default Container
