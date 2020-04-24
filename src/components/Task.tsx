import React from 'react'
import { TaskType } from '../Redux/Reduser'
import style from './Task.module.css'

type PropsType = {
    task: Array<TaskType>
    taskDone: (id: number) => void
}

const Task: React.FC<PropsType> = props => {

    const onDone = (id: number) => {
        props.taskDone(id)
    }

    return <>
            <div>{ [...props.task.filter(task => !task.done), ...props.task.filter(task => task.done)].map(task => {
                return <div key={ task.id } className={ task.done ?  style.taskDone : style.task } onClick={ () => {onDone(task.id)} } >
                            <span>{ task.done ?  <span style={{ fontSize: 22 }} className="material-icons">check_box</span> : 
                           <span className="material-icons" style={{ fontSize: 22}}>check_box_outline_blank</span>} </span>
                           <div> { task.title } </div>
                        </div>
                
            }) }</div>
        </>
}

export default Task