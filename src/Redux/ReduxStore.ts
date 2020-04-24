import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import Reduser from './Reduser'

let rootReduser = combineReducers({
    Reduser
})

type ReduserType = typeof rootReduser
export type StateType = ReturnType<ReduserType>

type PropetiesType<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionType<T extends { [key: string]: (...args: any) => any }> =  ReturnType<PropetiesType<T>>

let store = createStore(rootReduser, applyMiddleware(thunkMiddleware))

export default store