const initialState = {
    data: {}
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_DATA':
            return { ...state, data: action.payload }
        default:
            return state
    }
}

export function setData(data) {
    return  {
        type: 'SET_DATA',
        payload: data
    }
}
