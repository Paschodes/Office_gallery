import React from 'react'
import UserAuth from '../components/UserAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('signed out successfully');
        navigate('/')
      }).catch(error => console.log(error))
  }
  return (
    <div>
      <UserAuth />
      <button onClick={userSignOut}>Sign Out</button>
    </div>
  )
}

export default Home;