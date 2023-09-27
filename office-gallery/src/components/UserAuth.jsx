import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../Firebase';

const UserAuth = () => {
    const [authUser, setAuthUser] = useState('');

    //to listen and know if the user is authenticated or not
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        }
    }, []);

  return (
    <div>
        {authUser ? 
        <><p>{`signed in as ${authUser.email}`}</p></>
        :
        <><p>Signed Out</p></>
    }
    </div>
  )
}

export default UserAuth;