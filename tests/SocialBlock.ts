import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Post } from "../target/types/post"

describe("SocialBlock", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  it("New Post", async () => {
    const postProgram = anchor.workspace.Post as Program<Post>;
    const newPostAccount = anchor.web3.Keypair.generate();
    // Making new post
    const tx = await postProgram.methods.sendPost("d", "d", "usernameALAND").accounts(
      {
        post: newPostAccount.publicKey,
        author: provider.wallet.publicKey,
      },
    ).signers([newPostAccount]).rpc()

    // Fetching the post

    const newPostAccount0 = await postProgram.account.post.fetch(newPostAccount.publicKey);
    console.log(newPostAccount0);
  });
});
