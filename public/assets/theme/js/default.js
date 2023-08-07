const btn = document.querySelector("#btn-toggle");
const theme = document.querySelector("#theme-link");

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var systheme = getCookie("systheme");
if (systheme == "light") {
    document.getElementById("btn-toggle").src = "assets/images/moon.png";
    theme.href = "assets/mobirise/css/mbr-additional-light.css?v=1";
} else {
    document.getElementById("btn-toggle").src = "assets/images/sun.svg";
    theme.href = "assets/mobirise/css/mbr-additional.css?v=1";
}

btn.addEventListener("click", function () {
    console.log("clicked");
    // Swap out the URL for the different stylesheets
    if (theme.getAttribute("href") == "assets/mobirise/css/mbr-additional.css?v=1") {
        document.getElementById("btn-toggle").src = "assets/images/moon.png";
        setCookie("systheme", "light", 365);
        theme.href = "assets/mobirise/css/mbr-additional-light.css?v=1";
    } else {
        document.getElementById("btn-toggle").src = "assets/images/sun.svg";
        setCookie("systheme", "dark", 365);
        theme.href = "assets/mobirise/css/mbr-additional.css?v=1";
    }
});


let el = $('#reg-form__btn');
el.click(function () {
    var currentAddress = $('#currentAddress').val();

    if (currentAddress == ""){
        notice('error', 'Please Connect Your Metamask');
    } else if ($('#referAdd').val() == "") {
        notice('error', 'Enter Referrer Address');
    } else if (isNaN($('#amount').val())) {
        notice('error', 'Enter Valid Amount');
    } else if ($('#amount').val() < 100) {
        notice('error', 'Minimum Registration amount is 100$');
    } else if ($('#email').val() == "") {
        notice('error', 'Please Enter Email Address');
    } else if ($('#pass').val() == "") {
        notice('error', 'Please Enter Password');
    } else {
        $.ajax({
            url: 'refercheck.php',
            type: 'POST',
            cache: false,
            async: true,
            data: {
                defaultaddress: currentAddress,
                address: $('#referAdd').val(),
                email: $('#email').val()
            },
            success: function (data) {
                var val = $.parseJSON(data);
                if (val.userstatus == 'success') {
                    if (val.status == 'success') {
                        let ethPrice = $("#ethPrice").val();
                        var regAmount = $('#amount').val() / ethPrice;
                        if (window.ethereum && window.web3) {
                            let data = {
                                regAmount: regAmount,
                                upline: $('#referAdd').val()
                            };
                            window.registrationUser(data, function (isError, params) {
                                if (!isError) {
                                    $.ajax({
                                        url: 'registration.php',
                                        type: 'POST',
                                        cache: false,
                                        async: true,
                                        data: {
                                            address: $('#currentAddress').val(),
                                            email: $('#email').val(),
                                            pass: $('#pass').val()
                                        }
                                    });

                                    setTimeout(function () {
                                        window.location.href = 'login';
                                    }, 2500);
                                }
                            });
                        } else {
                            notice('error', 'The Ethereum wallet is Not detected on your browser');
                        }
                    } else {
                        notice('error', val.responseText);
                    }
                }else{
                    notice('error', val.responseText);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                notice('error', jqXHR.responseText);
            }
        });

    }


});


$('.auth-sign__btn').click(function () {
    m = detectMetaMask();
    if (!m) {
        notice('error', "Please Install Metamask in Your Browser");
    }else if(ethereum.networkVersion != 56){
        notice('error', "Please Configure Your Metamask To BSC Network");
    }else {
        ethereum.request({method: 'eth_requestAccounts'}).then(handleAccountsChanged).catch((err) => {
            if (err.code === 4001) {
                notice('error', "You refused to connect Metamask");
            } else {
                console.log(err);
            }
        });
    }
});

function detectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        return true
    } else {
        return false
    }
}


