import './styles.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import * as React from 'react';

import {
  fetchTags,
  createTag,
  fetchUser,
  fetchUserTags,
  assignUserTag,
  removeUserTag,
} from './api';

import { UserTags } from './Tags';

function UserProfile({ uuid }) {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    async function getUser() {
      const user = await fetchUser(uuid);
      setUser(user);
    }
    getUser();
  }, [uuid]);

  if (!user) return null;

  return (
    <>
      <h2>{user.fullName}</h2>
      <UserTags user={user} />
    </>
  );
}

// Let's pretend we're getting this from the route
// e.g. `get /users/:uuid`
const params = {
  uuid: '1111-2222-3333-4444',
};

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>User Tags Sandbox</h1>
        <div className="App">
          <UserProfile uuid={params.uuid} />
        </div>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
