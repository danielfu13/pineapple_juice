import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <Navbar/>
      <br/>
      <Route path="/" exact componenet ={ExerciseList}/>
      <Route path="/edit/:id" componenet ={EditExercise}/>
      <Route path="/create" componenet ={CreateExercise}/>
      <Route path="/user"  componenet ={CreateUser}/>
    </Router>
    
  );
}

export default App;
