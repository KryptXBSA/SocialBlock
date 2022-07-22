import { LAMPORTS_PER_SOL, Connection } from '@solana/web3.js'
export async function getWalletBalance(connection: Connection, wallet: any) {
    let balance:number
    try {
        balance = await connection.getBalance(wallet.publicKey)
    } catch (e) {

    }
    return balance! / LAMPORTS_PER_SOL
}