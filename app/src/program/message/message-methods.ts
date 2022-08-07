/** @format */

import * as anchor from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
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




type SendMessage = {
    program: anchor.Program<Message>;
    content: string;
    wallet: AnchorWallet;
    to: anchor.web3.PublicKey
};

export const newMessage = async ({
    wallet,
    program,
    content,
    to
}: SendMessage) => {


    const message = anchor.web3.Keypair.generate();

    let tx = await program.methods
        .newMessage(to, content)
        .accounts({
            message: message.publicKey,
            from: wallet.publicKey,
        })
        .signers([message])
        .rpc();

    const sentMessage = {
        publicKey: message.publicKey,
        from: wallet.publicKey,
        to: to,
        timestamp: new anchor.BN(new Date().getTime()),
        content,
    };

    return { message: sentMessage, tx };
};
