import container from './container'
import reducers from './reducers'
import saga from './sagas'
import { path, ROUTE_TITLE } from './consts'

export default {
    reducers,
    saga,
    container,
    path,
    title: ROUTE_TITLE
}