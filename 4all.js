(function () {
    window.forall = {
        pluginPath: "",
        plugins: [
        {
                    name: "jQuery",
                    url: "http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js",
                    when: typeof jQuery == "undefined"
        },
        {
            name: "cache",
            url: "4cache.js"
        },
        {
            name: "ga",
            func: function () {
                (function (w, d, s, l, i) {
                    w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                    var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
                    j.async = true; j.src = '//www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
                })(window, document, 'script', 'dataLayer', 'GTM-T3ZFF2');
            },
            when: false
        }
        ],
        plugins2: [
        { name: "test", func: function () {
            forall.cache.set("test", "good");
            $("body").append(forall.cache.get("test"));
        }
        }
        ],

        init: function () {
            for (var i in this.plugins) {
                this.loadPlugin(this.plugins[i]);
            }
            window.onload = function () {
                if (window.forall.plugins2 && window.forall.plugins2.length > 0) {
                    for (var i in window.forall.plugins2) {
                        window.forall.loadPlugin(window.forall.plugins2[i]);
                    }
                }
            };
        },
        loadPlugin: function (plugin) {
            if (plugin.when === false) return;
            plugin.callback = plugin.callback || function () { };
            if (!plugin.name) return;
            if (this[plugin.name]) { plugin.callback(); return; }
            if (plugin.val) { this[plugin.name] = plugin.val; plugin.callback(); return; }
            if (plugin.func) { this[plugin.name] = true; plugin.func(); plugin.callback(); return; }
            if (!plugin.url) return;
            //plugin.url = plugin.url.replace(/\$(.*)/, this.config.plfolder + "$1");
            var ga = document.createElement('script');
            ga.type = 'text/javascript';
            ga.async = true;
            ga.src = plugin.url;
            document.getElementsByTagName("head")[0].appendChild(ga);
            var ieLoadBugFix = function (scriptElement, callback) {
                if (scriptElement.readyState == 'loaded' || scriptElement.readyState == 'complete') {
                    callback();
                } else {
                    setTimeout(function () { ieLoadBugFix(scriptElement, callback); }, 100);
                }
            }
            if (typeof ga.addEventListener !== "undefined")
                ga.onload = plugin.callback;
            else { ieLoadBugFix(ga, plugin.callback); }
        }
    };
    window.forall.init();
})();
