# Solana Voting Program

This Solana program, `svote`, implements a basic voting system using the Anchor framework. The program allows users to create elections, activate them, register voters, add candidates, vote in an election, and retrieve information about elections.

## Features

- **Create Election:** Create a new election with a specified name and a variable number of candidates (2 to 8).

- **Activate Election:** Activate an existing election, ensuring there are registered voters.

- **Register Voter:** Register a voter for a specific election.

- **Add Candidate:** Add a candidate to an existing election, with a candidate ID between 2 and 8.

- **Vote:** Allow a registered voter to cast a vote for a candidate in an active election.

- **Get Elections:** Retrieve information about existing elections.

## Usage

### Prerequisites

Make sure you have the Solana tool suite installed.

```bash
$ npm install -g @solana/cli
