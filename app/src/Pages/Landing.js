import { Link } from 'react-router-dom';

const Home = ({ link, message, times, handleClick}) => {
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
          <p>Ask <a href={link}>Google</a> For More About Us!</p>
        </div>
        </div>
        
     );
}
 
export default Home;