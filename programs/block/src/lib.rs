use anchor_lang::prelude::*;

declare_id!("5ZGZX4uPcbRmXVhAYmiSs3Bf3h6uBvcph2LPxG2a5Sxv");

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
        block.image = String::new();
        block.timestamp = clock.unix_timestamp;
        Ok(())
    }
    pub fn change_image(ctx: Context<ChangeImage>, image: String) -> Result<()> {
        let block_account: &mut Account<Block> = &mut ctx.accounts.block;
        if image.chars().count() > 280 {
            // return Err(ErrorCode::ContentTooLong.into());
        }
        block_account.image = image;
        Ok(())
    }
    pub fn change_name(ctx: Context<ChangeImage>, name: String) -> Result<()> {
        let block_account: &mut Account<Block> = &mut ctx.accounts.block;
        if name.chars().count() > 280 {
            // return Err(ErrorCode::ContentTooLong.into());
        }
        block_account.block_name = name;
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
#[derive(Accounts)]
pub struct ChangeName<'info> {
    #[account(mut, has_one = owner)]
    pub block: Account<'info, Block>,
    pub owner: Signer<'info>,
}
#[derive(Accounts)]
pub struct ChangeImage<'info> {
    #[account(mut, has_one = owner)]
    pub block: Account<'info, Block>,
    pub owner: Signer<'info>,
}
#[account]
pub struct Block {
    pub owner: Pubkey,
    pub block_name: String,
    pub image: String,
    pub timestamp: i64,
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
