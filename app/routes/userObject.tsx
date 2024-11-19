import React, { useState } from 'react';

type User = {
    name: string;
}

type userObjectProps = {
  initialUsers?: User[] //optional initial list of users
  userType?:string; //Optional distinguish employee or client
  width?: string; // Optional width of the sidebar
  backgroundColor?: string; // Optional background color
  //horizontal?: boolean; //prop to control layout direction
};


const Userobject: React.FC<userObjectProps> = ({ initialUsers = []}) => {

    const [users, setUsers] = useState<User[]>(initialUsers);
    const [newUserName, setNewUserName] = useState('');

    const addUser = () => {
        if (newUserName.trim()) {
            setUsers([...users, {name:newUserName }]);
            setNewUserName(''); //clear the input field after adding
        }
    };

    return (

        <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Enter user name"
            style={{
              padding: '10px',
              fontSize: '16px',
              marginRight: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <button
            onClick={addUser}
            style={{
              padding: '10px 15px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Add User
          </button>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          {users.map((user, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                backgroundColor: '#f4f4f4',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <span
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </span>
              {user.name}
            </div>
          ))}
        </div>
      </div>
    );
  };

export default Userobject;
