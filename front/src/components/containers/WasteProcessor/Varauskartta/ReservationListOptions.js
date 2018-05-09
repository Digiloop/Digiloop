import ReservationListOptions from '../../../ui/WasteProcessor/Varauskartta/ReservationListOptions'
import { connect } from 'react-redux'
import { setResOpt } from '../../../../actions'

const mapStateToProps = (state, props) =>
  ({
    rLOpt: state.resListOpt,
    categories: state.categories,
    subCategories: state.subCategories
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
