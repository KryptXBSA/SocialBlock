/** @format */

import * as anchor from "@project-serum/anchor";
import bs58 from "bs58";

import { Post, AccountData } from "./post";

type GetPostProps = {
    program: anchor.Program<anchor.Idl>;
    filter?: unknown[];
};
export const getAllPosts = async ({ program, filter = [] }: GetPostProps) => {
    const postsRaw = await program.account.post.all(filter as any);
    

    const posts = postsRaw.map((t: any) => new Post(t.publicKey, t.account));
    return posts;
};

export const authorFilter = (authorBase58PublicKey: string) => ({
    memcmp: {
        offset: 8, // Discriminator.
        bytes: authorBase58PublicKey,
    },
});

export const topicFilter = (topic: string) => ({
    memcmp: {
        offset:
            8 + // Discriminator.
            32 + // Author public key.
            8 + // Timestamp.
            4, // Topic string prefix.
        bytes: bs58.encode(Buffer.from(topic)),
    },
});

type SendPostProps = {
    program: anchor.Program<anchor.Idl>;
    topic: string;
    content: string;
    username: string;
    wallet: any;
};

export const sendPost = async ({
    wallet,
    program,
    topic,
    content,
    username,
}: SendPostProps) => {
    

    const post = anchor.web3.Keypair.generate();

    let tx = await program.methods
        .sendPost(topic, content, username)
        .accounts({
            author: wallet.publicKey.toBase58(),
            post: post.publicKey.toBase58(),
        })
        .signers([post])
        .rpc();

    const newPostAccount: AccountData = {
        author: wallet.publicKey,
        timestamp: new anchor.BN(new Date().getTime()),
        topic,
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

export const comment = async ({ wallet, program, postPubkey }: any) => {
    await program.methods
        .comment()
        .accounts({
            post: postPubkey,
            owner: wallet.publicKey,
        })
        .signers([])
        .rpc();
    return "commented";
};
