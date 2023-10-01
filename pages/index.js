import React, {useState, useEffect} from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import imageEth from "../ethIcon.png";
import creator from "../goldenMonkey.jpg";

const Home = () =>{
  const getAccount = async()=>{//get user Meta Mask address
    console.log(currentAccount);
    //return currentAccount
  }
  const [currentAccount, setCurrentAccount] = useState("");
  const [connect, setConnect] = useState(false);
  const [balance, setBalance] = useState('');

  const failMessage = 'Please install & connect your MetaMask'; 
  const successMessage = "Your Account Successfully connected";

  const INFURA_ID = '14d155793b9641d1b5319303bda0a40b';
  const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);
  
const checkIfWalletConnedted = async() =>{
  if(!window.ethereum) return;

  const accounts = await window.ethereum.request({method: "eth_accounts"});
  //console.log(accounts);
  if(accounts.length){
    setCurrentAccount(accounts[0]);//if have more than 1 ac, choose 1st ac
  }else{
    console.log("Fail");
  } 
  const address = "0x272FEa18A3E18dFeB5c223405C3a26474A33AA50";//just demo, not actual ac & value
  const balance = await provider.getBalance(address);
  const showBalance = `${ethers.utils.formatEther(balance)}ETH\n`
  //console.log(showBalance); 
  setBalance(showBalance);
};
  
  const cWallet = async()=>{
    if(!window.ethereum)  return console.log(failMessage);

    const accounts = await window.ethereum.request({method: "eth_requestAccounts"})

    setCurrentAccount(accounts[0]);

   window.location.reload(); 
  } 
  useEffect(()=>{
    checkIfWalletConnedted();
  })

  useEffect(()=>{
    async function accountChanged(){
      window.ethereum.on('accountsChanged', async function(){
        const accounts = await window.ethereum.request({
          method: "eth_accounts"
        });

        if(accounts.length){
          setCurrentAccount(account[0])
        }
        else{
          window.location.reload();
        }
      });
    }
    accountChanged();
  }, []);

  return (
    <div className="card-container">
      
      
      <h3>Check Ether</h3>

      {!currentAccount ? (
      <div>
        <div className="message">
          <p>{failMessage}</p>
        </div>
        
        <p>Welcome to ether account balance checker</p>
      </div>
      ) :(
        <div>
          <h6>Verified <span className="tick">&#10004;</span></h6>
          <p>Ether account and balance Checker<br />find account details
          </p>
          <div className="buttons">
            <button className="primary ghost" onClick={()=>getAccount()}>
              Ether Access Details
            </button>
          </div>
        </div>
      )}

      
      {!currentAccount && !connect ? (
        <div className="buttons">
          <button className="primary" onClick={()=>cWallet()}>
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className="skills">
          <h6>Your Ether</h6>
          <ul>
            <li>Account:</li>
            <li>{currentAccount}</li>
            <li>Balance:</li>
            <li>{balance}</li>

          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
