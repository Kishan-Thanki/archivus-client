// src/App.jsx

import React, { useContext, useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import AppRoutes from './routes/AppRoutes';
import { ErrorBoundary } from './components/common/ErrorBoundary'; 
import { NotificationProvider, NotificationContext } from './context/NotificationContext'; 
import { AuthContext } from './context/AuthContext';
import InitialLoader from './components/common/InitialLoader';

const LOADER_DURATION = 5000; // 5 seconds

function AppContent() {
  const { notification, setNotification } = useContext(NotificationContext);
  const { loading } = useContext(AuthContext);

  // Show loader ONLY on the very first visit (per tab/session)
  const [showLoader, setShowLoader] = useState(() => {
    return sessionStorage.getItem('archivus_first_load') !== 'done';
  });
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (showLoader) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setShowLoader(false);
          sessionStorage.setItem('archivus_first_load', 'done');
        }, 1000); // 1s fade duration
      }, LOADER_DURATION);
      return () => clearTimeout(timer);
    }
  }, [showLoader]);

  if (showLoader) return <InitialLoader fade={fadeOut} />;
  if (loading) return <InitialLoader />;

  return (
    <>
      <AppRoutes />
      <Snackbar
        open={!!notification}
        autoHideDuration={3000}
        onClose={() => setNotification(null)}
      >
        {notification && (
          <Alert severity={notification.severity || 'info'}>
            {notification.message}
          </Alert>
        )}
      </Snackbar>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;