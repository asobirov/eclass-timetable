import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Main from "./components/Main";
import Courses from "./components/Courses";
import Course from "./components/Course";

function App() {

    return (
        <Router>
            <Switch>
                <Route exact path="/course/:id" component={Course}/>
                <Redirect from='/course' to='courses'/>
                <Route exact path='/courses' component={Courses}/>
                <Route component={Main}/>
            </Switch>
        </Router>
    );
}

export default App;
