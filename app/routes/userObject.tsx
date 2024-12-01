import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "@remix-run/react";
import ReactDOM from 'react-dom/client';


type User = {
    name: string;
};

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
    const [searchQuery, setSearchQuery] = useState('');
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const addUser = () => {
        if (newUserName.trim()) {
            setUsers([...users, {name:newUserName }]);
            setNewUserName(''); //clear the input field after adding
        }
    };
   

    const removeUser = (index: number) => {
      setUsers(users.filter((_, i) => i !== index));

    };

    const handleUserClick = (userName: string) => {
      navigate(`/user/${userName}`);
    };


    const filteredUsers = users.filter((user) => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      alert(inputs);
    }

    return (
     

        <div style={{ padding: '20px' }}>
          {/** Add New User Section */}
        <div style={{ marginBottom: '20px' }}>
          <form onSubmit={handleSubmit}>
            <label>
              Enter your age:
              <input
              style={{
                padding: '10px',
                fontSize: '16px',
                marginRight: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
                type="text"
                name="age"
                value={inputs.age || ""}
                onChange={handleChange}
                />
            </label>
            <label>
              Date of Birth(mm/dd/yy):
              <input 
              style={{
                padding: '10px',
                fontSize: '16px',
                marginRight: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
                type="text"
                name="dob"
                value={inputs.dob || ""}
                onChange={handleChange}
                />
              </label>
            <input type='submit'
              style={{
                padding: '10px 15px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }} />

          </form>
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
        {/* Search Section */}

        <div style={{ marginBottom: '20px' }}>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for Clients"                              //Text placeholder for search bar
            style={{
              padding: '10px',
              fontSize: '16px',
              width: '100%',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>

        {/** Display Filtered Users */}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => 
          (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                backgroundColor: '#f4f4f4',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
              }}
            >
              <Link
              to={`/user/${user.name}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                fontSize: "18px",
              }}>
                {user.name}
              </Link>
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
              <span style={{ marginRight: '10px' }}></span>
              <button
              onClick={(e) =>{
                e.stopPropagation(); //prevent the parent onClick from triggering
                removeUser(index);
              }}
              style={{
                padding: '5px 10px',
                fontSize: '14px',
                backgroundColor: '#ff4d4d',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Remove
            </button>
            </div>
          ))
          ) : (
            <p>No Users Found</p>
          )
        }
        </div>
      </div>
    );
};

export default Userobject;

