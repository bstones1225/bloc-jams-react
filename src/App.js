import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">
      <h1>Bloc Jams</h1>

        <nav>
          <div className="navLinks">
          <Link to='/' className="JamLinks">Landing</Link>
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
