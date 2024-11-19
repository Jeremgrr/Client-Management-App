import React from 'react';

type SidebarProps = {
  items: { label: string; onClick: () => void }[];
  width?: string; // Optional width of the sidebar
  backgroundColor?: string; // Optional background color
};

const Sidebar: React.FC<SidebarProps> = ({ items, width = '250px', backgroundColor = '#f4f4f4' }) => {
  return (
    <div
      style={{
        width,
        backgroundColor,
        height: '100vh',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        padding: '10px',
        boxSizing: 'border-box',
      }}
    >
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, index) => (
          <li
            key={index}
            style={{
              marginBottom: '10px',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '4px',
              transition: 'background-color 0.3s',
            }}
            onClick={item.onClick}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#ddd')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
