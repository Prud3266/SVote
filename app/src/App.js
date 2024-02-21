import Footer from './Components/Footer';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Landing';
import Landing from './Pages/Home';
import VotersRegistered from './Pages/VotersRegistered';
import VotersRegistering from './Pages/VotersRegistering';
import CreateElections from './Pages/createElection';
import ActivateElections from './Pages/activateElection';
import CheckResults from './Pages/checkResults';
import PublishedResults from './Pages/publishedResult';
import VoterHome from './Pages/VoterHome';
import Register from './Pages/register';
import ActivatedElections from './Pages/activatedElections';


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
        {/* <nav className="navbar">
              <Link to="/"><h1>SVote</h1></Link>
              <div className="links">
                <Link to="/landingpage" style={{
                  color: 'white',
                  backgroundColor: '#007bff',
                  borderRadius: '16px'
                }}>Connect Wallet</Link>
              </div>
        </nav> */}
        <div className="content">
          <Switch>
            <Route exact path='/'>
              <Home handleClick={handleClick} message={message} link={link} times={times} />
            </Route>
            <Route path='/landingpage'>
              <Landing />
            </Route>
            <Route exact path='/votersRegistered'>
              <VotersRegistered />
            </Route>
            <Route path='/votersRegistering'>
              <VotersRegistering />
            </Route>
            <Route path='/createelections'>
              <CreateElections />
            </Route>
            <Route path='/activateelections'>
              <ActivateElections />
            </Route>
            <Route path='/checkresults'>
              <CheckResults />
            </Route>
            <Route path='/publishedresults'>
              <PublishedResults />
            </Route>
            <Route path='/home'>
              <VoterHome />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
            <Route path='/activatedelections'>
              <ActivatedElections />
            </Route>
          </Switch>        
        </div>      
        <Footer></Footer>
      </div>
    </Router>
    
    
  );
}

export default App;
