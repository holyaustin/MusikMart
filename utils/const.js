import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import tiktok from './tiktok_clone.json';

export const SOLANA_HOST = clusterApiUrl('devnet')


export const TIKTOK_PROGRAM_ID = new PublicKey(
  "9P8wQVP39pAauwbh9y1zv34sdcreXsdLeeojv4hrWc7W"
)

export const TIKTOK_IDL = tiktok;