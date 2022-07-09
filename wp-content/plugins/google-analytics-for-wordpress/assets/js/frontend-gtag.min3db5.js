var MonsterInsights = function () {
    var e = [],
      a = "",
      o = !1;
    this.setLastClicked = function (t, n, i) {
      t = typeof t !== "undefined" ? t : [];
      n = typeof n !== "undefined" ? n : [];
      i = typeof i !== "undefined" ? i : !1;
      e.valuesArray = t;
      e.fieldsArray = n;
    };
    this.getLastClicked = function () {
      return e;
    };
    this.setInternalAsOutboundCategory = function (e) {
      a = e;
    };
    this.getInternalAsOutboundCategory = function () {
      return a;
    };
    this.sendEvent = function (e, n, i) {
      t(e, n, i, []);
    };
    function u() {
      if (window.monsterinsights_debug_mode) {
        return !0;
      } else {
        return !1;
      }
    }
    function t(t, n, a, r) {
      t = typeof t !== "undefined" ? t : "event";
      n = typeof n !== "undefined" ? n : "";
      r = typeof r !== "undefined" ? r : [];
      a = typeof a !== "undefined" ? a : {};
      __gtagTracker(t, n, a);
      e.valuesArray = r;
      e.fieldsArray = a;
      e.fieldsArray.event_action = n;
      e.tracked = !0;
      i("Tracked: " + r.type);
      i(e);
    }
    function n(t) {
      t = typeof t !== "undefined" ? t : [];
      e.valuesArray = t;
      e.fieldsArray = [];
      e.tracked = !1;
      i("Not Tracked: " + t.exit);
      i(e);
    }
    function i(e) {
      if (u()) {
        console.dir(e);
      }
    }
    function l(e) {
      return e.replace(/^\s+|\s+$/gm, "");
    }
    function c() {
      var n = 0,
        e = document.domain,
        i = e.split("."),
        t = "_gd" + new Date().getTime();
      while (n < i.length - 1 && document.cookie.indexOf(t + "=" + t) == -1) {
        e = i.slice(-1 - ++n).join(".");
        document.cookie = t + "=" + t + ";domain=" + e + ";";
      }
      document.cookie =
        t + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + e + ";";
      return e;
    }
    function d(e) {
      e = e.toString();
      e = e.substring(0, e.indexOf("#") == -1 ? e.length : e.indexOf("#"));
      e = e.substring(0, e.indexOf("?") == -1 ? e.length : e.indexOf("?"));
      e = e.substring(e.lastIndexOf("index.html") + 1, e.length);
      if (e.length > 0 && e.indexOf(".") !== -1) {
        e = e.substring(e.indexOf(".") + 1);
        return e;
      } else {
        return "";
      }
    }
    function b(e) {
      return (
        e.which == 1 ||
        e.which == 2 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      );
    }
    function h() {
      var e = [];
      if (typeof monsterinsights_frontend.download_extensions == "string") {
        e = monsterinsights_frontend.download_extensions.split(",");
      }
      return e;
    }
    function g() {
      var e = [];
      if (typeof monsterinsights_frontend.inbound_paths == "string") {
        e = JSON.parse(monsterinsights_frontend.inbound_paths);
      }
      return e;
    }
    function y(e) {
      if (e.which == 1) {
        return "event.which=1";
      } else if (e.which == 2) {
        return "event.which=2";
      } else if (e.metaKey) {
        return "metaKey";
      } else if (e.ctrlKey) {
        return "ctrlKey";
      } else if (e.shiftKey) {
        return "shiftKey";
      } else if (e.altKey) {
        return "altKey";
      } else {
        return "";
      }
    }
    function w(e) {
      var f = h(),
        i = g(),
        t = "unknown",
        u = e.href,
        p = d(e.href),
        v = c(),
        o = e.hostname,
        r = e.protocol,
        m = e.pathname;
      u = u.toString();
      var s,
        b,
        y = e.getAttribute("data-vars-ga-category");
      if (y) {
        return y;
      }
      if (u.match(/^javascript\:/i)) {
        t = "internal";
      } else if (r && r.length > 0 && (l(r) == "tel" || l(r) == "tel:")) {
        t = "tel";
      } else if (r && r.length > 0 && (l(r) == "mailto" || l(r) == "mailto:")) {
        t = "mailto";
      } else if (
        o &&
        v &&
        o.length > 0 &&
        v.length > 0 &&
        !o.endsWith("." + v) &&
        o !== v
      ) {
        t = "external";
      } else if (m && JSON.stringify(i) != "{}" && m.length > 0) {
        var w = i.length;
        for (var n = 0; n < w; n++) {
          if (
            i[n].path &&
            i[n].label &&
            i[n].path.length > 0 &&
            i[n].label.length > 0 &&
            m.startsWith(i[n].path)
          ) {
            t = "internal-as-outbound";
            a = "outbound-link-" + i[n].label;
            break;
          }
        }
      } else if (
        o &&
        window.monsterinsights_experimental_mode &&
        o.length > 0 &&
        document.domain.length > 0 &&
        o !== document.domain
      ) {
        t = "cross-hostname";
      }
      if (
        p &&
        (t === "unknown" || "external" === t) &&
        f.length > 0 &&
        p.length > 0
      ) {
        for (s = 0, b = f.length; s < b; ++s) {
          if (f[s].length > 0 && (u.endsWith(f[s]) || f[s] == p)) {
            t = "download";
            break;
          }
        }
      }
      if (t === "unknown") {
        t = "internal";
      }
      return t;
    }
    function x(e, t) {
      var n =
        e.target && !e.target.match(/^_(self|parent|top)$/i) ? e.target : !1;
      if (t.ctrlKey || t.shiftKey || t.metaKey || t.which == 2) {
        n = "_blank";
      }
      return n;
    }
    function v(e) {
      if (
        e.getAttribute("data-vars-ga-label") &&
        e.getAttribute("data-vars-ga-label").replace(/\n/gi, "")
      ) {
        return e.getAttribute("data-vars-ga-label").replace(/\n/gi, "");
      } else if (e.title && e.title.replace(/\n/gi, "")) {
        return e.title.replace(/\n/gi, "");
      } else if (e.innerText && e.innerText.replace(/\n/gi, "")) {
        return e.innerText.replace(/\n/gi, "");
      } else if (
        e.getAttribute("aria-label") &&
        e.getAttribute("aria-label").replace(/\n/gi, "")
      ) {
        return e.getAttribute("aria-label").replace(/\n/gi, "");
      } else if (e.alt && e.alt.replace(/\n/gi, "")) {
        return e.alt.replace(/\n/gi, "");
      } else if (e.textContent && e.textContent.replace(/\n/gi, "")) {
        return e.textContent.replace(/\n/gi, "");
      } else {
        return undefined;
      }
    }
    function k(e) {
      var i = e.children,
        a = 0,
        r,
        n;
      for (var t = 0; t < i.length; t++) {
        r = i[t];
        n = v(r);
        if (n) {
          return n;
        }
        if (a == 99) {
          return undefined;
        }
        a++;
      }
      return undefined;
    }
    function p(i) {
      var l = i.srcElement || i.target,
        e = [],
        f;
      e.el = l;
      e.click_type = y(i);
      if ("undefined" === typeof __gtagTracker || !b(i)) {
        e.exit = "loaded";
        n(e);
        return;
      }
      while (
        l &&
        (typeof l.tagName == "undefined" ||
          l.tagName.toLowerCase() != "a" ||
          !l.href)
      ) {
        l = l.parentNode;
      }
      if (l && l.href && !l.hasAttribute("xlink:href")) {
        var A = l.href,
          I = d(l.href),
          M = h(),
          S = g(),
          L = monsterinsights_frontend.home_url,
          N = c(),
          r = w(l),
          K = x(l, i),
          T = l.getAttribute("data-vars-ga-action"),
          p = l.getAttribute("data-vars-ga-label");
        e.el = l;
        e.el_href = l.href;
        e.el_protocol = l.protocol;
        e.el_hostname = l.hostname;
        e.el_port = l.port;
        e.el_pathname = l.pathname;
        e.el_search = l.search;
        e.el_hash = l.hash;
        e.el_host = l.host;
        e.debug_mode = u();
        e.download_extensions = M;
        e.inbound_paths = S;
        e.home_url = L;
        e.link = A;
        e.extension = I;
        e.type = r;
        e.target = K;
        e.title = v(l);
        if (!e.label && !e.title) {
          e.title = k(l);
        }
        if (r !== "internal" && r !== "javascript") {
          var O = !1,
            m = function () {
              if (O) {
                return;
              }
              s();
              O = !0;
              window.location.href = A;
            },
            E = function () {
              e.exit = "external";
              n(e);
            },
            D = function () {
              e.exit = "internal-as-outbound";
              n(e);
            },
            C = function () {
              e.exit = "cross-hostname";
              n(e);
            };
          if (K || r == "mailto" || r == "tel") {
            if (r == "download") {
              f = { event_category: "download", event_label: p || e.title };
            } else if (r == "tel") {
              f = {
                event_category: "tel",
                event_label: p || e.title.replace("tel:", ""),
              };
            } else if (r == "mailto") {
              console.log(p || e.title.replace("mailto:", ""));
              f = {
                event_category: "mailto",
                event_label: p || e.title.replace("mailto:", ""),
              };
            } else if (r == "internal-as-outbound") {
              f = { event_category: a, event_label: p || e.title };
            } else if (r == "external") {
              f = {
                event_category: "outbound-link",
                event_label: p || e.title,
              };
            } else if (r == "cross-hostname") {
              f = {
                event_category: "cross-hostname",
                event_label: p || e.title,
              };
            }
            if (f) {
              t("event", T || A, f, e);
            } else {
              if (r && r != "internal") {
                f = { event_category: r, event_label: p || e.title };
                t("event", T || A, f, e);
              } else {
                e.exit = "type";
                n(e);
              }
            }
          } else {
            if (
              r != "cross-hostname" &&
              r != "external" &&
              r != "internal-as-outbound"
            ) {
              if (!i.defaultPrevented) {
                if (i.preventDefault) {
                  i.preventDefault();
                } else {
                  i.returnValue = !1;
                }
              }
            }
            if (r == "download") {
              f = {
                event_category: "download",
                event_label: p || e.title,
                event_callback: m,
              };
              t("event", T || A, f, e);
            } else if (r == "internal-as-outbound") {
              o = !0;
              window.onbeforeunload = function (n) {
                if (!i.defaultPrevented) {
                  if (i.preventDefault) {
                    i.preventDefault();
                  } else {
                    i.returnValue = !1;
                  }
                }
                f = {
                  event_category: a,
                  event_label: p || e.title,
                  event_callback: m,
                };
                if (navigator.sendBeacon) {
                  f.transport = "beacon";
                }
                t("event", T || A, f, e);
                setTimeout(m, 1000);
              };
            } else if (r == "external") {
              o = !0;
              window.onbeforeunload = function (n) {
                if (!i.defaultPrevented) {
                  if (i.preventDefault) {
                    i.preventDefault();
                  } else {
                    i.returnValue = !1;
                  }
                }
                f = {
                  event_category: "outbound-link",
                  event_label: p || e.title,
                  event_callback: m,
                };
                if (navigator.sendBeacon) {
                  f.transport = "beacon";
                }
                t("event", T || A, f, e);
                setTimeout(m, 1000);
              };
            } else if (r == "cross-hostname") {
              o = !0;
              window.onbeforeunload = function (n) {
                if (!i.defaultPrevented) {
                  if (i.preventDefault) {
                    i.preventDefault();
                  } else {
                    i.returnValue = !1;
                  }
                }
                f = {
                  event_category: "cross-hostname",
                  event_label: p || e.title,
                  event_callback: m,
                };
                if (navigator.sendBeacon) {
                  f.transport = "beacon";
                }
                t("event", T || A, f, e);
                setTimeout(m, 1000);
              };
            } else {
              if (r && r !== "internal") {
                f = {
                  event_category: r,
                  event_label: p || e.title,
                  event_callback: m,
                };
                t("event", T || A, f, e);
              } else {
                e.exit = "type";
                n(e);
              }
            }
            if (
              r != "external" &&
              r != "cross-hostname" &&
              r != "internal-as-outbound"
            ) {
              setTimeout(m, 1000);
            } else {
              if (r == "external") {
                setTimeout(E, 1100);
              } else if (r == "cross-hostname") {
                setTimeout(C, 1100);
              } else {
                setTimeout(D, 1100);
              }
            }
            setTimeout(s, 100);
          }
        } else {
          s();
          e.exit = "internal";
          n(e);
        }
      } else {
        e.exit = "notlink";
        n(e);
      }
    }
    var f = window.location.hash;
    function m() {
      if (
        monsterinsights_frontend.hash_tracking === "true" &&
        f != window.location.hash &&
        monsterinsights_frontend.ua
      ) {
        f = window.location.hash;
        __gtagTracker("config", monsterinsights_frontend.ua, {
          page_path: location.pathname + location.search + location.hash,
        });
        i(
          "Hash change to: " +
            location.pathname +
            location.search +
            location.hash
        );
      } else {
        i(
          "Hash change to (untracked): " +
            location.pathname +
            location.search +
            location.hash
        );
      }
    }
    function s() {
      if (o) {
        window.onbeforeunload = null;
      }
    }
    var r = window;
    if (r.addEventListener) {
      r.addEventListener(
        "load",
        function () {
          document.body.addEventListener("click", p, !1);
        },
        !1
      );
      window.addEventListener("hashchange", m, !1);
    } else {
      if (r.attachEvent) {
        r.attachEvent("onload", function () {
          document.body.attachEvent("onclick", p);
        });
        window.attachEvent("onhashchange", m);
      }
    }
    if (typeof String.prototype.endsWith !== "function") {
      String.prototype.endsWith = function (e) {
        return this.indexOf(e, this.length - e.length) !== -1;
      };
    }
    if (typeof String.prototype.startsWith !== "function") {
      String.prototype.startsWith = function (e) {
        return this.indexOf(e) === 0;
      };
    }
    if (typeof Array.prototype.lastIndexOf !== "function") {
      Array.prototype.lastIndexOf = function (e) {
        "use strict";
        if (this === void 0 || this === null) {
          throw new TypeError();
        }
        var t,
          n,
          a = Object(this),
          i = a.length >>> 0;
        if (i === 0) {
          return -1;
        }
        t = i - 1;
        if (arguments.length > 1) {
          t = Number(arguments[1]);
          if (t != t) {
            t = 0;
          } else if (t != 0 && t != 1 / 0 && t != -(1 / 0)) {
            t = (t > 0 || -1) * Math.floor(Math.abs(t));
          }
        }
        for (n = t >= 0 ? Math.min(t, i - 1) : i - Math.abs(t); n >= 0; n--) {
          if (n in a && a[n] === e) {
            return n;
          }
        }
        return -1;
      };
    }
  },
  MonsterInsightsObject = new MonsterInsights();
