!(function (e, i) {
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery-bridget", ["jquery"], function (t) {
        return i(e, t);
      })
    : "object" == typeof module && module.exports
    ? (module.exports = i(e, require("jquery")))
    : (e.jQueryBridget = i(e, e.jQuery));
})(window, function (t, e) {
  "use strict";
  var i = Array.prototype.slice,
    n = t.console,
    d =
      void 0 === n
        ? function () {}
        : function (t) {
            n.error(t);
          };
  function s(h, s, c) {
    (c = c || e || t.jQuery) &&
      (s.prototype.option ||
        (s.prototype.option = function (t) {
          c.isPlainObject(t) && (this.options = c.extend(!0, this.options, t));
        }),
      (c.fn[h] = function (t) {
        return "string" == typeof t
          ? ((e = this),
            (o = t),
            (r = i.call(arguments, 1)),
            (l = "$()." + h + '("' + o + '")'),
            e.each(function (t, e) {
              var i = c.data(e, h);
              if (i) {
                var n = i[o];
                if (n && "_" != o.charAt(0)) {
                  var s = n.apply(i, r);
                  a = void 0 === a ? s : a;
                } else d(l + " is not a valid method");
              } else d(h + " not initialized. Cannot call methods, i.e. " + l);
            }),
            void 0 !== a ? a : e)
          : ((n = t),
            this.each(function (t, e) {
              var i = c.data(e, h);
              i
                ? (i.option(n), i._init())
                : ((i = new s(e, n)), c.data(e, h, i));
            }),
            this);
        var n, e, o, r, a, l;
      }),
      o(c));
  }
  function o(t) {
    !t || (t && t.bridget) || (t.bridget = s);
  }
  return o(e || t.jQuery), s;
}),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("ev-emitter/ev-emitter", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.EvEmitter = e());
  })("undefined" != typeof window ? window : this, function () {
    function t() {}
    var e = t.prototype;
    return (
      (e.on = function (t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            n = (i[t] = i[t] || []);
          return -1 == n.indexOf(e) && n.push(e), this;
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e);
          var i = (this._onceEvents = this._onceEvents || {});
          return ((i[t] = i[t] || {})[e] = !0), this;
        }
      }),
      (e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = i.indexOf(e);
          return -1 != n && i.splice(n, 1), this;
        }
      }),
      (e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          (i = i.slice(0)), (e = e || []);
          for (
            var n = this._onceEvents && this._onceEvents[t], s = 0;
            s < i.length;
            s++
          ) {
            var o = i[s];
            n && n[o] && (this.off(t, o), delete n[o]), o.apply(this, e);
          }
          return this;
        }
      }),
      (e.allOff = function () {
        delete this._events, delete this._onceEvents;
      }),
      t
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("get-size/get-size", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.getSize = e());
  })(window, function () {
    "use strict";
    function y(t) {
      var e = parseFloat(t);
      return -1 == t.indexOf("%") && !isNaN(e) && e;
    }
    var i =
        "undefined" == typeof console
          ? function () {}
          : function (t) {
              console.error(t);
            },
      b = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ],
      S = b.length;
    function E(t) {
      var e = getComputedStyle(t);
      return (
        e ||
          i(
            "Style returned " +
              e +
              ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"
          ),
        e
      );
    }
    var x,
      w = !1;
    return function n(t) {
      if (
        ((function () {
          if (!w) {
            w = !0;
            var t = document.createElement("div");
            (t.style.width = "200px"),
              (t.style.padding = "1px 2px 3px 4px"),
              (t.style.borderStyle = "solid"),
              (t.style.borderWidth = "1px 2px 3px 4px"),
              (t.style.boxSizing = "border-box");
            var e = document.body || document.documentElement;
            e.appendChild(t);
            var i = E(t);
            (x = 200 == Math.round(y(i.width))),
              (n.isBoxSizeOuter = x),
              e.removeChild(t);
          }
        })(),
        "string" == typeof t && (t = document.querySelector(t)),
        t && "object" == typeof t && t.nodeType)
      ) {
        var e = E(t);
        if ("none" == e.display)
          return (function () {
            for (
              var t = {
                  width: 0,
                  height: 0,
                  innerWidth: 0,
                  innerHeight: 0,
                  outerWidth: 0,
                  outerHeight: 0,
                },
                e = 0;
              e < S;
              e++
            )
              t[b[e]] = 0;
            return t;
          })();
        var i = {};
        (i.width = t.offsetWidth), (i.height = t.offsetHeight);
        for (
          var s = (i.isBorderBox = "border-box" == e.boxSizing), o = 0;
          o < S;
          o++
        ) {
          var r = b[o],
            a = e[r],
            l = parseFloat(a);
          i[r] = isNaN(l) ? 0 : l;
        }
        var h = i.paddingLeft + i.paddingRight,
          c = i.paddingTop + i.paddingBottom,
          d = i.marginLeft + i.marginRight,
          u = i.marginTop + i.marginBottom,
          f = i.borderLeftWidth + i.borderRightWidth,
          p = i.borderTopWidth + i.borderBottomWidth,
          g = s && x,
          m = y(e.width);
        !1 !== m && (i.width = m + (g ? 0 : h + f));
        var v = y(e.height);
        return (
          !1 !== v && (i.height = v + (g ? 0 : c + p)),
          (i.innerWidth = i.width - (h + f)),
          (i.innerHeight = i.height - (c + p)),
          (i.outerWidth = i.width + d),
          (i.outerHeight = i.height + u),
          i
        );
      }
    };
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("desandro-matches-selector/matches-selector", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.matchesSelector = e());
  })(window, function () {
    "use strict";
    var i = (function () {
      var t = window.Element.prototype;
      if (t.matches) return "matches";
      if (t.matchesSelector) return "matchesSelector";
      for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
        var n = e[i] + "MatchesSelector";
        if (t[n]) return n;
      }
    })();
    return function (t, e) {
      return t[i](e);
    };
  }),
  (function (e, i) {
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["desandro-matches-selector/matches-selector"],
          function (t) {
            return i(e, t);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = i(e, require("desandro-matches-selector")))
      : (e.fizzyUIUtils = i(e, e.matchesSelector));
  })(window, function (h, o) {
    var c = {
        extend: function (t, e) {
          for (var i in e) t[i] = e[i];
          return t;
        },
        modulo: function (t, e) {
          return ((t % e) + e) % e;
        },
      },
      e = Array.prototype.slice;
    (c.makeArray = function (t) {
      return Array.isArray(t)
        ? t
        : null == t
        ? []
        : "object" == typeof t && "number" == typeof t.length
        ? e.call(t)
        : [t];
    }),
      (c.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1);
      }),
      (c.getParent = function (t, e) {
        for (; t.parentNode && t != document.body; )
          if (((t = t.parentNode), o(t, e))) return t;
      }),
      (c.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t;
      }),
      (c.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (c.filterFindElements = function (t, n) {
        t = c.makeArray(t);
        var s = [];
        return (
          t.forEach(function (t) {
            if (t instanceof HTMLElement)
              if (n) {
                o(t, n) && s.push(t);
                for (var e = t.querySelectorAll(n), i = 0; i < e.length; i++)
                  s.push(e[i]);
              } else s.push(t);
          }),
          s
        );
      }),
      (c.debounceMethod = function (t, e, n) {
        n = n || 100;
        var s = t.prototype[e],
          o = e + "Timeout";
        t.prototype[e] = function () {
          var t = this[o];
          clearTimeout(t);
          var e = arguments,
            i = this;
          this[o] = setTimeout(function () {
            s.apply(i, e), delete i[o];
          }, n);
        };
      }),
      (c.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e
          ? setTimeout(t)
          : document.addEventListener("DOMContentLoaded", t);
      }),
      (c.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i;
          })
          .toLowerCase();
      });
    var d = h.console;
    return (
      (c.htmlInit = function (a, l) {
        c.docReady(function () {
          var t = c.toDashed(l),
            s = "data-" + t,
            e = document.querySelectorAll("[" + s + "]"),
            i = document.querySelectorAll(".js-" + t),
            n = c.makeArray(e).concat(c.makeArray(i)),
            o = s + "-options",
            r = h.jQuery;
          n.forEach(function (t) {
            var e,
              i = t.getAttribute(s) || t.getAttribute(o);
            try {
              e = i && JSON.parse(i);
            } catch (e) {
              return void (
                d &&
                d.error("Error parsing " + s + " on " + t.className + ": " + e)
              );
            }
            var n = new a(t, e);
            r && r.data(t, l, n);
          });
        });
      }),
      c
    );
  }),
  (function (e, i) {
    "function" == typeof define && define.amd
      ? define("flickity/js/cell", ["get-size/get-size"], function (t) {
          return i(e, t);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = i(e, require("get-size")))
      : ((e.Flickity = e.Flickity || {}), (e.Flickity.Cell = i(e, e.getSize)));
  })(window, function (t, e) {
    function i(t, e) {
      (this.element = t), (this.parent = e), this.create();
    }
    var n = i.prototype;
    return (
      (n.create = function () {
        (this.element.style.position = "absolute"),
          this.element.setAttribute("aria-hidden", "true"),
          (this.x = 0),
          (this.shift = 0);
      }),
      (n.destroy = function () {
        this.unselect(), (this.element.style.position = "");
        var t = this.parent.originSide;
        this.element.style[t] = "";
      }),
      (n.getSize = function () {
        this.size = e(this.element);
      }),
      (n.setPosition = function (t) {
        (this.x = t), this.updateTarget(), this.renderPosition(t);
      }),
      (n.updateTarget = n.setDefaultTarget =
        function () {
          var t =
            "left" == this.parent.originSide ? "marginLeft" : "marginRight";
          this.target =
            this.x + this.size[t] + this.size.width * this.parent.cellAlign;
        }),
      (n.renderPosition = function (t) {
        var e = this.parent.originSide;
        this.element.style[e] = this.parent.getPositionValue(t);
      }),
      (n.select = function () {
        this.element.classList.add("is-selected"),
          this.element.removeAttribute("aria-hidden");
      }),
      (n.unselect = function () {
        this.element.classList.remove("is-selected"),
          this.element.setAttribute("aria-hidden", "true");
      }),
      (n.wrapShift = function (t) {
        (this.shift = t),
          this.renderPosition(this.x + this.parent.slideableWidth * t);
      }),
      (n.remove = function () {
        this.element.parentNode.removeChild(this.element);
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("flickity/js/slide", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : ((t.Flickity = t.Flickity || {}), (t.Flickity.Slide = e()));
  })(window, function () {
    "use strict";
    function t(t) {
      (this.parent = t),
        (this.isOriginLeft = "left" == t.originSide),
        (this.cells = []),
        (this.outerWidth = 0),
        (this.height = 0);
    }
    var e = t.prototype;
    return (
      (e.addCell = function (t) {
        if (
          (this.cells.push(t),
          (this.outerWidth += t.size.outerWidth),
          (this.height = Math.max(t.size.outerHeight, this.height)),
          1 == this.cells.length)
        ) {
          this.x = t.x;
          var e = this.isOriginLeft ? "marginLeft" : "marginRight";
          this.firstMargin = t.size[e];
        }
      }),
      (e.updateTarget = function () {
        var t = this.isOriginLeft ? "marginRight" : "marginLeft",
          e = this.getLastCell(),
          i = e ? e.size[t] : 0,
          n = this.outerWidth - (this.firstMargin + i);
        this.target = this.x + this.firstMargin + n * this.parent.cellAlign;
      }),
      (e.getLastCell = function () {
        return this.cells[this.cells.length - 1];
      }),
      (e.select = function () {
        this.cells.forEach(function (t) {
          t.select();
        });
      }),
      (e.unselect = function () {
        this.cells.forEach(function (t) {
          t.unselect();
        });
      }),
      (e.getCellElements = function () {
        return this.cells.map(function (t) {
          return t.element;
        });
      }),
      t
    );
  }),
  (function (e, i) {
    "function" == typeof define && define.amd
      ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function (t) {
          return i(e, t);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = i(e, require("fizzy-ui-utils")))
      : ((e.Flickity = e.Flickity || {}),
        (e.Flickity.animatePrototype = i(e, e.fizzyUIUtils)));
  })(window, function (t, e) {
    return {
      startAnimation: function () {
        this.isAnimating ||
          ((this.isAnimating = !0), (this.restingFrames = 0), this.animate());
      },
      animate: function () {
        this.applyDragForce(), this.applySelectedAttraction();
        var t = this.x;
        if (
          (this.integratePhysics(),
          this.positionSlider(),
          this.settle(t),
          this.isAnimating)
        ) {
          var e = this;
          requestAnimationFrame(function () {
            e.animate();
          });
        }
      },
      positionSlider: function () {
        var t = this.x;
        this.options.wrapAround &&
          1 < this.cells.length &&
          ((t = e.modulo(t, this.slideableWidth)),
          (t -= this.slideableWidth),
          this.shiftWrapCells(t)),
          this.setTranslateX(t, this.isAnimating),
          this.dispatchScrollEvent();
      },
      setTranslateX: function (t, e) {
        (t += this.cursorPosition), (t = this.options.rightToLeft ? -t : t);
        var i = this.getPositionValue(t);
        this.slider.style.transform = e
          ? "translate3d(" + i + ",0,0)"
          : "translateX(" + i + ")";
      },
      dispatchScrollEvent: function () {
        var t = this.slides[0];
        if (t) {
          var e = -this.x - t.target,
            i = e / this.slidesWidth;
          this.dispatchEvent("scroll", null, [i, e]);
        }
      },
      positionSliderAtSelected: function () {
        this.cells.length &&
          ((this.x = -this.selectedSlide.target),
          (this.velocity = 0),
          this.positionSlider());
      },
      getPositionValue: function (t) {
        return this.options.percentPosition
          ? 0.01 * Math.round((t / this.size.innerWidth) * 1e4) + "%"
          : Math.round(t) + "px";
      },
      settle: function (t) {
        this.isPointerDown ||
          Math.round(100 * this.x) != Math.round(100 * t) ||
          this.restingFrames++,
          2 < this.restingFrames &&
            ((this.isAnimating = !1),
            delete this.isFreeScrolling,
            this.positionSlider(),
            this.dispatchEvent("settle", null, [this.selectedIndex]));
      },
      shiftWrapCells: function (t) {
        var e = this.cursorPosition + t;
        this._shiftCells(this.beforeShiftCells, e, -1);
        var i =
          this.size.innerWidth -
          (t + this.slideableWidth + this.cursorPosition);
        this._shiftCells(this.afterShiftCells, i, 1);
      },
      _shiftCells: function (t, e, i) {
        for (var n = 0; n < t.length; n++) {
          var s = t[n],
            o = 0 < e ? i : 0;
          s.wrapShift(o), (e -= s.size.outerWidth);
        }
      },
      _unshiftCells: function (t) {
        if (t && t.length) for (var e = 0; e < t.length; e++) t[e].wrapShift(0);
      },
      integratePhysics: function () {
        (this.x += this.velocity), (this.velocity *= this.getFrictionFactor());
      },
      applyForce: function (t) {
        this.velocity += t;
      },
      getFrictionFactor: function () {
        return (
          1 -
          this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
        );
      },
      getRestingPosition: function () {
        return this.x + this.velocity / (1 - this.getFrictionFactor());
      },
      applyDragForce: function () {
        if (this.isDraggable && this.isPointerDown) {
          var t = this.dragX - this.x - this.velocity;
          this.applyForce(t);
        }
      },
      applySelectedAttraction: function () {
        if (
          (!this.isDraggable || !this.isPointerDown) &&
          !this.isFreeScrolling &&
          this.slides.length
        ) {
          var t =
            (-1 * this.selectedSlide.target - this.x) *
            this.options.selectedAttraction;
          this.applyForce(t);
        }
      },
    };
  }),
  (function (r, a) {
    if ("function" == typeof define && define.amd)
      define("flickity/js/flickity", [
        "ev-emitter/ev-emitter",
        "get-size/get-size",
        "fizzy-ui-utils/utils",
        "./cell",
        "./slide",
        "./animate",
      ], function (t, e, i, n, s, o) {
        return a(r, t, e, i, n, s, o);
      });
    else if ("object" == typeof module && module.exports)
      module.exports = a(
        r,
        require("ev-emitter"),
        require("get-size"),
        require("fizzy-ui-utils"),
        require("./cell"),
        require("./slide"),
        require("./animate")
      );
    else {
      var t = r.Flickity;
      r.Flickity = a(
        r,
        r.EvEmitter,
        r.getSize,
        r.fizzyUIUtils,
        t.Cell,
        t.Slide,
        t.animatePrototype
      );
    }
  })(window, function (n, t, e, a, i, r, s) {
    var l = n.jQuery,
      o = n.getComputedStyle,
      h = n.console;
    function c(t, e) {
      for (t = a.makeArray(t); t.length; ) e.appendChild(t.shift());
    }
    var d = 0,
      u = {};
    function f(t, e) {
      var i = a.getQueryElement(t);
      if (i) {
        if (((this.element = i), this.element.flickityGUID)) {
          var n = u[this.element.flickityGUID];
          return n.option(e), n;
        }
        l && (this.$element = l(this.element)),
          (this.options = a.extend({}, this.constructor.defaults)),
          this.option(e),
          this._create();
      } else h && h.error("Bad element for Flickity: " + (i || t));
    }
    (f.defaults = {
      accessibility: !0,
      cellAlign: "center",
      freeScrollFriction: 0.075,
      friction: 0.28,
      namespaceJQueryEvents: !0,
      percentPosition: !0,
      resize: !0,
      selectedAttraction: 0.025,
      setGallerySize: !0,
    }),
      (f.createMethods = []);
    var p = f.prototype;
    a.extend(p, t.prototype),
      (p._create = function () {
        var t = (this.guid = ++d);
        for (var e in ((this.element.flickityGUID = t),
        ((u[t] = this).selectedIndex = 0),
        (this.restingFrames = 0),
        (this.x = 0),
        (this.velocity = 0),
        (this.originSide = this.options.rightToLeft ? "right" : "left"),
        (this.viewport = document.createElement("div")),
        (this.viewport.className = "flickity-viewport"),
        this._createSlider(),
        (this.options.resize || this.options.watchCSS) &&
          n.addEventListener("resize", this),
        this.options.on)) {
          var i = this.options.on[e];
          this.on(e, i);
        }
        f.createMethods.forEach(function (t) {
          this[t]();
        }, this),
          this.options.watchCSS ? this.watchCSS() : this.activate();
      }),
      (p.option = function (t) {
        a.extend(this.options, t);
      }),
      (p.activate = function () {
        this.isActive ||
          ((this.isActive = !0),
          this.element.classList.add("flickity-enabled"),
          this.options.rightToLeft &&
            this.element.classList.add("flickity-rtl"),
          this.getSize(),
          c(this._filterFindCellElements(this.element.children), this.slider),
          this.viewport.appendChild(this.slider),
          this.element.appendChild(this.viewport),
          this.reloadCells(),
          this.options.accessibility &&
            ((this.element.tabIndex = 0),
            this.element.addEventListener("keydown", this)),
          this.emitEvent("activate"),
          this.selectInitialIndex(),
          (this.isInitActivated = !0),
          this.dispatchEvent("ready"));
      }),
      (p._createSlider = function () {
        var t = document.createElement("div");
        (t.className = "flickity-slider"),
          (t.style[this.originSide] = 0),
          (this.slider = t);
      }),
      (p._filterFindCellElements = function (t) {
        return a.filterFindElements(t, this.options.cellSelector);
      }),
      (p.reloadCells = function () {
        (this.cells = this._makeCells(this.slider.children)),
          this.positionCells(),
          this._getWrapShiftCells(),
          this.setGallerySize();
      }),
      (p._makeCells = function (t) {
        return this._filterFindCellElements(t).map(function (t) {
          return new i(t, this);
        }, this);
      }),
      (p.getLastCell = function () {
        return this.cells[this.cells.length - 1];
      }),
      (p.getLastSlide = function () {
        return this.slides[this.slides.length - 1];
      }),
      (p.positionCells = function () {
        this._sizeCells(this.cells), this._positionCells(0);
      }),
      (p._positionCells = function (t) {
        (t = t || 0), (this.maxCellHeight = (t && this.maxCellHeight) || 0);
        var e = 0;
        if (0 < t) {
          var i = this.cells[t - 1];
          e = i.x + i.size.outerWidth;
        }
        for (var n = this.cells.length, s = t; s < n; s++) {
          var o = this.cells[s];
          o.setPosition(e),
            (e += o.size.outerWidth),
            (this.maxCellHeight = Math.max(
              o.size.outerHeight,
              this.maxCellHeight
            ));
        }
        (this.slideableWidth = e),
          this.updateSlides(),
          this._containSlides(),
          (this.slidesWidth = n
            ? this.getLastSlide().target - this.slides[0].target
            : 0);
      }),
      (p._sizeCells = function (t) {
        t.forEach(function (t) {
          t.getSize();
        });
      }),
      (p.updateSlides = function () {
        if (((this.slides = []), this.cells.length)) {
          var n = new r(this);
          this.slides.push(n);
          var s = "left" == this.originSide ? "marginRight" : "marginLeft",
            o = this._getCanCellFit();
          this.cells.forEach(function (t, e) {
            if (n.cells.length) {
              var i =
                n.outerWidth - n.firstMargin + (t.size.outerWidth - t.size[s]);
              o.call(this, e, i) ||
                (n.updateTarget(), (n = new r(this)), this.slides.push(n)),
                n.addCell(t);
            } else n.addCell(t);
          }, this),
            n.updateTarget(),
            this.updateSelectedSlide();
        }
      }),
      (p._getCanCellFit = function () {
        var t = this.options.groupCells;
        if (!t)
          return function () {
            return !1;
          };
        if ("number" == typeof t) {
          var e = parseInt(t, 10);
          return function (t) {
            return t % e != 0;
          };
        }
        var i = "string" == typeof t && t.match(/^(\d+)%$/),
          n = i ? parseInt(i[1], 10) / 100 : 1;
        return function (t, e) {
          return e <= (this.size.innerWidth + 1) * n;
        };
      }),
      (p._init = p.reposition =
        function () {
          this.positionCells(), this.positionSliderAtSelected();
        }),
      (p.getSize = function () {
        (this.size = e(this.element)),
          this.setCellAlign(),
          (this.cursorPosition = this.size.innerWidth * this.cellAlign);
      });
    var g = {
      center: { left: 0.5, right: 0.5 },
      left: { left: 0, right: 1 },
      right: { right: 0, left: 1 },
    };
    return (
      (p.setCellAlign = function () {
        var t = g[this.options.cellAlign];
        this.cellAlign = t ? t[this.originSide] : this.options.cellAlign;
      }),
      (p.setGallerySize = function () {
        if (this.options.setGallerySize) {
          var t =
            this.options.adaptiveHeight && this.selectedSlide
              ? this.selectedSlide.height
              : this.maxCellHeight;
          this.viewport.style.height = t + "px";
        }
      }),
      (p._getWrapShiftCells = function () {
        if (this.options.wrapAround) {
          this._unshiftCells(this.beforeShiftCells),
            this._unshiftCells(this.afterShiftCells);
          var t = this.cursorPosition,
            e = this.cells.length - 1;
          (this.beforeShiftCells = this._getGapCells(t, e, -1)),
            (t = this.size.innerWidth - this.cursorPosition),
            (this.afterShiftCells = this._getGapCells(t, 0, 1));
        }
      }),
      (p._getGapCells = function (t, e, i) {
        for (var n = []; 0 < t; ) {
          var s = this.cells[e];
          if (!s) break;
          n.push(s), (e += i), (t -= s.size.outerWidth);
        }
        return n;
      }),
      (p._containSlides = function () {
        if (
          this.options.contain &&
          !this.options.wrapAround &&
          this.cells.length
        ) {
          var t = this.options.rightToLeft,
            e = t ? "marginRight" : "marginLeft",
            i = t ? "marginLeft" : "marginRight",
            n = this.slideableWidth - this.getLastCell().size[i],
            s = n < this.size.innerWidth,
            o = this.cursorPosition + this.cells[0].size[e],
            r = n - this.size.innerWidth * (1 - this.cellAlign);
          this.slides.forEach(function (t) {
            s
              ? (t.target = n * this.cellAlign)
              : ((t.target = Math.max(t.target, o)),
                (t.target = Math.min(t.target, r)));
          }, this);
        }
      }),
      (p.dispatchEvent = function (t, e, i) {
        var n = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, n), l && this.$element)) {
          var s = (t += this.options.namespaceJQueryEvents ? ".flickity" : "");
          if (e) {
            var o = l.Event(e);
            (o.type = t), (s = o);
          }
          this.$element.trigger(s, i);
        }
      }),
      (p.select = function (t, e, i) {
        if (
          this.isActive &&
          ((t = parseInt(t, 10)),
          this._wrapSelect(t),
          (this.options.wrapAround || e) &&
            (t = a.modulo(t, this.slides.length)),
          this.slides[t])
        ) {
          var n = this.selectedIndex;
          (this.selectedIndex = t),
            this.updateSelectedSlide(),
            i ? this.positionSliderAtSelected() : this.startAnimation(),
            this.options.adaptiveHeight && this.setGallerySize(),
            this.dispatchEvent("select", null, [t]),
            t != n && this.dispatchEvent("change", null, [t]),
            this.dispatchEvent("cellSelect");
        }
      }),
      (p._wrapSelect = function (t) {
        var e = this.slides.length;
        if (!(this.options.wrapAround && 1 < e)) return t;
        var i = a.modulo(t, e),
          n = Math.abs(i - this.selectedIndex),
          s = Math.abs(i + e - this.selectedIndex),
          o = Math.abs(i - e - this.selectedIndex);
        !this.isDragSelect && s < n
          ? (t += e)
          : !this.isDragSelect && o < n && (t -= e),
          t < 0
            ? (this.x -= this.slideableWidth)
            : e <= t && (this.x += this.slideableWidth);
      }),
      (p.previous = function (t, e) {
        this.select(this.selectedIndex - 1, t, e);
      }),
      (p.next = function (t, e) {
        this.select(this.selectedIndex + 1, t, e);
      }),
      (p.updateSelectedSlide = function () {
        var t = this.slides[this.selectedIndex];
        t &&
          (this.unselectSelectedSlide(),
          (this.selectedSlide = t).select(),
          (this.selectedCells = t.cells),
          (this.selectedElements = t.getCellElements()),
          (this.selectedCell = t.cells[0]),
          (this.selectedElement = this.selectedElements[0]));
      }),
      (p.unselectSelectedSlide = function () {
        this.selectedSlide && this.selectedSlide.unselect();
      }),
      (p.selectInitialIndex = function () {
        var t = this.options.initialIndex;
        if (this.isInitActivated) this.select(this.selectedIndex, !1, !0);
        else {
          if (t && "string" == typeof t && this.queryCell(t))
            return void this.selectCell(t, !1, !0);
          var e = 0;
          t && this.slides[t] && (e = t), this.select(e, !1, !0);
        }
      }),
      (p.selectCell = function (t, e, i) {
        var n = this.queryCell(t);
        if (n) {
          var s = this.getCellSlideIndex(n);
          this.select(s, e, i);
        }
      }),
      (p.getCellSlideIndex = function (t) {
        for (var e = 0; e < this.slides.length; e++)
          if (-1 != this.slides[e].cells.indexOf(t)) return e;
      }),
      (p.getCell = function (t) {
        for (var e = 0; e < this.cells.length; e++) {
          var i = this.cells[e];
          if (i.element == t) return i;
        }
      }),
      (p.getCells = function (t) {
        t = a.makeArray(t);
        var i = [];
        return (
          t.forEach(function (t) {
            var e = this.getCell(t);
            e && i.push(e);
          }, this),
          i
        );
      }),
      (p.getCellElements = function () {
        return this.cells.map(function (t) {
          return t.element;
        });
      }),
      (p.getParentCell = function (t) {
        return (
          this.getCell(t) ||
          ((t = a.getParent(t, ".flickity-slider > *")), this.getCell(t))
        );
      }),
      (p.getAdjacentCellElements = function (t, e) {
        if (!t) return this.selectedSlide.getCellElements();
        e = void 0 === e ? this.selectedIndex : e;
        var i = this.slides.length;
        if (i <= 1 + 2 * t) return this.getCellElements();
        for (var n = [], s = e - t; s <= e + t; s++) {
          var o = this.options.wrapAround ? a.modulo(s, i) : s,
            r = this.slides[o];
          r && (n = n.concat(r.getCellElements()));
        }
        return n;
      }),
      (p.queryCell = function (t) {
        if ("number" == typeof t) return this.cells[t];
        if ("string" == typeof t) {
          if (t.match(/^[#\.]?[\d\/]/)) return;
          t = this.element.querySelector(t);
        }
        return this.getCell(t);
      }),
      (p.uiChange = function () {
        this.emitEvent("uiChange");
      }),
      (p.childUIPointerDown = function (t) {
        "touchstart" != t.type && t.preventDefault(), this.focus();
      }),
      (p.onresize = function () {
        this.watchCSS(), this.resize();
      }),
      a.debounceMethod(f, "onresize", 150),
      (p.resize = function () {
        if (this.isActive) {
          this.getSize(),
            this.options.wrapAround &&
              (this.x = a.modulo(this.x, this.slideableWidth)),
            this.positionCells(),
            this._getWrapShiftCells(),
            this.setGallerySize(),
            this.emitEvent("resize");
          var t = this.selectedElements && this.selectedElements[0];
          this.selectCell(t, !1, !0);
        }
      }),
      (p.watchCSS = function () {
        this.options.watchCSS &&
          (-1 != o(this.element, ":after").content.indexOf("flickity")
            ? this.activate()
            : this.deactivate());
      }),
      (p.onkeydown = function (t) {
        var e =
          document.activeElement && document.activeElement != this.element;
        if (this.options.accessibility && !e) {
          var i = f.keyboardHandlers[t.keyCode];
          i && i.call(this);
        }
      }),
      (f.keyboardHandlers = {
        37: function () {
          var t = this.options.rightToLeft ? "next" : "previous";
          this.uiChange(), this[t]();
        },
        39: function () {
          var t = this.options.rightToLeft ? "previous" : "next";
          this.uiChange(), this[t]();
        },
      }),
      (p.focus = function () {
        var t = n.pageYOffset;
        this.element.focus({ preventScroll: !0 }),
          n.pageYOffset != t && n.scrollTo(n.pageXOffset, t);
      }),
      (p.deactivate = function () {
        this.isActive &&
          (this.element.classList.remove("flickity-enabled"),
          this.element.classList.remove("flickity-rtl"),
          this.unselectSelectedSlide(),
          this.cells.forEach(function (t) {
            t.destroy();
          }),
          this.element.removeChild(this.viewport),
          c(this.slider.children, this.element),
          this.options.accessibility &&
            (this.element.removeAttribute("tabIndex"),
            this.element.removeEventListener("keydown", this)),
          (this.isActive = !1),
          this.emitEvent("deactivate"));
      }),
      (p.destroy = function () {
        this.deactivate(),
          n.removeEventListener("resize", this),
          this.allOff(),
          this.emitEvent("destroy"),
          l && this.$element && l.removeData(this.element, "flickity"),
          delete this.element.flickityGUID,
          delete u[this.guid];
      }),
      a.extend(p, s),
      (f.data = function (t) {
        var e = (t = a.getQueryElement(t)) && t.flickityGUID;
        return e && u[e];
      }),
      a.htmlInit(f, "flickity"),
      l && l.bridget && l.bridget("flickity", f),
      (f.setJQuery = function (t) {
        l = t;
      }),
      (f.Cell = i),
      (f.Slide = r),
      f
    );
  }),
  (function (e, i) {
    "function" == typeof define && define.amd
      ? define(
          "unipointer/unipointer",
          ["ev-emitter/ev-emitter"],
          function (t) {
            return i(e, t);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = i(e, require("ev-emitter")))
      : (e.Unipointer = i(e, e.EvEmitter));
  })(window, function (s, t) {
    function e() {}
    var i = (e.prototype = Object.create(t.prototype));
    (i.bindStartEvent = function (t) {
      this._bindStartEvent(t, !0);
    }),
      (i.unbindStartEvent = function (t) {
        this._bindStartEvent(t, !1);
      }),
      (i._bindStartEvent = function (t, e) {
        var i = (e = void 0 === e || e)
            ? "addEventListener"
            : "removeEventListener",
          n = "mousedown";
        s.PointerEvent
          ? (n = "pointerdown")
          : "ontouchstart" in s && (n = "touchstart"),
          t[i](n, this);
      }),
      (i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (i.getTouch = function (t) {
        for (var e = 0; e < t.length; e++) {
          var i = t[e];
          if (i.identifier == this.pointerIdentifier) return i;
        }
      }),
      (i.onmousedown = function (t) {
        var e = t.button;
        (e && 0 !== e && 1 !== e) || this._pointerDown(t, t);
      }),
      (i.ontouchstart = function (t) {
        this._pointerDown(t, t.changedTouches[0]);
      }),
      (i.onpointerdown = function (t) {
        this._pointerDown(t, t);
      }),
      (i._pointerDown = function (t, e) {
        t.button ||
          this.isPointerDown ||
          ((this.isPointerDown = !0),
          (this.pointerIdentifier =
            void 0 !== e.pointerId ? e.pointerId : e.identifier),
          this.pointerDown(t, e));
      }),
      (i.pointerDown = function (t, e) {
        this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e]);
      });
    var n = {
      mousedown: ["mousemove", "mouseup"],
      touchstart: ["touchmove", "touchend", "touchcancel"],
      pointerdown: ["pointermove", "pointerup", "pointercancel"],
    };
    return (
      (i._bindPostStartEvents = function (t) {
        if (t) {
          var e = n[t.type];
          e.forEach(function (t) {
            s.addEventListener(t, this);
          }, this),
            (this._boundPointerEvents = e);
        }
      }),
      (i._unbindPostStartEvents = function () {
        this._boundPointerEvents &&
          (this._boundPointerEvents.forEach(function (t) {
            s.removeEventListener(t, this);
          }, this),
          delete this._boundPointerEvents);
      }),
      (i.onmousemove = function (t) {
        this._pointerMove(t, t);
      }),
      (i.onpointermove = function (t) {
        t.pointerId == this.pointerIdentifier && this._pointerMove(t, t);
      }),
      (i.ontouchmove = function (t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerMove(t, e);
      }),
      (i._pointerMove = function (t, e) {
        this.pointerMove(t, e);
      }),
      (i.pointerMove = function (t, e) {
        this.emitEvent("pointerMove", [t, e]);
      }),
      (i.onmouseup = function (t) {
        this._pointerUp(t, t);
      }),
      (i.onpointerup = function (t) {
        t.pointerId == this.pointerIdentifier && this._pointerUp(t, t);
      }),
      (i.ontouchend = function (t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerUp(t, e);
      }),
      (i._pointerUp = function (t, e) {
        this._pointerDone(), this.pointerUp(t, e);
      }),
      (i.pointerUp = function (t, e) {
        this.emitEvent("pointerUp", [t, e]);
      }),
      (i._pointerDone = function () {
        this._pointerReset(), this._unbindPostStartEvents(), this.pointerDone();
      }),
      (i._pointerReset = function () {
        (this.isPointerDown = !1), delete this.pointerIdentifier;
      }),
      (i.pointerDone = function () {}),
      (i.onpointercancel = function (t) {
        t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t);
      }),
      (i.ontouchcancel = function (t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerCancel(t, e);
      }),
      (i._pointerCancel = function (t, e) {
        this._pointerDone(), this.pointerCancel(t, e);
      }),
      (i.pointerCancel = function (t, e) {
        this.emitEvent("pointerCancel", [t, e]);
      }),
      (e.getPointerPoint = function (t) {
        return { x: t.pageX, y: t.pageY };
      }),
      e
    );
  }),
  (function (e, i) {
    "function" == typeof define && define.amd
      ? define(
          "unidragger/unidragger",
          ["unipointer/unipointer"],
          function (t) {
            return i(e, t);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = i(e, require("unipointer")))
      : (e.Unidragger = i(e, e.Unipointer));
  })(window, function (o, t) {
    function e() {}
    var i = (e.prototype = Object.create(t.prototype));
    (i.bindHandles = function () {
      this._bindHandles(!0);
    }),
      (i.unbindHandles = function () {
        this._bindHandles(!1);
      }),
      (i._bindHandles = function (t) {
        for (
          var e = (t = void 0 === t || t)
              ? "addEventListener"
              : "removeEventListener",
            i = t ? this._touchActionValue : "",
            n = 0;
          n < this.handles.length;
          n++
        ) {
          var s = this.handles[n];
          this._bindStartEvent(s, t),
            s[e]("click", this),
            o.PointerEvent && (s.style.touchAction = i);
        }
      }),
      (i._touchActionValue = "none"),
      (i.pointerDown = function (t, e) {
        this.okayPointerDown(t) &&
          ((this.pointerDownPointer = e),
          t.preventDefault(),
          this.pointerDownBlur(),
          this._bindPostStartEvents(t),
          this.emitEvent("pointerDown", [t, e]));
      });
    var s = { TEXTAREA: !0, INPUT: !0, SELECT: !0, OPTION: !0 },
      r = {
        radio: !0,
        checkbox: !0,
        button: !0,
        submit: !0,
        image: !0,
        file: !0,
      };
    return (
      (i.okayPointerDown = function (t) {
        var e = s[t.target.nodeName],
          i = r[t.target.type],
          n = !e || i;
        return n || this._pointerReset(), n;
      }),
      (i.pointerDownBlur = function () {
        var t = document.activeElement;
        t && t.blur && t != document.body && t.blur();
      }),
      (i.pointerMove = function (t, e) {
        var i = this._dragPointerMove(t, e);
        this.emitEvent("pointerMove", [t, e, i]), this._dragMove(t, e, i);
      }),
      (i._dragPointerMove = function (t, e) {
        var i = {
          x: e.pageX - this.pointerDownPointer.pageX,
          y: e.pageY - this.pointerDownPointer.pageY,
        };
        return (
          !this.isDragging && this.hasDragStarted(i) && this._dragStart(t, e), i
        );
      }),
      (i.hasDragStarted = function (t) {
        return 3 < Math.abs(t.x) || 3 < Math.abs(t.y);
      }),
      (i.pointerUp = function (t, e) {
        this.emitEvent("pointerUp", [t, e]), this._dragPointerUp(t, e);
      }),
      (i._dragPointerUp = function (t, e) {
        this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e);
      }),
      (i._dragStart = function (t, e) {
        (this.isDragging = !0),
          (this.isPreventingClicks = !0),
          this.dragStart(t, e);
      }),
      (i.dragStart = function (t, e) {
        this.emitEvent("dragStart", [t, e]);
      }),
      (i._dragMove = function (t, e, i) {
        this.isDragging && this.dragMove(t, e, i);
      }),
      (i.dragMove = function (t, e, i) {
        t.preventDefault(), this.emitEvent("dragMove", [t, e, i]);
      }),
      (i._dragEnd = function (t, e) {
        (this.isDragging = !1),
          setTimeout(
            function () {
              delete this.isPreventingClicks;
            }.bind(this)
          ),
          this.dragEnd(t, e);
      }),
      (i.dragEnd = function (t, e) {
        this.emitEvent("dragEnd", [t, e]);
      }),
      (i.onclick = function (t) {
        this.isPreventingClicks && t.preventDefault();
      }),
      (i._staticClick = function (t, e) {
        (this.isIgnoringMouseUp && "mouseup" == t.type) ||
          (this.staticClick(t, e),
          "mouseup" != t.type &&
            ((this.isIgnoringMouseUp = !0),
            setTimeout(
              function () {
                delete this.isIgnoringMouseUp;
              }.bind(this),
              400
            )));
      }),
      (i.staticClick = function (t, e) {
        this.emitEvent("staticClick", [t, e]);
      }),
      (e.getPointerPoint = t.getPointerPoint),
      e
    );
  }),
  (function (n, s) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/drag",
          ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"],
          function (t, e, i) {
            return s(n, t, e, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = s(
          n,
          require("./flickity"),
          require("unidragger"),
          require("fizzy-ui-utils")
        ))
      : (n.Flickity = s(n, n.Flickity, n.Unidragger, n.fizzyUIUtils));
  })(window, function (i, t, e, a) {
    a.extend(t.defaults, { draggable: ">1", dragThreshold: 3 }),
      t.createMethods.push("_createDrag");
    var n = t.prototype;
    a.extend(n, e.prototype), (n._touchActionValue = "pan-y");
    var s = "createTouch" in document,
      o = !1;
    (n._createDrag = function () {
      this.on("activate", this.onActivateDrag),
        this.on("uiChange", this._uiChangeDrag),
        this.on("deactivate", this.onDeactivateDrag),
        this.on("cellChange", this.updateDraggable),
        s && !o && (i.addEventListener("touchmove", function () {}), (o = !0));
    }),
      (n.onActivateDrag = function () {
        (this.handles = [this.viewport]),
          this.bindHandles(),
          this.updateDraggable();
      }),
      (n.onDeactivateDrag = function () {
        this.unbindHandles(), this.element.classList.remove("is-draggable");
      }),
      (n.updateDraggable = function () {
        ">1" == this.options.draggable
          ? (this.isDraggable = 1 < this.slides.length)
          : (this.isDraggable = this.options.draggable),
          this.isDraggable
            ? this.element.classList.add("is-draggable")
            : this.element.classList.remove("is-draggable");
      }),
      (n.bindDrag = function () {
        (this.options.draggable = !0), this.updateDraggable();
      }),
      (n.unbindDrag = function () {
        (this.options.draggable = !1), this.updateDraggable();
      }),
      (n._uiChangeDrag = function () {
        delete this.isFreeScrolling;
      }),
      (n.pointerDown = function (t, e) {
        this.isDraggable
          ? this.okayPointerDown(t) &&
            (this._pointerDownPreventDefault(t),
            this.pointerDownFocus(t),
            document.activeElement != this.element && this.pointerDownBlur(),
            (this.dragX = this.x),
            this.viewport.classList.add("is-pointer-down"),
            (this.pointerDownScroll = l()),
            i.addEventListener("scroll", this),
            this._pointerDownDefault(t, e))
          : this._pointerDownDefault(t, e);
      }),
      (n._pointerDownDefault = function (t, e) {
        (this.pointerDownPointer = { pageX: e.pageX, pageY: e.pageY }),
          this._bindPostStartEvents(t),
          this.dispatchEvent("pointerDown", t, [e]);
      });
    var r = { INPUT: !0, TEXTAREA: !0, SELECT: !0 };
    function l() {
      return { x: i.pageXOffset, y: i.pageYOffset };
    }
    return (
      (n.pointerDownFocus = function (t) {
        r[t.target.nodeName] || this.focus();
      }),
      (n._pointerDownPreventDefault = function (t) {
        var e = "touchstart" == t.type,
          i = "touch" == t.pointerType,
          n = r[t.target.nodeName];
        e || i || n || t.preventDefault();
      }),
      (n.hasDragStarted = function (t) {
        return Math.abs(t.x) > this.options.dragThreshold;
      }),
      (n.pointerUp = function (t, e) {
        delete this.isTouchScrolling,
          this.viewport.classList.remove("is-pointer-down"),
          this.dispatchEvent("pointerUp", t, [e]),
          this._dragPointerUp(t, e);
      }),
      (n.pointerDone = function () {
        i.removeEventListener("scroll", this), delete this.pointerDownScroll;
      }),
      (n.dragStart = function (t, e) {
        this.isDraggable &&
          ((this.dragStartPosition = this.x),
          this.startAnimation(),
          i.removeEventListener("scroll", this),
          this.dispatchEvent("dragStart", t, [e]));
      }),
      (n.pointerMove = function (t, e) {
        var i = this._dragPointerMove(t, e);
        this.dispatchEvent("pointerMove", t, [e, i]), this._dragMove(t, e, i);
      }),
      (n.dragMove = function (t, e, i) {
        if (this.isDraggable) {
          t.preventDefault(), (this.previousDragX = this.dragX);
          var n = this.options.rightToLeft ? -1 : 1;
          this.options.wrapAround && (i.x = i.x % this.slideableWidth);
          var s = this.dragStartPosition + i.x * n;
          if (!this.options.wrapAround && this.slides.length) {
            var o = Math.max(-this.slides[0].target, this.dragStartPosition);
            s = o < s ? 0.5 * (s + o) : s;
            var r = Math.min(
              -this.getLastSlide().target,
              this.dragStartPosition
            );
            s = s < r ? 0.5 * (s + r) : s;
          }
          (this.dragX = s),
            (this.dragMoveTime = new Date()),
            this.dispatchEvent("dragMove", t, [e, i]);
        }
      }),
      (n.dragEnd = function (t, e) {
        if (this.isDraggable) {
          this.options.freeScroll && (this.isFreeScrolling = !0);
          var i = this.dragEndRestingSelect();
          if (this.options.freeScroll && !this.options.wrapAround) {
            var n = this.getRestingPosition();
            this.isFreeScrolling =
              -n > this.slides[0].target && -n < this.getLastSlide().target;
          } else
            this.options.freeScroll ||
              i != this.selectedIndex ||
              (i += this.dragEndBoostSelect());
          delete this.previousDragX,
            (this.isDragSelect = this.options.wrapAround),
            this.select(i),
            delete this.isDragSelect,
            this.dispatchEvent("dragEnd", t, [e]);
        }
      }),
      (n.dragEndRestingSelect = function () {
        var t = this.getRestingPosition(),
          e = Math.abs(this.getSlideDistance(-t, this.selectedIndex)),
          i = this._getClosestResting(t, e, 1),
          n = this._getClosestResting(t, e, -1);
        return i.distance < n.distance ? i.index : n.index;
      }),
      (n._getClosestResting = function (t, e, i) {
        for (
          var n = this.selectedIndex,
            s = 1 / 0,
            o =
              this.options.contain && !this.options.wrapAround
                ? function (t, e) {
                    return t <= e;
                  }
                : function (t, e) {
                    return t < e;
                  };
          o(e, s) &&
          ((n += i), (s = e), null !== (e = this.getSlideDistance(-t, n)));

        )
          e = Math.abs(e);
        return { distance: s, index: n - i };
      }),
      (n.getSlideDistance = function (t, e) {
        var i = this.slides.length,
          n = this.options.wrapAround && 1 < i,
          s = n ? a.modulo(e, i) : e,
          o = this.slides[s];
        if (!o) return null;
        var r = n ? this.slideableWidth * Math.floor(e / i) : 0;
        return t - (o.target + r);
      }),
      (n.dragEndBoostSelect = function () {
        if (
          void 0 === this.previousDragX ||
          !this.dragMoveTime ||
          100 < new Date() - this.dragMoveTime
        )
          return 0;
        var t = this.getSlideDistance(-this.dragX, this.selectedIndex),
          e = this.previousDragX - this.dragX;
        return 0 < t && 0 < e ? 1 : t < 0 && e < 0 ? -1 : 0;
      }),
      (n.staticClick = function (t, e) {
        var i = this.getParentCell(t.target),
          n = i && i.element,
          s = i && this.cells.indexOf(i);
        this.dispatchEvent("staticClick", t, [e, n, s]);
      }),
      (n.onscroll = function () {
        var t = l(),
          e = this.pointerDownScroll.x - t.x,
          i = this.pointerDownScroll.y - t.y;
        (3 < Math.abs(e) || 3 < Math.abs(i)) && this._pointerDone();
      }),
      t
    );
  }),
  (function (n, s) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/prev-next-button",
          ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"],
          function (t, e, i) {
            return s(n, t, e, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = s(
          n,
          require("./flickity"),
          require("unipointer"),
          require("fizzy-ui-utils")
        ))
      : s(n, n.Flickity, n.Unipointer, n.fizzyUIUtils);
  })(window, function (t, e, i, n) {
    "use strict";
    var s = "http://www.w3.org/2000/svg";
    function o(t, e) {
      (this.direction = t), (this.parent = e), this._create();
    }
    ((o.prototype = Object.create(i.prototype))._create = function () {
      (this.isEnabled = !0), (this.isPrevious = -1 == this.direction);
      var t = this.parent.options.rightToLeft ? 1 : -1;
      this.isLeft = this.direction == t;
      var e = (this.element = document.createElement("button"));
      (e.className = "flickity-button flickity-prev-next-button"),
        (e.className += this.isPrevious ? " previous" : " next"),
        e.setAttribute("type", "button"),
        this.disable(),
        e.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
      var i = this.createSVG();
      e.appendChild(i),
        this.parent.on("select", this.update.bind(this)),
        this.on(
          "pointerDown",
          this.parent.childUIPointerDown.bind(this.parent)
        );
    }),
      (o.prototype.activate = function () {
        this.bindStartEvent(this.element),
          this.element.addEventListener("click", this),
          this.parent.element.appendChild(this.element);
      }),
      (o.prototype.deactivate = function () {
        this.parent.element.removeChild(this.element),
          this.unbindStartEvent(this.element),
          this.element.removeEventListener("click", this);
      }),
      (o.prototype.createSVG = function () {
        var t = document.createElementNS(s, "svg");
        t.setAttribute("class", "flickity-button-icon"),
          t.setAttribute("viewBox", "0 0 100 100");
        var e,
          i = document.createElementNS(s, "path"),
          n =
            "string" != typeof (e = this.parent.options.arrowShape)
              ? "M " +
                e.x0 +
                ",50 L " +
                e.x1 +
                "," +
                (e.y1 + 50) +
                " L " +
                e.x2 +
                "," +
                (e.y2 + 50) +
                " L " +
                e.x3 +
                ",50  L " +
                e.x2 +
                "," +
                (50 - e.y2) +
                " L " +
                e.x1 +
                "," +
                (50 - e.y1) +
                " Z"
              : e;
        return (
          i.setAttribute("d", n),
          i.setAttribute("class", "arrow"),
          this.isLeft ||
            i.setAttribute("transform", "translate(100, 100) rotate(180) "),
          t.appendChild(i),
          t
        );
      }),
      (o.prototype.handleEvent = n.handleEvent),
      (o.prototype.onclick = function () {
        if (this.isEnabled) {
          this.parent.uiChange();
          var t = this.isPrevious ? "previous" : "next";
          this.parent[t]();
        }
      }),
      (o.prototype.enable = function () {
        this.isEnabled || ((this.element.disabled = !1), (this.isEnabled = !0));
      }),
      (o.prototype.disable = function () {
        this.isEnabled && ((this.element.disabled = !0), (this.isEnabled = !1));
      }),
      (o.prototype.update = function () {
        var t = this.parent.slides;
        if (this.parent.options.wrapAround && 1 < t.length) this.enable();
        else {
          var e = t.length ? t.length - 1 : 0,
            i = this.isPrevious ? 0 : e;
          this[this.parent.selectedIndex == i ? "disable" : "enable"]();
        }
      }),
      (o.prototype.destroy = function () {
        this.deactivate(), this.allOff();
      }),
      n.extend(e.defaults, {
        prevNextButtons: !0,
        arrowShape: { x0: 10, x1: 60, y1: 50, x2: 70, y2: 40, x3: 30 },
      }),
      e.createMethods.push("_createPrevNextButtons");
    var r = e.prototype;
    return (
      (r._createPrevNextButtons = function () {
        this.options.prevNextButtons &&
          ((this.prevButton = new o(-1, this)),
          (this.nextButton = new o(1, this)),
          this.on("activate", this.activatePrevNextButtons));
      }),
      (r.activatePrevNextButtons = function () {
        this.prevButton.activate(),
          this.nextButton.activate(),
          this.on("deactivate", this.deactivatePrevNextButtons);
      }),
      (r.deactivatePrevNextButtons = function () {
        this.prevButton.deactivate(),
          this.nextButton.deactivate(),
          this.off("deactivate", this.deactivatePrevNextButtons);
      }),
      (e.PrevNextButton = o),
      e
    );
  }),
  (function (n, s) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/page-dots",
          ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"],
          function (t, e, i) {
            return s(n, t, e, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = s(
          n,
          require("./flickity"),
          require("unipointer"),
          require("fizzy-ui-utils")
        ))
      : s(n, n.Flickity, n.Unipointer, n.fizzyUIUtils);
  })(window, function (t, e, i, n) {
    function s(t) {
      (this.parent = t), this._create();
    }
    ((s.prototype = Object.create(i.prototype))._create = function () {
      (this.holder = document.createElement("ol")),
        (this.holder.className = "flickity-page-dots"),
        (this.dots = []),
        (this.handleClick = this.onClick.bind(this)),
        this.on(
          "pointerDown",
          this.parent.childUIPointerDown.bind(this.parent)
        );
    }),
      (s.prototype.activate = function () {
        this.setDots(),
          this.holder.addEventListener("click", this.handleClick),
          this.bindStartEvent(this.holder),
          this.parent.element.appendChild(this.holder);
      }),
      (s.prototype.deactivate = function () {
        this.holder.removeEventListener("click", this.handleClick),
          this.unbindStartEvent(this.holder),
          this.parent.element.removeChild(this.holder);
      }),
      (s.prototype.setDots = function () {
        var t = this.parent.slides.length - this.dots.length;
        0 < t ? this.addDots(t) : t < 0 && this.removeDots(-t);
      }),
      (s.prototype.addDots = function (t) {
        for (
          var e = document.createDocumentFragment(),
            i = [],
            n = this.dots.length,
            s = n + t,
            o = n;
          o < s;
          o++
        ) {
          var r = document.createElement("li");
          (r.className = "dot"),
            r.setAttribute("aria-label", "Page dot " + (o + 1)),
            e.appendChild(r),
            i.push(r);
        }
        this.holder.appendChild(e), (this.dots = this.dots.concat(i));
      }),
      (s.prototype.removeDots = function (t) {
        this.dots.splice(this.dots.length - t, t).forEach(function (t) {
          this.holder.removeChild(t);
        }, this);
      }),
      (s.prototype.updateSelected = function () {
        this.selectedDot &&
          ((this.selectedDot.className = "dot"),
          this.selectedDot.removeAttribute("aria-current")),
          this.dots.length &&
            ((this.selectedDot = this.dots[this.parent.selectedIndex]),
            (this.selectedDot.className = "dot is-selected"),
            this.selectedDot.setAttribute("aria-current", "step"));
      }),
      (s.prototype.onTap = s.prototype.onClick =
        function (t) {
          var e = t.target;
          if ("LI" == e.nodeName) {
            this.parent.uiChange();
            var i = this.dots.indexOf(e);
            this.parent.select(i);
          }
        }),
      (s.prototype.destroy = function () {
        this.deactivate(), this.allOff();
      }),
      (e.PageDots = s),
      n.extend(e.defaults, { pageDots: !0 }),
      e.createMethods.push("_createPageDots");
    var o = e.prototype;
    return (
      (o._createPageDots = function () {
        this.options.pageDots &&
          ((this.pageDots = new s(this)),
          this.on("activate", this.activatePageDots),
          this.on("select", this.updateSelectedPageDots),
          this.on("cellChange", this.updatePageDots),
          this.on("resize", this.updatePageDots),
          this.on("deactivate", this.deactivatePageDots));
      }),
      (o.activatePageDots = function () {
        this.pageDots.activate();
      }),
      (o.updateSelectedPageDots = function () {
        this.pageDots.updateSelected();
      }),
      (o.updatePageDots = function () {
        this.pageDots.setDots();
      }),
      (o.deactivatePageDots = function () {
        this.pageDots.deactivate();
      }),
      (e.PageDots = s),
      e
    );
  }),
  (function (t, n) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/player",
          ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"],
          function (t, e, i) {
            return n(t, e, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = n(
          require("ev-emitter"),
          require("fizzy-ui-utils"),
          require("./flickity")
        ))
      : n(t.EvEmitter, t.fizzyUIUtils, t.Flickity);
  })(window, function (t, e, i) {
    function n(t) {
      (this.parent = t),
        (this.state = "stopped"),
        (this.onVisibilityChange = this.visibilityChange.bind(this)),
        (this.onVisibilityPlay = this.visibilityPlay.bind(this));
    }
    ((n.prototype = Object.create(t.prototype)).play = function () {
      "playing" != this.state &&
        (document.hidden
          ? document.addEventListener("visibilitychange", this.onVisibilityPlay)
          : ((this.state = "playing"),
            document.addEventListener(
              "visibilitychange",
              this.onVisibilityChange
            ),
            this.tick()));
    }),
      (n.prototype.tick = function () {
        if ("playing" == this.state) {
          var t = this.parent.options.autoPlay;
          t = "number" == typeof t ? t : 3e3;
          var e = this;
          this.clear(),
            (this.timeout = setTimeout(function () {
              e.parent.next(!0), e.tick();
            }, t));
        }
      }),
      (n.prototype.stop = function () {
        (this.state = "stopped"),
          this.clear(),
          document.removeEventListener(
            "visibilitychange",
            this.onVisibilityChange
          );
      }),
      (n.prototype.clear = function () {
        clearTimeout(this.timeout);
      }),
      (n.prototype.pause = function () {
        "playing" == this.state && ((this.state = "paused"), this.clear());
      }),
      (n.prototype.unpause = function () {
        "paused" == this.state && this.play();
      }),
      (n.prototype.visibilityChange = function () {
        this[document.hidden ? "pause" : "unpause"]();
      }),
      (n.prototype.visibilityPlay = function () {
        this.play(),
          document.removeEventListener(
            "visibilitychange",
            this.onVisibilityPlay
          );
      }),
      e.extend(i.defaults, { pauseAutoPlayOnHover: !0 }),
      i.createMethods.push("_createPlayer");
    var s = i.prototype;
    return (
      (s._createPlayer = function () {
        (this.player = new n(this)),
          this.on("activate", this.activatePlayer),
          this.on("uiChange", this.stopPlayer),
          this.on("pointerDown", this.stopPlayer),
          this.on("deactivate", this.deactivatePlayer);
      }),
      (s.activatePlayer = function () {
        this.options.autoPlay &&
          (this.player.play(),
          this.element.addEventListener("mouseenter", this));
      }),
      (s.playPlayer = function () {
        this.player.play();
      }),
      (s.stopPlayer = function () {
        this.player.stop();
      }),
      (s.pausePlayer = function () {
        this.player.pause();
      }),
      (s.unpausePlayer = function () {
        this.player.unpause();
      }),
      (s.deactivatePlayer = function () {
        this.player.stop(),
          this.element.removeEventListener("mouseenter", this);
      }),
      (s.onmouseenter = function () {
        this.options.pauseAutoPlayOnHover &&
          (this.player.pause(),
          this.element.addEventListener("mouseleave", this));
      }),
      (s.onmouseleave = function () {
        this.player.unpause(),
          this.element.removeEventListener("mouseleave", this);
      }),
      (i.Player = n),
      i
    );
  }),
  (function (i, n) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/add-remove-cell",
          ["./flickity", "fizzy-ui-utils/utils"],
          function (t, e) {
            return n(i, t, e);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = n(
          i,
          require("./flickity"),
          require("fizzy-ui-utils")
        ))
      : n(i, i.Flickity, i.fizzyUIUtils);
  })(window, function (t, e, n) {
    var i = e.prototype;
    return (
      (i.insert = function (t, e) {
        var i,
          n,
          s = this._makeCells(t);
        if (s && s.length) {
          var o = this.cells.length;
          e = void 0 === e ? o : e;
          var r =
              ((i = s),
              (n = document.createDocumentFragment()),
              i.forEach(function (t) {
                n.appendChild(t.element);
              }),
              n),
            a = e == o;
          if (a) this.slider.appendChild(r);
          else {
            var l = this.cells[e].element;
            this.slider.insertBefore(r, l);
          }
          if (0 === e) this.cells = s.concat(this.cells);
          else if (a) this.cells = this.cells.concat(s);
          else {
            var h = this.cells.splice(e, o - e);
            this.cells = this.cells.concat(s).concat(h);
          }
          this._sizeCells(s), this.cellChange(e, !0);
        }
      }),
      (i.append = function (t) {
        this.insert(t, this.cells.length);
      }),
      (i.prepend = function (t) {
        this.insert(t, 0);
      }),
      (i.remove = function (t) {
        var e = this.getCells(t);
        if (e && e.length) {
          var i = this.cells.length - 1;
          e.forEach(function (t) {
            t.remove();
            var e = this.cells.indexOf(t);
            (i = Math.min(e, i)), n.removeFrom(this.cells, t);
          }, this),
            this.cellChange(i, !0);
        }
      }),
      (i.cellSizeChange = function (t) {
        var e = this.getCell(t);
        if (e) {
          e.getSize();
          var i = this.cells.indexOf(e);
          this.cellChange(i);
        }
      }),
      (i.cellChange = function (t, e) {
        var i = this.selectedElement;
        this._positionCells(t),
          this._getWrapShiftCells(),
          this.setGallerySize();
        var n = this.getCell(i);
        n && (this.selectedIndex = this.getCellSlideIndex(n)),
          (this.selectedIndex = Math.min(
            this.slides.length - 1,
            this.selectedIndex
          )),
          this.emitEvent("cellChange", [t]),
          this.select(this.selectedIndex),
          e && this.positionSliderAtSelected();
      }),
      e
    );
  }),
  (function (i, n) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/lazyload",
          ["./flickity", "fizzy-ui-utils/utils"],
          function (t, e) {
            return n(i, t, e);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = n(
          i,
          require("./flickity"),
          require("fizzy-ui-utils")
        ))
      : n(i, i.Flickity, i.fizzyUIUtils);
  })(window, function (t, e, o) {
    "use strict";
    e.createMethods.push("_createLazyload");
    var i = e.prototype;
    function s(t, e) {
      (this.img = t), (this.flickity = e), this.load();
    }
    return (
      (i._createLazyload = function () {
        this.on("select", this.lazyLoad);
      }),
      (i.lazyLoad = function () {
        var t = this.options.lazyLoad;
        if (t) {
          var e = "number" == typeof t ? t : 0,
            i = this.getAdjacentCellElements(e),
            n = [];
          i.forEach(function (t) {
            var e = (function (t) {
              if ("IMG" == t.nodeName) {
                var e = t.getAttribute("data-flickity-lazyload"),
                  i = t.getAttribute("data-flickity-lazyload-src"),
                  n = t.getAttribute("data-flickity-lazyload-srcset");
                if (e || i || n) return [t];
              }
              var s = t.querySelectorAll(
                "img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]"
              );
              return o.makeArray(s);
            })(t);
            n = n.concat(e);
          }),
            n.forEach(function (t) {
              new s(t, this);
            }, this);
        }
      }),
      (s.prototype.handleEvent = o.handleEvent),
      (s.prototype.load = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this);
        var t =
            this.img.getAttribute("data-flickity-lazyload") ||
            this.img.getAttribute("data-flickity-lazyload-src"),
          e = this.img.getAttribute("data-flickity-lazyload-srcset");
        (this.img.src = t),
          e && this.img.setAttribute("srcset", e),
          this.img.removeAttribute("data-flickity-lazyload"),
          this.img.removeAttribute("data-flickity-lazyload-src"),
          this.img.removeAttribute("data-flickity-lazyload-srcset");
      }),
      (s.prototype.onload = function (t) {
        this.complete(t, "flickity-lazyloaded");
      }),
      (s.prototype.onerror = function (t) {
        this.complete(t, "flickity-lazyerror");
      }),
      (s.prototype.complete = function (t, e) {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
        var i = this.flickity.getParentCell(this.img),
          n = i && i.element;
        this.flickity.cellSizeChange(n),
          this.img.classList.add(e),
          this.flickity.dispatchEvent("lazyLoad", t, n);
      }),
      (e.LazyLoader = s),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/index",
          [
            "./flickity",
            "./drag",
            "./prev-next-button",
            "./page-dots",
            "./player",
            "./add-remove-cell",
            "./lazyload",
          ],
          e
        )
      : "object" == typeof module &&
        module.exports &&
        (module.exports = e(
          require("./flickity"),
          require("./drag"),
          require("./prev-next-button"),
          require("./page-dots"),
          require("./player"),
          require("./add-remove-cell"),
          require("./lazyload")
        ));
  })(window, function (t) {
    return t;
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "flickity-as-nav-for/as-nav-for",
          ["flickity/js/index", "fizzy-ui-utils/utils"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("flickity"), require("fizzy-ui-utils")))
      : (t.Flickity = e(t.Flickity, t.fizzyUIUtils));
  })(window, function (n, s) {
    n.createMethods.push("_createAsNavFor");
    var t = n.prototype;
    return (
      (t._createAsNavFor = function () {
        this.on("activate", this.activateAsNavFor),
          this.on("deactivate", this.deactivateAsNavFor),
          this.on("destroy", this.destroyAsNavFor);
        var t = this.options.asNavFor;
        if (t) {
          var e = this;
          setTimeout(function () {
            e.setNavCompanion(t);
          });
        }
      }),
      (t.setNavCompanion = function (t) {
        t = s.getQueryElement(t);
        var e = n.data(t);
        if (e && e != this) {
          this.navCompanion = e;
          var i = this;
          (this.onNavCompanionSelect = function () {
            i.navCompanionSelect();
          }),
            e.on("select", this.onNavCompanionSelect),
            this.on("staticClick", this.onNavStaticClick),
            this.navCompanionSelect(!0);
        }
      }),
      (t.navCompanionSelect = function (t) {
        var e,
          i,
          n,
          s = this.navCompanion && this.navCompanion.selectedCells;
        if (s) {
          var o = s[0],
            r = this.navCompanion.cells.indexOf(o),
            a = r + s.length - 1,
            l = Math.floor(
              ((e = r),
              (i = a),
              (n = this.navCompanion.cellAlign),
              (i - e) * n + e)
            );
          if (
            (this.selectCell(l, !1, t),
            this.removeNavSelectedElements(),
            !(l >= this.cells.length))
          ) {
            var h = this.cells.slice(r, 1 + a);
            (this.navSelectedElements = h.map(function (t) {
              return t.element;
            })),
              this.changeNavSelectedClass("add");
          }
        }
      }),
      (t.changeNavSelectedClass = function (e) {
        this.navSelectedElements.forEach(function (t) {
          t.classList[e]("is-nav-selected");
        });
      }),
      (t.activateAsNavFor = function () {
        this.navCompanionSelect(!0);
      }),
      (t.removeNavSelectedElements = function () {
        this.navSelectedElements &&
          (this.changeNavSelectedClass("remove"),
          delete this.navSelectedElements);
      }),
      (t.onNavStaticClick = function (t, e, i, n) {
        "number" == typeof n && this.navCompanion.selectCell(n);
      }),
      (t.deactivateAsNavFor = function () {
        this.removeNavSelectedElements();
      }),
      (t.destroyAsNavFor = function () {
        this.navCompanion &&
          (this.navCompanion.off("select", this.onNavCompanionSelect),
          this.off("staticClick", this.onNavStaticClick),
          delete this.navCompanion);
      }),
      n
    );
  }),
  (function (e, i) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "imagesloaded/imagesloaded",
          ["ev-emitter/ev-emitter"],
          function (t) {
            return i(e, t);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = i(e, require("ev-emitter")))
      : (e.imagesLoaded = i(e, e.EvEmitter));
  })("undefined" != typeof window ? window : this, function (e, t) {
    var o = e.jQuery,
      r = e.console;
    function a(t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }
    var l = Array.prototype.slice;
    function h(t, e, i) {
      if (!(this instanceof h)) return new h(t, e, i);
      var n,
        s = t;
      "string" == typeof t && (s = document.querySelectorAll(t)),
        s
          ? ((this.elements =
              ((n = s),
              Array.isArray(n)
                ? n
                : "object" == typeof n && "number" == typeof n.length
                ? l.call(n)
                : [n])),
            (this.options = a({}, this.options)),
            "function" == typeof e ? (i = e) : a(this.options, e),
            i && this.on("always", i),
            this.getImages(),
            o && (this.jqDeferred = new o.Deferred()),
            setTimeout(this.check.bind(this)))
          : r.error("Bad element for imagesLoaded " + (s || t));
    }
    ((h.prototype = Object.create(t.prototype)).options = {}),
      (h.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (h.prototype.addElementImages = function (t) {
        "IMG" == t.nodeName && this.addImage(t),
          !0 === this.options.background && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && c[e]) {
          for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
            var s = i[n];
            this.addImage(s);
          }
          if ("string" == typeof this.options.background) {
            var o = t.querySelectorAll(this.options.background);
            for (n = 0; n < o.length; n++) {
              var r = o[n];
              this.addElementBackgroundImages(r);
            }
          }
        }
      });
    var c = { 1: !0, 9: !0, 11: !0 };
    function i(t) {
      this.img = t;
    }
    function n(t, e) {
      (this.url = t), (this.element = e), (this.img = new Image());
    }
    return (
      (h.prototype.addElementBackgroundImages = function (t) {
        var e = getComputedStyle(t);
        if (e)
          for (
            var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage);
            null !== n;

          ) {
            var s = n && n[2];
            s && this.addBackground(s, t), (n = i.exec(e.backgroundImage));
          }
      }),
      (h.prototype.addImage = function (t) {
        var e = new i(t);
        this.images.push(e);
      }),
      (h.prototype.addBackground = function (t, e) {
        var i = new n(t, e);
        this.images.push(i);
      }),
      (h.prototype.check = function () {
        var n = this;
        function e(t, e, i) {
          setTimeout(function () {
            n.progress(t, e, i);
          });
        }
        (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? this.images.forEach(function (t) {
                t.once("progress", e), t.check();
              })
            : this.complete();
      }),
      (h.prototype.progress = function (t, e, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
          this.emitEvent("progress", [this, t, e]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, t),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && r && r.log("progress: " + i, t, e);
      }),
      (h.prototype.complete = function () {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
          this.emitEvent(t, [this]),
          this.emitEvent("always", [this]),
          this.jqDeferred)
        ) {
          var e = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[e](this);
        }
      }),
      ((i.prototype = Object.create(t.prototype)).check = function () {
        this.getIsImageComplete()
          ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            (this.proxyImage.src = this.img.src));
      }),
      (i.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth;
      }),
      (i.prototype.confirm = function (t, e) {
        (this.isLoaded = t), this.emitEvent("progress", [this, this.img, e]);
      }),
      (i.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (i.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (i.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (i.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      ((n.prototype = Object.create(i.prototype)).check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url),
          this.getIsImageComplete() &&
            (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
            this.unbindEvents());
      }),
      (n.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (n.prototype.confirm = function (t, e) {
        (this.isLoaded = t),
          this.emitEvent("progress", [this, this.element, e]);
      }),
      (h.makeJQueryPlugin = function (t) {
        (t = t || e.jQuery) &&
          ((o = t).fn.imagesLoaded = function (t, e) {
            return new h(this, t, e).jqDeferred.promise(o(this));
          });
      }),
      h.makeJQueryPlugin(),
      h
    );
  }),
  (function (i, n) {
    "function" == typeof define && define.amd
      ? define(
          ["flickity/js/index", "imagesloaded/imagesloaded"],
          function (t, e) {
            return n(i, t, e);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = n(i, require("flickity"), require("imagesloaded")))
      : (i.Flickity = n(i, i.Flickity, i.imagesLoaded));
  })(window, function (t, e, i) {
    "use strict";
    e.createMethods.push("_createImagesLoaded");
    var n = e.prototype;
    return (
      (n._createImagesLoaded = function () {
        this.on("activate", this.imagesLoaded);
      }),
      (n.imagesLoaded = function () {
        if (this.options.imagesLoaded) {
          var n = this;
          i(this.slider).on("progress", function (t, e) {
            var i = n.getParentCell(e.img);
            n.cellSizeChange(i && i.element),
              n.options.freeScroll || n.positionSliderAtSelected();
          });
        }
      }),
      e
    );
  }),
  (function (e, i) {
    "function" == typeof define && define.amd
      ? define("jquery-bridget/jquery-bridget", ["jquery"], function (t) {
          return i(e, t);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = i(e, require("jquery")))
      : (e.jQueryBridget = i(e, e.jQuery));
  })(window, function (t, e) {
    "use strict";
    function i(h, s, c) {
      (c = c || e || t.jQuery) &&
        (s.prototype.option ||
          (s.prototype.option = function (t) {
            c.isPlainObject(t) &&
              (this.options = c.extend(!0, this.options, t));
          }),
        (c.fn[h] = function (t) {
          return "string" != typeof t
            ? ((function (t, n) {
                t.each(function (t, e) {
                  var i = c.data(e, h);
                  i
                    ? (i.option(n), i._init())
                    : ((i = new s(e, n)), c.data(e, h, i));
                });
              })(this, t),
              this)
            : (function (t, o, r) {
                var a,
                  l = "$()." + h + '("' + o + '")';
                return (
                  t.each(function (t, e) {
                    var i = c.data(e, h);
                    if (i) {
                      var n = i[o];
                      if (n && "_" != o.charAt(0)) {
                        var s = n.apply(i, r);
                        a = void 0 === a ? s : a;
                      } else d(l + " is not a valid method");
                    } else d(h + " not initialized. Cannot call methods, i.e. " + l);
                  }),
                  void 0 !== a ? a : t
                );
              })(this, t, o.call(arguments, 1));
        }),
        n(c));
    }
    function n(t) {
      !t || (t && t.bridget) || (t.bridget = i);
    }
    var o = Array.prototype.slice,
      s = t.console,
      d =
        void 0 === s
          ? function () {}
          : function (t) {
              s.error(t);
            };
    return n(e || t.jQuery), i;
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("ev-emitter/ev-emitter", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.EvEmitter = e());
  })("undefined" != typeof window ? window : this, function () {
    function t() {}
    var e = t.prototype;
    return (
      (e.on = function (t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            n = (i[t] = i[t] || []);
          return -1 == n.indexOf(e) && n.push(e), this;
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e);
          var i = (this._onceEvents = this._onceEvents || {});
          return ((i[t] = i[t] || {})[e] = !0), this;
        }
      }),
      (e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = i.indexOf(e);
          return -1 != n && i.splice(n, 1), this;
        }
      }),
      (e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          (i = i.slice(0)), (e = e || []);
          for (
            var n = this._onceEvents && this._onceEvents[t], s = 0;
            s < i.length;
            s++
          ) {
            var o = i[s];
            n && n[o] && (this.off(t, o), delete n[o]), o.apply(this, e);
          }
          return this;
        }
      }),
      (e.allOff = function () {
        delete this._events, delete this._onceEvents;
      }),
      t
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("desandro-matches-selector/matches-selector", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.matchesSelector = e());
  })(window, function () {
    "use strict";
    var i = (function () {
      var t = window.Element.prototype;
      if (t.matches) return "matches";
      if (t.matchesSelector) return "matchesSelector";
      for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
        var n = e[i] + "MatchesSelector";
        if (t[n]) return n;
      }
    })();
    return function (t, e) {
      return t[i](e);
    };
  }),
  (function (e, i) {
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["desandro-matches-selector/matches-selector"],
          function (t) {
            return i(e, t);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = i(e, require("desandro-matches-selector")))
      : (e.fizzyUIUtils = i(e, e.matchesSelector));
  })(window, function (h, o) {
    var c = {
        extend: function (t, e) {
          for (var i in e) t[i] = e[i];
          return t;
        },
        modulo: function (t, e) {
          return ((t % e) + e) % e;
        },
      },
      e = Array.prototype.slice;
    (c.makeArray = function (t) {
      return Array.isArray(t)
        ? t
        : null == t
        ? []
        : "object" == typeof t && "number" == typeof t.length
        ? e.call(t)
        : [t];
    }),
      (c.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1);
      }),
      (c.getParent = function (t, e) {
        for (; t.parentNode && t != document.body; )
          if (((t = t.parentNode), o(t, e))) return t;
      }),
      (c.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t;
      }),
      (c.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (c.filterFindElements = function (t, n) {
        t = c.makeArray(t);
        var s = [];
        return (
          t.forEach(function (t) {
            if (t instanceof HTMLElement) {
              if (!n) return void s.push(t);
              o(t, n) && s.push(t);
              for (var e = t.querySelectorAll(n), i = 0; i < e.length; i++)
                s.push(e[i]);
            }
          }),
          s
        );
      }),
      (c.debounceMethod = function (t, e, n) {
        n = n || 100;
        var s = t.prototype[e],
          o = e + "Timeout";
        t.prototype[e] = function () {
          var t = this[o];
          clearTimeout(t);
          var e = arguments,
            i = this;
          this[o] = setTimeout(function () {
            s.apply(i, e), delete i[o];
          }, n);
        };
      }),
      (c.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e
          ? setTimeout(t)
          : document.addEventListener("DOMContentLoaded", t);
      }),
      (c.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i;
          })
          .toLowerCase();
      });
    var d = h.console;
    return (
      (c.htmlInit = function (a, l) {
        c.docReady(function () {
          var t = c.toDashed(l),
            s = "data-" + t,
            e = document.querySelectorAll("[" + s + "]"),
            i = document.querySelectorAll(".js-" + t),
            n = c.makeArray(e).concat(c.makeArray(i)),
            o = s + "-options",
            r = h.jQuery;
          n.forEach(function (e) {
            var t,
              i = e.getAttribute(s) || e.getAttribute(o);
            try {
              t = i && JSON.parse(i);
            } catch (t) {
              return void (
                d &&
                d.error("Error parsing " + s + " on " + e.className + ": " + t)
              );
            }
            var n = new a(e, t);
            r && r.data(e, l, n);
          });
        });
      }),
      c
    );
  }),
  (function (i, n) {
    "function" == typeof define && define.amd
      ? define(
          "infinite-scroll/js/core",
          ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils"],
          function (t, e) {
            return n(i, t, e);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = n(
          i,
          require("ev-emitter"),
          require("fizzy-ui-utils")
        ))
      : (i.InfiniteScroll = n(i, i.EvEmitter, i.fizzyUIUtils));
  })(window, function (e, t, s) {
    function o(t, e) {
      var i = s.getQueryElement(t);
      if (i) {
        if ((t = i).infiniteScrollGUID) {
          var n = a[t.infiniteScrollGUID];
          return n.option(e), n;
        }
        (this.element = t),
          (this.options = s.extend({}, o.defaults)),
          this.option(e),
          r && (this.$element = r(this.element)),
          this.create();
      } else console.error("Bad element for InfiniteScroll: " + (i || t));
    }
    var r = e.jQuery,
      a = {};
    (o.defaults = {}), (o.create = {}), (o.destroy = {});
    var i = o.prototype;
    s.extend(i, t.prototype);
    var n = 0;
    (i.create = function () {
      var t = (this.guid = ++n);
      if (
        ((this.element.infiniteScrollGUID = t),
        ((a[t] = this).pageIndex = 1),
        (this.loadCount = 0),
        this.updateGetPath(),
        this.getPath && this.getPath())
      )
        for (var e in (this.updateGetAbsolutePath(),
        this.log("initialized", [this.element.className]),
        this.callOnInit(),
        o.create))
          o.create[e].call(this);
      else console.error("Disabling InfiniteScroll");
    }),
      (i.option = function (t) {
        s.extend(this.options, t);
      }),
      (i.callOnInit = function () {
        var t = this.options.onInit;
        t && t.call(this, this);
      }),
      (i.dispatchEvent = function (t, e, i) {
        this.log(t, i);
        var n = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, n), r && this.$element)) {
          var s = (t += ".infiniteScroll");
          if (e) {
            var o = r.Event(e);
            (o.type = t), (s = o);
          }
          this.$element.trigger(s, i);
        }
      });
    var l = {
      initialized: function (t) {
        return "on " + t;
      },
      request: function (t) {
        return "URL: " + t;
      },
      load: function (t, e) {
        return (t.title || "") + ". URL: " + e;
      },
      error: function (t, e) {
        return t + ". URL: " + e;
      },
      append: function (t, e, i) {
        return i.length + " items. URL: " + e;
      },
      last: function (t, e) {
        return "URL: " + e;
      },
      history: function (t, e) {
        return "URL: " + e;
      },
      pageIndex: function (t, e) {
        return "current page determined to be: " + t + " from " + e;
      },
    };
    (i.log = function (t, e) {
      if (this.options.debug) {
        var i = "[InfiniteScroll] " + t,
          n = l[t];
        n && (i += ". " + n.apply(this, e)), console.log(i);
      }
    }),
      (i.updateMeasurements = function () {
        this.windowHeight = e.innerHeight;
        var t = this.element.getBoundingClientRect();
        this.top = t.top + e.pageYOffset;
      }),
      (i.updateScroller = function () {
        var t = this.options.elementScroll;
        if (t) {
          if (
            ((this.scroller = !0 === t ? this.element : s.getQueryElement(t)),
            !this.scroller)
          )
            throw "Unable to find elementScroll: " + t;
        } else this.scroller = e;
      }),
      (i.updateGetPath = function () {
        var t = this.options.path;
        if (t) {
          var e = typeof t;
          if ("function" != e)
            return "string" == e && t.match("{{#}}")
              ? void this.updateGetPathTemplate(t)
              : void this.updateGetPathSelector(t);
          this.getPath = t;
        } else
          console.error("InfiniteScroll path option required. Set as: " + t);
      }),
      (i.updateGetPathTemplate = function (e) {
        this.getPath = function () {
          var t = this.pageIndex + 1;
          return e.replace("{{#}}", t);
        }.bind(this);
        var t = e.replace(/(\\\?|\?)/, "\\?").replace("{{#}}", "(\\d\\d?\\d?)"),
          i = new RegExp(t),
          n = location.href.match(i);
        n &&
          ((this.pageIndex = parseInt(n[1], 10)),
          this.log("pageIndex", [this.pageIndex, "template string"]));
      });
    var h = [
      /^(.*?\/?page\/?)(\d\d?\d?)(.*?$)/,
      /^(.*?\/?\?page=)(\d\d?\d?)(.*?$)/,
      /(.*?)(\d\d?\d?)(?!.*\d)(.*?$)/,
    ];
    return (
      (i.updateGetPathSelector = function (t) {
        var e = document.querySelector(t);
        if (e) {
          for (
            var i, n, s = e.getAttribute("href"), o = 0;
            s && o < h.length;
            o++
          ) {
            n = h[o];
            var r = s.match(n);
            if (r) {
              i = r.slice(1);
              break;
            }
          }
          return i
            ? ((this.isPathSelector = !0),
              (this.getPath = function () {
                var t = this.pageIndex + 1;
                return i[0] + t + i[2];
              }.bind(this)),
              (this.pageIndex = parseInt(i[1], 10) - 1),
              void this.log("pageIndex", [this.pageIndex, "next link"]))
            : void console.error(
                "InfiniteScroll unable to parse next link href: " + s
              );
        }
        console.error(
          "Bad InfiniteScroll path option. Next link not found: " + t
        );
      }),
      (i.updateGetAbsolutePath = function () {
        var t = this.getPath();
        if (t.match(/^http/) || t.match(/^\//))
          this.getAbsolutePath = this.getPath;
        else {
          var e = location.pathname;
          if (t.match(/^\?/))
            this.getAbsolutePath = function () {
              return e + this.getPath();
            };
          else {
            var i = e.substring(0, e.lastIndexOf("/"));
            this.getAbsolutePath = function () {
              return i + "/" + this.getPath();
            };
          }
        }
      }),
      (o.create.hideNav = function () {
        var t = s.getQueryElement(this.options.hideNav);
        t && ((t.style.display = "none"), (this.nav = t));
      }),
      (o.destroy.hideNav = function () {
        this.nav && (this.nav.style.display = "");
      }),
      (i.destroy = function () {
        for (var t in (this.allOff(), o.destroy)) o.destroy[t].call(this);
        delete this.element.infiniteScrollGUID,
          delete a[this.guid],
          r && this.$element && r.removeData(this.element, "infiniteScroll");
      }),
      (o.throttle = function (n, s) {
        var o, r;
        return (
          (s = s || 200),
          function () {
            var t = +new Date(),
              e = arguments,
              i = function () {
                (o = t), n.apply(this, e);
              }.bind(this);
            o && t < o + s ? (clearTimeout(r), (r = setTimeout(i, s))) : i();
          }
        );
      }),
      (o.data = function (t) {
        var e = (t = s.getQueryElement(t)) && t.infiniteScrollGUID;
        return e && a[e];
      }),
      (o.setJQuery = function (t) {
        r = t;
      }),
      s.htmlInit(o, "infinite-scroll"),
      (i._init = function () {}),
      r && r.bridget && r.bridget("infiniteScroll", o),
      o
    );
  }),
  (function (e, i) {
    "function" == typeof define && define.amd
      ? define("infinite-scroll/js/page-load", ["./core"], function (t) {
          return i(e, t);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = i(e, require("./core")))
      : i(e, e.InfiniteScroll);
  })(window, function (n, s) {
    function r(t) {
      for (
        var e = document.createDocumentFragment(), i = 0;
        t && i < t.length;
        i++
      )
        e.appendChild(t[i]);
      return e;
    }
    function o(t, e) {
      for (var i = t.attributes, n = 0; n < i.length; n++) {
        var s = i[n];
        e.setAttribute(s.name, s.value);
      }
    }
    var t = s.prototype;
    return (
      (s.defaults.loadOnScroll = !0),
      (s.defaults.checkLastPage = !0),
      (s.defaults.responseType = "document"),
      (s.create.pageLoad = function () {
        (this.canLoad = !0),
          this.on("scrollThreshold", this.onScrollThresholdLoad),
          this.on("load", this.checkLastPage),
          this.options.outlayer && this.on("append", this.onAppendOutlayer);
      }),
      (t.onScrollThresholdLoad = function () {
        this.options.loadOnScroll && this.loadNextPage();
      }),
      (t.loadNextPage = function () {
        if (!this.isLoading && this.canLoad) {
          var e = this.getAbsolutePath();
          this.isLoading = !0;
          var t = function (t) {
              this.onPageLoad(t, e);
            }.bind(this),
            i = function (t) {
              this.onPageError(t, e);
            }.bind(this),
            n = function (t) {
              this.lastPageReached(t, e);
            }.bind(this);
          (function (e, t, i, n, s) {
            var o = new XMLHttpRequest();
            o.open("GET", e, !0),
              (o.responseType = t || ""),
              o.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
              (o.onload = function () {
                if (200 == o.status) i(o.response);
                else if (204 == o.status) s(o.response);
                else {
                  var t = new Error(o.statusText);
                  n(t);
                }
              }),
              (o.onerror = function () {
                var t = new Error("Network error requesting " + e);
                n(t);
              }),
              o.send();
          })(e, this.options.responseType, t, i, n),
            this.dispatchEvent("request", null, [e]);
        }
      }),
      (t.onPageLoad = function (t, e) {
        return (
          this.options.append || (this.isLoading = !1),
          this.pageIndex++,
          this.loadCount++,
          this.dispatchEvent("load", null, [t, e]),
          this.appendNextPage(t, e),
          t
        );
      }),
      (t.appendNextPage = function (t, e) {
        var i = this.options.append;
        if ("document" == this.options.responseType && i) {
          var n = t.querySelectorAll(i),
            s = r(n),
            o = function () {
              this.appendItems(n, s),
                (this.isLoading = !1),
                this.dispatchEvent("append", null, [t, e, n]);
            }.bind(this);
          this.options.outlayer ? this.appendOutlayerItems(s, o) : o();
        }
      }),
      (t.appendItems = function (t, e) {
        t &&
          t.length &&
          ((function (t) {
            for (
              var e = t.querySelectorAll("script"), i = 0;
              i < e.length;
              i++
            ) {
              var n = e[i],
                s = document.createElement("script");
              o(n, s),
                (s.innerHTML = n.innerHTML),
                n.parentNode.replaceChild(s, n);
            }
          })((e = e || r(t))),
          this.element.appendChild(e));
      }),
      (t.appendOutlayerItems = function (t, e) {
        var i = s.imagesLoaded || n.imagesLoaded;
        return i
          ? void i(t, e)
          : (console.error(
              "[InfiniteScroll] imagesLoaded required for outlayer option"
            ),
            void (this.isLoading = !1));
      }),
      (t.onAppendOutlayer = function (t, e, i) {
        this.options.outlayer.appended(i);
      }),
      (t.checkLastPage = function (t, e) {
        var i = this.options.checkLastPage;
        if (i) {
          var n,
            s = this.options.path;
          if ("function" == typeof s)
            if (!this.getPath()) return void this.lastPageReached(t, e);
          if (
            ("string" == typeof i ? (n = i) : this.isPathSelector && (n = s),
            n && t.querySelector)
          )
            t.querySelector(n) || this.lastPageReached(t, e);
        }
      }),
      (t.lastPageReached = function (t, e) {
        (this.canLoad = !1), this.dispatchEvent("last", null, [t, e]);
      }),
      (t.onPageError = function (t, e) {
        return (
          (this.isLoading = !1),
          (this.canLoad = !1),
          this.dispatchEvent("error", null, [t, e]),
          t
        );
      }),
      (s.create.prefill = function () {
        if (this.options.prefill) {
          var t = this.options.append;
          if (!t)
            return void console.error(
              "append option required for prefill. Set as :" + t
            );
          this.updateMeasurements(),
            this.updateScroller(),
            (this.isPrefilling = !0),
            this.on("append", this.prefill),
            this.once("error", this.stopPrefill),
            this.once("last", this.stopPrefill),
            this.prefill();
        }
      }),
      (t.prefill = function () {
        var t = this.getPrefillDistance();
        (this.isPrefilling = 0 <= t),
          this.isPrefilling
            ? (this.log("prefill"), this.loadNextPage())
            : this.stopPrefill();
      }),
      (t.getPrefillDistance = function () {
        return this.options.elementScroll
          ? this.scroller.clientHeight - this.scroller.scrollHeight
          : this.windowHeight - this.element.clientHeight;
      }),
      (t.stopPrefill = function () {
        this.log("stopPrefill"), this.off("append", this.prefill);
      }),
      s
    );
  }),
  (function (i, n) {
    "function" == typeof define && define.amd
      ? define(
          "infinite-scroll/js/scroll-watch",
          ["./core", "fizzy-ui-utils/utils"],
          function (t, e) {
            return n(i, t, e);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = n(i, require("./core"), require("fizzy-ui-utils")))
      : n(i, i.InfiniteScroll, i.fizzyUIUtils);
  })(window, function (i, t, e) {
    var n = t.prototype;
    return (
      (t.defaults.scrollThreshold = 400),
      (t.create.scrollWatch = function () {
        (this.pageScrollHandler = this.onPageScroll.bind(this)),
          (this.resizeHandler = this.onResize.bind(this));
        var t = this.options.scrollThreshold;
        (!t && 0 !== t) || this.enableScrollWatch();
      }),
      (t.destroy.scrollWatch = function () {
        this.disableScrollWatch();
      }),
      (n.enableScrollWatch = function () {
        this.isScrollWatching ||
          ((this.isScrollWatching = !0),
          this.updateMeasurements(),
          this.updateScroller(),
          this.on("last", this.disableScrollWatch),
          this.bindScrollWatchEvents(!0));
      }),
      (n.disableScrollWatch = function () {
        this.isScrollWatching &&
          (this.bindScrollWatchEvents(!1), delete this.isScrollWatching);
      }),
      (n.bindScrollWatchEvents = function (t) {
        var e = t ? "addEventListener" : "removeEventListener";
        this.scroller[e]("scroll", this.pageScrollHandler),
          i[e]("resize", this.resizeHandler);
      }),
      (n.onPageScroll = t.throttle(function () {
        this.getBottomDistance() <= this.options.scrollThreshold &&
          this.dispatchEvent("scrollThreshold");
      })),
      (n.getBottomDistance = function () {
        return this.options.elementScroll
          ? this.getElementBottomDistance()
          : this.getWindowBottomDistance();
      }),
      (n.getWindowBottomDistance = function () {
        return (
          this.top +
          this.element.clientHeight -
          (i.pageYOffset + this.windowHeight)
        );
      }),
      (n.getElementBottomDistance = function () {
        return (
          this.scroller.scrollHeight -
          (this.scroller.scrollTop + this.scroller.clientHeight)
        );
      }),
      (n.onResize = function () {
        this.updateMeasurements();
      }),
      e.debounceMethod(t, "onResize", 150),
      t
    );
  }),
  (function (i, n) {
    "function" == typeof define && define.amd
      ? define(
          "infinite-scroll/js/history",
          ["./core", "fizzy-ui-utils/utils"],
          function (t, e) {
            return n(i, t, e);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = n(i, require("./core"), require("fizzy-ui-utils")))
      : n(i, i.InfiniteScroll, i.fizzyUIUtils);
  })(window, function (n, t, e) {
    var i = t.prototype;
    t.defaults.history = "replace";
    var o = document.createElement("a");
    return (
      (t.create.history = function () {
        if (this.options.history)
          return (
            (o.href = this.getAbsolutePath()),
            (o.origin || o.protocol + "//" + o.host) == location.origin
              ? void (this.options.append
                  ? this.createHistoryAppend()
                  : this.createHistoryPageLoad())
              : void console.error(
                  "[InfiniteScroll] cannot set history with different origin: " +
                    o.origin +
                    " on " +
                    location.origin +
                    " . History behavior disabled."
                )
          );
      }),
      (i.createHistoryAppend = function () {
        this.updateMeasurements(),
          this.updateScroller(),
          (this.scrollPages = [
            { top: 0, path: location.href, title: document.title },
          ]),
          (this.scrollPageIndex = 0),
          (this.scrollHistoryHandler = this.onScrollHistory.bind(this)),
          (this.unloadHandler = this.onUnload.bind(this)),
          this.scroller.addEventListener("scroll", this.scrollHistoryHandler),
          this.on("append", this.onAppendHistory),
          this.bindHistoryAppendEvents(!0);
      }),
      (i.bindHistoryAppendEvents = function (t) {
        var e = t ? "addEventListener" : "removeEventListener";
        this.scroller[e]("scroll", this.scrollHistoryHandler),
          n[e]("unload", this.unloadHandler);
      }),
      (i.createHistoryPageLoad = function () {
        this.on("load", this.onPageLoadHistory);
      }),
      (t.destroy.history = i.destroyHistory =
        function () {
          this.options.history &&
            this.options.append &&
            this.bindHistoryAppendEvents(!1);
        }),
      (i.onAppendHistory = function (t, e, i) {
        if (i && i.length) {
          var n = i[0],
            s = this.getElementScrollY(n);
          (o.href = e),
            this.scrollPages.push({ top: s, path: o.href, title: t.title });
        }
      }),
      (i.getElementScrollY = function (t) {
        return this.options.elementScroll
          ? this.getElementElementScrollY(t)
          : this.getElementWindowScrollY(t);
      }),
      (i.getElementWindowScrollY = function (t) {
        return t.getBoundingClientRect().top + n.pageYOffset;
      }),
      (i.getElementElementScrollY = function (t) {
        return t.offsetTop - this.top;
      }),
      (i.onScrollHistory = function () {
        for (
          var t, e, i = this.getScrollViewY(), n = 0;
          n < this.scrollPages.length;
          n++
        ) {
          var s = this.scrollPages[n];
          if (s.top >= i) break;
          (t = n), (e = s);
        }
        t != this.scrollPageIndex &&
          ((this.scrollPageIndex = t), this.setHistory(e.title, e.path));
      }),
      e.debounceMethod(t, "onScrollHistory", 150),
      (i.getScrollViewY = function () {
        return this.options.elementScroll
          ? this.scroller.scrollTop + this.scroller.clientHeight / 2
          : n.pageYOffset + this.windowHeight / 2;
      }),
      (i.setHistory = function (t, e) {
        var i = this.options.history;
        i &&
          history[i + "State"] &&
          (history[i + "State"](null, t, e),
          this.options.historyTitle && (document.title = t),
          this.dispatchEvent("history", null, [t, e]));
      }),
      (i.onUnload = function () {
        var t = this.scrollPageIndex;
        if (0 !== t) {
          var e = this.scrollPages[t],
            i = n.pageYOffset - e.top + this.top;
          this.destroyHistory(), scrollTo(0, i);
        }
      }),
      (i.onPageLoadHistory = function (t, e) {
        this.setHistory(t.title, e);
      }),
      t
    );
  }),
  (function (i, n) {
    "function" == typeof define && define.amd
      ? define(
          "infinite-scroll/js/button",
          ["./core", "fizzy-ui-utils/utils"],
          function (t, e) {
            return n(i, t, e);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = n(i, require("./core"), require("fizzy-ui-utils")))
      : n(i, i.InfiniteScroll, i.fizzyUIUtils);
  })(window, function (t, e, i) {
    function n(t, e) {
      (this.element = t),
        (this.infScroll = e),
        (this.clickHandler = this.onClick.bind(this)),
        this.element.addEventListener("click", this.clickHandler),
        e.on("request", this.disable.bind(this)),
        e.on("load", this.enable.bind(this)),
        e.on("error", this.hide.bind(this)),
        e.on("last", this.hide.bind(this));
    }
    return (
      (e.create.button = function () {
        var t = i.getQueryElement(this.options.button);
        t && (this.button = new n(t, this));
      }),
      (e.destroy.button = function () {
        this.button && this.button.destroy();
      }),
      (n.prototype.onClick = function (t) {
        t.preventDefault(), this.infScroll.loadNextPage();
      }),
      (n.prototype.enable = function () {
        this.element.removeAttribute("disabled");
      }),
      (n.prototype.disable = function () {
        this.element.disabled = "disabled";
      }),
      (n.prototype.hide = function () {
        this.element.style.display = "none";
      }),
      (n.prototype.destroy = function () {
        this.element.removeEventListener("click", this.clickHandler);
      }),
      (e.Button = n),
      e
    );
  }),
  (function (i, n) {
    "function" == typeof define && define.amd
      ? define(
          "infinite-scroll/js/status",
          ["./core", "fizzy-ui-utils/utils"],
          function (t, e) {
            return n(i, t, e);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = n(i, require("./core"), require("fizzy-ui-utils")))
      : n(i, i.InfiniteScroll, i.fizzyUIUtils);
  })(window, function (t, e, i) {
    function n(t) {
      o(t, "none");
    }
    function s(t) {
      o(t, "block");
    }
    function o(t, e) {
      t && (t.style.display = e);
    }
    var r = e.prototype;
    return (
      (e.create.status = function () {
        var t = i.getQueryElement(this.options.status);
        t &&
          ((this.statusElement = t),
          (this.statusEventElements = {
            request: t.querySelector(".infinite-scroll-request"),
            error: t.querySelector(".infinite-scroll-error"),
            last: t.querySelector(".infinite-scroll-last"),
          }),
          this.on("request", this.showRequestStatus),
          this.on("error", this.showErrorStatus),
          this.on("last", this.showLastStatus),
          this.bindHideStatus("on"));
      }),
      (r.bindHideStatus = function (t) {
        var e = this.options.append ? "append" : "load";
        this[t](e, this.hideAllStatus);
      }),
      (r.showRequestStatus = function () {
        this.showStatus("request");
      }),
      (r.showErrorStatus = function () {
        this.showStatus("error");
      }),
      (r.showLastStatus = function () {
        this.showStatus("last"), this.bindHideStatus("off");
      }),
      (r.showStatus = function (t) {
        s(this.statusElement),
          this.hideStatusEventElements(),
          s(this.statusEventElements[t]);
      }),
      (r.hideAllStatus = function () {
        n(this.statusElement), this.hideStatusEventElements();
      }),
      (r.hideStatusEventElements = function () {
        for (var t in this.statusEventElements) {
          n(this.statusEventElements[t]);
        }
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          [
            "infinite-scroll/js/core",
            "infinite-scroll/js/page-load",
            "infinite-scroll/js/scroll-watch",
            "infinite-scroll/js/history",
            "infinite-scroll/js/button",
            "infinite-scroll/js/status",
          ],
          e
        )
      : "object" == typeof module &&
        module.exports &&
        (module.exports = e(
          require("./core"),
          require("./page-load"),
          require("./scroll-watch"),
          require("./history"),
          require("./button"),
          require("./status")
        ));
  })(window, function (t) {
    return t;
  }),
  (function (e, i) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "imagesloaded/imagesloaded",
          ["ev-emitter/ev-emitter"],
          function (t) {
            return i(e, t);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = i(e, require("ev-emitter")))
      : (e.imagesLoaded = i(e, e.EvEmitter));
  })("undefined" != typeof window ? window : this, function (e, t) {
    function s(t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }
    function o(t, e, i) {
      if (!(this instanceof o)) return new o(t, e, i);
      var n = t;
      return (
        "string" == typeof t && (n = document.querySelectorAll(t)),
        n
          ? ((this.elements = (function (t) {
              return Array.isArray(t)
                ? t
                : "object" == typeof t && "number" == typeof t.length
                ? l.call(t)
                : [t];
            })(n)),
            (this.options = s({}, this.options)),
            "function" == typeof e ? (i = e) : s(this.options, e),
            i && this.on("always", i),
            this.getImages(),
            r && (this.jqDeferred = new r.Deferred()),
            void setTimeout(this.check.bind(this)))
          : void a.error("Bad element for imagesLoaded " + (n || t))
      );
    }
    function i(t) {
      this.img = t;
    }
    function n(t, e) {
      (this.url = t), (this.element = e), (this.img = new Image());
    }
    var r = e.jQuery,
      a = e.console,
      l = Array.prototype.slice;
    ((o.prototype = Object.create(t.prototype)).options = {}),
      (o.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (o.prototype.addElementImages = function (t) {
        "IMG" == t.nodeName && this.addImage(t),
          !0 === this.options.background && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && h[e]) {
          for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
            var s = i[n];
            this.addImage(s);
          }
          if ("string" == typeof this.options.background) {
            var o = t.querySelectorAll(this.options.background);
            for (n = 0; n < o.length; n++) {
              var r = o[n];
              this.addElementBackgroundImages(r);
            }
          }
        }
      });
    var h = { 1: !0, 9: !0, 11: !0 };
    return (
      (o.prototype.addElementBackgroundImages = function (t) {
        var e = getComputedStyle(t);
        if (e)
          for (
            var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage);
            null !== n;

          ) {
            var s = n && n[2];
            s && this.addBackground(s, t), (n = i.exec(e.backgroundImage));
          }
      }),
      (o.prototype.addImage = function (t) {
        var e = new i(t);
        this.images.push(e);
      }),
      (o.prototype.addBackground = function (t, e) {
        var i = new n(t, e);
        this.images.push(i);
      }),
      (o.prototype.check = function () {
        function e(t, e, i) {
          setTimeout(function () {
            n.progress(t, e, i);
          });
        }
        var n = this;
        return (
          (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? void this.images.forEach(function (t) {
                t.once("progress", e), t.check();
              })
            : void this.complete()
        );
      }),
      (o.prototype.progress = function (t, e, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
          this.emitEvent("progress", [this, t, e]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, t),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && a && a.log("progress: " + i, t, e);
      }),
      (o.prototype.complete = function () {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
          this.emitEvent(t, [this]),
          this.emitEvent("always", [this]),
          this.jqDeferred)
        ) {
          var e = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[e](this);
        }
      }),
      ((i.prototype = Object.create(t.prototype)).check = function () {
        return this.getIsImageComplete()
          ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            void (this.proxyImage.src = this.img.src));
      }),
      (i.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth;
      }),
      (i.prototype.confirm = function (t, e) {
        (this.isLoaded = t), this.emitEvent("progress", [this, this.img, e]);
      }),
      (i.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (i.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (i.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (i.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      ((n.prototype = Object.create(i.prototype)).check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url),
          this.getIsImageComplete() &&
            (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
            this.unbindEvents());
      }),
      (n.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (n.prototype.confirm = function (t, e) {
        (this.isLoaded = t),
          this.emitEvent("progress", [this, this.element, e]);
      }),
      (o.makeJQueryPlugin = function (t) {
        (t = t || e.jQuery) &&
          ((r = t).fn.imagesLoaded = function (t, e) {
            return new o(this, t, e).jqDeferred.promise(r(this));
          });
      }),
      o.makeJQueryPlugin(),
      o
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(["flickity/js/index", "fizzy-ui-utils/utils"], e)
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("flickity"), require("fizzy-ui-utils")))
      : e(t.Flickity, t.fizzyUIUtils);
  })(this, function (t, a) {
    var e = t.Slide,
      s = e.prototype.updateTarget;
    (e.prototype.updateTarget = function () {
      if ((s.apply(this, arguments), this.parent.options.fade)) {
        var i = this.target - this.x,
          n = this.cells[0].x;
        this.cells.forEach(function (t) {
          var e = t.x - n - i;
          t.renderPosition(e);
        });
      }
    }),
      (e.prototype.setOpacity = function (e) {
        this.cells.forEach(function (t) {
          t.element.style.opacity = e;
        });
      });
    var i = t.prototype;
    t.createMethods.push("_createFade"),
      (i._createFade = function () {
        (this.fadeIndex = this.selectedIndex),
          (this.prevSelectedIndex = this.selectedIndex),
          this.on("select", this.onSelectFade),
          this.on("dragEnd", this.onDragEndFade),
          this.on("settle", this.onSettleFade),
          this.on("activate", this.onActivateFade),
          this.on("deactivate", this.onDeactivateFade);
      });
    var n = i.updateSlides;
    (i.updateSlides = function () {
      n.apply(this, arguments),
        this.options.fade &&
          this.slides.forEach(function (t, e) {
            var i = e == this.selectedIndex ? 1 : 0;
            t.setOpacity(i);
          }, this);
    }),
      (i.onSelectFade = function () {
        (this.fadeIndex = Math.min(
          this.prevSelectedIndex,
          this.slides.length - 1
        )),
          (this.prevSelectedIndex = this.selectedIndex);
      }),
      (i.onSettleFade = function () {
        delete this.didDragEnd,
          this.options.fade &&
            (this.selectedSlide.setOpacity(1),
            this.slides[this.fadeIndex] &&
              this.fadeIndex != this.selectedIndex &&
              this.slides[this.fadeIndex].setOpacity(0));
      }),
      (i.onDragEndFade = function () {
        this.didDragEnd = !0;
      }),
      (i.onActivateFade = function () {
        this.options.fade && this.element.classList.add("is-fade");
      }),
      (i.onDeactivateFade = function () {
        this.options.fade &&
          (this.element.classList.remove("is-fade"),
          this.slides.forEach(function (t) {
            t.setOpacity("");
          }));
      });
    var o = i.positionSlider;
    i.positionSlider = function () {
      this.options.fade
        ? (this.fadeSlides(), this.dispatchScrollEvent())
        : o.apply(this, arguments);
    };
    var r = i.positionSliderAtSelected;
    (i.positionSliderAtSelected = function () {
      this.options.fade && this.setTranslateX(0), r.apply(this, arguments);
    }),
      (i.fadeSlides = function () {
        if (!(this.slides.length < 2)) {
          var t = this.getFadeIndexes(),
            e = this.slides[t.a],
            i = this.slides[t.b],
            n = this.wrapDifference(e.target, i.target),
            s = this.wrapDifference(e.target, -this.x);
          (s /= n), e.setOpacity(1 - s), i.setOpacity(s);
          var o = t.a;
          this.isDragging && (o = 0.5 < s ? t.a : t.b),
            null != this.fadeHideIndex &&
              this.fadeHideIndex != o &&
              this.fadeHideIndex != t.a &&
              this.fadeHideIndex != t.b &&
              this.slides[this.fadeHideIndex].setOpacity(0),
            (this.fadeHideIndex = o);
        }
      }),
      (i.getFadeIndexes = function () {
        return this.isDragging || this.didDragEnd
          ? this.options.wrapAround
            ? this.getFadeDragWrapIndexes()
            : this.getFadeDragLimitIndexes()
          : { a: this.fadeIndex, b: this.selectedIndex };
      }),
      (i.getFadeDragWrapIndexes = function () {
        var t = this.slides.map(function (t, e) {
            return this.getSlideDistance(-this.x, e);
          }, this),
          e = t.map(function (t) {
            return Math.abs(t);
          }),
          i = Math.min.apply(Math, e),
          n = e.indexOf(i),
          s = t[n],
          o = this.slides.length,
          r = 0 <= s ? 1 : -1;
        return { a: n, b: a.modulo(n + r, o) };
      }),
      (i.getFadeDragLimitIndexes = function () {
        for (var t = 0, e = 0; e < this.slides.length - 1; e++) {
          var i = this.slides[e];
          if (-this.x < i.target) break;
          t = e;
        }
        return { a: t, b: t + 1 };
      }),
      (i.wrapDifference = function (t, e) {
        var i = e - t;
        if (!this.options.wrapAround) return i;
        var n = i + this.slideableWidth,
          s = i - this.slideableWidth;
        return (
          Math.abs(n) < Math.abs(i) && (i = n),
          Math.abs(s) < Math.abs(i) && (i = s),
          i
        );
      });
    var l = i._getWrapShiftCells;
    i._getWrapShiftCells = function () {
      this.options.fade || l.apply(this, arguments);
    };
    var h = i.shiftWrapCells;
    return (
      (i.shiftWrapCells = function () {
        this.options.fade || h.apply(this, arguments);
      }),
      t
    );
  }),
  (Flickity.prototype._createResizeClass = function () {
    var t = this.element;
    setTimeout(function () {
      t.classList.add("flickity-resize");
    });
  }),
  Flickity.createMethods.push("_createResizeClass");
var resize = Flickity.prototype.resize;
(Flickity.prototype.resize = function () {
  this.element.classList.remove("flickity-resize"),
    resize.call(this),
    this.element.classList.add("flickity-resize");
}),
  jQuery(document).ready(function (s) {
    s(".hamburger").on("click", function (t) {
      t.preventDefault(),
        s(this).toggleClass("is-active"),
        s("html, body").toggleClass("is-noscroll is-open-menu"),
        s("#main-nav").toggleClass("is-open-menu");
    }),
      s(".main-nav .menu-item-has-children > a").on("click", function (t) {
        t.preventDefault(), t.stopPropagation();
        var e = s(this),
          i = e.parent();
        e.parent().hasClass("open-submenu")
          ? (e.parent().removeClass("open-submenu current-open-menu"),
            e.closest(".open-submenu").addClass("current-open-menu"))
          : (s(".main-nav .open-submenu").removeClass(
              "open-submenu current-open-menu"
            ),
            e.parents(".menu-item-has-children").addClass("open-submenu"),
            i.addClass("current-open-menu"));
      });
    var n = {
      accessibility: !1,
      autoPlay: !0,
      autoPlay: 3e3,
      cellAlign: "center",
      cellSelector: ".slideshow-slide",
      contain: !0,
      draggable: ">1",
      imagesLoaded: !0,
      fade: !0,
      pageDots: !1,
      prevNextButtons: !0,
    };
    s(".slideshow").each(function (t) {
      var e = n,
        i = s(this).data("flickity-options");
      void 0 !== i && (e = s.extend({}, n, i));
      s(this).flickity(e);
    }),
      s(document).on("click", ".tabs-link", function (t) {
        t.preventDefault();
        var e = s(this),
          i = e.closest(".tabs"),
          n = e.attr("href");
        i.find(".is-active").removeClass("is-active"),
          e.addClass("is-active"),
          s(n).addClass("is-active");
      }),
      s("#infinite-scroll").infiniteScroll({
        path: ".nextpostslink",
        append: ".infinite-item",
        history: !1,
        checkLastPage: !0,
        hideNav: ".pagination",
        status: ".page-load-status",
      });
  });
