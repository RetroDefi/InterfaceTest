jQuery.ajaxSetup({
    headers: {
        "cache-control": "no-cache"
    }
});
jQuery(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        let cookieValue = null
          , cookies = []
          , i = 0
          , j = 0
          , cookie = {};
        if (document.cookie && document.cookie !== '') {
            cookies = document.cookie.split(';');
            for (j = cookies.length; i < j; i += 1) {
                cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        let host = document.location.host
          , protocol = document.location.protocol
          , sr_origin = '//' + host
          , origin = protocol + sr_origin;
        return (url === origin || url.slice(0, origin.length + 1) === origin + '/') || (url === sr_origin || url.slice(0, sr_origin.length + 1) === sr_origin + '/') || !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});
let FrontendCommon = (function() {
    let r = {}
      , u = {
        setLocalItem: function(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        getLocalItem: function(key, defaultValue=null) {
            if (localStorage.hasOwnProperty(key)) {
                return JSON.parse(localStorage.getItem(key));
            }
            return defaultValue;
        },
        deleteLocalItem: function(key) {
            if (localStorage.hasOwnProperty(key)) {
                localStorage.removeItem(key);
                return true;
            }
            return false;
        },
        getElementData: function(element, key, defaultValue) {
            let data = element.data(key);
            if (typeof data === 'undefined') {
                element.data(key, defaultValue);
                return defaultValue;
            }
            return data;
        },
        setElementData: function(element, key, value) {
            element.data(key, value);
        },
        pageRedirect: function(url) {
            window.location = url;
        },
        pageReload: function() {
            window.location.href = window.location.href.split('#')[0];
        },
        pageOpenInNewTab: function(url) {
            window.open(url);
        },
        dateTimestampToLocal: function(timestamp) {
            return new Date(Math.round(timestamp * 1000));
        },
        dateAddDays: function(date, days) {
            date.setDate(date.getDate() + days);
            return date;
        },
        timeAddLeadingZero: function(time) {
            return (time < 10 ? '0' : '') + time;
        },
        formatTime: function(date) {
            let hours = date.getHours()
              , minutes = FrontendCommon.timeAddLeadingZero(date.getMinutes())
              , seconds = FrontendCommon.timeAddLeadingZero(date.getSeconds())
              , formattedTime = hours + ':' + minutes + ':' + seconds;
            return formattedTime;
        },
        formatDate: function(date) {
            let day = date.getDate()
              , month = date.getMonth() + 1
              , year = date.getFullYear()
              , formattedDate = day + '-' + month + '-' + year;
            return formattedDate
        },
        formatDateTime: function(date) {
            return FrontendCommon.formatDate(date) + ' ' + FrontendCommon.formatTime(date);
        },
        formatStringToNumber: function(text, decimals) {
            return parseFloat(text).toFixed(decimals);
        },
        formatNumberString: function(numberString, decimals) {
            if (typeof numberString === 'number') {
                numberString += '';
            }
            if (numberString.indexOf('.') === -1) {
                return numberString + '.' + '0'.repeat(decimals);
            }
            let split = numberString.split('.')
              , wholePart = split[0]
              , decimalPart = split[1];
            if (decimalPart.length > decimals) {
                return wholePart + '.' + decimalPart.substring(0, decimals);
            } else if (decimalPart.length < decimals) {
                let missingDecimals = decimals - decimalPart.length;
                return numberString + '0'.repeat(missingDecimals);
            }
            return numberString;
        },
        formatNumberHumanize: function(num, decimals) {
            if (typeof num !== 'number') {
                num = parseFloat(num);
            }
            num = num.toFixed(decimals);
            if (decimals == 0) {
                return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            } else {
                num = num.split('.');
                return num[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + num[1];
            }
        },
        formatNumberSuffix: function(num, decimals, ignoreBelowThousand=false) {
            if (typeof num !== 'number') {
                num = parseFloat(num);
            }
            if (num < 1e6) {
                return this.formatNumberHumanize(num, ignoreBelowThousand ? 0 : decimals);
            } else if (num >= 1e6 && num < 1e9) {
                num /= 1e6;
                return this.formatNumberHumanize(num, decimals) + 'M';
            } else if (num >= 1e9 && num < 1e12) {
                num /= 1e9;
                return this.formatNumberHumanize(num, decimals) + 'B';
            } else if (num >= 1e12 && num < 1e15) {
                num /= 1e12;
                return this.formatNumberHumanize(num, decimals) + 'T';
            } else if (num >= 1e15) {
                num /= 1e15;
                return this.formatNumberHumanize(num, decimals) + 'Q';
            }
            return this.formatNumberHumanize(num, decimals);
        },
        sleep: function(ms) {
            return new Promise(resolve=>setTimeout(resolve, ms));
        },
        truncateSliceString: function(str, firstPartSize, secondPartSize, middlePart='...') {
            return `${str.slice(0, firstPartSize)}${middlePart}${str.slice(str.length - secondPartSize)}`;
        },
        initializeTippy: function(instance, element, text, placement='bottom') {
            if (instance === null) {
                return tippy(element[0], {
                    content: `${text}`,
                    placement: placement,
                    theme: 'qberty',
                    delay: 150,
                });
            }
            instance.setContent(text);
            return instance;
        },
        isElementVisibleOnScreen: function(element, partially=false) {
            let rect = element.getBoundingClientRect();
            if (partially) {
                let vertView = (rect.top <= (window.innerHeight || document.documentElement.clientHeight)) && ((rect.top + rect.height) >= 0)
                  , horView = (rect.left <= (window.innerWidth || document.documentElement.clientWidth)) && ((rect.left + rect.width) >= 0);
                return (vertView && horView);
            }
            return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth));
        },
        getTextSize: function(text, fontSize, font='Poppins') {
            let textEl = $('<div>' + text + '</div>');
            textEl.css('display', 'inline-block');
            textEl.css('position', 'absolute');
            textEl.css('font-size', fontSize);
            textEl.css('font-family', font);
            textEl.text(text);
            $('body').append(textEl);
            let measurements = {
                width: textEl.width(),
                height: textEl.height(),
            };
            textEl.remove();
            return measurements;
        },
        slideFadeUp: function(el, ms, complete=_=>{}
        ) {
            const fade = {
                opacity: 0,
                transition: 'opacity ' + ms + 'ms',
            };
            el.css(fade).delay(50).slideUp(ms, complete);
        },
        copyToClipboard: function(text) {
            let $temp = $('<input>');
            $('body').append($temp);
            $temp.val(text).select();
            document.execCommand('copy');
            $temp.remove();
        },
        initialize: function() {},
    };
    return u;
}());
let FrontendWidgets = (function() {
    const STICKY_HEADER_TRIGGER = 250;
    const STICKY_HEADER_MOBILE_TRIGGER = 10;
    const NOTICE_VALIDATE_DURATION = 24 * 60 * 60 * 1000;
    const MOBILE_MENU_RWD_TRIGGER = 1700;
    let r = {
        popupVisible: null,
        extraPopupScripts: {},
        initializeNotice: function() {
            let notices = $('.notice');
            notices.find('img.close').click(function() {
                let notice = $(this).parent();
                notice.addClass('animate-hide');
                setTimeout(_=>{
                    FrontendCommon.setLocalItem('NOTICE_LAST_VISIBLE_' + notice.data('notice-id'), Date.now());
                    notice.hide();
                }
                , 300);
            });
            notices.each(function() {
                let notice = $(this)
                  , lastTimeVisible = FrontendCommon.getLocalItem('NOTICE_LAST_VISIBLE_' + notice.data('notice-id'), Date.now() - NOTICE_VALIDATE_DURATION)
                if ((Date.now() - lastTimeVisible) >= NOTICE_VALIDATE_DURATION) {
                    notice.removeClass('hidden');
                }
            });
        },
        initializeHeader: function() {
            let header = $('header');
            let isMobile = function() {
                return $(window).width() <= MOBILE_MENU_RWD_TRIGGER;
            };
            header.toggleClass('sticky', isMobile() ? window.pageYOffset >= STICKY_HEADER_MOBILE_TRIGGER : window.pageYOffset >= STICKY_HEADER_TRIGGER);
            $(window).scroll(function() {
                if ((isMobile() && window.pageYOffset >= STICKY_HEADER_MOBILE_TRIGGER) || (!isMobile() && window.pageYOffset >= STICKY_HEADER_TRIGGER)) {
                    header.addClass('sticky');
                } else if (window.pageYOffset === 0) {
                    header.removeClass('sticky');
                }
            });
        },
        initializeMobileMenu: function() {
            let header = $('header')
              , menu = header.find('.mobile-menu')
              , hamburger = $('header .hamburger');
            hamburger.click(function() {
                menu.toggleClass('visible');
            });
            if ($(window).width() < MOBILE_MENU_RWD_TRIGGER) {
                header.addClass('mobile');
            }
            $(window).on('resize', function() {
                if ($(window).width() >= MOBILE_MENU_RWD_TRIGGER && menu.hasClass('visible')) {
                    header.removeClass('mobile');
                    menu.removeClass('visible');
                }
            });
        },
        initializeNumericInputs: function() {
            let inputContainers = $('.input-container.number');
            inputContainers.each(function() {
                let input = $(this).find('input')
                  , humanize = input.data('humanize') == true
                  , decimalPlaces = parseInt(input.data('decimal-places'));
                input.on('input', function() {
                    let value = input.val();
                    if (humanize) {
                        value = value.replace(/,$/, '.').replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    } else {
                        value = value.replace(',', '.');
                    }
                    if (value.indexOf('.') !== -1) {
                        let splitOnDot = value.split('.')
                          , firstPart = splitOnDot[0].replace(/[^0-9\.,]/g, '')
                          , secondPart = splitOnDot[1].replace(/[^0-9\.]/g, '');
                        if (decimalPlaces === 0) {
                            input.val(firstPart);
                        } else {
                            input.val(firstPart.replace(/^$/, '0') + '.' + secondPart.slice(0, decimalPlaces));
                        }
                    } else {
                        input.val(value.replace(/[^0-9\.,]/g, ''));
                    }
                });
                input.focusout(function() {
                    if (input.val() === '') {
                        input.val(0);
                    }
                });
            });
        },
        initializeDropdowns: function() {
            let dropdowns = $('.dropdown-wrapper')
              , items = dropdowns.find('.itm');
            $(document).click(function(event) {
                let target = $(event.target)
                  , dropdowns = $('.dropdown-wrapper');
                if (!target.closest('.dropdown-wrapper').length && dropdowns.hasClass('opened')) {
                    dropdowns.removeClass('opened');
                }
            });
            dropdowns.click(function(ev) {
                let dropdown = $(this);
                $('.dropdown-wrapper.opened').not(dropdown).removeClass('opened');
                dropdown.toggleClass('opened');
                ev.stopPropagation();
            });
            let setClickListener = function() {
                items = dropdowns.find('.itm');
                items.off('click');
                items.click(function(ev) {
                    let item = $(this)
                      , dropdown = item.parent().parent();
                    dropdown.attr('data-value', item.data('value'));
                    dropdown.attr('data-name', item.data('name'));
                    dropdown.trigger('onItemSelected', {
                        value: item.data('value'),
                        name: item.data('name'),
                    });
                    dropdown.removeClass('opened');
                    ev.stopPropagation();
                });
            }
            dropdowns.bind('setDefaultValue', function(ev, data) {
                if (typeof data !== 'undefined' && 'name'in data && 'value'in data) {
                    let dropdown = $(this);
                    dropdown.attr('data-value', data.value);
                    dropdown.attr('data-name', data.name);
                }
            });
            dropdowns.bind('clearDropdownItems', function() {
                $(this).find('.dropdown').empty();
            });
            dropdowns.bind('addDropdownItem', function(ev, data) {
                let dropdown = $(this).find('.dropdown');
                if (typeof data !== 'undefined' && 'name'in data && 'value'in data) {
                    let itm = $('<div class="itm" data-value="' + data.value + '" data-name="' + data.name + '">' + data.name + '</div>');
                    dropdown.append(itm);
                    setClickListener();
                }
            });
            setClickListener();
        },
        initCurrencyDropdown: function(dropdownEl, currencyList, defaultCurrency=-1, includeCurrencyPlatform=false) {
            let dropdown = dropdownEl.find('.dropdown')
              , symbolsUrl = dropdownEl.data('symbols-url')
              , symbolsCustomUrl = dropdownEl.data('symbols-custom-url')
              , items = null;
            dropdownEl.off('updateSelected');
            dropdownEl.bind('updateSelected', ()=>{
                let selected = dropdownEl.find('.selected')
                  , currencyId = dropdownEl.attr('data-value')
                  , currencyData = CryptoUtils.CURRENCY_DATA[currencyId];
                selected.find('.ttl').text(currencyData.symbol.toUpperCase());
                if (!currencyData.is_lp) {
                    selected.find('.icons img:nth-of-type(1)').attr('src', symbolsUrl + currencyData.symbol + '.svg');
                    selected.find('.icons img:nth-of-type(2)').hide();
                } else {
                    selected.find('.icons img:nth-of-type(1)').attr('src', symbolsUrl + CryptoUtils.CURRENCY_DATA[currencyData['token_0']].symbol + '.svg');
                    selected.find('.icons img:nth-of-type(2)').attr('src', symbolsUrl + CryptoUtils.CURRENCY_DATA[currencyData['token_1']].symbol + '.svg');
                    selected.find('.icons img:nth-of-type(2)').show();
                }
            }
            );
            dropdown.find('.itm:not(.template)').remove();
            dropdownEl.toggleClass('wrapped', currencyList.length >= 4);
            dropdownEl.toggleClass('single', currencyList.length === 1);
            let template = dropdownEl.find('.itm.template');
            for (let i = 0; i < currencyList.length; i++) {
                let currencyId = currencyList[i];
                if (currencyId in CryptoUtils.CURRENCY_DATA) {
                    let data = CryptoUtils.CURRENCY_DATA[currencyId]
                      , vaultData = CryptoUtils.findVaultFromCurrency(currencyId)
                      , currencyPlatform = includeCurrencyPlatform ? CryptoUtils.PLATFORMS_DATA[CryptoUtils.getCurrencyPlatform(currencyId)] : undefined
                      , clone = template.clone();
                    clone.removeClass('template');
                    clone.attr('data-name', data.symbol);
                    clone.attr('data-value', currencyId);
                    clone.find('.txt .name').text(data.symbol.toUpperCase());
                    if (typeof currencyPlatform !== 'undefined' && includeCurrencyPlatform) {
                        clone.addClass('with-platform');
                        clone.find('.txt .platform').text(currencyPlatform.name_key);
                    }
                    if (typeof vaultData !== 'undefined' && vaultData.custom_icon != null) {
                        let icn = clone.find('.icons img:nth-of-type(1)');
                        icn.addClass('full-size');
                        icn.attr('src', symbolsCustomUrl + vaultData.custom_icon);
                        clone.find('.icons img:nth-of-type(2)').remove();
                    } else if (data.is_lp) {
                        clone.find('.icons img:nth-of-type(1)').attr('src', symbolsUrl + CryptoUtils.CURRENCY_DATA[data.token_0].symbol + '.svg');
                        clone.find('.icons img:nth-of-type(2)').attr('src', symbolsUrl + CryptoUtils.CURRENCY_DATA[data.token_1].symbol + '.svg');
                    } else {
                        clone.find('.icons img:nth-of-type(1)').attr('src', symbolsUrl + data.symbol + '.svg');
                        clone.find('.icons img:nth-of-type(2)').remove();
                    }
                    clone.appendTo(dropdown);
                }
            }
            items = dropdown.find('.itm');
            dropdown.append(items.sort((a,b)=>{
                let $a = $(a)
                  , $b = $(b);
                if (typeof $a.data('name') === 'undefined' || typeof $b.data('name') === 'undefined') {
                    return false;
                }
                return $a.data('name').localeCompare($b.data('name'));
            }
            ));
            items.click(function(ev) {
                let item = $(this)
                  , currencyId = item.data('value')
                  , dropdownWrapper = item.parent().parent();
                dropdownWrapper.attr('data-value', currencyId);
                dropdownWrapper.attr('data-name', item.data('name'));
                dropdownWrapper.trigger('updateSelected');
                dropdownWrapper.removeClass('opened');
                dropdownWrapper.trigger('onItemSelected', {
                    currencyId: currencyId,
                });
                ev.stopPropagation();
            });
            if (defaultCurrency !== -1) {
                dropdownEl.attr('data-value', defaultCurrency);
                dropdownEl.trigger('updateSelected');
            }
        },
        initTopNotification: function() {
            let box = $('header')
              , notification = box.find('.top-notification')
              , notificationText = notification.find('span.txt')
              , btnClose = box.find('.btn-close');
            btnClose.click(_=>{
                box.trigger('toggleTopNotification', {
                    visibility: false
                });
            }
            );
            box.bind('toggleTopNotification', function(ev, data) {
                if (data !== null && data.hasOwnProperty('visibility')) {
                    notification.toggleClass('visible', data.visibility === true);
                    notification.toggleClass('hidden', data.visibility === false);
                    if (data.hasOwnProperty('text')) {
                        notificationText.text(data.text);
                    }
                }
            });
            box.bind('hideTopNotification', function() {
                box.trigger('toggleTopNotification', {
                    visibility: false
                });
            });
        },
        initPopups: function() {
            let container = $('.popup-container');
            container.find('img.close').click(function() {
                container.trigger('togglePopup', {
                    visible: false,
                });
                container.trigger('closePopup');
            });
            container.bind('togglePopup', function(ev, data) {
                if (data !== undefined && data.hasOwnProperty('visible')) {
                    container.toggleClass('visible', data.visible);
                }
            });
            container.bind('closePopup', _=>{
                if (r.popupVisible !== null) {
                    FrontendCommon.getElementData(r.popupVisible, 'popup-close-listener', _=>{}
                    )();
                    r.popupVisible.data('popup-visible', false);
                    r.popupVisible.removeClass('visible');
                    r.popupVisible.hide();
                    r.popupVisible = null;
                }
                container.trigger('togglePopup', {
                    visible: false,
                });
            }
            );
        },
        initCertikLabel: function() {
            let certikContainer = $('.certik-container')
              , $window = $(window)
              , $footer = $('footer');
            if (certikContainer.length === 0) {
                return;
            }
            let resolveVisibility = function(screenWidth, force=false) {
                if (certikContainer.offset().top + certikContainer.height() > $footer.position().top) {
                    certikContainer.removeClass('visible');
                } else {
                    certikContainer.addClass('visible');
                }
            };
            $window.on('resize', function() {
                resolveVisibility($window.width());
            });
            $window.on('scroll', function() {
                resolveVisibility($window.width());
            });
            resolveVisibility($window.width(), 0, true);
        },
        generateAvatar: function(seed) {
            return window.createIcon({
                seed: seed,
                size: 6,
                scale: 5,
                color: '#080E12',
                bgcolor: '#CCF66C',
            });
        },
    }
      , u = {
        showPopup: function(id, title) {
            let popup = $(id)
              , extraScriptPath = popup.data('extra-script');
            if (typeof extraScriptPath !== 'undefined' && !(extraScriptPath in r.extraPopupScripts)) {
                r.extraPopupScripts[extraScriptPath] = 'loaded';
                $.getScript(extraScriptPath);
            }
            $('.popup-container').trigger('togglePopup', {
                visible: true,
            });
            popup.find('.header .ttl').text(title);
            popup.data('popup-visible', true);
            r.popupVisible = popup;
            r.popupVisible.show();
            popup.addClass('visible');
            return r.popupVisible;
        },
        closeOpenPopup: function() {
            $('.popup-container').trigger('closePopup');
        },
        toggleTopNotification: function(visibility, text, cleanNotificationsTimeout=0) {
            let header = $('header')
              , notificationInstance = header.data('notification-instance') || null;
            header.trigger('toggleTopNotification', {
                visibility: visibility,
                text: text,
            });
            if (cleanNotificationsTimeout !== 0) {
                if (notificationInstance !== null) {
                    clearTimeout(notificationInstance);
                    header.data('notification-instance', null);
                }
                let instance = setTimeout(_=>{
                    header.trigger('toggleTopNotification', {
                        visibility: false,
                    });
                }
                , cleanNotificationsTimeout);
                header.data('notification-instance', instance);
            }
        },
        initCurrencyDropdown(dropdownEl, currencyList, defaultCurrency=-1, includeCurrencyPlatform=false) {
            r.initCurrencyDropdown(dropdownEl, currencyList, defaultCurrency, includeCurrencyPlatform);
        },
        generateWalletAvatar: function(walletAddress) {
            let iconParentSite = $('header .wallet-info .icon')
              , iconParentDialog = $('#popup-account .icon');
            for (let i = 0; i < iconParentSite.length; i++) {
                iconParentSite.eq(i).empty();
                iconParentSite.eq(i).append(r.generateAvatar(walletAddress));
            }
            for (let i = 0; i < iconParentDialog.length; i++) {
                iconParentDialog.eq(i).empty();
                iconParentDialog.eq(i).append(r.generateAvatar(walletAddress));
            }
        },
        initialize: function() {
            r.initializeHeader();
            r.initializeMobileMenu();
            r.initializeNumericInputs();
            r.initializeDropdowns();
            r.initTopNotification();
            r.initPopups();
            r.initializeNotice();
            r.initCertikLabel();
        },
    };
    return u;
}
)();
let FrontendCommonPopups = (function() {
    return {
        showPopupHarvestAll: function() {
            let popup = FrontendWidgets.showPopup('#popup-harvest-all', 'Harvest All')
              , urlSymbols = popup.data('url-symbols')
              , harvestableVaults = popup.data('harvestable-vaults') || []
              , amountTxt = popup.find('span.qbert')
              , valueTxt = popup.find('span.value')
              , vaultsNumberTxt = popup.find('.head .vaults')
              , resetBtn = popup.find('div.reset')
              , harvestBtn = popup.find('a.btn.harvest-all');
            harvestableVaults = harvestableVaults.sort((a,b)=>{
                return b.pendingAmount - a.pendingAmount;
            }
            );
            popup.data('harvestable-vaults', harvestableVaults);
            let getIncludedVaultCount = function() {
                if (harvestableVaults === null || harvestableVaults.length === 0) {
                    return 0;
                }
                let harvestedVaults = getHarvestedVaults();
                return harvestableVaults.reduce((acc,curr)=>{
                    return acc + (curr.include && !(curr.pid in harvestedVaults) ? 1 : 0);
                }
                , 0);
            };
            let getHarvestingVaults = _=>FrontendCommon.getElementData(popup, 'harvesting-vaults', []);
            let getHarvestedVaults = _=>FrontendCommon.getElementData(popup, 'harvested-vaults', []);
            let addHarvestingVault = (pid)=>{
                let harvestingVaults = getHarvestingVaults();
                harvestingVaults.push(pid);
                popup.data('harvesting-vaults', harvestingVaults);
            }
            ;
            let removeHarvestingVault = function(pid) {
                let harvestingVaults = getHarvestingVaults();
                harvestingVaults = harvestingVaults.filter(item=>item !== pid);
                popup.data('harvesting-vaults', harvestingVaults);
            };
            let addHarvestedVaults = function(pid) {
                let harvestedVaults = getHarvestedVaults();
                harvestedVaults.push(pid);
                popup.data('harvested-vaults', harvestedVaults);
            };
            popup.data('harvesting-vaults', []);
            popup.data('harvested-vaults', []);
            popup.off('updateValues');
            popup.bind('updateValues', function() {
                let amount = 0
                  , vaults = popup.data('harvestable-vaults')
                  , includedCount = getIncludedVaultCount();
                for (let i = 0; i < harvestableVaults.length; i++) {
                    let data = vaults.find(vault=>vault.pid === harvestableVaults[i].pid);
                    if (typeof data !== 'undefined') {
                        harvestableVaults[i].pendingAmount = data.pendingAmount;
                    }
                }
                amount = harvestableVaults.reduce((acc,curr)=>{
                    return acc + (curr.include ? curr.pendingAmount : 0);
                }
                , 0);
                amountTxt.text(FrontendCommon.formatNumberHumanize(amount, 4) + ' QBERT');
                valueTxt.text('($' + FrontendCommon.formatNumberHumanize(CryptoUtils.getCurrencyPriceUSD(CryptoUtils.NATIVE_TOKEN_ID) * amount, 2) + ')');
                vaultsNumberTxt.text(includedCount + '/' + vaults.length + ' vaults');
            });
            popup.off('populateTable');
            popup.bind('populateTable', function() {
                let table = popup.find('.vault-list')
                  , template = table.find('.itm.template');
                table.find('.itm:not(.template)').remove();
                for (let i = 0; i < harvestableVaults.length; i++) {
                    let element = template.clone()
                      , vaultData = CryptoUtils.getVaultData(harvestableVaults[i].pid);
                    element.data('pid', harvestableVaults[i].pid);
                    element.find('.icon-1').attr('src', urlSymbols + '/' + vaultData.token0_ticker + '.svg');
                    if (vaultData.is_lp) {
                        element.find('.icon-2').attr('src', urlSymbols + '/' + vaultData.token1_ticker + '.svg');
                    } else {
                        element.find('.icon-2').css('visibility', 'hidden');
                    }
                    element.find('.content .ttl').text(vaultData.title);
                    element.find('.content .pending').text(FrontendCommon.formatNumberHumanize(harvestableVaults[i].pendingAmount, 6) + ' QBERT');
                    element.find('.actions .btn.cancel').click(function() {
                        let vaultCount = table.find('.itm:not(.template)').length;
                        harvestableVaults[i].include = false;
                        if (vaultCount > 3) {
                            element.remove();
                        } else {
                            element.css('min-height', '0');
                            element.css('height', '70px');
                            FrontendCommon.slideFadeUp(element, 300, _=>{
                                element.remove();
                                table.toggleClass('empty', table.find('.itm:not(.template)').length === 0);
                            }
                            );
                        }
                        popup.trigger('updateValues');
                        popup.trigger('resolveHarvestButton');
                    });
                    element.removeClass('template');
                    element.appendTo(table);
                }
                table.toggleClass('empty', table.find('.itm:not(.template)').length === 0);
            });
            popup.off('resolveHarvestButton');
            popup.on('resolveHarvestButton', function() {
                harvestBtn.toggleClass('disabled', getIncludedVaultCount() === 0);
                harvestBtn.toggleClass('loading', popup.data('is-harvesting') == true);
            });
            popup.off('resetTable');
            popup.bind('resetTable', function() {
                if (getIncludedVaultCount() === harvestableVaults.length || popup.data('is-harvesting') == true) {
                    return;
                }
                for (let i = 0; i < harvestableVaults.length; i++) {
                    harvestableVaults[i].include = true;
                }
                popup.trigger('resolveHarvestButton');
                popup.trigger('updateValues');
                popup.trigger('populateTable');
            });
            popup.off('updateTable');
            popup.bind('updateTable', function() {
                let tableItms = popup.find('.vault-list .itm:not(.template)')
                  , harvestableVaults = popup.data('harvestable-vaults')
                  , harvestingVaults = getHarvestingVaults()
                  , harvestedVaults = getHarvestedVaults();
                for (let i = 0; i < tableItms.length; i++) {
                    let itm = tableItms.eq(i)
                      , pid = itm.data('pid')
                      , data = harvestableVaults.filter(vault=>vault.pid === pid)[0];
                    if (typeof data !== 'undefined') {
                        itm.find('.content .pending').text(FrontendCommon.formatNumberHumanize(data.pendingAmount, 6) + ' QBERT');
                    }
                    itm.toggleClass('loading', harvestingVaults.includes(itm.data('pid')));
                    if (harvestedVaults.includes(itm.data('pid'))) {
                        itm.css('min-height', '0');
                        itm.css('height', '70px');
                        FrontendCommon.slideFadeUp(itm, 200, _=>{
                            itm.remove();
                        }
                        );
                        popup.trigger('updateValues');
                        popup.trigger('resolveHarvestButton');
                    }
                }
                ;
            });
            resetBtn.off('click');
            resetBtn.click(_=>{
                if (popup.data('is-harvesting') != true) {
                    popup.trigger('resetTable');
                }
            }
            );
            harvestBtn.off('click');
            harvestBtn.click(async function() {
                if (popup.data('is-harvesting') == true || $(this).hasClass('disabled')) {
                    return;
                }
                let harvestQueue = [];
                for (let i = 0; i < harvestableVaults.length; i++) {
                    if (harvestableVaults[i].include) {
                        harvestQueue.push(harvestableVaults[i]);
                        addHarvestingVault(harvestableVaults[i].pid);
                    }
                }
                popup.data('is-harvesting', true);
                popup.trigger('updateTable');
                popup.trigger('resolveHarvestButton');
                await Wallet.harvestAll(harvestQueue.map(q=>q.pid), (result,data)=>{
                    if (result) {
                        if (data.status === 'broadcasted') {} else if (data.status === 'tx_done') {
                            removeHarvestingVault(data.pid);
                            addHarvestedVaults(data.pid);
                        } else if (data.status === 'done') {
                            popup.data('is-harvesting', false);
                            FrontendWidgets.toggleTopNotification(true, 'Harvest all has completed.', 4000);
                            FrontendWidgets.closeOpenPopup();
                        }
                    } else {
                        if (data.status === 'canceled') {
                            popup.data('is-harvesting', false);
                            FrontendWidgets.toggleTopNotification(true, 'Transaction(s) canceled.', 4000);
                            FrontendWidgets.closeOpenPopup();
                        }
                    }
                    popup.trigger('updateTable');
                    popup.trigger('updateValues');
                    popup.trigger('resolveHarvestButton');
                }
                );
            });
            popup.data('popup-close-listener', _=>{
                for (let i = 0; i < harvestableVaults.length; i++) {
                    harvestableVaults[i].include = true;
                }
                FrontendCommon.setElementData(popup, 'harvestable-vaults', undefined);
            }
            );
            popup.trigger('resolveHarvestButton');
            popup.trigger('updateValues');
            popup.trigger('populateTable');
            popup.trigger('updateTable');
        },
    }
}
)();
FrontendCommon.initialize();
FrontendWidgets.initialize();
