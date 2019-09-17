import { NAMESPACE } from './consts'

export default {
    [NAMESPACE]: function (state = {
        name: '访问者',
    }, action) {
        switch (action.type) {
            case NAMESPACE + 'change': {
                return {
                    name: action.payload
                }
            }
            default: return state
        }
    }
}