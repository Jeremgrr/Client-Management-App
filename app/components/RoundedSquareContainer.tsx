import React from 'react';
import { Link } from 'react-router-dom';

type RSCProps = {
    children?: any;

}

const RoundedSquareContainer: React.FC<RSCProps> = ({ children }) => {
  return (
    
    //add css of container and content as styles within the div

    <div 
    style={{
        width: '100%',
        borderRadius: '10px',
        backgroundColor: '#3b3b3b',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 1.0)',
        padding: '20px',
        marginBottom: '20px',


    }}>
      <div 
      style={{
        color: 'white',
        textAlign: 'center',
      }}>
        {children}
      </div>
    </div>
  );
};

export default RoundedSquareContainer;