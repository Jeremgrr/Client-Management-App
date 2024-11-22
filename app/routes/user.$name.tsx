import React from 'react';
import { useParams } from 'react-router-dom';

const UserPage: React.FC = () => {
  const { name } = useParams<{ name: string }>(); // Extract `name` from the URL

  // Simulated user data (replace with an API call if needed)
  const userDetails = {
    Alice: { age: 25, email: 'alice@example.com' },
    Bob: { age: 30, email: 'bob@example.com' },
    Jeremiah: {age:25, email: 'jerry@example.com'},
  };

  const user = userDetails[name as keyof typeof userDetails];

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {user ? (
        <>
          <h1>Welcome, {name}!</h1>
          <p>Age: {user.age}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <h1>User not found</h1>
      )}
    </div>
  );
};

export default UserPage;
