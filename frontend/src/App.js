import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './pages/login/login'
import Chat from './pages/chat/chat';
import Checkbox from './pages/checkbox/checkbox'
import CheckBox from './pages/checkbox/checkbox';


function App() {
  return (
    <Router>
      <Route exact path='/' component={Login} ></Route> 
      <Route exact path='/chat' component={Chat} ></Route>
      <Route exact path='/checkBox' component={CheckBox} ></Route>
    </Router>
  );
}

export default App;
