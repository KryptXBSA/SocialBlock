/** @format */

import { getWalletBalance } from "../utils/get-wallet-balance";
import {
 DangerAlert,
 SpecialAlert,
 WarningAlert,
 DangerAlertWallet,
} from "../components/alert";

export async function signup(
 username: any,
 notify: any,
 connection: any,
 wallet: any,
 userProgram: any,
 createUsername: (arg0: {
  userProgram: any;
  pubKey: any;
  username: string;
 }) => any
) {
 let balance = await getWalletBalance(connection, wallet);
 if (balance == 0) {
  notify(<DangerAlertWallet text={undefined} dismiss={undefined} />);
 } else {
  try {
   if (!wallet) {
    notify(
     <DangerAlert text="Please connect to a wallet." dismiss={undefined} />
    );
   } else {
    let usernamee = await createUsername({
     userProgram,
     pubKey: wallet.publicKey,
     username,
    });
    // setUsername0(wallet.publicKey);
    // success message here
    return usernamee;
   }
  } catch (e) {
   
  }
 }
}
