import { Link } from 'react-router-dom';

const Voters = () => {
    return ( 
        <div className="content">
            <Link to='/votersRegistered'>Registered</Link><br />
            <Link to='/votersRegistering'>Processing</Link>
        </div>
     );
}
 
export default Voters;