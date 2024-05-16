import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading: React.FC = () => {
  return (
    <Spinner
      variant="primary"
      animation="border"
      role="status"
      style={{ width: '80px', height: '80px' }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Loading;
