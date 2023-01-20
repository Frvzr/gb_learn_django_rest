import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
    return (
        <tr>
            <td>
                <Link to={`user/${user.id}`}>{user.id}</Link>
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
        </tr>
    )
}

const UserList = ({ users }) => {
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
            {users.map((user) => <User user={user} />)}
        </table>
    )
}

export default UserList