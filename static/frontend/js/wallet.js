const Wallets = {
    METAMASK: {
        name: 'Metamask',
        description: 'Metamask',
        tag: 'injected',
        enabled: true,
    },
    TRUST_WALLET: {
        name: 'Trustwallet',
        tag: 'trustwallet',
        enabled: true,
    },
    BINANCE_WALLET: {
        name: 'Binance',
        description: 'Binance Chain Wallet',
        tag: 'custom-binance',
        enabled: true,
    },
    WALLET_CONNECT: {
        name: 'Wallet Connect',
        description: 'Wallet Connect for Binance Smart Chain',
        tag: 'custom-wc',
        enabled: true,
    },
    SAFEPAL: {
        name: 'Safepal',
        description: 'Safepal for Binance Smart Chain',
        tag: 'custom-safepal',
        enabled: false,
    },
    MATH_WALLET: {
        name: 'Math',
        description: 'Multi-platform cross-chain wallet',
        tag: 'custom-math',
        enabled: true,
    },
    BITKEEP: {
        name: 'Bitkeep',
        description: 'The world\'s largest multi-chain wallet',
        tag: 'custom-bitkeep',
        enabled: true,
    },
    ONTO: {
        name: 'Onto Data Wallet',
        description: 'Decentralized cross-chain wallet',
        tag: 'custom-onto',
        enabled: true,
    },
    MIDAS: {
        name: 'Midas Wallet',
        description: 'Midas Protocol mobile wallet',
        tag: 'custom-midas',
        enabled: true,
    },
    TOKEN_POCKET: {
        name: 'Token Pocket',
        description: 'A trusted multi-chain and multi-coin wallet',
        tag: 'custom-tokenpocket',
        enabled: true,
    },
};
let Wallet = (function() {
    const Web3Modal = window.Web3Modal.default;
    const WalletConnectProvider = window.WalletConnectProvider.default;
    let web3Modal = null;
    let provider = null;
    let modalProvider = null;
    let accounts = null;
    let usingWalletConnect = false;
    let r = {
        loadWalletSelfCached: async function() {
            while (this.getCachedProvider() === Wallets.BINANCE_WALLET.tag && typeof window.BinanceChain === 'undefined') {
                await FrontendCommon.sleep(50);
            }
            if (typeof window.ethereum !== 'undefined' && typeof window.ethereum.isTrust !== 'undefined' && window.ethereum.isTrust === true) {
                provider = new ethers.providers.Web3Provider(window.ethereum);
                accounts = await provider.listAccounts();
                FrontendCommon.setLocalItem('WEB3_CONNECT_CACHED_PROVIDER', Wallets.TRUST_WALLET.tag);
            } else {
                try {
                    modalProvider = await web3Modal.connect();
                    await r.addNetworkConfiguration();
                    provider = new ethers.providers.Web3Provider(modalProvider);
                    accounts = await provider.listAccounts();
                    modalProvider.on('accountsChanged', function(_) {});
                } catch (exception) {
                    provider = null;
                    accounts = [];
                }
            }
        },
        initializeProviderModal: async function() {
            let staticUrl = $('body').data('static-url');
            const providerOptions = {};
            if (Wallets.BINANCE_WALLET.enabled) {
                providerOptions[Wallets.BINANCE_WALLET.tag] = {
                    display: {
                        logo: staticUrl + 'frontend/img/binance-icon.png',
                        name: Wallets.BINANCE_WALLET.name,
                        description: Wallets.BINANCE_WALLET.description,
                    },
                    package: WalletConnectProvider,
                    connector: async(_,data)=>{
                        let provider = window.BinanceChain;
                        provider.autoRefreshOnNetworkChange = true;
                        await provider.enable();
                        return provider;
                    }
                    ,
                };
            }
            if (Wallets.WALLET_CONNECT.enabled) {
                providerOptions[Wallets.WALLET_CONNECT.tag] = {
                    display: {
                        logo: staticUrl + 'frontend/img/walletconnect.svg',
                        name: Wallets.WALLET_CONNECT.name,
                        description: Wallets.WALLET_CONNECT.description,
                    },
                    package: new WalletConnectProvider({
                        chainId: 56,
                        rpc: {
                            56: 'https://bsc-dataseed.binance.org/',
                        },
                    }),
                    connector: async(providerInstance,data)=>{
                        setTimeout(function() {
                            $('.walletconnect-modal__header').click(function() {
                                Wallet.disconnect();
                            });
                        }, 500);
                        await providerInstance.enable();
                        usingWalletConnect = true;
                        return providerInstance;
                    }
                    ,
                };
            }
            if (Wallets.SAFEPAL.enabled) {
                providerOptions[Wallets.SAFEPAL.tag] = {
                    display: {
                        logo: staticUrl + 'frontend/img/safepal.svg',
                        name: Wallets.SAFEPAL.name,
                        description: Wallets.SAFEPAL.description,
                    },
                    package: 'safepal',
                    connector: async(providerInstance,data)=>{
                        let provider = window.ethereum;
                        await provider.enable();
                        return provider;
                    }
                    ,
                };
            }
            if (Wallets.MATH_WALLET.enabled) {
                providerOptions[Wallets.MATH_WALLET.tag] = {
                    display: {
                        logo: staticUrl + 'frontend/img/math-wallet.svg',
                        name: Wallets.MATH_WALLET.name,
                        description: Wallets.MATH_WALLET.description,
                    },
                    package: 'mathwallet',
                    connector: async(providerInstance,data)=>{
                        let provider = window.ethereum;
                        await provider.enable();
                        return provider;
                    }
                    ,
                };
            }
            if (Wallets.BITKEEP.enabled) {
                providerOptions[Wallets.BITKEEP.tag] = {
                    display: {
                        logo: staticUrl + 'frontend/img/bitkeep.svg',
                        name: Wallets.BITKEEP.name,
                        description: Wallets.BITKEEP.description,
                    },
                    package: 'bitkeep',
                    connector: async(providerInstance,data)=>{
                        let provider = window.ethereum;
                        await provider.enable();
                        return provider;
                    }
                    ,
                };
            }
            if (Wallets.ONTO.enabled) {
                providerOptions[Wallets.ONTO.tag] = {
                    display: {
                        logo: staticUrl + 'frontend/img/onto-wallet.png',
                        name: Wallets.ONTO.name,
                        description: Wallets.ONTO.description,
                    },
                    package: 'onto',
                    connector: async(providerInstance,data)=>{
                        let provider = window.ethereum;
                        await provider.enable();
                        return provider;
                    }
                    ,
                };
            }
            if (Wallets.MIDAS.enabled) {
                providerOptions[Wallets.MIDAS.tag] = {
                    display: {
                        logo: staticUrl + 'frontend/img/midas-wallet.png',
                        name: Wallets.MIDAS.name,
                        description: Wallets.MIDAS.description,
                    },
                    package: 'midas',
                    connector: async(providerInstance,data)=>{
                        let provider = window.ethereum;
                        await provider.enable();
                        return provider;
                    }
                    ,
                };
            }
            if (Wallets.TOKEN_POCKET.enabled) {
                providerOptions[Wallets.TOKEN_POCKET.tag] = {
                    display: {
                        logo: staticUrl + 'frontend/img/token-pocket.png',
                        name: Wallets.TOKEN_POCKET.name,
                        description: Wallets.TOKEN_POCKET.description,
                    },
                    package: 'tokenpocket',
                    connector: async(providerInstance,data)=>{
                        let provider = window.ethereum;
                        await provider.enable();
                        return provider;
                    }
                    ,
                };
            }
            let cachedProvider = Object.keys(Wallets).filter(name=>{
                if (Wallets[name].tag === FrontendCommon.getLocalItem('WEB3_CONNECT_CACHED_PROVIDER', null)) {
                    return Wallets[name];
                }
            }
            )[0];
            if (typeof cachedProvider !== 'undefined' && !Wallets[cachedProvider].enabled) {
                FrontendCommon.deleteLocalItem('WEB3_CONNECT_CACHED_PROVIDER');
            }
            web3Modal = new Web3Modal({
                cacheProvider: true,
                providerOptions,
                network: 56,
                disableInjectedProvider: false,
                theme: {
                    background: '#380033a8',
                    main: '#FFFFFF',
                    secondary: '#00c0d4',
                    border: '#380033a8',
                    hover: '#ff0a9c78',
                }
            });
        },
        getCachedProvider: function() {
            return FrontendCommon.getLocalItem('WEB3_CONNECT_CACHED_PROVIDER', null);
        },
        addNetworkConfiguration: async function() {
            try {
                await modalProvider.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0x38',
                        chainName: 'Binance Smart Chain',
                        blockExplorerUrls: ['https://bscscan.com'],
                        nativeCurrency: {
                            name: 'Binance Coin',
                            symbol: 'BNB',
                            decimals: 18,
                        },
                        rpcUrls: ['https://bsc-dataseed.binance.org/', 'https://bsc-dataseed1.binance.org/', 'https://bsc-dataseed2.binance.org/', ],
                    }]
                });
                return true;
            } catch (e) {
                return false;
            }
        },
        addNativeAssetToWallet: async function() {
            try {
                return await modalProvider.request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: 'ERC20',
                        options: {
                            address: '0xc5A49b4CBe004b6FD55B30Ba1dE6AC360FF9765d',
                            symbol: 'QBERT',
                            decimals: 18,
                            image: '../static/frontend/img/symbols/qbertpxl.png',
                        },
                    },
                });
            } catch (e) {
                return false;
            }
        },
    }
      , u = {
        addNetworkConfiguration: async function() {
            return await r.addNetworkConfiguration();
        },
        addNativeAssetToWallet: async function() {
            return await r.addNativeAssetToWallet();
        },
        approve: function(tokenContract, callback) {
            if (!this.isConnected()) {
                callback(false, {
                    error: 'Wallet is not connected.',
                });
                return;
            }
            CryptoUtils.approve(tokenContract, CryptoUtils.getUint256Max(), this.getProvider(), (result,_)=>{
                callback(result, {});
            }
            );
        },
        approveExternal: function(tokenContract, externalContract, callback) {
            if (!this.isConnected()) {
                callback(false, {
                    error: 'Wallet is not connected.',
                });
                return;
            }
            CryptoUtils.approveExternal(tokenContract, externalContract, CryptoUtils.getUint256Max(), this.getProvider(), (result,_)=>{
                callback(result, {});
            }
            );
        },
        allowance: function(tokenContract, callback) {
            if (!this.isConnected()) {
                callback(false, {
                    error: 'Wallet is not connected.',
                });
                return;
            }
            CryptoUtils.getAllowance(Wallet.getAccounts()[0], tokenContract, (result,data)=>{
                if (result) {
                    callback(true, {
                        allowance: data.allowance,
                    });
                } else {
                    callback(false, {
                        error: 'Error getting allowance',
                    });
                }
            }
            );
        },
        allowanceExternal: function(tokenContract, externalContract, callback) {
            if (!this.isConnected()) {
                callback(false, {
                    error: 'Wallet is not connected.',
                });
                return;
            }
            CryptoUtils.getAllowanceExternal(Wallet.getAccounts()[0], tokenContract, externalContract, (result,data)=>{
                if (result) {
                    callback(true, {
                        allowance: data.allowance,
                    });
                } else {
                    callback(false, {
                        error: 'Error getting allowance',
                    });
                }
            }
            );
        },
        harvestAll: async function(pids, callback) {
            if (!this.isConnected()) {
                return false;
            }
            if (r.getCachedProvider() === Wallets.BINANCE_WALLET.tag) {
                await CryptoUtils.harvestMultipleWaitForTx(pids, Wallet.getAccounts()[0], this.getProvider(), callback);
            } else {
                await CryptoUtils.harvestMultiple(pids, Wallet.getAccounts()[0], this.getProvider(), callback);
            }
        },
        harvest: function(pid, gasLimit, callback) {
            if (!this.isConnected()) {
                callback(false, {});
                return;
            }
            CryptoUtils.harvest(pid, gasLimit, this.getProvider(), callback);
        },
        withdraw: function(pid, gasLimit, amount, callback) {
            if (!this.isConnected()) {
                callback(false, {});
                return;
            }
            CryptoUtils.withdraw(pid, gasLimit, amount, this.getProvider(), callback);
        },
        deposit: function(pid, gasLimit, amount, tokenContract, callback) {
            if (!this.isConnected()) {
                callback(false, {
                    error: 'Wallet is not connected.',
                });
                return;
            }
            CryptoUtils.getAllowance(Wallet.getAccounts()[0], tokenContract, (result,data)=>{
                if (result) {
                    if (data.allowance === 0) {
                        CryptoUtils.approve(tokenContract, CryptoUtils.getUint256Max(), this.getProvider(), (result,data)=>{
                            if (result) {
                                CryptoUtils.deposit(pid, gasLimit, amount, this.getProvider(), callback);
                            } else {
                                callback(false, {
                                    error: 'Allowance was not approved',
                                });
                            }
                        }
                        );
                    } else {
                        CryptoUtils.deposit(pid, gasLimit, amount, this.getProvider(), callback);
                    }
                } else {
                    callback(false, {
                        error: 'Allowance network error',
                    });
                }
            }
            );
        },
        gasBalance: function(callback) {
            if (!this.isConnected()) {
                callback(false, {
                    error: 'Wallet is not connected',
                });
                return;
            }
            CryptoUtils.getGasBalance(Wallet.getAccounts()[0], this.getProvider(), callback);
        },
        balance: function(tokenContract, callback) {
            if (!this.isConnected()) {
                callback(false, {
                    error: 'Wallet is not connected',
                });
                return;
            }
            CryptoUtils.getTokenBalance(Wallet.getAccounts()[0], tokenContract, this.getProvider(), callback);
        },
        balanceInVault: function(pid, callback) {
            if (!this.isConnected()) {
                callback(false, {
                    error: 'Wallet is not connected',
                });
                return;
            }
            CryptoUtils.getStakedTokens(pid, Wallet.getAccounts()[0], callback);
        },
        connect: async function() {
            await r.loadWalletSelfCached();
        },
        disconnect: async function(onDisconnect=_=>{}
        ) {
            provider = null;
            accounts = null;
            onDisconnect();
            await web3Modal.clearCachedProvider();
        },
        getProvider: function() {
            return provider;
        },
        getAccounts: function() {
            return accounts;
        },
        isConnected: function() {
            return provider !== null && accounts !== null && accounts.length > 0;
        },
        initialize: async function() {
            await r.initializeProviderModal();
            await this.connect();
        },
    };
    return u;
}
)();
