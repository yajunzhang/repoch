/*
 * scheme url operation
 * author: Fuyu@lonefy
 * create time: 2018-05-24
 * 
 */
import Image from "../weibo-image";

export function scheme(url) {
    return "sinaweibo://browser?url=" + encodeURIComponent(url);
}

export function schemekk(url) {
    return "sinaweibo://kk?url=" + encodeURIComponent(url);
}

export function weiboShare(content, pics = []) {
    let picList = [].concat(pics).map(fid => {
        return {
            thumbnail: "https:" + Image(fid, "thumbnail"),
            original: "https:" + Image(fid, "large"),
            pid: fid
        };
    });
    window.location.href =
        "sinaweibo://sendweibo?content=" +
        encodeURIComponent(decodeURIComponent(content)) +
        (picList.length
            ? "&pics=" + encodeURIComponent(JSON.stringify(picList))
            : "");
}

export function navigationCloseAndOpen(url) {
    window.location.href =
        "sinaweibo://browser/close?scheme=" + encodeURIComponent(url);
}

export function historyBackAddUrl(curUrl = window.location.href, addUrl) {
    const { history } = window;
    if (history.pushState && history.length <= 1) {
        history.replaceState("curstate", null, curUrl);
        history.pushState({}, null, curUrl);
    }
    window.onpopstate = e => {
        if (e.state == "curstate") {
            window.location.replace(addUrl);
        }
    };
}