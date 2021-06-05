const BEP20_ABI = [{
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{
        "name": "",
        "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "guy",
        "type": "address"
    }, {
        "name": "wad",
        "type": "uint256"
    }],
    "name": "approve",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "src",
        "type": "address"
    }, {
        "name": "dst",
        "type": "address"
    }, {
        "name": "wad",
        "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "wad",
        "type": "uint256"
    }],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{
        "name": "",
        "type": "uint8"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "",
        "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{
        "name": "",
        "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "dst",
        "type": "address"
    }, {
        "name": "wad",
        "type": "uint256"
    }],
    "name": "transfer",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "",
        "type": "address"
    }, {
        "name": "",
        "type": "address"
    }],
    "name": "allowance",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "src",
        "type": "address"
    }, {
        "indexed": true,
        "name": "guy",
        "type": "address"
    }, {
        "indexed": false,
        "name": "wad",
        "type": "uint256"
    }],
    "name": "Approval",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "src",
        "type": "address"
    }, {
        "indexed": true,
        "name": "dst",
        "type": "address"
    }, {
        "indexed": false,
        "name": "wad",
        "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "dst",
        "type": "address"
    }, {
        "indexed": false,
        "name": "wad",
        "type": "uint256"
    }],
    "name": "Deposit",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "src",
        "type": "address"
    }, {
        "indexed": false,
        "name": "wad",
        "type": "uint256"
    }],
    "name": "Withdrawal",
    "type": "event"
}];
const FARM_ABI = [{
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "Deposit",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "EmergencyWithdraw",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "Withdraw",
    "type": "event"
}, {
    "inputs": [],
    "name": "NATIVE",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "NATIVEMaxSupply",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "NATIVEPerBlock",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_allocPoint",
        "type": "uint256"
    }, {
        "internalType": "contract IERC20",
        "name": "_want",
        "type": "address"
    }, {
        "internalType": "bool",
        "name": "_withUpdate",
        "type": "bool"
    }, {
        "internalType": "address",
        "name": "_strat",
        "type": "address"
    }],
    "name": "add",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_wantAmt",
        "type": "uint256"
    }],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
    }],
    "name": "emergencyWithdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_from",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_to",
        "type": "uint256"
    }],
    "name": "getMultiplier",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_token",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
    }],
    "name": "inCaseTokensGetStuck",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "massUpdatePools",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "ownerNATIVEReward",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }],
    "name": "pendingNATIVE",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "poolInfo",
    "outputs": [{
        "internalType": "contract IERC20",
        "name": "want",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "allocPoint",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "lastRewardBlock",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "accNATIVEPerShare",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "strat",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "poolLength",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_allocPoint",
        "type": "uint256"
    }, {
        "internalType": "bool",
        "name": "_withUpdate",
        "type": "bool"
    }],
    "name": "set",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "_user",
        "type": "address"
    }],
    "name": "stakedWantTokens",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "startBlock",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "totalAllocPoint",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
    }],
    "name": "updatePool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "userInfo",
    "outputs": [{
        "internalType": "uint256",
        "name": "shares",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "rewardDebt",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "_wantAmt",
        "type": "uint256"
    }],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_pid",
        "type": "uint256"
    }],
    "name": "withdrawAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}]
