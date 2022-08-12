use anchor_lang::prelude::*;

declare_id!("29FTScCpe4oB8zFMzQHcprtjdWisqGAB39NqRNuwtoeR");

#[program]
pub mod user {
    use super::*;

    pub fn new_user(ctx: Context<NewUser>, username: String) -> Result<()> {
        let user_account: &mut Account<User> = &mut ctx.accounts.user_account;
        let clock: Clock = Clock::get().unwrap();
        let user: &Signer = &ctx.accounts.user;
        if username.chars().count() > 280 {
            // return Err(ErrorCode::ContentTooLong.into());
        }
        user_account.user = *user.key;
        user_account.username = username;
        user_account.image = String::new();
        user_account.timestamp = clock.unix_timestamp;
        user_account.bookmarks = Vec::new();

        Ok(())
    }
    pub fn change_username(ctx: Context<ChangeUsername>, username: String) -> Result<()> {
        let user_account: &mut Account<User> = &mut ctx.accounts.user_account;
        if username.chars().count() > 280 {
            // return Err(ErrorCode::ContentTooLong.into());
        }
        user_account.username = username;
        Ok(())
    }

    pub fn add_bookmarks(ctx: Context<AddBookmarks>, bookmark: Pubkey) -> Result<()> {
        let user_account: &mut Account<User> = &mut ctx.accounts.user_account;
          if user_account.bookmarks.contains(&bookmark) {
            // return err!(ErrorCode::AlreadyLiked);
        } else {
            user_account.bookmarks.push(bookmark);
        }
        Ok(())
    }
}

#[derive(Accounts)]
// #[instruction(space_required: u32)]
pub struct NewUser<'info> {
    #[account(init, payer = user, space = User::LEN)]
    pub user_account: Account<'info, User>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct User {
    pub user: Pubkey,
    pub username: String,
    pub image: String,
    pub timestamp: i64,
    pub bookmarks: Vec<Pubkey>,
}

#[derive(Accounts)]
pub struct ChangeUsername<'info> {
    pub user_account: Account<'info, User>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct AddBookmarks<'info> {
    pub user_account: Account<'info, User>,
    #[account(mut)]
    pub user: Signer<'info>,
}


const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_TOPIC_LENGTH: usize = 50 * 4; // 50 chars max.
const MAX_CONTENT_LENGTH: usize = 280 * 8; // 280 chars max.

impl User {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + TIMESTAMP_LENGTH // Timestamp.
        + STRING_LENGTH_PREFIX + MAX_TOPIC_LENGTH // Topic.
        + STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH; // Content.
}
