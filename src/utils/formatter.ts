import { ethers } from 'ethers';

const formatWalletAddress = (address: string | undefined): string => {
    if (!address) return '';
    const length = address.length;
    const formatted = `${ address.slice(0, 6) }...${ address.slice(length - 4, length) }`;
    return formatted;
};

const formatBalance = (balance: number): string => {
    if (!balance) return '0.0000';
    return balance.toLocaleString(undefined, { minimumFractionDigits: 4 });
};

const formatEther = (balance: string): string => {
    const etherBalance = ethers.utils.formatEther(Number(balance));
    return formatBalance(Number(etherBalance));
};

export { formatWalletAddress, formatBalance, formatEther };
