import FrontPage from '../../../ui/EndUser/FrontPage/FrontPage.js'
import { connect } from 'react-redux'
import { setResList } from '../../../../actions';

const mapStateToProps = (state, props) =>
  ({
    items: state.loginInfo
  })

const mapDispatchToProps = dispatch =>
  ({
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(FrontPage)

export default Container
