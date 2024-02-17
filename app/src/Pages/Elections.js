import { Link } from 'react-router-dom';
const Elections = () => {
    return ( 
        <div className="content">
            <Link to='/createelections'> Create Elections</Link><br />
            <Link to='/activateelections'> Activate Elections</Link><br />
            <Link to='/checkresults'> Check Results</Link><br />
            <Link to='/publishedresults'> Published Results</Link>
        </div>
     );
}
 
export default Elections;