import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import Page from './components/Page';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Page />
    </QueryClientProvider>
  );
}

export default App;
