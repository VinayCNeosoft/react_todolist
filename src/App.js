import {BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import Login from './component/Login';
import Registration from './component/Registration';
import ToDoo from './component/ToDoo';
import User from './component/User';
import Welcome from "./component/Welcome";

function App() {

  return (
    <>
    <Router> 
      <Switch>
        <Route path="/" exact component={Welcome}/>
        <Route path="/registration" exact component={Registration}/>
        <Route path="/login" exact component={Login} />
        <Route path="/todo" exact component={ToDoo}/>
        <Route path="/user" exact component={User}/>
      </Switch>
    </Router>
    </>
  );
}

export default App;