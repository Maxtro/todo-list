import React from 'react'
import Task from './Task'
import { StateType } from '../Redux/ReduxStore'
import style from '../components/Task.module.css'
import { connect, ConnectedProps } from 'react-redux'
import { TaskType } from '../Redux/Reduser'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form } from 'react-bootstrap'
import { updateInputText, taskDone, addNewTask, deleteTasks, validateError } from '../Redux/Reduser'

type MapStateToPropsType = {
    task: Array<TaskType>
    taskText: string
    isError: boolean
    errorText: string
}

type MapDispatchToPropsType = {
    updateInputText: (text: string) => void
    taskDone: (id: number) => void
    deleteTasks: () => void
    validateError: (errorText: string, isError: boolean) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & PropsFromRedux

const TaskContainer: React.FC<PropsType> = (props) => {

    const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.updateInputText(event.target.value)
        props.validateError('', false)
    }

    const validate = () => {
        if(props.taskText === ''){
            props.validateError('Пустое поле', true)
            return true
        } else if(props.taskText.replace(/ /g, '') === '') {
            props.validateError('Поле содержит одни пробелы', true)
            return true
        }
        
        else if(props.taskText.replace(/ /g, '') === '' || props.taskText.replace(/ /g, '').length <= 3){
            props.validateError('Необходимо более трех символов', true)
            return true
        } 
    }

    const addTask = () => {
        
        let task = {
            id: props.task.length !== 0 ? props.task.length + 1 : 0,
            title: props.taskText,
            done: false
        }
        const isValide = validate()
        if(!isValide){
            props.addNewTask(task)
        }

    }

    const addTaskEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }

    const onDelete = () => {
        props.deleteTasks()
    }

    return <Card style={{ width: '400px', boxShadow: '0px 0px 5px #bec0c1' }}>
                <Card.Header><b>TODO list</b><span onClick={ () => {onDelete()} } className="material-icons" style={{ fontSize: 23, float: 'right', cursor: 'pointer' }}>delete</span></Card.Header>
                    <Card.Body>
                        <Task task={ props.task } taskDone={ props.taskDone } />
                    </Card.Body>
                    <Card.Footer className={ style.task }>
                    <span onClick={ () => { addTask() } } className="material-icons" style={{ fontSize: 30 }}>add</span>
                    <Form.Control size="sm" type="text" value={props.taskText} onChange={ onChangeText } onKeyPress={ addTaskEnter } />
                    </Card.Footer>
                    { props.isError ? <div className={ style.error }>Ошибка: {props.errorText} </div> : null }
            </Card>
}

const mapStateToProps = (state: StateType): MapStateToPropsType => {
    return {
        task: state.Reduser.task,
        taskText: state.Reduser.taskText,
        isError: state.Reduser.isError,
        errorText: state.Reduser.errorText
    }
}

const connector = connect(mapStateToProps, { updateInputText, taskDone, addNewTask, deleteTasks, validateError })
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(TaskContainer)
