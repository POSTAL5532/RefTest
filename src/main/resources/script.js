regRefer();
regReferVisit();
showInfo();


function showInfo() {
    var cookieRefer = getCookie('refer');
    if (cookieRefer !== undefined) {
        console.log('REFER: ' + cookieRefer);

        var name = 'refer_' + window.location.origin + '/' + window.location.pathname;
        var visitCookie = getCookie(name);
        console.log('visit page ' + window.location.pathname + ' ' + visitCookie + ' times')
    }
}

function regRefer() {
    var referName = new URL(window.location.href).searchParams.get('referid');
    var nameCookie = null;

    if (referName != null && referName !== 'null') {
        nameCookie = getCookie('refer');
        if (nameCookie === undefined || nameCookie !== referName) {
            document.cookie = 'refer=' + referName;
        }
    }
}

function regReferVisit() {
    var cookieRefer = getCookie('refer');
    if (cookieRefer !== undefined) {
        regVisit();
        callToServer();
    }
}

function regVisit() {
    var name = 'refer_' + window.location.origin + '/' + window.location.pathname;
    var visitCookie = getCookie(name);

    if (visitCookie !== undefined) {
        document.cookie = name + '=' + (++visitCookie);
    }
    else {
        document.cookie = name + '=1';
    }
}

function callToServer() {
    var referId = getCookie('refer');
    var count = getCookie('refer_' + window.location.origin + '/' + window.location.pathname);

    var info = {
        refer : referId,
        visitPageUrl : window.location.pathname,
        count : count,
        uniqueVisit : count == 1
    };

    $.ajax({
        url: 'http://localhost:8080/api/reg',
        data: info,
        success: function (data) {
            console.log('OK');
        },
        error: function () {
            console.log('NE OK');
        }
    });
}

function getCookie(cookieName) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


function setLib() {
    var script = document.createElement('script');

    script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
    script.integrity = 'sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=';
    script.crossorigin = 'anonymous';
    document.getElementsByTagName('head')[0].appendChild(script);
}