import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateUser from "./components/create-user.component";
import CreateExercise from "./components/create-exercise.component"

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <br/>
        <Routes>
          <Route path="/" exact element ={<ExerciseList/>}/>
          <Route path="/edit/:id" element ={<EditExercise/>}/>
          <Route path="/create" element ={<CreateExercise/>}/>
          <Route path="/user"  element ={<CreateUser/>}/>
        </Routes>
      </div>
    </Router>
    //module 21, activity 20, solved
  );
}

export default App;
