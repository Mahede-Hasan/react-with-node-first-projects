import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])

  const handleAddUser = event => {
    event.preventDefault()
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name, email}
    fetch('http://localhost:5000/user', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  .then(res => res.json())
  .then(data => {
    const newUser = [...users, data];
    setUsers(newUser)
  })
  }

  
  return (
    <div>
      <h1>My own users {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='name' required />
        <input type="email" name="email" placeholder='Email' required id="" />
        <input type="submit" value="Add User" />
      </form>
      {
        users.map(us => <li>id: {us.id} name:{us.name} email: {us.email} </li>)
      }
    </div>
  );
}

export default App;
