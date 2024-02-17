import { Link } from 'react-router-dom';

const Landing = () => {
    return ( 
        <div>
            <Link to='/voters'>Voters</Link><br />
            <Link to='/elections'>Elections</Link>
        </div>
     );
}
 
export default Landing;