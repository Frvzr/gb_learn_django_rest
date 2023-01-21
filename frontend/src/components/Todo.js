import React from 'react'
import { Link } from 'react-router-dom'

const ToDoItem = ({ task }) => {
    return (
        <tr>
            <td>
                <Link to={`task/${task.id}`}>{task.id}</Link>
            </td>
            <td>
                {task.project.name}
            </td>
            <td>
                {task.text}
            </td>
            <td>
                {task.created}
            </td>
        </tr>
    )
}

const ToDoList = ({ tasks }) => {
    return (
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
            {tasks.map((task) => <ToDoItem task={task} />)}
        </table>
    )
}

export default ToDoList