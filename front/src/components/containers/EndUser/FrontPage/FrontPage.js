import FrontPage from '../../../ui/EndUser/FrontPage/FrontPage.js'
import { connect } from 'react-redux'
import {  setCurrentPage } from '../../../../actions';

const mapStateToProps = (state, props) =>
  ({
    items: state.loginInfo
  })

const mapDispatchToProps = dispatch =>
  ({
    setNewPageName(currentPageName) {
      dispatch(
        setCurrentPage(currentPageName)
      )
    }
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(FrontPage)

export default Container
