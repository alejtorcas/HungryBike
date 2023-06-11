import React, { useState } from "react";

import { Login } from './auth/login'
import { Welcome } from './auth/welcome'

import firebaseApp from "./firebase/credentials";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { QueryClientProvider, QueryClient } from "react-query";

const auth = getAuth(firebaseApp);

function App() {
  
  const [user, setUser] = useState(null);
    
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      setUser(firebaseUser)
    } else {
      setUser(null)
    }
  })
  
  const queryClient = new QueryClient()
    return (
      <QueryClientProvider client={queryClient}>
        {user ? <Welcome /> : <Login />}
      </QueryClientProvider>
    )
  }

export default App
