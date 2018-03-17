import { connect } from 'react-redux'
import App from '../components/App'
// import ActionCreator from './../action_creators'

// const mapStateToProps = state => {
//   return state
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onAddCount: () => {
//       dispatch(ActionCreator.addCount())
//     },
//     onSubCount: () => {
//       dispatch(ActionCreator.subCount())
//     }
//   }
// }

export default connect()(App)
