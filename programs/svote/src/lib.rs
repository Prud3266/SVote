use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};
use std::collections::{HashMap, BTreeMap};
use std::convert::TryInto;

#[program]
mod svote {
    use super::*;

    #[state]
    pub struct Election {
        pub admin: Pubkey,
        pub name: String,
        pub is_active: bool,
        pub registered_voters: BTreeMap<u64, Voter>,
        pub votes: HashMap<u64, u32>,//What is this doing?
        pub candidates: HashMap<u64, String>,
        pub published_results: Option<HashMap<u64, u32>>,
    }

    pub struct Voter {
        pub identity_hash: Vec<u8>,
        pub phone_hash: Vec<u8>,
        pub has_voted: bool,
        pub vote_count: u32, // Added field for vote count
    }

    #[derive(Accounts)]
    pub struct CreateElection<'info> {
        #[account(init, payer = admin, space = 8 + name.len(), seeds = [&admin.key().to_bytes()[..], name.as_bytes()])]
        pub election: Account<'info, Election>,
        pub admin: AccountInfo<'info>,
        pub system_program: AccountInfo<'info>,
        pub rent: Sysvar<'info, Rent>,
        pub clock: Sysvar<'info, Clock>,
    }

    #[derive(Accounts)]
    pub struct ActivateElection<'info> {
        #[account(mut)]
        pub election: Account<'info, Election>,
    }

    #[derive(Accounts)]
    pub struct RegisterVoter<'info> {
        #[account(mut)]
        pub election: Account<'info, Election>,
        pub voter: AccountInfo<'info>,
    }

    #[derive(Accounts)]
    pub struct AddCandidate<'info> {
        #[account(mut)]
        pub election: Account<'info, Election>,
        pub admin: AccountInfo<'info>,
    }

    #[derive(Accounts)]
    pub struct Vote<'info> {
        #[account(mut)]
        pub election: Account<'info, Election>,
        pub voter: AccountInfo<'info>,
    }

    #[derive(Accounts)]
    pub struct GetElections<'info> {
        #[account(mut)]
        pub elections: Vec<AccountInfo<'info>>,
    }

    #[derive(Accounts)]
    pub struct PublishResults<'info> {
        #[account(mut)]
        pub election: Account<'info, Election>,
    }

    #[derive(Accounts)]
    pub struct GetResults<'info> {
        #[account(mut)]
        pub election: Account<'info, Election>,
    }

    pub fn create_election(
        ctx: Context<CreateElection>,
        name: String,
        candidates: Vec<String>,
    ) -> ProgramResult {
        // Validate the number of candidates
        if candidates.len() < 2 || candidates.len() > 8 {
            return Err(ProgramError::InvalidArgument);
        }
    
        let election = &mut ctx.accounts.election;
        election.admin = *ctx.accounts.admin.key;
        election.name = name;
    
        // Initialize candidates
        for (i, candidate_name) in candidates.into_iter().enumerate() {
            let candidate_id = (i + 2) as u64; // Starting candidate ID from 2
            election.candidates.insert(candidate_id, candidate_name);
        }
    
        Ok(())
    }

    pub fn activate_election(ctx: Context<ActivateElection>) -> ProgramResult {
        let election = &mut ctx.accounts.election;
        if election.registered_voters.is_empty() {
            return Err(ErrorCode::NoRegisteredVoters.into());
        }
        election.is_active = true;
        Ok(())
    }

    pub fn register_voter(ctx: Context<RegisterVoter>) -> ProgramResult {
        let election = &mut ctx.accounts.election;
        let voter_id = hash_identity_and_phone(
            &ctx.accounts.voter.key.to_bytes(),
            &b"",
            &b"",
        );

        election.registered_voters.insert(
            voter_id,
            Voter {
                identity_hash: Vec::new(),
                phone_hash: Vec::new(),
                has_voted: false,
                vote_count: 0, // Initialize vote count to 0
            },
        );

        Ok(())
    }

    pub fn add_candidate(ctx: Context<AddCandidate>, candidate_id: u64, name: String) -> ProgramResult {
        let election = &mut ctx.accounts.election;
        if candidate_id < 2 || candidate_id > 8 {
            return Err(ErrorCode::InvalidCandidateId.into());
        }

        election.candidates.insert(candidate_id, name);
        Ok(())
    }

    pub fn vote(ctx: Context<Vote>, candidate_id: u64) -> ProgramResult {
        let election = &mut ctx.accounts.election;
        let voter_id = hash_identity_and_phone(
            &ctx.accounts.voter.key.to_bytes(),
            &b"",
            &b"",
        );

        // Check if the voter is registered
        let voter = election.registered_voters.get_mut(&voter_id).ok_or(ErrorCode::VoterNotRegistered)?;

        // Check if the voter has already voted
        if voter.has_voted {
            return Err(ErrorCode::VoterAlreadyVoted.into());
        }

        // Check if the election is active
        if !election.is_active {
            return Err(ErrorCode::ElectionNotActive.into());
        }

        // Check if the candidate is valid
        if !election.candidates.contains_key(&candidate_id) {
            return Err(ErrorCode::InvalidCandidate.into());
        }

        // Update the vote count for the candidate
        let vote_count = election.votes.entry(candidate_id).or_insert(0);
        *vote_count += 1;

        // Increment the voter's vote count
        voter.vote_count += 1;

        // Mark the voter as voted
        voter.has_voted = true;

        Ok(())
    }

    pub fn get_elections(ctx: Context<GetElections>) -> ProgramResult {
        for election_info in ctx.accounts.elections.iter() {
            let election = Election::load_mut(&election_info)?;
            // Do something with the election information
        }
        Ok(())
    }
