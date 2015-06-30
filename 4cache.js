(function () {
    window.forall.cache = {
        get: function (key) {
            try {
                if (window.localStorage) {
                    var cacheData = JSON.parse(localStorage.getItem(key));
                    if (cacheData && cacheData.val && cacheData.expires && cacheData.expires > new Date().getTime()) { return cacheData.val; }
                    else localStorage.removeItem(key);
                }
            } catch (ex) { return ""; }
            return "";
        },
        set: function (key, val, hour) {
            hour = hour || 0.5; //默认缓存30分钟
            try {
                if (window.localStorage) {
                    var cacheData = { key: key, val: val, expires: new Date().getTime() + hour * 3600000 };
                    localStorage.setItem(key, JSON.stringify(cacheData));
                }
            } catch (ex) { }
        }
    }
})();
