/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import { Network } from '../../constants';
import { IWallet } from './types';

declare global {
    interface Window {
        ethereum?: any;
    }
}

const provider = new ethers.providers.Web3Provider(window.ethereum);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const connectWallet = async (): Promise<IWallet> => {
    if (window.ethereum) {
        await provider.send('eth_requestAccounts', []);
        await provider.send('wallet_switchEthereumChain', [{ chainId: Network.chainId }]);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const rawBalance = await signer.getBalance();
        const balance = ethers.utils.formatEther(rawBalance);
        console.log(balance);
        return {
            connected: true,
            address,
            ethAmount: 10,
            daiAmount: 10,
        };
    } else {
        alert('Please Install MetaMask');
        return {
            connected: false,
            address: '',
            ethAmount: 10,
            daiAmount: 10,
        };
    }
};

export { connectWallet };

