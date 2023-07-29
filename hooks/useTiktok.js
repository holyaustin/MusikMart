import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { SOLANA_HOST } from '../utils/const'
import { getProgramInstance } from '../utils/utils'
const anchor = require('@project-serum/anchor')
const utf8 = anchor.utils.bytes.utf8
const { BN, web3 } = anchor
const { SystemProgram } = web3

const defaultAccounts = {
  tokenProgram: TOKEN_PROGRAM_ID,
  clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
  systemProgram: SystemProgram.programId,
}

const useTiktok = (
  setTikToks,
  userDetail,
  videoUrl,
  description,
  setDescription,
  setVideoUrl,
  setNewVideoShow,
) => {
  const wallet = useWallet()
  const connection = new anchor.web3.Connection(SOLANA_HOST)
  const program = getProgramInstance(connection, wallet)
  const getTiktoks = async () => {
    console.log('fetching tiktoks')

    const videos = await program.account.videoAccount.all()
    console.log(videos)

    // const res = await axios.get(
    //   'https://ipfs.io/ipfs/QmS28E89P3Gz2LZimkKSuJgXGuZEtXG6dhyzxkSbpv6mKU/tiktoks.json',
    // )
    // setTikToks(res.data);

    // Save all videos in state for frontend 
    setTikToks(videos)
  }

  // Function to call likeVideo from smartContract
  const likeVideo = async address => {
    console.log('video liked!')

    const tx = await program.rpc.likeVideo({
      accounts: {
        video: new PublicKey(address),
        authority: wallet.publicKey,
        ...defaultAccounts,
      },
  })
  console.log(tx)
  }

  // Function to call createComment from smartContract
  const createComment = async (address, count, comment) => {
    let [comment_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [
        utf8.encode('comment'),
        new PublicKey(address).toBuffer(),
        new BN(count).toArrayLike(Buffer, 'be', 8),
      ],
      program.programId,
    )

    if(userDetail) {
      const tx = await program.rpc.createComment(
        comment,
        userDetail.userName,
        userDetail.userProfileImageUrl,
        {
          accounts: {
            video: new PublicKey(address),
            comment: comment_pda,
            authority: wallet.publicKey,
            ...defaultAccounts,
          },
        },
      )

      console.log(tx)
    }
   }

  // Function to call createVideo from smartcontract
  const newVideo = async () => {
    const randomKey = anchor.web3.Keypair.generate().publicKey;

    let [video_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('video'), randomKey.toBuffer()],
      program.programId,
    )

    const tx = await program.rpc.createVideo(
      description,
      videoUrl,
      userDetail.userName,
      userDetail.userProfileImageUrl, 
      {
        accounts: {
          video: video_pda,
          randomKey: randomKey,
          authority: wallet.publicKey,
          ...defaultAccounts,
        }
      }
    ) 

    console.log(tx)
    setDescription('')
    setVideoUrl('')
    setNewVideoShow(false)
  }

  // Function to fetch comments from the commentAccount on the smartcontract
  const getComments = async (address, count) => {
    let commentSigners = []

    for(let i = 0; i < count; i++) {
      let [commentSigner] = await anchor.web3.PublicKey.findProgramAddress(
        [
          utf8.encode('comment'),
          new PublicKey(address).toBuffer(),
          new BN(i).toArray(Buffer, 'be', 8)
        ],
        program.programId,
      )

      commentSigners.push(commentSigner)
    }

    const comments = await program.account.commentAccount.fetchMultiple(
      commentSigners,
    )
    console.log(comments)

    return comments
  }
  
  return { getTiktoks, likeVideo, createComment, newVideo, getComments }
}

export default useTiktok