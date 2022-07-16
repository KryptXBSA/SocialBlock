/** @format */

import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
const Transaction = anchor.web3.Transaction;
import { Comment, AccountData } from "./comment";

export const newComment = async ({
    commentProgram,
    postPubkey,
    walletPubkey,
    username,
    content,
}: any) => {
    const newCommentAccount = anchor.web3.Keypair.generate();
try {
     let result=  await commentProgram.methods
        .newComment(postPubkey, username, content)
        .accounts({
            comment: newCommentAccount.publicKey,
            author: walletPubkey,
        })
        .signers([newCommentAccount])
        .rpc();


} catch (error) {
    
    console.log(error);
    
}
     
    const newCommentAccount0: AccountData = {
        author: walletPubkey,
        postPubkey: postPubkey,
        publickey: newCommentAccount.publicKey.toBase58(),
        timestamp: new anchor.BN(new Date().getTime()),
        content,
        username,
    };
    return newCommentAccount0
};
export const getAllComments = async ({ program, filter = [] }: any) => {

    

    const postsRaw = await program.account.comment.all(filter);
    console.log(postsRaw);
    
    const posts = postsRaw.map((t: any) => new Comment(t.publicKey, t.account));
    return posts;
};

