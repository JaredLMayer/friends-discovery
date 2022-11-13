import React from 'react';

const App = ({ user }) => {
  const { body } = user;
  
  return (
    <div>
      {user ? (
        <div>{body.display_name} is currently logged in</div>
      ) : (
        <a href="/api/auth/login">Login with Spotify</a>
      )}
    </div>
  );
};

export default App;