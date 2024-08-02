import React, { useEffect } from 'react'
import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const SignIn = (props) => {
  // Use the useUser hook to get the details about the logged in user
  const { user } = useUser()
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("User:", user)
      if (user) {
        navigate('/signIn');
      }
    }
  }, [user, navigate])

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "150px"}}>
      <div className="mainContainer">
        <div className={'titleContainer'}>
          <h1 style={{ fontSize: "50px" }}>Welcome!</h1>
        </div>
        <h5 style={{ marginTop: "40px"}}>This is the SignIn & SignUp page.</h5>
        <SignedOut>
          <SignInButton>
            <input className={'inputButton'} type="button" value={'Continue'}/>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <SignOutButton>
            <input className={'inputButton'} type="button" value={'Log out'} onClick={() => navigate('/signin')} style={{ marginLeft: "100px"}} />
          </SignOutButton>
        </SignedIn>
        {user ? <div style={{ marginTop: "30px", marginBottom: "150px" }}>Your email address is {user.primaryEmailAddress.emailAddress}</div> : null}
      </div>
    </div>
  )
}

export default SignIn