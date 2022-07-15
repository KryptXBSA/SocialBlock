/** @format */

import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
const Transaction = anchor.web3.Transaction;
import { Comment, AccountData } from "./comment.ts";

export const newComment = async ({
    commentProgram,
    postPubkey,
    walletPubkey,
    username,
    content,
}: any) => {
    const newCommentAccount = anchor.web3.Keypair.generate();

    await commentProgram.methods
        .newComment(postPubkey, username, content)
        .accounts({
            comment: newCommentAccount.publicKey,
            author: walletPubkey,
        })
        .signers([newCommentAccount])
        .rpc();

    let newComment = {};
    // setTimeout(async () => {
    //     newComment = await commentProgram.account.comment.fetch(
    //         newCommentAccount.publicKey
    //     );
    //     console.log("Delayed for 15 seconds.");
    //     console.log(newComment);


    //     // return newComment;
    // }, 15000);
    const newCommentAccount0: AccountData = {
        author: walletPubkey,
        postPubkey: postPubkey,
        publickey: newCommentAccount.publicKey.toBase58(),
        timestamp: new anchor.BN(new Date().getTime()),
        content,
        username,
    };
    return newCommentAccount0
    // console.log('new');
    // console.log(newCommentAccount);
    // console.log(newCommentAccount0);
    // console.log('new');
    
    // return new Comment(newCommentAccount, newCommentAccount0)
};
export const getAllComments = async ({ program, filter = [] }: any) => {

    console.log(filter);

    const postsRaw = await program.account.comment.all(filter);
    const posts = postsRaw.map((t: any) => new Comment(t.publicKey, t.account));
    return posts;
};

