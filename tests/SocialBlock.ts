import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Post } from "../target/types/post"
import { Comment } from "../target/types/comment";
import { User } from "../target/types/user";
describe("SocialBlock", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const newPostAccount = anchor.web3.Keypair.generate();
  const newUserAccount = anchor.web3.Keypair.generate();
  it("New User Account", async () => {

    const userProgram = anchor.workspace.User as Program<User>;
    // Making new user
    const tx = await userProgram.methods.newUser("aland").accounts(
      {
        userAccount: newUserAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    ).signers([newUserAccount]).rpc()

    // Fetching the user

    const newPostAccount0 = await userProgram.account.user.fetch(newUserAccount.publicKey);
    console.log(newPostAccount0);
  })
  it("New Post", async () => {
    const postProgram = anchor.workspace.Post as Program<Post>;
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

  it("New Comment", async () => {
    const commentProgram = anchor.workspace.Comment as Program<Comment>;
    const newCommentAccount = anchor.web3.Keypair.generate();
    //Making new Comment 
    const commentTx = await commentProgram.methods.newComment(newPostAccount.publicKey, "usernameeeed", "slawwwwd").accounts(
      {
        comment: newCommentAccount.publicKey,
        author: provider.wallet.publicKey,
      },
    ).signers([newCommentAccount]).rpc();
    console.log(commentTx);
    const newCommentAccount0 = await commentProgram.account.comment.fetch(newCommentAccount.publicKey);

    console.log(newCommentAccount0);
  })

});
