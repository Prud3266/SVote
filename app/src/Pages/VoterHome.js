import { Link } from 'react-router-dom';

const VoterHome = () => {
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
            <div>
              <h1>Welcome to your votering account</h1>
              <Link to='/register'>Register</Link><br />
              <Link to='/voterelections'>Elections</Link>
            </div>
        </div>   
    
     );
}
 
export default VoterHome;