// 
    pub fn publish_results(ctx: Context<PublishResults>) -> ProgramResult {
        let election = &mut ctx.accounts.election;
        
        // Check if the election is active
        if !election.is_active {
            return Err(ErrorCode::ElectionNotActive.into());
        }
    
        // Check if results are already published
        if election.published_results.is_some() {
            return Err(ErrorCode::ResultsAlreadyPublished.into());
        }
    
        // Publish the results (copy from votes to published_results)
        election.published_results = Some(election.votes.clone());
    
        Ok(())
    }
    
    pub fn get_results(ctx: Context<GetResults>) -> ProgramResult {
        let election = &ctx.accounts.election;
    
        // Check if the election is active
        if !election.is_active {
            return Err(ErrorCode::ElectionNotActive.into());
        }
    
        // Check if results are published
        let results = election.published_results.as_ref().ok_or(ErrorCode::ResultsNotPublished)?;
    
        // Do something with the published results
        for (candidate_id, vote_count) in results.iter() {
            return results
        }
    
        Ok(())
    }
    
    // Hash function for generating a unique voter ID
    fn hash_identity_and_phone(identity: &[u8], phone: &[u8], election_name: &[u8]) -> u64 {
        let combined_data: Vec<u8> = identity.iter().chain(phone.iter()).chain(election_name.iter()).cloned().collect();
        let hashed = solana_program::hash::hash(combined_data.as_slice());
        u64::from_le_bytes(hashed[..8].try_into().unwrap())
    }

    #[error]
    pub enum ErrorCode {
        #[msg("Election is not active")]
        ElectionNotActive,

        #[msg("Voter is not registered for the election")]
        VoterNotRegistered,

        #[msg("Candidate is not valid")]
        InvalidCandidate,

        #[msg("Voter has already voted")]
        VoterAlreadyVoted,

        #[msg("Invalid candidate ID, must be between 2 and 8")]
        InvalidCandidateId,

        #[msg("No voters are registered for the election")]
        NoRegisteredVoters,

        #[msg("Results are already published for the election")]
        ResultsAlreadyPublished,

        #[msg("Results are not yet published for the election")]
        ResultsNotPublished,
        }
}
