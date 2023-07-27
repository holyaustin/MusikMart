import Image from 'next/image'

const Welcome = () => {
  {/**
  const [account, setAccount] = useState();

  const connectWallet2 = async () => {
    try {
      const wallets = await onboard.connectWallet();
      const { accounts, } = wallets[0];
      setAccount(accounts[0].address);
    } catch (error) {
      console.error(error);
    }
  };
 */}

  return (
    <div className="flex w-full mf:flex-row flex-col justify-left bg-gray-100 mt-5">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 px-4">
        <div className="flex flex-col mf:mr-10 font-bold">
          <div className="md:flex-[0.8] flex-initial justify-left items-center">
          <h1 className="text-5xl sm:text-7xl font-semibold">
          MusicMart  <br />
          </h1><br />
          <p className="text-left mt-1 text-blue-700 md:w-10/12 w-11/12 text-2xl font-black">
          Onchain Music Marktetplace Built with Solana and Shyft <br />
          </p><br />
          <img src="/images/musicsplash.png"  alt="welcome"  className="w-screen cursor-pointer items-center" />
          </div>

          <br />
          <div className="flex justify-center items-center">
            <button
              type="button"
              // onClick={connectWallet2}
              className="flex flex-row justify-center items-center my-5 bg-red-500 p-6 rounded-full cursor-pointer hover:bg-yellow-500 hover:text-white border-4 border-x-red-500 px-10 py-5 text-2xl w-full"
            >
              Join Now
          </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Welcome;
