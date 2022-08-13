/** @format */
import * as anchor from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { User } from './user-type';
import bs58 from "bs58";

type GetUser = {
    program: anchor.Program<User>;
    pubkey?: string;
    username?: string;
};
export const getUserByPubkey = async ({ program, pubkey }: GetUser) => {

    const user0 = await program.account.user.all([pubkeyFilter(pubkey)]);

    const user = user0.map((m) => Object.assign({ publicKey: m.publicKey }, m.account));
    return user[0];
};
export const getUserByUsername = async ({ program, username }: GetUser) => {


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
        foundUser: true,
        user: { username },
        publicKey: user.publicKey,
        timestamp: new anchor.BN(new Date().getTime()),
        //delete this
        username,
        bookmarks: []
    };

    return { newUser, tx };
};
type ChangeImage = {
    program: anchor.Program<User>;
    image: string;
    wallet: AnchorWallet
};

export const changeImage = async ({
    wallet,
    program,
    image,
}: ChangeImage) => {


    const user = anchor.web3.Keypair.generate();
    let tx
    try {
        tx = await program?.methods
            .changeImage(image)
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
    return { status: 'success', tx };
};
type ChangeUsername = {
    program: anchor.Program<User>;
    username: string;
    wallet: AnchorWallet
};

export const changeUsername = async ({
    wallet,
    program,
    username,
}: ChangeUsername) => {


    const user = anchor.web3.Keypair.generate();
    let tx
    try {
        tx = await program?.methods
            .changeUsername(username)
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
    return { status: 'success', tx };
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
const pubkeyFilter = (publicKey: any) => ({
    memcmp: {
        offset: 8, // Discriminator.
        bytes: publicKey,
    },
});
const userFilter = (publicKey: string) => ({
    memcmp: {
        offset: 44, // Discriminator.
        bytes: bs58.encode(Buffer.from(publicKey)),
    },
});