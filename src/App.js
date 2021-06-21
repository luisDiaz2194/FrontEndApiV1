import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Register from './components/Register';
import Profile from './components/Profile';
import React from 'react';

function App() {

  const logout = () => {
    localStorage.clear();
    return <Redirect to = "/"></Redirect>
  }

  
  return (
    
    <BrowserRouter>
    
    <div className="App">
          <div className="jumbotron jumbotron-fluid">
                <div className="">
                  <Switch>
                    <Route path="/" exact component = {Home}/>
                    <Route path="/login" exact component = {Login}/>
                    <Route path="/register" exact component = {Register}/>
                    <Route path="/logout" exact component = {logout}/>
                    <Route path="/profile" exact  component = {Profile}/>
                  </Switch>
                </div>
        </div>
    </div>
   
    </BrowserRouter>  
  );
}

export default App;
