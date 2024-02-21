import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const CreateElections = ({ onSubmit }) => {
  const [electionName, setElectionName] = useState('');
  const [electionInfo, setElectionInfo] = useState('');
  const [numCandidates, setNumCandidates] = useState(0);
  const [candidateNames, setCandidateNames] = useState(Array(numCandidates).fill(''));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating Election')
    // Pass the form data to the parent component
    console.log({ electionName, electionInfo });
  };

  const handleNumCandidatesChange = (e) => {
    const count = parseInt(e.target.value, 10) || 0;
    setNumCandidates(count);
    setCandidateNames(Array(count).fill(''));
  };

  const handleCandidateNameChange = (index, value) => {
    const updatedNames = [...candidateNames];
    updatedNames[index] = value;
    setCandidateNames(updatedNames);
  };

  const handleLogout = async() => {
    // Disconnect the Solana wallet (assuming window.solana is used)
    if (window.solana && window.solana.disconnect) {
      try {
        await window.solana.disconnect();
      } catch (error) {
        console.error('Error disconnecting wallet:', error);
      }
    }
    // Redirect to the home page
    window.location.href = '/';
  }
  return (

    <div>
      <nav className="navbar">
        <Link to="/"><h1>SVote</h1></Link>
        <div className="links">         
          <Link to='/landingpage'>Home</Link>    
          <button onClick={handleLogout} style={{
            color: 'white',
            backgroundColor: '#007bff',
            borderRadius: '16px'
            }}>Logout</button>
        </div>
      </nav>
      <div className="contents">
        <h1>Create Election</h1>
        <Form onSubmit={handleSubmit}>
      <Form.Group controlId="electionName">
        <Form.Label>Election Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter election name"
          value={electionName}
          onChange={(e) => setElectionName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="electionInfo">
        <Form.Label>Information about the Election</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter information about the election"
          value={electionInfo}
          onChange={(e) => setElectionInfo(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="numCandidates">
        <Form.Label>Number of Candidates</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter the number of candidates"
          value={numCandidates}
          onChange={handleNumCandidatesChange}
        />
      </Form.Group>

      <Form.Group controlId="candidateNames">
        <Form.Label>Candidate Names</Form.Label>
        {candidateNames.map((name, index) => (
          <Form.Control
            key={index}
            type="text"
            placeholder={`Enter name for Candidate ${index + 1}`}
            value={name}
            onChange={(e) => handleCandidateNameChange(index, e.target.value)}
          />
        ))}
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Election
      </Button>
    </Form>
      </div>
    </div> 
            
  );
}
 
export default CreateElections;