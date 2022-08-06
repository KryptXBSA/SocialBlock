use anchor_lang::prelude::*;

declare_id!("2BqbRJMk2CPseUTzGJcQHbKrsyR3wVFZT1NEWCCUNv5d");

#[program]
pub mod comment {

    use super::*;
    pub fn new_comment(ctx: Context<NewComment>,post_pubkey:Pubkey, username: String, content: String) -> Result<()>  {
        let comment: &mut Account<Comment> = &mut ctx.accounts.comment;
        let author: &Signer = &ctx.accounts.author;
        let clock: Clock = Clock::get().unwrap();
        
        comment.author = *author.key;
        comment.timestamp = clock.unix_timestamp;
        comment.username = username;
        comment.content = content;
        comment.post_pubkey = post_pubkey;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct NewComment<'info> {
    #[account(init, payer = author, space = Comment::LEN)]
    pub comment: Account<'info, Comment>,
    #[account(mut)]
    pub author: Signer<'info>,
    // #[account(address = system_program::ID)]
    // pub system_program: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Comment {
    pub author: Pubkey,
    pub  post_pubkey : Pubkey,
    pub timestamp: i64,
    pub username: String,
    pub content: String,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_TOPIC_LENGTH: usize = 50 * 4; // 50 chars max.
const MAX_CONTENT_LENGTH: usize = 280 * 4; // 280 chars max.

impl Comment {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + TIMESTAMP_LENGTH // Timestamp.
        + STRING_LENGTH_PREFIX + MAX_TOPIC_LENGTH // Topic.
        + STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH // Content.
        + STRING_LENGTH_PREFIX + PUBLIC_KEY_LENGTH;// Content.
}

// #[error]
// pub enum ErrorCode {
//     #[msg("The provided topic should be 50 characters long maximum.")]
//     TopicTooLong,
//     #[msg("The provided content should be 280 characters long maximum.")]
//     ContentTooLong,
// }
