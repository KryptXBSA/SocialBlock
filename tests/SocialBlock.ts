import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SocialBlock } from "../target/types/social_block";

describe("SocialBlock", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SocialBlock as Program<SocialBlock>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
