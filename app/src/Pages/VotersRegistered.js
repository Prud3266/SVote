import { Link } from 'react-router-dom';

const VotersRegistered = () => {
    return ( 
      <div className="">
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
        <div className="contents">
        <h1>Voters Registered</h1>
        </div>
      </div>
        
        
     );
}
 
export default VotersRegistered;