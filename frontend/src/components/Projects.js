import React from 'react'
import { Link } from 'react-router-dom'

const ProjectItem = ({ item, deleteProject }) => {
    return (
        <tr>
            <td><Link to={`projects/${item.id}`}>{item.id}</Link></td>
            <td>{item.name}</td>
            <td>{item.link}</td>
            <td>{item.worker.first_name}</td>
            <td><button onClick={() => deleteProject(item.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({ items, deleteProject }) => {
    return (
        <div>
            <table>
                <th>
                    ID
                </th>
                <th>
                    Title
                </th>
                <th>
                    Link
                </th>
                <th>
                    Worker
                </th>
                {items.map((item) => <ProjectItem item={item} deleteProject={deleteProject} />)}
            </table>
            <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectList