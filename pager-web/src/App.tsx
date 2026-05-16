import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import Page from './components/Page';
import { ToastProvider } from '@heroui/react';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider placement="top" />
      <Header />
      <Page />
    </QueryClientProvider>
  );
}

export default App;
