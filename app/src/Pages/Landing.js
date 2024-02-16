import { Link } from 'react-router-dom';

const Landing = () => {
    return ( 
        <div>
            <Link to='/Voters'>Voters</Link><br />
            <Link to='/Elections'>Elections</Link>
        </div>
     );
}
 
export default Landing;