import { Link } from 'react-router-dom';

const Elections = () => {
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
            <Link to='/createelections'> Create Elections</Link><br />
            <Link to='/activateelections'> Activate Elections</Link><br />
            <Link to='/checkresults'> Check Results</Link><br />
            <Link to='/publishedresults'> Published Results</Link>
        </div>
        </div>
     );
}
 
export default Elections;