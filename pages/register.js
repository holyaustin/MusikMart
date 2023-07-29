import { useWallet } from '@solana/wallet-adapter-react'
import MainView from '../components/mainview'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
//import ConnectWalletButton from "../components/connect-wallet-button"

export default function Home() {
  const { connected } = useWallet()

  return (
    <div className='app'>
      {connected ? (
        <MainView />
      ) : (
        <div className='loginContainer'>
          <div className='loginTitle'>Log in to Musik Mart</div>
          <div className='loginSubTitle'>
            Manage your account, Signup or Login to access Marketplace
          </div>
          {/**<WalletMultiButton  /> */}

        </div>
      )}
    </div>
  )
}