/** @format */
import {
    DangerAlert, DangerAlertWallet
} from "../components/alert";
import { connection } from "../contexts/programContextProvider";
import { getWalletBalance } from "./get-wallet-balance";
export async function CheckWallet(
 getWallet: any,
 notify: any,
 ProgramContext: any,
 signup?: boolean
) {
 if (!getWallet?.publicKey) {
  notify(<DangerAlert text="Please connect to a wallet." dismiss={undefined} />);
  return { error: true, msg: "no wallet" };
 }
 //broken
 if (!ProgramContext?.state.user.foundUser) {
  if (signup) return { error: false };
  else {
   notify(<DangerAlert text="Please signup" dismiss={undefined} />);
   ProgramContext.setShowSignupModal(true);
   return { error: true, msg: "no username" };
  }
 }
 let balance = await getWalletBalance(connection, getWallet);

 if (balance == 0) {
  notify(<DangerAlertWallet text={undefined} dismiss={undefined} />);
  return { error: true, msg: "no balance" };
 } else {
  return { error: false };
 }
}
