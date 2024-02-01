const Navbar = () => {
    return ( 
        <nav className="navbar">
            <a href="/"><h1>SVote</h1></a>
            <div className="links">
                <a href="/">Home</a>
                <a href="/">Register</a>
                <a href="/">Vote</a>
                <a href="/">Setup</a>
                <a href="/" style={{
                    color: 'white',
                    backgroundColor: '#007bff',
                    borderRadius: '8px'
                }}>Connect Wallet</a>
            </div>
        </nav>
     );
}
 
export default Navbar;  