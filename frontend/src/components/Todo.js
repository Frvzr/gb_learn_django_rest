import React from 'react'
import { Link } from 'react-router-dom'

const ToDoItem = ({ task, deleteToDo }) => {
    return (
        <tr>
            <td><Link to={`task/${task.id}`}>{task.id}</Link></td>
            <td>{task.project.name}</td>
            <td>{task.text}</td>
            <td>{task.created}</td>
            <td><button onClick={() => deleteToDo(task.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const ToDoList = ({ tasks, deleteToDo }) => {
    return (
        <div>
            <table>
                <th>
                    ID
                </th>
                <th>
                    Project
                </th>
                <th>
                    Description
                </th>
                <th>
                    Created
                </th>
                {tasks.map((task) => <ToDoItem task={task} deleteToDo={deleteToDo} />)}
            </table>
            <Link to='/todo/create'>Create</Link>
        </div>
    )
}

export default ToDoList