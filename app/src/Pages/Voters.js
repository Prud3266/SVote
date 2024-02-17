import { Link } from 'react-router-dom';

const Voters = () => {
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
            <Link to='/votersRegistered'>Registered</Link><br />
            <Link to='/votersRegistering'>Processing</Link>
        </div>
        </div>
        
     );
}
 
export default Voters;