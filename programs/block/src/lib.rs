use anchor_lang::prelude::*;

declare_id!("jDisgxcmUiyERDhxEUuHTtpJjHu9NP1oYVwQsHFNcGA");

#[program]
pub mod block {
    use super::*;

    pub fn new_block(ctx: Context<NewBlock>, block_name: String) -> Result<()> {
        let block: &mut Account<Block> = &mut ctx.accounts.block;
        let owner: &Signer = &ctx.accounts.owner;

        let clock: Clock = Clock::get().unwrap();

        if block_name.chars().count() > 280 {
            // return Err(ErrorCode::ContentTooLong.into());
        }
        block.owner = *owner.key;
        block.block_name = block_name;
        block.timestamp = clock.unix_timestamp;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct NewBlock<'info> {
    #[account(init, payer = owner, space = Block::LEN)]
    pub block: Account<'info, Block>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Block {
    pub owner: Pubkey,
    pub timestamp: i64,
    pub block_name: String,
}
const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_TOPIC_LENGTH: usize = 50 * 4; // 50 chars max.
const MAX_CONTENT_LENGTH: usize = 280 * 8; // 280 chars max.

impl Block {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + TIMESTAMP_LENGTH // Timestamp.
        + STRING_LENGTH_PREFIX + MAX_TOPIC_LENGTH // Topic.
        + STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH; // Content.
}
