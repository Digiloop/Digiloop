import Notification from '../../ui/EndUser/Profile/Notification'
import { connect } from 'react-redux'
import { setNotifications } from '../../../actions';

const mapStateToProps = (state, props) =>
  ({
    items: state.notifications

  })

const mapDispatchToProps = dispatch =>
  ({
    itemsToStore(notifications){
      dispatch(
        setNotifications(notifications)
      )
    }
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(Notification)

export default Container
