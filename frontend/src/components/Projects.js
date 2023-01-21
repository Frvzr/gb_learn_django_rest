import React from 'react'
import { Link } from 'react-router-dom'

const Project = ({ item }) => {
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
                {item.user.first_name} {item.user.last_name}
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
            {items.map((item) => <Project item={item} />)}
        </table>
    )
}

export default ProjectList