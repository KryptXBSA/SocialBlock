/** @format */

// get comments based on post
import { newComment, getAllComments } from "../program/comments";

export async function getAllComments0(postPubkey: any, commentProgram: any) {
 const authorFilter = (authorBase58PublicKey: any) => ({
  memcmp: {
   offset: 40, // Discriminator.
   bytes: authorBase58PublicKey,
  },
 });
 let filter = [authorFilter(postPubkey)];
 let commentResult = await getAllComments({
  program: commentProgram,
  filter: filter,
 });
 return commentResult;
}

