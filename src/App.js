import './App.scss';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Main from "./screens/Main";
import Courses from "./screens/Courses";
import Course from "./screens/Course";
import Header from "./components/Header";
function App() {

    return (
        <>
            <Router>
                <Header />
                <div className='container mt-5'>

                    <Switch>

                        <Route exact path="/course/:id">
                            <Course />
                        </Route>
                        <Redirect from='/course' to='/courses' />
                        <Route exact path='/courses' component={Courses} />
                        <Route exact path='/' component={Main} />
                        <Redirect from='/' to='/'/>
                        <Route path='*'>
                            <Main />
                        </Route>
                    </Switch>
                </div>

            </Router>
        </>
    );
}

export default App;
