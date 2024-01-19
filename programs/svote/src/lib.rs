use anchor_lang::prelude::*;

declare_id!("CwJdUJj3otvs94vAABn99fBj44c3AJmod97rZ2ETTjjv");

#[program]
pub mod svote {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("All Done!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
