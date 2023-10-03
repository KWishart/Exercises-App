import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <div className="App">
      <Router>
        <div className="App-header">
        <header>
          <h1>Your Exercises</h1>
          <p>A list of your exercises will be shown here. You may add, edit or delete them as necessary.</p>
        </header>
		<Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />}/>
          <Route path="/create-exercise" element={<CreateExercisePage />}/>
          <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit} setExerciseToEdit={setExerciseToEdit} />}/>
		  </Routes>
          </div>
      </Router>
      <footer>
        <p>© 2023 Kai Wishart</p>
      </footer>
    </div>
  );
}

export default App;