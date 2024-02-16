import Footer from './Components/Footer';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Landing from './Pages/Landing';
import Voters from './Pages/Voters';
import VotersRegistered from './Pages/VotersRegistered';
import VotersRegistering from './Pages/VotersRegistering';

function App() {
  // let message = "SVote is a Solana Blockchain-based Voting System.";
  const [message, setMessage] = useState('SVote is a Solana Blockchain-based Voting System.');
  const [times, setTimes] = useState('');
  const link = "http://www.google.com";
  const handleClick = () => {
    setMessage('SVote Rock!');
    setTimes('23 times');
  }

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
              <Link to="/"><h1>SVote</h1></Link>
              <div className="links">
                <Link to="/landingpage" style={{
                  color: 'white',
                  backgroundColor: '#007bff',
                  borderRadius: '16px'
                }}>Connect Wallet</Link>
              </div>
        </nav>
        <div className="content">
          <Switch>
            <Route exact path='/'>
              <Home handleClick={handleClick} message={message} link={link} times={times} />
            </Route>
            <Route path='/landingpage'>
              <Landing />
            </Route>
            <Route path='/Voters'>
              <Voters />
            </Route>
            <Route>
              <VotersRegistered />
            </Route>
            <Route>
              <VotersRegistering />
            </Route>
          </Switch>        
        </div>      
        <Footer></Footer>
      </div>
    </Router>
    
    
  );
}

export default App;
