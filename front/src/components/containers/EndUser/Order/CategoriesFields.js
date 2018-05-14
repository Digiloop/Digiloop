import { connect } from 'react-redux'
import CategoriesFields from '../../../ui/EndUser/Order/CategoriesFields';

const mapStateToProps = (state, props) =>
  ({
    userInfo: state.loginInfo
  })

const mapDispatchToProps = dispatch =>
  ({
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(CategoriesFields)

export default Container