import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">
      <h1>Bloc Jams</h1>

        <nav>
          <div className="navLinks">
          <a href="/" className ="JamLinks" ><img src={logo} className="logo"/></a>

          <Link to='/library' className="JamLinks">Library</Link>
          </div>
        </nav>
        </header>

      <main>
        <div>
        <Route exact path="/" component={Landing} />
        <Route path="/library" component={Library} />
        <Route path="/album/:slug" component={Album} />
        </div>
      </main>
      </div>
    );
  }
}

export default App;