function handleAccountsChanged(accounts) {
    console.log(window.ethereum.networkVersion, 'window.ethereum.networkVersion');
    if (accounts.length === 0) {
        notice('error', "Please connect to MetaMask.");
    } else {
        if (currentAccountFull == "" || currentAccountFull != accounts[0]) {
            currentAccountFull = accounts[0];
            $.ajax({
                url: 'session.php',
                type: 'POST',
                data: {
                    sign: currentAccountFull
                },
                success: function (data) {
                    var val = $.parseJSON(data); // create an object with the key of the array
                    if (val.status != 'success') {
                        notice('error','User Not Registered');
                        return;
                    }
                    if (val.status == 'success') {
                        notice('success', 'Login Successful. redirecting...');
                        window.location.href = 'buy';
                    } else {
                        notice('warning', val.message);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    notice('error', jqXHR.responseText);
                }
            });
        } else {
            notice('success', 'Account Connected');
        }
    }
}


function getAccounts(callback) {
    if (typeof web3 !== 'undefined') {
        web3.eth.getAccounts((error, result) => {
            if (error) {
            } else {
                callback(result);
            }
        });
    }
}

getAccounts(function (result) {
    if (typeof result[0] !== 'undefined') {
        web3.eth.getBalance(result[0], function (err, result) {
            if (err) {
            } else {
                $("#web3Balance").html(web3.fromWei(result, "ether").toFixed(4))
            }
        })
    }
});

function BuyAmount() {

    var amount =$("#BuyAmount").val();
    if (isNaN(amount)) {
        var amount = 0;
    } else {
        var amount = amount;
    }

    let ethPrice = $("#ethPrice").val();
    let unitPrice = $("#unitPrice").val();

    //convert amount to usd
    let usdamount = amount * ethPrice;
    let totaltoken = usdamount / unitPrice;


    $('#totalUNIT').val((totaltoken).toFixed(4));

}



function RegAmount() {

    var amount =$("#amount").val();
    if (isNaN(amount)) {
        var amount = 0;
    } else {
        var amount = amount;
    }

    let unitPrice = $("#unitPrice").val();

    //convert amount to usd
    let totaltoken = amount / unitPrice;

    $('#mntAmount').html((totaltoken).toFixed(2));

}



$("#RedeemAmount").on("change paste keyup", function () {
    if (isNaN($(this).val())) {
        var amount = 0;
    } else {
        var amount = $(this).val();
    }
    let totaltoken = amount / 500;


    $('#totalUNIT').val((totaltoken).toFixed(4));

});

$(".redeem-max-select-button").click(function () {
    var totalvalue = $("#pointBalance").html();
    $('#RedeemAmount').val(totalvalue);
});


$("#point-redeem-button").click(function () {
    if (isNaN($('#RedeemAmount').val())) {
        notice('error', 'Enter Valid Amount');
    } else if ($("#RedeemAmount").val() < 500) {
        notice('error', 'Minimum Redeem is 500 Points');
    } else {
        var amount = $("#RedeemAmount").val();
        $.ajax({
            url: 'point_ajax.php',
            type: 'POST',
            cache: false,
            async: true,
            data: {
                amount: amount
            },
            success: function (data) {
                var val = $.parseJSON(data); // create an object with the key of the array
                if (val.status == 'success') {
                    notice('success', 'MNT Token Successfully Redeemed');
                    window.location.reload();
                } else {
                    notice('warning', val.responseText);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                notice('error', jqXHR.responseText);
            }
        });
    }
});


function SellAmount() {
    if (isNaN($("#SellAmount").val())) {
        var amount = 0;
    } else {
        var amount = $("#SellAmount").val();
    }
    let unitPrice = $("#dynamicPrice").val();

    $('#totalUSD').val(amount * unitPrice);

}


$(".open-currency-select-usd").click(function () {
    var totalvalue = $("#SellAmount").val();
    let unitPrice = $("#dynamicPrice").val();
    ;
    $('#totalUSD').val(totalvalue * unitPrice);
});


function totalUNIT() {
    if (isNaN($("#totalUNIT").val())) {
        var amount = 0;
    } else {
        var amount = $("#totalUNIT").val();
    }

    let ethPrice = $("#ethPrice").val();
    let unitPrice = $("#unitPrice").val();

    //convert amount to usd
    let usdamount = amount / ethPrice;

    $('#BuyAmount').val((usdamount * unitPrice).toFixed(6));

}



function stackAmount() {
    if (isNaN($("#stackAmount").val())) {
        var amount = 0;
    } else {
        var amount = $("#stackAmount").val();
    }
    let unitPrice = $("#unitPrice").val();
    $('#stackUSD').val((amount * unitPrice).toFixed(2));

}

function stackUSD() {
    if (isNaN($("#stackUSD").val())) {
        var amount = 0;
    } else {
        var amount = $("#stackUSD").val();
    }

    let unitPrice = $("#unitPrice").val();

    $('#stackAmount').val(amount / unitPrice);

}


function totalUSD() {
    if (isNaN($("#totalUSD").val())) {
        var amount = 0;
    } else {
        var amount = $("#totalUSD").val();
    }

    let unitPrice = $("#dynamicPrice").val();

    $('#SellAmount').val(amount / unitPrice);

}


$(".open-currency-select-button").click(function () {
    var totalvalue = $("#web3Balance").html();
    $('#BuyAmount').val(totalvalue-0.0048);
    BuyAmount();
});

$(".withdraw-currency-select-button").click(function () {
    var totalvalue = $("#web13Balance").html();
    $('#withdraw_amount').val(totalvalue);
});


$(".open-currency-select-staking").click(function () {
    var wallet = $("#stackwallet").val();
    var totalvalue = "0.00";
    if(wallet===""){
        notice('warning', "Please Select Wallet");
    }else{
        if (wallet==="mnt"){
            totalvalue = $("#web2Balance").html();
        }else{
            totalvalue = $("#vestingBalance").html();
        }
    }

    $('#stackAmount').val(totalvalue);
    stackAmount();
});


let bl = $('#token-buy-button');
bl.click(function () {
    if (window.ethereum && window.web3) {
        let data = {
            buyAmount: $('#BuyAmount').val()
        };
        window.buyToken(data, function (isError, params) {
            if (!isError) {
                setTimeout(function () {
                    //document.location = '<?php echo SITEURL?>confirmation?t=' + params.tx;
                    window.location.href = 'login';
                }, 2500);
            }
        });
    } else {
        notice('error', 'The Ethereum wallet is Not detected on your browser');
    }
});


$(".stacking-button").click(function () {
    if (isNaN($('#stackAmount').val())) {
        notice('error', 'Enter Valid Amount');
    } else if ($("#stackperiod").val() < 6 || $("#stackperiod").val() >24 ) {
        notice('error', 'Please Select Valid Period for stacking');
    } else {
        var amount = $("#stackAmount").val();
        var period = $("#stackperiod").val();
        var wallet = $("#stackwallet").val();
        $.ajax({
            url: 'ajax.php',
            type: 'POST',
            cache: false,
            async: true,
            data: {
                stackAmount: amount,
                stackperiod: period,
                wallet: wallet
            },
            success: function (data) {
                var val = $.parseJSON(data); // create an object with the key of the array
                if (val.status == 'success') {
                    notice('success', 'MNT Token Stacking Successfully Submitted');
                    window.location.reload();
                } else {
                    notice('warning', val.responseText);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                notice('error', jqXHR.responseText);
            }
        });
    }
});


$(".change-pass-button").click(function () {
    var pass = $('#pass').val();
    var rpass = $('#rpass').val();
    if (pass != rpass) {
        notice('error', 'Password and Repeat password should be same');
    } else {
        $.ajax({
            url: 'passajax.php',
            type: 'POST',
            cache: false,
            async: true,
            data: {
                pass : pass
            },
            success: function (data) {
                var val = $.parseJSON(data); // create an object with the key of the array
                if (val.status == 'success') {
                    notice('success', 'Password Changed Successfully');
                    setTimeout(function () {
                        window.location.reload();
                    }, 2500);
                } else {
                    notice('warning', val.responseText);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                notice('error', jqXHR.responseText);
            }
        });
    }
});


$(".withdraw-button").click(function () {
    if (isNaN($('#withdraw_amount').val())) {
        notice('error', 'Enter Valid Amount');
    } else if ($('#withdraw_amount').val() < 100) {
        notice('error', 'Minimum token Withdraw is 100 MNT');
    } else {
        var amount = $("#withdraw_amount").val();
        $.ajax({
            url: 'babywithdraw_ajax.php',
            type: 'POST',
            cache: false,
            async: true,
            data: {
                withdrawAmount: amount
            },
            success: function (data) {
                var val = $.parseJSON(data); // create an object with the key of the array
                if (val.status != 'success') {
                    notice('error', 'Something Went Wrong!. try again leter.')
                    return;
                }
                if (val.status == 'success') {
                    notice('success', 'MNT Withdraw Request Submitted');
                    window.location.reload();
                } else {
                    notice('warning', val.message);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                notice('error', jqXHR.responseText);
            }
        });
    }
});

function withdraw_vesting(id){
    $.ajax({
        url: 'vesting_ajax.php',
        type: 'POST',
        cache: false,
        async: true,
        data: {
            id: id
        },
        success: function (data) {
            var val = $.parseJSON(data); // create an object with the key of the array
            if (val.status != 'success') {
                notice('warning', val.responseText);
                return;
            }
            if (val.status == 'success') {
                notice('success', 'MNT Sent to Main Wallet');
                window.location.reload();
            } else {
                notice('warning', val.responseText);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            notice('error', jqXHR.responseText);
        }
    });
}


$("#sell-button").click(function () {
    $("#sell-button").html('Processing...');
    $("#sell-button").attr("disabled", true);

    if (isNaN($('#SellAmount').val())) {
        notice('error', 'Enter Valid Amount');
        $("#sell-button").html('Sell Now');
        $("#sell-button").removeAttr("disabled");
    } else {
        var amount = $("#SellAmount").val();
        $.ajax({
            url: 's_ajax.php',
            type: 'POST',
            cache: false,
            async: true,
            data: {
                SellAmount: amount
            },
            success: function (data) {
                var val = $.parseJSON(data); // create an object with the key of the array
                if (val.status != 'success') {
                    notice('error', val.responseText);
                    $("#sell-button").html('Sell Now');
                    $("#sell-button").removeAttr("disabled");
                    return;
                }
                if (val.status == 'success') {
                    notice('success', 'MNT Sold');
                    window.location.reload();
                } else {
                    notice('warning', val.message);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                notice('error', jqXHR.responseText);
                $("#sell-button").html('Sell Now');
                $("#sell-button").removeAttr("disabled");
            }
        });
    }
});


function showBalance(value) {
    var e = $("#mntBalance");
    var x = $("#vesBalance");
    if (value === "mnt") {
        e.show();
        x.hide();
    } else {
        x.show();
        e.hide();
    }
}


function showpass() {
    var e = document.getElementById("showpasseye");
    var x = document.getElementById("pass");
    if (x.type === "password") {
        x.type = "text";
        e.innerHTML = "<i class='fa fa-eye-slash'></i>";
    } else {
        x.type = "password";
        e.innerHTML = "<i class='fa fa-eye'></i>";
    }
}


// Copy text
window.copyText = function (value) {
    var s = document.createElement('input');
    s.value = value;
    document.body.appendChild(s);

    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        s.contentEditable = true;
        s.readOnly = false;
        var range = document.createRange();
        range.selectNodeContents(s);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        s.setSelectionRange(0, 999999);
    }
    else {
        s.select();
    }
    try {
        document.execCommand('copy');
        notice('success', 'Copied TO Clipboard!');
    }
    catch (err) {
        notice('error', 'Copied error: ' + err.message);
    }
    s.remove();
};

