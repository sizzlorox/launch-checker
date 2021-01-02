import { QueryClientProvider, QueryClient } from 'react-query';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from './containers/Header';
import LaunchInfo from './containers/LaunchInfo';
import LaunchDetails from './containers/LaunchDetails';

import './App.css';
import './index.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <div>
                Hi
              </div>
            </Route>
            <Route path="/upcoming">
              <LaunchInfo launchType="upcoming" />
            </Route>
            <Route path="/past">
              <LaunchInfo launchType="past" />
            </Route>
            <Route path="/launch/:id" render={({ match }) => <LaunchDetails match={match} />} />
          </Switch>
        </Router>
      </div>
    </QueryClientProvider>
  );
}
export default App;
