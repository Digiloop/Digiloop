import AdminWasteProcessor from '../../ui/Admin/WasteProcessor'
import { connect } from 'react-redux'
import { login, setResList, setResListOwners } from '../../../actions'

const mapStateToProps = (state, props) =>
  ({
    items: state.resList
  })

const mapDispatchToProps = dispatch =>
  ({
    onNewLogout(loginInfo) {
      dispatch(
        login(loginInfo)
      )
    },
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

const Container = connect(mapStateToProps, mapDispatchToProps)(AdminWasteProcessor)

export default Container
