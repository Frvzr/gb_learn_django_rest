import React from 'react'
import { Link } from 'react-router-dom'

const ProjectItem = ({ item }) => {
    return (
        <tr>
            <td>
                <Link to={`project/${item.id}`}>{item.id}</Link>
            </td>
            <td>
                {item.name}
            </td>
            <td>
                {item.link}
            </td>
            <td>
                {item.worker.first_name} {item.worker.last_name}
            </td>
        </tr>
    )
}

const ProjectList = ({ items }) => {
    return (
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
            {items.map((item) => <ProjectItem item={item} />)}
        </table>
    )
}

export default ProjectList