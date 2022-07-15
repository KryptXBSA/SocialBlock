async function signup(username: any) {
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
    setUsername0(wallet.publicKey);
    return usernamee;
   }
  } catch (e) {
   console.log(e);
  }
 }
}
function showSignupPopup0() {
 return (
  <SignupModal
   showSignupPopup={setShowSignupPopup}
   signup={signup}
   show={undefined}
  />
 );
}
