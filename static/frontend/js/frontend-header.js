let FrontendHeader = (function() {
    const HEADER_NATIVE_DECIMALS = 2;
    let r = {
        initializeHeader: function() {
            let header = $('header')
              , connectWalletBtn = header.find('.wallet .btn-wallet')
              , accountBalancesInfo = header.find('.wallet .balance')
              , qbertPriceTxt = header.find('.qbert-price .txt.price')
              , qbertBalanceTxt = header.find('.wallet .qbert-balance')
              , buyqbertTxt = header.find('.btn.buy-qbert')
              , walletAddress = header.find('span.wallet-address');
            header.bind('updateBalances', function() {
                let provider = Wallet.getProvider()
                  , accounts = Wallet.getAccounts()
                  , isConnected = Wallet.isConnected();
                if (isConnected) {
                    header.trigger('toggleWalletInfo', {
                        visibility: isConnected,
                    });
                    walletAddress.text(`${FrontendCommon.truncateSliceString(accounts[0], 6, 4)}`);
                    CryptoUtils.getFarmTokenBalance(accounts[0], provider, function(success, result) {
                        if (success) {
                            qbertBalanceTxt.removeClass('hidden');
                            let amount = parseFloat(result.formattedBalance);
                            qbertBalanceTxt.text(`${FrontendCommon.formatNumberHumanize(amount, HEADER_NATIVE_DECIMALS)} ${CryptoUtils.NATIVE_TOKEN_TICKER}`);
                        }
                    });
                    if (!r.accountBalanceInitialized) {
                        FrontendWidgets.generateWalletAvatar(accounts[0]);
                        r.accountBalanceInitialized = true;
                    }
                }
            });
            header.bind('toggleWalletInfo', function(ev, data) {
                if (data !== null && data.hasOwnProperty('visibility')) {
                    connectWalletBtn.toggle(data.visibility === false);
                    accountBalancesInfo.toggleClass('hidden', data.visibility === false);
                    qbertBalanceTxt.toggleClass('hidden', data.visibility === false);
                }
            });
            header.bind('updateqbertPrice', function() {
                let popupqbert = $('#popup-buy-qbert')
                  , popupqbertPrice = popupqbert.find('.qbert-price')
                  , price = CryptoUtils.getCurrencyPriceUSD(CryptoUtils.NATIVE_TOKEN_ID)
                  , formattedPrice = FrontendCommon.formatNumberHumanize(price, 2);
                qbertPriceTxt.text('$' + formattedPrice);
                popupqbert.attr('data-qbert-price', price);
                popupqbertPrice.text('$' + formattedPrice);
                qbertPriceTxt.addClass('updated');
                setTimeout(()=>{
                    qbertPriceTxt.removeClass('updated');
                }
                , 500);
            });
            buyqbertTxt.click(function() {
                r.showDialogqbert();
            });
            FrontendCommon.initializeTippy(null, accountBalancesInfo, 'Open account & settings');
            accountBalancesInfo.click(_=>{
                r.showDialogAccount();
            }
            );
            connectWalletBtn.click(async function(ev) {
                ev.preventDefault();
                await Wallet.connect();
                FrontendHeader.refreshWalletInfo();
            });
        },
        showDialogAccount: function() {
            let popup = FrontendWidgets.showPopup('#popup-account', 'Account')
              , dropdownProvider = popup.find('.dropdown-wrapper.public-provider')
              , copyBtn = popup.find('.copy')
              , disconnectBtn = popup.find('.btn.disconnect')
              , main = $('main');
            dropdownProvider.trigger('clearDropdownItems');
            dropdownProvider.trigger('setDefaultValue', {
                name: CryptoUtils.getPublicProviderName(),
                value: RPC_PROVIDER_URLS[CryptoUtils.getPublicProviderName()],
            });
            for (let provider in RPC_PROVIDER_URLS) {
                dropdownProvider.trigger('addDropdownItem', {
                    name: provider,
                    value: RPC_PROVIDER_URLS[provider],
                });
            }
            dropdownProvider.bind('onItemSelected', function(ev, data) {
                CryptoUtils.setPublicProvider(data.name);
                FrontendCommon.pageReload();
            });
            if (Wallet.isConnected()) {
                popup.find('.address .txt').text(FrontendCommon.truncateSliceString(Wallet.getAccounts()[0], 6, 4));
                popup.data('address', Wallet.getAccounts()[0]);
            } else {
                popup.data('address', null);
            }
            copyBtn.off('click');
            copyBtn.on('click', _=>{
                if (popup.data('address') !== null) {
                    FrontendCommon.copyToClipboard(popup.data('address'));
                    FrontendWidgets.toggleTopNotification(true, 'Address copied to clipboard', 4000);
                }
            }
            );
            disconnectBtn.off('click');
            disconnectBtn.on('click', async _=>{
                await Wallet.disconnect();
                r.accountBalanceInitialized = false;
                FrontendWidgets.toggleTopNotification(true, 'Wallet has been disconnected.', 4000);
                FrontendWidgets.closeOpenPopup();
                FrontendHeader.refreshWalletInfo();
                if (main.hasClass('app')) {
                    FrontendApp.resetStatsStripe(false);
                    FrontendApp.updateAll();
                } else if (main.hasClass('statistics')) {}
            }
            );
        },
        showDialogqbert: function() {
            let popup = FrontendWidgets.showPopup('#popup-buy-qbert', 'Your QBERT')
              , nativeTokenContract = CryptoUtils.NATIVE_TOKEN_BEP20_CONTRACT
              , nativeVaultPid = CryptoUtils.NATIVE_POOL_PID
              , qbertMainBalanceTxt = popup.find('.content .balance')
              , qbertBalanceTxt = popup.find('.qbert-balance')
              , qbertBalanceVaultTxt = popup.find('.qbert-balance-vault')
              , qbertSupplyTxt = popup.find('.qbert-supply')
              , qbertMarketCapTxt = popup.find('.market-cap')
              , qbertContractTxt = popup.find('.qbert-contract > span')
              , addressCopyBtn = popup.find('.qbert-contract img.copy')
              , buyBtn = popup.find('a.buy')
              , chartBtn = popup.find('a.chart');
            buyBtn.attr('href', buyBtn.data('url') + nativeTokenContract);
            chartBtn.attr('href', chartBtn.data('url') + nativeTokenContract);
            qbertContractTxt.text(FrontendCommon.truncateSliceString(nativeTokenContract, 6, 4));
            addressCopyBtn.off('click');
            addressCopyBtn.click(function() {
                FrontendCommon.copyToClipboard(nativeTokenContract);
                FrontendWidgets.closeOpenPopup();
                FrontendWidgets.toggleTopNotification(true, 'Contract address copied to clipboard.', 3000);
            });
            Wallet.balance(nativeTokenContract, (result,data)=>{
                if (result) {
                    qbertMainBalanceTxt.text(`${parseFloat(data.formattedBalance).toFixed(2)}`);
                    qbertBalanceTxt.text(`${parseFloat(data.formattedBalance).toFixed(2)} QBERT`);
                }
            }
            );
            CryptoUtils.getBEP20TotalSupply(nativeTokenContract, (result,data)=>{
                if (result) {
                    let supply = parseInt(data.formattedSupply)
                      , marketCap = supply * CryptoUtils.getCurrencyPriceUSD(CryptoUtils.NATIVE_TOKEN_ID);
                    qbertSupplyTxt.text(FrontendCommon.formatNumberHumanize(supply, 0));
                    qbertMarketCapTxt.text(`$${FrontendCommon.formatNumberHumanize(marketCap, 0)}`);
                }
            }
            );
            Wallet.balanceInVault(nativeVaultPid, (result,data)=>{
                if (result) {
                    qbertBalanceVaultTxt.text(`${parseFloat(data.formattedBalance).toFixed(2)} QBERT`);
                }
            }
            );
        },
    }
      , u = {
        showDialogqbert: function() {
            r.showDialogqbert();
        },
        updateqbertPrice: function() {
            $('header').trigger('updateqbertPrice');
        },
        refreshWalletInfo: function() {
            let header = $('header');
            if (Wallet.isConnected()) {
                header.trigger('updateBalances');
            } else {
                header.trigger('toggleWalletInfo', {
                    visibility: false
                });
            }
        },
        initialize: function() {
            r.initializeHeader();
        }
    };
    return u;
}
)();
FrontendHeader.initialize();
