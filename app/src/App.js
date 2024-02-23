import Footer from './Components/Footer';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as web3 from '@solana/web3.js';
import {
  ConnectionProvider,
  WalletProvider,
  useConnection,
  useWallet,
  WalletMultiButton,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import '@solana/wallet-adapter-react-ui/styles.css';

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
  const [balance, setBalance] = useState(0);
  const endpoint = web3.clusterApiUrl('devnet');
  const wallets = [new PhantomWalletAdapter()];

  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    const getInfo = async () => {
      if (connection && publicKey) {
        try {
          const info = await connection.getAccountInfo(publicKey);
          setBalance(info?.lamports / web3.LAMPORTS_PER_SOL);
        } catch (error) {
          console.error('Error getting account info:', error);
        }
      }
    };

    getInfo();
  }, [connection, publicKey]);


  const [message, setMessage] = useState('SVote is a Solana Blockchain-based Voting System.');
  const [times, setTimes] = useState('');
  const handleClick = () => {
    setMessage('SVote Rock!');
    setTimes('23 times');
  }

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
            <Router>
              <div className="App">
                <div className="content">
                  <Switch>
                    <Route exact path='/'>
                      <Home handleClick={handleClick} message={message} times={times} />
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
          </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
    
    
  );
}

export default App;
