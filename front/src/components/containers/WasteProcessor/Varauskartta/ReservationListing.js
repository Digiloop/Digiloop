import ReservationListing from '../../../ui/WasteProcessor/Varauskartta/ReservationListing'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) =>
  ({
    rLOpt: state.resListOpt
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
