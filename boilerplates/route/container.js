import { connect } from 'react-redux'
import { NAMESPACE } from './consts'
import MyComponent from './components'

function mapStateToProps(state) {
    return {
        name: state[NAMESPACE].name
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onChange: (e) => dispatch({
            type: NAMESPACE + 'change',
            payload: e.target.value
        })
    }
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyComponent)

export default App