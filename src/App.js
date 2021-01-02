import { QueryClientProvider, QueryClient } from 'react-query';

import Header from './containers/Header';
import LaunchInfo from './containers/LaunchInfo';

import './App.css';
import './index.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header />
        <LaunchInfo />
      </div>
    </QueryClientProvider>
  );
}
export default App;
