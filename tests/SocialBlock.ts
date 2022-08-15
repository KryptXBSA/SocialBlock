import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { User } from "../target/types/user";
import { Message } from './../target/types/message';
import { Block } from './../target/types/block';
import { Post } from "../target/types/post"
import { Comment } from "../target/types/comment";
describe("SocialBlock", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const newUserAccount = anchor.web3.Keypair.generate();
  const newBlockAccount = anchor.web3.Keypair.generate();
  const newPostAccount = anchor.web3.Keypair.generate();
  const newMessageAccount = anchor.web3.Keypair.generate();
  it("New User Account and change username", async () => {

    const userProgram = anchor.workspace.User as Program<User>;
    console.log(await userProgram.account.user.all());
    // Making new user
    const tx = await userProgram.methods.newUser("alan",'').accounts(
      {
        userAccount: newUserAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    ).signers([newUserAccount]).rpc()

    // Fetching the user

    const newPostAccount0 = await userProgram.account.user.fetch(newUserAccount.publicKey);
    console.log(newPostAccount0);
 
  })

it("New Message Account", async () => {

    const messageProgram = anchor.workspace.Message as Program<Message>;
    // Making new message
    const tx = await messageProgram.methods.newMessage(provider.wallet.publicKey,"hi").accounts(
      {
        message: newMessageAccount.publicKey,
        from: provider.wallet.publicKey,
      },
    ).signers([newMessageAccount]).rpc()

    // Fetching the message

    const newMessage = await messageProgram.account.message.fetch(newMessageAccount.publicKey);
    console.log(newMessage);
  })
  it("New Block Account", async () => {

    const blockProgram = anchor.workspace.Block as Program<Block>;
    // Making new block
    const tx = await blockProgram.methods.newBlock("alan").accounts(
      {
        block: newBlockAccount.publicKey,
        owner: provider.wallet.publicKey,
      },
    ).signers([newBlockAccount]).rpc()

    // Fetching the block

    const newBlock = await blockProgram.account.block.fetch(newBlockAccount.publicKey);
    console.log(newBlock);
await blockProgram.methods.changeImage("alan").accounts(
      {
        block: newBlockAccount.publicKey,
        owner: provider.wallet.publicKey,
      },
    ).rpc()
    console.log('changed');
const newBlock0 = await blockProgram.account.block.fetch(newBlockAccount.publicKey);
    console.log(newBlock0);
    
  })
  it("New Post", async () => {
    const postProgram = anchor.workspace.Post as Program<Post>;
    // Making new post
    const tx = await postProgram.methods.sendPost("block", "content", "alan",'').accounts(
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
    const commentTx = await commentProgram.methods.newComment(newPostAccount.publicKey, "alan", "slawwwwd",'').accounts(
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
