!(function (e) {
  function d(e) {
    return void 0 === e ? 0 : Number(e);
  }
  function g(e, t) {
    return !(e === t || (isNaN(e) && isNaN(t)));
  }
  e.DOMRect = function (e, t, n, i) {
    var u,
      r,
      o,
      c,
      f = d(e),
      a = d(t),
      m = d(n),
      b = d(i);
    Object.defineProperties(this, {
      x: {
        get: function () {
          return f;
        },
        set: function (e) {
          g(f, e) && ((f = e), (u = r = void 0));
        },
        enumerable: !0,
      },
      y: {
        get: function () {
          return a;
        },
        set: function (e) {
          g(a, e) && ((a = e), (o = c = void 0));
        },
        enumerable: !0,
      },
      width: {
        get: function () {
          return m;
        },
        set: function (e) {
          g(m, e) && ((m = e), (u = r = void 0));
        },
        enumerable: !0,
      },
      height: {
        get: function () {
          return b;
        },
        set: function (e) {
          g(b, e) && ((b = e), (o = c = void 0));
        },
        enumerable: !0,
      },
      left: {
        get: function () {
          return (u = void 0 === u ? f + Math.min(0, m) : u);
        },
        enumerable: !0,
      },
      right: {
        get: function () {
          return (r = void 0 === r ? f + Math.max(0, m) : r);
        },
        enumerable: !0,
      },
      top: {
        get: function () {
          return (o = void 0 === o ? a + Math.min(0, b) : o);
        },
        enumerable: !0,
      },
      bottom: {
        get: function () {
          return (c = void 0 === c ? a + Math.max(0, b) : c);
        },
        enumerable: !0,
      },
    });
  };
})(this);
