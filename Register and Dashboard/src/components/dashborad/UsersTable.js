import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../formStyle.css';
import DeleteBtn from './DeleteBtn';

const UsersTable = (props) => {
  const role = localStorage.getItem('role');
  const token = sessionStorage.getItem('token');

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8080/dashboard',
          {
            role: role,
          },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        ).catch((err) => {
          if (err && err.response) {
            console.log("first")
            console.log('Error: ', err.response.data.error);
            navigate('/login'); //redirect to the login page
          }
        });

        if (response && response.data) {
          setUsers(response.data.data.users);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleUserDelete = (deletedUserId) => {
    // filter the old items in the array and returns new array of items there id does not 
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== deletedUserId));
  };

  let navigate = useNavigate();

  const handleUsernameEdit = async (userId, newUsername) => {
    try {
      await axios.patch(`http://localhost:8080/dashboard/editUser`, {
        username: newUsername,
        id: userId,
      });
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  return (
    <>
      <div id="wrapper" style={{ width: '100%' }}>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid">
              <h1 style={{ margin: '2rem 0 2rem 0' }} className="h3 text-white">
                Tables
              </h1>
              <div className="card shadow mb-4">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Password</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, index) => {
                          return (
                            <tr key={index}>
                              <td>{user._id}</td>
                              <td contentEditable={true} onBlur={(e) => handleUsernameEdit(user._id, e.target.innerText)} >{user.username}</td>
                              <td>{user.email}</td>
                              <td>{user.role}</td>
                              <td>{user.password}</td>
                              {role === 'super admin' ? <td>
                                <DeleteBtn id={user._id} onDelete={handleUserDelete} />
                              </td> : null}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersTable;
