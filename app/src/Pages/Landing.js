import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

function Home() {
  const [message, setMessage] = useState('SVote is a Solana Blockchain-based Voting System.');
  const [times, setTimes] = useState('');
  const history = useHistory();

  const handleClick = async () => {
    // Connect to the Solana network
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

    // Check if a Solana wallet is connected
    if (window.solana && window.solana.isPhantom) {
      try {
        // Request connection to the wallet
        await window.solana.connect();

        // Get the connected wallet public key
        const walletPublicKey = new PublicKey(window.solana.publicKey.toString());

        // Check the wallet public key and route accordingly
        if (walletPublicKey.equals(new PublicKey('AxXaMYqiZWkppdEKteWDH7wd2Smn12scudramaxj4QGX'))) {
          // Route to '/adminhome'
          history.push('/landingpage');
        } else {
          // Route to '/votehome'
          history.push('/home');
        }

        // Fetch the wallet balance as an example
        const balance = await connection.getBalance(walletPublicKey);
        
        setMessage(`Connected to wallet with balance: ${balance} SOL`);
        setTimes('');
      } catch (error) {
        console.error('Error connecting to wallet:', error);
        setMessage('Error connecting to wallet');
        setTimes('');
      }
    } else {
      setMessage('Wallet not detected. Please install Phantom or another Solana wallet extension.');
      setTimes('');
    }
  }

  return (
    <div>
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
        <h1>Welcome to SVote!</h1>
        <button onClick={handleClick} style={{
          color: 'white',
          backgroundColor: '#007bff',
          borderRadius: '8px'
        }}>Connect Wallet</button>
        <p>{message} {times}</p>
        <p>Ask <a href='https://www.google.com'>Google</a> For More About Us!</p>
      </div>
    </div>
  );
}

export default Home;