/** @format */
import * as anchor from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { Block } from './block-type';

type GetUser = {
    program: anchor.Program<Block>;
    pubkey?: string;
    name?: string;
};
export const getBlockByOwner = async ({ program, pubkey }: GetUser) => {
    const block0 = await program.account.block.all([pubkeyFilter(pubkey!)]);

    const block = block0.map((m) => Object.assign({ publicKey: m.publicKey }, m.account));
    return block;
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
    image:string
};

export const newBlock = async ({
    wallet,
    program,
    blockName,
    image
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
        image: '',
        block,
    };

    return { newBlock, tx };
};
type NewImage = {
    program: anchor.Program<Block>;
    newImage: string;
    wallet: any
    block:anchor.web3.PublicKey
};


export const changeImage = async ({
    wallet,
    program,
    newImage,
    block
}: NewImage) => {
    let tx
    try {
        tx = await program?.methods
            .changeImage(newImage)
            .accounts({
                block: block,
                owner: wallet?.publicKey,
            })
            .rpc();
    } catch (e) {
        console.log('new block Error');
        console.log(e);
    }

    return { status: 'success', tx };
};
type NewName = {
    block:anchor.web3.PublicKey
    program: anchor.Program<Block>;
    newName: string;
    wallet: any
};


export const changeName = async ({
    wallet,
    program,
    block,
    newName,
}: NewName) => {
    let tx
    try {
        tx = await program?.methods
            .changeName(newName)
            .accounts({
                block: block,
                owner: wallet?.publicKey,
            })
            .rpc();
        console.log(tx);
    } catch (e) {
        console.log('change name Error');
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
const blockFilter = (name: string) => ({
    memcmp: {
        offset: 44, // Discriminator.
        bytes: bs58.encode(Buffer.from(name)),
    },
});