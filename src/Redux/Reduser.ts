import { Dispatch } from 'redux'
import { InferActionType } from './ReduxStore'

export type TaskType = {
    id: number
    title: string
    done: boolean
}

export type InitialStateType = {
   task: Array<TaskType>
   taskText: string
   isError: boolean
   errorText: string
}

const initialState: InitialStateType = {
   task: [
       {id: 0, title: 'Купить батон', done: false},
       {id: 1, title: 'Купить молоко', done: true},
       {id: 2, title: 'Купить мясо', done: false}
   ],
   taskText: '',
   isError: false,
   errorText: ''
}

const Reduser = (state = initialState, action: ActionType) => {
    switch (action.type){

        case 'SET_UPDATE_TEXT':{
            return { ...state, taskText: action.text }
        }

        case 'SET_TASK': {
            return { ...state, task: [action.task, ...state.task] }
        }

        case 'SET_DONE': {
            return { ...state, task: state.task.map(task => {
                if (task.id === action.id) {
                    return { ...task, done: !task.done }
                }
                return task
                } ) 
            }
        }

        case 'DELETE_TASKS': {

            let taskArray = state.task.filter(task => !task.done)
            .map((task, index) => {
                return { ...task, id: index }
            })

            return { ...state, task: taskArray }
        }

        case 'SET_ERROR_TEXT': {
            return { ...state, 
                errorText: action.payload.errorText, 
                isError: action.payload.isError 
            }
        }
      
        default: 
            return state
    }
}

type ActionType = InferActionType<typeof actions>
const actions = {
    setUpdateText: (text: string) => ({ type: 'SET_UPDATE_TEXT', text} as const),
    setTask: (task: TaskType) => ({ type: 'SET_TASK', task } as const),
    setDone: (id: number) => ({ type: 'SET_DONE', id} as const),
    deleteTasks: () => ({ type: 'DELETE_TASKS'} as const),
    // setError: (error: boolean) => ({ type: 'SET_ERROR', error} as const),
    setErrorText: (errorText: string, isError: boolean) => ({ type: 'SET_ERROR_TEXT', payload:{errorText, isError}} as const)
}

export const updateInputText = (text: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(actions.setUpdateText(text))
    }
}

export const taskDone = (id: number) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(actions.setDone(id))
    }
}

export const addNewTask = (task: TaskType) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(actions.setTask(task))
        dispatch(actions.setUpdateText(''))
    }
}

export const deleteTasks = () => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(actions.deleteTasks())
    }
}

export const validateError = (errorText: string, isError: boolean) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(actions.setErrorText(errorText, isError))
    }
} 

export default Reduser
