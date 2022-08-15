use anchor_lang::prelude::*;

declare_id!("7Qy3XGGyGXVZAeC1Thxz38jwQ49jgyMtA2pQgNtB8Z4y");

#[program]
pub mod message {
    use super::*;

    pub fn new_message(ctx: Context<NewMessage>, to: Pubkey, content: String) -> Result<()> {
        let message: &mut Account<Message> = &mut ctx.accounts.message;
        let clock: Clock = Clock::get().unwrap();
        let from: &Signer = &ctx.accounts.from;
        if content.chars().count() > 280 {
            // return Err(ErrorCode::ContentTooLong.into());
        }
        message.from = *from.key;
        message.to = to;
        message.content = content;
        message.timestamp = clock.unix_timestamp;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct NewMessage<'info> {
    #[account(init, payer = from, space = Message::LEN)]
    pub message: Account<'info, Message>,
    #[account(mut)]
    pub from: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Message {
    pub from: Pubkey,
    pub to: Pubkey,
    pub content: String,
    pub timestamp: i64,
}
const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_TOPIC_LENGTH: usize = 50 * 4; // 50 chars max.
const MAX_CONTENT_LENGTH: usize = 280 * 8; // 280 chars max.

impl Message {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + TIMESTAMP_LENGTH // Timestamp.
        + STRING_LENGTH_PREFIX + MAX_TOPIC_LENGTH // Topic.
        + STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH; // Content.
}
