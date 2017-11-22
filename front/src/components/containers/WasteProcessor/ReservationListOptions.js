import ReservationListOptions from '../../ui/WasteProcessor/ReservationListOptions'
import { connect } from 'react-redux'
import { setResOpt } from '../../../actions'

const mapStateToProps = (state, props) =>
  ({

  })

const mapDispatchToProps = dispatch =>
  ({
    onNewOptions({ser, batteries, showRes}){
      dispatch(
        setResOpt(ser, batteries, showRes)
      )
    }
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(ReservationListOptions)

export default Container
