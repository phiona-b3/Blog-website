import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useUser();

  if (!user) {
    return <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "230px", marginBottom: "230px"}}>Loading...
    <div>Click <Link to='/signin'>Here</Link> to Continue</div>
    </div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "150px", marginBottom: "150px" }}> 
      <div className="container mt-5">
      <h1 style={{ textAlign: "center"}}>User Profile</h1>
      <div className="card" style={{ textAlign: "center"}}>
        <div className="card-body">
          <h5 className="card-title">Profile Information</h5>
          <p className="card-text">Name: {user.fullName}</p>
          <p className="card-text">Email: {user.primaryEmailAddress.emailAddress}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
