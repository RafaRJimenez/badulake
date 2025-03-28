import React from 'react';

const LogOutFirebase = ({ onLogOut }) => {
   const handleLogOut = () => {
        onLogOut();
     }
  return (
    <div className="flex justify-end p-4">
      <button
        onClick={handleLogOut}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
      >
        Log Out
      </button>
    </div>
  );
};

export default LogOutFirebase;
