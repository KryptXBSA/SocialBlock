/** @format */

import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";


export const findUsernamePDA = async ({ userProgram, publickey }: any) => {
    const [userStatsPDA, _] = await PublicKey.findProgramAddress(
        [anchor.utils.bytes.utf8.encode("user-stats"), publickey.toBuffer()],
        userProgram.programId
    );

    return userStatsPDA;
};
export const createUsername = async ({
    userProgram,
    pubKey,
    username,
}: any) => {

    const [userStatsPDA, _] = await PublicKey.findProgramAddress(
        [anchor.utils.bytes.utf8.encode("user-stats"), pubKey.toBuffer()],
        userProgram.programId
    );

    const UserTx = await userProgram.methods
        .createUserStats(username)
        .accounts({
            user: pubKey,
            userStats: userStatsPDA,
        })
        .rpc();
        return { user: { username, foundUser: true } }
    let usernamee = await getUsername({ userProgram, userStatsPDA })
    

    return usernamee
};

export const getUsername = async ({ userProgram,publickey }: any) => {
   let userStatsPDA = await findUsernamePDA({userProgram,publickey})
    let username = null;
    try {
        username = await userProgram.account.userStats.fetch(userStatsPDA);
    } catch (e) { }
    if (!username) {
        return { user: { username:'', foundUser: false } };
    }
    return { user: { username:username.name, foundUser: true } };
};
