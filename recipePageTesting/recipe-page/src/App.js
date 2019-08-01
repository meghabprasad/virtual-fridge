import React from 'react';
import logo from './logo.svg';
import './App.css';
import Container from '@material-ui/core/Container';
import { blue } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import MainPage from './components/mainPage';

const containerStyle = {
  color: 'blue'
}

function App() {
  return (
    <div className="App">

      <MainPage></MainPage>


    </div>
  );
}

export default App;
