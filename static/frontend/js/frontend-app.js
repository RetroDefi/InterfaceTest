let FrontendApp = (function() {
    const FILTER_VALUE_ALL = -1;
    const FILTER_PLATFORM = 'FILTER_PLATFORM';
    const FILTER_POOL_TYPE = 'FILTER_POOL_TYPE';
    const FILTER_ASSET = 'FILTER_ASSET';
    const FILTER_ZERO_BALANCES = 'FILTER_ZERO_BALANCES';
    const SORT_STORAGE_KEY = 'SORT_KEY';
    const SORT_KEY_DEFAULT = 'default';
    const SORT_KEY_NAME = 'name';
    const SORT_KEY_BALANCE = 'balance';
    const SORT_KEY_DEPOSITED = 'deposited';
    const SORT_KEY_APY = 'apy';
    const SORT_KEY_DAILY = 'daily';
    const SORT_KEY_TVL = 'tvl';
    const SORT_VALUE_DEFAULT = SORT_KEY_NAME;
    const E = 0.0000001;
    let r = {
        accountBalanceInitialized: false,
        accountBalanceTippyInstance: null,
        harvestableAmount: 0,
        harvestableVaults: null,
        initPage: function() {
            let box = $('.content')
              , tvlTxt = box.find('.title .tvl');
            box.bind('updateTvl', function(ev, data) {
                if (data.hasOwnProperty('tvl')) {
                    tvlTxt.text('TVL $' + FrontendCommon.formatNumberHumanize(data.tvl, 0));
                }
            });
        },
        initFilteringSorting: function() {
            let cardsContainer = $('.pools')
              , cards = cardsContainer.find('.pool-card')
              , hideZeroBalancesToggle = $('.checkbox-container.hide-zero-balance input')
              , searchInput = $('.input-container.search input')
              , dropdownPlatform = $('.dropdown-wrapper.platform')
              , dropdownPoolType = $('.dropdown-wrapper.pool-type')
              , dropdownAsset = $('.dropdown-wrapper.asset')
              , dropdownSort = $('.dropdown-wrapper.sort')
              , appVersionOptions = $('.options.app-version .option');
            FrontendCommon.deleteLocalItem(FILTER_ZERO_BALANCES);
            FrontendCommon.deleteLocalItem(FILTER_PLATFORM);
            FrontendCommon.deleteLocalItem(FILTER_POOL_TYPE);
            FrontendCommon.deleteLocalItem(FILTER_ASSET);
            searchInput.keyup(function() {
                filterCards(searchInput.val().trim());
                sortCards();
            });
            hideZeroBalancesToggle.change(function() {
                FrontendCommon.setLocalItem(FILTER_ZERO_BALANCES, this.checked);
                filterCards();
                sortCards();
            });
            dropdownPlatform.bind('onItemSelected', function(ev, data) {
                FrontendCommon.setLocalItem(FILTER_PLATFORM, data.value);
                filterCards();
                sortCards();
            });
            dropdownPoolType.bind('onItemSelected', function(ev, data) {
                FrontendCommon.setLocalItem(FILTER_POOL_TYPE, data.value);
                filterCards();
                sortCards();
            });
            dropdownAsset.bind('onItemSelected', function(ev, data) {
                FrontendCommon.setLocalItem(FILTER_ASSET, data.value);
                filterCards();
                sortCards();
            });
            dropdownSort.bind('onItemSelected', function(ev, data) {
                FrontendCommon.setLocalItem(SORT_STORAGE_KEY, data.value);
                filterCards();
                sortCards();
            });
            let sortCards = function() {
                let sortKey = FrontendCommon.getLocalItem(SORT_STORAGE_KEY, SORT_VALUE_DEFAULT);
                cardsContainer.append(cards.sort(function(card0, card1) {
                    let $card0 = $(card0)
                      , $card1 = $(card1);
                    if (sortKey === SORT_KEY_DEFAULT) {
                        return $card0.data('sort-value') - $card1.data('sort-value');
                    } else if (sortKey === SORT_KEY_NAME) {
                        return $card0.data('pool-title').localeCompare($card1.data('pool-title'));
                    } else if (sortKey === SORT_KEY_BALANCE) {
                        return parseFloat($card1.data('balance')) - parseFloat($card0.data('balance'));
                    } else if (sortKey === SORT_KEY_DEPOSITED) {
                        return parseFloat($card1.data('deposited')) - parseFloat($card0.data('deposited'));
                    } else if (sortKey === SORT_KEY_APY) {
                        return parseFloat($card1.data('apy')) - parseFloat($card0.data('apy'));
                    } else if (sortKey === SORT_KEY_DAILY) {
                        return parseFloat($card1.data('daily')) - parseFloat($card0.data('daily'));
                    } else if (sortKey === SORT_KEY_TVL) {
                        return parseFloat($card1.data('tvl')) - parseFloat($card0.data('tvl'));
                    }
                }));
            };
            let filterCards = function(searchQuery='') {
                cards.each(function() {
                    let card = $(this)
                      , cardPoolTitle = card.data('pool-title')
                      , cardPoolSubtitle = card.data('pool-subtitle')
                      , cardPoolWholeTitle = cardPoolTitle + cardPoolSubtitle
                      , cardPlatformId = card.data('platform')
                      , cardPoolTypeId = card.data('pool-type')
                      , cardCurrencyId = card.data('currencies')
                      , cardBalance = parseFloat(card.attr('data-balance'))
                      , cardDeposited = parseFloat(card.attr('data-deposited'));
                    let filterPlatformId = FrontendCommon.getLocalItem(FILTER_PLATFORM, FILTER_VALUE_ALL)
                      , filterPoolTypeId = FrontendCommon.getLocalItem(FILTER_POOL_TYPE, FILTER_VALUE_ALL)
                      , filterCurrencyId = FrontendCommon.getLocalItem(FILTER_ASSET, FILTER_VALUE_ALL)
                      , filterZeroBalances = FrontendCommon.getLocalItem(FILTER_ZERO_BALANCES, false);
                    if ((cardPlatformId === filterPlatformId || filterPlatformId === FILTER_VALUE_ALL) && (cardPoolTypeId === filterPoolTypeId || filterPoolTypeId === FILTER_VALUE_ALL) && (cardCurrencyId.includes(filterCurrencyId) || filterCurrencyId === FILTER_VALUE_ALL) && (cardPoolWholeTitle.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '') && (!filterZeroBalances || (filterZeroBalances && (cardBalance > E || cardDeposited > E)))) {
                        card.show();
                    } else {
                        card.hide();
                    }
                })
            };
            appVersionOptions.click(function() {
                if (appVersionOptions.data('transitioning')) {
                    return;
                }
                let option = $(this)
                  , options = option.parent();
                appVersionOptions.data('transitioning', true);
                options.removeClass(['index-0', 'index-1', 'index-2', 'index-3']);
                options.addClass('index-' + option.data('index'));
                setTimeout(()=>{
                    FrontendCommon.pageRedirect(option.data('value'));
                }
                , 500);
            });
        },
        initPoolCards: function() {
            let cards = $('.pool-card')
              , depositInputContainer = cards.find('.transaction.deposit .input-container')
              , depositInput = depositInputContainer.find('input')
              , withdrawInputContainer = cards.find('.transaction.withdraw .input-container')
              , withdrawInput = withdrawInputContainer.find('input');
            depositInputContainer.find('.max').click(function() {
                let btn = $(this)
                  , walletBalance = btn.closest('.pool-card').attr('data-balance')
                  , input = btn.siblings('input');
                input.val(walletBalance);
            });
            withdrawInputContainer.find('.max').click(function() {
                let btn = $(this)
                  , withdrawBalance = btn.closest('.pool-card').attr('data-deposited')
                  , input = btn.siblings('input');
                input.val(withdrawBalance);
            });
            cards.each(function(i, _) {
                let card = $(this)
                  , pid = card.data('pid')
                  , depositInputContainer = card.find('.transaction.deposit .input-container')
                  , depositInput = depositInputContainer.find('input')
                  , withdrawInputContainer = card.find('.transaction.withdraw .input-container')
                  , withdrawInput = withdrawInputContainer.find('input')
                  , depositBtn = card.find('.transaction.deposit .btn.deposit')
                  , withdrawBtn = card.find('.transaction.withdraw .btn.withdraw')
                  , harvestBtn = card.find('.transaction.harvest .btn.harvest')
                  , expandBtn = card.find('.btn.expand')
                  , vaultDetailsBtn = card.find('.info.learn a.vault-details')
                  , btnGet = card.find('.info .btn.get')
                  , info = card.find('.info')
                  , mainBalanceTxt = info.find('.key-value.balance .val')
                  , mainDepositTxt = info.find('.key-value.deposited .val')
                  , mainDailyTxt = info.find('.key-value.daily .val')
                  , mainYearlyTxt = info.find('.key-value.apy .val')
                  , mainTvlTxt = info.find('.key-value.tvl .val')
                  , detailsBalanceTxt = card.find('.transaction.deposit .amount .val')
                  , detailsWithdrawTxt = card.find('.transaction.withdraw .amount .val')
                  , harvestAmountTxt = card.find('.transactions .transaction.harvest .val span.amount')
                  , harvestValueTxt = card.find('.transactions .transaction.harvest .val span.value')
                  , dataCurrencyTicker = card.data('currency-ticker')
                  , dataCurrencyId = card.data('currency-id')
                  , dataBalanceDecimals = detailsBalanceTxt.data('display-decimals')
                  , dataDepositedDecimals = detailsWithdrawTxt.data('display-decimals')
                  , tippyBalanceInstance = card.data('tippy-balance') || null
                  , tippyDepositInstance = card.data('tippy-deposit') || null
                  , amountCountUpInstance = card.data('countup-amount-instance') || null
                  , valueCountUpInstance = card.data('countup-value-instance') || null;
                card.data('sort-value', i);
                depositBtn.click(function() {
                    let pid = card.data('pid')
                      , tokenContract = depositBtn.data('currency-contract')
                      , gasLimit = CryptoUtils.GAS_LIMITS[card.data('gas-limit-tx')];
                    ga('send', {
                        hitType: 'event',
                        eventCategory: 'Button',
                        eventAction: 'deposit',
                    });
                    depositBtn.addClass('loading');
                    Wallet.deposit(pid, depositInput.val(), gasLimit, tokenContract, (result,_)=>{
                        depositBtn.removeClass('loading');
                        depositInput.val(0);
                        if (result) {
                            FrontendWidgets.toggleTopNotification(true, 'Deposit has been successfully confirmed.', 5000);
                            r.updateWalletBalances();
                        }
                    }
                    );
                });
                withdrawBtn.click(function() {
                    let pid = card.data('pid')
                      , gasLimit = CryptoUtils.GAS_LIMITS[card.data('gas-limit-tx')];
                    withdrawBtn.addClass('loading');
                    Wallet.withdraw(pid, withdrawInput.val(), gasLimit, (result,_)=>{
                        withdrawBtn.removeClass('loading');
                        withdrawInput.val(0);
                        if (result) {
                            FrontendWidgets.toggleTopNotification(true, 'Withdrawal has been successfully confirmed.', 5000);
                            r.updateWalletBalances();
                        }
                    }
                    );
                });
                harvestBtn.click(function() {
                    let pid = card.data('pid')
                      , gasLimit = CryptoUtils.GAS_LIMITS[3];
                    harvestBtn.addClass('loading');
                    Wallet.harvest(pid, gasLimit, function(result, _) {
                        harvestBtn.removeClass('loading');
                        if (result) {
                            FrontendWidgets.toggleTopNotification(true, 'Harvest has been successfully confirmed.', 5000);
                            r.updateWalletBalances();
                        }
                    });
                });
                vaultDetailsBtn.click(()=>{
                    let popup = FrontendWidgets.showPopup('#popup-vault-details', 'Vault Details');
                    popup.find('.value.name').text(card.data('pool-title'));
                    popup.find('.value.pid').text(card.data('pid'));
                    popup.find('.value.strategy').attr('href', 'https://bscscan.com/address/' + card.data('strategy-contract-address'));
                    popup.find('.value.strategy').text(FrontendCommon.truncateSliceString(card.data('strategy-contract-address'), 6, 4));
                }
                );
                card.find('.transactions .transaction.deposit .swap a').click(function() {
                    if ($(this).data('custom')) {
                        return;
                    }
                    if (card.data('is-lp')) {
                        if (card.data('platform-zap-enabled') == true) {
                            FrontendWidgets.showPopup('#popup-create-lp', 'Create ' + card.data('currency-name'));
                            setTimeout(function() {
                                if (typeof ComponentCreateLP !== 'undefined') {
                                    ComponentCreateLP.updateDefaultCurrency(card.data('currency-id'));
                                }
                            }, 150);
                        } else {
                            r.showDialogLPToken(card);
                        }
                    } else {
                        r.showDialogSingleToken(card);
                    }
                });
                expandBtn.click(function() {
                    card.trigger('toggleExpand');
                });
                card.bind('toggleExpand', function(ev, data) {
                    let details = card.find('.details')
                      , isExpanded = card.hasClass('expanded');
                    if (data !== undefined && data.hasOwnProperty('forceExpand') && data.forceExpand === true && isExpanded) {
                        return;
                    }
                    isExpanded = !isExpanded;
                    card.toggleClass('expanded', isExpanded);
                    details.slideToggle(150);
                    ev.stopPropagation();
                });
                card.bind('resolveDepositAndGetButton', function(ev, data) {
                    if (typeof data !== 'undefined') {
                        data = data[pid];
                        btnGet.text(data.balance === 0 ? `Get ${dataCurrencyTicker}` : 'Deposit');
                        btnGet.removeClass('loading');
                        btnGet.toggleClass('outlined', data.balance === 0);
                        btnGet.toggleClass('secondary', data.balance > 0);
                        btnGet.off('click');
                        btnGet.on('click', function() {
                            if (data.balance === 0) {
                                let customSwapUrl = card.data('custom-swap-url');
                                if (customSwapUrl) {
                                    FrontendCommon.pageOpenInNewTab(customSwapUrl);
                                    return;
                                }
                                if (card.data('is-lp')) {
                                    r.showDialogLPToken(card);
                                } else {
                                    r.showDialogSingleToken(card);
                                }
                            } else {
                                card.trigger('toggleExpand', {
                                    forceExpand: true,
                                });
                            }
                        });
                    }
                });
                card.bind('updateValues', function(ev, data) {
                    if (typeof data !== 'undefined') {
                        data = data[pid];
                        card.attr('data-balance', data.balanceString);
                        card.attr('data-deposited', data.depositedString);
                        card.attr('data-pending', data.pendingString);
                        card.data('tippy-deposit', FrontendCommon.initializeTippy(tippyDepositInstance, mainDepositTxt, data.depositedString));
                        card.data('tippy-balance', FrontendCommon.initializeTippy(tippyBalanceInstance, mainBalanceTxt, data.balanceString));
                        mainBalanceTxt.text(data.balance === 0 ? '0' : FrontendCommon.formatNumberString(data.balanceString, 4));
                        detailsBalanceTxt.html(FrontendCommon.formatNumberString(data.balanceString, dataBalanceDecimals) + ' <span class="estimate">($' + FrontendCommon.formatNumberHumanize(data.balance * CryptoUtils.getCurrencyPriceUSD(dataCurrencyId), 2) + ')</span>');
                        mainDepositTxt.text(data.deposited === 0 ? '0' : FrontendCommon.formatNumberString(data.depositedString, 4));
                        detailsWithdrawTxt.html(FrontendCommon.formatNumberString(data.depositedString, dataDepositedDecimals) + ' <span class="estimate">($' + FrontendCommon.formatNumberHumanize(data.deposited * CryptoUtils.getCurrencyPriceUSD(dataCurrencyId), 2) + ')</span>')
                    }
                });
                card.bind('updatePending', function(ev, data) {
                    if (typeof data !== 'undefined') {
                        data = data[pid];
                        if (amountCountUpInstance === null && valueCountUpInstance === null) {
                            amountCountUpInstance = new window.countup(harvestAmountTxt[0],0,{
                                duration: 2,
                                decimalPlaces: 5,
                            });
                            valueCountUpInstance = new window.countup(harvestValueTxt[0],0,{
                                duration: 2,
                                decimalPlaces: 2,
                                formattingFn: (num)=>{
                                    return '($' + FrontendCommon.formatNumberHumanize(num, 2) + ')';
                                }
                                ,
                            });
                            amountCountUpInstance.start();
                            valueCountUpInstance.start();
                            card.data('countup-amount-instance', amountCountUpInstance);
                            card.data('countup-value-instance', valueCountUpInstance);
                        }
                        if (isNaN(data.pending) || data.pending === 0) {
                            return;
                        }
                        let value = data.pending * CryptoUtils.getCurrencyPriceUSD(CryptoUtils.NATIVE_TOKEN_ID)
                          , amountCharacterAmount = FrontendCommon.formatNumberHumanize(data.pending, 5).toString().length
                          , valueCharacterAmount = FrontendCommon.formatNumberHumanize(value, 2).toString().length
                          , amountMeasurements = FrontendCommon.getTextSize('0'.repeat(amountCharacterAmount), '20px')
                          , valueMeasurements = FrontendCommon.getTextSize('0'.repeat(valueCharacterAmount), '20px');
                        harvestAmountTxt.css('width', amountMeasurements.width + 'px');
                        harvestValueTxt.css('width', valueMeasurements.width + 'px');
                        amountCountUpInstance.update(data.pending);
                        valueCountUpInstance.update(value);
                    }
                });
                card.bind('updateVaultInfo', function(ev, data) {
                    if (typeof data !== 'undefined' && data.hasOwnProperty('tvl') && data.hasOwnProperty('apy') && data.hasOwnProperty('daily')) {
                        mainTvlTxt.text('$' + FrontendCommon.formatNumberSuffix(data.tvl, 2, true));
                        mainYearlyTxt.text(FrontendCommon.formatNumberSuffix(data.apy, 2) + '%');
                        mainDailyTxt.text(FrontendCommon.formatNumberSuffix(data.daily, 2) + '%');
                    }
                });
                card.bind('updateCard', function(ev, data) {
                    let card = $(this);
                    card.trigger('updateValues', data);
                    card.trigger('updatePending', data);
                    card.trigger('resolveDepositAndGetButton', data);
                });
                FrontendCommon.initializeTippy(null, harvestBtn, 'Harvest all pending QBERTs');
                FrontendCommon.initializeTippy(null, withdrawBtn, 'Withdraw from Vault. Pending QBERTs will be harvested.');
                FrontendCommon.initializeTippy(null, depositBtn, `Deposit your ${dataCurrencyTicker.toUpperCase()} and start earning. Pending QBERTs will be harvested.`);
                FrontendCommon.initializeTippy(null, card.find($('.pool .tag.multiplier')), 'The multiplier represents the amount of QBERT rewards each vaults gets. Larger the multiplier, more QBERT rewards the vault gets.');
                FrontendCommon.initializeTippy(null, card.find($('.info .pond-apy .tooltip')), 'Auto-compounded yield you receive from native farm');
                FrontendCommon.initializeTippy(null, card.find($('.info .qbert-apy .tooltip')), 'Bonus reward given to qbert.finance stakers');
            });
        },
        initRefreshData: function() {
            const refreshWalletData = async _=>{
                while (true) {
                    await FrontendCommon.sleep(CryptoUtils.REFRESH_RATES.REFRESH_RATE_RPC);
                    await r.updateWalletBalances();
                }
            }
            ;
            const refreshPoolInfo = async _=>{
                while (true) {
                    await FrontendCommon.sleep(CryptoUtils.REFRESH_RATES.REFRESH_RATE_POOLS);
                    await r.updateFarmInfo();
                }
            }
            ;
            refreshWalletData();
            refreshPoolInfo();
        },
        initStatsStripe: function() {
            let box = $('.stats-stripe')
              , harvestAllPopup = $('#popup-harvest-all')
              , visibilityBtn = box.find('.btn.show-hide')
              , harvestAllBtn = box.find('.btn.harvest-all')
              , depositValueTxt = box.find('.txt.total-deposit')
              , pendingContainer = box.find('.txt.qbert-pending')
              , pendingAmountTxt = box.find('.txt.qbert-pending span.amount')
              , pendingAmountCountUp = box.data('pending-amount-countup')
              , pendingValueTxt = box.find('.txt.qbert-pending span.value')
              , pendingValueCountUp = box.data('pending-value-countup');
            visibilityBtn.click(_=>{
                let statStripOptions = FrontendCommon.getLocalItem('STATS_STRIP_VISIBLE', true);
                box.trigger('toggleVisibility', {
                    visible: !statStripOptions,
                });
            }
            );
            harvestAllBtn.click(_=>{
                if (!harvestAllBtn.hasClass('disabled')) {
                    FrontendCommonPopups.showPopupHarvestAll();
                }
            }
            );
            box.bind('toggleStripeLoading', function(_, data) {
                if ('loading'in data) {
                    depositValueTxt.toggleClass('loading', data.loading);
                    pendingContainer.toggleClass('loading', data.loading);
                }
            });
            box.bind('toggleVisibility', function(_, data) {
                if ('visible'in data) {
                    FrontendCommon.setLocalItem('STATS_STRIP_VISIBLE', data.visible);
                    box.toggleClass('visible', data.visible);
                }
            });
            box.bind('updateDepositValue', function(_, data) {
                if ('depositValue'in data) {
                    if ('loading'in data && data.loading) {
                        depositValueTxt.html('&nbsp;');
                    } else {
                        depositValueTxt.text('$' + FrontendCommon.formatNumberHumanize(data.depositValue, 2));
                    }
                }
            });
            box.bind('updatePendingValue', function(_, data) {
                if ('loading'in data && data.loading) {
                    let amountMeasurements = FrontendCommon.getTextSize('0', '16px');
                    pendingAmountTxt.text('');
                    pendingValueTxt.text('');
                    pendingAmountTxt.css('width', amountMeasurements.width);
                    pendingValueTxt.css('width', amountMeasurements.width);
                    harvestAllBtn.removeClass('primary');
                    harvestAllBtn.addClass('disabled');
                    harvestAllBtn.text('Harvest All');
                    return;
                }
                if ('pendingAmount'in data) {
                    if (isNaN(data.pendingAmount)) {
                        return;
                    }
                    const amountDecimals = 4
                      , valueDecimals = 2
                      , animationDuration = 2.0;
                    let value = data.pendingAmount * CryptoUtils.getCurrencyPriceUSD(CryptoUtils.NATIVE_TOKEN_ID)
                      , amountCharacterAmount = FrontendCommon.formatNumberHumanize(data.pendingAmount, amountDecimals).toString().length
                      , valueCharacterAmount = FrontendCommon.formatNumberHumanize(value, valueDecimals).toString().length + 3
                      , amountMeasurements = FrontendCommon.getTextSize('0'.repeat(amountCharacterAmount), '16px')
                      , valueMeasurements = FrontendCommon.getTextSize('0'.repeat(valueCharacterAmount), '16px');
                    pendingContainer.css('width', 'fit-content');
                    pendingAmountTxt.css('width', amountMeasurements.width * 0.98 + 'px');
                    pendingValueTxt.css('width', valueMeasurements.width + 'px');
                    if (pendingAmountCountUp === undefined) {
                        pendingAmountCountUp = new window.countup(pendingAmountTxt[0],data.pendingAmount,{
                            decimalPlaces: amountDecimals,
                            duration: animationDuration,
                        });
                        pendingAmountCountUp.start();
                        box.data('pending-amount-countup', pendingAmountCountUp);
                    } else {
                        pendingAmountCountUp.update(data.pendingAmount);
                    }
                    if (pendingValueCountUp === undefined) {
                        pendingValueCountUp = new window.countup(pendingValueTxt[0],value,{
                            duration: 2,
                            decimalPlaces: valueDecimals,
                            formattingFn: (num)=>{
                                return '($' + FrontendCommon.formatNumberHumanize(num, valueDecimals) + ')';
                            }
                        });
                        pendingValueCountUp.start();
                        box.data('pending-value-countup', pendingValueCountUp);
                    } else {
                        pendingValueCountUp.update(value);
                    }
                    harvestAllBtn.toggleClass('primary', value > 0);
                    harvestAllBtn.toggleClass('disabled', value === 0);
                    harvestAllBtn.text(value > 0 ? 'Harvest All' : 'Nothing to Harvest :(');
                }
            });
            box.trigger('toggleVisibility', {
                visible: FrontendCommon.getLocalItem('STATS_STRIP_VISIBLE', true),
            });
        },
        updateWalletBalances: async function() {
            if (!Wallet.isConnected()) {
                return;
            }
            let data = null;
            try {
                data = await CryptoUtils.batchUpdateCall(Wallet.getAccounts()[0]);
            } catch (e) {
                return;
            }
            let cards = $('.pool-card')
              , statsStripeBox = $('.stats-stripe')
              , harvestAllPopup = $('#popup-harvest-all')
              , harvestableVaults = []
              , depositedValue = 0
              , pendingAmount = 0;
            for (let i = 0; i < cards.length; i++) {
                let card = cards.eq(i)
                  , pid = card.data('pid')
                  , currencyId = card.data('currency-id');
                card.trigger('updateCard', data);
                depositedValue += data[pid].deposited * CryptoUtils.getCurrencyPriceUSD(currencyId);
                pendingAmount += data[pid].pending;
                if (data[pid].pending > E) {
                    harvestableVaults.push({
                        pid: pid,
                        pendingAmount: data[pid].pending,
                        include: true,
                    });
                }
            }
            if (harvestAllPopup.data('is-harvesting') == false) {
                harvestAllPopup.data('harvestable-vaults', harvestableVaults);
            }
            harvestAllPopup.trigger('updateValues');
            if (FrontendCommon.getElementData(harvestAllPopup, 'popup-visible', false)) {
                harvestAllPopup.trigger('updateTable');
            }
            statsStripeBox.trigger('updateDepositValue', {
                depositValue: depositedValue,
                loading: false,
            });
            statsStripeBox.trigger('updatePendingValue', {
                pendingAmount: pendingAmount,
                loading: false,
            });
            statsStripeBox.trigger('toggleStripeLoading', {
                loading: false,
            });
        },
        updateFarmInfo: async function() {
            let url = $('.content').data('api-pools-url') || 'https://retrofarms.net/api/pools/'
              , cards = $('.pool-card');
            let updateCardInfo = function(poolsInfo) {
                let totalTvl = 0
                  , poolValues = Object.values(poolsInfo);
                for (let i = 0; i < cards.length; i++) {
                    let card = cards.eq(i)
                      , pid = cards.eq(i).data('pid')
                      , poolInfo = poolValues.filter(info=>info.pid === pid)[0];
                    if (typeof poolsInfo !== 'undefined' && typeof poolInfo !== 'undefined') {
                        let poolTvl = parseFloat(poolInfo.tvl);
                        if (pid === CryptoUtils.NATIVE_POOL_PID) {
                            CryptoUtils.updatePrice(CryptoUtils.NATIVE_TOKEN_ID, poolInfo.price);
                        }
                        card.trigger('updateVaultInfo', {
                            tvl: poolTvl,
                            apy: poolInfo.apy,
                            daily: poolInfo.daily,
                        });
                        totalTvl += poolTvl;
                    }
                }
                $('.content').trigger('updateTvl', {
                    tvl: totalTvl,
                });
                FrontendHeader.updateQBertPrice();
            };
            $.ajax({
                url: url,
                success: function(result) {
                    if (result.status === 'ok') {
                        updateCardInfo(result.pools);
                    }
                }
            });
        },
        showDialogLPToken: function(card) {
            let ticker0 = card.data('token0-ticker').toUpperCase()
              , token0isgas = card.data('token0-is-gas') == true
              , ticker1 = card.data('token1-ticker').toUpperCase()
              , token1isgas = card.data('token1-is-gas') == true
              , contract0 = card.data('token0-contract')
              , contract1 = card.data('token1-contract')
              , popup = FrontendWidgets.showPopup('#popup-buy-lp-token', `Get ${ticker0} / ${ticker1}`)
              , staticSymbols = popup.data('static-symbols')
              , balance0txt = popup.find('.token0 .balance')
              , balance1txt = popup.find('.token1 .balance')
              , urlSwapSingle = card.data('platform-swap-single-url')
              , urlSwapLP = card.data('platform-swap-lp-url')
              , urlSwapLPWithGas = card.data('platform-swap-lp-with-gas-url')
              , balance0 = 0
              , balance1 = 0;
            popup.find('.btn.add-lp').removeClass(['secondary', 'primary']);
            popup.find('.token0 img').attr('src', `${staticSymbols}/${ticker0.toLowerCase()}.svg`);
            popup.find('.token1 img').attr('src', `${staticSymbols}/${ticker1.toLowerCase()}.svg`);
            balance0txt.text(`0 ${ticker0}`);
            balance1txt.text(`0 ${ticker1}`);
            if (token0isgas) {
                popup.find('.token0 a').attr('href', popup.data('url-buy-bnb'));
                popup.find('.token1 a').attr('href', `${urlSwapSingle}${contract1}`);
                popup.find('.btn.add-lp').attr('href', `${urlSwapLPWithGas}${contract1}`);
            } else if (token1isgas) {
                popup.find('.token0 a').attr('href', `${urlSwapSingle}${contract0}`);
                popup.find('.token1 a').attr('href', popup.data('url-buy-bnb'));
                popup.find('.btn.add-lp').attr('href', `${urlSwapLPWithGas}${contract0}`);
            } else {
                popup.find('.token0 a').attr('href', `${urlSwapSingle}${contract0}`);
                popup.find('.token1 a').attr('href', `${urlSwapSingle}${contract1}`);
                popup.find('.btn.add-lp').attr('href', `${urlSwapLP}${contract0}/${contract1}`);
            }
            let checkPositiveBalance = _=>{
                let btn = popup.find('.btn.add-lp');
                btn.toggleClass('primary', balance0 > 0 && balance1 > 0);
                btn.toggleClass('secondary', !(balance0 > 0 && balance1 > 0));
            }
            ;
            let balance0callback = (result,data)=>{
                if (result) {
                    balance0 = parseFloat(data.formattedBalance).toFixed(2);
                    balance0txt.text(balance0 + ' ' + ticker0);
                    checkPositiveBalance();
                }
            }
            ;
            let balance1callback = (result,data)=>{
                if (result) {
                    balance1 = parseFloat(data.formattedBalance).toFixed(2);
                    balance1txt.text(balance1 + ' ' + ticker1);
                    checkPositiveBalance();
                }
            }
            ;
            if (token0isgas) {
                Wallet.gasBalance(balance0callback);
            } else {
                Wallet.balance(contract0, balance0callback);
            }
            if (token1isgas) {
                Wallet.gasBalance(balance1callback);
            } else {
                Wallet.balance(contract1, balance1callback);
            }
        },
        showDialogSingleToken: function(card) {
            let ticker0 = card.data('token0-ticker').toUpperCase()
              , contract0 = card.data('token0-contract')
              , swapUrl = card.data('platform-swap-single-url')
              , popup = FrontendWidgets.showPopup('#popup-buy-single-token', `Buy ${ticker0}`)
              , staticSymbols = popup.data('static-symbols')
              , balanceTxt = popup.find('.balance');
            popup.find('.content img').attr('src', `${staticSymbols}/${ticker0.toLowerCase()}.svg`);
            popup.find('.btn.buy').attr('href', `${swapUrl}${contract0}`);
            balanceTxt.text(`0 ${ticker0}`);
            Wallet.balance(contract0, (result,data)=>{
                if (result) {
                    balanceTxt.text(`${parseFloat(data.formattedBalance).toFixed(2)} ${ticker0}`);
                }
            }
            );
        },
    }
      , u = {
        updateAll: async function() {
            await r.updateWalletBalances();
        },
        resetStatsStripe: function(loading=false) {
            let statsStripeBox = $('.stats-stripe');
            statsStripeBox.trigger('updateDepositValue', {
                depositValue: 0,
                loading: loading,
            });
            statsStripeBox.trigger('updatePendingValue', {
                pendingAmount: 0,
                loading: loading,
            });
            statsStripeBox.trigger('toggleStripeLoading', {
                loading: loading,
            });
        },
        startRefreshingData: function() {
            r.initRefreshData();
        },
        initialize: async function() {
            r.initPage();
            r.initFilteringSorting();
            r.initPoolCards();
            r.initStatsStripe();
        }
    };
    return u;
}());
(async function() {
    await FrontendApp.initialize();
    await Wallet.initialize();
    FrontendHeader.refreshWalletInfo();
    FrontendApp.resetStatsStripe(true);
    FrontendApp.startRefreshingData();
    FrontendApp.updateAll();
}
)();
