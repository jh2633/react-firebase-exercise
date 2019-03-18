import React, { Component } from 'react';

// import { withAuthorization } from '../Session'
// import * as ROLES from '../../constants/roles'
import { withFirebase } from '../Firebase'

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
      checked: false,
      roles: [],
      allInstances: [],
      allRoles: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.instances().on('value', snapshot => {
      const instances = snapshot.val();

      const instanceList = Object.keys(instances)

      this.setState({
        allInstances: instanceList
      });
    });

    this.props.firebase.roles().on('value', snapshot => {
      const roles = snapshot.val();

      const rolesList = Object.keys(roles).map( role => (
          <option value={role}>{role}</option>
      ))
      this.setState({
        allRoles: rolesList
      });
    });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));
      this.setState({
        users: usersList,
        loading: false,
        checked: false
      });
    });
  }

  handleSelect(uid, e) {
    var role = {"roles": [e.target.value]}
    this.props.firebase.userRole(uid).update(role)

    console.log(e.target.value)
  }


  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  removeRole(roles, role) {
    var index = roles.indexOf(role)
    roles.splice(index, 1)
  }

  handleCheckboxChange(uid, role, userRoles) {

    userRoles.includes(role) ? this.removeRole(userRoles, role) : userRoles.push(role)
    if (userRoles.length === 0 ) {
      userRoles = ["No Access"]
    }
    console.log(userRoles)
    this.props.firebase.user(uid).update({"roles": userRoles})
  }


  render() {
    const { users, loading, allRoles, allInstances } = this.state;
    return (
      <div>
        <h1>Admin</h1>
        {loading && <div>Loading ...</div>}
        <table>
          <tbody>
          <tr>
            <th>ID</th>
            <th>Email</th>
            {allInstances.map( instance => (
              <th>{instance}</th>
            ))}
          </tr>
          {users.map(user => (

            <tr key={user.uid}>
              <td><strong>{user.uid}</strong></td>
              <td>{user.email}</td>
                {/* The following code iterates over the roles hash for the user*/}
                {allInstances.map( instance => (
                  <td>
                    <select
                      onChange={(e) => this.handleSelect(user.uid, e)}
                      value={user.appAccess.clusterApp.instances[instance].roles[0]}>
                      {allRoles}
                    </select>
                  </td>
                ))}

            </tr>
          ))}

          </tbody>
        </table>

      </div>
    )
  }
}
// allRoles.map( role => (
//     <option value={role}>{role}</option>
// ))

// <ul>
//   {users.map(user => (
//     <li key={user.uid}>
//       <ul>
//         <li>
//           <strong>ID:</strong> {user.uid}
//         </li>
//         <li>
//           <strong> E-Mail:</strong> {user.email}
//         </li>
//         <li>
//           <strong> Username:</strong> {user.username}
//         </li>
//         {/* The following code iterates over the roles hash for the user*/}
//         {allRoles.map( role => (
//           <li key={user.uid}>
//            <input type="checkbox" defaultChecked={user.roles.includes(role)} onClick={() => this.handleCheckboxChange(user.uid, role, user.roles)}/>
//            <label>{role}</label>
//           </li>
//         )
//
//         )}
//
//       </ul>
//
//     </li>
//   ))}
//
// </ul>


export default withFirebase(Admin)
