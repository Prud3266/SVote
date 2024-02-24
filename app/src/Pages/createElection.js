import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Connection, Keypair, PublicKey, Transaction, TransactionInstruction, sendAndConfirmTransaction } from '@solana/web3.js';

const CreateElections = ({ onSubmit }) => {
  const [electionName, setElectionName] = useState('');
  const [electionInfo, setElectionInfo] = useState('');
  const [numCandidates, setNumCandidates] = useState();
  const [candidateNames, setCandidateNames] = useState(Array(numCandidates).fill(''));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Creating Election')
    // console.log({ electionName, electionInfo });

    
    // Establish a connection to the Solana devnet (replace with your network details)
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

    // Replace the following with the address of your deployed smart contract
    const programId = new PublicKey('YOUR_PROGRAM_ID');

    // Replace the following with the public key of the account that will execute the transaction
    const fromPubkey = new PublicKey('YOUR_FROM_PUBLIC_KEY');

    // Create an account to store the election data on the Solana blockchain
    const electionAccount = new Keypair();

    // Your smart contract's instruction data (adjust based on your contract)
    const data = Buffer.from(JSON.stringify({ electionName, electionInfo, numCandidates, candidateNames }));

    // Create a transaction instruction
    const instruction = new TransactionInstruction({
      programId,
      keys: [
        { pubkey: fromPubkey, isSigner: true, isWritable: false },
        { pubkey: electionAccount.publicKey, isSigner: false, isWritable: true },
        // Add any other keys as needed by your smart contract
      ],
      data,
    });

    // Create and sign a transaction
    const transaction = new Transaction().add(instruction);
    const signedTransaction = await window.solana.signTransaction(transaction);

    // Send the transaction to the Solana blockchain
    await sendAndConfirmTransaction(connection, signedTransaction);

    // Optionally, you can redirect the user or perform other actions after the transaction is confirmed
    console.log('Election created successfully!');
   
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