import { Link } from 'react-router-dom';

const Home = () => {
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
          <h1>Welcome Admin to your account</h1>
            <Link to='/voters'>Voters</Link><br />
            <Link to='/elections'>Elections</Link>
        </div>
        </div>
        
     );
}
 
export default Home;