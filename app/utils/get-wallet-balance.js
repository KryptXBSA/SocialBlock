import { LAMPORTS_PER_SOL } from '@solana/web3.js'
export async function getWalletBalance(connection, wallet) {
    let balance
    try {
        balance = await connection.getBalance(wallet.publicKey)
    } catch (e) {
        
    }
    return balance / LAMPORTS_PER_SOL
}