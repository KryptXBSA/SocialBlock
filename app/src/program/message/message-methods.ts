/** @format */

import * as anchor from "@project-serum/anchor";
import bs58 from "bs58";

import { Post, AccountData } from "../post";
import { Message } from './message-type';

type GetPostProps = {
    program: anchor.Program<Message>;
    pubkey: string;
};
export const getAllMessages = async ({ program, pubkey }: GetPostProps) => {
    const fromMessagesRaw = await program.account.message.all([fromFilter(pubkey)]);
    const toMessagesRaw = await program.account.message.all([toFilter(pubkey)]);
    let messagesRaw = fromMessagesRaw.concat(toMessagesRaw)

    const messages = messagesRaw.map((m) => Object.assign({ publicKey: m.publicKey }, m.account));
    return messages;
};

const fromFilter = (authorBase58PublicKey: string) => ({
    memcmp: {
        offset: 8, // Discriminator.
        bytes: authorBase58PublicKey,
    },
});
const toFilter = (authorBase58PublicKey: string) => ({
    memcmp: {
        offset: 8, // Discriminator.
        bytes: authorBase58PublicKey,
    },
});




type SendPostProps = {
    program: anchor.Program<anchor.Idl>;
    block: string;
    content: string;
    username: string;
    wallet: any;
};

export const sendPost = async ({
    wallet,
    program,
    block,
    content,
    username,
}: SendPostProps) => {


    const post = anchor.web3.Keypair.generate();

    let tx = await program.methods
        .sendPost(block, content, username)
        .accounts({
            author: wallet.publicKey.toBase58(),
            post: post.publicKey.toBase58(),
        })
        .signers([post])
        .rpc();

    const newPostAccount: AccountData = {
        author: wallet.publicKey,
        timestamp: new anchor.BN(new Date().getTime()),
        block,
        content,
        username,
        likes: [],
        comments: 0,
    };

    let sentPost = new Post(post.publicKey, newPostAccount);
    return { post: sentPost, tx };
};
export const like = async ({ wallet, program, postPubkey }: any) => {
    await program.methods
        .like(wallet.publicKey)
        .accounts({
            owner: wallet.publicKey,
            post: postPubkey,
        })
        .signers([])
        .rpc();
    return "liked";
};
export const unlike = async ({ wallet, program, postPubkey }: any) => {
    await program.methods
        .unlike(wallet.publicKey)
        .accounts({
            owner: wallet.publicKey,
            post: postPubkey,
        })
        .signers([])
        .rpc();
    return "unliked";
};

interface CommentType { username?: string, commentBody: string, authorPubkey: anchor.web3.PublicKey, wallet: any, program: anchor.Program<anchor.Idl>, postPubkey: anchor.web3.PublicKey }
export const NewComment = async ({ wallet, program, postPubkey, commentBody, authorPubkey, username }: CommentType) => {
    let c = await program.methods
        .comment()
        // .comment(commentBody,authorPubkey)
        .accounts({
            post: postPubkey,
            owner: wallet.publicKey,
        })
        .signers([])
        .rpc();

    return "commented";
};
