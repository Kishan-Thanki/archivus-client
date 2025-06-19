// src/App.jsx

import { useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';
import AppRoutes from './routes/AppRoutes';
import { ErrorBoundary } from './components/common/ErrorBoundary'; 
import { NotificationProvider, NotificationContext } from './context/NotificationContext'; 

function AppContent() {
  const { notification, setNotification } = useContext(NotificationContext);

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