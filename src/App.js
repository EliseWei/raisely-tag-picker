import './styles.css';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { UserProfile } from './UserProfile';

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
        <UserProfile uuid={params.uuid} />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
