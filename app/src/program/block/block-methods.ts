/** @format */
import * as anchor from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Block } from './../../../../target/types/block';

type GetUser = {
    program: anchor.Program<Block>;
    pubkey?: string;
    name?: string;
};
export const getBlockByPubkey = async ({ program, pubkey }: GetUser) => {
    const block0 = await program.account.block.all([pubkeyFilter(pubkey!)]);

    const block = block0.map((m) => Object.assign({ publicKey: m.publicKey }, m.account));
    return block[0];
};
export const getBlockByName = async ({ program, name }: GetUser) => {
    const block0 = await program.account.block.all([blockFilter(name!)]);

    const block = block0.map((m) => Object.assign({ publicKey: m.publicKey }, m.account));
    return block[0];
};
export const getAllBlocks = async ({ program }: GetUser) => {
    const blocks = await program.account.block.all();

    return blocks
};


type NewBlock = {
    program: anchor.Program<Block>;
    blockName: string;
    wallet: AnchorWallet
};

export const newBlock = async ({
    wallet,
    program,
    blockName,
}: NewBlock) => {
    const block = anchor.web3.Keypair.generate();
    let tx
    try {
        tx = await program?.methods
            .newBlock(blockName)
            .accounts({
                block: block.publicKey,
                owner: wallet?.publicKey,
            })
            .signers([block])
            .rpc();
        console.log(tx);
    } catch (e) {
        console.log('new block Error');
        console.log(e);
    }


    const newBlock = {
        publicKey: block.publicKey,
        timestamp: new anchor.BN(new Date().getTime()),
        block,
    };

    return { newBlock, tx };
};

const pubkeyFilter = (publicKey: string) => ({
    memcmp: {
        offset: 8, // Discriminator.
        bytes: publicKey,
    },
});
const blockFilter = (publicKey: string) => ({
    memcmp: {
        offset: 40, // Discriminator.
        bytes: publicKey,
    },
});