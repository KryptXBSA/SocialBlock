/** @format */
import * as anchor from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { User } from './user-type';

type GetUser = {
    program: anchor.Program<User>;
    pubkey?: string;
    username?: string;
};
export const getUserByPubkey = async ({ program, pubkey }: GetUser) => {
    console.log('programmm22',program.account.user);
    
    const user0 = await program.account.user.all([pubkeyFilter(pubkey!)]);

    const user = user0.map((m) => Object.assign({ publicKey: m.publicKey }, m.account));
    return user[0];
};
export const getUserByUsername = async ({ program, username }: GetUser) => {
    console.log('programmm',program.account);
    const user0 = await program.account.user.all([userFilter(username!)]);

    const user = user0.map((m) => Object.assign({ publicKey: m.publicKey }, m.account));
    return user[0];
};
type NewUser = {
    program: anchor.Program<User>;
    username: string;
    wallet: AnchorWallet
};

export const newUser = async ({
    wallet,
    program,
    username,
}: NewUser) => {
    
    console.log(await program.account.user.all([]));
    
    const user = anchor.web3.Keypair.generate();
    let tx
    try {
        tx = await program?.methods
            .newUser(username)
            .accounts({
                userAccount: user.publicKey,
                user: wallet?.publicKey,
            })
            .signers([user])
            .rpc();
        console.log(tx);
    } catch (e) {
        console.log('new user Error');
        console.log(e);
    }


    const newUser = {
        foundUser:true,
        user:{username},
        publicKey: user.publicKey,
        timestamp: new anchor.BN(new Date().getTime()),
        //delete this
        username,
        bookmarks: []
    };

    return { newUser, tx };
};

type AddBookmark = {
    program: anchor.Program<User>;
    bookmark: anchor.web3.PublicKey;
    userAccount: anchor.web3.PublicKey;
    wallet: AnchorWallet
};
export const addBookmark = async ({
    wallet,
    program,
    bookmark,
    userAccount
}: AddBookmark) => {
    let tx
    try {
        tx = await program?.methods
            .addBookmarks(bookmark)
            .accounts({
                userAccount: userAccount,
                user: wallet?.publicKey,
            })
            .signers([])
            .rpc();
        console.log(tx);
    } catch (e) {
        console.log('new bookmark Error');
        console.log(e);
    }

    return { status: 'success', tx };
};
const pubkeyFilter = (publicKey: string) => ({
    memcmp: {
        offset: 8, // Discriminator.
        bytes: publicKey,
    },
});
const userFilter = (publicKey: string) => ({
    memcmp: {
        offset: 40, // Discriminator.
        bytes: publicKey,
    },
});