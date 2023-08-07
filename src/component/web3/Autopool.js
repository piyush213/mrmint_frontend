import Web3 from 'web3';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { AUTOPOOL, MNT_TOKEN } from '../../coreFIles/walletAddress';
import autopoolAbi from '../../coreFIles/abi/autopoolAbi.json';
import tokenAbi from '../../coreFIles/abi/tokenAbi.json';
import config from '../../coreFIles/config';
import toast, { Toaster } from 'react-hot-toast';

export const Web3Autopool = (props) => {
    useEffect(() => {
        rechargeNow(props.RechargePlanID)
    }, [props.RechargePlanID]);

    const rechargeNow = async (planId) => {
        if (!planId) {
            return;
        }
        try {
            let web3 = new Web3(window.ethereum);
            const account = await web3.eth.getAccounts();
            let from_address = account[0];

            const tokenContract = await new web3.eth.Contract(tokenAbi, MNT_TOKEN);
            const poolContract = await new web3.eth.Contract(autopoolAbi, AUTOPOOL);


            let allowance = await tokenContract.methods.allowance(from_address, AUTOPOOL).call();
            let tokenBalance = await tokenContract.methods.balanceOf(from_address).call();
            let getPlanDetails = await poolContract.methods.getPlanDetails(planId).call();

            allowance = parseInt(allowance).toLocaleString('fullwide', { useGrouping: false });
            tokenBalance = parseInt(tokenBalance).toLocaleString('fullwide', { useGrouping: false });
            let rechargeAmount = parseInt(getPlanDetails.tokenPrice).toLocaleString('fullwide', { useGrouping: false });

            if (parseInt(tokenBalance) < parseInt(rechargeAmount)) {
                toast.error(`Insufficient MNT balance in your wallet`);
                props.setDialogOpen(false);
                props.setRechargePlanID('');
                return false;
            }

            if (allowance < rechargeAmount) {
                await approveToken(from_address, rechargeAmount, web3, tokenContract);
            }

            let tx_builder = await poolContract.methods.recharge(planId, rechargeAmount);
            let encoded_tx = tx_builder.encodeABI();

            props.setDialogOpen(true);

            let chainId = config.chainIdForRecharge;
            let gasPrice = await web3.eth.getGasPrice();
            let gasLimit = await web3.eth.estimateGas({
                gasPrice: web3.utils.toHex(gasPrice),
                to: AUTOPOOL,
                from: from_address,
                chainId: chainId,
                data: encoded_tx
            });

            const transactionParameters = {
                gasPrice: web3.utils.toHex(gasPrice),
                gas: web3.utils.toHex(gasLimit),
                to: AUTOPOOL,
                from: from_address,
                chainId: chainId,
                data: encoded_tx
            };

            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
            toast.success(`Mystery box recharge successful!`);

            props.setDialogOpen(false);
            props.setRechargePlanID('');

        } catch (err) {
            props.setDialogOpen(false);
            props.setRechargePlanID('');
            if (err.toString().search('Autopool not started') > -1) {
                toast.error("Autopool not started !");
            } else if (!err.message) {
                toast.error(err.toString());
            } else {
                toast.error(err.message);
            }

        }



    }

    const approveToken = async (from_address, token, web3, tokenContract) => {
        let tx_builder = await tokenContract.methods.approve(AUTOPOOL, token.toString());
        let encoded_tx = tx_builder.encodeABI();

        let chainId = config.chainIdForRecharge;
        let gasPrice = await web3.eth.getGasPrice();
        let gasLimit = await web3.eth.estimateGas({
            gasPrice: web3.utils.toHex(gasPrice),
            to: MNT_TOKEN,
            from: from_address,
            chainId: chainId,
            data: encoded_tx
        });


        await web3.eth.sendTransaction({
            gasPrice: web3.utils.toHex(gasPrice),
            gas: web3.utils.toHex(gasLimit),
            to: MNT_TOKEN,
            from: from_address,
            chainId: chainId,
            data: encoded_tx
        });
    }
    return (

        <Toaster />
    )
}   