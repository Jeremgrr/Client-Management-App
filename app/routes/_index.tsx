import type { MetaFunction } from "@remix-run/node";
import SideBar from "./SideBar";
import UserObject from "./userObject";
import React from "react";

export const meta: MetaFunction = () => [{ title: "Client Manager" }];

const sidebarItems = [
  { label: "Home", onclick: () => handleItemClick("Home") },
  { label: "About", onclick: () => handleItemClick("About") },
  { label: "Contact", onclick: () => handleItemClick("Contact") },
];

export default function Index() {
  return (
    <div style={{ display: "flex" }}>
      <SideBar items={sidebarItems} backgroundColor="#524F81" />

      <main style={{ padding: "20", flexGrow: 1 }}>
        <div style={{ display: "flex" }}>
          <UserObject
            initialUsers={[{ name: "Alice" }, { name: "Bob" }]}
            backgroundColor="blue"
          />
        </div>
      </main>
    </div>
  );
}

function handleItemClick(arg0: string) {
  throw new Error("Function not implemented.");
}