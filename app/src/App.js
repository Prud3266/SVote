import './App.css';
import Navbar from './Navbar';
import Footer from './Footer';

function App() {
  const message = "SVote is a Solana Blockchain-based Voting System.";
  const link = "http://www.google.com";



  return (
    <div className="App">
      <Navbar />
      <div className="content">
          <h1>Welcome to SVote!</h1>
        <p>{message}</p>
        <p>Ask <a href={link}>Google</a> More About Us!</p>
      </div>
      
    </div>
    
  );
}

export default App;
