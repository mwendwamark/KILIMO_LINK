# Authentication System Documentation

This document provides an overview of the authentication system implemented in the Kilimo Link application.

## Overview

The authentication system is built using React Context API and custom hooks to provide a seamless authentication experience for both farmers and buyers. It includes features like login, signup, password reset, and email confirmation.

## Key Files

- `api.js`: Handles all API calls to the backend
- `AuthContext.jsx`: Manages authentication state and provides authentication methods
- `useAuthForm.js`: Custom hook for handling form state and validation
- `apiErrorHandler.js`: Utility for handling API errors consistently
- `ProtectedRoute.jsx`: Components for protecting routes based on authentication status

## Setup

1. Make sure you have the following environment variables set in your `.env` file:

```
VITE_API_BASE_URL=http://localhost:3000
```

2. Wrap your application with the `AuthProvider` in your main `App.jsx` or `main.jsx`:

```jsx
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* Your app components */}
    </AuthProvider>
  );
}
```

## Usage

### Using the `useAuth` Hook

Access authentication state and methods in any component:

```jsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { 
    user, 
    isAuthenticated, 
    signIn, 
    signOut, 
    signUp 
  } = useAuth();
  
  // Use the methods and state
}
```

### Protected Routes

Use the `ProtectedRoute` component to protect routes that require authentication:

```jsx
import { ProtectedRoute } from '../utils/ProtectedRoute';

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

### Role-Based Routes

Use the `RoleBasedRoute` component to restrict access based on user roles:

```jsx
import { RoleBasedRoute } from '../utils/ProtectedRoute';

<Route
  path="/farmer/dashboard"
  element={
    <RoleBasedRoute requiredRole="farmer" userType="farmer">
      <FarmerDashboard />
    </RoleBasedRoute>
  }
/>
```

## API Endpoints

The following endpoints are used for authentication:

### Farmer Authentication
- **Sign Up**: `POST /farmers/signup`
- **Sign In**: `POST /farmers/login`
- **Sign Out**: `DELETE /farmers/logout`
- **Forgot Password**: `POST /farmers/password`
- **Reset Password**: `PUT /farmers/password`

### Buyer Authentication
- **Sign Up**: `POST /buyers/signup`
- **Sign In**: `POST /buyers/login`
- **Sign Out**: `DELETE /buyers/logout`
- **Forgot Password**: `POST /buyers/password`
- **Reset Password**: `PUT /buyers/password`

### Common
- **Confirm Email**: `GET /auth/confirmation?confirmation_token=:token`

## Error Handling

All API errors are handled consistently using the `apiErrorHandler.js` utility. It provides:
- Consistent error messages
- Error categorization (network, validation, server, etc.)
- Helper functions for displaying errors to users

## Styling

The authentication forms are styled using Tailwind CSS with custom animations and responsive design. The styles are located in the respective component's CSS file.

## Security Considerations

- Tokens are stored in `localStorage` for "Remember Me" functionality and `sessionStorage` for regular sessions
- Passwords are never stored in the frontend
- All API calls include proper error handling and validation
- Sensitive routes are protected on both frontend and backend

## Testing

To test the authentication flow:

1. Sign up as a new user
2. Check your email for the confirmation link
3. Sign in with your credentials
4. Test protected routes
5. Test password reset functionality
6. Test sign out

## Troubleshooting

- **CORS Issues**: Ensure your backend allows requests from your frontend domain
- **Token Issues**: Clear browser storage if experiencing authentication problems
- **API Errors**: Check the browser console for detailed error messages

## Future Improvements

- Add social authentication (Google, Facebook, etc.)
- Implement two-factor authentication
- Add password strength meter
- Add account lockout after multiple failed attempts
