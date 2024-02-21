import { Link } from 'react-router-dom';

const VoterHome = () => {
  const handleLogout = async() => {
    // Disconnect the Solana wallet (assuming window.solana is used)
    if (window.solana && window.solana.disconnect) {
      try {
        await window.solana.disconnect();
      } catch (error) {
        console.error('Error disconnecting wallet:', error);
      }
    }
    

    // Redirect to the home page
    window.location.href = '/';
  }
    return ( 
        <div>
            <nav className="navbar">
            <Link to="/"><h1>SVote</h1></Link>
            <div className="links">             
              <button onClick={handleLogout} style={{
                color: 'white',
                backgroundColor: '#007bff',
                borderRadius: '16px'
              }}>Logout</button>
            </div>
          </nav>
            <div>
              <h1>Welcome to your votering account</h1>
              <Link to='/register'>Register</Link><br />
              <Link to='/activatedelections'> Activated Elections</Link><br />
              <Link to='/checkresults'> Check Results</Link><br />
              <Link to='/publishedresults'> Published Results</Link>
            </div>
        </div>   
    
     );
}
 
export default VoterHome;