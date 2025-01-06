import { prisma } from '~/utils/db.server';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RoundedSquareContainer from '~/components/RoundedSquareContainer';
import axios from 'axios';
import SideBar from './SideBar';
import { PrismaClient } from '@prisma/client';

interface UserItem {
  item: Item;

}

interface Item{
    id: number
    name: string;
    age: number;
    dateOfBirth: string;
}

async function fetchClients() {
  const clients = await prisma.client.findMany();
  console.log('All clients:', clients);
}

const clientRegistration: React.FC<Item> = () => {

    const [firstName,setfirstName] = useState<string>('');
    const [lastName, setlastName] = useState<string>('');
    const [age,setAge] = useState<string>('');
    const [dob,setDob] = useState<string>('');
    const [userItem, setUserItem] = useState<UserItem[]>([]);

    useEffect(() => {
        fetchUserItems();
    }, []);

    const fetchUserItems = async () => {
        try {
          const response = await axios.get<UserItem[]>('http://127.0.0.1:8000/fridge-items/');
          setUserItem(response.data);
        } catch (error) {
          console.error('Error fetching fridge items:', error);
        }
      };

      const createClient = () => {
        console.log('Well we made it here');
        const newClient = prisma.client.create({
          data:{
            fName: firstName,
            lName: lastName,
            age,
            dob,
          },
      
        });
        console.log('New client created:', newClient);       


      }
      
  

    const addUser = () => {
      if (!firstName.trim() || !lastName.trim() || !age.trim() || !dob.trim()) {
        alert("Please fill out all fields.");
        return;
      }
          const newUser: UserItem = {
              item: {
                  id: userItem.length + 1, // Generate a simple unique ID
                  name: firstName+' '+lastName,
                  age: parseInt(age, 10) || 0, // Convert age to a number or default to 0
                  dateOfBirth: dob, // Keep DOB as entered
              },
          };
  
          setUserItem([...userItem, newUser]); // Add the new user to the list
          setfirstName(''); // Clear input fields after adding
          setlastName('');
          setAge('');
          setDob('');
          createClient();
          fetchClients();
    }

    //get user info

    
    //store user info in client table
  
    return(
        <><h1 style={{display: 'flex', alignContent: 'center', justifyContent: 'center' }}>Client Registration</h1>
        <RoundedSquareContainer>
        <div style={{
            marginBottom: '10px',
            display: 'inline',
            alignItems: 'center',
            color: 'black',
            
        }}>

            <div>
                <label htmlFor="firstName"></label>
                <input type="text" id="firstName" value={firstName} onChange={(e) => setfirstName(e.target.value)} placeholder="First Name" />
            </div>
            <br/>
            <div>
                <label htmlFor="lastName"></label>
                <input type="text" id="lastName" value={lastName} onChange={(e) => setlastName(e.target.value)} placeholder="Last Name" />
            </div>
            <br/>
            <div>
                <label htmlFor="age"></label>
                <input type="text" id="age" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
            </div>
            <br/>
            <div>
                <label htmlFor="dob"></label>
                <input type="text" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="Date of Birth" />
            </div>
            <br/>
            <button style = {{color: 'white'}} onClick={addUser}> Submit </button>
        </div>


        </RoundedSquareContainer>
        <RoundedSquareContainer>
        <div>
          <div>
            <h1 style={{display: 'flex', alignContent: 'center', justifyContent: 'center' }}>Users</h1>
            <ul className="fridge-items-list">
              { userItem.map((user, index) => (
                <li key={user.item.id} className="fridge-item">
                  <div key = {index} className="fridge-item-content">
                    <br/> 
                    <span  style={{display: 'flex', alignContent: 'center', justifyContent: 'center' }} className="fridge-item-name">Name: {user.item.name} </span>
                    <span >Age: {user.item.age} </span>
                    <span >Date of Birth: {user.item.dateOfBirth} </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </RoundedSquareContainer>
        </>
        


       


    );

};

export default clientRegistration;
//createClient();
