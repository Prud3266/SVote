const Home = ({ link, message, times, handleClick}) => {
    return ( 
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
     );
}
 
export default Home;