const ZAP_ABI = [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
    }],
    "name": "Paused",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
    }],
    "name": "Unpaused",
    "type": "event"
}, {
    "inputs": [],
    "name": "goodwill",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "paused",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint16",
        "name": "_goodwill",
        "type": "uint16"
    }],
    "name": "setGoodwill",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address[]",
        "name": "tokens",
        "type": "address[]"
    }],
    "name": "withdrawTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_fromTokenAddress",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "_amountIn",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "_lpAddress",
        "type": "address"
    }, {
        "internalType": "address[]",
        "name": "_token0Path",
        "type": "address[]"
    }, {
        "internalType": "address[]",
        "name": "_token1Path",
        "type": "address[]"
    }, {
        "internalType": "uint256",
        "name": "_minPoolTokens",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "_token0RouterAddress",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "_token1RouterAddress",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "_LPRouterAddress",
        "type": "address"
    }],
    "name": "zapIn",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_fromTokenAddress",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "_amountIn",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "_lpAddress",
        "type": "address"
    }, {
        "internalType": "address[]",
        "name": "_token0Path",
        "type": "address[]"
    }, {
        "internalType": "uint256",
        "name": "_minPoolTokens",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "_token0RouterAddress",
        "type": "address"
    }],
    "name": "zapIn4Belt",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_fromTokenAddress",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "_amountIn",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "_lpAddress",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "_token0",
        "type": "address"
    }, {
        "internalType": "address[]",
        "name": "_token0Path",
        "type": "address[]"
    }, {
        "internalType": "uint256",
        "name": "_minPoolTokens",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "_token0RouterAddress",
        "type": "address"
    }],
    "name": "zapInBelt",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_fromTokenAddress",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "_amountIn",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "_lpAddress",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "_token0",
        "type": "address"
    }, {
        "internalType": "uint128",
        "name": "_nTokens",
        "type": "uint128"
    }, {
        "internalType": "uint128",
        "name": "_iToken",
        "type": "uint128"
    }, {
        "internalType": "address",
        "name": "_poolLPAddress",
        "type": "address"
    }, {
        "internalType": "address[]",
        "name": "_token0Path",
        "type": "address[]"
    }, {
        "internalType": "uint256",
        "name": "_minPoolTokens",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "_token0RouterAddress",
        "type": "address"
    }],
    "name": "zapInEllipsis",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "_fromTokenAddress",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "_amountIn",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "_lpAddress",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "_token0",
        "type": "address"
    }, {
        "internalType": "address[]",
        "name": "_token0Path",
        "type": "address[]"
    }, {
        "internalType": "uint256",
        "name": "_minPoolTokens",
        "type": "uint256"
    }, {
        "internalType": "address",
        "name": "_token0RouterAddress",
        "type": "address"
    }],
    "name": "zapInMint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "stateMutability": "payable",
    "type": "receive"
}];
const RPC_PROVIDER_URLS = {
    'Binance (Default)': 'https://bsc-dataseed.binance.org/',
    'Binance 1': 'https://bsc-dataseed1.binance.org/',
    'Binance 2': 'https://bsc-dataseed2.binance.org/',
    'Binance 3': 'https://bsc-dataseed3.binance.org/',
    'Binance 4': 'https://bsc-dataseed4.binance.org/',
    'Defibit 1': 'https://bsc-dataseed1.defibit.io/',
    'Defibit 2': 'https://bsc-dataseed2.defibit.io/',
    'Defibit 3': 'https://bsc-dataseed3.defibit.io/',
    'Defibit 4': 'https://bsc-dataseed4.defibit.io/',
    'Ninicoin 1': 'https://bsc-dataseed1.ninicoin.io/',
    'Ninicoin 2': 'https://bsc-dataseed2.ninicoin.io/',
    'Ninicoin 3': 'https://bsc-dataseed3.ninicoin.io/',
    'Ninicoin 4': 'https://bsc-dataseed4.ninicoin.io/',
};
let CryptoUtils = (function() {
    let r = {
        loadData: function() {
            let box = $('main > .content')
              , data = box.data('crypto-data');
            if (typeof data === 'undefined') {
                console.error('[crypto_data] data field on main > .content is missing. CryptoUtils not loaded.');
                return;
            }
            CryptoUtils.getPublicProvider();
            CryptoUtils.IS_STAFF = data.is_staff,
            CryptoUtils.DEAD_ADDRESS = '0x0000000000000000000000000000000000000000';
            CryptoUtils.VAULT_DATA = data.vault_data;
            CryptoUtils.CURRENCY_DATA = data.currencies.currency_data;
            CryptoUtils.CURRENCY_SINGLES = data.currencies.singles;
            CryptoUtils.CURRENCY_LPS = data.currencies.lps;
            CryptoUtils.PLATFORMS_DATA = data.platforms_data;
            CryptoUtils.ZAP_DATA = data.zap_data;
            CryptoUtils.PRICES_ALL = data.prices_all;
            CryptoUtils.FARM_CONTRACT = data.farm_contract;
            CryptoUtils.NATIVE_POOL_PID = data.native_pool_pid;
            CryptoUtils.NATIVE_TOKEN_ID = data.native_token_id;
            CryptoUtils.NATIVE_TOKEN_TICKER = data.native_token_ticker;
            CryptoUtils.NATIVE_TOKEN_BEP20_CONTRACT = data.native_token_bep20_contract;
            CryptoUtils.GAS_LIMITS = data.gas_limits;
            CryptoUtils.REFRESH_RATES = data.refresh_rates;
        },
    }
      , u = {
        publicProvider: null,
        IS_STAFF: false,
        WEB3: null,
        DEAD_ADDRESS: null,
        VAULT_DATA: null,
        CURRENCY_DATA: null,
        CURRENCY_SINGLES: null,
        CURRENCY_LPS: null,
        PLATFORMS_DATA: null,
        ZAP_DATA: null,
        PRICES_ALL: null,
        FARM_CONTRACT: null,
        NATIVE_POOL: null,
        NATIVE_TOKEN_ID: null,
        NATIVE_TOKEN_TICKER: null,
        NATIVE_TOKEN_BEP20_CONTRACT: null,
        PANCAKE_BNB_NATIVE_POOL_CONTRACT: null,
        PANCAKE_BNB_STABLECOIN_POOL_CONTRACT: null,
        REFRESH_RATES: null,
        OVERRIDES: {
            gasLimit: 1000000,
        },
        CONTRACTS: {},
        updatePrice: function(currencyId, price) {
            if (typeof price === 'undefined') {
                return;
            }
            if (typeof price !== 'number') {
                price = parseFloat(price);
            }
            this.PRICES_ALL[currencyId] = price;
        },
        getPublicProviderName: function() {
            return FrontendCommon.getLocalItem('PUBLIC_PROVIDER', Object.keys(RPC_PROVIDER_URLS)[0]);
        },
        getPublicProvider: function() {
            if (this.publicProvider === null) {
                let localProviderUrl = RPC_PROVIDER_URLS[this.getPublicProviderName()];
                this.publicProvider = new ethers.providers.JsonRpcProvider(localProviderUrl);
                CryptoUtils.WEB3 = new Web3(localProviderUrl);
            }
            return this.publicProvider;
        },
        setPublicProvider: function(name) {
            FrontendCommon.setLocalItem('PUBLIC_PROVIDER', name);
            this.publicProvider = null;
            this.getPublicProvider();
        },
        getVaultData: function(pid) {
            if (typeof pid === 'string') {
                pid = parseInt(pid);
            }
            return this.VAULT_DATA.filter(data=>data.pid === pid)[0];
        },
        findVaultFromCurrency: function(currencyId) {
            return this.VAULT_DATA.filter(data=>data.currency === currencyId)[0];
        },
        findCurrencyFromAddress: function(address) {
            address = address.toLowerCase();
            let currencies = Object.entries(this.CURRENCY_DATA).filter(([id,_])=>{
                return address.localeCompare(this.CURRENCY_DATA[id].contract, undefined, {
                    sensitivity: 'base'
                }) === 0;
            }
            ).map((entry)=>entry[0]);
            return currencies[0];
        },
        getCurrencyPlatform: function(currencyId) {
            return Object.entries(CryptoUtils.VAULT_DATA).filter(([id,_])=>CryptoUtils.VAULT_DATA[id].currency === currencyId).map((entry)=>entry[1].platform)[0];
        },
        getCurrencyPlatformData: function(currencyId) {
            return this.PLATFORMS_DATA[this.getCurrencyPlatform(currencyId)];
        },
        getCachedContract: function(key, defaultValue) {
            if (key in this.CONTRACTS) {
                return this.CONTRACTS[key];
            }
            this.CONTRACTS[key] = defaultValue;
            return defaultValue;
        },
        getUint256Max: function() {
            return ethers.constants.MaxUint256;
        },
        getCurrencyPriceUSD: function(currencyId) {
            if (this.PRICES_ALL !== null && this.PRICES_ALL.hasOwnProperty(currencyId)) {
                return this.PRICES_ALL[currencyId] > 0 ? this.PRICES_ALL[currencyId] : -1;
            }
            return -1;
        },
        getGasBalance: function(walletAddress, provider, callback) {
            provider.getBalance(walletAddress).then(result=>{
                callback(true, {
                    balance: result,
                    formattedBalance: ethers.utils.formatEther(result),
                });
            }
            ).catch(error=>{
                callback(false, {
                    error: error,
                });
            }
            );
        },
        getGasPrice: function(provider, callback) {
            provider.getGasPrice().then(result=>{
                callback(true, {
                    gasPrice: result,
                    formattedGasPrice: ethers.utils.formatEther(result),
                });
            }
            ).catch(error=>{
                callback(false, {
                    error: error,
                });
            }
            );
        },
        getTokenBalance: function(walletAddress, contractAddress, provider, callback) {
            let contract = this.getCachedContract(walletAddress + contractAddress, new ethers.Contract(contractAddress,BEP20_ABI,provider));
            contract.balanceOf(walletAddress).then(result=>{
                callback(true, {
                    balance: result,
                    formattedBalance: ethers.utils.formatEther(result),
                });
            }
            ).catch(error=>{
                callback(false, {
                    error: error,
                })
            }
            );
        },
        getFarmTokenBalance: function(walletAddress, provider, callback) {
            this.getTokenBalance(walletAddress, this.NATIVE_TOKEN_BEP20_CONTRACT, provider, callback);
        },
        getAllowance: function(walletAddress, tokenContract, callback) {
            let contract = this.getCachedContract(walletAddress + tokenContract, new ethers.Contract(tokenContract,BEP20_ABI,this.getPublicProvider()));
            contract.allowance(walletAddress, CryptoUtils.FARM_CONTRACT).then(result=>{
                callback(true, {
                    allowance: parseFloat(ethers.utils.formatEther(result)),
                });
            }
            ).catch(error=>{
                callback(false, {
                    error: error,
                });
            }
            );
        },
        getAllowanceExternal: function(walletAddress, tokenContract, externalContract, callback) {
            let contract = this.getCachedContract(externalContract + 'allowance', new ethers.Contract(tokenContract,BEP20_ABI,this.getPublicProvider()));
            contract.allowance(walletAddress, externalContract).then(result=>{
                callback(true, {
                    allowance: parseFloat(ethers.utils.formatEther(result)),
                });
            }
            ).catch(error=>{
                callback(false, {
                    error: error,
                });
            }
            );
        },
        getHarvestPending: function(pid, address, callback) {
            let contract = this.getCachedContract(CryptoUtils.FARM_CONTRACT, new ethers.Contract(CryptoUtils.FARM_CONTRACT,FARM_ABI,this.getPublicProvider()));
            contract.pendingNATIVE(pid, address).then(result=>{
                callback(true, {
                    pending: parseFloat(ethers.utils.formatEther(result)),
                });
            }
            ).catch(error=>{
                callback(false, {
                    error: error,
                });
            }
            );
        },
        getHarvestPendingAsync: async function(pid, address) {
            let contract = this.getCachedContract(CryptoUtils.FARM_CONTRACT, new ethers.Contract(CryptoUtils.FARM_CONTRACT,FARM_ABI,this.getPublicProvider()));
            try {
                return ethers.utils.formatEther(await contract.pendingNATIVE(pid, address));
            } catch (e) {
                return 0.0;
            }
        },
        getStakedTokens: function(pid, address, callback) {
            let contract = this.getCachedContract(CryptoUtils.FARM_CONTRACT, new ethers.Contract(CryptoUtils.FARM_CONTRACT,FARM_ABI,this.getPublicProvider()));
            contract.stakedWantTokens(pid, address).then(result=>{
                callback(true, {
                    balance: result,
                    formattedBalance: ethers.utils.formatEther(result),
                });
            }
            ).catch(error=>{
                callback(false, {
                    error: error,
                });
            }
            );
        },
        getBEP20TotalSupply: function(tokenContract, callback) {
            let contract = this.getCachedContract(tokenContract, new ethers.Contract(tokenContract,BEP20_ABI,this.getPublicProvider()));
            contract.totalSupply().then(result=>{
                callback(true, {
                    supply: result,
                    formattedSupply: ethers.utils.formatEther(result),
                });
            }
            ).catch(error=>{
                callback(false, {
                    error: error,
                });
            }
            );
        },
        getZapContract: function(signedProvider) {
            let contract = this.getCachedContract(this.ZAP_DATA.contract, new ethers.Contract(this.ZAP_DATA.contract,ZAP_ABI,signedProvider));
            return contract.connect(signedProvider.getSigner());
        },
        approve: function(tokenContract, amountHex, signedProvider, callback) {
            let contract = this.getCachedContract(tokenContract + 'signed', new ethers.Contract(tokenContract,BEP20_ABI,signedProvider))
              , contractWithSigner = contract.connect(signedProvider.getSigner());
            contractWithSigner.approve(CryptoUtils.FARM_CONTRACT, amountHex, this.OVERRIDES).then(result=>{
                let hash = result.hash;
                signedProvider.waitForTransaction(hash, 1).then(result=>{
                    callback(true, {
                        hash: hash,
                    });
                }
                );
            }
            ).catch(error=>{
                callback(false, {
                    error: error,
                });
            }
            );
        },
        approveExternal: function(tokenContract, externalContract, amountHex, signedProvider, callback) {
            let contract = this.getCachedContract(tokenContract + 'signedExternal', new ethers.Contract(tokenContract,BEP20_ABI,signedProvider))
              , contractWithSigner = contract.connect(signedProvider.getSigner());
            contractWithSigner.approve(externalContract, amountHex, this.OVERRIDES).then(result=>{
                let hash = result.hash;
                signedProvider.waitForTransaction(hash, 1).then(result=>{
                    callback(true, {
                        hash: hash,
                    });
                }
                );
            }
            ).catch(error=>{
                callback(false, {
                    error: error,
                });
            }
            );
        },
        deposit: function(pid, amount, gasLimit, signedProvider, callback) {
            let contract = this.getCachedContract(CryptoUtils.FARM_CONTRACT + 'signed', new ethers.Contract(CryptoUtils.FARM_CONTRACT,FARM_ABI,signedProvider))
              , contractWithSigner = contract.connect(signedProvider.getSigner())
              , overrides = {
                gasLimit: gasLimit,
            }
              , decimals = this.CURRENCY_DATA[this.getVaultData(pid).currency].decimals;
            contractWithSigner.deposit(pid, ethers.utils.parseUnits(amount, decimals), overrides).then(result=>{
                let hash = result.hash;
                signedProvider.waitForTransaction(hash, 1).then(result=>{
                    callback(true, {
                        hash: hash,
                    });
                }
                );
            }
            ).catch(error=>{
                callback(false, {
                    error: error,
                });
            }
            );
        },
        withdraw: function(pid, amount, gasLimit, signedProvider, callback) {
            let contract = this.getCachedContract(CryptoUtils.FARM_CONTRACT + 'signed', new ethers.Contract(CryptoUtils.FARM_CONTRACT,FARM_ABI,signedProvider))
              , contractWithSigner = contract.connect(signedProvider.getSigner())
              , overrides = {
                gasLimit: gasLimit,
            }
              , decimals = this.CURRENCY_DATA[this.getVaultData(pid).currency].decimals;
            amount = amount === ethers.constants.MaxUint256 ? ethers.constants.MaxUint256 : ethers.utils.parseUnits(amount, decimals);
            contractWithSigner.withdraw(pid, amount, overrides).then(result=>{
                let hash = result.hash;
                signedProvider.waitForTransaction(hash, 1).then(result=>{
                    callback(true, {
                        hash: hash,
                    });
                }
                ).catch(error=>{
                    callback(false, {
                        hash: hash,
                    });
                }
                );
            }
            ).catch(error=>{
                callback(false, {
                    error: error,
                });
            }
            );
        },
        withdrawAll: function(pid, gasLimit, signedProvider, callback) {
            this.withdraw(pid, gasLimit, ethers.constants.MaxUint256, signedProvider, callback);
        },
        harvestMultipleWaitForTx: async function(pids, amount, signedProvider, callback) {
            let contract = this.getCachedContract(CryptoUtils.FARM_CONTRACT + 'signed', new ethers.Contract(CryptoUtils.FARM_CONTRACT,FARM_ABI,signedProvider))
              , contractWithSigner = contract.connect(signedProvider.getSigner());
            for (let i = 0; i < pids.length; i++) {
                try {
                    let tx = await contractWithSigner.withdraw(pids[i], '0', this.OVERRIDES);
                    callback(true, {
                        status: 'broadcasted',
                        pid: pids[i],
                    });
                    await tx.wait(1);
                    callback(true, {
                        status: 'tx_done',
                        pid: pids[i],
                    });
                } catch (e) {
                    callback(false, {
                        status: 'canceled',
                        pid: pids[i],
                    });
                    return;
                }
            }
            await FrontendCommon.sleep(500);
            callback(true, {
                status: 'done',
            });
        },
        harvestMultiple: async function(pids, account, signedProvider, callback) {
            let contract = this.getCachedContract(CryptoUtils.FARM_CONTRACT + 'signed', new ethers.Contract(CryptoUtils.FARM_CONTRACT,FARM_ABI,signedProvider))
              , originalNonce = await signedProvider.getTransactionCount(account)
              , contractWithSigner = contract.connect(signedProvider.getSigner())
              , txs = [];
            for (let i = 0; i < pids.length; i++) {
                let overrides = {
                    gasLimit: this.OVERRIDES.gasLimit,
                    nonce: originalNonce,
                };
                try {
                    let tx = await contractWithSigner.withdraw(pids[i], '0', overrides);
                    txs.push({
                        pid: pids[i],
                        tx: tx,
                    });
                    originalNonce += 1;
                    callback(true, {
                        status: 'broadcasted',
                        pid: pids[i],
                    });
                } catch (e) {
                    callback(false, {
                        status: 'canceled',
                        pid: pids[i],
                    });
                    return;
                }
            }
            for (let i = 0; i < pids.length; i++) {
                await txs[i].tx.wait(1);
                callback(true, {
                    status: 'tx_done',
                    pid: txs[i].pid,
                });
                await FrontendCommon.sleep(500);
            }
            callback(true, {
                status: 'done',
            });
        },
        harvest: function(pid, gasLimit, signedProvider, callback) {
            this.withdraw(pid, '0', gasLimit, signedProvider, callback);
        },
        batchUpdateCall: async function(account, excludeBalance=false, excludeDeposited=false, excludePending=false) {
            const farmContract = this.getCachedContract(CryptoUtils.FARM_CONTRACT + 'web3', new this.WEB3.eth.Contract(FARM_ABI,CryptoUtils.FARM_CONTRACT))
              , batch = new this.WEB3.BatchRequest()
              , calls = [];
            for (let vault in CryptoUtils.VAULT_DATA) {
                let vaultData = CryptoUtils.VAULT_DATA[vault]
                  , pid = vaultData.pid
                  , tokenContractAddress = vaultData.token_contract
                  , tokenContract = this.getCachedContract(account + tokenContractAddress + 'web3', new this.WEB3.eth.Contract(BEP20_ABI,tokenContractAddress))
                  , decimals = CryptoUtils.CURRENCY_DATA[vaultData.currency].decimals;
                if (!excludeDeposited) {
                    calls.push({
                        pid: pid,
                        name: 'deposited',
                        currency: vaultData.currency,
                        decimals: decimals,
                        call: farmContract.methods.stakedWantTokens(pid, account).call,
                    });
                }
                if (!excludeBalance) {
                    calls.push({
                        pid: pid,
                        name: 'balance',
                        currency: vaultData.currency,
                        decimals: decimals,
                        call: tokenContract.methods.balanceOf(account).call,
                    });
                }
                if (!excludePending) {
                    calls.push({
                        pid: pid,
                        name: 'pending',
                        currency: vaultData.currency,
                        decimals: 18,
                        call: farmContract.methods.pendingNATIVE(pid, account).call,
                    });
                }
            }
            let promises = calls.map(callRequest=>{
                return new Promise((resolve,reject)=>{
                    let req = callRequest.call.request({
                        from: this.DEAD_ADDRESS
                    }, (error,data)=>{
                        if (!error) {
                            let result = {}
                              , parsed = ethers.utils.formatUnits(data, callRequest.decimals);
                            result['pid'] = callRequest.pid;
                            result['currency'] = callRequest.currency;
                            result[callRequest.name] = parseFloat(parsed);
                            result[callRequest.name + 'String'] = parsed;
                            result[callRequest.name + 'Raw'] = data;
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                    );
                    batch.add(req);
                }
                );
            }
            );
            batch.execute();
            let results = await Promise.all(promises);
            let resultFiltered = {};
            for (let result in results) {
                let pid = results[result].pid;
                if (pid in resultFiltered) {
                    delete results[result].pid;
                    Object.assign(resultFiltered[pid], results[result]);
                } else {
                    delete results[result].pid;
                    resultFiltered[pid] = results[result];
                }
            }
            return resultFiltered;
        },
        initialize: function() {
            r.loadData();
        }
    };
    return u;
}());
CryptoUtils.initialize();
