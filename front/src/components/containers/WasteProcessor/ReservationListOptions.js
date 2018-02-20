import ReservationListOptions from '../../ui/WasteProcessor/ReservationListOptions'
import { connect } from 'react-redux'
import { setResOpt } from '../../../actions'

const mapStateToProps = (state, props) =>
  ({

  })

const mapDispatchToProps = dispatch =>
  ({
    onNewOptions(options){
      dispatch(
        setResOpt(options)
        //setResOpt(true, true, true)
      )
    }
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(ReservationListOptions)

export default Container
