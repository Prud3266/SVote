import Footer from './Footer';

function App() {
  const message = "SVote is a Solana Blockchain-based Voting System.";
  const link = "http://www.google.com";

  return (
    <div className="App">
      <nav className="navbar">
            <a href="/"><h1>SVote</h1></a>
            <div className="links">
              <a href="/" style={{
                color: 'white',
                backgroundColor: '#007bff',
                borderRadius: '16px'
              }}>Connect Wallet</a>
            </div>
        </nav>
      <div className="content">
        <h1>Welcome to SVote!</h1>
        <button style={{
                color: 'white',
                backgroundColor: '#007bff',
                borderRadius: '8px'
              }}>Connect Wallet</button>
        <p>{message}</p>
        <p>Ask <a href={link}>Google</a> For More About Us!</p>
      </div>      
      <Footer></Footer>
    </div>
    
  );
}

export default App;
