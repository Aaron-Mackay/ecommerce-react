import React from 'react';
import logo from './logo.svg';
import './App.css';

import Products from './Components/Products';
import NavBar from './Components/NavBar';
import Filters from './Components/Filters';
import Chat from './Components/NavBar copy';

function App() {

  const products = [ // todo replace with db call
    {
      id: 1,
      item: "shoe",
      price: 30,
      stockLevels: {
        "9": 2,
        "10": 0
      }
    },
    {
      id: 2,
      item: "hat",
      price: 10,
      stockLevels: {
        "m": 1,
        "l": 2
      }
    }
  ]

  const filters = {
    sizes: [],
    price: {
      max: null,
      min: null
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello from V2</h1>
      </header>
      <NavBar />
      <Filters onAddFilter={addFilterHandler} filters={filters} />
      <Products products={products} />
      <Chat />
    </div>
  );
}

export default App;
