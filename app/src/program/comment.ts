/** @format */

import * as anchor from "@project-serum/anchor";

export type AccountData = {
 author: anchor.web3.PublicKey;
 timestamp: anchor.BN;
 content: string;
 publickey: string;
 postPubkey: anchor.web3.PublicKey;
 image: string;
 username: string;
};
export class Comment {
 publicKey: anchor.web3.PublicKey;
 author: anchor.web3.PublicKey;
 postPubkey: anchor.web3.PublicKey;
 timestamp: string;
 content: string;
 image: string;
 username: string;

 constructor(publicKey: anchor.web3.PublicKey, accountData: AccountData) {
  this.publicKey = publicKey;
  this.image = accountData.image;
  this.author = accountData.author;
  this.postPubkey = accountData.postPubkey;
  this.timestamp = accountData.timestamp.toString();
  this.content = accountData.content;
  this.username = accountData.username;
 }

 get key() {
  return this.publicKey.toBase58();
 }

 get authorDisplay() {
  const author = this.author.toBase58();
  return author;
 }

get postPublicKey(){
  const key = this.postPubkey.toBase58();
  return key
}

 get createdAt() {
  const date = getDate(this.timestamp);
  return date.toLocaleDateString();
 }

 get createdAgo() {
  const date = getDate(this.timestamp);
  return timeSince(date);
 }
 get getTimestamp() {
  const date = getDate(this.timestamp);
  return date;
 }
}

// convert unix timestamp to js date object
const getDate = (timestamp: string) => {
 const utxDate = parseInt(timestamp);
 const date = new Date(utxDate * 1000);
 return date;
};

function timeSince(date: any) {
 var seconds = Math.floor(((new Date() as any) - date) / 1000);

 var interval = seconds / 31536000;

 if (interval > 1) {
  return Math.floor(interval) + " years";
 }
 interval = seconds / 2592000;
 if (interval > 1) {
  return Math.floor(interval) + " months";
 }
 interval = seconds / 86400;
 if (interval > 1) {
  return Math.floor(interval) + " days";
 }
 interval = seconds / 3600;
 if (interval > 1) {
  return Math.floor(interval) + " hours";
 }
 interval = seconds / 60;
 if (interval > 1) {
  return Math.floor(interval) + " minutes";
 }
 return Math.floor(seconds) + " seconds";
}
var aDay = 24 * 60 * 60 * 1000;
