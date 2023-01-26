import React from 'react'
import { Link } from 'react-router-dom'

const WorkerItem = ({ item }) => {
    return (
        <tr>
            <td>
                <Link to={`user/${item.id}`}>{item.id}</Link>
            </td>
            <td>
                {item.first_name}
            </td>
            <td>
                {item.last_name}
            </td>
        </tr>
    )
}

const WorkerList = ({ items }) => {
    return (
        <table>
            <th>
                ID
            </th>
            <th>
                First name
            </th>
            <th>
                Last name
            </th>
            {items.map((item) => <WorkerItem item={item} />)}
        </table>
    )
}

export default WorkerList