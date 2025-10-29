// AuthWrapper.jsx
import React, {
  useEffect,
  useState,
  createContext,
  useContext
} from 'react';
import { Dialog } from '@mui/material';
import Signup from './signup.jsx';
import { auth } from './firebase'; // Adjust path if needed

// ✅ Create Context
const AuthStatusContext = createContext();

// ✅ Custom Hook to use Auth Status anywhere
export const useAuthStatus = () => useContext(AuthStatusContext);

// ✅ AuthStatusProvider Component
export const AuthStatusProvider = ({ children }) => {
  // 🔒 Initialize from localStorage (persists across reloads)
  const [status, setStatus] = useState(localStorage.getItem('status') || 'false');
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('status', 'true');
        setStatus('true');
      } else {
        localStorage.setItem('status', 'false');
        setStatus('false');
      }
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthStatusContext.Provider value={{ status, setStatus, isAuthReady }}>
      {children}
    </AuthStatusContext.Provider>
  );
};

// ✅ AuthWrapper Component (for popup control)
const AuthWrapper = ({ children }) => {
  const [showSignup, setShowSignup] = useState(false);
  const { status, isAuthReady } = useAuthStatus();

  useEffect(() => {
    if (isAuthReady && status === 'false') {
      const timer = setTimeout(() => {
        setShowSignup(true);
      }, 15000); // show after 15 seconds

      return () => clearTimeout(timer);
    }
  }, [status, isAuthReady]);

  const handleSignupSuccess = () => {
    setShowSignup(false);
  };

  return (
    <>
      {children}
      <Dialog
        open={showSignup}
        onClose={() => setShowSignup(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            m: 0,
            borderRadius: 2,
            boxShadow: 'none',
            backgroundColor: 'transparent'
          }
        }}
        BackdropProps={{
          sx: {
            backgroundColor: 'transparent'
          }
        }}
      >
        <Signup onSuccessfulSignup={handleSignupSuccess} />
      </Dialog>
    </>
  );
};

export default AuthWrapper;
