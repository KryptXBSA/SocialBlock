/** @format */
import * as anchor from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { User } from './user-type';

type GetUser = {
    program: anchor.Program<User>;
    pubkey: string;
};
export const getUser = async ({ program, pubkey }: GetUser) => {
    const user0 = await program.account.user.all([userFilter(pubkey)]);

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
        publicKey: user.publicKey,
        timestamp: new anchor.BN(new Date().getTime()),
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
const userFilter = (publicKey: string) => ({
    memcmp: {
        offset: 8, // Discriminator.
        bytes: publicKey,
    },
});