import { session as rv, app as qn, ipcMain as Pe, dialog as iv, clipboard as av, BrowserWindow as Ng } from "electron";
import { fileURLToPath as ov } from "node:url";
import pt, { resolve as Fl } from "node:path";
import Lg, { promises as Sl } from "node:fs";
import Wi from "fs";
import Mr from "path";
import io from "util";
import Mg from "node:crypto";
import cv from "node:fs/promises";
import $g from "stream";
import sv from "events";
import uv from "buffer";
import dv from "url";
import lv from "os";
let Pg = 0;
function fv() {
  return Pg;
}
function hv(e, t) {
  const n = rv.defaultSession, r = /* @__PURE__ */ new Set();
  if (r.add("http://127.0.0.1:11434"), t && (r.add("http://127.0.0.1:5173"), r.add("http://localhost:5173")), t)
    try {
      const i = new URL(t);
      r.add(`${i.protocol}//${i.host}`);
    } catch {
    }
  n.webRequest.onBeforeRequest((i, a) => {
    const { url: o } = i;
    if (o.startsWith("data:")) return a({ cancel: !1 });
    if (o.startsWith("file:")) return a({ cancel: !1 });
    if (o.startsWith("app:")) return a({ cancel: !1 });
    if (o.startsWith("devtools:")) return a({ cancel: !1 });
    if (t && (o.startsWith("ws:") || o.startsWith("wss:")))
      try {
        const c = new URL(o), u = new URL(t);
        if (c.host === u.host) return a({ cancel: !1 });
      } catch {
      }
    try {
      const c = new URL(o), u = `${c.protocol}//${c.host}`;
      if (t && (c.hostname === "127.0.0.1" || c.hostname === "localhost"))
        return a({ cancel: !1 });
      if (r.has(u))
        return a({ cancel: !1 });
    } catch {
    }
    return Pg += 1, a({ cancel: !0 });
  }), n.setPermissionRequestHandler((i, a, o) => {
    o(!1);
  }), t || n.webRequest.onHeadersReceived((i, a) => {
    const o = [
      "default-src 'self' data: file: app:",
      "img-src 'self' data: file: app: blob:",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "worker-src 'self' blob:",
      "connect-src 'self' http://127.0.0.1:11434"
    ];
    o.push("script-src 'self'");
    const c = o.join("; "), u = {
      ...i.responseHeaders,
      "Content-Security-Policy": [c]
    };
    a({ responseHeaders: u });
  });
}
function pv(e) {
  const t = ["file:", "app:", "http://127.0.0.1:11434"];
  if (e)
    try {
      const n = new URL(e);
      t.push(`${n.protocol}//${n.host}`);
    } catch {
    }
  return t;
}
function X(e, t, n) {
  function r(c, u) {
    var s;
    Object.defineProperty(c, "_zod", {
      value: c._zod ?? {},
      enumerable: !1
    }), (s = c._zod).traits ?? (s.traits = /* @__PURE__ */ new Set()), c._zod.traits.add(e), t(c, u);
    for (const d in o.prototype)
      d in c || Object.defineProperty(c, d, { value: o.prototype[d].bind(c) });
    c._zod.constr = o, c._zod.def = u;
  }
  const i = (n == null ? void 0 : n.Parent) ?? Object;
  class a extends i {
  }
  Object.defineProperty(a, "name", { value: e });
  function o(c) {
    var u;
    const s = n != null && n.Parent ? new a() : this;
    r(s, c), (u = s._zod).deferred ?? (u.deferred = []);
    for (const d of s._zod.deferred)
      d();
    return s;
  }
  return Object.defineProperty(o, "init", { value: r }), Object.defineProperty(o, Symbol.hasInstance, {
    value: (c) => {
      var u, s;
      return n != null && n.Parent && c instanceof n.Parent ? !0 : (s = (u = c == null ? void 0 : c._zod) == null ? void 0 : u.traits) == null ? void 0 : s.has(e);
    }
  }), Object.defineProperty(o, "name", { value: e }), o;
}
class bi extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
const zg = {};
function jn(e) {
  return zg;
}
function gv(e) {
  const t = Object.values(e).filter((r) => typeof r == "number");
  return Object.entries(e).filter(([r, i]) => t.indexOf(+r) === -1).map(([r, i]) => i);
}
function hu(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function qg(e) {
  return {
    get value() {
      {
        const t = e();
        return Object.defineProperty(this, "value", { value: t }), t;
      }
    }
  };
}
function Iu(e) {
  return e == null;
}
function Wu(e) {
  const t = e.startsWith("^") ? 1 : 0, n = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, n);
}
const kl = Symbol("evaluating");
function be(e, t, n) {
  let r;
  Object.defineProperty(e, t, {
    get() {
      if (r !== kl)
        return r === void 0 && (r = kl, r = n()), r;
    },
    set(i) {
      Object.defineProperty(e, t, {
        value: i
        // configurable: true,
      });
    },
    configurable: !0
  });
}
function mv(e) {
  return Object.create(Object.getPrototypeOf(e), Object.getOwnPropertyDescriptors(e));
}
function nr(e, t, n) {
  Object.defineProperty(e, t, {
    value: n,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function $r(...e) {
  const t = {};
  for (const n of e) {
    const r = Object.getOwnPropertyDescriptors(n);
    Object.assign(t, r);
  }
  return Object.defineProperties({}, t);
}
function Bl(e) {
  return JSON.stringify(e);
}
const jg = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {
};
function pu(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const bv = qg(() => {
  var e;
  if (typeof navigator < "u" && ((e = navigator == null ? void 0 : navigator.userAgent) != null && e.includes("Cloudflare")))
    return !1;
  try {
    const t = Function;
    return new t(""), !0;
  } catch {
    return !1;
  }
});
function $a(e) {
  if (pu(e) === !1)
    return !1;
  const t = e.constructor;
  if (t === void 0)
    return !0;
  const n = t.prototype;
  return !(pu(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function Zg(e) {
  return $a(e) ? { ...e } : e;
}
const yv = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function ao(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function rr(e, t, n) {
  const r = new e._zod.constr(t ?? e._zod.def);
  return (!t || n != null && n.parent) && (r._zod.parent = e), r;
}
function ae(e) {
  const t = e;
  if (!t)
    return {};
  if (typeof t == "string")
    return { error: () => t };
  if ((t == null ? void 0 : t.message) !== void 0) {
    if ((t == null ? void 0 : t.error) !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    t.error = t.message;
  }
  return delete t.message, typeof t.error == "string" ? { ...t, error: () => t.error } : t;
}
function vv(e) {
  return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
function Dv(e, t) {
  const n = e._zod.def, r = $r(e._zod.def, {
    get shape() {
      const i = {};
      for (const a in t) {
        if (!(a in n.shape))
          throw new Error(`Unrecognized key: "${a}"`);
        t[a] && (i[a] = n.shape[a]);
      }
      return nr(this, "shape", i), i;
    },
    checks: []
  });
  return rr(e, r);
}
function xv(e, t) {
  const n = e._zod.def, r = $r(e._zod.def, {
    get shape() {
      const i = { ...e._zod.def.shape };
      for (const a in t) {
        if (!(a in n.shape))
          throw new Error(`Unrecognized key: "${a}"`);
        t[a] && delete i[a];
      }
      return nr(this, "shape", i), i;
    },
    checks: []
  });
  return rr(e, r);
}
function _v(e, t) {
  if (!$a(t))
    throw new Error("Invalid input to extend: expected a plain object");
  const n = $r(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t };
      return nr(this, "shape", r), r;
    },
    checks: []
  });
  return rr(e, n);
}
function wv(e, t) {
  const n = $r(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t._zod.def.shape };
      return nr(this, "shape", r), r;
    },
    get catchall() {
      return t._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return rr(e, n);
}
function Tv(e, t, n) {
  const r = $r(t._zod.def, {
    get shape() {
      const i = t._zod.def.shape, a = { ...i };
      if (n)
        for (const o in n) {
          if (!(o in i))
            throw new Error(`Unrecognized key: "${o}"`);
          n[o] && (a[o] = e ? new e({
            type: "optional",
            innerType: i[o]
          }) : i[o]);
        }
      else
        for (const o in i)
          a[o] = e ? new e({
            type: "optional",
            innerType: i[o]
          }) : i[o];
      return nr(this, "shape", a), a;
    },
    checks: []
  });
  return rr(t, r);
}
function Uv(e, t, n) {
  const r = $r(t._zod.def, {
    get shape() {
      const i = t._zod.def.shape, a = { ...i };
      if (n)
        for (const o in n) {
          if (!(o in a))
            throw new Error(`Unrecognized key: "${o}"`);
          n[o] && (a[o] = new e({
            type: "nonoptional",
            innerType: i[o]
          }));
        }
      else
        for (const o in i)
          a[o] = new e({
            type: "nonoptional",
            innerType: i[o]
          });
      return nr(this, "shape", a), a;
    },
    checks: []
  });
  return rr(t, r);
}
function ui(e, t = 0) {
  var n;
  for (let r = t; r < e.issues.length; r++)
    if (((n = e.issues[r]) == null ? void 0 : n.continue) !== !0)
      return !0;
  return !1;
}
function Xg(e, t) {
  return t.map((n) => {
    var r;
    return (r = n).path ?? (r.path = []), n.path.unshift(e), n;
  });
}
function ea(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.message;
}
function Zn(e, t, n) {
  var i, a, o, c, u, s;
  const r = { ...e, path: e.path ?? [] };
  if (!e.message) {
    const d = ea((o = (a = (i = e.inst) == null ? void 0 : i._zod.def) == null ? void 0 : a.error) == null ? void 0 : o.call(a, e)) ?? ea((c = t == null ? void 0 : t.error) == null ? void 0 : c.call(t, e)) ?? ea((u = n.customError) == null ? void 0 : u.call(n, e)) ?? ea((s = n.localeError) == null ? void 0 : s.call(n, e)) ?? "Invalid input";
    r.message = d;
  }
  return delete r.inst, delete r.continue, t != null && t.reportInput || delete r.input, r;
}
function Nu(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function yi(...e) {
  const [t, n, r] = e;
  return typeof t == "string" ? {
    message: t,
    code: "custom",
    input: n,
    inst: r
  } : { ...t };
}
const Vg = (e, t) => {
  e.name = "$ZodError", Object.defineProperty(e, "_zod", {
    value: e._zod,
    enumerable: !1
  }), Object.defineProperty(e, "issues", {
    value: t,
    enumerable: !1
  }), e.message = JSON.stringify(t, hu, 2), Object.defineProperty(e, "toString", {
    value: () => e.message,
    enumerable: !1
  });
}, Hg = X("$ZodError", Vg), Gg = X("$ZodError", Vg, { Parent: Error });
function Ev(e, t = (n) => n.message) {
  const n = {}, r = [];
  for (const i of e.issues)
    i.path.length > 0 ? (n[i.path[0]] = n[i.path[0]] || [], n[i.path[0]].push(t(i))) : r.push(t(i));
  return { formErrors: r, fieldErrors: n };
}
function Av(e, t) {
  const n = t || function(a) {
    return a.message;
  }, r = { _errors: [] }, i = (a) => {
    for (const o of a.issues)
      if (o.code === "invalid_union" && o.errors.length)
        o.errors.map((c) => i({ issues: c }));
      else if (o.code === "invalid_key")
        i({ issues: o.issues });
      else if (o.code === "invalid_element")
        i({ issues: o.issues });
      else if (o.path.length === 0)
        r._errors.push(n(o));
      else {
        let c = r, u = 0;
        for (; u < o.path.length; ) {
          const s = o.path[u];
          u === o.path.length - 1 ? (c[s] = c[s] || { _errors: [] }, c[s]._errors.push(n(o))) : c[s] = c[s] || { _errors: [] }, c = c[s], u++;
        }
      }
  };
  return i(e), r;
}
const Cv = (e) => (t, n, r, i) => {
  const a = r ? Object.assign(r, { async: !1 }) : { async: !1 }, o = t._zod.run({ value: n, issues: [] }, a);
  if (o instanceof Promise)
    throw new bi();
  if (o.issues.length) {
    const c = new ((i == null ? void 0 : i.Err) ?? e)(o.issues.map((u) => Zn(u, a, jn())));
    throw jg(c, i == null ? void 0 : i.callee), c;
  }
  return o.value;
}, Fv = (e) => async (t, n, r, i) => {
  const a = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let o = t._zod.run({ value: n, issues: [] }, a);
  if (o instanceof Promise && (o = await o), o.issues.length) {
    const c = new ((i == null ? void 0 : i.Err) ?? e)(o.issues.map((u) => Zn(u, a, jn())));
    throw jg(c, i == null ? void 0 : i.callee), c;
  }
  return o.value;
}, Yg = (e) => (t, n, r) => {
  const i = r ? { ...r, async: !1 } : { async: !1 }, a = t._zod.run({ value: n, issues: [] }, i);
  if (a instanceof Promise)
    throw new bi();
  return a.issues.length ? {
    success: !1,
    error: new (e ?? Hg)(a.issues.map((o) => Zn(o, i, jn())))
  } : { success: !0, data: a.value };
}, Sv = /* @__PURE__ */ Yg(Gg), Kg = (e) => async (t, n, r) => {
  const i = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let a = t._zod.run({ value: n, issues: [] }, i);
  return a instanceof Promise && (a = await a), a.issues.length ? {
    success: !1,
    error: new e(a.issues.map((o) => Zn(o, i, jn())))
  } : { success: !0, data: a.value };
}, kv = /* @__PURE__ */ Kg(Gg), Bv = /^[cC][^\s-]{8,}$/, Rv = /^[0-9a-z]+$/, Ov = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, Iv = /^[0-9a-vA-V]{20}$/, Wv = /^[A-Za-z0-9]{27}$/, Nv = /^[a-zA-Z0-9_-]{21}$/, Lv = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Mv = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Rl = (e) => e ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$/, $v = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Pv = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function zv() {
  return new RegExp(Pv, "u");
}
const qv = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, jv = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})$/, Zv = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Xv = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Vv = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, Jg = /^[A-Za-z0-9_-]*$/, Hv = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/, Gv = /^\+(?:[0-9]){6,14}[0-9]$/, Qg = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", Yv = /* @__PURE__ */ new RegExp(`^${Qg}$`);
function em(e) {
  const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Kv(e) {
  return new RegExp(`^${em(e)}$`);
}
function Jv(e) {
  const t = em({ precision: e.precision }), n = ["Z"];
  e.local && n.push(""), e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const r = `${t}(?:${n.join("|")})`;
  return new RegExp(`^${Qg}T(?:${r})$`);
}
const Qv = (e) => {
  const t = e ? `[\\s\\S]{${(e == null ? void 0 : e.minimum) ?? 0},${(e == null ? void 0 : e.maximum) ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${t}$`);
}, e0 = /^[^A-Z]*$/, t0 = /^[^a-z]*$/, Gt = /* @__PURE__ */ X("$ZodCheck", (e, t) => {
  var n;
  e._zod ?? (e._zod = {}), e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), n0 = /* @__PURE__ */ X("$ZodCheckMaxLength", (e, t) => {
  var n;
  Gt.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const i = r.value;
    return !Iu(i) && i.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const i = r._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    t.maximum < i && (r._zod.bag.maximum = t.maximum);
  }), e._zod.check = (r) => {
    const i = r.value;
    if (i.length <= t.maximum)
      return;
    const o = Nu(i);
    r.issues.push({
      origin: o,
      code: "too_big",
      maximum: t.maximum,
      inclusive: !0,
      input: i,
      inst: e,
      continue: !t.abort
    });
  };
}), r0 = /* @__PURE__ */ X("$ZodCheckMinLength", (e, t) => {
  var n;
  Gt.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const i = r.value;
    return !Iu(i) && i.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const i = r._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    t.minimum > i && (r._zod.bag.minimum = t.minimum);
  }), e._zod.check = (r) => {
    const i = r.value;
    if (i.length >= t.minimum)
      return;
    const o = Nu(i);
    r.issues.push({
      origin: o,
      code: "too_small",
      minimum: t.minimum,
      inclusive: !0,
      input: i,
      inst: e,
      continue: !t.abort
    });
  };
}), i0 = /* @__PURE__ */ X("$ZodCheckLengthEquals", (e, t) => {
  var n;
  Gt.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const i = r.value;
    return !Iu(i) && i.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const i = r._zod.bag;
    i.minimum = t.length, i.maximum = t.length, i.length = t.length;
  }), e._zod.check = (r) => {
    const i = r.value, a = i.length;
    if (a === t.length)
      return;
    const o = Nu(i), c = a > t.length;
    r.issues.push({
      origin: o,
      ...c ? { code: "too_big", maximum: t.length } : { code: "too_small", minimum: t.length },
      inclusive: !0,
      exact: !0,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), oo = /* @__PURE__ */ X("$ZodCheckStringFormat", (e, t) => {
  var n, r;
  Gt.init(e, t), e._zod.onattach.push((i) => {
    const a = i._zod.bag;
    a.format = t.format, t.pattern && (a.patterns ?? (a.patterns = /* @__PURE__ */ new Set()), a.patterns.add(t.pattern));
  }), t.pattern ? (n = e._zod).check ?? (n.check = (i) => {
    t.pattern.lastIndex = 0, !t.pattern.test(i.value) && i.issues.push({
      origin: "string",
      code: "invalid_format",
      format: t.format,
      input: i.value,
      ...t.pattern ? { pattern: t.pattern.toString() } : {},
      inst: e,
      continue: !t.abort
    });
  }) : (r = e._zod).check ?? (r.check = () => {
  });
}), a0 = /* @__PURE__ */ X("$ZodCheckRegex", (e, t) => {
  oo.init(e, t), e._zod.check = (n) => {
    t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: n.value,
      pattern: t.pattern.toString(),
      inst: e,
      continue: !t.abort
    });
  };
}), o0 = /* @__PURE__ */ X("$ZodCheckLowerCase", (e, t) => {
  t.pattern ?? (t.pattern = e0), oo.init(e, t);
}), c0 = /* @__PURE__ */ X("$ZodCheckUpperCase", (e, t) => {
  t.pattern ?? (t.pattern = t0), oo.init(e, t);
}), s0 = /* @__PURE__ */ X("$ZodCheckIncludes", (e, t) => {
  Gt.init(e, t);
  const n = ao(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${n}` : n);
  t.pattern = r, e._zod.onattach.push((i) => {
    const a = i._zod.bag;
    a.patterns ?? (a.patterns = /* @__PURE__ */ new Set()), a.patterns.add(r);
  }), e._zod.check = (i) => {
    i.value.includes(t.includes, t.position) || i.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: t.includes,
      input: i.value,
      inst: e,
      continue: !t.abort
    });
  };
}), u0 = /* @__PURE__ */ X("$ZodCheckStartsWith", (e, t) => {
  Gt.init(e, t);
  const n = new RegExp(`^${ao(t.prefix)}.*`);
  t.pattern ?? (t.pattern = n), e._zod.onattach.push((r) => {
    const i = r._zod.bag;
    i.patterns ?? (i.patterns = /* @__PURE__ */ new Set()), i.patterns.add(n);
  }), e._zod.check = (r) => {
    r.value.startsWith(t.prefix) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: t.prefix,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), d0 = /* @__PURE__ */ X("$ZodCheckEndsWith", (e, t) => {
  Gt.init(e, t);
  const n = new RegExp(`.*${ao(t.suffix)}$`);
  t.pattern ?? (t.pattern = n), e._zod.onattach.push((r) => {
    const i = r._zod.bag;
    i.patterns ?? (i.patterns = /* @__PURE__ */ new Set()), i.patterns.add(n);
  }), e._zod.check = (r) => {
    r.value.endsWith(t.suffix) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: t.suffix,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), l0 = /* @__PURE__ */ X("$ZodCheckOverwrite", (e, t) => {
  Gt.init(e, t), e._zod.check = (n) => {
    n.value = t.tx(n.value);
  };
});
class f0 {
  constructor(t = []) {
    this.content = [], this.indent = 0, this && (this.args = t);
  }
  indented(t) {
    this.indent += 1, t(this), this.indent -= 1;
  }
  write(t) {
    if (typeof t == "function") {
      t(this, { execution: "sync" }), t(this, { execution: "async" });
      return;
    }
    const r = t.split(`
`).filter((o) => o), i = Math.min(...r.map((o) => o.length - o.trimStart().length)), a = r.map((o) => o.slice(i)).map((o) => " ".repeat(this.indent * 2) + o);
    for (const o of a)
      this.content.push(o);
  }
  compile() {
    const t = Function, n = this == null ? void 0 : this.args, i = [...((this == null ? void 0 : this.content) ?? [""]).map((a) => `  ${a}`)];
    return new t(...n, i.join(`
`));
  }
}
const h0 = {
  major: 4,
  minor: 0,
  patch: 17
}, We = /* @__PURE__ */ X("$ZodType", (e, t) => {
  var i;
  var n;
  e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = h0;
  const r = [...e._zod.def.checks ?? []];
  e._zod.traits.has("$ZodCheck") && r.unshift(e);
  for (const a of r)
    for (const o of a._zod.onattach)
      o(e);
  if (r.length === 0)
    (n = e._zod).deferred ?? (n.deferred = []), (i = e._zod.deferred) == null || i.push(() => {
      e._zod.run = e._zod.parse;
    });
  else {
    const a = (o, c, u) => {
      let s = ui(o), d;
      for (const g of c) {
        if (g._zod.def.when) {
          if (!g._zod.def.when(o))
            continue;
        } else if (s)
          continue;
        const f = o.issues.length, p = g._zod.check(o);
        if (p instanceof Promise && (u == null ? void 0 : u.async) === !1)
          throw new bi();
        if (d || p instanceof Promise)
          d = (d ?? Promise.resolve()).then(async () => {
            await p, o.issues.length !== f && (s || (s = ui(o, f)));
          });
        else {
          if (o.issues.length === f)
            continue;
          s || (s = ui(o, f));
        }
      }
      return d ? d.then(() => o) : o;
    };
    e._zod.run = (o, c) => {
      const u = e._zod.parse(o, c);
      if (u instanceof Promise) {
        if (c.async === !1)
          throw new bi();
        return u.then((s) => a(s, r, c));
      }
      return a(u, r, c);
    };
  }
  e["~standard"] = {
    validate: (a) => {
      var o;
      try {
        const c = Sv(e, a);
        return c.success ? { value: c.data } : { issues: (o = c.error) == null ? void 0 : o.issues };
      } catch {
        return kv(e, a).then((u) => {
          var s;
          return u.success ? { value: u.data } : { issues: (s = u.error) == null ? void 0 : s.issues };
        });
      }
    },
    vendor: "zod",
    version: 1
  };
}), Lu = /* @__PURE__ */ X("$ZodString", (e, t) => {
  var n;
  We.init(e, t), e._zod.pattern = [...((n = e == null ? void 0 : e._zod.bag) == null ? void 0 : n.patterns) ?? []].pop() ?? Qv(e._zod.bag), e._zod.parse = (r, i) => {
    if (t.coerce)
      try {
        r.value = String(r.value);
      } catch {
      }
    return typeof r.value == "string" || r.issues.push({
      expected: "string",
      code: "invalid_type",
      input: r.value,
      inst: e
    }), r;
  };
}), we = /* @__PURE__ */ X("$ZodStringFormat", (e, t) => {
  oo.init(e, t), Lu.init(e, t);
}), p0 = /* @__PURE__ */ X("$ZodGUID", (e, t) => {
  t.pattern ?? (t.pattern = Mv), we.init(e, t);
}), g0 = /* @__PURE__ */ X("$ZodUUID", (e, t) => {
  if (t.version) {
    const r = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    }[t.version];
    if (r === void 0)
      throw new Error(`Invalid UUID version: "${t.version}"`);
    t.pattern ?? (t.pattern = Rl(r));
  } else
    t.pattern ?? (t.pattern = Rl());
  we.init(e, t);
}), m0 = /* @__PURE__ */ X("$ZodEmail", (e, t) => {
  t.pattern ?? (t.pattern = $v), we.init(e, t);
}), b0 = /* @__PURE__ */ X("$ZodURL", (e, t) => {
  we.init(e, t), e._zod.check = (n) => {
    try {
      const r = n.value.trim(), i = new URL(r);
      t.hostname && (t.hostname.lastIndex = 0, t.hostname.test(i.hostname) || n.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: Hv.source,
        input: n.value,
        inst: e,
        continue: !t.abort
      })), t.protocol && (t.protocol.lastIndex = 0, t.protocol.test(i.protocol.endsWith(":") ? i.protocol.slice(0, -1) : i.protocol) || n.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: t.protocol.source,
        input: n.value,
        inst: e,
        continue: !t.abort
      })), t.normalize ? n.value = i.href : n.value = r;
      return;
    } catch {
      n.issues.push({
        code: "invalid_format",
        format: "url",
        input: n.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
}), y0 = /* @__PURE__ */ X("$ZodEmoji", (e, t) => {
  t.pattern ?? (t.pattern = zv()), we.init(e, t);
}), v0 = /* @__PURE__ */ X("$ZodNanoID", (e, t) => {
  t.pattern ?? (t.pattern = Nv), we.init(e, t);
}), D0 = /* @__PURE__ */ X("$ZodCUID", (e, t) => {
  t.pattern ?? (t.pattern = Bv), we.init(e, t);
}), x0 = /* @__PURE__ */ X("$ZodCUID2", (e, t) => {
  t.pattern ?? (t.pattern = Rv), we.init(e, t);
}), _0 = /* @__PURE__ */ X("$ZodULID", (e, t) => {
  t.pattern ?? (t.pattern = Ov), we.init(e, t);
}), w0 = /* @__PURE__ */ X("$ZodXID", (e, t) => {
  t.pattern ?? (t.pattern = Iv), we.init(e, t);
}), T0 = /* @__PURE__ */ X("$ZodKSUID", (e, t) => {
  t.pattern ?? (t.pattern = Wv), we.init(e, t);
}), U0 = /* @__PURE__ */ X("$ZodISODateTime", (e, t) => {
  t.pattern ?? (t.pattern = Jv(t)), we.init(e, t);
}), E0 = /* @__PURE__ */ X("$ZodISODate", (e, t) => {
  t.pattern ?? (t.pattern = Yv), we.init(e, t);
}), A0 = /* @__PURE__ */ X("$ZodISOTime", (e, t) => {
  t.pattern ?? (t.pattern = Kv(t)), we.init(e, t);
}), C0 = /* @__PURE__ */ X("$ZodISODuration", (e, t) => {
  t.pattern ?? (t.pattern = Lv), we.init(e, t);
}), F0 = /* @__PURE__ */ X("$ZodIPv4", (e, t) => {
  t.pattern ?? (t.pattern = qv), we.init(e, t), e._zod.onattach.push((n) => {
    const r = n._zod.bag;
    r.format = "ipv4";
  });
}), S0 = /* @__PURE__ */ X("$ZodIPv6", (e, t) => {
  t.pattern ?? (t.pattern = jv), we.init(e, t), e._zod.onattach.push((n) => {
    const r = n._zod.bag;
    r.format = "ipv6";
  }), e._zod.check = (n) => {
    try {
      new URL(`http://[${n.value}]`);
    } catch {
      n.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: n.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
}), k0 = /* @__PURE__ */ X("$ZodCIDRv4", (e, t) => {
  t.pattern ?? (t.pattern = Zv), we.init(e, t);
}), B0 = /* @__PURE__ */ X("$ZodCIDRv6", (e, t) => {
  t.pattern ?? (t.pattern = Xv), we.init(e, t), e._zod.check = (n) => {
    const [r, i] = n.value.split("/");
    try {
      if (!i)
        throw new Error();
      const a = Number(i);
      if (`${a}` !== i)
        throw new Error();
      if (a < 0 || a > 128)
        throw new Error();
      new URL(`http://[${r}]`);
    } catch {
      n.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: n.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
});
function tm(e) {
  if (e === "")
    return !0;
  if (e.length % 4 !== 0)
    return !1;
  try {
    return atob(e), !0;
  } catch {
    return !1;
  }
}
const R0 = /* @__PURE__ */ X("$ZodBase64", (e, t) => {
  t.pattern ?? (t.pattern = Vv), we.init(e, t), e._zod.onattach.push((n) => {
    n._zod.bag.contentEncoding = "base64";
  }), e._zod.check = (n) => {
    tm(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
});
function O0(e) {
  if (!Jg.test(e))
    return !1;
  const t = e.replace(/[-_]/g, (r) => r === "-" ? "+" : "/"), n = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return tm(n);
}
const I0 = /* @__PURE__ */ X("$ZodBase64URL", (e, t) => {
  t.pattern ?? (t.pattern = Jg), we.init(e, t), e._zod.onattach.push((n) => {
    n._zod.bag.contentEncoding = "base64url";
  }), e._zod.check = (n) => {
    O0(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), W0 = /* @__PURE__ */ X("$ZodE164", (e, t) => {
  t.pattern ?? (t.pattern = Gv), we.init(e, t);
});
function N0(e, t = null) {
  try {
    const n = e.split(".");
    if (n.length !== 3)
      return !1;
    const [r] = n;
    if (!r)
      return !1;
    const i = JSON.parse(atob(r));
    return !("typ" in i && (i == null ? void 0 : i.typ) !== "JWT" || !i.alg || t && (!("alg" in i) || i.alg !== t));
  } catch {
    return !1;
  }
}
const L0 = /* @__PURE__ */ X("$ZodJWT", (e, t) => {
  we.init(e, t), e._zod.check = (n) => {
    N0(n.value, t.alg) || n.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), M0 = /* @__PURE__ */ X("$ZodUnknown", (e, t) => {
  We.init(e, t), e._zod.parse = (n) => n;
}), $0 = /* @__PURE__ */ X("$ZodNever", (e, t) => {
  We.init(e, t), e._zod.parse = (n, r) => (n.issues.push({
    expected: "never",
    code: "invalid_type",
    input: n.value,
    inst: e
  }), n);
});
function Ol(e, t, n) {
  e.issues.length && t.issues.push(...Xg(n, e.issues)), t.value[n] = e.value;
}
const P0 = /* @__PURE__ */ X("$ZodArray", (e, t) => {
  We.init(e, t), e._zod.parse = (n, r) => {
    const i = n.value;
    if (!Array.isArray(i))
      return n.issues.push({
        expected: "array",
        code: "invalid_type",
        input: i,
        inst: e
      }), n;
    n.value = Array(i.length);
    const a = [];
    for (let o = 0; o < i.length; o++) {
      const c = i[o], u = t.element._zod.run({
        value: c,
        issues: []
      }, r);
      u instanceof Promise ? a.push(u.then((s) => Ol(s, n, o))) : Ol(u, n, o);
    }
    return a.length ? Promise.all(a).then(() => n) : n;
  };
});
function ta(e, t, n, r) {
  e.issues.length && t.issues.push(...Xg(n, e.issues)), e.value === void 0 ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
const z0 = /* @__PURE__ */ X("$ZodObject", (e, t) => {
  We.init(e, t);
  const n = qg(() => {
    const g = Object.keys(t.shape);
    for (const p of g)
      if (!t.shape[p]._zod.traits.has("$ZodType"))
        throw new Error(`Invalid element at key "${p}": expected a Zod schema`);
    const f = vv(t.shape);
    return {
      shape: t.shape,
      keys: g,
      keySet: new Set(g),
      numKeys: g.length,
      optionalKeys: new Set(f)
    };
  });
  be(e._zod, "propValues", () => {
    const g = t.shape, f = {};
    for (const p in g) {
      const b = g[p]._zod;
      if (b.values) {
        f[p] ?? (f[p] = /* @__PURE__ */ new Set());
        for (const m of b.values)
          f[p].add(m);
      }
    }
    return f;
  });
  const r = (g) => {
    const f = new f0(["shape", "payload", "ctx"]), p = n.value, b = (l) => {
      const v = Bl(l);
      return `shape[${v}]._zod.run({ value: input[${v}], issues: [] }, ctx)`;
    };
    f.write("const input = payload.value;");
    const m = /* @__PURE__ */ Object.create(null);
    let y = 0;
    for (const l of p.keys)
      m[l] = `key_${y++}`;
    f.write("const newResult = {}");
    for (const l of p.keys) {
      const v = m[l], D = Bl(l);
      f.write(`const ${v} = ${b(l)};`), f.write(`
        if (${v}.issues.length) {
          payload.issues = payload.issues.concat(${v}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${D}, ...iss.path] : [${D}]
          })));
        }
        
        if (${v}.value === undefined) {
          if (${D} in input) {
            newResult[${D}] = undefined;
          }
        } else {
          newResult[${D}] = ${v}.value;
        }
      `);
    }
    f.write("payload.value = newResult;"), f.write("return payload;");
    const h = f.compile();
    return (l, v) => h(g, l, v);
  };
  let i;
  const a = pu, o = !zg.jitless, u = o && bv.value, s = t.catchall;
  let d;
  e._zod.parse = (g, f) => {
    d ?? (d = n.value);
    const p = g.value;
    if (!a(p))
      return g.issues.push({
        expected: "object",
        code: "invalid_type",
        input: p,
        inst: e
      }), g;
    const b = [];
    if (o && u && (f == null ? void 0 : f.async) === !1 && f.jitless !== !0)
      i || (i = r(t.shape)), g = i(g, f);
    else {
      g.value = {};
      const v = d.shape;
      for (const D of d.keys) {
        const w = v[D]._zod.run({ value: p[D], issues: [] }, f);
        w instanceof Promise ? b.push(w.then((E) => ta(E, g, D, p))) : ta(w, g, D, p);
      }
    }
    if (!s)
      return b.length ? Promise.all(b).then(() => g) : g;
    const m = [], y = d.keySet, h = s._zod, l = h.def.type;
    for (const v of Object.keys(p)) {
      if (y.has(v))
        continue;
      if (l === "never") {
        m.push(v);
        continue;
      }
      const D = h.run({ value: p[v], issues: [] }, f);
      D instanceof Promise ? b.push(D.then((x) => ta(x, g, v, p))) : ta(D, g, v, p);
    }
    return m.length && g.issues.push({
      code: "unrecognized_keys",
      keys: m,
      input: p,
      inst: e
    }), b.length ? Promise.all(b).then(() => g) : g;
  };
});
function Il(e, t, n, r) {
  for (const a of e)
    if (a.issues.length === 0)
      return t.value = a.value, t;
  const i = e.filter((a) => !ui(a));
  return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
    code: "invalid_union",
    input: t.value,
    inst: n,
    errors: e.map((a) => a.issues.map((o) => Zn(o, r, jn())))
  }), t);
}
const q0 = /* @__PURE__ */ X("$ZodUnion", (e, t) => {
  We.init(e, t), be(e._zod, "optin", () => t.options.some((i) => i._zod.optin === "optional") ? "optional" : void 0), be(e._zod, "optout", () => t.options.some((i) => i._zod.optout === "optional") ? "optional" : void 0), be(e._zod, "values", () => {
    if (t.options.every((i) => i._zod.values))
      return new Set(t.options.flatMap((i) => Array.from(i._zod.values)));
  }), be(e._zod, "pattern", () => {
    if (t.options.every((i) => i._zod.pattern)) {
      const i = t.options.map((a) => a._zod.pattern);
      return new RegExp(`^(${i.map((a) => Wu(a.source)).join("|")})$`);
    }
  });
  const n = t.options.length === 1, r = t.options[0]._zod.run;
  e._zod.parse = (i, a) => {
    if (n)
      return r(i, a);
    let o = !1;
    const c = [];
    for (const u of t.options) {
      const s = u._zod.run({
        value: i.value,
        issues: []
      }, a);
      if (s instanceof Promise)
        c.push(s), o = !0;
      else {
        if (s.issues.length === 0)
          return s;
        c.push(s);
      }
    }
    return o ? Promise.all(c).then((u) => Il(u, i, e, a)) : Il(c, i, e, a);
  };
}), j0 = /* @__PURE__ */ X("$ZodIntersection", (e, t) => {
  We.init(e, t), e._zod.parse = (n, r) => {
    const i = n.value, a = t.left._zod.run({ value: i, issues: [] }, r), o = t.right._zod.run({ value: i, issues: [] }, r);
    return a instanceof Promise || o instanceof Promise ? Promise.all([a, o]).then(([u, s]) => Wl(n, u, s)) : Wl(n, a, o);
  };
});
function gu(e, t) {
  if (e === t)
    return { valid: !0, data: e };
  if (e instanceof Date && t instanceof Date && +e == +t)
    return { valid: !0, data: e };
  if ($a(e) && $a(t)) {
    const n = Object.keys(t), r = Object.keys(e).filter((a) => n.indexOf(a) !== -1), i = { ...e, ...t };
    for (const a of r) {
      const o = gu(e[a], t[a]);
      if (!o.valid)
        return {
          valid: !1,
          mergeErrorPath: [a, ...o.mergeErrorPath]
        };
      i[a] = o.data;
    }
    return { valid: !0, data: i };
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length)
      return { valid: !1, mergeErrorPath: [] };
    const n = [];
    for (let r = 0; r < e.length; r++) {
      const i = e[r], a = t[r], o = gu(i, a);
      if (!o.valid)
        return {
          valid: !1,
          mergeErrorPath: [r, ...o.mergeErrorPath]
        };
      n.push(o.data);
    }
    return { valid: !0, data: n };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function Wl(e, t, n) {
  if (t.issues.length && e.issues.push(...t.issues), n.issues.length && e.issues.push(...n.issues), ui(e))
    return e;
  const r = gu(t.value, n.value);
  if (!r.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(r.mergeErrorPath)}`);
  return e.value = r.data, e;
}
const Z0 = /* @__PURE__ */ X("$ZodEnum", (e, t) => {
  We.init(e, t);
  const n = gv(t.entries), r = new Set(n);
  e._zod.values = r, e._zod.pattern = new RegExp(`^(${n.filter((i) => yv.has(typeof i)).map((i) => typeof i == "string" ? ao(i) : i.toString()).join("|")})$`), e._zod.parse = (i, a) => {
    const o = i.value;
    return r.has(o) || i.issues.push({
      code: "invalid_value",
      values: n,
      input: o,
      inst: e
    }), i;
  };
}), X0 = /* @__PURE__ */ X("$ZodTransform", (e, t) => {
  We.init(e, t), e._zod.parse = (n, r) => {
    const i = t.transform(n.value, n);
    if (r.async)
      return (i instanceof Promise ? i : Promise.resolve(i)).then((o) => (n.value = o, n));
    if (i instanceof Promise)
      throw new bi();
    return n.value = i, n;
  };
});
function Nl(e, t) {
  return e.issues.length && t === void 0 ? { issues: [], value: void 0 } : e;
}
const V0 = /* @__PURE__ */ X("$ZodOptional", (e, t) => {
  We.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", be(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), be(e._zod, "pattern", () => {
    const n = t.innerType._zod.pattern;
    return n ? new RegExp(`^(${Wu(n.source)})?$`) : void 0;
  }), e._zod.parse = (n, r) => {
    if (t.innerType._zod.optin === "optional") {
      const i = t.innerType._zod.run(n, r);
      return i instanceof Promise ? i.then((a) => Nl(a, n.value)) : Nl(i, n.value);
    }
    return n.value === void 0 ? n : t.innerType._zod.run(n, r);
  };
}), H0 = /* @__PURE__ */ X("$ZodNullable", (e, t) => {
  We.init(e, t), be(e._zod, "optin", () => t.innerType._zod.optin), be(e._zod, "optout", () => t.innerType._zod.optout), be(e._zod, "pattern", () => {
    const n = t.innerType._zod.pattern;
    return n ? new RegExp(`^(${Wu(n.source)}|null)$`) : void 0;
  }), be(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (n, r) => n.value === null ? n : t.innerType._zod.run(n, r);
}), G0 = /* @__PURE__ */ X("$ZodDefault", (e, t) => {
  We.init(e, t), e._zod.optin = "optional", be(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => {
    if (n.value === void 0)
      return n.value = t.defaultValue, n;
    const i = t.innerType._zod.run(n, r);
    return i instanceof Promise ? i.then((a) => Ll(a, t)) : Ll(i, t);
  };
});
function Ll(e, t) {
  return e.value === void 0 && (e.value = t.defaultValue), e;
}
const Y0 = /* @__PURE__ */ X("$ZodPrefault", (e, t) => {
  We.init(e, t), e._zod.optin = "optional", be(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => (n.value === void 0 && (n.value = t.defaultValue), t.innerType._zod.run(n, r));
}), K0 = /* @__PURE__ */ X("$ZodNonOptional", (e, t) => {
  We.init(e, t), be(e._zod, "values", () => {
    const n = t.innerType._zod.values;
    return n ? new Set([...n].filter((r) => r !== void 0)) : void 0;
  }), e._zod.parse = (n, r) => {
    const i = t.innerType._zod.run(n, r);
    return i instanceof Promise ? i.then((a) => Ml(a, e)) : Ml(i, e);
  };
});
function Ml(e, t) {
  return !e.issues.length && e.value === void 0 && e.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: e.value,
    inst: t
  }), e;
}
const J0 = /* @__PURE__ */ X("$ZodCatch", (e, t) => {
  We.init(e, t), be(e._zod, "optin", () => t.innerType._zod.optin), be(e._zod, "optout", () => t.innerType._zod.optout), be(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => {
    const i = t.innerType._zod.run(n, r);
    return i instanceof Promise ? i.then((a) => (n.value = a.value, a.issues.length && (n.value = t.catchValue({
      ...n,
      error: {
        issues: a.issues.map((o) => Zn(o, r, jn()))
      },
      input: n.value
    }), n.issues = []), n)) : (n.value = i.value, i.issues.length && (n.value = t.catchValue({
      ...n,
      error: {
        issues: i.issues.map((a) => Zn(a, r, jn()))
      },
      input: n.value
    }), n.issues = []), n);
  };
}), Q0 = /* @__PURE__ */ X("$ZodPipe", (e, t) => {
  We.init(e, t), be(e._zod, "values", () => t.in._zod.values), be(e._zod, "optin", () => t.in._zod.optin), be(e._zod, "optout", () => t.out._zod.optout), be(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (n, r) => {
    const i = t.in._zod.run(n, r);
    return i instanceof Promise ? i.then((a) => $l(a, t, r)) : $l(i, t, r);
  };
});
function $l(e, t, n) {
  return e.issues.length ? e : t.out._zod.run({ value: e.value, issues: e.issues }, n);
}
const eD = /* @__PURE__ */ X("$ZodReadonly", (e, t) => {
  We.init(e, t), be(e._zod, "propValues", () => t.innerType._zod.propValues), be(e._zod, "values", () => t.innerType._zod.values), be(e._zod, "optin", () => t.innerType._zod.optin), be(e._zod, "optout", () => t.innerType._zod.optout), e._zod.parse = (n, r) => {
    const i = t.innerType._zod.run(n, r);
    return i instanceof Promise ? i.then(Pl) : Pl(i);
  };
});
function Pl(e) {
  return e.value = Object.freeze(e.value), e;
}
const tD = /* @__PURE__ */ X("$ZodCustom", (e, t) => {
  Gt.init(e, t), We.init(e, t), e._zod.parse = (n, r) => n, e._zod.check = (n) => {
    const r = n.value, i = t.fn(r);
    if (i instanceof Promise)
      return i.then((a) => zl(a, n, r, e));
    zl(i, n, r, e);
  };
});
function zl(e, t, n, r) {
  if (!e) {
    const i = {
      code: "custom",
      input: n,
      inst: r,
      // incorporates params.error into issue reporting
      path: [...r._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !r._zod.def.abort
      // params: inst._zod.def.params,
    };
    r._zod.def.params && (i.params = r._zod.def.params), t.issues.push(yi(i));
  }
}
class nD {
  constructor() {
    this._map = /* @__PURE__ */ new Map(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(t, ...n) {
    const r = n[0];
    if (this._map.set(t, r), r && typeof r == "object" && "id" in r) {
      if (this._idmap.has(r.id))
        throw new Error(`ID ${r.id} already exists in the registry`);
      this._idmap.set(r.id, t);
    }
    return this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new Map(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(t) {
    const n = this._map.get(t);
    return n && typeof n == "object" && "id" in n && this._idmap.delete(n.id), this._map.delete(t), this;
  }
  get(t) {
    const n = t._zod.parent;
    if (n) {
      const r = { ...this.get(n) ?? {} };
      delete r.id;
      const i = { ...r, ...this._map.get(t) };
      return Object.keys(i).length ? i : void 0;
    }
    return this._map.get(t);
  }
  has(t) {
    return this._map.has(t);
  }
}
function rD() {
  return new nD();
}
const na = /* @__PURE__ */ rD();
function iD(e, t) {
  return new e({
    type: "string",
    ...ae(t)
  });
}
function aD(e, t) {
  return new e({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...ae(t)
  });
}
function ql(e, t) {
  return new e({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...ae(t)
  });
}
function oD(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...ae(t)
  });
}
function cD(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...ae(t)
  });
}
function sD(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...ae(t)
  });
}
function uD(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...ae(t)
  });
}
function dD(e, t) {
  return new e({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...ae(t)
  });
}
function lD(e, t) {
  return new e({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...ae(t)
  });
}
function fD(e, t) {
  return new e({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...ae(t)
  });
}
function hD(e, t) {
  return new e({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...ae(t)
  });
}
function pD(e, t) {
  return new e({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...ae(t)
  });
}
function gD(e, t) {
  return new e({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...ae(t)
  });
}
function mD(e, t) {
  return new e({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...ae(t)
  });
}
function bD(e, t) {
  return new e({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...ae(t)
  });
}
function yD(e, t) {
  return new e({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...ae(t)
  });
}
function vD(e, t) {
  return new e({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...ae(t)
  });
}
function DD(e, t) {
  return new e({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...ae(t)
  });
}
function xD(e, t) {
  return new e({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...ae(t)
  });
}
function _D(e, t) {
  return new e({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...ae(t)
  });
}
function wD(e, t) {
  return new e({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...ae(t)
  });
}
function TD(e, t) {
  return new e({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...ae(t)
  });
}
function UD(e, t) {
  return new e({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...ae(t)
  });
}
function ED(e, t) {
  return new e({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...ae(t)
  });
}
function AD(e, t) {
  return new e({
    type: "string",
    format: "date",
    check: "string_format",
    ...ae(t)
  });
}
function CD(e, t) {
  return new e({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...ae(t)
  });
}
function FD(e, t) {
  return new e({
    type: "string",
    format: "duration",
    check: "string_format",
    ...ae(t)
  });
}
function SD(e) {
  return new e({
    type: "unknown"
  });
}
function kD(e, t) {
  return new e({
    type: "never",
    ...ae(t)
  });
}
function nm(e, t) {
  return new n0({
    check: "max_length",
    ...ae(t),
    maximum: e
  });
}
function Pa(e, t) {
  return new r0({
    check: "min_length",
    ...ae(t),
    minimum: e
  });
}
function rm(e, t) {
  return new i0({
    check: "length_equals",
    ...ae(t),
    length: e
  });
}
function BD(e, t) {
  return new a0({
    check: "string_format",
    format: "regex",
    ...ae(t),
    pattern: e
  });
}
function RD(e) {
  return new o0({
    check: "string_format",
    format: "lowercase",
    ...ae(e)
  });
}
function OD(e) {
  return new c0({
    check: "string_format",
    format: "uppercase",
    ...ae(e)
  });
}
function ID(e, t) {
  return new s0({
    check: "string_format",
    format: "includes",
    ...ae(t),
    includes: e
  });
}
function WD(e, t) {
  return new u0({
    check: "string_format",
    format: "starts_with",
    ...ae(t),
    prefix: e
  });
}
function ND(e, t) {
  return new d0({
    check: "string_format",
    format: "ends_with",
    ...ae(t),
    suffix: e
  });
}
function Ni(e) {
  return new l0({
    check: "overwrite",
    tx: e
  });
}
function LD(e) {
  return Ni((t) => t.normalize(e));
}
function MD() {
  return Ni((e) => e.trim());
}
function $D() {
  return Ni((e) => e.toLowerCase());
}
function PD() {
  return Ni((e) => e.toUpperCase());
}
function zD(e, t, n) {
  return new e({
    type: "array",
    element: t,
    // get element() {
    //   return element;
    // },
    ...ae(n)
  });
}
function qD(e, t, n) {
  return new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...ae(n)
  });
}
function jD(e) {
  const t = ZD((n) => (n.addIssue = (r) => {
    if (typeof r == "string")
      n.issues.push(yi(r, n.value, t._zod.def));
    else {
      const i = r;
      i.fatal && (i.continue = !1), i.code ?? (i.code = "custom"), i.input ?? (i.input = n.value), i.inst ?? (i.inst = t), i.continue ?? (i.continue = !t._zod.def.abort), n.issues.push(yi(i));
    }
  }, e(n.value, n)));
  return t;
}
function ZD(e, t) {
  const n = new Gt({
    check: "custom",
    ...ae(t)
  });
  return n._zod.check = e, n;
}
const XD = /* @__PURE__ */ X("ZodISODateTime", (e, t) => {
  U0.init(e, t), Te.init(e, t);
});
function VD(e) {
  return ED(XD, e);
}
const HD = /* @__PURE__ */ X("ZodISODate", (e, t) => {
  E0.init(e, t), Te.init(e, t);
});
function GD(e) {
  return AD(HD, e);
}
const YD = /* @__PURE__ */ X("ZodISOTime", (e, t) => {
  A0.init(e, t), Te.init(e, t);
});
function KD(e) {
  return CD(YD, e);
}
const JD = /* @__PURE__ */ X("ZodISODuration", (e, t) => {
  C0.init(e, t), Te.init(e, t);
});
function QD(e) {
  return FD(JD, e);
}
const ex = (e, t) => {
  Hg.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
    format: {
      value: (n) => Av(e, n)
      // enumerable: false,
    },
    flatten: {
      value: (n) => Ev(e, n)
      // enumerable: false,
    },
    addIssue: {
      value: (n) => {
        e.issues.push(n), e.message = JSON.stringify(e.issues, hu, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (n) => {
        e.issues.push(...n), e.message = JSON.stringify(e.issues, hu, 2);
      }
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return e.issues.length === 0;
      }
      // enumerable: false,
    }
  });
}, co = X("ZodError", ex, {
  Parent: Error
}), tx = /* @__PURE__ */ Cv(co), nx = /* @__PURE__ */ Fv(co), rx = /* @__PURE__ */ Yg(co), ix = /* @__PURE__ */ Kg(co), Me = /* @__PURE__ */ X("ZodType", (e, t) => (We.init(e, t), e.def = t, Object.defineProperty(e, "_def", { value: t }), e.check = (...n) => e.clone(
  {
    ...t,
    checks: [
      ...t.checks ?? [],
      ...n.map((r) => typeof r == "function" ? { _zod: { check: r, def: { check: "custom" }, onattach: [] } } : r)
    ]
  }
  // { parent: true }
), e.clone = (n, r) => rr(e, n, r), e.brand = () => e, e.register = (n, r) => (n.add(e, r), e), e.parse = (n, r) => tx(e, n, r, { callee: e.parse }), e.safeParse = (n, r) => rx(e, n, r), e.parseAsync = async (n, r) => nx(e, n, r, { callee: e.parseAsync }), e.safeParseAsync = async (n, r) => ix(e, n, r), e.spa = e.safeParseAsync, e.refine = (n, r) => e.check(Hx(n, r)), e.superRefine = (n) => e.check(Gx(n)), e.overwrite = (n) => e.check(Ni(n)), e.optional = () => Xl(e), e.nullable = () => Vl(e), e.nullish = () => Xl(Vl(e)), e.nonoptional = (n) => Px(e, n), e.array = () => Ax(e), e.or = (n) => Sx([e, n]), e.and = (n) => Bx(e, n), e.transform = (n) => Hl(e, Ix(n)), e.default = (n) => Lx(e, n), e.prefault = (n) => $x(e, n), e.catch = (n) => qx(e, n), e.pipe = (n) => Hl(e, n), e.readonly = () => Xx(e), e.describe = (n) => {
  const r = e.clone();
  return na.add(r, { description: n }), r;
}, Object.defineProperty(e, "description", {
  get() {
    var n;
    return (n = na.get(e)) == null ? void 0 : n.description;
  },
  configurable: !0
}), e.meta = (...n) => {
  if (n.length === 0)
    return na.get(e);
  const r = e.clone();
  return na.add(r, n[0]), r;
}, e.isOptional = () => e.safeParse(void 0).success, e.isNullable = () => e.safeParse(null).success, e)), im = /* @__PURE__ */ X("_ZodString", (e, t) => {
  Lu.init(e, t), Me.init(e, t);
  const n = e._zod.bag;
  e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null, e.regex = (...r) => e.check(BD(...r)), e.includes = (...r) => e.check(ID(...r)), e.startsWith = (...r) => e.check(WD(...r)), e.endsWith = (...r) => e.check(ND(...r)), e.min = (...r) => e.check(Pa(...r)), e.max = (...r) => e.check(nm(...r)), e.length = (...r) => e.check(rm(...r)), e.nonempty = (...r) => e.check(Pa(1, ...r)), e.lowercase = (r) => e.check(RD(r)), e.uppercase = (r) => e.check(OD(r)), e.trim = () => e.check(MD()), e.normalize = (...r) => e.check(LD(...r)), e.toLowerCase = () => e.check($D()), e.toUpperCase = () => e.check(PD());
}), ax = /* @__PURE__ */ X("ZodString", (e, t) => {
  Lu.init(e, t), im.init(e, t), e.email = (n) => e.check(aD(ox, n)), e.url = (n) => e.check(dD(cx, n)), e.jwt = (n) => e.check(UD(_x, n)), e.emoji = (n) => e.check(lD(sx, n)), e.guid = (n) => e.check(ql(jl, n)), e.uuid = (n) => e.check(oD(ra, n)), e.uuidv4 = (n) => e.check(cD(ra, n)), e.uuidv6 = (n) => e.check(sD(ra, n)), e.uuidv7 = (n) => e.check(uD(ra, n)), e.nanoid = (n) => e.check(fD(ux, n)), e.guid = (n) => e.check(ql(jl, n)), e.cuid = (n) => e.check(hD(dx, n)), e.cuid2 = (n) => e.check(pD(lx, n)), e.ulid = (n) => e.check(gD(fx, n)), e.base64 = (n) => e.check(_D(vx, n)), e.base64url = (n) => e.check(wD(Dx, n)), e.xid = (n) => e.check(mD(hx, n)), e.ksuid = (n) => e.check(bD(px, n)), e.ipv4 = (n) => e.check(yD(gx, n)), e.ipv6 = (n) => e.check(vD(mx, n)), e.cidrv4 = (n) => e.check(DD(bx, n)), e.cidrv6 = (n) => e.check(xD(yx, n)), e.e164 = (n) => e.check(TD(xx, n)), e.datetime = (n) => e.check(VD(n)), e.date = (n) => e.check(GD(n)), e.time = (n) => e.check(KD(n)), e.duration = (n) => e.check(QD(n));
});
function St(e) {
  return iD(ax, e);
}
const Te = /* @__PURE__ */ X("ZodStringFormat", (e, t) => {
  we.init(e, t), im.init(e, t);
}), ox = /* @__PURE__ */ X("ZodEmail", (e, t) => {
  m0.init(e, t), Te.init(e, t);
}), jl = /* @__PURE__ */ X("ZodGUID", (e, t) => {
  p0.init(e, t), Te.init(e, t);
}), ra = /* @__PURE__ */ X("ZodUUID", (e, t) => {
  g0.init(e, t), Te.init(e, t);
}), cx = /* @__PURE__ */ X("ZodURL", (e, t) => {
  b0.init(e, t), Te.init(e, t);
}), sx = /* @__PURE__ */ X("ZodEmoji", (e, t) => {
  y0.init(e, t), Te.init(e, t);
}), ux = /* @__PURE__ */ X("ZodNanoID", (e, t) => {
  v0.init(e, t), Te.init(e, t);
}), dx = /* @__PURE__ */ X("ZodCUID", (e, t) => {
  D0.init(e, t), Te.init(e, t);
}), lx = /* @__PURE__ */ X("ZodCUID2", (e, t) => {
  x0.init(e, t), Te.init(e, t);
}), fx = /* @__PURE__ */ X("ZodULID", (e, t) => {
  _0.init(e, t), Te.init(e, t);
}), hx = /* @__PURE__ */ X("ZodXID", (e, t) => {
  w0.init(e, t), Te.init(e, t);
}), px = /* @__PURE__ */ X("ZodKSUID", (e, t) => {
  T0.init(e, t), Te.init(e, t);
}), gx = /* @__PURE__ */ X("ZodIPv4", (e, t) => {
  F0.init(e, t), Te.init(e, t);
}), mx = /* @__PURE__ */ X("ZodIPv6", (e, t) => {
  S0.init(e, t), Te.init(e, t);
}), bx = /* @__PURE__ */ X("ZodCIDRv4", (e, t) => {
  k0.init(e, t), Te.init(e, t);
}), yx = /* @__PURE__ */ X("ZodCIDRv6", (e, t) => {
  B0.init(e, t), Te.init(e, t);
}), vx = /* @__PURE__ */ X("ZodBase64", (e, t) => {
  R0.init(e, t), Te.init(e, t);
}), Dx = /* @__PURE__ */ X("ZodBase64URL", (e, t) => {
  I0.init(e, t), Te.init(e, t);
}), xx = /* @__PURE__ */ X("ZodE164", (e, t) => {
  W0.init(e, t), Te.init(e, t);
}), _x = /* @__PURE__ */ X("ZodJWT", (e, t) => {
  L0.init(e, t), Te.init(e, t);
}), wx = /* @__PURE__ */ X("ZodUnknown", (e, t) => {
  M0.init(e, t), Me.init(e, t);
});
function Zl() {
  return SD(wx);
}
const Tx = /* @__PURE__ */ X("ZodNever", (e, t) => {
  $0.init(e, t), Me.init(e, t);
});
function Ux(e) {
  return kD(Tx, e);
}
const Ex = /* @__PURE__ */ X("ZodArray", (e, t) => {
  P0.init(e, t), Me.init(e, t), e.element = t.element, e.min = (n, r) => e.check(Pa(n, r)), e.nonempty = (n) => e.check(Pa(1, n)), e.max = (n, r) => e.check(nm(n, r)), e.length = (n, r) => e.check(rm(n, r)), e.unwrap = () => e.element;
});
function Ax(e, t) {
  return zD(Ex, e, t);
}
const Cx = /* @__PURE__ */ X("ZodObject", (e, t) => {
  z0.init(e, t), Me.init(e, t), be(e, "shape", () => t.shape), e.keyof = () => Rx(Object.keys(e._zod.def.shape)), e.catchall = (n) => e.clone({ ...e._zod.def, catchall: n }), e.passthrough = () => e.clone({ ...e._zod.def, catchall: Zl() }), e.loose = () => e.clone({ ...e._zod.def, catchall: Zl() }), e.strict = () => e.clone({ ...e._zod.def, catchall: Ux() }), e.strip = () => e.clone({ ...e._zod.def, catchall: void 0 }), e.extend = (n) => _v(e, n), e.merge = (n) => wv(e, n), e.pick = (n) => Dv(e, n), e.omit = (n) => xv(e, n), e.partial = (...n) => Tv(am, e, n[0]), e.required = (...n) => Uv(om, e, n[0]);
});
function ia(e, t) {
  const n = {
    type: "object",
    get shape() {
      return nr(this, "shape", e ? mv(e) : {}), this.shape;
    },
    ...ae(t)
  };
  return new Cx(n);
}
const Fx = /* @__PURE__ */ X("ZodUnion", (e, t) => {
  q0.init(e, t), Me.init(e, t), e.options = t.options;
});
function Sx(e, t) {
  return new Fx({
    type: "union",
    options: e,
    ...ae(t)
  });
}
const kx = /* @__PURE__ */ X("ZodIntersection", (e, t) => {
  j0.init(e, t), Me.init(e, t);
});
function Bx(e, t) {
  return new kx({
    type: "intersection",
    left: e,
    right: t
  });
}
const mu = /* @__PURE__ */ X("ZodEnum", (e, t) => {
  Z0.init(e, t), Me.init(e, t), e.enum = t.entries, e.options = Object.values(t.entries);
  const n = new Set(Object.keys(t.entries));
  e.extract = (r, i) => {
    const a = {};
    for (const o of r)
      if (n.has(o))
        a[o] = t.entries[o];
      else
        throw new Error(`Key ${o} not found in enum`);
    return new mu({
      ...t,
      checks: [],
      ...ae(i),
      entries: a
    });
  }, e.exclude = (r, i) => {
    const a = { ...t.entries };
    for (const o of r)
      if (n.has(o))
        delete a[o];
      else
        throw new Error(`Key ${o} not found in enum`);
    return new mu({
      ...t,
      checks: [],
      ...ae(i),
      entries: a
    });
  };
});
function Rx(e, t) {
  const n = Array.isArray(e) ? Object.fromEntries(e.map((r) => [r, r])) : e;
  return new mu({
    type: "enum",
    entries: n,
    ...ae(t)
  });
}
const Ox = /* @__PURE__ */ X("ZodTransform", (e, t) => {
  X0.init(e, t), Me.init(e, t), e._zod.parse = (n, r) => {
    n.addIssue = (a) => {
      if (typeof a == "string")
        n.issues.push(yi(a, n.value, t));
      else {
        const o = a;
        o.fatal && (o.continue = !1), o.code ?? (o.code = "custom"), o.input ?? (o.input = n.value), o.inst ?? (o.inst = e), n.issues.push(yi(o));
      }
    };
    const i = t.transform(n.value, n);
    return i instanceof Promise ? i.then((a) => (n.value = a, n)) : (n.value = i, n);
  };
});
function Ix(e) {
  return new Ox({
    type: "transform",
    transform: e
  });
}
const am = /* @__PURE__ */ X("ZodOptional", (e, t) => {
  V0.init(e, t), Me.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function Xl(e) {
  return new am({
    type: "optional",
    innerType: e
  });
}
const Wx = /* @__PURE__ */ X("ZodNullable", (e, t) => {
  H0.init(e, t), Me.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function Vl(e) {
  return new Wx({
    type: "nullable",
    innerType: e
  });
}
const Nx = /* @__PURE__ */ X("ZodDefault", (e, t) => {
  G0.init(e, t), Me.init(e, t), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function Lx(e, t) {
  return new Nx({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : Zg(t);
    }
  });
}
const Mx = /* @__PURE__ */ X("ZodPrefault", (e, t) => {
  Y0.init(e, t), Me.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function $x(e, t) {
  return new Mx({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : Zg(t);
    }
  });
}
const om = /* @__PURE__ */ X("ZodNonOptional", (e, t) => {
  K0.init(e, t), Me.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function Px(e, t) {
  return new om({
    type: "nonoptional",
    innerType: e,
    ...ae(t)
  });
}
const zx = /* @__PURE__ */ X("ZodCatch", (e, t) => {
  J0.init(e, t), Me.init(e, t), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function qx(e, t) {
  return new zx({
    type: "catch",
    innerType: e,
    catchValue: typeof t == "function" ? t : () => t
  });
}
const jx = /* @__PURE__ */ X("ZodPipe", (e, t) => {
  Q0.init(e, t), Me.init(e, t), e.in = t.in, e.out = t.out;
});
function Hl(e, t) {
  return new jx({
    type: "pipe",
    in: e,
    out: t
    // ...util.normalizeParams(params),
  });
}
const Zx = /* @__PURE__ */ X("ZodReadonly", (e, t) => {
  eD.init(e, t), Me.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function Xx(e) {
  return new Zx({
    type: "readonly",
    innerType: e
  });
}
const Vx = /* @__PURE__ */ X("ZodCustom", (e, t) => {
  tD.init(e, t), Me.init(e, t);
});
function Hx(e, t = {}) {
  return qD(Vx, e, t);
}
function Gx(e) {
  return jD(e);
}
var qe = typeof globalThis < "u" && globalThis || typeof self < "u" && self || // eslint-disable-next-line no-undef
typeof global < "u" && global || {}, et = {
  searchParams: "URLSearchParams" in qe,
  iterable: "Symbol" in qe && "iterator" in Symbol,
  blob: "FileReader" in qe && "Blob" in qe && function() {
    try {
      return new Blob(), !0;
    } catch {
      return !1;
    }
  }(),
  formData: "FormData" in qe,
  arrayBuffer: "ArrayBuffer" in qe
};
function Yx(e) {
  return e && DataView.prototype.isPrototypeOf(e);
}
if (et.arrayBuffer)
  var Kx = [
    "[object Int8Array]",
    "[object Uint8Array]",
    "[object Uint8ClampedArray]",
    "[object Int16Array]",
    "[object Uint16Array]",
    "[object Int32Array]",
    "[object Uint32Array]",
    "[object Float32Array]",
    "[object Float64Array]"
  ], Jx = ArrayBuffer.isView || function(e) {
    return e && Kx.indexOf(Object.prototype.toString.call(e)) > -1;
  };
function Pr(e) {
  if (typeof e != "string" && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e) || e === "")
    throw new TypeError('Invalid character in header field name: "' + e + '"');
  return e.toLowerCase();
}
function Mu(e) {
  return typeof e != "string" && (e = String(e)), e;
}
function $u(e) {
  var t = {
    next: function() {
      var n = e.shift();
      return { done: n === void 0, value: n };
    }
  };
  return et.iterable && (t[Symbol.iterator] = function() {
    return t;
  }), t;
}
function Oe(e) {
  this.map = {}, e instanceof Oe ? e.forEach(function(t, n) {
    this.append(n, t);
  }, this) : Array.isArray(e) ? e.forEach(function(t) {
    if (t.length != 2)
      throw new TypeError("Headers constructor: expected name/value pair to be length 2, found" + t.length);
    this.append(t[0], t[1]);
  }, this) : e && Object.getOwnPropertyNames(e).forEach(function(t) {
    this.append(t, e[t]);
  }, this);
}
Oe.prototype.append = function(e, t) {
  e = Pr(e), t = Mu(t);
  var n = this.map[e];
  this.map[e] = n ? n + ", " + t : t;
};
Oe.prototype.delete = function(e) {
  delete this.map[Pr(e)];
};
Oe.prototype.get = function(e) {
  return e = Pr(e), this.has(e) ? this.map[e] : null;
};
Oe.prototype.has = function(e) {
  return this.map.hasOwnProperty(Pr(e));
};
Oe.prototype.set = function(e, t) {
  this.map[Pr(e)] = Mu(t);
};
Oe.prototype.forEach = function(e, t) {
  for (var n in this.map)
    this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this);
};
Oe.prototype.keys = function() {
  var e = [];
  return this.forEach(function(t, n) {
    e.push(n);
  }), $u(e);
};
Oe.prototype.values = function() {
  var e = [];
  return this.forEach(function(t) {
    e.push(t);
  }), $u(e);
};
Oe.prototype.entries = function() {
  var e = [];
  return this.forEach(function(t, n) {
    e.push([n, t]);
  }), $u(e);
};
et.iterable && (Oe.prototype[Symbol.iterator] = Oe.prototype.entries);
function lc(e) {
  if (!e._noBody) {
    if (e.bodyUsed)
      return Promise.reject(new TypeError("Already read"));
    e.bodyUsed = !0;
  }
}
function cm(e) {
  return new Promise(function(t, n) {
    e.onload = function() {
      t(e.result);
    }, e.onerror = function() {
      n(e.error);
    };
  });
}
function Qx(e) {
  var t = new FileReader(), n = cm(t);
  return t.readAsArrayBuffer(e), n;
}
function e_(e) {
  var t = new FileReader(), n = cm(t), r = /charset=([A-Za-z0-9_-]+)/.exec(e.type), i = r ? r[1] : "utf-8";
  return t.readAsText(e, i), n;
}
function t_(e) {
  for (var t = new Uint8Array(e), n = new Array(t.length), r = 0; r < t.length; r++)
    n[r] = String.fromCharCode(t[r]);
  return n.join("");
}
function Gl(e) {
  if (e.slice)
    return e.slice(0);
  var t = new Uint8Array(e.byteLength);
  return t.set(new Uint8Array(e)), t.buffer;
}
function sm() {
  return this.bodyUsed = !1, this._initBody = function(e) {
    this.bodyUsed = this.bodyUsed, this._bodyInit = e, e ? typeof e == "string" ? this._bodyText = e : et.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : et.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : et.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : et.arrayBuffer && et.blob && Yx(e) ? (this._bodyArrayBuffer = Gl(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : et.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || Jx(e)) ? this._bodyArrayBuffer = Gl(e) : this._bodyText = e = Object.prototype.toString.call(e) : (this._noBody = !0, this._bodyText = ""), this.headers.get("content-type") || (typeof e == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : et.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
  }, et.blob && (this.blob = function() {
    var e = lc(this);
    if (e)
      return e;
    if (this._bodyBlob)
      return Promise.resolve(this._bodyBlob);
    if (this._bodyArrayBuffer)
      return Promise.resolve(new Blob([this._bodyArrayBuffer]));
    if (this._bodyFormData)
      throw new Error("could not read FormData body as blob");
    return Promise.resolve(new Blob([this._bodyText]));
  }), this.arrayBuffer = function() {
    if (this._bodyArrayBuffer) {
      var e = lc(this);
      return e || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
        this._bodyArrayBuffer.buffer.slice(
          this._bodyArrayBuffer.byteOffset,
          this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
        )
      ) : Promise.resolve(this._bodyArrayBuffer));
    } else {
      if (et.blob)
        return this.blob().then(Qx);
      throw new Error("could not read as ArrayBuffer");
    }
  }, this.text = function() {
    var e = lc(this);
    if (e)
      return e;
    if (this._bodyBlob)
      return e_(this._bodyBlob);
    if (this._bodyArrayBuffer)
      return Promise.resolve(t_(this._bodyArrayBuffer));
    if (this._bodyFormData)
      throw new Error("could not read FormData body as text");
    return Promise.resolve(this._bodyText);
  }, et.formData && (this.formData = function() {
    return this.text().then(i_);
  }), this.json = function() {
    return this.text().then(JSON.parse);
  }, this;
}
var n_ = ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT", "TRACE"];
function r_(e) {
  var t = e.toUpperCase();
  return n_.indexOf(t) > -1 ? t : e;
}
function Xn(e, t) {
  if (!(this instanceof Xn))
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
  t = t || {};
  var n = t.body;
  if (e instanceof Xn) {
    if (e.bodyUsed)
      throw new TypeError("Already read");
    this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new Oe(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, !n && e._bodyInit != null && (n = e._bodyInit, e.bodyUsed = !0);
  } else
    this.url = String(e);
  if (this.credentials = t.credentials || this.credentials || "same-origin", (t.headers || !this.headers) && (this.headers = new Oe(t.headers)), this.method = r_(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal || function() {
    if ("AbortController" in qe) {
      var a = new AbortController();
      return a.signal;
    }
  }(), this.referrer = null, (this.method === "GET" || this.method === "HEAD") && n)
    throw new TypeError("Body not allowed for GET or HEAD requests");
  if (this._initBody(n), (this.method === "GET" || this.method === "HEAD") && (t.cache === "no-store" || t.cache === "no-cache")) {
    var r = /([?&])_=[^&]*/;
    if (r.test(this.url))
      this.url = this.url.replace(r, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
    else {
      var i = /\?/;
      this.url += (i.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
    }
  }
}
Xn.prototype.clone = function() {
  return new Xn(this, { body: this._bodyInit });
};
function i_(e) {
  var t = new FormData();
  return e.trim().split("&").forEach(function(n) {
    if (n) {
      var r = n.split("="), i = r.shift().replace(/\+/g, " "), a = r.join("=").replace(/\+/g, " ");
      t.append(decodeURIComponent(i), decodeURIComponent(a));
    }
  }), t;
}
function a_(e) {
  var t = new Oe(), n = e.replace(/\r?\n[\t ]+/g, " ");
  return n.split("\r").map(function(r) {
    return r.indexOf(`
`) === 0 ? r.substr(1, r.length) : r;
  }).forEach(function(r) {
    var i = r.split(":"), a = i.shift().trim();
    if (a) {
      var o = i.join(":").trim();
      try {
        t.append(a, o);
      } catch (c) {
        console.warn("Response " + c.message);
      }
    }
  }), t;
}
sm.call(Xn.prototype);
function Vt(e, t) {
  if (!(this instanceof Vt))
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
  if (t || (t = {}), this.type = "default", this.status = t.status === void 0 ? 200 : t.status, this.status < 200 || this.status > 599)
    throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
  this.ok = this.status >= 200 && this.status < 300, this.statusText = t.statusText === void 0 ? "" : "" + t.statusText, this.headers = new Oe(t.headers), this.url = t.url || "", this._initBody(e);
}
sm.call(Vt.prototype);
Vt.prototype.clone = function() {
  return new Vt(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Oe(this.headers),
    url: this.url
  });
};
Vt.error = function() {
  var e = new Vt(null, { status: 200, statusText: "" });
  return e.ok = !1, e.status = 0, e.type = "error", e;
};
var o_ = [301, 302, 303, 307, 308];
Vt.redirect = function(e, t) {
  if (o_.indexOf(t) === -1)
    throw new RangeError("Invalid status code");
  return new Vt(null, { status: t, headers: { location: e } });
};
var Nn = qe.DOMException;
try {
  new Nn();
} catch {
  Nn = function(t, n) {
    this.message = t, this.name = n;
    var r = Error(t);
    this.stack = r.stack;
  }, Nn.prototype = Object.create(Error.prototype), Nn.prototype.constructor = Nn;
}
function um(e, t) {
  return new Promise(function(n, r) {
    var i = new Xn(e, t);
    if (i.signal && i.signal.aborted)
      return r(new Nn("Aborted", "AbortError"));
    var a = new XMLHttpRequest();
    function o() {
      a.abort();
    }
    a.onload = function() {
      var s = {
        statusText: a.statusText,
        headers: a_(a.getAllResponseHeaders() || "")
      };
      i.url.indexOf("file://") === 0 && (a.status < 200 || a.status > 599) ? s.status = 200 : s.status = a.status, s.url = "responseURL" in a ? a.responseURL : s.headers.get("X-Request-URL");
      var d = "response" in a ? a.response : a.responseText;
      setTimeout(function() {
        n(new Vt(d, s));
      }, 0);
    }, a.onerror = function() {
      setTimeout(function() {
        r(new TypeError("Network request failed"));
      }, 0);
    }, a.ontimeout = function() {
      setTimeout(function() {
        r(new TypeError("Network request timed out"));
      }, 0);
    }, a.onabort = function() {
      setTimeout(function() {
        r(new Nn("Aborted", "AbortError"));
      }, 0);
    };
    function c(s) {
      try {
        return s === "" && qe.location.href ? qe.location.href : s;
      } catch {
        return s;
      }
    }
    if (a.open(i.method, c(i.url), !0), i.credentials === "include" ? a.withCredentials = !0 : i.credentials === "omit" && (a.withCredentials = !1), "responseType" in a && (et.blob ? a.responseType = "blob" : et.arrayBuffer && (a.responseType = "arraybuffer")), t && typeof t.headers == "object" && !(t.headers instanceof Oe || qe.Headers && t.headers instanceof qe.Headers)) {
      var u = [];
      Object.getOwnPropertyNames(t.headers).forEach(function(s) {
        u.push(Pr(s)), a.setRequestHeader(s, Mu(t.headers[s]));
      }), i.headers.forEach(function(s, d) {
        u.indexOf(d) === -1 && a.setRequestHeader(d, s);
      });
    } else
      i.headers.forEach(function(s, d) {
        a.setRequestHeader(d, s);
      });
    i.signal && (i.signal.addEventListener("abort", o), a.onreadystatechange = function() {
      a.readyState === 4 && i.signal.removeEventListener("abort", o);
    }), a.send(typeof i._bodyInit > "u" ? null : i._bodyInit);
  });
}
um.polyfill = !0;
qe.fetch || (qe.fetch = um, qe.Headers = Oe, qe.Request = Xn, qe.Response = Vt);
const dm = "11434", lm = `http://127.0.0.1:${dm}`, c_ = "0.5.17";
var s_ = Object.defineProperty, u_ = (e, t, n) => t in e ? s_(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, fc = (e, t, n) => (u_(e, typeof t != "symbol" ? t + "" : t, n), n);
class Pu extends Error {
  constructor(t, n) {
    super(t), this.error = t, this.status_code = n, this.name = "ResponseError", Error.captureStackTrace && Error.captureStackTrace(this, Pu);
  }
}
class d_ {
  constructor(t, n, r) {
    fc(this, "abortController"), fc(this, "itr"), fc(this, "doneCallback"), this.abortController = t, this.itr = n, this.doneCallback = r;
  }
  abort() {
    this.abortController.abort();
  }
  async *[Symbol.asyncIterator]() {
    for await (const t of this.itr) {
      if ("error" in t)
        throw new Error(t.error);
      if (yield t, t.done || t.status === "success") {
        this.doneCallback();
        return;
      }
    }
    throw new Error("Did not receive done or success response in stream.");
  }
}
const zu = async (e) => {
  var r;
  if (e.ok)
    return;
  let t = `Error ${e.status}: ${e.statusText}`, n = null;
  if ((r = e.headers.get("content-type")) != null && r.includes("application/json"))
    try {
      n = await e.json(), t = n.error || t;
    } catch {
      console.log("Failed to parse error response as JSON");
    }
  else
    try {
      console.log("Getting text from response"), t = await e.text() || t;
    } catch {
      console.log("Failed to get text from error response");
    }
  throw new Pu(t, e.status);
};
function l_() {
  var e;
  if (typeof window < "u" && window.navigator) {
    const t = navigator;
    return "userAgentData" in t && ((e = t.userAgentData) != null && e.platform) ? `${t.userAgentData.platform.toLowerCase()} Browser/${navigator.userAgent};` : navigator.platform ? `${navigator.platform.toLowerCase()} Browser/${navigator.userAgent};` : `unknown Browser/${navigator.userAgent};`;
  } else if (typeof process < "u")
    return `${process.arch} ${process.platform} Node.js/${process.version}`;
  return "";
}
function f_(e) {
  if (e instanceof Headers) {
    const t = {};
    return e.forEach((n, r) => {
      t[r] = n;
    }), t;
  } else return Array.isArray(e) ? Object.fromEntries(e) : e || {};
}
const qu = async (e, t, n = {}) => {
  const r = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent": `ollama-js/${c_} (${l_()})`
  };
  n.headers = f_(n.headers);
  const i = Object.fromEntries(
    Object.entries(n.headers).filter(([a]) => !Object.keys(r).some((o) => o.toLowerCase() === a.toLowerCase()))
  );
  return n.headers = {
    ...r,
    ...i
  }, e(t, n);
}, Yl = async (e, t, n) => {
  const r = await qu(e, t, {
    headers: n == null ? void 0 : n.headers
  });
  return await zu(r), r;
}, fr = async (e, t, n, r) => {
  const a = ((c) => c !== null && typeof c == "object" && !Array.isArray(c))(n) ? JSON.stringify(n) : n, o = await qu(e, t, {
    method: "POST",
    body: a,
    signal: r == null ? void 0 : r.signal,
    headers: r == null ? void 0 : r.headers
  });
  return await zu(o), o;
}, h_ = async (e, t, n, r) => {
  const i = await qu(e, t, {
    method: "DELETE",
    body: JSON.stringify(n),
    headers: r == null ? void 0 : r.headers
  });
  return await zu(i), i;
}, p_ = async function* (e) {
  const t = new TextDecoder("utf-8");
  let n = "";
  const r = e.getReader();
  for (; ; ) {
    const { done: i, value: a } = await r.read();
    if (i)
      break;
    n += t.decode(a);
    const o = n.split(`
`);
    n = o.pop() ?? "";
    for (const c of o)
      try {
        yield JSON.parse(c);
      } catch {
        console.warn("invalid json: ", c);
      }
  }
  for (const i of n.split(`
`).filter((a) => a !== ""))
    try {
      yield JSON.parse(i);
    } catch {
      console.warn("invalid json: ", i);
    }
}, g_ = (e) => {
  if (!e)
    return lm;
  let t = e.includes("://");
  e.startsWith(":") && (e = `http://127.0.0.1${e}`, t = !0), t || (e = `http://${e}`);
  const n = new URL(e);
  let r = n.port;
  r || (t ? r = n.protocol === "https:" ? "443" : "80" : r = dm);
  let i = "";
  n.username && (i = n.username, n.password && (i += `:${n.password}`), i += "@");
  let a = `${n.protocol}//${i}${n.hostname}:${r}${n.pathname}`;
  return a.endsWith("/") && (a = a.slice(0, -1)), a;
};
var m_ = Object.defineProperty, b_ = (e, t, n) => t in e ? m_(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, hc = (e, t, n) => (b_(e, typeof t != "symbol" ? t + "" : t, n), n);
let fm = class {
  constructor(t) {
    hc(this, "config"), hc(this, "fetch"), hc(this, "ongoingStreamedRequests", []), this.config = {
      host: "",
      headers: t == null ? void 0 : t.headers
    }, t != null && t.proxy || (this.config.host = g_((t == null ? void 0 : t.host) ?? lm)), this.fetch = (t == null ? void 0 : t.fetch) ?? fetch;
  }
  // Abort any ongoing streamed requests to Ollama
  abort() {
    for (const t of this.ongoingStreamedRequests)
      t.abort();
    this.ongoingStreamedRequests.length = 0;
  }
  /**
   * Processes a request to the Ollama server. If the request is streamable, it will return a
   * AbortableAsyncIterator that yields the response messages. Otherwise, it will return the response
   * object.
   * @param endpoint {string} - The endpoint to send the request to.
   * @param request {object} - The request object to send to the endpoint.
   * @protected {T | AbortableAsyncIterator<T>} - The response object or a AbortableAsyncIterator that yields
   * response messages.
   * @throws {Error} - If the response body is missing or if the response is an error.
   * @returns {Promise<T | AbortableAsyncIterator<T>>} - The response object or a AbortableAsyncIterator that yields the streamed response.
   */
  async processStreamableRequest(t, n) {
    n.stream = n.stream ?? !1;
    const r = `${this.config.host}/api/${t}`;
    if (n.stream) {
      const a = new AbortController(), o = await fr(this.fetch, r, n, {
        signal: a.signal,
        headers: this.config.headers
      });
      if (!o.body)
        throw new Error("Missing body");
      const c = p_(o.body), u = new d_(
        a,
        c,
        () => {
          const s = this.ongoingStreamedRequests.indexOf(u);
          s > -1 && this.ongoingStreamedRequests.splice(s, 1);
        }
      );
      return this.ongoingStreamedRequests.push(u), u;
    }
    return await (await fr(this.fetch, r, n, {
      headers: this.config.headers
    })).json();
  }
  /**
   * Encodes an image to base64 if it is a Uint8Array.
   * @param image {Uint8Array | string} - The image to encode.
   * @returns {Promise<string>} - The base64 encoded image.
   */
  async encodeImage(t) {
    if (typeof t != "string") {
      const n = new Uint8Array(t);
      let r = "";
      const i = n.byteLength;
      for (let a = 0; a < i; a++)
        r += String.fromCharCode(n[a]);
      return btoa(r);
    }
    return t;
  }
  /**
   * Generates a response from a text prompt.
   * @param request {GenerateRequest} - The request object.
   * @returns {Promise<GenerateResponse | AbortableAsyncIterator<GenerateResponse>>} - The response object or
   * an AbortableAsyncIterator that yields response messages.
   */
  async generate(t) {
    return t.images && (t.images = await Promise.all(t.images.map(this.encodeImage.bind(this)))), this.processStreamableRequest("generate", t);
  }
  /**
   * Chats with the model. The request object can contain messages with images that are either
   * Uint8Arrays or base64 encoded strings. The images will be base64 encoded before sending the
   * request.
   * @param request {ChatRequest} - The request object.
   * @returns {Promise<ChatResponse | AbortableAsyncIterator<ChatResponse>>} - The response object or an
   * AbortableAsyncIterator that yields response messages.
   */
  async chat(t) {
    if (t.messages)
      for (const n of t.messages)
        n.images && (n.images = await Promise.all(
          n.images.map(this.encodeImage.bind(this))
        ));
    return this.processStreamableRequest("chat", t);
  }
  /**
   * Creates a new model from a stream of data.
   * @param request {CreateRequest} - The request object.
   * @returns {Promise<ProgressResponse | AbortableAsyncIterator<ProgressResponse>>} - The response object or a stream of progress responses.
   */
  async create(t) {
    return this.processStreamableRequest("create", {
      ...t
    });
  }
  /**
   * Pulls a model from the Ollama registry. The request object can contain a stream flag to indicate if the
   * response should be streamed.
   * @param request {PullRequest} - The request object.
   * @returns {Promise<ProgressResponse | AbortableAsyncIterator<ProgressResponse>>} - The response object or
   * an AbortableAsyncIterator that yields response messages.
   */
  async pull(t) {
    return this.processStreamableRequest("pull", {
      name: t.model,
      stream: t.stream,
      insecure: t.insecure
    });
  }
  /**
   * Pushes a model to the Ollama registry. The request object can contain a stream flag to indicate if the
   * response should be streamed.
   * @param request {PushRequest} - The request object.
   * @returns {Promise<ProgressResponse | AbortableAsyncIterator<ProgressResponse>>} - The response object or
   * an AbortableAsyncIterator that yields response messages.
   */
  async push(t) {
    return this.processStreamableRequest("push", {
      name: t.model,
      stream: t.stream,
      insecure: t.insecure
    });
  }
  /**
   * Deletes a model from the server. The request object should contain the name of the model to
   * delete.
   * @param request {DeleteRequest} - The request object.
   * @returns {Promise<StatusResponse>} - The response object.
   */
  async delete(t) {
    return await h_(
      this.fetch,
      `${this.config.host}/api/delete`,
      { name: t.model },
      { headers: this.config.headers }
    ), { status: "success" };
  }
  /**
   * Copies a model from one name to another. The request object should contain the name of the
   * model to copy and the new name.
   * @param request {CopyRequest} - The request object.
   * @returns {Promise<StatusResponse>} - The response object.
   */
  async copy(t) {
    return await fr(this.fetch, `${this.config.host}/api/copy`, { ...t }, {
      headers: this.config.headers
    }), { status: "success" };
  }
  /**
   * Lists the models on the server.
   * @returns {Promise<ListResponse>} - The response object.
   * @throws {Error} - If the response body is missing.
   */
  async list() {
    return await (await Yl(this.fetch, `${this.config.host}/api/tags`, {
      headers: this.config.headers
    })).json();
  }
  /**
   * Shows the metadata of a model. The request object should contain the name of the model.
   * @param request {ShowRequest} - The request object.
   * @returns {Promise<ShowResponse>} - The response object.
   */
  async show(t) {
    return await (await fr(this.fetch, `${this.config.host}/api/show`, {
      ...t
    }, {
      headers: this.config.headers
    })).json();
  }
  /**
   * Embeds text input into vectors.
   * @param request {EmbedRequest} - The request object.
   * @returns {Promise<EmbedResponse>} - The response object.
   */
  async embed(t) {
    return await (await fr(this.fetch, `${this.config.host}/api/embed`, {
      ...t
    }, {
      headers: this.config.headers
    })).json();
  }
  /**
   * Embeds a text prompt into a vector.
   * @param request {EmbeddingsRequest} - The request object.
   * @returns {Promise<EmbeddingsResponse>} - The response object.
   */
  async embeddings(t) {
    return await (await fr(this.fetch, `${this.config.host}/api/embeddings`, {
      ...t
    }, {
      headers: this.config.headers
    })).json();
  }
  /**
   * Lists the running models on the server
   * @returns {Promise<ListResponse>} - The response object.
   * @throws {Error} - If the response body is missing.
   */
  async ps() {
    return await (await Yl(this.fetch, `${this.config.host}/api/ps`, {
      headers: this.config.headers
    })).json();
  }
};
new fm();
class y_ extends fm {
  async encodeImage(t) {
    if (typeof t != "string")
      return Buffer.from(t).toString("base64");
    try {
      if (Lg.existsSync(t)) {
        const n = await Sl.readFile(Fl(t));
        return Buffer.from(n).toString("base64");
      }
    } catch {
    }
    return t;
  }
  /**
   * checks if a file exists
   * @param path {string} - The path to the file
   * @private @internal
   * @returns {Promise<boolean>} - Whether the file exists or not
   */
  async fileExists(t) {
    try {
      return await Sl.access(t), !0;
    } catch {
      return !1;
    }
  }
  async create(t) {
    if (t.from && await this.fileExists(Fl(t.from)))
      throw Error("Creating with a local path is not currently supported from ollama-js");
    return t.stream ? super.create(t) : super.create(t);
  }
}
const di = new y_();
var re = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function v_(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function D_(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(e, r);
    Object.defineProperty(n, r, i.get ? i : {
      enumerable: !0,
      get: function() {
        return e[r];
      }
    });
  }), n;
}
var ju = { exports: {} };
function hm(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var At = {};
At.getBooleanOption = (e, t) => {
  let n = !1;
  if (t in e && typeof (n = e[t]) != "boolean")
    throw new TypeError(`Expected the "${t}" option to be a boolean`);
  return n;
};
At.cppdb = Symbol();
At.inspect = Symbol.for("nodejs.util.inspect.custom");
const bu = { value: "SqliteError", writable: !0, enumerable: !1, configurable: !0 };
function $n(e, t) {
  if (new.target !== $n)
    return new $n(e, t);
  if (typeof t != "string")
    throw new TypeError("Expected second argument to be a string");
  Error.call(this, e), bu.value = "" + e, Object.defineProperty(this, "message", bu), Error.captureStackTrace(this, $n), this.code = t;
}
Object.setPrototypeOf($n, Error);
Object.setPrototypeOf($n.prototype, Error.prototype);
Object.defineProperty($n.prototype, "name", bu);
var pm = $n, aa = { exports: {} }, pc, Kl;
function x_() {
  if (Kl) return pc;
  Kl = 1;
  var e = Mr.sep || "/";
  pc = t;
  function t(n) {
    if (typeof n != "string" || n.length <= 7 || n.substring(0, 7) != "file://")
      throw new TypeError("must pass in a file:// URI to convert to a file path");
    var r = decodeURI(n.substring(7)), i = r.indexOf("/"), a = r.substring(0, i), o = r.substring(i + 1);
    return a == "localhost" && (a = ""), a && (a = e + e + a), o = o.replace(/^(.+)\|/, "$1:"), e == "\\" && (o = o.replace(/\//g, "\\")), /^.+\:/.test(o) || (o = e + o), a + o;
  }
  return pc;
}
var Jl;
function __() {
  return Jl || (Jl = 1, function(e, t) {
    var n = Wi, r = Mr, i = x_(), a = r.join, o = r.dirname, c = n.accessSync && function(d) {
      try {
        n.accessSync(d);
      } catch {
        return !1;
      }
      return !0;
    } || n.existsSync || r.existsSync, u = {
      arrow: process.env.NODE_BINDINGS_ARROW || " → ",
      compiled: process.env.NODE_BINDINGS_COMPILED_DIR || "compiled",
      platform: process.platform,
      arch: process.arch,
      nodePreGyp: "node-v" + process.versions.modules + "-" + process.platform + "-" + process.arch,
      version: process.versions.node,
      bindings: "bindings.node",
      try: [
        // node-gyp's linked version in the "build" dir
        ["module_root", "build", "bindings"],
        // node-waf and gyp_addon (a.k.a node-gyp)
        ["module_root", "build", "Debug", "bindings"],
        ["module_root", "build", "Release", "bindings"],
        // Debug files, for development (legacy behavior, remove for node v0.9)
        ["module_root", "out", "Debug", "bindings"],
        ["module_root", "Debug", "bindings"],
        // Release files, but manually compiled (legacy behavior, remove for node v0.9)
        ["module_root", "out", "Release", "bindings"],
        ["module_root", "Release", "bindings"],
        // Legacy from node-waf, node <= 0.4.x
        ["module_root", "build", "default", "bindings"],
        // Production "Release" buildtype binary (meh...)
        ["module_root", "compiled", "version", "platform", "arch", "bindings"],
        // node-qbs builds
        ["module_root", "addon-build", "release", "install-root", "bindings"],
        ["module_root", "addon-build", "debug", "install-root", "bindings"],
        ["module_root", "addon-build", "default", "install-root", "bindings"],
        // node-pre-gyp path ./lib/binding/{node_abi}-{platform}-{arch}
        ["module_root", "lib", "binding", "nodePreGyp", "bindings"]
      ]
    };
    function s(d) {
      typeof d == "string" ? d = { bindings: d } : d || (d = {}), Object.keys(u).map(function(l) {
        l in d || (d[l] = u[l]);
      }), d.module_root || (d.module_root = t.getRoot(t.getFileName())), r.extname(d.bindings) != ".node" && (d.bindings += ".node");
      for (var g = typeof __webpack_require__ == "function" ? __non_webpack_require__ : hm, f = [], p = 0, b = d.try.length, m, y, h; p < b; p++) {
        m = a.apply(
          null,
          d.try[p].map(function(l) {
            return d[l] || l;
          })
        ), f.push(m);
        try {
          return y = d.path ? g.resolve(m) : g(m), d.path || (y.path = m), y;
        } catch (l) {
          if (l.code !== "MODULE_NOT_FOUND" && l.code !== "QUALIFIED_PATH_RESOLUTION_FAILED" && !/not find/i.test(l.message))
            throw l;
        }
      }
      throw h = new Error(
        `Could not locate the bindings file. Tried:
` + f.map(function(l) {
          return d.arrow + l;
        }).join(`
`)
      ), h.tries = f, h;
    }
    e.exports = t = s, t.getFileName = function(g) {
      var f = Error.prepareStackTrace, p = Error.stackTraceLimit, b = {}, m;
      Error.stackTraceLimit = 10, Error.prepareStackTrace = function(h, l) {
        for (var v = 0, D = l.length; v < D; v++)
          if (m = l[v].getFileName(), m !== __filename)
            if (g) {
              if (m !== g)
                return;
            } else
              return;
      }, Error.captureStackTrace(b), b.stack, Error.prepareStackTrace = f, Error.stackTraceLimit = p;
      var y = "file://";
      return m.indexOf(y) === 0 && (m = i(m)), m;
    }, t.getRoot = function(g) {
      for (var f = o(g), p; ; ) {
        if (f === "." && (f = process.cwd()), c(a(f, "package.json")) || c(a(f, "node_modules")))
          return f;
        if (p === f)
          throw new Error(
            'Could not find module root given file: "' + g + '". Do you have a `package.json` file? '
          );
        p = f, f = a(f, "..");
      }
    };
  }(aa, aa.exports)), aa.exports;
}
var tn = {}, Ql;
function w_() {
  if (Ql) return tn;
  Ql = 1;
  const { cppdb: e } = At;
  return tn.prepare = function(n) {
    return this[e].prepare(n, this, !1);
  }, tn.exec = function(n) {
    return this[e].exec(n), this;
  }, tn.close = function() {
    return this[e].close(), this;
  }, tn.loadExtension = function(...n) {
    return this[e].loadExtension(...n), this;
  }, tn.defaultSafeIntegers = function(...n) {
    return this[e].defaultSafeIntegers(...n), this;
  }, tn.unsafeMode = function(...n) {
    return this[e].unsafeMode(...n), this;
  }, tn.getters = {
    name: {
      get: function() {
        return this[e].name;
      },
      enumerable: !0
    },
    open: {
      get: function() {
        return this[e].open;
      },
      enumerable: !0
    },
    inTransaction: {
      get: function() {
        return this[e].inTransaction;
      },
      enumerable: !0
    },
    readonly: {
      get: function() {
        return this[e].readonly;
      },
      enumerable: !0
    },
    memory: {
      get: function() {
        return this[e].memory;
      },
      enumerable: !0
    }
  }, tn;
}
var gc, ef;
function T_() {
  if (ef) return gc;
  ef = 1;
  const { cppdb: e } = At, t = /* @__PURE__ */ new WeakMap();
  gc = function(a) {
    if (typeof a != "function") throw new TypeError("Expected first argument to be a function");
    const o = this[e], c = n(o, this), { apply: u } = Function.prototype, s = {
      default: { value: r(u, a, o, c.default) },
      deferred: { value: r(u, a, o, c.deferred) },
      immediate: { value: r(u, a, o, c.immediate) },
      exclusive: { value: r(u, a, o, c.exclusive) },
      database: { value: this, enumerable: !0 }
    };
    return Object.defineProperties(s.default.value, s), Object.defineProperties(s.deferred.value, s), Object.defineProperties(s.immediate.value, s), Object.defineProperties(s.exclusive.value, s), s.default.value;
  };
  const n = (i, a) => {
    let o = t.get(i);
    if (!o) {
      const c = {
        commit: i.prepare("COMMIT", a, !1),
        rollback: i.prepare("ROLLBACK", a, !1),
        savepoint: i.prepare("SAVEPOINT `	_bs3.	`", a, !1),
        release: i.prepare("RELEASE `	_bs3.	`", a, !1),
        rollbackTo: i.prepare("ROLLBACK TO `	_bs3.	`", a, !1)
      };
      t.set(i, o = {
        default: Object.assign({ begin: i.prepare("BEGIN", a, !1) }, c),
        deferred: Object.assign({ begin: i.prepare("BEGIN DEFERRED", a, !1) }, c),
        immediate: Object.assign({ begin: i.prepare("BEGIN IMMEDIATE", a, !1) }, c),
        exclusive: Object.assign({ begin: i.prepare("BEGIN EXCLUSIVE", a, !1) }, c)
      });
    }
    return o;
  }, r = (i, a, o, { begin: c, commit: u, rollback: s, savepoint: d, release: g, rollbackTo: f }) => function() {
    let b, m, y;
    o.inTransaction ? (b = d, m = g, y = f) : (b = c, m = u, y = s), b.run();
    try {
      const h = i.call(a, this, arguments);
      if (h && typeof h.then == "function")
        throw new TypeError("Transaction function cannot return a promise");
      return m.run(), h;
    } catch (h) {
      throw o.inTransaction && (y.run(), y !== s && m.run()), h;
    }
  };
  return gc;
}
var mc, tf;
function U_() {
  if (tf) return mc;
  tf = 1;
  const { getBooleanOption: e, cppdb: t } = At;
  return mc = function(r, i) {
    if (i == null && (i = {}), typeof r != "string") throw new TypeError("Expected first argument to be a string");
    if (typeof i != "object") throw new TypeError("Expected second argument to be an options object");
    const a = e(i, "simple"), o = this[t].prepare(`PRAGMA ${r}`, this, !0);
    return a ? o.pluck().get() : o.all();
  }, mc;
}
var bc, nf;
function E_() {
  if (nf) return bc;
  nf = 1;
  const e = Wi, t = Mr, { promisify: n } = io, { cppdb: r } = At, i = n(e.access);
  bc = async function(c, u) {
    if (u == null && (u = {}), typeof c != "string") throw new TypeError("Expected first argument to be a string");
    if (typeof u != "object") throw new TypeError("Expected second argument to be an options object");
    c = c.trim();
    const s = "attached" in u ? u.attached : "main", d = "progress" in u ? u.progress : null;
    if (!c) throw new TypeError("Backup filename cannot be an empty string");
    if (c === ":memory:") throw new TypeError('Invalid backup filename ":memory:"');
    if (typeof s != "string") throw new TypeError('Expected the "attached" option to be a string');
    if (!s) throw new TypeError('The "attached" option cannot be an empty string');
    if (d != null && typeof d != "function") throw new TypeError('Expected the "progress" option to be a function');
    await i(t.dirname(c)).catch(() => {
      throw new TypeError("Cannot save backup because the directory does not exist");
    });
    const g = await i(c).then(() => !1, () => !0);
    return a(this[r].backup(this, s, c, g), d || null);
  };
  const a = (o, c) => {
    let u = 0, s = !0;
    return new Promise((d, g) => {
      setImmediate(function f() {
        try {
          const p = o.transfer(u);
          if (!p.remainingPages) {
            o.close(), d(p);
            return;
          }
          if (s && (s = !1, u = 100), c) {
            const b = c(p);
            if (b !== void 0)
              if (typeof b == "number" && b === b) u = Math.max(0, Math.min(2147483647, Math.round(b)));
              else throw new TypeError("Expected progress callback to return a number or undefined");
          }
          setImmediate(f);
        } catch (p) {
          o.close(), g(p);
        }
      });
    });
  };
  return bc;
}
var yc, rf;
function A_() {
  if (rf) return yc;
  rf = 1;
  const { cppdb: e } = At;
  return yc = function(n) {
    if (n == null && (n = {}), typeof n != "object") throw new TypeError("Expected first argument to be an options object");
    const r = "attached" in n ? n.attached : "main";
    if (typeof r != "string") throw new TypeError('Expected the "attached" option to be a string');
    if (!r) throw new TypeError('The "attached" option cannot be an empty string');
    return this[e].serialize(r);
  }, yc;
}
var vc, af;
function C_() {
  if (af) return vc;
  af = 1;
  const { getBooleanOption: e, cppdb: t } = At;
  return vc = function(r, i, a) {
    if (i == null && (i = {}), typeof i == "function" && (a = i, i = {}), typeof r != "string") throw new TypeError("Expected first argument to be a string");
    if (typeof a != "function") throw new TypeError("Expected last argument to be a function");
    if (typeof i != "object") throw new TypeError("Expected second argument to be an options object");
    if (!r) throw new TypeError("User-defined function name cannot be an empty string");
    const o = "safeIntegers" in i ? +e(i, "safeIntegers") : 2, c = e(i, "deterministic"), u = e(i, "directOnly"), s = e(i, "varargs");
    let d = -1;
    if (!s) {
      if (d = a.length, !Number.isInteger(d) || d < 0) throw new TypeError("Expected function.length to be a positive integer");
      if (d > 100) throw new RangeError("User-defined functions cannot have more than 100 arguments");
    }
    return this[t].function(a, r, d, o, c, u), this;
  }, vc;
}
var Dc, of;
function F_() {
  if (of) return Dc;
  of = 1;
  const { getBooleanOption: e, cppdb: t } = At;
  Dc = function(a, o) {
    if (typeof a != "string") throw new TypeError("Expected first argument to be a string");
    if (typeof o != "object" || o === null) throw new TypeError("Expected second argument to be an options object");
    if (!a) throw new TypeError("User-defined function name cannot be an empty string");
    const c = "start" in o ? o.start : null, u = n(o, "step", !0), s = n(o, "inverse", !1), d = n(o, "result", !1), g = "safeIntegers" in o ? +e(o, "safeIntegers") : 2, f = e(o, "deterministic"), p = e(o, "directOnly"), b = e(o, "varargs");
    let m = -1;
    if (!b && (m = Math.max(r(u), s ? r(s) : 0), m > 0 && (m -= 1), m > 100))
      throw new RangeError("User-defined functions cannot have more than 100 arguments");
    return this[t].aggregate(c, u, s, d, a, m, g, f, p), this;
  };
  const n = (i, a, o) => {
    const c = a in i ? i[a] : null;
    if (typeof c == "function") return c;
    if (c != null) throw new TypeError(`Expected the "${a}" option to be a function`);
    if (o) throw new TypeError(`Missing required option "${a}"`);
    return null;
  }, r = ({ length: i }) => {
    if (Number.isInteger(i) && i >= 0) return i;
    throw new TypeError("Expected function.length to be a positive integer");
  };
  return Dc;
}
var xc, cf;
function S_() {
  if (cf) return xc;
  cf = 1;
  const { cppdb: e } = At;
  xc = function(p, b) {
    if (typeof p != "string") throw new TypeError("Expected first argument to be a string");
    if (!p) throw new TypeError("Virtual table module name cannot be an empty string");
    let m = !1;
    if (typeof b == "object" && b !== null)
      m = !0, b = g(n(b, "used", p));
    else {
      if (typeof b != "function") throw new TypeError("Expected second argument to be a function or a table definition object");
      b = t(b);
    }
    return this[e].table(b, p, m), this;
  };
  function t(f) {
    return function(b, m, y, ...h) {
      const l = {
        module: b,
        database: m,
        table: y
      }, v = u.call(f, l, h);
      if (typeof v != "object" || v === null)
        throw new TypeError(`Virtual table module "${b}" did not return a table definition object`);
      return n(v, "returned", b);
    };
  }
  function n(f, p, b) {
    if (!c.call(f, "rows"))
      throw new TypeError(`Virtual table module "${b}" ${p} a table definition without a "rows" property`);
    if (!c.call(f, "columns"))
      throw new TypeError(`Virtual table module "${b}" ${p} a table definition without a "columns" property`);
    const m = f.rows;
    if (typeof m != "function" || Object.getPrototypeOf(m) !== s)
      throw new TypeError(`Virtual table module "${b}" ${p} a table definition with an invalid "rows" property (should be a generator function)`);
    let y = f.columns;
    if (!Array.isArray(y) || !(y = [...y]).every((x) => typeof x == "string"))
      throw new TypeError(`Virtual table module "${b}" ${p} a table definition with an invalid "columns" property (should be an array of strings)`);
    if (y.length !== new Set(y).size)
      throw new TypeError(`Virtual table module "${b}" ${p} a table definition with duplicate column names`);
    if (!y.length)
      throw new RangeError(`Virtual table module "${b}" ${p} a table definition with zero columns`);
    let h;
    if (c.call(f, "parameters")) {
      if (h = f.parameters, !Array.isArray(h) || !(h = [...h]).every((x) => typeof x == "string"))
        throw new TypeError(`Virtual table module "${b}" ${p} a table definition with an invalid "parameters" property (should be an array of strings)`);
    } else
      h = o(m);
    if (h.length !== new Set(h).size)
      throw new TypeError(`Virtual table module "${b}" ${p} a table definition with duplicate parameter names`);
    if (h.length > 32)
      throw new RangeError(`Virtual table module "${b}" ${p} a table definition with more than the maximum number of 32 parameters`);
    for (const x of h)
      if (y.includes(x))
        throw new TypeError(`Virtual table module "${b}" ${p} a table definition with column "${x}" which was ambiguously defined as both a column and parameter`);
    let l = 2;
    if (c.call(f, "safeIntegers")) {
      const x = f.safeIntegers;
      if (typeof x != "boolean")
        throw new TypeError(`Virtual table module "${b}" ${p} a table definition with an invalid "safeIntegers" property (should be a boolean)`);
      l = +x;
    }
    let v = !1;
    if (c.call(f, "directOnly") && (v = f.directOnly, typeof v != "boolean"))
      throw new TypeError(`Virtual table module "${b}" ${p} a table definition with an invalid "directOnly" property (should be a boolean)`);
    return [
      `CREATE TABLE x(${[
        ...h.map(d).map((x) => `${x} HIDDEN`),
        ...y.map(d)
      ].join(", ")});`,
      r(m, new Map(y.map((x, w) => [x, h.length + w])), b),
      h,
      l,
      v
    ];
  }
  function r(f, p, b) {
    return function* (...y) {
      const h = y.map((l) => Buffer.isBuffer(l) ? Buffer.from(l) : l);
      for (let l = 0; l < p.size; ++l)
        h.push(null);
      for (const l of f(...y))
        if (Array.isArray(l))
          i(l, h, p.size, b), yield h;
        else if (typeof l == "object" && l !== null)
          a(l, h, p, b), yield h;
        else
          throw new TypeError(`Virtual table module "${b}" yielded something that isn't a valid row object`);
    };
  }
  function i(f, p, b, m) {
    if (f.length !== b)
      throw new TypeError(`Virtual table module "${m}" yielded a row with an incorrect number of columns`);
    const y = p.length - b;
    for (let h = 0; h < b; ++h)
      p[h + y] = f[h];
  }
  function a(f, p, b, m) {
    let y = 0;
    for (const h of Object.keys(f)) {
      const l = b.get(h);
      if (l === void 0)
        throw new TypeError(`Virtual table module "${m}" yielded a row with an undeclared column "${h}"`);
      p[l] = f[h], y += 1;
    }
    if (y !== b.size)
      throw new TypeError(`Virtual table module "${m}" yielded a row with missing columns`);
  }
  function o({ length: f }) {
    if (!Number.isInteger(f) || f < 0)
      throw new TypeError("Expected function.length to be a positive integer");
    const p = [];
    for (let b = 0; b < f; ++b)
      p.push(`$${b + 1}`);
    return p;
  }
  const { hasOwnProperty: c } = Object.prototype, { apply: u } = Function.prototype, s = Object.getPrototypeOf(function* () {
  }), d = (f) => `"${f.replace(/"/g, '""')}"`, g = (f) => () => f;
  return xc;
}
var _c, sf;
function k_() {
  if (sf) return _c;
  sf = 1;
  const e = function() {
  };
  return _c = function(n, r) {
    return Object.assign(new e(), this);
  }, _c;
}
const B_ = Wi, uf = Mr, Fa = At, R_ = pm;
let df;
function Ke(e, t) {
  if (new.target == null)
    return new Ke(e, t);
  let n;
  if (Buffer.isBuffer(e) && (n = e, e = ":memory:"), e == null && (e = ""), t == null && (t = {}), typeof e != "string") throw new TypeError("Expected first argument to be a string");
  if (typeof t != "object") throw new TypeError("Expected second argument to be an options object");
  if ("readOnly" in t) throw new TypeError('Misspelled option "readOnly" should be "readonly"');
  if ("memory" in t) throw new TypeError('Option "memory" was removed in v7.0.0 (use ":memory:" filename instead)');
  const r = e.trim(), i = r === "" || r === ":memory:", a = Fa.getBooleanOption(t, "readonly"), o = Fa.getBooleanOption(t, "fileMustExist"), c = "timeout" in t ? t.timeout : 5e3, u = "verbose" in t ? t.verbose : null, s = "nativeBinding" in t ? t.nativeBinding : null;
  if (a && i && !n) throw new TypeError("In-memory/temporary databases cannot be readonly");
  if (!Number.isInteger(c) || c < 0) throw new TypeError('Expected the "timeout" option to be a positive integer');
  if (c > 2147483647) throw new RangeError('Option "timeout" cannot be greater than 2147483647');
  if (u != null && typeof u != "function") throw new TypeError('Expected the "verbose" option to be a function');
  if (s != null && typeof s != "string" && typeof s != "object") throw new TypeError('Expected the "nativeBinding" option to be a string or addon object');
  let d;
  if (s == null ? d = df || (df = __()("better_sqlite3.node")) : typeof s == "string" ? d = (typeof __non_webpack_require__ == "function" ? __non_webpack_require__ : hm)(uf.resolve(s).replace(/(\.node)?$/, ".node")) : d = s, d.isInitialized || (d.setErrorConstructor(R_), d.isInitialized = !0), !i && !B_.existsSync(uf.dirname(r)))
    throw new TypeError("Cannot open database because the directory does not exist");
  Object.defineProperties(this, {
    [Fa.cppdb]: { value: new d.Database(r, e, i, a, o, c, u || null, n || null) },
    ...ir.getters
  });
}
const ir = w_();
Ke.prototype.prepare = ir.prepare;
Ke.prototype.transaction = T_();
Ke.prototype.pragma = U_();
Ke.prototype.backup = E_();
Ke.prototype.serialize = A_();
Ke.prototype.function = C_();
Ke.prototype.aggregate = F_();
Ke.prototype.table = S_();
Ke.prototype.loadExtension = ir.loadExtension;
Ke.prototype.exec = ir.exec;
Ke.prototype.close = ir.close;
Ke.prototype.defaultSafeIntegers = ir.defaultSafeIntegers;
Ke.prototype.unsafeMode = ir.unsafeMode;
Ke.prototype[Fa.inspect] = k_();
var O_ = Ke;
ju.exports = O_;
ju.exports.SqliteError = pm;
var I_ = ju.exports;
const W_ = /* @__PURE__ */ v_(I_);
let hr = null;
function ot() {
  if (hr) return hr;
  const e = qn.getPath("userData"), t = pt.join(e, "data.sqlite3");
  return Lg.mkdirSync(pt.dirname(t), { recursive: !0 }), hr = new W_(t), hr.pragma("journal_mode = WAL"), N_(hr), hr;
}
function N_(e) {
  e.exec(`
    CREATE TABLE IF NOT EXISTS transcripts (
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      sha256 TEXT NOT NULL,
      text TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS summaries (
      id TEXT PRIMARY KEY,
      transcript_id TEXT NOT NULL,
      json TEXT NOT NULL,
      markdown TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS glossary (
      term TEXT PRIMARY KEY,
      definition TEXT NOT NULL,
      aliases TEXT DEFAULT '',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS examples (
      id TEXT PRIMARY KEY,
      excerpt TEXT NOT NULL,
      target_json TEXT NOT NULL,
      notes TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS embeddings (
      id TEXT PRIMARY KEY,
      kind TEXT CHECK(kind IN ('term','example')) NOT NULL,
      ref_id TEXT NOT NULL,
      vector BLOB NOT NULL
    );
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS agent_paragraphs (
      id TEXT PRIMARY KEY,
      transcript_id TEXT NOT NULL,
      idx INTEGER NOT NULL,
      text TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS embeddings_agent (
      id TEXT PRIMARY KEY,
      kind TEXT NOT NULL,
      ref_id TEXT NOT NULL,
      vector BLOB NOT NULL
    );
    CREATE TABLE IF NOT EXISTS style_guides (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      instructions_md TEXT NOT NULL DEFAULT '',
      author TEXT DEFAULT '',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS preferences (
      id TEXT PRIMARY KEY,
      transcript_id TEXT NOT NULL,
      candidate_a TEXT NOT NULL,
      candidate_b TEXT NOT NULL,
      winner INTEGER NOT NULL CHECK(winner IN (0,1)),
      reason TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}
function so() {
  return Mg.randomUUID();
}
function gm(e) {
  const t = Mg.createHash("sha256");
  return t.update(e), t.digest("hex");
}
function L_(e, t, n) {
  const r = so(), i = n ?? gm(t);
  return ot().prepare(
    "INSERT INTO transcripts(id, filename, sha256, text) VALUES (?, ?, ?, ?)"
  ).run(r, e, i, t), r;
}
function Sa(e) {
  return ot().prepare("SELECT * FROM transcripts WHERE id = ?").get(e);
}
function M_(e, t, n) {
  const r = so();
  return ot().prepare(
    "INSERT INTO summaries(id, transcript_id, json, markdown) VALUES (?, ?, ?, ?)"
  ).run(r, e, JSON.stringify(t), n), r;
}
function mm() {
  return ot().prepare("SELECT term, definition, aliases FROM glossary ORDER BY term ASC").all().map((t) => ({
    term: t.term,
    definition: t.definition,
    aliases: t.aliases ? String(t.aliases).split(",").map((n) => n.trim()).filter(Boolean) : []
  }));
}
function $_(e) {
  const t = (e.aliases ?? []).join(",");
  ot().prepare(`INSERT INTO glossary(term, definition, aliases, updated_at)
    VALUES (@term, @definition, @aliases, CURRENT_TIMESTAMP)
    ON CONFLICT(term) DO UPDATE SET definition=excluded.definition, aliases=excluded.aliases, updated_at=CURRENT_TIMESTAMP
  `).run({ term: e.term, definition: e.definition, aliases: t });
}
function P_(e) {
  ot().prepare("DELETE FROM glossary WHERE term = ?").run(e);
}
function bm() {
  return ot().prepare("SELECT id, excerpt, target_json, notes FROM examples ORDER BY created_at DESC").all().map((t) => ({ id: t.id, excerpt: t.excerpt, target_json: JSON.parse(t.target_json), notes: t.notes }));
}
function z_(e) {
  const t = e.id ?? so();
  return ot().prepare("INSERT INTO examples(id, excerpt, target_json, notes) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET excerpt=excluded.excerpt, target_json=excluded.target_json, notes=excluded.notes").run(t, e.excerpt, JSON.stringify(e.target_json), e.notes ?? ""), t;
}
function q_(e) {
  ot().prepare("DELETE FROM examples WHERE id = ?").run(e);
}
function j_(e) {
  const t = ot().prepare("SELECT id, instructions_md FROM style_guides WHERE id = 'default'").get(), n = (t != null && t.instructions_md ? t.instructions_md + `
` : "") + `- ${e}`;
  ot().prepare(`INSERT INTO style_guides(id, name, instructions_md, author)
    VALUES('default', 'Default', @instructions_md, '')
    ON CONFLICT(id) DO UPDATE SET instructions_md=excluded.instructions_md, updated_at=CURRENT_TIMESTAMP
  `).run({ instructions_md: n });
}
function Z_(e) {
  const t = so();
  return ot().prepare("INSERT INTO preferences(id, transcript_id, candidate_a, candidate_b, winner, reason) VALUES (@id, @transcript_id, @candidate_a, @candidate_b, @winner, @reason)").run({ id: t, transcript_id: e.transcript_id, candidate_a: e.candidate_a, candidate_b: e.candidate_b, winner: e.winner, reason: e.reason ?? "" }), t;
}
function X_(e) {
  const t = ot().prepare("SELECT value FROM settings WHERE key = ?").get(e);
  return t == null ? void 0 : t.value;
}
function V_(e, t) {
  ot().prepare("INSERT INTO settings(key, value) VALUES(?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").run(e, t);
}
var It = {}, Zu = "1.13.7", lf = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || Function("return this")() || {}, uo = Array.prototype, Xu = Object.prototype, ff = typeof Symbol < "u" ? Symbol.prototype : null, H_ = uo.push, Li = uo.slice, vi = Xu.toString, G_ = Xu.hasOwnProperty, ym = typeof ArrayBuffer < "u", Y_ = typeof DataView < "u", K_ = Array.isArray, hf = Object.keys, pf = Object.create, gf = ym && ArrayBuffer.isView, J_ = isNaN, Q_ = isFinite, vm = !{ toString: null }.propertyIsEnumerable("toString"), mf = [
  "valueOf",
  "isPrototypeOf",
  "toString",
  "propertyIsEnumerable",
  "hasOwnProperty",
  "toLocaleString"
], ew = Math.pow(2, 53) - 1;
function nt(e, t) {
  return t = t == null ? e.length - 1 : +t, function() {
    for (var n = Math.max(arguments.length - t, 0), r = Array(n), i = 0; i < n; i++)
      r[i] = arguments[i + t];
    switch (t) {
      case 0:
        return e.call(this, r);
      case 1:
        return e.call(this, arguments[0], r);
      case 2:
        return e.call(this, arguments[0], arguments[1], r);
    }
    var a = Array(t + 1);
    for (i = 0; i < t; i++)
      a[i] = arguments[i];
    return a[t] = r, e.apply(this, a);
  };
}
function Sn(e) {
  var t = typeof e;
  return t === "function" || t === "object" && !!e;
}
function Dm(e) {
  return e === null;
}
function Vu(e) {
  return e === void 0;
}
function Hu(e) {
  return e === !0 || e === !1 || vi.call(e) === "[object Boolean]";
}
function xm(e) {
  return !!(e && e.nodeType === 1);
}
function Je(e) {
  var t = "[object " + e + "]";
  return function(n) {
    return vi.call(n) === t;
  };
}
const lo = Je("String"), Gu = Je("Number"), _m = Je("Date"), wm = Je("RegExp"), Tm = Je("Error"), Yu = Je("Symbol"), Ku = Je("ArrayBuffer");
var Um = Je("Function"), tw = lf.document && lf.document.childNodes;
typeof /./ != "function" && typeof Int8Array != "object" && typeof tw != "function" && (Um = function(e) {
  return typeof e == "function" || !1;
});
const Ye = Um, Em = Je("Object");
var Am = Y_ && (!/\[native code\]/.test(String(DataView)) || Em(new DataView(new ArrayBuffer(8)))), Ju = typeof Map < "u" && Em(/* @__PURE__ */ new Map()), nw = Je("DataView");
function rw(e) {
  return e != null && Ye(e.getInt8) && Ku(e.buffer);
}
const Di = Am ? rw : nw, kn = K_ || Je("Array");
function Bn(e, t) {
  return e != null && G_.call(e, t);
}
var yu = Je("Arguments");
(function() {
  yu(arguments) || (yu = function(e) {
    return Bn(e, "callee");
  });
})();
const fo = yu;
function Cm(e) {
  return !Yu(e) && Q_(e) && !isNaN(parseFloat(e));
}
function Qu(e) {
  return Gu(e) && J_(e);
}
function ed(e) {
  return function() {
    return e;
  };
}
function Fm(e) {
  return function(t) {
    var n = e(t);
    return typeof n == "number" && n >= 0 && n <= ew;
  };
}
function Sm(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
const za = Sm("byteLength"), iw = Fm(za);
var aw = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
function ow(e) {
  return gf ? gf(e) && !Di(e) : iw(e) && aw.test(vi.call(e));
}
const td = ym ? ow : ed(!1), ct = Sm("length");
function cw(e) {
  for (var t = {}, n = e.length, r = 0; r < n; ++r) t[e[r]] = !0;
  return {
    contains: function(i) {
      return t[i] === !0;
    },
    push: function(i) {
      return t[i] = !0, e.push(i);
    }
  };
}
function km(e, t) {
  t = cw(t);
  var n = mf.length, r = e.constructor, i = Ye(r) && r.prototype || Xu, a = "constructor";
  for (Bn(e, a) && !t.contains(a) && t.push(a); n--; )
    a = mf[n], a in e && e[a] !== i[a] && !t.contains(a) && t.push(a);
}
function Ie(e) {
  if (!Sn(e)) return [];
  if (hf) return hf(e);
  var t = [];
  for (var n in e) Bn(e, n) && t.push(n);
  return vm && km(e, t), t;
}
function Bm(e) {
  if (e == null) return !0;
  var t = ct(e);
  return typeof t == "number" && (kn(e) || lo(e) || fo(e)) ? t === 0 : ct(Ie(e)) === 0;
}
function nd(e, t) {
  var n = Ie(t), r = n.length;
  if (e == null) return !r;
  for (var i = Object(e), a = 0; a < r; a++) {
    var o = n[a];
    if (t[o] !== i[o] || !(o in i)) return !1;
  }
  return !0;
}
function he(e) {
  if (e instanceof he) return e;
  if (!(this instanceof he)) return new he(e);
  this._wrapped = e;
}
he.VERSION = Zu;
he.prototype.value = function() {
  return this._wrapped;
};
he.prototype.valueOf = he.prototype.toJSON = he.prototype.value;
he.prototype.toString = function() {
  return String(this._wrapped);
};
function bf(e) {
  return new Uint8Array(
    e.buffer || e,
    e.byteOffset || 0,
    za(e)
  );
}
var yf = "[object DataView]";
function vu(e, t, n, r) {
  if (e === t) return e !== 0 || 1 / e === 1 / t;
  if (e == null || t == null) return !1;
  if (e !== e) return t !== t;
  var i = typeof e;
  return i !== "function" && i !== "object" && typeof t != "object" ? !1 : Rm(e, t, n, r);
}
function Rm(e, t, n, r) {
  e instanceof he && (e = e._wrapped), t instanceof he && (t = t._wrapped);
  var i = vi.call(e);
  if (i !== vi.call(t)) return !1;
  if (Am && i == "[object Object]" && Di(e)) {
    if (!Di(t)) return !1;
    i = yf;
  }
  switch (i) {
    case "[object RegExp]":
    case "[object String]":
      return "" + e == "" + t;
    case "[object Number]":
      return +e != +e ? +t != +t : +e == 0 ? 1 / +e === 1 / t : +e == +t;
    case "[object Date]":
    case "[object Boolean]":
      return +e == +t;
    case "[object Symbol]":
      return ff.valueOf.call(e) === ff.valueOf.call(t);
    case "[object ArrayBuffer]":
    case yf:
      return Rm(bf(e), bf(t), n, r);
  }
  var a = i === "[object Array]";
  if (!a && td(e)) {
    var o = za(e);
    if (o !== za(t)) return !1;
    if (e.buffer === t.buffer && e.byteOffset === t.byteOffset) return !0;
    a = !0;
  }
  if (!a) {
    if (typeof e != "object" || typeof t != "object") return !1;
    var c = e.constructor, u = t.constructor;
    if (c !== u && !(Ye(c) && c instanceof c && Ye(u) && u instanceof u) && "constructor" in e && "constructor" in t)
      return !1;
  }
  n = n || [], r = r || [];
  for (var s = n.length; s--; )
    if (n[s] === e) return r[s] === t;
  if (n.push(e), r.push(t), a) {
    if (s = e.length, s !== t.length) return !1;
    for (; s--; )
      if (!vu(e[s], t[s], n, r)) return !1;
  } else {
    var d = Ie(e), g;
    if (s = d.length, Ie(t).length !== s) return !1;
    for (; s--; )
      if (g = d[s], !(Bn(t, g) && vu(e[g], t[g], n, r))) return !1;
  }
  return n.pop(), r.pop(), !0;
}
function Om(e, t) {
  return vu(e, t);
}
function zr(e) {
  if (!Sn(e)) return [];
  var t = [];
  for (var n in e) t.push(n);
  return vm && km(e, t), t;
}
function rd(e) {
  var t = ct(e);
  return function(n) {
    if (n == null) return !1;
    var r = zr(n);
    if (ct(r)) return !1;
    for (var i = 0; i < t; i++)
      if (!Ye(n[e[i]])) return !1;
    return e !== Nm || !Ye(n[id]);
  };
}
var id = "forEach", Im = "has", ad = ["clear", "delete"], Wm = ["get", Im, "set"], sw = ad.concat(id, Wm), Nm = ad.concat(Wm), uw = ["add"].concat(ad, id, Im);
const Lm = Ju ? rd(sw) : Je("Map"), Mm = Ju ? rd(Nm) : Je("WeakMap"), $m = Ju ? rd(uw) : Je("Set"), Pm = Je("WeakSet");
function ar(e) {
  for (var t = Ie(e), n = t.length, r = Array(n), i = 0; i < n; i++)
    r[i] = e[t[i]];
  return r;
}
function zm(e) {
  for (var t = Ie(e), n = t.length, r = Array(n), i = 0; i < n; i++)
    r[i] = [t[i], e[t[i]]];
  return r;
}
function od(e) {
  for (var t = {}, n = Ie(e), r = 0, i = n.length; r < i; r++)
    t[e[n[r]]] = n[r];
  return t;
}
function xi(e) {
  var t = [];
  for (var n in e)
    Ye(e[n]) && t.push(n);
  return t.sort();
}
function cd(e, t) {
  return function(n) {
    var r = arguments.length;
    if (t && (n = Object(n)), r < 2 || n == null) return n;
    for (var i = 1; i < r; i++)
      for (var a = arguments[i], o = e(a), c = o.length, u = 0; u < c; u++) {
        var s = o[u];
        (!t || n[s] === void 0) && (n[s] = a[s]);
      }
    return n;
  };
}
const sd = cd(zr), kr = cd(Ie), ud = cd(zr, !0);
function dw() {
  return function() {
  };
}
function qm(e) {
  if (!Sn(e)) return {};
  if (pf) return pf(e);
  var t = dw();
  t.prototype = e;
  var n = new t();
  return t.prototype = null, n;
}
function jm(e, t) {
  var n = qm(e);
  return t && kr(n, t), n;
}
function Zm(e) {
  return Sn(e) ? kn(e) ? e.slice() : sd({}, e) : e;
}
function Xm(e, t) {
  return t(e), e;
}
function dd(e) {
  return kn(e) ? e : [e];
}
he.toPath = dd;
function Mi(e) {
  return he.toPath(e);
}
function ld(e, t) {
  for (var n = t.length, r = 0; r < n; r++) {
    if (e == null) return;
    e = e[t[r]];
  }
  return n ? e : void 0;
}
function fd(e, t, n) {
  var r = ld(e, Mi(t));
  return Vu(r) ? n : r;
}
function Vm(e, t) {
  t = Mi(t);
  for (var n = t.length, r = 0; r < n; r++) {
    var i = t[r];
    if (!Bn(e, i)) return !1;
    e = e[i];
  }
  return !!n;
}
function ho(e) {
  return e;
}
function Vn(e) {
  return e = kr({}, e), function(t) {
    return nd(t, e);
  };
}
function po(e) {
  return e = Mi(e), function(t) {
    return ld(t, e);
  };
}
function $i(e, t, n) {
  if (t === void 0) return e;
  switch (n ?? 3) {
    case 1:
      return function(r) {
        return e.call(t, r);
      };
    case 3:
      return function(r, i, a) {
        return e.call(t, r, i, a);
      };
    case 4:
      return function(r, i, a, o) {
        return e.call(t, r, i, a, o);
      };
  }
  return function() {
    return e.apply(t, arguments);
  };
}
function Hm(e, t, n) {
  return e == null ? ho : Ye(e) ? $i(e, t, n) : Sn(e) && !kn(e) ? Vn(e) : po(e);
}
function go(e, t) {
  return Hm(e, t, 1 / 0);
}
he.iteratee = go;
function ut(e, t, n) {
  return he.iteratee !== go ? he.iteratee(e, t) : Hm(e, t, n);
}
function Gm(e, t, n) {
  t = ut(t, n);
  for (var r = Ie(e), i = r.length, a = {}, o = 0; o < i; o++) {
    var c = r[o];
    a[c] = t(e[c], c, e);
  }
  return a;
}
function hd() {
}
function Ym(e) {
  return e == null ? hd : function(t) {
    return fd(e, t);
  };
}
function Km(e, t, n) {
  var r = Array(Math.max(0, e));
  t = $i(t, n, 1);
  for (var i = 0; i < e; i++) r[i] = t(i);
  return r;
}
function qa(e, t) {
  return t == null && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1));
}
const Br = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
};
function Jm(e) {
  var t = function(a) {
    return e[a];
  }, n = "(?:" + Ie(e).join("|") + ")", r = RegExp(n), i = RegExp(n, "g");
  return function(a) {
    return a = a == null ? "" : "" + a, r.test(a) ? a.replace(i, t) : a;
  };
}
const Qm = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
}, e2 = Jm(Qm), lw = od(Qm), t2 = Jm(lw), n2 = he.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};
var wc = /(.)^/, fw = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "\u2028": "u2028",
  "\u2029": "u2029"
}, hw = /\\|'|\r|\n|\u2028|\u2029/g;
function pw(e) {
  return "\\" + fw[e];
}
var gw = /^\s*(\w|\$)+\s*$/;
function r2(e, t, n) {
  !t && n && (t = n), t = ud({}, t, he.templateSettings);
  var r = RegExp([
    (t.escape || wc).source,
    (t.interpolate || wc).source,
    (t.evaluate || wc).source
  ].join("|") + "|$", "g"), i = 0, a = "__p+='";
  e.replace(r, function(s, d, g, f, p) {
    return a += e.slice(i, p).replace(hw, pw), i = p + s.length, d ? a += `'+
((__t=(` + d + `))==null?'':_.escape(__t))+
'` : g ? a += `'+
((__t=(` + g + `))==null?'':__t)+
'` : f && (a += `';
` + f + `
__p+='`), s;
  }), a += `';
`;
  var o = t.variable;
  if (o) {
    if (!gw.test(o)) throw new Error(
      "variable is not a bare identifier: " + o
    );
  } else
    a = `with(obj||{}){
` + a + `}
`, o = "obj";
  a = `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` + a + `return __p;
`;
  var c;
  try {
    c = new Function(o, "_", a);
  } catch (s) {
    throw s.source = a, s;
  }
  var u = function(s) {
    return c.call(this, s, he);
  };
  return u.source = "function(" + o + `){
` + a + "}", u;
}
function i2(e, t, n) {
  t = Mi(t);
  var r = t.length;
  if (!r)
    return Ye(n) ? n.call(e) : n;
  for (var i = 0; i < r; i++) {
    var a = e == null ? void 0 : e[t[i]];
    a === void 0 && (a = n, i = r), e = Ye(a) ? a.call(e) : a;
  }
  return e;
}
var mw = 0;
function a2(e) {
  var t = ++mw + "";
  return e ? e + t : t;
}
function o2(e) {
  var t = he(e);
  return t._chain = !0, t;
}
function c2(e, t, n, r, i) {
  if (!(r instanceof t)) return e.apply(n, i);
  var a = qm(e.prototype), o = e.apply(a, i);
  return Sn(o) ? o : a;
}
var or = nt(function(e, t) {
  var n = or.placeholder, r = function() {
    for (var i = 0, a = t.length, o = Array(a), c = 0; c < a; c++)
      o[c] = t[c] === n ? arguments[i++] : t[c];
    for (; i < arguments.length; ) o.push(arguments[i++]);
    return c2(e, r, this, this, o);
  };
  return r;
});
or.placeholder = he;
const pd = nt(function(e, t, n) {
  if (!Ye(e)) throw new TypeError("Bind must be called on a function");
  var r = nt(function(i) {
    return c2(e, r, t, this, n.concat(i));
  });
  return r;
}), mt = Fm(ct);
function cr(e, t, n, r) {
  if (r = r || [], !t && t !== 0)
    t = 1 / 0;
  else if (t <= 0)
    return r.concat(e);
  for (var i = r.length, a = 0, o = ct(e); a < o; a++) {
    var c = e[a];
    if (mt(c) && (kn(c) || fo(c)))
      if (t > 1)
        cr(c, t - 1, n, r), i = r.length;
      else
        for (var u = 0, s = c.length; u < s; ) r[i++] = c[u++];
    else n || (r[i++] = c);
  }
  return r;
}
const s2 = nt(function(e, t) {
  t = cr(t, !1, !1);
  var n = t.length;
  if (n < 1) throw new Error("bindAll must be passed function names");
  for (; n--; ) {
    var r = t[n];
    e[r] = pd(e[r], e);
  }
  return e;
});
function u2(e, t) {
  var n = function(r) {
    var i = n.cache, a = "" + (t ? t.apply(this, arguments) : r);
    return Bn(i, a) || (i[a] = e.apply(this, arguments)), i[a];
  };
  return n.cache = {}, n;
}
const gd = nt(function(e, t, n) {
  return setTimeout(function() {
    return e.apply(null, n);
  }, t);
}), d2 = or(gd, he, 1);
function l2(e, t, n) {
  var r, i, a, o, c = 0;
  n || (n = {});
  var u = function() {
    c = n.leading === !1 ? 0 : Br(), r = null, o = e.apply(i, a), r || (i = a = null);
  }, s = function() {
    var d = Br();
    !c && n.leading === !1 && (c = d);
    var g = t - (d - c);
    return i = this, a = arguments, g <= 0 || g > t ? (r && (clearTimeout(r), r = null), c = d, o = e.apply(i, a), r || (i = a = null)) : !r && n.trailing !== !1 && (r = setTimeout(u, g)), o;
  };
  return s.cancel = function() {
    clearTimeout(r), c = 0, r = i = a = null;
  }, s;
}
function f2(e, t, n) {
  var r, i, a, o, c, u = function() {
    var d = Br() - i;
    t > d ? r = setTimeout(u, t - d) : (r = null, n || (o = e.apply(c, a)), r || (a = c = null));
  }, s = nt(function(d) {
    return c = this, a = d, i = Br(), r || (r = setTimeout(u, t), n && (o = e.apply(c, a))), o;
  });
  return s.cancel = function() {
    clearTimeout(r), r = a = c = null;
  }, s;
}
function h2(e, t) {
  return or(t, e);
}
function mo(e) {
  return function() {
    return !e.apply(this, arguments);
  };
}
function p2() {
  var e = arguments, t = e.length - 1;
  return function() {
    for (var n = t, r = e[t].apply(this, arguments); n--; ) r = e[n].call(this, r);
    return r;
  };
}
function g2(e, t) {
  return function() {
    if (--e < 1)
      return t.apply(this, arguments);
  };
}
function md(e, t) {
  var n;
  return function() {
    return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = null), n;
  };
}
const m2 = or(md, 2);
function bd(e, t, n) {
  t = ut(t, n);
  for (var r = Ie(e), i, a = 0, o = r.length; a < o; a++)
    if (i = r[a], t(e[i], i, e)) return i;
}
function b2(e) {
  return function(t, n, r) {
    n = ut(n, r);
    for (var i = ct(t), a = e > 0 ? 0 : i - 1; a >= 0 && a < i; a += e)
      if (n(t[a], a, t)) return a;
    return -1;
  };
}
const bo = b2(1), yd = b2(-1);
function vd(e, t, n, r) {
  n = ut(n, r, 1);
  for (var i = n(t), a = 0, o = ct(e); a < o; ) {
    var c = Math.floor((a + o) / 2);
    n(e[c]) < i ? a = c + 1 : o = c;
  }
  return a;
}
function y2(e, t, n) {
  return function(r, i, a) {
    var o = 0, c = ct(r);
    if (typeof a == "number")
      e > 0 ? o = a >= 0 ? a : Math.max(a + c, o) : c = a >= 0 ? Math.min(a + 1, c) : a + c + 1;
    else if (n && a && c)
      return a = n(r, i), r[a] === i ? a : -1;
    if (i !== i)
      return a = t(Li.call(r, o, c), Qu), a >= 0 ? a + o : -1;
    for (a = e > 0 ? o : c - 1; a >= 0 && a < c; a += e)
      if (r[a] === i) return a;
    return -1;
  };
}
const Dd = y2(1, bo, vd), v2 = y2(-1, yd);
function _i(e, t, n) {
  var r = mt(e) ? bo : bd, i = r(e, t, n);
  if (i !== void 0 && i !== -1) return e[i];
}
function D2(e, t) {
  return _i(e, Vn(t));
}
function Ot(e, t, n) {
  t = $i(t, n);
  var r, i;
  if (mt(e))
    for (r = 0, i = e.length; r < i; r++)
      t(e[r], r, e);
  else {
    var a = Ie(e);
    for (r = 0, i = a.length; r < i; r++)
      t(e[a[r]], a[r], e);
  }
  return e;
}
function dn(e, t, n) {
  t = ut(t, n);
  for (var r = !mt(e) && Ie(e), i = (r || e).length, a = Array(i), o = 0; o < i; o++) {
    var c = r ? r[o] : o;
    a[o] = t(e[c], c, e);
  }
  return a;
}
function x2(e) {
  var t = function(n, r, i, a) {
    var o = !mt(n) && Ie(n), c = (o || n).length, u = e > 0 ? 0 : c - 1;
    for (a || (i = n[o ? o[u] : u], u += e); u >= 0 && u < c; u += e) {
      var s = o ? o[u] : u;
      i = r(i, n[s], s, n);
    }
    return i;
  };
  return function(n, r, i, a) {
    var o = arguments.length >= 3;
    return t(n, $i(r, a, 4), i, o);
  };
}
const Er = x2(1), ja = x2(-1);
function Cn(e, t, n) {
  var r = [];
  return t = ut(t, n), Ot(e, function(i, a, o) {
    t(i, a, o) && r.push(i);
  }), r;
}
function _2(e, t, n) {
  return Cn(e, mo(ut(t)), n);
}
function Za(e, t, n) {
  t = ut(t, n);
  for (var r = !mt(e) && Ie(e), i = (r || e).length, a = 0; a < i; a++) {
    var o = r ? r[a] : a;
    if (!t(e[o], o, e)) return !1;
  }
  return !0;
}
function Xa(e, t, n) {
  t = ut(t, n);
  for (var r = !mt(e) && Ie(e), i = (r || e).length, a = 0; a < i; a++) {
    var o = r ? r[a] : a;
    if (t(e[o], o, e)) return !0;
  }
  return !1;
}
function _t(e, t, n, r) {
  return mt(e) || (e = ar(e)), (typeof n != "number" || r) && (n = 0), Dd(e, t, n) >= 0;
}
const w2 = nt(function(e, t, n) {
  var r, i;
  return Ye(t) ? i = t : (t = Mi(t), r = t.slice(0, -1), t = t[t.length - 1]), dn(e, function(a) {
    var o = i;
    if (!o) {
      if (r && r.length && (a = ld(a, r)), a == null) return;
      o = a[t];
    }
    return o == null ? o : o.apply(a, n);
  });
});
function yo(e, t) {
  return dn(e, po(t));
}
function T2(e, t) {
  return Cn(e, Vn(t));
}
function xd(e, t, n) {
  var r = -1 / 0, i = -1 / 0, a, o;
  if (t == null || typeof t == "number" && typeof e[0] != "object" && e != null) {
    e = mt(e) ? e : ar(e);
    for (var c = 0, u = e.length; c < u; c++)
      a = e[c], a != null && a > r && (r = a);
  } else
    t = ut(t, n), Ot(e, function(s, d, g) {
      o = t(s, d, g), (o > i || o === -1 / 0 && r === -1 / 0) && (r = s, i = o);
    });
  return r;
}
function U2(e, t, n) {
  var r = 1 / 0, i = 1 / 0, a, o;
  if (t == null || typeof t == "number" && typeof e[0] != "object" && e != null) {
    e = mt(e) ? e : ar(e);
    for (var c = 0, u = e.length; c < u; c++)
      a = e[c], a != null && a < r && (r = a);
  } else
    t = ut(t, n), Ot(e, function(s, d, g) {
      o = t(s, d, g), (o < i || o === 1 / 0 && r === 1 / 0) && (r = s, i = o);
    });
  return r;
}
var bw = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
function _d(e) {
  return e ? kn(e) ? Li.call(e) : lo(e) ? e.match(bw) : mt(e) ? dn(e, ho) : ar(e) : [];
}
function wd(e, t, n) {
  if (t == null || n)
    return mt(e) || (e = ar(e)), e[qa(e.length - 1)];
  var r = _d(e), i = ct(r);
  t = Math.max(Math.min(t, i), 0);
  for (var a = i - 1, o = 0; o < t; o++) {
    var c = qa(o, a), u = r[o];
    r[o] = r[c], r[c] = u;
  }
  return r.slice(0, t);
}
function E2(e) {
  return wd(e, 1 / 0);
}
function A2(e, t, n) {
  var r = 0;
  return t = ut(t, n), yo(dn(e, function(i, a, o) {
    return {
      value: i,
      index: r++,
      criteria: t(i, a, o)
    };
  }).sort(function(i, a) {
    var o = i.criteria, c = a.criteria;
    if (o !== c) {
      if (o > c || o === void 0) return 1;
      if (o < c || c === void 0) return -1;
    }
    return i.index - a.index;
  }), "value");
}
function vo(e, t) {
  return function(n, r, i) {
    var a = t ? [[], []] : {};
    return r = ut(r, i), Ot(n, function(o, c) {
      var u = r(o, c, n);
      e(a, o, u);
    }), a;
  };
}
const C2 = vo(function(e, t, n) {
  Bn(e, n) ? e[n].push(t) : e[n] = [t];
}), F2 = vo(function(e, t, n) {
  e[n] = t;
}), S2 = vo(function(e, t, n) {
  Bn(e, n) ? e[n]++ : e[n] = 1;
}), k2 = vo(function(e, t, n) {
  e[n ? 0 : 1].push(t);
}, !0);
function B2(e) {
  return e == null ? 0 : mt(e) ? e.length : Ie(e).length;
}
function yw(e, t, n) {
  return t in n;
}
const Td = nt(function(e, t) {
  var n = {}, r = t[0];
  if (e == null) return n;
  Ye(r) ? (t.length > 1 && (r = $i(r, t[1])), t = zr(e)) : (r = yw, t = cr(t, !1, !1), e = Object(e));
  for (var i = 0, a = t.length; i < a; i++) {
    var o = t[i], c = e[o];
    r(c, o, e) && (n[o] = c);
  }
  return n;
}), R2 = nt(function(e, t) {
  var n = t[0], r;
  return Ye(n) ? (n = mo(n), t.length > 1 && (r = t[1])) : (t = dn(cr(t, !1, !1), String), n = function(i, a) {
    return !_t(t, a);
  }), Td(e, n, r);
});
function Ud(e, t, n) {
  return Li.call(e, 0, Math.max(0, e.length - (t == null || n ? 1 : t)));
}
function Ar(e, t, n) {
  return e == null || e.length < 1 ? t == null || n ? void 0 : [] : t == null || n ? e[0] : Ud(e, e.length - t);
}
function Pn(e, t, n) {
  return Li.call(e, t == null || n ? 1 : t);
}
function O2(e, t, n) {
  return e == null || e.length < 1 ? t == null || n ? void 0 : [] : t == null || n ? e[e.length - 1] : Pn(e, Math.max(0, e.length - t));
}
function I2(e) {
  return Cn(e, Boolean);
}
function W2(e, t) {
  return cr(e, t, !1);
}
const Ed = nt(function(e, t) {
  return t = cr(t, !0, !0), Cn(e, function(n) {
    return !_t(t, n);
  });
}), N2 = nt(function(e, t) {
  return Ed(e, t);
});
function wi(e, t, n, r) {
  Hu(t) || (r = n, n = t, t = !1), n != null && (n = ut(n, r));
  for (var i = [], a = [], o = 0, c = ct(e); o < c; o++) {
    var u = e[o], s = n ? n(u, o, e) : u;
    t && !n ? ((!o || a !== s) && i.push(u), a = s) : n ? _t(a, s) || (a.push(s), i.push(u)) : _t(i, u) || i.push(u);
  }
  return i;
}
const L2 = nt(function(e) {
  return wi(cr(e, !0, !0));
});
function M2(e) {
  for (var t = [], n = arguments.length, r = 0, i = ct(e); r < i; r++) {
    var a = e[r];
    if (!_t(t, a)) {
      var o;
      for (o = 1; o < n && _t(arguments[o], a); o++)
        ;
      o === n && t.push(a);
    }
  }
  return t;
}
function Ti(e) {
  for (var t = e && xd(e, ct).length || 0, n = Array(t), r = 0; r < t; r++)
    n[r] = yo(e, r);
  return n;
}
const $2 = nt(Ti);
function P2(e, t) {
  for (var n = {}, r = 0, i = ct(e); r < i; r++)
    t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
  return n;
}
function z2(e, t, n) {
  t == null && (t = e || 0, e = 0), n || (n = t < e ? -1 : 1);
  for (var r = Math.max(Math.ceil((t - e) / n), 0), i = Array(r), a = 0; a < r; a++, e += n)
    i[a] = e;
  return i;
}
function q2(e, t) {
  if (t == null || t < 1) return [];
  for (var n = [], r = 0, i = e.length; r < i; )
    n.push(Li.call(e, r, r += t));
  return n;
}
function Ad(e, t) {
  return e._chain ? he(t).chain() : t;
}
function Cd(e) {
  return Ot(xi(e), function(t) {
    var n = he[t] = e[t];
    he.prototype[t] = function() {
      var r = [this._wrapped];
      return H_.apply(r, arguments), Ad(this, n.apply(he, r));
    };
  }), he;
}
Ot(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
  var t = uo[e];
  he.prototype[e] = function() {
    var n = this._wrapped;
    return n != null && (t.apply(n, arguments), (e === "shift" || e === "splice") && n.length === 0 && delete n[0]), Ad(this, n);
  };
});
Ot(["concat", "join", "slice"], function(e) {
  var t = uo[e];
  he.prototype[e] = function() {
    var n = this._wrapped;
    return n != null && (n = t.apply(n, arguments)), Ad(this, n);
  };
});
const vw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VERSION: Zu,
  after: g2,
  all: Za,
  allKeys: zr,
  any: Xa,
  assign: kr,
  before: md,
  bind: pd,
  bindAll: s2,
  chain: o2,
  chunk: q2,
  clone: Zm,
  collect: dn,
  compact: I2,
  compose: p2,
  constant: ed,
  contains: _t,
  countBy: S2,
  create: jm,
  debounce: f2,
  default: he,
  defaults: ud,
  defer: d2,
  delay: gd,
  detect: _i,
  difference: Ed,
  drop: Pn,
  each: Ot,
  escape: e2,
  every: Za,
  extend: sd,
  extendOwn: kr,
  filter: Cn,
  find: _i,
  findIndex: bo,
  findKey: bd,
  findLastIndex: yd,
  findWhere: D2,
  first: Ar,
  flatten: W2,
  foldl: Er,
  foldr: ja,
  forEach: Ot,
  functions: xi,
  get: fd,
  groupBy: C2,
  has: Vm,
  head: Ar,
  identity: ho,
  include: _t,
  includes: _t,
  indexBy: F2,
  indexOf: Dd,
  initial: Ud,
  inject: Er,
  intersection: M2,
  invert: od,
  invoke: w2,
  isArguments: fo,
  isArray: kn,
  isArrayBuffer: Ku,
  isBoolean: Hu,
  isDataView: Di,
  isDate: _m,
  isElement: xm,
  isEmpty: Bm,
  isEqual: Om,
  isError: Tm,
  isFinite: Cm,
  isFunction: Ye,
  isMap: Lm,
  isMatch: nd,
  isNaN: Qu,
  isNull: Dm,
  isNumber: Gu,
  isObject: Sn,
  isRegExp: wm,
  isSet: $m,
  isString: lo,
  isSymbol: Yu,
  isTypedArray: td,
  isUndefined: Vu,
  isWeakMap: Mm,
  isWeakSet: Pm,
  iteratee: go,
  keys: Ie,
  last: O2,
  lastIndexOf: v2,
  map: dn,
  mapObject: Gm,
  matcher: Vn,
  matches: Vn,
  max: xd,
  memoize: u2,
  methods: xi,
  min: U2,
  mixin: Cd,
  negate: mo,
  noop: hd,
  now: Br,
  object: P2,
  omit: R2,
  once: m2,
  pairs: zm,
  partial: or,
  partition: k2,
  pick: Td,
  pluck: yo,
  property: po,
  propertyOf: Ym,
  random: qa,
  range: z2,
  reduce: Er,
  reduceRight: ja,
  reject: _2,
  rest: Pn,
  restArguments: nt,
  result: i2,
  sample: wd,
  select: Cn,
  shuffle: E2,
  size: B2,
  some: Xa,
  sortBy: A2,
  sortedIndex: vd,
  tail: Pn,
  take: Ar,
  tap: Xm,
  template: r2,
  templateSettings: n2,
  throttle: l2,
  times: Km,
  toArray: _d,
  toPath: dd,
  transpose: Ti,
  unescape: t2,
  union: L2,
  uniq: wi,
  unique: wi,
  uniqueId: a2,
  unzip: Ti,
  values: ar,
  where: T2,
  without: N2,
  wrap: h2,
  zip: $2
}, Symbol.toStringTag, { value: "Module" }));
var Du = Cd(vw);
Du._ = Du;
const Dw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VERSION: Zu,
  after: g2,
  all: Za,
  allKeys: zr,
  any: Xa,
  assign: kr,
  before: md,
  bind: pd,
  bindAll: s2,
  chain: o2,
  chunk: q2,
  clone: Zm,
  collect: dn,
  compact: I2,
  compose: p2,
  constant: ed,
  contains: _t,
  countBy: S2,
  create: jm,
  debounce: f2,
  default: Du,
  defaults: ud,
  defer: d2,
  delay: gd,
  detect: _i,
  difference: Ed,
  drop: Pn,
  each: Ot,
  escape: e2,
  every: Za,
  extend: sd,
  extendOwn: kr,
  filter: Cn,
  find: _i,
  findIndex: bo,
  findKey: bd,
  findLastIndex: yd,
  findWhere: D2,
  first: Ar,
  flatten: W2,
  foldl: Er,
  foldr: ja,
  forEach: Ot,
  functions: xi,
  get: fd,
  groupBy: C2,
  has: Vm,
  head: Ar,
  identity: ho,
  include: _t,
  includes: _t,
  indexBy: F2,
  indexOf: Dd,
  initial: Ud,
  inject: Er,
  intersection: M2,
  invert: od,
  invoke: w2,
  isArguments: fo,
  isArray: kn,
  isArrayBuffer: Ku,
  isBoolean: Hu,
  isDataView: Di,
  isDate: _m,
  isElement: xm,
  isEmpty: Bm,
  isEqual: Om,
  isError: Tm,
  isFinite: Cm,
  isFunction: Ye,
  isMap: Lm,
  isMatch: nd,
  isNaN: Qu,
  isNull: Dm,
  isNumber: Gu,
  isObject: Sn,
  isRegExp: wm,
  isSet: $m,
  isString: lo,
  isSymbol: Yu,
  isTypedArray: td,
  isUndefined: Vu,
  isWeakMap: Mm,
  isWeakSet: Pm,
  iteratee: go,
  keys: Ie,
  last: O2,
  lastIndexOf: v2,
  map: dn,
  mapObject: Gm,
  matcher: Vn,
  matches: Vn,
  max: xd,
  memoize: u2,
  methods: xi,
  min: U2,
  mixin: Cd,
  negate: mo,
  noop: hd,
  now: Br,
  object: P2,
  omit: R2,
  once: m2,
  pairs: zm,
  partial: or,
  partition: k2,
  pick: Td,
  pluck: yo,
  property: po,
  propertyOf: Ym,
  random: qa,
  range: z2,
  reduce: Er,
  reduceRight: ja,
  reject: _2,
  rest: Pn,
  restArguments: nt,
  result: i2,
  sample: wd,
  select: Cn,
  shuffle: E2,
  size: B2,
  some: Xa,
  sortBy: A2,
  sortedIndex: vd,
  tail: Pn,
  take: Ar,
  tap: Xm,
  template: r2,
  templateSettings: n2,
  throttle: l2,
  times: Km,
  toArray: _d,
  toPath: dd,
  transpose: Ti,
  unescape: t2,
  union: L2,
  uniq: wi,
  unique: wi,
  uniqueId: a2,
  unzip: Ti,
  values: ar,
  where: T2,
  without: N2,
  wrap: h2,
  zip: $2
}, Symbol.toStringTag, { value: "Module" })), Se = /* @__PURE__ */ D_(Dw);
var Fd = {}, $e = {}, j2 = { exports: {} }, oa = { exports: {} }, vf;
function qr() {
  if (vf) return oa.exports;
  vf = 1;
  var e = /* @__PURE__ */ function() {
    return this === void 0;
  }();
  if (e)
    oa.exports = {
      freeze: Object.freeze,
      defineProperty: Object.defineProperty,
      getDescriptor: Object.getOwnPropertyDescriptor,
      keys: Object.keys,
      names: Object.getOwnPropertyNames,
      getPrototypeOf: Object.getPrototypeOf,
      isArray: Array.isArray,
      isES5: e,
      propertyIsWritable: function(d, g) {
        var f = Object.getOwnPropertyDescriptor(d, g);
        return !!(!f || f.writable || f.set);
      }
    };
  else {
    var t = {}.hasOwnProperty, n = {}.toString, r = {}.constructor.prototype, i = function(d) {
      var g = [];
      for (var f in d)
        t.call(d, f) && g.push(f);
      return g;
    }, a = function(d, g) {
      return { value: d[g] };
    }, o = function(d, g, f) {
      return d[g] = f.value, d;
    }, c = function(d) {
      return d;
    }, u = function(d) {
      try {
        return Object(d).constructor.prototype;
      } catch {
        return r;
      }
    }, s = function(d) {
      try {
        return n.call(d) === "[object Array]";
      } catch {
        return !1;
      }
    };
    oa.exports = {
      isArray: s,
      keys: i,
      names: i,
      defineProperty: o,
      getDescriptor: a,
      freeze: c,
      getPrototypeOf: u,
      isES5: e,
      propertyIsWritable: function() {
        return !0;
      }
    };
  }
  return oa.exports;
}
var Tc, Df;
function ye() {
  if (Df) return Tc;
  Df = 1;
  var e = qr(), t = typeof navigator > "u", n = { e: {} }, r, i = typeof self < "u" ? self : typeof window < "u" ? window : typeof re < "u" || re !== void 0 ? re : null;
  function a() {
    try {
      var S = r;
      return r = null, S.apply(this, arguments);
    } catch (z) {
      return n.e = z, n;
    }
  }
  function o(S) {
    return r = S, a;
  }
  var c = function(S, z) {
    var ee = {}.hasOwnProperty;
    function te() {
      this.constructor = S, this.constructor$ = z;
      for (var J in z.prototype)
        ee.call(z.prototype, J) && J.charAt(J.length - 1) !== "$" && (this[J + "$"] = z.prototype[J]);
    }
    return te.prototype = z.prototype, S.prototype = new te(), S.prototype;
  };
  function u(S) {
    return S == null || S === !0 || S === !1 || typeof S == "string" || typeof S == "number";
  }
  function s(S) {
    return typeof S == "function" || typeof S == "object" && S !== null;
  }
  function d(S) {
    return u(S) ? new Error(w(S)) : S;
  }
  function g(S, z) {
    var ee = S.length, te = new Array(ee + 1), J;
    for (J = 0; J < ee; ++J)
      te[J] = S[J];
    return te[J] = z, te;
  }
  function f(S, z, ee) {
    if (e.isES5) {
      var te = Object.getOwnPropertyDescriptor(S, z);
      if (te != null)
        return te.get == null && te.set == null ? te.value : ee;
    } else
      return {}.hasOwnProperty.call(S, z) ? S[z] : void 0;
  }
  function p(S, z, ee) {
    if (u(S)) return S;
    var te = {
      value: ee,
      configurable: !0,
      enumerable: !1,
      writable: !0
    };
    return e.defineProperty(S, z, te), S;
  }
  function b(S) {
    throw S;
  }
  var m = function() {
    var S = [
      Array.prototype,
      Object.prototype,
      Function.prototype
    ], z = function(J) {
      for (var U = 0; U < S.length; ++U)
        if (S[U] === J)
          return !0;
      return !1;
    };
    if (e.isES5) {
      var ee = Object.getOwnPropertyNames;
      return function(J) {
        for (var U = [], C = /* @__PURE__ */ Object.create(null); J != null && !z(J); ) {
          var Z;
          try {
            Z = ee(J);
          } catch {
            return U;
          }
          for (var K = 0; K < Z.length; ++K) {
            var R = Z[K];
            if (!C[R]) {
              C[R] = !0;
              var M = Object.getOwnPropertyDescriptor(J, R);
              M != null && M.get == null && M.set == null && U.push(R);
            }
          }
          J = e.getPrototypeOf(J);
        }
        return U;
      };
    } else {
      var te = {}.hasOwnProperty;
      return function(J) {
        if (z(J)) return [];
        var U = [];
        e: for (var C in J)
          if (te.call(J, C))
            U.push(C);
          else {
            for (var Z = 0; Z < S.length; ++Z)
              if (te.call(S[Z], C))
                continue e;
            U.push(C);
          }
        return U;
      };
    }
  }(), y = /this\s*\.\s*\S+\s*=/;
  function h(S) {
    try {
      if (typeof S == "function") {
        var z = e.names(S.prototype), ee = e.isES5 && z.length > 1, te = z.length > 0 && !(z.length === 1 && z[0] === "constructor"), J = y.test(S + "") && e.names(S).length > 0;
        if (ee || te || J)
          return !0;
      }
      return !1;
    } catch {
      return !1;
    }
  }
  function l(S) {
    return S;
  }
  var v = /^[a-z$_][a-z$_0-9]*$/i;
  function D(S) {
    return v.test(S);
  }
  function x(S, z, ee) {
    for (var te = new Array(S), J = 0; J < S; ++J)
      te[J] = z + J + ee;
    return te;
  }
  function w(S) {
    try {
      return S + "";
    } catch {
      return "[no string representation]";
    }
  }
  function E(S) {
    return S !== null && typeof S == "object" && typeof S.message == "string" && typeof S.name == "string";
  }
  function k(S) {
    try {
      p(S, "isOperational", !0);
    } catch {
    }
  }
  function W(S) {
    return S == null ? !1 : S instanceof Error.__BluebirdErrorTypes__.OperationalError || S.isOperational === !0;
  }
  function q(S) {
    return E(S) && e.propertyIsWritable(S, "stack");
  }
  var $ = function() {
    return "stack" in new Error() ? function(S) {
      return q(S) ? S : new Error(w(S));
    } : function(S) {
      if (q(S)) return S;
      try {
        throw new Error(w(S));
      } catch (z) {
        return z;
      }
    };
  }();
  function B(S) {
    return {}.toString.call(S);
  }
  function P(S, z, ee) {
    for (var te = e.names(S), J = 0; J < te.length; ++J) {
      var U = te[J];
      if (ee(U))
        try {
          e.defineProperty(z, U, e.getDescriptor(S, U));
        } catch {
        }
    }
  }
  var H = function(S) {
    return e.isArray(S) ? S : null;
  };
  if (typeof Symbol < "u" && Symbol.iterator) {
    var Q = typeof Array.from == "function" ? function(S) {
      return Array.from(S);
    } : function(S) {
      for (var z = [], ee = S[Symbol.iterator](), te; !(te = ee.next()).done; )
        z.push(te.value);
      return z;
    };
    H = function(S) {
      return e.isArray(S) ? S : S != null && typeof S[Symbol.iterator] == "function" ? Q(S) : null;
    };
  }
  var A = typeof process < "u" && B(process).toLowerCase() === "[object process]", T = typeof process < "u" && typeof process.env < "u";
  function _(S) {
    return T ? process.env[S] : void 0;
  }
  function F() {
    if (typeof Promise == "function")
      try {
        var S = new Promise(function() {
        });
        if ({}.toString.call(S) === "[object Promise]")
          return Promise;
      } catch {
      }
  }
  function O(S, z) {
    return S.bind(z);
  }
  var L = {
    isClass: h,
    isIdentifier: D,
    inheritedDataKeys: m,
    getDataPropertyOrDefault: f,
    thrower: b,
    isArray: e.isArray,
    asArray: H,
    notEnumerableProp: p,
    isPrimitive: u,
    isObject: s,
    isError: E,
    canEvaluate: t,
    errorObj: n,
    tryCatch: o,
    inherits: c,
    withAppended: g,
    maybeWrapAsError: d,
    toFastProperties: l,
    filledRange: x,
    toString: w,
    canAttachTrace: q,
    ensureErrorObject: $,
    originatesFromRejection: W,
    markAsOriginatingFromRejection: k,
    classString: B,
    copyDescriptors: P,
    hasDevTools: typeof chrome < "u" && chrome && typeof chrome.loadTimes == "function",
    isNode: A,
    hasEnvVariables: T,
    env: _,
    global: i,
    getNativePromise: F,
    domainBind: O
  };
  L.isRecentNode = L.isNode && function() {
    var S = process.versions.node.split(".").map(Number);
    return S[0] === 0 && S[1] > 10 || S[0] > 0;
  }(), L.isNode && L.toFastProperties(process);
  try {
    throw new Error();
  } catch (S) {
    L.lastLineError = S;
  }
  return Tc = L, Tc;
}
var ca = { exports: {} }, Uc, xf;
function xw() {
  if (xf) return Uc;
  xf = 1;
  var e = ye(), t, n = function() {
    throw new Error(`No async scheduler available

    See http://goo.gl/MqrFmX
`);
  }, r = e.getNativePromise();
  if (e.isNode && typeof MutationObserver > "u") {
    var i = re.setImmediate, a = process.nextTick;
    t = e.isRecentNode ? function(c) {
      i.call(re, c);
    } : function(c) {
      a.call(process, c);
    };
  } else if (typeof r == "function" && typeof r.resolve == "function") {
    var o = r.resolve();
    t = function(c) {
      o.then(c);
    };
  } else typeof MutationObserver < "u" && !(typeof window < "u" && window.navigator && (window.navigator.standalone || window.cordova)) ? t = function() {
    var c = document.createElement("div"), u = { attributes: !0 }, s = !1, d = document.createElement("div"), g = new MutationObserver(function() {
      c.classList.toggle("foo"), s = !1;
    });
    g.observe(d, u);
    var f = function() {
      s || (s = !0, d.classList.toggle("foo"));
    };
    return function(b) {
      var m = new MutationObserver(function() {
        m.disconnect(), b();
      });
      m.observe(c, u), f();
    };
  }() : typeof setImmediate < "u" ? t = function(c) {
    setImmediate(c);
  } : typeof setTimeout < "u" ? t = function(c) {
    setTimeout(c, 0);
  } : t = n;
  return Uc = t, Uc;
}
var Ec, _f;
function _w() {
  if (_f) return Ec;
  _f = 1;
  function e(n, r, i, a, o) {
    for (var c = 0; c < o; ++c)
      i[c + a] = n[c + r], n[c + r] = void 0;
  }
  function t(n) {
    this._capacity = n, this._length = 0, this._front = 0;
  }
  return t.prototype._willBeOverCapacity = function(n) {
    return this._capacity < n;
  }, t.prototype._pushOne = function(n) {
    var r = this.length();
    this._checkCapacity(r + 1);
    var i = this._front + r & this._capacity - 1;
    this[i] = n, this._length = r + 1;
  }, t.prototype.push = function(n, r, i) {
    var a = this.length() + 3;
    if (this._willBeOverCapacity(a)) {
      this._pushOne(n), this._pushOne(r), this._pushOne(i);
      return;
    }
    var o = this._front + a - 3;
    this._checkCapacity(a);
    var c = this._capacity - 1;
    this[o + 0 & c] = n, this[o + 1 & c] = r, this[o + 2 & c] = i, this._length = a;
  }, t.prototype.shift = function() {
    var n = this._front, r = this[n];
    return this[n] = void 0, this._front = n + 1 & this._capacity - 1, this._length--, r;
  }, t.prototype.length = function() {
    return this._length;
  }, t.prototype._checkCapacity = function(n) {
    this._capacity < n && this._resizeTo(this._capacity << 1);
  }, t.prototype._resizeTo = function(n) {
    var r = this._capacity;
    this._capacity = n;
    var i = this._front, a = this._length, o = i + a & r - 1;
    e(this, 0, this, r, o);
  }, Ec = t, Ec;
}
var wf;
function ww() {
  if (wf) return ca.exports;
  wf = 1;
  var e;
  try {
    throw new Error();
  } catch (u) {
    e = u;
  }
  var t = xw(), n = _w(), r = ye();
  function i() {
    this._customScheduler = !1, this._isTickUsed = !1, this._lateQueue = new n(16), this._normalQueue = new n(16), this._haveDrainedQueues = !1, this._trampolineEnabled = !0;
    var u = this;
    this.drainQueues = function() {
      u._drainQueues();
    }, this._schedule = t;
  }
  i.prototype.setScheduler = function(u) {
    var s = this._schedule;
    return this._schedule = u, this._customScheduler = !0, s;
  }, i.prototype.hasCustomScheduler = function() {
    return this._customScheduler;
  }, i.prototype.enableTrampoline = function() {
    this._trampolineEnabled = !0;
  }, i.prototype.disableTrampolineIfNecessary = function() {
    r.hasDevTools && (this._trampolineEnabled = !1);
  }, i.prototype.haveItemsQueued = function() {
    return this._isTickUsed || this._haveDrainedQueues;
  }, i.prototype.fatalError = function(u, s) {
    s ? (process.stderr.write("Fatal " + (u instanceof Error ? u.stack : u) + `
`), process.exit(2)) : this.throwLater(u);
  }, i.prototype.throwLater = function(u, s) {
    if (arguments.length === 1 && (s = u, u = function() {
      throw s;
    }), typeof setTimeout < "u")
      setTimeout(function() {
        u(s);
      }, 0);
    else try {
      this._schedule(function() {
        u(s);
      });
    } catch {
      throw new Error(`No async scheduler available

    See http://goo.gl/MqrFmX
`);
    }
  };
  function a(u, s, d) {
    this._lateQueue.push(u, s, d), this._queueTick();
  }
  function o(u, s, d) {
    this._normalQueue.push(u, s, d), this._queueTick();
  }
  function c(u) {
    this._normalQueue._pushOne(u), this._queueTick();
  }
  return r.hasDevTools ? (i.prototype.invokeLater = function(u, s, d) {
    this._trampolineEnabled ? a.call(this, u, s, d) : this._schedule(function() {
      setTimeout(function() {
        u.call(s, d);
      }, 100);
    });
  }, i.prototype.invoke = function(u, s, d) {
    this._trampolineEnabled ? o.call(this, u, s, d) : this._schedule(function() {
      u.call(s, d);
    });
  }, i.prototype.settlePromises = function(u) {
    this._trampolineEnabled ? c.call(this, u) : this._schedule(function() {
      u._settlePromises();
    });
  }) : (i.prototype.invokeLater = a, i.prototype.invoke = o, i.prototype.settlePromises = c), i.prototype._drainQueue = function(u) {
    for (; u.length() > 0; ) {
      var s = u.shift();
      if (typeof s != "function") {
        s._settlePromises();
        continue;
      }
      var d = u.shift(), g = u.shift();
      s.call(d, g);
    }
  }, i.prototype._drainQueues = function() {
    this._drainQueue(this._normalQueue), this._reset(), this._haveDrainedQueues = !0, this._drainQueue(this._lateQueue);
  }, i.prototype._queueTick = function() {
    this._isTickUsed || (this._isTickUsed = !0, this._schedule(this.drainQueues));
  }, i.prototype._reset = function() {
    this._isTickUsed = !1;
  }, ca.exports = i, ca.exports.firstLineError = e, ca.exports;
}
var Ac, Tf;
function Fn() {
  if (Tf) return Ac;
  Tf = 1;
  var e = qr(), t = e.freeze, n = ye(), r = n.inherits, i = n.notEnumerableProp;
  function a(h, l) {
    function v(D) {
      if (!(this instanceof v)) return new v(D);
      i(
        this,
        "message",
        typeof D == "string" ? D : l
      ), i(this, "name", h), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : Error.call(this);
    }
    return r(v, Error), v;
  }
  var o, c, u = a("Warning", "warning"), s = a("CancellationError", "cancellation error"), d = a("TimeoutError", "timeout error"), g = a("AggregateError", "aggregate error");
  try {
    o = TypeError, c = RangeError;
  } catch {
    o = a("TypeError", "type error"), c = a("RangeError", "range error");
  }
  for (var f = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), p = 0; p < f.length; ++p)
    typeof Array.prototype[f[p]] == "function" && (g.prototype[f[p]] = Array.prototype[f[p]]);
  e.defineProperty(g.prototype, "length", {
    value: 0,
    configurable: !1,
    writable: !0,
    enumerable: !0
  }), g.prototype.isOperational = !0;
  var b = 0;
  g.prototype.toString = function() {
    var h = Array(b * 4 + 1).join(" "), l = `
` + h + `AggregateError of:
`;
    b++, h = Array(b * 4 + 1).join(" ");
    for (var v = 0; v < this.length; ++v) {
      for (var D = this[v] === this ? "[Circular AggregateError]" : this[v] + "", x = D.split(`
`), w = 0; w < x.length; ++w)
        x[w] = h + x[w];
      D = x.join(`
`), l += D + `
`;
    }
    return b--, l;
  };
  function m(h) {
    if (!(this instanceof m))
      return new m(h);
    i(this, "name", "OperationalError"), i(this, "message", h), this.cause = h, this.isOperational = !0, h instanceof Error ? (i(this, "message", h.message), i(this, "stack", h.stack)) : Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  }
  r(m, Error);
  var y = Error.__BluebirdErrorTypes__;
  return y || (y = t({
    CancellationError: s,
    TimeoutError: d,
    OperationalError: m,
    RejectionError: m,
    AggregateError: g
  }), e.defineProperty(Error, "__BluebirdErrorTypes__", {
    value: y,
    writable: !1,
    enumerable: !1,
    configurable: !1
  })), Ac = {
    Error,
    TypeError: o,
    RangeError: c,
    CancellationError: y.CancellationError,
    OperationalError: y.OperationalError,
    TimeoutError: y.TimeoutError,
    AggregateError: y.AggregateError,
    Warning: u
  }, Ac;
}
var Cc, Uf;
function Tw() {
  return Uf || (Uf = 1, Cc = function(e, t) {
    var n = ye(), r = n.errorObj, i = n.isObject;
    function a(g, f) {
      if (i(g)) {
        if (g instanceof e) return g;
        var p = c(g);
        if (p === r) {
          f && f._pushContext();
          var b = e.reject(p.e);
          return f && f._popContext(), b;
        } else if (typeof p == "function") {
          if (s(g)) {
            var b = new e(t);
            return g._then(
              b._fulfill,
              b._reject,
              void 0,
              b,
              null
            ), b;
          }
          return d(g, p, f);
        }
      }
      return g;
    }
    function o(g) {
      return g.then;
    }
    function c(g) {
      try {
        return o(g);
      } catch (f) {
        return r.e = f, r;
      }
    }
    var u = {}.hasOwnProperty;
    function s(g) {
      try {
        return u.call(g, "_promise0");
      } catch {
        return !1;
      }
    }
    function d(g, f, p) {
      var b = new e(t), m = b;
      p && p._pushContext(), b._captureStackTrace(), p && p._popContext();
      var y = !0, h = n.tryCatch(f).call(g, l, v);
      y = !1, b && h === r && (b._rejectCallback(h.e, !0, !0), b = null);
      function l(D) {
        b && (b._resolveCallback(D), b = null);
      }
      function v(D) {
        b && (b._rejectCallback(D, y, !0), b = null);
      }
      return m;
    }
    return a;
  }), Cc;
}
var Fc, Ef;
function Uw() {
  return Ef || (Ef = 1, Fc = function(e, t, n, r, i) {
    var a = ye();
    a.isArray;
    function o(u) {
      switch (u) {
        case -2:
          return [];
        case -3:
          return {};
      }
    }
    function c(u) {
      var s = this._promise = new e(t);
      u instanceof e && s._propagateFrom(u, 3), s._setOnCancel(this), this._values = u, this._length = 0, this._totalResolved = 0, this._init(void 0, -2);
    }
    return a.inherits(c, i), c.prototype.length = function() {
      return this._length;
    }, c.prototype.promise = function() {
      return this._promise;
    }, c.prototype._init = function u(s, d) {
      var g = n(this._values, this._promise);
      if (g instanceof e) {
        g = g._target();
        var f = g._bitField;
        if (this._values = g, f & 50397184)
          if (f & 33554432)
            g = g._value();
          else return f & 16777216 ? this._reject(g._reason()) : this._cancel();
        else return this._promise._setAsyncGuaranteed(), g._then(
          u,
          this._reject,
          void 0,
          this,
          d
        );
      }
      if (g = a.asArray(g), g === null) {
        var p = r(
          "expecting an array or an iterable object but got " + a.classString(g)
        ).reason();
        this._promise._rejectCallback(p, !1);
        return;
      }
      if (g.length === 0) {
        d === -5 ? this._resolveEmptyArray() : this._resolve(o(d));
        return;
      }
      this._iterate(g);
    }, c.prototype._iterate = function(u) {
      var s = this.getActualLength(u.length);
      this._length = s, this._values = this.shouldCopyValues() ? new Array(s) : this._values;
      for (var d = this._promise, g = !1, f = null, p = 0; p < s; ++p) {
        var b = n(u[p], d);
        b instanceof e ? (b = b._target(), f = b._bitField) : f = null, g ? f !== null && b.suppressUnhandledRejections() : f !== null ? f & 50397184 ? f & 33554432 ? g = this._promiseFulfilled(b._value(), p) : f & 16777216 ? g = this._promiseRejected(b._reason(), p) : g = this._promiseCancelled(p) : (b._proxy(this, p), this._values[p] = b) : g = this._promiseFulfilled(b, p);
      }
      g || d._setAsyncGuaranteed();
    }, c.prototype._isResolved = function() {
      return this._values === null;
    }, c.prototype._resolve = function(u) {
      this._values = null, this._promise._fulfill(u);
    }, c.prototype._cancel = function() {
      this._isResolved() || !this._promise._isCancellable() || (this._values = null, this._promise._cancel());
    }, c.prototype._reject = function(u) {
      this._values = null, this._promise._rejectCallback(u, !1);
    }, c.prototype._promiseFulfilled = function(u, s) {
      this._values[s] = u;
      var d = ++this._totalResolved;
      return d >= this._length ? (this._resolve(this._values), !0) : !1;
    }, c.prototype._promiseCancelled = function() {
      return this._cancel(), !0;
    }, c.prototype._promiseRejected = function(u) {
      return this._totalResolved++, this._reject(u), !0;
    }, c.prototype._resultCancelled = function() {
      if (!this._isResolved()) {
        var u = this._values;
        if (this._cancel(), u instanceof e)
          u.cancel();
        else
          for (var s = 0; s < u.length; ++s)
            u[s] instanceof e && u[s].cancel();
      }
    }, c.prototype.shouldCopyValues = function() {
      return !0;
    }, c.prototype.getActualLength = function(u) {
      return u;
    }, c;
  }), Fc;
}
var Sc, Af;
function Ew() {
  return Af || (Af = 1, Sc = function(e) {
    var t = !1, n = [];
    e.prototype._promiseCreated = function() {
    }, e.prototype._pushContext = function() {
    }, e.prototype._popContext = function() {
      return null;
    }, e._peekContext = e.prototype._peekContext = function() {
    };
    function r() {
      this._trace = new r.CapturedTrace(a());
    }
    r.prototype._pushContext = function() {
      this._trace !== void 0 && (this._trace._promiseCreated = null, n.push(this._trace));
    }, r.prototype._popContext = function() {
      if (this._trace !== void 0) {
        var o = n.pop(), c = o._promiseCreated;
        return o._promiseCreated = null, c;
      }
      return null;
    };
    function i() {
      if (t) return new r();
    }
    function a() {
      var o = n.length - 1;
      if (o >= 0)
        return n[o];
    }
    return r.CapturedTrace = null, r.create = i, r.deactivateLongStackTraces = function() {
    }, r.activateLongStackTraces = function() {
      var o = e.prototype._pushContext, c = e.prototype._popContext, u = e._peekContext, s = e.prototype._peekContext, d = e.prototype._promiseCreated;
      r.deactivateLongStackTraces = function() {
        e.prototype._pushContext = o, e.prototype._popContext = c, e._peekContext = u, e.prototype._peekContext = s, e.prototype._promiseCreated = d, t = !1;
      }, t = !0, e.prototype._pushContext = r.prototype._pushContext, e.prototype._popContext = r.prototype._popContext, e._peekContext = e.prototype._peekContext = a, e.prototype._promiseCreated = function() {
        var g = this._peekContext();
        g && g._promiseCreated == null && (g._promiseCreated = this);
      };
    }, r;
  }), Sc;
}
var kc, Cf;
function Aw() {
  return Cf || (Cf = 1, kc = function(e, t) {
    var n = e._getDomain, r = e._async, i = Fn().Warning, a = ye(), o = a.canAttachTrace, c, u, s = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/, d = /\((?:timers\.js):\d+:\d+\)/, g = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/, f = null, p = null, b = !1, m, y = !!(a.env("BLUEBIRD_DEBUG") != 0 && (a.env("BLUEBIRD_DEBUG") || a.env("NODE_ENV") === "development")), h = !!(a.env("BLUEBIRD_WARNINGS") != 0 && (y || a.env("BLUEBIRD_WARNINGS"))), l = !!(a.env("BLUEBIRD_LONG_STACK_TRACES") != 0 && (y || a.env("BLUEBIRD_LONG_STACK_TRACES"))), v = a.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 && (h || !!a.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
    e.prototype.suppressUnhandledRejections = function() {
      var I = this._target();
      I._bitField = I._bitField & -1048577 | 524288;
    }, e.prototype._ensurePossibleRejectionHandled = function() {
      this._bitField & 524288 || (this._setRejectionIsUnhandled(), r.invokeLater(this._notifyUnhandledRejection, this, void 0));
    }, e.prototype._notifyUnhandledRejectionIsHandled = function() {
      M(
        "rejectionHandled",
        c,
        void 0,
        this
      );
    }, e.prototype._setReturnedNonUndefined = function() {
      this._bitField = this._bitField | 268435456;
    }, e.prototype._returnedNonUndefined = function() {
      return (this._bitField & 268435456) !== 0;
    }, e.prototype._notifyUnhandledRejection = function() {
      if (this._isRejectionUnhandled()) {
        var I = this._settledValue();
        this._setUnhandledRejectionIsNotified(), M(
          "unhandledRejection",
          u,
          I,
          this
        );
      }
    }, e.prototype._setUnhandledRejectionIsNotified = function() {
      this._bitField = this._bitField | 262144;
    }, e.prototype._unsetUnhandledRejectionIsNotified = function() {
      this._bitField = this._bitField & -262145;
    }, e.prototype._isUnhandledRejectionNotified = function() {
      return (this._bitField & 262144) > 0;
    }, e.prototype._setRejectionIsUnhandled = function() {
      this._bitField = this._bitField | 1048576;
    }, e.prototype._unsetRejectionIsUnhandled = function() {
      this._bitField = this._bitField & -1048577, this._isUnhandledRejectionNotified() && (this._unsetUnhandledRejectionIsNotified(), this._notifyUnhandledRejectionIsHandled());
    }, e.prototype._isRejectionUnhandled = function() {
      return (this._bitField & 1048576) > 0;
    }, e.prototype._warn = function(I, N, G) {
      return ee(I, N, G || this);
    }, e.onPossiblyUnhandledRejection = function(I) {
      var N = n();
      u = typeof I == "function" ? N === null ? I : a.domainBind(N, I) : void 0;
    }, e.onUnhandledRejectionHandled = function(I) {
      var N = n();
      c = typeof I == "function" ? N === null ? I : a.domainBind(N, I) : void 0;
    };
    var D = function() {
    };
    e.longStackTraces = function() {
      if (r.haveItemsQueued() && !ve.longStackTraces)
        throw new Error(`cannot enable long stack traces after promises have been created

    See http://goo.gl/MqrFmX
`);
      if (!ve.longStackTraces && oe()) {
        var I = e.prototype._captureStackTrace, N = e.prototype._attachExtraTrace;
        ve.longStackTraces = !0, D = function() {
          if (r.haveItemsQueued() && !ve.longStackTraces)
            throw new Error(`cannot enable long stack traces after promises have been created

    See http://goo.gl/MqrFmX
`);
          e.prototype._captureStackTrace = I, e.prototype._attachExtraTrace = N, t.deactivateLongStackTraces(), r.enableTrampoline(), ve.longStackTraces = !1;
        }, e.prototype._captureStackTrace = O, e.prototype._attachExtraTrace = L, t.activateLongStackTraces(), r.disableTrampolineIfNecessary();
      }
    }, e.hasLongStackTraces = function() {
      return ve.longStackTraces && oe();
    };
    var x = function() {
      try {
        if (typeof CustomEvent == "function") {
          var I = new CustomEvent("CustomEvent");
          return a.global.dispatchEvent(I), function(N, G) {
            var Y = new CustomEvent(N.toLowerCase(), {
              detail: G,
              cancelable: !0
            });
            return !a.global.dispatchEvent(Y);
          };
        } else if (typeof Event == "function") {
          var I = new Event("CustomEvent");
          return a.global.dispatchEvent(I), function(G, Y) {
            var ie = new Event(G.toLowerCase(), {
              cancelable: !0
            });
            return ie.detail = Y, !a.global.dispatchEvent(ie);
          };
        } else {
          var I = document.createEvent("CustomEvent");
          return I.initCustomEvent("testingtheevent", !1, !0, {}), a.global.dispatchEvent(I), function(G, Y) {
            var ie = document.createEvent("CustomEvent");
            return ie.initCustomEvent(
              G.toLowerCase(),
              !1,
              !0,
              Y
            ), !a.global.dispatchEvent(ie);
          };
        }
      } catch {
      }
      return function() {
        return !1;
      };
    }(), w = function() {
      return a.isNode ? function() {
        return process.emit.apply(process, arguments);
      } : a.global ? function(I) {
        var N = "on" + I.toLowerCase(), G = a.global[N];
        return G ? (G.apply(a.global, [].slice.call(arguments, 1)), !0) : !1;
      } : function() {
        return !1;
      };
    }();
    function E(I, N) {
      return { promise: N };
    }
    var k = {
      promiseCreated: E,
      promiseFulfilled: E,
      promiseRejected: E,
      promiseResolved: E,
      promiseCancelled: E,
      promiseChained: function(I, N, G) {
        return { promise: N, child: G };
      },
      warning: function(I, N) {
        return { warning: N };
      },
      unhandledRejection: function(I, N, G) {
        return { reason: N, promise: G };
      },
      rejectionHandled: E
    }, W = function(I) {
      var N = !1;
      try {
        N = w.apply(null, arguments);
      } catch (Y) {
        r.throwLater(Y), N = !0;
      }
      var G = !1;
      try {
        G = x(
          I,
          k[I].apply(null, arguments)
        );
      } catch (Y) {
        r.throwLater(Y), G = !0;
      }
      return G || N;
    };
    e.config = function(I) {
      if (I = Object(I), "longStackTraces" in I && (I.longStackTraces ? e.longStackTraces() : !I.longStackTraces && e.hasLongStackTraces() && D()), "warnings" in I) {
        var N = I.warnings;
        ve.warnings = !!N, v = ve.warnings, a.isObject(N) && "wForgottenReturn" in N && (v = !!N.wForgottenReturn);
      }
      if ("cancellation" in I && I.cancellation && !ve.cancellation) {
        if (r.haveItemsQueued())
          throw new Error(
            "cannot enable cancellation after promises are in use"
          );
        e.prototype._clearCancellationData = Q, e.prototype._propagateFrom = A, e.prototype._onCancel = P, e.prototype._setOnCancel = H, e.prototype._attachCancellationCallback = B, e.prototype._execute = $, _ = A, ve.cancellation = !0;
      }
      return "monitoring" in I && (I.monitoring && !ve.monitoring ? (ve.monitoring = !0, e.prototype._fireEvent = W) : !I.monitoring && ve.monitoring && (ve.monitoring = !1, e.prototype._fireEvent = q)), e;
    };
    function q() {
      return !1;
    }
    e.prototype._fireEvent = q, e.prototype._execute = function(I, N, G) {
      try {
        I(N, G);
      } catch (Y) {
        return Y;
      }
    }, e.prototype._onCancel = function() {
    }, e.prototype._setOnCancel = function(I) {
    }, e.prototype._attachCancellationCallback = function(I) {
    }, e.prototype._captureStackTrace = function() {
    }, e.prototype._attachExtraTrace = function() {
    }, e.prototype._clearCancellationData = function() {
    }, e.prototype._propagateFrom = function(I, N) {
    };
    function $(I, N, G) {
      var Y = this;
      try {
        I(N, G, function(ie) {
          if (typeof ie != "function")
            throw new TypeError("onCancel must be a function, got: " + a.toString(ie));
          Y._attachCancellationCallback(ie);
        });
      } catch (ie) {
        return ie;
      }
    }
    function B(I) {
      if (!this._isCancellable()) return this;
      var N = this._onCancel();
      N !== void 0 ? a.isArray(N) ? N.push(I) : this._setOnCancel([N, I]) : this._setOnCancel(I);
    }
    function P() {
      return this._onCancelField;
    }
    function H(I) {
      this._onCancelField = I;
    }
    function Q() {
      this._cancellationParent = void 0, this._onCancelField = void 0;
    }
    function A(I, N) {
      if (N & 1) {
        this._cancellationParent = I;
        var G = I._branchesRemainingToCancel;
        G === void 0 && (G = 0), I._branchesRemainingToCancel = G + 1;
      }
      N & 2 && I._isBound() && this._setBoundTo(I._boundTo);
    }
    function T(I, N) {
      N & 2 && I._isBound() && this._setBoundTo(I._boundTo);
    }
    var _ = T;
    function F() {
      var I = this._boundTo;
      return I !== void 0 && I instanceof e ? I.isFulfilled() ? I.value() : void 0 : I;
    }
    function O() {
      this._trace = new rt(this._peekContext());
    }
    function L(I, N) {
      if (o(I)) {
        var G = this._trace;
        if (G !== void 0 && N && (G = G._parent), G !== void 0)
          G.attachExtraTrace(I);
        else if (!I.__stackCleaned__) {
          var Y = K(I);
          a.notEnumerableProp(
            I,
            "stack",
            Y.message + `
` + Y.stack.join(`
`)
          ), a.notEnumerableProp(I, "__stackCleaned__", !0);
        }
      }
    }
    function S(I, N, G, Y, ie) {
      if (I === void 0 && N !== null && v) {
        if (ie !== void 0 && ie._returnedNonUndefined() || !(Y._bitField & 65535)) return;
        G && (G = G + " ");
        var Ee = "", ge = "";
        if (N._trace) {
          for (var ce = N._trace.stack.split(`
`), De = C(ce), ke = De.length - 1; ke >= 0; --ke) {
            var Qt = De[ke];
            if (!d.test(Qt)) {
              var en = Qt.match(g);
              en && (Ee = "at " + en[1] + ":" + en[2] + ":" + en[3] + " ");
              break;
            }
          }
          if (De.length > 0) {
            for (var tv = De[0], ke = 0; ke < ce.length; ++ke)
              if (ce[ke] === tv) {
                ke > 0 && (ge = `
` + ce[ke - 1]);
                break;
              }
          }
        }
        var nv = "a promise was created in a " + G + "handler " + Ee + "but was not returned from it, see http://goo.gl/rRqMUw" + ge;
        Y._warn(nv, !0, N);
      }
    }
    function z(I, N) {
      var G = I + " is deprecated and will be removed in a future version.";
      return N && (G += " Use " + N + " instead."), ee(G);
    }
    function ee(I, N, G) {
      if (ve.warnings) {
        var Y = new i(I), ie;
        if (N)
          G._attachExtraTrace(Y);
        else if (ve.longStackTraces && (ie = e._peekContext()))
          ie.attachExtraTrace(Y);
        else {
          var Ee = K(Y);
          Y.stack = Ee.message + `
` + Ee.stack.join(`
`);
        }
        W("warning", Y) || R(Y, "", !0);
      }
    }
    function te(I, N) {
      for (var G = 0; G < N.length - 1; ++G)
        N[G].push("From previous event:"), N[G] = N[G].join(`
`);
      return G < N.length && (N[G] = N[G].join(`
`)), I + `
` + N.join(`
`);
    }
    function J(I) {
      for (var N = 0; N < I.length; ++N)
        (I[N].length === 0 || N + 1 < I.length && I[N][0] === I[N + 1][0]) && (I.splice(N, 1), N--);
    }
    function U(I) {
      for (var N = I[0], G = 1; G < I.length; ++G) {
        for (var Y = I[G], ie = N.length - 1, Ee = N[ie], ge = -1, ce = Y.length - 1; ce >= 0; --ce)
          if (Y[ce] === Ee) {
            ge = ce;
            break;
          }
        for (var ce = ge; ce >= 0; --ce) {
          var De = Y[ce];
          if (N[ie] === De)
            N.pop(), ie--;
          else
            break;
        }
        N = Y;
      }
    }
    function C(I) {
      for (var N = [], G = 0; G < I.length; ++G) {
        var Y = I[G], ie = Y === "    (No stack trace)" || f.test(Y), Ee = ie && le(Y);
        ie && !Ee && (b && Y.charAt(0) !== " " && (Y = "    " + Y), N.push(Y));
      }
      return N;
    }
    function Z(I) {
      for (var N = I.stack.replace(/\s+$/g, "").split(`
`), G = 0; G < N.length; ++G) {
        var Y = N[G];
        if (Y === "    (No stack trace)" || f.test(Y))
          break;
      }
      return G > 0 && I.name != "SyntaxError" && (N = N.slice(G)), N;
    }
    function K(I) {
      var N = I.stack, G = I.toString();
      return N = typeof N == "string" && N.length > 0 ? Z(I) : ["    (No stack trace)"], {
        message: G,
        stack: I.name == "SyntaxError" ? N : C(N)
      };
    }
    function R(I, N, G) {
      if (typeof console < "u") {
        var Y;
        if (a.isObject(I)) {
          var ie = I.stack;
          Y = N + p(ie, I);
        } else
          Y = N + String(I);
        typeof m == "function" ? m(Y, G) : (typeof console.log == "function" || typeof console.log == "object") && console.log(Y);
      }
    }
    function M(I, N, G, Y) {
      var ie = !1;
      try {
        typeof N == "function" && (ie = !0, I === "rejectionHandled" ? N(Y) : N(G, Y));
      } catch (Ee) {
        r.throwLater(Ee);
      }
      I === "unhandledRejection" ? !W(I, G, Y) && !ie && R(G, "Unhandled rejection ") : W(I, Y);
    }
    function V(I) {
      var N;
      if (typeof I == "function")
        N = "[function " + (I.name || "anonymous") + "]";
      else {
        N = I && typeof I.toString == "function" ? I.toString() : a.toString(I);
        var G = /\[object [a-zA-Z0-9$_]+\]/;
        if (G.test(N))
          try {
            var Y = JSON.stringify(I);
            N = Y;
          } catch {
          }
        N.length === 0 && (N = "(empty array)");
      }
      return "(<" + ne(N) + ">, no stack trace)";
    }
    function ne(I) {
      var N = 41;
      return I.length < N ? I : I.substr(0, N - 3) + "...";
    }
    function oe() {
      return typeof lr == "function";
    }
    var le = function() {
      return !1;
    }, Ue = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
    function Ne(I) {
      var N = I.match(Ue);
      if (N)
        return {
          fileName: N[1],
          line: parseInt(N[2], 10)
        };
    }
    function Jt(I, N) {
      if (oe()) {
        for (var G = I.stack.split(`
`), Y = N.stack.split(`
`), ie = -1, Ee = -1, ge, ce, De = 0; De < G.length; ++De) {
          var ke = Ne(G[De]);
          if (ke) {
            ge = ke.fileName, ie = ke.line;
            break;
          }
        }
        for (var De = 0; De < Y.length; ++De) {
          var ke = Ne(Y[De]);
          if (ke) {
            ce = ke.fileName, Ee = ke.line;
            break;
          }
        }
        ie < 0 || Ee < 0 || !ge || !ce || ge !== ce || ie >= Ee || (le = function(Qt) {
          if (s.test(Qt)) return !0;
          var en = Ne(Qt);
          return !!(en && en.fileName === ge && ie <= en.line && en.line <= Ee);
        });
      }
    }
    function rt(I) {
      this._parent = I, this._promisesCreated = 0;
      var N = this._length = 1 + (I === void 0 ? 0 : I._length);
      lr(this, rt), N > 32 && this.uncycle();
    }
    a.inherits(rt, Error), t.CapturedTrace = rt, rt.prototype.uncycle = function() {
      var I = this._length;
      if (!(I < 2)) {
        for (var N = [], G = {}, Y = 0, ie = this; ie !== void 0; ++Y)
          N.push(ie), ie = ie._parent;
        I = this._length = Y;
        for (var Y = I - 1; Y >= 0; --Y) {
          var Ee = N[Y].stack;
          G[Ee] === void 0 && (G[Ee] = Y);
        }
        for (var Y = 0; Y < I; ++Y) {
          var ge = N[Y].stack, ce = G[ge];
          if (ce !== void 0 && ce !== Y) {
            ce > 0 && (N[ce - 1]._parent = void 0, N[ce - 1]._length = 1), N[Y]._parent = void 0, N[Y]._length = 1;
            var De = Y > 0 ? N[Y - 1] : this;
            ce < I - 1 ? (De._parent = N[ce + 1], De._parent.uncycle(), De._length = De._parent._length + 1) : (De._parent = void 0, De._length = 1);
            for (var ke = De._length + 1, Qt = Y - 2; Qt >= 0; --Qt)
              N[Qt]._length = ke, ke++;
            return;
          }
        }
      }
    }, rt.prototype.attachExtraTrace = function(I) {
      if (!I.__stackCleaned__) {
        this.uncycle();
        for (var N = K(I), G = N.message, Y = [N.stack], ie = this; ie !== void 0; )
          Y.push(C(ie.stack.split(`
`))), ie = ie._parent;
        U(Y), J(Y), a.notEnumerableProp(I, "stack", te(G, Y)), a.notEnumerableProp(I, "__stackCleaned__", !0);
      }
    };
    var lr = function() {
      var N = /^\s*at\s*/, G = function(ge, ce) {
        return typeof ge == "string" ? ge : ce.name !== void 0 && ce.message !== void 0 ? ce.toString() : V(ce);
      };
      if (typeof Error.stackTraceLimit == "number" && typeof Error.captureStackTrace == "function") {
        Error.stackTraceLimit += 6, f = N, p = G;
        var Y = Error.captureStackTrace;
        return le = function(ge) {
          return s.test(ge);
        }, function(ge, ce) {
          Error.stackTraceLimit += 6, Y(ge, ce), Error.stackTraceLimit -= 6;
        };
      }
      var ie = new Error();
      if (typeof ie.stack == "string" && ie.stack.split(`
`)[0].indexOf("stackDetection@") >= 0)
        return f = /@/, p = G, b = !0, function(ce) {
          ce.stack = new Error().stack;
        };
      var Ee;
      try {
        throw new Error();
      } catch (ge) {
        Ee = "stack" in ge;
      }
      return !("stack" in ie) && Ee && typeof Error.stackTraceLimit == "number" ? (f = N, p = G, function(ce) {
        Error.stackTraceLimit += 6;
        try {
          throw new Error();
        } catch (De) {
          ce.stack = De.stack;
        }
        Error.stackTraceLimit -= 6;
      }) : (p = function(ge, ce) {
        return typeof ge == "string" ? ge : (typeof ce == "object" || typeof ce == "function") && ce.name !== void 0 && ce.message !== void 0 ? ce.toString() : V(ce);
      }, null);
    }();
    typeof console < "u" && typeof console.warn < "u" && (m = function(I) {
      console.warn(I);
    }, a.isNode && process.stderr.isTTY ? m = function(I, N) {
      var G = N ? "\x1B[33m" : "\x1B[31m";
      console.warn(G + I + `\x1B[0m
`);
    } : !a.isNode && typeof new Error().stack == "string" && (m = function(I, N) {
      console.warn(
        "%c" + I,
        N ? "color: darkorange" : "color: red"
      );
    }));
    var ve = {
      warnings: h,
      longStackTraces: !1,
      cancellation: !1,
      monitoring: !1
    };
    return l && e.longStackTraces(), {
      longStackTraces: function() {
        return ve.longStackTraces;
      },
      warnings: function() {
        return ve.warnings;
      },
      cancellation: function() {
        return ve.cancellation;
      },
      monitoring: function() {
        return ve.monitoring;
      },
      propagateFromFunction: function() {
        return _;
      },
      boundValueFunction: function() {
        return F;
      },
      checkForgottenReturns: S,
      setBounds: Jt,
      warn: ee,
      deprecated: z,
      CapturedTrace: rt,
      fireDomEvent: x,
      fireGlobalEvent: w
    };
  }), kc;
}
var Bc, Ff;
function Cw() {
  return Ff || (Ff = 1, Bc = function(e, t) {
    var n = ye(), r = e.CancellationError, i = n.errorObj;
    function a(g, f, p) {
      this.promise = g, this.type = f, this.handler = p, this.called = !1, this.cancelPromise = null;
    }
    a.prototype.isFinallyHandler = function() {
      return this.type === 0;
    };
    function o(g) {
      this.finallyHandler = g;
    }
    o.prototype._resultCancelled = function() {
      c(this.finallyHandler);
    };
    function c(g, f) {
      return g.cancelPromise != null ? (arguments.length > 1 ? g.cancelPromise._reject(f) : g.cancelPromise._cancel(), g.cancelPromise = null, !0) : !1;
    }
    function u() {
      return d.call(this, this.promise._target()._settledValue());
    }
    function s(g) {
      if (!c(this, g))
        return i.e = g, i;
    }
    function d(g) {
      var f = this.promise, p = this.handler;
      if (!this.called) {
        this.called = !0;
        var b = this.isFinallyHandler() ? p.call(f._boundValue()) : p.call(f._boundValue(), g);
        if (b !== void 0) {
          f._setReturnedNonUndefined();
          var m = t(b, f);
          if (m instanceof e) {
            if (this.cancelPromise != null)
              if (m._isCancelled()) {
                var y = new r("late cancellation observer");
                return f._attachExtraTrace(y), i.e = y, i;
              } else m.isPending() && m._attachCancellationCallback(
                new o(this)
              );
            return m._then(
              u,
              s,
              void 0,
              this,
              void 0
            );
          }
        }
      }
      return f.isRejected() ? (c(this), i.e = g, i) : (c(this), g);
    }
    return e.prototype._passThrough = function(g, f, p, b) {
      return typeof g != "function" ? this.then() : this._then(
        p,
        b,
        void 0,
        new a(this, f, g),
        void 0
      );
    }, e.prototype.lastly = e.prototype.finally = function(g) {
      return this._passThrough(
        g,
        0,
        d,
        d
      );
    }, e.prototype.tap = function(g) {
      return this._passThrough(g, 1, d);
    }, a;
  }), Bc;
}
var Rc, Sf;
function Fw() {
  return Sf || (Sf = 1, Rc = function(e) {
    var t = ye(), n = qr().keys, r = t.tryCatch, i = t.errorObj;
    function a(o, c, u) {
      return function(s) {
        var d = u._boundValue();
        e: for (var g = 0; g < o.length; ++g) {
          var f = o[g];
          if (f === Error || f != null && f.prototype instanceof Error) {
            if (s instanceof f)
              return r(c).call(d, s);
          } else if (typeof f == "function") {
            var p = r(f).call(d, s);
            if (p === i)
              return p;
            if (p)
              return r(c).call(d, s);
          } else if (t.isObject(s)) {
            for (var b = n(f), m = 0; m < b.length; ++m) {
              var y = b[m];
              if (f[y] != s[y])
                continue e;
            }
            return r(c).call(d, s);
          }
        }
        return e;
      };
    }
    return a;
  }), Rc;
}
var Oc, kf;
function Z2() {
  if (kf) return Oc;
  kf = 1;
  var e = ye(), t = e.maybeWrapAsError, n = Fn(), r = n.OperationalError, i = qr();
  function a(s) {
    return s instanceof Error && i.getPrototypeOf(s) === Error.prototype;
  }
  var o = /^(?:name|message|stack|cause)$/;
  function c(s) {
    var d;
    if (a(s)) {
      d = new r(s), d.name = s.name, d.message = s.message, d.stack = s.stack;
      for (var g = i.keys(s), f = 0; f < g.length; ++f) {
        var p = g[f];
        o.test(p) || (d[p] = s[p]);
      }
      return d;
    }
    return e.markAsOriginatingFromRejection(s), s;
  }
  function u(s, d) {
    return function(g, f) {
      if (s !== null) {
        if (g) {
          var p = c(t(g));
          s._attachExtraTrace(p), s._reject(p);
        } else if (!d)
          s._fulfill(f);
        else {
          for (var b = arguments.length, m = new Array(Math.max(b - 1, 0)), y = 1; y < b; ++y)
            m[y - 1] = arguments[y];
          s._fulfill(m);
        }
        s = null;
      }
    };
  }
  return Oc = u, Oc;
}
var Ic, Bf;
function Sw() {
  return Bf || (Bf = 1, Ic = function(e, t, n, r, i) {
    var a = ye(), o = a.tryCatch;
    e.method = function(c) {
      if (typeof c != "function")
        throw new e.TypeError("expecting a function but got " + a.classString(c));
      return function() {
        var u = new e(t);
        u._captureStackTrace(), u._pushContext();
        var s = o(c).apply(this, arguments), d = u._popContext();
        return i.checkForgottenReturns(
          s,
          d,
          "Promise.method",
          u
        ), u._resolveFromSyncValue(s), u;
      };
    }, e.attempt = e.try = function(c) {
      if (typeof c != "function")
        return r("expecting a function but got " + a.classString(c));
      var u = new e(t);
      u._captureStackTrace(), u._pushContext();
      var s;
      if (arguments.length > 1) {
        i.deprecated("calling Promise.try with more than 1 argument");
        var d = arguments[1], g = arguments[2];
        s = a.isArray(d) ? o(c).apply(g, d) : o(c).call(g, d);
      } else
        s = o(c)();
      var f = u._popContext();
      return i.checkForgottenReturns(
        s,
        f,
        "Promise.try",
        u
      ), u._resolveFromSyncValue(s), u;
    }, e.prototype._resolveFromSyncValue = function(c) {
      c === a.errorObj ? this._rejectCallback(c.e, !1) : this._resolveCallback(c, !0);
    };
  }), Ic;
}
var Wc, Rf;
function kw() {
  return Rf || (Rf = 1, Wc = function(e, t, n, r) {
    var i = !1, a = function(s, d) {
      this._reject(d);
    }, o = function(s, d) {
      d.promiseRejectionQueued = !0, d.bindingPromise._then(a, a, null, this, s);
    }, c = function(s, d) {
      this._bitField & 50397184 || this._resolveCallback(d.target);
    }, u = function(s, d) {
      d.promiseRejectionQueued || this._reject(s);
    };
    e.prototype.bind = function(s) {
      i || (i = !0, e.prototype._propagateFrom = r.propagateFromFunction(), e.prototype._boundValue = r.boundValueFunction());
      var d = n(s), g = new e(t);
      g._propagateFrom(this, 1);
      var f = this._target();
      if (g._setBoundTo(d), d instanceof e) {
        var p = {
          promiseRejectionQueued: !1,
          promise: g,
          target: f,
          bindingPromise: d
        };
        f._then(t, o, void 0, g, p), d._then(
          c,
          u,
          void 0,
          g,
          p
        ), g._setOnCancel(d);
      } else
        g._resolveCallback(f);
      return g;
    }, e.prototype._setBoundTo = function(s) {
      s !== void 0 ? (this._bitField = this._bitField | 2097152, this._boundTo = s) : this._bitField = this._bitField & -2097153;
    }, e.prototype._isBound = function() {
      return (this._bitField & 2097152) === 2097152;
    }, e.bind = function(s, d) {
      return e.resolve(d).bind(s);
    };
  }), Wc;
}
var Nc, Of;
function Bw() {
  return Of || (Of = 1, Nc = function(e, t, n, r) {
    var i = ye(), a = i.tryCatch, o = i.errorObj, c = e._async;
    e.prototype.break = e.prototype.cancel = function() {
      if (!r.cancellation()) return this._warn("cancellation is disabled");
      for (var u = this, s = u; u._isCancellable(); ) {
        if (!u._cancelBy(s)) {
          s._isFollowing() ? s._followee().cancel() : s._cancelBranched();
          break;
        }
        var d = u._cancellationParent;
        if (d == null || !d._isCancellable()) {
          u._isFollowing() ? u._followee().cancel() : u._cancelBranched();
          break;
        } else
          u._isFollowing() && u._followee().cancel(), u._setWillBeCancelled(), s = u, u = d;
      }
    }, e.prototype._branchHasCancelled = function() {
      this._branchesRemainingToCancel--;
    }, e.prototype._enoughBranchesHaveCancelled = function() {
      return this._branchesRemainingToCancel === void 0 || this._branchesRemainingToCancel <= 0;
    }, e.prototype._cancelBy = function(u) {
      return u === this ? (this._branchesRemainingToCancel = 0, this._invokeOnCancel(), !0) : (this._branchHasCancelled(), this._enoughBranchesHaveCancelled() ? (this._invokeOnCancel(), !0) : !1);
    }, e.prototype._cancelBranched = function() {
      this._enoughBranchesHaveCancelled() && this._cancel();
    }, e.prototype._cancel = function() {
      this._isCancellable() && (this._setCancelled(), c.invoke(this._cancelPromises, this, void 0));
    }, e.prototype._cancelPromises = function() {
      this._length() > 0 && this._settlePromises();
    }, e.prototype._unsetOnCancel = function() {
      this._onCancelField = void 0;
    }, e.prototype._isCancellable = function() {
      return this.isPending() && !this._isCancelled();
    }, e.prototype.isCancellable = function() {
      return this.isPending() && !this.isCancelled();
    }, e.prototype._doInvokeOnCancel = function(u, s) {
      if (i.isArray(u))
        for (var d = 0; d < u.length; ++d)
          this._doInvokeOnCancel(u[d], s);
      else if (u !== void 0)
        if (typeof u == "function") {
          if (!s) {
            var g = a(u).call(this._boundValue());
            g === o && (this._attachExtraTrace(g.e), c.throwLater(g.e));
          }
        } else
          u._resultCancelled(this);
    }, e.prototype._invokeOnCancel = function() {
      var u = this._onCancel();
      this._unsetOnCancel(), c.invoke(this._doInvokeOnCancel, this, u);
    }, e.prototype._invokeInternalOnCancel = function() {
      this._isCancellable() && (this._doInvokeOnCancel(this._onCancel(), !0), this._unsetOnCancel());
    }, e.prototype._resultCancelled = function() {
      this.cancel();
    };
  }), Nc;
}
var Lc, If;
function Rw() {
  return If || (If = 1, Lc = function(e) {
    function t() {
      return this.value;
    }
    function n() {
      throw this.reason;
    }
    e.prototype.return = e.prototype.thenReturn = function(r) {
      return r instanceof e && r.suppressUnhandledRejections(), this._then(
        t,
        void 0,
        void 0,
        { value: r },
        void 0
      );
    }, e.prototype.throw = e.prototype.thenThrow = function(r) {
      return this._then(
        n,
        void 0,
        void 0,
        { reason: r },
        void 0
      );
    }, e.prototype.catchThrow = function(r) {
      if (arguments.length <= 1)
        return this._then(
          void 0,
          n,
          void 0,
          { reason: r },
          void 0
        );
      var i = arguments[1], a = function() {
        throw i;
      };
      return this.caught(r, a);
    }, e.prototype.catchReturn = function(r) {
      if (arguments.length <= 1)
        return r instanceof e && r.suppressUnhandledRejections(), this._then(
          void 0,
          t,
          void 0,
          { value: r },
          void 0
        );
      var i = arguments[1];
      i instanceof e && i.suppressUnhandledRejections();
      var a = function() {
        return i;
      };
      return this.caught(r, a);
    };
  }), Lc;
}
var Mc, Wf;
function Ow() {
  return Wf || (Wf = 1, Mc = function(e) {
    function t(u) {
      u !== void 0 ? (u = u._target(), this._bitField = u._bitField, this._settledValueField = u._isFateSealed() ? u._settledValue() : void 0) : (this._bitField = 0, this._settledValueField = void 0);
    }
    t.prototype._settledValue = function() {
      return this._settledValueField;
    };
    var n = t.prototype.value = function() {
      if (!this.isFulfilled())
        throw new TypeError(`cannot get fulfillment value of a non-fulfilled promise

    See http://goo.gl/MqrFmX
`);
      return this._settledValue();
    }, r = t.prototype.error = t.prototype.reason = function() {
      if (!this.isRejected())
        throw new TypeError(`cannot get rejection reason of a non-rejected promise

    See http://goo.gl/MqrFmX
`);
      return this._settledValue();
    }, i = t.prototype.isFulfilled = function() {
      return (this._bitField & 33554432) !== 0;
    }, a = t.prototype.isRejected = function() {
      return (this._bitField & 16777216) !== 0;
    }, o = t.prototype.isPending = function() {
      return (this._bitField & 50397184) === 0;
    }, c = t.prototype.isResolved = function() {
      return (this._bitField & 50331648) !== 0;
    };
    t.prototype.isCancelled = function() {
      return (this._bitField & 8454144) !== 0;
    }, e.prototype.__isCancelled = function() {
      return (this._bitField & 65536) === 65536;
    }, e.prototype._isCancelled = function() {
      return this._target().__isCancelled();
    }, e.prototype.isCancelled = function() {
      return (this._target()._bitField & 8454144) !== 0;
    }, e.prototype.isPending = function() {
      return o.call(this._target());
    }, e.prototype.isRejected = function() {
      return a.call(this._target());
    }, e.prototype.isFulfilled = function() {
      return i.call(this._target());
    }, e.prototype.isResolved = function() {
      return c.call(this._target());
    }, e.prototype.value = function() {
      return n.call(this._target());
    }, e.prototype.reason = function() {
      var u = this._target();
      return u._unsetRejectionIsUnhandled(), r.call(u);
    }, e.prototype._value = function() {
      return this._settledValue();
    }, e.prototype._reason = function() {
      return this._unsetRejectionIsUnhandled(), this._settledValue();
    }, e.PromiseInspection = t;
  }), Mc;
}
var $c, Nf;
function Iw() {
  return Nf || (Nf = 1, $c = function(e, t, n, r, i, a) {
    var o = ye(), c = o.canEvaluate, u = o.tryCatch, s = o.errorObj, d;
    if (c) {
      for (var g = function(l) {
        return new Function("value", "holder", `                             
	            'use strict';                                                    
	            holder.pIndex = value;                                           
	            holder.checkFulfillment(this);                                   
	            `.replace(/Index/g, l));
      }, f = function(l) {
        return new Function("promise", "holder", `                           
	            'use strict';                                                    
	            holder.pIndex = promise;                                         
	            `.replace(/Index/g, l));
      }, p = function(l) {
        for (var v = new Array(l), D = 0; D < v.length; ++D)
          v[D] = "this.p" + (D + 1);
        var x = v.join(" = ") + " = null;", w = `var promise;
` + v.map(function(q) {
          return `                                                         
	                promise = ` + q + `;                                      
	                if (promise instanceof Promise) {                            
	                    promise.cancel();                                        
	                }                                                            
	            `;
        }).join(`
`), E = v.join(", "), k = "Holder$" + l, W = `return function(tryCatch, errorObj, Promise, async) {    
	            'use strict';                                                    
	            function [TheName](fn) {                                         
	                [TheProperties]                                              
	                this.fn = fn;                                                
	                this.asyncNeeded = true;                                     
	                this.now = 0;                                                
	            }                                                                
	                                                                             
	            [TheName].prototype._callFunction = function(promise) {          
	                promise._pushContext();                                      
	                var ret = tryCatch(this.fn)([ThePassedArguments]);           
	                promise._popContext();                                       
	                if (ret === errorObj) {                                      
	                    promise._rejectCallback(ret.e, false);                   
	                } else {                                                     
	                    promise._resolveCallback(ret);                           
	                }                                                            
	            };                                                               
	                                                                             
	            [TheName].prototype.checkFulfillment = function(promise) {       
	                var now = ++this.now;                                        
	                if (now === [TheTotal]) {                                    
	                    if (this.asyncNeeded) {                                  
	                        async.invoke(this._callFunction, this, promise);     
	                    } else {                                                 
	                        this._callFunction(promise);                         
	                    }                                                        
	                                                                             
	                }                                                            
	            };                                                               
	                                                                             
	            [TheName].prototype._resultCancelled = function() {              
	                [CancellationCode]                                           
	            };                                                               
	                                                                             
	            return [TheName];                                                
	        }(tryCatch, errorObj, Promise, async);                               
	        `;
        return W = W.replace(/\[TheName\]/g, k).replace(/\[TheTotal\]/g, l).replace(/\[ThePassedArguments\]/g, E).replace(/\[TheProperties\]/g, x).replace(/\[CancellationCode\]/g, w), new Function("tryCatch", "errorObj", "Promise", "async", W)(u, s, e, i);
      }, b = [], m = [], y = [], h = 0; h < 8; ++h)
        b.push(p(h + 1)), m.push(g(h + 1)), y.push(f(h + 1));
      d = function(l) {
        this._reject(l);
      };
    }
    e.join = function() {
      var l = arguments.length - 1, v;
      if (l > 0 && typeof arguments[l] == "function" && (v = arguments[l], l <= 8 && c)) {
        var H = new e(r);
        H._captureStackTrace();
        for (var D = b[l - 1], x = new D(v), w = m, E = 0; E < l; ++E) {
          var k = n(arguments[E], H);
          if (k instanceof e) {
            k = k._target();
            var W = k._bitField;
            W & 50397184 ? W & 33554432 ? w[E].call(
              H,
              k._value(),
              x
            ) : W & 16777216 ? H._reject(k._reason()) : H._cancel() : (k._then(
              w[E],
              d,
              void 0,
              H,
              x
            ), y[E](k, x), x.asyncNeeded = !1);
          } else
            w[E].call(H, k, x);
        }
        if (!H._isFateSealed()) {
          if (x.asyncNeeded) {
            var q = a();
            q !== null && (x.fn = o.domainBind(q, x.fn));
          }
          H._setAsyncGuaranteed(), H._setOnCancel(x);
        }
        return H;
      }
      for (var $ = arguments.length, B = new Array($), P = 0; P < $; ++P)
        B[P] = arguments[P];
      v && B.pop();
      var H = new t(B).promise();
      return v !== void 0 ? H.spread(v) : H;
    };
  }), $c;
}
var Pc, Lf;
function Ww() {
  return Lf || (Lf = 1, Pc = function(e, t, n, r, i, a) {
    var o = e._getDomain, c = ye(), u = c.tryCatch, s = c.errorObj, d = e._async;
    function g(p, b, m, y) {
      this.constructor$(p), this._promise._captureStackTrace();
      var h = o();
      this._callback = h === null ? b : c.domainBind(h, b), this._preservedValues = y === i ? new Array(this.length()) : null, this._limit = m, this._inFlight = 0, this._queue = [], d.invoke(this._asyncInit, this, void 0);
    }
    c.inherits(g, t), g.prototype._asyncInit = function() {
      this._init$(void 0, -2);
    }, g.prototype._init = function() {
    }, g.prototype._promiseFulfilled = function(p, b) {
      var m = this._values, y = this.length(), h = this._preservedValues, l = this._limit;
      if (b < 0) {
        if (b = b * -1 - 1, m[b] = p, l >= 1 && (this._inFlight--, this._drainQueue(), this._isResolved()))
          return !0;
      } else {
        if (l >= 1 && this._inFlight >= l)
          return m[b] = p, this._queue.push(b), !1;
        h !== null && (h[b] = p);
        var v = this._promise, D = this._callback, x = v._boundValue();
        v._pushContext();
        var w = u(D).call(x, p, b, y), E = v._popContext();
        if (a.checkForgottenReturns(
          w,
          E,
          h !== null ? "Promise.filter" : "Promise.map",
          v
        ), w === s)
          return this._reject(w.e), !0;
        var k = r(w, this._promise);
        if (k instanceof e) {
          k = k._target();
          var W = k._bitField;
          if (W & 50397184)
            if (W & 33554432)
              w = k._value();
            else return W & 16777216 ? (this._reject(k._reason()), !0) : (this._cancel(), !0);
          else return l >= 1 && this._inFlight++, m[b] = k, k._proxy(this, (b + 1) * -1), !1;
        }
        m[b] = w;
      }
      var q = ++this._totalResolved;
      return q >= y ? (h !== null ? this._filter(m, h) : this._resolve(m), !0) : !1;
    }, g.prototype._drainQueue = function() {
      for (var p = this._queue, b = this._limit, m = this._values; p.length > 0 && this._inFlight < b; ) {
        if (this._isResolved()) return;
        var y = p.pop();
        this._promiseFulfilled(m[y], y);
      }
    }, g.prototype._filter = function(p, b) {
      for (var m = b.length, y = new Array(m), h = 0, l = 0; l < m; ++l)
        p[l] && (y[h++] = b[l]);
      y.length = h, this._resolve(y);
    }, g.prototype.preservedValues = function() {
      return this._preservedValues;
    };
    function f(p, b, m, y) {
      if (typeof b != "function")
        return n("expecting a function but got " + c.classString(b));
      var h = 0;
      if (m !== void 0)
        if (typeof m == "object" && m !== null) {
          if (typeof m.concurrency != "number")
            return e.reject(
              new TypeError("'concurrency' must be a number but it is " + c.classString(m.concurrency))
            );
          h = m.concurrency;
        } else
          return e.reject(new TypeError(
            "options argument must be an object but it is " + c.classString(m)
          ));
      return h = typeof h == "number" && isFinite(h) && h >= 1 ? h : 0, new g(p, b, h, y).promise();
    }
    e.prototype.map = function(p, b) {
      return f(this, p, b, null);
    }, e.map = function(p, b, m, y) {
      return f(p, b, m, y);
    };
  }), Pc;
}
var zc, Mf;
function Nw() {
  if (Mf) return zc;
  Mf = 1;
  var e = Object.create;
  if (e) {
    var t = e(null), n = e(null);
    t[" size"] = n[" size"] = 0;
  }
  return zc = function(r) {
    var i = ye(), a = i.canEvaluate, o = i.isIdentifier, c, u;
    {
      var s = function(y) {
        return new Function("ensureMethod", `                                    
	        return function(obj) {                                               
	            'use strict'                                                     
	            var len = this.length;                                           
	            ensureMethod(obj, 'methodName');                                 
	            switch(len) {                                                    
	                case 1: return obj.methodName(this[0]);                      
	                case 2: return obj.methodName(this[0], this[1]);             
	                case 3: return obj.methodName(this[0], this[1], this[2]);    
	                case 0: return obj.methodName();                             
	                default:                                                     
	                    return obj.methodName.apply(obj, this);                  
	            }                                                                
	        };                                                                   
	        `.replace(/methodName/g, y))(f);
      }, d = function(y) {
        return new Function("obj", `                                             
	        'use strict';                                                        
	        return obj.propertyName;                                             
	        `.replace("propertyName", y));
      }, g = function(y, h, l) {
        var v = l[y];
        if (typeof v != "function") {
          if (!o(y))
            return null;
          if (v = h(y), l[y] = v, l[" size"]++, l[" size"] > 512) {
            for (var D = Object.keys(l), x = 0; x < 256; ++x) delete l[D[x]];
            l[" size"] = D.length - 256;
          }
        }
        return v;
      };
      c = function(y) {
        return g(y, s, t);
      }, u = function(y) {
        return g(y, d, n);
      };
    }
    function f(y, h) {
      var l;
      if (y != null && (l = y[h]), typeof l != "function") {
        var v = "Object " + i.classString(y) + " has no method '" + i.toString(h) + "'";
        throw new r.TypeError(v);
      }
      return l;
    }
    function p(y) {
      var h = this.pop(), l = f(y, h);
      return l.apply(y, this);
    }
    r.prototype.call = function(y) {
      for (var h = arguments.length, l = new Array(Math.max(h - 1, 0)), v = 1; v < h; ++v)
        l[v - 1] = arguments[v];
      if (a) {
        var D = c(y);
        if (D !== null)
          return this._then(
            D,
            void 0,
            void 0,
            l,
            void 0
          );
      }
      return l.push(y), this._then(p, void 0, void 0, l, void 0);
    };
    function b(y) {
      return y[this];
    }
    function m(y) {
      var h = +this;
      return h < 0 && (h = Math.max(0, h + y.length)), y[h];
    }
    r.prototype.get = function(y) {
      var h = typeof y == "number", l;
      if (h)
        l = m;
      else if (a) {
        var v = u(y);
        l = v !== null ? v : b;
      } else
        l = b;
      return this._then(l, void 0, void 0, y, void 0);
    };
  }, zc;
}
var qc, $f;
function Lw() {
  return $f || ($f = 1, qc = function(e, t, n, r, i, a) {
    var o = ye(), c = Fn().TypeError, u = ye().inherits, s = o.errorObj, d = o.tryCatch, g = {};
    function f(v) {
      setTimeout(function() {
        throw v;
      }, 0);
    }
    function p(v) {
      var D = n(v);
      return D !== v && typeof v._isDisposable == "function" && typeof v._getDisposer == "function" && v._isDisposable() && D._setDisposable(v._getDisposer()), D;
    }
    function b(v, D) {
      var x = 0, w = v.length, E = new e(i);
      function k() {
        if (x >= w) return E._fulfill();
        var W = p(v[x++]);
        if (W instanceof e && W._isDisposable()) {
          try {
            W = n(
              W._getDisposer().tryDispose(D),
              v.promise
            );
          } catch (q) {
            return f(q);
          }
          if (W instanceof e)
            return W._then(
              k,
              f,
              null,
              null,
              null
            );
        }
        k();
      }
      return k(), E;
    }
    function m(v, D, x) {
      this._data = v, this._promise = D, this._context = x;
    }
    m.prototype.data = function() {
      return this._data;
    }, m.prototype.promise = function() {
      return this._promise;
    }, m.prototype.resource = function() {
      return this.promise().isFulfilled() ? this.promise().value() : g;
    }, m.prototype.tryDispose = function(v) {
      var D = this.resource(), x = this._context;
      x !== void 0 && x._pushContext();
      var w = D !== g ? this.doDispose(D, v) : null;
      return x !== void 0 && x._popContext(), this._promise._unsetDisposable(), this._data = null, w;
    }, m.isDisposer = function(v) {
      return v != null && typeof v.resource == "function" && typeof v.tryDispose == "function";
    };
    function y(v, D, x) {
      this.constructor$(v, D, x);
    }
    u(y, m), y.prototype.doDispose = function(v, D) {
      var x = this.data();
      return x.call(v, v, D);
    };
    function h(v) {
      return m.isDisposer(v) ? (this.resources[this.index]._setDisposable(v), v.promise()) : v;
    }
    function l(v) {
      this.length = v, this.promise = null, this[v - 1] = null;
    }
    l.prototype._resultCancelled = function() {
      for (var v = this.length, D = 0; D < v; ++D) {
        var x = this[D];
        x instanceof e && x.cancel();
      }
    }, e.using = function() {
      var v = arguments.length;
      if (v < 2) return t(
        "you must pass at least 2 arguments to Promise.using"
      );
      var D = arguments[v - 1];
      if (typeof D != "function")
        return t("expecting a function but got " + o.classString(D));
      var x, w = !0;
      v === 2 && Array.isArray(arguments[0]) ? (x = arguments[0], v = x.length, w = !1) : (x = arguments, v--);
      for (var E = new l(v), k = 0; k < v; ++k) {
        var W = x[k];
        if (m.isDisposer(W)) {
          var q = W;
          W = W.promise(), W._setDisposable(q);
        } else {
          var $ = n(W);
          $ instanceof e && (W = $._then(h, null, null, {
            resources: E,
            index: k
          }, void 0));
        }
        E[k] = W;
      }
      for (var B = new Array(E.length), k = 0; k < B.length; ++k)
        B[k] = e.resolve(E[k]).reflect();
      var P = e.all(B).then(function(Q) {
        for (var A = 0; A < Q.length; ++A) {
          var T = Q[A];
          if (T.isRejected())
            return s.e = T.error(), s;
          if (!T.isFulfilled()) {
            P.cancel();
            return;
          }
          Q[A] = T.value();
        }
        H._pushContext(), D = d(D);
        var _ = w ? D.apply(void 0, Q) : D(Q), F = H._popContext();
        return a.checkForgottenReturns(
          _,
          F,
          "Promise.using",
          H
        ), _;
      }), H = P.lastly(function() {
        var Q = new e.PromiseInspection(P);
        return b(E, Q);
      });
      return E.promise = H, H._setOnCancel(E), H;
    }, e.prototype._setDisposable = function(v) {
      this._bitField = this._bitField | 131072, this._disposer = v;
    }, e.prototype._isDisposable = function() {
      return (this._bitField & 131072) > 0;
    }, e.prototype._getDisposer = function() {
      return this._disposer;
    }, e.prototype._unsetDisposable = function() {
      this._bitField = this._bitField & -131073, this._disposer = void 0;
    }, e.prototype.disposer = function(v) {
      if (typeof v == "function")
        return new y(v, this, r());
      throw new c();
    };
  }), qc;
}
var jc, Pf;
function Mw() {
  return Pf || (Pf = 1, jc = function(e, t, n) {
    var r = ye(), i = e.TimeoutError;
    function a(g) {
      this.handle = g;
    }
    a.prototype._resultCancelled = function() {
      clearTimeout(this.handle);
    };
    var o = function(g) {
      return c(+this).thenReturn(g);
    }, c = e.delay = function(g, f) {
      var p, b;
      return f !== void 0 ? (p = e.resolve(f)._then(o, null, null, g, void 0), n.cancellation() && f instanceof e && p._setOnCancel(f)) : (p = new e(t), b = setTimeout(function() {
        p._fulfill();
      }, +g), n.cancellation() && p._setOnCancel(new a(b)), p._captureStackTrace()), p._setAsyncGuaranteed(), p;
    };
    e.prototype.delay = function(g) {
      return c(g, this);
    };
    var u = function(g, f, p) {
      var b;
      typeof f != "string" ? f instanceof Error ? b = f : b = new i("operation timed out") : b = new i(f), r.markAsOriginatingFromRejection(b), g._attachExtraTrace(b), g._reject(b), p != null && p.cancel();
    };
    function s(g) {
      return clearTimeout(this.handle), g;
    }
    function d(g) {
      throw clearTimeout(this.handle), g;
    }
    e.prototype.timeout = function(g, f) {
      g = +g;
      var p, b, m = new a(setTimeout(function() {
        p.isPending() && u(p, f, b);
      }, g));
      return n.cancellation() ? (b = this.then(), p = b._then(
        s,
        d,
        void 0,
        m,
        void 0
      ), p._setOnCancel(m)) : p = this._then(
        s,
        d,
        void 0,
        m,
        void 0
      ), p;
    };
  }), jc;
}
var Zc, zf;
function $w() {
  return zf || (zf = 1, Zc = function(e, t, n, r, i, a) {
    var o = Fn(), c = o.TypeError, u = ye(), s = u.errorObj, d = u.tryCatch, g = [];
    function f(b, m, y) {
      for (var h = 0; h < m.length; ++h) {
        y._pushContext();
        var l = d(m[h])(b);
        if (y._popContext(), l === s) {
          y._pushContext();
          var v = e.reject(s.e);
          return y._popContext(), v;
        }
        var D = r(l, y);
        if (D instanceof e) return D;
      }
      return null;
    }
    function p(b, m, y, h) {
      if (a.cancellation()) {
        var l = new e(n), v = this._finallyPromise = new e(n);
        this._promise = l.lastly(function() {
          return v;
        }), l._captureStackTrace(), l._setOnCancel(this);
      } else {
        var D = this._promise = new e(n);
        D._captureStackTrace();
      }
      this._stack = h, this._generatorFunction = b, this._receiver = m, this._generator = void 0, this._yieldHandlers = typeof y == "function" ? [y].concat(g) : g, this._yieldedPromise = null, this._cancellationPhase = !1;
    }
    u.inherits(p, i), p.prototype._isResolved = function() {
      return this._promise === null;
    }, p.prototype._cleanup = function() {
      this._promise = this._generator = null, a.cancellation() && this._finallyPromise !== null && (this._finallyPromise._fulfill(), this._finallyPromise = null);
    }, p.prototype._promiseCancelled = function() {
      if (!this._isResolved()) {
        var b = typeof this._generator.return < "u", m;
        if (b)
          this._promise._pushContext(), m = d(this._generator.return).call(
            this._generator,
            void 0
          ), this._promise._popContext();
        else {
          var y = new e.CancellationError(
            "generator .return() sentinel"
          );
          e.coroutine.returnSentinel = y, this._promise._attachExtraTrace(y), this._promise._pushContext(), m = d(this._generator.throw).call(
            this._generator,
            y
          ), this._promise._popContext();
        }
        this._cancellationPhase = !0, this._yieldedPromise = null, this._continue(m);
      }
    }, p.prototype._promiseFulfilled = function(b) {
      this._yieldedPromise = null, this._promise._pushContext();
      var m = d(this._generator.next).call(this._generator, b);
      this._promise._popContext(), this._continue(m);
    }, p.prototype._promiseRejected = function(b) {
      this._yieldedPromise = null, this._promise._attachExtraTrace(b), this._promise._pushContext();
      var m = d(this._generator.throw).call(this._generator, b);
      this._promise._popContext(), this._continue(m);
    }, p.prototype._resultCancelled = function() {
      if (this._yieldedPromise instanceof e) {
        var b = this._yieldedPromise;
        this._yieldedPromise = null, b.cancel();
      }
    }, p.prototype.promise = function() {
      return this._promise;
    }, p.prototype._run = function() {
      this._generator = this._generatorFunction.call(this._receiver), this._receiver = this._generatorFunction = void 0, this._promiseFulfilled(void 0);
    }, p.prototype._continue = function(b) {
      var m = this._promise;
      if (b === s)
        return this._cleanup(), this._cancellationPhase ? m.cancel() : m._rejectCallback(b.e, !1);
      var y = b.value;
      if (b.done === !0)
        return this._cleanup(), this._cancellationPhase ? m.cancel() : m._resolveCallback(y);
      var h = r(y, this._promise);
      if (!(h instanceof e) && (h = f(
        h,
        this._yieldHandlers,
        this._promise
      ), h === null)) {
        this._promiseRejected(
          new c(
            `A value %s was yielded that could not be treated as a promise

    See http://goo.gl/MqrFmX

`.replace("%s", y) + `From coroutine:
` + this._stack.split(`
`).slice(1, -7).join(`
`)
          )
        );
        return;
      }
      h = h._target();
      var l = h._bitField;
      l & 50397184 ? l & 33554432 ? e._async.invoke(
        this._promiseFulfilled,
        this,
        h._value()
      ) : l & 16777216 ? e._async.invoke(
        this._promiseRejected,
        this,
        h._reason()
      ) : this._promiseCancelled() : (this._yieldedPromise = h, h._proxy(this, null));
    }, e.coroutine = function(b, m) {
      if (typeof b != "function")
        throw new c(`generatorFunction must be a function

    See http://goo.gl/MqrFmX
`);
      var y = Object(m).yieldHandler, h = p, l = new Error().stack;
      return function() {
        var v = b.apply(this, arguments), D = new h(
          void 0,
          void 0,
          y,
          l
        ), x = D.promise();
        return D._generator = v, D._promiseFulfilled(void 0), x;
      };
    }, e.coroutine.addYieldHandler = function(b) {
      if (typeof b != "function")
        throw new c("expecting a function but got " + u.classString(b));
      g.push(b);
    }, e.spawn = function(b) {
      if (a.deprecated("Promise.spawn()", "Promise.coroutine()"), typeof b != "function")
        return t(`generatorFunction must be a function

    See http://goo.gl/MqrFmX
`);
      var m = new p(b, this), y = m.promise();
      return m._run(e.spawn), y;
    };
  }), Zc;
}
var Xc, qf;
function Pw() {
  return qf || (qf = 1, Xc = function(e) {
    var t = ye(), n = e._async, r = t.tryCatch, i = t.errorObj;
    function a(u, s) {
      var d = this;
      if (!t.isArray(u)) return o.call(d, u, s);
      var g = r(s).apply(d._boundValue(), [null].concat(u));
      g === i && n.throwLater(g.e);
    }
    function o(u, s) {
      var d = this, g = d._boundValue(), f = u === void 0 ? r(s).call(g, null) : r(s).call(g, null, u);
      f === i && n.throwLater(f.e);
    }
    function c(u, s) {
      var d = this;
      if (!u) {
        var g = new Error(u + "");
        g.cause = u, u = g;
      }
      var f = r(s).call(d._boundValue(), u);
      f === i && n.throwLater(f.e);
    }
    e.prototype.asCallback = e.prototype.nodeify = function(u, s) {
      if (typeof u == "function") {
        var d = o;
        s !== void 0 && Object(s).spread && (d = a), this._then(
          d,
          c,
          void 0,
          this,
          u
        );
      }
      return this;
    };
  }), Xc;
}
var Vc, jf;
function zw() {
  return jf || (jf = 1, Vc = function(e, t) {
    var n = {}, r = ye(), i = Z2(), a = r.withAppended, o = r.maybeWrapAsError, c = r.canEvaluate, u = Fn().TypeError, s = "Async", d = { __isPromisified__: !0 }, g = [
      "arity",
      "length",
      "name",
      "arguments",
      "caller",
      "callee",
      "prototype",
      "__isPromisified__"
    ], f = new RegExp("^(?:" + g.join("|") + ")$"), p = function(P) {
      return r.isIdentifier(P) && P.charAt(0) !== "_" && P !== "constructor";
    };
    function b(P) {
      return !f.test(P);
    }
    function m(P) {
      try {
        return P.__isPromisified__ === !0;
      } catch {
        return !1;
      }
    }
    function y(P, H, Q) {
      var A = r.getDataPropertyOrDefault(
        P,
        H + Q,
        d
      );
      return A ? m(A) : !1;
    }
    function h(P, H, Q) {
      for (var A = 0; A < P.length; A += 2) {
        var T = P[A];
        if (Q.test(T)) {
          for (var _ = T.replace(Q, ""), F = 0; F < P.length; F += 2)
            if (P[F] === _)
              throw new u(`Cannot promisify an API that has normal methods with '%s'-suffix

    See http://goo.gl/MqrFmX
`.replace("%s", H));
        }
      }
    }
    function l(P, H, Q, A) {
      for (var T = r.inheritedDataKeys(P), _ = [], F = 0; F < T.length; ++F) {
        var O = T[F], L = P[O], S = A === p ? !0 : p(O);
        typeof L == "function" && !m(L) && !y(P, O, H) && A(O, L, P, S) && _.push(O, L);
      }
      return h(_, H, Q), _;
    }
    var v = function(P) {
      return P.replace(/([$])/, "\\$");
    }, D;
    {
      var x = function(P) {
        for (var H = [P], Q = Math.max(0, P - 1 - 3), A = P - 1; A >= Q; --A)
          H.push(A);
        for (var A = P + 1; A <= 3; ++A)
          H.push(A);
        return H;
      }, w = function(P) {
        return r.filledRange(P, "_arg", "");
      }, E = function(P) {
        return r.filledRange(
          Math.max(P, 3),
          "_arg",
          ""
        );
      }, k = function(P) {
        return typeof P.length == "number" ? Math.max(Math.min(P.length, 1024), 0) : 0;
      };
      D = function(P, H, Q, A, T, _) {
        var F = Math.max(0, k(A) - 1), O = x(F), L = typeof P == "string" || H === n;
        function S(J) {
          var U = w(J).join(", "), C = J > 0 ? ", " : "", Z;
          return L ? Z = `ret = callback.call(this, {{args}}, nodeback); break;
` : Z = H === void 0 ? `ret = callback({{args}}, nodeback); break;
` : `ret = callback.call(receiver, {{args}}, nodeback); break;
`, Z.replace("{{args}}", U).replace(", ", C);
        }
        function z() {
          for (var J = "", U = 0; U < O.length; ++U)
            J += "case " + O[U] + ":" + S(O[U]);
          return J += `                                                             
	        default:                                                             
	            var args = new Array(len + 1);                                   
	            var i = 0;                                                       
	            for (var i = 0; i < len; ++i) {                                  
	               args[i] = arguments[i];                                       
	            }                                                                
	            args[i] = nodeback;                                              
	            [CodeForCall]                                                    
	            break;                                                           
	        `.replace("[CodeForCall]", L ? `ret = callback.apply(this, args);
` : `ret = callback.apply(receiver, args);
`), J;
        }
        var ee = typeof P == "string" ? "this != null ? this['" + P + "'] : fn" : "fn", te = `'use strict';                                                
	        var ret = function (Parameters) {                                    
	            'use strict';                                                    
	            var len = arguments.length;                                      
	            var promise = new Promise(INTERNAL);                             
	            promise._captureStackTrace();                                    
	            var nodeback = nodebackForPromise(promise, ` + _ + `);   
	            var ret;                                                         
	            var callback = tryCatch([GetFunctionCode]);                      
	            switch(len) {                                                    
	                [CodeForSwitchCase]                                          
	            }                                                                
	            if (ret === errorObj) {                                          
	                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);
	            }                                                                
	            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     
	            return promise;                                                  
	        };                                                                   
	        notEnumerableProp(ret, '__isPromisified__', true);                   
	        return ret;                                                          
	    `.replace("[CodeForSwitchCase]", z()).replace("[GetFunctionCode]", ee);
        return te = te.replace("Parameters", E(F)), new Function(
          "Promise",
          "fn",
          "receiver",
          "withAppended",
          "maybeWrapAsError",
          "nodebackForPromise",
          "tryCatch",
          "errorObj",
          "notEnumerableProp",
          "INTERNAL",
          te
        )(
          e,
          A,
          H,
          a,
          o,
          i,
          r.tryCatch,
          r.errorObj,
          r.notEnumerableProp,
          t
        );
      };
    }
    function W(P, H, Q, A, T, _) {
      var F = /* @__PURE__ */ function() {
        return this;
      }(), O = P;
      typeof O == "string" && (P = A);
      function L() {
        var S = H;
        H === n && (S = this);
        var z = new e(t);
        z._captureStackTrace();
        var ee = typeof O == "string" && this !== F ? this[O] : P, te = i(z, _);
        try {
          ee.apply(S, a(arguments, te));
        } catch (J) {
          z._rejectCallback(o(J), !0, !0);
        }
        return z._isFateSealed() || z._setAsyncGuaranteed(), z;
      }
      return r.notEnumerableProp(L, "__isPromisified__", !0), L;
    }
    var q = c ? D : W;
    function $(P, H, Q, A, T) {
      for (var _ = new RegExp(v(H) + "$"), F = l(P, H, _, Q), O = 0, L = F.length; O < L; O += 2) {
        var S = F[O], z = F[O + 1], ee = S + H;
        if (A === q)
          P[ee] = q(S, n, S, z, H, T);
        else {
          var te = A(z, function() {
            return q(
              S,
              n,
              S,
              z,
              H,
              T
            );
          });
          r.notEnumerableProp(te, "__isPromisified__", !0), P[ee] = te;
        }
      }
      return r.toFastProperties(P), P;
    }
    function B(P, H, Q) {
      return q(
        P,
        H,
        void 0,
        P,
        null,
        Q
      );
    }
    e.promisify = function(P, H) {
      if (typeof P != "function")
        throw new u("expecting a function but got " + r.classString(P));
      if (m(P))
        return P;
      H = Object(H);
      var Q = H.context === void 0 ? n : H.context, A = !!H.multiArgs, T = B(P, Q, A);
      return r.copyDescriptors(P, T, b), T;
    }, e.promisifyAll = function(P, H) {
      if (typeof P != "function" && typeof P != "object")
        throw new u(`the target of promisifyAll must be an object or a function

    See http://goo.gl/MqrFmX
`);
      H = Object(H);
      var Q = !!H.multiArgs, A = H.suffix;
      typeof A != "string" && (A = s);
      var T = H.filter;
      typeof T != "function" && (T = p);
      var _ = H.promisifier;
      if (typeof _ != "function" && (_ = q), !r.isIdentifier(A))
        throw new RangeError(`suffix must be a valid identifier

    See http://goo.gl/MqrFmX
`);
      for (var F = r.inheritedDataKeys(P), O = 0; O < F.length; ++O) {
        var L = P[F[O]];
        F[O] !== "constructor" && r.isClass(L) && ($(
          L.prototype,
          A,
          T,
          _,
          Q
        ), $(L, A, T, _, Q));
      }
      return $(P, A, T, _, Q);
    };
  }), Vc;
}
var Hc, Zf;
function qw() {
  return Zf || (Zf = 1, Hc = function(e, t, n, r) {
    var i = ye(), a = i.isObject, o = qr(), c;
    typeof Map == "function" && (c = Map);
    var u = /* @__PURE__ */ function() {
      var f = 0, p = 0;
      function b(m, y) {
        this[f] = m, this[f + p] = y, f++;
      }
      return function(y) {
        p = y.size, f = 0;
        var h = new Array(y.size * 2);
        return y.forEach(b, h), h;
      };
    }(), s = function(f) {
      for (var p = new c(), b = f.length / 2 | 0, m = 0; m < b; ++m) {
        var y = f[b + m], h = f[m];
        p.set(y, h);
      }
      return p;
    };
    function d(f) {
      var p = !1, b;
      if (c !== void 0 && f instanceof c)
        b = u(f), p = !0;
      else {
        var m = o.keys(f), y = m.length;
        b = new Array(y * 2);
        for (var h = 0; h < y; ++h) {
          var l = m[h];
          b[h] = f[l], b[h + y] = l;
        }
      }
      this.constructor$(b), this._isMap = p, this._init$(void 0, -3);
    }
    i.inherits(d, t), d.prototype._init = function() {
    }, d.prototype._promiseFulfilled = function(f, p) {
      this._values[p] = f;
      var b = ++this._totalResolved;
      if (b >= this._length) {
        var m;
        if (this._isMap)
          m = s(this._values);
        else {
          m = {};
          for (var y = this.length(), h = 0, l = this.length(); h < l; ++h)
            m[this._values[h + y]] = this._values[h];
        }
        return this._resolve(m), !0;
      }
      return !1;
    }, d.prototype.shouldCopyValues = function() {
      return !1;
    }, d.prototype.getActualLength = function(f) {
      return f >> 1;
    };
    function g(f) {
      var p, b = n(f);
      if (a(b))
        b instanceof e ? p = b._then(
          e.props,
          void 0,
          void 0,
          void 0,
          void 0
        ) : p = new d(b).promise();
      else return r(`cannot await properties of a non-object

    See http://goo.gl/MqrFmX
`);
      return b instanceof e && p._propagateFrom(b, 2), p;
    }
    e.prototype.props = function() {
      return g(this);
    }, e.props = function(f) {
      return g(f);
    };
  }), Hc;
}
var Gc, Xf;
function jw() {
  return Xf || (Xf = 1, Gc = function(e, t, n, r) {
    var i = ye(), a = function(c) {
      return c.then(function(u) {
        return o(u, c);
      });
    };
    function o(c, u) {
      var s = n(c);
      if (s instanceof e)
        return a(s);
      if (c = i.asArray(c), c === null)
        return r("expecting an array or an iterable object but got " + i.classString(c));
      var d = new e(t);
      u !== void 0 && d._propagateFrom(u, 3);
      for (var g = d._fulfill, f = d._reject, p = 0, b = c.length; p < b; ++p) {
        var m = c[p];
        m === void 0 && !(p in c) || e.cast(m)._then(g, f, void 0, d, null);
      }
      return d;
    }
    e.race = function(c) {
      return o(c, void 0);
    }, e.prototype.race = function() {
      return o(this, void 0);
    };
  }), Gc;
}
var Yc, Vf;
function Zw() {
  return Vf || (Vf = 1, Yc = function(e, t, n, r, i, a) {
    var o = e._getDomain, c = ye(), u = c.tryCatch;
    function s(b, m, y, h) {
      this.constructor$(b);
      var l = o();
      this._fn = l === null ? m : c.domainBind(l, m), y !== void 0 && (y = e.resolve(y), y._attachCancellationCallback(this)), this._initialValue = y, this._currentCancellable = null, h === i ? this._eachValues = Array(this._length) : h === 0 ? this._eachValues = null : this._eachValues = void 0, this._promise._captureStackTrace(), this._init$(void 0, -5);
    }
    c.inherits(s, t), s.prototype._gotAccum = function(b) {
      this._eachValues !== void 0 && this._eachValues !== null && b !== i && this._eachValues.push(b);
    }, s.prototype._eachComplete = function(b) {
      return this._eachValues !== null && this._eachValues.push(b), this._eachValues;
    }, s.prototype._init = function() {
    }, s.prototype._resolveEmptyArray = function() {
      this._resolve(this._eachValues !== void 0 ? this._eachValues : this._initialValue);
    }, s.prototype.shouldCopyValues = function() {
      return !1;
    }, s.prototype._resolve = function(b) {
      this._promise._resolveCallback(b), this._values = null;
    }, s.prototype._resultCancelled = function(b) {
      if (b === this._initialValue) return this._cancel();
      this._isResolved() || (this._resultCancelled$(), this._currentCancellable instanceof e && this._currentCancellable.cancel(), this._initialValue instanceof e && this._initialValue.cancel());
    }, s.prototype._iterate = function(b) {
      this._values = b;
      var m, y, h = b.length;
      if (this._initialValue !== void 0 ? (m = this._initialValue, y = 0) : (m = e.resolve(b[0]), y = 1), this._currentCancellable = m, !m.isRejected())
        for (; y < h; ++y) {
          var l = {
            accum: null,
            value: b[y],
            index: y,
            length: h,
            array: this
          };
          m = m._then(f, void 0, void 0, l, void 0);
        }
      this._eachValues !== void 0 && (m = m._then(this._eachComplete, void 0, void 0, this, void 0)), m._then(d, d, void 0, m, this);
    }, e.prototype.reduce = function(b, m) {
      return g(this, b, m, null);
    }, e.reduce = function(b, m, y, h) {
      return g(b, m, y, h);
    };
    function d(b, m) {
      this.isFulfilled() ? m._resolve(b) : m._reject(b);
    }
    function g(b, m, y, h) {
      if (typeof m != "function")
        return n("expecting a function but got " + c.classString(m));
      var l = new s(b, m, y, h);
      return l.promise();
    }
    function f(b) {
      this.accum = b, this.array._gotAccum(b);
      var m = r(this.value, this.array._promise);
      return m instanceof e ? (this.array._currentCancellable = m, m._then(p, void 0, void 0, this, void 0)) : p.call(this, m);
    }
    function p(b) {
      var m = this.array, y = m._promise, h = u(m._fn);
      y._pushContext();
      var l;
      m._eachValues !== void 0 ? l = h.call(y._boundValue(), b, this.index, this.length) : l = h.call(
        y._boundValue(),
        this.accum,
        b,
        this.index,
        this.length
      ), l instanceof e && (m._currentCancellable = l);
      var v = y._popContext();
      return a.checkForgottenReturns(
        l,
        v,
        m._eachValues !== void 0 ? "Promise.each" : "Promise.reduce",
        y
      ), l;
    }
  }), Yc;
}
var Kc, Hf;
function Xw() {
  return Hf || (Hf = 1, Kc = function(e, t, n) {
    var r = e.PromiseInspection, i = ye();
    function a(o) {
      this.constructor$(o);
    }
    i.inherits(a, t), a.prototype._promiseResolved = function(o, c) {
      this._values[o] = c;
      var u = ++this._totalResolved;
      return u >= this._length ? (this._resolve(this._values), !0) : !1;
    }, a.prototype._promiseFulfilled = function(o, c) {
      var u = new r();
      return u._bitField = 33554432, u._settledValueField = o, this._promiseResolved(c, u);
    }, a.prototype._promiseRejected = function(o, c) {
      var u = new r();
      return u._bitField = 16777216, u._settledValueField = o, this._promiseResolved(c, u);
    }, e.settle = function(o) {
      return n.deprecated(".settle()", ".reflect()"), new a(o).promise();
    }, e.prototype.settle = function() {
      return e.settle(this);
    };
  }), Kc;
}
var Jc, Gf;
function Vw() {
  return Gf || (Gf = 1, Jc = function(e, t, n) {
    var r = ye(), i = Fn().RangeError, a = Fn().AggregateError, o = r.isArray, c = {};
    function u(d) {
      this.constructor$(d), this._howMany = 0, this._unwrap = !1, this._initialized = !1;
    }
    r.inherits(u, t), u.prototype._init = function() {
      if (this._initialized) {
        if (this._howMany === 0) {
          this._resolve([]);
          return;
        }
        this._init$(void 0, -5);
        var d = o(this._values);
        !this._isResolved() && d && this._howMany > this._canPossiblyFulfill() && this._reject(this._getRangeError(this.length()));
      }
    }, u.prototype.init = function() {
      this._initialized = !0, this._init();
    }, u.prototype.setUnwrap = function() {
      this._unwrap = !0;
    }, u.prototype.howMany = function() {
      return this._howMany;
    }, u.prototype.setHowMany = function(d) {
      this._howMany = d;
    }, u.prototype._promiseFulfilled = function(d) {
      return this._addFulfilled(d), this._fulfilled() === this.howMany() ? (this._values.length = this.howMany(), this.howMany() === 1 && this._unwrap ? this._resolve(this._values[0]) : this._resolve(this._values), !0) : !1;
    }, u.prototype._promiseRejected = function(d) {
      return this._addRejected(d), this._checkOutcome();
    }, u.prototype._promiseCancelled = function() {
      return this._values instanceof e || this._values == null ? this._cancel() : (this._addRejected(c), this._checkOutcome());
    }, u.prototype._checkOutcome = function() {
      if (this.howMany() > this._canPossiblyFulfill()) {
        for (var d = new a(), g = this.length(); g < this._values.length; ++g)
          this._values[g] !== c && d.push(this._values[g]);
        return d.length > 0 ? this._reject(d) : this._cancel(), !0;
      }
      return !1;
    }, u.prototype._fulfilled = function() {
      return this._totalResolved;
    }, u.prototype._rejected = function() {
      return this._values.length - this.length();
    }, u.prototype._addRejected = function(d) {
      this._values.push(d);
    }, u.prototype._addFulfilled = function(d) {
      this._values[this._totalResolved++] = d;
    }, u.prototype._canPossiblyFulfill = function() {
      return this.length() - this._rejected();
    }, u.prototype._getRangeError = function(d) {
      var g = "Input array must contain at least " + this._howMany + " items but contains only " + d + " items";
      return new i(g);
    }, u.prototype._resolveEmptyArray = function() {
      this._reject(this._getRangeError(0));
    };
    function s(d, g) {
      if ((g | 0) !== g || g < 0)
        return n(`expecting a positive integer

    See http://goo.gl/MqrFmX
`);
      var f = new u(d), p = f.promise();
      return f.setHowMany(g), f.init(), p;
    }
    e.some = function(d, g) {
      return s(d, g);
    }, e.prototype.some = function(d) {
      return s(this, d);
    }, e._SomePromiseArray = u;
  }), Jc;
}
var Qc, Yf;
function Hw() {
  return Yf || (Yf = 1, Qc = function(e, t) {
    var n = e.map;
    e.prototype.filter = function(r, i) {
      return n(this, r, i, t);
    }, e.filter = function(r, i, a) {
      return n(r, i, a, t);
    };
  }), Qc;
}
var es, Kf;
function Gw() {
  return Kf || (Kf = 1, es = function(e, t) {
    var n = e.reduce, r = e.all;
    function i() {
      return r(this);
    }
    function a(o, c) {
      return n(o, c, t, t);
    }
    e.prototype.each = function(o) {
      return n(this, o, t, 0)._then(i, void 0, void 0, this, void 0);
    }, e.prototype.mapSeries = function(o) {
      return n(this, o, t, t);
    }, e.each = function(o, c) {
      return n(o, c, t, 0)._then(i, void 0, void 0, o, void 0);
    }, e.mapSeries = a;
  }), es;
}
var ts, Jf;
function Yw() {
  return Jf || (Jf = 1, ts = function(e) {
    var t = e._SomePromiseArray;
    function n(r) {
      var i = new t(r), a = i.promise();
      return i.setHowMany(1), i.setUnwrap(), i.init(), a;
    }
    e.any = function(r) {
      return n(r);
    }, e.prototype.any = function() {
      return n(this);
    };
  }), ts;
}
(function(e) {
  e.exports = function() {
    var t = function() {
      return new f(`circular promise resolution chain

    See http://goo.gl/MqrFmX
`);
    }, n = function() {
      return new B.PromiseInspection(this._target());
    }, r = function(A) {
      return B.reject(new f(A));
    };
    function i() {
    }
    var a = {}, o = ye(), c;
    o.isNode ? c = function() {
      var A = process.domain;
      return A === void 0 && (A = null), A;
    } : c = function() {
      return null;
    }, o.notEnumerableProp(B, "_getDomain", c);
    var u = qr(), s = ww(), d = new s();
    u.defineProperty(B, "_async", { value: d });
    var g = Fn(), f = B.TypeError = g.TypeError;
    B.RangeError = g.RangeError;
    var p = B.CancellationError = g.CancellationError;
    B.TimeoutError = g.TimeoutError, B.OperationalError = g.OperationalError, B.RejectionError = g.OperationalError, B.AggregateError = g.AggregateError;
    var b = function() {
    }, m = {}, y = {}, h = Tw()(B, b), l = Uw()(
      B,
      b,
      h,
      r,
      i
    ), v = Ew()(B), D = v.create, x = Aw()(B, v);
    x.CapturedTrace;
    var w = Cw()(B, h), E = Fw()(y), k = Z2(), W = o.errorObj, q = o.tryCatch;
    function $(A, T) {
      if (typeof T != "function")
        throw new f("expecting a function but got " + o.classString(T));
      if (A.constructor !== B)
        throw new f(`the promise constructor cannot be invoked directly

    See http://goo.gl/MqrFmX
`);
    }
    function B(A) {
      this._bitField = 0, this._fulfillmentHandler0 = void 0, this._rejectionHandler0 = void 0, this._promise0 = void 0, this._receiver0 = void 0, A !== b && ($(this, A), this._resolveFromExecutor(A)), this._promiseCreated(), this._fireEvent("promiseCreated", this);
    }
    B.prototype.toString = function() {
      return "[object Promise]";
    }, B.prototype.caught = B.prototype.catch = function(A) {
      var T = arguments.length;
      if (T > 1) {
        var _ = new Array(T - 1), F = 0, O;
        for (O = 0; O < T - 1; ++O) {
          var L = arguments[O];
          if (o.isObject(L))
            _[F++] = L;
          else
            return r("expecting an object but got A catch statement predicate " + o.classString(L));
        }
        return _.length = F, A = arguments[O], this.then(void 0, E(_, A, this));
      }
      return this.then(void 0, A);
    }, B.prototype.reflect = function() {
      return this._then(
        n,
        n,
        void 0,
        this,
        void 0
      );
    }, B.prototype.then = function(A, T) {
      if (x.warnings() && arguments.length > 0 && typeof A != "function" && typeof T != "function") {
        var _ = ".then() only accepts functions but was passed: " + o.classString(A);
        arguments.length > 1 && (_ += ", " + o.classString(T)), this._warn(_);
      }
      return this._then(A, T, void 0, void 0, void 0);
    }, B.prototype.done = function(A, T) {
      var _ = this._then(A, T, void 0, void 0, void 0);
      _._setIsFinal();
    }, B.prototype.spread = function(A) {
      return typeof A != "function" ? r("expecting a function but got " + o.classString(A)) : this.all()._then(A, void 0, void 0, m, void 0);
    }, B.prototype.toJSON = function() {
      var A = {
        isFulfilled: !1,
        isRejected: !1,
        fulfillmentValue: void 0,
        rejectionReason: void 0
      };
      return this.isFulfilled() ? (A.fulfillmentValue = this.value(), A.isFulfilled = !0) : this.isRejected() && (A.rejectionReason = this.reason(), A.isRejected = !0), A;
    }, B.prototype.all = function() {
      return arguments.length > 0 && this._warn(".all() was passed arguments but it does not take any"), new l(this).promise();
    }, B.prototype.error = function(A) {
      return this.caught(o.originatesFromRejection, A);
    }, B.getNewLibraryCopy = e.exports, B.is = function(A) {
      return A instanceof B;
    }, B.fromNode = B.fromCallback = function(A) {
      var T = new B(b);
      T._captureStackTrace();
      var _ = arguments.length > 1 ? !!Object(arguments[1]).multiArgs : !1, F = q(A)(k(T, _));
      return F === W && T._rejectCallback(F.e, !0), T._isFateSealed() || T._setAsyncGuaranteed(), T;
    }, B.all = function(A) {
      return new l(A).promise();
    }, B.cast = function(A) {
      var T = h(A);
      return T instanceof B || (T = new B(b), T._captureStackTrace(), T._setFulfilled(), T._rejectionHandler0 = A), T;
    }, B.resolve = B.fulfilled = B.cast, B.reject = B.rejected = function(A) {
      var T = new B(b);
      return T._captureStackTrace(), T._rejectCallback(A, !0), T;
    }, B.setScheduler = function(A) {
      if (typeof A != "function")
        throw new f("expecting a function but got " + o.classString(A));
      return d.setScheduler(A);
    }, B.prototype._then = function(A, T, _, F, O) {
      var L = O !== void 0, S = L ? O : new B(b), z = this._target(), ee = z._bitField;
      L || (S._propagateFrom(this, 3), S._captureStackTrace(), F === void 0 && this._bitField & 2097152 && (ee & 50397184 ? F = this._boundValue() : F = z === this ? void 0 : this._boundTo), this._fireEvent("promiseChained", this, S));
      var te = c();
      if (ee & 50397184) {
        var J, U, C = z._settlePromiseCtx;
        ee & 33554432 ? (U = z._rejectionHandler0, J = A) : ee & 16777216 ? (U = z._fulfillmentHandler0, J = T, z._unsetRejectionIsUnhandled()) : (C = z._settlePromiseLateCancellationObserver, U = new p("late cancellation observer"), z._attachExtraTrace(U), J = T), d.invoke(C, z, {
          handler: te === null ? J : typeof J == "function" && o.domainBind(te, J),
          promise: S,
          receiver: F,
          value: U
        });
      } else
        z._addCallbacks(A, T, S, F, te);
      return S;
    }, B.prototype._length = function() {
      return this._bitField & 65535;
    }, B.prototype._isFateSealed = function() {
      return (this._bitField & 117506048) !== 0;
    }, B.prototype._isFollowing = function() {
      return (this._bitField & 67108864) === 67108864;
    }, B.prototype._setLength = function(A) {
      this._bitField = this._bitField & -65536 | A & 65535;
    }, B.prototype._setFulfilled = function() {
      this._bitField = this._bitField | 33554432, this._fireEvent("promiseFulfilled", this);
    }, B.prototype._setRejected = function() {
      this._bitField = this._bitField | 16777216, this._fireEvent("promiseRejected", this);
    }, B.prototype._setFollowing = function() {
      this._bitField = this._bitField | 67108864, this._fireEvent("promiseResolved", this);
    }, B.prototype._setIsFinal = function() {
      this._bitField = this._bitField | 4194304;
    }, B.prototype._isFinal = function() {
      return (this._bitField & 4194304) > 0;
    }, B.prototype._unsetCancelled = function() {
      this._bitField = this._bitField & -65537;
    }, B.prototype._setCancelled = function() {
      this._bitField = this._bitField | 65536, this._fireEvent("promiseCancelled", this);
    }, B.prototype._setWillBeCancelled = function() {
      this._bitField = this._bitField | 8388608;
    }, B.prototype._setAsyncGuaranteed = function() {
      d.hasCustomScheduler() || (this._bitField = this._bitField | 134217728);
    }, B.prototype._receiverAt = function(A) {
      var T = A === 0 ? this._receiver0 : this[A * 4 - 4 + 3];
      if (T !== a)
        return T === void 0 && this._isBound() ? this._boundValue() : T;
    }, B.prototype._promiseAt = function(A) {
      return this[A * 4 - 4 + 2];
    }, B.prototype._fulfillmentHandlerAt = function(A) {
      return this[A * 4 - 4 + 0];
    }, B.prototype._rejectionHandlerAt = function(A) {
      return this[A * 4 - 4 + 1];
    }, B.prototype._boundValue = function() {
    }, B.prototype._migrateCallback0 = function(A) {
      A._bitField;
      var T = A._fulfillmentHandler0, _ = A._rejectionHandler0, F = A._promise0, O = A._receiverAt(0);
      O === void 0 && (O = a), this._addCallbacks(T, _, F, O, null);
    }, B.prototype._migrateCallbackAt = function(A, T) {
      var _ = A._fulfillmentHandlerAt(T), F = A._rejectionHandlerAt(T), O = A._promiseAt(T), L = A._receiverAt(T);
      L === void 0 && (L = a), this._addCallbacks(_, F, O, L, null);
    }, B.prototype._addCallbacks = function(A, T, _, F, O) {
      var L = this._length();
      if (L >= 65531 && (L = 0, this._setLength(0)), L === 0)
        this._promise0 = _, this._receiver0 = F, typeof A == "function" && (this._fulfillmentHandler0 = O === null ? A : o.domainBind(O, A)), typeof T == "function" && (this._rejectionHandler0 = O === null ? T : o.domainBind(O, T));
      else {
        var S = L * 4 - 4;
        this[S + 2] = _, this[S + 3] = F, typeof A == "function" && (this[S + 0] = O === null ? A : o.domainBind(O, A)), typeof T == "function" && (this[S + 1] = O === null ? T : o.domainBind(O, T));
      }
      return this._setLength(L + 1), L;
    }, B.prototype._proxy = function(A, T) {
      this._addCallbacks(void 0, void 0, T, A, null);
    }, B.prototype._resolveCallback = function(A, T) {
      if (!(this._bitField & 117506048)) {
        if (A === this)
          return this._rejectCallback(t(), !1);
        var _ = h(A, this);
        if (!(_ instanceof B)) return this._fulfill(A);
        T && this._propagateFrom(_, 2);
        var F = _._target();
        if (F === this) {
          this._reject(t());
          return;
        }
        var O = F._bitField;
        if (O & 50397184)
          if (O & 33554432)
            this._fulfill(F._value());
          else if (O & 16777216)
            this._reject(F._reason());
          else {
            var z = new p("late cancellation observer");
            F._attachExtraTrace(z), this._reject(z);
          }
        else {
          var L = this._length();
          L > 0 && F._migrateCallback0(this);
          for (var S = 1; S < L; ++S)
            F._migrateCallbackAt(this, S);
          this._setFollowing(), this._setLength(0), this._setFollowee(F);
        }
      }
    }, B.prototype._rejectCallback = function(A, T, _) {
      var F = o.ensureErrorObject(A), O = F === A;
      if (!O && !_ && x.warnings()) {
        var L = "a promise was rejected with a non-error: " + o.classString(A);
        this._warn(L, !0);
      }
      this._attachExtraTrace(F, T ? O : !1), this._reject(A);
    }, B.prototype._resolveFromExecutor = function(A) {
      var T = this;
      this._captureStackTrace(), this._pushContext();
      var _ = !0, F = this._execute(A, function(O) {
        T._resolveCallback(O);
      }, function(O) {
        T._rejectCallback(O, _);
      });
      _ = !1, this._popContext(), F !== void 0 && T._rejectCallback(F, !0);
    }, B.prototype._settlePromiseFromHandler = function(A, T, _, F) {
      var O = F._bitField;
      if (!(O & 65536)) {
        F._pushContext();
        var L;
        T === m ? !_ || typeof _.length != "number" ? (L = W, L.e = new f("cannot .spread() a non-array: " + o.classString(_))) : L = q(A).apply(this._boundValue(), _) : L = q(A).call(T, _);
        var S = F._popContext();
        O = F._bitField, !(O & 65536) && (L === y ? F._reject(_) : L === W ? F._rejectCallback(L.e, !1) : (x.checkForgottenReturns(L, S, "", F, this), F._resolveCallback(L)));
      }
    }, B.prototype._target = function() {
      for (var A = this; A._isFollowing(); ) A = A._followee();
      return A;
    }, B.prototype._followee = function() {
      return this._rejectionHandler0;
    }, B.prototype._setFollowee = function(A) {
      this._rejectionHandler0 = A;
    }, B.prototype._settlePromise = function(A, T, _, F) {
      var O = A instanceof B, L = this._bitField, S = (L & 134217728) !== 0;
      L & 65536 ? (O && A._invokeInternalOnCancel(), _ instanceof w && _.isFinallyHandler() ? (_.cancelPromise = A, q(T).call(_, F) === W && A._reject(W.e)) : T === n ? A._fulfill(n.call(_)) : _ instanceof i ? _._promiseCancelled(A) : O || A instanceof l ? A._cancel() : _.cancel()) : typeof T == "function" ? O ? (S && A._setAsyncGuaranteed(), this._settlePromiseFromHandler(T, _, F, A)) : T.call(_, F, A) : _ instanceof i ? _._isResolved() || (L & 33554432 ? _._promiseFulfilled(F, A) : _._promiseRejected(F, A)) : O && (S && A._setAsyncGuaranteed(), L & 33554432 ? A._fulfill(F) : A._reject(F));
    }, B.prototype._settlePromiseLateCancellationObserver = function(A) {
      var T = A.handler, _ = A.promise, F = A.receiver, O = A.value;
      typeof T == "function" ? _ instanceof B ? this._settlePromiseFromHandler(T, F, O, _) : T.call(F, O, _) : _ instanceof B && _._reject(O);
    }, B.prototype._settlePromiseCtx = function(A) {
      this._settlePromise(A.promise, A.handler, A.receiver, A.value);
    }, B.prototype._settlePromise0 = function(A, T, _) {
      var F = this._promise0, O = this._receiverAt(0);
      this._promise0 = void 0, this._receiver0 = void 0, this._settlePromise(F, A, O, T);
    }, B.prototype._clearCallbackDataAtIndex = function(A) {
      var T = A * 4 - 4;
      this[T + 2] = this[T + 3] = this[T + 0] = this[T + 1] = void 0;
    }, B.prototype._fulfill = function(A) {
      var T = this._bitField;
      if (!((T & 117506048) >>> 16)) {
        if (A === this) {
          var _ = t();
          return this._attachExtraTrace(_), this._reject(_);
        }
        this._setFulfilled(), this._rejectionHandler0 = A, (T & 65535) > 0 && (T & 134217728 ? this._settlePromises() : d.settlePromises(this));
      }
    }, B.prototype._reject = function(A) {
      var T = this._bitField;
      if (!((T & 117506048) >>> 16)) {
        if (this._setRejected(), this._fulfillmentHandler0 = A, this._isFinal())
          return d.fatalError(A, o.isNode);
        (T & 65535) > 0 ? d.settlePromises(this) : this._ensurePossibleRejectionHandled();
      }
    }, B.prototype._fulfillPromises = function(A, T) {
      for (var _ = 1; _ < A; _++) {
        var F = this._fulfillmentHandlerAt(_), O = this._promiseAt(_), L = this._receiverAt(_);
        this._clearCallbackDataAtIndex(_), this._settlePromise(O, F, L, T);
      }
    }, B.prototype._rejectPromises = function(A, T) {
      for (var _ = 1; _ < A; _++) {
        var F = this._rejectionHandlerAt(_), O = this._promiseAt(_), L = this._receiverAt(_);
        this._clearCallbackDataAtIndex(_), this._settlePromise(O, F, L, T);
      }
    }, B.prototype._settlePromises = function() {
      var A = this._bitField, T = A & 65535;
      if (T > 0) {
        if (A & 16842752) {
          var _ = this._fulfillmentHandler0;
          this._settlePromise0(this._rejectionHandler0, _, A), this._rejectPromises(T, _);
        } else {
          var F = this._rejectionHandler0;
          this._settlePromise0(this._fulfillmentHandler0, F, A), this._fulfillPromises(T, F);
        }
        this._setLength(0);
      }
      this._clearCancellationData();
    }, B.prototype._settledValue = function() {
      var A = this._bitField;
      if (A & 33554432)
        return this._rejectionHandler0;
      if (A & 16777216)
        return this._fulfillmentHandler0;
    };
    function P(A) {
      this.promise._resolveCallback(A);
    }
    function H(A) {
      this.promise._rejectCallback(A, !1);
    }
    B.defer = B.pending = function() {
      x.deprecated("Promise.defer", "new Promise");
      var A = new B(b);
      return {
        promise: A,
        resolve: P,
        reject: H
      };
    }, o.notEnumerableProp(
      B,
      "_makeSelfResolutionError",
      t
    ), Sw()(
      B,
      b,
      h,
      r,
      x
    ), kw()(B, b, h, x), Bw()(B, l, r, x), Rw()(B), Ow()(B), Iw()(
      B,
      l,
      h,
      b,
      d,
      c
    ), B.Promise = B, B.version = "3.4.7", Ww()(B, l, r, h, b, x), Nw()(B), Lw()(B, r, h, D, b, x), Mw()(B, b, x), $w()(B, r, b, h, i, x), Pw()(B), zw()(B, b), qw()(B, l, h, r), jw()(B, b, h, r), Zw()(B, l, r, h, b, x), Xw()(B, l, x), Vw()(B, l, r), Hw()(B, b), Gw()(B, b), Yw()(B), o.toFastProperties(B), o.toFastProperties(B.prototype);
    function Q(A) {
      var T = new B(b);
      T._fulfillmentHandler0 = A, T._rejectionHandler0 = A, T._promise0 = A, T._receiver0 = A;
    }
    return Q({ a: 1 }), Q({ b: 2 }), Q({ c: 3 }), Q(1), Q(function() {
    }), Q(void 0), Q(!1), Q(new B(b)), x.setBounds(s.firstLineError, o.lastLineError), B;
  };
})(j2);
var Kw = j2.exports, Jw = Se, st = Kw();
$e.defer = Qw;
$e.when = st.resolve;
$e.resolve = st.resolve;
$e.all = st.all;
$e.props = st.props;
$e.reject = st.reject;
$e.promisify = st.promisify;
$e.mapSeries = st.mapSeries;
$e.attempt = st.attempt;
$e.nfcall = function(e) {
  var t = Array.prototype.slice.call(arguments, 1), n = st.promisify(e);
  return n.apply(null, t);
};
st.prototype.fail = st.prototype.caught;
st.prototype.also = function(e) {
  return this.then(function(t) {
    var n = Jw.extend({}, t, e(t));
    return st.props(n);
  });
};
function Qw() {
  var e, t, n = new st.Promise(function(r, i) {
    e = r, t = i;
  });
  return {
    resolve: e,
    reject: t,
    promise: n
  };
}
var se = {}, eT = Se, Xe = se.types = {
  document: "document",
  paragraph: "paragraph",
  run: "run",
  text: "text",
  tab: "tab",
  checkbox: "checkbox",
  hyperlink: "hyperlink",
  noteReference: "noteReference",
  image: "image",
  note: "note",
  commentReference: "commentReference",
  comment: "comment",
  table: "table",
  tableRow: "tableRow",
  tableCell: "tableCell",
  break: "break",
  bookmarkStart: "bookmarkStart"
};
function tT(e, t) {
  return t = t || {}, {
    type: Xe.document,
    children: e,
    notes: t.notes || new Do({}),
    comments: t.comments || []
  };
}
function nT(e, t) {
  t = t || {};
  var n = t.indent || {};
  return {
    type: Xe.paragraph,
    children: e,
    styleId: t.styleId || null,
    styleName: t.styleName || null,
    numbering: t.numbering || null,
    alignment: t.alignment || null,
    indent: {
      start: n.start || null,
      end: n.end || null,
      firstLine: n.firstLine || null,
      hanging: n.hanging || null
    }
  };
}
function rT(e, t) {
  return t = t || {}, {
    type: Xe.run,
    children: e,
    styleId: t.styleId || null,
    styleName: t.styleName || null,
    isBold: !!t.isBold,
    isUnderline: !!t.isUnderline,
    isItalic: !!t.isItalic,
    isStrikethrough: !!t.isStrikethrough,
    isAllCaps: !!t.isAllCaps,
    isSmallCaps: !!t.isSmallCaps,
    verticalAlignment: t.verticalAlignment || X2.baseline,
    font: t.font || null,
    fontSize: t.fontSize || null,
    highlight: t.highlight || null
  };
}
var X2 = {
  baseline: "baseline",
  superscript: "superscript",
  subscript: "subscript"
};
function iT(e) {
  return {
    type: Xe.text,
    value: e
  };
}
function aT() {
  return {
    type: Xe.tab
  };
}
function oT(e) {
  return {
    type: Xe.checkbox,
    checked: e.checked
  };
}
function cT(e, t) {
  return {
    type: Xe.hyperlink,
    children: e,
    href: t.href,
    anchor: t.anchor,
    targetFrame: t.targetFrame
  };
}
function sT(e) {
  return {
    type: Xe.noteReference,
    noteType: e.noteType,
    noteId: e.noteId
  };
}
function Do(e) {
  this._notes = eT.indexBy(e, function(t) {
    return V2(t.noteType, t.noteId);
  });
}
Do.prototype.resolve = function(e) {
  return this.findNoteByKey(V2(e.noteType, e.noteId));
};
Do.prototype.findNoteByKey = function(e) {
  return this._notes[e] || null;
};
function uT(e) {
  return {
    type: Xe.note,
    noteType: e.noteType,
    noteId: e.noteId,
    body: e.body
  };
}
function dT(e) {
  return {
    type: Xe.commentReference,
    commentId: e.commentId
  };
}
function lT(e) {
  return {
    type: Xe.comment,
    commentId: e.commentId,
    body: e.body,
    authorName: e.authorName,
    authorInitials: e.authorInitials
  };
}
function V2(e, t) {
  return e + "-" + t;
}
function fT(e) {
  return {
    type: Xe.image,
    // `read` is retained for backwards compatibility, but other read
    // methods should be preferred.
    read: function(t) {
      return t ? e.readImage(t) : e.readImage().then(function(n) {
        return Buffer.from(n);
      });
    },
    readAsArrayBuffer: function() {
      return e.readImage();
    },
    readAsBase64String: function() {
      return e.readImage("base64");
    },
    readAsBuffer: function() {
      return e.readImage().then(function(t) {
        return Buffer.from(t);
      });
    },
    altText: e.altText,
    contentType: e.contentType
  };
}
function hT(e, t) {
  return t = t || {}, {
    type: Xe.table,
    children: e,
    styleId: t.styleId || null,
    styleName: t.styleName || null
  };
}
function pT(e, t) {
  return t = t || {}, {
    type: Xe.tableRow,
    children: e,
    isHeader: t.isHeader || !1
  };
}
function gT(e, t) {
  return t = t || {}, {
    type: Xe.tableCell,
    children: e,
    colSpan: t.colSpan == null ? 1 : t.colSpan,
    rowSpan: t.rowSpan == null ? 1 : t.rowSpan
  };
}
function Sd(e) {
  return {
    type: Xe.break,
    breakType: e
  };
}
function mT(e) {
  return {
    type: Xe.bookmarkStart,
    name: e.name
  };
}
se.document = se.Document = tT;
se.paragraph = se.Paragraph = nT;
se.run = se.Run = rT;
se.text = se.Text = iT;
se.tab = se.Tab = aT;
se.checkbox = se.Checkbox = oT;
se.Hyperlink = cT;
se.noteReference = se.NoteReference = sT;
se.Notes = Do;
se.Note = uT;
se.commentReference = dT;
se.comment = lT;
se.Image = fT;
se.Table = hT;
se.TableRow = pT;
se.TableCell = gT;
se.lineBreak = Sd("line");
se.pageBreak = Sd("page");
se.columnBreak = Sd("column");
se.BookmarkStart = mT;
se.verticalAlignment = X2;
var bt = {}, Ui = Se;
bt.Result = Ht;
bt.success = bT;
bt.warning = yT;
bt.error = vT;
function Ht(e, t) {
  this.value = e, this.messages = t || [];
}
Ht.prototype.map = function(e) {
  return new Ht(e(this.value), this.messages);
};
Ht.prototype.flatMap = function(e) {
  var t = e(this.value);
  return new Ht(t.value, kd([this, t]));
};
Ht.prototype.flatMapThen = function(e) {
  var t = this;
  return e(this.value).then(function(n) {
    return new Ht(n.value, kd([t, n]));
  });
};
Ht.combine = function(e) {
  var t = Ui.flatten(Ui.pluck(e, "value")), n = kd(e);
  return new Ht(t, n);
};
function bT(e) {
  return new Ht(e, []);
}
function yT(e) {
  return {
    type: "warning",
    message: e
  };
}
function vT(e) {
  return {
    type: "error",
    message: e.message,
    error: e
  };
}
function kd(e) {
  var t = [];
  return Ui.flatten(Ui.pluck(e, "messages"), !0).forEach(function(n) {
    DT(t, n) || t.push(n);
  }), t;
}
function DT(e, t) {
  return Ui.find(e, xT.bind(null, t)) !== void 0;
}
function xT(e, t) {
  return e.type === t.type && e.message === t.message;
}
var Pi = {}, xo = {};
xo.byteLength = TT;
xo.toByteArray = ET;
xo.fromByteArray = FT;
var zt = [], vt = [], _T = typeof Uint8Array < "u" ? Uint8Array : Array, ns = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var pr = 0, wT = ns.length; pr < wT; ++pr)
  zt[pr] = ns[pr], vt[ns.charCodeAt(pr)] = pr;
vt[45] = 62;
vt[95] = 63;
function H2(e) {
  var t = e.length;
  if (t % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var n = e.indexOf("=");
  n === -1 && (n = t);
  var r = n === t ? 0 : 4 - n % 4;
  return [n, r];
}
function TT(e) {
  var t = H2(e), n = t[0], r = t[1];
  return (n + r) * 3 / 4 - r;
}
function UT(e, t, n) {
  return (t + n) * 3 / 4 - n;
}
function ET(e) {
  var t, n = H2(e), r = n[0], i = n[1], a = new _T(UT(e, r, i)), o = 0, c = i > 0 ? r - 4 : r, u;
  for (u = 0; u < c; u += 4)
    t = vt[e.charCodeAt(u)] << 18 | vt[e.charCodeAt(u + 1)] << 12 | vt[e.charCodeAt(u + 2)] << 6 | vt[e.charCodeAt(u + 3)], a[o++] = t >> 16 & 255, a[o++] = t >> 8 & 255, a[o++] = t & 255;
  return i === 2 && (t = vt[e.charCodeAt(u)] << 2 | vt[e.charCodeAt(u + 1)] >> 4, a[o++] = t & 255), i === 1 && (t = vt[e.charCodeAt(u)] << 10 | vt[e.charCodeAt(u + 1)] << 4 | vt[e.charCodeAt(u + 2)] >> 2, a[o++] = t >> 8 & 255, a[o++] = t & 255), a;
}
function AT(e) {
  return zt[e >> 18 & 63] + zt[e >> 12 & 63] + zt[e >> 6 & 63] + zt[e & 63];
}
function CT(e, t, n) {
  for (var r, i = [], a = t; a < n; a += 3)
    r = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (e[a + 2] & 255), i.push(AT(r));
  return i.join("");
}
function FT(e) {
  for (var t, n = e.length, r = n % 3, i = [], a = 16383, o = 0, c = n - r; o < c; o += a)
    i.push(CT(e, o, o + a > c ? c : o + a));
  return r === 1 ? (t = e[n - 1], i.push(
    zt[t >> 2] + zt[t << 4 & 63] + "=="
  )) : r === 2 && (t = (e[n - 2] << 8) + e[n - 1], i.push(
    zt[t >> 10] + zt[t >> 4 & 63] + zt[t << 2 & 63] + "="
  )), i.join("");
}
var jr = {}, rs = {}, Be = {}, sa = { exports: {} }, ua = { exports: {} }, Qf;
function _o() {
  if (Qf) return ua.exports;
  Qf = 1, typeof process > "u" || !process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0 ? ua.exports = { nextTick: e } : ua.exports = process;
  function e(t, n, r, i) {
    if (typeof t != "function")
      throw new TypeError('"callback" argument must be a function');
    var a = arguments.length, o, c;
    switch (a) {
      case 0:
      case 1:
        return process.nextTick(t);
      case 2:
        return process.nextTick(function() {
          t.call(null, n);
        });
      case 3:
        return process.nextTick(function() {
          t.call(null, n, r);
        });
      case 4:
        return process.nextTick(function() {
          t.call(null, n, r, i);
        });
      default:
        for (o = new Array(a - 1), c = 0; c < o.length; )
          o[c++] = arguments[c];
        return process.nextTick(function() {
          t.apply(null, o);
        });
    }
  }
  return ua.exports;
}
var is, eh;
function ST() {
  if (eh) return is;
  eh = 1;
  var e = {}.toString;
  return is = Array.isArray || function(t) {
    return e.call(t) == "[object Array]";
  }, is;
}
var as, th;
function G2() {
  return th || (th = 1, as = $g), as;
}
var da = { exports: {} }, nh;
function wo() {
  return nh || (nh = 1, function(e, t) {
    var n = uv, r = n.Buffer;
    function i(o, c) {
      for (var u in o)
        c[u] = o[u];
    }
    r.from && r.alloc && r.allocUnsafe && r.allocUnsafeSlow ? e.exports = n : (i(n, t), t.Buffer = a);
    function a(o, c, u) {
      return r(o, c, u);
    }
    i(r, a), a.from = function(o, c, u) {
      if (typeof o == "number")
        throw new TypeError("Argument must not be a number");
      return r(o, c, u);
    }, a.alloc = function(o, c, u) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      var s = r(o);
      return c !== void 0 ? typeof u == "string" ? s.fill(c, u) : s.fill(c) : s.fill(0), s;
    }, a.allocUnsafe = function(o) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      return r(o);
    }, a.allocUnsafeSlow = function(o) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      return n.SlowBuffer(o);
    };
  }(da, da.exports)), da.exports;
}
var ze = {}, rh;
function zi() {
  if (rh) return ze;
  rh = 1;
  function e(m) {
    return Array.isArray ? Array.isArray(m) : b(m) === "[object Array]";
  }
  ze.isArray = e;
  function t(m) {
    return typeof m == "boolean";
  }
  ze.isBoolean = t;
  function n(m) {
    return m === null;
  }
  ze.isNull = n;
  function r(m) {
    return m == null;
  }
  ze.isNullOrUndefined = r;
  function i(m) {
    return typeof m == "number";
  }
  ze.isNumber = i;
  function a(m) {
    return typeof m == "string";
  }
  ze.isString = a;
  function o(m) {
    return typeof m == "symbol";
  }
  ze.isSymbol = o;
  function c(m) {
    return m === void 0;
  }
  ze.isUndefined = c;
  function u(m) {
    return b(m) === "[object RegExp]";
  }
  ze.isRegExp = u;
  function s(m) {
    return typeof m == "object" && m !== null;
  }
  ze.isObject = s;
  function d(m) {
    return b(m) === "[object Date]";
  }
  ze.isDate = d;
  function g(m) {
    return b(m) === "[object Error]" || m instanceof Error;
  }
  ze.isError = g;
  function f(m) {
    return typeof m == "function";
  }
  ze.isFunction = f;
  function p(m) {
    return m === null || typeof m == "boolean" || typeof m == "number" || typeof m == "string" || typeof m == "symbol" || // ES6 symbol
    typeof m > "u";
  }
  ze.isPrimitive = p, ze.isBuffer = Buffer.isBuffer;
  function b(m) {
    return Object.prototype.toString.call(m);
  }
  return ze;
}
var la = { exports: {} }, fa = { exports: {} }, ih;
function kT() {
  return ih || (ih = 1, typeof Object.create == "function" ? fa.exports = function(t, n) {
    n && (t.super_ = n, t.prototype = Object.create(n.prototype, {
      constructor: {
        value: t,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : fa.exports = function(t, n) {
    if (n) {
      t.super_ = n;
      var r = function() {
      };
      r.prototype = n.prototype, t.prototype = new r(), t.prototype.constructor = t;
    }
  }), fa.exports;
}
var ah;
function qi() {
  if (ah) return la.exports;
  ah = 1;
  try {
    var e = require("util");
    if (typeof e.inherits != "function") throw "";
    la.exports = e.inherits;
  } catch {
    la.exports = kT();
  }
  return la.exports;
}
var os = { exports: {} }, oh;
function BT() {
  return oh || (oh = 1, function(e) {
    function t(a, o) {
      if (!(a instanceof o))
        throw new TypeError("Cannot call a class as a function");
    }
    var n = wo().Buffer, r = io;
    function i(a, o, c) {
      a.copy(o, c);
    }
    e.exports = function() {
      function a() {
        t(this, a), this.head = null, this.tail = null, this.length = 0;
      }
      return a.prototype.push = function(c) {
        var u = { data: c, next: null };
        this.length > 0 ? this.tail.next = u : this.head = u, this.tail = u, ++this.length;
      }, a.prototype.unshift = function(c) {
        var u = { data: c, next: this.head };
        this.length === 0 && (this.tail = u), this.head = u, ++this.length;
      }, a.prototype.shift = function() {
        if (this.length !== 0) {
          var c = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, c;
        }
      }, a.prototype.clear = function() {
        this.head = this.tail = null, this.length = 0;
      }, a.prototype.join = function(c) {
        if (this.length === 0) return "";
        for (var u = this.head, s = "" + u.data; u = u.next; )
          s += c + u.data;
        return s;
      }, a.prototype.concat = function(c) {
        if (this.length === 0) return n.alloc(0);
        for (var u = n.allocUnsafe(c >>> 0), s = this.head, d = 0; s; )
          i(s.data, u, d), d += s.data.length, s = s.next;
        return u;
      }, a;
    }(), r && r.inspect && r.inspect.custom && (e.exports.prototype[r.inspect.custom] = function() {
      var a = r.inspect({ length: this.length });
      return this.constructor.name + " " + a;
    });
  }(os)), os.exports;
}
var cs, ch;
function Y2() {
  if (ch) return cs;
  ch = 1;
  var e = _o();
  function t(i, a) {
    var o = this, c = this._readableState && this._readableState.destroyed, u = this._writableState && this._writableState.destroyed;
    return c || u ? (a ? a(i) : i && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, e.nextTick(r, this, i)) : e.nextTick(r, this, i)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(i || null, function(s) {
      !a && s ? o._writableState ? o._writableState.errorEmitted || (o._writableState.errorEmitted = !0, e.nextTick(r, o, s)) : e.nextTick(r, o, s) : a && a(s);
    }), this);
  }
  function n() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function r(i, a) {
    i.emit("error", a);
  }
  return cs = {
    destroy: t,
    undestroy: n
  }, cs;
}
var ss, sh;
function RT() {
  return sh || (sh = 1, ss = io.deprecate), ss;
}
var us, uh;
function K2() {
  if (uh) return us;
  uh = 1;
  var e = _o();
  us = m;
  function t(T) {
    var _ = this;
    this.next = null, this.entry = null, this.finish = function() {
      A(_, T);
    };
  }
  var n = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : e.nextTick, r;
  m.WritableState = p;
  var i = Object.create(zi());
  i.inherits = qi();
  var a = {
    deprecate: RT()
  }, o = G2(), c = wo().Buffer, u = (typeof re < "u" ? re : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function s(T) {
    return c.from(T);
  }
  function d(T) {
    return c.isBuffer(T) || T instanceof u;
  }
  var g = Y2();
  i.inherits(m, o);
  function f() {
  }
  function p(T, _) {
    r = r || Rr(), T = T || {};
    var F = _ instanceof r;
    this.objectMode = !!T.objectMode, F && (this.objectMode = this.objectMode || !!T.writableObjectMode);
    var O = T.highWaterMark, L = T.writableHighWaterMark, S = this.objectMode ? 16 : 16 * 1024;
    O || O === 0 ? this.highWaterMark = O : F && (L || L === 0) ? this.highWaterMark = L : this.highWaterMark = S, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var z = T.decodeStrings === !1;
    this.decodeStrings = !z, this.defaultEncoding = T.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(ee) {
      E(_, ee);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new t(this);
  }
  p.prototype.getBuffer = function() {
    for (var _ = this.bufferedRequest, F = []; _; )
      F.push(_), _ = _.next;
    return F;
  }, function() {
    try {
      Object.defineProperty(p.prototype, "buffer", {
        get: a.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch {
    }
  }();
  var b;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (b = Function.prototype[Symbol.hasInstance], Object.defineProperty(m, Symbol.hasInstance, {
    value: function(T) {
      return b.call(this, T) ? !0 : this !== m ? !1 : T && T._writableState instanceof p;
    }
  })) : b = function(T) {
    return T instanceof this;
  };
  function m(T) {
    if (r = r || Rr(), !b.call(m, this) && !(this instanceof r))
      return new m(T);
    this._writableState = new p(T, this), this.writable = !0, T && (typeof T.write == "function" && (this._write = T.write), typeof T.writev == "function" && (this._writev = T.writev), typeof T.destroy == "function" && (this._destroy = T.destroy), typeof T.final == "function" && (this._final = T.final)), o.call(this);
  }
  m.prototype.pipe = function() {
    this.emit("error", new Error("Cannot pipe, not readable"));
  };
  function y(T, _) {
    var F = new Error("write after end");
    T.emit("error", F), e.nextTick(_, F);
  }
  function h(T, _, F, O) {
    var L = !0, S = !1;
    return F === null ? S = new TypeError("May not write null values to stream") : typeof F != "string" && F !== void 0 && !_.objectMode && (S = new TypeError("Invalid non-string/buffer chunk")), S && (T.emit("error", S), e.nextTick(O, S), L = !1), L;
  }
  m.prototype.write = function(T, _, F) {
    var O = this._writableState, L = !1, S = !O.objectMode && d(T);
    return S && !c.isBuffer(T) && (T = s(T)), typeof _ == "function" && (F = _, _ = null), S ? _ = "buffer" : _ || (_ = O.defaultEncoding), typeof F != "function" && (F = f), O.ended ? y(this, F) : (S || h(this, O, T, F)) && (O.pendingcb++, L = v(this, O, S, T, _, F)), L;
  }, m.prototype.cork = function() {
    var T = this._writableState;
    T.corked++;
  }, m.prototype.uncork = function() {
    var T = this._writableState;
    T.corked && (T.corked--, !T.writing && !T.corked && !T.bufferProcessing && T.bufferedRequest && q(this, T));
  }, m.prototype.setDefaultEncoding = function(_) {
    if (typeof _ == "string" && (_ = _.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((_ + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + _);
    return this._writableState.defaultEncoding = _, this;
  };
  function l(T, _, F) {
    return !T.objectMode && T.decodeStrings !== !1 && typeof _ == "string" && (_ = c.from(_, F)), _;
  }
  Object.defineProperty(m.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function v(T, _, F, O, L, S) {
    if (!F) {
      var z = l(_, O, L);
      O !== z && (F = !0, L = "buffer", O = z);
    }
    var ee = _.objectMode ? 1 : O.length;
    _.length += ee;
    var te = _.length < _.highWaterMark;
    if (te || (_.needDrain = !0), _.writing || _.corked) {
      var J = _.lastBufferedRequest;
      _.lastBufferedRequest = {
        chunk: O,
        encoding: L,
        isBuf: F,
        callback: S,
        next: null
      }, J ? J.next = _.lastBufferedRequest : _.bufferedRequest = _.lastBufferedRequest, _.bufferedRequestCount += 1;
    } else
      D(T, _, !1, ee, O, L, S);
    return te;
  }
  function D(T, _, F, O, L, S, z) {
    _.writelen = O, _.writecb = z, _.writing = !0, _.sync = !0, F ? T._writev(L, _.onwrite) : T._write(L, S, _.onwrite), _.sync = !1;
  }
  function x(T, _, F, O, L) {
    --_.pendingcb, F ? (e.nextTick(L, O), e.nextTick(H, T, _), T._writableState.errorEmitted = !0, T.emit("error", O)) : (L(O), T._writableState.errorEmitted = !0, T.emit("error", O), H(T, _));
  }
  function w(T) {
    T.writing = !1, T.writecb = null, T.length -= T.writelen, T.writelen = 0;
  }
  function E(T, _) {
    var F = T._writableState, O = F.sync, L = F.writecb;
    if (w(F), _) x(T, F, O, _, L);
    else {
      var S = $(F);
      !S && !F.corked && !F.bufferProcessing && F.bufferedRequest && q(T, F), O ? n(k, T, F, S, L) : k(T, F, S, L);
    }
  }
  function k(T, _, F, O) {
    F || W(T, _), _.pendingcb--, O(), H(T, _);
  }
  function W(T, _) {
    _.length === 0 && _.needDrain && (_.needDrain = !1, T.emit("drain"));
  }
  function q(T, _) {
    _.bufferProcessing = !0;
    var F = _.bufferedRequest;
    if (T._writev && F && F.next) {
      var O = _.bufferedRequestCount, L = new Array(O), S = _.corkedRequestsFree;
      S.entry = F;
      for (var z = 0, ee = !0; F; )
        L[z] = F, F.isBuf || (ee = !1), F = F.next, z += 1;
      L.allBuffers = ee, D(T, _, !0, _.length, L, "", S.finish), _.pendingcb++, _.lastBufferedRequest = null, S.next ? (_.corkedRequestsFree = S.next, S.next = null) : _.corkedRequestsFree = new t(_), _.bufferedRequestCount = 0;
    } else {
      for (; F; ) {
        var te = F.chunk, J = F.encoding, U = F.callback, C = _.objectMode ? 1 : te.length;
        if (D(T, _, !1, C, te, J, U), F = F.next, _.bufferedRequestCount--, _.writing)
          break;
      }
      F === null && (_.lastBufferedRequest = null);
    }
    _.bufferedRequest = F, _.bufferProcessing = !1;
  }
  m.prototype._write = function(T, _, F) {
    F(new Error("_write() is not implemented"));
  }, m.prototype._writev = null, m.prototype.end = function(T, _, F) {
    var O = this._writableState;
    typeof T == "function" ? (F = T, T = null, _ = null) : typeof _ == "function" && (F = _, _ = null), T != null && this.write(T, _), O.corked && (O.corked = 1, this.uncork()), O.ending || Q(this, O, F);
  };
  function $(T) {
    return T.ending && T.length === 0 && T.bufferedRequest === null && !T.finished && !T.writing;
  }
  function B(T, _) {
    T._final(function(F) {
      _.pendingcb--, F && T.emit("error", F), _.prefinished = !0, T.emit("prefinish"), H(T, _);
    });
  }
  function P(T, _) {
    !_.prefinished && !_.finalCalled && (typeof T._final == "function" ? (_.pendingcb++, _.finalCalled = !0, e.nextTick(B, T, _)) : (_.prefinished = !0, T.emit("prefinish")));
  }
  function H(T, _) {
    var F = $(_);
    return F && (P(T, _), _.pendingcb === 0 && (_.finished = !0, T.emit("finish"))), F;
  }
  function Q(T, _, F) {
    _.ending = !0, H(T, _), F && (_.finished ? e.nextTick(F) : T.once("finish", F)), _.ended = !0, T.writable = !1;
  }
  function A(T, _, F) {
    var O = T.entry;
    for (T.entry = null; O; ) {
      var L = O.callback;
      _.pendingcb--, L(F), O = O.next;
    }
    _.corkedRequestsFree.next = T;
  }
  return Object.defineProperty(m.prototype, "destroyed", {
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(T) {
      this._writableState && (this._writableState.destroyed = T);
    }
  }), m.prototype.destroy = g.destroy, m.prototype._undestroy = g.undestroy, m.prototype._destroy = function(T, _) {
    this.end(), _(T);
  }, us;
}
var ds, dh;
function Rr() {
  if (dh) return ds;
  dh = 1;
  var e = _o(), t = Object.keys || function(g) {
    var f = [];
    for (var p in g)
      f.push(p);
    return f;
  };
  ds = u;
  var n = Object.create(zi());
  n.inherits = qi();
  var r = J2(), i = K2();
  n.inherits(u, r);
  for (var a = t(i.prototype), o = 0; o < a.length; o++) {
    var c = a[o];
    u.prototype[c] || (u.prototype[c] = i.prototype[c]);
  }
  function u(g) {
    if (!(this instanceof u)) return new u(g);
    r.call(this, g), i.call(this, g), g && g.readable === !1 && (this.readable = !1), g && g.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, g && g.allowHalfOpen === !1 && (this.allowHalfOpen = !1), this.once("end", s);
  }
  Object.defineProperty(u.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function s() {
    this.allowHalfOpen || this._writableState.ended || e.nextTick(d, this);
  }
  function d(g) {
    g.end();
  }
  return Object.defineProperty(u.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(g) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = g, this._writableState.destroyed = g);
    }
  }), u.prototype._destroy = function(g, f) {
    this.push(null), this.end(), e.nextTick(f, g);
  }, ds;
}
var ls = {}, lh;
function fh() {
  if (lh) return ls;
  lh = 1;
  var e = wo().Buffer, t = e.isEncoding || function(h) {
    switch (h = "" + h, h && h.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return !0;
      default:
        return !1;
    }
  };
  function n(h) {
    if (!h) return "utf8";
    for (var l; ; )
      switch (h) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return h;
        default:
          if (l) return;
          h = ("" + h).toLowerCase(), l = !0;
      }
  }
  function r(h) {
    var l = n(h);
    if (typeof l != "string" && (e.isEncoding === t || !t(h))) throw new Error("Unknown encoding: " + h);
    return l || h;
  }
  ls.StringDecoder = i;
  function i(h) {
    this.encoding = r(h);
    var l;
    switch (this.encoding) {
      case "utf16le":
        this.text = g, this.end = f, l = 4;
        break;
      case "utf8":
        this.fillLast = u, l = 4;
        break;
      case "base64":
        this.text = p, this.end = b, l = 3;
        break;
      default:
        this.write = m, this.end = y;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = e.allocUnsafe(l);
  }
  i.prototype.write = function(h) {
    if (h.length === 0) return "";
    var l, v;
    if (this.lastNeed) {
      if (l = this.fillLast(h), l === void 0) return "";
      v = this.lastNeed, this.lastNeed = 0;
    } else
      v = 0;
    return v < h.length ? l ? l + this.text(h, v) : this.text(h, v) : l || "";
  }, i.prototype.end = d, i.prototype.text = s, i.prototype.fillLast = function(h) {
    if (this.lastNeed <= h.length)
      return h.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    h.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, h.length), this.lastNeed -= h.length;
  };
  function a(h) {
    return h <= 127 ? 0 : h >> 5 === 6 ? 2 : h >> 4 === 14 ? 3 : h >> 3 === 30 ? 4 : h >> 6 === 2 ? -1 : -2;
  }
  function o(h, l, v) {
    var D = l.length - 1;
    if (D < v) return 0;
    var x = a(l[D]);
    return x >= 0 ? (x > 0 && (h.lastNeed = x - 1), x) : --D < v || x === -2 ? 0 : (x = a(l[D]), x >= 0 ? (x > 0 && (h.lastNeed = x - 2), x) : --D < v || x === -2 ? 0 : (x = a(l[D]), x >= 0 ? (x > 0 && (x === 2 ? x = 0 : h.lastNeed = x - 3), x) : 0));
  }
  function c(h, l, v) {
    if ((l[0] & 192) !== 128)
      return h.lastNeed = 0, "�";
    if (h.lastNeed > 1 && l.length > 1) {
      if ((l[1] & 192) !== 128)
        return h.lastNeed = 1, "�";
      if (h.lastNeed > 2 && l.length > 2 && (l[2] & 192) !== 128)
        return h.lastNeed = 2, "�";
    }
  }
  function u(h) {
    var l = this.lastTotal - this.lastNeed, v = c(this, h);
    if (v !== void 0) return v;
    if (this.lastNeed <= h.length)
      return h.copy(this.lastChar, l, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    h.copy(this.lastChar, l, 0, h.length), this.lastNeed -= h.length;
  }
  function s(h, l) {
    var v = o(this, h, l);
    if (!this.lastNeed) return h.toString("utf8", l);
    this.lastTotal = v;
    var D = h.length - (v - this.lastNeed);
    return h.copy(this.lastChar, 0, D), h.toString("utf8", l, D);
  }
  function d(h) {
    var l = h && h.length ? this.write(h) : "";
    return this.lastNeed ? l + "�" : l;
  }
  function g(h, l) {
    if ((h.length - l) % 2 === 0) {
      var v = h.toString("utf16le", l);
      if (v) {
        var D = v.charCodeAt(v.length - 1);
        if (D >= 55296 && D <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = h[h.length - 2], this.lastChar[1] = h[h.length - 1], v.slice(0, -1);
      }
      return v;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = h[h.length - 1], h.toString("utf16le", l, h.length - 1);
  }
  function f(h) {
    var l = h && h.length ? this.write(h) : "";
    if (this.lastNeed) {
      var v = this.lastTotal - this.lastNeed;
      return l + this.lastChar.toString("utf16le", 0, v);
    }
    return l;
  }
  function p(h, l) {
    var v = (h.length - l) % 3;
    return v === 0 ? h.toString("base64", l) : (this.lastNeed = 3 - v, this.lastTotal = 3, v === 1 ? this.lastChar[0] = h[h.length - 1] : (this.lastChar[0] = h[h.length - 2], this.lastChar[1] = h[h.length - 1]), h.toString("base64", l, h.length - v));
  }
  function b(h) {
    var l = h && h.length ? this.write(h) : "";
    return this.lastNeed ? l + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : l;
  }
  function m(h) {
    return h.toString(this.encoding);
  }
  function y(h) {
    return h && h.length ? this.write(h) : "";
  }
  return ls;
}
var fs, hh;
function J2() {
  if (hh) return fs;
  hh = 1;
  var e = _o();
  fs = l;
  var t = ST(), n;
  l.ReadableState = h, sv.EventEmitter;
  var r = function(U, C) {
    return U.listeners(C).length;
  }, i = G2(), a = wo().Buffer, o = (typeof re < "u" ? re : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function c(U) {
    return a.from(U);
  }
  function u(U) {
    return a.isBuffer(U) || U instanceof o;
  }
  var s = Object.create(zi());
  s.inherits = qi();
  var d = io, g = void 0;
  d && d.debuglog ? g = d.debuglog("stream") : g = function() {
  };
  var f = BT(), p = Y2(), b;
  s.inherits(l, i);
  var m = ["error", "close", "destroy", "pause", "resume"];
  function y(U, C, Z) {
    if (typeof U.prependListener == "function") return U.prependListener(C, Z);
    !U._events || !U._events[C] ? U.on(C, Z) : t(U._events[C]) ? U._events[C].unshift(Z) : U._events[C] = [Z, U._events[C]];
  }
  function h(U, C) {
    n = n || Rr(), U = U || {};
    var Z = C instanceof n;
    this.objectMode = !!U.objectMode, Z && (this.objectMode = this.objectMode || !!U.readableObjectMode);
    var K = U.highWaterMark, R = U.readableHighWaterMark, M = this.objectMode ? 16 : 16 * 1024;
    K || K === 0 ? this.highWaterMark = K : Z && (R || R === 0) ? this.highWaterMark = R : this.highWaterMark = M, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new f(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = U.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, U.encoding && (b || (b = fh().StringDecoder), this.decoder = new b(U.encoding), this.encoding = U.encoding);
  }
  function l(U) {
    if (n = n || Rr(), !(this instanceof l)) return new l(U);
    this._readableState = new h(U, this), this.readable = !0, U && (typeof U.read == "function" && (this._read = U.read), typeof U.destroy == "function" && (this._destroy = U.destroy)), i.call(this);
  }
  Object.defineProperty(l.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(U) {
      this._readableState && (this._readableState.destroyed = U);
    }
  }), l.prototype.destroy = p.destroy, l.prototype._undestroy = p.undestroy, l.prototype._destroy = function(U, C) {
    this.push(null), C(U);
  }, l.prototype.push = function(U, C) {
    var Z = this._readableState, K;
    return Z.objectMode ? K = !0 : typeof U == "string" && (C = C || Z.defaultEncoding, C !== Z.encoding && (U = a.from(U, C), C = ""), K = !0), v(this, U, C, !1, K);
  }, l.prototype.unshift = function(U) {
    return v(this, U, null, !0, !1);
  };
  function v(U, C, Z, K, R) {
    var M = U._readableState;
    if (C === null)
      M.reading = !1, q(U, M);
    else {
      var V;
      R || (V = x(M, C)), V ? U.emit("error", V) : M.objectMode || C && C.length > 0 ? (typeof C != "string" && !M.objectMode && Object.getPrototypeOf(C) !== a.prototype && (C = c(C)), K ? M.endEmitted ? U.emit("error", new Error("stream.unshift() after end event")) : D(U, M, C, !0) : M.ended ? U.emit("error", new Error("stream.push() after EOF")) : (M.reading = !1, M.decoder && !Z ? (C = M.decoder.write(C), M.objectMode || C.length !== 0 ? D(U, M, C, !1) : P(U, M)) : D(U, M, C, !1))) : K || (M.reading = !1);
    }
    return w(M);
  }
  function D(U, C, Z, K) {
    C.flowing && C.length === 0 && !C.sync ? (U.emit("data", Z), U.read(0)) : (C.length += C.objectMode ? 1 : Z.length, K ? C.buffer.unshift(Z) : C.buffer.push(Z), C.needReadable && $(U)), P(U, C);
  }
  function x(U, C) {
    var Z;
    return !u(C) && typeof C != "string" && C !== void 0 && !U.objectMode && (Z = new TypeError("Invalid non-string/buffer chunk")), Z;
  }
  function w(U) {
    return !U.ended && (U.needReadable || U.length < U.highWaterMark || U.length === 0);
  }
  l.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, l.prototype.setEncoding = function(U) {
    return b || (b = fh().StringDecoder), this._readableState.decoder = new b(U), this._readableState.encoding = U, this;
  };
  var E = 8388608;
  function k(U) {
    return U >= E ? U = E : (U--, U |= U >>> 1, U |= U >>> 2, U |= U >>> 4, U |= U >>> 8, U |= U >>> 16, U++), U;
  }
  function W(U, C) {
    return U <= 0 || C.length === 0 && C.ended ? 0 : C.objectMode ? 1 : U !== U ? C.flowing && C.length ? C.buffer.head.data.length : C.length : (U > C.highWaterMark && (C.highWaterMark = k(U)), U <= C.length ? U : C.ended ? C.length : (C.needReadable = !0, 0));
  }
  l.prototype.read = function(U) {
    g("read", U), U = parseInt(U, 10);
    var C = this._readableState, Z = U;
    if (U !== 0 && (C.emittedReadable = !1), U === 0 && C.needReadable && (C.length >= C.highWaterMark || C.ended))
      return g("read: emitReadable", C.length, C.ended), C.length === 0 && C.ended ? ee(this) : $(this), null;
    if (U = W(U, C), U === 0 && C.ended)
      return C.length === 0 && ee(this), null;
    var K = C.needReadable;
    g("need readable", K), (C.length === 0 || C.length - U < C.highWaterMark) && (K = !0, g("length less than watermark", K)), C.ended || C.reading ? (K = !1, g("reading or ended", K)) : K && (g("do read"), C.reading = !0, C.sync = !0, C.length === 0 && (C.needReadable = !0), this._read(C.highWaterMark), C.sync = !1, C.reading || (U = W(Z, C)));
    var R;
    return U > 0 ? R = O(U, C) : R = null, R === null ? (C.needReadable = !0, U = 0) : C.length -= U, C.length === 0 && (C.ended || (C.needReadable = !0), Z !== U && C.ended && ee(this)), R !== null && this.emit("data", R), R;
  };
  function q(U, C) {
    if (!C.ended) {
      if (C.decoder) {
        var Z = C.decoder.end();
        Z && Z.length && (C.buffer.push(Z), C.length += C.objectMode ? 1 : Z.length);
      }
      C.ended = !0, $(U);
    }
  }
  function $(U) {
    var C = U._readableState;
    C.needReadable = !1, C.emittedReadable || (g("emitReadable", C.flowing), C.emittedReadable = !0, C.sync ? e.nextTick(B, U) : B(U));
  }
  function B(U) {
    g("emit readable"), U.emit("readable"), F(U);
  }
  function P(U, C) {
    C.readingMore || (C.readingMore = !0, e.nextTick(H, U, C));
  }
  function H(U, C) {
    for (var Z = C.length; !C.reading && !C.flowing && !C.ended && C.length < C.highWaterMark && (g("maybeReadMore read 0"), U.read(0), Z !== C.length); )
      Z = C.length;
    C.readingMore = !1;
  }
  l.prototype._read = function(U) {
    this.emit("error", new Error("_read() is not implemented"));
  }, l.prototype.pipe = function(U, C) {
    var Z = this, K = this._readableState;
    switch (K.pipesCount) {
      case 0:
        K.pipes = U;
        break;
      case 1:
        K.pipes = [K.pipes, U];
        break;
      default:
        K.pipes.push(U);
        break;
    }
    K.pipesCount += 1, g("pipe count=%d opts=%j", K.pipesCount, C);
    var R = (!C || C.end !== !1) && U !== process.stdout && U !== process.stderr, M = R ? ne : I;
    K.endEmitted ? e.nextTick(M) : Z.once("end", M), U.on("unpipe", V);
    function V(N, G) {
      g("onunpipe"), N === Z && G && G.hasUnpiped === !1 && (G.hasUnpiped = !0, Ue());
    }
    function ne() {
      g("onend"), U.end();
    }
    var oe = Q(Z);
    U.on("drain", oe);
    var le = !1;
    function Ue() {
      g("cleanup"), U.removeListener("close", lr), U.removeListener("finish", ve), U.removeListener("drain", oe), U.removeListener("error", rt), U.removeListener("unpipe", V), Z.removeListener("end", ne), Z.removeListener("end", I), Z.removeListener("data", Jt), le = !0, K.awaitDrain && (!U._writableState || U._writableState.needDrain) && oe();
    }
    var Ne = !1;
    Z.on("data", Jt);
    function Jt(N) {
      g("ondata"), Ne = !1;
      var G = U.write(N);
      G === !1 && !Ne && ((K.pipesCount === 1 && K.pipes === U || K.pipesCount > 1 && J(K.pipes, U) !== -1) && !le && (g("false write response, pause", K.awaitDrain), K.awaitDrain++, Ne = !0), Z.pause());
    }
    function rt(N) {
      g("onerror", N), I(), U.removeListener("error", rt), r(U, "error") === 0 && U.emit("error", N);
    }
    y(U, "error", rt);
    function lr() {
      U.removeListener("finish", ve), I();
    }
    U.once("close", lr);
    function ve() {
      g("onfinish"), U.removeListener("close", lr), I();
    }
    U.once("finish", ve);
    function I() {
      g("unpipe"), Z.unpipe(U);
    }
    return U.emit("pipe", Z), K.flowing || (g("pipe resume"), Z.resume()), U;
  };
  function Q(U) {
    return function() {
      var C = U._readableState;
      g("pipeOnDrain", C.awaitDrain), C.awaitDrain && C.awaitDrain--, C.awaitDrain === 0 && r(U, "data") && (C.flowing = !0, F(U));
    };
  }
  l.prototype.unpipe = function(U) {
    var C = this._readableState, Z = { hasUnpiped: !1 };
    if (C.pipesCount === 0) return this;
    if (C.pipesCount === 1)
      return U && U !== C.pipes ? this : (U || (U = C.pipes), C.pipes = null, C.pipesCount = 0, C.flowing = !1, U && U.emit("unpipe", this, Z), this);
    if (!U) {
      var K = C.pipes, R = C.pipesCount;
      C.pipes = null, C.pipesCount = 0, C.flowing = !1;
      for (var M = 0; M < R; M++)
        K[M].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var V = J(C.pipes, U);
    return V === -1 ? this : (C.pipes.splice(V, 1), C.pipesCount -= 1, C.pipesCount === 1 && (C.pipes = C.pipes[0]), U.emit("unpipe", this, Z), this);
  }, l.prototype.on = function(U, C) {
    var Z = i.prototype.on.call(this, U, C);
    if (U === "data")
      this._readableState.flowing !== !1 && this.resume();
    else if (U === "readable") {
      var K = this._readableState;
      !K.endEmitted && !K.readableListening && (K.readableListening = K.needReadable = !0, K.emittedReadable = !1, K.reading ? K.length && $(this) : e.nextTick(A, this));
    }
    return Z;
  }, l.prototype.addListener = l.prototype.on;
  function A(U) {
    g("readable nexttick read 0"), U.read(0);
  }
  l.prototype.resume = function() {
    var U = this._readableState;
    return U.flowing || (g("resume"), U.flowing = !0, T(this, U)), this;
  };
  function T(U, C) {
    C.resumeScheduled || (C.resumeScheduled = !0, e.nextTick(_, U, C));
  }
  function _(U, C) {
    C.reading || (g("resume read 0"), U.read(0)), C.resumeScheduled = !1, C.awaitDrain = 0, U.emit("resume"), F(U), C.flowing && !C.reading && U.read(0);
  }
  l.prototype.pause = function() {
    return g("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (g("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
  };
  function F(U) {
    var C = U._readableState;
    for (g("flow", C.flowing); C.flowing && U.read() !== null; )
      ;
  }
  l.prototype.wrap = function(U) {
    var C = this, Z = this._readableState, K = !1;
    U.on("end", function() {
      if (g("wrapped end"), Z.decoder && !Z.ended) {
        var V = Z.decoder.end();
        V && V.length && C.push(V);
      }
      C.push(null);
    }), U.on("data", function(V) {
      if (g("wrapped data"), Z.decoder && (V = Z.decoder.write(V)), !(Z.objectMode && V == null) && !(!Z.objectMode && (!V || !V.length))) {
        var ne = C.push(V);
        ne || (K = !0, U.pause());
      }
    });
    for (var R in U)
      this[R] === void 0 && typeof U[R] == "function" && (this[R] = /* @__PURE__ */ function(V) {
        return function() {
          return U[V].apply(U, arguments);
        };
      }(R));
    for (var M = 0; M < m.length; M++)
      U.on(m[M], this.emit.bind(this, m[M]));
    return this._read = function(V) {
      g("wrapped _read", V), K && (K = !1, U.resume());
    }, this;
  }, Object.defineProperty(l.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), l._fromList = O;
  function O(U, C) {
    if (C.length === 0) return null;
    var Z;
    return C.objectMode ? Z = C.buffer.shift() : !U || U >= C.length ? (C.decoder ? Z = C.buffer.join("") : C.buffer.length === 1 ? Z = C.buffer.head.data : Z = C.buffer.concat(C.length), C.buffer.clear()) : Z = L(U, C.buffer, C.decoder), Z;
  }
  function L(U, C, Z) {
    var K;
    return U < C.head.data.length ? (K = C.head.data.slice(0, U), C.head.data = C.head.data.slice(U)) : U === C.head.data.length ? K = C.shift() : K = Z ? S(U, C) : z(U, C), K;
  }
  function S(U, C) {
    var Z = C.head, K = 1, R = Z.data;
    for (U -= R.length; Z = Z.next; ) {
      var M = Z.data, V = U > M.length ? M.length : U;
      if (V === M.length ? R += M : R += M.slice(0, U), U -= V, U === 0) {
        V === M.length ? (++K, Z.next ? C.head = Z.next : C.head = C.tail = null) : (C.head = Z, Z.data = M.slice(V));
        break;
      }
      ++K;
    }
    return C.length -= K, R;
  }
  function z(U, C) {
    var Z = a.allocUnsafe(U), K = C.head, R = 1;
    for (K.data.copy(Z), U -= K.data.length; K = K.next; ) {
      var M = K.data, V = U > M.length ? M.length : U;
      if (M.copy(Z, Z.length - U, 0, V), U -= V, U === 0) {
        V === M.length ? (++R, K.next ? C.head = K.next : C.head = C.tail = null) : (C.head = K, K.data = M.slice(V));
        break;
      }
      ++R;
    }
    return C.length -= R, Z;
  }
  function ee(U) {
    var C = U._readableState;
    if (C.length > 0) throw new Error('"endReadable()" called on non-empty stream');
    C.endEmitted || (C.ended = !0, e.nextTick(te, C, U));
  }
  function te(U, C) {
    !U.endEmitted && U.length === 0 && (U.endEmitted = !0, C.readable = !1, C.emit("end"));
  }
  function J(U, C) {
    for (var Z = 0, K = U.length; Z < K; Z++)
      if (U[Z] === C) return Z;
    return -1;
  }
  return fs;
}
var hs, ph;
function Q2() {
  if (ph) return hs;
  ph = 1, hs = r;
  var e = Rr(), t = Object.create(zi());
  t.inherits = qi(), t.inherits(r, e);
  function n(o, c) {
    var u = this._transformState;
    u.transforming = !1;
    var s = u.writecb;
    if (!s)
      return this.emit("error", new Error("write callback called multiple times"));
    u.writechunk = null, u.writecb = null, c != null && this.push(c), s(o);
    var d = this._readableState;
    d.reading = !1, (d.needReadable || d.length < d.highWaterMark) && this._read(d.highWaterMark);
  }
  function r(o) {
    if (!(this instanceof r)) return new r(o);
    e.call(this, o), this._transformState = {
      afterTransform: n.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, o && (typeof o.transform == "function" && (this._transform = o.transform), typeof o.flush == "function" && (this._flush = o.flush)), this.on("prefinish", i);
  }
  function i() {
    var o = this;
    typeof this._flush == "function" ? this._flush(function(c, u) {
      a(o, c, u);
    }) : a(this, null, null);
  }
  r.prototype.push = function(o, c) {
    return this._transformState.needTransform = !1, e.prototype.push.call(this, o, c);
  }, r.prototype._transform = function(o, c, u) {
    throw new Error("_transform() is not implemented");
  }, r.prototype._write = function(o, c, u) {
    var s = this._transformState;
    if (s.writecb = u, s.writechunk = o, s.writeencoding = c, !s.transforming) {
      var d = this._readableState;
      (s.needTransform || d.needReadable || d.length < d.highWaterMark) && this._read(d.highWaterMark);
    }
  }, r.prototype._read = function(o) {
    var c = this._transformState;
    c.writechunk !== null && c.writecb && !c.transforming ? (c.transforming = !0, this._transform(c.writechunk, c.writeencoding, c.afterTransform)) : c.needTransform = !0;
  }, r.prototype._destroy = function(o, c) {
    var u = this;
    e.prototype._destroy.call(this, o, function(s) {
      c(s), u.emit("close");
    });
  };
  function a(o, c, u) {
    if (c) return o.emit("error", c);
    if (u != null && o.push(u), o._writableState.length) throw new Error("Calling transform done when ws.length != 0");
    if (o._transformState.transforming) throw new Error("Calling transform done when still transforming");
    return o.push(null);
  }
  return hs;
}
var ps, gh;
function OT() {
  if (gh) return ps;
  gh = 1, ps = n;
  var e = Q2(), t = Object.create(zi());
  t.inherits = qi(), t.inherits(n, e);
  function n(r) {
    if (!(this instanceof n)) return new n(r);
    e.call(this, r);
  }
  return n.prototype._transform = function(r, i, a) {
    a(null, r);
  }, ps;
}
var mh;
function eb() {
  return mh || (mh = 1, function(e, t) {
    var n = $g;
    process.env.READABLE_STREAM === "disable" && n ? (e.exports = n, t = e.exports = n.Readable, t.Readable = n.Readable, t.Writable = n.Writable, t.Duplex = n.Duplex, t.Transform = n.Transform, t.PassThrough = n.PassThrough, t.Stream = n) : (t = e.exports = J2(), t.Stream = n || t, t.Readable = t, t.Writable = K2(), t.Duplex = Rr(), t.Transform = Q2(), t.PassThrough = OT());
  }(sa, sa.exports)), sa.exports;
}
var bh, ha;
Be.base64 = !0;
Be.array = !0;
Be.string = !0;
Be.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u";
Be.nodebuffer = typeof Buffer < "u";
Be.uint8array = typeof Uint8Array < "u";
if (typeof ArrayBuffer > "u")
  ha = Be.blob = !1;
else {
  var yh = new ArrayBuffer(0);
  try {
    ha = Be.blob = new Blob([yh], {
      type: "application/zip"
    }).size === 0;
  } catch {
    try {
      var IT = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder, vh = new IT();
      vh.append(yh), ha = Be.blob = vh.getBlob("application/zip").size === 0;
    } catch {
      ha = Be.blob = !1;
    }
  }
}
try {
  bh = Be.nodestream = !!eb().Readable;
} catch {
  bh = Be.nodestream = !1;
}
var pa = {}, Dh;
function tb() {
  if (Dh) return pa;
  Dh = 1;
  var e = Ae(), t = Be, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  return pa.encode = function(r) {
    for (var i = [], a, o, c, u, s, d, g, f = 0, p = r.length, b = p, m = e.getTypeOf(r) !== "string"; f < r.length; )
      b = p - f, m ? (a = r[f++], o = f < p ? r[f++] : 0, c = f < p ? r[f++] : 0) : (a = r.charCodeAt(f++), o = f < p ? r.charCodeAt(f++) : 0, c = f < p ? r.charCodeAt(f++) : 0), u = a >> 2, s = (a & 3) << 4 | o >> 4, d = b > 1 ? (o & 15) << 2 | c >> 6 : 64, g = b > 2 ? c & 63 : 64, i.push(n.charAt(u) + n.charAt(s) + n.charAt(d) + n.charAt(g));
    return i.join("");
  }, pa.decode = function(r) {
    var i, a, o, c, u, s, d, g = 0, f = 0, p = "data:";
    if (r.substr(0, p.length) === p)
      throw new Error("Invalid base64 input, it looks like a data url.");
    r = r.replace(/[^A-Za-z0-9+/=]/g, "");
    var b = r.length * 3 / 4;
    if (r.charAt(r.length - 1) === n.charAt(64) && b--, r.charAt(r.length - 2) === n.charAt(64) && b--, b % 1 !== 0)
      throw new Error("Invalid base64 input, bad content length.");
    var m;
    for (t.uint8array ? m = new Uint8Array(b | 0) : m = new Array(b | 0); g < r.length; )
      c = n.indexOf(r.charAt(g++)), u = n.indexOf(r.charAt(g++)), s = n.indexOf(r.charAt(g++)), d = n.indexOf(r.charAt(g++)), i = c << 2 | u >> 4, a = (u & 15) << 4 | s >> 2, o = (s & 3) << 6 | d, m[f++] = i, s !== 64 && (m[f++] = a), d !== 64 && (m[f++] = o);
    return m;
  }, pa;
}
var To = {
  /**
   * True if this is running in Nodejs, will be undefined in a browser.
   * In a browser, browserify won't include this file and the whole module
   * will be resolved an empty object.
   */
  isNode: typeof Buffer < "u",
  /**
   * Create a new nodejs Buffer from an existing content.
   * @param {Object} data the data to pass to the constructor.
   * @param {String} encoding the encoding to use.
   * @return {Buffer} a new Buffer.
   */
  newBufferFrom: function(e, t) {
    if (Buffer.from && Buffer.from !== Uint8Array.from)
      return Buffer.from(e, t);
    if (typeof e == "number")
      throw new Error('The "data" argument must not be a number');
    return new Buffer(e, t);
  },
  /**
   * Create a new nodejs Buffer with the specified size.
   * @param {Integer} size the size of the buffer.
   * @return {Buffer} a new Buffer.
   */
  allocBuffer: function(e) {
    if (Buffer.alloc)
      return Buffer.alloc(e);
    var t = new Buffer(e);
    return t.fill(0), t;
  },
  /**
   * Find out if an object is a Buffer.
   * @param {Object} b the object to test.
   * @return {Boolean} true if the object is a Buffer, false otherwise.
   */
  isBuffer: function(e) {
    return Buffer.isBuffer(e);
  },
  isStream: function(e) {
    return e && typeof e.on == "function" && typeof e.pause == "function" && typeof e.resume == "function";
  }
}, gs, xh;
function WT() {
  if (xh) return gs;
  xh = 1;
  var e = re.MutationObserver || re.WebKitMutationObserver, t;
  if (process.browser)
    if (e) {
      var n = 0, r = new e(u), i = re.document.createTextNode("");
      r.observe(i, {
        characterData: !0
      }), t = function() {
        i.data = n = ++n % 2;
      };
    } else if (!re.setImmediate && typeof re.MessageChannel < "u") {
      var a = new re.MessageChannel();
      a.port1.onmessage = u, t = function() {
        a.port2.postMessage(0);
      };
    } else "document" in re && "onreadystatechange" in re.document.createElement("script") ? t = function() {
      var d = re.document.createElement("script");
      d.onreadystatechange = function() {
        u(), d.onreadystatechange = null, d.parentNode.removeChild(d), d = null;
      }, re.document.documentElement.appendChild(d);
    } : t = function() {
      setTimeout(u, 0);
    };
  else
    t = function() {
      process.nextTick(u);
    };
  var o, c = [];
  function u() {
    o = !0;
    for (var d, g, f = c.length; f; ) {
      for (g = c, c = [], d = -1; ++d < f; )
        g[d]();
      f = c.length;
    }
    o = !1;
  }
  gs = s;
  function s(d) {
    c.push(d) === 1 && !o && t();
  }
  return gs;
}
var ms, _h;
function NT() {
  if (_h) return ms;
  _h = 1;
  var e = WT();
  function t() {
  }
  var n = {}, r = ["REJECTED"], i = ["FULFILLED"], a = ["PENDING"];
  if (!process.browser)
    var o = ["UNHANDLED"];
  ms = c;
  function c(h) {
    if (typeof h != "function")
      throw new TypeError("resolver must be a function");
    this.state = a, this.queue = [], this.outcome = void 0, process.browser || (this.handled = o), h !== t && g(this, h);
  }
  c.prototype.finally = function(h) {
    if (typeof h != "function")
      return this;
    var l = this.constructor;
    return this.then(v, D);
    function v(x) {
      function w() {
        return x;
      }
      return l.resolve(h()).then(w);
    }
    function D(x) {
      function w() {
        throw x;
      }
      return l.resolve(h()).then(w);
    }
  }, c.prototype.catch = function(h) {
    return this.then(null, h);
  }, c.prototype.then = function(h, l) {
    if (typeof h != "function" && this.state === i || typeof l != "function" && this.state === r)
      return this;
    var v = new this.constructor(t);
    if (process.browser || this.handled === o && (this.handled = null), this.state !== a) {
      var D = this.state === i ? h : l;
      s(v, D, this.outcome);
    } else
      this.queue.push(new u(v, h, l));
    return v;
  };
  function u(h, l, v) {
    this.promise = h, typeof l == "function" && (this.onFulfilled = l, this.callFulfilled = this.otherCallFulfilled), typeof v == "function" && (this.onRejected = v, this.callRejected = this.otherCallRejected);
  }
  u.prototype.callFulfilled = function(h) {
    n.resolve(this.promise, h);
  }, u.prototype.otherCallFulfilled = function(h) {
    s(this.promise, this.onFulfilled, h);
  }, u.prototype.callRejected = function(h) {
    n.reject(this.promise, h);
  }, u.prototype.otherCallRejected = function(h) {
    s(this.promise, this.onRejected, h);
  };
  function s(h, l, v) {
    e(function() {
      var D;
      try {
        D = l(v);
      } catch (x) {
        return n.reject(h, x);
      }
      D === h ? n.reject(h, new TypeError("Cannot resolve promise with itself")) : n.resolve(h, D);
    });
  }
  n.resolve = function(h, l) {
    var v = f(d, l);
    if (v.status === "error")
      return n.reject(h, v.value);
    var D = v.value;
    if (D)
      g(h, D);
    else {
      h.state = i, h.outcome = l;
      for (var x = -1, w = h.queue.length; ++x < w; )
        h.queue[x].callFulfilled(l);
    }
    return h;
  }, n.reject = function(h, l) {
    h.state = r, h.outcome = l, process.browser || h.handled === o && e(function() {
      h.handled === o && process.emit("unhandledRejection", l, h);
    });
    for (var v = -1, D = h.queue.length; ++v < D; )
      h.queue[v].callRejected(l);
    return h;
  };
  function d(h) {
    var l = h && h.then;
    if (h && (typeof h == "object" || typeof h == "function") && typeof l == "function")
      return function() {
        l.apply(h, arguments);
      };
  }
  function g(h, l) {
    var v = !1;
    function D(k) {
      v || (v = !0, n.reject(h, k));
    }
    function x(k) {
      v || (v = !0, n.resolve(h, k));
    }
    function w() {
      l(x, D);
    }
    var E = f(w);
    E.status === "error" && D(E.value);
  }
  function f(h, l) {
    var v = {};
    try {
      v.value = h(l), v.status = "success";
    } catch (D) {
      v.status = "error", v.value = D;
    }
    return v;
  }
  c.resolve = p;
  function p(h) {
    return h instanceof this ? h : n.resolve(new this(t), h);
  }
  c.reject = b;
  function b(h) {
    var l = new this(t);
    return n.reject(l, h);
  }
  c.all = m;
  function m(h) {
    var l = this;
    if (Object.prototype.toString.call(h) !== "[object Array]")
      return this.reject(new TypeError("must be an array"));
    var v = h.length, D = !1;
    if (!v)
      return this.resolve([]);
    for (var x = new Array(v), w = 0, E = -1, k = new this(t); ++E < v; )
      W(h[E], E);
    return k;
    function W(q, $) {
      l.resolve(q).then(B, function(P) {
        D || (D = !0, n.reject(k, P));
      });
      function B(P) {
        x[$] = P, ++w === v && !D && (D = !0, n.resolve(k, x));
      }
    }
  }
  c.race = y;
  function y(h) {
    var l = this;
    if (Object.prototype.toString.call(h) !== "[object Array]")
      return this.reject(new TypeError("must be an array"));
    var v = h.length, D = !1;
    if (!v)
      return this.resolve([]);
    for (var x = -1, w = new this(t); ++x < v; )
      E(h[x]);
    return w;
    function E(k) {
      l.resolve(k).then(function(W) {
        D || (D = !0, n.resolve(w, W));
      }, function(W) {
        D || (D = !0, n.reject(w, W));
      });
    }
  }
  return ms;
}
var xu = null;
typeof Promise < "u" ? xu = Promise : xu = NT();
var ji = {
  Promise: xu
};
(function(e, t) {
  if (e.setImmediate)
    return;
  var n = 1, r = {}, i = !1, a = e.document, o;
  function c(l) {
    typeof l != "function" && (l = new Function("" + l));
    for (var v = new Array(arguments.length - 1), D = 0; D < v.length; D++)
      v[D] = arguments[D + 1];
    var x = { callback: l, args: v };
    return r[n] = x, o(n), n++;
  }
  function u(l) {
    delete r[l];
  }
  function s(l) {
    var v = l.callback, D = l.args;
    switch (D.length) {
      case 0:
        v();
        break;
      case 1:
        v(D[0]);
        break;
      case 2:
        v(D[0], D[1]);
        break;
      case 3:
        v(D[0], D[1], D[2]);
        break;
      default:
        v.apply(t, D);
        break;
    }
  }
  function d(l) {
    if (i)
      setTimeout(d, 0, l);
    else {
      var v = r[l];
      if (v) {
        i = !0;
        try {
          s(v);
        } finally {
          u(l), i = !1;
        }
      }
    }
  }
  function g() {
    o = function(l) {
      process.nextTick(function() {
        d(l);
      });
    };
  }
  function f() {
    if (e.postMessage && !e.importScripts) {
      var l = !0, v = e.onmessage;
      return e.onmessage = function() {
        l = !1;
      }, e.postMessage("", "*"), e.onmessage = v, l;
    }
  }
  function p() {
    var l = "setImmediate$" + Math.random() + "$", v = function(D) {
      D.source === e && typeof D.data == "string" && D.data.indexOf(l) === 0 && d(+D.data.slice(l.length));
    };
    e.addEventListener ? e.addEventListener("message", v, !1) : e.attachEvent("onmessage", v), o = function(D) {
      e.postMessage(l + D, "*");
    };
  }
  function b() {
    var l = new MessageChannel();
    l.port1.onmessage = function(v) {
      var D = v.data;
      d(D);
    }, o = function(v) {
      l.port2.postMessage(v);
    };
  }
  function m() {
    var l = a.documentElement;
    o = function(v) {
      var D = a.createElement("script");
      D.onreadystatechange = function() {
        d(v), D.onreadystatechange = null, l.removeChild(D), D = null;
      }, l.appendChild(D);
    };
  }
  function y() {
    o = function(l) {
      setTimeout(d, 0, l);
    };
  }
  var h = Object.getPrototypeOf && Object.getPrototypeOf(e);
  h = h && h.setTimeout ? h : e, {}.toString.call(e.process) === "[object process]" ? g() : f() ? p() : e.MessageChannel ? b() : a && "onreadystatechange" in a.createElement("script") ? m() : y(), h.setImmediate = c, h.clearImmediate = u;
})(typeof self > "u" ? re : self);
var wh;
function Ae() {
  return wh || (wh = 1, function(e) {
    var t = Be, n = tb(), r = To, i = ji;
    function a(f) {
      var p = null;
      return t.uint8array ? p = new Uint8Array(f.length) : p = new Array(f.length), c(f, p);
    }
    e.newBlob = function(f, p) {
      e.checkSupport("blob");
      try {
        return new Blob([f], {
          type: p
        });
      } catch {
        try {
          var b = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder, m = new b();
          return m.append(f), m.getBlob(p);
        } catch {
          throw new Error("Bug : can't construct the Blob.");
        }
      }
    };
    function o(f) {
      return f;
    }
    function c(f, p) {
      for (var b = 0; b < f.length; ++b)
        p[b] = f.charCodeAt(b) & 255;
      return p;
    }
    var u = {
      /**
       * Transform an array of int into a string, chunk by chunk.
       * See the performances notes on arrayLikeToString.
       * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
       * @param {String} type the type of the array.
       * @param {Integer} chunk the chunk size.
       * @return {String} the resulting string.
       * @throws Error if the chunk is too big for the stack.
       */
      stringifyByChunk: function(f, p, b) {
        var m = [], y = 0, h = f.length;
        if (h <= b)
          return String.fromCharCode.apply(null, f);
        for (; y < h; )
          p === "array" || p === "nodebuffer" ? m.push(String.fromCharCode.apply(null, f.slice(y, Math.min(y + b, h)))) : m.push(String.fromCharCode.apply(null, f.subarray(y, Math.min(y + b, h)))), y += b;
        return m.join("");
      },
      /**
       * Call String.fromCharCode on every item in the array.
       * This is the naive implementation, which generate A LOT of intermediate string.
       * This should be used when everything else fail.
       * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
       * @return {String} the result.
       */
      stringifyByChar: function(f) {
        for (var p = "", b = 0; b < f.length; b++)
          p += String.fromCharCode(f[b]);
        return p;
      },
      applyCanBeUsed: {
        /**
         * true if the browser accepts to use String.fromCharCode on Uint8Array
         */
        uint8array: function() {
          try {
            return t.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
          } catch {
            return !1;
          }
        }(),
        /**
         * true if the browser accepts to use String.fromCharCode on nodejs Buffer.
         */
        nodebuffer: function() {
          try {
            return t.nodebuffer && String.fromCharCode.apply(null, r.allocBuffer(1)).length === 1;
          } catch {
            return !1;
          }
        }()
      }
    };
    function s(f) {
      var p = 65536, b = e.getTypeOf(f), m = !0;
      if (b === "uint8array" ? m = u.applyCanBeUsed.uint8array : b === "nodebuffer" && (m = u.applyCanBeUsed.nodebuffer), m)
        for (; p > 1; )
          try {
            return u.stringifyByChunk(f, b, p);
          } catch {
            p = Math.floor(p / 2);
          }
      return u.stringifyByChar(f);
    }
    e.applyFromCharCode = s;
    function d(f, p) {
      for (var b = 0; b < f.length; b++)
        p[b] = f[b];
      return p;
    }
    var g = {};
    g.string = {
      string: o,
      array: function(f) {
        return c(f, new Array(f.length));
      },
      arraybuffer: function(f) {
        return g.string.uint8array(f).buffer;
      },
      uint8array: function(f) {
        return c(f, new Uint8Array(f.length));
      },
      nodebuffer: function(f) {
        return c(f, r.allocBuffer(f.length));
      }
    }, g.array = {
      string: s,
      array: o,
      arraybuffer: function(f) {
        return new Uint8Array(f).buffer;
      },
      uint8array: function(f) {
        return new Uint8Array(f);
      },
      nodebuffer: function(f) {
        return r.newBufferFrom(f);
      }
    }, g.arraybuffer = {
      string: function(f) {
        return s(new Uint8Array(f));
      },
      array: function(f) {
        return d(new Uint8Array(f), new Array(f.byteLength));
      },
      arraybuffer: o,
      uint8array: function(f) {
        return new Uint8Array(f);
      },
      nodebuffer: function(f) {
        return r.newBufferFrom(new Uint8Array(f));
      }
    }, g.uint8array = {
      string: s,
      array: function(f) {
        return d(f, new Array(f.length));
      },
      arraybuffer: function(f) {
        return f.buffer;
      },
      uint8array: o,
      nodebuffer: function(f) {
        return r.newBufferFrom(f);
      }
    }, g.nodebuffer = {
      string: s,
      array: function(f) {
        return d(f, new Array(f.length));
      },
      arraybuffer: function(f) {
        return g.nodebuffer.uint8array(f).buffer;
      },
      uint8array: function(f) {
        return d(f, new Uint8Array(f.length));
      },
      nodebuffer: o
    }, e.transformTo = function(f, p) {
      if (p || (p = ""), !f)
        return p;
      e.checkSupport(f);
      var b = e.getTypeOf(p), m = g[b][f](p);
      return m;
    }, e.resolve = function(f) {
      for (var p = f.split("/"), b = [], m = 0; m < p.length; m++) {
        var y = p[m];
        y === "." || y === "" && m !== 0 && m !== p.length - 1 || (y === ".." ? b.pop() : b.push(y));
      }
      return b.join("/");
    }, e.getTypeOf = function(f) {
      if (typeof f == "string")
        return "string";
      if (Object.prototype.toString.call(f) === "[object Array]")
        return "array";
      if (t.nodebuffer && r.isBuffer(f))
        return "nodebuffer";
      if (t.uint8array && f instanceof Uint8Array)
        return "uint8array";
      if (t.arraybuffer && f instanceof ArrayBuffer)
        return "arraybuffer";
    }, e.checkSupport = function(f) {
      var p = t[f.toLowerCase()];
      if (!p)
        throw new Error(f + " is not supported by this platform");
    }, e.MAX_VALUE_16BITS = 65535, e.MAX_VALUE_32BITS = -1, e.pretty = function(f) {
      var p = "", b, m;
      for (m = 0; m < (f || "").length; m++)
        b = f.charCodeAt(m), p += "\\x" + (b < 16 ? "0" : "") + b.toString(16).toUpperCase();
      return p;
    }, e.delay = function(f, p, b) {
      setImmediate(function() {
        f.apply(b || null, p || []);
      });
    }, e.inherits = function(f, p) {
      var b = function() {
      };
      b.prototype = p.prototype, f.prototype = new b();
    }, e.extend = function() {
      var f = {}, p, b;
      for (p = 0; p < arguments.length; p++)
        for (b in arguments[p])
          Object.prototype.hasOwnProperty.call(arguments[p], b) && typeof f[b] > "u" && (f[b] = arguments[p][b]);
      return f;
    }, e.prepareContent = function(f, p, b, m, y) {
      var h = i.Promise.resolve(p).then(function(l) {
        var v = t.blob && (l instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(l)) !== -1);
        return v && typeof FileReader < "u" ? new i.Promise(function(D, x) {
          var w = new FileReader();
          w.onload = function(E) {
            D(E.target.result);
          }, w.onerror = function(E) {
            x(E.target.error);
          }, w.readAsArrayBuffer(l);
        }) : l;
      });
      return h.then(function(l) {
        var v = e.getTypeOf(l);
        return v ? (v === "arraybuffer" ? l = e.transformTo("uint8array", l) : v === "string" && (y ? l = n.decode(l) : b && m !== !0 && (l = a(l))), l) : i.Promise.reject(
          new Error("Can't read the data of '" + f + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?")
        );
      });
    };
  }(rs)), rs;
}
function nb(e) {
  this.name = e || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
    data: [],
    end: [],
    error: []
  }, this.previous = null;
}
nb.prototype = {
  /**
   * Push a chunk to the next workers.
   * @param {Object} chunk the chunk to push
   */
  push: function(e) {
    this.emit("data", e);
  },
  /**
   * End the stream.
   * @return {Boolean} true if this call ended the worker, false otherwise.
   */
  end: function() {
    if (this.isFinished)
      return !1;
    this.flush();
    try {
      this.emit("end"), this.cleanUp(), this.isFinished = !0;
    } catch (e) {
      this.emit("error", e);
    }
    return !0;
  },
  /**
   * End the stream with an error.
   * @param {Error} e the error which caused the premature end.
   * @return {Boolean} true if this call ended the worker with an error, false otherwise.
   */
  error: function(e) {
    return this.isFinished ? !1 : (this.isPaused ? this.generatedError = e : (this.isFinished = !0, this.emit("error", e), this.previous && this.previous.error(e), this.cleanUp()), !0);
  },
  /**
   * Add a callback on an event.
   * @param {String} name the name of the event (data, end, error)
   * @param {Function} listener the function to call when the event is triggered
   * @return {GenericWorker} the current object for chainability
   */
  on: function(e, t) {
    return this._listeners[e].push(t), this;
  },
  /**
   * Clean any references when a worker is ending.
   */
  cleanUp: function() {
    this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
  },
  /**
   * Trigger an event. This will call registered callback with the provided arg.
   * @param {String} name the name of the event (data, end, error)
   * @param {Object} arg the argument to call the callback with.
   */
  emit: function(e, t) {
    if (this._listeners[e])
      for (var n = 0; n < this._listeners[e].length; n++)
        this._listeners[e][n].call(this, t);
  },
  /**
   * Chain a worker with an other.
   * @param {Worker} next the worker receiving events from the current one.
   * @return {worker} the next worker for chainability
   */
  pipe: function(e) {
    return e.registerPrevious(this);
  },
  /**
   * Same as `pipe` in the other direction.
   * Using an API with `pipe(next)` is very easy.
   * Implementing the API with the point of view of the next one registering
   * a source is easier, see the ZipFileWorker.
   * @param {Worker} previous the previous worker, sending events to this one
   * @return {Worker} the current worker for chainability
   */
  registerPrevious: function(e) {
    if (this.isLocked)
      throw new Error("The stream '" + this + "' has already been used.");
    this.streamInfo = e.streamInfo, this.mergeStreamInfo(), this.previous = e;
    var t = this;
    return e.on("data", function(n) {
      t.processChunk(n);
    }), e.on("end", function() {
      t.end();
    }), e.on("error", function(n) {
      t.error(n);
    }), this;
  },
  /**
   * Pause the stream so it doesn't send events anymore.
   * @return {Boolean} true if this call paused the worker, false otherwise.
   */
  pause: function() {
    return this.isPaused || this.isFinished ? !1 : (this.isPaused = !0, this.previous && this.previous.pause(), !0);
  },
  /**
   * Resume a paused stream.
   * @return {Boolean} true if this call resumed the worker, false otherwise.
   */
  resume: function() {
    if (!this.isPaused || this.isFinished)
      return !1;
    this.isPaused = !1;
    var e = !1;
    return this.generatedError && (this.error(this.generatedError), e = !0), this.previous && this.previous.resume(), !e;
  },
  /**
   * Flush any remaining bytes as the stream is ending.
   */
  flush: function() {
  },
  /**
   * Process a chunk. This is usually the method overridden.
   * @param {Object} chunk the chunk to process.
   */
  processChunk: function(e) {
    this.push(e);
  },
  /**
   * Add a key/value to be added in the workers chain streamInfo once activated.
   * @param {String} key the key to use
   * @param {Object} value the associated value
   * @return {Worker} the current worker for chainability
   */
  withStreamInfo: function(e, t) {
    return this.extraStreamInfo[e] = t, this.mergeStreamInfo(), this;
  },
  /**
   * Merge this worker's streamInfo into the chain's streamInfo.
   */
  mergeStreamInfo: function() {
    for (var e in this.extraStreamInfo)
      Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e) && (this.streamInfo[e] = this.extraStreamInfo[e]);
  },
  /**
   * Lock the stream to prevent further updates on the workers chain.
   * After calling this method, all calls to pipe will fail.
   */
  lock: function() {
    if (this.isLocked)
      throw new Error("The stream '" + this + "' has already been used.");
    this.isLocked = !0, this.previous && this.previous.lock();
  },
  /**
   *
   * Pretty print the workers chain.
   */
  toString: function() {
    var e = "Worker " + this.name;
    return this.previous ? this.previous + " -> " + e : e;
  }
};
var Ct = nb;
(function(e) {
  for (var t = Ae(), n = Be, r = To, i = Ct, a = new Array(256), o = 0; o < 256; o++)
    a[o] = o >= 252 ? 6 : o >= 248 ? 5 : o >= 240 ? 4 : o >= 224 ? 3 : o >= 192 ? 2 : 1;
  a[254] = a[254] = 1;
  var c = function(f) {
    var p, b, m, y, h, l = f.length, v = 0;
    for (y = 0; y < l; y++)
      b = f.charCodeAt(y), (b & 64512) === 55296 && y + 1 < l && (m = f.charCodeAt(y + 1), (m & 64512) === 56320 && (b = 65536 + (b - 55296 << 10) + (m - 56320), y++)), v += b < 128 ? 1 : b < 2048 ? 2 : b < 65536 ? 3 : 4;
    for (n.uint8array ? p = new Uint8Array(v) : p = new Array(v), h = 0, y = 0; h < v; y++)
      b = f.charCodeAt(y), (b & 64512) === 55296 && y + 1 < l && (m = f.charCodeAt(y + 1), (m & 64512) === 56320 && (b = 65536 + (b - 55296 << 10) + (m - 56320), y++)), b < 128 ? p[h++] = b : b < 2048 ? (p[h++] = 192 | b >>> 6, p[h++] = 128 | b & 63) : b < 65536 ? (p[h++] = 224 | b >>> 12, p[h++] = 128 | b >>> 6 & 63, p[h++] = 128 | b & 63) : (p[h++] = 240 | b >>> 18, p[h++] = 128 | b >>> 12 & 63, p[h++] = 128 | b >>> 6 & 63, p[h++] = 128 | b & 63);
    return p;
  }, u = function(f, p) {
    var b;
    for (p = p || f.length, p > f.length && (p = f.length), b = p - 1; b >= 0 && (f[b] & 192) === 128; )
      b--;
    return b < 0 || b === 0 ? p : b + a[f[b]] > p ? b : p;
  }, s = function(f) {
    var p, b, m, y, h = f.length, l = new Array(h * 2);
    for (b = 0, p = 0; p < h; ) {
      if (m = f[p++], m < 128) {
        l[b++] = m;
        continue;
      }
      if (y = a[m], y > 4) {
        l[b++] = 65533, p += y - 1;
        continue;
      }
      for (m &= y === 2 ? 31 : y === 3 ? 15 : 7; y > 1 && p < h; )
        m = m << 6 | f[p++] & 63, y--;
      if (y > 1) {
        l[b++] = 65533;
        continue;
      }
      m < 65536 ? l[b++] = m : (m -= 65536, l[b++] = 55296 | m >> 10 & 1023, l[b++] = 56320 | m & 1023);
    }
    return l.length !== b && (l.subarray ? l = l.subarray(0, b) : l.length = b), t.applyFromCharCode(l);
  };
  e.utf8encode = function(p) {
    return n.nodebuffer ? r.newBufferFrom(p, "utf-8") : c(p);
  }, e.utf8decode = function(p) {
    return n.nodebuffer ? t.transformTo("nodebuffer", p).toString("utf-8") : (p = t.transformTo(n.uint8array ? "uint8array" : "array", p), s(p));
  };
  function d() {
    i.call(this, "utf-8 decode"), this.leftOver = null;
  }
  t.inherits(d, i), d.prototype.processChunk = function(f) {
    var p = t.transformTo(n.uint8array ? "uint8array" : "array", f.data);
    if (this.leftOver && this.leftOver.length) {
      if (n.uint8array) {
        var b = p;
        p = new Uint8Array(b.length + this.leftOver.length), p.set(this.leftOver, 0), p.set(b, this.leftOver.length);
      } else
        p = this.leftOver.concat(p);
      this.leftOver = null;
    }
    var m = u(p), y = p;
    m !== p.length && (n.uint8array ? (y = p.subarray(0, m), this.leftOver = p.subarray(m, p.length)) : (y = p.slice(0, m), this.leftOver = p.slice(m, p.length))), this.push({
      data: e.utf8decode(y),
      meta: f.meta
    });
  }, d.prototype.flush = function() {
    this.leftOver && this.leftOver.length && (this.push({
      data: e.utf8decode(this.leftOver),
      meta: {}
    }), this.leftOver = null);
  }, e.Utf8DecodeWorker = d;
  function g() {
    i.call(this, "utf-8 encode");
  }
  t.inherits(g, i), g.prototype.processChunk = function(f) {
    this.push({
      data: e.utf8encode(f.data),
      meta: f.meta
    });
  }, e.Utf8EncodeWorker = g;
})(jr);
var rb = Ct, ib = Ae();
function Bd(e) {
  rb.call(this, "ConvertWorker to " + e), this.destType = e;
}
ib.inherits(Bd, rb);
Bd.prototype.processChunk = function(e) {
  this.push({
    data: ib.transformTo(this.destType, e.data),
    meta: e.meta
  });
};
var LT = Bd, bs, Th;
function MT() {
  if (Th) return bs;
  Th = 1;
  var e = eb().Readable, t = Ae();
  t.inherits(n, e);
  function n(r, i, a) {
    e.call(this, i), this._helper = r;
    var o = this;
    r.on("data", function(c, u) {
      o.push(c) || o._helper.pause(), a && a(u);
    }).on("error", function(c) {
      o.emit("error", c);
    }).on("end", function() {
      o.push(null);
    });
  }
  return n.prototype._read = function() {
    this._helper.resume();
  }, bs = n, bs;
}
var zn = Ae(), $T = LT, PT = Ct, zT = tb(), qT = Be, jT = ji, ab = null;
if (qT.nodestream)
  try {
    ab = MT();
  } catch {
  }
function ZT(e, t, n) {
  switch (e) {
    case "blob":
      return zn.newBlob(zn.transformTo("arraybuffer", t), n);
    case "base64":
      return zT.encode(t);
    default:
      return zn.transformTo(e, t);
  }
}
function XT(e, t) {
  var n, r = 0, i = null, a = 0;
  for (n = 0; n < t.length; n++)
    a += t[n].length;
  switch (e) {
    case "string":
      return t.join("");
    case "array":
      return Array.prototype.concat.apply([], t);
    case "uint8array":
      for (i = new Uint8Array(a), n = 0; n < t.length; n++)
        i.set(t[n], r), r += t[n].length;
      return i;
    case "nodebuffer":
      return Buffer.concat(t);
    default:
      throw new Error("concat : unsupported type '" + e + "'");
  }
}
function VT(e, t) {
  return new jT.Promise(function(n, r) {
    var i = [], a = e._internalType, o = e._outputType, c = e._mimeType;
    e.on("data", function(u, s) {
      i.push(u), t && t(s);
    }).on("error", function(u) {
      i = [], r(u);
    }).on("end", function() {
      try {
        var u = ZT(o, XT(a, i), c);
        n(u);
      } catch (s) {
        r(s);
      }
      i = [];
    }).resume();
  });
}
function ob(e, t, n) {
  var r = t;
  switch (t) {
    case "blob":
    case "arraybuffer":
      r = "uint8array";
      break;
    case "base64":
      r = "string";
      break;
  }
  try {
    this._internalType = r, this._outputType = t, this._mimeType = n, zn.checkSupport(r), this._worker = e.pipe(new $T(r)), e.lock();
  } catch (i) {
    this._worker = new PT("error"), this._worker.error(i);
  }
}
ob.prototype = {
  /**
   * Listen a StreamHelper, accumulate its content and concatenate it into a
   * complete block.
   * @param {Function} updateCb the update callback.
   * @return Promise the promise for the accumulation.
   */
  accumulate: function(e) {
    return VT(this, e);
  },
  /**
   * Add a listener on an event triggered on a stream.
   * @param {String} evt the name of the event
   * @param {Function} fn the listener
   * @return {StreamHelper} the current helper.
   */
  on: function(e, t) {
    var n = this;
    return e === "data" ? this._worker.on(e, function(r) {
      t.call(n, r.data, r.meta);
    }) : this._worker.on(e, function() {
      zn.delay(t, arguments, n);
    }), this;
  },
  /**
   * Resume the flow of chunks.
   * @return {StreamHelper} the current helper.
   */
  resume: function() {
    return zn.delay(this._worker.resume, [], this._worker), this;
  },
  /**
   * Pause the flow of chunks.
   * @return {StreamHelper} the current helper.
   */
  pause: function() {
    return this._worker.pause(), this;
  },
  /**
   * Return a nodejs stream for this helper.
   * @param {Function} updateCb the update callback.
   * @return {NodejsStreamOutputAdapter} the nodejs stream.
   */
  toNodejsStream: function(e) {
    if (zn.checkSupport("nodestream"), this._outputType !== "nodebuffer")
      throw new Error(this._outputType + " is not supported by this method");
    return new ab(this, {
      objectMode: this._outputType !== "nodebuffer"
    }, e);
  }
};
var cb = ob, Ft = {};
Ft.base64 = !1;
Ft.binary = !1;
Ft.dir = !1;
Ft.createFolders = !0;
Ft.date = null;
Ft.compression = null;
Ft.compressionOptions = null;
Ft.comment = null;
Ft.unixPermissions = null;
Ft.dosPermissions = null;
var Uo = Ae(), Eo = Ct, HT = 16 * 1024;
function Zr(e) {
  Eo.call(this, "DataWorker");
  var t = this;
  this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, e.then(function(n) {
    t.dataIsReady = !0, t.data = n, t.max = n && n.length || 0, t.type = Uo.getTypeOf(n), t.isPaused || t._tickAndRepeat();
  }, function(n) {
    t.error(n);
  });
}
Uo.inherits(Zr, Eo);
Zr.prototype.cleanUp = function() {
  Eo.prototype.cleanUp.call(this), this.data = null;
};
Zr.prototype.resume = function() {
  return Eo.prototype.resume.call(this) ? (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, Uo.delay(this._tickAndRepeat, [], this)), !0) : !1;
};
Zr.prototype._tickAndRepeat = function() {
  this._tickScheduled = !1, !(this.isPaused || this.isFinished) && (this._tick(), this.isFinished || (Uo.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
};
Zr.prototype._tick = function() {
  if (this.isPaused || this.isFinished)
    return !1;
  var e = HT, t = null, n = Math.min(this.max, this.index + e);
  if (this.index >= this.max)
    return this.end();
  switch (this.type) {
    case "string":
      t = this.data.substring(this.index, n);
      break;
    case "uint8array":
      t = this.data.subarray(this.index, n);
      break;
    case "array":
    case "nodebuffer":
      t = this.data.slice(this.index, n);
      break;
  }
  return this.index = n, this.push({
    data: t,
    meta: {
      percent: this.max ? this.index / this.max * 100 : 0
    }
  });
};
var sb = Zr, GT = Ae();
function YT() {
  for (var e, t = [], n = 0; n < 256; n++) {
    e = n;
    for (var r = 0; r < 8; r++)
      e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
    t[n] = e;
  }
  return t;
}
var ub = YT();
function KT(e, t, n, r) {
  var i = ub, a = r + n;
  e = e ^ -1;
  for (var o = r; o < a; o++)
    e = e >>> 8 ^ i[(e ^ t[o]) & 255];
  return e ^ -1;
}
function JT(e, t, n, r) {
  var i = ub, a = r + n;
  e = e ^ -1;
  for (var o = r; o < a; o++)
    e = e >>> 8 ^ i[(e ^ t.charCodeAt(o)) & 255];
  return e ^ -1;
}
var Rd = function(t, n) {
  if (typeof t > "u" || !t.length)
    return 0;
  var r = GT.getTypeOf(t) !== "string";
  return r ? KT(n | 0, t, t.length, 0) : JT(n | 0, t, t.length, 0);
}, db = Ct, QT = Rd, eU = Ae();
function Od() {
  db.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
}
eU.inherits(Od, db);
Od.prototype.processChunk = function(e) {
  this.streamInfo.crc32 = QT(e.data, this.streamInfo.crc32 || 0), this.push(e);
};
var lb = Od, tU = Ae(), Id = Ct;
function Wd(e) {
  Id.call(this, "DataLengthProbe for " + e), this.propName = e, this.withStreamInfo(e, 0);
}
tU.inherits(Wd, Id);
Wd.prototype.processChunk = function(e) {
  if (e) {
    var t = this.streamInfo[this.propName] || 0;
    this.streamInfo[this.propName] = t + e.data.length;
  }
  Id.prototype.processChunk.call(this, e);
};
var nU = Wd, Uh = ji, Eh = sb, rU = lb, _u = nU;
function Nd(e, t, n, r, i) {
  this.compressedSize = e, this.uncompressedSize = t, this.crc32 = n, this.compression = r, this.compressedContent = i;
}
Nd.prototype = {
  /**
   * Create a worker to get the uncompressed content.
   * @return {GenericWorker} the worker.
   */
  getContentWorker: function() {
    var e = new Eh(Uh.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new _u("data_length")), t = this;
    return e.on("end", function() {
      if (this.streamInfo.data_length !== t.uncompressedSize)
        throw new Error("Bug : uncompressed data size mismatch");
    }), e;
  },
  /**
   * Create a worker to get the compressed content.
   * @return {GenericWorker} the worker.
   */
  getCompressedWorker: function() {
    return new Eh(Uh.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
  }
};
Nd.createWorkerFrom = function(e, t, n) {
  return e.pipe(new rU()).pipe(new _u("uncompressedSize")).pipe(t.compressWorker(n)).pipe(new _u("compressedSize")).withStreamInfo("compression", t);
};
var Ld = Nd, iU = cb, aU = sb, ys = jr, vs = Ld, Ah = Ct, Md = function(e, t, n) {
  this.name = e, this.dir = n.dir, this.date = n.date, this.comment = n.comment, this.unixPermissions = n.unixPermissions, this.dosPermissions = n.dosPermissions, this._data = t, this._dataBinary = n.binary, this.options = {
    compression: n.compression,
    compressionOptions: n.compressionOptions
  };
};
Md.prototype = {
  /**
   * Create an internal stream for the content of this object.
   * @param {String} type the type of each chunk.
   * @return StreamHelper the stream.
   */
  internalStream: function(e) {
    var t = null, n = "string";
    try {
      if (!e)
        throw new Error("No output type specified.");
      n = e.toLowerCase();
      var r = n === "string" || n === "text";
      (n === "binarystring" || n === "text") && (n = "string"), t = this._decompressWorker();
      var i = !this._dataBinary;
      i && !r && (t = t.pipe(new ys.Utf8EncodeWorker())), !i && r && (t = t.pipe(new ys.Utf8DecodeWorker()));
    } catch (a) {
      t = new Ah("error"), t.error(a);
    }
    return new iU(t, n, "");
  },
  /**
   * Prepare the content in the asked type.
   * @param {String} type the type of the result.
   * @param {Function} onUpdate a function to call on each internal update.
   * @return Promise the promise of the result.
   */
  async: function(e, t) {
    return this.internalStream(e).accumulate(t);
  },
  /**
   * Prepare the content as a nodejs stream.
   * @param {String} type the type of each chunk.
   * @param {Function} onUpdate a function to call on each internal update.
   * @return Stream the stream.
   */
  nodeStream: function(e, t) {
    return this.internalStream(e || "nodebuffer").toNodejsStream(t);
  },
  /**
   * Return a worker for the compressed content.
   * @private
   * @param {Object} compression the compression object to use.
   * @param {Object} compressionOptions the options to use when compressing.
   * @return Worker the worker.
   */
  _compressWorker: function(e, t) {
    if (this._data instanceof vs && this._data.compression.magic === e.magic)
      return this._data.getCompressedWorker();
    var n = this._decompressWorker();
    return this._dataBinary || (n = n.pipe(new ys.Utf8EncodeWorker())), vs.createWorkerFrom(n, e, t);
  },
  /**
   * Return a worker for the decompressed content.
   * @private
   * @return Worker the worker.
   */
  _decompressWorker: function() {
    return this._data instanceof vs ? this._data.getContentWorker() : this._data instanceof Ah ? this._data : new aU(this._data);
  }
};
var Ch = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], oU = function() {
  throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
};
for (var Ds = 0; Ds < Ch.length; Ds++)
  Md.prototype[Ch[Ds]] = oU;
var cU = Md, fb = {}, Ao = {}, Co = {}, hn = {};
(function(e) {
  var t = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
  function n(a, o) {
    return Object.prototype.hasOwnProperty.call(a, o);
  }
  e.assign = function(a) {
    for (var o = Array.prototype.slice.call(arguments, 1); o.length; ) {
      var c = o.shift();
      if (c) {
        if (typeof c != "object")
          throw new TypeError(c + "must be non-object");
        for (var u in c)
          n(c, u) && (a[u] = c[u]);
      }
    }
    return a;
  }, e.shrinkBuf = function(a, o) {
    return a.length === o ? a : a.subarray ? a.subarray(0, o) : (a.length = o, a);
  };
  var r = {
    arraySet: function(a, o, c, u, s) {
      if (o.subarray && a.subarray) {
        a.set(o.subarray(c, c + u), s);
        return;
      }
      for (var d = 0; d < u; d++)
        a[s + d] = o[c + d];
    },
    // Join array of chunks to single array.
    flattenChunks: function(a) {
      var o, c, u, s, d, g;
      for (u = 0, o = 0, c = a.length; o < c; o++)
        u += a[o].length;
      for (g = new Uint8Array(u), s = 0, o = 0, c = a.length; o < c; o++)
        d = a[o], g.set(d, s), s += d.length;
      return g;
    }
  }, i = {
    arraySet: function(a, o, c, u, s) {
      for (var d = 0; d < u; d++)
        a[s + d] = o[c + d];
    },
    // Join array of chunks to single array.
    flattenChunks: function(a) {
      return [].concat.apply([], a);
    }
  };
  e.setTyped = function(a) {
    a ? (e.Buf8 = Uint8Array, e.Buf16 = Uint16Array, e.Buf32 = Int32Array, e.assign(e, r)) : (e.Buf8 = Array, e.Buf16 = Array, e.Buf32 = Array, e.assign(e, i));
  }, e.setTyped(t);
})(hn);
var Zi = {}, Yt = {}, Xr = {}, sU = hn, uU = 4, Fh = 0, Sh = 1, dU = 2;
function Vr(e) {
  for (var t = e.length; --t >= 0; )
    e[t] = 0;
}
var lU = 0, hb = 1, fU = 2, hU = 3, pU = 258, $d = 29, Xi = 256, Ei = Xi + 1 + $d, Cr = 30, Pd = 19, pb = 2 * Ei + 1, Ln = 15, xs = 16, gU = 7, zd = 256, gb = 16, mb = 17, bb = 18, wu = (
  /* extra bits for each length code */
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
), ka = (
  /* extra bits for each distance code */
  [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
), mU = (
  /* extra bits for each bit length code */
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
), yb = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], bU = 512, sn = new Array((Ei + 2) * 2);
Vr(sn);
var li = new Array(Cr * 2);
Vr(li);
var Ai = new Array(bU);
Vr(Ai);
var Ci = new Array(pU - hU + 1);
Vr(Ci);
var qd = new Array($d);
Vr(qd);
var Va = new Array(Cr);
Vr(Va);
function _s(e, t, n, r, i) {
  this.static_tree = e, this.extra_bits = t, this.extra_base = n, this.elems = r, this.max_length = i, this.has_stree = e && e.length;
}
var vb, Db, xb;
function ws(e, t) {
  this.dyn_tree = e, this.max_code = 0, this.stat_desc = t;
}
function _b(e) {
  return e < 256 ? Ai[e] : Ai[256 + (e >>> 7)];
}
function Fi(e, t) {
  e.pending_buf[e.pending++] = t & 255, e.pending_buf[e.pending++] = t >>> 8 & 255;
}
function at(e, t, n) {
  e.bi_valid > xs - n ? (e.bi_buf |= t << e.bi_valid & 65535, Fi(e, e.bi_buf), e.bi_buf = t >> xs - e.bi_valid, e.bi_valid += n - xs) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += n);
}
function qt(e, t, n) {
  at(
    e,
    n[t * 2],
    n[t * 2 + 1]
    /*.Len*/
  );
}
function wb(e, t) {
  var n = 0;
  do
    n |= e & 1, e >>>= 1, n <<= 1;
  while (--t > 0);
  return n >>> 1;
}
function yU(e) {
  e.bi_valid === 16 ? (Fi(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = e.bi_buf & 255, e.bi_buf >>= 8, e.bi_valid -= 8);
}
function vU(e, t) {
  var n = t.dyn_tree, r = t.max_code, i = t.stat_desc.static_tree, a = t.stat_desc.has_stree, o = t.stat_desc.extra_bits, c = t.stat_desc.extra_base, u = t.stat_desc.max_length, s, d, g, f, p, b, m = 0;
  for (f = 0; f <= Ln; f++)
    e.bl_count[f] = 0;
  for (n[e.heap[e.heap_max] * 2 + 1] = 0, s = e.heap_max + 1; s < pb; s++)
    d = e.heap[s], f = n[n[d * 2 + 1] * 2 + 1] + 1, f > u && (f = u, m++), n[d * 2 + 1] = f, !(d > r) && (e.bl_count[f]++, p = 0, d >= c && (p = o[d - c]), b = n[d * 2], e.opt_len += b * (f + p), a && (e.static_len += b * (i[d * 2 + 1] + p)));
  if (m !== 0) {
    do {
      for (f = u - 1; e.bl_count[f] === 0; )
        f--;
      e.bl_count[f]--, e.bl_count[f + 1] += 2, e.bl_count[u]--, m -= 2;
    } while (m > 0);
    for (f = u; f !== 0; f--)
      for (d = e.bl_count[f]; d !== 0; )
        g = e.heap[--s], !(g > r) && (n[g * 2 + 1] !== f && (e.opt_len += (f - n[g * 2 + 1]) * n[g * 2], n[g * 2 + 1] = f), d--);
  }
}
function Tb(e, t, n) {
  var r = new Array(Ln + 1), i = 0, a, o;
  for (a = 1; a <= Ln; a++)
    r[a] = i = i + n[a - 1] << 1;
  for (o = 0; o <= t; o++) {
    var c = e[o * 2 + 1];
    c !== 0 && (e[o * 2] = wb(r[c]++, c));
  }
}
function DU() {
  var e, t, n, r, i, a = new Array(Ln + 1);
  for (n = 0, r = 0; r < $d - 1; r++)
    for (qd[r] = n, e = 0; e < 1 << wu[r]; e++)
      Ci[n++] = r;
  for (Ci[n - 1] = r, i = 0, r = 0; r < 16; r++)
    for (Va[r] = i, e = 0; e < 1 << ka[r]; e++)
      Ai[i++] = r;
  for (i >>= 7; r < Cr; r++)
    for (Va[r] = i << 7, e = 0; e < 1 << ka[r] - 7; e++)
      Ai[256 + i++] = r;
  for (t = 0; t <= Ln; t++)
    a[t] = 0;
  for (e = 0; e <= 143; )
    sn[e * 2 + 1] = 8, e++, a[8]++;
  for (; e <= 255; )
    sn[e * 2 + 1] = 9, e++, a[9]++;
  for (; e <= 279; )
    sn[e * 2 + 1] = 7, e++, a[7]++;
  for (; e <= 287; )
    sn[e * 2 + 1] = 8, e++, a[8]++;
  for (Tb(sn, Ei + 1, a), e = 0; e < Cr; e++)
    li[e * 2 + 1] = 5, li[e * 2] = wb(e, 5);
  vb = new _s(sn, wu, Xi + 1, Ei, Ln), Db = new _s(li, ka, 0, Cr, Ln), xb = new _s(new Array(0), mU, 0, Pd, gU);
}
function Ub(e) {
  var t;
  for (t = 0; t < Ei; t++)
    e.dyn_ltree[t * 2] = 0;
  for (t = 0; t < Cr; t++)
    e.dyn_dtree[t * 2] = 0;
  for (t = 0; t < Pd; t++)
    e.bl_tree[t * 2] = 0;
  e.dyn_ltree[zd * 2] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0;
}
function Eb(e) {
  e.bi_valid > 8 ? Fi(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
}
function xU(e, t, n, r) {
  Eb(e), Fi(e, n), Fi(e, ~n), sU.arraySet(e.pending_buf, e.window, t, n, e.pending), e.pending += n;
}
function kh(e, t, n, r) {
  var i = t * 2, a = n * 2;
  return e[i] < e[a] || e[i] === e[a] && r[t] <= r[n];
}
function Ts(e, t, n) {
  for (var r = e.heap[n], i = n << 1; i <= e.heap_len && (i < e.heap_len && kh(t, e.heap[i + 1], e.heap[i], e.depth) && i++, !kh(t, r, e.heap[i], e.depth)); )
    e.heap[n] = e.heap[i], n = i, i <<= 1;
  e.heap[n] = r;
}
function Bh(e, t, n) {
  var r, i, a = 0, o, c;
  if (e.last_lit !== 0)
    do
      r = e.pending_buf[e.d_buf + a * 2] << 8 | e.pending_buf[e.d_buf + a * 2 + 1], i = e.pending_buf[e.l_buf + a], a++, r === 0 ? qt(e, i, t) : (o = Ci[i], qt(e, o + Xi + 1, t), c = wu[o], c !== 0 && (i -= qd[o], at(e, i, c)), r--, o = _b(r), qt(e, o, n), c = ka[o], c !== 0 && (r -= Va[o], at(e, r, c)));
    while (a < e.last_lit);
  qt(e, zd, t);
}
function Tu(e, t) {
  var n = t.dyn_tree, r = t.stat_desc.static_tree, i = t.stat_desc.has_stree, a = t.stat_desc.elems, o, c, u = -1, s;
  for (e.heap_len = 0, e.heap_max = pb, o = 0; o < a; o++)
    n[o * 2] !== 0 ? (e.heap[++e.heap_len] = u = o, e.depth[o] = 0) : n[o * 2 + 1] = 0;
  for (; e.heap_len < 2; )
    s = e.heap[++e.heap_len] = u < 2 ? ++u : 0, n[s * 2] = 1, e.depth[s] = 0, e.opt_len--, i && (e.static_len -= r[s * 2 + 1]);
  for (t.max_code = u, o = e.heap_len >> 1; o >= 1; o--)
    Ts(e, n, o);
  s = a;
  do
    o = e.heap[
      1
      /*SMALLEST*/
    ], e.heap[
      1
      /*SMALLEST*/
    ] = e.heap[e.heap_len--], Ts(
      e,
      n,
      1
      /*SMALLEST*/
    ), c = e.heap[
      1
      /*SMALLEST*/
    ], e.heap[--e.heap_max] = o, e.heap[--e.heap_max] = c, n[s * 2] = n[o * 2] + n[c * 2], e.depth[s] = (e.depth[o] >= e.depth[c] ? e.depth[o] : e.depth[c]) + 1, n[o * 2 + 1] = n[c * 2 + 1] = s, e.heap[
      1
      /*SMALLEST*/
    ] = s++, Ts(
      e,
      n,
      1
      /*SMALLEST*/
    );
  while (e.heap_len >= 2);
  e.heap[--e.heap_max] = e.heap[
    1
    /*SMALLEST*/
  ], vU(e, t), Tb(n, u, e.bl_count);
}
function Rh(e, t, n) {
  var r, i = -1, a, o = t[0 * 2 + 1], c = 0, u = 7, s = 4;
  for (o === 0 && (u = 138, s = 3), t[(n + 1) * 2 + 1] = 65535, r = 0; r <= n; r++)
    a = o, o = t[(r + 1) * 2 + 1], !(++c < u && a === o) && (c < s ? e.bl_tree[a * 2] += c : a !== 0 ? (a !== i && e.bl_tree[a * 2]++, e.bl_tree[gb * 2]++) : c <= 10 ? e.bl_tree[mb * 2]++ : e.bl_tree[bb * 2]++, c = 0, i = a, o === 0 ? (u = 138, s = 3) : a === o ? (u = 6, s = 3) : (u = 7, s = 4));
}
function Oh(e, t, n) {
  var r, i = -1, a, o = t[0 * 2 + 1], c = 0, u = 7, s = 4;
  for (o === 0 && (u = 138, s = 3), r = 0; r <= n; r++)
    if (a = o, o = t[(r + 1) * 2 + 1], !(++c < u && a === o)) {
      if (c < s)
        do
          qt(e, a, e.bl_tree);
        while (--c !== 0);
      else a !== 0 ? (a !== i && (qt(e, a, e.bl_tree), c--), qt(e, gb, e.bl_tree), at(e, c - 3, 2)) : c <= 10 ? (qt(e, mb, e.bl_tree), at(e, c - 3, 3)) : (qt(e, bb, e.bl_tree), at(e, c - 11, 7));
      c = 0, i = a, o === 0 ? (u = 138, s = 3) : a === o ? (u = 6, s = 3) : (u = 7, s = 4);
    }
}
function _U(e) {
  var t;
  for (Rh(e, e.dyn_ltree, e.l_desc.max_code), Rh(e, e.dyn_dtree, e.d_desc.max_code), Tu(e, e.bl_desc), t = Pd - 1; t >= 3 && e.bl_tree[yb[t] * 2 + 1] === 0; t--)
    ;
  return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t;
}
function wU(e, t, n, r) {
  var i;
  for (at(e, t - 257, 5), at(e, n - 1, 5), at(e, r - 4, 4), i = 0; i < r; i++)
    at(e, e.bl_tree[yb[i] * 2 + 1], 3);
  Oh(e, e.dyn_ltree, t - 1), Oh(e, e.dyn_dtree, n - 1);
}
function TU(e) {
  var t = 4093624447, n;
  for (n = 0; n <= 31; n++, t >>>= 1)
    if (t & 1 && e.dyn_ltree[n * 2] !== 0)
      return Fh;
  if (e.dyn_ltree[9 * 2] !== 0 || e.dyn_ltree[10 * 2] !== 0 || e.dyn_ltree[13 * 2] !== 0)
    return Sh;
  for (n = 32; n < Xi; n++)
    if (e.dyn_ltree[n * 2] !== 0)
      return Sh;
  return Fh;
}
var Ih = !1;
function UU(e) {
  Ih || (DU(), Ih = !0), e.l_desc = new ws(e.dyn_ltree, vb), e.d_desc = new ws(e.dyn_dtree, Db), e.bl_desc = new ws(e.bl_tree, xb), e.bi_buf = 0, e.bi_valid = 0, Ub(e);
}
function Ab(e, t, n, r) {
  at(e, (lU << 1) + (r ? 1 : 0), 3), xU(e, t, n);
}
function EU(e) {
  at(e, hb << 1, 3), qt(e, zd, sn), yU(e);
}
function AU(e, t, n, r) {
  var i, a, o = 0;
  e.level > 0 ? (e.strm.data_type === dU && (e.strm.data_type = TU(e)), Tu(e, e.l_desc), Tu(e, e.d_desc), o = _U(e), i = e.opt_len + 3 + 7 >>> 3, a = e.static_len + 3 + 7 >>> 3, a <= i && (i = a)) : i = a = n + 5, n + 4 <= i && t !== -1 ? Ab(e, t, n, r) : e.strategy === uU || a === i ? (at(e, (hb << 1) + (r ? 1 : 0), 3), Bh(e, sn, li)) : (at(e, (fU << 1) + (r ? 1 : 0), 3), wU(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, o + 1), Bh(e, e.dyn_ltree, e.dyn_dtree)), Ub(e), r && Eb(e);
}
function CU(e, t, n) {
  return e.pending_buf[e.d_buf + e.last_lit * 2] = t >>> 8 & 255, e.pending_buf[e.d_buf + e.last_lit * 2 + 1] = t & 255, e.pending_buf[e.l_buf + e.last_lit] = n & 255, e.last_lit++, t === 0 ? e.dyn_ltree[n * 2]++ : (e.matches++, t--, e.dyn_ltree[(Ci[n] + Xi + 1) * 2]++, e.dyn_dtree[_b(t) * 2]++), e.last_lit === e.lit_bufsize - 1;
}
Xr._tr_init = UU;
Xr._tr_stored_block = Ab;
Xr._tr_flush_block = AU;
Xr._tr_tally = CU;
Xr._tr_align = EU;
function FU(e, t, n, r) {
  for (var i = e & 65535 | 0, a = e >>> 16 & 65535 | 0, o = 0; n !== 0; ) {
    o = n > 2e3 ? 2e3 : n, n -= o;
    do
      i = i + t[r++] | 0, a = a + i | 0;
    while (--o);
    i %= 65521, a %= 65521;
  }
  return i | a << 16 | 0;
}
var Cb = FU;
function SU() {
  for (var e, t = [], n = 0; n < 256; n++) {
    e = n;
    for (var r = 0; r < 8; r++)
      e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
    t[n] = e;
  }
  return t;
}
var kU = SU();
function BU(e, t, n, r) {
  var i = kU, a = r + n;
  e ^= -1;
  for (var o = r; o < a; o++)
    e = e >>> 8 ^ i[(e ^ t[o]) & 255];
  return e ^ -1;
}
var Fb = BU, jd = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
}, tt = hn, wt = Xr, Sb = Cb, Dn = Fb, RU = jd, sr = 0, OU = 1, IU = 3, En = 4, Wh = 5, jt = 0, Nh = 1, Tt = -2, WU = -3, Us = -5, NU = -1, LU = 1, ga = 2, MU = 3, $U = 4, PU = 0, zU = 2, Fo = 8, qU = 9, jU = 15, ZU = 8, XU = 29, VU = 256, Uu = VU + 1 + XU, HU = 30, GU = 19, YU = 2 * Uu + 1, KU = 15, de = 3, Tn = 258, Bt = Tn + de + 1, JU = 32, So = 42, Eu = 69, Ba = 73, Ra = 91, Oa = 103, Mn = 113, oi = 666, Re = 1, Vi = 2, Hn = 3, Hr = 4, QU = 3;
function Un(e, t) {
  return e.msg = RU[t], t;
}
function Lh(e) {
  return (e << 1) - (e > 4 ? 9 : 0);
}
function wn(e) {
  for (var t = e.length; --t >= 0; )
    e[t] = 0;
}
function xn(e) {
  var t = e.state, n = t.pending;
  n > e.avail_out && (n = e.avail_out), n !== 0 && (tt.arraySet(e.output, t.pending_buf, t.pending_out, n, e.next_out), e.next_out += n, t.pending_out += n, e.total_out += n, e.avail_out -= n, t.pending -= n, t.pending === 0 && (t.pending_out = 0));
}
function je(e, t) {
  wt._tr_flush_block(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, xn(e.strm);
}
function fe(e, t) {
  e.pending_buf[e.pending++] = t;
}
function ti(e, t) {
  e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = t & 255;
}
function eE(e, t, n, r) {
  var i = e.avail_in;
  return i > r && (i = r), i === 0 ? 0 : (e.avail_in -= i, tt.arraySet(t, e.input, e.next_in, i, n), e.state.wrap === 1 ? e.adler = Sb(e.adler, t, i, n) : e.state.wrap === 2 && (e.adler = Dn(e.adler, t, i, n)), e.next_in += i, e.total_in += i, i);
}
function kb(e, t) {
  var n = e.max_chain_length, r = e.strstart, i, a, o = e.prev_length, c = e.nice_match, u = e.strstart > e.w_size - Bt ? e.strstart - (e.w_size - Bt) : 0, s = e.window, d = e.w_mask, g = e.prev, f = e.strstart + Tn, p = s[r + o - 1], b = s[r + o];
  e.prev_length >= e.good_match && (n >>= 2), c > e.lookahead && (c = e.lookahead);
  do
    if (i = t, !(s[i + o] !== b || s[i + o - 1] !== p || s[i] !== s[r] || s[++i] !== s[r + 1])) {
      r += 2, i++;
      do
        ;
      while (s[++r] === s[++i] && s[++r] === s[++i] && s[++r] === s[++i] && s[++r] === s[++i] && s[++r] === s[++i] && s[++r] === s[++i] && s[++r] === s[++i] && s[++r] === s[++i] && r < f);
      if (a = Tn - (f - r), r = f - Tn, a > o) {
        if (e.match_start = t, o = a, a >= c)
          break;
        p = s[r + o - 1], b = s[r + o];
      }
    }
  while ((t = g[t & d]) > u && --n !== 0);
  return o <= e.lookahead ? o : e.lookahead;
}
function Gn(e) {
  var t = e.w_size, n, r, i, a, o;
  do {
    if (a = e.window_size - e.lookahead - e.strstart, e.strstart >= t + (t - Bt)) {
      tt.arraySet(e.window, e.window, t, t, 0), e.match_start -= t, e.strstart -= t, e.block_start -= t, r = e.hash_size, n = r;
      do
        i = e.head[--n], e.head[n] = i >= t ? i - t : 0;
      while (--r);
      r = t, n = r;
      do
        i = e.prev[--n], e.prev[n] = i >= t ? i - t : 0;
      while (--r);
      a += t;
    }
    if (e.strm.avail_in === 0)
      break;
    if (r = eE(e.strm, e.window, e.strstart + e.lookahead, a), e.lookahead += r, e.lookahead + e.insert >= de)
      for (o = e.strstart - e.insert, e.ins_h = e.window[o], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + de - 1]) & e.hash_mask, e.prev[o & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = o, o++, e.insert--, !(e.lookahead + e.insert < de)); )
        ;
  } while (e.lookahead < Bt && e.strm.avail_in !== 0);
}
function tE(e, t) {
  var n = 65535;
  for (n > e.pending_buf_size - 5 && (n = e.pending_buf_size - 5); ; ) {
    if (e.lookahead <= 1) {
      if (Gn(e), e.lookahead === 0 && t === sr)
        return Re;
      if (e.lookahead === 0)
        break;
    }
    e.strstart += e.lookahead, e.lookahead = 0;
    var r = e.block_start + n;
    if ((e.strstart === 0 || e.strstart >= r) && (e.lookahead = e.strstart - r, e.strstart = r, je(e, !1), e.strm.avail_out === 0) || e.strstart - e.block_start >= e.w_size - Bt && (je(e, !1), e.strm.avail_out === 0))
      return Re;
  }
  return e.insert = 0, t === En ? (je(e, !0), e.strm.avail_out === 0 ? Hn : Hr) : (e.strstart > e.block_start && (je(e, !1), e.strm.avail_out === 0), Re);
}
function Es(e, t) {
  for (var n, r; ; ) {
    if (e.lookahead < Bt) {
      if (Gn(e), e.lookahead < Bt && t === sr)
        return Re;
      if (e.lookahead === 0)
        break;
    }
    if (n = 0, e.lookahead >= de && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + de - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), n !== 0 && e.strstart - n <= e.w_size - Bt && (e.match_length = kb(e, n)), e.match_length >= de)
      if (r = wt._tr_tally(e, e.strstart - e.match_start, e.match_length - de), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= de) {
        e.match_length--;
        do
          e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + de - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart;
        while (--e.match_length !== 0);
        e.strstart++;
      } else
        e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
    else
      r = wt._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
    if (r && (je(e, !1), e.strm.avail_out === 0))
      return Re;
  }
  return e.insert = e.strstart < de - 1 ? e.strstart : de - 1, t === En ? (je(e, !0), e.strm.avail_out === 0 ? Hn : Hr) : e.last_lit && (je(e, !1), e.strm.avail_out === 0) ? Re : Vi;
}
function gr(e, t) {
  for (var n, r, i; ; ) {
    if (e.lookahead < Bt) {
      if (Gn(e), e.lookahead < Bt && t === sr)
        return Re;
      if (e.lookahead === 0)
        break;
    }
    if (n = 0, e.lookahead >= de && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + de - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = de - 1, n !== 0 && e.prev_length < e.max_lazy_match && e.strstart - n <= e.w_size - Bt && (e.match_length = kb(e, n), e.match_length <= 5 && (e.strategy === LU || e.match_length === de && e.strstart - e.match_start > 4096) && (e.match_length = de - 1)), e.prev_length >= de && e.match_length <= e.prev_length) {
      i = e.strstart + e.lookahead - de, r = wt._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - de), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
      do
        ++e.strstart <= i && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + de - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart);
      while (--e.prev_length !== 0);
      if (e.match_available = 0, e.match_length = de - 1, e.strstart++, r && (je(e, !1), e.strm.avail_out === 0))
        return Re;
    } else if (e.match_available) {
      if (r = wt._tr_tally(e, 0, e.window[e.strstart - 1]), r && je(e, !1), e.strstart++, e.lookahead--, e.strm.avail_out === 0)
        return Re;
    } else
      e.match_available = 1, e.strstart++, e.lookahead--;
  }
  return e.match_available && (r = wt._tr_tally(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < de - 1 ? e.strstart : de - 1, t === En ? (je(e, !0), e.strm.avail_out === 0 ? Hn : Hr) : e.last_lit && (je(e, !1), e.strm.avail_out === 0) ? Re : Vi;
}
function nE(e, t) {
  for (var n, r, i, a, o = e.window; ; ) {
    if (e.lookahead <= Tn) {
      if (Gn(e), e.lookahead <= Tn && t === sr)
        return Re;
      if (e.lookahead === 0)
        break;
    }
    if (e.match_length = 0, e.lookahead >= de && e.strstart > 0 && (i = e.strstart - 1, r = o[i], r === o[++i] && r === o[++i] && r === o[++i])) {
      a = e.strstart + Tn;
      do
        ;
      while (r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && i < a);
      e.match_length = Tn - (a - i), e.match_length > e.lookahead && (e.match_length = e.lookahead);
    }
    if (e.match_length >= de ? (n = wt._tr_tally(e, 1, e.match_length - de), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (n = wt._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), n && (je(e, !1), e.strm.avail_out === 0))
      return Re;
  }
  return e.insert = 0, t === En ? (je(e, !0), e.strm.avail_out === 0 ? Hn : Hr) : e.last_lit && (je(e, !1), e.strm.avail_out === 0) ? Re : Vi;
}
function rE(e, t) {
  for (var n; ; ) {
    if (e.lookahead === 0 && (Gn(e), e.lookahead === 0)) {
      if (t === sr)
        return Re;
      break;
    }
    if (e.match_length = 0, n = wt._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, n && (je(e, !1), e.strm.avail_out === 0))
      return Re;
  }
  return e.insert = 0, t === En ? (je(e, !0), e.strm.avail_out === 0 ? Hn : Hr) : e.last_lit && (je(e, !1), e.strm.avail_out === 0) ? Re : Vi;
}
function $t(e, t, n, r, i) {
  this.good_length = e, this.max_lazy = t, this.nice_length = n, this.max_chain = r, this.func = i;
}
var _r;
_r = [
  /*      good lazy nice chain */
  new $t(0, 0, 0, 0, tE),
  /* 0 store only */
  new $t(4, 4, 8, 4, Es),
  /* 1 max speed, no lazy matches */
  new $t(4, 5, 16, 8, Es),
  /* 2 */
  new $t(4, 6, 32, 32, Es),
  /* 3 */
  new $t(4, 4, 16, 16, gr),
  /* 4 lazy matches */
  new $t(8, 16, 32, 32, gr),
  /* 5 */
  new $t(8, 16, 128, 128, gr),
  /* 6 */
  new $t(8, 32, 128, 256, gr),
  /* 7 */
  new $t(32, 128, 258, 1024, gr),
  /* 8 */
  new $t(32, 258, 258, 4096, gr)
  /* 9 max compression */
];
function iE(e) {
  e.window_size = 2 * e.w_size, wn(e.head), e.max_lazy_match = _r[e.level].max_lazy, e.good_match = _r[e.level].good_length, e.nice_match = _r[e.level].nice_length, e.max_chain_length = _r[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = de - 1, e.match_available = 0, e.ins_h = 0;
}
function aE() {
  this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = Fo, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new tt.Buf16(YU * 2), this.dyn_dtree = new tt.Buf16((2 * HU + 1) * 2), this.bl_tree = new tt.Buf16((2 * GU + 1) * 2), wn(this.dyn_ltree), wn(this.dyn_dtree), wn(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new tt.Buf16(KU + 1), this.heap = new tt.Buf16(2 * Uu + 1), wn(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new tt.Buf16(2 * Uu + 1), wn(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
}
function Bb(e) {
  var t;
  return !e || !e.state ? Un(e, Tt) : (e.total_in = e.total_out = 0, e.data_type = zU, t = e.state, t.pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap ? So : Mn, e.adler = t.wrap === 2 ? 0 : 1, t.last_flush = sr, wt._tr_init(t), jt);
}
function Rb(e) {
  var t = Bb(e);
  return t === jt && iE(e.state), t;
}
function oE(e, t) {
  return !e || !e.state || e.state.wrap !== 2 ? Tt : (e.state.gzhead = t, jt);
}
function Ob(e, t, n, r, i, a) {
  if (!e)
    return Tt;
  var o = 1;
  if (t === NU && (t = 6), r < 0 ? (o = 0, r = -r) : r > 15 && (o = 2, r -= 16), i < 1 || i > qU || n !== Fo || r < 8 || r > 15 || t < 0 || t > 9 || a < 0 || a > $U)
    return Un(e, Tt);
  r === 8 && (r = 9);
  var c = new aE();
  return e.state = c, c.strm = e, c.wrap = o, c.gzhead = null, c.w_bits = r, c.w_size = 1 << c.w_bits, c.w_mask = c.w_size - 1, c.hash_bits = i + 7, c.hash_size = 1 << c.hash_bits, c.hash_mask = c.hash_size - 1, c.hash_shift = ~~((c.hash_bits + de - 1) / de), c.window = new tt.Buf8(c.w_size * 2), c.head = new tt.Buf16(c.hash_size), c.prev = new tt.Buf16(c.w_size), c.lit_bufsize = 1 << i + 6, c.pending_buf_size = c.lit_bufsize * 4, c.pending_buf = new tt.Buf8(c.pending_buf_size), c.d_buf = 1 * c.lit_bufsize, c.l_buf = 3 * c.lit_bufsize, c.level = t, c.strategy = a, c.method = n, Rb(e);
}
function cE(e, t) {
  return Ob(e, t, Fo, jU, ZU, PU);
}
function sE(e, t) {
  var n, r, i, a;
  if (!e || !e.state || t > Wh || t < 0)
    return e ? Un(e, Tt) : Tt;
  if (r = e.state, !e.output || !e.input && e.avail_in !== 0 || r.status === oi && t !== En)
    return Un(e, e.avail_out === 0 ? Us : Tt);
  if (r.strm = e, n = r.last_flush, r.last_flush = t, r.status === So)
    if (r.wrap === 2)
      e.adler = 0, fe(r, 31), fe(r, 139), fe(r, 8), r.gzhead ? (fe(
        r,
        (r.gzhead.text ? 1 : 0) + (r.gzhead.hcrc ? 2 : 0) + (r.gzhead.extra ? 4 : 0) + (r.gzhead.name ? 8 : 0) + (r.gzhead.comment ? 16 : 0)
      ), fe(r, r.gzhead.time & 255), fe(r, r.gzhead.time >> 8 & 255), fe(r, r.gzhead.time >> 16 & 255), fe(r, r.gzhead.time >> 24 & 255), fe(r, r.level === 9 ? 2 : r.strategy >= ga || r.level < 2 ? 4 : 0), fe(r, r.gzhead.os & 255), r.gzhead.extra && r.gzhead.extra.length && (fe(r, r.gzhead.extra.length & 255), fe(r, r.gzhead.extra.length >> 8 & 255)), r.gzhead.hcrc && (e.adler = Dn(e.adler, r.pending_buf, r.pending, 0)), r.gzindex = 0, r.status = Eu) : (fe(r, 0), fe(r, 0), fe(r, 0), fe(r, 0), fe(r, 0), fe(r, r.level === 9 ? 2 : r.strategy >= ga || r.level < 2 ? 4 : 0), fe(r, QU), r.status = Mn);
    else {
      var o = Fo + (r.w_bits - 8 << 4) << 8, c = -1;
      r.strategy >= ga || r.level < 2 ? c = 0 : r.level < 6 ? c = 1 : r.level === 6 ? c = 2 : c = 3, o |= c << 6, r.strstart !== 0 && (o |= JU), o += 31 - o % 31, r.status = Mn, ti(r, o), r.strstart !== 0 && (ti(r, e.adler >>> 16), ti(r, e.adler & 65535)), e.adler = 1;
    }
  if (r.status === Eu)
    if (r.gzhead.extra) {
      for (i = r.pending; r.gzindex < (r.gzhead.extra.length & 65535) && !(r.pending === r.pending_buf_size && (r.gzhead.hcrc && r.pending > i && (e.adler = Dn(e.adler, r.pending_buf, r.pending - i, i)), xn(e), i = r.pending, r.pending === r.pending_buf_size)); )
        fe(r, r.gzhead.extra[r.gzindex] & 255), r.gzindex++;
      r.gzhead.hcrc && r.pending > i && (e.adler = Dn(e.adler, r.pending_buf, r.pending - i, i)), r.gzindex === r.gzhead.extra.length && (r.gzindex = 0, r.status = Ba);
    } else
      r.status = Ba;
  if (r.status === Ba)
    if (r.gzhead.name) {
      i = r.pending;
      do {
        if (r.pending === r.pending_buf_size && (r.gzhead.hcrc && r.pending > i && (e.adler = Dn(e.adler, r.pending_buf, r.pending - i, i)), xn(e), i = r.pending, r.pending === r.pending_buf_size)) {
          a = 1;
          break;
        }
        r.gzindex < r.gzhead.name.length ? a = r.gzhead.name.charCodeAt(r.gzindex++) & 255 : a = 0, fe(r, a);
      } while (a !== 0);
      r.gzhead.hcrc && r.pending > i && (e.adler = Dn(e.adler, r.pending_buf, r.pending - i, i)), a === 0 && (r.gzindex = 0, r.status = Ra);
    } else
      r.status = Ra;
  if (r.status === Ra)
    if (r.gzhead.comment) {
      i = r.pending;
      do {
        if (r.pending === r.pending_buf_size && (r.gzhead.hcrc && r.pending > i && (e.adler = Dn(e.adler, r.pending_buf, r.pending - i, i)), xn(e), i = r.pending, r.pending === r.pending_buf_size)) {
          a = 1;
          break;
        }
        r.gzindex < r.gzhead.comment.length ? a = r.gzhead.comment.charCodeAt(r.gzindex++) & 255 : a = 0, fe(r, a);
      } while (a !== 0);
      r.gzhead.hcrc && r.pending > i && (e.adler = Dn(e.adler, r.pending_buf, r.pending - i, i)), a === 0 && (r.status = Oa);
    } else
      r.status = Oa;
  if (r.status === Oa && (r.gzhead.hcrc ? (r.pending + 2 > r.pending_buf_size && xn(e), r.pending + 2 <= r.pending_buf_size && (fe(r, e.adler & 255), fe(r, e.adler >> 8 & 255), e.adler = 0, r.status = Mn)) : r.status = Mn), r.pending !== 0) {
    if (xn(e), e.avail_out === 0)
      return r.last_flush = -1, jt;
  } else if (e.avail_in === 0 && Lh(t) <= Lh(n) && t !== En)
    return Un(e, Us);
  if (r.status === oi && e.avail_in !== 0)
    return Un(e, Us);
  if (e.avail_in !== 0 || r.lookahead !== 0 || t !== sr && r.status !== oi) {
    var u = r.strategy === ga ? rE(r, t) : r.strategy === MU ? nE(r, t) : _r[r.level].func(r, t);
    if ((u === Hn || u === Hr) && (r.status = oi), u === Re || u === Hn)
      return e.avail_out === 0 && (r.last_flush = -1), jt;
    if (u === Vi && (t === OU ? wt._tr_align(r) : t !== Wh && (wt._tr_stored_block(r, 0, 0, !1), t === IU && (wn(r.head), r.lookahead === 0 && (r.strstart = 0, r.block_start = 0, r.insert = 0))), xn(e), e.avail_out === 0))
      return r.last_flush = -1, jt;
  }
  return t !== En ? jt : r.wrap <= 0 ? Nh : (r.wrap === 2 ? (fe(r, e.adler & 255), fe(r, e.adler >> 8 & 255), fe(r, e.adler >> 16 & 255), fe(r, e.adler >> 24 & 255), fe(r, e.total_in & 255), fe(r, e.total_in >> 8 & 255), fe(r, e.total_in >> 16 & 255), fe(r, e.total_in >> 24 & 255)) : (ti(r, e.adler >>> 16), ti(r, e.adler & 65535)), xn(e), r.wrap > 0 && (r.wrap = -r.wrap), r.pending !== 0 ? jt : Nh);
}
function uE(e) {
  var t;
  return !e || !e.state ? Tt : (t = e.state.status, t !== So && t !== Eu && t !== Ba && t !== Ra && t !== Oa && t !== Mn && t !== oi ? Un(e, Tt) : (e.state = null, t === Mn ? Un(e, WU) : jt));
}
function dE(e, t) {
  var n = t.length, r, i, a, o, c, u, s, d;
  if (!e || !e.state || (r = e.state, o = r.wrap, o === 2 || o === 1 && r.status !== So || r.lookahead))
    return Tt;
  for (o === 1 && (e.adler = Sb(e.adler, t, n, 0)), r.wrap = 0, n >= r.w_size && (o === 0 && (wn(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0), d = new tt.Buf8(r.w_size), tt.arraySet(d, t, n - r.w_size, r.w_size, 0), t = d, n = r.w_size), c = e.avail_in, u = e.next_in, s = e.input, e.avail_in = n, e.next_in = 0, e.input = t, Gn(r); r.lookahead >= de; ) {
    i = r.strstart, a = r.lookahead - (de - 1);
    do
      r.ins_h = (r.ins_h << r.hash_shift ^ r.window[i + de - 1]) & r.hash_mask, r.prev[i & r.w_mask] = r.head[r.ins_h], r.head[r.ins_h] = i, i++;
    while (--a);
    r.strstart = i, r.lookahead = de - 1, Gn(r);
  }
  return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = de - 1, r.match_available = 0, e.next_in = u, e.input = s, e.avail_in = c, r.wrap = o, jt;
}
Yt.deflateInit = cE;
Yt.deflateInit2 = Ob;
Yt.deflateReset = Rb;
Yt.deflateResetKeep = Bb;
Yt.deflateSetHeader = oE;
Yt.deflate = sE;
Yt.deflateEnd = uE;
Yt.deflateSetDictionary = dE;
Yt.deflateInfo = "pako deflate (from Nodeca project)";
var ur = {}, ko = hn, Ib = !0, Wb = !0;
try {
  String.fromCharCode.apply(null, [0]);
} catch {
  Ib = !1;
}
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  Wb = !1;
}
var Si = new ko.Buf8(256);
for (var mn = 0; mn < 256; mn++)
  Si[mn] = mn >= 252 ? 6 : mn >= 248 ? 5 : mn >= 240 ? 4 : mn >= 224 ? 3 : mn >= 192 ? 2 : 1;
Si[254] = Si[254] = 1;
ur.string2buf = function(e) {
  var t, n, r, i, a, o = e.length, c = 0;
  for (i = 0; i < o; i++)
    n = e.charCodeAt(i), (n & 64512) === 55296 && i + 1 < o && (r = e.charCodeAt(i + 1), (r & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++)), c += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
  for (t = new ko.Buf8(c), a = 0, i = 0; a < c; i++)
    n = e.charCodeAt(i), (n & 64512) === 55296 && i + 1 < o && (r = e.charCodeAt(i + 1), (r & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++)), n < 128 ? t[a++] = n : n < 2048 ? (t[a++] = 192 | n >>> 6, t[a++] = 128 | n & 63) : n < 65536 ? (t[a++] = 224 | n >>> 12, t[a++] = 128 | n >>> 6 & 63, t[a++] = 128 | n & 63) : (t[a++] = 240 | n >>> 18, t[a++] = 128 | n >>> 12 & 63, t[a++] = 128 | n >>> 6 & 63, t[a++] = 128 | n & 63);
  return t;
};
function Nb(e, t) {
  if (t < 65534 && (e.subarray && Wb || !e.subarray && Ib))
    return String.fromCharCode.apply(null, ko.shrinkBuf(e, t));
  for (var n = "", r = 0; r < t; r++)
    n += String.fromCharCode(e[r]);
  return n;
}
ur.buf2binstring = function(e) {
  return Nb(e, e.length);
};
ur.binstring2buf = function(e) {
  for (var t = new ko.Buf8(e.length), n = 0, r = t.length; n < r; n++)
    t[n] = e.charCodeAt(n);
  return t;
};
ur.buf2string = function(e, t) {
  var n, r, i, a, o = t || e.length, c = new Array(o * 2);
  for (r = 0, n = 0; n < o; ) {
    if (i = e[n++], i < 128) {
      c[r++] = i;
      continue;
    }
    if (a = Si[i], a > 4) {
      c[r++] = 65533, n += a - 1;
      continue;
    }
    for (i &= a === 2 ? 31 : a === 3 ? 15 : 7; a > 1 && n < o; )
      i = i << 6 | e[n++] & 63, a--;
    if (a > 1) {
      c[r++] = 65533;
      continue;
    }
    i < 65536 ? c[r++] = i : (i -= 65536, c[r++] = 55296 | i >> 10 & 1023, c[r++] = 56320 | i & 1023);
  }
  return Nb(c, r);
};
ur.utf8border = function(e, t) {
  var n;
  for (t = t || e.length, t > e.length && (t = e.length), n = t - 1; n >= 0 && (e[n] & 192) === 128; )
    n--;
  return n < 0 || n === 0 ? t : n + Si[e[n]] > t ? n : t;
};
function lE() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var Lb = lE, fi = Yt, hi = hn, Au = ur, Cu = jd, fE = Lb, Mb = Object.prototype.toString, hE = 0, As = 4, Fr = 0, Mh = 1, $h = 2, pE = -1, gE = 0, mE = 8;
function Yn(e) {
  if (!(this instanceof Yn)) return new Yn(e);
  this.options = hi.assign({
    level: pE,
    method: mE,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: gE,
    to: ""
  }, e || {});
  var t = this.options;
  t.raw && t.windowBits > 0 ? t.windowBits = -t.windowBits : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new fE(), this.strm.avail_out = 0;
  var n = fi.deflateInit2(
    this.strm,
    t.level,
    t.method,
    t.windowBits,
    t.memLevel,
    t.strategy
  );
  if (n !== Fr)
    throw new Error(Cu[n]);
  if (t.header && fi.deflateSetHeader(this.strm, t.header), t.dictionary) {
    var r;
    if (typeof t.dictionary == "string" ? r = Au.string2buf(t.dictionary) : Mb.call(t.dictionary) === "[object ArrayBuffer]" ? r = new Uint8Array(t.dictionary) : r = t.dictionary, n = fi.deflateSetDictionary(this.strm, r), n !== Fr)
      throw new Error(Cu[n]);
    this._dict_set = !0;
  }
}
Yn.prototype.push = function(e, t) {
  var n = this.strm, r = this.options.chunkSize, i, a;
  if (this.ended)
    return !1;
  a = t === ~~t ? t : t === !0 ? As : hE, typeof e == "string" ? n.input = Au.string2buf(e) : Mb.call(e) === "[object ArrayBuffer]" ? n.input = new Uint8Array(e) : n.input = e, n.next_in = 0, n.avail_in = n.input.length;
  do {
    if (n.avail_out === 0 && (n.output = new hi.Buf8(r), n.next_out = 0, n.avail_out = r), i = fi.deflate(n, a), i !== Mh && i !== Fr)
      return this.onEnd(i), this.ended = !0, !1;
    (n.avail_out === 0 || n.avail_in === 0 && (a === As || a === $h)) && (this.options.to === "string" ? this.onData(Au.buf2binstring(hi.shrinkBuf(n.output, n.next_out))) : this.onData(hi.shrinkBuf(n.output, n.next_out)));
  } while ((n.avail_in > 0 || n.avail_out === 0) && i !== Mh);
  return a === As ? (i = fi.deflateEnd(this.strm), this.onEnd(i), this.ended = !0, i === Fr) : (a === $h && (this.onEnd(Fr), n.avail_out = 0), !0);
};
Yn.prototype.onData = function(e) {
  this.chunks.push(e);
};
Yn.prototype.onEnd = function(e) {
  e === Fr && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = hi.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
function Zd(e, t) {
  var n = new Yn(t);
  if (n.push(e, !0), n.err)
    throw n.msg || Cu[n.err];
  return n.result;
}
function bE(e, t) {
  return t = t || {}, t.raw = !0, Zd(e, t);
}
function yE(e, t) {
  return t = t || {}, t.gzip = !0, Zd(e, t);
}
Zi.Deflate = Yn;
Zi.deflate = Zd;
Zi.deflateRaw = bE;
Zi.gzip = yE;
var Hi = {}, Wt = {}, ma = 30, vE = 12, DE = function(t, n) {
  var r, i, a, o, c, u, s, d, g, f, p, b, m, y, h, l, v, D, x, w, E, k, W, q, $;
  r = t.state, i = t.next_in, q = t.input, a = i + (t.avail_in - 5), o = t.next_out, $ = t.output, c = o - (n - t.avail_out), u = o + (t.avail_out - 257), s = r.dmax, d = r.wsize, g = r.whave, f = r.wnext, p = r.window, b = r.hold, m = r.bits, y = r.lencode, h = r.distcode, l = (1 << r.lenbits) - 1, v = (1 << r.distbits) - 1;
  e:
    do {
      m < 15 && (b += q[i++] << m, m += 8, b += q[i++] << m, m += 8), D = y[b & l];
      t:
        for (; ; ) {
          if (x = D >>> 24, b >>>= x, m -= x, x = D >>> 16 & 255, x === 0)
            $[o++] = D & 65535;
          else if (x & 16) {
            w = D & 65535, x &= 15, x && (m < x && (b += q[i++] << m, m += 8), w += b & (1 << x) - 1, b >>>= x, m -= x), m < 15 && (b += q[i++] << m, m += 8, b += q[i++] << m, m += 8), D = h[b & v];
            n:
              for (; ; ) {
                if (x = D >>> 24, b >>>= x, m -= x, x = D >>> 16 & 255, x & 16) {
                  if (E = D & 65535, x &= 15, m < x && (b += q[i++] << m, m += 8, m < x && (b += q[i++] << m, m += 8)), E += b & (1 << x) - 1, E > s) {
                    t.msg = "invalid distance too far back", r.mode = ma;
                    break e;
                  }
                  if (b >>>= x, m -= x, x = o - c, E > x) {
                    if (x = E - x, x > g && r.sane) {
                      t.msg = "invalid distance too far back", r.mode = ma;
                      break e;
                    }
                    if (k = 0, W = p, f === 0) {
                      if (k += d - x, x < w) {
                        w -= x;
                        do
                          $[o++] = p[k++];
                        while (--x);
                        k = o - E, W = $;
                      }
                    } else if (f < x) {
                      if (k += d + f - x, x -= f, x < w) {
                        w -= x;
                        do
                          $[o++] = p[k++];
                        while (--x);
                        if (k = 0, f < w) {
                          x = f, w -= x;
                          do
                            $[o++] = p[k++];
                          while (--x);
                          k = o - E, W = $;
                        }
                      }
                    } else if (k += f - x, x < w) {
                      w -= x;
                      do
                        $[o++] = p[k++];
                      while (--x);
                      k = o - E, W = $;
                    }
                    for (; w > 2; )
                      $[o++] = W[k++], $[o++] = W[k++], $[o++] = W[k++], w -= 3;
                    w && ($[o++] = W[k++], w > 1 && ($[o++] = W[k++]));
                  } else {
                    k = o - E;
                    do
                      $[o++] = $[k++], $[o++] = $[k++], $[o++] = $[k++], w -= 3;
                    while (w > 2);
                    w && ($[o++] = $[k++], w > 1 && ($[o++] = $[k++]));
                  }
                } else if (x & 64) {
                  t.msg = "invalid distance code", r.mode = ma;
                  break e;
                } else {
                  D = h[(D & 65535) + (b & (1 << x) - 1)];
                  continue n;
                }
                break;
              }
          } else if (x & 64)
            if (x & 32) {
              r.mode = vE;
              break e;
            } else {
              t.msg = "invalid literal/length code", r.mode = ma;
              break e;
            }
          else {
            D = y[(D & 65535) + (b & (1 << x) - 1)];
            continue t;
          }
          break;
        }
    } while (i < a && o < u);
  w = m >> 3, i -= w, m -= w << 3, b &= (1 << m) - 1, t.next_in = i, t.next_out = o, t.avail_in = i < a ? 5 + (a - i) : 5 - (i - a), t.avail_out = o < u ? 257 + (u - o) : 257 - (o - u), r.hold = b, r.bits = m;
}, Ph = hn, mr = 15, zh = 852, qh = 592, jh = 0, Cs = 1, Zh = 2, xE = [
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
], _E = [
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
], wE = [
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
], TE = [
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
], UE = function(t, n, r, i, a, o, c, u) {
  var s = u.bits, d = 0, g = 0, f = 0, p = 0, b = 0, m = 0, y = 0, h = 0, l = 0, v = 0, D, x, w, E, k, W = null, q = 0, $, B = new Ph.Buf16(mr + 1), P = new Ph.Buf16(mr + 1), H = null, Q = 0, A, T, _;
  for (d = 0; d <= mr; d++)
    B[d] = 0;
  for (g = 0; g < i; g++)
    B[n[r + g]]++;
  for (b = s, p = mr; p >= 1 && B[p] === 0; p--)
    ;
  if (b > p && (b = p), p === 0)
    return a[o++] = 1 << 24 | 64 << 16 | 0, a[o++] = 1 << 24 | 64 << 16 | 0, u.bits = 1, 0;
  for (f = 1; f < p && B[f] === 0; f++)
    ;
  for (b < f && (b = f), h = 1, d = 1; d <= mr; d++)
    if (h <<= 1, h -= B[d], h < 0)
      return -1;
  if (h > 0 && (t === jh || p !== 1))
    return -1;
  for (P[1] = 0, d = 1; d < mr; d++)
    P[d + 1] = P[d] + B[d];
  for (g = 0; g < i; g++)
    n[r + g] !== 0 && (c[P[n[r + g]]++] = g);
  if (t === jh ? (W = H = c, $ = 19) : t === Cs ? (W = xE, q -= 257, H = _E, Q -= 257, $ = 256) : (W = wE, H = TE, $ = -1), v = 0, g = 0, d = f, k = o, m = b, y = 0, w = -1, l = 1 << b, E = l - 1, t === Cs && l > zh || t === Zh && l > qh)
    return 1;
  for (; ; ) {
    A = d - y, c[g] < $ ? (T = 0, _ = c[g]) : c[g] > $ ? (T = H[Q + c[g]], _ = W[q + c[g]]) : (T = 96, _ = 0), D = 1 << d - y, x = 1 << m, f = x;
    do
      x -= D, a[k + (v >> y) + x] = A << 24 | T << 16 | _ | 0;
    while (x !== 0);
    for (D = 1 << d - 1; v & D; )
      D >>= 1;
    if (D !== 0 ? (v &= D - 1, v += D) : v = 0, g++, --B[d] === 0) {
      if (d === p)
        break;
      d = n[r + c[g]];
    }
    if (d > b && (v & E) !== w) {
      for (y === 0 && (y = b), k += f, m = d - y, h = 1 << m; m + y < p && (h -= B[m + y], !(h <= 0)); )
        m++, h <<= 1;
      if (l += 1 << m, t === Cs && l > zh || t === Zh && l > qh)
        return 1;
      w = v & E, a[w] = b << 24 | m << 16 | k - o | 0;
    }
  }
  return v !== 0 && (a[k + v] = d - y << 24 | 64 << 16 | 0), u.bits = b, 0;
}, gt = hn, Fu = Cb, Pt = Fb, EE = DE, pi = UE, AE = 0, $b = 1, Pb = 2, Xh = 4, CE = 5, ba = 6, Kn = 0, FE = 1, SE = 2, Et = -2, zb = -3, qb = -4, kE = -5, Vh = 8, jb = 1, Hh = 2, Gh = 3, Yh = 4, Kh = 5, Jh = 6, Qh = 7, ep = 8, tp = 9, np = 10, Ha = 11, nn = 12, Fs = 13, rp = 14, Ss = 15, ip = 16, ap = 17, op = 18, cp = 19, ya = 20, va = 21, sp = 22, up = 23, dp = 24, lp = 25, fp = 26, ks = 27, hp = 28, pp = 29, xe = 30, Zb = 31, BE = 32, RE = 852, OE = 592, IE = 15, WE = IE;
function gp(e) {
  return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((e & 65280) << 8) + ((e & 255) << 24);
}
function NE() {
  this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new gt.Buf16(320), this.work = new gt.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
function Xb(e) {
  var t;
  return !e || !e.state ? Et : (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = t.wrap & 1), t.mode = jb, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new gt.Buf32(RE), t.distcode = t.distdyn = new gt.Buf32(OE), t.sane = 1, t.back = -1, Kn);
}
function Vb(e) {
  var t;
  return !e || !e.state ? Et : (t = e.state, t.wsize = 0, t.whave = 0, t.wnext = 0, Xb(e));
}
function Hb(e, t) {
  var n, r;
  return !e || !e.state || (r = e.state, t < 0 ? (n = 0, t = -t) : (n = (t >> 4) + 1, t < 48 && (t &= 15)), t && (t < 8 || t > 15)) ? Et : (r.window !== null && r.wbits !== t && (r.window = null), r.wrap = n, r.wbits = t, Vb(e));
}
function Gb(e, t) {
  var n, r;
  return e ? (r = new NE(), e.state = r, r.window = null, n = Hb(e, t), n !== Kn && (e.state = null), n) : Et;
}
function LE(e) {
  return Gb(e, WE);
}
var mp = !0, Bs, Rs;
function ME(e) {
  if (mp) {
    var t;
    for (Bs = new gt.Buf32(512), Rs = new gt.Buf32(32), t = 0; t < 144; )
      e.lens[t++] = 8;
    for (; t < 256; )
      e.lens[t++] = 9;
    for (; t < 280; )
      e.lens[t++] = 7;
    for (; t < 288; )
      e.lens[t++] = 8;
    for (pi($b, e.lens, 0, 288, Bs, 0, e.work, { bits: 9 }), t = 0; t < 32; )
      e.lens[t++] = 5;
    pi(Pb, e.lens, 0, 32, Rs, 0, e.work, { bits: 5 }), mp = !1;
  }
  e.lencode = Bs, e.lenbits = 9, e.distcode = Rs, e.distbits = 5;
}
function Yb(e, t, n, r) {
  var i, a = e.state;
  return a.window === null && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new gt.Buf8(a.wsize)), r >= a.wsize ? (gt.arraySet(a.window, t, n - a.wsize, a.wsize, 0), a.wnext = 0, a.whave = a.wsize) : (i = a.wsize - a.wnext, i > r && (i = r), gt.arraySet(a.window, t, n - r, i, a.wnext), r -= i, r ? (gt.arraySet(a.window, t, n - r, r, 0), a.wnext = r, a.whave = a.wsize) : (a.wnext += i, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += i))), 0;
}
function $E(e, t) {
  var n, r, i, a, o, c, u, s, d, g, f, p, b, m, y = 0, h, l, v, D, x, w, E, k, W = new gt.Buf8(4), q, $, B = (
    /* permutation of code lengths */
    [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
  );
  if (!e || !e.state || !e.output || !e.input && e.avail_in !== 0)
    return Et;
  n = e.state, n.mode === nn && (n.mode = Fs), o = e.next_out, i = e.output, u = e.avail_out, a = e.next_in, r = e.input, c = e.avail_in, s = n.hold, d = n.bits, g = c, f = u, k = Kn;
  e:
    for (; ; )
      switch (n.mode) {
        case jb:
          if (n.wrap === 0) {
            n.mode = Fs;
            break;
          }
          for (; d < 16; ) {
            if (c === 0)
              break e;
            c--, s += r[a++] << d, d += 8;
          }
          if (n.wrap & 2 && s === 35615) {
            n.check = 0, W[0] = s & 255, W[1] = s >>> 8 & 255, n.check = Pt(n.check, W, 2, 0), s = 0, d = 0, n.mode = Hh;
            break;
          }
          if (n.flags = 0, n.head && (n.head.done = !1), !(n.wrap & 1) || /* check if zlib header allowed */
          (((s & 255) << 8) + (s >> 8)) % 31) {
            e.msg = "incorrect header check", n.mode = xe;
            break;
          }
          if ((s & 15) !== Vh) {
            e.msg = "unknown compression method", n.mode = xe;
            break;
          }
          if (s >>>= 4, d -= 4, E = (s & 15) + 8, n.wbits === 0)
            n.wbits = E;
          else if (E > n.wbits) {
            e.msg = "invalid window size", n.mode = xe;
            break;
          }
          n.dmax = 1 << E, e.adler = n.check = 1, n.mode = s & 512 ? np : nn, s = 0, d = 0;
          break;
        case Hh:
          for (; d < 16; ) {
            if (c === 0)
              break e;
            c--, s += r[a++] << d, d += 8;
          }
          if (n.flags = s, (n.flags & 255) !== Vh) {
            e.msg = "unknown compression method", n.mode = xe;
            break;
          }
          if (n.flags & 57344) {
            e.msg = "unknown header flags set", n.mode = xe;
            break;
          }
          n.head && (n.head.text = s >> 8 & 1), n.flags & 512 && (W[0] = s & 255, W[1] = s >>> 8 & 255, n.check = Pt(n.check, W, 2, 0)), s = 0, d = 0, n.mode = Gh;
        case Gh:
          for (; d < 32; ) {
            if (c === 0)
              break e;
            c--, s += r[a++] << d, d += 8;
          }
          n.head && (n.head.time = s), n.flags & 512 && (W[0] = s & 255, W[1] = s >>> 8 & 255, W[2] = s >>> 16 & 255, W[3] = s >>> 24 & 255, n.check = Pt(n.check, W, 4, 0)), s = 0, d = 0, n.mode = Yh;
        case Yh:
          for (; d < 16; ) {
            if (c === 0)
              break e;
            c--, s += r[a++] << d, d += 8;
          }
          n.head && (n.head.xflags = s & 255, n.head.os = s >> 8), n.flags & 512 && (W[0] = s & 255, W[1] = s >>> 8 & 255, n.check = Pt(n.check, W, 2, 0)), s = 0, d = 0, n.mode = Kh;
        case Kh:
          if (n.flags & 1024) {
            for (; d < 16; ) {
              if (c === 0)
                break e;
              c--, s += r[a++] << d, d += 8;
            }
            n.length = s, n.head && (n.head.extra_len = s), n.flags & 512 && (W[0] = s & 255, W[1] = s >>> 8 & 255, n.check = Pt(n.check, W, 2, 0)), s = 0, d = 0;
          } else n.head && (n.head.extra = null);
          n.mode = Jh;
        case Jh:
          if (n.flags & 1024 && (p = n.length, p > c && (p = c), p && (n.head && (E = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Array(n.head.extra_len)), gt.arraySet(
            n.head.extra,
            r,
            a,
            // extra field is limited to 65536 bytes
            // - no need for additional size check
            p,
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            E
          )), n.flags & 512 && (n.check = Pt(n.check, r, p, a)), c -= p, a += p, n.length -= p), n.length))
            break e;
          n.length = 0, n.mode = Qh;
        case Qh:
          if (n.flags & 2048) {
            if (c === 0)
              break e;
            p = 0;
            do
              E = r[a + p++], n.head && E && n.length < 65536 && (n.head.name += String.fromCharCode(E));
            while (E && p < c);
            if (n.flags & 512 && (n.check = Pt(n.check, r, p, a)), c -= p, a += p, E)
              break e;
          } else n.head && (n.head.name = null);
          n.length = 0, n.mode = ep;
        case ep:
          if (n.flags & 4096) {
            if (c === 0)
              break e;
            p = 0;
            do
              E = r[a + p++], n.head && E && n.length < 65536 && (n.head.comment += String.fromCharCode(E));
            while (E && p < c);
            if (n.flags & 512 && (n.check = Pt(n.check, r, p, a)), c -= p, a += p, E)
              break e;
          } else n.head && (n.head.comment = null);
          n.mode = tp;
        case tp:
          if (n.flags & 512) {
            for (; d < 16; ) {
              if (c === 0)
                break e;
              c--, s += r[a++] << d, d += 8;
            }
            if (s !== (n.check & 65535)) {
              e.msg = "header crc mismatch", n.mode = xe;
              break;
            }
            s = 0, d = 0;
          }
          n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), e.adler = n.check = 0, n.mode = nn;
          break;
        case np:
          for (; d < 32; ) {
            if (c === 0)
              break e;
            c--, s += r[a++] << d, d += 8;
          }
          e.adler = n.check = gp(s), s = 0, d = 0, n.mode = Ha;
        case Ha:
          if (n.havedict === 0)
            return e.next_out = o, e.avail_out = u, e.next_in = a, e.avail_in = c, n.hold = s, n.bits = d, SE;
          e.adler = n.check = 1, n.mode = nn;
        case nn:
          if (t === CE || t === ba)
            break e;
        case Fs:
          if (n.last) {
            s >>>= d & 7, d -= d & 7, n.mode = ks;
            break;
          }
          for (; d < 3; ) {
            if (c === 0)
              break e;
            c--, s += r[a++] << d, d += 8;
          }
          switch (n.last = s & 1, s >>>= 1, d -= 1, s & 3) {
            case 0:
              n.mode = rp;
              break;
            case 1:
              if (ME(n), n.mode = ya, t === ba) {
                s >>>= 2, d -= 2;
                break e;
              }
              break;
            case 2:
              n.mode = ap;
              break;
            case 3:
              e.msg = "invalid block type", n.mode = xe;
          }
          s >>>= 2, d -= 2;
          break;
        case rp:
          for (s >>>= d & 7, d -= d & 7; d < 32; ) {
            if (c === 0)
              break e;
            c--, s += r[a++] << d, d += 8;
          }
          if ((s & 65535) !== (s >>> 16 ^ 65535)) {
            e.msg = "invalid stored block lengths", n.mode = xe;
            break;
          }
          if (n.length = s & 65535, s = 0, d = 0, n.mode = Ss, t === ba)
            break e;
        case Ss:
          n.mode = ip;
        case ip:
          if (p = n.length, p) {
            if (p > c && (p = c), p > u && (p = u), p === 0)
              break e;
            gt.arraySet(i, r, a, p, o), c -= p, a += p, u -= p, o += p, n.length -= p;
            break;
          }
          n.mode = nn;
          break;
        case ap:
          for (; d < 14; ) {
            if (c === 0)
              break e;
            c--, s += r[a++] << d, d += 8;
          }
          if (n.nlen = (s & 31) + 257, s >>>= 5, d -= 5, n.ndist = (s & 31) + 1, s >>>= 5, d -= 5, n.ncode = (s & 15) + 4, s >>>= 4, d -= 4, n.nlen > 286 || n.ndist > 30) {
            e.msg = "too many length or distance symbols", n.mode = xe;
            break;
          }
          n.have = 0, n.mode = op;
        case op:
          for (; n.have < n.ncode; ) {
            for (; d < 3; ) {
              if (c === 0)
                break e;
              c--, s += r[a++] << d, d += 8;
            }
            n.lens[B[n.have++]] = s & 7, s >>>= 3, d -= 3;
          }
          for (; n.have < 19; )
            n.lens[B[n.have++]] = 0;
          if (n.lencode = n.lendyn, n.lenbits = 7, q = { bits: n.lenbits }, k = pi(AE, n.lens, 0, 19, n.lencode, 0, n.work, q), n.lenbits = q.bits, k) {
            e.msg = "invalid code lengths set", n.mode = xe;
            break;
          }
          n.have = 0, n.mode = cp;
        case cp:
          for (; n.have < n.nlen + n.ndist; ) {
            for (; y = n.lencode[s & (1 << n.lenbits) - 1], h = y >>> 24, l = y >>> 16 & 255, v = y & 65535, !(h <= d); ) {
              if (c === 0)
                break e;
              c--, s += r[a++] << d, d += 8;
            }
            if (v < 16)
              s >>>= h, d -= h, n.lens[n.have++] = v;
            else {
              if (v === 16) {
                for ($ = h + 2; d < $; ) {
                  if (c === 0)
                    break e;
                  c--, s += r[a++] << d, d += 8;
                }
                if (s >>>= h, d -= h, n.have === 0) {
                  e.msg = "invalid bit length repeat", n.mode = xe;
                  break;
                }
                E = n.lens[n.have - 1], p = 3 + (s & 3), s >>>= 2, d -= 2;
              } else if (v === 17) {
                for ($ = h + 3; d < $; ) {
                  if (c === 0)
                    break e;
                  c--, s += r[a++] << d, d += 8;
                }
                s >>>= h, d -= h, E = 0, p = 3 + (s & 7), s >>>= 3, d -= 3;
              } else {
                for ($ = h + 7; d < $; ) {
                  if (c === 0)
                    break e;
                  c--, s += r[a++] << d, d += 8;
                }
                s >>>= h, d -= h, E = 0, p = 11 + (s & 127), s >>>= 7, d -= 7;
              }
              if (n.have + p > n.nlen + n.ndist) {
                e.msg = "invalid bit length repeat", n.mode = xe;
                break;
              }
              for (; p--; )
                n.lens[n.have++] = E;
            }
          }
          if (n.mode === xe)
            break;
          if (n.lens[256] === 0) {
            e.msg = "invalid code -- missing end-of-block", n.mode = xe;
            break;
          }
          if (n.lenbits = 9, q = { bits: n.lenbits }, k = pi($b, n.lens, 0, n.nlen, n.lencode, 0, n.work, q), n.lenbits = q.bits, k) {
            e.msg = "invalid literal/lengths set", n.mode = xe;
            break;
          }
          if (n.distbits = 6, n.distcode = n.distdyn, q = { bits: n.distbits }, k = pi(Pb, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, q), n.distbits = q.bits, k) {
            e.msg = "invalid distances set", n.mode = xe;
            break;
          }
          if (n.mode = ya, t === ba)
            break e;
        case ya:
          n.mode = va;
        case va:
          if (c >= 6 && u >= 258) {
            e.next_out = o, e.avail_out = u, e.next_in = a, e.avail_in = c, n.hold = s, n.bits = d, EE(e, f), o = e.next_out, i = e.output, u = e.avail_out, a = e.next_in, r = e.input, c = e.avail_in, s = n.hold, d = n.bits, n.mode === nn && (n.back = -1);
            break;
          }
          for (n.back = 0; y = n.lencode[s & (1 << n.lenbits) - 1], h = y >>> 24, l = y >>> 16 & 255, v = y & 65535, !(h <= d); ) {
            if (c === 0)
              break e;
            c--, s += r[a++] << d, d += 8;
          }
          if (l && !(l & 240)) {
            for (D = h, x = l, w = v; y = n.lencode[w + ((s & (1 << D + x) - 1) >> D)], h = y >>> 24, l = y >>> 16 & 255, v = y & 65535, !(D + h <= d); ) {
              if (c === 0)
                break e;
              c--, s += r[a++] << d, d += 8;
            }
            s >>>= D, d -= D, n.back += D;
          }
          if (s >>>= h, d -= h, n.back += h, n.length = v, l === 0) {
            n.mode = fp;
            break;
          }
          if (l & 32) {
            n.back = -1, n.mode = nn;
            break;
          }
          if (l & 64) {
            e.msg = "invalid literal/length code", n.mode = xe;
            break;
          }
          n.extra = l & 15, n.mode = sp;
        case sp:
          if (n.extra) {
            for ($ = n.extra; d < $; ) {
              if (c === 0)
                break e;
              c--, s += r[a++] << d, d += 8;
            }
            n.length += s & (1 << n.extra) - 1, s >>>= n.extra, d -= n.extra, n.back += n.extra;
          }
          n.was = n.length, n.mode = up;
        case up:
          for (; y = n.distcode[s & (1 << n.distbits) - 1], h = y >>> 24, l = y >>> 16 & 255, v = y & 65535, !(h <= d); ) {
            if (c === 0)
              break e;
            c--, s += r[a++] << d, d += 8;
          }
          if (!(l & 240)) {
            for (D = h, x = l, w = v; y = n.distcode[w + ((s & (1 << D + x) - 1) >> D)], h = y >>> 24, l = y >>> 16 & 255, v = y & 65535, !(D + h <= d); ) {
              if (c === 0)
                break e;
              c--, s += r[a++] << d, d += 8;
            }
            s >>>= D, d -= D, n.back += D;
          }
          if (s >>>= h, d -= h, n.back += h, l & 64) {
            e.msg = "invalid distance code", n.mode = xe;
            break;
          }
          n.offset = v, n.extra = l & 15, n.mode = dp;
        case dp:
          if (n.extra) {
            for ($ = n.extra; d < $; ) {
              if (c === 0)
                break e;
              c--, s += r[a++] << d, d += 8;
            }
            n.offset += s & (1 << n.extra) - 1, s >>>= n.extra, d -= n.extra, n.back += n.extra;
          }
          if (n.offset > n.dmax) {
            e.msg = "invalid distance too far back", n.mode = xe;
            break;
          }
          n.mode = lp;
        case lp:
          if (u === 0)
            break e;
          if (p = f - u, n.offset > p) {
            if (p = n.offset - p, p > n.whave && n.sane) {
              e.msg = "invalid distance too far back", n.mode = xe;
              break;
            }
            p > n.wnext ? (p -= n.wnext, b = n.wsize - p) : b = n.wnext - p, p > n.length && (p = n.length), m = n.window;
          } else
            m = i, b = o - n.offset, p = n.length;
          p > u && (p = u), u -= p, n.length -= p;
          do
            i[o++] = m[b++];
          while (--p);
          n.length === 0 && (n.mode = va);
          break;
        case fp:
          if (u === 0)
            break e;
          i[o++] = n.length, u--, n.mode = va;
          break;
        case ks:
          if (n.wrap) {
            for (; d < 32; ) {
              if (c === 0)
                break e;
              c--, s |= r[a++] << d, d += 8;
            }
            if (f -= u, e.total_out += f, n.total += f, f && (e.adler = n.check = /*UPDATE(state.check, put - _out, _out);*/
            n.flags ? Pt(n.check, i, f, o - f) : Fu(n.check, i, f, o - f)), f = u, (n.flags ? s : gp(s)) !== n.check) {
              e.msg = "incorrect data check", n.mode = xe;
              break;
            }
            s = 0, d = 0;
          }
          n.mode = hp;
        case hp:
          if (n.wrap && n.flags) {
            for (; d < 32; ) {
              if (c === 0)
                break e;
              c--, s += r[a++] << d, d += 8;
            }
            if (s !== (n.total & 4294967295)) {
              e.msg = "incorrect length check", n.mode = xe;
              break;
            }
            s = 0, d = 0;
          }
          n.mode = pp;
        case pp:
          k = FE;
          break e;
        case xe:
          k = zb;
          break e;
        case Zb:
          return qb;
        case BE:
        default:
          return Et;
      }
  return e.next_out = o, e.avail_out = u, e.next_in = a, e.avail_in = c, n.hold = s, n.bits = d, (n.wsize || f !== e.avail_out && n.mode < xe && (n.mode < ks || t !== Xh)) && Yb(e, e.output, e.next_out, f - e.avail_out), g -= e.avail_in, f -= e.avail_out, e.total_in += g, e.total_out += f, n.total += f, n.wrap && f && (e.adler = n.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
  n.flags ? Pt(n.check, i, f, e.next_out - f) : Fu(n.check, i, f, e.next_out - f)), e.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === nn ? 128 : 0) + (n.mode === ya || n.mode === Ss ? 256 : 0), (g === 0 && f === 0 || t === Xh) && k === Kn && (k = kE), k;
}
function PE(e) {
  if (!e || !e.state)
    return Et;
  var t = e.state;
  return t.window && (t.window = null), e.state = null, Kn;
}
function zE(e, t) {
  var n;
  return !e || !e.state || (n = e.state, !(n.wrap & 2)) ? Et : (n.head = t, t.done = !1, Kn);
}
function qE(e, t) {
  var n = t.length, r, i, a;
  return !e || !e.state || (r = e.state, r.wrap !== 0 && r.mode !== Ha) ? Et : r.mode === Ha && (i = 1, i = Fu(i, t, n, 0), i !== r.check) ? zb : (a = Yb(e, t, n, n), a ? (r.mode = Zb, qb) : (r.havedict = 1, Kn));
}
Wt.inflateReset = Vb;
Wt.inflateReset2 = Hb;
Wt.inflateResetKeep = Xb;
Wt.inflateInit = LE;
Wt.inflateInit2 = Gb;
Wt.inflate = $E;
Wt.inflateEnd = PE;
Wt.inflateGetHeader = zE;
Wt.inflateSetDictionary = qE;
Wt.inflateInfo = "pako inflate (from Nodeca project)";
var Kb = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR: -5,
  //Z_VERSION_ERROR: -6,
  /* compression levels */
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY: 0,
  Z_TEXT: 1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN: 2,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
function jE() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var ZE = jE, Sr = Wt, gi = hn, Ia = ur, Ce = Kb, Su = jd, XE = Lb, VE = ZE, Jb = Object.prototype.toString;
function Jn(e) {
  if (!(this instanceof Jn)) return new Jn(e);
  this.options = gi.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ""
  }, e || {});
  var t = this.options;
  t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, t.windowBits === 0 && (t.windowBits = -15)), t.windowBits >= 0 && t.windowBits < 16 && !(e && e.windowBits) && (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && (t.windowBits & 15 || (t.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new XE(), this.strm.avail_out = 0;
  var n = Sr.inflateInit2(
    this.strm,
    t.windowBits
  );
  if (n !== Ce.Z_OK)
    throw new Error(Su[n]);
  if (this.header = new VE(), Sr.inflateGetHeader(this.strm, this.header), t.dictionary && (typeof t.dictionary == "string" ? t.dictionary = Ia.string2buf(t.dictionary) : Jb.call(t.dictionary) === "[object ArrayBuffer]" && (t.dictionary = new Uint8Array(t.dictionary)), t.raw && (n = Sr.inflateSetDictionary(this.strm, t.dictionary), n !== Ce.Z_OK)))
    throw new Error(Su[n]);
}
Jn.prototype.push = function(e, t) {
  var n = this.strm, r = this.options.chunkSize, i = this.options.dictionary, a, o, c, u, s, d = !1;
  if (this.ended)
    return !1;
  o = t === ~~t ? t : t === !0 ? Ce.Z_FINISH : Ce.Z_NO_FLUSH, typeof e == "string" ? n.input = Ia.binstring2buf(e) : Jb.call(e) === "[object ArrayBuffer]" ? n.input = new Uint8Array(e) : n.input = e, n.next_in = 0, n.avail_in = n.input.length;
  do {
    if (n.avail_out === 0 && (n.output = new gi.Buf8(r), n.next_out = 0, n.avail_out = r), a = Sr.inflate(n, Ce.Z_NO_FLUSH), a === Ce.Z_NEED_DICT && i && (a = Sr.inflateSetDictionary(this.strm, i)), a === Ce.Z_BUF_ERROR && d === !0 && (a = Ce.Z_OK, d = !1), a !== Ce.Z_STREAM_END && a !== Ce.Z_OK)
      return this.onEnd(a), this.ended = !0, !1;
    n.next_out && (n.avail_out === 0 || a === Ce.Z_STREAM_END || n.avail_in === 0 && (o === Ce.Z_FINISH || o === Ce.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (c = Ia.utf8border(n.output, n.next_out), u = n.next_out - c, s = Ia.buf2string(n.output, c), n.next_out = u, n.avail_out = r - u, u && gi.arraySet(n.output, n.output, c, u, 0), this.onData(s)) : this.onData(gi.shrinkBuf(n.output, n.next_out))), n.avail_in === 0 && n.avail_out === 0 && (d = !0);
  } while ((n.avail_in > 0 || n.avail_out === 0) && a !== Ce.Z_STREAM_END);
  return a === Ce.Z_STREAM_END && (o = Ce.Z_FINISH), o === Ce.Z_FINISH ? (a = Sr.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, a === Ce.Z_OK) : (o === Ce.Z_SYNC_FLUSH && (this.onEnd(Ce.Z_OK), n.avail_out = 0), !0);
};
Jn.prototype.onData = function(e) {
  this.chunks.push(e);
};
Jn.prototype.onEnd = function(e) {
  e === Ce.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = gi.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
function Xd(e, t) {
  var n = new Jn(t);
  if (n.push(e, !0), n.err)
    throw n.msg || Su[n.err];
  return n.result;
}
function HE(e, t) {
  return t = t || {}, t.raw = !0, Xd(e, t);
}
Hi.Inflate = Jn;
Hi.inflate = Xd;
Hi.inflateRaw = HE;
Hi.ungzip = Xd;
var GE = hn.assign, YE = Zi, KE = Hi, JE = Kb, Qb = {};
GE(Qb, YE, KE, JE);
var QE = Qb, e3 = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", t3 = QE, ey = Ae(), Bo = Ct, n3 = e3 ? "uint8array" : "array";
Co.magic = "\b\0";
function dr(e, t) {
  Bo.call(this, "FlateWorker/" + e), this._pako = null, this._pakoAction = e, this._pakoOptions = t, this.meta = {};
}
ey.inherits(dr, Bo);
dr.prototype.processChunk = function(e) {
  this.meta = e.meta, this._pako === null && this._createPako(), this._pako.push(ey.transformTo(n3, e.data), !1);
};
dr.prototype.flush = function() {
  Bo.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
};
dr.prototype.cleanUp = function() {
  Bo.prototype.cleanUp.call(this), this._pako = null;
};
dr.prototype._createPako = function() {
  this._pako = new t3[this._pakoAction]({
    raw: !0,
    level: this._pakoOptions.level || -1
    // default compression
  });
  var e = this;
  this._pako.onData = function(t) {
    e.push({
      data: t,
      meta: e.meta
    });
  };
};
Co.compressWorker = function(e) {
  return new dr("Deflate", e);
};
Co.uncompressWorker = function() {
  return new dr("Inflate", {});
};
var bp = Ct;
Ao.STORE = {
  magic: "\0\0",
  compressWorker: function() {
    return new bp("STORE compression");
  },
  uncompressWorker: function() {
    return new bp("STORE decompression");
  }
};
Ao.DEFLATE = Co;
var Rn = {};
Rn.LOCAL_FILE_HEADER = "PK";
Rn.CENTRAL_FILE_HEADER = "PK";
Rn.CENTRAL_DIRECTORY_END = "PK";
Rn.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07";
Rn.ZIP64_CENTRAL_DIRECTORY_END = "PK";
Rn.DATA_DESCRIPTOR = "PK\x07\b";
var wr = Ae(), Gr = Ct, Os = jr, yp = Rd, Ga = Rn, me = function(e, t) {
  var n = "", r;
  for (r = 0; r < t; r++)
    n += String.fromCharCode(e & 255), e = e >>> 8;
  return n;
}, r3 = function(e, t) {
  var n = e;
  return e || (n = t ? 16893 : 33204), (n & 65535) << 16;
}, i3 = function(e) {
  return (e || 0) & 63;
}, ty = function(e, t, n, r, i, a) {
  var o = e.file, c = e.compression, u = a !== Os.utf8encode, s = wr.transformTo("string", a(o.name)), d = wr.transformTo("string", Os.utf8encode(o.name)), g = o.comment, f = wr.transformTo("string", a(g)), p = wr.transformTo("string", Os.utf8encode(g)), b = d.length !== o.name.length, m = p.length !== g.length, y, h, l = "", v = "", D = "", x = o.dir, w = o.date, E = {
    crc32: 0,
    compressedSize: 0,
    uncompressedSize: 0
  };
  (!t || n) && (E.crc32 = e.crc32, E.compressedSize = e.compressedSize, E.uncompressedSize = e.uncompressedSize);
  var k = 0;
  t && (k |= 8), !u && (b || m) && (k |= 2048);
  var W = 0, q = 0;
  x && (W |= 16), i === "UNIX" ? (q = 798, W |= r3(o.unixPermissions, x)) : (q = 20, W |= i3(o.dosPermissions)), y = w.getUTCHours(), y = y << 6, y = y | w.getUTCMinutes(), y = y << 5, y = y | w.getUTCSeconds() / 2, h = w.getUTCFullYear() - 1980, h = h << 4, h = h | w.getUTCMonth() + 1, h = h << 5, h = h | w.getUTCDate(), b && (v = // Version
  me(1, 1) + // NameCRC32
  me(yp(s), 4) + // UnicodeName
  d, l += // Info-ZIP Unicode Path Extra Field
  "up" + // size
  me(v.length, 2) + // content
  v), m && (D = // Version
  me(1, 1) + // CommentCRC32
  me(yp(f), 4) + // UnicodeName
  p, l += // Info-ZIP Unicode Path Extra Field
  "uc" + // size
  me(D.length, 2) + // content
  D);
  var $ = "";
  $ += `
\0`, $ += me(k, 2), $ += c.magic, $ += me(y, 2), $ += me(h, 2), $ += me(E.crc32, 4), $ += me(E.compressedSize, 4), $ += me(E.uncompressedSize, 4), $ += me(s.length, 2), $ += me(l.length, 2);
  var B = Ga.LOCAL_FILE_HEADER + $ + s + l, P = Ga.CENTRAL_FILE_HEADER + // version made by (00: DOS)
  me(q, 2) + // file header (common to file and central directory)
  $ + // file comment length
  me(f.length, 2) + // disk number start
  "\0\0\0\0" + // external file attributes
  me(W, 4) + // relative offset of local header
  me(r, 4) + // file name
  s + // extra field
  l + // file comment
  f;
  return {
    fileRecord: B,
    dirRecord: P
  };
}, a3 = function(e, t, n, r, i) {
  var a = "", o = wr.transformTo("string", i(r));
  return a = Ga.CENTRAL_DIRECTORY_END + // number of this disk
  "\0\0\0\0" + // total number of entries in the central directory on this disk
  me(e, 2) + // total number of entries in the central directory
  me(e, 2) + // size of the central directory   4 bytes
  me(t, 4) + // offset of start of central directory with respect to the starting disk number
  me(n, 4) + // .ZIP file comment length
  me(o.length, 2) + // .ZIP file comment
  o, a;
}, o3 = function(e) {
  var t = "";
  return t = Ga.DATA_DESCRIPTOR + // crc-32                          4 bytes
  me(e.crc32, 4) + // compressed size                 4 bytes
  me(e.compressedSize, 4) + // uncompressed size               4 bytes
  me(e.uncompressedSize, 4), t;
};
function Nt(e, t, n, r) {
  Gr.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t, this.zipPlatform = n, this.encodeFileName = r, this.streamFiles = e, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
}
wr.inherits(Nt, Gr);
Nt.prototype.push = function(e) {
  var t = e.meta.percent || 0, n = this.entriesCount, r = this._sources.length;
  this.accumulate ? this.contentBuffer.push(e) : (this.bytesWritten += e.data.length, Gr.prototype.push.call(this, {
    data: e.data,
    meta: {
      currentFile: this.currentFile,
      percent: n ? (t + 100 * (n - r - 1)) / n : 100
    }
  }));
};
Nt.prototype.openedSource = function(e) {
  this.currentSourceOffset = this.bytesWritten, this.currentFile = e.file.name;
  var t = this.streamFiles && !e.file.dir;
  if (t) {
    var n = ty(e, t, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
    this.push({
      data: n.fileRecord,
      meta: { percent: 0 }
    });
  } else
    this.accumulate = !0;
};
Nt.prototype.closedSource = function(e) {
  this.accumulate = !1;
  var t = this.streamFiles && !e.file.dir, n = ty(e, t, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
  if (this.dirRecords.push(n.dirRecord), t)
    this.push({
      data: o3(e),
      meta: { percent: 100 }
    });
  else
    for (this.push({
      data: n.fileRecord,
      meta: { percent: 0 }
    }); this.contentBuffer.length; )
      this.push(this.contentBuffer.shift());
  this.currentFile = null;
};
Nt.prototype.flush = function() {
  for (var e = this.bytesWritten, t = 0; t < this.dirRecords.length; t++)
    this.push({
      data: this.dirRecords[t],
      meta: { percent: 100 }
    });
  var n = this.bytesWritten - e, r = a3(this.dirRecords.length, n, e, this.zipComment, this.encodeFileName);
  this.push({
    data: r,
    meta: { percent: 100 }
  });
};
Nt.prototype.prepareNextSource = function() {
  this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
};
Nt.prototype.registerPrevious = function(e) {
  this._sources.push(e);
  var t = this;
  return e.on("data", function(n) {
    t.processChunk(n);
  }), e.on("end", function() {
    t.closedSource(t.previous.streamInfo), t._sources.length ? t.prepareNextSource() : t.end();
  }), e.on("error", function(n) {
    t.error(n);
  }), this;
};
Nt.prototype.resume = function() {
  if (!Gr.prototype.resume.call(this))
    return !1;
  if (!this.previous && this._sources.length)
    return this.prepareNextSource(), !0;
  if (!this.previous && !this._sources.length && !this.generatedError)
    return this.end(), !0;
};
Nt.prototype.error = function(e) {
  var t = this._sources;
  if (!Gr.prototype.error.call(this, e))
    return !1;
  for (var n = 0; n < t.length; n++)
    try {
      t[n].error(e);
    } catch {
    }
  return !0;
};
Nt.prototype.lock = function() {
  Gr.prototype.lock.call(this);
  for (var e = this._sources, t = 0; t < e.length; t++)
    e[t].lock();
};
var c3 = Nt, s3 = Ao, u3 = c3, d3 = function(e, t) {
  var n = e || t, r = s3[n];
  if (!r)
    throw new Error(n + " is not a valid compression method !");
  return r;
};
fb.generateWorker = function(e, t, n) {
  var r = new u3(t.streamFiles, n, t.platform, t.encodeFileName), i = 0;
  try {
    e.forEach(function(a, o) {
      i++;
      var c = d3(o.options.compression, t.compression), u = o.options.compressionOptions || t.compressionOptions || {}, s = o.dir, d = o.date;
      o._compressWorker(c, u).withStreamInfo("file", {
        name: a,
        dir: s,
        date: d,
        comment: o.comment || "",
        unixPermissions: o.unixPermissions,
        dosPermissions: o.dosPermissions
      }).pipe(r);
    }), r.entriesCount = i;
  } catch (a) {
    r.error(a);
  }
  return r;
};
var l3 = Ae(), Ro = Ct;
function Gi(e, t) {
  Ro.call(this, "Nodejs stream input adapter for " + e), this._upstreamEnded = !1, this._bindStream(t);
}
l3.inherits(Gi, Ro);
Gi.prototype._bindStream = function(e) {
  var t = this;
  this._stream = e, e.pause(), e.on("data", function(n) {
    t.push({
      data: n,
      meta: {
        percent: 0
      }
    });
  }).on("error", function(n) {
    t.isPaused ? this.generatedError = n : t.error(n);
  }).on("end", function() {
    t.isPaused ? t._upstreamEnded = !0 : t.end();
  });
};
Gi.prototype.pause = function() {
  return Ro.prototype.pause.call(this) ? (this._stream.pause(), !0) : !1;
};
Gi.prototype.resume = function() {
  return Ro.prototype.resume.call(this) ? (this._upstreamEnded ? this.end() : this._stream.resume(), !0) : !1;
};
var f3 = Gi, h3 = jr, mi = Ae(), ny = Ct, p3 = cb, ry = Ft, vp = Ld, g3 = cU, m3 = fb, Dp = To, b3 = f3, iy = function(e, t, n) {
  var r = mi.getTypeOf(t), i, a = mi.extend(n || {}, ry);
  a.date = a.date || /* @__PURE__ */ new Date(), a.compression !== null && (a.compression = a.compression.toUpperCase()), typeof a.unixPermissions == "string" && (a.unixPermissions = parseInt(a.unixPermissions, 8)), a.unixPermissions && a.unixPermissions & 16384 && (a.dir = !0), a.dosPermissions && a.dosPermissions & 16 && (a.dir = !0), a.dir && (e = ay(e)), a.createFolders && (i = y3(e)) && oy.call(this, i, !0);
  var o = r === "string" && a.binary === !1 && a.base64 === !1;
  (!n || typeof n.binary > "u") && (a.binary = !o);
  var c = t instanceof vp && t.uncompressedSize === 0;
  (c || a.dir || !t || t.length === 0) && (a.base64 = !1, a.binary = !0, t = "", a.compression = "STORE", r = "string");
  var u = null;
  t instanceof vp || t instanceof ny ? u = t : Dp.isNode && Dp.isStream(t) ? u = new b3(e, t) : u = mi.prepareContent(e, t, a.binary, a.optimizedBinaryString, a.base64);
  var s = new g3(e, u, a);
  this.files[e] = s;
}, y3 = function(e) {
  e.slice(-1) === "/" && (e = e.substring(0, e.length - 1));
  var t = e.lastIndexOf("/");
  return t > 0 ? e.substring(0, t) : "";
}, ay = function(e) {
  return e.slice(-1) !== "/" && (e += "/"), e;
}, oy = function(e, t) {
  return t = typeof t < "u" ? t : ry.createFolders, e = ay(e), this.files[e] || iy.call(this, e, null, {
    dir: !0,
    createFolders: t
  }), this.files[e];
};
function xp(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}
var v3 = {
  /**
   * @see loadAsync
   */
  load: function() {
    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
  },
  /**
   * Call a callback function for each entry at this folder level.
   * @param {Function} cb the callback function:
   * function (relativePath, file) {...}
   * It takes 2 arguments : the relative path and the file.
   */
  forEach: function(e) {
    var t, n, r;
    for (t in this.files)
      r = this.files[t], n = t.slice(this.root.length, t.length), n && t.slice(0, this.root.length) === this.root && e(n, r);
  },
  /**
   * Filter nested files/folders with the specified function.
   * @param {Function} search the predicate to use :
   * function (relativePath, file) {...}
   * It takes 2 arguments : the relative path and the file.
   * @return {Array} An array of matching elements.
   */
  filter: function(e) {
    var t = [];
    return this.forEach(function(n, r) {
      e(n, r) && t.push(r);
    }), t;
  },
  /**
   * Add a file to the zip file, or search a file.
   * @param   {string|RegExp} name The name of the file to add (if data is defined),
   * the name of the file to find (if no data) or a regex to match files.
   * @param   {String|ArrayBuffer|Uint8Array|Buffer} data  The file data, either raw or base64 encoded
   * @param   {Object} o     File options
   * @return  {JSZip|Object|Array} this JSZip object (when adding a file),
   * a file (when searching by string) or an array of files (when searching by regex).
   */
  file: function(e, t, n) {
    if (arguments.length === 1)
      if (xp(e)) {
        var r = e;
        return this.filter(function(a, o) {
          return !o.dir && r.test(a);
        });
      } else {
        var i = this.files[this.root + e];
        return i && !i.dir ? i : null;
      }
    else
      e = this.root + e, iy.call(this, e, t, n);
    return this;
  },
  /**
   * Add a directory to the zip file, or search.
   * @param   {String|RegExp} arg The name of the directory to add, or a regex to search folders.
   * @return  {JSZip} an object with the new directory as the root, or an array containing matching folders.
   */
  folder: function(e) {
    if (!e)
      return this;
    if (xp(e))
      return this.filter(function(i, a) {
        return a.dir && e.test(i);
      });
    var t = this.root + e, n = oy.call(this, t), r = this.clone();
    return r.root = n.name, r;
  },
  /**
   * Delete a file, or a directory and all sub-files, from the zip
   * @param {string} name the name of the file to delete
   * @return {JSZip} this JSZip object
   */
  remove: function(e) {
    e = this.root + e;
    var t = this.files[e];
    if (t || (e.slice(-1) !== "/" && (e += "/"), t = this.files[e]), t && !t.dir)
      delete this.files[e];
    else
      for (var n = this.filter(function(i, a) {
        return a.name.slice(0, e.length) === e;
      }), r = 0; r < n.length; r++)
        delete this.files[n[r].name];
    return this;
  },
  /**
   * @deprecated This method has been removed in JSZip 3.0, please check the upgrade guide.
   */
  generate: function() {
    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
  },
  /**
   * Generate the complete zip file as an internal stream.
   * @param {Object} options the options to generate the zip file :
   * - compression, "STORE" by default.
   * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
   * @return {StreamHelper} the streamed zip file.
   */
  generateInternalStream: function(e) {
    var t, n = {};
    try {
      if (n = mi.extend(e || {}, {
        streamFiles: !1,
        compression: "STORE",
        compressionOptions: null,
        type: "",
        platform: "DOS",
        comment: null,
        mimeType: "application/zip",
        encodeFileName: h3.utf8encode
      }), n.type = n.type.toLowerCase(), n.compression = n.compression.toUpperCase(), n.type === "binarystring" && (n.type = "string"), !n.type)
        throw new Error("No output type specified.");
      mi.checkSupport(n.type), (n.platform === "darwin" || n.platform === "freebsd" || n.platform === "linux" || n.platform === "sunos") && (n.platform = "UNIX"), n.platform === "win32" && (n.platform = "DOS");
      var r = n.comment || this.comment || "";
      t = m3.generateWorker(this, n, r);
    } catch (i) {
      t = new ny("error"), t.error(i);
    }
    return new p3(t, n.type || "string", n.mimeType);
  },
  /**
   * Generate the complete zip file asynchronously.
   * @see generateInternalStream
   */
  generateAsync: function(e, t) {
    return this.generateInternalStream(e).accumulate(t);
  },
  /**
   * Generate the complete zip file asynchronously.
   * @see generateInternalStream
   */
  generateNodeStream: function(e, t) {
    return e = e || {}, e.type || (e.type = "nodebuffer"), this.generateInternalStream(e).toNodejsStream(t);
  }
}, D3 = v3, x3 = Ae();
function cy(e) {
  this.data = e, this.length = e.length, this.index = 0, this.zero = 0;
}
cy.prototype = {
  /**
   * Check that the offset will not go too far.
   * @param {string} offset the additional offset to check.
   * @throws {Error} an Error if the offset is out of bounds.
   */
  checkOffset: function(e) {
    this.checkIndex(this.index + e);
  },
  /**
   * Check that the specified index will not be too far.
   * @param {string} newIndex the index to check.
   * @throws {Error} an Error if the index is out of bounds.
   */
  checkIndex: function(e) {
    if (this.length < this.zero + e || e < 0)
      throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?");
  },
  /**
   * Change the index.
   * @param {number} newIndex The new index.
   * @throws {Error} if the new index is out of the data.
   */
  setIndex: function(e) {
    this.checkIndex(e), this.index = e;
  },
  /**
   * Skip the next n bytes.
   * @param {number} n the number of bytes to skip.
   * @throws {Error} if the new index is out of the data.
   */
  skip: function(e) {
    this.setIndex(this.index + e);
  },
  /**
   * Get the byte at the specified index.
   * @param {number} i the index to use.
   * @return {number} a byte.
   */
  byteAt: function() {
  },
  /**
   * Get the next number with a given byte size.
   * @param {number} size the number of bytes to read.
   * @return {number} the corresponding number.
   */
  readInt: function(e) {
    var t = 0, n;
    for (this.checkOffset(e), n = this.index + e - 1; n >= this.index; n--)
      t = (t << 8) + this.byteAt(n);
    return this.index += e, t;
  },
  /**
   * Get the next string with a given byte size.
   * @param {number} size the number of bytes to read.
   * @return {string} the corresponding string.
   */
  readString: function(e) {
    return x3.transformTo("string", this.readData(e));
  },
  /**
   * Get raw data without conversion, <size> bytes.
   * @param {number} size the number of bytes to read.
   * @return {Object} the raw data, implementation specific.
   */
  readData: function() {
  },
  /**
   * Find the last occurrence of a zip signature (4 bytes).
   * @param {string} sig the signature to find.
   * @return {number} the index of the last occurrence, -1 if not found.
   */
  lastIndexOfSignature: function() {
  },
  /**
   * Read the signature (4 bytes) at the current position and compare it with sig.
   * @param {string} sig the expected signature
   * @return {boolean} true if the signature matches, false otherwise.
   */
  readAndCheckSignature: function() {
  },
  /**
   * Get the next date.
   * @return {Date} the date.
   */
  readDate: function() {
    var e = this.readInt(4);
    return new Date(Date.UTC(
      (e >> 25 & 127) + 1980,
      // year
      (e >> 21 & 15) - 1,
      // month
      e >> 16 & 31,
      // day
      e >> 11 & 31,
      // hour
      e >> 5 & 63,
      // minute
      (e & 31) << 1
    ));
  }
};
var sy = cy, uy = sy, _3 = Ae();
function Yr(e) {
  uy.call(this, e);
  for (var t = 0; t < this.data.length; t++)
    e[t] = e[t] & 255;
}
_3.inherits(Yr, uy);
Yr.prototype.byteAt = function(e) {
  return this.data[this.zero + e];
};
Yr.prototype.lastIndexOfSignature = function(e) {
  for (var t = e.charCodeAt(0), n = e.charCodeAt(1), r = e.charCodeAt(2), i = e.charCodeAt(3), a = this.length - 4; a >= 0; --a)
    if (this.data[a] === t && this.data[a + 1] === n && this.data[a + 2] === r && this.data[a + 3] === i)
      return a - this.zero;
  return -1;
};
Yr.prototype.readAndCheckSignature = function(e) {
  var t = e.charCodeAt(0), n = e.charCodeAt(1), r = e.charCodeAt(2), i = e.charCodeAt(3), a = this.readData(4);
  return t === a[0] && n === a[1] && r === a[2] && i === a[3];
};
Yr.prototype.readData = function(e) {
  if (this.checkOffset(e), e === 0)
    return [];
  var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
  return this.index += e, t;
};
var dy = Yr, ly = sy, w3 = Ae();
function Kr(e) {
  ly.call(this, e);
}
w3.inherits(Kr, ly);
Kr.prototype.byteAt = function(e) {
  return this.data.charCodeAt(this.zero + e);
};
Kr.prototype.lastIndexOfSignature = function(e) {
  return this.data.lastIndexOf(e) - this.zero;
};
Kr.prototype.readAndCheckSignature = function(e) {
  var t = this.readData(4);
  return e === t;
};
Kr.prototype.readData = function(e) {
  this.checkOffset(e);
  var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
  return this.index += e, t;
};
var T3 = Kr, fy = dy, U3 = Ae();
function Vd(e) {
  fy.call(this, e);
}
U3.inherits(Vd, fy);
Vd.prototype.readData = function(e) {
  if (this.checkOffset(e), e === 0)
    return new Uint8Array(0);
  var t = this.data.subarray(this.zero + this.index, this.zero + this.index + e);
  return this.index += e, t;
};
var hy = Vd, py = hy, E3 = Ae();
function Hd(e) {
  py.call(this, e);
}
E3.inherits(Hd, py);
Hd.prototype.readData = function(e) {
  this.checkOffset(e);
  var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
  return this.index += e, t;
};
var A3 = Hd, Da = Ae(), _p = Be, C3 = dy, F3 = T3, S3 = A3, k3 = hy, gy = function(e) {
  var t = Da.getTypeOf(e);
  return Da.checkSupport(t), t === "string" && !_p.uint8array ? new F3(e) : t === "nodebuffer" ? new S3(e) : _p.uint8array ? new k3(Da.transformTo("uint8array", e)) : new C3(Da.transformTo("array", e));
}, Is = gy, bn = Ae(), B3 = Ld, wp = Rd, xa = jr, _a = Ao, R3 = Be, O3 = 0, I3 = 3, W3 = function(e) {
  for (var t in _a)
    if (Object.prototype.hasOwnProperty.call(_a, t) && _a[t].magic === e)
      return _a[t];
  return null;
};
function my(e, t) {
  this.options = e, this.loadOptions = t;
}
my.prototype = {
  /**
   * say if the file is encrypted.
   * @return {boolean} true if the file is encrypted, false otherwise.
   */
  isEncrypted: function() {
    return (this.bitFlag & 1) === 1;
  },
  /**
   * say if the file has utf-8 filename/comment.
   * @return {boolean} true if the filename/comment is in utf-8, false otherwise.
   */
  useUTF8: function() {
    return (this.bitFlag & 2048) === 2048;
  },
  /**
   * Read the local part of a zip file and add the info in this object.
   * @param {DataReader} reader the reader to use.
   */
  readLocalPart: function(e) {
    var t, n;
    if (e.skip(22), this.fileNameLength = e.readInt(2), n = e.readInt(2), this.fileName = e.readData(this.fileNameLength), e.skip(n), this.compressedSize === -1 || this.uncompressedSize === -1)
      throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
    if (t = W3(this.compressionMethod), t === null)
      throw new Error("Corrupted zip : compression " + bn.pretty(this.compressionMethod) + " unknown (inner file : " + bn.transformTo("string", this.fileName) + ")");
    this.decompressed = new B3(this.compressedSize, this.uncompressedSize, this.crc32, t, e.readData(this.compressedSize));
  },
  /**
   * Read the central part of a zip file and add the info in this object.
   * @param {DataReader} reader the reader to use.
   */
  readCentralPart: function(e) {
    this.versionMadeBy = e.readInt(2), e.skip(2), this.bitFlag = e.readInt(2), this.compressionMethod = e.readString(2), this.date = e.readDate(), this.crc32 = e.readInt(4), this.compressedSize = e.readInt(4), this.uncompressedSize = e.readInt(4);
    var t = e.readInt(2);
    if (this.extraFieldsLength = e.readInt(2), this.fileCommentLength = e.readInt(2), this.diskNumberStart = e.readInt(2), this.internalFileAttributes = e.readInt(2), this.externalFileAttributes = e.readInt(4), this.localHeaderOffset = e.readInt(4), this.isEncrypted())
      throw new Error("Encrypted zip are not supported");
    e.skip(t), this.readExtraFields(e), this.parseZIP64ExtraField(e), this.fileComment = e.readData(this.fileCommentLength);
  },
  /**
   * Parse the external file attributes and get the unix/dos permissions.
   */
  processAttributes: function() {
    this.unixPermissions = null, this.dosPermissions = null;
    var e = this.versionMadeBy >> 8;
    this.dir = !!(this.externalFileAttributes & 16), e === O3 && (this.dosPermissions = this.externalFileAttributes & 63), e === I3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), !this.dir && this.fileNameStr.slice(-1) === "/" && (this.dir = !0);
  },
  /**
   * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
   * @param {DataReader} reader the reader to use.
   */
  parseZIP64ExtraField: function() {
    if (this.extraFields[1]) {
      var e = Is(this.extraFields[1].value);
      this.uncompressedSize === bn.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)), this.compressedSize === bn.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)), this.localHeaderOffset === bn.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)), this.diskNumberStart === bn.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4));
    }
  },
  /**
   * Read the central part of a zip file and add the info in this object.
   * @param {DataReader} reader the reader to use.
   */
  readExtraFields: function(e) {
    var t = e.index + this.extraFieldsLength, n, r, i;
    for (this.extraFields || (this.extraFields = {}); e.index + 4 < t; )
      n = e.readInt(2), r = e.readInt(2), i = e.readData(r), this.extraFields[n] = {
        id: n,
        length: r,
        value: i
      };
    e.setIndex(t);
  },
  /**
   * Apply an UTF8 transformation if needed.
   */
  handleUTF8: function() {
    var e = R3.uint8array ? "uint8array" : "array";
    if (this.useUTF8())
      this.fileNameStr = xa.utf8decode(this.fileName), this.fileCommentStr = xa.utf8decode(this.fileComment);
    else {
      var t = this.findExtraFieldUnicodePath();
      if (t !== null)
        this.fileNameStr = t;
      else {
        var n = bn.transformTo(e, this.fileName);
        this.fileNameStr = this.loadOptions.decodeFileName(n);
      }
      var r = this.findExtraFieldUnicodeComment();
      if (r !== null)
        this.fileCommentStr = r;
      else {
        var i = bn.transformTo(e, this.fileComment);
        this.fileCommentStr = this.loadOptions.decodeFileName(i);
      }
    }
  },
  /**
   * Find the unicode path declared in the extra field, if any.
   * @return {String} the unicode path, null otherwise.
   */
  findExtraFieldUnicodePath: function() {
    var e = this.extraFields[28789];
    if (e) {
      var t = Is(e.value);
      return t.readInt(1) !== 1 || wp(this.fileName) !== t.readInt(4) ? null : xa.utf8decode(t.readData(e.length - 5));
    }
    return null;
  },
  /**
   * Find the unicode comment declared in the extra field, if any.
   * @return {String} the unicode comment, null otherwise.
   */
  findExtraFieldUnicodeComment: function() {
    var e = this.extraFields[25461];
    if (e) {
      var t = Is(e.value);
      return t.readInt(1) !== 1 || wp(this.fileComment) !== t.readInt(4) ? null : xa.utf8decode(t.readData(e.length - 5));
    }
    return null;
  }
};
var N3 = my, L3 = gy, rn = Ae(), kt = Rn, M3 = N3, $3 = Be;
function by(e) {
  this.files = [], this.loadOptions = e;
}
by.prototype = {
  /**
   * Check that the reader is on the specified signature.
   * @param {string} expectedSignature the expected signature.
   * @throws {Error} if it is an other signature.
   */
  checkSignature: function(e) {
    if (!this.reader.readAndCheckSignature(e)) {
      this.reader.index -= 4;
      var t = this.reader.readString(4);
      throw new Error("Corrupted zip or bug: unexpected signature (" + rn.pretty(t) + ", expected " + rn.pretty(e) + ")");
    }
  },
  /**
   * Check if the given signature is at the given index.
   * @param {number} askedIndex the index to check.
   * @param {string} expectedSignature the signature to expect.
   * @return {boolean} true if the signature is here, false otherwise.
   */
  isSignature: function(e, t) {
    var n = this.reader.index;
    this.reader.setIndex(e);
    var r = this.reader.readString(4), i = r === t;
    return this.reader.setIndex(n), i;
  },
  /**
   * Read the end of the central directory.
   */
  readBlockEndOfCentral: function() {
    this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
    var e = this.reader.readData(this.zipCommentLength), t = $3.uint8array ? "uint8array" : "array", n = rn.transformTo(t, e);
    this.zipComment = this.loadOptions.decodeFileName(n);
  },
  /**
   * Read the end of the Zip 64 central directory.
   * Not merged with the method readEndOfCentral :
   * The end of central can coexist with its Zip64 brother,
   * I don't want to read the wrong number of bytes !
   */
  readBlockZip64EndOfCentral: function() {
    this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
    for (var e = this.zip64EndOfCentralSize - 44, t = 0, n, r, i; t < e; )
      n = this.reader.readInt(2), r = this.reader.readInt(4), i = this.reader.readData(r), this.zip64ExtensibleData[n] = {
        id: n,
        length: r,
        value: i
      };
  },
  /**
   * Read the end of the Zip 64 central directory locator.
   */
  readBlockZip64EndOfCentralLocator: function() {
    if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), this.disksCount > 1)
      throw new Error("Multi-volumes zip are not supported");
  },
  /**
   * Read the local files, based on the offset read in the central part.
   */
  readLocalFiles: function() {
    var e, t;
    for (e = 0; e < this.files.length; e++)
      t = this.files[e], this.reader.setIndex(t.localHeaderOffset), this.checkSignature(kt.LOCAL_FILE_HEADER), t.readLocalPart(this.reader), t.handleUTF8(), t.processAttributes();
  },
  /**
   * Read the central directory.
   */
  readCentralDir: function() {
    var e;
    for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(kt.CENTRAL_FILE_HEADER); )
      e = new M3({
        zip64: this.zip64
      }, this.loadOptions), e.readCentralPart(this.reader), this.files.push(e);
    if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0)
      throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
  },
  /**
   * Read the end of central directory.
   */
  readEndOfCentral: function() {
    var e = this.reader.lastIndexOfSignature(kt.CENTRAL_DIRECTORY_END);
    if (e < 0) {
      var t = !this.isSignature(0, kt.LOCAL_FILE_HEADER);
      throw t ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
    }
    this.reader.setIndex(e);
    var n = e;
    if (this.checkSignature(kt.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === rn.MAX_VALUE_16BITS || this.diskWithCentralDirStart === rn.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === rn.MAX_VALUE_16BITS || this.centralDirRecords === rn.MAX_VALUE_16BITS || this.centralDirSize === rn.MAX_VALUE_32BITS || this.centralDirOffset === rn.MAX_VALUE_32BITS) {
      if (this.zip64 = !0, e = this.reader.lastIndexOfSignature(kt.ZIP64_CENTRAL_DIRECTORY_LOCATOR), e < 0)
        throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
      if (this.reader.setIndex(e), this.checkSignature(kt.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, kt.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(kt.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0))
        throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
      this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(kt.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
    }
    var r = this.centralDirOffset + this.centralDirSize;
    this.zip64 && (r += 20, r += 12 + this.zip64EndOfCentralSize);
    var i = n - r;
    if (i > 0)
      this.isSignature(n, kt.CENTRAL_FILE_HEADER) || (this.reader.zero = i);
    else if (i < 0)
      throw new Error("Corrupted zip: missing " + Math.abs(i) + " bytes.");
  },
  prepareReader: function(e) {
    this.reader = L3(e);
  },
  /**
   * Read a zip file and create ZipEntries.
   * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
   */
  load: function(e) {
    this.prepareReader(e), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
  }
};
var P3 = by, Ws = Ae(), Wa = ji, z3 = jr, q3 = P3, j3 = lb, Tp = To;
function Z3(e) {
  return new Wa.Promise(function(t, n) {
    var r = e.decompressed.getContentWorker().pipe(new j3());
    r.on("error", function(i) {
      n(i);
    }).on("end", function() {
      r.streamInfo.crc32 !== e.decompressed.crc32 ? n(new Error("Corrupted zip : CRC32 mismatch")) : t();
    }).resume();
  });
}
var X3 = function(e, t) {
  var n = this;
  return t = Ws.extend(t || {}, {
    base64: !1,
    checkCRC32: !1,
    optimizedBinaryString: !1,
    createFolders: !1,
    decodeFileName: z3.utf8decode
  }), Tp.isNode && Tp.isStream(e) ? Wa.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : Ws.prepareContent("the loaded zip file", e, !0, t.optimizedBinaryString, t.base64).then(function(r) {
    var i = new q3(t);
    return i.load(r), i;
  }).then(function(i) {
    var a = [Wa.Promise.resolve(i)], o = i.files;
    if (t.checkCRC32)
      for (var c = 0; c < o.length; c++)
        a.push(Z3(o[c]));
    return Wa.Promise.all(a);
  }).then(function(i) {
    for (var a = i.shift(), o = a.files, c = 0; c < o.length; c++) {
      var u = o[c], s = u.fileNameStr, d = Ws.resolve(u.fileNameStr);
      n.file(d, u.decompressed, {
        binary: !0,
        optimizedBinaryString: !0,
        date: u.date,
        dir: u.dir,
        comment: u.fileCommentStr.length ? u.fileCommentStr : null,
        unixPermissions: u.unixPermissions,
        dosPermissions: u.dosPermissions,
        createFolders: t.createFolders
      }), u.dir || (n.file(d).unsafeOriginalName = s);
    }
    return a.zipComment.length && (n.comment = a.zipComment), n;
  });
};
function Ut() {
  if (!(this instanceof Ut))
    return new Ut();
  if (arguments.length)
    throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
  this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
    var e = new Ut();
    for (var t in this)
      typeof this[t] != "function" && (e[t] = this[t]);
    return e;
  };
}
Ut.prototype = D3;
Ut.prototype.loadAsync = X3;
Ut.support = Be;
Ut.defaults = Ft;
Ut.version = "3.10.1";
Ut.loadAsync = function(e, t) {
  return new Ut().loadAsync(e, t);
};
Ut.external = ji;
var V3 = Ut, H3 = xo, G3 = V3;
Pi.openArrayBuffer = Y3;
Pi.splitPath = K3;
Pi.joinPath = J3;
function Y3(e) {
  return G3.loadAsync(e).then(function(t) {
    function n(o) {
      return t.file(o) !== null;
    }
    function r(o, c) {
      return t.file(o).async("uint8array").then(function(u) {
        if (c === "base64")
          return H3.fromByteArray(u);
        if (c) {
          var s = new TextDecoder(c);
          return s.decode(u);
        } else
          return u;
      });
    }
    function i(o, c) {
      t.file(o, c);
    }
    function a() {
      return t.generateAsync({ type: "arraybuffer" });
    }
    return {
      exists: n,
      read: r,
      write: i,
      toArrayBuffer: a
    };
  });
}
function K3(e) {
  var t = e.lastIndexOf("/");
  return t === -1 ? { dirname: "", basename: e } : {
    dirname: e.substring(0, t),
    basename: e.substring(t + 1)
  };
}
function J3() {
  var e = Array.prototype.filter.call(arguments, function(n) {
    return n;
  }), t = [];
  return e.forEach(function(n) {
    /^\//.test(n) ? t = [n] : t.push(n);
  }), t.join("/");
}
var Gd = {}, pn = {}, Jr = {}, Oo = Se;
Jr.Element = Qr;
Jr.element = function(e, t, n) {
  return new Qr(e, t, n);
};
Jr.text = function(e) {
  return {
    type: "text",
    value: e
  };
};
var yy = Jr.emptyElement = {
  first: function() {
    return null;
  },
  firstOrEmpty: function() {
    return yy;
  },
  attributes: {},
  children: []
};
function Qr(e, t, n) {
  this.type = "element", this.name = e, this.attributes = t || {}, this.children = n || [];
}
Qr.prototype.first = function(e) {
  return Oo.find(this.children, function(t) {
    return t.name === e;
  });
};
Qr.prototype.firstOrEmpty = function(e) {
  return this.first(e) || yy;
};
Qr.prototype.getElementsByTagName = function(e) {
  var t = Oo.filter(this.children, function(n) {
    return n.name === e;
  });
  return vy(t);
};
Qr.prototype.text = function() {
  if (this.children.length === 0)
    return "";
  if (this.children.length !== 1 || this.children[0].type !== "text")
    throw new Error("Not implemented");
  return this.children[0].value;
};
var Q3 = {
  getElementsByTagName: function(e) {
    return vy(Oo.flatten(this.map(function(t) {
      return t.getElementsByTagName(e);
    }, !0)));
  }
};
function vy(e) {
  return Oo.extend(e, Q3);
}
var Dy = {}, Yd = {}, Io = {}, Kt = {}, gn = {};
function e8(e, t, n) {
  if (n === void 0 && (n = Array.prototype), e && typeof n.find == "function")
    return n.find.call(e, t);
  for (var r = 0; r < e.length; r++)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      var i = e[r];
      if (t.call(void 0, i, r, e))
        return i;
    }
}
function Kd(e, t) {
  return t === void 0 && (t = Object), t && typeof t.freeze == "function" ? t.freeze(e) : e;
}
function t8(e, t) {
  if (e === null || typeof e != "object")
    throw new TypeError("target is not an object");
  for (var n in t)
    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
  return e;
}
var xy = Kd({
  /**
   * `text/html`, the only mime type that triggers treating an XML document as HTML.
   *
   * @see DOMParser.SupportedType.isHTML
   * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
   * @see https://en.wikipedia.org/wiki/HTML Wikipedia
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
   * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
   */
  HTML: "text/html",
  /**
   * Helper method to check a mime type if it indicates an HTML document
   *
   * @param {string} [value]
   * @returns {boolean}
   *
   * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
   * @see https://en.wikipedia.org/wiki/HTML Wikipedia
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
   * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */
  isHTML: function(e) {
    return e === xy.HTML;
  },
  /**
   * `application/xml`, the standard mime type for XML documents.
   *
   * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
   * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
   * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
   */
  XML_APPLICATION: "application/xml",
  /**
   * `text/html`, an alias for `application/xml`.
   *
   * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
   * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
   * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
   */
  XML_TEXT: "text/xml",
  /**
   * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
   * but is parsed as an XML document.
   *
   * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
   * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
   */
  XML_XHTML_APPLICATION: "application/xhtml+xml",
  /**
   * `image/svg+xml`,
   *
   * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
   * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
   * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
   */
  XML_SVG_IMAGE: "image/svg+xml"
}), _y = Kd({
  /**
   * The XHTML namespace.
   *
   * @see http://www.w3.org/1999/xhtml
   */
  HTML: "http://www.w3.org/1999/xhtml",
  /**
   * Checks if `uri` equals `NAMESPACE.HTML`.
   *
   * @param {string} [uri]
   *
   * @see NAMESPACE.HTML
   */
  isHTML: function(e) {
    return e === _y.HTML;
  },
  /**
   * The SVG namespace.
   *
   * @see http://www.w3.org/2000/svg
   */
  SVG: "http://www.w3.org/2000/svg",
  /**
   * The `xml:` namespace.
   *
   * @see http://www.w3.org/XML/1998/namespace
   */
  XML: "http://www.w3.org/XML/1998/namespace",
  /**
   * The `xmlns:` namespace
   *
   * @see https://www.w3.org/2000/xmlns/
   */
  XMLNS: "http://www.w3.org/2000/xmlns/"
});
gn.assign = t8;
gn.find = e8;
gn.freeze = Kd;
gn.MIME_TYPE = xy;
gn.NAMESPACE = _y;
var wy = gn, Zt = wy.find, ki = wy.NAMESPACE;
function n8(e) {
  return e !== "";
}
function r8(e) {
  return e ? e.split(/[\t\n\f\r ]+/).filter(n8) : [];
}
function i8(e, t) {
  return e.hasOwnProperty(t) || (e[t] = !0), e;
}
function Up(e) {
  if (!e) return [];
  var t = r8(e);
  return Object.keys(t.reduce(i8, {}));
}
function a8(e) {
  return function(t) {
    return e && e.indexOf(t) !== -1;
  };
}
function Yi(e, t) {
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
}
function dt(e, t) {
  var n = e.prototype;
  if (!(n instanceof t)) {
    let r = function() {
    };
    r.prototype = t.prototype, r = new r(), Yi(n, r), e.prototype = n = r;
  }
  n.constructor != e && (typeof e != "function" && console.error("unknown Class:" + e), n.constructor = e);
}
var lt = {}, Rt = lt.ELEMENT_NODE = 1, Or = lt.ATTRIBUTE_NODE = 2, Ya = lt.TEXT_NODE = 3, Ty = lt.CDATA_SECTION_NODE = 4, Uy = lt.ENTITY_REFERENCE_NODE = 5, o8 = lt.ENTITY_NODE = 6, Ey = lt.PROCESSING_INSTRUCTION_NODE = 7, Ay = lt.COMMENT_NODE = 8, Cy = lt.DOCUMENT_NODE = 9, Fy = lt.DOCUMENT_TYPE_NODE = 10, ln = lt.DOCUMENT_FRAGMENT_NODE = 11, c8 = lt.NOTATION_NODE = 12, Qe = {}, Le = {};
Qe.INDEX_SIZE_ERR = (Le[1] = "Index size error", 1);
Qe.DOMSTRING_SIZE_ERR = (Le[2] = "DOMString size error", 2);
var it = Qe.HIERARCHY_REQUEST_ERR = (Le[3] = "Hierarchy request error", 3);
Qe.WRONG_DOCUMENT_ERR = (Le[4] = "Wrong document", 4);
Qe.INVALID_CHARACTER_ERR = (Le[5] = "Invalid character", 5);
Qe.NO_DATA_ALLOWED_ERR = (Le[6] = "No data allowed", 6);
Qe.NO_MODIFICATION_ALLOWED_ERR = (Le[7] = "No modification allowed", 7);
var Sy = Qe.NOT_FOUND_ERR = (Le[8] = "Not found", 8);
Qe.NOT_SUPPORTED_ERR = (Le[9] = "Not supported", 9);
var Ep = Qe.INUSE_ATTRIBUTE_ERR = (Le[10] = "Attribute in use", 10);
Qe.INVALID_STATE_ERR = (Le[11] = "Invalid state", 11);
Qe.SYNTAX_ERR = (Le[12] = "Syntax error", 12);
Qe.INVALID_MODIFICATION_ERR = (Le[13] = "Invalid modification", 13);
Qe.NAMESPACE_ERR = (Le[14] = "Invalid namespace", 14);
Qe.INVALID_ACCESS_ERR = (Le[15] = "Invalid access", 15);
function Fe(e, t) {
  if (t instanceof Error)
    var n = t;
  else
    n = this, Error.call(this, Le[e]), this.message = Le[e], Error.captureStackTrace && Error.captureStackTrace(this, Fe);
  return n.code = e, t && (this.message = this.message + ": " + t), n;
}
Fe.prototype = Error.prototype;
Yi(Qe, Fe);
function un() {
}
un.prototype = {
  /**
   * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
   * @standard level1
   */
  length: 0,
  /**
   * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
   * @standard level1
   * @param index  unsigned long
   *   Index into the collection.
   * @return Node
   * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
   */
  item: function(e) {
    return e >= 0 && e < this.length ? this[e] : null;
  },
  toString: function(e, t) {
    for (var n = [], r = 0; r < this.length; r++)
      Tr(this[r], n, e, t);
    return n.join("");
  },
  /**
   * @private
   * @param {function (Node):boolean} predicate
   * @returns {Node[]}
   */
  filter: function(e) {
    return Array.prototype.filter.call(this, e);
  },
  /**
   * @private
   * @param {Node} item
   * @returns {number}
   */
  indexOf: function(e) {
    return Array.prototype.indexOf.call(this, e);
  }
};
function Ir(e, t) {
  this._node = e, this._refresh = t, Jd(this);
}
function Jd(e) {
  var t = e._node._inc || e._node.ownerDocument._inc;
  if (e._inc !== t) {
    var n = e._refresh(e._node);
    if (zy(e, "length", n.length), !e.$$length || n.length < e.$$length)
      for (var r = n.length; r in e; r++)
        Object.prototype.hasOwnProperty.call(e, r) && delete e[r];
    Yi(n, e), e._inc = t;
  }
}
Ir.prototype.item = function(e) {
  return Jd(this), this[e] || null;
};
dt(Ir, un);
function Ka() {
}
function ky(e, t) {
  for (var n = e.length; n--; )
    if (e[n] === t)
      return n;
}
function Ap(e, t, n, r) {
  if (r ? t[ky(t, r)] = n : t[t.length++] = n, e) {
    n.ownerElement = e;
    var i = e.ownerDocument;
    i && (r && Oy(i, e, r), s8(i, e, n));
  }
}
function Cp(e, t, n) {
  var r = ky(t, n);
  if (r >= 0) {
    for (var i = t.length - 1; r < i; )
      t[r] = t[++r];
    if (t.length = i, e) {
      var a = e.ownerDocument;
      a && (Oy(a, e, n), n.ownerElement = null);
    }
  } else
    throw new Fe(Sy, new Error(e.tagName + "@" + n));
}
Ka.prototype = {
  length: 0,
  item: un.prototype.item,
  getNamedItem: function(e) {
    for (var t = this.length; t--; ) {
      var n = this[t];
      if (n.nodeName == e)
        return n;
    }
  },
  setNamedItem: function(e) {
    var t = e.ownerElement;
    if (t && t != this._ownerElement)
      throw new Fe(Ep);
    var n = this.getNamedItem(e.nodeName);
    return Ap(this._ownerElement, this, e, n), n;
  },
  /* returns Node */
  setNamedItemNS: function(e) {
    var t = e.ownerElement, n;
    if (t && t != this._ownerElement)
      throw new Fe(Ep);
    return n = this.getNamedItemNS(e.namespaceURI, e.localName), Ap(this._ownerElement, this, e, n), n;
  },
  /* returns Node */
  removeNamedItem: function(e) {
    var t = this.getNamedItem(e);
    return Cp(this._ownerElement, this, t), t;
  },
  // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
  //for level2
  removeNamedItemNS: function(e, t) {
    var n = this.getNamedItemNS(e, t);
    return Cp(this._ownerElement, this, n), n;
  },
  getNamedItemNS: function(e, t) {
    for (var n = this.length; n--; ) {
      var r = this[n];
      if (r.localName == t && r.namespaceURI == e)
        return r;
    }
    return null;
  }
};
function By() {
}
By.prototype = {
  /**
   * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
   * The different implementations fairly diverged in what kind of features were reported.
   * The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
   *
   * @deprecated It is deprecated and modern browsers return true in all cases.
   *
   * @param {string} feature
   * @param {string} [version]
   * @returns {boolean} always true
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
   * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
   */
  hasFeature: function(e, t) {
    return !0;
  },
  /**
   * Creates an XML Document object of the specified type with its document element.
   *
   * __It behaves slightly different from the description in the living standard__:
   * - There is no interface/class `XMLDocument`, it returns a `Document` instance.
   * - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
   * - this implementation is not validating names or qualified names
   *   (when parsing XML strings, the SAX parser takes care of that)
   *
   * @param {string|null} namespaceURI
   * @param {string} qualifiedName
   * @param {DocumentType=null} doctype
   * @returns {Document}
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
   * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
   *
   * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
   * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
   * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
   */
  createDocument: function(e, t, n) {
    var r = new Ki();
    if (r.implementation = this, r.childNodes = new un(), r.doctype = n || null, n && r.appendChild(n), t) {
      var i = r.createElementNS(e, t);
      r.appendChild(i);
    }
    return r;
  },
  /**
   * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
   *
   * __This behavior is slightly different from the in the specs__:
   * - this implementation is not validating names or qualified names
   *   (when parsing XML strings, the SAX parser takes care of that)
   *
   * @param {string} qualifiedName
   * @param {string} [publicId]
   * @param {string} [systemId]
   * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
   * 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
   * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
   *
   * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
   * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
   * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
   */
  createDocumentType: function(e, t, n) {
    var r = new Wo();
    return r.name = e, r.nodeName = e, r.publicId = t || "", r.systemId = n || "", r;
  }
};
function pe() {
}
pe.prototype = {
  firstChild: null,
  lastChild: null,
  previousSibling: null,
  nextSibling: null,
  attributes: null,
  parentNode: null,
  childNodes: null,
  ownerDocument: null,
  nodeValue: null,
  namespaceURI: null,
  prefix: null,
  localName: null,
  // Modified in DOM Level 2:
  insertBefore: function(e, t) {
    return Ja(this, e, t);
  },
  replaceChild: function(e, t) {
    Ja(this, e, t, Wy), t && this.removeChild(t);
  },
  removeChild: function(e) {
    return Iy(this, e);
  },
  appendChild: function(e) {
    return this.insertBefore(e, null);
  },
  hasChildNodes: function() {
    return this.firstChild != null;
  },
  cloneNode: function(e) {
    return ku(this.ownerDocument || this, this, e);
  },
  // Modified in DOM Level 2:
  normalize: function() {
    for (var e = this.firstChild; e; ) {
      var t = e.nextSibling;
      t && t.nodeType == Ya && e.nodeType == Ya ? (this.removeChild(t), e.appendData(t.data)) : (e.normalize(), e = t);
    }
  },
  // Introduced in DOM Level 2:
  isSupported: function(e, t) {
    return this.ownerDocument.implementation.hasFeature(e, t);
  },
  // Introduced in DOM Level 2:
  hasAttributes: function() {
    return this.attributes.length > 0;
  },
  /**
   * Look up the prefix associated to the given namespace URI, starting from this node.
   * **The default namespace declarations are ignored by this method.**
   * See Namespace Prefix Lookup for details on the algorithm used by this method.
   *
   * _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
   *
   * @param {string | null} namespaceURI
   * @returns {string | null}
   * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
   * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
   * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
   * @see https://github.com/xmldom/xmldom/issues/322
   */
  lookupPrefix: function(e) {
    for (var t = this; t; ) {
      var n = t._nsMap;
      if (n) {
        for (var r in n)
          if (Object.prototype.hasOwnProperty.call(n, r) && n[r] === e)
            return r;
      }
      t = t.nodeType == Or ? t.ownerDocument : t.parentNode;
    }
    return null;
  },
  // Introduced in DOM Level 3:
  lookupNamespaceURI: function(e) {
    for (var t = this; t; ) {
      var n = t._nsMap;
      if (n && Object.prototype.hasOwnProperty.call(n, e))
        return n[e];
      t = t.nodeType == Or ? t.ownerDocument : t.parentNode;
    }
    return null;
  },
  // Introduced in DOM Level 3:
  isDefaultNamespace: function(e) {
    var t = this.lookupPrefix(e);
    return t == null;
  }
};
function Ry(e) {
  return e == "<" && "&lt;" || e == ">" && "&gt;" || e == "&" && "&amp;" || e == '"' && "&quot;" || "&#" + e.charCodeAt() + ";";
}
Yi(lt, pe);
Yi(lt, pe.prototype);
function Bi(e, t) {
  if (t(e))
    return !0;
  if (e = e.firstChild)
    do
      if (Bi(e, t))
        return !0;
    while (e = e.nextSibling);
}
function Ki() {
  this.ownerDocument = this;
}
function s8(e, t, n) {
  e && e._inc++;
  var r = n.namespaceURI;
  r === ki.XMLNS && (t._nsMap[n.prefix ? n.localName : ""] = n.value);
}
function Oy(e, t, n, r) {
  e && e._inc++;
  var i = n.namespaceURI;
  i === ki.XMLNS && delete t._nsMap[n.prefix ? n.localName : ""];
}
function Qd(e, t, n) {
  if (e && e._inc) {
    e._inc++;
    var r = t.childNodes;
    if (n)
      r[r.length++] = n;
    else {
      for (var i = t.firstChild, a = 0; i; )
        r[a++] = i, i = i.nextSibling;
      r.length = a, delete r[r.length];
    }
  }
}
function Iy(e, t) {
  var n = t.previousSibling, r = t.nextSibling;
  return n ? n.nextSibling = r : e.firstChild = r, r ? r.previousSibling = n : e.lastChild = n, t.parentNode = null, t.previousSibling = null, t.nextSibling = null, Qd(e.ownerDocument, e), t;
}
function u8(e) {
  return e && (e.nodeType === pe.DOCUMENT_NODE || e.nodeType === pe.DOCUMENT_FRAGMENT_NODE || e.nodeType === pe.ELEMENT_NODE);
}
function d8(e) {
  return e && (Xt(e) || el(e) || fn(e) || e.nodeType === pe.DOCUMENT_FRAGMENT_NODE || e.nodeType === pe.COMMENT_NODE || e.nodeType === pe.PROCESSING_INSTRUCTION_NODE);
}
function fn(e) {
  return e && e.nodeType === pe.DOCUMENT_TYPE_NODE;
}
function Xt(e) {
  return e && e.nodeType === pe.ELEMENT_NODE;
}
function el(e) {
  return e && e.nodeType === pe.TEXT_NODE;
}
function Fp(e, t) {
  var n = e.childNodes || [];
  if (Zt(n, Xt) || fn(t))
    return !1;
  var r = Zt(n, fn);
  return !(t && r && n.indexOf(r) > n.indexOf(t));
}
function Sp(e, t) {
  var n = e.childNodes || [];
  function r(a) {
    return Xt(a) && a !== t;
  }
  if (Zt(n, r))
    return !1;
  var i = Zt(n, fn);
  return !(t && i && n.indexOf(i) > n.indexOf(t));
}
function l8(e, t, n) {
  if (!u8(e))
    throw new Fe(it, "Unexpected parent node type " + e.nodeType);
  if (n && n.parentNode !== e)
    throw new Fe(Sy, "child not in parent");
  if (
    // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
    !d8(t) || // 5. If either `node` is a Text node and `parent` is a document,
    // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
    // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
    // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
    fn(t) && e.nodeType !== pe.DOCUMENT_NODE
  )
    throw new Fe(
      it,
      "Unexpected node type " + t.nodeType + " for parent node type " + e.nodeType
    );
}
function f8(e, t, n) {
  var r = e.childNodes || [], i = t.childNodes || [];
  if (t.nodeType === pe.DOCUMENT_FRAGMENT_NODE) {
    var a = i.filter(Xt);
    if (a.length > 1 || Zt(i, el))
      throw new Fe(it, "More than one element or text in fragment");
    if (a.length === 1 && !Fp(e, n))
      throw new Fe(it, "Element in fragment can not be inserted before doctype");
  }
  if (Xt(t) && !Fp(e, n))
    throw new Fe(it, "Only one element can be added and only after doctype");
  if (fn(t)) {
    if (Zt(r, fn))
      throw new Fe(it, "Only one doctype is allowed");
    var o = Zt(r, Xt);
    if (n && r.indexOf(o) < r.indexOf(n))
      throw new Fe(it, "Doctype can only be inserted before an element");
    if (!n && o)
      throw new Fe(it, "Doctype can not be appended since element is present");
  }
}
function Wy(e, t, n) {
  var r = e.childNodes || [], i = t.childNodes || [];
  if (t.nodeType === pe.DOCUMENT_FRAGMENT_NODE) {
    var a = i.filter(Xt);
    if (a.length > 1 || Zt(i, el))
      throw new Fe(it, "More than one element or text in fragment");
    if (a.length === 1 && !Sp(e, n))
      throw new Fe(it, "Element in fragment can not be inserted before doctype");
  }
  if (Xt(t) && !Sp(e, n))
    throw new Fe(it, "Only one element can be added and only after doctype");
  if (fn(t)) {
    if (Zt(r, function(u) {
      return fn(u) && u !== n;
    }))
      throw new Fe(it, "Only one doctype is allowed");
    var o = Zt(r, Xt);
    if (n && r.indexOf(o) < r.indexOf(n))
      throw new Fe(it, "Doctype can only be inserted before an element");
  }
}
function Ja(e, t, n, r) {
  l8(e, t, n), e.nodeType === pe.DOCUMENT_NODE && (r || f8)(e, t, n);
  var i = t.parentNode;
  if (i && i.removeChild(t), t.nodeType === ln) {
    var a = t.firstChild;
    if (a == null)
      return t;
    var o = t.lastChild;
  } else
    a = o = t;
  var c = n ? n.previousSibling : e.lastChild;
  a.previousSibling = c, o.nextSibling = n, c ? c.nextSibling = a : e.firstChild = a, n == null ? e.lastChild = o : n.previousSibling = o;
  do
    a.parentNode = e;
  while (a !== o && (a = a.nextSibling));
  return Qd(e.ownerDocument || e, e), t.nodeType == ln && (t.firstChild = t.lastChild = null), t;
}
function h8(e, t) {
  return t.parentNode && t.parentNode.removeChild(t), t.parentNode = e, t.previousSibling = e.lastChild, t.nextSibling = null, t.previousSibling ? t.previousSibling.nextSibling = t : e.firstChild = t, e.lastChild = t, Qd(e.ownerDocument, e, t), t;
}
Ki.prototype = {
  //implementation : null,
  nodeName: "#document",
  nodeType: Cy,
  /**
   * The DocumentType node of the document.
   *
   * @readonly
   * @type DocumentType
   */
  doctype: null,
  documentElement: null,
  _inc: 1,
  insertBefore: function(e, t) {
    if (e.nodeType == ln) {
      for (var n = e.firstChild; n; ) {
        var r = n.nextSibling;
        this.insertBefore(n, t), n = r;
      }
      return e;
    }
    return Ja(this, e, t), e.ownerDocument = this, this.documentElement === null && e.nodeType === Rt && (this.documentElement = e), e;
  },
  removeChild: function(e) {
    return this.documentElement == e && (this.documentElement = null), Iy(this, e);
  },
  replaceChild: function(e, t) {
    Ja(this, e, t, Wy), e.ownerDocument = this, t && this.removeChild(t), Xt(e) && (this.documentElement = e);
  },
  // Introduced in DOM Level 2:
  importNode: function(e, t) {
    return Py(this, e, t);
  },
  // Introduced in DOM Level 2:
  getElementById: function(e) {
    var t = null;
    return Bi(this.documentElement, function(n) {
      if (n.nodeType == Rt && n.getAttribute("id") == e)
        return t = n, !0;
    }), t;
  },
  /**
   * The `getElementsByClassName` method of `Document` interface returns an array-like object
   * of all child elements which have **all** of the given class name(s).
   *
   * Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
   *
   *
   * Warning: This is a live LiveNodeList.
   * Changes in the DOM will reflect in the array as the changes occur.
   * If an element selected by this array no longer qualifies for the selector,
   * it will automatically be removed. Be aware of this for iteration purposes.
   *
   * @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
   * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
   */
  getElementsByClassName: function(e) {
    var t = Up(e);
    return new Ir(this, function(n) {
      var r = [];
      return t.length > 0 && Bi(n.documentElement, function(i) {
        if (i !== n && i.nodeType === Rt) {
          var a = i.getAttribute("class");
          if (a) {
            var o = e === a;
            if (!o) {
              var c = Up(a);
              o = t.every(a8(c));
            }
            o && r.push(i);
          }
        }
      }), r;
    });
  },
  //document factory method:
  createElement: function(e) {
    var t = new Qn();
    t.ownerDocument = this, t.nodeName = e, t.tagName = e, t.localName = e, t.childNodes = new un();
    var n = t.attributes = new Ka();
    return n._ownerElement = t, t;
  },
  createDocumentFragment: function() {
    var e = new No();
    return e.ownerDocument = this, e.childNodes = new un(), e;
  },
  createTextNode: function(e) {
    var t = new tl();
    return t.ownerDocument = this, t.appendData(e), t;
  },
  createComment: function(e) {
    var t = new nl();
    return t.ownerDocument = this, t.appendData(e), t;
  },
  createCDATASection: function(e) {
    var t = new rl();
    return t.ownerDocument = this, t.appendData(e), t;
  },
  createProcessingInstruction: function(e, t) {
    var n = new al();
    return n.ownerDocument = this, n.tagName = n.nodeName = n.target = e, n.nodeValue = n.data = t, n;
  },
  createAttribute: function(e) {
    var t = new Qa();
    return t.ownerDocument = this, t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, t;
  },
  createEntityReference: function(e) {
    var t = new il();
    return t.ownerDocument = this, t.nodeName = e, t;
  },
  // Introduced in DOM Level 2:
  createElementNS: function(e, t) {
    var n = new Qn(), r = t.split(":"), i = n.attributes = new Ka();
    return n.childNodes = new un(), n.ownerDocument = this, n.nodeName = t, n.tagName = t, n.namespaceURI = e, r.length == 2 ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, i._ownerElement = n, n;
  },
  // Introduced in DOM Level 2:
  createAttributeNS: function(e, t) {
    var n = new Qa(), r = t.split(":");
    return n.ownerDocument = this, n.nodeName = t, n.name = t, n.namespaceURI = e, n.specified = !0, r.length == 2 ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, n;
  }
};
dt(Ki, pe);
function Qn() {
  this._nsMap = {};
}
Qn.prototype = {
  nodeType: Rt,
  hasAttribute: function(e) {
    return this.getAttributeNode(e) != null;
  },
  getAttribute: function(e) {
    var t = this.getAttributeNode(e);
    return t && t.value || "";
  },
  getAttributeNode: function(e) {
    return this.attributes.getNamedItem(e);
  },
  setAttribute: function(e, t) {
    var n = this.ownerDocument.createAttribute(e);
    n.value = n.nodeValue = "" + t, this.setAttributeNode(n);
  },
  removeAttribute: function(e) {
    var t = this.getAttributeNode(e);
    t && this.removeAttributeNode(t);
  },
  //four real opeartion method
  appendChild: function(e) {
    return e.nodeType === ln ? this.insertBefore(e, null) : h8(this, e);
  },
  setAttributeNode: function(e) {
    return this.attributes.setNamedItem(e);
  },
  setAttributeNodeNS: function(e) {
    return this.attributes.setNamedItemNS(e);
  },
  removeAttributeNode: function(e) {
    return this.attributes.removeNamedItem(e.nodeName);
  },
  //get real attribute name,and remove it by removeAttributeNode
  removeAttributeNS: function(e, t) {
    var n = this.getAttributeNodeNS(e, t);
    n && this.removeAttributeNode(n);
  },
  hasAttributeNS: function(e, t) {
    return this.getAttributeNodeNS(e, t) != null;
  },
  getAttributeNS: function(e, t) {
    var n = this.getAttributeNodeNS(e, t);
    return n && n.value || "";
  },
  setAttributeNS: function(e, t, n) {
    var r = this.ownerDocument.createAttributeNS(e, t);
    r.value = r.nodeValue = "" + n, this.setAttributeNode(r);
  },
  getAttributeNodeNS: function(e, t) {
    return this.attributes.getNamedItemNS(e, t);
  },
  getElementsByTagName: function(e) {
    return new Ir(this, function(t) {
      var n = [];
      return Bi(t, function(r) {
        r !== t && r.nodeType == Rt && (e === "*" || r.tagName == e) && n.push(r);
      }), n;
    });
  },
  getElementsByTagNameNS: function(e, t) {
    return new Ir(this, function(n) {
      var r = [];
      return Bi(n, function(i) {
        i !== n && i.nodeType === Rt && (e === "*" || i.namespaceURI === e) && (t === "*" || i.localName == t) && r.push(i);
      }), r;
    });
  }
};
Ki.prototype.getElementsByTagName = Qn.prototype.getElementsByTagName;
Ki.prototype.getElementsByTagNameNS = Qn.prototype.getElementsByTagNameNS;
dt(Qn, pe);
function Qa() {
}
Qa.prototype.nodeType = Or;
dt(Qa, pe);
function Ji() {
}
Ji.prototype = {
  data: "",
  substringData: function(e, t) {
    return this.data.substring(e, e + t);
  },
  appendData: function(e) {
    e = this.data + e, this.nodeValue = this.data = e, this.length = e.length;
  },
  insertData: function(e, t) {
    this.replaceData(e, 0, t);
  },
  appendChild: function(e) {
    throw new Error(Le[it]);
  },
  deleteData: function(e, t) {
    this.replaceData(e, t, "");
  },
  replaceData: function(e, t, n) {
    var r = this.data.substring(0, e), i = this.data.substring(e + t);
    n = r + n + i, this.nodeValue = this.data = n, this.length = n.length;
  }
};
dt(Ji, pe);
function tl() {
}
tl.prototype = {
  nodeName: "#text",
  nodeType: Ya,
  splitText: function(e) {
    var t = this.data, n = t.substring(e);
    t = t.substring(0, e), this.data = this.nodeValue = t, this.length = t.length;
    var r = this.ownerDocument.createTextNode(n);
    return this.parentNode && this.parentNode.insertBefore(r, this.nextSibling), r;
  }
};
dt(tl, Ji);
function nl() {
}
nl.prototype = {
  nodeName: "#comment",
  nodeType: Ay
};
dt(nl, Ji);
function rl() {
}
rl.prototype = {
  nodeName: "#cdata-section",
  nodeType: Ty
};
dt(rl, Ji);
function Wo() {
}
Wo.prototype.nodeType = Fy;
dt(Wo, pe);
function Ny() {
}
Ny.prototype.nodeType = c8;
dt(Ny, pe);
function Ly() {
}
Ly.prototype.nodeType = o8;
dt(Ly, pe);
function il() {
}
il.prototype.nodeType = Uy;
dt(il, pe);
function No() {
}
No.prototype.nodeName = "#document-fragment";
No.prototype.nodeType = ln;
dt(No, pe);
function al() {
}
al.prototype.nodeType = Ey;
dt(al, pe);
function My() {
}
My.prototype.serializeToString = function(e, t, n) {
  return $y.call(e, t, n);
};
pe.prototype.toString = $y;
function $y(e, t) {
  var n = [], r = this.nodeType == 9 && this.documentElement || this, i = r.prefix, a = r.namespaceURI;
  if (a && i == null) {
    var i = r.lookupPrefix(a);
    if (i == null)
      var o = [
        { namespace: a, prefix: null }
        //{namespace:uri,prefix:''}
      ];
  }
  return Tr(this, n, e, t, o), n.join("");
}
function kp(e, t, n) {
  var r = e.prefix || "", i = e.namespaceURI;
  if (!i || r === "xml" && i === ki.XML || i === ki.XMLNS)
    return !1;
  for (var a = n.length; a--; ) {
    var o = n[a];
    if (o.prefix === r)
      return o.namespace !== i;
  }
  return !0;
}
function Ns(e, t, n) {
  e.push(" ", t, '="', n.replace(/[<>&"\t\n\r]/g, Ry), '"');
}
function Tr(e, t, n, r, i) {
  if (i || (i = []), r)
    if (e = r(e), e) {
      if (typeof e == "string") {
        t.push(e);
        return;
      }
    } else
      return;
  switch (e.nodeType) {
    case Rt:
      var a = e.attributes, o = a.length, h = e.firstChild, c = e.tagName;
      n = ki.isHTML(e.namespaceURI) || n;
      var u = c;
      if (!n && !e.prefix && e.namespaceURI) {
        for (var s, d = 0; d < a.length; d++)
          if (a.item(d).name === "xmlns") {
            s = a.item(d).value;
            break;
          }
        if (!s)
          for (var g = i.length - 1; g >= 0; g--) {
            var f = i[g];
            if (f.prefix === "" && f.namespace === e.namespaceURI) {
              s = f.namespace;
              break;
            }
          }
        if (s !== e.namespaceURI)
          for (var g = i.length - 1; g >= 0; g--) {
            var f = i[g];
            if (f.namespace === e.namespaceURI) {
              f.prefix && (u = f.prefix + ":" + c);
              break;
            }
          }
      }
      t.push("<", u);
      for (var p = 0; p < o; p++) {
        var b = a.item(p);
        b.prefix == "xmlns" ? i.push({ prefix: b.localName, namespace: b.value }) : b.nodeName == "xmlns" && i.push({ prefix: "", namespace: b.value });
      }
      for (var p = 0; p < o; p++) {
        var b = a.item(p);
        if (kp(b, n, i)) {
          var m = b.prefix || "", y = b.namespaceURI;
          Ns(t, m ? "xmlns:" + m : "xmlns", y), i.push({ prefix: m, namespace: y });
        }
        Tr(b, t, n, r, i);
      }
      if (c === u && kp(e, n, i)) {
        var m = e.prefix || "", y = e.namespaceURI;
        Ns(t, m ? "xmlns:" + m : "xmlns", y), i.push({ prefix: m, namespace: y });
      }
      if (h || n && !/^(?:meta|link|img|br|hr|input)$/i.test(c)) {
        if (t.push(">"), n && /^script$/i.test(c))
          for (; h; )
            h.data ? t.push(h.data) : Tr(h, t, n, r, i.slice()), h = h.nextSibling;
        else
          for (; h; )
            Tr(h, t, n, r, i.slice()), h = h.nextSibling;
        t.push("</", u, ">");
      } else
        t.push("/>");
      return;
    case Cy:
    case ln:
      for (var h = e.firstChild; h; )
        Tr(h, t, n, r, i.slice()), h = h.nextSibling;
      return;
    case Or:
      return Ns(t, e.name, e.value);
    case Ya:
      return t.push(
        e.data.replace(/[<&>]/g, Ry)
      );
    case Ty:
      return t.push("<![CDATA[", e.data, "]]>");
    case Ay:
      return t.push("<!--", e.data, "-->");
    case Fy:
      var l = e.publicId, v = e.systemId;
      if (t.push("<!DOCTYPE ", e.name), l)
        t.push(" PUBLIC ", l), v && v != "." && t.push(" ", v), t.push(">");
      else if (v && v != ".")
        t.push(" SYSTEM ", v, ">");
      else {
        var D = e.internalSubset;
        D && t.push(" [", D, "]"), t.push(">");
      }
      return;
    case Ey:
      return t.push("<?", e.target, " ", e.data, "?>");
    case Uy:
      return t.push("&", e.nodeName, ";");
    default:
      t.push("??", e.nodeName);
  }
}
function Py(e, t, n) {
  var r;
  switch (t.nodeType) {
    case Rt:
      r = t.cloneNode(!1), r.ownerDocument = e;
    case ln:
      break;
    case Or:
      n = !0;
      break;
  }
  if (r || (r = t.cloneNode(!1)), r.ownerDocument = e, r.parentNode = null, n)
    for (var i = t.firstChild; i; )
      r.appendChild(Py(e, i, n)), i = i.nextSibling;
  return r;
}
function ku(e, t, n) {
  var r = new t.constructor();
  for (var i in t)
    if (Object.prototype.hasOwnProperty.call(t, i)) {
      var a = t[i];
      typeof a != "object" && a != r[i] && (r[i] = a);
    }
  switch (t.childNodes && (r.childNodes = new un()), r.ownerDocument = e, r.nodeType) {
    case Rt:
      var o = t.attributes, c = r.attributes = new Ka(), u = o.length;
      c._ownerElement = r;
      for (var s = 0; s < u; s++)
        r.setAttributeNode(ku(e, o.item(s), !0));
      break;
    case Or:
      n = !0;
  }
  if (n)
    for (var d = t.firstChild; d; )
      r.appendChild(ku(e, d, n)), d = d.nextSibling;
  return r;
}
function zy(e, t, n) {
  e[t] = n;
}
try {
  if (Object.defineProperty) {
    let e = function(t) {
      switch (t.nodeType) {
        case Rt:
        case ln:
          var n = [];
          for (t = t.firstChild; t; )
            t.nodeType !== 7 && t.nodeType !== 8 && n.push(e(t)), t = t.nextSibling;
          return n.join("");
        default:
          return t.nodeValue;
      }
    };
    Object.defineProperty(Ir.prototype, "length", {
      get: function() {
        return Jd(this), this.$$length;
      }
    }), Object.defineProperty(pe.prototype, "textContent", {
      get: function() {
        return e(this);
      },
      set: function(t) {
        switch (this.nodeType) {
          case Rt:
          case ln:
            for (; this.firstChild; )
              this.removeChild(this.firstChild);
            (t || String(t)) && this.appendChild(this.ownerDocument.createTextNode(t));
            break;
          default:
            this.data = t, this.value = t, this.nodeValue = t;
        }
      }
    }), zy = function(t, n, r) {
      t["$$" + n] = r;
    };
  }
} catch {
}
Kt.DocumentType = Wo;
Kt.DOMException = Fe;
Kt.DOMImplementation = By;
Kt.Element = Qn;
Kt.Node = pe;
Kt.NodeList = un;
Kt.XMLSerializer = My;
var Lo = {}, qy = {};
(function(e) {
  var t = gn.freeze;
  e.XML_ENTITIES = t({
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    quot: '"'
  }), e.HTML_ENTITIES = t({
    Aacute: "Á",
    aacute: "á",
    Abreve: "Ă",
    abreve: "ă",
    ac: "∾",
    acd: "∿",
    acE: "∾̳",
    Acirc: "Â",
    acirc: "â",
    acute: "´",
    Acy: "А",
    acy: "а",
    AElig: "Æ",
    aelig: "æ",
    af: "⁡",
    Afr: "𝔄",
    afr: "𝔞",
    Agrave: "À",
    agrave: "à",
    alefsym: "ℵ",
    aleph: "ℵ",
    Alpha: "Α",
    alpha: "α",
    Amacr: "Ā",
    amacr: "ā",
    amalg: "⨿",
    AMP: "&",
    amp: "&",
    And: "⩓",
    and: "∧",
    andand: "⩕",
    andd: "⩜",
    andslope: "⩘",
    andv: "⩚",
    ang: "∠",
    ange: "⦤",
    angle: "∠",
    angmsd: "∡",
    angmsdaa: "⦨",
    angmsdab: "⦩",
    angmsdac: "⦪",
    angmsdad: "⦫",
    angmsdae: "⦬",
    angmsdaf: "⦭",
    angmsdag: "⦮",
    angmsdah: "⦯",
    angrt: "∟",
    angrtvb: "⊾",
    angrtvbd: "⦝",
    angsph: "∢",
    angst: "Å",
    angzarr: "⍼",
    Aogon: "Ą",
    aogon: "ą",
    Aopf: "𝔸",
    aopf: "𝕒",
    ap: "≈",
    apacir: "⩯",
    apE: "⩰",
    ape: "≊",
    apid: "≋",
    apos: "'",
    ApplyFunction: "⁡",
    approx: "≈",
    approxeq: "≊",
    Aring: "Å",
    aring: "å",
    Ascr: "𝒜",
    ascr: "𝒶",
    Assign: "≔",
    ast: "*",
    asymp: "≈",
    asympeq: "≍",
    Atilde: "Ã",
    atilde: "ã",
    Auml: "Ä",
    auml: "ä",
    awconint: "∳",
    awint: "⨑",
    backcong: "≌",
    backepsilon: "϶",
    backprime: "‵",
    backsim: "∽",
    backsimeq: "⋍",
    Backslash: "∖",
    Barv: "⫧",
    barvee: "⊽",
    Barwed: "⌆",
    barwed: "⌅",
    barwedge: "⌅",
    bbrk: "⎵",
    bbrktbrk: "⎶",
    bcong: "≌",
    Bcy: "Б",
    bcy: "б",
    bdquo: "„",
    becaus: "∵",
    Because: "∵",
    because: "∵",
    bemptyv: "⦰",
    bepsi: "϶",
    bernou: "ℬ",
    Bernoullis: "ℬ",
    Beta: "Β",
    beta: "β",
    beth: "ℶ",
    between: "≬",
    Bfr: "𝔅",
    bfr: "𝔟",
    bigcap: "⋂",
    bigcirc: "◯",
    bigcup: "⋃",
    bigodot: "⨀",
    bigoplus: "⨁",
    bigotimes: "⨂",
    bigsqcup: "⨆",
    bigstar: "★",
    bigtriangledown: "▽",
    bigtriangleup: "△",
    biguplus: "⨄",
    bigvee: "⋁",
    bigwedge: "⋀",
    bkarow: "⤍",
    blacklozenge: "⧫",
    blacksquare: "▪",
    blacktriangle: "▴",
    blacktriangledown: "▾",
    blacktriangleleft: "◂",
    blacktriangleright: "▸",
    blank: "␣",
    blk12: "▒",
    blk14: "░",
    blk34: "▓",
    block: "█",
    bne: "=⃥",
    bnequiv: "≡⃥",
    bNot: "⫭",
    bnot: "⌐",
    Bopf: "𝔹",
    bopf: "𝕓",
    bot: "⊥",
    bottom: "⊥",
    bowtie: "⋈",
    boxbox: "⧉",
    boxDL: "╗",
    boxDl: "╖",
    boxdL: "╕",
    boxdl: "┐",
    boxDR: "╔",
    boxDr: "╓",
    boxdR: "╒",
    boxdr: "┌",
    boxH: "═",
    boxh: "─",
    boxHD: "╦",
    boxHd: "╤",
    boxhD: "╥",
    boxhd: "┬",
    boxHU: "╩",
    boxHu: "╧",
    boxhU: "╨",
    boxhu: "┴",
    boxminus: "⊟",
    boxplus: "⊞",
    boxtimes: "⊠",
    boxUL: "╝",
    boxUl: "╜",
    boxuL: "╛",
    boxul: "┘",
    boxUR: "╚",
    boxUr: "╙",
    boxuR: "╘",
    boxur: "└",
    boxV: "║",
    boxv: "│",
    boxVH: "╬",
    boxVh: "╫",
    boxvH: "╪",
    boxvh: "┼",
    boxVL: "╣",
    boxVl: "╢",
    boxvL: "╡",
    boxvl: "┤",
    boxVR: "╠",
    boxVr: "╟",
    boxvR: "╞",
    boxvr: "├",
    bprime: "‵",
    Breve: "˘",
    breve: "˘",
    brvbar: "¦",
    Bscr: "ℬ",
    bscr: "𝒷",
    bsemi: "⁏",
    bsim: "∽",
    bsime: "⋍",
    bsol: "\\",
    bsolb: "⧅",
    bsolhsub: "⟈",
    bull: "•",
    bullet: "•",
    bump: "≎",
    bumpE: "⪮",
    bumpe: "≏",
    Bumpeq: "≎",
    bumpeq: "≏",
    Cacute: "Ć",
    cacute: "ć",
    Cap: "⋒",
    cap: "∩",
    capand: "⩄",
    capbrcup: "⩉",
    capcap: "⩋",
    capcup: "⩇",
    capdot: "⩀",
    CapitalDifferentialD: "ⅅ",
    caps: "∩︀",
    caret: "⁁",
    caron: "ˇ",
    Cayleys: "ℭ",
    ccaps: "⩍",
    Ccaron: "Č",
    ccaron: "č",
    Ccedil: "Ç",
    ccedil: "ç",
    Ccirc: "Ĉ",
    ccirc: "ĉ",
    Cconint: "∰",
    ccups: "⩌",
    ccupssm: "⩐",
    Cdot: "Ċ",
    cdot: "ċ",
    cedil: "¸",
    Cedilla: "¸",
    cemptyv: "⦲",
    cent: "¢",
    CenterDot: "·",
    centerdot: "·",
    Cfr: "ℭ",
    cfr: "𝔠",
    CHcy: "Ч",
    chcy: "ч",
    check: "✓",
    checkmark: "✓",
    Chi: "Χ",
    chi: "χ",
    cir: "○",
    circ: "ˆ",
    circeq: "≗",
    circlearrowleft: "↺",
    circlearrowright: "↻",
    circledast: "⊛",
    circledcirc: "⊚",
    circleddash: "⊝",
    CircleDot: "⊙",
    circledR: "®",
    circledS: "Ⓢ",
    CircleMinus: "⊖",
    CirclePlus: "⊕",
    CircleTimes: "⊗",
    cirE: "⧃",
    cire: "≗",
    cirfnint: "⨐",
    cirmid: "⫯",
    cirscir: "⧂",
    ClockwiseContourIntegral: "∲",
    CloseCurlyDoubleQuote: "”",
    CloseCurlyQuote: "’",
    clubs: "♣",
    clubsuit: "♣",
    Colon: "∷",
    colon: ":",
    Colone: "⩴",
    colone: "≔",
    coloneq: "≔",
    comma: ",",
    commat: "@",
    comp: "∁",
    compfn: "∘",
    complement: "∁",
    complexes: "ℂ",
    cong: "≅",
    congdot: "⩭",
    Congruent: "≡",
    Conint: "∯",
    conint: "∮",
    ContourIntegral: "∮",
    Copf: "ℂ",
    copf: "𝕔",
    coprod: "∐",
    Coproduct: "∐",
    COPY: "©",
    copy: "©",
    copysr: "℗",
    CounterClockwiseContourIntegral: "∳",
    crarr: "↵",
    Cross: "⨯",
    cross: "✗",
    Cscr: "𝒞",
    cscr: "𝒸",
    csub: "⫏",
    csube: "⫑",
    csup: "⫐",
    csupe: "⫒",
    ctdot: "⋯",
    cudarrl: "⤸",
    cudarrr: "⤵",
    cuepr: "⋞",
    cuesc: "⋟",
    cularr: "↶",
    cularrp: "⤽",
    Cup: "⋓",
    cup: "∪",
    cupbrcap: "⩈",
    CupCap: "≍",
    cupcap: "⩆",
    cupcup: "⩊",
    cupdot: "⊍",
    cupor: "⩅",
    cups: "∪︀",
    curarr: "↷",
    curarrm: "⤼",
    curlyeqprec: "⋞",
    curlyeqsucc: "⋟",
    curlyvee: "⋎",
    curlywedge: "⋏",
    curren: "¤",
    curvearrowleft: "↶",
    curvearrowright: "↷",
    cuvee: "⋎",
    cuwed: "⋏",
    cwconint: "∲",
    cwint: "∱",
    cylcty: "⌭",
    Dagger: "‡",
    dagger: "†",
    daleth: "ℸ",
    Darr: "↡",
    dArr: "⇓",
    darr: "↓",
    dash: "‐",
    Dashv: "⫤",
    dashv: "⊣",
    dbkarow: "⤏",
    dblac: "˝",
    Dcaron: "Ď",
    dcaron: "ď",
    Dcy: "Д",
    dcy: "д",
    DD: "ⅅ",
    dd: "ⅆ",
    ddagger: "‡",
    ddarr: "⇊",
    DDotrahd: "⤑",
    ddotseq: "⩷",
    deg: "°",
    Del: "∇",
    Delta: "Δ",
    delta: "δ",
    demptyv: "⦱",
    dfisht: "⥿",
    Dfr: "𝔇",
    dfr: "𝔡",
    dHar: "⥥",
    dharl: "⇃",
    dharr: "⇂",
    DiacriticalAcute: "´",
    DiacriticalDot: "˙",
    DiacriticalDoubleAcute: "˝",
    DiacriticalGrave: "`",
    DiacriticalTilde: "˜",
    diam: "⋄",
    Diamond: "⋄",
    diamond: "⋄",
    diamondsuit: "♦",
    diams: "♦",
    die: "¨",
    DifferentialD: "ⅆ",
    digamma: "ϝ",
    disin: "⋲",
    div: "÷",
    divide: "÷",
    divideontimes: "⋇",
    divonx: "⋇",
    DJcy: "Ђ",
    djcy: "ђ",
    dlcorn: "⌞",
    dlcrop: "⌍",
    dollar: "$",
    Dopf: "𝔻",
    dopf: "𝕕",
    Dot: "¨",
    dot: "˙",
    DotDot: "⃜",
    doteq: "≐",
    doteqdot: "≑",
    DotEqual: "≐",
    dotminus: "∸",
    dotplus: "∔",
    dotsquare: "⊡",
    doublebarwedge: "⌆",
    DoubleContourIntegral: "∯",
    DoubleDot: "¨",
    DoubleDownArrow: "⇓",
    DoubleLeftArrow: "⇐",
    DoubleLeftRightArrow: "⇔",
    DoubleLeftTee: "⫤",
    DoubleLongLeftArrow: "⟸",
    DoubleLongLeftRightArrow: "⟺",
    DoubleLongRightArrow: "⟹",
    DoubleRightArrow: "⇒",
    DoubleRightTee: "⊨",
    DoubleUpArrow: "⇑",
    DoubleUpDownArrow: "⇕",
    DoubleVerticalBar: "∥",
    DownArrow: "↓",
    Downarrow: "⇓",
    downarrow: "↓",
    DownArrowBar: "⤓",
    DownArrowUpArrow: "⇵",
    DownBreve: "̑",
    downdownarrows: "⇊",
    downharpoonleft: "⇃",
    downharpoonright: "⇂",
    DownLeftRightVector: "⥐",
    DownLeftTeeVector: "⥞",
    DownLeftVector: "↽",
    DownLeftVectorBar: "⥖",
    DownRightTeeVector: "⥟",
    DownRightVector: "⇁",
    DownRightVectorBar: "⥗",
    DownTee: "⊤",
    DownTeeArrow: "↧",
    drbkarow: "⤐",
    drcorn: "⌟",
    drcrop: "⌌",
    Dscr: "𝒟",
    dscr: "𝒹",
    DScy: "Ѕ",
    dscy: "ѕ",
    dsol: "⧶",
    Dstrok: "Đ",
    dstrok: "đ",
    dtdot: "⋱",
    dtri: "▿",
    dtrif: "▾",
    duarr: "⇵",
    duhar: "⥯",
    dwangle: "⦦",
    DZcy: "Џ",
    dzcy: "џ",
    dzigrarr: "⟿",
    Eacute: "É",
    eacute: "é",
    easter: "⩮",
    Ecaron: "Ě",
    ecaron: "ě",
    ecir: "≖",
    Ecirc: "Ê",
    ecirc: "ê",
    ecolon: "≕",
    Ecy: "Э",
    ecy: "э",
    eDDot: "⩷",
    Edot: "Ė",
    eDot: "≑",
    edot: "ė",
    ee: "ⅇ",
    efDot: "≒",
    Efr: "𝔈",
    efr: "𝔢",
    eg: "⪚",
    Egrave: "È",
    egrave: "è",
    egs: "⪖",
    egsdot: "⪘",
    el: "⪙",
    Element: "∈",
    elinters: "⏧",
    ell: "ℓ",
    els: "⪕",
    elsdot: "⪗",
    Emacr: "Ē",
    emacr: "ē",
    empty: "∅",
    emptyset: "∅",
    EmptySmallSquare: "◻",
    emptyv: "∅",
    EmptyVerySmallSquare: "▫",
    emsp: " ",
    emsp13: " ",
    emsp14: " ",
    ENG: "Ŋ",
    eng: "ŋ",
    ensp: " ",
    Eogon: "Ę",
    eogon: "ę",
    Eopf: "𝔼",
    eopf: "𝕖",
    epar: "⋕",
    eparsl: "⧣",
    eplus: "⩱",
    epsi: "ε",
    Epsilon: "Ε",
    epsilon: "ε",
    epsiv: "ϵ",
    eqcirc: "≖",
    eqcolon: "≕",
    eqsim: "≂",
    eqslantgtr: "⪖",
    eqslantless: "⪕",
    Equal: "⩵",
    equals: "=",
    EqualTilde: "≂",
    equest: "≟",
    Equilibrium: "⇌",
    equiv: "≡",
    equivDD: "⩸",
    eqvparsl: "⧥",
    erarr: "⥱",
    erDot: "≓",
    Escr: "ℰ",
    escr: "ℯ",
    esdot: "≐",
    Esim: "⩳",
    esim: "≂",
    Eta: "Η",
    eta: "η",
    ETH: "Ð",
    eth: "ð",
    Euml: "Ë",
    euml: "ë",
    euro: "€",
    excl: "!",
    exist: "∃",
    Exists: "∃",
    expectation: "ℰ",
    ExponentialE: "ⅇ",
    exponentiale: "ⅇ",
    fallingdotseq: "≒",
    Fcy: "Ф",
    fcy: "ф",
    female: "♀",
    ffilig: "ﬃ",
    fflig: "ﬀ",
    ffllig: "ﬄ",
    Ffr: "𝔉",
    ffr: "𝔣",
    filig: "ﬁ",
    FilledSmallSquare: "◼",
    FilledVerySmallSquare: "▪",
    fjlig: "fj",
    flat: "♭",
    fllig: "ﬂ",
    fltns: "▱",
    fnof: "ƒ",
    Fopf: "𝔽",
    fopf: "𝕗",
    ForAll: "∀",
    forall: "∀",
    fork: "⋔",
    forkv: "⫙",
    Fouriertrf: "ℱ",
    fpartint: "⨍",
    frac12: "½",
    frac13: "⅓",
    frac14: "¼",
    frac15: "⅕",
    frac16: "⅙",
    frac18: "⅛",
    frac23: "⅔",
    frac25: "⅖",
    frac34: "¾",
    frac35: "⅗",
    frac38: "⅜",
    frac45: "⅘",
    frac56: "⅚",
    frac58: "⅝",
    frac78: "⅞",
    frasl: "⁄",
    frown: "⌢",
    Fscr: "ℱ",
    fscr: "𝒻",
    gacute: "ǵ",
    Gamma: "Γ",
    gamma: "γ",
    Gammad: "Ϝ",
    gammad: "ϝ",
    gap: "⪆",
    Gbreve: "Ğ",
    gbreve: "ğ",
    Gcedil: "Ģ",
    Gcirc: "Ĝ",
    gcirc: "ĝ",
    Gcy: "Г",
    gcy: "г",
    Gdot: "Ġ",
    gdot: "ġ",
    gE: "≧",
    ge: "≥",
    gEl: "⪌",
    gel: "⋛",
    geq: "≥",
    geqq: "≧",
    geqslant: "⩾",
    ges: "⩾",
    gescc: "⪩",
    gesdot: "⪀",
    gesdoto: "⪂",
    gesdotol: "⪄",
    gesl: "⋛︀",
    gesles: "⪔",
    Gfr: "𝔊",
    gfr: "𝔤",
    Gg: "⋙",
    gg: "≫",
    ggg: "⋙",
    gimel: "ℷ",
    GJcy: "Ѓ",
    gjcy: "ѓ",
    gl: "≷",
    gla: "⪥",
    glE: "⪒",
    glj: "⪤",
    gnap: "⪊",
    gnapprox: "⪊",
    gnE: "≩",
    gne: "⪈",
    gneq: "⪈",
    gneqq: "≩",
    gnsim: "⋧",
    Gopf: "𝔾",
    gopf: "𝕘",
    grave: "`",
    GreaterEqual: "≥",
    GreaterEqualLess: "⋛",
    GreaterFullEqual: "≧",
    GreaterGreater: "⪢",
    GreaterLess: "≷",
    GreaterSlantEqual: "⩾",
    GreaterTilde: "≳",
    Gscr: "𝒢",
    gscr: "ℊ",
    gsim: "≳",
    gsime: "⪎",
    gsiml: "⪐",
    Gt: "≫",
    GT: ">",
    gt: ">",
    gtcc: "⪧",
    gtcir: "⩺",
    gtdot: "⋗",
    gtlPar: "⦕",
    gtquest: "⩼",
    gtrapprox: "⪆",
    gtrarr: "⥸",
    gtrdot: "⋗",
    gtreqless: "⋛",
    gtreqqless: "⪌",
    gtrless: "≷",
    gtrsim: "≳",
    gvertneqq: "≩︀",
    gvnE: "≩︀",
    Hacek: "ˇ",
    hairsp: " ",
    half: "½",
    hamilt: "ℋ",
    HARDcy: "Ъ",
    hardcy: "ъ",
    hArr: "⇔",
    harr: "↔",
    harrcir: "⥈",
    harrw: "↭",
    Hat: "^",
    hbar: "ℏ",
    Hcirc: "Ĥ",
    hcirc: "ĥ",
    hearts: "♥",
    heartsuit: "♥",
    hellip: "…",
    hercon: "⊹",
    Hfr: "ℌ",
    hfr: "𝔥",
    HilbertSpace: "ℋ",
    hksearow: "⤥",
    hkswarow: "⤦",
    hoarr: "⇿",
    homtht: "∻",
    hookleftarrow: "↩",
    hookrightarrow: "↪",
    Hopf: "ℍ",
    hopf: "𝕙",
    horbar: "―",
    HorizontalLine: "─",
    Hscr: "ℋ",
    hscr: "𝒽",
    hslash: "ℏ",
    Hstrok: "Ħ",
    hstrok: "ħ",
    HumpDownHump: "≎",
    HumpEqual: "≏",
    hybull: "⁃",
    hyphen: "‐",
    Iacute: "Í",
    iacute: "í",
    ic: "⁣",
    Icirc: "Î",
    icirc: "î",
    Icy: "И",
    icy: "и",
    Idot: "İ",
    IEcy: "Е",
    iecy: "е",
    iexcl: "¡",
    iff: "⇔",
    Ifr: "ℑ",
    ifr: "𝔦",
    Igrave: "Ì",
    igrave: "ì",
    ii: "ⅈ",
    iiiint: "⨌",
    iiint: "∭",
    iinfin: "⧜",
    iiota: "℩",
    IJlig: "Ĳ",
    ijlig: "ĳ",
    Im: "ℑ",
    Imacr: "Ī",
    imacr: "ī",
    image: "ℑ",
    ImaginaryI: "ⅈ",
    imagline: "ℐ",
    imagpart: "ℑ",
    imath: "ı",
    imof: "⊷",
    imped: "Ƶ",
    Implies: "⇒",
    in: "∈",
    incare: "℅",
    infin: "∞",
    infintie: "⧝",
    inodot: "ı",
    Int: "∬",
    int: "∫",
    intcal: "⊺",
    integers: "ℤ",
    Integral: "∫",
    intercal: "⊺",
    Intersection: "⋂",
    intlarhk: "⨗",
    intprod: "⨼",
    InvisibleComma: "⁣",
    InvisibleTimes: "⁢",
    IOcy: "Ё",
    iocy: "ё",
    Iogon: "Į",
    iogon: "į",
    Iopf: "𝕀",
    iopf: "𝕚",
    Iota: "Ι",
    iota: "ι",
    iprod: "⨼",
    iquest: "¿",
    Iscr: "ℐ",
    iscr: "𝒾",
    isin: "∈",
    isindot: "⋵",
    isinE: "⋹",
    isins: "⋴",
    isinsv: "⋳",
    isinv: "∈",
    it: "⁢",
    Itilde: "Ĩ",
    itilde: "ĩ",
    Iukcy: "І",
    iukcy: "і",
    Iuml: "Ï",
    iuml: "ï",
    Jcirc: "Ĵ",
    jcirc: "ĵ",
    Jcy: "Й",
    jcy: "й",
    Jfr: "𝔍",
    jfr: "𝔧",
    jmath: "ȷ",
    Jopf: "𝕁",
    jopf: "𝕛",
    Jscr: "𝒥",
    jscr: "𝒿",
    Jsercy: "Ј",
    jsercy: "ј",
    Jukcy: "Є",
    jukcy: "є",
    Kappa: "Κ",
    kappa: "κ",
    kappav: "ϰ",
    Kcedil: "Ķ",
    kcedil: "ķ",
    Kcy: "К",
    kcy: "к",
    Kfr: "𝔎",
    kfr: "𝔨",
    kgreen: "ĸ",
    KHcy: "Х",
    khcy: "х",
    KJcy: "Ќ",
    kjcy: "ќ",
    Kopf: "𝕂",
    kopf: "𝕜",
    Kscr: "𝒦",
    kscr: "𝓀",
    lAarr: "⇚",
    Lacute: "Ĺ",
    lacute: "ĺ",
    laemptyv: "⦴",
    lagran: "ℒ",
    Lambda: "Λ",
    lambda: "λ",
    Lang: "⟪",
    lang: "⟨",
    langd: "⦑",
    langle: "⟨",
    lap: "⪅",
    Laplacetrf: "ℒ",
    laquo: "«",
    Larr: "↞",
    lArr: "⇐",
    larr: "←",
    larrb: "⇤",
    larrbfs: "⤟",
    larrfs: "⤝",
    larrhk: "↩",
    larrlp: "↫",
    larrpl: "⤹",
    larrsim: "⥳",
    larrtl: "↢",
    lat: "⪫",
    lAtail: "⤛",
    latail: "⤙",
    late: "⪭",
    lates: "⪭︀",
    lBarr: "⤎",
    lbarr: "⤌",
    lbbrk: "❲",
    lbrace: "{",
    lbrack: "[",
    lbrke: "⦋",
    lbrksld: "⦏",
    lbrkslu: "⦍",
    Lcaron: "Ľ",
    lcaron: "ľ",
    Lcedil: "Ļ",
    lcedil: "ļ",
    lceil: "⌈",
    lcub: "{",
    Lcy: "Л",
    lcy: "л",
    ldca: "⤶",
    ldquo: "“",
    ldquor: "„",
    ldrdhar: "⥧",
    ldrushar: "⥋",
    ldsh: "↲",
    lE: "≦",
    le: "≤",
    LeftAngleBracket: "⟨",
    LeftArrow: "←",
    Leftarrow: "⇐",
    leftarrow: "←",
    LeftArrowBar: "⇤",
    LeftArrowRightArrow: "⇆",
    leftarrowtail: "↢",
    LeftCeiling: "⌈",
    LeftDoubleBracket: "⟦",
    LeftDownTeeVector: "⥡",
    LeftDownVector: "⇃",
    LeftDownVectorBar: "⥙",
    LeftFloor: "⌊",
    leftharpoondown: "↽",
    leftharpoonup: "↼",
    leftleftarrows: "⇇",
    LeftRightArrow: "↔",
    Leftrightarrow: "⇔",
    leftrightarrow: "↔",
    leftrightarrows: "⇆",
    leftrightharpoons: "⇋",
    leftrightsquigarrow: "↭",
    LeftRightVector: "⥎",
    LeftTee: "⊣",
    LeftTeeArrow: "↤",
    LeftTeeVector: "⥚",
    leftthreetimes: "⋋",
    LeftTriangle: "⊲",
    LeftTriangleBar: "⧏",
    LeftTriangleEqual: "⊴",
    LeftUpDownVector: "⥑",
    LeftUpTeeVector: "⥠",
    LeftUpVector: "↿",
    LeftUpVectorBar: "⥘",
    LeftVector: "↼",
    LeftVectorBar: "⥒",
    lEg: "⪋",
    leg: "⋚",
    leq: "≤",
    leqq: "≦",
    leqslant: "⩽",
    les: "⩽",
    lescc: "⪨",
    lesdot: "⩿",
    lesdoto: "⪁",
    lesdotor: "⪃",
    lesg: "⋚︀",
    lesges: "⪓",
    lessapprox: "⪅",
    lessdot: "⋖",
    lesseqgtr: "⋚",
    lesseqqgtr: "⪋",
    LessEqualGreater: "⋚",
    LessFullEqual: "≦",
    LessGreater: "≶",
    lessgtr: "≶",
    LessLess: "⪡",
    lesssim: "≲",
    LessSlantEqual: "⩽",
    LessTilde: "≲",
    lfisht: "⥼",
    lfloor: "⌊",
    Lfr: "𝔏",
    lfr: "𝔩",
    lg: "≶",
    lgE: "⪑",
    lHar: "⥢",
    lhard: "↽",
    lharu: "↼",
    lharul: "⥪",
    lhblk: "▄",
    LJcy: "Љ",
    ljcy: "љ",
    Ll: "⋘",
    ll: "≪",
    llarr: "⇇",
    llcorner: "⌞",
    Lleftarrow: "⇚",
    llhard: "⥫",
    lltri: "◺",
    Lmidot: "Ŀ",
    lmidot: "ŀ",
    lmoust: "⎰",
    lmoustache: "⎰",
    lnap: "⪉",
    lnapprox: "⪉",
    lnE: "≨",
    lne: "⪇",
    lneq: "⪇",
    lneqq: "≨",
    lnsim: "⋦",
    loang: "⟬",
    loarr: "⇽",
    lobrk: "⟦",
    LongLeftArrow: "⟵",
    Longleftarrow: "⟸",
    longleftarrow: "⟵",
    LongLeftRightArrow: "⟷",
    Longleftrightarrow: "⟺",
    longleftrightarrow: "⟷",
    longmapsto: "⟼",
    LongRightArrow: "⟶",
    Longrightarrow: "⟹",
    longrightarrow: "⟶",
    looparrowleft: "↫",
    looparrowright: "↬",
    lopar: "⦅",
    Lopf: "𝕃",
    lopf: "𝕝",
    loplus: "⨭",
    lotimes: "⨴",
    lowast: "∗",
    lowbar: "_",
    LowerLeftArrow: "↙",
    LowerRightArrow: "↘",
    loz: "◊",
    lozenge: "◊",
    lozf: "⧫",
    lpar: "(",
    lparlt: "⦓",
    lrarr: "⇆",
    lrcorner: "⌟",
    lrhar: "⇋",
    lrhard: "⥭",
    lrm: "‎",
    lrtri: "⊿",
    lsaquo: "‹",
    Lscr: "ℒ",
    lscr: "𝓁",
    Lsh: "↰",
    lsh: "↰",
    lsim: "≲",
    lsime: "⪍",
    lsimg: "⪏",
    lsqb: "[",
    lsquo: "‘",
    lsquor: "‚",
    Lstrok: "Ł",
    lstrok: "ł",
    Lt: "≪",
    LT: "<",
    lt: "<",
    ltcc: "⪦",
    ltcir: "⩹",
    ltdot: "⋖",
    lthree: "⋋",
    ltimes: "⋉",
    ltlarr: "⥶",
    ltquest: "⩻",
    ltri: "◃",
    ltrie: "⊴",
    ltrif: "◂",
    ltrPar: "⦖",
    lurdshar: "⥊",
    luruhar: "⥦",
    lvertneqq: "≨︀",
    lvnE: "≨︀",
    macr: "¯",
    male: "♂",
    malt: "✠",
    maltese: "✠",
    Map: "⤅",
    map: "↦",
    mapsto: "↦",
    mapstodown: "↧",
    mapstoleft: "↤",
    mapstoup: "↥",
    marker: "▮",
    mcomma: "⨩",
    Mcy: "М",
    mcy: "м",
    mdash: "—",
    mDDot: "∺",
    measuredangle: "∡",
    MediumSpace: " ",
    Mellintrf: "ℳ",
    Mfr: "𝔐",
    mfr: "𝔪",
    mho: "℧",
    micro: "µ",
    mid: "∣",
    midast: "*",
    midcir: "⫰",
    middot: "·",
    minus: "−",
    minusb: "⊟",
    minusd: "∸",
    minusdu: "⨪",
    MinusPlus: "∓",
    mlcp: "⫛",
    mldr: "…",
    mnplus: "∓",
    models: "⊧",
    Mopf: "𝕄",
    mopf: "𝕞",
    mp: "∓",
    Mscr: "ℳ",
    mscr: "𝓂",
    mstpos: "∾",
    Mu: "Μ",
    mu: "μ",
    multimap: "⊸",
    mumap: "⊸",
    nabla: "∇",
    Nacute: "Ń",
    nacute: "ń",
    nang: "∠⃒",
    nap: "≉",
    napE: "⩰̸",
    napid: "≋̸",
    napos: "ŉ",
    napprox: "≉",
    natur: "♮",
    natural: "♮",
    naturals: "ℕ",
    nbsp: " ",
    nbump: "≎̸",
    nbumpe: "≏̸",
    ncap: "⩃",
    Ncaron: "Ň",
    ncaron: "ň",
    Ncedil: "Ņ",
    ncedil: "ņ",
    ncong: "≇",
    ncongdot: "⩭̸",
    ncup: "⩂",
    Ncy: "Н",
    ncy: "н",
    ndash: "–",
    ne: "≠",
    nearhk: "⤤",
    neArr: "⇗",
    nearr: "↗",
    nearrow: "↗",
    nedot: "≐̸",
    NegativeMediumSpace: "​",
    NegativeThickSpace: "​",
    NegativeThinSpace: "​",
    NegativeVeryThinSpace: "​",
    nequiv: "≢",
    nesear: "⤨",
    nesim: "≂̸",
    NestedGreaterGreater: "≫",
    NestedLessLess: "≪",
    NewLine: `
`,
    nexist: "∄",
    nexists: "∄",
    Nfr: "𝔑",
    nfr: "𝔫",
    ngE: "≧̸",
    nge: "≱",
    ngeq: "≱",
    ngeqq: "≧̸",
    ngeqslant: "⩾̸",
    nges: "⩾̸",
    nGg: "⋙̸",
    ngsim: "≵",
    nGt: "≫⃒",
    ngt: "≯",
    ngtr: "≯",
    nGtv: "≫̸",
    nhArr: "⇎",
    nharr: "↮",
    nhpar: "⫲",
    ni: "∋",
    nis: "⋼",
    nisd: "⋺",
    niv: "∋",
    NJcy: "Њ",
    njcy: "њ",
    nlArr: "⇍",
    nlarr: "↚",
    nldr: "‥",
    nlE: "≦̸",
    nle: "≰",
    nLeftarrow: "⇍",
    nleftarrow: "↚",
    nLeftrightarrow: "⇎",
    nleftrightarrow: "↮",
    nleq: "≰",
    nleqq: "≦̸",
    nleqslant: "⩽̸",
    nles: "⩽̸",
    nless: "≮",
    nLl: "⋘̸",
    nlsim: "≴",
    nLt: "≪⃒",
    nlt: "≮",
    nltri: "⋪",
    nltrie: "⋬",
    nLtv: "≪̸",
    nmid: "∤",
    NoBreak: "⁠",
    NonBreakingSpace: " ",
    Nopf: "ℕ",
    nopf: "𝕟",
    Not: "⫬",
    not: "¬",
    NotCongruent: "≢",
    NotCupCap: "≭",
    NotDoubleVerticalBar: "∦",
    NotElement: "∉",
    NotEqual: "≠",
    NotEqualTilde: "≂̸",
    NotExists: "∄",
    NotGreater: "≯",
    NotGreaterEqual: "≱",
    NotGreaterFullEqual: "≧̸",
    NotGreaterGreater: "≫̸",
    NotGreaterLess: "≹",
    NotGreaterSlantEqual: "⩾̸",
    NotGreaterTilde: "≵",
    NotHumpDownHump: "≎̸",
    NotHumpEqual: "≏̸",
    notin: "∉",
    notindot: "⋵̸",
    notinE: "⋹̸",
    notinva: "∉",
    notinvb: "⋷",
    notinvc: "⋶",
    NotLeftTriangle: "⋪",
    NotLeftTriangleBar: "⧏̸",
    NotLeftTriangleEqual: "⋬",
    NotLess: "≮",
    NotLessEqual: "≰",
    NotLessGreater: "≸",
    NotLessLess: "≪̸",
    NotLessSlantEqual: "⩽̸",
    NotLessTilde: "≴",
    NotNestedGreaterGreater: "⪢̸",
    NotNestedLessLess: "⪡̸",
    notni: "∌",
    notniva: "∌",
    notnivb: "⋾",
    notnivc: "⋽",
    NotPrecedes: "⊀",
    NotPrecedesEqual: "⪯̸",
    NotPrecedesSlantEqual: "⋠",
    NotReverseElement: "∌",
    NotRightTriangle: "⋫",
    NotRightTriangleBar: "⧐̸",
    NotRightTriangleEqual: "⋭",
    NotSquareSubset: "⊏̸",
    NotSquareSubsetEqual: "⋢",
    NotSquareSuperset: "⊐̸",
    NotSquareSupersetEqual: "⋣",
    NotSubset: "⊂⃒",
    NotSubsetEqual: "⊈",
    NotSucceeds: "⊁",
    NotSucceedsEqual: "⪰̸",
    NotSucceedsSlantEqual: "⋡",
    NotSucceedsTilde: "≿̸",
    NotSuperset: "⊃⃒",
    NotSupersetEqual: "⊉",
    NotTilde: "≁",
    NotTildeEqual: "≄",
    NotTildeFullEqual: "≇",
    NotTildeTilde: "≉",
    NotVerticalBar: "∤",
    npar: "∦",
    nparallel: "∦",
    nparsl: "⫽⃥",
    npart: "∂̸",
    npolint: "⨔",
    npr: "⊀",
    nprcue: "⋠",
    npre: "⪯̸",
    nprec: "⊀",
    npreceq: "⪯̸",
    nrArr: "⇏",
    nrarr: "↛",
    nrarrc: "⤳̸",
    nrarrw: "↝̸",
    nRightarrow: "⇏",
    nrightarrow: "↛",
    nrtri: "⋫",
    nrtrie: "⋭",
    nsc: "⊁",
    nsccue: "⋡",
    nsce: "⪰̸",
    Nscr: "𝒩",
    nscr: "𝓃",
    nshortmid: "∤",
    nshortparallel: "∦",
    nsim: "≁",
    nsime: "≄",
    nsimeq: "≄",
    nsmid: "∤",
    nspar: "∦",
    nsqsube: "⋢",
    nsqsupe: "⋣",
    nsub: "⊄",
    nsubE: "⫅̸",
    nsube: "⊈",
    nsubset: "⊂⃒",
    nsubseteq: "⊈",
    nsubseteqq: "⫅̸",
    nsucc: "⊁",
    nsucceq: "⪰̸",
    nsup: "⊅",
    nsupE: "⫆̸",
    nsupe: "⊉",
    nsupset: "⊃⃒",
    nsupseteq: "⊉",
    nsupseteqq: "⫆̸",
    ntgl: "≹",
    Ntilde: "Ñ",
    ntilde: "ñ",
    ntlg: "≸",
    ntriangleleft: "⋪",
    ntrianglelefteq: "⋬",
    ntriangleright: "⋫",
    ntrianglerighteq: "⋭",
    Nu: "Ν",
    nu: "ν",
    num: "#",
    numero: "№",
    numsp: " ",
    nvap: "≍⃒",
    nVDash: "⊯",
    nVdash: "⊮",
    nvDash: "⊭",
    nvdash: "⊬",
    nvge: "≥⃒",
    nvgt: ">⃒",
    nvHarr: "⤄",
    nvinfin: "⧞",
    nvlArr: "⤂",
    nvle: "≤⃒",
    nvlt: "<⃒",
    nvltrie: "⊴⃒",
    nvrArr: "⤃",
    nvrtrie: "⊵⃒",
    nvsim: "∼⃒",
    nwarhk: "⤣",
    nwArr: "⇖",
    nwarr: "↖",
    nwarrow: "↖",
    nwnear: "⤧",
    Oacute: "Ó",
    oacute: "ó",
    oast: "⊛",
    ocir: "⊚",
    Ocirc: "Ô",
    ocirc: "ô",
    Ocy: "О",
    ocy: "о",
    odash: "⊝",
    Odblac: "Ő",
    odblac: "ő",
    odiv: "⨸",
    odot: "⊙",
    odsold: "⦼",
    OElig: "Œ",
    oelig: "œ",
    ofcir: "⦿",
    Ofr: "𝔒",
    ofr: "𝔬",
    ogon: "˛",
    Ograve: "Ò",
    ograve: "ò",
    ogt: "⧁",
    ohbar: "⦵",
    ohm: "Ω",
    oint: "∮",
    olarr: "↺",
    olcir: "⦾",
    olcross: "⦻",
    oline: "‾",
    olt: "⧀",
    Omacr: "Ō",
    omacr: "ō",
    Omega: "Ω",
    omega: "ω",
    Omicron: "Ο",
    omicron: "ο",
    omid: "⦶",
    ominus: "⊖",
    Oopf: "𝕆",
    oopf: "𝕠",
    opar: "⦷",
    OpenCurlyDoubleQuote: "“",
    OpenCurlyQuote: "‘",
    operp: "⦹",
    oplus: "⊕",
    Or: "⩔",
    or: "∨",
    orarr: "↻",
    ord: "⩝",
    order: "ℴ",
    orderof: "ℴ",
    ordf: "ª",
    ordm: "º",
    origof: "⊶",
    oror: "⩖",
    orslope: "⩗",
    orv: "⩛",
    oS: "Ⓢ",
    Oscr: "𝒪",
    oscr: "ℴ",
    Oslash: "Ø",
    oslash: "ø",
    osol: "⊘",
    Otilde: "Õ",
    otilde: "õ",
    Otimes: "⨷",
    otimes: "⊗",
    otimesas: "⨶",
    Ouml: "Ö",
    ouml: "ö",
    ovbar: "⌽",
    OverBar: "‾",
    OverBrace: "⏞",
    OverBracket: "⎴",
    OverParenthesis: "⏜",
    par: "∥",
    para: "¶",
    parallel: "∥",
    parsim: "⫳",
    parsl: "⫽",
    part: "∂",
    PartialD: "∂",
    Pcy: "П",
    pcy: "п",
    percnt: "%",
    period: ".",
    permil: "‰",
    perp: "⊥",
    pertenk: "‱",
    Pfr: "𝔓",
    pfr: "𝔭",
    Phi: "Φ",
    phi: "φ",
    phiv: "ϕ",
    phmmat: "ℳ",
    phone: "☎",
    Pi: "Π",
    pi: "π",
    pitchfork: "⋔",
    piv: "ϖ",
    planck: "ℏ",
    planckh: "ℎ",
    plankv: "ℏ",
    plus: "+",
    plusacir: "⨣",
    plusb: "⊞",
    pluscir: "⨢",
    plusdo: "∔",
    plusdu: "⨥",
    pluse: "⩲",
    PlusMinus: "±",
    plusmn: "±",
    plussim: "⨦",
    plustwo: "⨧",
    pm: "±",
    Poincareplane: "ℌ",
    pointint: "⨕",
    Popf: "ℙ",
    popf: "𝕡",
    pound: "£",
    Pr: "⪻",
    pr: "≺",
    prap: "⪷",
    prcue: "≼",
    prE: "⪳",
    pre: "⪯",
    prec: "≺",
    precapprox: "⪷",
    preccurlyeq: "≼",
    Precedes: "≺",
    PrecedesEqual: "⪯",
    PrecedesSlantEqual: "≼",
    PrecedesTilde: "≾",
    preceq: "⪯",
    precnapprox: "⪹",
    precneqq: "⪵",
    precnsim: "⋨",
    precsim: "≾",
    Prime: "″",
    prime: "′",
    primes: "ℙ",
    prnap: "⪹",
    prnE: "⪵",
    prnsim: "⋨",
    prod: "∏",
    Product: "∏",
    profalar: "⌮",
    profline: "⌒",
    profsurf: "⌓",
    prop: "∝",
    Proportion: "∷",
    Proportional: "∝",
    propto: "∝",
    prsim: "≾",
    prurel: "⊰",
    Pscr: "𝒫",
    pscr: "𝓅",
    Psi: "Ψ",
    psi: "ψ",
    puncsp: " ",
    Qfr: "𝔔",
    qfr: "𝔮",
    qint: "⨌",
    Qopf: "ℚ",
    qopf: "𝕢",
    qprime: "⁗",
    Qscr: "𝒬",
    qscr: "𝓆",
    quaternions: "ℍ",
    quatint: "⨖",
    quest: "?",
    questeq: "≟",
    QUOT: '"',
    quot: '"',
    rAarr: "⇛",
    race: "∽̱",
    Racute: "Ŕ",
    racute: "ŕ",
    radic: "√",
    raemptyv: "⦳",
    Rang: "⟫",
    rang: "⟩",
    rangd: "⦒",
    range: "⦥",
    rangle: "⟩",
    raquo: "»",
    Rarr: "↠",
    rArr: "⇒",
    rarr: "→",
    rarrap: "⥵",
    rarrb: "⇥",
    rarrbfs: "⤠",
    rarrc: "⤳",
    rarrfs: "⤞",
    rarrhk: "↪",
    rarrlp: "↬",
    rarrpl: "⥅",
    rarrsim: "⥴",
    Rarrtl: "⤖",
    rarrtl: "↣",
    rarrw: "↝",
    rAtail: "⤜",
    ratail: "⤚",
    ratio: "∶",
    rationals: "ℚ",
    RBarr: "⤐",
    rBarr: "⤏",
    rbarr: "⤍",
    rbbrk: "❳",
    rbrace: "}",
    rbrack: "]",
    rbrke: "⦌",
    rbrksld: "⦎",
    rbrkslu: "⦐",
    Rcaron: "Ř",
    rcaron: "ř",
    Rcedil: "Ŗ",
    rcedil: "ŗ",
    rceil: "⌉",
    rcub: "}",
    Rcy: "Р",
    rcy: "р",
    rdca: "⤷",
    rdldhar: "⥩",
    rdquo: "”",
    rdquor: "”",
    rdsh: "↳",
    Re: "ℜ",
    real: "ℜ",
    realine: "ℛ",
    realpart: "ℜ",
    reals: "ℝ",
    rect: "▭",
    REG: "®",
    reg: "®",
    ReverseElement: "∋",
    ReverseEquilibrium: "⇋",
    ReverseUpEquilibrium: "⥯",
    rfisht: "⥽",
    rfloor: "⌋",
    Rfr: "ℜ",
    rfr: "𝔯",
    rHar: "⥤",
    rhard: "⇁",
    rharu: "⇀",
    rharul: "⥬",
    Rho: "Ρ",
    rho: "ρ",
    rhov: "ϱ",
    RightAngleBracket: "⟩",
    RightArrow: "→",
    Rightarrow: "⇒",
    rightarrow: "→",
    RightArrowBar: "⇥",
    RightArrowLeftArrow: "⇄",
    rightarrowtail: "↣",
    RightCeiling: "⌉",
    RightDoubleBracket: "⟧",
    RightDownTeeVector: "⥝",
    RightDownVector: "⇂",
    RightDownVectorBar: "⥕",
    RightFloor: "⌋",
    rightharpoondown: "⇁",
    rightharpoonup: "⇀",
    rightleftarrows: "⇄",
    rightleftharpoons: "⇌",
    rightrightarrows: "⇉",
    rightsquigarrow: "↝",
    RightTee: "⊢",
    RightTeeArrow: "↦",
    RightTeeVector: "⥛",
    rightthreetimes: "⋌",
    RightTriangle: "⊳",
    RightTriangleBar: "⧐",
    RightTriangleEqual: "⊵",
    RightUpDownVector: "⥏",
    RightUpTeeVector: "⥜",
    RightUpVector: "↾",
    RightUpVectorBar: "⥔",
    RightVector: "⇀",
    RightVectorBar: "⥓",
    ring: "˚",
    risingdotseq: "≓",
    rlarr: "⇄",
    rlhar: "⇌",
    rlm: "‏",
    rmoust: "⎱",
    rmoustache: "⎱",
    rnmid: "⫮",
    roang: "⟭",
    roarr: "⇾",
    robrk: "⟧",
    ropar: "⦆",
    Ropf: "ℝ",
    ropf: "𝕣",
    roplus: "⨮",
    rotimes: "⨵",
    RoundImplies: "⥰",
    rpar: ")",
    rpargt: "⦔",
    rppolint: "⨒",
    rrarr: "⇉",
    Rrightarrow: "⇛",
    rsaquo: "›",
    Rscr: "ℛ",
    rscr: "𝓇",
    Rsh: "↱",
    rsh: "↱",
    rsqb: "]",
    rsquo: "’",
    rsquor: "’",
    rthree: "⋌",
    rtimes: "⋊",
    rtri: "▹",
    rtrie: "⊵",
    rtrif: "▸",
    rtriltri: "⧎",
    RuleDelayed: "⧴",
    ruluhar: "⥨",
    rx: "℞",
    Sacute: "Ś",
    sacute: "ś",
    sbquo: "‚",
    Sc: "⪼",
    sc: "≻",
    scap: "⪸",
    Scaron: "Š",
    scaron: "š",
    sccue: "≽",
    scE: "⪴",
    sce: "⪰",
    Scedil: "Ş",
    scedil: "ş",
    Scirc: "Ŝ",
    scirc: "ŝ",
    scnap: "⪺",
    scnE: "⪶",
    scnsim: "⋩",
    scpolint: "⨓",
    scsim: "≿",
    Scy: "С",
    scy: "с",
    sdot: "⋅",
    sdotb: "⊡",
    sdote: "⩦",
    searhk: "⤥",
    seArr: "⇘",
    searr: "↘",
    searrow: "↘",
    sect: "§",
    semi: ";",
    seswar: "⤩",
    setminus: "∖",
    setmn: "∖",
    sext: "✶",
    Sfr: "𝔖",
    sfr: "𝔰",
    sfrown: "⌢",
    sharp: "♯",
    SHCHcy: "Щ",
    shchcy: "щ",
    SHcy: "Ш",
    shcy: "ш",
    ShortDownArrow: "↓",
    ShortLeftArrow: "←",
    shortmid: "∣",
    shortparallel: "∥",
    ShortRightArrow: "→",
    ShortUpArrow: "↑",
    shy: "­",
    Sigma: "Σ",
    sigma: "σ",
    sigmaf: "ς",
    sigmav: "ς",
    sim: "∼",
    simdot: "⩪",
    sime: "≃",
    simeq: "≃",
    simg: "⪞",
    simgE: "⪠",
    siml: "⪝",
    simlE: "⪟",
    simne: "≆",
    simplus: "⨤",
    simrarr: "⥲",
    slarr: "←",
    SmallCircle: "∘",
    smallsetminus: "∖",
    smashp: "⨳",
    smeparsl: "⧤",
    smid: "∣",
    smile: "⌣",
    smt: "⪪",
    smte: "⪬",
    smtes: "⪬︀",
    SOFTcy: "Ь",
    softcy: "ь",
    sol: "/",
    solb: "⧄",
    solbar: "⌿",
    Sopf: "𝕊",
    sopf: "𝕤",
    spades: "♠",
    spadesuit: "♠",
    spar: "∥",
    sqcap: "⊓",
    sqcaps: "⊓︀",
    sqcup: "⊔",
    sqcups: "⊔︀",
    Sqrt: "√",
    sqsub: "⊏",
    sqsube: "⊑",
    sqsubset: "⊏",
    sqsubseteq: "⊑",
    sqsup: "⊐",
    sqsupe: "⊒",
    sqsupset: "⊐",
    sqsupseteq: "⊒",
    squ: "□",
    Square: "□",
    square: "□",
    SquareIntersection: "⊓",
    SquareSubset: "⊏",
    SquareSubsetEqual: "⊑",
    SquareSuperset: "⊐",
    SquareSupersetEqual: "⊒",
    SquareUnion: "⊔",
    squarf: "▪",
    squf: "▪",
    srarr: "→",
    Sscr: "𝒮",
    sscr: "𝓈",
    ssetmn: "∖",
    ssmile: "⌣",
    sstarf: "⋆",
    Star: "⋆",
    star: "☆",
    starf: "★",
    straightepsilon: "ϵ",
    straightphi: "ϕ",
    strns: "¯",
    Sub: "⋐",
    sub: "⊂",
    subdot: "⪽",
    subE: "⫅",
    sube: "⊆",
    subedot: "⫃",
    submult: "⫁",
    subnE: "⫋",
    subne: "⊊",
    subplus: "⪿",
    subrarr: "⥹",
    Subset: "⋐",
    subset: "⊂",
    subseteq: "⊆",
    subseteqq: "⫅",
    SubsetEqual: "⊆",
    subsetneq: "⊊",
    subsetneqq: "⫋",
    subsim: "⫇",
    subsub: "⫕",
    subsup: "⫓",
    succ: "≻",
    succapprox: "⪸",
    succcurlyeq: "≽",
    Succeeds: "≻",
    SucceedsEqual: "⪰",
    SucceedsSlantEqual: "≽",
    SucceedsTilde: "≿",
    succeq: "⪰",
    succnapprox: "⪺",
    succneqq: "⪶",
    succnsim: "⋩",
    succsim: "≿",
    SuchThat: "∋",
    Sum: "∑",
    sum: "∑",
    sung: "♪",
    Sup: "⋑",
    sup: "⊃",
    sup1: "¹",
    sup2: "²",
    sup3: "³",
    supdot: "⪾",
    supdsub: "⫘",
    supE: "⫆",
    supe: "⊇",
    supedot: "⫄",
    Superset: "⊃",
    SupersetEqual: "⊇",
    suphsol: "⟉",
    suphsub: "⫗",
    suplarr: "⥻",
    supmult: "⫂",
    supnE: "⫌",
    supne: "⊋",
    supplus: "⫀",
    Supset: "⋑",
    supset: "⊃",
    supseteq: "⊇",
    supseteqq: "⫆",
    supsetneq: "⊋",
    supsetneqq: "⫌",
    supsim: "⫈",
    supsub: "⫔",
    supsup: "⫖",
    swarhk: "⤦",
    swArr: "⇙",
    swarr: "↙",
    swarrow: "↙",
    swnwar: "⤪",
    szlig: "ß",
    Tab: "	",
    target: "⌖",
    Tau: "Τ",
    tau: "τ",
    tbrk: "⎴",
    Tcaron: "Ť",
    tcaron: "ť",
    Tcedil: "Ţ",
    tcedil: "ţ",
    Tcy: "Т",
    tcy: "т",
    tdot: "⃛",
    telrec: "⌕",
    Tfr: "𝔗",
    tfr: "𝔱",
    there4: "∴",
    Therefore: "∴",
    therefore: "∴",
    Theta: "Θ",
    theta: "θ",
    thetasym: "ϑ",
    thetav: "ϑ",
    thickapprox: "≈",
    thicksim: "∼",
    ThickSpace: "  ",
    thinsp: " ",
    ThinSpace: " ",
    thkap: "≈",
    thksim: "∼",
    THORN: "Þ",
    thorn: "þ",
    Tilde: "∼",
    tilde: "˜",
    TildeEqual: "≃",
    TildeFullEqual: "≅",
    TildeTilde: "≈",
    times: "×",
    timesb: "⊠",
    timesbar: "⨱",
    timesd: "⨰",
    tint: "∭",
    toea: "⤨",
    top: "⊤",
    topbot: "⌶",
    topcir: "⫱",
    Topf: "𝕋",
    topf: "𝕥",
    topfork: "⫚",
    tosa: "⤩",
    tprime: "‴",
    TRADE: "™",
    trade: "™",
    triangle: "▵",
    triangledown: "▿",
    triangleleft: "◃",
    trianglelefteq: "⊴",
    triangleq: "≜",
    triangleright: "▹",
    trianglerighteq: "⊵",
    tridot: "◬",
    trie: "≜",
    triminus: "⨺",
    TripleDot: "⃛",
    triplus: "⨹",
    trisb: "⧍",
    tritime: "⨻",
    trpezium: "⏢",
    Tscr: "𝒯",
    tscr: "𝓉",
    TScy: "Ц",
    tscy: "ц",
    TSHcy: "Ћ",
    tshcy: "ћ",
    Tstrok: "Ŧ",
    tstrok: "ŧ",
    twixt: "≬",
    twoheadleftarrow: "↞",
    twoheadrightarrow: "↠",
    Uacute: "Ú",
    uacute: "ú",
    Uarr: "↟",
    uArr: "⇑",
    uarr: "↑",
    Uarrocir: "⥉",
    Ubrcy: "Ў",
    ubrcy: "ў",
    Ubreve: "Ŭ",
    ubreve: "ŭ",
    Ucirc: "Û",
    ucirc: "û",
    Ucy: "У",
    ucy: "у",
    udarr: "⇅",
    Udblac: "Ű",
    udblac: "ű",
    udhar: "⥮",
    ufisht: "⥾",
    Ufr: "𝔘",
    ufr: "𝔲",
    Ugrave: "Ù",
    ugrave: "ù",
    uHar: "⥣",
    uharl: "↿",
    uharr: "↾",
    uhblk: "▀",
    ulcorn: "⌜",
    ulcorner: "⌜",
    ulcrop: "⌏",
    ultri: "◸",
    Umacr: "Ū",
    umacr: "ū",
    uml: "¨",
    UnderBar: "_",
    UnderBrace: "⏟",
    UnderBracket: "⎵",
    UnderParenthesis: "⏝",
    Union: "⋃",
    UnionPlus: "⊎",
    Uogon: "Ų",
    uogon: "ų",
    Uopf: "𝕌",
    uopf: "𝕦",
    UpArrow: "↑",
    Uparrow: "⇑",
    uparrow: "↑",
    UpArrowBar: "⤒",
    UpArrowDownArrow: "⇅",
    UpDownArrow: "↕",
    Updownarrow: "⇕",
    updownarrow: "↕",
    UpEquilibrium: "⥮",
    upharpoonleft: "↿",
    upharpoonright: "↾",
    uplus: "⊎",
    UpperLeftArrow: "↖",
    UpperRightArrow: "↗",
    Upsi: "ϒ",
    upsi: "υ",
    upsih: "ϒ",
    Upsilon: "Υ",
    upsilon: "υ",
    UpTee: "⊥",
    UpTeeArrow: "↥",
    upuparrows: "⇈",
    urcorn: "⌝",
    urcorner: "⌝",
    urcrop: "⌎",
    Uring: "Ů",
    uring: "ů",
    urtri: "◹",
    Uscr: "𝒰",
    uscr: "𝓊",
    utdot: "⋰",
    Utilde: "Ũ",
    utilde: "ũ",
    utri: "▵",
    utrif: "▴",
    uuarr: "⇈",
    Uuml: "Ü",
    uuml: "ü",
    uwangle: "⦧",
    vangrt: "⦜",
    varepsilon: "ϵ",
    varkappa: "ϰ",
    varnothing: "∅",
    varphi: "ϕ",
    varpi: "ϖ",
    varpropto: "∝",
    vArr: "⇕",
    varr: "↕",
    varrho: "ϱ",
    varsigma: "ς",
    varsubsetneq: "⊊︀",
    varsubsetneqq: "⫋︀",
    varsupsetneq: "⊋︀",
    varsupsetneqq: "⫌︀",
    vartheta: "ϑ",
    vartriangleleft: "⊲",
    vartriangleright: "⊳",
    Vbar: "⫫",
    vBar: "⫨",
    vBarv: "⫩",
    Vcy: "В",
    vcy: "в",
    VDash: "⊫",
    Vdash: "⊩",
    vDash: "⊨",
    vdash: "⊢",
    Vdashl: "⫦",
    Vee: "⋁",
    vee: "∨",
    veebar: "⊻",
    veeeq: "≚",
    vellip: "⋮",
    Verbar: "‖",
    verbar: "|",
    Vert: "‖",
    vert: "|",
    VerticalBar: "∣",
    VerticalLine: "|",
    VerticalSeparator: "❘",
    VerticalTilde: "≀",
    VeryThinSpace: " ",
    Vfr: "𝔙",
    vfr: "𝔳",
    vltri: "⊲",
    vnsub: "⊂⃒",
    vnsup: "⊃⃒",
    Vopf: "𝕍",
    vopf: "𝕧",
    vprop: "∝",
    vrtri: "⊳",
    Vscr: "𝒱",
    vscr: "𝓋",
    vsubnE: "⫋︀",
    vsubne: "⊊︀",
    vsupnE: "⫌︀",
    vsupne: "⊋︀",
    Vvdash: "⊪",
    vzigzag: "⦚",
    Wcirc: "Ŵ",
    wcirc: "ŵ",
    wedbar: "⩟",
    Wedge: "⋀",
    wedge: "∧",
    wedgeq: "≙",
    weierp: "℘",
    Wfr: "𝔚",
    wfr: "𝔴",
    Wopf: "𝕎",
    wopf: "𝕨",
    wp: "℘",
    wr: "≀",
    wreath: "≀",
    Wscr: "𝒲",
    wscr: "𝓌",
    xcap: "⋂",
    xcirc: "◯",
    xcup: "⋃",
    xdtri: "▽",
    Xfr: "𝔛",
    xfr: "𝔵",
    xhArr: "⟺",
    xharr: "⟷",
    Xi: "Ξ",
    xi: "ξ",
    xlArr: "⟸",
    xlarr: "⟵",
    xmap: "⟼",
    xnis: "⋻",
    xodot: "⨀",
    Xopf: "𝕏",
    xopf: "𝕩",
    xoplus: "⨁",
    xotime: "⨂",
    xrArr: "⟹",
    xrarr: "⟶",
    Xscr: "𝒳",
    xscr: "𝓍",
    xsqcup: "⨆",
    xuplus: "⨄",
    xutri: "△",
    xvee: "⋁",
    xwedge: "⋀",
    Yacute: "Ý",
    yacute: "ý",
    YAcy: "Я",
    yacy: "я",
    Ycirc: "Ŷ",
    ycirc: "ŷ",
    Ycy: "Ы",
    ycy: "ы",
    yen: "¥",
    Yfr: "𝔜",
    yfr: "𝔶",
    YIcy: "Ї",
    yicy: "ї",
    Yopf: "𝕐",
    yopf: "𝕪",
    Yscr: "𝒴",
    yscr: "𝓎",
    YUcy: "Ю",
    yucy: "ю",
    Yuml: "Ÿ",
    yuml: "ÿ",
    Zacute: "Ź",
    zacute: "ź",
    Zcaron: "Ž",
    zcaron: "ž",
    Zcy: "З",
    zcy: "з",
    Zdot: "Ż",
    zdot: "ż",
    zeetrf: "ℨ",
    ZeroWidthSpace: "​",
    Zeta: "Ζ",
    zeta: "ζ",
    Zfr: "ℨ",
    zfr: "𝔷",
    ZHcy: "Ж",
    zhcy: "ж",
    zigrarr: "⇝",
    Zopf: "ℤ",
    zopf: "𝕫",
    Zscr: "𝒵",
    zscr: "𝓏",
    zwj: "‍",
    zwnj: "‌"
  }), e.entityMap = e.HTML_ENTITIES;
})(qy);
var ol = {}, Ri = gn.NAMESPACE, Bu = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, Bp = new RegExp("[\\-\\.0-9" + Bu.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"), Rp = new RegExp("^" + Bu.source + Bp.source + "*(?::" + Bu.source + Bp.source + "*)?$"), ni = 0, yn = 1, br = 2, ri = 3, yr = 4, vr = 5, ii = 6, wa = 7;
function Wr(e, t) {
  this.message = e, this.locator = t, Error.captureStackTrace && Error.captureStackTrace(this, Wr);
}
Wr.prototype = new Error();
Wr.prototype.name = Wr.name;
function jy() {
}
jy.prototype = {
  parse: function(e, t, n) {
    var r = this.domBuilder;
    r.startDocument(), Zy(t, t = {}), p8(
      e,
      t,
      n,
      r,
      this.errorHandler
    ), r.endDocument();
  }
};
function p8(e, t, n, r, i) {
  function a(A) {
    if (A > 65535) {
      A -= 65536;
      var T = 55296 + (A >> 10), _ = 56320 + (A & 1023);
      return String.fromCharCode(T, _);
    } else
      return String.fromCharCode(A);
  }
  function o(A) {
    var T = A.slice(1, -1);
    return Object.hasOwnProperty.call(n, T) ? n[T] : T.charAt(0) === "#" ? a(parseInt(T.substr(1).replace("x", "0x"))) : (i.error("entity not found:" + A), A);
  }
  function c(A) {
    if (A > m) {
      var T = e.substring(m, A).replace(/&#?\w+;/g, o);
      f && u(m), r.characters(T, 0, A - m), m = A;
    }
  }
  function u(A, T) {
    for (; A >= d && (T = g.exec(e)); )
      s = T.index, d = s + T[0].length, f.lineNumber++;
    f.columnNumber = A - s + 1;
  }
  for (var s = 0, d = 0, g = /.*(?:\r\n?|\n)|.*$/g, f = r.locator, p = [{ currentNSMap: t }], b = {}, m = 0; ; ) {
    try {
      var y = e.indexOf("<", m);
      if (y < 0) {
        if (!e.substr(m).match(/^\s*$/)) {
          var h = r.doc, l = h.createTextNode(e.substr(m));
          h.appendChild(l), r.currentElement = l;
        }
        return;
      }
      switch (y > m && c(y), e.charAt(y + 1)) {
        case "/":
          var $ = e.indexOf(">", y + 3), v = e.substring(y + 2, $).replace(/[ \t\n\r]+$/g, ""), D = p.pop();
          $ < 0 ? (v = e.substring(y + 2).replace(/[\s<].*/, ""), i.error("end tag name: " + v + " is not complete:" + D.tagName), $ = y + 1 + v.length) : v.match(/\s</) && (v = v.replace(/[\s<].*/, ""), i.error("end tag name: " + v + " maybe not complete"), $ = y + 1 + v.length);
          var x = D.localNSMap, w = D.tagName == v, E = w || D.tagName && D.tagName.toLowerCase() == v.toLowerCase();
          if (E) {
            if (r.endElement(D.uri, D.localName, v), x)
              for (var k in x)
                Object.prototype.hasOwnProperty.call(x, k) && r.endPrefixMapping(k);
            w || i.fatalError("end tag name: " + v + " is not match the current start tagName:" + D.tagName);
          } else
            p.push(D);
          $++;
          break;
        case "?":
          f && u(y), $ = v8(e, y, r);
          break;
        case "!":
          f && u(y), $ = y8(e, y, r, i);
          break;
        default:
          f && u(y);
          var W = new Xy(), q = p[p.length - 1].currentNSMap, $ = g8(e, y, W, q, o, i), B = W.length;
          if (!W.closed && b8(e, $, W.tagName, b) && (W.closed = !0, n.nbsp || i.warning("unclosed xml attribute")), f && B) {
            for (var P = Op(f, {}), H = 0; H < B; H++) {
              var Q = W[H];
              u(Q.offset), Q.locator = Op(f, {});
            }
            r.locator = P, Ip(W, r, q) && p.push(W), r.locator = f;
          } else
            Ip(W, r, q) && p.push(W);
          Ri.isHTML(W.uri) && !W.closed ? $ = m8(e, $, W.tagName, o, r) : $++;
      }
    } catch (A) {
      if (A instanceof Wr)
        throw A;
      i.error("element parse error: " + A), $ = -1;
    }
    $ > m ? m = $ : c(Math.max(y, m) + 1);
  }
}
function Op(e, t) {
  return t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t;
}
function g8(e, t, n, r, i, a) {
  function o(f, p, b) {
    n.attributeNames.hasOwnProperty(f) && a.fatalError("Attribute " + f + " redefined"), n.addValue(
      f,
      // @see https://www.w3.org/TR/xml/#AVNormalize
      // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
      // - recursive replacement of (DTD) entity references
      // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
      p.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, i),
      b
    );
  }
  for (var c, u, s = ++t, d = ni; ; ) {
    var g = e.charAt(s);
    switch (g) {
      case "=":
        if (d === yn)
          c = e.slice(t, s), d = ri;
        else if (d === br)
          d = ri;
        else
          throw new Error("attribute equal must after attrName");
        break;
      case "'":
      case '"':
        if (d === ri || d === yn)
          if (d === yn && (a.warning('attribute value must after "="'), c = e.slice(t, s)), t = s + 1, s = e.indexOf(g, t), s > 0)
            u = e.slice(t, s), o(c, u, t - 1), d = vr;
          else
            throw new Error("attribute value no end '" + g + "' match");
        else if (d == yr)
          u = e.slice(t, s), o(c, u, t), a.warning('attribute "' + c + '" missed start quot(' + g + ")!!"), t = s + 1, d = vr;
        else
          throw new Error('attribute value must after "="');
        break;
      case "/":
        switch (d) {
          case ni:
            n.setTagName(e.slice(t, s));
          case vr:
          case ii:
          case wa:
            d = wa, n.closed = !0;
          case yr:
          case yn:
            break;
          case br:
            n.closed = !0;
            break;
          default:
            throw new Error("attribute invalid close char('/')");
        }
        break;
      case "":
        return a.error("unexpected end of input"), d == ni && n.setTagName(e.slice(t, s)), s;
      case ">":
        switch (d) {
          case ni:
            n.setTagName(e.slice(t, s));
          case vr:
          case ii:
          case wa:
            break;
          case yr:
          case yn:
            u = e.slice(t, s), u.slice(-1) === "/" && (n.closed = !0, u = u.slice(0, -1));
          case br:
            d === br && (u = c), d == yr ? (a.warning('attribute "' + u + '" missed quot(")!'), o(c, u, t)) : ((!Ri.isHTML(r[""]) || !u.match(/^(?:disabled|checked|selected)$/i)) && a.warning('attribute "' + u + '" missed value!! "' + u + '" instead!!'), o(u, u, t));
            break;
          case ri:
            throw new Error("attribute value missed!!");
        }
        return s;
      case "":
        g = " ";
      default:
        if (g <= " ")
          switch (d) {
            case ni:
              n.setTagName(e.slice(t, s)), d = ii;
              break;
            case yn:
              c = e.slice(t, s), d = br;
              break;
            case yr:
              var u = e.slice(t, s);
              a.warning('attribute "' + u + '" missed quot(")!!'), o(c, u, t);
            case vr:
              d = ii;
              break;
          }
        else
          switch (d) {
            case br:
              n.tagName, (!Ri.isHTML(r[""]) || !c.match(/^(?:disabled|checked|selected)$/i)) && a.warning('attribute "' + c + '" missed value!! "' + c + '" instead2!!'), o(c, c, t), t = s, d = yn;
              break;
            case vr:
              a.warning('attribute space is required"' + c + '"!!');
            case ii:
              d = yn, t = s;
              break;
            case ri:
              d = yr, t = s;
              break;
            case wa:
              throw new Error("elements closed character '/' and '>' must be connected to");
          }
    }
    s++;
  }
}
function Ip(e, t, n) {
  for (var r = e.tagName, i = null, g = e.length; g--; ) {
    var a = e[g], o = a.qName, c = a.value, f = o.indexOf(":");
    if (f > 0)
      var u = a.prefix = o.slice(0, f), s = o.slice(f + 1), d = u === "xmlns" && s;
    else
      s = o, u = null, d = o === "xmlns" && "";
    a.localName = s, d !== !1 && (i == null && (i = {}, Zy(n, n = {})), n[d] = i[d] = c, a.uri = Ri.XMLNS, t.startPrefixMapping(d, c));
  }
  for (var g = e.length; g--; ) {
    a = e[g];
    var u = a.prefix;
    u && (u === "xml" && (a.uri = Ri.XML), u !== "xmlns" && (a.uri = n[u || ""]));
  }
  var f = r.indexOf(":");
  f > 0 ? (u = e.prefix = r.slice(0, f), s = e.localName = r.slice(f + 1)) : (u = null, s = e.localName = r);
  var p = e.uri = n[u || ""];
  if (t.startElement(p, s, r, e), e.closed) {
    if (t.endElement(p, s, r), i)
      for (u in i)
        Object.prototype.hasOwnProperty.call(i, u) && t.endPrefixMapping(u);
  } else
    return e.currentNSMap = n, e.localNSMap = i, !0;
}
function m8(e, t, n, r, i) {
  if (/^(?:script|textarea)$/i.test(n)) {
    var a = e.indexOf("</" + n + ">", t), o = e.substring(t + 1, a);
    if (/[&<]/.test(o))
      return /^script$/i.test(n) ? (i.characters(o, 0, o.length), a) : (o = o.replace(/&#?\w+;/g, r), i.characters(o, 0, o.length), a);
  }
  return t + 1;
}
function b8(e, t, n, r) {
  var i = r[n];
  return i == null && (i = e.lastIndexOf("</" + n + ">"), i < t && (i = e.lastIndexOf("</" + n)), r[n] = i), i < t;
}
function Zy(e, t) {
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
}
function y8(e, t, n, r) {
  var i = e.charAt(t + 2);
  switch (i) {
    case "-":
      if (e.charAt(t + 3) === "-") {
        var a = e.indexOf("-->", t + 4);
        return a > t ? (n.comment(e, t + 4, a - t - 4), a + 3) : (r.error("Unclosed comment"), -1);
      } else
        return -1;
    default:
      if (e.substr(t + 3, 6) == "CDATA[") {
        var a = e.indexOf("]]>", t + 9);
        return n.startCDATA(), n.characters(e, t + 9, a - t - 9), n.endCDATA(), a + 3;
      }
      var o = D8(e, t), c = o.length;
      if (c > 1 && /!doctype/i.test(o[0][0])) {
        var u = o[1][0], s = !1, d = !1;
        c > 3 && (/^public$/i.test(o[2][0]) ? (s = o[3][0], d = c > 4 && o[4][0]) : /^system$/i.test(o[2][0]) && (d = o[3][0]));
        var g = o[c - 1];
        return n.startDTD(u, s, d), n.endDTD(), g.index + g[0].length;
      }
  }
  return -1;
}
function v8(e, t, n) {
  var r = e.indexOf("?>", t);
  if (r) {
    var i = e.substring(t, r).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
    return i ? (i[0].length, n.processingInstruction(i[1], i[2]), r + 2) : -1;
  }
  return -1;
}
function Xy() {
  this.attributeNames = {};
}
Xy.prototype = {
  setTagName: function(e) {
    if (!Rp.test(e))
      throw new Error("invalid tagName:" + e);
    this.tagName = e;
  },
  addValue: function(e, t, n) {
    if (!Rp.test(e))
      throw new Error("invalid attribute:" + e);
    this.attributeNames[e] = this.length, this[this.length++] = { qName: e, value: t, offset: n };
  },
  length: 0,
  getLocalName: function(e) {
    return this[e].localName;
  },
  getLocator: function(e) {
    return this[e].locator;
  },
  getQName: function(e) {
    return this[e].qName;
  },
  getURI: function(e) {
    return this[e].uri;
  },
  getValue: function(e) {
    return this[e].value;
  }
  //	,getIndex:function(uri, localName)){
  //		if(localName){
  //
  //		}else{
  //			var qName = uri
  //		}
  //	},
  //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
  //	getType:function(uri,localName){}
  //	getType:function(i){},
};
function D8(e, t) {
  var n, r = [], i = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
  for (i.lastIndex = t, i.exec(e); n = i.exec(e); )
    if (r.push(n), n[1]) return r;
}
ol.XMLReader = jy;
ol.ParseError = Wr;
var x8 = gn, _8 = Kt, Wp = qy, Vy = ol, w8 = _8.DOMImplementation, Np = x8.NAMESPACE, T8 = Vy.ParseError, U8 = Vy.XMLReader;
function Hy(e) {
  return e.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028]/g, `
`);
}
function Gy(e) {
  this.options = e || { locator: {} };
}
Gy.prototype.parseFromString = function(e, t) {
  var n = this.options, r = new U8(), i = n.domBuilder || new Qi(), a = n.errorHandler, o = n.locator, c = n.xmlns || {}, u = /\/x?html?$/.test(t), s = u ? Wp.HTML_ENTITIES : Wp.XML_ENTITIES;
  o && i.setDocumentLocator(o), r.errorHandler = E8(a, i, o), r.domBuilder = n.domBuilder || i, u && (c[""] = Np.HTML), c.xml = c.xml || Np.XML;
  var d = n.normalizeLineEndings || Hy;
  return e && typeof e == "string" ? r.parse(
    d(e),
    c,
    s
  ) : r.errorHandler.error("invalid doc source"), i.doc;
};
function E8(e, t, n) {
  if (!e) {
    if (t instanceof Qi)
      return t;
    e = t;
  }
  var r = {}, i = e instanceof Function;
  n = n || {};
  function a(o) {
    var c = e[o];
    !c && i && (c = e.length == 2 ? function(u) {
      e(o, u);
    } : e), r[o] = c && function(u) {
      c("[xmldom " + o + "]	" + u + Ru(n));
    } || function() {
    };
  }
  return a("warning"), a("error"), a("fatalError"), r;
}
function Qi() {
  this.cdata = !1;
}
function Dr(e, t) {
  t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber;
}
Qi.prototype = {
  startDocument: function() {
    this.doc = new w8().createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId);
  },
  startElement: function(e, t, n, r) {
    var i = this.doc, a = i.createElementNS(e, n || t), o = r.length;
    Ta(this, a), this.currentElement = a, this.locator && Dr(this.locator, a);
    for (var c = 0; c < o; c++) {
      var e = r.getURI(c), u = r.getValue(c), n = r.getQName(c), s = i.createAttributeNS(e, n);
      this.locator && Dr(r.getLocator(c), s), s.value = s.nodeValue = u, a.setAttributeNode(s);
    }
  },
  endElement: function(e, t, n) {
    var r = this.currentElement;
    r.tagName, this.currentElement = r.parentNode;
  },
  startPrefixMapping: function(e, t) {
  },
  endPrefixMapping: function(e) {
  },
  processingInstruction: function(e, t) {
    var n = this.doc.createProcessingInstruction(e, t);
    this.locator && Dr(this.locator, n), Ta(this, n);
  },
  ignorableWhitespace: function(e, t, n) {
  },
  characters: function(e, t, n) {
    if (e = Lp.apply(this, arguments), e) {
      if (this.cdata)
        var r = this.doc.createCDATASection(e);
      else
        var r = this.doc.createTextNode(e);
      this.currentElement ? this.currentElement.appendChild(r) : /^\s*$/.test(e) && this.doc.appendChild(r), this.locator && Dr(this.locator, r);
    }
  },
  skippedEntity: function(e) {
  },
  endDocument: function() {
    this.doc.normalize();
  },
  setDocumentLocator: function(e) {
    (this.locator = e) && (e.lineNumber = 0);
  },
  //LexicalHandler
  comment: function(e, t, n) {
    e = Lp.apply(this, arguments);
    var r = this.doc.createComment(e);
    this.locator && Dr(this.locator, r), Ta(this, r);
  },
  startCDATA: function() {
    this.cdata = !0;
  },
  endCDATA: function() {
    this.cdata = !1;
  },
  startDTD: function(e, t, n) {
    var r = this.doc.implementation;
    if (r && r.createDocumentType) {
      var i = r.createDocumentType(e, t, n);
      this.locator && Dr(this.locator, i), Ta(this, i), this.doc.doctype = i;
    }
  },
  /**
   * @see org.xml.sax.ErrorHandler
   * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
   */
  warning: function(e) {
    console.warn("[xmldom warning]	" + e, Ru(this.locator));
  },
  error: function(e) {
    console.error("[xmldom error]	" + e, Ru(this.locator));
  },
  fatalError: function(e) {
    throw new T8(e, this.locator);
  }
};
function Ru(e) {
  if (e)
    return `
@` + (e.systemId || "") + "#[line:" + e.lineNumber + ",col:" + e.columnNumber + "]";
}
function Lp(e, t, n) {
  return typeof e == "string" ? e.substr(t, n) : e.length >= t + n || t ? new java.lang.String(e, t, n) + "" : e;
}
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(e) {
  Qi.prototype[e] = function() {
    return null;
  };
});
function Ta(e, t) {
  e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t);
}
Lo.__DOMHandler = Qi;
Lo.normalizeLineEndings = Hy;
Lo.DOMParser = Gy;
var Yy = Kt;
Io.DOMImplementation = Yy.DOMImplementation;
Io.XMLSerializer = Yy.XMLSerializer;
Io.DOMParser = Lo.DOMParser;
var A8 = Io, C8 = Kt;
function F8(e) {
  var t = null, n = new A8.DOMParser({
    errorHandler: function(i, a) {
      t = { level: i, message: a };
    }
  }), r = n.parseFromString(e);
  if (t === null)
    return r;
  throw new Error(t.level + ": " + t.message);
}
Yd.parseFromString = F8;
Yd.Node = C8.Node;
var Ls = $e, Mp = Se, Ky = Yd, Jy = Jr, S8 = Jy.Element;
Dy.readString = k8;
var $p = Ky.Node;
function k8(e, t) {
  t = t || {};
  try {
    var n = Ky.parseFromString(e, "text/xml");
  } catch (o) {
    return Ls.reject(o);
  }
  if (n.documentElement.tagName === "parsererror")
    return Ls.resolve(new Error(n.documentElement.textContent));
  function r(o) {
    switch (o.nodeType) {
      case $p.ELEMENT_NODE:
        return i(o);
      case $p.TEXT_NODE:
        return Jy.text(o.nodeValue);
    }
  }
  function i(o) {
    var c = a(o), u = [];
    Mp.forEach(o.childNodes, function(d) {
      var g = r(d);
      g && u.push(g);
    });
    var s = {};
    return Mp.forEach(o.attributes, function(d) {
      s[a(d)] = d.value;
    }), new S8(c, s, u);
  }
  function a(o) {
    if (o.namespaceURI) {
      var c = t[o.namespaceURI], u;
      return c ? u = c + ":" : u = "{" + o.namespaceURI + "}", u + o.localName;
    } else
      return o.localName;
  }
  return Ls.resolve(r(n.documentElement));
}
var Qy = {}, ci = {}, an = {}, Pp;
function On() {
  return Pp || (Pp = 1, (function() {
    var e, t, n, r, i, a, o, c = [].slice, u = {}.hasOwnProperty;
    e = function() {
      var s, d, g, f, p, b;
      if (b = arguments[0], p = 2 <= arguments.length ? c.call(arguments, 1) : [], i(Object.assign))
        Object.assign.apply(null, arguments);
      else
        for (s = 0, g = p.length; s < g; s++)
          if (f = p[s], f != null)
            for (d in f)
              u.call(f, d) && (b[d] = f[d]);
      return b;
    }, i = function(s) {
      return !!s && Object.prototype.toString.call(s) === "[object Function]";
    }, a = function(s) {
      var d;
      return !!s && ((d = typeof s) == "function" || d === "object");
    }, n = function(s) {
      return i(Array.isArray) ? Array.isArray(s) : Object.prototype.toString.call(s) === "[object Array]";
    }, r = function(s) {
      var d;
      if (n(s))
        return !s.length;
      for (d in s)
        if (u.call(s, d))
          return !1;
      return !0;
    }, o = function(s) {
      var d, g;
      return a(s) && (g = Object.getPrototypeOf(s)) && (d = g.constructor) && typeof d == "function" && d instanceof d && Function.prototype.toString.call(d) === Function.prototype.toString.call(Object);
    }, t = function(s) {
      return i(s.valueOf) ? s.valueOf() : s;
    }, an.assign = e, an.isFunction = i, an.isObject = a, an.isArray = n, an.isEmpty = r, an.isPlainObject = o, an.getValue = t;
  }).call(re)), an;
}
var Ms = { exports: {} }, $s = { exports: {} }, Ps = { exports: {} }, zs = { exports: {} }, zp;
function e1() {
  return zp || (zp = 1, (function() {
    zs.exports = function() {
      function e(t, n, r) {
        if (this.options = t.options, this.stringify = t.stringify, this.parent = t, n == null)
          throw new Error("Missing attribute name. " + this.debugInfo(n));
        if (r == null)
          throw new Error("Missing attribute value. " + this.debugInfo(n));
        this.name = this.stringify.attName(n), this.value = this.stringify.attValue(r);
      }
      return e.prototype.clone = function() {
        return Object.create(this);
      }, e.prototype.toString = function(t) {
        return this.options.writer.set(t).attribute(this);
      }, e.prototype.debugInfo = function(t) {
        return t = t || this.name, t == null ? "parent: <" + this.parent.name + ">" : "attribute: {" + t + "}, parent: <" + this.parent.name + ">";
      }, e;
    }();
  }).call(re)), zs.exports;
}
var qp;
function Mo() {
  return qp || (qp = 1, (function() {
    var e, t, n, r, i, a, o = function(u, s) {
      for (var d in s)
        c.call(s, d) && (u[d] = s[d]);
      function g() {
        this.constructor = u;
      }
      return g.prototype = s.prototype, u.prototype = new g(), u.__super__ = s.prototype, u;
    }, c = {}.hasOwnProperty;
    a = On(), i = a.isObject, r = a.isFunction, n = a.getValue, t = ft(), e = e1(), Ps.exports = function(u) {
      o(s, u);
      function s(d, g, f) {
        if (s.__super__.constructor.call(this, d), g == null)
          throw new Error("Missing element name. " + this.debugInfo());
        this.name = this.stringify.eleName(g), this.attributes = {}, f != null && this.attribute(f), d.isDocument && (this.isRoot = !0, this.documentObject = d, d.rootObject = this);
      }
      return s.prototype.clone = function() {
        var d, g, f, p;
        f = Object.create(this), f.isRoot && (f.documentObject = null), f.attributes = {}, p = this.attributes;
        for (g in p)
          c.call(p, g) && (d = p[g], f.attributes[g] = d.clone());
        return f.children = [], this.children.forEach(function(b) {
          var m;
          return m = b.clone(), m.parent = f, f.children.push(m);
        }), f;
      }, s.prototype.attribute = function(d, g) {
        var f, p;
        if (d != null && (d = n(d)), i(d))
          for (f in d)
            c.call(d, f) && (p = d[f], this.attribute(f, p));
        else
          r(g) && (g = g.apply()), (!this.options.skipNullAttributes || g != null) && (this.attributes[d] = new e(this, d, g));
        return this;
      }, s.prototype.removeAttribute = function(d) {
        var g, f, p;
        if (d == null)
          throw new Error("Missing attribute name. " + this.debugInfo());
        if (d = n(d), Array.isArray(d))
          for (f = 0, p = d.length; f < p; f++)
            g = d[f], delete this.attributes[g];
        else
          delete this.attributes[d];
        return this;
      }, s.prototype.toString = function(d) {
        return this.options.writer.set(d).element(this);
      }, s.prototype.att = function(d, g) {
        return this.attribute(d, g);
      }, s.prototype.a = function(d, g) {
        return this.attribute(d, g);
      }, s;
    }(t);
  }).call(re)), Ps.exports;
}
var qs = { exports: {} }, jp;
function $o() {
  return jp || (jp = 1, (function() {
    var e, t = function(r, i) {
      for (var a in i)
        n.call(i, a) && (r[a] = i[a]);
      function o() {
        this.constructor = r;
      }
      return o.prototype = i.prototype, r.prototype = new o(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = ft(), qs.exports = function(r) {
      t(i, r);
      function i(a, o) {
        if (i.__super__.constructor.call(this, a), o == null)
          throw new Error("Missing CDATA text. " + this.debugInfo());
        this.text = this.stringify.cdata(o);
      }
      return i.prototype.clone = function() {
        return Object.create(this);
      }, i.prototype.toString = function(a) {
        return this.options.writer.set(a).cdata(this);
      }, i;
    }(e);
  }).call(re)), qs.exports;
}
var js = { exports: {} }, Zp;
function Po() {
  return Zp || (Zp = 1, (function() {
    var e, t = function(r, i) {
      for (var a in i)
        n.call(i, a) && (r[a] = i[a]);
      function o() {
        this.constructor = r;
      }
      return o.prototype = i.prototype, r.prototype = new o(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = ft(), js.exports = function(r) {
      t(i, r);
      function i(a, o) {
        if (i.__super__.constructor.call(this, a), o == null)
          throw new Error("Missing comment text. " + this.debugInfo());
        this.text = this.stringify.comment(o);
      }
      return i.prototype.clone = function() {
        return Object.create(this);
      }, i.prototype.toString = function(a) {
        return this.options.writer.set(a).comment(this);
      }, i;
    }(e);
  }).call(re)), js.exports;
}
var Zs = { exports: {} }, Xp;
function zo() {
  return Xp || (Xp = 1, (function() {
    var e, t, n = function(i, a) {
      for (var o in a)
        r.call(a, o) && (i[o] = a[o]);
      function c() {
        this.constructor = i;
      }
      return c.prototype = a.prototype, i.prototype = new c(), i.__super__ = a.prototype, i;
    }, r = {}.hasOwnProperty;
    t = On().isObject, e = ft(), Zs.exports = function(i) {
      n(a, i);
      function a(o, c, u, s) {
        var d;
        a.__super__.constructor.call(this, o), t(c) && (d = c, c = d.version, u = d.encoding, s = d.standalone), c || (c = "1.0"), this.version = this.stringify.xmlVersion(c), u != null && (this.encoding = this.stringify.xmlEncoding(u)), s != null && (this.standalone = this.stringify.xmlStandalone(s));
      }
      return a.prototype.toString = function(o) {
        return this.options.writer.set(o).declaration(this);
      }, a;
    }(e);
  }).call(re)), Zs.exports;
}
var Xs = { exports: {} }, Vs = { exports: {} }, Vp;
function qo() {
  return Vp || (Vp = 1, (function() {
    var e, t = function(r, i) {
      for (var a in i)
        n.call(i, a) && (r[a] = i[a]);
      function o() {
        this.constructor = r;
      }
      return o.prototype = i.prototype, r.prototype = new o(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = ft(), Vs.exports = function(r) {
      t(i, r);
      function i(a, o, c, u, s, d) {
        if (i.__super__.constructor.call(this, a), o == null)
          throw new Error("Missing DTD element name. " + this.debugInfo());
        if (c == null)
          throw new Error("Missing DTD attribute name. " + this.debugInfo(o));
        if (!u)
          throw new Error("Missing DTD attribute type. " + this.debugInfo(o));
        if (!s)
          throw new Error("Missing DTD attribute default. " + this.debugInfo(o));
        if (s.indexOf("#") !== 0 && (s = "#" + s), !s.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/))
          throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. " + this.debugInfo(o));
        if (d && !s.match(/^(#FIXED|#DEFAULT)$/))
          throw new Error("Default value only applies to #FIXED or #DEFAULT. " + this.debugInfo(o));
        this.elementName = this.stringify.eleName(o), this.attributeName = this.stringify.attName(c), this.attributeType = this.stringify.dtdAttType(u), this.defaultValue = this.stringify.dtdAttDefault(d), this.defaultValueType = s;
      }
      return i.prototype.toString = function(a) {
        return this.options.writer.set(a).dtdAttList(this);
      }, i;
    }(e);
  }).call(re)), Vs.exports;
}
var Hs = { exports: {} }, Hp;
function jo() {
  return Hp || (Hp = 1, (function() {
    var e, t, n = function(i, a) {
      for (var o in a)
        r.call(a, o) && (i[o] = a[o]);
      function c() {
        this.constructor = i;
      }
      return c.prototype = a.prototype, i.prototype = new c(), i.__super__ = a.prototype, i;
    }, r = {}.hasOwnProperty;
    t = On().isObject, e = ft(), Hs.exports = function(i) {
      n(a, i);
      function a(o, c, u, s) {
        if (a.__super__.constructor.call(this, o), u == null)
          throw new Error("Missing DTD entity name. " + this.debugInfo(u));
        if (s == null)
          throw new Error("Missing DTD entity value. " + this.debugInfo(u));
        if (this.pe = !!c, this.name = this.stringify.eleName(u), !t(s))
          this.value = this.stringify.dtdEntityValue(s);
        else {
          if (!s.pubID && !s.sysID)
            throw new Error("Public and/or system identifiers are required for an external entity. " + this.debugInfo(u));
          if (s.pubID && !s.sysID)
            throw new Error("System identifier is required for a public external entity. " + this.debugInfo(u));
          if (s.pubID != null && (this.pubID = this.stringify.dtdPubID(s.pubID)), s.sysID != null && (this.sysID = this.stringify.dtdSysID(s.sysID)), s.nData != null && (this.nData = this.stringify.dtdNData(s.nData)), this.pe && this.nData)
            throw new Error("Notation declaration is not allowed in a parameter entity. " + this.debugInfo(u));
        }
      }
      return a.prototype.toString = function(o) {
        return this.options.writer.set(o).dtdEntity(this);
      }, a;
    }(e);
  }).call(re)), Hs.exports;
}
var Gs = { exports: {} }, Gp;
function Zo() {
  return Gp || (Gp = 1, (function() {
    var e, t = function(r, i) {
      for (var a in i)
        n.call(i, a) && (r[a] = i[a]);
      function o() {
        this.constructor = r;
      }
      return o.prototype = i.prototype, r.prototype = new o(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = ft(), Gs.exports = function(r) {
      t(i, r);
      function i(a, o, c) {
        if (i.__super__.constructor.call(this, a), o == null)
          throw new Error("Missing DTD element name. " + this.debugInfo());
        c || (c = "(#PCDATA)"), Array.isArray(c) && (c = "(" + c.join(",") + ")"), this.name = this.stringify.eleName(o), this.value = this.stringify.dtdElementValue(c);
      }
      return i.prototype.toString = function(a) {
        return this.options.writer.set(a).dtdElement(this);
      }, i;
    }(e);
  }).call(re)), Gs.exports;
}
var Ys = { exports: {} }, Yp;
function Xo() {
  return Yp || (Yp = 1, (function() {
    var e, t = function(r, i) {
      for (var a in i)
        n.call(i, a) && (r[a] = i[a]);
      function o() {
        this.constructor = r;
      }
      return o.prototype = i.prototype, r.prototype = new o(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = ft(), Ys.exports = function(r) {
      t(i, r);
      function i(a, o, c) {
        if (i.__super__.constructor.call(this, a), o == null)
          throw new Error("Missing DTD notation name. " + this.debugInfo(o));
        if (!c.pubID && !c.sysID)
          throw new Error("Public or system identifiers are required for an external entity. " + this.debugInfo(o));
        this.name = this.stringify.eleName(o), c.pubID != null && (this.pubID = this.stringify.dtdPubID(c.pubID)), c.sysID != null && (this.sysID = this.stringify.dtdSysID(c.sysID));
      }
      return i.prototype.toString = function(a) {
        return this.options.writer.set(a).dtdNotation(this);
      }, i;
    }(e);
  }).call(re)), Ys.exports;
}
var Kp;
function Vo() {
  return Kp || (Kp = 1, (function() {
    var e, t, n, r, i, a, o = function(u, s) {
      for (var d in s)
        c.call(s, d) && (u[d] = s[d]);
      function g() {
        this.constructor = u;
      }
      return g.prototype = s.prototype, u.prototype = new g(), u.__super__ = s.prototype, u;
    }, c = {}.hasOwnProperty;
    a = On().isObject, i = ft(), e = qo(), n = jo(), t = Zo(), r = Xo(), Xs.exports = function(u) {
      o(s, u);
      function s(d, g, f) {
        var p, b;
        s.__super__.constructor.call(this, d), this.name = "!DOCTYPE", this.documentObject = d, a(g) && (p = g, g = p.pubID, f = p.sysID), f == null && (b = [g, f], f = b[0], g = b[1]), g != null && (this.pubID = this.stringify.dtdPubID(g)), f != null && (this.sysID = this.stringify.dtdSysID(f));
      }
      return s.prototype.element = function(d, g) {
        var f;
        return f = new t(this, d, g), this.children.push(f), this;
      }, s.prototype.attList = function(d, g, f, p, b) {
        var m;
        return m = new e(this, d, g, f, p, b), this.children.push(m), this;
      }, s.prototype.entity = function(d, g) {
        var f;
        return f = new n(this, !1, d, g), this.children.push(f), this;
      }, s.prototype.pEntity = function(d, g) {
        var f;
        return f = new n(this, !0, d, g), this.children.push(f), this;
      }, s.prototype.notation = function(d, g) {
        var f;
        return f = new r(this, d, g), this.children.push(f), this;
      }, s.prototype.toString = function(d) {
        return this.options.writer.set(d).docType(this);
      }, s.prototype.ele = function(d, g) {
        return this.element(d, g);
      }, s.prototype.att = function(d, g, f, p, b) {
        return this.attList(d, g, f, p, b);
      }, s.prototype.ent = function(d, g) {
        return this.entity(d, g);
      }, s.prototype.pent = function(d, g) {
        return this.pEntity(d, g);
      }, s.prototype.not = function(d, g) {
        return this.notation(d, g);
      }, s.prototype.up = function() {
        return this.root() || this.documentObject;
      }, s;
    }(i);
  }).call(re)), Xs.exports;
}
var Ks = { exports: {} }, Jp;
function Ho() {
  return Jp || (Jp = 1, (function() {
    var e, t = function(r, i) {
      for (var a in i)
        n.call(i, a) && (r[a] = i[a]);
      function o() {
        this.constructor = r;
      }
      return o.prototype = i.prototype, r.prototype = new o(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = ft(), Ks.exports = function(r) {
      t(i, r);
      function i(a, o) {
        if (i.__super__.constructor.call(this, a), o == null)
          throw new Error("Missing raw text. " + this.debugInfo());
        this.value = this.stringify.raw(o);
      }
      return i.prototype.clone = function() {
        return Object.create(this);
      }, i.prototype.toString = function(a) {
        return this.options.writer.set(a).raw(this);
      }, i;
    }(e);
  }).call(re)), Ks.exports;
}
var Js = { exports: {} }, Qp;
function Go() {
  return Qp || (Qp = 1, (function() {
    var e, t = function(r, i) {
      for (var a in i)
        n.call(i, a) && (r[a] = i[a]);
      function o() {
        this.constructor = r;
      }
      return o.prototype = i.prototype, r.prototype = new o(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = ft(), Js.exports = function(r) {
      t(i, r);
      function i(a, o) {
        if (i.__super__.constructor.call(this, a), o == null)
          throw new Error("Missing element text. " + this.debugInfo());
        this.value = this.stringify.eleText(o);
      }
      return i.prototype.clone = function() {
        return Object.create(this);
      }, i.prototype.toString = function(a) {
        return this.options.writer.set(a).text(this);
      }, i;
    }(e);
  }).call(re)), Js.exports;
}
var Qs = { exports: {} }, eg;
function Yo() {
  return eg || (eg = 1, (function() {
    var e, t = function(r, i) {
      for (var a in i)
        n.call(i, a) && (r[a] = i[a]);
      function o() {
        this.constructor = r;
      }
      return o.prototype = i.prototype, r.prototype = new o(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = ft(), Qs.exports = function(r) {
      t(i, r);
      function i(a, o, c) {
        if (i.__super__.constructor.call(this, a), o == null)
          throw new Error("Missing instruction target. " + this.debugInfo());
        this.target = this.stringify.insTarget(o), c && (this.value = this.stringify.insValue(c));
      }
      return i.prototype.clone = function() {
        return Object.create(this);
      }, i.prototype.toString = function(a) {
        return this.options.writer.set(a).processingInstruction(this);
      }, i;
    }(e);
  }).call(re)), Qs.exports;
}
var eu = { exports: {} }, tg;
function cl() {
  return tg || (tg = 1, (function() {
    var e, t = function(r, i) {
      for (var a in i)
        n.call(i, a) && (r[a] = i[a]);
      function o() {
        this.constructor = r;
      }
      return o.prototype = i.prototype, r.prototype = new o(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = ft(), eu.exports = function(r) {
      t(i, r);
      function i(a) {
        i.__super__.constructor.call(this, a), this.isDummy = !0;
      }
      return i.prototype.clone = function() {
        return Object.create(this);
      }, i.prototype.toString = function(a) {
        return "";
      }, i;
    }(e);
  }).call(re)), eu.exports;
}
var ng;
function ft() {
  return ng || (ng = 1, (function() {
    var e, t, n, r, i, a, o, c, u, s, d, g, f, p, b = {}.hasOwnProperty;
    p = On(), f = p.isObject, g = p.isFunction, d = p.isEmpty, s = p.getValue, a = null, e = null, t = null, n = null, r = null, c = null, u = null, o = null, i = null, $s.exports = function() {
      function m(y) {
        this.parent = y, this.parent && (this.options = this.parent.options, this.stringify = this.parent.stringify), this.children = [], a || (a = Mo(), e = $o(), t = Po(), n = zo(), r = Vo(), c = Ho(), u = Go(), o = Yo(), i = cl());
      }
      return m.prototype.element = function(y, h, l) {
        var v, D, x, w, E, k, W, q, $, B, P;
        if (k = null, h === null && l == null && ($ = [{}, null], h = $[0], l = $[1]), h == null && (h = {}), h = s(h), f(h) || (B = [h, l], l = B[0], h = B[1]), y != null && (y = s(y)), Array.isArray(y))
          for (x = 0, W = y.length; x < W; x++)
            D = y[x], k = this.element(D);
        else if (g(y))
          k = this.element(y.apply());
        else if (f(y)) {
          for (E in y)
            if (b.call(y, E))
              if (P = y[E], g(P) && (P = P.apply()), f(P) && d(P) && (P = null), !this.options.ignoreDecorators && this.stringify.convertAttKey && E.indexOf(this.stringify.convertAttKey) === 0)
                k = this.attribute(E.substr(this.stringify.convertAttKey.length), P);
              else if (!this.options.separateArrayItems && Array.isArray(P))
                for (w = 0, q = P.length; w < q; w++)
                  D = P[w], v = {}, v[E] = D, k = this.element(v);
              else f(P) ? (k = this.element(E), k.element(P)) : k = this.element(E, P);
        } else this.options.skipNullNodes && l === null ? k = this.dummy() : !this.options.ignoreDecorators && this.stringify.convertTextKey && y.indexOf(this.stringify.convertTextKey) === 0 ? k = this.text(l) : !this.options.ignoreDecorators && this.stringify.convertCDataKey && y.indexOf(this.stringify.convertCDataKey) === 0 ? k = this.cdata(l) : !this.options.ignoreDecorators && this.stringify.convertCommentKey && y.indexOf(this.stringify.convertCommentKey) === 0 ? k = this.comment(l) : !this.options.ignoreDecorators && this.stringify.convertRawKey && y.indexOf(this.stringify.convertRawKey) === 0 ? k = this.raw(l) : !this.options.ignoreDecorators && this.stringify.convertPIKey && y.indexOf(this.stringify.convertPIKey) === 0 ? k = this.instruction(y.substr(this.stringify.convertPIKey.length), l) : k = this.node(y, h, l);
        if (k == null)
          throw new Error("Could not create any elements with: " + y + ". " + this.debugInfo());
        return k;
      }, m.prototype.insertBefore = function(y, h, l) {
        var v, D, x;
        if (this.isRoot)
          throw new Error("Cannot insert elements at root level. " + this.debugInfo(y));
        return D = this.parent.children.indexOf(this), x = this.parent.children.splice(D), v = this.parent.element(y, h, l), Array.prototype.push.apply(this.parent.children, x), v;
      }, m.prototype.insertAfter = function(y, h, l) {
        var v, D, x;
        if (this.isRoot)
          throw new Error("Cannot insert elements at root level. " + this.debugInfo(y));
        return D = this.parent.children.indexOf(this), x = this.parent.children.splice(D + 1), v = this.parent.element(y, h, l), Array.prototype.push.apply(this.parent.children, x), v;
      }, m.prototype.remove = function() {
        var y;
        if (this.isRoot)
          throw new Error("Cannot remove the root element. " + this.debugInfo());
        return y = this.parent.children.indexOf(this), [].splice.apply(this.parent.children, [y, y - y + 1].concat([])), this.parent;
      }, m.prototype.node = function(y, h, l) {
        var v, D;
        return y != null && (y = s(y)), h || (h = {}), h = s(h), f(h) || (D = [h, l], l = D[0], h = D[1]), v = new a(this, y, h), l != null && v.text(l), this.children.push(v), v;
      }, m.prototype.text = function(y) {
        var h;
        return h = new u(this, y), this.children.push(h), this;
      }, m.prototype.cdata = function(y) {
        var h;
        return h = new e(this, y), this.children.push(h), this;
      }, m.prototype.comment = function(y) {
        var h;
        return h = new t(this, y), this.children.push(h), this;
      }, m.prototype.commentBefore = function(y) {
        var h, l;
        return h = this.parent.children.indexOf(this), l = this.parent.children.splice(h), this.parent.comment(y), Array.prototype.push.apply(this.parent.children, l), this;
      }, m.prototype.commentAfter = function(y) {
        var h, l;
        return h = this.parent.children.indexOf(this), l = this.parent.children.splice(h + 1), this.parent.comment(y), Array.prototype.push.apply(this.parent.children, l), this;
      }, m.prototype.raw = function(y) {
        var h;
        return h = new c(this, y), this.children.push(h), this;
      }, m.prototype.dummy = function() {
        var y;
        return y = new i(this), this.children.push(y), y;
      }, m.prototype.instruction = function(y, h) {
        var l, v, D, x, w;
        if (y != null && (y = s(y)), h != null && (h = s(h)), Array.isArray(y))
          for (x = 0, w = y.length; x < w; x++)
            l = y[x], this.instruction(l);
        else if (f(y))
          for (l in y)
            b.call(y, l) && (v = y[l], this.instruction(l, v));
        else
          g(h) && (h = h.apply()), D = new o(this, y, h), this.children.push(D);
        return this;
      }, m.prototype.instructionBefore = function(y, h) {
        var l, v;
        return l = this.parent.children.indexOf(this), v = this.parent.children.splice(l), this.parent.instruction(y, h), Array.prototype.push.apply(this.parent.children, v), this;
      }, m.prototype.instructionAfter = function(y, h) {
        var l, v;
        return l = this.parent.children.indexOf(this), v = this.parent.children.splice(l + 1), this.parent.instruction(y, h), Array.prototype.push.apply(this.parent.children, v), this;
      }, m.prototype.declaration = function(y, h, l) {
        var v, D;
        return v = this.document(), D = new n(v, y, h, l), v.children[0] instanceof n ? v.children[0] = D : v.children.unshift(D), v.root() || v;
      }, m.prototype.doctype = function(y, h) {
        var l, v, D, x, w, E, k, W, q, $;
        for (v = this.document(), D = new r(v, y, h), q = v.children, x = w = 0, k = q.length; w < k; x = ++w)
          if (l = q[x], l instanceof r)
            return v.children[x] = D, D;
        for ($ = v.children, x = E = 0, W = $.length; E < W; x = ++E)
          if (l = $[x], l.isRoot)
            return v.children.splice(x, 0, D), D;
        return v.children.push(D), D;
      }, m.prototype.up = function() {
        if (this.isRoot)
          throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
        return this.parent;
      }, m.prototype.root = function() {
        var y;
        for (y = this; y; ) {
          if (y.isDocument)
            return y.rootObject;
          if (y.isRoot)
            return y;
          y = y.parent;
        }
      }, m.prototype.document = function() {
        var y;
        for (y = this; y; ) {
          if (y.isDocument)
            return y;
          y = y.parent;
        }
      }, m.prototype.end = function(y) {
        return this.document().end(y);
      }, m.prototype.prev = function() {
        var y;
        for (y = this.parent.children.indexOf(this); y > 0 && this.parent.children[y - 1].isDummy; )
          y = y - 1;
        if (y < 1)
          throw new Error("Already at the first node. " + this.debugInfo());
        return this.parent.children[y - 1];
      }, m.prototype.next = function() {
        var y;
        for (y = this.parent.children.indexOf(this); y < this.parent.children.length - 1 && this.parent.children[y + 1].isDummy; )
          y = y + 1;
        if (y === -1 || y === this.parent.children.length - 1)
          throw new Error("Already at the last node. " + this.debugInfo());
        return this.parent.children[y + 1];
      }, m.prototype.importDocument = function(y) {
        var h;
        return h = y.root().clone(), h.parent = this, h.isRoot = !1, this.children.push(h), this;
      }, m.prototype.debugInfo = function(y) {
        var h, l;
        return y = y || this.name, y == null && !((h = this.parent) != null && h.name) ? "" : y == null ? "parent: <" + this.parent.name + ">" : (l = this.parent) != null && l.name ? "node: <" + y + ">, parent: <" + this.parent.name + ">" : "node: <" + y + ">";
      }, m.prototype.ele = function(y, h, l) {
        return this.element(y, h, l);
      }, m.prototype.nod = function(y, h, l) {
        return this.node(y, h, l);
      }, m.prototype.txt = function(y) {
        return this.text(y);
      }, m.prototype.dat = function(y) {
        return this.cdata(y);
      }, m.prototype.com = function(y) {
        return this.comment(y);
      }, m.prototype.ins = function(y, h) {
        return this.instruction(y, h);
      }, m.prototype.doc = function() {
        return this.document();
      }, m.prototype.dec = function(y, h, l) {
        return this.declaration(y, h, l);
      }, m.prototype.dtd = function(y, h) {
        return this.doctype(y, h);
      }, m.prototype.e = function(y, h, l) {
        return this.element(y, h, l);
      }, m.prototype.n = function(y, h, l) {
        return this.node(y, h, l);
      }, m.prototype.t = function(y) {
        return this.text(y);
      }, m.prototype.d = function(y) {
        return this.cdata(y);
      }, m.prototype.c = function(y) {
        return this.comment(y);
      }, m.prototype.r = function(y) {
        return this.raw(y);
      }, m.prototype.i = function(y, h) {
        return this.instruction(y, h);
      }, m.prototype.u = function() {
        return this.up();
      }, m.prototype.importXMLBuilder = function(y) {
        return this.importDocument(y);
      }, m;
    }();
  }).call(re)), $s.exports;
}
var tu = { exports: {} }, rg;
function t1() {
  return rg || (rg = 1, (function() {
    var e = function(n, r) {
      return function() {
        return n.apply(r, arguments);
      };
    }, t = {}.hasOwnProperty;
    tu.exports = function() {
      function n(r) {
        this.assertLegalChar = e(this.assertLegalChar, this);
        var i, a, o;
        r || (r = {}), this.noDoubleEncoding = r.noDoubleEncoding, a = r.stringify || {};
        for (i in a)
          t.call(a, i) && (o = a[i], this[i] = o);
      }
      return n.prototype.eleName = function(r) {
        return r = "" + r || "", this.assertLegalChar(r);
      }, n.prototype.eleText = function(r) {
        return r = "" + r || "", this.assertLegalChar(this.elEscape(r));
      }, n.prototype.cdata = function(r) {
        return r = "" + r || "", r = r.replace("]]>", "]]]]><![CDATA[>"), this.assertLegalChar(r);
      }, n.prototype.comment = function(r) {
        if (r = "" + r || "", r.match(/--/))
          throw new Error("Comment text cannot contain double-hypen: " + r);
        return this.assertLegalChar(r);
      }, n.prototype.raw = function(r) {
        return "" + r || "";
      }, n.prototype.attName = function(r) {
        return r = "" + r || "";
      }, n.prototype.attValue = function(r) {
        return r = "" + r || "", this.attEscape(r);
      }, n.prototype.insTarget = function(r) {
        return "" + r || "";
      }, n.prototype.insValue = function(r) {
        if (r = "" + r || "", r.match(/\?>/))
          throw new Error("Invalid processing instruction value: " + r);
        return r;
      }, n.prototype.xmlVersion = function(r) {
        if (r = "" + r || "", !r.match(/1\.[0-9]+/))
          throw new Error("Invalid version number: " + r);
        return r;
      }, n.prototype.xmlEncoding = function(r) {
        if (r = "" + r || "", !r.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/))
          throw new Error("Invalid encoding: " + r);
        return r;
      }, n.prototype.xmlStandalone = function(r) {
        return r ? "yes" : "no";
      }, n.prototype.dtdPubID = function(r) {
        return "" + r || "";
      }, n.prototype.dtdSysID = function(r) {
        return "" + r || "";
      }, n.prototype.dtdElementValue = function(r) {
        return "" + r || "";
      }, n.prototype.dtdAttType = function(r) {
        return "" + r || "";
      }, n.prototype.dtdAttDefault = function(r) {
        return r != null ? "" + r || "" : r;
      }, n.prototype.dtdEntityValue = function(r) {
        return "" + r || "";
      }, n.prototype.dtdNData = function(r) {
        return "" + r || "";
      }, n.prototype.convertAttKey = "@", n.prototype.convertPIKey = "?", n.prototype.convertTextKey = "#text", n.prototype.convertCDataKey = "#cdata", n.prototype.convertCommentKey = "#comment", n.prototype.convertRawKey = "#raw", n.prototype.assertLegalChar = function(r) {
        var i;
        if (i = r.match(/[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/), i)
          throw new Error("Invalid character in string: " + r + " at index " + i.index);
        return r;
      }, n.prototype.elEscape = function(r) {
        var i;
        return i = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g, r.replace(i, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#xD;");
      }, n.prototype.attEscape = function(r) {
        var i;
        return i = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g, r.replace(i, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/\t/g, "&#x9;").replace(/\n/g, "&#xA;").replace(/\r/g, "&#xD;");
      }, n;
    }();
  }).call(re)), tu.exports;
}
var nu = { exports: {} }, ru = { exports: {} }, ig;
function n1() {
  return ig || (ig = 1, (function() {
    var e = {}.hasOwnProperty;
    ru.exports = function() {
      function t(n) {
        var r, i, a, o, c, u, s, d, g;
        n || (n = {}), this.pretty = n.pretty || !1, this.allowEmpty = (i = n.allowEmpty) != null ? i : !1, this.pretty ? (this.indent = (a = n.indent) != null ? a : "  ", this.newline = (o = n.newline) != null ? o : `
`, this.offset = (c = n.offset) != null ? c : 0, this.dontprettytextnodes = (u = n.dontprettytextnodes) != null ? u : 0) : (this.indent = "", this.newline = "", this.offset = 0, this.dontprettytextnodes = 0), this.spacebeforeslash = (s = n.spacebeforeslash) != null ? s : "", this.spacebeforeslash === !0 && (this.spacebeforeslash = " "), this.newlinedefault = this.newline, this.prettydefault = this.pretty, d = n.writer || {};
        for (r in d)
          e.call(d, r) && (g = d[r], this[r] = g);
      }
      return t.prototype.set = function(n) {
        var r, i, a;
        n || (n = {}), "pretty" in n && (this.pretty = n.pretty), "allowEmpty" in n && (this.allowEmpty = n.allowEmpty), this.pretty ? (this.indent = "indent" in n ? n.indent : "  ", this.newline = "newline" in n ? n.newline : `
`, this.offset = "offset" in n ? n.offset : 0, this.dontprettytextnodes = "dontprettytextnodes" in n ? n.dontprettytextnodes : 0) : (this.indent = "", this.newline = "", this.offset = 0, this.dontprettytextnodes = 0), this.spacebeforeslash = "spacebeforeslash" in n ? n.spacebeforeslash : "", this.spacebeforeslash === !0 && (this.spacebeforeslash = " "), this.newlinedefault = this.newline, this.prettydefault = this.pretty, i = n.writer || {};
        for (r in i)
          e.call(i, r) && (a = i[r], this[r] = a);
        return this;
      }, t.prototype.space = function(n) {
        var r;
        return this.pretty ? (r = (n || 0) + this.offset + 1, r > 0 ? new Array(r).join(this.indent) : "") : "";
      }, t;
    }();
  }).call(re)), ru.exports;
}
var ag;
function sl() {
  return ag || (ag = 1, (function() {
    var e, t, n, r, i, a, o, c, u, s, d, g, f, p, b = function(y, h) {
      for (var l in h)
        m.call(h, l) && (y[l] = h[l]);
      function v() {
        this.constructor = y;
      }
      return v.prototype = h.prototype, y.prototype = new v(), y.__super__ = h.prototype, y;
    }, m = {}.hasOwnProperty;
    o = zo(), c = Vo(), e = $o(), t = Po(), s = Mo(), g = Ho(), f = Go(), d = Yo(), u = cl(), n = qo(), r = Zo(), i = jo(), a = Xo(), p = n1(), nu.exports = function(y) {
      b(h, y);
      function h(l) {
        h.__super__.constructor.call(this, l);
      }
      return h.prototype.document = function(l) {
        var v, D, x, w, E;
        for (this.textispresent = !1, w = "", E = l.children, D = 0, x = E.length; D < x; D++)
          v = E[D], !(v instanceof u) && (w += (function() {
            switch (!1) {
              case !(v instanceof o):
                return this.declaration(v);
              case !(v instanceof c):
                return this.docType(v);
              case !(v instanceof t):
                return this.comment(v);
              case !(v instanceof d):
                return this.processingInstruction(v);
              default:
                return this.element(v, 0);
            }
          }).call(this));
        return this.pretty && w.slice(-this.newline.length) === this.newline && (w = w.slice(0, -this.newline.length)), w;
      }, h.prototype.attribute = function(l) {
        return " " + l.name + '="' + l.value + '"';
      }, h.prototype.cdata = function(l, v) {
        return this.space(v) + "<![CDATA[" + l.text + "]]>" + this.newline;
      }, h.prototype.comment = function(l, v) {
        return this.space(v) + "<!-- " + l.text + " -->" + this.newline;
      }, h.prototype.declaration = function(l, v) {
        var D;
        return D = this.space(v), D += '<?xml version="' + l.version + '"', l.encoding != null && (D += ' encoding="' + l.encoding + '"'), l.standalone != null && (D += ' standalone="' + l.standalone + '"'), D += this.spacebeforeslash + "?>", D += this.newline, D;
      }, h.prototype.docType = function(l, v) {
        var D, x, w, E, k;
        if (v || (v = 0), E = this.space(v), E += "<!DOCTYPE " + l.root().name, l.pubID && l.sysID ? E += ' PUBLIC "' + l.pubID + '" "' + l.sysID + '"' : l.sysID && (E += ' SYSTEM "' + l.sysID + '"'), l.children.length > 0) {
          for (E += " [", E += this.newline, k = l.children, x = 0, w = k.length; x < w; x++)
            D = k[x], E += (function() {
              switch (!1) {
                case !(D instanceof n):
                  return this.dtdAttList(D, v + 1);
                case !(D instanceof r):
                  return this.dtdElement(D, v + 1);
                case !(D instanceof i):
                  return this.dtdEntity(D, v + 1);
                case !(D instanceof a):
                  return this.dtdNotation(D, v + 1);
                case !(D instanceof e):
                  return this.cdata(D, v + 1);
                case !(D instanceof t):
                  return this.comment(D, v + 1);
                case !(D instanceof d):
                  return this.processingInstruction(D, v + 1);
                default:
                  throw new Error("Unknown DTD node type: " + D.constructor.name);
              }
            }).call(this);
          E += "]";
        }
        return E += this.spacebeforeslash + ">", E += this.newline, E;
      }, h.prototype.element = function(l, v) {
        var D, x, w, E, k, W, q, $, B, P, H, Q, A;
        v || (v = 0), A = !1, this.textispresent ? (this.newline = "", this.pretty = !1) : (this.newline = this.newlinedefault, this.pretty = this.prettydefault), Q = this.space(v), $ = "", $ += Q + "<" + l.name, B = l.attributes;
        for (q in B)
          m.call(B, q) && (D = B[q], $ += this.attribute(D));
        if (l.children.length === 0 || l.children.every(function(T) {
          return T.value === "";
        }))
          this.allowEmpty ? $ += "></" + l.name + ">" + this.newline : $ += this.spacebeforeslash + "/>" + this.newline;
        else if (this.pretty && l.children.length === 1 && l.children[0].value != null)
          $ += ">", $ += l.children[0].value, $ += "</" + l.name + ">" + this.newline;
        else {
          if (this.dontprettytextnodes) {
            for (P = l.children, w = 0, k = P.length; w < k; w++)
              if (x = P[w], x.value != null) {
                this.textispresent++, A = !0;
                break;
              }
          }
          for (this.textispresent && (this.newline = "", this.pretty = !1, Q = this.space(v)), $ += ">" + this.newline, H = l.children, E = 0, W = H.length; E < W; E++)
            x = H[E], $ += (function() {
              switch (!1) {
                case !(x instanceof e):
                  return this.cdata(x, v + 1);
                case !(x instanceof t):
                  return this.comment(x, v + 1);
                case !(x instanceof s):
                  return this.element(x, v + 1);
                case !(x instanceof g):
                  return this.raw(x, v + 1);
                case !(x instanceof f):
                  return this.text(x, v + 1);
                case !(x instanceof d):
                  return this.processingInstruction(x, v + 1);
                case !(x instanceof u):
                  return "";
                default:
                  throw new Error("Unknown XML node type: " + x.constructor.name);
              }
            }).call(this);
          A && this.textispresent--, this.textispresent || (this.newline = this.newlinedefault, this.pretty = this.prettydefault), $ += Q + "</" + l.name + ">" + this.newline;
        }
        return $;
      }, h.prototype.processingInstruction = function(l, v) {
        var D;
        return D = this.space(v) + "<?" + l.target, l.value && (D += " " + l.value), D += this.spacebeforeslash + "?>" + this.newline, D;
      }, h.prototype.raw = function(l, v) {
        return this.space(v) + l.value + this.newline;
      }, h.prototype.text = function(l, v) {
        return this.space(v) + l.value + this.newline;
      }, h.prototype.dtdAttList = function(l, v) {
        var D;
        return D = this.space(v) + "<!ATTLIST " + l.elementName + " " + l.attributeName + " " + l.attributeType, l.defaultValueType !== "#DEFAULT" && (D += " " + l.defaultValueType), l.defaultValue && (D += ' "' + l.defaultValue + '"'), D += this.spacebeforeslash + ">" + this.newline, D;
      }, h.prototype.dtdElement = function(l, v) {
        return this.space(v) + "<!ELEMENT " + l.name + " " + l.value + this.spacebeforeslash + ">" + this.newline;
      }, h.prototype.dtdEntity = function(l, v) {
        var D;
        return D = this.space(v) + "<!ENTITY", l.pe && (D += " %"), D += " " + l.name, l.value ? D += ' "' + l.value + '"' : (l.pubID && l.sysID ? D += ' PUBLIC "' + l.pubID + '" "' + l.sysID + '"' : l.sysID && (D += ' SYSTEM "' + l.sysID + '"'), l.nData && (D += " NDATA " + l.nData)), D += this.spacebeforeslash + ">" + this.newline, D;
      }, h.prototype.dtdNotation = function(l, v) {
        var D;
        return D = this.space(v) + "<!NOTATION " + l.name, l.pubID && l.sysID ? D += ' PUBLIC "' + l.pubID + '" "' + l.sysID + '"' : l.pubID ? D += ' PUBLIC "' + l.pubID + '"' : l.sysID && (D += ' SYSTEM "' + l.sysID + '"'), D += this.spacebeforeslash + ">" + this.newline, D;
      }, h.prototype.openNode = function(l, v) {
        var D, x, w, E;
        if (v || (v = 0), l instanceof s) {
          w = this.space(v) + "<" + l.name, E = l.attributes;
          for (x in E)
            m.call(E, x) && (D = E[x], w += this.attribute(D));
          return w += (l.children ? ">" : "/>") + this.newline, w;
        } else
          return w = this.space(v) + "<!DOCTYPE " + l.rootNodeName, l.pubID && l.sysID ? w += ' PUBLIC "' + l.pubID + '" "' + l.sysID + '"' : l.sysID && (w += ' SYSTEM "' + l.sysID + '"'), w += (l.children ? " [" : ">") + this.newline, w;
      }, h.prototype.closeNode = function(l, v) {
        switch (v || (v = 0), !1) {
          case !(l instanceof s):
            return this.space(v) + "</" + l.name + ">" + this.newline;
          case !(l instanceof c):
            return this.space(v) + "]>" + this.newline;
        }
      }, h;
    }(p);
  }).call(re)), nu.exports;
}
var og;
function B8() {
  return og || (og = 1, (function() {
    var e, t, n, r, i = function(o, c) {
      for (var u in c)
        a.call(c, u) && (o[u] = c[u]);
      function s() {
        this.constructor = o;
      }
      return s.prototype = c.prototype, o.prototype = new s(), o.__super__ = c.prototype, o;
    }, a = {}.hasOwnProperty;
    r = On().isPlainObject, e = ft(), n = t1(), t = sl(), Ms.exports = function(o) {
      i(c, o);
      function c(u) {
        c.__super__.constructor.call(this, null), this.name = "?xml", u || (u = {}), u.writer || (u.writer = new t()), this.options = u, this.stringify = new n(u), this.isDocument = !0;
      }
      return c.prototype.end = function(u) {
        var s;
        return u ? r(u) && (s = u, u = this.options.writer.set(s)) : u = this.options.writer, u.document(this);
      }, c.prototype.toString = function(u) {
        return this.options.writer.set(u).document(this);
      }, c;
    }(e);
  }).call(re)), Ms.exports;
}
var iu = { exports: {} }, cg;
function R8() {
  return cg || (cg = 1, (function() {
    var e, t, n, r, i, a, o, c, u, s, d, g, f, p, b, m, y, h, l, v, D = {}.hasOwnProperty;
    v = On(), h = v.isObject, y = v.isFunction, l = v.isPlainObject, m = v.getValue, s = Mo(), t = $o(), n = Po(), g = Ho(), b = Go(), d = Yo(), c = zo(), u = Vo(), r = qo(), a = jo(), i = Zo(), o = Xo(), e = e1(), p = t1(), f = sl(), iu.exports = function() {
      function x(w, E, k) {
        var W;
        this.name = "?xml", w || (w = {}), w.writer ? l(w.writer) && (W = w.writer, w.writer = new f(W)) : w.writer = new f(w), this.options = w, this.writer = w.writer, this.stringify = new p(w), this.onDataCallback = E || function() {
        }, this.onEndCallback = k || function() {
        }, this.currentNode = null, this.currentLevel = -1, this.openTags = {}, this.documentStarted = !1, this.documentCompleted = !1, this.root = null;
      }
      return x.prototype.node = function(w, E, k) {
        var W, q;
        if (w == null)
          throw new Error("Missing node name.");
        if (this.root && this.currentLevel === -1)
          throw new Error("Document can only have one root node. " + this.debugInfo(w));
        return this.openCurrent(), w = m(w), E === null && k == null && (W = [{}, null], E = W[0], k = W[1]), E == null && (E = {}), E = m(E), h(E) || (q = [E, k], k = q[0], E = q[1]), this.currentNode = new s(this, w, E), this.currentNode.children = !1, this.currentLevel++, this.openTags[this.currentLevel] = this.currentNode, k != null && this.text(k), this;
      }, x.prototype.element = function(w, E, k) {
        return this.currentNode && this.currentNode instanceof u ? this.dtdElement.apply(this, arguments) : this.node(w, E, k);
      }, x.prototype.attribute = function(w, E) {
        var k, W;
        if (!this.currentNode || this.currentNode.children)
          throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(w));
        if (w != null && (w = m(w)), h(w))
          for (k in w)
            D.call(w, k) && (W = w[k], this.attribute(k, W));
        else
          y(E) && (E = E.apply()), (!this.options.skipNullAttributes || E != null) && (this.currentNode.attributes[w] = new e(this, w, E));
        return this;
      }, x.prototype.text = function(w) {
        var E;
        return this.openCurrent(), E = new b(this, w), this.onData(this.writer.text(E, this.currentLevel + 1), this.currentLevel + 1), this;
      }, x.prototype.cdata = function(w) {
        var E;
        return this.openCurrent(), E = new t(this, w), this.onData(this.writer.cdata(E, this.currentLevel + 1), this.currentLevel + 1), this;
      }, x.prototype.comment = function(w) {
        var E;
        return this.openCurrent(), E = new n(this, w), this.onData(this.writer.comment(E, this.currentLevel + 1), this.currentLevel + 1), this;
      }, x.prototype.raw = function(w) {
        var E;
        return this.openCurrent(), E = new g(this, w), this.onData(this.writer.raw(E, this.currentLevel + 1), this.currentLevel + 1), this;
      }, x.prototype.instruction = function(w, E) {
        var k, W, q, $, B;
        if (this.openCurrent(), w != null && (w = m(w)), E != null && (E = m(E)), Array.isArray(w))
          for (k = 0, $ = w.length; k < $; k++)
            W = w[k], this.instruction(W);
        else if (h(w))
          for (W in w)
            D.call(w, W) && (q = w[W], this.instruction(W, q));
        else
          y(E) && (E = E.apply()), B = new d(this, w, E), this.onData(this.writer.processingInstruction(B, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      }, x.prototype.declaration = function(w, E, k) {
        var W;
        if (this.openCurrent(), this.documentStarted)
          throw new Error("declaration() must be the first node.");
        return W = new c(this, w, E, k), this.onData(this.writer.declaration(W, this.currentLevel + 1), this.currentLevel + 1), this;
      }, x.prototype.doctype = function(w, E, k) {
        if (this.openCurrent(), w == null)
          throw new Error("Missing root node name.");
        if (this.root)
          throw new Error("dtd() must come before the root node.");
        return this.currentNode = new u(this, E, k), this.currentNode.rootNodeName = w, this.currentNode.children = !1, this.currentLevel++, this.openTags[this.currentLevel] = this.currentNode, this;
      }, x.prototype.dtdElement = function(w, E) {
        var k;
        return this.openCurrent(), k = new i(this, w, E), this.onData(this.writer.dtdElement(k, this.currentLevel + 1), this.currentLevel + 1), this;
      }, x.prototype.attList = function(w, E, k, W, q) {
        var $;
        return this.openCurrent(), $ = new r(this, w, E, k, W, q), this.onData(this.writer.dtdAttList($, this.currentLevel + 1), this.currentLevel + 1), this;
      }, x.prototype.entity = function(w, E) {
        var k;
        return this.openCurrent(), k = new a(this, !1, w, E), this.onData(this.writer.dtdEntity(k, this.currentLevel + 1), this.currentLevel + 1), this;
      }, x.prototype.pEntity = function(w, E) {
        var k;
        return this.openCurrent(), k = new a(this, !0, w, E), this.onData(this.writer.dtdEntity(k, this.currentLevel + 1), this.currentLevel + 1), this;
      }, x.prototype.notation = function(w, E) {
        var k;
        return this.openCurrent(), k = new o(this, w, E), this.onData(this.writer.dtdNotation(k, this.currentLevel + 1), this.currentLevel + 1), this;
      }, x.prototype.up = function() {
        if (this.currentLevel < 0)
          throw new Error("The document node has no parent.");
        return this.currentNode ? (this.currentNode.children ? this.closeNode(this.currentNode) : this.openNode(this.currentNode), this.currentNode = null) : this.closeNode(this.openTags[this.currentLevel]), delete this.openTags[this.currentLevel], this.currentLevel--, this;
      }, x.prototype.end = function() {
        for (; this.currentLevel >= 0; )
          this.up();
        return this.onEnd();
      }, x.prototype.openCurrent = function() {
        if (this.currentNode)
          return this.currentNode.children = !0, this.openNode(this.currentNode);
      }, x.prototype.openNode = function(w) {
        if (!w.isOpen)
          return !this.root && this.currentLevel === 0 && w instanceof s && (this.root = w), this.onData(this.writer.openNode(w, this.currentLevel), this.currentLevel), w.isOpen = !0;
      }, x.prototype.closeNode = function(w) {
        if (!w.isClosed)
          return this.onData(this.writer.closeNode(w, this.currentLevel), this.currentLevel), w.isClosed = !0;
      }, x.prototype.onData = function(w, E) {
        return this.documentStarted = !0, this.onDataCallback(w, E + 1);
      }, x.prototype.onEnd = function() {
        return this.documentCompleted = !0, this.onEndCallback();
      }, x.prototype.debugInfo = function(w) {
        return w == null ? "" : "node: <" + w + ">";
      }, x.prototype.ele = function() {
        return this.element.apply(this, arguments);
      }, x.prototype.nod = function(w, E, k) {
        return this.node(w, E, k);
      }, x.prototype.txt = function(w) {
        return this.text(w);
      }, x.prototype.dat = function(w) {
        return this.cdata(w);
      }, x.prototype.com = function(w) {
        return this.comment(w);
      }, x.prototype.ins = function(w, E) {
        return this.instruction(w, E);
      }, x.prototype.dec = function(w, E, k) {
        return this.declaration(w, E, k);
      }, x.prototype.dtd = function(w, E, k) {
        return this.doctype(w, E, k);
      }, x.prototype.e = function(w, E, k) {
        return this.element(w, E, k);
      }, x.prototype.n = function(w, E, k) {
        return this.node(w, E, k);
      }, x.prototype.t = function(w) {
        return this.text(w);
      }, x.prototype.d = function(w) {
        return this.cdata(w);
      }, x.prototype.c = function(w) {
        return this.comment(w);
      }, x.prototype.r = function(w) {
        return this.raw(w);
      }, x.prototype.i = function(w, E) {
        return this.instruction(w, E);
      }, x.prototype.att = function() {
        return this.currentNode && this.currentNode instanceof u ? this.attList.apply(this, arguments) : this.attribute.apply(this, arguments);
      }, x.prototype.a = function() {
        return this.currentNode && this.currentNode instanceof u ? this.attList.apply(this, arguments) : this.attribute.apply(this, arguments);
      }, x.prototype.ent = function(w, E) {
        return this.entity(w, E);
      }, x.prototype.pent = function(w, E) {
        return this.pEntity(w, E);
      }, x.prototype.not = function(w, E) {
        return this.notation(w, E);
      }, x;
    }();
  }).call(re)), iu.exports;
}
var au = { exports: {} }, sg;
function O8() {
  return sg || (sg = 1, (function() {
    var e, t, n, r, i, a, o, c, u, s, d, g, f, p, b = function(y, h) {
      for (var l in h)
        m.call(h, l) && (y[l] = h[l]);
      function v() {
        this.constructor = y;
      }
      return v.prototype = h.prototype, y.prototype = new v(), y.__super__ = h.prototype, y;
    }, m = {}.hasOwnProperty;
    o = zo(), c = Vo(), e = $o(), t = Po(), s = Mo(), g = Ho(), f = Go(), d = Yo(), u = cl(), n = qo(), r = Zo(), i = jo(), a = Xo(), p = n1(), au.exports = function(y) {
      b(h, y);
      function h(l, v) {
        h.__super__.constructor.call(this, v), this.stream = l;
      }
      return h.prototype.document = function(l) {
        var v, D, x, w, E, k, W, q;
        for (k = l.children, D = 0, w = k.length; D < w; D++)
          v = k[D], v.isLastRootNode = !1;
        for (l.children[l.children.length - 1].isLastRootNode = !0, W = l.children, q = [], x = 0, E = W.length; x < E; x++)
          if (v = W[x], !(v instanceof u))
            switch (!1) {
              case !(v instanceof o):
                q.push(this.declaration(v));
                break;
              case !(v instanceof c):
                q.push(this.docType(v));
                break;
              case !(v instanceof t):
                q.push(this.comment(v));
                break;
              case !(v instanceof d):
                q.push(this.processingInstruction(v));
                break;
              default:
                q.push(this.element(v));
            }
        return q;
      }, h.prototype.attribute = function(l) {
        return this.stream.write(" " + l.name + '="' + l.value + '"');
      }, h.prototype.cdata = function(l, v) {
        return this.stream.write(this.space(v) + "<![CDATA[" + l.text + "]]>" + this.endline(l));
      }, h.prototype.comment = function(l, v) {
        return this.stream.write(this.space(v) + "<!-- " + l.text + " -->" + this.endline(l));
      }, h.prototype.declaration = function(l, v) {
        return this.stream.write(this.space(v)), this.stream.write('<?xml version="' + l.version + '"'), l.encoding != null && this.stream.write(' encoding="' + l.encoding + '"'), l.standalone != null && this.stream.write(' standalone="' + l.standalone + '"'), this.stream.write(this.spacebeforeslash + "?>"), this.stream.write(this.endline(l));
      }, h.prototype.docType = function(l, v) {
        var D, x, w, E;
        if (v || (v = 0), this.stream.write(this.space(v)), this.stream.write("<!DOCTYPE " + l.root().name), l.pubID && l.sysID ? this.stream.write(' PUBLIC "' + l.pubID + '" "' + l.sysID + '"') : l.sysID && this.stream.write(' SYSTEM "' + l.sysID + '"'), l.children.length > 0) {
          for (this.stream.write(" ["), this.stream.write(this.endline(l)), E = l.children, x = 0, w = E.length; x < w; x++)
            switch (D = E[x], !1) {
              case !(D instanceof n):
                this.dtdAttList(D, v + 1);
                break;
              case !(D instanceof r):
                this.dtdElement(D, v + 1);
                break;
              case !(D instanceof i):
                this.dtdEntity(D, v + 1);
                break;
              case !(D instanceof a):
                this.dtdNotation(D, v + 1);
                break;
              case !(D instanceof e):
                this.cdata(D, v + 1);
                break;
              case !(D instanceof t):
                this.comment(D, v + 1);
                break;
              case !(D instanceof d):
                this.processingInstruction(D, v + 1);
                break;
              default:
                throw new Error("Unknown DTD node type: " + D.constructor.name);
            }
          this.stream.write("]");
        }
        return this.stream.write(this.spacebeforeslash + ">"), this.stream.write(this.endline(l));
      }, h.prototype.element = function(l, v) {
        var D, x, w, E, k, W, q, $;
        v || (v = 0), $ = this.space(v), this.stream.write($ + "<" + l.name), W = l.attributes;
        for (k in W)
          m.call(W, k) && (D = W[k], this.attribute(D));
        if (l.children.length === 0 || l.children.every(function(B) {
          return B.value === "";
        }))
          this.allowEmpty ? this.stream.write("></" + l.name + ">") : this.stream.write(this.spacebeforeslash + "/>");
        else if (this.pretty && l.children.length === 1 && l.children[0].value != null)
          this.stream.write(">"), this.stream.write(l.children[0].value), this.stream.write("</" + l.name + ">");
        else {
          for (this.stream.write(">" + this.newline), q = l.children, w = 0, E = q.length; w < E; w++)
            switch (x = q[w], !1) {
              case !(x instanceof e):
                this.cdata(x, v + 1);
                break;
              case !(x instanceof t):
                this.comment(x, v + 1);
                break;
              case !(x instanceof s):
                this.element(x, v + 1);
                break;
              case !(x instanceof g):
                this.raw(x, v + 1);
                break;
              case !(x instanceof f):
                this.text(x, v + 1);
                break;
              case !(x instanceof d):
                this.processingInstruction(x, v + 1);
                break;
              case !(x instanceof u):
                break;
              default:
                throw new Error("Unknown XML node type: " + x.constructor.name);
            }
          this.stream.write($ + "</" + l.name + ">");
        }
        return this.stream.write(this.endline(l));
      }, h.prototype.processingInstruction = function(l, v) {
        return this.stream.write(this.space(v) + "<?" + l.target), l.value && this.stream.write(" " + l.value), this.stream.write(this.spacebeforeslash + "?>" + this.endline(l));
      }, h.prototype.raw = function(l, v) {
        return this.stream.write(this.space(v) + l.value + this.endline(l));
      }, h.prototype.text = function(l, v) {
        return this.stream.write(this.space(v) + l.value + this.endline(l));
      }, h.prototype.dtdAttList = function(l, v) {
        return this.stream.write(this.space(v) + "<!ATTLIST " + l.elementName + " " + l.attributeName + " " + l.attributeType), l.defaultValueType !== "#DEFAULT" && this.stream.write(" " + l.defaultValueType), l.defaultValue && this.stream.write(' "' + l.defaultValue + '"'), this.stream.write(this.spacebeforeslash + ">" + this.endline(l));
      }, h.prototype.dtdElement = function(l, v) {
        return this.stream.write(this.space(v) + "<!ELEMENT " + l.name + " " + l.value), this.stream.write(this.spacebeforeslash + ">" + this.endline(l));
      }, h.prototype.dtdEntity = function(l, v) {
        return this.stream.write(this.space(v) + "<!ENTITY"), l.pe && this.stream.write(" %"), this.stream.write(" " + l.name), l.value ? this.stream.write(' "' + l.value + '"') : (l.pubID && l.sysID ? this.stream.write(' PUBLIC "' + l.pubID + '" "' + l.sysID + '"') : l.sysID && this.stream.write(' SYSTEM "' + l.sysID + '"'), l.nData && this.stream.write(" NDATA " + l.nData)), this.stream.write(this.spacebeforeslash + ">" + this.endline(l));
      }, h.prototype.dtdNotation = function(l, v) {
        return this.stream.write(this.space(v) + "<!NOTATION " + l.name), l.pubID && l.sysID ? this.stream.write(' PUBLIC "' + l.pubID + '" "' + l.sysID + '"') : l.pubID ? this.stream.write(' PUBLIC "' + l.pubID + '"') : l.sysID && this.stream.write(' SYSTEM "' + l.sysID + '"'), this.stream.write(this.spacebeforeslash + ">" + this.endline(l));
      }, h.prototype.endline = function(l) {
        return l.isLastRootNode ? "" : this.newline;
      }, h;
    }(p);
  }).call(re)), au.exports;
}
(function() {
  var e, t, n, r, i, a, o;
  o = On(), i = o.assign, a = o.isFunction, e = B8(), t = R8(), r = sl(), n = O8(), ci.create = function(c, u, s, d) {
    var g, f;
    if (c == null)
      throw new Error("Root element needs a name.");
    return d = i({}, u, s, d), g = new e(d), f = g.element(c), d.headless || (g.declaration(d), (d.pubID != null || d.sysID != null) && g.doctype(d)), f;
  }, ci.begin = function(c, u, s) {
    var d;
    return a(c) && (d = [c, u], u = d[0], s = d[1], c = {}), u ? new t(c, u, s) : new e(c);
  }, ci.stringWriter = function(c) {
    return new r(c);
  }, ci.streamWriter = function(c, u) {
    return new n(c, u);
  };
}).call(re);
var ug = Se, I8 = ci;
Qy.writeString = W8;
function W8(e, t) {
  var n = ug.invert(t), r = {
    element: a,
    text: N8
  };
  function i(u, s) {
    return r[s.type](u, s);
  }
  function a(u, s) {
    var d = u.element(o(s.name), s.attributes);
    s.children.forEach(function(g) {
      i(d, g);
    });
  }
  function o(u) {
    var s = /^\{(.*)\}(.*)$/.exec(u);
    if (s) {
      var d = n[s[1]];
      return d + (d === "" ? "" : ":") + s[2];
    } else
      return u;
  }
  function c(u) {
    var s = I8.create(o(u.name), {
      version: "1.0",
      encoding: "UTF-8",
      standalone: !0
    });
    return ug.forEach(t, function(d, g) {
      var f = "xmlns" + (g === "" ? "" : ":" + g);
      s.attribute(f, d);
    }), u.children.forEach(function(d) {
      i(s, d);
    }), s.end();
  }
  return c(e);
}
function N8(e, t) {
  e.text(t.value);
}
var Ko = Jr;
pn.Element = Ko.Element;
pn.element = Ko.element;
pn.emptyElement = Ko.emptyElement;
pn.text = Ko.text;
pn.readString = Dy.readString;
pn.writeString = Qy.writeString;
var L8 = Se, M8 = $e, $8 = pn;
Gd.read = r1;
Gd.readXmlFromZipFile = z8;
var P8 = {
  // Transitional format
  "http://schemas.openxmlformats.org/wordprocessingml/2006/main": "w",
  "http://schemas.openxmlformats.org/officeDocument/2006/relationships": "r",
  "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing": "wp",
  "http://schemas.openxmlformats.org/drawingml/2006/main": "a",
  "http://schemas.openxmlformats.org/drawingml/2006/picture": "pic",
  // Strict format
  "http://purl.oclc.org/ooxml/wordprocessingml/main": "w",
  "http://purl.oclc.org/ooxml/officeDocument/relationships": "r",
  "http://purl.oclc.org/ooxml/drawingml/wordprocessingDrawing": "wp",
  "http://purl.oclc.org/ooxml/drawingml/main": "a",
  "http://purl.oclc.org/ooxml/drawingml/picture": "pic",
  // Common
  "http://schemas.openxmlformats.org/package/2006/content-types": "content-types",
  "http://schemas.openxmlformats.org/package/2006/relationships": "relationships",
  "http://schemas.openxmlformats.org/markup-compatibility/2006": "mc",
  "urn:schemas-microsoft-com:vml": "v",
  "urn:schemas-microsoft-com:office:word": "office-word",
  // [MS-DOCX]: Word Extensions to the Office Open XML (.docx) File Format
  // https://learn.microsoft.com/en-us/openspecs/office_standards/ms-docx/b839fe1f-e1ca-4fa6-8c26-5954d0abbccd
  "http://schemas.microsoft.com/office/word/2010/wordml": "wordml"
};
function r1(e) {
  return $8.readString(e, P8).then(function(t) {
    return i1(t)[0];
  });
}
function z8(e, t) {
  return e.exists(t) ? e.read(t, "utf-8").then(q8).then(r1) : M8.resolve(null);
}
function q8(e) {
  return e.replace(/^\uFEFF/g, "");
}
function i1(e) {
  return e.type === "element" ? e.name === "mc:AlternateContent" ? e.firstOrEmpty("mc:Fallback").children : (e.children = L8.flatten(e.children.map(i1, !0)), [e]) : [e];
}
var ul = {}, An = {}, dl = {};
Object.defineProperty(dl, "__esModule", { value: !0 });
var j8 = [
  { "Typeface name": "Symbol", "Dingbat dec": "32", "Dingbat hex": "20", "Unicode dec": "32", "Unicode hex": "20" },
  { "Typeface name": "Symbol", "Dingbat dec": "33", "Dingbat hex": "21", "Unicode dec": "33", "Unicode hex": "21" },
  { "Typeface name": "Symbol", "Dingbat dec": "34", "Dingbat hex": "22", "Unicode dec": "8704", "Unicode hex": "2200" },
  { "Typeface name": "Symbol", "Dingbat dec": "35", "Dingbat hex": "23", "Unicode dec": "35", "Unicode hex": "23" },
  { "Typeface name": "Symbol", "Dingbat dec": "36", "Dingbat hex": "24", "Unicode dec": "8707", "Unicode hex": "2203" },
  { "Typeface name": "Symbol", "Dingbat dec": "37", "Dingbat hex": "25", "Unicode dec": "37", "Unicode hex": "25" },
  { "Typeface name": "Symbol", "Dingbat dec": "38", "Dingbat hex": "26", "Unicode dec": "38", "Unicode hex": "26" },
  { "Typeface name": "Symbol", "Dingbat dec": "39", "Dingbat hex": "27", "Unicode dec": "8717", "Unicode hex": "220D" },
  { "Typeface name": "Symbol", "Dingbat dec": "40", "Dingbat hex": "28", "Unicode dec": "40", "Unicode hex": "28" },
  { "Typeface name": "Symbol", "Dingbat dec": "41", "Dingbat hex": "29", "Unicode dec": "41", "Unicode hex": "29" },
  { "Typeface name": "Symbol", "Dingbat dec": "42", "Dingbat hex": "2A", "Unicode dec": "42", "Unicode hex": "2A" },
  { "Typeface name": "Symbol", "Dingbat dec": "43", "Dingbat hex": "2B", "Unicode dec": "43", "Unicode hex": "2B" },
  { "Typeface name": "Symbol", "Dingbat dec": "44", "Dingbat hex": "2C", "Unicode dec": "44", "Unicode hex": "2C" },
  { "Typeface name": "Symbol", "Dingbat dec": "45", "Dingbat hex": "2D", "Unicode dec": "8722", "Unicode hex": "2212" },
  { "Typeface name": "Symbol", "Dingbat dec": "46", "Dingbat hex": "2E", "Unicode dec": "46", "Unicode hex": "2E" },
  { "Typeface name": "Symbol", "Dingbat dec": "47", "Dingbat hex": "2F", "Unicode dec": "47", "Unicode hex": "2F" },
  { "Typeface name": "Symbol", "Dingbat dec": "48", "Dingbat hex": "30", "Unicode dec": "48", "Unicode hex": "30" },
  { "Typeface name": "Symbol", "Dingbat dec": "49", "Dingbat hex": "31", "Unicode dec": "49", "Unicode hex": "31" },
  { "Typeface name": "Symbol", "Dingbat dec": "50", "Dingbat hex": "32", "Unicode dec": "50", "Unicode hex": "32" },
  { "Typeface name": "Symbol", "Dingbat dec": "51", "Dingbat hex": "33", "Unicode dec": "51", "Unicode hex": "33" },
  { "Typeface name": "Symbol", "Dingbat dec": "52", "Dingbat hex": "34", "Unicode dec": "52", "Unicode hex": "34" },
  { "Typeface name": "Symbol", "Dingbat dec": "53", "Dingbat hex": "35", "Unicode dec": "53", "Unicode hex": "35" },
  { "Typeface name": "Symbol", "Dingbat dec": "54", "Dingbat hex": "36", "Unicode dec": "54", "Unicode hex": "36" },
  { "Typeface name": "Symbol", "Dingbat dec": "55", "Dingbat hex": "37", "Unicode dec": "55", "Unicode hex": "37" },
  { "Typeface name": "Symbol", "Dingbat dec": "56", "Dingbat hex": "38", "Unicode dec": "56", "Unicode hex": "38" },
  { "Typeface name": "Symbol", "Dingbat dec": "57", "Dingbat hex": "39", "Unicode dec": "57", "Unicode hex": "39" },
  { "Typeface name": "Symbol", "Dingbat dec": "58", "Dingbat hex": "3A", "Unicode dec": "58", "Unicode hex": "3A" },
  { "Typeface name": "Symbol", "Dingbat dec": "59", "Dingbat hex": "3B", "Unicode dec": "59", "Unicode hex": "3B" },
  { "Typeface name": "Symbol", "Dingbat dec": "60", "Dingbat hex": "3C", "Unicode dec": "60", "Unicode hex": "3C" },
  { "Typeface name": "Symbol", "Dingbat dec": "61", "Dingbat hex": "3D", "Unicode dec": "61", "Unicode hex": "3D" },
  { "Typeface name": "Symbol", "Dingbat dec": "62", "Dingbat hex": "3E", "Unicode dec": "62", "Unicode hex": "3E" },
  { "Typeface name": "Symbol", "Dingbat dec": "63", "Dingbat hex": "3F", "Unicode dec": "63", "Unicode hex": "3F" },
  { "Typeface name": "Symbol", "Dingbat dec": "64", "Dingbat hex": "40", "Unicode dec": "8773", "Unicode hex": "2245" },
  { "Typeface name": "Symbol", "Dingbat dec": "65", "Dingbat hex": "41", "Unicode dec": "913", "Unicode hex": "391" },
  { "Typeface name": "Symbol", "Dingbat dec": "66", "Dingbat hex": "42", "Unicode dec": "914", "Unicode hex": "392" },
  { "Typeface name": "Symbol", "Dingbat dec": "67", "Dingbat hex": "43", "Unicode dec": "935", "Unicode hex": "3A7" },
  { "Typeface name": "Symbol", "Dingbat dec": "68", "Dingbat hex": "44", "Unicode dec": "916", "Unicode hex": "394" },
  { "Typeface name": "Symbol", "Dingbat dec": "69", "Dingbat hex": "45", "Unicode dec": "917", "Unicode hex": "395" },
  { "Typeface name": "Symbol", "Dingbat dec": "70", "Dingbat hex": "46", "Unicode dec": "934", "Unicode hex": "3A6" },
  { "Typeface name": "Symbol", "Dingbat dec": "71", "Dingbat hex": "47", "Unicode dec": "915", "Unicode hex": "393" },
  { "Typeface name": "Symbol", "Dingbat dec": "72", "Dingbat hex": "48", "Unicode dec": "919", "Unicode hex": "397" },
  { "Typeface name": "Symbol", "Dingbat dec": "73", "Dingbat hex": "49", "Unicode dec": "921", "Unicode hex": "399" },
  { "Typeface name": "Symbol", "Dingbat dec": "74", "Dingbat hex": "4A", "Unicode dec": "977", "Unicode hex": "3D1" },
  { "Typeface name": "Symbol", "Dingbat dec": "75", "Dingbat hex": "4B", "Unicode dec": "922", "Unicode hex": "39A" },
  { "Typeface name": "Symbol", "Dingbat dec": "76", "Dingbat hex": "4C", "Unicode dec": "923", "Unicode hex": "39B" },
  { "Typeface name": "Symbol", "Dingbat dec": "77", "Dingbat hex": "4D", "Unicode dec": "924", "Unicode hex": "39C" },
  { "Typeface name": "Symbol", "Dingbat dec": "78", "Dingbat hex": "4E", "Unicode dec": "925", "Unicode hex": "39D" },
  { "Typeface name": "Symbol", "Dingbat dec": "79", "Dingbat hex": "4F", "Unicode dec": "927", "Unicode hex": "39F" },
  { "Typeface name": "Symbol", "Dingbat dec": "80", "Dingbat hex": "50", "Unicode dec": "928", "Unicode hex": "3A0" },
  { "Typeface name": "Symbol", "Dingbat dec": "81", "Dingbat hex": "51", "Unicode dec": "920", "Unicode hex": "398" },
  { "Typeface name": "Symbol", "Dingbat dec": "82", "Dingbat hex": "52", "Unicode dec": "929", "Unicode hex": "3A1" },
  { "Typeface name": "Symbol", "Dingbat dec": "83", "Dingbat hex": "53", "Unicode dec": "931", "Unicode hex": "3A3" },
  { "Typeface name": "Symbol", "Dingbat dec": "84", "Dingbat hex": "54", "Unicode dec": "932", "Unicode hex": "3A4" },
  { "Typeface name": "Symbol", "Dingbat dec": "85", "Dingbat hex": "55", "Unicode dec": "933", "Unicode hex": "3A5" },
  { "Typeface name": "Symbol", "Dingbat dec": "86", "Dingbat hex": "56", "Unicode dec": "962", "Unicode hex": "3C2" },
  { "Typeface name": "Symbol", "Dingbat dec": "87", "Dingbat hex": "57", "Unicode dec": "937", "Unicode hex": "3A9" },
  { "Typeface name": "Symbol", "Dingbat dec": "88", "Dingbat hex": "58", "Unicode dec": "926", "Unicode hex": "39E" },
  { "Typeface name": "Symbol", "Dingbat dec": "89", "Dingbat hex": "59", "Unicode dec": "936", "Unicode hex": "3A8" },
  { "Typeface name": "Symbol", "Dingbat dec": "90", "Dingbat hex": "5A", "Unicode dec": "918", "Unicode hex": "396" },
  { "Typeface name": "Symbol", "Dingbat dec": "91", "Dingbat hex": "5B", "Unicode dec": "91", "Unicode hex": "5B" },
  { "Typeface name": "Symbol", "Dingbat dec": "92", "Dingbat hex": "5C", "Unicode dec": "8756", "Unicode hex": "2234" },
  { "Typeface name": "Symbol", "Dingbat dec": "93", "Dingbat hex": "5D", "Unicode dec": "93", "Unicode hex": "5D" },
  { "Typeface name": "Symbol", "Dingbat dec": "94", "Dingbat hex": "5E", "Unicode dec": "8869", "Unicode hex": "22A5" },
  { "Typeface name": "Symbol", "Dingbat dec": "95", "Dingbat hex": "5F", "Unicode dec": "95", "Unicode hex": "5F" },
  { "Typeface name": "Symbol", "Dingbat dec": "96", "Dingbat hex": "60", "Unicode dec": "8254", "Unicode hex": "203E" },
  { "Typeface name": "Symbol", "Dingbat dec": "97", "Dingbat hex": "61", "Unicode dec": "945", "Unicode hex": "3B1" },
  { "Typeface name": "Symbol", "Dingbat dec": "98", "Dingbat hex": "62", "Unicode dec": "946", "Unicode hex": "3B2" },
  { "Typeface name": "Symbol", "Dingbat dec": "99", "Dingbat hex": "63", "Unicode dec": "967", "Unicode hex": "3C7" },
  { "Typeface name": "Symbol", "Dingbat dec": "100", "Dingbat hex": "64", "Unicode dec": "948", "Unicode hex": "3B4" },
  { "Typeface name": "Symbol", "Dingbat dec": "101", "Dingbat hex": "65", "Unicode dec": "949", "Unicode hex": "3B5" },
  { "Typeface name": "Symbol", "Dingbat dec": "102", "Dingbat hex": "66", "Unicode dec": "966", "Unicode hex": "3C6" },
  { "Typeface name": "Symbol", "Dingbat dec": "103", "Dingbat hex": "67", "Unicode dec": "947", "Unicode hex": "3B3" },
  { "Typeface name": "Symbol", "Dingbat dec": "104", "Dingbat hex": "68", "Unicode dec": "951", "Unicode hex": "3B7" },
  { "Typeface name": "Symbol", "Dingbat dec": "105", "Dingbat hex": "69", "Unicode dec": "953", "Unicode hex": "3B9" },
  { "Typeface name": "Symbol", "Dingbat dec": "106", "Dingbat hex": "6A", "Unicode dec": "981", "Unicode hex": "3D5" },
  { "Typeface name": "Symbol", "Dingbat dec": "107", "Dingbat hex": "6B", "Unicode dec": "954", "Unicode hex": "3BA" },
  { "Typeface name": "Symbol", "Dingbat dec": "108", "Dingbat hex": "6C", "Unicode dec": "955", "Unicode hex": "3BB" },
  { "Typeface name": "Symbol", "Dingbat dec": "109", "Dingbat hex": "6D", "Unicode dec": "956", "Unicode hex": "3BC" },
  { "Typeface name": "Symbol", "Dingbat dec": "110", "Dingbat hex": "6E", "Unicode dec": "957", "Unicode hex": "3BD" },
  { "Typeface name": "Symbol", "Dingbat dec": "111", "Dingbat hex": "6F", "Unicode dec": "959", "Unicode hex": "3BF" },
  { "Typeface name": "Symbol", "Dingbat dec": "112", "Dingbat hex": "70", "Unicode dec": "960", "Unicode hex": "3C0" },
  { "Typeface name": "Symbol", "Dingbat dec": "113", "Dingbat hex": "71", "Unicode dec": "952", "Unicode hex": "3B8" },
  { "Typeface name": "Symbol", "Dingbat dec": "114", "Dingbat hex": "72", "Unicode dec": "961", "Unicode hex": "3C1" },
  { "Typeface name": "Symbol", "Dingbat dec": "115", "Dingbat hex": "73", "Unicode dec": "963", "Unicode hex": "3C3" },
  { "Typeface name": "Symbol", "Dingbat dec": "116", "Dingbat hex": "74", "Unicode dec": "964", "Unicode hex": "3C4" },
  { "Typeface name": "Symbol", "Dingbat dec": "117", "Dingbat hex": "75", "Unicode dec": "965", "Unicode hex": "3C5" },
  { "Typeface name": "Symbol", "Dingbat dec": "118", "Dingbat hex": "76", "Unicode dec": "982", "Unicode hex": "3D6" },
  { "Typeface name": "Symbol", "Dingbat dec": "119", "Dingbat hex": "77", "Unicode dec": "969", "Unicode hex": "3C9" },
  { "Typeface name": "Symbol", "Dingbat dec": "120", "Dingbat hex": "78", "Unicode dec": "958", "Unicode hex": "3BE" },
  { "Typeface name": "Symbol", "Dingbat dec": "121", "Dingbat hex": "79", "Unicode dec": "968", "Unicode hex": "3C8" },
  { "Typeface name": "Symbol", "Dingbat dec": "122", "Dingbat hex": "7A", "Unicode dec": "950", "Unicode hex": "3B6" },
  { "Typeface name": "Symbol", "Dingbat dec": "123", "Dingbat hex": "7B", "Unicode dec": "123", "Unicode hex": "7B" },
  { "Typeface name": "Symbol", "Dingbat dec": "124", "Dingbat hex": "7C", "Unicode dec": "124", "Unicode hex": "7C" },
  { "Typeface name": "Symbol", "Dingbat dec": "125", "Dingbat hex": "7D", "Unicode dec": "125", "Unicode hex": "7D" },
  { "Typeface name": "Symbol", "Dingbat dec": "126", "Dingbat hex": "7E", "Unicode dec": "126", "Unicode hex": "7E" },
  { "Typeface name": "Symbol", "Dingbat dec": "160", "Dingbat hex": "A0", "Unicode dec": "8364", "Unicode hex": "20AC" },
  { "Typeface name": "Symbol", "Dingbat dec": "161", "Dingbat hex": "A1", "Unicode dec": "978", "Unicode hex": "3D2" },
  { "Typeface name": "Symbol", "Dingbat dec": "162", "Dingbat hex": "A2", "Unicode dec": "8242", "Unicode hex": "2032" },
  { "Typeface name": "Symbol", "Dingbat dec": "163", "Dingbat hex": "A3", "Unicode dec": "8804", "Unicode hex": "2264" },
  { "Typeface name": "Symbol", "Dingbat dec": "164", "Dingbat hex": "A4", "Unicode dec": "8260", "Unicode hex": "2044" },
  { "Typeface name": "Symbol", "Dingbat dec": "165", "Dingbat hex": "A5", "Unicode dec": "8734", "Unicode hex": "221E" },
  { "Typeface name": "Symbol", "Dingbat dec": "166", "Dingbat hex": "A6", "Unicode dec": "402", "Unicode hex": "192" },
  { "Typeface name": "Symbol", "Dingbat dec": "167", "Dingbat hex": "A7", "Unicode dec": "9827", "Unicode hex": "2663" },
  { "Typeface name": "Symbol", "Dingbat dec": "168", "Dingbat hex": "A8", "Unicode dec": "9830", "Unicode hex": "2666" },
  { "Typeface name": "Symbol", "Dingbat dec": "169", "Dingbat hex": "A9", "Unicode dec": "9829", "Unicode hex": "2665" },
  { "Typeface name": "Symbol", "Dingbat dec": "170", "Dingbat hex": "AA", "Unicode dec": "9824", "Unicode hex": "2660" },
  { "Typeface name": "Symbol", "Dingbat dec": "171", "Dingbat hex": "AB", "Unicode dec": "8596", "Unicode hex": "2194" },
  { "Typeface name": "Symbol", "Dingbat dec": "172", "Dingbat hex": "AC", "Unicode dec": "8592", "Unicode hex": "2190" },
  { "Typeface name": "Symbol", "Dingbat dec": "173", "Dingbat hex": "AD", "Unicode dec": "8593", "Unicode hex": "2191" },
  { "Typeface name": "Symbol", "Dingbat dec": "174", "Dingbat hex": "AE", "Unicode dec": "8594", "Unicode hex": "2192" },
  { "Typeface name": "Symbol", "Dingbat dec": "175", "Dingbat hex": "AF", "Unicode dec": "8595", "Unicode hex": "2193" },
  { "Typeface name": "Symbol", "Dingbat dec": "176", "Dingbat hex": "B0", "Unicode dec": "176", "Unicode hex": "B0" },
  { "Typeface name": "Symbol", "Dingbat dec": "177", "Dingbat hex": "B1", "Unicode dec": "177", "Unicode hex": "B1" },
  { "Typeface name": "Symbol", "Dingbat dec": "178", "Dingbat hex": "B2", "Unicode dec": "8243", "Unicode hex": "2033" },
  { "Typeface name": "Symbol", "Dingbat dec": "179", "Dingbat hex": "B3", "Unicode dec": "8805", "Unicode hex": "2265" },
  { "Typeface name": "Symbol", "Dingbat dec": "180", "Dingbat hex": "B4", "Unicode dec": "215", "Unicode hex": "D7" },
  { "Typeface name": "Symbol", "Dingbat dec": "181", "Dingbat hex": "B5", "Unicode dec": "8733", "Unicode hex": "221D" },
  { "Typeface name": "Symbol", "Dingbat dec": "182", "Dingbat hex": "B6", "Unicode dec": "8706", "Unicode hex": "2202" },
  { "Typeface name": "Symbol", "Dingbat dec": "183", "Dingbat hex": "B7", "Unicode dec": "8226", "Unicode hex": "2022" },
  { "Typeface name": "Symbol", "Dingbat dec": "184", "Dingbat hex": "B8", "Unicode dec": "247", "Unicode hex": "F7" },
  { "Typeface name": "Symbol", "Dingbat dec": "185", "Dingbat hex": "B9", "Unicode dec": "8800", "Unicode hex": "2260" },
  { "Typeface name": "Symbol", "Dingbat dec": "186", "Dingbat hex": "BA", "Unicode dec": "8801", "Unicode hex": "2261" },
  { "Typeface name": "Symbol", "Dingbat dec": "187", "Dingbat hex": "BB", "Unicode dec": "8776", "Unicode hex": "2248" },
  { "Typeface name": "Symbol", "Dingbat dec": "188", "Dingbat hex": "BC", "Unicode dec": "8230", "Unicode hex": "2026" },
  { "Typeface name": "Symbol", "Dingbat dec": "189", "Dingbat hex": "BD", "Unicode dec": "9168", "Unicode hex": "23D0" },
  { "Typeface name": "Symbol", "Dingbat dec": "190", "Dingbat hex": "BE", "Unicode dec": "9135", "Unicode hex": "23AF" },
  { "Typeface name": "Symbol", "Dingbat dec": "191", "Dingbat hex": "BF", "Unicode dec": "8629", "Unicode hex": "21B5" },
  { "Typeface name": "Symbol", "Dingbat dec": "192", "Dingbat hex": "C0", "Unicode dec": "8501", "Unicode hex": "2135" },
  { "Typeface name": "Symbol", "Dingbat dec": "193", "Dingbat hex": "C1", "Unicode dec": "8465", "Unicode hex": "2111" },
  { "Typeface name": "Symbol", "Dingbat dec": "194", "Dingbat hex": "C2", "Unicode dec": "8476", "Unicode hex": "211C" },
  { "Typeface name": "Symbol", "Dingbat dec": "195", "Dingbat hex": "C3", "Unicode dec": "8472", "Unicode hex": "2118" },
  { "Typeface name": "Symbol", "Dingbat dec": "196", "Dingbat hex": "C4", "Unicode dec": "8855", "Unicode hex": "2297" },
  { "Typeface name": "Symbol", "Dingbat dec": "197", "Dingbat hex": "C5", "Unicode dec": "8853", "Unicode hex": "2295" },
  { "Typeface name": "Symbol", "Dingbat dec": "198", "Dingbat hex": "C6", "Unicode dec": "8709", "Unicode hex": "2205" },
  { "Typeface name": "Symbol", "Dingbat dec": "199", "Dingbat hex": "C7", "Unicode dec": "8745", "Unicode hex": "2229" },
  { "Typeface name": "Symbol", "Dingbat dec": "200", "Dingbat hex": "C8", "Unicode dec": "8746", "Unicode hex": "222A" },
  { "Typeface name": "Symbol", "Dingbat dec": "201", "Dingbat hex": "C9", "Unicode dec": "8835", "Unicode hex": "2283" },
  { "Typeface name": "Symbol", "Dingbat dec": "202", "Dingbat hex": "CA", "Unicode dec": "8839", "Unicode hex": "2287" },
  { "Typeface name": "Symbol", "Dingbat dec": "203", "Dingbat hex": "CB", "Unicode dec": "8836", "Unicode hex": "2284" },
  { "Typeface name": "Symbol", "Dingbat dec": "204", "Dingbat hex": "CC", "Unicode dec": "8834", "Unicode hex": "2282" },
  { "Typeface name": "Symbol", "Dingbat dec": "205", "Dingbat hex": "CD", "Unicode dec": "8838", "Unicode hex": "2286" },
  { "Typeface name": "Symbol", "Dingbat dec": "206", "Dingbat hex": "CE", "Unicode dec": "8712", "Unicode hex": "2208" },
  { "Typeface name": "Symbol", "Dingbat dec": "207", "Dingbat hex": "CF", "Unicode dec": "8713", "Unicode hex": "2209" },
  { "Typeface name": "Symbol", "Dingbat dec": "208", "Dingbat hex": "D0", "Unicode dec": "8736", "Unicode hex": "2220" },
  { "Typeface name": "Symbol", "Dingbat dec": "209", "Dingbat hex": "D1", "Unicode dec": "8711", "Unicode hex": "2207" },
  { "Typeface name": "Symbol", "Dingbat dec": "210", "Dingbat hex": "D2", "Unicode dec": "174", "Unicode hex": "AE" },
  { "Typeface name": "Symbol", "Dingbat dec": "211", "Dingbat hex": "D3", "Unicode dec": "169", "Unicode hex": "A9" },
  { "Typeface name": "Symbol", "Dingbat dec": "212", "Dingbat hex": "D4", "Unicode dec": "8482", "Unicode hex": "2122" },
  { "Typeface name": "Symbol", "Dingbat dec": "213", "Dingbat hex": "D5", "Unicode dec": "8719", "Unicode hex": "220F" },
  { "Typeface name": "Symbol", "Dingbat dec": "214", "Dingbat hex": "D6", "Unicode dec": "8730", "Unicode hex": "221A" },
  { "Typeface name": "Symbol", "Dingbat dec": "215", "Dingbat hex": "D7", "Unicode dec": "8901", "Unicode hex": "22C5" },
  { "Typeface name": "Symbol", "Dingbat dec": "216", "Dingbat hex": "D8", "Unicode dec": "172", "Unicode hex": "AC" },
  { "Typeface name": "Symbol", "Dingbat dec": "217", "Dingbat hex": "D9", "Unicode dec": "8743", "Unicode hex": "2227" },
  { "Typeface name": "Symbol", "Dingbat dec": "218", "Dingbat hex": "DA", "Unicode dec": "8744", "Unicode hex": "2228" },
  { "Typeface name": "Symbol", "Dingbat dec": "219", "Dingbat hex": "DB", "Unicode dec": "8660", "Unicode hex": "21D4" },
  { "Typeface name": "Symbol", "Dingbat dec": "220", "Dingbat hex": "DC", "Unicode dec": "8656", "Unicode hex": "21D0" },
  { "Typeface name": "Symbol", "Dingbat dec": "221", "Dingbat hex": "DD", "Unicode dec": "8657", "Unicode hex": "21D1" },
  { "Typeface name": "Symbol", "Dingbat dec": "222", "Dingbat hex": "DE", "Unicode dec": "8658", "Unicode hex": "21D2" },
  { "Typeface name": "Symbol", "Dingbat dec": "223", "Dingbat hex": "DF", "Unicode dec": "8659", "Unicode hex": "21D3" },
  { "Typeface name": "Symbol", "Dingbat dec": "224", "Dingbat hex": "E0", "Unicode dec": "9674", "Unicode hex": "25CA" },
  { "Typeface name": "Symbol", "Dingbat dec": "225", "Dingbat hex": "E1", "Unicode dec": "12296", "Unicode hex": "3008" },
  { "Typeface name": "Symbol", "Dingbat dec": "226", "Dingbat hex": "E2", "Unicode dec": "174", "Unicode hex": "AE" },
  { "Typeface name": "Symbol", "Dingbat dec": "227", "Dingbat hex": "E3", "Unicode dec": "169", "Unicode hex": "A9" },
  { "Typeface name": "Symbol", "Dingbat dec": "228", "Dingbat hex": "E4", "Unicode dec": "8482", "Unicode hex": "2122" },
  { "Typeface name": "Symbol", "Dingbat dec": "229", "Dingbat hex": "E5", "Unicode dec": "8721", "Unicode hex": "2211" },
  { "Typeface name": "Symbol", "Dingbat dec": "230", "Dingbat hex": "E6", "Unicode dec": "9115", "Unicode hex": "239B" },
  { "Typeface name": "Symbol", "Dingbat dec": "231", "Dingbat hex": "E7", "Unicode dec": "9116", "Unicode hex": "239C" },
  { "Typeface name": "Symbol", "Dingbat dec": "232", "Dingbat hex": "E8", "Unicode dec": "9117", "Unicode hex": "239D" },
  { "Typeface name": "Symbol", "Dingbat dec": "233", "Dingbat hex": "E9", "Unicode dec": "9121", "Unicode hex": "23A1" },
  { "Typeface name": "Symbol", "Dingbat dec": "234", "Dingbat hex": "EA", "Unicode dec": "9122", "Unicode hex": "23A2" },
  { "Typeface name": "Symbol", "Dingbat dec": "235", "Dingbat hex": "EB", "Unicode dec": "9123", "Unicode hex": "23A3" },
  { "Typeface name": "Symbol", "Dingbat dec": "236", "Dingbat hex": "EC", "Unicode dec": "9127", "Unicode hex": "23A7" },
  { "Typeface name": "Symbol", "Dingbat dec": "237", "Dingbat hex": "ED", "Unicode dec": "9128", "Unicode hex": "23A8" },
  { "Typeface name": "Symbol", "Dingbat dec": "238", "Dingbat hex": "EE", "Unicode dec": "9129", "Unicode hex": "23A9" },
  { "Typeface name": "Symbol", "Dingbat dec": "239", "Dingbat hex": "EF", "Unicode dec": "9130", "Unicode hex": "23AA" },
  { "Typeface name": "Symbol", "Dingbat dec": "240", "Dingbat hex": "F0", "Unicode dec": "63743", "Unicode hex": "F8FF" },
  { "Typeface name": "Symbol", "Dingbat dec": "241", "Dingbat hex": "F1", "Unicode dec": "12297", "Unicode hex": "3009" },
  { "Typeface name": "Symbol", "Dingbat dec": "242", "Dingbat hex": "F2", "Unicode dec": "8747", "Unicode hex": "222B" },
  { "Typeface name": "Symbol", "Dingbat dec": "243", "Dingbat hex": "F3", "Unicode dec": "8992", "Unicode hex": "2320" },
  { "Typeface name": "Symbol", "Dingbat dec": "244", "Dingbat hex": "F4", "Unicode dec": "9134", "Unicode hex": "23AE" },
  { "Typeface name": "Symbol", "Dingbat dec": "245", "Dingbat hex": "F5", "Unicode dec": "8993", "Unicode hex": "2321" },
  { "Typeface name": "Symbol", "Dingbat dec": "246", "Dingbat hex": "F6", "Unicode dec": "9118", "Unicode hex": "239E" },
  { "Typeface name": "Symbol", "Dingbat dec": "247", "Dingbat hex": "F7", "Unicode dec": "9119", "Unicode hex": "239F" },
  { "Typeface name": "Symbol", "Dingbat dec": "248", "Dingbat hex": "F8", "Unicode dec": "9120", "Unicode hex": "23A0" },
  { "Typeface name": "Symbol", "Dingbat dec": "249", "Dingbat hex": "F9", "Unicode dec": "9124", "Unicode hex": "23A4" },
  { "Typeface name": "Symbol", "Dingbat dec": "250", "Dingbat hex": "FA", "Unicode dec": "9125", "Unicode hex": "23A5" },
  { "Typeface name": "Symbol", "Dingbat dec": "251", "Dingbat hex": "FB", "Unicode dec": "9126", "Unicode hex": "23A6" },
  { "Typeface name": "Symbol", "Dingbat dec": "252", "Dingbat hex": "FC", "Unicode dec": "9131", "Unicode hex": "23AB" },
  { "Typeface name": "Symbol", "Dingbat dec": "253", "Dingbat hex": "FD", "Unicode dec": "9132", "Unicode hex": "23AC" },
  { "Typeface name": "Symbol", "Dingbat dec": "254", "Dingbat hex": "FE", "Unicode dec": "9133", "Unicode hex": "23AD" },
  { "Typeface name": "Webdings", "Dingbat dec": "32", "Dingbat hex": "20", "Unicode dec": "32", "Unicode hex": "20" },
  { "Typeface name": "Webdings", "Dingbat dec": "33", "Dingbat hex": "21", "Unicode dec": "128375", "Unicode hex": "1F577" },
  { "Typeface name": "Webdings", "Dingbat dec": "34", "Dingbat hex": "22", "Unicode dec": "128376", "Unicode hex": "1F578" },
  { "Typeface name": "Webdings", "Dingbat dec": "35", "Dingbat hex": "23", "Unicode dec": "128370", "Unicode hex": "1F572" },
  { "Typeface name": "Webdings", "Dingbat dec": "36", "Dingbat hex": "24", "Unicode dec": "128374", "Unicode hex": "1F576" },
  { "Typeface name": "Webdings", "Dingbat dec": "37", "Dingbat hex": "25", "Unicode dec": "127942", "Unicode hex": "1F3C6" },
  { "Typeface name": "Webdings", "Dingbat dec": "38", "Dingbat hex": "26", "Unicode dec": "127894", "Unicode hex": "1F396" },
  { "Typeface name": "Webdings", "Dingbat dec": "39", "Dingbat hex": "27", "Unicode dec": "128391", "Unicode hex": "1F587" },
  { "Typeface name": "Webdings", "Dingbat dec": "40", "Dingbat hex": "28", "Unicode dec": "128488", "Unicode hex": "1F5E8" },
  { "Typeface name": "Webdings", "Dingbat dec": "41", "Dingbat hex": "29", "Unicode dec": "128489", "Unicode hex": "1F5E9" },
  { "Typeface name": "Webdings", "Dingbat dec": "42", "Dingbat hex": "2A", "Unicode dec": "128496", "Unicode hex": "1F5F0" },
  { "Typeface name": "Webdings", "Dingbat dec": "43", "Dingbat hex": "2B", "Unicode dec": "128497", "Unicode hex": "1F5F1" },
  { "Typeface name": "Webdings", "Dingbat dec": "44", "Dingbat hex": "2C", "Unicode dec": "127798", "Unicode hex": "1F336" },
  { "Typeface name": "Webdings", "Dingbat dec": "45", "Dingbat hex": "2D", "Unicode dec": "127895", "Unicode hex": "1F397" },
  { "Typeface name": "Webdings", "Dingbat dec": "46", "Dingbat hex": "2E", "Unicode dec": "128638", "Unicode hex": "1F67E" },
  { "Typeface name": "Webdings", "Dingbat dec": "47", "Dingbat hex": "2F", "Unicode dec": "128636", "Unicode hex": "1F67C" },
  { "Typeface name": "Webdings", "Dingbat dec": "48", "Dingbat hex": "30", "Unicode dec": "128469", "Unicode hex": "1F5D5" },
  { "Typeface name": "Webdings", "Dingbat dec": "49", "Dingbat hex": "31", "Unicode dec": "128470", "Unicode hex": "1F5D6" },
  { "Typeface name": "Webdings", "Dingbat dec": "50", "Dingbat hex": "32", "Unicode dec": "128471", "Unicode hex": "1F5D7" },
  { "Typeface name": "Webdings", "Dingbat dec": "51", "Dingbat hex": "33", "Unicode dec": "9204", "Unicode hex": "23F4" },
  { "Typeface name": "Webdings", "Dingbat dec": "52", "Dingbat hex": "34", "Unicode dec": "9205", "Unicode hex": "23F5" },
  { "Typeface name": "Webdings", "Dingbat dec": "53", "Dingbat hex": "35", "Unicode dec": "9206", "Unicode hex": "23F6" },
  { "Typeface name": "Webdings", "Dingbat dec": "54", "Dingbat hex": "36", "Unicode dec": "9207", "Unicode hex": "23F7" },
  { "Typeface name": "Webdings", "Dingbat dec": "55", "Dingbat hex": "37", "Unicode dec": "9194", "Unicode hex": "23EA" },
  { "Typeface name": "Webdings", "Dingbat dec": "56", "Dingbat hex": "38", "Unicode dec": "9193", "Unicode hex": "23E9" },
  { "Typeface name": "Webdings", "Dingbat dec": "57", "Dingbat hex": "39", "Unicode dec": "9198", "Unicode hex": "23EE" },
  { "Typeface name": "Webdings", "Dingbat dec": "58", "Dingbat hex": "3A", "Unicode dec": "9197", "Unicode hex": "23ED" },
  { "Typeface name": "Webdings", "Dingbat dec": "59", "Dingbat hex": "3B", "Unicode dec": "9208", "Unicode hex": "23F8" },
  { "Typeface name": "Webdings", "Dingbat dec": "60", "Dingbat hex": "3C", "Unicode dec": "9209", "Unicode hex": "23F9" },
  { "Typeface name": "Webdings", "Dingbat dec": "61", "Dingbat hex": "3D", "Unicode dec": "9210", "Unicode hex": "23FA" },
  { "Typeface name": "Webdings", "Dingbat dec": "62", "Dingbat hex": "3E", "Unicode dec": "128474", "Unicode hex": "1F5DA" },
  { "Typeface name": "Webdings", "Dingbat dec": "63", "Dingbat hex": "3F", "Unicode dec": "128499", "Unicode hex": "1F5F3" },
  { "Typeface name": "Webdings", "Dingbat dec": "64", "Dingbat hex": "40", "Unicode dec": "128736", "Unicode hex": "1F6E0" },
  { "Typeface name": "Webdings", "Dingbat dec": "65", "Dingbat hex": "41", "Unicode dec": "127959", "Unicode hex": "1F3D7" },
  { "Typeface name": "Webdings", "Dingbat dec": "66", "Dingbat hex": "42", "Unicode dec": "127960", "Unicode hex": "1F3D8" },
  { "Typeface name": "Webdings", "Dingbat dec": "67", "Dingbat hex": "43", "Unicode dec": "127961", "Unicode hex": "1F3D9" },
  { "Typeface name": "Webdings", "Dingbat dec": "68", "Dingbat hex": "44", "Unicode dec": "127962", "Unicode hex": "1F3DA" },
  { "Typeface name": "Webdings", "Dingbat dec": "69", "Dingbat hex": "45", "Unicode dec": "127964", "Unicode hex": "1F3DC" },
  { "Typeface name": "Webdings", "Dingbat dec": "70", "Dingbat hex": "46", "Unicode dec": "127981", "Unicode hex": "1F3ED" },
  { "Typeface name": "Webdings", "Dingbat dec": "71", "Dingbat hex": "47", "Unicode dec": "127963", "Unicode hex": "1F3DB" },
  { "Typeface name": "Webdings", "Dingbat dec": "72", "Dingbat hex": "48", "Unicode dec": "127968", "Unicode hex": "1F3E0" },
  { "Typeface name": "Webdings", "Dingbat dec": "73", "Dingbat hex": "49", "Unicode dec": "127958", "Unicode hex": "1F3D6" },
  { "Typeface name": "Webdings", "Dingbat dec": "74", "Dingbat hex": "4A", "Unicode dec": "127965", "Unicode hex": "1F3DD" },
  { "Typeface name": "Webdings", "Dingbat dec": "75", "Dingbat hex": "4B", "Unicode dec": "128739", "Unicode hex": "1F6E3" },
  { "Typeface name": "Webdings", "Dingbat dec": "76", "Dingbat hex": "4C", "Unicode dec": "128269", "Unicode hex": "1F50D" },
  { "Typeface name": "Webdings", "Dingbat dec": "77", "Dingbat hex": "4D", "Unicode dec": "127956", "Unicode hex": "1F3D4" },
  { "Typeface name": "Webdings", "Dingbat dec": "78", "Dingbat hex": "4E", "Unicode dec": "128065", "Unicode hex": "1F441" },
  { "Typeface name": "Webdings", "Dingbat dec": "79", "Dingbat hex": "4F", "Unicode dec": "128066", "Unicode hex": "1F442" },
  { "Typeface name": "Webdings", "Dingbat dec": "80", "Dingbat hex": "50", "Unicode dec": "127966", "Unicode hex": "1F3DE" },
  { "Typeface name": "Webdings", "Dingbat dec": "81", "Dingbat hex": "51", "Unicode dec": "127957", "Unicode hex": "1F3D5" },
  { "Typeface name": "Webdings", "Dingbat dec": "82", "Dingbat hex": "52", "Unicode dec": "128740", "Unicode hex": "1F6E4" },
  { "Typeface name": "Webdings", "Dingbat dec": "83", "Dingbat hex": "53", "Unicode dec": "127967", "Unicode hex": "1F3DF" },
  { "Typeface name": "Webdings", "Dingbat dec": "84", "Dingbat hex": "54", "Unicode dec": "128755", "Unicode hex": "1F6F3" },
  { "Typeface name": "Webdings", "Dingbat dec": "85", "Dingbat hex": "55", "Unicode dec": "128364", "Unicode hex": "1F56C" },
  { "Typeface name": "Webdings", "Dingbat dec": "86", "Dingbat hex": "56", "Unicode dec": "128363", "Unicode hex": "1F56B" },
  { "Typeface name": "Webdings", "Dingbat dec": "87", "Dingbat hex": "57", "Unicode dec": "128360", "Unicode hex": "1F568" },
  { "Typeface name": "Webdings", "Dingbat dec": "88", "Dingbat hex": "58", "Unicode dec": "128264", "Unicode hex": "1F508" },
  { "Typeface name": "Webdings", "Dingbat dec": "89", "Dingbat hex": "59", "Unicode dec": "127892", "Unicode hex": "1F394" },
  { "Typeface name": "Webdings", "Dingbat dec": "90", "Dingbat hex": "5A", "Unicode dec": "127893", "Unicode hex": "1F395" },
  { "Typeface name": "Webdings", "Dingbat dec": "91", "Dingbat hex": "5B", "Unicode dec": "128492", "Unicode hex": "1F5EC" },
  { "Typeface name": "Webdings", "Dingbat dec": "92", "Dingbat hex": "5C", "Unicode dec": "128637", "Unicode hex": "1F67D" },
  { "Typeface name": "Webdings", "Dingbat dec": "93", "Dingbat hex": "5D", "Unicode dec": "128493", "Unicode hex": "1F5ED" },
  { "Typeface name": "Webdings", "Dingbat dec": "94", "Dingbat hex": "5E", "Unicode dec": "128490", "Unicode hex": "1F5EA" },
  { "Typeface name": "Webdings", "Dingbat dec": "95", "Dingbat hex": "5F", "Unicode dec": "128491", "Unicode hex": "1F5EB" },
  { "Typeface name": "Webdings", "Dingbat dec": "96", "Dingbat hex": "60", "Unicode dec": "11156", "Unicode hex": "2B94" },
  { "Typeface name": "Webdings", "Dingbat dec": "97", "Dingbat hex": "61", "Unicode dec": "10004", "Unicode hex": "2714" },
  { "Typeface name": "Webdings", "Dingbat dec": "98", "Dingbat hex": "62", "Unicode dec": "128690", "Unicode hex": "1F6B2" },
  { "Typeface name": "Webdings", "Dingbat dec": "99", "Dingbat hex": "63", "Unicode dec": "11036", "Unicode hex": "2B1C" },
  { "Typeface name": "Webdings", "Dingbat dec": "100", "Dingbat hex": "64", "Unicode dec": "128737", "Unicode hex": "1F6E1" },
  { "Typeface name": "Webdings", "Dingbat dec": "101", "Dingbat hex": "65", "Unicode dec": "128230", "Unicode hex": "1F4E6" },
  { "Typeface name": "Webdings", "Dingbat dec": "102", "Dingbat hex": "66", "Unicode dec": "128753", "Unicode hex": "1F6F1" },
  { "Typeface name": "Webdings", "Dingbat dec": "103", "Dingbat hex": "67", "Unicode dec": "11035", "Unicode hex": "2B1B" },
  { "Typeface name": "Webdings", "Dingbat dec": "104", "Dingbat hex": "68", "Unicode dec": "128657", "Unicode hex": "1F691" },
  { "Typeface name": "Webdings", "Dingbat dec": "105", "Dingbat hex": "69", "Unicode dec": "128712", "Unicode hex": "1F6C8" },
  { "Typeface name": "Webdings", "Dingbat dec": "106", "Dingbat hex": "6A", "Unicode dec": "128745", "Unicode hex": "1F6E9" },
  { "Typeface name": "Webdings", "Dingbat dec": "107", "Dingbat hex": "6B", "Unicode dec": "128752", "Unicode hex": "1F6F0" },
  { "Typeface name": "Webdings", "Dingbat dec": "108", "Dingbat hex": "6C", "Unicode dec": "128968", "Unicode hex": "1F7C8" },
  { "Typeface name": "Webdings", "Dingbat dec": "109", "Dingbat hex": "6D", "Unicode dec": "128372", "Unicode hex": "1F574" },
  { "Typeface name": "Webdings", "Dingbat dec": "110", "Dingbat hex": "6E", "Unicode dec": "11044", "Unicode hex": "2B24" },
  { "Typeface name": "Webdings", "Dingbat dec": "111", "Dingbat hex": "6F", "Unicode dec": "128741", "Unicode hex": "1F6E5" },
  { "Typeface name": "Webdings", "Dingbat dec": "112", "Dingbat hex": "70", "Unicode dec": "128660", "Unicode hex": "1F694" },
  { "Typeface name": "Webdings", "Dingbat dec": "113", "Dingbat hex": "71", "Unicode dec": "128472", "Unicode hex": "1F5D8" },
  { "Typeface name": "Webdings", "Dingbat dec": "114", "Dingbat hex": "72", "Unicode dec": "128473", "Unicode hex": "1F5D9" },
  { "Typeface name": "Webdings", "Dingbat dec": "115", "Dingbat hex": "73", "Unicode dec": "10067", "Unicode hex": "2753" },
  { "Typeface name": "Webdings", "Dingbat dec": "116", "Dingbat hex": "74", "Unicode dec": "128754", "Unicode hex": "1F6F2" },
  { "Typeface name": "Webdings", "Dingbat dec": "117", "Dingbat hex": "75", "Unicode dec": "128647", "Unicode hex": "1F687" },
  { "Typeface name": "Webdings", "Dingbat dec": "118", "Dingbat hex": "76", "Unicode dec": "128653", "Unicode hex": "1F68D" },
  { "Typeface name": "Webdings", "Dingbat dec": "119", "Dingbat hex": "77", "Unicode dec": "9971", "Unicode hex": "26F3" },
  { "Typeface name": "Webdings", "Dingbat dec": "120", "Dingbat hex": "78", "Unicode dec": "10680", "Unicode hex": "29B8" },
  { "Typeface name": "Webdings", "Dingbat dec": "121", "Dingbat hex": "79", "Unicode dec": "8854", "Unicode hex": "2296" },
  { "Typeface name": "Webdings", "Dingbat dec": "122", "Dingbat hex": "7A", "Unicode dec": "128685", "Unicode hex": "1F6AD" },
  { "Typeface name": "Webdings", "Dingbat dec": "123", "Dingbat hex": "7B", "Unicode dec": "128494", "Unicode hex": "1F5EE" },
  { "Typeface name": "Webdings", "Dingbat dec": "124", "Dingbat hex": "7C", "Unicode dec": "9168", "Unicode hex": "23D0" },
  { "Typeface name": "Webdings", "Dingbat dec": "125", "Dingbat hex": "7D", "Unicode dec": "128495", "Unicode hex": "1F5EF" },
  { "Typeface name": "Webdings", "Dingbat dec": "126", "Dingbat hex": "7E", "Unicode dec": "128498", "Unicode hex": "1F5F2" },
  { "Typeface name": "Webdings", "Dingbat dec": "128", "Dingbat hex": "80", "Unicode dec": "128697", "Unicode hex": "1F6B9" },
  { "Typeface name": "Webdings", "Dingbat dec": "129", "Dingbat hex": "81", "Unicode dec": "128698", "Unicode hex": "1F6BA" },
  { "Typeface name": "Webdings", "Dingbat dec": "130", "Dingbat hex": "82", "Unicode dec": "128713", "Unicode hex": "1F6C9" },
  { "Typeface name": "Webdings", "Dingbat dec": "131", "Dingbat hex": "83", "Unicode dec": "128714", "Unicode hex": "1F6CA" },
  { "Typeface name": "Webdings", "Dingbat dec": "132", "Dingbat hex": "84", "Unicode dec": "128700", "Unicode hex": "1F6BC" },
  { "Typeface name": "Webdings", "Dingbat dec": "133", "Dingbat hex": "85", "Unicode dec": "128125", "Unicode hex": "1F47D" },
  { "Typeface name": "Webdings", "Dingbat dec": "134", "Dingbat hex": "86", "Unicode dec": "127947", "Unicode hex": "1F3CB" },
  { "Typeface name": "Webdings", "Dingbat dec": "135", "Dingbat hex": "87", "Unicode dec": "9975", "Unicode hex": "26F7" },
  { "Typeface name": "Webdings", "Dingbat dec": "136", "Dingbat hex": "88", "Unicode dec": "127938", "Unicode hex": "1F3C2" },
  { "Typeface name": "Webdings", "Dingbat dec": "137", "Dingbat hex": "89", "Unicode dec": "127948", "Unicode hex": "1F3CC" },
  { "Typeface name": "Webdings", "Dingbat dec": "138", "Dingbat hex": "8A", "Unicode dec": "127946", "Unicode hex": "1F3CA" },
  { "Typeface name": "Webdings", "Dingbat dec": "139", "Dingbat hex": "8B", "Unicode dec": "127940", "Unicode hex": "1F3C4" },
  { "Typeface name": "Webdings", "Dingbat dec": "140", "Dingbat hex": "8C", "Unicode dec": "127949", "Unicode hex": "1F3CD" },
  { "Typeface name": "Webdings", "Dingbat dec": "141", "Dingbat hex": "8D", "Unicode dec": "127950", "Unicode hex": "1F3CE" },
  { "Typeface name": "Webdings", "Dingbat dec": "142", "Dingbat hex": "8E", "Unicode dec": "128664", "Unicode hex": "1F698" },
  { "Typeface name": "Webdings", "Dingbat dec": "143", "Dingbat hex": "8F", "Unicode dec": "128480", "Unicode hex": "1F5E0" },
  { "Typeface name": "Webdings", "Dingbat dec": "144", "Dingbat hex": "90", "Unicode dec": "128738", "Unicode hex": "1F6E2" },
  { "Typeface name": "Webdings", "Dingbat dec": "145", "Dingbat hex": "91", "Unicode dec": "128176", "Unicode hex": "1F4B0" },
  { "Typeface name": "Webdings", "Dingbat dec": "146", "Dingbat hex": "92", "Unicode dec": "127991", "Unicode hex": "1F3F7" },
  { "Typeface name": "Webdings", "Dingbat dec": "147", "Dingbat hex": "93", "Unicode dec": "128179", "Unicode hex": "1F4B3" },
  { "Typeface name": "Webdings", "Dingbat dec": "148", "Dingbat hex": "94", "Unicode dec": "128106", "Unicode hex": "1F46A" },
  { "Typeface name": "Webdings", "Dingbat dec": "149", "Dingbat hex": "95", "Unicode dec": "128481", "Unicode hex": "1F5E1" },
  { "Typeface name": "Webdings", "Dingbat dec": "150", "Dingbat hex": "96", "Unicode dec": "128482", "Unicode hex": "1F5E2" },
  { "Typeface name": "Webdings", "Dingbat dec": "151", "Dingbat hex": "97", "Unicode dec": "128483", "Unicode hex": "1F5E3" },
  { "Typeface name": "Webdings", "Dingbat dec": "152", "Dingbat hex": "98", "Unicode dec": "10031", "Unicode hex": "272F" },
  { "Typeface name": "Webdings", "Dingbat dec": "153", "Dingbat hex": "99", "Unicode dec": "128388", "Unicode hex": "1F584" },
  { "Typeface name": "Webdings", "Dingbat dec": "154", "Dingbat hex": "9A", "Unicode dec": "128389", "Unicode hex": "1F585" },
  { "Typeface name": "Webdings", "Dingbat dec": "155", "Dingbat hex": "9B", "Unicode dec": "128387", "Unicode hex": "1F583" },
  { "Typeface name": "Webdings", "Dingbat dec": "156", "Dingbat hex": "9C", "Unicode dec": "128390", "Unicode hex": "1F586" },
  { "Typeface name": "Webdings", "Dingbat dec": "157", "Dingbat hex": "9D", "Unicode dec": "128441", "Unicode hex": "1F5B9" },
  { "Typeface name": "Webdings", "Dingbat dec": "158", "Dingbat hex": "9E", "Unicode dec": "128442", "Unicode hex": "1F5BA" },
  { "Typeface name": "Webdings", "Dingbat dec": "159", "Dingbat hex": "9F", "Unicode dec": "128443", "Unicode hex": "1F5BB" },
  { "Typeface name": "Webdings", "Dingbat dec": "160", "Dingbat hex": "A0", "Unicode dec": "128373", "Unicode hex": "1F575" },
  { "Typeface name": "Webdings", "Dingbat dec": "161", "Dingbat hex": "A1", "Unicode dec": "128368", "Unicode hex": "1F570" },
  { "Typeface name": "Webdings", "Dingbat dec": "162", "Dingbat hex": "A2", "Unicode dec": "128445", "Unicode hex": "1F5BD" },
  { "Typeface name": "Webdings", "Dingbat dec": "163", "Dingbat hex": "A3", "Unicode dec": "128446", "Unicode hex": "1F5BE" },
  { "Typeface name": "Webdings", "Dingbat dec": "164", "Dingbat hex": "A4", "Unicode dec": "128203", "Unicode hex": "1F4CB" },
  { "Typeface name": "Webdings", "Dingbat dec": "165", "Dingbat hex": "A5", "Unicode dec": "128466", "Unicode hex": "1F5D2" },
  { "Typeface name": "Webdings", "Dingbat dec": "166", "Dingbat hex": "A6", "Unicode dec": "128467", "Unicode hex": "1F5D3" },
  { "Typeface name": "Webdings", "Dingbat dec": "167", "Dingbat hex": "A7", "Unicode dec": "128366", "Unicode hex": "1F56E" },
  { "Typeface name": "Webdings", "Dingbat dec": "168", "Dingbat hex": "A8", "Unicode dec": "128218", "Unicode hex": "1F4DA" },
  { "Typeface name": "Webdings", "Dingbat dec": "169", "Dingbat hex": "A9", "Unicode dec": "128478", "Unicode hex": "1F5DE" },
  { "Typeface name": "Webdings", "Dingbat dec": "170", "Dingbat hex": "AA", "Unicode dec": "128479", "Unicode hex": "1F5DF" },
  { "Typeface name": "Webdings", "Dingbat dec": "171", "Dingbat hex": "AB", "Unicode dec": "128451", "Unicode hex": "1F5C3" },
  { "Typeface name": "Webdings", "Dingbat dec": "172", "Dingbat hex": "AC", "Unicode dec": "128450", "Unicode hex": "1F5C2" },
  { "Typeface name": "Webdings", "Dingbat dec": "173", "Dingbat hex": "AD", "Unicode dec": "128444", "Unicode hex": "1F5BC" },
  { "Typeface name": "Webdings", "Dingbat dec": "174", "Dingbat hex": "AE", "Unicode dec": "127917", "Unicode hex": "1F3AD" },
  { "Typeface name": "Webdings", "Dingbat dec": "175", "Dingbat hex": "AF", "Unicode dec": "127900", "Unicode hex": "1F39C" },
  { "Typeface name": "Webdings", "Dingbat dec": "176", "Dingbat hex": "B0", "Unicode dec": "127896", "Unicode hex": "1F398" },
  { "Typeface name": "Webdings", "Dingbat dec": "177", "Dingbat hex": "B1", "Unicode dec": "127897", "Unicode hex": "1F399" },
  { "Typeface name": "Webdings", "Dingbat dec": "178", "Dingbat hex": "B2", "Unicode dec": "127911", "Unicode hex": "1F3A7" },
  { "Typeface name": "Webdings", "Dingbat dec": "179", "Dingbat hex": "B3", "Unicode dec": "128191", "Unicode hex": "1F4BF" },
  { "Typeface name": "Webdings", "Dingbat dec": "180", "Dingbat hex": "B4", "Unicode dec": "127902", "Unicode hex": "1F39E" },
  { "Typeface name": "Webdings", "Dingbat dec": "181", "Dingbat hex": "B5", "Unicode dec": "128247", "Unicode hex": "1F4F7" },
  { "Typeface name": "Webdings", "Dingbat dec": "182", "Dingbat hex": "B6", "Unicode dec": "127903", "Unicode hex": "1F39F" },
  { "Typeface name": "Webdings", "Dingbat dec": "183", "Dingbat hex": "B7", "Unicode dec": "127916", "Unicode hex": "1F3AC" },
  { "Typeface name": "Webdings", "Dingbat dec": "184", "Dingbat hex": "B8", "Unicode dec": "128253", "Unicode hex": "1F4FD" },
  { "Typeface name": "Webdings", "Dingbat dec": "185", "Dingbat hex": "B9", "Unicode dec": "128249", "Unicode hex": "1F4F9" },
  { "Typeface name": "Webdings", "Dingbat dec": "186", "Dingbat hex": "BA", "Unicode dec": "128254", "Unicode hex": "1F4FE" },
  { "Typeface name": "Webdings", "Dingbat dec": "187", "Dingbat hex": "BB", "Unicode dec": "128251", "Unicode hex": "1F4FB" },
  { "Typeface name": "Webdings", "Dingbat dec": "188", "Dingbat hex": "BC", "Unicode dec": "127898", "Unicode hex": "1F39A" },
  { "Typeface name": "Webdings", "Dingbat dec": "189", "Dingbat hex": "BD", "Unicode dec": "127899", "Unicode hex": "1F39B" },
  { "Typeface name": "Webdings", "Dingbat dec": "190", "Dingbat hex": "BE", "Unicode dec": "128250", "Unicode hex": "1F4FA" },
  { "Typeface name": "Webdings", "Dingbat dec": "191", "Dingbat hex": "BF", "Unicode dec": "128187", "Unicode hex": "1F4BB" },
  { "Typeface name": "Webdings", "Dingbat dec": "192", "Dingbat hex": "C0", "Unicode dec": "128421", "Unicode hex": "1F5A5" },
  { "Typeface name": "Webdings", "Dingbat dec": "193", "Dingbat hex": "C1", "Unicode dec": "128422", "Unicode hex": "1F5A6" },
  { "Typeface name": "Webdings", "Dingbat dec": "194", "Dingbat hex": "C2", "Unicode dec": "128423", "Unicode hex": "1F5A7" },
  { "Typeface name": "Webdings", "Dingbat dec": "195", "Dingbat hex": "C3", "Unicode dec": "128377", "Unicode hex": "1F579" },
  { "Typeface name": "Webdings", "Dingbat dec": "196", "Dingbat hex": "C4", "Unicode dec": "127918", "Unicode hex": "1F3AE" },
  { "Typeface name": "Webdings", "Dingbat dec": "197", "Dingbat hex": "C5", "Unicode dec": "128379", "Unicode hex": "1F57B" },
  { "Typeface name": "Webdings", "Dingbat dec": "198", "Dingbat hex": "C6", "Unicode dec": "128380", "Unicode hex": "1F57C" },
  { "Typeface name": "Webdings", "Dingbat dec": "199", "Dingbat hex": "C7", "Unicode dec": "128223", "Unicode hex": "1F4DF" },
  { "Typeface name": "Webdings", "Dingbat dec": "200", "Dingbat hex": "C8", "Unicode dec": "128385", "Unicode hex": "1F581" },
  { "Typeface name": "Webdings", "Dingbat dec": "201", "Dingbat hex": "C9", "Unicode dec": "128384", "Unicode hex": "1F580" },
  { "Typeface name": "Webdings", "Dingbat dec": "202", "Dingbat hex": "CA", "Unicode dec": "128424", "Unicode hex": "1F5A8" },
  { "Typeface name": "Webdings", "Dingbat dec": "203", "Dingbat hex": "CB", "Unicode dec": "128425", "Unicode hex": "1F5A9" },
  { "Typeface name": "Webdings", "Dingbat dec": "204", "Dingbat hex": "CC", "Unicode dec": "128447", "Unicode hex": "1F5BF" },
  { "Typeface name": "Webdings", "Dingbat dec": "205", "Dingbat hex": "CD", "Unicode dec": "128426", "Unicode hex": "1F5AA" },
  { "Typeface name": "Webdings", "Dingbat dec": "206", "Dingbat hex": "CE", "Unicode dec": "128476", "Unicode hex": "1F5DC" },
  { "Typeface name": "Webdings", "Dingbat dec": "207", "Dingbat hex": "CF", "Unicode dec": "128274", "Unicode hex": "1F512" },
  { "Typeface name": "Webdings", "Dingbat dec": "208", "Dingbat hex": "D0", "Unicode dec": "128275", "Unicode hex": "1F513" },
  { "Typeface name": "Webdings", "Dingbat dec": "209", "Dingbat hex": "D1", "Unicode dec": "128477", "Unicode hex": "1F5DD" },
  { "Typeface name": "Webdings", "Dingbat dec": "210", "Dingbat hex": "D2", "Unicode dec": "128229", "Unicode hex": "1F4E5" },
  { "Typeface name": "Webdings", "Dingbat dec": "211", "Dingbat hex": "D3", "Unicode dec": "128228", "Unicode hex": "1F4E4" },
  { "Typeface name": "Webdings", "Dingbat dec": "212", "Dingbat hex": "D4", "Unicode dec": "128371", "Unicode hex": "1F573" },
  { "Typeface name": "Webdings", "Dingbat dec": "213", "Dingbat hex": "D5", "Unicode dec": "127779", "Unicode hex": "1F323" },
  { "Typeface name": "Webdings", "Dingbat dec": "214", "Dingbat hex": "D6", "Unicode dec": "127780", "Unicode hex": "1F324" },
  { "Typeface name": "Webdings", "Dingbat dec": "215", "Dingbat hex": "D7", "Unicode dec": "127781", "Unicode hex": "1F325" },
  { "Typeface name": "Webdings", "Dingbat dec": "216", "Dingbat hex": "D8", "Unicode dec": "127782", "Unicode hex": "1F326" },
  { "Typeface name": "Webdings", "Dingbat dec": "217", "Dingbat hex": "D9", "Unicode dec": "9729", "Unicode hex": "2601" },
  { "Typeface name": "Webdings", "Dingbat dec": "218", "Dingbat hex": "DA", "Unicode dec": "127784", "Unicode hex": "1F328" },
  { "Typeface name": "Webdings", "Dingbat dec": "219", "Dingbat hex": "DB", "Unicode dec": "127783", "Unicode hex": "1F327" },
  { "Typeface name": "Webdings", "Dingbat dec": "220", "Dingbat hex": "DC", "Unicode dec": "127785", "Unicode hex": "1F329" },
  { "Typeface name": "Webdings", "Dingbat dec": "221", "Dingbat hex": "DD", "Unicode dec": "127786", "Unicode hex": "1F32A" },
  { "Typeface name": "Webdings", "Dingbat dec": "222", "Dingbat hex": "DE", "Unicode dec": "127788", "Unicode hex": "1F32C" },
  { "Typeface name": "Webdings", "Dingbat dec": "223", "Dingbat hex": "DF", "Unicode dec": "127787", "Unicode hex": "1F32B" },
  { "Typeface name": "Webdings", "Dingbat dec": "224", "Dingbat hex": "E0", "Unicode dec": "127772", "Unicode hex": "1F31C" },
  { "Typeface name": "Webdings", "Dingbat dec": "225", "Dingbat hex": "E1", "Unicode dec": "127777", "Unicode hex": "1F321" },
  { "Typeface name": "Webdings", "Dingbat dec": "226", "Dingbat hex": "E2", "Unicode dec": "128715", "Unicode hex": "1F6CB" },
  { "Typeface name": "Webdings", "Dingbat dec": "227", "Dingbat hex": "E3", "Unicode dec": "128719", "Unicode hex": "1F6CF" },
  { "Typeface name": "Webdings", "Dingbat dec": "228", "Dingbat hex": "E4", "Unicode dec": "127869", "Unicode hex": "1F37D" },
  { "Typeface name": "Webdings", "Dingbat dec": "229", "Dingbat hex": "E5", "Unicode dec": "127864", "Unicode hex": "1F378" },
  { "Typeface name": "Webdings", "Dingbat dec": "230", "Dingbat hex": "E6", "Unicode dec": "128718", "Unicode hex": "1F6CE" },
  { "Typeface name": "Webdings", "Dingbat dec": "231", "Dingbat hex": "E7", "Unicode dec": "128717", "Unicode hex": "1F6CD" },
  { "Typeface name": "Webdings", "Dingbat dec": "232", "Dingbat hex": "E8", "Unicode dec": "9413", "Unicode hex": "24C5" },
  { "Typeface name": "Webdings", "Dingbat dec": "233", "Dingbat hex": "E9", "Unicode dec": "9855", "Unicode hex": "267F" },
  { "Typeface name": "Webdings", "Dingbat dec": "234", "Dingbat hex": "EA", "Unicode dec": "128710", "Unicode hex": "1F6C6" },
  { "Typeface name": "Webdings", "Dingbat dec": "235", "Dingbat hex": "EB", "Unicode dec": "128392", "Unicode hex": "1F588" },
  { "Typeface name": "Webdings", "Dingbat dec": "236", "Dingbat hex": "EC", "Unicode dec": "127891", "Unicode hex": "1F393" },
  { "Typeface name": "Webdings", "Dingbat dec": "237", "Dingbat hex": "ED", "Unicode dec": "128484", "Unicode hex": "1F5E4" },
  { "Typeface name": "Webdings", "Dingbat dec": "238", "Dingbat hex": "EE", "Unicode dec": "128485", "Unicode hex": "1F5E5" },
  { "Typeface name": "Webdings", "Dingbat dec": "239", "Dingbat hex": "EF", "Unicode dec": "128486", "Unicode hex": "1F5E6" },
  { "Typeface name": "Webdings", "Dingbat dec": "240", "Dingbat hex": "F0", "Unicode dec": "128487", "Unicode hex": "1F5E7" },
  { "Typeface name": "Webdings", "Dingbat dec": "241", "Dingbat hex": "F1", "Unicode dec": "128746", "Unicode hex": "1F6EA" },
  { "Typeface name": "Webdings", "Dingbat dec": "242", "Dingbat hex": "F2", "Unicode dec": "128063", "Unicode hex": "1F43F" },
  { "Typeface name": "Webdings", "Dingbat dec": "243", "Dingbat hex": "F3", "Unicode dec": "128038", "Unicode hex": "1F426" },
  { "Typeface name": "Webdings", "Dingbat dec": "244", "Dingbat hex": "F4", "Unicode dec": "128031", "Unicode hex": "1F41F" },
  { "Typeface name": "Webdings", "Dingbat dec": "245", "Dingbat hex": "F5", "Unicode dec": "128021", "Unicode hex": "1F415" },
  { "Typeface name": "Webdings", "Dingbat dec": "246", "Dingbat hex": "F6", "Unicode dec": "128008", "Unicode hex": "1F408" },
  { "Typeface name": "Webdings", "Dingbat dec": "247", "Dingbat hex": "F7", "Unicode dec": "128620", "Unicode hex": "1F66C" },
  { "Typeface name": "Webdings", "Dingbat dec": "248", "Dingbat hex": "F8", "Unicode dec": "128622", "Unicode hex": "1F66E" },
  { "Typeface name": "Webdings", "Dingbat dec": "249", "Dingbat hex": "F9", "Unicode dec": "128621", "Unicode hex": "1F66D" },
  { "Typeface name": "Webdings", "Dingbat dec": "250", "Dingbat hex": "FA", "Unicode dec": "128623", "Unicode hex": "1F66F" },
  { "Typeface name": "Webdings", "Dingbat dec": "251", "Dingbat hex": "FB", "Unicode dec": "128506", "Unicode hex": "1F5FA" },
  { "Typeface name": "Webdings", "Dingbat dec": "252", "Dingbat hex": "FC", "Unicode dec": "127757", "Unicode hex": "1F30D" },
  { "Typeface name": "Webdings", "Dingbat dec": "253", "Dingbat hex": "FD", "Unicode dec": "127759", "Unicode hex": "1F30F" },
  { "Typeface name": "Webdings", "Dingbat dec": "254", "Dingbat hex": "FE", "Unicode dec": "127758", "Unicode hex": "1F30E" },
  { "Typeface name": "Webdings", "Dingbat dec": "255", "Dingbat hex": "FF", "Unicode dec": "128330", "Unicode hex": "1F54A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "32", "Dingbat hex": "20", "Unicode dec": "32", "Unicode hex": "20" },
  { "Typeface name": "Wingdings", "Dingbat dec": "33", "Dingbat hex": "21", "Unicode dec": "128393", "Unicode hex": "1F589" },
  { "Typeface name": "Wingdings", "Dingbat dec": "34", "Dingbat hex": "22", "Unicode dec": "9986", "Unicode hex": "2702" },
  { "Typeface name": "Wingdings", "Dingbat dec": "35", "Dingbat hex": "23", "Unicode dec": "9985", "Unicode hex": "2701" },
  { "Typeface name": "Wingdings", "Dingbat dec": "36", "Dingbat hex": "24", "Unicode dec": "128083", "Unicode hex": "1F453" },
  { "Typeface name": "Wingdings", "Dingbat dec": "37", "Dingbat hex": "25", "Unicode dec": "128365", "Unicode hex": "1F56D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "38", "Dingbat hex": "26", "Unicode dec": "128366", "Unicode hex": "1F56E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "39", "Dingbat hex": "27", "Unicode dec": "128367", "Unicode hex": "1F56F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "40", "Dingbat hex": "28", "Unicode dec": "128383", "Unicode hex": "1F57F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "41", "Dingbat hex": "29", "Unicode dec": "9990", "Unicode hex": "2706" },
  { "Typeface name": "Wingdings", "Dingbat dec": "42", "Dingbat hex": "2A", "Unicode dec": "128386", "Unicode hex": "1F582" },
  { "Typeface name": "Wingdings", "Dingbat dec": "43", "Dingbat hex": "2B", "Unicode dec": "128387", "Unicode hex": "1F583" },
  { "Typeface name": "Wingdings", "Dingbat dec": "44", "Dingbat hex": "2C", "Unicode dec": "128234", "Unicode hex": "1F4EA" },
  { "Typeface name": "Wingdings", "Dingbat dec": "45", "Dingbat hex": "2D", "Unicode dec": "128235", "Unicode hex": "1F4EB" },
  { "Typeface name": "Wingdings", "Dingbat dec": "46", "Dingbat hex": "2E", "Unicode dec": "128236", "Unicode hex": "1F4EC" },
  { "Typeface name": "Wingdings", "Dingbat dec": "47", "Dingbat hex": "2F", "Unicode dec": "128237", "Unicode hex": "1F4ED" },
  { "Typeface name": "Wingdings", "Dingbat dec": "48", "Dingbat hex": "30", "Unicode dec": "128448", "Unicode hex": "1F5C0" },
  { "Typeface name": "Wingdings", "Dingbat dec": "49", "Dingbat hex": "31", "Unicode dec": "128449", "Unicode hex": "1F5C1" },
  { "Typeface name": "Wingdings", "Dingbat dec": "50", "Dingbat hex": "32", "Unicode dec": "128462", "Unicode hex": "1F5CE" },
  { "Typeface name": "Wingdings", "Dingbat dec": "51", "Dingbat hex": "33", "Unicode dec": "128463", "Unicode hex": "1F5CF" },
  { "Typeface name": "Wingdings", "Dingbat dec": "52", "Dingbat hex": "34", "Unicode dec": "128464", "Unicode hex": "1F5D0" },
  { "Typeface name": "Wingdings", "Dingbat dec": "53", "Dingbat hex": "35", "Unicode dec": "128452", "Unicode hex": "1F5C4" },
  { "Typeface name": "Wingdings", "Dingbat dec": "54", "Dingbat hex": "36", "Unicode dec": "8987", "Unicode hex": "231B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "55", "Dingbat hex": "37", "Unicode dec": "128430", "Unicode hex": "1F5AE" },
  { "Typeface name": "Wingdings", "Dingbat dec": "56", "Dingbat hex": "38", "Unicode dec": "128432", "Unicode hex": "1F5B0" },
  { "Typeface name": "Wingdings", "Dingbat dec": "57", "Dingbat hex": "39", "Unicode dec": "128434", "Unicode hex": "1F5B2" },
  { "Typeface name": "Wingdings", "Dingbat dec": "58", "Dingbat hex": "3A", "Unicode dec": "128435", "Unicode hex": "1F5B3" },
  { "Typeface name": "Wingdings", "Dingbat dec": "59", "Dingbat hex": "3B", "Unicode dec": "128436", "Unicode hex": "1F5B4" },
  { "Typeface name": "Wingdings", "Dingbat dec": "60", "Dingbat hex": "3C", "Unicode dec": "128427", "Unicode hex": "1F5AB" },
  { "Typeface name": "Wingdings", "Dingbat dec": "61", "Dingbat hex": "3D", "Unicode dec": "128428", "Unicode hex": "1F5AC" },
  { "Typeface name": "Wingdings", "Dingbat dec": "62", "Dingbat hex": "3E", "Unicode dec": "9991", "Unicode hex": "2707" },
  { "Typeface name": "Wingdings", "Dingbat dec": "63", "Dingbat hex": "3F", "Unicode dec": "9997", "Unicode hex": "270D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "64", "Dingbat hex": "40", "Unicode dec": "128398", "Unicode hex": "1F58E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "65", "Dingbat hex": "41", "Unicode dec": "9996", "Unicode hex": "270C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "66", "Dingbat hex": "42", "Unicode dec": "128399", "Unicode hex": "1F58F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "67", "Dingbat hex": "43", "Unicode dec": "128077", "Unicode hex": "1F44D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "68", "Dingbat hex": "44", "Unicode dec": "128078", "Unicode hex": "1F44E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "69", "Dingbat hex": "45", "Unicode dec": "9756", "Unicode hex": "261C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "70", "Dingbat hex": "46", "Unicode dec": "9758", "Unicode hex": "261E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "71", "Dingbat hex": "47", "Unicode dec": "9757", "Unicode hex": "261D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "72", "Dingbat hex": "48", "Unicode dec": "9759", "Unicode hex": "261F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "73", "Dingbat hex": "49", "Unicode dec": "128400", "Unicode hex": "1F590" },
  { "Typeface name": "Wingdings", "Dingbat dec": "74", "Dingbat hex": "4A", "Unicode dec": "9786", "Unicode hex": "263A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "75", "Dingbat hex": "4B", "Unicode dec": "128528", "Unicode hex": "1F610" },
  { "Typeface name": "Wingdings", "Dingbat dec": "76", "Dingbat hex": "4C", "Unicode dec": "9785", "Unicode hex": "2639" },
  { "Typeface name": "Wingdings", "Dingbat dec": "77", "Dingbat hex": "4D", "Unicode dec": "128163", "Unicode hex": "1F4A3" },
  { "Typeface name": "Wingdings", "Dingbat dec": "78", "Dingbat hex": "4E", "Unicode dec": "128369", "Unicode hex": "1F571" },
  { "Typeface name": "Wingdings", "Dingbat dec": "79", "Dingbat hex": "4F", "Unicode dec": "127987", "Unicode hex": "1F3F3" },
  { "Typeface name": "Wingdings", "Dingbat dec": "80", "Dingbat hex": "50", "Unicode dec": "127985", "Unicode hex": "1F3F1" },
  { "Typeface name": "Wingdings", "Dingbat dec": "81", "Dingbat hex": "51", "Unicode dec": "9992", "Unicode hex": "2708" },
  { "Typeface name": "Wingdings", "Dingbat dec": "82", "Dingbat hex": "52", "Unicode dec": "9788", "Unicode hex": "263C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "83", "Dingbat hex": "53", "Unicode dec": "127778", "Unicode hex": "1F322" },
  { "Typeface name": "Wingdings", "Dingbat dec": "84", "Dingbat hex": "54", "Unicode dec": "10052", "Unicode hex": "2744" },
  { "Typeface name": "Wingdings", "Dingbat dec": "85", "Dingbat hex": "55", "Unicode dec": "128326", "Unicode hex": "1F546" },
  { "Typeface name": "Wingdings", "Dingbat dec": "86", "Dingbat hex": "56", "Unicode dec": "10014", "Unicode hex": "271E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "87", "Dingbat hex": "57", "Unicode dec": "128328", "Unicode hex": "1F548" },
  { "Typeface name": "Wingdings", "Dingbat dec": "88", "Dingbat hex": "58", "Unicode dec": "10016", "Unicode hex": "2720" },
  { "Typeface name": "Wingdings", "Dingbat dec": "89", "Dingbat hex": "59", "Unicode dec": "10017", "Unicode hex": "2721" },
  { "Typeface name": "Wingdings", "Dingbat dec": "90", "Dingbat hex": "5A", "Unicode dec": "9770", "Unicode hex": "262A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "91", "Dingbat hex": "5B", "Unicode dec": "9775", "Unicode hex": "262F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "92", "Dingbat hex": "5C", "Unicode dec": "128329", "Unicode hex": "1F549" },
  { "Typeface name": "Wingdings", "Dingbat dec": "93", "Dingbat hex": "5D", "Unicode dec": "9784", "Unicode hex": "2638" },
  { "Typeface name": "Wingdings", "Dingbat dec": "94", "Dingbat hex": "5E", "Unicode dec": "9800", "Unicode hex": "2648" },
  { "Typeface name": "Wingdings", "Dingbat dec": "95", "Dingbat hex": "5F", "Unicode dec": "9801", "Unicode hex": "2649" },
  { "Typeface name": "Wingdings", "Dingbat dec": "96", "Dingbat hex": "60", "Unicode dec": "9802", "Unicode hex": "264A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "97", "Dingbat hex": "61", "Unicode dec": "9803", "Unicode hex": "264B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "98", "Dingbat hex": "62", "Unicode dec": "9804", "Unicode hex": "264C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "99", "Dingbat hex": "63", "Unicode dec": "9805", "Unicode hex": "264D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "100", "Dingbat hex": "64", "Unicode dec": "9806", "Unicode hex": "264E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "101", "Dingbat hex": "65", "Unicode dec": "9807", "Unicode hex": "264F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "102", "Dingbat hex": "66", "Unicode dec": "9808", "Unicode hex": "2650" },
  { "Typeface name": "Wingdings", "Dingbat dec": "103", "Dingbat hex": "67", "Unicode dec": "9809", "Unicode hex": "2651" },
  { "Typeface name": "Wingdings", "Dingbat dec": "104", "Dingbat hex": "68", "Unicode dec": "9810", "Unicode hex": "2652" },
  { "Typeface name": "Wingdings", "Dingbat dec": "105", "Dingbat hex": "69", "Unicode dec": "9811", "Unicode hex": "2653" },
  { "Typeface name": "Wingdings", "Dingbat dec": "106", "Dingbat hex": "6A", "Unicode dec": "128624", "Unicode hex": "1F670" },
  { "Typeface name": "Wingdings", "Dingbat dec": "107", "Dingbat hex": "6B", "Unicode dec": "128629", "Unicode hex": "1F675" },
  { "Typeface name": "Wingdings", "Dingbat dec": "108", "Dingbat hex": "6C", "Unicode dec": "9899", "Unicode hex": "26AB" },
  { "Typeface name": "Wingdings", "Dingbat dec": "109", "Dingbat hex": "6D", "Unicode dec": "128318", "Unicode hex": "1F53E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "110", "Dingbat hex": "6E", "Unicode dec": "9724", "Unicode hex": "25FC" },
  { "Typeface name": "Wingdings", "Dingbat dec": "111", "Dingbat hex": "6F", "Unicode dec": "128911", "Unicode hex": "1F78F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "112", "Dingbat hex": "70", "Unicode dec": "128912", "Unicode hex": "1F790" },
  { "Typeface name": "Wingdings", "Dingbat dec": "113", "Dingbat hex": "71", "Unicode dec": "10065", "Unicode hex": "2751" },
  { "Typeface name": "Wingdings", "Dingbat dec": "114", "Dingbat hex": "72", "Unicode dec": "10066", "Unicode hex": "2752" },
  { "Typeface name": "Wingdings", "Dingbat dec": "115", "Dingbat hex": "73", "Unicode dec": "128927", "Unicode hex": "1F79F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "116", "Dingbat hex": "74", "Unicode dec": "10731", "Unicode hex": "29EB" },
  { "Typeface name": "Wingdings", "Dingbat dec": "117", "Dingbat hex": "75", "Unicode dec": "9670", "Unicode hex": "25C6" },
  { "Typeface name": "Wingdings", "Dingbat dec": "118", "Dingbat hex": "76", "Unicode dec": "10070", "Unicode hex": "2756" },
  { "Typeface name": "Wingdings", "Dingbat dec": "119", "Dingbat hex": "77", "Unicode dec": "11049", "Unicode hex": "2B29" },
  { "Typeface name": "Wingdings", "Dingbat dec": "120", "Dingbat hex": "78", "Unicode dec": "8999", "Unicode hex": "2327" },
  { "Typeface name": "Wingdings", "Dingbat dec": "121", "Dingbat hex": "79", "Unicode dec": "11193", "Unicode hex": "2BB9" },
  { "Typeface name": "Wingdings", "Dingbat dec": "122", "Dingbat hex": "7A", "Unicode dec": "8984", "Unicode hex": "2318" },
  { "Typeface name": "Wingdings", "Dingbat dec": "123", "Dingbat hex": "7B", "Unicode dec": "127989", "Unicode hex": "1F3F5" },
  { "Typeface name": "Wingdings", "Dingbat dec": "124", "Dingbat hex": "7C", "Unicode dec": "127990", "Unicode hex": "1F3F6" },
  { "Typeface name": "Wingdings", "Dingbat dec": "125", "Dingbat hex": "7D", "Unicode dec": "128630", "Unicode hex": "1F676" },
  { "Typeface name": "Wingdings", "Dingbat dec": "126", "Dingbat hex": "7E", "Unicode dec": "128631", "Unicode hex": "1F677" },
  { "Typeface name": "Wingdings", "Dingbat dec": "127", "Dingbat hex": "7F", "Unicode dec": "9647", "Unicode hex": "25AF" },
  { "Typeface name": "Wingdings", "Dingbat dec": "128", "Dingbat hex": "80", "Unicode dec": "127243", "Unicode hex": "1F10B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "129", "Dingbat hex": "81", "Unicode dec": "10112", "Unicode hex": "2780" },
  { "Typeface name": "Wingdings", "Dingbat dec": "130", "Dingbat hex": "82", "Unicode dec": "10113", "Unicode hex": "2781" },
  { "Typeface name": "Wingdings", "Dingbat dec": "131", "Dingbat hex": "83", "Unicode dec": "10114", "Unicode hex": "2782" },
  { "Typeface name": "Wingdings", "Dingbat dec": "132", "Dingbat hex": "84", "Unicode dec": "10115", "Unicode hex": "2783" },
  { "Typeface name": "Wingdings", "Dingbat dec": "133", "Dingbat hex": "85", "Unicode dec": "10116", "Unicode hex": "2784" },
  { "Typeface name": "Wingdings", "Dingbat dec": "134", "Dingbat hex": "86", "Unicode dec": "10117", "Unicode hex": "2785" },
  { "Typeface name": "Wingdings", "Dingbat dec": "135", "Dingbat hex": "87", "Unicode dec": "10118", "Unicode hex": "2786" },
  { "Typeface name": "Wingdings", "Dingbat dec": "136", "Dingbat hex": "88", "Unicode dec": "10119", "Unicode hex": "2787" },
  { "Typeface name": "Wingdings", "Dingbat dec": "137", "Dingbat hex": "89", "Unicode dec": "10120", "Unicode hex": "2788" },
  { "Typeface name": "Wingdings", "Dingbat dec": "138", "Dingbat hex": "8A", "Unicode dec": "10121", "Unicode hex": "2789" },
  { "Typeface name": "Wingdings", "Dingbat dec": "139", "Dingbat hex": "8B", "Unicode dec": "127244", "Unicode hex": "1F10C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "140", "Dingbat hex": "8C", "Unicode dec": "10122", "Unicode hex": "278A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "141", "Dingbat hex": "8D", "Unicode dec": "10123", "Unicode hex": "278B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "142", "Dingbat hex": "8E", "Unicode dec": "10124", "Unicode hex": "278C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "143", "Dingbat hex": "8F", "Unicode dec": "10125", "Unicode hex": "278D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "144", "Dingbat hex": "90", "Unicode dec": "10126", "Unicode hex": "278E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "145", "Dingbat hex": "91", "Unicode dec": "10127", "Unicode hex": "278F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "146", "Dingbat hex": "92", "Unicode dec": "10128", "Unicode hex": "2790" },
  { "Typeface name": "Wingdings", "Dingbat dec": "147", "Dingbat hex": "93", "Unicode dec": "10129", "Unicode hex": "2791" },
  { "Typeface name": "Wingdings", "Dingbat dec": "148", "Dingbat hex": "94", "Unicode dec": "10130", "Unicode hex": "2792" },
  { "Typeface name": "Wingdings", "Dingbat dec": "149", "Dingbat hex": "95", "Unicode dec": "10131", "Unicode hex": "2793" },
  { "Typeface name": "Wingdings", "Dingbat dec": "150", "Dingbat hex": "96", "Unicode dec": "128610", "Unicode hex": "1F662" },
  { "Typeface name": "Wingdings", "Dingbat dec": "151", "Dingbat hex": "97", "Unicode dec": "128608", "Unicode hex": "1F660" },
  { "Typeface name": "Wingdings", "Dingbat dec": "152", "Dingbat hex": "98", "Unicode dec": "128609", "Unicode hex": "1F661" },
  { "Typeface name": "Wingdings", "Dingbat dec": "153", "Dingbat hex": "99", "Unicode dec": "128611", "Unicode hex": "1F663" },
  { "Typeface name": "Wingdings", "Dingbat dec": "154", "Dingbat hex": "9A", "Unicode dec": "128606", "Unicode hex": "1F65E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "155", "Dingbat hex": "9B", "Unicode dec": "128604", "Unicode hex": "1F65C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "156", "Dingbat hex": "9C", "Unicode dec": "128605", "Unicode hex": "1F65D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "157", "Dingbat hex": "9D", "Unicode dec": "128607", "Unicode hex": "1F65F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "158", "Dingbat hex": "9E", "Unicode dec": "8729", "Unicode hex": "2219" },
  { "Typeface name": "Wingdings", "Dingbat dec": "159", "Dingbat hex": "9F", "Unicode dec": "8226", "Unicode hex": "2022" },
  { "Typeface name": "Wingdings", "Dingbat dec": "160", "Dingbat hex": "A0", "Unicode dec": "11037", "Unicode hex": "2B1D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "161", "Dingbat hex": "A1", "Unicode dec": "11096", "Unicode hex": "2B58" },
  { "Typeface name": "Wingdings", "Dingbat dec": "162", "Dingbat hex": "A2", "Unicode dec": "128902", "Unicode hex": "1F786" },
  { "Typeface name": "Wingdings", "Dingbat dec": "163", "Dingbat hex": "A3", "Unicode dec": "128904", "Unicode hex": "1F788" },
  { "Typeface name": "Wingdings", "Dingbat dec": "164", "Dingbat hex": "A4", "Unicode dec": "128906", "Unicode hex": "1F78A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "165", "Dingbat hex": "A5", "Unicode dec": "128907", "Unicode hex": "1F78B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "166", "Dingbat hex": "A6", "Unicode dec": "128319", "Unicode hex": "1F53F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "167", "Dingbat hex": "A7", "Unicode dec": "9642", "Unicode hex": "25AA" },
  { "Typeface name": "Wingdings", "Dingbat dec": "168", "Dingbat hex": "A8", "Unicode dec": "128910", "Unicode hex": "1F78E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "169", "Dingbat hex": "A9", "Unicode dec": "128961", "Unicode hex": "1F7C1" },
  { "Typeface name": "Wingdings", "Dingbat dec": "170", "Dingbat hex": "AA", "Unicode dec": "128965", "Unicode hex": "1F7C5" },
  { "Typeface name": "Wingdings", "Dingbat dec": "171", "Dingbat hex": "AB", "Unicode dec": "9733", "Unicode hex": "2605" },
  { "Typeface name": "Wingdings", "Dingbat dec": "172", "Dingbat hex": "AC", "Unicode dec": "128971", "Unicode hex": "1F7CB" },
  { "Typeface name": "Wingdings", "Dingbat dec": "173", "Dingbat hex": "AD", "Unicode dec": "128975", "Unicode hex": "1F7CF" },
  { "Typeface name": "Wingdings", "Dingbat dec": "174", "Dingbat hex": "AE", "Unicode dec": "128979", "Unicode hex": "1F7D3" },
  { "Typeface name": "Wingdings", "Dingbat dec": "175", "Dingbat hex": "AF", "Unicode dec": "128977", "Unicode hex": "1F7D1" },
  { "Typeface name": "Wingdings", "Dingbat dec": "176", "Dingbat hex": "B0", "Unicode dec": "11216", "Unicode hex": "2BD0" },
  { "Typeface name": "Wingdings", "Dingbat dec": "177", "Dingbat hex": "B1", "Unicode dec": "8982", "Unicode hex": "2316" },
  { "Typeface name": "Wingdings", "Dingbat dec": "178", "Dingbat hex": "B2", "Unicode dec": "11214", "Unicode hex": "2BCE" },
  { "Typeface name": "Wingdings", "Dingbat dec": "179", "Dingbat hex": "B3", "Unicode dec": "11215", "Unicode hex": "2BCF" },
  { "Typeface name": "Wingdings", "Dingbat dec": "180", "Dingbat hex": "B4", "Unicode dec": "11217", "Unicode hex": "2BD1" },
  { "Typeface name": "Wingdings", "Dingbat dec": "181", "Dingbat hex": "B5", "Unicode dec": "10026", "Unicode hex": "272A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "182", "Dingbat hex": "B6", "Unicode dec": "10032", "Unicode hex": "2730" },
  { "Typeface name": "Wingdings", "Dingbat dec": "183", "Dingbat hex": "B7", "Unicode dec": "128336", "Unicode hex": "1F550" },
  { "Typeface name": "Wingdings", "Dingbat dec": "184", "Dingbat hex": "B8", "Unicode dec": "128337", "Unicode hex": "1F551" },
  { "Typeface name": "Wingdings", "Dingbat dec": "185", "Dingbat hex": "B9", "Unicode dec": "128338", "Unicode hex": "1F552" },
  { "Typeface name": "Wingdings", "Dingbat dec": "186", "Dingbat hex": "BA", "Unicode dec": "128339", "Unicode hex": "1F553" },
  { "Typeface name": "Wingdings", "Dingbat dec": "187", "Dingbat hex": "BB", "Unicode dec": "128340", "Unicode hex": "1F554" },
  { "Typeface name": "Wingdings", "Dingbat dec": "188", "Dingbat hex": "BC", "Unicode dec": "128341", "Unicode hex": "1F555" },
  { "Typeface name": "Wingdings", "Dingbat dec": "189", "Dingbat hex": "BD", "Unicode dec": "128342", "Unicode hex": "1F556" },
  { "Typeface name": "Wingdings", "Dingbat dec": "190", "Dingbat hex": "BE", "Unicode dec": "128343", "Unicode hex": "1F557" },
  { "Typeface name": "Wingdings", "Dingbat dec": "191", "Dingbat hex": "BF", "Unicode dec": "128344", "Unicode hex": "1F558" },
  { "Typeface name": "Wingdings", "Dingbat dec": "192", "Dingbat hex": "C0", "Unicode dec": "128345", "Unicode hex": "1F559" },
  { "Typeface name": "Wingdings", "Dingbat dec": "193", "Dingbat hex": "C1", "Unicode dec": "128346", "Unicode hex": "1F55A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "194", "Dingbat hex": "C2", "Unicode dec": "128347", "Unicode hex": "1F55B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "195", "Dingbat hex": "C3", "Unicode dec": "11184", "Unicode hex": "2BB0" },
  { "Typeface name": "Wingdings", "Dingbat dec": "196", "Dingbat hex": "C4", "Unicode dec": "11185", "Unicode hex": "2BB1" },
  { "Typeface name": "Wingdings", "Dingbat dec": "197", "Dingbat hex": "C5", "Unicode dec": "11186", "Unicode hex": "2BB2" },
  { "Typeface name": "Wingdings", "Dingbat dec": "198", "Dingbat hex": "C6", "Unicode dec": "11187", "Unicode hex": "2BB3" },
  { "Typeface name": "Wingdings", "Dingbat dec": "199", "Dingbat hex": "C7", "Unicode dec": "11188", "Unicode hex": "2BB4" },
  { "Typeface name": "Wingdings", "Dingbat dec": "200", "Dingbat hex": "C8", "Unicode dec": "11189", "Unicode hex": "2BB5" },
  { "Typeface name": "Wingdings", "Dingbat dec": "201", "Dingbat hex": "C9", "Unicode dec": "11190", "Unicode hex": "2BB6" },
  { "Typeface name": "Wingdings", "Dingbat dec": "202", "Dingbat hex": "CA", "Unicode dec": "11191", "Unicode hex": "2BB7" },
  { "Typeface name": "Wingdings", "Dingbat dec": "203", "Dingbat hex": "CB", "Unicode dec": "128618", "Unicode hex": "1F66A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "204", "Dingbat hex": "CC", "Unicode dec": "128619", "Unicode hex": "1F66B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "205", "Dingbat hex": "CD", "Unicode dec": "128597", "Unicode hex": "1F655" },
  { "Typeface name": "Wingdings", "Dingbat dec": "206", "Dingbat hex": "CE", "Unicode dec": "128596", "Unicode hex": "1F654" },
  { "Typeface name": "Wingdings", "Dingbat dec": "207", "Dingbat hex": "CF", "Unicode dec": "128599", "Unicode hex": "1F657" },
  { "Typeface name": "Wingdings", "Dingbat dec": "208", "Dingbat hex": "D0", "Unicode dec": "128598", "Unicode hex": "1F656" },
  { "Typeface name": "Wingdings", "Dingbat dec": "209", "Dingbat hex": "D1", "Unicode dec": "128592", "Unicode hex": "1F650" },
  { "Typeface name": "Wingdings", "Dingbat dec": "210", "Dingbat hex": "D2", "Unicode dec": "128593", "Unicode hex": "1F651" },
  { "Typeface name": "Wingdings", "Dingbat dec": "211", "Dingbat hex": "D3", "Unicode dec": "128594", "Unicode hex": "1F652" },
  { "Typeface name": "Wingdings", "Dingbat dec": "212", "Dingbat hex": "D4", "Unicode dec": "128595", "Unicode hex": "1F653" },
  { "Typeface name": "Wingdings", "Dingbat dec": "213", "Dingbat hex": "D5", "Unicode dec": "9003", "Unicode hex": "232B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "214", "Dingbat hex": "D6", "Unicode dec": "8998", "Unicode hex": "2326" },
  { "Typeface name": "Wingdings", "Dingbat dec": "215", "Dingbat hex": "D7", "Unicode dec": "11160", "Unicode hex": "2B98" },
  { "Typeface name": "Wingdings", "Dingbat dec": "216", "Dingbat hex": "D8", "Unicode dec": "11162", "Unicode hex": "2B9A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "217", "Dingbat hex": "D9", "Unicode dec": "11161", "Unicode hex": "2B99" },
  { "Typeface name": "Wingdings", "Dingbat dec": "218", "Dingbat hex": "DA", "Unicode dec": "11163", "Unicode hex": "2B9B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "219", "Dingbat hex": "DB", "Unicode dec": "11144", "Unicode hex": "2B88" },
  { "Typeface name": "Wingdings", "Dingbat dec": "220", "Dingbat hex": "DC", "Unicode dec": "11146", "Unicode hex": "2B8A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "221", "Dingbat hex": "DD", "Unicode dec": "11145", "Unicode hex": "2B89" },
  { "Typeface name": "Wingdings", "Dingbat dec": "222", "Dingbat hex": "DE", "Unicode dec": "11147", "Unicode hex": "2B8B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "223", "Dingbat hex": "DF", "Unicode dec": "129128", "Unicode hex": "1F868" },
  { "Typeface name": "Wingdings", "Dingbat dec": "224", "Dingbat hex": "E0", "Unicode dec": "129130", "Unicode hex": "1F86A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "225", "Dingbat hex": "E1", "Unicode dec": "129129", "Unicode hex": "1F869" },
  { "Typeface name": "Wingdings", "Dingbat dec": "226", "Dingbat hex": "E2", "Unicode dec": "129131", "Unicode hex": "1F86B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "227", "Dingbat hex": "E3", "Unicode dec": "129132", "Unicode hex": "1F86C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "228", "Dingbat hex": "E4", "Unicode dec": "129133", "Unicode hex": "1F86D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "229", "Dingbat hex": "E5", "Unicode dec": "129135", "Unicode hex": "1F86F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "230", "Dingbat hex": "E6", "Unicode dec": "129134", "Unicode hex": "1F86E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "231", "Dingbat hex": "E7", "Unicode dec": "129144", "Unicode hex": "1F878" },
  { "Typeface name": "Wingdings", "Dingbat dec": "232", "Dingbat hex": "E8", "Unicode dec": "129146", "Unicode hex": "1F87A" },
  { "Typeface name": "Wingdings", "Dingbat dec": "233", "Dingbat hex": "E9", "Unicode dec": "129145", "Unicode hex": "1F879" },
  { "Typeface name": "Wingdings", "Dingbat dec": "234", "Dingbat hex": "EA", "Unicode dec": "129147", "Unicode hex": "1F87B" },
  { "Typeface name": "Wingdings", "Dingbat dec": "235", "Dingbat hex": "EB", "Unicode dec": "129148", "Unicode hex": "1F87C" },
  { "Typeface name": "Wingdings", "Dingbat dec": "236", "Dingbat hex": "EC", "Unicode dec": "129149", "Unicode hex": "1F87D" },
  { "Typeface name": "Wingdings", "Dingbat dec": "237", "Dingbat hex": "ED", "Unicode dec": "129151", "Unicode hex": "1F87F" },
  { "Typeface name": "Wingdings", "Dingbat dec": "238", "Dingbat hex": "EE", "Unicode dec": "129150", "Unicode hex": "1F87E" },
  { "Typeface name": "Wingdings", "Dingbat dec": "239", "Dingbat hex": "EF", "Unicode dec": "8678", "Unicode hex": "21E6" },
  { "Typeface name": "Wingdings", "Dingbat dec": "240", "Dingbat hex": "F0", "Unicode dec": "8680", "Unicode hex": "21E8" },
  { "Typeface name": "Wingdings", "Dingbat dec": "241", "Dingbat hex": "F1", "Unicode dec": "8679", "Unicode hex": "21E7" },
  { "Typeface name": "Wingdings", "Dingbat dec": "242", "Dingbat hex": "F2", "Unicode dec": "8681", "Unicode hex": "21E9" },
  { "Typeface name": "Wingdings", "Dingbat dec": "243", "Dingbat hex": "F3", "Unicode dec": "11012", "Unicode hex": "2B04" },
  { "Typeface name": "Wingdings", "Dingbat dec": "244", "Dingbat hex": "F4", "Unicode dec": "8691", "Unicode hex": "21F3" },
  { "Typeface name": "Wingdings", "Dingbat dec": "245", "Dingbat hex": "F5", "Unicode dec": "11009", "Unicode hex": "2B01" },
  { "Typeface name": "Wingdings", "Dingbat dec": "246", "Dingbat hex": "F6", "Unicode dec": "11008", "Unicode hex": "2B00" },
  { "Typeface name": "Wingdings", "Dingbat dec": "247", "Dingbat hex": "F7", "Unicode dec": "11011", "Unicode hex": "2B03" },
  { "Typeface name": "Wingdings", "Dingbat dec": "248", "Dingbat hex": "F8", "Unicode dec": "11010", "Unicode hex": "2B02" },
  { "Typeface name": "Wingdings", "Dingbat dec": "249", "Dingbat hex": "F9", "Unicode dec": "129196", "Unicode hex": "1F8AC" },
  { "Typeface name": "Wingdings", "Dingbat dec": "250", "Dingbat hex": "FA", "Unicode dec": "129197", "Unicode hex": "1F8AD" },
  { "Typeface name": "Wingdings", "Dingbat dec": "251", "Dingbat hex": "FB", "Unicode dec": "128502", "Unicode hex": "1F5F6" },
  { "Typeface name": "Wingdings", "Dingbat dec": "252", "Dingbat hex": "FC", "Unicode dec": "10003", "Unicode hex": "2713" },
  { "Typeface name": "Wingdings", "Dingbat dec": "253", "Dingbat hex": "FD", "Unicode dec": "128503", "Unicode hex": "1F5F7" },
  { "Typeface name": "Wingdings", "Dingbat dec": "254", "Dingbat hex": "FE", "Unicode dec": "128505", "Unicode hex": "1F5F9" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "32", "Dingbat hex": "20", "Unicode dec": "32", "Unicode hex": "20" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "33", "Dingbat hex": "21", "Unicode dec": "128394", "Unicode hex": "1F58A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "34", "Dingbat hex": "22", "Unicode dec": "128395", "Unicode hex": "1F58B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "35", "Dingbat hex": "23", "Unicode dec": "128396", "Unicode hex": "1F58C" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "36", "Dingbat hex": "24", "Unicode dec": "128397", "Unicode hex": "1F58D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "37", "Dingbat hex": "25", "Unicode dec": "9988", "Unicode hex": "2704" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "38", "Dingbat hex": "26", "Unicode dec": "9984", "Unicode hex": "2700" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "39", "Dingbat hex": "27", "Unicode dec": "128382", "Unicode hex": "1F57E" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "40", "Dingbat hex": "28", "Unicode dec": "128381", "Unicode hex": "1F57D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "41", "Dingbat hex": "29", "Unicode dec": "128453", "Unicode hex": "1F5C5" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "42", "Dingbat hex": "2A", "Unicode dec": "128454", "Unicode hex": "1F5C6" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "43", "Dingbat hex": "2B", "Unicode dec": "128455", "Unicode hex": "1F5C7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "44", "Dingbat hex": "2C", "Unicode dec": "128456", "Unicode hex": "1F5C8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "45", "Dingbat hex": "2D", "Unicode dec": "128457", "Unicode hex": "1F5C9" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "46", "Dingbat hex": "2E", "Unicode dec": "128458", "Unicode hex": "1F5CA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "47", "Dingbat hex": "2F", "Unicode dec": "128459", "Unicode hex": "1F5CB" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "48", "Dingbat hex": "30", "Unicode dec": "128460", "Unicode hex": "1F5CC" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "49", "Dingbat hex": "31", "Unicode dec": "128461", "Unicode hex": "1F5CD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "50", "Dingbat hex": "32", "Unicode dec": "128203", "Unicode hex": "1F4CB" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "51", "Dingbat hex": "33", "Unicode dec": "128465", "Unicode hex": "1F5D1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "52", "Dingbat hex": "34", "Unicode dec": "128468", "Unicode hex": "1F5D4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "53", "Dingbat hex": "35", "Unicode dec": "128437", "Unicode hex": "1F5B5" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "54", "Dingbat hex": "36", "Unicode dec": "128438", "Unicode hex": "1F5B6" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "55", "Dingbat hex": "37", "Unicode dec": "128439", "Unicode hex": "1F5B7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "56", "Dingbat hex": "38", "Unicode dec": "128440", "Unicode hex": "1F5B8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "57", "Dingbat hex": "39", "Unicode dec": "128429", "Unicode hex": "1F5AD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "58", "Dingbat hex": "3A", "Unicode dec": "128431", "Unicode hex": "1F5AF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "59", "Dingbat hex": "3B", "Unicode dec": "128433", "Unicode hex": "1F5B1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "60", "Dingbat hex": "3C", "Unicode dec": "128402", "Unicode hex": "1F592" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "61", "Dingbat hex": "3D", "Unicode dec": "128403", "Unicode hex": "1F593" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "62", "Dingbat hex": "3E", "Unicode dec": "128408", "Unicode hex": "1F598" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "63", "Dingbat hex": "3F", "Unicode dec": "128409", "Unicode hex": "1F599" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "64", "Dingbat hex": "40", "Unicode dec": "128410", "Unicode hex": "1F59A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "65", "Dingbat hex": "41", "Unicode dec": "128411", "Unicode hex": "1F59B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "66", "Dingbat hex": "42", "Unicode dec": "128072", "Unicode hex": "1F448" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "67", "Dingbat hex": "43", "Unicode dec": "128073", "Unicode hex": "1F449" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "68", "Dingbat hex": "44", "Unicode dec": "128412", "Unicode hex": "1F59C" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "69", "Dingbat hex": "45", "Unicode dec": "128413", "Unicode hex": "1F59D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "70", "Dingbat hex": "46", "Unicode dec": "128414", "Unicode hex": "1F59E" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "71", "Dingbat hex": "47", "Unicode dec": "128415", "Unicode hex": "1F59F" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "72", "Dingbat hex": "48", "Unicode dec": "128416", "Unicode hex": "1F5A0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "73", "Dingbat hex": "49", "Unicode dec": "128417", "Unicode hex": "1F5A1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "74", "Dingbat hex": "4A", "Unicode dec": "128070", "Unicode hex": "1F446" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "75", "Dingbat hex": "4B", "Unicode dec": "128071", "Unicode hex": "1F447" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "76", "Dingbat hex": "4C", "Unicode dec": "128418", "Unicode hex": "1F5A2" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "77", "Dingbat hex": "4D", "Unicode dec": "128419", "Unicode hex": "1F5A3" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "78", "Dingbat hex": "4E", "Unicode dec": "128401", "Unicode hex": "1F591" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "79", "Dingbat hex": "4F", "Unicode dec": "128500", "Unicode hex": "1F5F4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "80", "Dingbat hex": "50", "Unicode dec": "128504", "Unicode hex": "1F5F8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "81", "Dingbat hex": "51", "Unicode dec": "128501", "Unicode hex": "1F5F5" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "82", "Dingbat hex": "52", "Unicode dec": "9745", "Unicode hex": "2611" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "83", "Dingbat hex": "53", "Unicode dec": "11197", "Unicode hex": "2BBD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "84", "Dingbat hex": "54", "Unicode dec": "9746", "Unicode hex": "2612" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "85", "Dingbat hex": "55", "Unicode dec": "11198", "Unicode hex": "2BBE" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "86", "Dingbat hex": "56", "Unicode dec": "11199", "Unicode hex": "2BBF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "87", "Dingbat hex": "57", "Unicode dec": "128711", "Unicode hex": "1F6C7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "88", "Dingbat hex": "58", "Unicode dec": "10680", "Unicode hex": "29B8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "89", "Dingbat hex": "59", "Unicode dec": "128625", "Unicode hex": "1F671" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "90", "Dingbat hex": "5A", "Unicode dec": "128628", "Unicode hex": "1F674" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "91", "Dingbat hex": "5B", "Unicode dec": "128626", "Unicode hex": "1F672" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "92", "Dingbat hex": "5C", "Unicode dec": "128627", "Unicode hex": "1F673" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "93", "Dingbat hex": "5D", "Unicode dec": "8253", "Unicode hex": "203D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "94", "Dingbat hex": "5E", "Unicode dec": "128633", "Unicode hex": "1F679" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "95", "Dingbat hex": "5F", "Unicode dec": "128634", "Unicode hex": "1F67A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "96", "Dingbat hex": "60", "Unicode dec": "128635", "Unicode hex": "1F67B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "97", "Dingbat hex": "61", "Unicode dec": "128614", "Unicode hex": "1F666" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "98", "Dingbat hex": "62", "Unicode dec": "128612", "Unicode hex": "1F664" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "99", "Dingbat hex": "63", "Unicode dec": "128613", "Unicode hex": "1F665" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "100", "Dingbat hex": "64", "Unicode dec": "128615", "Unicode hex": "1F667" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "101", "Dingbat hex": "65", "Unicode dec": "128602", "Unicode hex": "1F65A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "102", "Dingbat hex": "66", "Unicode dec": "128600", "Unicode hex": "1F658" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "103", "Dingbat hex": "67", "Unicode dec": "128601", "Unicode hex": "1F659" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "104", "Dingbat hex": "68", "Unicode dec": "128603", "Unicode hex": "1F65B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "105", "Dingbat hex": "69", "Unicode dec": "9450", "Unicode hex": "24EA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "106", "Dingbat hex": "6A", "Unicode dec": "9312", "Unicode hex": "2460" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "107", "Dingbat hex": "6B", "Unicode dec": "9313", "Unicode hex": "2461" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "108", "Dingbat hex": "6C", "Unicode dec": "9314", "Unicode hex": "2462" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "109", "Dingbat hex": "6D", "Unicode dec": "9315", "Unicode hex": "2463" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "110", "Dingbat hex": "6E", "Unicode dec": "9316", "Unicode hex": "2464" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "111", "Dingbat hex": "6F", "Unicode dec": "9317", "Unicode hex": "2465" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "112", "Dingbat hex": "70", "Unicode dec": "9318", "Unicode hex": "2466" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "113", "Dingbat hex": "71", "Unicode dec": "9319", "Unicode hex": "2467" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "114", "Dingbat hex": "72", "Unicode dec": "9320", "Unicode hex": "2468" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "115", "Dingbat hex": "73", "Unicode dec": "9321", "Unicode hex": "2469" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "116", "Dingbat hex": "74", "Unicode dec": "9471", "Unicode hex": "24FF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "117", "Dingbat hex": "75", "Unicode dec": "10102", "Unicode hex": "2776" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "118", "Dingbat hex": "76", "Unicode dec": "10103", "Unicode hex": "2777" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "119", "Dingbat hex": "77", "Unicode dec": "10104", "Unicode hex": "2778" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "120", "Dingbat hex": "78", "Unicode dec": "10105", "Unicode hex": "2779" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "121", "Dingbat hex": "79", "Unicode dec": "10106", "Unicode hex": "277A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "122", "Dingbat hex": "7A", "Unicode dec": "10107", "Unicode hex": "277B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "123", "Dingbat hex": "7B", "Unicode dec": "10108", "Unicode hex": "277C" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "124", "Dingbat hex": "7C", "Unicode dec": "10109", "Unicode hex": "277D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "125", "Dingbat hex": "7D", "Unicode dec": "10110", "Unicode hex": "277E" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "126", "Dingbat hex": "7E", "Unicode dec": "10111", "Unicode hex": "277F" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "128", "Dingbat hex": "80", "Unicode dec": "9737", "Unicode hex": "2609" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "129", "Dingbat hex": "81", "Unicode dec": "127765", "Unicode hex": "1F315" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "130", "Dingbat hex": "82", "Unicode dec": "9789", "Unicode hex": "263D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "131", "Dingbat hex": "83", "Unicode dec": "9790", "Unicode hex": "263E" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "132", "Dingbat hex": "84", "Unicode dec": "11839", "Unicode hex": "2E3F" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "133", "Dingbat hex": "85", "Unicode dec": "10013", "Unicode hex": "271D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "134", "Dingbat hex": "86", "Unicode dec": "128327", "Unicode hex": "1F547" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "135", "Dingbat hex": "87", "Unicode dec": "128348", "Unicode hex": "1F55C" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "136", "Dingbat hex": "88", "Unicode dec": "128349", "Unicode hex": "1F55D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "137", "Dingbat hex": "89", "Unicode dec": "128350", "Unicode hex": "1F55E" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "138", "Dingbat hex": "8A", "Unicode dec": "128351", "Unicode hex": "1F55F" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "139", "Dingbat hex": "8B", "Unicode dec": "128352", "Unicode hex": "1F560" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "140", "Dingbat hex": "8C", "Unicode dec": "128353", "Unicode hex": "1F561" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "141", "Dingbat hex": "8D", "Unicode dec": "128354", "Unicode hex": "1F562" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "142", "Dingbat hex": "8E", "Unicode dec": "128355", "Unicode hex": "1F563" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "143", "Dingbat hex": "8F", "Unicode dec": "128356", "Unicode hex": "1F564" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "144", "Dingbat hex": "90", "Unicode dec": "128357", "Unicode hex": "1F565" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "145", "Dingbat hex": "91", "Unicode dec": "128358", "Unicode hex": "1F566" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "146", "Dingbat hex": "92", "Unicode dec": "128359", "Unicode hex": "1F567" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "147", "Dingbat hex": "93", "Unicode dec": "128616", "Unicode hex": "1F668" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "148", "Dingbat hex": "94", "Unicode dec": "128617", "Unicode hex": "1F669" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "149", "Dingbat hex": "95", "Unicode dec": "8901", "Unicode hex": "22C5" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "150", "Dingbat hex": "96", "Unicode dec": "128900", "Unicode hex": "1F784" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "151", "Dingbat hex": "97", "Unicode dec": "10625", "Unicode hex": "2981" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "152", "Dingbat hex": "98", "Unicode dec": "9679", "Unicode hex": "25CF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "153", "Dingbat hex": "99", "Unicode dec": "9675", "Unicode hex": "25CB" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "154", "Dingbat hex": "9A", "Unicode dec": "128901", "Unicode hex": "1F785" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "155", "Dingbat hex": "9B", "Unicode dec": "128903", "Unicode hex": "1F787" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "156", "Dingbat hex": "9C", "Unicode dec": "128905", "Unicode hex": "1F789" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "157", "Dingbat hex": "9D", "Unicode dec": "8857", "Unicode hex": "2299" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "158", "Dingbat hex": "9E", "Unicode dec": "10687", "Unicode hex": "29BF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "159", "Dingbat hex": "9F", "Unicode dec": "128908", "Unicode hex": "1F78C" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "160", "Dingbat hex": "A0", "Unicode dec": "128909", "Unicode hex": "1F78D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "161", "Dingbat hex": "A1", "Unicode dec": "9726", "Unicode hex": "25FE" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "162", "Dingbat hex": "A2", "Unicode dec": "9632", "Unicode hex": "25A0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "163", "Dingbat hex": "A3", "Unicode dec": "9633", "Unicode hex": "25A1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "164", "Dingbat hex": "A4", "Unicode dec": "128913", "Unicode hex": "1F791" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "165", "Dingbat hex": "A5", "Unicode dec": "128914", "Unicode hex": "1F792" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "166", "Dingbat hex": "A6", "Unicode dec": "128915", "Unicode hex": "1F793" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "167", "Dingbat hex": "A7", "Unicode dec": "128916", "Unicode hex": "1F794" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "168", "Dingbat hex": "A8", "Unicode dec": "9635", "Unicode hex": "25A3" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "169", "Dingbat hex": "A9", "Unicode dec": "128917", "Unicode hex": "1F795" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "170", "Dingbat hex": "AA", "Unicode dec": "128918", "Unicode hex": "1F796" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "171", "Dingbat hex": "AB", "Unicode dec": "128919", "Unicode hex": "1F797" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "172", "Dingbat hex": "AC", "Unicode dec": "128920", "Unicode hex": "1F798" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "173", "Dingbat hex": "AD", "Unicode dec": "11049", "Unicode hex": "2B29" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "174", "Dingbat hex": "AE", "Unicode dec": "11045", "Unicode hex": "2B25" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "175", "Dingbat hex": "AF", "Unicode dec": "9671", "Unicode hex": "25C7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "176", "Dingbat hex": "B0", "Unicode dec": "128922", "Unicode hex": "1F79A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "177", "Dingbat hex": "B1", "Unicode dec": "9672", "Unicode hex": "25C8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "178", "Dingbat hex": "B2", "Unicode dec": "128923", "Unicode hex": "1F79B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "179", "Dingbat hex": "B3", "Unicode dec": "128924", "Unicode hex": "1F79C" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "180", "Dingbat hex": "B4", "Unicode dec": "128925", "Unicode hex": "1F79D" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "181", "Dingbat hex": "B5", "Unicode dec": "128926", "Unicode hex": "1F79E" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "182", "Dingbat hex": "B6", "Unicode dec": "11050", "Unicode hex": "2B2A" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "183", "Dingbat hex": "B7", "Unicode dec": "11047", "Unicode hex": "2B27" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "184", "Dingbat hex": "B8", "Unicode dec": "9674", "Unicode hex": "25CA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "185", "Dingbat hex": "B9", "Unicode dec": "128928", "Unicode hex": "1F7A0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "186", "Dingbat hex": "BA", "Unicode dec": "9686", "Unicode hex": "25D6" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "187", "Dingbat hex": "BB", "Unicode dec": "9687", "Unicode hex": "25D7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "188", "Dingbat hex": "BC", "Unicode dec": "11210", "Unicode hex": "2BCA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "189", "Dingbat hex": "BD", "Unicode dec": "11211", "Unicode hex": "2BCB" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "190", "Dingbat hex": "BE", "Unicode dec": "11200", "Unicode hex": "2BC0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "191", "Dingbat hex": "BF", "Unicode dec": "11201", "Unicode hex": "2BC1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "192", "Dingbat hex": "C0", "Unicode dec": "11039", "Unicode hex": "2B1F" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "193", "Dingbat hex": "C1", "Unicode dec": "11202", "Unicode hex": "2BC2" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "194", "Dingbat hex": "C2", "Unicode dec": "11043", "Unicode hex": "2B23" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "195", "Dingbat hex": "C3", "Unicode dec": "11042", "Unicode hex": "2B22" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "196", "Dingbat hex": "C4", "Unicode dec": "11203", "Unicode hex": "2BC3" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "197", "Dingbat hex": "C5", "Unicode dec": "11204", "Unicode hex": "2BC4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "198", "Dingbat hex": "C6", "Unicode dec": "128929", "Unicode hex": "1F7A1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "199", "Dingbat hex": "C7", "Unicode dec": "128930", "Unicode hex": "1F7A2" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "200", "Dingbat hex": "C8", "Unicode dec": "128931", "Unicode hex": "1F7A3" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "201", "Dingbat hex": "C9", "Unicode dec": "128932", "Unicode hex": "1F7A4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "202", "Dingbat hex": "CA", "Unicode dec": "128933", "Unicode hex": "1F7A5" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "203", "Dingbat hex": "CB", "Unicode dec": "128934", "Unicode hex": "1F7A6" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "204", "Dingbat hex": "CC", "Unicode dec": "128935", "Unicode hex": "1F7A7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "205", "Dingbat hex": "CD", "Unicode dec": "128936", "Unicode hex": "1F7A8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "206", "Dingbat hex": "CE", "Unicode dec": "128937", "Unicode hex": "1F7A9" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "207", "Dingbat hex": "CF", "Unicode dec": "128938", "Unicode hex": "1F7AA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "208", "Dingbat hex": "D0", "Unicode dec": "128939", "Unicode hex": "1F7AB" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "209", "Dingbat hex": "D1", "Unicode dec": "128940", "Unicode hex": "1F7AC" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "210", "Dingbat hex": "D2", "Unicode dec": "128941", "Unicode hex": "1F7AD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "211", "Dingbat hex": "D3", "Unicode dec": "128942", "Unicode hex": "1F7AE" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "212", "Dingbat hex": "D4", "Unicode dec": "128943", "Unicode hex": "1F7AF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "213", "Dingbat hex": "D5", "Unicode dec": "128944", "Unicode hex": "1F7B0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "214", "Dingbat hex": "D6", "Unicode dec": "128945", "Unicode hex": "1F7B1" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "215", "Dingbat hex": "D7", "Unicode dec": "128946", "Unicode hex": "1F7B2" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "216", "Dingbat hex": "D8", "Unicode dec": "128947", "Unicode hex": "1F7B3" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "217", "Dingbat hex": "D9", "Unicode dec": "128948", "Unicode hex": "1F7B4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "218", "Dingbat hex": "DA", "Unicode dec": "128949", "Unicode hex": "1F7B5" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "219", "Dingbat hex": "DB", "Unicode dec": "128950", "Unicode hex": "1F7B6" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "220", "Dingbat hex": "DC", "Unicode dec": "128951", "Unicode hex": "1F7B7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "221", "Dingbat hex": "DD", "Unicode dec": "128952", "Unicode hex": "1F7B8" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "222", "Dingbat hex": "DE", "Unicode dec": "128953", "Unicode hex": "1F7B9" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "223", "Dingbat hex": "DF", "Unicode dec": "128954", "Unicode hex": "1F7BA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "224", "Dingbat hex": "E0", "Unicode dec": "128955", "Unicode hex": "1F7BB" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "225", "Dingbat hex": "E1", "Unicode dec": "128956", "Unicode hex": "1F7BC" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "226", "Dingbat hex": "E2", "Unicode dec": "128957", "Unicode hex": "1F7BD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "227", "Dingbat hex": "E3", "Unicode dec": "128958", "Unicode hex": "1F7BE" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "228", "Dingbat hex": "E4", "Unicode dec": "128959", "Unicode hex": "1F7BF" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "229", "Dingbat hex": "E5", "Unicode dec": "128960", "Unicode hex": "1F7C0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "230", "Dingbat hex": "E6", "Unicode dec": "128962", "Unicode hex": "1F7C2" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "231", "Dingbat hex": "E7", "Unicode dec": "128964", "Unicode hex": "1F7C4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "232", "Dingbat hex": "E8", "Unicode dec": "128966", "Unicode hex": "1F7C6" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "233", "Dingbat hex": "E9", "Unicode dec": "128969", "Unicode hex": "1F7C9" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "234", "Dingbat hex": "EA", "Unicode dec": "128970", "Unicode hex": "1F7CA" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "235", "Dingbat hex": "EB", "Unicode dec": "10038", "Unicode hex": "2736" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "236", "Dingbat hex": "EC", "Unicode dec": "128972", "Unicode hex": "1F7CC" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "237", "Dingbat hex": "ED", "Unicode dec": "128974", "Unicode hex": "1F7CE" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "238", "Dingbat hex": "EE", "Unicode dec": "128976", "Unicode hex": "1F7D0" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "239", "Dingbat hex": "EF", "Unicode dec": "128978", "Unicode hex": "1F7D2" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "240", "Dingbat hex": "F0", "Unicode dec": "10041", "Unicode hex": "2739" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "241", "Dingbat hex": "F1", "Unicode dec": "128963", "Unicode hex": "1F7C3" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "242", "Dingbat hex": "F2", "Unicode dec": "128967", "Unicode hex": "1F7C7" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "243", "Dingbat hex": "F3", "Unicode dec": "10031", "Unicode hex": "272F" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "244", "Dingbat hex": "F4", "Unicode dec": "128973", "Unicode hex": "1F7CD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "245", "Dingbat hex": "F5", "Unicode dec": "128980", "Unicode hex": "1F7D4" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "246", "Dingbat hex": "F6", "Unicode dec": "11212", "Unicode hex": "2BCC" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "247", "Dingbat hex": "F7", "Unicode dec": "11213", "Unicode hex": "2BCD" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "248", "Dingbat hex": "F8", "Unicode dec": "8251", "Unicode hex": "203B" },
  { "Typeface name": "Wingdings 2", "Dingbat dec": "249", "Dingbat hex": "F9", "Unicode dec": "8258", "Unicode hex": "2042" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "32", "Dingbat hex": "20", "Unicode dec": "32", "Unicode hex": "20" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "33", "Dingbat hex": "21", "Unicode dec": "11104", "Unicode hex": "2B60" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "34", "Dingbat hex": "22", "Unicode dec": "11106", "Unicode hex": "2B62" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "35", "Dingbat hex": "23", "Unicode dec": "11105", "Unicode hex": "2B61" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "36", "Dingbat hex": "24", "Unicode dec": "11107", "Unicode hex": "2B63" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "37", "Dingbat hex": "25", "Unicode dec": "11110", "Unicode hex": "2B66" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "38", "Dingbat hex": "26", "Unicode dec": "11111", "Unicode hex": "2B67" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "39", "Dingbat hex": "27", "Unicode dec": "11113", "Unicode hex": "2B69" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "40", "Dingbat hex": "28", "Unicode dec": "11112", "Unicode hex": "2B68" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "41", "Dingbat hex": "29", "Unicode dec": "11120", "Unicode hex": "2B70" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "42", "Dingbat hex": "2A", "Unicode dec": "11122", "Unicode hex": "2B72" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "43", "Dingbat hex": "2B", "Unicode dec": "11121", "Unicode hex": "2B71" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "44", "Dingbat hex": "2C", "Unicode dec": "11123", "Unicode hex": "2B73" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "45", "Dingbat hex": "2D", "Unicode dec": "11126", "Unicode hex": "2B76" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "46", "Dingbat hex": "2E", "Unicode dec": "11128", "Unicode hex": "2B78" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "47", "Dingbat hex": "2F", "Unicode dec": "11131", "Unicode hex": "2B7B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "48", "Dingbat hex": "30", "Unicode dec": "11133", "Unicode hex": "2B7D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "49", "Dingbat hex": "31", "Unicode dec": "11108", "Unicode hex": "2B64" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "50", "Dingbat hex": "32", "Unicode dec": "11109", "Unicode hex": "2B65" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "51", "Dingbat hex": "33", "Unicode dec": "11114", "Unicode hex": "2B6A" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "52", "Dingbat hex": "34", "Unicode dec": "11116", "Unicode hex": "2B6C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "53", "Dingbat hex": "35", "Unicode dec": "11115", "Unicode hex": "2B6B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "54", "Dingbat hex": "36", "Unicode dec": "11117", "Unicode hex": "2B6D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "55", "Dingbat hex": "37", "Unicode dec": "11085", "Unicode hex": "2B4D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "56", "Dingbat hex": "38", "Unicode dec": "11168", "Unicode hex": "2BA0" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "57", "Dingbat hex": "39", "Unicode dec": "11169", "Unicode hex": "2BA1" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "58", "Dingbat hex": "3A", "Unicode dec": "11170", "Unicode hex": "2BA2" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "59", "Dingbat hex": "3B", "Unicode dec": "11171", "Unicode hex": "2BA3" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "60", "Dingbat hex": "3C", "Unicode dec": "11172", "Unicode hex": "2BA4" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "61", "Dingbat hex": "3D", "Unicode dec": "11173", "Unicode hex": "2BA5" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "62", "Dingbat hex": "3E", "Unicode dec": "11174", "Unicode hex": "2BA6" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "63", "Dingbat hex": "3F", "Unicode dec": "11175", "Unicode hex": "2BA7" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "64", "Dingbat hex": "40", "Unicode dec": "11152", "Unicode hex": "2B90" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "65", "Dingbat hex": "41", "Unicode dec": "11153", "Unicode hex": "2B91" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "66", "Dingbat hex": "42", "Unicode dec": "11154", "Unicode hex": "2B92" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "67", "Dingbat hex": "43", "Unicode dec": "11155", "Unicode hex": "2B93" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "68", "Dingbat hex": "44", "Unicode dec": "11136", "Unicode hex": "2B80" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "69", "Dingbat hex": "45", "Unicode dec": "11139", "Unicode hex": "2B83" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "70", "Dingbat hex": "46", "Unicode dec": "11134", "Unicode hex": "2B7E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "71", "Dingbat hex": "47", "Unicode dec": "11135", "Unicode hex": "2B7F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "72", "Dingbat hex": "48", "Unicode dec": "11140", "Unicode hex": "2B84" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "73", "Dingbat hex": "49", "Unicode dec": "11142", "Unicode hex": "2B86" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "74", "Dingbat hex": "4A", "Unicode dec": "11141", "Unicode hex": "2B85" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "75", "Dingbat hex": "4B", "Unicode dec": "11143", "Unicode hex": "2B87" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "76", "Dingbat hex": "4C", "Unicode dec": "11151", "Unicode hex": "2B8F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "77", "Dingbat hex": "4D", "Unicode dec": "11149", "Unicode hex": "2B8D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "78", "Dingbat hex": "4E", "Unicode dec": "11150", "Unicode hex": "2B8E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "79", "Dingbat hex": "4F", "Unicode dec": "11148", "Unicode hex": "2B8C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "80", "Dingbat hex": "50", "Unicode dec": "11118", "Unicode hex": "2B6E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "81", "Dingbat hex": "51", "Unicode dec": "11119", "Unicode hex": "2B6F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "82", "Dingbat hex": "52", "Unicode dec": "9099", "Unicode hex": "238B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "83", "Dingbat hex": "53", "Unicode dec": "8996", "Unicode hex": "2324" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "84", "Dingbat hex": "54", "Unicode dec": "8963", "Unicode hex": "2303" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "85", "Dingbat hex": "55", "Unicode dec": "8997", "Unicode hex": "2325" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "86", "Dingbat hex": "56", "Unicode dec": "9251", "Unicode hex": "2423" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "87", "Dingbat hex": "57", "Unicode dec": "9085", "Unicode hex": "237D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "88", "Dingbat hex": "58", "Unicode dec": "8682", "Unicode hex": "21EA" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "89", "Dingbat hex": "59", "Unicode dec": "11192", "Unicode hex": "2BB8" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "90", "Dingbat hex": "5A", "Unicode dec": "129184", "Unicode hex": "1F8A0" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "91", "Dingbat hex": "5B", "Unicode dec": "129185", "Unicode hex": "1F8A1" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "92", "Dingbat hex": "5C", "Unicode dec": "129186", "Unicode hex": "1F8A2" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "93", "Dingbat hex": "5D", "Unicode dec": "129187", "Unicode hex": "1F8A3" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "94", "Dingbat hex": "5E", "Unicode dec": "129188", "Unicode hex": "1F8A4" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "95", "Dingbat hex": "5F", "Unicode dec": "129189", "Unicode hex": "1F8A5" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "96", "Dingbat hex": "60", "Unicode dec": "129190", "Unicode hex": "1F8A6" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "97", "Dingbat hex": "61", "Unicode dec": "129191", "Unicode hex": "1F8A7" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "98", "Dingbat hex": "62", "Unicode dec": "129192", "Unicode hex": "1F8A8" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "99", "Dingbat hex": "63", "Unicode dec": "129193", "Unicode hex": "1F8A9" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "100", "Dingbat hex": "64", "Unicode dec": "129194", "Unicode hex": "1F8AA" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "101", "Dingbat hex": "65", "Unicode dec": "129195", "Unicode hex": "1F8AB" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "102", "Dingbat hex": "66", "Unicode dec": "129104", "Unicode hex": "1F850" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "103", "Dingbat hex": "67", "Unicode dec": "129106", "Unicode hex": "1F852" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "104", "Dingbat hex": "68", "Unicode dec": "129105", "Unicode hex": "1F851" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "105", "Dingbat hex": "69", "Unicode dec": "129107", "Unicode hex": "1F853" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "106", "Dingbat hex": "6A", "Unicode dec": "129108", "Unicode hex": "1F854" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "107", "Dingbat hex": "6B", "Unicode dec": "129109", "Unicode hex": "1F855" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "108", "Dingbat hex": "6C", "Unicode dec": "129111", "Unicode hex": "1F857" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "109", "Dingbat hex": "6D", "Unicode dec": "129110", "Unicode hex": "1F856" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "110", "Dingbat hex": "6E", "Unicode dec": "129112", "Unicode hex": "1F858" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "111", "Dingbat hex": "6F", "Unicode dec": "129113", "Unicode hex": "1F859" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "112", "Dingbat hex": "70", "Unicode dec": "9650", "Unicode hex": "25B2" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "113", "Dingbat hex": "71", "Unicode dec": "9660", "Unicode hex": "25BC" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "114", "Dingbat hex": "72", "Unicode dec": "9651", "Unicode hex": "25B3" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "115", "Dingbat hex": "73", "Unicode dec": "9661", "Unicode hex": "25BD" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "116", "Dingbat hex": "74", "Unicode dec": "9664", "Unicode hex": "25C0" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "117", "Dingbat hex": "75", "Unicode dec": "9654", "Unicode hex": "25B6" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "118", "Dingbat hex": "76", "Unicode dec": "9665", "Unicode hex": "25C1" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "119", "Dingbat hex": "77", "Unicode dec": "9655", "Unicode hex": "25B7" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "120", "Dingbat hex": "78", "Unicode dec": "9699", "Unicode hex": "25E3" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "121", "Dingbat hex": "79", "Unicode dec": "9698", "Unicode hex": "25E2" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "122", "Dingbat hex": "7A", "Unicode dec": "9700", "Unicode hex": "25E4" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "123", "Dingbat hex": "7B", "Unicode dec": "9701", "Unicode hex": "25E5" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "124", "Dingbat hex": "7C", "Unicode dec": "128896", "Unicode hex": "1F780" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "125", "Dingbat hex": "7D", "Unicode dec": "128898", "Unicode hex": "1F782" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "126", "Dingbat hex": "7E", "Unicode dec": "128897", "Unicode hex": "1F781" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "128", "Dingbat hex": "80", "Unicode dec": "128899", "Unicode hex": "1F783" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "129", "Dingbat hex": "81", "Unicode dec": "11205", "Unicode hex": "2BC5" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "130", "Dingbat hex": "82", "Unicode dec": "11206", "Unicode hex": "2BC6" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "131", "Dingbat hex": "83", "Unicode dec": "11207", "Unicode hex": "2BC7" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "132", "Dingbat hex": "84", "Unicode dec": "11208", "Unicode hex": "2BC8" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "133", "Dingbat hex": "85", "Unicode dec": "11164", "Unicode hex": "2B9C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "134", "Dingbat hex": "86", "Unicode dec": "11166", "Unicode hex": "2B9E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "135", "Dingbat hex": "87", "Unicode dec": "11165", "Unicode hex": "2B9D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "136", "Dingbat hex": "88", "Unicode dec": "11167", "Unicode hex": "2B9F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "137", "Dingbat hex": "89", "Unicode dec": "129040", "Unicode hex": "1F810" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "138", "Dingbat hex": "8A", "Unicode dec": "129042", "Unicode hex": "1F812" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "139", "Dingbat hex": "8B", "Unicode dec": "129041", "Unicode hex": "1F811" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "140", "Dingbat hex": "8C", "Unicode dec": "129043", "Unicode hex": "1F813" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "141", "Dingbat hex": "8D", "Unicode dec": "129044", "Unicode hex": "1F814" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "142", "Dingbat hex": "8E", "Unicode dec": "129046", "Unicode hex": "1F816" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "143", "Dingbat hex": "8F", "Unicode dec": "129045", "Unicode hex": "1F815" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "144", "Dingbat hex": "90", "Unicode dec": "129047", "Unicode hex": "1F817" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "145", "Dingbat hex": "91", "Unicode dec": "129048", "Unicode hex": "1F818" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "146", "Dingbat hex": "92", "Unicode dec": "129050", "Unicode hex": "1F81A" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "147", "Dingbat hex": "93", "Unicode dec": "129049", "Unicode hex": "1F819" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "148", "Dingbat hex": "94", "Unicode dec": "129051", "Unicode hex": "1F81B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "149", "Dingbat hex": "95", "Unicode dec": "129052", "Unicode hex": "1F81C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "150", "Dingbat hex": "96", "Unicode dec": "129054", "Unicode hex": "1F81E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "151", "Dingbat hex": "97", "Unicode dec": "129053", "Unicode hex": "1F81D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "152", "Dingbat hex": "98", "Unicode dec": "129055", "Unicode hex": "1F81F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "153", "Dingbat hex": "99", "Unicode dec": "129024", "Unicode hex": "1F800" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "154", "Dingbat hex": "9A", "Unicode dec": "129026", "Unicode hex": "1F802" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "155", "Dingbat hex": "9B", "Unicode dec": "129025", "Unicode hex": "1F801" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "156", "Dingbat hex": "9C", "Unicode dec": "129027", "Unicode hex": "1F803" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "157", "Dingbat hex": "9D", "Unicode dec": "129028", "Unicode hex": "1F804" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "158", "Dingbat hex": "9E", "Unicode dec": "129030", "Unicode hex": "1F806" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "159", "Dingbat hex": "9F", "Unicode dec": "129029", "Unicode hex": "1F805" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "160", "Dingbat hex": "A0", "Unicode dec": "129031", "Unicode hex": "1F807" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "161", "Dingbat hex": "A1", "Unicode dec": "129032", "Unicode hex": "1F808" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "162", "Dingbat hex": "A2", "Unicode dec": "129034", "Unicode hex": "1F80A" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "163", "Dingbat hex": "A3", "Unicode dec": "129033", "Unicode hex": "1F809" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "164", "Dingbat hex": "A4", "Unicode dec": "129035", "Unicode hex": "1F80B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "165", "Dingbat hex": "A5", "Unicode dec": "129056", "Unicode hex": "1F820" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "166", "Dingbat hex": "A6", "Unicode dec": "129058", "Unicode hex": "1F822" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "167", "Dingbat hex": "A7", "Unicode dec": "129060", "Unicode hex": "1F824" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "168", "Dingbat hex": "A8", "Unicode dec": "129062", "Unicode hex": "1F826" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "169", "Dingbat hex": "A9", "Unicode dec": "129064", "Unicode hex": "1F828" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "170", "Dingbat hex": "AA", "Unicode dec": "129066", "Unicode hex": "1F82A" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "171", "Dingbat hex": "AB", "Unicode dec": "129068", "Unicode hex": "1F82C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "172", "Dingbat hex": "AC", "Unicode dec": "129180", "Unicode hex": "1F89C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "173", "Dingbat hex": "AD", "Unicode dec": "129181", "Unicode hex": "1F89D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "174", "Dingbat hex": "AE", "Unicode dec": "129182", "Unicode hex": "1F89E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "175", "Dingbat hex": "AF", "Unicode dec": "129183", "Unicode hex": "1F89F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "176", "Dingbat hex": "B0", "Unicode dec": "129070", "Unicode hex": "1F82E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "177", "Dingbat hex": "B1", "Unicode dec": "129072", "Unicode hex": "1F830" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "178", "Dingbat hex": "B2", "Unicode dec": "129074", "Unicode hex": "1F832" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "179", "Dingbat hex": "B3", "Unicode dec": "129076", "Unicode hex": "1F834" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "180", "Dingbat hex": "B4", "Unicode dec": "129078", "Unicode hex": "1F836" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "181", "Dingbat hex": "B5", "Unicode dec": "129080", "Unicode hex": "1F838" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "182", "Dingbat hex": "B6", "Unicode dec": "129082", "Unicode hex": "1F83A" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "183", "Dingbat hex": "B7", "Unicode dec": "129081", "Unicode hex": "1F839" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "184", "Dingbat hex": "B8", "Unicode dec": "129083", "Unicode hex": "1F83B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "185", "Dingbat hex": "B9", "Unicode dec": "129176", "Unicode hex": "1F898" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "186", "Dingbat hex": "BA", "Unicode dec": "129178", "Unicode hex": "1F89A" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "187", "Dingbat hex": "BB", "Unicode dec": "129177", "Unicode hex": "1F899" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "188", "Dingbat hex": "BC", "Unicode dec": "129179", "Unicode hex": "1F89B" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "189", "Dingbat hex": "BD", "Unicode dec": "129084", "Unicode hex": "1F83C" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "190", "Dingbat hex": "BE", "Unicode dec": "129086", "Unicode hex": "1F83E" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "191", "Dingbat hex": "BF", "Unicode dec": "129085", "Unicode hex": "1F83D" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "192", "Dingbat hex": "C0", "Unicode dec": "129087", "Unicode hex": "1F83F" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "193", "Dingbat hex": "C1", "Unicode dec": "129088", "Unicode hex": "1F840" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "194", "Dingbat hex": "C2", "Unicode dec": "129090", "Unicode hex": "1F842" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "195", "Dingbat hex": "C3", "Unicode dec": "129089", "Unicode hex": "1F841" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "196", "Dingbat hex": "C4", "Unicode dec": "129091", "Unicode hex": "1F843" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "197", "Dingbat hex": "C5", "Unicode dec": "129092", "Unicode hex": "1F844" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "198", "Dingbat hex": "C6", "Unicode dec": "129094", "Unicode hex": "1F846" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "199", "Dingbat hex": "C7", "Unicode dec": "129093", "Unicode hex": "1F845" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "200", "Dingbat hex": "C8", "Unicode dec": "129095", "Unicode hex": "1F847" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "201", "Dingbat hex": "C9", "Unicode dec": "11176", "Unicode hex": "2BA8" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "202", "Dingbat hex": "CA", "Unicode dec": "11177", "Unicode hex": "2BA9" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "203", "Dingbat hex": "CB", "Unicode dec": "11178", "Unicode hex": "2BAA" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "204", "Dingbat hex": "CC", "Unicode dec": "11179", "Unicode hex": "2BAB" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "205", "Dingbat hex": "CD", "Unicode dec": "11180", "Unicode hex": "2BAC" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "206", "Dingbat hex": "CE", "Unicode dec": "11181", "Unicode hex": "2BAD" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "207", "Dingbat hex": "CF", "Unicode dec": "11182", "Unicode hex": "2BAE" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "208", "Dingbat hex": "D0", "Unicode dec": "11183", "Unicode hex": "2BAF" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "209", "Dingbat hex": "D1", "Unicode dec": "129120", "Unicode hex": "1F860" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "210", "Dingbat hex": "D2", "Unicode dec": "129122", "Unicode hex": "1F862" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "211", "Dingbat hex": "D3", "Unicode dec": "129121", "Unicode hex": "1F861" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "212", "Dingbat hex": "D4", "Unicode dec": "129123", "Unicode hex": "1F863" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "213", "Dingbat hex": "D5", "Unicode dec": "129124", "Unicode hex": "1F864" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "214", "Dingbat hex": "D6", "Unicode dec": "129125", "Unicode hex": "1F865" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "215", "Dingbat hex": "D7", "Unicode dec": "129127", "Unicode hex": "1F867" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "216", "Dingbat hex": "D8", "Unicode dec": "129126", "Unicode hex": "1F866" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "217", "Dingbat hex": "D9", "Unicode dec": "129136", "Unicode hex": "1F870" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "218", "Dingbat hex": "DA", "Unicode dec": "129138", "Unicode hex": "1F872" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "219", "Dingbat hex": "DB", "Unicode dec": "129137", "Unicode hex": "1F871" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "220", "Dingbat hex": "DC", "Unicode dec": "129139", "Unicode hex": "1F873" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "221", "Dingbat hex": "DD", "Unicode dec": "129140", "Unicode hex": "1F874" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "222", "Dingbat hex": "DE", "Unicode dec": "129141", "Unicode hex": "1F875" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "223", "Dingbat hex": "DF", "Unicode dec": "129143", "Unicode hex": "1F877" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "224", "Dingbat hex": "E0", "Unicode dec": "129142", "Unicode hex": "1F876" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "225", "Dingbat hex": "E1", "Unicode dec": "129152", "Unicode hex": "1F880" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "226", "Dingbat hex": "E2", "Unicode dec": "129154", "Unicode hex": "1F882" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "227", "Dingbat hex": "E3", "Unicode dec": "129153", "Unicode hex": "1F881" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "228", "Dingbat hex": "E4", "Unicode dec": "129155", "Unicode hex": "1F883" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "229", "Dingbat hex": "E5", "Unicode dec": "129156", "Unicode hex": "1F884" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "230", "Dingbat hex": "E6", "Unicode dec": "129157", "Unicode hex": "1F885" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "231", "Dingbat hex": "E7", "Unicode dec": "129159", "Unicode hex": "1F887" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "232", "Dingbat hex": "E8", "Unicode dec": "129158", "Unicode hex": "1F886" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "233", "Dingbat hex": "E9", "Unicode dec": "129168", "Unicode hex": "1F890" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "234", "Dingbat hex": "EA", "Unicode dec": "129170", "Unicode hex": "1F892" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "235", "Dingbat hex": "EB", "Unicode dec": "129169", "Unicode hex": "1F891" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "236", "Dingbat hex": "EC", "Unicode dec": "129171", "Unicode hex": "1F893" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "237", "Dingbat hex": "ED", "Unicode dec": "129172", "Unicode hex": "1F894" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "238", "Dingbat hex": "EE", "Unicode dec": "129174", "Unicode hex": "1F896" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "239", "Dingbat hex": "EF", "Unicode dec": "129173", "Unicode hex": "1F895" },
  { "Typeface name": "Wingdings 3", "Dingbat dec": "240", "Dingbat hex": "F0", "Unicode dec": "129175", "Unicode hex": "1F897" }
];
dl.default = j8;
var Z8 = re && re.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(An, "__esModule", { value: !0 });
An.hex = An.dec = An.codePoint = void 0;
var X8 = Z8(dl), a1 = {}, V8 = String.fromCodePoint ? String.fromCodePoint : K8;
for (var ou = 0, dg = X8.default; ou < dg.length; ou++) {
  var cu = dg[ou], lg = parseInt(cu["Unicode dec"], 10), H8 = {
    codePoint: lg,
    string: V8(lg)
  };
  a1[cu["Typeface name"].toUpperCase() + "_" + cu["Dingbat dec"]] = H8;
}
function ll(e, t) {
  return a1[e.toUpperCase() + "_" + t];
}
An.codePoint = ll;
function G8(e, t) {
  return ll(e, parseInt(t, 10));
}
An.dec = G8;
function Y8(e, t) {
  return ll(e, parseInt(t, 16));
}
An.hex = Y8;
function K8(e) {
  if (e <= 65535)
    return String.fromCharCode(e);
  var t = Math.floor((e - 65536) / 1024) + 55296, n = (e - 65536) % 1024 + 56320;
  return String.fromCharCode(t, n);
}
var In = {}, fg = Se;
In.paragraph = J8;
In.run = Q8;
In._elements = o1;
In._elementsOfType = fl;
In.getDescendantsOfType = eA;
In.getDescendants = c1;
function J8(e) {
  return fl("paragraph", e);
}
function Q8(e) {
  return fl("run", e);
}
function fl(e, t) {
  return o1(function(n) {
    return n.type === e ? t(n) : n;
  });
}
function o1(e) {
  return function t(n) {
    if (n.children) {
      var r = fg.map(n.children, t);
      n = fg.extend(n, { children: r });
    }
    return e(n);
  };
}
function eA(e, t) {
  return c1(e).filter(function(n) {
    return n.type === t;
  });
}
function c1(e) {
  var t = [];
  return s1(e, function(n) {
    t.push(n);
  }), t;
}
function s1(e, t) {
  e.children && e.children.forEach(function(n) {
    s1(n, t), t(n);
  });
}
var hl = {};
hl.uriToZipEntryName = tA;
hl.replaceFragment = nA;
function tA(e, t) {
  return t.charAt(0) === "/" ? t.substr(1) : e + "/" + t;
}
function nA(e, t) {
  var n = e.indexOf("#");
  return n !== -1 && (e = e.substring(0, n)), e + "#" + t;
}
ul.createBodyReader = aA;
ul._readNumberingProperties = d1;
var hg = An, xt = Se, _e = se, u1 = bt.Result, on = bt.warning, rA = pn, iA = In, pg = hl;
function aA(e) {
  return {
    readXmlElement: function(t) {
      return new gg(e).readXmlElement(t);
    },
    readXmlElements: function(t) {
      return new gg(e).readXmlElements(t);
    }
  };
}
function gg(e) {
  var t = [], n = [], r = [], i = e.relationships, a = e.contentTypes, o = e.docxFile, c = e.files, u = e.numbering, s = e.styles;
  function d(R) {
    var M = R.map(g);
    return mg(M);
  }
  function g(R) {
    if (R.type === "element") {
      var M = A[R.name];
      if (M)
        return M(R);
      if (!Object.prototype.hasOwnProperty.call(cA, R.name)) {
        var V = on("An unrecognised element was ignored: " + R.name);
        return ai([V]);
      }
    }
    return xr();
  }
  function f(R) {
    return v(R).map(function(M) {
      return {
        type: "paragraphProperties",
        styleId: M.styleId,
        styleName: M.name,
        alignment: R.firstOrEmpty("w:jc").attributes["w:val"],
        numbering: d1(M.styleId, R.firstOrEmpty("w:numPr"), u),
        indent: p(R.firstOrEmpty("w:ind"))
      };
    });
  }
  function p(R) {
    return {
      start: R.attributes["w:start"] || R.attributes["w:left"],
      end: R.attributes["w:end"] || R.attributes["w:right"],
      firstLine: R.attributes["w:firstLine"],
      hanging: R.attributes["w:hanging"]
    };
  }
  function b(R) {
    return D(R).map(function(M) {
      var V = R.firstOrEmpty("w:sz").attributes["w:val"], ne = /^[0-9]+$/.test(V) ? parseInt(V, 10) / 2 : null;
      return {
        type: "runProperties",
        styleId: M.styleId,
        styleName: M.name,
        verticalAlignment: R.firstOrEmpty("w:vertAlign").attributes["w:val"],
        font: R.firstOrEmpty("w:rFonts").attributes["w:ascii"],
        fontSize: ne,
        isBold: y(R.first("w:b")),
        isUnderline: m(R.first("w:u")),
        isItalic: y(R.first("w:i")),
        isStrikethrough: y(R.first("w:strike")),
        isAllCaps: y(R.first("w:caps")),
        isSmallCaps: y(R.first("w:smallCaps")),
        highlight: l(R.firstOrEmpty("w:highlight").attributes["w:val"])
      };
    });
  }
  function m(R) {
    if (R) {
      var M = R.attributes["w:val"];
      return M !== void 0 && M !== "false" && M !== "0" && M !== "none";
    } else
      return !1;
  }
  function y(R) {
    if (R) {
      var M = R.attributes["w:val"];
      return M !== "false" && M !== "0";
    } else
      return !1;
  }
  function h(R) {
    return R !== "false" && R !== "0";
  }
  function l(R) {
    return !R || R === "none" ? null : R;
  }
  function v(R) {
    return w(R, "w:pStyle", "Paragraph", s.findParagraphStyleById);
  }
  function D(R) {
    return w(R, "w:rStyle", "Run", s.findCharacterStyleById);
  }
  function x(R) {
    return w(R, "w:tblStyle", "Table", s.findTableStyleById);
  }
  function w(R, M, V, ne) {
    var oe = [], le = R.first(M), Ue = null, Ne = null;
    if (le && (Ue = le.attributes["w:val"], Ue)) {
      var Jt = ne(Ue);
      Jt ? Ne = Jt.name : oe.push(K(V, Ue));
    }
    return Ua({ styleId: Ue, name: Ne }, oe);
  }
  function E(R) {
    var M = R.attributes["w:fldCharType"];
    if (M === "begin")
      t.push({ type: "begin", fldChar: R }), n = [];
    else if (M === "end") {
      var V = t.pop();
      if (V.type === "begin" && (V = W(V)), V.type === "checkbox")
        return ht(_e.checkbox({
          checked: V.checked
        }));
    } else if (M === "separate") {
      var ne = t.pop(), oe = W(ne);
      t.push(oe);
    }
    return xr();
  }
  function k() {
    var R = xt.last(t.filter(function(M) {
      return M.type === "hyperlink";
    }));
    return R ? R.options : null;
  }
  function W(R) {
    return q(
      n.join(""),
      R.type === "begin" ? R.fldChar : rA.emptyElement
    );
  }
  function q(R, M) {
    var V = /\s*HYPERLINK "(.*)"/.exec(R);
    if (V)
      return { type: "hyperlink", options: { href: V[1] } };
    var ne = /\s*HYPERLINK\s+\\l\s+"(.*)"/.exec(R);
    if (ne)
      return { type: "hyperlink", options: { anchor: ne[1] } };
    var oe = /\s*FORMCHECKBOX\s*/.exec(R);
    if (oe) {
      var le = M.firstOrEmpty("w:ffData").firstOrEmpty("w:checkBox"), Ue = le.first("w:checked"), Ne = Ue == null ? y(le.first("w:default")) : y(Ue);
      return { type: "checkbox", checked: Ne };
    }
    return { type: "unknown" };
  }
  function $(R) {
    return n.push(R.text()), xr();
  }
  function B(R) {
    var M = R.attributes["w:font"], V = R.attributes["w:char"], ne = hg.hex(M, V);
    return ne == null && /^F0..$/.test(V) && (ne = hg.hex(M, V.substring(2))), ne == null ? ai([on(
      "A w:sym element with an unsupported character was ignored: char " + V + " in font " + M
    )]) : ht(new _e.Text(ne.string));
  }
  function P(R) {
    return function(M) {
      var V = M.attributes["w:id"];
      return ht(new _e.NoteReference({
        noteType: R,
        noteId: V
      }));
    };
  }
  function H(R) {
    return ht(_e.commentReference({
      commentId: R.attributes["w:id"]
    }));
  }
  function Q(R) {
    return d(R.children);
  }
  var A = {
    "w:p": function(R) {
      var M = R.firstOrEmpty("w:pPr"), V = !!M.firstOrEmpty("w:rPr").first("w:del");
      if (V)
        return R.children.forEach(function(oe) {
          r.push(oe);
        }), xr();
      var ne = R.children;
      return r.length > 0 && (ne = r.concat(ne), r = []), Ze.map(
        f(M),
        d(ne),
        function(oe, le) {
          return new _e.Paragraph(le, oe);
        }
      ).insertExtra();
    },
    "w:r": function(R) {
      return Ze.map(
        b(R.firstOrEmpty("w:rPr")),
        d(R.children),
        function(M, V) {
          var ne = k();
          return ne !== null && (V = [new _e.Hyperlink(V, ne)]), new _e.Run(V, M);
        }
      );
    },
    "w:fldChar": E,
    "w:instrText": $,
    "w:t": function(R) {
      return ht(new _e.Text(R.text()));
    },
    "w:tab": function(R) {
      return ht(new _e.Tab());
    },
    "w:noBreakHyphen": function() {
      return ht(new _e.Text("‑"));
    },
    "w:softHyphen": function(R) {
      return ht(new _e.Text("­"));
    },
    "w:sym": B,
    "w:hyperlink": function(R) {
      var M = R.attributes["r:id"], V = R.attributes["w:anchor"];
      return d(R.children).map(function(ne) {
        function oe(Ue) {
          var Ne = R.attributes["w:tgtFrame"] || null;
          return new _e.Hyperlink(
            ne,
            xt.extend({ targetFrame: Ne }, Ue)
          );
        }
        if (M) {
          var le = i.findTargetByRelationshipId(M);
          return V && (le = pg.replaceFragment(le, V)), oe({ href: le });
        } else return V ? oe({ anchor: V }) : ne;
      });
    },
    "w:tbl": T,
    "w:tr": F,
    "w:tc": O,
    "w:footnoteReference": P("footnote"),
    "w:endnoteReference": P("endnote"),
    "w:commentReference": H,
    "w:br": function(R) {
      var M = R.attributes["w:type"];
      return M == null || M === "textWrapping" ? ht(_e.lineBreak) : M === "page" ? ht(_e.pageBreak) : M === "column" ? ht(_e.columnBreak) : ai([on("Unsupported break type: " + M)]);
    },
    "w:bookmarkStart": function(R) {
      var M = R.attributes["w:name"];
      return M === "_GoBack" ? xr() : ht(new _e.BookmarkStart({ name: M }));
    },
    "mc:AlternateContent": function(R) {
      return Q(R.firstOrEmpty("mc:Fallback"));
    },
    "w:sdt": function(R) {
      var M = d(R.firstOrEmpty("w:sdtContent").children);
      return M.map(function(V) {
        var ne = R.firstOrEmpty("w:sdtPr").first("wordml:checkbox");
        if (ne) {
          var oe = ne.first("wordml:checked"), le = !!oe && h(
            oe.attributes["wordml:val"]
          ), Ue = _e.checkbox({
            checked: le
          }), Ne = !1, Jt = V.map(iA._elementsOfType(
            _e.types.text,
            function(rt) {
              return rt.value.length > 0 && !Ne ? (Ne = !0, Ue) : rt;
            }
          ));
          return Ne ? Jt : Ue;
        } else
          return V;
      });
    },
    "w:ins": Q,
    "w:object": Q,
    "w:smartTag": Q,
    "w:drawing": Q,
    "w:pict": function(R) {
      return Q(R).toExtra();
    },
    "v:roundrect": Q,
    "v:shape": Q,
    "v:textbox": Q,
    "w:txbxContent": Q,
    "wp:inline": z,
    "wp:anchor": z,
    "v:imagedata": U,
    "v:group": Q,
    "v:rect": Q
  };
  return {
    readXmlElement: g,
    readXmlElements: d
  };
  function T(R) {
    var M = _(R.firstOrEmpty("w:tblPr"));
    return d(R.children).flatMap(S).flatMap(function(V) {
      return M.map(function(ne) {
        return _e.Table(V, ne);
      });
    });
  }
  function _(R) {
    return x(R).map(function(M) {
      return {
        styleId: M.styleId,
        styleName: M.name
      };
    });
  }
  function F(R) {
    var M = R.firstOrEmpty("w:trPr"), V = !!M.first("w:del");
    if (V)
      return xr();
    var ne = !!M.first("w:tblHeader");
    return d(R.children).map(function(oe) {
      return _e.TableRow(oe, { isHeader: ne });
    });
  }
  function O(R) {
    return d(R.children).map(function(M) {
      var V = R.firstOrEmpty("w:tcPr"), ne = V.firstOrEmpty("w:gridSpan").attributes["w:val"], oe = ne ? parseInt(ne, 10) : 1, le = _e.TableCell(M, { colSpan: oe });
      return le._vMerge = L(V), le;
    });
  }
  function L(R) {
    var M = R.first("w:vMerge");
    if (M) {
      var V = M.attributes["w:val"];
      return V === "continue" || !V;
    } else
      return null;
  }
  function S(R) {
    var M = xt.any(R, function(oe) {
      return oe.type !== _e.types.tableRow;
    });
    if (M)
      return Ua(R, [on(
        "unexpected non-row element in table, cell merging may be incorrect"
      )]);
    var V = xt.any(R, function(oe) {
      return xt.any(oe.children, function(le) {
        return le.type !== _e.types.tableCell;
      });
    });
    if (V)
      return Ua(R, [on(
        "unexpected non-cell element in table row, cell merging may be incorrect"
      )]);
    var ne = {};
    return R.forEach(function(oe) {
      var le = 0;
      oe.children.forEach(function(Ue) {
        Ue._vMerge && ne[le] ? ne[le].rowSpan++ : (ne[le] = Ue, Ue._vMerge = !1), le += Ue.colSpan;
      });
    }), R.forEach(function(oe) {
      oe.children = oe.children.filter(function(le) {
        return !le._vMerge;
      }), oe.children.forEach(function(le) {
        delete le._vMerge;
      });
    }), ht(R);
  }
  function z(R) {
    var M = R.getElementsByTagName("a:graphic").getElementsByTagName("a:graphicData").getElementsByTagName("pic:pic").getElementsByTagName("pic:blipFill").getElementsByTagName("a:blip");
    return mg(M.map(ee.bind(null, R)));
  }
  function ee(R, M) {
    var V = R.first("wp:docPr").attributes, ne = te(V.descr) ? V.title : V.descr, oe = J(M);
    return oe === null ? ai([on("Could not find image file for a:blip element")]) : Z(oe, ne);
  }
  function te(R) {
    return R == null || /^\s*$/.test(R);
  }
  function J(R) {
    var M = R.attributes["r:embed"], V = R.attributes["r:link"];
    if (M)
      return C(M);
    if (V) {
      var ne = i.findTargetByRelationshipId(V);
      return {
        path: ne,
        read: c.read.bind(c, ne)
      };
    } else
      return null;
  }
  function U(R) {
    var M = R.attributes["r:id"];
    return M ? Z(
      C(M),
      R.attributes["o:title"]
    ) : ai([on("A v:imagedata element without a relationship ID was ignored")]);
  }
  function C(R) {
    var M = pg.uriToZipEntryName("word", i.findTargetByRelationshipId(R));
    return {
      path: M,
      read: o.read.bind(o, M)
    };
  }
  function Z(R, M) {
    var V = a.findContentType(R.path), ne = _e.Image({
      readImage: R.read,
      altText: M,
      contentType: V
    }), oe = oA[V] ? [] : on("Image of type " + V + " is unlikely to display in web browsers");
    return Ua(ne, oe);
  }
  function K(R, M) {
    return on(
      R + " style with ID " + M + " was referenced but not defined in the document"
    );
  }
}
function d1(e, t, n) {
  var r = t.firstOrEmpty("w:ilvl").attributes["w:val"], i = t.firstOrEmpty("w:numId").attributes["w:val"];
  if (r !== void 0 && i !== void 0)
    return n.findLevel(i, r);
  if (e != null) {
    var a = n.findLevelByParagraphStyleId(e);
    if (a != null)
      return a;
  }
  return null;
}
var oA = {
  "image/png": !0,
  "image/gif": !0,
  "image/jpeg": !0,
  "image/svg+xml": !0,
  "image/tiff": !0
}, cA = {
  "office-word:wrap": !0,
  "v:shadow": !0,
  "v:shapetype": !0,
  "w:annotationRef": !0,
  "w:bookmarkEnd": !0,
  "w:sectPr": !0,
  "w:proofErr": !0,
  "w:lastRenderedPageBreak": !0,
  "w:commentRangeStart": !0,
  "w:commentRangeEnd": !0,
  "w:del": !0,
  "w:footnoteRef": !0,
  "w:endnoteRef": !0,
  "w:pPr": !0,
  "w:rPr": !0,
  "w:tblPr": !0,
  "w:tblGrid": !0,
  "w:trPr": !0,
  "w:tcPr": !0
};
function ai(e) {
  return new Ze(null, null, e);
}
function xr() {
  return new Ze(null);
}
function ht(e) {
  return new Ze(e);
}
function Ua(e, t) {
  return new Ze(e, null, t);
}
function Ze(e, t, n) {
  this.value = e || [], this.extra = t || [], this._result = new u1({
    element: this.value,
    extra: t
  }, n), this.messages = this._result.messages;
}
Ze.prototype.toExtra = function() {
  return new Ze(null, Jo(this.extra, this.value), this.messages);
};
Ze.prototype.insertExtra = function() {
  var e = this.extra;
  return e && e.length ? new Ze(Jo(this.value, e), null, this.messages) : this;
};
Ze.prototype.map = function(e) {
  var t = this._result.map(function(n) {
    return e(n.element);
  });
  return new Ze(t.value, this.extra, t.messages);
};
Ze.prototype.flatMap = function(e) {
  var t = this._result.flatMap(function(n) {
    return e(n.element)._result;
  });
  return new Ze(t.value.element, Jo(this.extra, t.value.extra), t.messages);
};
Ze.map = function(e, t, n) {
  return new Ze(
    n(e.value, t.value),
    Jo(e.extra, t.extra),
    e.messages.concat(t.messages)
  );
};
function mg(e) {
  var t = u1.combine(xt.pluck(e, "_result"));
  return new Ze(
    xt.flatten(xt.pluck(t.value, "element")),
    xt.filter(xt.flatten(xt.pluck(t.value, "extra")), sA),
    t.messages
  );
}
function Jo(e, t) {
  return xt.flatten([e, t]);
}
function sA(e) {
  return e;
}
var l1 = {};
l1.DocumentXmlReader = lA;
var uA = se, dA = bt.Result;
function lA(e) {
  var t = e.bodyReader;
  function n(r) {
    var i = r.first("w:body");
    if (i == null)
      throw new Error("Could not find the body element: are you sure this is a docx file?");
    var a = t.readXmlElements(i.children).map(function(o) {
      return new uA.Document(o, {
        notes: e.notes,
        comments: e.comments
      });
    });
    return new dA(a.value, a.messages);
  }
  return {
    convertXmlToDocument: n
  };
}
var Qo = {};
Qo.readRelationships = fA;
Qo.defaultValue = new pl([]);
Qo.Relationships = pl;
function fA(e) {
  var t = [];
  return e.children.forEach(function(n) {
    if (n.name === "relationships:Relationship") {
      var r = {
        relationshipId: n.attributes.Id,
        target: n.attributes.Target,
        type: n.attributes.Type
      };
      t.push(r);
    }
  }), new pl(t);
}
function pl(e) {
  var t = {};
  e.forEach(function(r) {
    t[r.relationshipId] = r.target;
  });
  var n = {};
  return e.forEach(function(r) {
    n[r.type] || (n[r.type] = []), n[r.type].push(r.target);
  }), {
    findTargetByRelationshipId: function(r) {
      return t[r];
    },
    findTargetsByType: function(r) {
      return n[r] || [];
    }
  };
}
var gl = {};
gl.readContentTypesFromXml = pA;
var hA = {
  png: "png",
  gif: "gif",
  jpeg: "jpeg",
  jpg: "jpeg",
  tif: "tiff",
  tiff: "tiff",
  bmp: "bmp"
};
gl.defaultContentTypes = f1({}, {});
function pA(e) {
  var t = {}, n = {};
  return e.children.forEach(function(r) {
    if (r.name === "content-types:Default" && (t[r.attributes.Extension] = r.attributes.ContentType), r.name === "content-types:Override") {
      var i = r.attributes.PartName;
      i.charAt(0) === "/" && (i = i.substring(1)), n[i] = r.attributes.ContentType;
    }
  }), f1(n, t);
}
function f1(e, t) {
  return {
    findContentType: function(n) {
      var r = e[n];
      if (r)
        return r;
      var i = n.split("."), a = i[i.length - 1];
      if (t.hasOwnProperty(a))
        return t[a];
      var o = hA[a.toLowerCase()];
      return o ? "image/" + o : null;
    }
  };
}
var ec = {}, Ea = Se;
ec.readNumberingXml = gA;
ec.Numbering = ml;
ec.defaultNumbering = new ml({}, {});
function ml(e, t, n) {
  var r = Ea.flatten(Ea.values(t).map(function(c) {
    return Ea.values(c.levels);
  })), i = Ea.indexBy(
    r.filter(function(c) {
      return c.paragraphStyleId != null;
    }),
    "paragraphStyleId"
  );
  function a(c, u) {
    var s = e[c];
    if (s) {
      var d = t[s.abstractNumId];
      if (d) {
        if (d.numStyleLink == null)
          return t[s.abstractNumId].levels[u];
        var g = n.findNumberingStyleById(d.numStyleLink);
        return a(g.numId, u);
      } else return null;
    } else
      return null;
  }
  function o(c) {
    return i[c] || null;
  }
  return {
    findLevel: a,
    findLevelByParagraphStyleId: o
  };
}
function gA(e, t) {
  if (!t || !t.styles)
    throw new Error("styles is missing");
  var n = mA(e), r = yA(e);
  return new ml(r, n, t.styles);
}
function mA(e) {
  var t = {};
  return e.getElementsByTagName("w:abstractNum").forEach(function(n) {
    var r = n.attributes["w:abstractNumId"];
    t[r] = bA(n);
  }), t;
}
function bA(e) {
  var t = {};
  e.getElementsByTagName("w:lvl").forEach(function(r) {
    var i = r.attributes["w:ilvl"], a = r.firstOrEmpty("w:numFmt").attributes["w:val"], o = r.firstOrEmpty("w:pStyle").attributes["w:val"];
    t[i] = {
      isOrdered: a !== "bullet",
      level: i,
      paragraphStyleId: o
    };
  });
  var n = e.firstOrEmpty("w:numStyleLink").attributes["w:val"];
  return { levels: t, numStyleLink: n };
}
function yA(e) {
  var t = {};
  return e.getElementsByTagName("w:num").forEach(function(n) {
    var r = n.attributes["w:numId"], i = n.first("w:abstractNumId").attributes["w:val"];
    t[r] = { abstractNumId: i };
  }), t;
}
var tc = {};
tc.readStylesXml = vA;
tc.Styles = Oi;
tc.defaultStyles = new Oi({}, {});
function Oi(e, t, n, r) {
  return {
    findParagraphStyleById: function(i) {
      return e[i];
    },
    findCharacterStyleById: function(i) {
      return t[i];
    },
    findTableStyleById: function(i) {
      return n[i];
    },
    findNumberingStyleById: function(i) {
      return r[i];
    }
  };
}
Oi.EMPTY = new Oi({}, {}, {}, {});
function vA(e) {
  var t = {}, n = {}, r = {}, i = {}, a = {
    paragraph: t,
    character: n,
    table: r
  };
  return e.getElementsByTagName("w:style").forEach(function(o) {
    var c = DA(o);
    if (c.type === "numbering")
      i[c.styleId] = _A(o);
    else {
      var u = a[c.type];
      u && (u[c.styleId] = c);
    }
  }), new Oi(t, n, r, i);
}
function DA(e) {
  var t = e.attributes["w:type"], n = e.attributes["w:styleId"], r = xA(e);
  return { type: t, styleId: n, name: r };
}
function xA(e) {
  var t = e.first("w:name");
  return t ? t.attributes["w:val"] : null;
}
function _A(e) {
  var t = e.firstOrEmpty("w:pPr").firstOrEmpty("w:numPr").firstOrEmpty("w:numId").attributes["w:val"];
  return { numId: t };
}
var bl = {}, wA = se, TA = bt.Result;
bl.createFootnotesReader = h1.bind(re, "footnote");
bl.createEndnotesReader = h1.bind(re, "endnote");
function h1(e, t) {
  function n(a) {
    return TA.combine(a.getElementsByTagName("w:" + e).filter(r).map(i));
  }
  function r(a) {
    var o = a.attributes["w:type"];
    return o !== "continuationSeparator" && o !== "separator";
  }
  function i(a) {
    var o = a.attributes["w:id"];
    return t.readXmlElements(a.children).map(function(c) {
      return wA.Note({ noteType: e, noteId: o, body: c });
    });
  }
  return n;
}
var p1 = {}, UA = se, EA = bt.Result;
function AA(e) {
  function t(r) {
    return EA.combine(r.getElementsByTagName("w:comment").map(n));
  }
  function n(r) {
    var i = r.attributes["w:id"];
    function a(o) {
      return (r.attributes[o] || "").trim() || null;
    }
    return e.readXmlElements(r.children).map(function(o) {
      return UA.comment({
        commentId: i,
        body: o,
        authorName: a("w:author"),
        authorInitials: a("w:initials")
      });
    });
  }
  return t;
}
p1.createCommentsReader = AA;
var yl = {}, nc = { exports: {} };
function g1(e) {
  return e.charAt(0) === "/";
}
function m1(e) {
  var t = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/, n = t.exec(e), r = n[1] || "", i = !!(r && r.charAt(1) !== ":");
  return !!(n[2] || i);
}
nc.exports = process.platform === "win32" ? m1 : g1;
nc.exports.posix = g1;
nc.exports.win32 = m1;
var CA = nc.exports, bg = Wi, FA = dv, SA = lv, kA = Mr.dirname, BA = Mr.resolve, RA = CA, si = $e;
yl.Files = vl;
yl.uriToPath = b1;
function vl(e) {
  function t(r, i) {
    return n(r).then(function(a) {
      return IA(a, i).caught(function(o) {
        var c = "could not open external image: '" + r + "' (document directory: '" + e + `')
` + o.message;
        return si.reject(new Error(c));
      });
    });
  }
  function n(r) {
    var i = b1(r);
    return RA(i) ? si.resolve(i) : e ? si.resolve(BA(e, i)) : si.reject(new Error("could not find external image '" + r + "', path of input document is unknown"));
  }
  return {
    read: t
  };
}
function OA(e) {
  return new vl(kA(e));
}
vl.relativeToFile = OA;
var IA = si.promisify(bg.readFile.bind(bg));
function b1(e, t) {
  t || (t = SA.platform());
  var n = FA.parse(e);
  if (WA(n) || NA(n)) {
    var r = decodeURIComponent(n.path);
    return t === "win32" && /^\/[a-z]:/i.test(r) ? r.slice(1) : r;
  } else
    throw new Error("Could not convert URI to path: " + e);
}
function WA(e) {
  return e.protocol === "file:" && (!e.host || e.host === "localhost");
}
function NA(e) {
  return !e.protocol && !e.host;
}
Fd.read = qA;
Fd._findPartPaths = v1;
var LA = $e, MA = se, su = bt.Result, eo = Pi, y1 = Gd.readXmlFromZipFile, $A = ul.createBodyReader, PA = l1.DocumentXmlReader, Nr = Qo, yg = gl, vg = ec, Dg = tc, xg = bl, zA = p1, _g = yl.Files;
function qA(e, t) {
  return t = t || {}, LA.props({
    contentTypes: ZA(e),
    partPaths: v1(e),
    docxFile: e,
    files: t.path ? _g.relativeToFile(t.path) : new _g(null)
  }).also(function(n) {
    return {
      styles: VA(e, n.partPaths.styles)
    };
  }).also(function(n) {
    return {
      numbering: XA(e, n.partPaths.numbering, n.styles)
    };
  }).also(function(n) {
    return {
      footnotes: Aa(n.partPaths.footnotes, n, function(r, i) {
        return i ? xg.createFootnotesReader(r)(i) : new su([]);
      }),
      endnotes: Aa(n.partPaths.endnotes, n, function(r, i) {
        return i ? xg.createEndnotesReader(r)(i) : new su([]);
      }),
      comments: Aa(n.partPaths.comments, n, function(r, i) {
        return i ? zA.createCommentsReader(r)(i) : new su([]);
      })
    };
  }).also(function(n) {
    return {
      notes: n.footnotes.flatMap(function(r) {
        return n.endnotes.map(function(i) {
          return new MA.Notes(r.concat(i));
        });
      })
    };
  }).then(function(n) {
    return Aa(n.partPaths.mainDocument, n, function(r, i) {
      return n.notes.flatMap(function(a) {
        return n.comments.flatMap(function(o) {
          var c = new PA({
            bodyReader: r,
            notes: a,
            comments: o
          });
          return c.convertXmlToDocument(i);
        });
      });
    });
  });
}
function v1(e) {
  return HA(e).then(function(t) {
    var n = wg({
      docxFile: e,
      relationships: t,
      relationshipType: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
      basePath: "",
      fallbackPath: "word/document.xml"
    });
    if (!e.exists(n))
      throw new Error("Could not find main document part. Are you sure this is a valid .docx file?");
    return ei({
      filename: D1(n),
      readElement: Nr.readRelationships,
      defaultValue: Nr.defaultValue
    })(e).then(function(r) {
      function i(a) {
        return wg({
          docxFile: e,
          relationships: r,
          relationshipType: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/" + a,
          basePath: eo.splitPath(n).dirname,
          fallbackPath: "word/" + a + ".xml"
        });
      }
      return {
        mainDocument: n,
        comments: i("comments"),
        endnotes: i("endnotes"),
        footnotes: i("footnotes"),
        numbering: i("numbering"),
        styles: i("styles")
      };
    });
  });
}
function wg(e) {
  var t = e.docxFile, n = e.relationships, r = e.relationshipType, i = e.basePath, a = e.fallbackPath, o = n.findTargetsByType(r), c = o.map(function(s) {
    return jA(eo.joinPath(i, s), "/");
  }), u = c.filter(function(s) {
    return t.exists(s);
  });
  return u.length === 0 ? a : u[0];
}
function jA(e, t) {
  return e.substring(0, t.length) === t ? e.substring(t.length) : e;
}
function ei(e) {
  return function(t) {
    return y1(t, e.filename).then(function(n) {
      return n ? e.readElement(n) : e.defaultValue;
    });
  };
}
function Aa(e, t, n) {
  var r = ei({
    filename: D1(e),
    readElement: Nr.readRelationships,
    defaultValue: Nr.defaultValue
  });
  return r(t.docxFile).then(function(i) {
    var a = new $A({
      relationships: i,
      contentTypes: t.contentTypes,
      docxFile: t.docxFile,
      numbering: t.numbering,
      styles: t.styles,
      files: t.files
    });
    return y1(t.docxFile, e).then(function(o) {
      return n(a, o);
    });
  });
}
function D1(e) {
  var t = eo.splitPath(e);
  return eo.joinPath(t.dirname, "_rels", t.basename + ".rels");
}
var ZA = ei({
  filename: "[Content_Types].xml",
  readElement: yg.readContentTypesFromXml,
  defaultValue: yg.defaultContentTypes
});
function XA(e, t, n) {
  return ei({
    filename: t,
    readElement: function(r) {
      return vg.readNumberingXml(r, { styles: n });
    },
    defaultValue: vg.defaultNumbering
  })(e);
}
function VA(e, t) {
  return ei({
    filename: t,
    readElement: Dg.readStylesXml,
    defaultValue: Dg.defaultStyles
  })(e);
}
var HA = ei({
  filename: "_rels/.rels",
  readElement: Nr.readRelationships,
  defaultValue: Nr.defaultValue
}), Dl = {}, GA = Se, YA = $e, Ii = pn;
Dl.writeStyleMap = JA;
Dl.readStyleMap = tC;
var KA = "http://schemas.zwobble.org/mammoth/style-map", to = "mammoth/style-map", x1 = "/" + to;
function JA(e, t) {
  return e.write(to, t), QA(e).then(function() {
    return eC(e);
  });
}
function QA(e) {
  var t = "word/_rels/document.xml.rels", n = "http://schemas.openxmlformats.org/package/2006/relationships", r = "{" + n + "}Relationship";
  return e.read(t, "utf8").then(Ii.readString).then(function(i) {
    var a = i.children;
    _1(a, r, "Id", {
      Id: "rMammothStyleMap",
      Type: KA,
      Target: x1
    });
    var o = { "": n };
    return e.write(t, Ii.writeString(i, o));
  });
}
function eC(e) {
  var t = "[Content_Types].xml", n = "http://schemas.openxmlformats.org/package/2006/content-types", r = "{" + n + "}Override";
  return e.read(t, "utf8").then(Ii.readString).then(function(i) {
    var a = i.children;
    _1(a, r, "PartName", {
      PartName: x1,
      ContentType: "text/prs.mammoth.style-map"
    });
    var o = { "": n };
    return e.write(t, Ii.writeString(i, o));
  });
}
function _1(e, t, n, r) {
  var i = GA.find(e, function(a) {
    return a.name === t && a.attributes[n] === r[n];
  });
  i ? i.attributes = r : e.push(Ii.element(t, r));
}
function tC(e) {
  return e.exists(to) ? e.read(to, "utf8") : YA.resolve(null);
}
var xl = {}, Wn = {}, cn = {}, vn = {}, Tg;
function w1() {
  if (Tg) return vn;
  Tg = 1;
  var e = ic();
  function t(u, s, d) {
    return r(
      e.element(u, s, { fresh: !1 }),
      d
    );
  }
  function n(u, s, d) {
    var g = e.element(u, s, { fresh: !0 });
    return r(g, d);
  }
  function r(u, s) {
    return {
      type: "element",
      tag: u,
      children: s || []
    };
  }
  function i(u) {
    return {
      type: "text",
      value: u
    };
  }
  var a = {
    type: "forceWrite"
  };
  vn.freshElement = n, vn.nonFreshElement = t, vn.elementWithTag = r, vn.text = i, vn.forceWrite = a;
  var o = {
    br: !0,
    hr: !0,
    img: !0,
    input: !0
  };
  function c(u) {
    return u.children.length === 0 && o[u.tag.tagName];
  }
  return vn.isVoidElement = c, vn;
}
var uu, Ug;
function nC() {
  if (Ug) return uu;
  Ug = 1;
  var e = Se, t = w1();
  function n(m) {
    return r(s(m));
  }
  function r(m) {
    var y = [];
    return m.map(i).forEach(function(h) {
      u(y, h);
    }), y;
  }
  function i(m) {
    return a[m.type](m);
  }
  var a = {
    element: o,
    text: c,
    forceWrite: c
  };
  function o(m) {
    return t.elementWithTag(m.tag, r(m.children));
  }
  function c(m) {
    return m;
  }
  function u(m, y) {
    var h = m[m.length - 1];
    y.type === "element" && !y.tag.fresh && h && h.type === "element" && y.tag.matchesElement(h.tag) ? (y.tag.separator && u(h.children, t.text(y.tag.separator)), y.children.forEach(function(l) {
      u(h.children, l);
    })) : m.push(y);
  }
  function s(m) {
    return d(m, function(y) {
      return g[y.type](y);
    });
  }
  function d(m, y) {
    return e.flatten(e.map(m, y), !0);
  }
  var g = {
    element: p,
    text: b,
    forceWrite: f
  };
  function f(m) {
    return [m];
  }
  function p(m) {
    var y = s(m.children);
    return y.length === 0 && !t.isVoidElement(m) ? [] : [t.elementWithTag(m.tag, y)];
  }
  function b(m) {
    return m.value.length === 0 ? [] : [m];
  }
  return uu = n, uu;
}
var Eg;
function rc() {
  if (Eg) return cn;
  Eg = 1;
  var e = w1();
  cn.freshElement = e.freshElement, cn.nonFreshElement = e.nonFreshElement, cn.elementWithTag = e.elementWithTag, cn.text = e.text, cn.forceWrite = e.forceWrite, cn.simplify = nC();
  function t(o, c) {
    c.forEach(function(u) {
      n(o, u);
    });
  }
  function n(o, c) {
    r[c.type](o, c);
  }
  var r = {
    element: i,
    text: a,
    forceWrite: function() {
    }
  };
  function i(o, c) {
    e.isVoidElement(c) ? o.selfClosing(c.tag.tagName, c.tag.attributes) : (o.open(c.tag.tagName, c.tag.attributes), t(o, c.children), o.close(c.tag.tagName));
  }
  function a(o, c) {
    o.text(c.value);
  }
  return cn.write = t, cn;
}
var Ag;
function ic() {
  if (Ag) return Wn;
  Ag = 1;
  var e = Se, t = rc();
  Wn.topLevelElement = n, Wn.elements = r, Wn.element = a;
  function n(c, u) {
    return r([a(c, u, { fresh: !0 })]);
  }
  function r(c) {
    return new i(c.map(function(u) {
      return e.isString(u) ? a(u) : u;
    }));
  }
  function i(c) {
    this._elements = c;
  }
  i.prototype.wrap = function(u) {
    for (var s = u(), d = this._elements.length - 1; d >= 0; d--)
      s = this._elements[d].wrapNodes(s);
    return s;
  };
  function a(c, u, s) {
    return s = s || {}, new o(c, u, s);
  }
  function o(c, u, s) {
    var d = {};
    e.isArray(c) ? (c.forEach(function(g) {
      d[g] = !0;
    }), c = c[0]) : d[c] = !0, this.tagName = c, this.tagNames = d, this.attributes = u || {}, this.fresh = s.fresh, this.separator = s.separator;
  }
  return o.prototype.matchesElement = function(c) {
    return this.tagNames[c.tagName] && e.isEqual(this.attributes || {}, c.attributes || {});
  }, o.prototype.wrap = function(u) {
    return this.wrapNodes(u());
  }, o.prototype.wrapNodes = function(u) {
    return [t.elementWithTag(this, u)];
  }, Wn.empty = r([]), Wn.ignore = {
    wrap: function() {
      return [];
    }
  }, Wn;
}
var _l = {};
(function(e) {
  var t = Se, n = $e, r = rc();
  e.imgElement = i;
  function i(a) {
    return function(o, c) {
      return n.when(a(o)).then(function(u) {
        var s = {};
        return o.altText && (s.alt = o.altText), t.extend(s, u), [r.freshElement("img", s)];
      });
    };
  }
  e.inline = e.imgElement, e.dataUri = i(function(a) {
    return a.readAsBase64String().then(function(o) {
      return {
        src: "data:" + a.contentType + ";base64," + o
      };
    });
  });
})(_l);
var T1 = {}, U1 = {}, E1 = Se;
U1.writer = rC;
function rC(e) {
  return e = e || {}, e.prettyPrint ? iC() : A1();
}
var Ca = {
  div: !0,
  p: !0,
  ul: !0,
  li: !0
};
function iC() {
  var e = 0, t = "  ", n = [], r = !0, i = !1, a = A1();
  function o(b, m) {
    Ca[b] && f(), n.push(b), a.open(b, m), Ca[b] && e++, r = !1;
  }
  function c(b) {
    Ca[b] && (e--, f()), n.pop(), a.close(b);
  }
  function u(b) {
    g();
    var m = p() ? b : b.replace(`
`, `
` + t);
    a.text(m);
  }
  function s(b, m) {
    f(), a.selfClosing(b, m);
  }
  function d() {
    return n.length === 0 || Ca[n[n.length - 1]];
  }
  function g() {
    i || (f(), i = !0);
  }
  function f() {
    if (i = !1, !r && d() && !p()) {
      a._append(`
`);
      for (var b = 0; b < e; b++)
        a._append(t);
    }
  }
  function p() {
    return E1.some(n, function(b) {
      return b === "pre";
    });
  }
  return {
    asString: a.asString,
    open: o,
    close: c,
    text: u,
    selfClosing: s
  };
}
function A1() {
  var e = [];
  function t(u, s) {
    var d = i(s);
    e.push("<" + u + d + ">");
  }
  function n(u) {
    e.push("</" + u + ">");
  }
  function r(u, s) {
    var d = i(s);
    e.push("<" + u + d + " />");
  }
  function i(u) {
    return E1.map(u, function(s, d) {
      return " " + d + '="' + oC(s) + '"';
    }).join("");
  }
  function a(u) {
    e.push(aC(u));
  }
  function o(u) {
    e.push(u);
  }
  function c() {
    return e.join("");
  }
  return {
    asString: c,
    open: t,
    close: n,
    text: a,
    selfClosing: r,
    _append: o
  };
}
function aC(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function oC(e) {
  return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var C1 = {}, cC = Se;
function Cg(e) {
  return no(e, e);
}
function no(e, t) {
  return function() {
    return { start: e, end: t };
  };
}
function sC(e) {
  var t = e.href || "";
  return t ? {
    start: "[",
    end: "](" + t + ")",
    anchorPosition: "before"
  } : {};
}
function uC(e) {
  var t = e.src || "", n = e.alt || "";
  return t || n ? { start: "![" + n + "](" + t + ")" } : {};
}
function Fg(e) {
  return function(t, n) {
    return {
      start: n ? `
` : "",
      end: n ? "" : `
`,
      list: {
        isOrdered: e.isOrdered,
        indent: n ? n.indent + 1 : 0,
        count: 0
      }
    };
  };
}
function dC(e, t, n) {
  t = t || { indent: 0, isOrdered: !1, count: 0 }, t.count++, n.hasClosed = !1;
  var r = t.isOrdered ? t.count + "." : "-", i = S1("	", t.indent) + r + " ";
  return {
    start: i,
    end: function() {
      if (!n.hasClosed)
        return n.hasClosed = !0, `
`;
    }
  };
}
var F1 = {
  p: no("", `

`),
  br: no("", `  
`),
  ul: Fg({ isOrdered: !1 }),
  ol: Fg({ isOrdered: !0 }),
  li: dC,
  strong: Cg("__"),
  em: Cg("*"),
  a: sC,
  img: uC
};
(function() {
  for (var e = 1; e <= 6; e++)
    F1["h" + e] = no(S1("#", e) + " ", `

`);
})();
function S1(e, t) {
  return new Array(t + 1).join(e);
}
function lC() {
  var e = [], t = [], n = null, r = {};
  function i(d, g) {
    g = g || {};
    var f = F1[d] || function() {
      return {};
    }, p = f(g, n, r);
    t.push({ end: p.end, list: n }), p.list && (n = p.list);
    var b = p.anchorPosition === "before";
    b && a(g), e.push(p.start || ""), b || a(g);
  }
  function a(d) {
    d.id && e.push('<a id="' + d.id + '"></a>');
  }
  function o(d) {
    var g = t.pop();
    n = g.list;
    var f = cC.isFunction(g.end) ? g.end() : g.end;
    e.push(f || "");
  }
  function c(d, g) {
    i(d, g), o();
  }
  function u(d) {
    e.push(fC(d));
  }
  function s() {
    return e.join("");
  }
  return {
    asString: s,
    open: i,
    close: o,
    text: u,
    selfClosing: c
  };
}
C1.writer = lC;
function fC(e) {
  return e.replace(/\\/g, "\\\\").replace(/([\`\*_\{\}\[\]\(\)\#\+\-\.\!])/g, "\\$1");
}
var hC = U1, pC = C1;
T1.writer = gC;
function gC(e) {
  return e = e || {}, e.outputFormat === "markdown" ? pC.writer() : hC.writer(e);
}
var _n = Se, Sg = $e, Na = se, yt = ic(), Ou = bt, mC = _l, ue = rc(), bC = T1;
xl.DocumentConverter = yC;
function yC(e) {
  return {
    convertToHtml: function(t) {
      var n = _n.indexBy(
        t.type === Na.types.document ? t.comments : [],
        "commentId"
      ), r = new vC(e, n);
      return r.convertToHtml(t);
    }
  };
}
function vC(e, t) {
  var n = 1, r = [], i = [];
  e = _n.extend({ ignoreEmptyParagraphs: !0 }, e);
  var a = e.idPrefix === void 0 ? "" : e.idPrefix, o = e.ignoreEmptyParagraphs, c = yt.topLevelElement("p"), u = e.styleMap || [];
  function s(_) {
    var F = [], O = g(_, F, {}), L = [];
    k1(O, function(z) {
      z.type === "deferred" && L.push(z);
    });
    var S = {};
    return Sg.mapSeries(L, function(z) {
      return z.value().then(function(ee) {
        S[z.id] = ee;
      });
    }).then(function() {
      function z(te) {
        return du(te, function(J) {
          return J.type === "deferred" ? S[J.id] : J.children ? [
            _n.extend({}, J, {
              children: z(J.children)
            })
          ] : [J];
        });
      }
      var ee = bC.writer({
        prettyPrint: e.prettyPrint,
        outputFormat: e.outputFormat
      });
      return ue.write(ee, ue.simplify(z(O))), new Ou.Result(ee.asString(), F);
    });
  }
  function d(_, F, O) {
    return du(_, function(L) {
      return g(L, F, O);
    });
  }
  function g(_, F, O) {
    if (!O)
      throw new Error("options not set");
    var L = T[_.type];
    return L ? L(_, F, O) : [];
  }
  function f(_, F, O) {
    return p(_, F).wrap(function() {
      var L = d(_.children, F, O);
      return o ? L : [ue.forceWrite].concat(L);
    });
  }
  function p(_, F) {
    var O = h(_);
    return O ? O.to : (_.styleId && F.push(kg("paragraph", _)), c);
  }
  function b(_, F, O) {
    var L = function() {
      return d(_.children, F, O);
    }, S = [];
    if (_.highlight !== null) {
      var z = y({ type: "highlight", color: _.highlight });
      z && S.push(z);
    }
    _.isSmallCaps && S.push(m("smallCaps")), _.isAllCaps && S.push(m("allCaps")), _.isStrikethrough && S.push(m("strikethrough", "s")), _.isUnderline && S.push(m("underline")), _.verticalAlignment === Na.verticalAlignment.subscript && S.push(yt.element("sub", {}, { fresh: !1 })), _.verticalAlignment === Na.verticalAlignment.superscript && S.push(yt.element("sup", {}, { fresh: !1 })), _.isItalic && S.push(m("italic", "em")), _.isBold && S.push(m("bold", "strong"));
    var ee = yt.empty, te = h(_);
    return te ? ee = te.to : _.styleId && F.push(kg("run", _)), S.push(ee), S.forEach(function(J) {
      L = J.wrap.bind(J, L);
    }), L();
  }
  function m(_, F) {
    var O = y({ type: _ });
    return O || (F ? yt.element(F, {}, { fresh: !1 }) : yt.empty);
  }
  function y(_, F) {
    var O = h(_);
    return O ? O.to : F;
  }
  function h(_) {
    for (var F = 0; F < u.length; F++)
      if (u[F].from.matches(_))
        return u[F];
  }
  function l(_) {
    return function(F, O) {
      return Sg.attempt(function() {
        return _(F, O);
      }).caught(function(L) {
        return O.push(Ou.error(L)), [];
      });
    };
  }
  function v(_) {
    return x(_.noteType, _.noteId);
  }
  function D(_) {
    return w(_.noteType, _.noteId);
  }
  function x(_, F) {
    return E(_ + "-" + F);
  }
  function w(_, F) {
    return E(_ + "-ref-" + F);
  }
  function E(_) {
    return a + _;
  }
  var k = yt.elements([
    yt.element("table", {}, { fresh: !0 })
  ]);
  function W(_, F, O) {
    return y(_, k).wrap(function() {
      return q(_, F, O);
    });
  }
  function q(_, F, O) {
    var L = _n.findIndex(_.children, function(te) {
      return !te.type === Na.types.tableRow || !te.isHeader;
    });
    L === -1 && (L = _.children.length);
    var S;
    if (L === 0)
      S = d(
        _.children,
        F,
        _n.extend({}, O, { isTableHeader: !1 })
      );
    else {
      var z = d(
        _.children.slice(0, L),
        F,
        _n.extend({}, O, { isTableHeader: !0 })
      ), ee = d(
        _.children.slice(L),
        F,
        _n.extend({}, O, { isTableHeader: !1 })
      );
      S = [
        ue.freshElement("thead", {}, z),
        ue.freshElement("tbody", {}, ee)
      ];
    }
    return [ue.forceWrite].concat(S);
  }
  function $(_, F, O) {
    var L = d(_.children, F, O);
    return [
      ue.freshElement("tr", {}, [ue.forceWrite].concat(L))
    ];
  }
  function B(_, F, O) {
    var L = O.isTableHeader ? "th" : "td", S = d(_.children, F, O), z = {};
    return _.colSpan !== 1 && (z.colspan = _.colSpan.toString()), _.rowSpan !== 1 && (z.rowspan = _.rowSpan.toString()), [
      ue.freshElement(L, z, [ue.forceWrite].concat(S))
    ];
  }
  function P(_, F, O) {
    return y(_, yt.ignore).wrap(function() {
      var L = t[_.commentId], S = i.length + 1, z = "[" + _C(L) + S + "]";
      return i.push({ label: z, comment: L }), [
        ue.freshElement("a", {
          href: "#" + x("comment", _.commentId),
          id: w("comment", _.commentId)
        }, [ue.text(z)])
      ];
    });
  }
  function H(_, F, O) {
    var L = _.label, S = _.comment, z = d(S.body, F, O).concat([
      ue.nonFreshElement("p", {}, [
        ue.text(" "),
        ue.freshElement("a", { href: "#" + w("comment", S.commentId) }, [
          ue.text("↑")
        ])
      ])
    ]);
    return [
      ue.freshElement(
        "dt",
        { id: x("comment", S.commentId) },
        [ue.text("Comment " + L)]
      ),
      ue.freshElement("dd", {}, z)
    ];
  }
  function Q(_, F, O) {
    return A(_).wrap(function() {
      return [];
    });
  }
  function A(_) {
    var F = h(_);
    return F ? F.to : _.breakType === "line" ? yt.topLevelElement("br") : yt.empty;
  }
  var T = {
    document: function(_, F, O) {
      var L = d(_.children, F, O), S = r.map(function(ee) {
        return _.notes.resolve(ee);
      }), z = d(S, F, O);
      return L.concat([
        ue.freshElement("ol", {}, z),
        ue.freshElement("dl", {}, du(i, function(ee) {
          return H(ee, F, O);
        }))
      ]);
    },
    paragraph: f,
    run: b,
    text: function(_, F, O) {
      return [ue.text(_.value)];
    },
    tab: function(_, F, O) {
      return [ue.text("	")];
    },
    hyperlink: function(_, F, O) {
      var L = _.anchor ? "#" + E(_.anchor) : _.href, S = { href: L };
      _.targetFrame != null && (S.target = _.targetFrame);
      var z = d(_.children, F, O);
      return [ue.nonFreshElement("a", S, z)];
    },
    checkbox: function(_) {
      var F = { type: "checkbox" };
      return _.checked && (F.checked = "checked"), [ue.freshElement("input", F)];
    },
    bookmarkStart: function(_, F, O) {
      var L = ue.freshElement("a", {
        id: E(_.name)
      }, [ue.forceWrite]);
      return [L];
    },
    noteReference: function(_, F, O) {
      r.push(_);
      var L = ue.freshElement("a", {
        href: "#" + v(_),
        id: D(_)
      }, [ue.text("[" + n++ + "]")]);
      return [ue.freshElement("sup", {}, [L])];
    },
    note: function(_, F, O) {
      var L = d(_.body, F, O), S = ue.elementWithTag(yt.element("p", {}, { fresh: !1 }), [
        ue.text(" "),
        ue.freshElement("a", { href: "#" + D(_) }, [ue.text("↑")])
      ]), z = L.concat([S]);
      return ue.freshElement("li", { id: v(_) }, z);
    },
    commentReference: P,
    comment: H,
    image: xC(l(e.convertImage || mC.dataUri)),
    table: W,
    tableRow: $,
    tableCell: B,
    break: Q
  };
  return {
    convertToHtml: s
  };
}
var DC = 1;
function xC(e) {
  return function(t, n, r) {
    return [
      {
        type: "deferred",
        id: DC++,
        value: function() {
          return e(t, n, r);
        }
      }
    ];
  };
}
function kg(e, t) {
  return Ou.warning(
    "Unrecognised " + e + " style: '" + t.styleName + "' (Style ID: " + t.styleId + ")"
  );
}
function du(e, t) {
  return _n.flatten(e.map(t), !0);
}
function k1(e, t) {
  e.forEach(function(n) {
    t(n), n.children && k1(n.children, t);
  });
}
var _C = xl.commentAuthorLabel = function(t) {
  return t.authorInitials || "";
}, B1 = {}, wC = se;
function R1(e) {
  if (e.type === "text")
    return e.value;
  if (e.type === wC.types.tab)
    return "	";
  var t = e.type === "paragraph" ? `

` : "";
  return (e.children || []).map(R1).join("") + t;
}
B1.convertElementToRawText = R1;
var ac = {}, Lt = {}, O1 = {}, I1 = { exports: {} }, Lr = I1.exports = function(e, t) {
  this._tokens = e, this._startIndex = t || 0;
};
Lr.prototype.head = function() {
  return this._tokens[this._startIndex];
};
Lr.prototype.tail = function(e) {
  return new Lr(this._tokens, this._startIndex + 1);
};
Lr.prototype.toArray = function() {
  return this._tokens.slice(this._startIndex);
};
Lr.prototype.end = function() {
  return this._tokens[this._tokens.length - 1];
};
Lr.prototype.to = function(e) {
  var t = this.head().source, n = e.head() || e.end();
  return t.to(n.source);
};
var TC = I1.exports, UC = TC;
O1.Parser = function(e) {
  var t = function(n, r) {
    return n(new UC(r));
  };
  return {
    parseTokens: t
  };
};
var wl = {}, W1 = {};
(function(e) {
  e.none = /* @__PURE__ */ Object.create({
    value: function() {
      throw new Error("Called value on none");
    },
    isNone: function() {
      return !0;
    },
    isSome: function() {
      return !1;
    },
    map: function() {
      return e.none;
    },
    flatMap: function() {
      return e.none;
    },
    filter: function() {
      return e.none;
    },
    toArray: function() {
      return [];
    },
    orElse: t,
    valueOrElse: t
  });
  function t(r) {
    return typeof r == "function" ? r() : r;
  }
  e.some = function(r) {
    return new n(r);
  };
  var n = function(r) {
    this._value = r;
  };
  n.prototype.value = function() {
    return this._value;
  }, n.prototype.isNone = function() {
    return !1;
  }, n.prototype.isSome = function() {
    return !0;
  }, n.prototype.map = function(r) {
    return new n(r(this._value));
  }, n.prototype.flatMap = function(r) {
    return r(this._value);
  }, n.prototype.filter = function(r) {
    return r(this._value) ? this : e.none;
  }, n.prototype.toArray = function() {
    return [this._value];
  }, n.prototype.orElse = function(r) {
    return this;
  }, n.prototype.valueOrElse = function(r) {
    return this._value;
  }, e.isOption = function(r) {
    return r === e.none || r instanceof n;
  }, e.fromNullable = function(r) {
    return r == null ? e.none : new n(r);
  };
})(W1);
var Tl = {
  failure: function(e, t) {
    if (e.length < 1)
      throw new Error("Failure must have errors");
    return new Ge({
      status: "failure",
      remaining: t,
      errors: e
    });
  },
  error: function(e, t) {
    if (e.length < 1)
      throw new Error("Failure must have errors");
    return new Ge({
      status: "error",
      remaining: t,
      errors: e
    });
  },
  success: function(e, t, n) {
    return new Ge({
      status: "success",
      value: e,
      source: n,
      remaining: t,
      errors: []
    });
  },
  cut: function(e) {
    return new Ge({
      status: "cut",
      remaining: e,
      errors: []
    });
  }
}, Ge = function(e) {
  this._value = e.value, this._status = e.status, this._hasValue = e.value !== void 0, this._remaining = e.remaining, this._source = e.source, this._errors = e.errors;
};
Ge.prototype.map = function(e) {
  return this._hasValue ? new Ge({
    value: e(this._value, this._source),
    status: this._status,
    remaining: this._remaining,
    source: this._source,
    errors: this._errors
  }) : this;
};
Ge.prototype.changeRemaining = function(e) {
  return new Ge({
    value: this._value,
    status: this._status,
    remaining: e,
    source: this._source,
    errors: this._errors
  });
};
Ge.prototype.isSuccess = function() {
  return this._status === "success" || this._status === "cut";
};
Ge.prototype.isFailure = function() {
  return this._status === "failure";
};
Ge.prototype.isError = function() {
  return this._status === "error";
};
Ge.prototype.isCut = function() {
  return this._status === "cut";
};
Ge.prototype.value = function() {
  return this._value;
};
Ge.prototype.remaining = function() {
  return this._remaining;
};
Ge.prototype.source = function() {
  return this._source;
};
Ge.prototype.errors = function() {
  return this._errors;
};
var Ul = {};
Ul.error = function(e) {
  return new oc(e);
};
var oc = function(e) {
  this.expected = e.expected, this.actual = e.actual, this._location = e.location;
};
oc.prototype.describe = function() {
  var e = this._location ? this._location.describe() + `:
` : "";
  return e + "Expected " + this.expected + `
but got ` + this.actual;
};
oc.prototype.lineNumber = function() {
  return this._location.lineNumber();
};
oc.prototype.characterNumber = function() {
  return this._location.characterNumber();
};
var N1 = {};
N1.fromArray = function(e) {
  var t = 0, n = function() {
    return t < e.length;
  };
  return new er({
    hasNext: n,
    next: function() {
      if (n())
        return e[t++];
      throw new Error("No more elements");
    }
  });
};
var er = function(e) {
  this._iterator = e;
};
er.prototype.map = function(e) {
  var t = this._iterator;
  return new er({
    hasNext: function() {
      return t.hasNext();
    },
    next: function() {
      return e(t.next());
    }
  });
};
er.prototype.filter = function(e) {
  var t = this._iterator, n = !1, r = !1, i, a = function() {
    if (!n)
      for (n = !0, r = !1; t.hasNext() && !r; )
        i = t.next(), r = e(i);
  };
  return new er({
    hasNext: function() {
      return a(), r;
    },
    next: function() {
      a();
      var o = i;
      return n = !1, o;
    }
  });
};
er.prototype.first = function() {
  var e = this._iterator;
  return this._iterator.hasNext() ? e.next() : null;
};
er.prototype.toArray = function() {
  for (var e = []; this._iterator.hasNext(); )
    e.push(this._iterator.next());
  return e;
};
(function(e) {
  var t = Se, n = W1, r = Tl, i = Ul, a = N1;
  e.token = function(f, p) {
    var b = p !== void 0;
    return function(m) {
      var y = m.head();
      if (y && y.name === f && (!b || y.value === p))
        return r.success(y.value, m.tail(), y.source);
      var h = d({ name: f, value: p });
      return g(m, h);
    };
  }, e.tokenOfType = function(f) {
    return e.token(f);
  }, e.firstOf = function(f, p) {
    return t.isArray(p) || (p = Array.prototype.slice.call(arguments, 1)), function(b) {
      return a.fromArray(p).map(function(m) {
        return m(b);
      }).filter(function(m) {
        return m.isSuccess() || m.isError();
      }).first() || g(b, f);
    };
  }, e.then = function(f, p) {
    return function(b) {
      var m = f(b);
      return m.map || console.log(m), m.map(p);
    };
  }, e.sequence = function() {
    var f = Array.prototype.slice.call(arguments, 0), p = function(m) {
      var y = t.foldl(f, function(l, v) {
        var D = l.result, x = l.hasCut;
        if (!D.isSuccess())
          return { result: D, hasCut: x };
        var w = v(D.remaining());
        if (w.isCut())
          return { result: D, hasCut: !0 };
        if (w.isSuccess()) {
          var E;
          v.isCaptured ? E = D.value().withValue(v, w.value()) : E = D.value();
          var k = w.remaining(), W = m.to(k);
          return {
            result: r.success(E, k, W),
            hasCut: x
          };
        } else return x ? { result: r.error(w.errors(), w.remaining()), hasCut: x } : { result: w, hasCut: x };
      }, { result: r.success(new o(), m), hasCut: !1 }).result, h = m.to(y.remaining());
      return y.map(function(l) {
        return l.withValue(e.sequence.source, h);
      });
    };
    p.head = function() {
      var m = t.find(f, b);
      return e.then(
        p,
        e.sequence.extract(m)
      );
    }, p.map = function(m) {
      return e.then(
        p,
        function(y) {
          return m.apply(this, y.toArray());
        }
      );
    };
    function b(m) {
      return m.isCaptured;
    }
    return p;
  };
  var o = function(f, p) {
    this._values = f || {}, this._valuesArray = p || [];
  };
  o.prototype.withValue = function(f, p) {
    if (f.captureName && f.captureName in this._values)
      throw new Error('Cannot add second value for capture "' + f.captureName + '"');
    var b = t.clone(this._values);
    b[f.captureName] = p;
    var m = this._valuesArray.concat([p]);
    return new o(b, m);
  }, o.prototype.get = function(f) {
    if (f.captureName in this._values)
      return this._values[f.captureName];
    throw new Error('No value for capture "' + f.captureName + '"');
  }, o.prototype.toArray = function() {
    return this._valuesArray;
  }, e.sequence.capture = function(f, p) {
    var b = function() {
      return f.apply(this, arguments);
    };
    return b.captureName = p, b.isCaptured = !0, b;
  }, e.sequence.extract = function(f) {
    return function(p) {
      return p.get(f);
    };
  }, e.sequence.applyValues = function(f) {
    var p = Array.prototype.slice.call(arguments, 1);
    return function(b) {
      var m = p.map(function(y) {
        return b.get(y);
      });
      return f.apply(this, m);
    };
  }, e.sequence.source = {
    captureName: "☃source☃"
  }, e.sequence.cut = function() {
    return function(f) {
      return r.cut(f);
    };
  }, e.optional = function(f) {
    return function(p) {
      var b = f(p);
      return b.isSuccess() ? b.map(n.some) : b.isFailure() ? r.success(n.none, p) : b;
    };
  }, e.zeroOrMoreWithSeparator = function(f, p) {
    return s(f, p, !1);
  }, e.oneOrMoreWithSeparator = function(f, p) {
    return s(f, p, !0);
  };
  var c = e.zeroOrMore = function(f) {
    return function(p) {
      for (var b = [], m; (m = f(p)) && m.isSuccess(); )
        p = m.remaining(), b.push(m.value());
      return m.isError() ? m : r.success(b, p);
    };
  };
  e.oneOrMore = function(f) {
    return e.oneOrMoreWithSeparator(f, u);
  };
  function u(f) {
    return r.success(null, f);
  }
  var s = function(f, p, b) {
    return function(m) {
      var y = f(m);
      if (y.isSuccess()) {
        var h = e.sequence.capture(f, "main"), l = c(e.then(
          e.sequence(p, h),
          e.sequence.extract(h)
        )), v = l(y.remaining());
        return r.success([y.value()].concat(v.value()), v.remaining());
      } else return b || y.isError() ? y : r.success([], m);
    };
  };
  e.leftAssociative = function(f, p, b) {
    var m;
    b ? m = [{ func: b, rule: p }] : m = p, m = m.map(function(h) {
      return e.then(h.rule, function(l) {
        return function(v, D) {
          return h.func(v, l, D);
        };
      });
    });
    var y = e.firstOf.apply(null, ["rules"].concat(m));
    return function(h) {
      var l = h, v = f(h);
      if (!v.isSuccess())
        return v;
      for (var D = y(v.remaining()); D.isSuccess(); ) {
        var x = D.remaining(), w = l.to(D.remaining()), E = D.value();
        v = r.success(
          E(v.value(), w),
          x,
          w
        ), D = y(v.remaining());
      }
      return D.isError() ? D : v;
    };
  }, e.leftAssociative.firstOf = function() {
    return Array.prototype.slice.call(arguments, 0);
  }, e.nonConsuming = function(f) {
    return function(p) {
      return f(p).changeRemaining(p);
    };
  };
  var d = function(f) {
    return f.value ? f.name + ' "' + f.value + '"' : f.name;
  };
  function g(f, p) {
    var b, m = f.head();
    return m ? b = i.error({
      expected: p,
      actual: d(m),
      location: m.source
    }) : b = i.error({
      expected: p,
      actual: "end of tokens"
    }), r.failure([b], f);
  }
})(wl);
var L1 = { exports: {} };
L1.exports = function(e, t) {
  var n = {
    asString: function() {
      return e;
    },
    range: function(r, i) {
      return new tr(e, t, r, i);
    }
  };
  return n;
};
var tr = function(e, t, n, r) {
  this._string = e, this._description = t, this._startIndex = n, this._endIndex = r;
};
tr.prototype.to = function(e) {
  return new tr(this._string, this._description, this._startIndex, e._endIndex);
};
tr.prototype.describe = function() {
  var e = this._position(), t = this._description ? this._description + `
` : "";
  return t + "Line number: " + e.lineNumber + `
Character number: ` + e.characterNumber;
};
tr.prototype.lineNumber = function() {
  return this._position().lineNumber;
};
tr.prototype.characterNumber = function() {
  return this._position().characterNumber;
};
tr.prototype._position = function() {
  for (var e = this, t = 0, n = function() {
    return e._string.indexOf(`
`, t);
  }, r = 1; n() !== -1 && n() < this._startIndex; )
    t = n() + 1, r += 1;
  var i = this._startIndex - t + 1;
  return { lineNumber: r, characterNumber: i };
};
var M1 = L1.exports, $1 = function(e, t, n) {
  this.name = e, this.value = t, n && (this.source = n);
}, P1 = {};
(function(e) {
  var t = wl, n = Tl;
  e.parser = function(a, o, c) {
    var u = {
      rule: f,
      leftAssociative: p,
      rightAssociative: b
    }, s = new r(c.map(g)), d = t.firstOf(a, o);
    function g(h) {
      return {
        name: h.name,
        rule: i(h.ruleBuilder.bind(null, u))
      };
    }
    function f() {
      return m(s);
    }
    function p(h) {
      return m(s.untilExclusive(h));
    }
    function b(h) {
      return m(s.untilInclusive(h));
    }
    function m(h) {
      return y.bind(null, h);
    }
    function y(h, l) {
      var v = d(l);
      return v.isSuccess() ? h.apply(v) : v;
    }
    return u;
  };
  function r(a) {
    function o(g) {
      return new r(a.slice(0, u().indexOf(g)));
    }
    function c(g) {
      return new r(a.slice(0, u().indexOf(g) + 1));
    }
    function u() {
      return a.map(function(g) {
        return g.name;
      });
    }
    function s(g) {
      for (var f, p; ; )
        if (f = d(g.remaining()), f.isSuccess())
          p = g.source().to(f.source()), g = n.success(
            f.value()(g.value(), p),
            f.remaining(),
            p
          );
        else return f.isFailure() ? g : f;
    }
    function d(g) {
      return t.firstOf("infix", a.map(function(f) {
        return f.rule;
      }))(g);
    }
    return {
      apply: s,
      untilExclusive: o,
      untilInclusive: c
    };
  }
  e.infix = function(a, o) {
    function c(u) {
      return e.infix(a, function(s) {
        var d = o(s);
        return function(g) {
          var f = d(g);
          return f.map(function(p) {
            return function(b, m) {
              return u(b, p, m);
            };
          });
        };
      });
    }
    return {
      name: a,
      ruleBuilder: o,
      map: c
    };
  };
  var i = function(a) {
    var o;
    return function(c) {
      return o || (o = a()), o(c);
    };
  };
})(P1);
var z1 = {}, lu = $1, EC = M1;
z1.RegexTokeniser = AC;
function AC(e) {
  e = e.map(function(i) {
    return {
      name: i.name,
      regex: new RegExp(i.regex.source, "g")
    };
  });
  function t(i, a) {
    for (var o = new EC(i, a), c = 0, u = []; c < i.length; ) {
      var s = n(i, c, o);
      c = s.endIndex, u.push(s.token);
    }
    return u.push(r(i, o)), u;
  }
  function n(i, a, o) {
    for (var c = 0; c < e.length; c++) {
      var u = e[c].regex;
      u.lastIndex = a;
      var s = u.exec(i);
      if (s) {
        var g = a + s[0].length;
        if (s.index === a && g > a) {
          var d = s[1], f = new lu(
            e[c].name,
            d,
            o.range(a, g)
          );
          return { token: f, endIndex: g };
        }
      }
    }
    var g = a + 1, f = new lu(
      "unrecognisedCharacter",
      i.substring(a, g),
      o.range(a, g)
    );
    return { token: f, endIndex: g };
  }
  function r(i, a) {
    return new lu(
      "end",
      null,
      a.range(i.length, i.length)
    );
  }
  return {
    tokenise: t
  };
}
Lt.Parser = O1.Parser;
Lt.rules = wl;
Lt.errors = Ul;
Lt.results = Tl;
Lt.StringSource = M1;
Lt.Token = $1;
Lt.bottomUp = P1;
Lt.RegexTokeniser = z1.RegexTokeniser;
Lt.rule = function(e) {
  var t;
  return function(n) {
    return t || (t = e()), t(n);
  };
};
var Ve = {};
Ve.paragraph = CC;
Ve.run = FC;
Ve.table = SC;
Ve.bold = new Mt("bold");
Ve.italic = new Mt("italic");
Ve.underline = new Mt("underline");
Ve.strikethrough = new Mt("strikethrough");
Ve.allCaps = new Mt("allCaps");
Ve.smallCaps = new Mt("smallCaps");
Ve.highlight = kC;
Ve.commentReference = new Mt("commentReference");
Ve.lineBreak = new cc({ breakType: "line" });
Ve.pageBreak = new cc({ breakType: "page" });
Ve.columnBreak = new cc({ breakType: "column" });
Ve.equalTo = RC;
Ve.startsWith = OC;
function CC(e) {
  return new Mt("paragraph", e);
}
function FC(e) {
  return new Mt("run", e);
}
function SC(e) {
  return new Mt("table", e);
}
function kC(e) {
  return new q1(e);
}
function Mt(e, t) {
  t = t || {}, this._elementType = e, this._styleId = t.styleId, this._styleName = t.styleName, t.list && (this._listIndex = t.list.levelIndex, this._listIsOrdered = t.list.isOrdered);
}
Mt.prototype.matches = function(e) {
  return e.type === this._elementType && (this._styleId === void 0 || e.styleId === this._styleId) && (this._styleName === void 0 || e.styleName && this._styleName.operator(this._styleName.operand, e.styleName)) && (this._listIndex === void 0 || BC(e, this._listIndex, this._listIsOrdered)) && (this._breakType === void 0 || this._breakType === e.breakType);
};
function q1(e) {
  e = e || {}, this._color = e.color;
}
q1.prototype.matches = function(e) {
  return e.type === "highlight" && (this._color === void 0 || e.color === this._color);
};
function cc(e) {
  e = e || {}, this._breakType = e.breakType;
}
cc.prototype.matches = function(e) {
  return e.type === "break" && (this._breakType === void 0 || e.breakType === this._breakType);
};
function BC(e, t, n) {
  return e.numbering && e.numbering.level == t && e.numbering.isOrdered == n;
}
function RC(e) {
  return {
    operator: IC,
    operand: e
  };
}
function OC(e) {
  return {
    operator: WC,
    operand: e
  };
}
function IC(e, t) {
  return e.toUpperCase() === t.toUpperCase();
}
function WC(e, t) {
  return t.toUpperCase().indexOf(e.toUpperCase()) === 0;
}
var j1 = {}, NC = Lt, LC = NC.RegexTokeniser;
j1.tokenise = MC;
var Bg = "'((?:\\\\.|[^'])*)";
function MC(e) {
  var t = "(?:[a-zA-Z\\-_]|\\\\.)", n = new LC([
    { name: "identifier", regex: new RegExp("(" + t + "(?:" + t + "|[0-9])*)") },
    { name: "dot", regex: /\./ },
    { name: "colon", regex: /:/ },
    { name: "gt", regex: />/ },
    { name: "whitespace", regex: /\s+/ },
    { name: "arrow", regex: /=>/ },
    { name: "equals", regex: /=/ },
    { name: "startsWith", regex: /\^=/ },
    { name: "open-paren", regex: /\(/ },
    { name: "close-paren", regex: /\)/ },
    { name: "open-square-bracket", regex: /\[/ },
    { name: "close-square-bracket", regex: /\]/ },
    { name: "string", regex: new RegExp(Bg + "'") },
    { name: "unterminated-string", regex: new RegExp(Bg) },
    { name: "integer", regex: /([0-9]+)/ },
    { name: "choice", regex: /\|/ },
    { name: "bang", regex: /(!)/ }
  ]);
  return n.tokenise(e);
}
var $C = Se, j = Lt, He = Ve, La = ic(), PC = j1.tokenise, fu = bt;
ac.readHtmlPath = ZC;
ac.readDocumentMatcher = jC;
ac.readStyle = zC;
function zC(e) {
  return El(QC, e);
}
function qC() {
  return j.rules.sequence(
    j.rules.sequence.capture(Z1()),
    j.rules.tokenOfType("whitespace"),
    j.rules.tokenOfType("arrow"),
    j.rules.sequence.capture(j.rules.optional(j.rules.sequence(
      j.rules.tokenOfType("whitespace"),
      j.rules.sequence.capture(X1())
    ).head())),
    j.rules.tokenOfType("end")
  ).map(function(e, t) {
    return {
      from: e,
      to: t.valueOrElse(La.empty)
    };
  });
}
function jC(e) {
  return El(Z1(), e);
}
function Z1() {
  var e = j.rules.sequence, t = function(w, E) {
    return j.rules.then(
      j.rules.token("identifier", w),
      function() {
        return E;
      }
    );
  }, n = t("p", He.paragraph), r = t("r", He.run), i = j.rules.firstOf(
    "p or r or table",
    n,
    r
  ), a = j.rules.sequence(
    j.rules.tokenOfType("dot"),
    j.rules.sequence.cut(),
    j.rules.sequence.capture(sc)
  ).map(function(w) {
    return { styleId: w };
  }), o = j.rules.firstOf(
    "style name matcher",
    j.rules.then(
      j.rules.sequence(
        j.rules.tokenOfType("equals"),
        j.rules.sequence.cut(),
        j.rules.sequence.capture(Ur)
      ).head(),
      function(w) {
        return { styleName: He.equalTo(w) };
      }
    ),
    j.rules.then(
      j.rules.sequence(
        j.rules.tokenOfType("startsWith"),
        j.rules.sequence.cut(),
        j.rules.sequence.capture(Ur)
      ).head(),
      function(w) {
        return { styleName: He.startsWith(w) };
      }
    )
  ), c = j.rules.sequence(
    j.rules.tokenOfType("open-square-bracket"),
    j.rules.sequence.cut(),
    j.rules.token("identifier", "style-name"),
    j.rules.sequence.capture(o),
    j.rules.tokenOfType("close-square-bracket")
  ).head(), u = j.rules.firstOf(
    "list type",
    t("ordered-list", { isOrdered: !0 }),
    t("unordered-list", { isOrdered: !1 })
  ), s = e(
    j.rules.tokenOfType("colon"),
    e.capture(u),
    e.cut(),
    j.rules.tokenOfType("open-paren"),
    e.capture(XC),
    j.rules.tokenOfType("close-paren")
  ).map(function(w, E) {
    return {
      list: {
        isOrdered: w.isOrdered,
        levelIndex: E - 1
      }
    };
  });
  function d(w) {
    var E = j.rules.firstOf.apply(
      j.rules.firstOf,
      ["matcher suffix"].concat(w)
    ), k = j.rules.zeroOrMore(E);
    return j.rules.then(k, function(W) {
      var q = {};
      return W.forEach(function($) {
        $C.extend(q, $);
      }), q;
    });
  }
  var g = e(
    e.capture(i),
    e.capture(d([
      a,
      c,
      s
    ]))
  ).map(function(w, E) {
    return w(E);
  }), f = e(
    j.rules.token("identifier", "table"),
    e.capture(d([
      a,
      c
    ]))
  ).map(function(w) {
    return He.table(w);
  }), p = t("b", He.bold), b = t("i", He.italic), m = t("u", He.underline), y = t("strike", He.strikethrough), h = t("all-caps", He.allCaps), l = t("small-caps", He.smallCaps), v = e(
    j.rules.token("identifier", "highlight"),
    j.rules.sequence.capture(j.rules.optional(j.rules.sequence(
      j.rules.tokenOfType("open-square-bracket"),
      j.rules.sequence.cut(),
      j.rules.token("identifier", "color"),
      j.rules.tokenOfType("equals"),
      j.rules.sequence.capture(Ur),
      j.rules.tokenOfType("close-square-bracket")
    ).head()))
  ).map(function(w) {
    return He.highlight({
      color: w.valueOrElse(void 0)
    });
  }), D = t("comment-reference", He.commentReference), x = e(
    j.rules.token("identifier", "br"),
    e.cut(),
    j.rules.tokenOfType("open-square-bracket"),
    j.rules.token("identifier", "type"),
    j.rules.tokenOfType("equals"),
    e.capture(Ur),
    j.rules.tokenOfType("close-square-bracket")
  ).map(function(w) {
    switch (w) {
      case "line":
        return He.lineBreak;
      case "page":
        return He.pageBreak;
      case "column":
        return He.columnBreak;
    }
  });
  return j.rules.firstOf(
    "element type",
    g,
    f,
    p,
    b,
    m,
    y,
    h,
    l,
    v,
    D,
    x
  );
}
function ZC(e) {
  return El(X1(), e);
}
function X1() {
  var e = j.rules.sequence.capture, t = j.rules.tokenOfType("whitespace"), n = j.rules.then(
    j.rules.optional(j.rules.sequence(
      j.rules.tokenOfType("colon"),
      j.rules.token("identifier", "fresh")
    )),
    function(o) {
      return o.map(function() {
        return !0;
      }).valueOrElse(!1);
    }
  ), r = j.rules.then(
    j.rules.optional(j.rules.sequence(
      j.rules.tokenOfType("colon"),
      j.rules.token("identifier", "separator"),
      j.rules.tokenOfType("open-paren"),
      e(Ur),
      j.rules.tokenOfType("close-paren")
    ).head()),
    function(o) {
      return o.valueOrElse("");
    }
  ), i = j.rules.oneOrMoreWithSeparator(
    sc,
    j.rules.tokenOfType("choice")
  ), a = j.rules.sequence(
    e(i),
    e(j.rules.zeroOrMore(YC)),
    e(n),
    e(r)
  ).map(function(o, c, u, s) {
    var d = {}, g = {};
    return c.forEach(function(f) {
      f.append && d[f.name] ? d[f.name] += " " + f.value : d[f.name] = f.value;
    }), u && (g.fresh = !0), s && (g.separator = s), La.element(o, d, g);
  });
  return j.rules.firstOf(
    "html path",
    j.rules.then(j.rules.tokenOfType("bang"), function() {
      return La.ignore;
    }),
    j.rules.then(
      j.rules.zeroOrMoreWithSeparator(
        a,
        j.rules.sequence(
          t,
          j.rules.tokenOfType("gt"),
          t
        )
      ),
      La.elements
    )
  );
}
var sc = j.rules.then(
  j.rules.tokenOfType("identifier"),
  V1
), XC = j.rules.tokenOfType("integer"), Ur = j.rules.then(
  j.rules.tokenOfType("string"),
  V1
), VC = {
  n: `
`,
  r: "\r",
  t: "	"
};
function V1(e) {
  return e.replace(/\\(.)/g, function(t, n) {
    return VC[n] || n;
  });
}
var HC = j.rules.sequence(
  j.rules.tokenOfType("open-square-bracket"),
  j.rules.sequence.cut(),
  j.rules.sequence.capture(sc),
  j.rules.tokenOfType("equals"),
  j.rules.sequence.capture(Ur),
  j.rules.tokenOfType("close-square-bracket")
).map(function(e, t) {
  return { name: e, value: t, append: !1 };
}), GC = j.rules.sequence(
  j.rules.tokenOfType("dot"),
  j.rules.sequence.cut(),
  j.rules.sequence.capture(sc)
).map(function(e) {
  return { name: "class", value: e, append: !0 };
}), YC = j.rules.firstOf(
  "attribute or class",
  HC,
  GC
);
function El(e, t) {
  var n = PC(t), r = j.Parser(), i = r.parseTokens(e, n);
  return i.isSuccess() ? fu.success(i.value()) : new fu.Result(null, [fu.warning(KC(t, i))]);
}
function KC(e, t) {
  return "Did not understand this style mapping, so ignored it: " + e + `
` + t.errors().map(JC).join(`
`);
}
function JC(e) {
  return "Error was at character number " + e.characterNumber() + ": Expected " + e.expected + " but got " + e.actual;
}
var QC = qC(), uc = {};
uc.readOptions = nF;
var H1 = Se, eF = uc._defaultStyleMap = [
  "p.Heading1 => h1:fresh",
  "p.Heading2 => h2:fresh",
  "p.Heading3 => h3:fresh",
  "p.Heading4 => h4:fresh",
  "p.Heading5 => h5:fresh",
  "p.Heading6 => h6:fresh",
  "p[style-name='Heading 1'] => h1:fresh",
  "p[style-name='Heading 2'] => h2:fresh",
  "p[style-name='Heading 3'] => h3:fresh",
  "p[style-name='Heading 4'] => h4:fresh",
  "p[style-name='Heading 5'] => h5:fresh",
  "p[style-name='Heading 6'] => h6:fresh",
  "p[style-name='heading 1'] => h1:fresh",
  "p[style-name='heading 2'] => h2:fresh",
  "p[style-name='heading 3'] => h3:fresh",
  "p[style-name='heading 4'] => h4:fresh",
  "p[style-name='heading 5'] => h5:fresh",
  "p[style-name='heading 6'] => h6:fresh",
  // Apple Pages
  "p.Heading => h1:fresh",
  "p[style-name='Heading'] => h1:fresh",
  "r[style-name='Strong'] => strong",
  "p[style-name='footnote text'] => p:fresh",
  "r[style-name='footnote reference'] =>",
  "p[style-name='endnote text'] => p:fresh",
  "r[style-name='endnote reference'] =>",
  "p[style-name='annotation text'] => p:fresh",
  "r[style-name='annotation reference'] =>",
  // LibreOffice
  "p[style-name='Footnote'] => p:fresh",
  "r[style-name='Footnote anchor'] =>",
  "p[style-name='Endnote'] => p:fresh",
  "r[style-name='Endnote anchor'] =>",
  "p:unordered-list(1) => ul > li:fresh",
  "p:unordered-list(2) => ul|ol > li > ul > li:fresh",
  "p:unordered-list(3) => ul|ol > li > ul|ol > li > ul > li:fresh",
  "p:unordered-list(4) => ul|ol > li > ul|ol > li > ul|ol > li > ul > li:fresh",
  "p:unordered-list(5) => ul|ol > li > ul|ol > li > ul|ol > li > ul|ol > li > ul > li:fresh",
  "p:ordered-list(1) => ol > li:fresh",
  "p:ordered-list(2) => ul|ol > li > ol > li:fresh",
  "p:ordered-list(3) => ul|ol > li > ul|ol > li > ol > li:fresh",
  "p:ordered-list(4) => ul|ol > li > ul|ol > li > ul|ol > li > ol > li:fresh",
  "p:ordered-list(5) => ul|ol > li > ul|ol > li > ul|ol > li > ul|ol > li > ol > li:fresh",
  "r[style-name='Hyperlink'] =>",
  "p[style-name='Normal'] => p:fresh",
  // Apple Pages
  "p.Body => p:fresh",
  "p[style-name='Body'] => p:fresh"
], tF = uc._standardOptions = {
  transformDocument: rF,
  includeDefaultStyleMap: !0,
  includeEmbeddedStyleMap: !0
};
function nF(e) {
  return e = e || {}, H1.extend({}, tF, e, {
    customStyleMap: Rg(e.styleMap),
    readStyleMap: function() {
      var t = this.customStyleMap;
      return this.includeEmbeddedStyleMap && (t = t.concat(Rg(this.embeddedStyleMap))), this.includeDefaultStyleMap && (t = t.concat(eF)), t;
    }
  });
}
function Rg(e) {
  return e ? H1.isString(e) ? e.split(`
`).map(function(t) {
    return t.trim();
  }).filter(function(t) {
    return t !== "" && t.charAt(0) !== "#";
  }) : e : [];
}
function rF(e) {
  return e;
}
var G1 = {}, iF = Wi, Ma = $e, Og = Pi;
G1.openZip = oF;
var aF = Ma.promisify(iF.readFile);
function oF(e) {
  return e.path ? aF(e.path).then(Og.openArrayBuffer) : e.buffer ? Ma.resolve(Og.openArrayBuffer(e.buffer)) : e.file ? Ma.resolve(e.file) : Ma.reject(new Error("Could not find file in options"));
}
var Y1 = {}, cF = ic(), sF = rc();
Y1.element = uF;
function uF(e) {
  return function(t) {
    return sF.elementWithTag(cF.element(e), [t]);
  };
}
var dF = Se, K1 = Fd, Al = Dl, lF = xl.DocumentConverter, fF = B1.convertElementToRawText, hF = ac.readStyle, pF = uc.readOptions, dc = G1, gF = bt.Result;
It.convertToHtml = mF;
It.convertToMarkdown = bF;
It.convert = Cl;
It.extractRawText = xF;
It.images = _l;
It.transforms = In;
It.underline = Y1;
It.embedStyleMap = _F;
It.readEmbeddedStyleMap = yF;
function mF(e, t) {
  return Cl(e, t);
}
function bF(e, t) {
  var n = Object.create(t || {});
  return n.outputFormat = "markdown", Cl(e, n);
}
function Cl(e, t) {
  return t = pF(t), dc.openZip(e).tap(function(n) {
    return Al.readStyleMap(n).then(function(r) {
      t.embeddedStyleMap = r;
    });
  }).then(function(n) {
    return K1.read(n, e).then(function(r) {
      return r.map(t.transformDocument);
    }).then(function(r) {
      return vF(r, t);
    });
  });
}
function yF(e) {
  return dc.openZip(e).then(Al.readStyleMap);
}
function vF(e, t) {
  var n = DF(t.readStyleMap()), r = dF.extend({}, t, {
    styleMap: n.value
  }), i = new lF(r);
  return e.flatMapThen(function(a) {
    return n.flatMapThen(function(o) {
      return i.convertToHtml(a);
    });
  });
}
function DF(e) {
  return gF.combine((e || []).map(hF)).map(function(t) {
    return t.filter(function(n) {
      return !!n;
    });
  });
}
function xF(e) {
  return dc.openZip(e).then(K1.read).then(function(t) {
    return t.map(fF);
  });
}
function _F(e, t) {
  return dc.openZip(e).tap(function(n) {
    return Al.writeStyleMap(n, t);
  }).then(function(n) {
    return n.toArrayBuffer();
  }).then(function(n) {
    return {
      toArrayBuffer: function() {
        return n;
      },
      toBuffer: function() {
        return Buffer.from(n);
      }
    };
  });
}
It.styleMapping = function() {
  throw new Error(`Use a raw string instead of mammoth.styleMapping e.g. "p[style-name='Title'] => h1" instead of mammoth.styleMapping("p[style-name='Title'] => h1")`);
};
async function Ig(e) {
  const t = pt.extname(e).toLowerCase(), n = pt.basename(e), r = await cv.readFile(e);
  let i = "";
  t === ".txt" || t === ".md" ? i = r.toString("utf8") : t === ".docx" ? i = (await It.extractRawText({ buffer: r })).value : t === ".vtt" ? i = r.toString("utf8").split(`
`).filter((o) => !/^\d{2}:\d{2}:\d{2}\.\d{3}/.test(o) && !/^WEBVTT/.test(o) && o.trim() !== "").join(`
`) : t === ".srt" ? i = r.toString("utf8").split(/\r?\n/).filter((u) => {
    const s = u.trim();
    return !(!s || /^\d+$/.test(s) || /-->/.test(s));
  }).join(`
`) : i = r.toString("utf8");
  const a = gm(r);
  return L_(n, i, a);
}
const wF = {
  type: "object",
  properties: {
    class_title: { type: "string" },
    date_or_series: { type: "string" },
    audience: { type: "string" },
    learning_objectives: { type: "array", items: { type: "string" } },
    key_takeaways: { type: "array", items: { type: "string" } },
    topics: { type: "array", items: { type: "string" } },
    action_items: { type: "array", items: { type: "string" } },
    notable_quotes: { type: "array", items: { type: "string" } },
    open_questions: { type: "array", items: { type: "string" } },
    timestamp_refs: { type: "array", items: { type: "string" } }
  },
  required: ["key_takeaways", "topics"]
};
async function TF(e, t) {
  var D, x, w, E, k, W, q, $;
  const { transcriptId: n, model: r } = e, i = Sa(n);
  if (!i) throw new Error("Transcript not found");
  const a = mm(), o = bm(), c = a.slice(0, 20), u = o.slice(0, 2).map((B) => ({ ...B, excerpt: B.excerpt.slice(0, 1e3) })), s = r ?? "llama3.1:8b-instruct-q4_K_M";
  (D = t == null ? void 0 : t.onStatus) == null || D.call(t, `Model: ${s}`), await EF();
  const d = AF(i.text, 1200);
  (x = t == null ? void 0 : t.onStatus) == null || x.call(t, `Chunking transcript into ${d.length} segment(s) ~1200 tokens each`);
  const g = [], f = d.length;
  let p = 0;
  for (const B of d) {
    p += 1, console.log(`[summarize] chunk ${p}/${f} starting (${Math.min(B.length, 80)} chars preview: ${B.slice(0, 80).replace(/\n/g, " ")}...)`);
    const P = "You are an offline summarizer. Output STRICT JSON only that matches the given JSON Schema.";
    (w = t == null ? void 0 : t.onStatus) == null || w.call(t, `Extracting JSON from chunk ${p + 1}/${f}`);
    const H = [
      "Verified glossary (authoritative terms and definitions):",
      JSON.stringify(c),
      "",
      "Few-shot examples (may guide style):",
      JSON.stringify(u),
      "",
      "Transcript chunk:",
      `<<<${B}>>>`,
      "",
      "Task:",
      "- Fill every possible field in the schema based only on the chunk.",
      '- If unknown, use "" or [].',
      "JSON Schema:",
      JSON.stringify(wF)
    ].join(`
`), Q = await di.chat({
      model: s,
      messages: [
        { role: "system", content: P },
        { role: "user", content: H }
      ],
      // @ts-ignore
      format: "json",
      stream: !1,
      options: { temperature: 0.2 }
    });
    try {
      const A = ((E = Q.message) == null ? void 0 : E.content) ?? "{}", T = JSON.parse(A);
      g.push(T), console.log(`[summarize] chunk ${p}/${f} parsed OK: keys=${Object.keys(T).join(",")}`);
    } catch {
      g.push({ key_takeaways: [], topics: [] }), console.warn(`[summarize] chunk ${p}/${f} parse failed; added empty result`);
    }
    (k = t == null ? void 0 : t.onProgress) == null || k.call(t, Math.round(p / f * 80));
  }
  const b = UF(g), m = "You are a precise technical editor.";
  (W = t == null ? void 0 : t.onStatus) == null || W.call(t, "Generating final markdown summary from merged facts");
  const y = [
    "Using the merged facts below (JSON), write a clear, concise markdown summary (3–7 bullets for key takeaways, short intro, optional notes for cautions/contraindications if present). No hallucinations.",
    "Facts JSON:",
    JSON.stringify(b)
  ].join(`
`);
  (q = t == null ? void 0 : t.onProgress) == null || q.call(t, 90);
  const l = (await di.chat({ model: s, messages: [
    { role: "system", content: m },
    { role: "user", content: y }
  ], stream: !1, options: { temperature: 0.2 } })).message.content, v = M_(n, b, l);
  return ($ = t == null ? void 0 : t.onProgress) == null || $.call(t, 100), { summaryId: v, merged: b, markdown: l };
}
function UF(e) {
  const t = { key_takeaways: [], topics: [] }, n = (i, a) => {
    if (!a) return;
    const o = a.trim();
    o && (i.includes(o) || i.push(o));
  }, r = (i, a) => {
    if (a)
      for (const o of a) n(i, o);
  };
  for (const i of e)
    i.class_title && (t.class_title = i.class_title), i.date_or_series && (t.date_or_series = i.date_or_series), i.audience && (t.audience = i.audience), r(t.learning_objectives ?? (t.learning_objectives = []), i.learning_objectives), r(t.key_takeaways, i.key_takeaways), r(t.topics, i.topics), r(t.action_items ?? (t.action_items = []), i.action_items), r(t.notable_quotes ?? (t.notable_quotes = []), i.notable_quotes), r(t.open_questions ?? (t.open_questions = []), i.open_questions), r(t.timestamp_refs ?? (t.timestamp_refs = []), i.timestamp_refs);
  return t;
}
async function EF(e) {
  return async (t) => Math.ceil(t.length / 4);
}
function AF(e, t, n) {
  const r = [], i = e.split(/\n{2,}/);
  let a = [], o = 0;
  for (const c of i) {
    const u = Math.ceil(c.length / 4);
    o + u > t && a.length > 0 && (r.push(a.join(`

`)), a = [], o = 0), a.push(c), o += u;
  }
  return a.length > 0 && r.push(a.join(`

`)), r;
}
let Wg = !1;
function CF(e) {
  Wg || (Wg = !0, Pe.handle("ingest.openFilePicker", async () => {
    const t = e();
    if (!t) return null;
    const n = await iv.showOpenDialog(t, {
      properties: ["openFile", "multiSelections"],
      filters: [
        { name: "Transcripts", extensions: ["txt", "md", "vtt", "srt", "docx"] }
      ]
    });
    if (n.canceled || n.filePaths.length === 0) return [];
    const r = [];
    for (const i of n.filePaths) {
      const a = await Ig(i);
      r.push(a);
    }
    return r;
  }), Pe.handle("ingest.fromDrop", async (t, n) => Ig(n)), Pe.handle("summarize.run", async (t, n) => {
    const r = ia({ transcriptId: St().min(1), model: St().optional() }), { transcriptId: i, model: a } = r.parse(n), o = e();
    return TF({ transcriptId: i, model: a }, { onProgress: (s) => {
      o == null || o.webContents.send("summarize.progress", s);
    }, onStatus: (s) => {
      o == null || o.webContents.send("summarize.status", { transcriptId: i, text: s });
    } });
  }), Pe.handle("privacy.status", async () => ({
    allowedHosts: pv(process.env.VITE_DEV_SERVER_URL),
    blockedRequests: fv()
  })), Pe.handle("clipboard.copy", async (t, n) => (av.writeText(n), !0)), Pe.handle("glossary.list", async () => mm()), Pe.handle("glossary.upsert", async (t, n) => ($_(n), !0)), Pe.handle("glossary.remove", async (t, n) => (P_(n), !0)), Pe.handle("examples.list", async () => bm()), Pe.handle("examples.upsert", async (t, n) => z_(n)), Pe.handle("examples.remove", async (t, n) => (q_(n), !0)), Pe.handle("settings.get", async (t, n) => X_(n)), Pe.handle("settings.set", async (t, n) => (V_(n.key, n.value), !0)), Pe.handle("ab.submit", async (t, n) => (Z_({ transcript_id: n.transcriptId, candidate_a: n.candidateA, candidate_b: n.candidateB, winner: n.winner, reason: n.reason }), n.reason && n.reason.trim() && j_(n.reason.trim()), !0)), Pe.handle("chat.ask", async (t, n) => {
    const r = ia({ transcriptId: St(), message: St().min(1), model: St().optional() }), { transcriptId: i, message: a, model: o } = r.parse(n), c = Sa(i);
    if (!c) return { answer: "" };
    const u = o ?? "llama3.1:8b-instruct-q4_K_M", s = 'You are a helpful assistant. Answer strictly and only based on the provided transcript excerpts. If the answer is not contained, reply: "I do not know based on the transcript."', d = /* @__PURE__ */ new Set(["the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "with", "as", "is", "are", "was", "were", "be", "by", "that", "this", "it", "at", "from", "we", "you", "they", "he", "she"]), g = (l) => l.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean).filter((v) => !d.has(v)), f = new Set(g(a)), b = c.text.split(/\n{2,}/).map((l) => l.trim()).filter(Boolean).map((l, v) => {
      const D = new Set(g(l));
      let x = 0;
      for (const w of f) D.has(w) && (x += 1);
      return { idx: v, p: l, score: x };
    });
    b.sort((l, v) => v.score - l.score);
    const m = b.slice(0, 5).map((l) => l.p.slice(0, 1200));
    console.log(`[chat] question: ${a}`), console.log("[chat] top paragraph scores:", b.slice(0, 5).map((l) => ({ idx: l.idx, score: l.score, preview: l.p.slice(0, 60).replace(/\n/g, " ") })));
    const y = [
      "Relevant transcript excerpts (do not infer beyond these):",
      ...m.map((l, v) => `Excerpt ${v + 1}:
${l}`),
      "",
      `Question: ${a}`
    ].join(`
`);
    return { answer: (await di.chat({ model: u, messages: [{ role: "system", content: s }, { role: "user", content: y }], stream: !1, options: { temperature: 0.1 } })).message.content };
  }), Pe.handle("agent.index", async (t, n) => {
    const r = ia({ transcriptId: St(), model: St().optional() }), { transcriptId: i, model: a } = r.parse(n), o = Sa(i);
    if (!o) return { ok: !1 };
    const { splitParagraphs: c, embedParagraphs: u } = await import("./indexer-DXmBsIcE.js"), s = await c(i, o.text);
    let d = 0;
    return await u(i, s, a || "nomic-embed-text", (g, f) => {
      d = g;
      const p = e();
      p == null || p.webContents.send("agent.index.progress", { transcriptId: i, done: d, total: f });
    }), { ok: !0, paragraphs: s.length };
  }), Pe.handle("agent.chat", async (t, n) => {
    var h;
    const r = ia({ transcriptId: St(), message: St().min(1), model: St().optional(), embedModel: St().optional() }), { transcriptId: i, message: a, model: o, embedModel: c } = r.parse(n);
    if (!Sa(i)) return { answer: "" };
    const s = o ?? "llama3.1:8b-instruct-q4_K_M", { hybridRetrieve: d } = await import("./indexer-DXmBsIcE.js");
    let g;
    try {
      const l = await di.embed({ model: c || "nomic-embed-text", input: a });
      g = ((h = l == null ? void 0 : l.embeddings) == null ? void 0 : h[0]) || (l == null ? void 0 : l.embedding);
    } catch {
    }
    const f = d(i, a, 5, g), p = f.map((l) => l.text.slice(0, 1200)), b = 'Answer strictly and only based on the provided transcript excerpts. If the answer is not contained, reply: "I do not know based on the transcript."', m = ["Relevant transcript excerpts (do not infer beyond these):", ...p.map((l, v) => `Excerpt ${v + 1}:
${l}`), "", `Question: ${a}`].join(`
`);
    return { answer: (await di.chat({ model: s, messages: [{ role: "system", content: b }, { role: "user", content: m }], stream: !1, options: { temperature: 0.1 } })).message.content, retrieved: f.map((l) => ({ idx: l.idx, score: l.score })) };
  }));
}
const J1 = pt.dirname(ov(import.meta.url));
process.env.APP_ROOT = pt.join(J1, "..");
const ro = process.env.VITE_DEV_SERVER_URL, jF = pt.join(process.env.APP_ROOT, "dist-electron"), Q1 = pt.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = ro ? pt.join(process.env.APP_ROOT, "public") : Q1;
let Dt;
function ev() {
  const e = !qn.isPackaged;
  if (Dt = new Ng({
    icon: pt.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: ro ? pt.join(process.env.APP_ROOT, "electron", "preload.cjs") : pt.join(J1, "preload.mjs"),
      contextIsolation: !0,
      sandbox: !e,
      // relax sandbox in dev to avoid blank screen issues with Vite
      nodeIntegration: !1
    }
  }), Dt.webContents.on("did-finish-load", () => {
    Dt == null || Dt.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), e) {
    const t = ro ?? "http://127.0.0.1:5173";
    Dt.loadURL(t), Dt.webContents.openDevTools({ mode: "detach" });
  } else
    Dt.loadFile(pt.join(Q1, "index.html"));
}
qn.on("window-all-closed", () => {
  process.platform !== "darwin" && (qn.quit(), Dt = null);
});
qn.on("activate", () => {
  Ng.getAllWindows().length === 0 && ev();
});
qn.whenReady().then(() => {
  if (CF(() => Dt), ev(), Dt) {
    const e = qn.isPackaged ? void 0 : ro ?? "http://127.0.0.1:5173";
    hv(Dt, e);
  }
});
export {
  jF as M,
  Q1 as R,
  ro as V,
  ot as d,
  di as i,
  so as r
};
