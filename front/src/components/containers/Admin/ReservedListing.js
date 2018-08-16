import ReservedListing from '../../ui/Admin/ReservedListing'
import { connect } from 'react-redux'
import { setResList, setResListOwners } from '../../../actions';

const mapStateToProps = (state, props) =>
  ({
    items: state.resList,
    itemsWithOwners: state.resListWithOwnersData,
    userInfo: state.loginInfo
  })

const mapDispatchToProps = dispatch =>
  ({
    itemsToStore(resList){
      dispatch(
        setResList(resList)
      )
    },
    junksToStore(resListWithOwnersData){
      dispatch(
        setResListOwners(resListWithOwnersData)
      )
    }
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(ReservedListing)

export default Container
