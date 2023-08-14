(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [410],
  {
    4053: function (a, b, c) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/sate-holders",
        function () {
          return c(6523);
        },
      ]);
    },
    6523: function (a, b, c) {
      "use strict";
      c.r(b),
        c.d(b, {
          default: function () {
            return u;
          },
        });
      var d = c(7568),
        e = c(4051),
        f = c.n(e),
        g = c(5893),
        h = c(7294);
      c(9008), c(5675), c(1664);
      var i = c(7013),
        j = c.n(i),
        k = c(9250);
      c(1163);
      var l = c(9669),
        m = c.n(l);
      c(129);
      var n = c(9473),
        o = c(7918),
        p = c.n(o),
        q = c(5486),
        r = c(1645),
        s = c(7867),
        t = c(1345);
      function u() {
        var a = (0, t.Ge)(),
          b = (a.active, a.account, a.library, a.connector, a.activate);
        a.deactivate;
        var e = new (p())(p().givenProvider),
          i = new e.eth.Contract(
            q,
            "0xB31B9CE29F3f6E7C45804937C6141bD6dA369Bdc"
          ),
          l = (0, n.oR)(),
          o = (0, n.v9)(function (a) {
            return a;
          }),
          u = (0, h.useState)(r),
          v = u[0];
        u[1];
        var w = (0, h.useState)(798070),
          x = w[0];
        w[1];
        var y = (0, h.useState)([]),
          z = y[0],
          A = y[1],
          B = c(4648),
          C = v.map(function (a) {
            return B(a);
          }),
          D = c(2162).MerkleTree;
        c(6614).YW, c(5982).default;
        var E = new D(C, B, { sortPairs: !0 });
        E.getRoot().toString("hex");
        var F,
          G = (0, n.I0)(),
          H = [];
        function I() {
          return J.apply(this, arguments);
        }
        function J() {
          return (J = (0, d.Z)(
            f().mark(function a() {
              return f().wrap(function (a) {
                for (;;)
                  switch ((a.prev = a.next)) {
                    case 0:
                      return (
                        (a.next = 2),
                        i.methods
                          .getUserRecords()
                          .call()
                          .then(function (a) {
                            A(a);
                          })
                      );
                    case 2:
                    case "end":
                      return a.stop();
                  }
              }, a);
            })
          )).apply(this, arguments);
        }
        (0, d.Z)(
          f().mark(function a(b) {
            var c;
            return f().wrap(function (a) {
              for (;;)
                switch ((a.prev = a.next)) {
                  case 0:
                    c = 0;
                  case 1:
                    if (!(c < 43)) {
                      a.next = 7;
                      break;
                    }
                    return (
                      (a.next = 4),
                      m()
                        .get(
                          "https://unisat.io/brc20-api-v2/brc20/sats/holders?start=".concat(
                            500 * c,
                            "&limit=500"
                          ),
                          {
                            headers: {
                              "Content-type":
                                "application/x-www-form-urlencoded;charset=utf-8",
                            },
                          }
                        )
                        .then(function (a) {
                          (H = H.concat(a.data.data.detail)),
                            42 == c && console.log(H);
                        })
                        .catch(function (a) {})
                    );
                  case 4:
                    c++, (a.next = 1);
                    break;
                  case 7:
                  case "end":
                    return a.stop();
                }
            }, a);
          })
        ),
          (0, h.useEffect)(function () {
            window &&
              window.ethereum &&
              G((0, s.ks)(window.ethereum.networkVersion)),
              l.getState().user.network == l.getState().user.networkPrd && I();
          }, []);
        var K = function (a, b) {
            if (!l.getState().user.brcUserInfo) {
              G(
                (0, s.q1)({
                  type: "warning",
                  msg: "Please link BRC wallet first",
                })
              );
              return;
            }
            window.ethereum
              ? e.eth.net.getId().then(function (c) {
                  c == l.getState().user.networkPrd
                    ? (M(a, b), s.ks, G((0, s.ks)(c)))
                    : L(l.getState().user.networkPrd, a, b);
                })
              : G(
                  (0, s.q1)({
                    type: "warning",
                    msg: "Your browser does not support connected wallets",
                  })
                );
          },
          L = function (a, b, c) {
            window.ethereum
              .request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: p().utils.numberToHex(a) }],
              })
              .then(function (a) {
                K(b, c);
              })
              .catch(function (a) {});
          };
        function M(a, b) {
          return N.apply(this, arguments);
        }
        function N() {
          return (N = (0, d.Z)(
            f().mark(function a(c, d) {
              var e;
              return f().wrap(
                function (a) {
                  for (;;)
                    switch ((a.prev = a.next)) {
                      case 0:
                        if (l.getState().user.brcUserInfo) {
                          a.next = 3;
                          break;
                        }
                        return (
                          G(
                            (0, s.q1)({
                              type: "warning",
                              msg: "Please link Erc wallet first",
                            })
                          ),
                          a.abrupt("return")
                        );
                      case 3:
                        if (
                          (c.stopPropagation(), (a.prev = 4), "MetaMask" != d)
                        ) {
                          a.next = 13;
                          break;
                        }
                        return (
                          (a.next = 8),
                          ethereum.request({ method: "eth_requestAccounts" })
                        );
                      case 8:
                        (e = a.sent),
                          G((0, s.Jj)(e[0])),
                          localStorage.setItem("ercDisconnect", !1),
                          (a.next = 15);
                        break;
                      case 13:
                        return (a.next = 15), b(walletConnect);
                      case 15:
                        a.next = 20;
                        break;
                      case 17:
                        (a.prev = 17), (a.t0 = a.catch(4)), console.log(a.t0);
                      case 20:
                      case "end":
                        return a.stop();
                    }
                },
                a,
                null,
                [[4, 17]]
              );
            })
          )).apply(this, arguments);
        }
        function O() {
          return (O = (0, d.Z)(
            f().mark(function a(b) {
              var c, g, h, j, k;
              return f().wrap(function (a) {
                for (;;)
                  switch ((a.prev = a.next)) {
                    case 0:
                      return (
                        (c = B(l.getState().user.brcUserInfo)),
                        (g = E.getHexProof(c)),
                        (a.next = 4),
                        i.methods
                          .validateBrcAddress(e.utils.toHex(c), g)
                          .call()
                          .then(function (a) {
                            return a;
                          })
                      );
                    case 4:
                      if (!(h = a.sent)) {
                        a.next = 15;
                        break;
                      }
                      return (
                        (a.next = 8),
                        i.methods
                          .hasBrcGet(l.getState().user.brcUserInfo)
                          .call()
                          .then(function (a) {
                            return a;
                          })
                      );
                    case 8:
                      return (
                        (j = a.sent),
                        (a.next = 11),
                        i.methods
                          .hasErcGet(l.getState().user.ercUserInfo)
                          .call()
                          .then(function (a) {
                            return a;
                          })
                      );
                    case 11:
                      (k = a.sent),
                        j || k
                          ? G(
                              (0, s.q1)({
                                type: "warning",
                                msg: "You've already received the airdrop",
                              })
                            )
                          : (G(
                              (0, s.nQ)({
                                state: !0,
                                msg: "Please wait while the contract is being processed",
                              })
                            ),
                            i.methods
                              .getDrop(
                                l.getState().user.brcUserInfo,
                                e.utils.toHex(c),
                                g
                              )
                              .send({ from: l.getState().user.ercUserInfo })
                              .then(
                                (function () {
                                  var a = (0, d.Z)(
                                    f().mark(function a(b) {
                                      return f().wrap(function (a) {
                                        for (;;)
                                          switch ((a.prev = a.next)) {
                                            case 0:
                                              return (a.next = 2), I();
                                            case 2:
                                              G((0, s.nQ)(null));
                                            case 3:
                                            case "end":
                                              return a.stop();
                                          }
                                      }, a);
                                    })
                                  );
                                  return function (b) {
                                    return a.apply(this, arguments);
                                  };
                                })()
                              )
                              .catch(
                                (function () {
                                  var a = (0, d.Z)(
                                    f().mark(function a(b) {
                                      return f().wrap(function (a) {
                                        for (;;)
                                          switch ((a.prev = a.next)) {
                                            case 0:
                                              return (
                                                console.log(b),
                                                (a.next = 3),
                                                I()
                                              );
                                            case 3:
                                              G((0, s.nQ)(null));
                                            case 4:
                                            case "end":
                                              return a.stop();
                                          }
                                      }, a);
                                    })
                                  );
                                  return function (b) {
                                    return a.apply(this, arguments);
                                  };
                                })()
                              )),
                        (a.next = 16);
                      break;
                    case 15:
                      G(
                        (0, s.q1)({
                          type: "warning",
                          msg: "I'm sorry you're not on the white list",
                        })
                      );
                    case 16:
                    case "end":
                      return a.stop();
                  }
              }, a);
            })
          )).apply(this, arguments);
        }
        return (0, g.jsx)(k.Z, {
          children: (0, g.jsxs)("div", {
            className: j().index,
            children: [
              (0, g.jsx)("div", {
                className: "box",
                children: (0, g.jsxs)("div", {
                  className: "content",
                  children: [
                    "Hint: based on snapshot data of block height [",
                    x,
                    "].",
                  ],
                }),
              }),
              o.user.brcUserInfo
                ? (0, g.jsxs)("div", {
                    className: "box",
                    children: [
                      (0, g.jsx)("div", {
                        className: "title",
                        children: (0, g.jsxs)("ul", {
                          className: "tab_nav",
                          children: [
                            (0, g.jsx)("li", { children: "Your Address" }),
                            (0, g.jsx)("li", { children: "You Win" }),
                            (0, g.jsx)("li", {}),
                          ],
                        }),
                      }),
                      (0, g.jsx)("div", {
                        className: "content ".concat(j().belief_box),
                        children: (0, g.jsx)("div", {
                          className: "tab_box",
                          children: (0, g.jsxs)("ul", {
                            children: [
                              (0, g.jsx)("li", {
                                children: ""
                                  .concat(
                                    o.user.brcUserInfo.slice(0, 10),
                                    "...."
                                  )
                                  .concat(
                                    o.user.brcUserInfo.slice(
                                      o.user.brcUserInfo.length - 10,
                                      o.user.brcUserInfo.length
                                    )
                                  ),
                              }),
                              o.user.whiteListLoading
                                ? (0, g.jsxs)("li", {
                                    children: [
                                      (0, g.jsx)("img", {
                                        src: "images/loading.gif",
                                        className: "loading-line",
                                      }),
                                      "Just a moment...",
                                    ],
                                  })
                                : (0, g.jsx)("li", {
                                    children: o.user.isWhiteListUser
                                      ? "1200,000,000,000 Sats"
                                      : "You're not on the white list",
                                  }),
                              o.user.isWhiteListUser ||
                              o.user.whiteListLoading ||
                              o.user.addressStateLoading
                                ? ""
                                : (0, g.jsx)("li", { children: "You not win" }),
                              !o.user.isWhiteListUser ||
                              o.user.whiteListLoading ||
                              o.user.addressStateLoading
                                ? (0, g.jsxs)("li", {
                                    children: [
                                      (0, g.jsx)("img", {
                                        src: "images/loading.gif",
                                        className: "loading-line",
                                      }),
                                      "Just a moment...",
                                    ],
                                  })
                                : (0, g.jsx)("li", {
                                    children: o.user.ercUserInfo
                                      ? o.user.brcUserCliam
                                        ? (0, g.jsx)("button", {
                                            className: "btn ".concat(
                                              -1 !=
                                                z.findIndex(function (a) {
                                                  return (
                                                    a.brc == o.user.brcUserInfo
                                                  );
                                                })
                                                ? "green"
                                                : ""
                                            ),
                                            onClick: function (a) {
                                              return (function (a) {
                                                return O.apply(this, arguments);
                                              })(o.user.ercUserInfo);
                                            },
                                            children:
                                              -1 !=
                                              z.findIndex(function (a) {
                                                return (
                                                  a.brc == o.user.brcUserInfo
                                                );
                                              })
                                                ? "verify"
                                                : "Claim",
                                          })
                                        : (0, g.jsxs)("span", {
                                            children: [
                                              "Please choose another MetaMask address",
                                              (0, g.jsx)("i", {
                                                className:
                                                  "iconfont icon-tixingshixin",
                                                children: (0, g.jsx)("label", {
                                                  className: "tips",
                                                  children:
                                                    "Each Metamask address can only claim the airdrop once. Please click the 'Connect BSC' button in the top right corner to switch to an address that has not received the airdrop yet for claiming.",
                                                }),
                                              }),
                                            ],
                                          })
                                      : (0, g.jsx)("button", {
                                          className: "btn",
                                          onClick: function (a) {
                                            return K(a, "MetaMask");
                                          },
                                          children: "Connect BSC",
                                        }),
                                  }),
                            ],
                          }),
                        }),
                      }),
                    ],
                  })
                : "",
              (0, g.jsxs)("div", {
                className: "box",
                children: [
                  (0, g.jsx)("div", {
                    className: "title",
                    children: (0, g.jsxs)("ul", {
                      className: "tab_nav",
                      children: [
                        (0, g.jsx)("li", { children: "Address" }),
                        (0, g.jsx)("li", { children: "Value" }),
                        (0, g.jsxs)("li", {
                          children: [z.length, " / ", v.length],
                        }),
                      ],
                    }),
                  }),
                  (0, g.jsx)("div", {
                    className: "content ".concat(j().belief_box),
                    children: (0, g.jsx)("div", {
                      className: "tab_box",
                      children: v.map(function (a, b) {
                        return (0, g.jsxs)(
                          "ul",
                          {
                            children: [
                              (0, g.jsx)("li", {
                                children: ""
                                  .concat(a.slice(0, 10), "....")
                                  .concat(a.slice(a.length - 10, a.length)),
                              }),
                              (0, g.jsx)("li", {
                                children: "1200,000,000,000 Sats",
                              }),
                              (0, g.jsx)("li", {
                                children:
                                  -1 !=
                                  z.findIndex(function (b) {
                                    return b.brc == a;
                                  })
                                    ? (0, g.jsx)("p", {
                                        className: "state success",
                                        children: (0, g.jsxs)("button", {
                                          className: "btn small green",
                                          children: [
                                            (0, g.jsx)("i", {
                                              className:
                                                "iconfont icon-24gl-receipt",
                                            }),
                                            "verify",
                                          ],
                                        }),
                                      })
                                    : (0, g.jsx)("p", {
                                        className: "state",
                                        children: (0, g.jsx)("i", {
                                          className: "iconfont icon-daiqueren",
                                        }),
                                      }),
                              }),
                            ],
                          },
                          a + b
                        );
                      }),
                    }),
                  }),
                ],
              }),
            ],
          }),
        });
      }
    },
    7013: function (a) {
      a.exports = {
        index: "holders_index__vLfGS",
        belief_box: "holders_belief_box__UGasA",
        belief: "holders_belief__4DIDt",
        beginning: "holders_beginning__BVxho",
        float_left: "holders_float_left__Dayjg",
        float_right: "holders_float_right__IwSCF",
        prospect: "holders_prospect__ZYGWq",
        echarts_content: "holders_echarts_content__ik3U7",
        road_map: "holders_road_map__zSMg1",
        footer: "holders_footer__Cc_Im",
        version: "holders_version__2EFJL",
      };
    },
  },
  function (a) {
    a.O(0, [108, 247, 774, 888, 179], function () {
      var b;
      return a((a.s = 4053));
    }),
      (_N_E = a.O());
  },
]);
