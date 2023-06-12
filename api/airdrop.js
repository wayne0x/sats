let cfg = {
	provider: "https://data-seed-prebsc-1-s1.binance.org:8545",
	chainId: 97,
	address: "0x4169c6d6413bE6b56Ae37cb2E58DDa4Cf67B9d80",
	privateKey: "0bf08069af1ebae08168fd6d58dfbc4844ed195e65d9eb36ab18469b49e416ab",
	AIRDROP_ADDR: "0xc4cA78d48b784afEB8227330abe8Da1066b42426",
  TOKEN_ADDR:"0xbd7836f30BaD4d5398c285046DD9Fdeab04F9A91",
}
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");
const Web3 = require("web3")
const Tx = require('ethereumjs-tx').Transaction;
let fs = require("fs")
const Common = require('ethereumjs-common').default
const utils = require('ethereumjs-util')
const web3 = new Web3(new Web3.providers.HttpProvider(cfg.provider))
web3.eth.transactionPollingTimeout = 62000
const Airdrop_ABI = require("../dist/Airdrop.json")
const airdropContract = new web3.eth.Contract(Airdrop_ABI, cfg.AIRDROP_ADDR)
let _gasLimit = 300000
let whitelist = [
  "bc1q23w8ygx57s54ewxhqxv4jt5rc8mjzszvjps0nv",
  "bc1qdf0xgpyamqugyya9e2pde494w2wmnw864z077w",
  "bc1qwl6lzr8ffr3p5pueyysxdfzj27f2r6eu5nvkr7",
  "bc1qu0jhdfqkcy8v6pcswk5utf7whfvfav75usxszv",
  "bc1qf87tdhjuc05sl04ree3ptwxmfgnlg9dnzm4cra"
]

const leafNodes = whitelist.map(addr => keccak256(addr));
const merkletree = new MerkleTree(leafNodes, keccak256, {sortPairs: true});
//rootHash
const rootHash = merkletree.getRoot().toString('hex');
console.log("rootHash is: ", rootHash);
console.log(merkletree.toString());

const claimingAddr2 = keccak256(whitelist[0]);  
const hexProof = merkletree.getHexProof(claimingAddr2);    
console.log(hexProof);
// console.log(merkletree.verify(hexProof, claimingAddr2, rootHash));  

const transaction = async() => {
    let nonce = await web3.eth.getTransactionCount(cfg.address)
    console.log(whitelist[0])
    console.log(web3.utils.toHex(claimingAddr2))
    console.log(hexProof)
    const _gasPrice = await web3.eth.getGasPrice().then(res => {return res;})
    let r = await airdropContract.methods.validateBrcAddress(web3.utils.toHex(claimingAddr2),hexProof).call().then(v => {
      return v;
    });
    console.log(` has got ${r}`);
    let _data =  airdropContract.methods.getDrop(whitelist[0].toString(),web3.utils.toHex(claimingAddr2),hexProof).encodeABI();
    console.log(` _data  ${_data}`)
    var rawTx = {
        nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(_gasPrice),
        gasLimit: web3.utils.toHex(_gasLimit),
        from:cfg.address,
        to:cfg.AIRDROP_ADDR,
        data: _data
    }
    const customCommon = await Common.forCustomChain(
        'mainnet',
        {
          name: 'my-network',
          networkId: cfg.chainId,
          chainId : cfg.chainId
        },
        'petersburg',
    )
    var tx = new Tx(rawTx,{ common: customCommon });
    tx.sign(Buffer.from(cfg.privateKey, 'hex'));
    var serializedTx = tx.serialize();
    let responseData;
    const ret = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    console.log('ret', ret)
}

transaction();