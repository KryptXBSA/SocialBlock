use anchor_lang::prelude::*;

declare_id!("9UEB181u3WjjiiWV2WWHHEq16LPhkZa8STAUHXBLx2bp");

#[program]
pub mod post {
    use super::*;
    pub fn send_post(
        ctx: Context<SendPost>,
        block: String,
        content: String,
        username: String,
        image: String,
    ) -> Result<()> {
        let post: &mut Account<Post> = &mut ctx.accounts.post;
        let author: &Signer = &ctx.accounts.author;
        let clock: Clock = Clock::get().unwrap();

        if block.chars().count() > 50 {
            return Err(ErrorCode::BlockTooLong.into());
        }

        if content.chars().count() > 280 {
            return Err(ErrorCode::ContentTooLong.into());
        }
        post.author = *author.key;
        post.timestamp = clock.unix_timestamp;
        post.block = block;
        post.content = content;
        post.image = image;
        post.username = username;
        post.likes = Vec::new();

        Ok(())
    }
    pub fn like(ctx: Context<Like>, ownerr: Pubkey) -> Result<()> {
        let post: &mut Account<Post> = &mut ctx.accounts.post;
        if post.likes.contains(&ownerr) {
            return err!(ErrorCode::AlreadyLiked);
        } else {
            post.likes.push(ownerr);
        }
        Ok(())
    }
    pub fn unlike(ctx: Context<Like>, ownerr: Pubkey) -> Result<()> {
        let post: &mut Account<Post> = &mut ctx.accounts.post;
        if post.likes.contains(&ownerr) {
            post.likes.retain(|&x| x != ownerr);
        } else {
            return err!(ErrorCode::AlreadyUnliked);
        }

        Ok(())
    }
}


#[derive(Accounts)]
pub struct Like<'info> {
    #[account(mut)]
    pub post: Account<'info, Post>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct SendPost<'info> {
    #[account(init, payer = author, space = Post::LEN)]
    pub post: Account<'info, Post>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Post {
    pub author: Pubkey,
    pub block: String,
    pub timestamp: i64,
    pub content: String,
    pub image: String,
    pub username: String,
    pub likes: Vec<Pubkey>,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_TOPIC_LENGTH: usize = 50 * 4; // 50 chars max.
const MAX_CONTENT_LENGTH: usize = 280 * 8; // 280 chars max.

impl Post {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + TIMESTAMP_LENGTH // Timestamp.
        + STRING_LENGTH_PREFIX + MAX_TOPIC_LENGTH // Topic.
        + STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH; // Content.
}

#[error_code]
pub enum ErrorCode {
    #[msg("The provided block should be 50 characters long maximum.")]
    BlockTooLong,
    #[msg("The provided content should be 280 characters long maximum.")]
    ContentTooLong,
    #[msg("Already liked")]
    AlreadyLiked,
    #[msg("Already Unliked")]
    AlreadyUnliked,
}
