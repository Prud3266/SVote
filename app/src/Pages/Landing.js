import { Link, useHistory } from 'react-router-dom';
import { Connection, PublicKey } from '@solana/web3.js';
import React, { useEffect, useState } from 'react';
import * as web3 from '@solana/web3.js';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

import '@solana/wallet-adapter-react-ui/styles.css';

function Home() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { wallet, connected } = useWallet();
  const [balance, setBalance] = useState();
  const [message, setMessage] = useState('SVote is a Solana Blockchain-based Voting System.');
  const history = useHistory();


  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        if (connected && connection && publicKey) {
          const info = await connection.getAccountInfo(publicKey);
          setBalance(info?.lamports / web3.LAMPORTS_PER_SOL);
        }
      } catch (error) {
        console.error('Error fetching account info:', error);
        // Handle error fetching account info
      }
    };

    fetchAccountInfo();
  }, [connected, connection, publicKey]);

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
      } catch (error) {
        console.error('Error connecting to wallet:', error);
        setMessage('Error connecting to wallet');
      }
    } else {
      setMessage('Wallet not detected. Please install Phantom or another Solana wallet extension.');
    }
  }

  const handleClick1 = async () => {
    try {
      if (connected) {
        // Your logic for connected wallet
        const walletAddress = wallet?.publicKey?.toBase58(); // Fetch the wallet address
        console.log('Wallet Address:', walletAddress);

        if (wallet?.publicKey?.equals(new PublicKey('AxXaMYqiZWkppdEKteWDH7wd2Smn12scudramaxj4QGX'))) {
          history.push('/landingpage');
        } else {
          history.push('/home');
        }
      } else {
        // Handle wallet not connected
        setMessage('Wallet not detected. Please install Phantom or another Solana wallet extension.');
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      // Handle error connecting to wallet
      setMessage('Error connecting to wallet');
    }
  };

  return (
    <ConnectionProvider>
      <WalletProvider>
        <WalletModalProvider>
          <div>
            <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link to="/"><h1>SVote☑️</h1></Link>
              <WalletMultiButton onClick={handleClick1}>Select Wallet</WalletMultiButton>
            </nav>
            <div className="content">
              <h1>Welcome to SVote!</h1>
              <button onClick={handleClick} style={{
                color: 'white',
                backgroundColor: '#007bff',
                borderRadius: '8px'
              }}>Connect Wallet</button>
              <p>{message}</p>
              <p>Ask <a href='https://www.google.com'>Google</a> For More About Us!</p>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
    
  );
}

export default Home;