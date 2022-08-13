import { PublicKey } from '@solana/web3.js';
/** @format */
import * as anchor from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Message } from './message-type';

type GetMessages = {
    program: anchor.Program<Message>;
    pubkey: string;
};
export const getAllMessages = async ({ program, pubkey }: GetMessages) => {
    const fromMessagesRaw = await program.account.message.all([fromFilter(pubkey)]);
    const toMessagesRaw = await program.account.message.all([toFilter(pubkey)]);
    let messagesRaw = fromMessagesRaw.concat(toMessagesRaw)

    const messages = messagesRaw.map((m) => Object.assign({ publicKey: m.publicKey }, m.account));
    return messages;
};

type NewMessage = {
    program: anchor.Program<Message>;
    content: string;
    wallet: AnchorWallet
    to: PublicKey|string
};

export const newMessage = async ({
    wallet,
    program,
    content,
    to
}: NewMessage) => {
    to = new PublicKey(to)
    const message = anchor.web3.Keypair.generate();
    let tx
    try {
        tx = await program?.methods
            .newMessage(to!, content)
            .accounts({
                message: message.publicKey,
                from: wallet?.publicKey,
            })
            .signers([message])
            .rpc();
        console.log(tx);
    } catch (e) {
        console.log('new message Error');
        console.log(e);
    }


    const sentMessage = {
        publicKey: message.publicKey,
        from: wallet?.publicKey,
        to: to,
        timestamp: new anchor.BN(new Date().getTime()),
        content,
    };

    return { sentMessage, tx };
};
const fromFilter = (publicKey: string) => ({
    memcmp: {
        offset: 8, // Discriminator.
        bytes: publicKey,
    },
});
const toFilter = (publicKey: string) => ({
    memcmp: {
        offset: 40, // Discriminator.
        bytes: publicKey,
    },
});