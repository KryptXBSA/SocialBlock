/** @format */

import * as anchor from "@project-serum/anchor";
import bs58 from "bs58";

import { Post, PostAccountData } from "./post";

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
    block: string;
    content: string;
    username: string;
    image: string;
    wallet: any;
};

export const sendPost = async ({
    wallet,
    program,
    block,
    content,
    username,
    image
}: SendPostProps) => {


    const post = anchor.web3.Keypair.generate();

    let tx = await program.methods
        .sendPost(block, content, username,image)
        .accounts({
            author: wallet.publicKey.toBase58(),
            post: post.publicKey.toBase58(),
        })
        .signers([post])
        .rpc();

    const newPostAccount: PostAccountData = {
        author: wallet.publicKey,
        timestamp: new anchor.BN(new Date().getTime()),
        block,
        content,
        image,
        username,
        likes: [],
        comments: 0,
    };

    let sentPost = new Post(post.publicKey, newPostAccount);
    sentPost.timestamp=Date.now()/1000
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
