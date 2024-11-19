import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";
import SideBar from './SideBar';
import UserObject from './userObject';
export const meta: MetaFunction = () => [{ title: "Client Manager" }];

const sidebarItems = [
  {label: 'Home', onclick: () => handleItemClick('Home')},
  {label: 'About', onclick: () => handleItemClick('About')},
  {label: 'Contact', onclick: () => handleItemClick('Contact')},


];

/*
const userObjectItems = [
  {name: "John Doe", onclick: () => handleItemClick('John Doe')},



];
*/

//This is the main function
export default function Index() {
  const user = useOptionalUser();
  return (
    <div style={{ display: 'flex'}}>
        <SideBar items={sidebarItems} backgroundColor="#524F81" />
        


        <main style={{ padding: '20', flexGrow: 1}}>
          <h1 style={{fontSize: '30px', color: 'lightgrey'}}> Search for Client</h1>
          <span></span>
          <div style={{ display: 'flex'}}>
            <h1 style={{textAlign: 'center'}}> Users</h1>
            <UserObject initialUsers={[{name: 'Alice'}, {name: 'Bob'}]} backgroundColor="blue"  />


          </div>
        </main>

    </div>
      
      
  );
}
function handleItemClick(arg0: string) {
  throw new Error("Function not implemented.");
}

