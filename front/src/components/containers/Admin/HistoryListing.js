import HistoryListing from '../../ui/Admin/HistoryListing'
import { connect } from 'react-redux'
import { setResList } from '../../../actions';

const mapStateToProps = (state, props) =>
  ({
  })

const mapDispatchToProps = dispatch =>
  ({
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(HistoryListing)

export default Container
