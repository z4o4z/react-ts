import * as React from 'react';

import Boards from '../Boards';

import './App.css';

import logo from './logo.svg';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <Boards />
    </div>
  );
}
