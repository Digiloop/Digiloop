import HistoryListing from '../../ui/WasteProcessor/HistoryListing'
import { connect } from 'react-redux'
import { setResList, setResListOwners } from '../../../actions';

const mapStateToProps = (state, props) =>
  ({
    items: state.resList,
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

const Container = connect(mapStateToProps, mapDispatchToProps)(HistoryListing)

export default Container
