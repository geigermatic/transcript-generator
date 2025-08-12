import { session as rv, app as zn, ipcMain as rt, dialog as iv, clipboard as av, BrowserWindow as Ig } from "electron";
import { fileURLToPath as ov } from "node:url";
import ht, { resolve as Al } from "node:path";
import Ng, { promises as Cl } from "node:fs";
import Wi from "fs";
import Lr from "path";
import to from "util";
import Lg from "node:crypto";
import cv from "node:fs/promises";
import Mg from "stream";
import sv from "events";
import uv from "buffer";
import dv from "url";
import lv from "os";
let $g = 0;
function fv() {
  return $g;
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
    return $g += 1, a({ cancel: !0 });
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
class mi extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
const Pg = {};
function qn(e) {
  return Pg;
}
function gv(e) {
  const t = Object.values(e).filter((r) => typeof r == "number");
  return Object.entries(e).filter(([r, i]) => t.indexOf(+r) === -1).map(([r, i]) => i);
}
function uu(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function zg(e) {
  return {
    get value() {
      {
        const t = e();
        return Object.defineProperty(this, "value", { value: t }), t;
      }
    }
  };
}
function Bu(e) {
  return e == null;
}
function Ru(e) {
  const t = e.startsWith("^") ? 1 : 0, n = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, n);
}
const Fl = Symbol("evaluating");
function be(e, t, n) {
  let r;
  Object.defineProperty(e, t, {
    get() {
      if (r !== Fl)
        return r === void 0 && (r = Fl, r = n()), r;
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
function tr(e, t, n) {
  Object.defineProperty(e, t, {
    value: n,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function Mr(...e) {
  const t = {};
  for (const n of e) {
    const r = Object.getOwnPropertyDescriptors(n);
    Object.assign(t, r);
  }
  return Object.defineProperties({}, t);
}
function Sl(e) {
  return JSON.stringify(e);
}
const qg = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {
};
function du(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const bv = zg(() => {
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
function Na(e) {
  if (du(e) === !1)
    return !1;
  const t = e.constructor;
  if (t === void 0)
    return !0;
  const n = t.prototype;
  return !(du(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function jg(e) {
  return Na(e) ? { ...e } : e;
}
const yv = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function no(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function nr(e, t, n) {
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
  const n = e._zod.def, r = Mr(e._zod.def, {
    get shape() {
      const i = {};
      for (const a in t) {
        if (!(a in n.shape))
          throw new Error(`Unrecognized key: "${a}"`);
        t[a] && (i[a] = n.shape[a]);
      }
      return tr(this, "shape", i), i;
    },
    checks: []
  });
  return nr(e, r);
}
function xv(e, t) {
  const n = e._zod.def, r = Mr(e._zod.def, {
    get shape() {
      const i = { ...e._zod.def.shape };
      for (const a in t) {
        if (!(a in n.shape))
          throw new Error(`Unrecognized key: "${a}"`);
        t[a] && delete i[a];
      }
      return tr(this, "shape", i), i;
    },
    checks: []
  });
  return nr(e, r);
}
function _v(e, t) {
  if (!Na(t))
    throw new Error("Invalid input to extend: expected a plain object");
  const n = Mr(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t };
      return tr(this, "shape", r), r;
    },
    checks: []
  });
  return nr(e, n);
}
function wv(e, t) {
  const n = Mr(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t._zod.def.shape };
      return tr(this, "shape", r), r;
    },
    get catchall() {
      return t._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return nr(e, n);
}
function Tv(e, t, n) {
  const r = Mr(t._zod.def, {
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
      return tr(this, "shape", a), a;
    },
    checks: []
  });
  return nr(t, r);
}
function Uv(e, t, n) {
  const r = Mr(t._zod.def, {
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
      return tr(this, "shape", a), a;
    },
    checks: []
  });
  return nr(t, r);
}
function ui(e, t = 0) {
  var n;
  for (let r = t; r < e.issues.length; r++)
    if (((n = e.issues[r]) == null ? void 0 : n.continue) !== !0)
      return !0;
  return !1;
}
function Zg(e, t) {
  return t.map((n) => {
    var r;
    return (r = n).path ?? (r.path = []), n.path.unshift(e), n;
  });
}
function Qi(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.message;
}
function jn(e, t, n) {
  var i, a, o, c, u, s;
  const r = { ...e, path: e.path ?? [] };
  if (!e.message) {
    const d = Qi((o = (a = (i = e.inst) == null ? void 0 : i._zod.def) == null ? void 0 : a.error) == null ? void 0 : o.call(a, e)) ?? Qi((c = t == null ? void 0 : t.error) == null ? void 0 : c.call(t, e)) ?? Qi((u = n.customError) == null ? void 0 : u.call(n, e)) ?? Qi((s = n.localeError) == null ? void 0 : s.call(n, e)) ?? "Invalid input";
    r.message = d;
  }
  return delete r.inst, delete r.continue, t != null && t.reportInput || delete r.input, r;
}
function Ou(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function bi(...e) {
  const [t, n, r] = e;
  return typeof t == "string" ? {
    message: t,
    code: "custom",
    input: n,
    inst: r
  } : { ...t };
}
const Xg = (e, t) => {
  e.name = "$ZodError", Object.defineProperty(e, "_zod", {
    value: e._zod,
    enumerable: !1
  }), Object.defineProperty(e, "issues", {
    value: t,
    enumerable: !1
  }), e.message = JSON.stringify(t, uu, 2), Object.defineProperty(e, "toString", {
    value: () => e.message,
    enumerable: !1
  });
}, Hg = X("$ZodError", Xg), Vg = X("$ZodError", Xg, { Parent: Error });
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
    throw new mi();
  if (o.issues.length) {
    const c = new ((i == null ? void 0 : i.Err) ?? e)(o.issues.map((u) => jn(u, a, qn())));
    throw qg(c, i == null ? void 0 : i.callee), c;
  }
  return o.value;
}, Fv = (e) => async (t, n, r, i) => {
  const a = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let o = t._zod.run({ value: n, issues: [] }, a);
  if (o instanceof Promise && (o = await o), o.issues.length) {
    const c = new ((i == null ? void 0 : i.Err) ?? e)(o.issues.map((u) => jn(u, a, qn())));
    throw qg(c, i == null ? void 0 : i.callee), c;
  }
  return o.value;
}, Gg = (e) => (t, n, r) => {
  const i = r ? { ...r, async: !1 } : { async: !1 }, a = t._zod.run({ value: n, issues: [] }, i);
  if (a instanceof Promise)
    throw new mi();
  return a.issues.length ? {
    success: !1,
    error: new (e ?? Hg)(a.issues.map((o) => jn(o, i, qn())))
  } : { success: !0, data: a.value };
}, Sv = /* @__PURE__ */ Gg(Vg), Yg = (e) => async (t, n, r) => {
  const i = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let a = t._zod.run({ value: n, issues: [] }, i);
  return a instanceof Promise && (a = await a), a.issues.length ? {
    success: !1,
    error: new e(a.issues.map((o) => jn(o, i, qn())))
  } : { success: !0, data: a.value };
}, kv = /* @__PURE__ */ Yg(Vg), Bv = /^[cC][^\s-]{8,}$/, Rv = /^[0-9a-z]+$/, Ov = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, Wv = /^[0-9a-vA-V]{20}$/, Iv = /^[A-Za-z0-9]{27}$/, Nv = /^[a-zA-Z0-9_-]{21}$/, Lv = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Mv = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, kl = (e) => e ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$/, $v = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Pv = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function zv() {
  return new RegExp(Pv, "u");
}
const qv = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, jv = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})$/, Zv = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Xv = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Hv = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, Kg = /^[A-Za-z0-9_-]*$/, Vv = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/, Gv = /^\+(?:[0-9]){6,14}[0-9]$/, Jg = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", Yv = /* @__PURE__ */ new RegExp(`^${Jg}$`);
function Qg(e) {
  const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Kv(e) {
  return new RegExp(`^${Qg(e)}$`);
}
function Jv(e) {
  const t = Qg({ precision: e.precision }), n = ["Z"];
  e.local && n.push(""), e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const r = `${t}(?:${n.join("|")})`;
  return new RegExp(`^${Jg}T(?:${r})$`);
}
const Qv = (e) => {
  const t = e ? `[\\s\\S]{${(e == null ? void 0 : e.minimum) ?? 0},${(e == null ? void 0 : e.maximum) ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${t}$`);
}, e0 = /^[^A-Z]*$/, t0 = /^[^a-z]*$/, Vt = /* @__PURE__ */ X("$ZodCheck", (e, t) => {
  var n;
  e._zod ?? (e._zod = {}), e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), n0 = /* @__PURE__ */ X("$ZodCheckMaxLength", (e, t) => {
  var n;
  Vt.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const i = r.value;
    return !Bu(i) && i.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const i = r._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    t.maximum < i && (r._zod.bag.maximum = t.maximum);
  }), e._zod.check = (r) => {
    const i = r.value;
    if (i.length <= t.maximum)
      return;
    const o = Ou(i);
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
  Vt.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const i = r.value;
    return !Bu(i) && i.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const i = r._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    t.minimum > i && (r._zod.bag.minimum = t.minimum);
  }), e._zod.check = (r) => {
    const i = r.value;
    if (i.length >= t.minimum)
      return;
    const o = Ou(i);
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
  Vt.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const i = r.value;
    return !Bu(i) && i.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const i = r._zod.bag;
    i.minimum = t.length, i.maximum = t.length, i.length = t.length;
  }), e._zod.check = (r) => {
    const i = r.value, a = i.length;
    if (a === t.length)
      return;
    const o = Ou(i), c = a > t.length;
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
}), ro = /* @__PURE__ */ X("$ZodCheckStringFormat", (e, t) => {
  var n, r;
  Vt.init(e, t), e._zod.onattach.push((i) => {
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
  ro.init(e, t), e._zod.check = (n) => {
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
  t.pattern ?? (t.pattern = e0), ro.init(e, t);
}), c0 = /* @__PURE__ */ X("$ZodCheckUpperCase", (e, t) => {
  t.pattern ?? (t.pattern = t0), ro.init(e, t);
}), s0 = /* @__PURE__ */ X("$ZodCheckIncludes", (e, t) => {
  Vt.init(e, t);
  const n = no(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${n}` : n);
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
  Vt.init(e, t);
  const n = new RegExp(`^${no(t.prefix)}.*`);
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
  Vt.init(e, t);
  const n = new RegExp(`.*${no(t.suffix)}$`);
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
  Vt.init(e, t), e._zod.check = (n) => {
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
}, Ie = /* @__PURE__ */ X("$ZodType", (e, t) => {
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
        const l = o.issues.length, p = g._zod.check(o);
        if (p instanceof Promise && (u == null ? void 0 : u.async) === !1)
          throw new mi();
        if (d || p instanceof Promise)
          d = (d ?? Promise.resolve()).then(async () => {
            await p, o.issues.length !== l && (s || (s = ui(o, l)));
          });
        else {
          if (o.issues.length === l)
            continue;
          s || (s = ui(o, l));
        }
      }
      return d ? d.then(() => o) : o;
    };
    e._zod.run = (o, c) => {
      const u = e._zod.parse(o, c);
      if (u instanceof Promise) {
        if (c.async === !1)
          throw new mi();
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
}), Wu = /* @__PURE__ */ X("$ZodString", (e, t) => {
  var n;
  Ie.init(e, t), e._zod.pattern = [...((n = e == null ? void 0 : e._zod.bag) == null ? void 0 : n.patterns) ?? []].pop() ?? Qv(e._zod.bag), e._zod.parse = (r, i) => {
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
  ro.init(e, t), Wu.init(e, t);
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
    t.pattern ?? (t.pattern = kl(r));
  } else
    t.pattern ?? (t.pattern = kl());
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
        pattern: Vv.source,
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
  t.pattern ?? (t.pattern = Wv), we.init(e, t);
}), T0 = /* @__PURE__ */ X("$ZodKSUID", (e, t) => {
  t.pattern ?? (t.pattern = Iv), we.init(e, t);
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
function em(e) {
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
  t.pattern ?? (t.pattern = Hv), we.init(e, t), e._zod.onattach.push((n) => {
    n._zod.bag.contentEncoding = "base64";
  }), e._zod.check = (n) => {
    em(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
});
function O0(e) {
  if (!Kg.test(e))
    return !1;
  const t = e.replace(/[-_]/g, (r) => r === "-" ? "+" : "/"), n = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return em(n);
}
const W0 = /* @__PURE__ */ X("$ZodBase64URL", (e, t) => {
  t.pattern ?? (t.pattern = Kg), we.init(e, t), e._zod.onattach.push((n) => {
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
}), I0 = /* @__PURE__ */ X("$ZodE164", (e, t) => {
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
  Ie.init(e, t), e._zod.parse = (n) => n;
}), $0 = /* @__PURE__ */ X("$ZodNever", (e, t) => {
  Ie.init(e, t), e._zod.parse = (n, r) => (n.issues.push({
    expected: "never",
    code: "invalid_type",
    input: n.value,
    inst: e
  }), n);
});
function Bl(e, t, n) {
  e.issues.length && t.issues.push(...Zg(n, e.issues)), t.value[n] = e.value;
}
const P0 = /* @__PURE__ */ X("$ZodArray", (e, t) => {
  Ie.init(e, t), e._zod.parse = (n, r) => {
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
      u instanceof Promise ? a.push(u.then((s) => Bl(s, n, o))) : Bl(u, n, o);
    }
    return a.length ? Promise.all(a).then(() => n) : n;
  };
});
function ea(e, t, n, r) {
  e.issues.length && t.issues.push(...Zg(n, e.issues)), e.value === void 0 ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
const z0 = /* @__PURE__ */ X("$ZodObject", (e, t) => {
  Ie.init(e, t);
  const n = zg(() => {
    const g = Object.keys(t.shape);
    for (const p of g)
      if (!t.shape[p]._zod.traits.has("$ZodType"))
        throw new Error(`Invalid element at key "${p}": expected a Zod schema`);
    const l = vv(t.shape);
    return {
      shape: t.shape,
      keys: g,
      keySet: new Set(g),
      numKeys: g.length,
      optionalKeys: new Set(l)
    };
  });
  be(e._zod, "propValues", () => {
    const g = t.shape, l = {};
    for (const p in g) {
      const b = g[p]._zod;
      if (b.values) {
        l[p] ?? (l[p] = /* @__PURE__ */ new Set());
        for (const m of b.values)
          l[p].add(m);
      }
    }
    return l;
  });
  const r = (g) => {
    const l = new f0(["shape", "payload", "ctx"]), p = n.value, b = (f) => {
      const v = Sl(f);
      return `shape[${v}]._zod.run({ value: input[${v}], issues: [] }, ctx)`;
    };
    l.write("const input = payload.value;");
    const m = /* @__PURE__ */ Object.create(null);
    let y = 0;
    for (const f of p.keys)
      m[f] = `key_${y++}`;
    l.write("const newResult = {}");
    for (const f of p.keys) {
      const v = m[f], D = Sl(f);
      l.write(`const ${v} = ${b(f)};`), l.write(`
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
    l.write("payload.value = newResult;"), l.write("return payload;");
    const h = l.compile();
    return (f, v) => h(g, f, v);
  };
  let i;
  const a = du, o = !Pg.jitless, u = o && bv.value, s = t.catchall;
  let d;
  e._zod.parse = (g, l) => {
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
    if (o && u && (l == null ? void 0 : l.async) === !1 && l.jitless !== !0)
      i || (i = r(t.shape)), g = i(g, l);
    else {
      g.value = {};
      const v = d.shape;
      for (const D of d.keys) {
        const w = v[D]._zod.run({ value: p[D], issues: [] }, l);
        w instanceof Promise ? b.push(w.then((E) => ea(E, g, D, p))) : ea(w, g, D, p);
      }
    }
    if (!s)
      return b.length ? Promise.all(b).then(() => g) : g;
    const m = [], y = d.keySet, h = s._zod, f = h.def.type;
    for (const v of Object.keys(p)) {
      if (y.has(v))
        continue;
      if (f === "never") {
        m.push(v);
        continue;
      }
      const D = h.run({ value: p[v], issues: [] }, l);
      D instanceof Promise ? b.push(D.then((x) => ea(x, g, v, p))) : ea(D, g, v, p);
    }
    return m.length && g.issues.push({
      code: "unrecognized_keys",
      keys: m,
      input: p,
      inst: e
    }), b.length ? Promise.all(b).then(() => g) : g;
  };
});
function Rl(e, t, n, r) {
  for (const a of e)
    if (a.issues.length === 0)
      return t.value = a.value, t;
  const i = e.filter((a) => !ui(a));
  return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
    code: "invalid_union",
    input: t.value,
    inst: n,
    errors: e.map((a) => a.issues.map((o) => jn(o, r, qn())))
  }), t);
}
const q0 = /* @__PURE__ */ X("$ZodUnion", (e, t) => {
  Ie.init(e, t), be(e._zod, "optin", () => t.options.some((i) => i._zod.optin === "optional") ? "optional" : void 0), be(e._zod, "optout", () => t.options.some((i) => i._zod.optout === "optional") ? "optional" : void 0), be(e._zod, "values", () => {
    if (t.options.every((i) => i._zod.values))
      return new Set(t.options.flatMap((i) => Array.from(i._zod.values)));
  }), be(e._zod, "pattern", () => {
    if (t.options.every((i) => i._zod.pattern)) {
      const i = t.options.map((a) => a._zod.pattern);
      return new RegExp(`^(${i.map((a) => Ru(a.source)).join("|")})$`);
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
    return o ? Promise.all(c).then((u) => Rl(u, i, e, a)) : Rl(c, i, e, a);
  };
}), j0 = /* @__PURE__ */ X("$ZodIntersection", (e, t) => {
  Ie.init(e, t), e._zod.parse = (n, r) => {
    const i = n.value, a = t.left._zod.run({ value: i, issues: [] }, r), o = t.right._zod.run({ value: i, issues: [] }, r);
    return a instanceof Promise || o instanceof Promise ? Promise.all([a, o]).then(([u, s]) => Ol(n, u, s)) : Ol(n, a, o);
  };
});
function lu(e, t) {
  if (e === t)
    return { valid: !0, data: e };
  if (e instanceof Date && t instanceof Date && +e == +t)
    return { valid: !0, data: e };
  if (Na(e) && Na(t)) {
    const n = Object.keys(t), r = Object.keys(e).filter((a) => n.indexOf(a) !== -1), i = { ...e, ...t };
    for (const a of r) {
      const o = lu(e[a], t[a]);
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
      const i = e[r], a = t[r], o = lu(i, a);
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
function Ol(e, t, n) {
  if (t.issues.length && e.issues.push(...t.issues), n.issues.length && e.issues.push(...n.issues), ui(e))
    return e;
  const r = lu(t.value, n.value);
  if (!r.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(r.mergeErrorPath)}`);
  return e.value = r.data, e;
}
const Z0 = /* @__PURE__ */ X("$ZodEnum", (e, t) => {
  Ie.init(e, t);
  const n = gv(t.entries), r = new Set(n);
  e._zod.values = r, e._zod.pattern = new RegExp(`^(${n.filter((i) => yv.has(typeof i)).map((i) => typeof i == "string" ? no(i) : i.toString()).join("|")})$`), e._zod.parse = (i, a) => {
    const o = i.value;
    return r.has(o) || i.issues.push({
      code: "invalid_value",
      values: n,
      input: o,
      inst: e
    }), i;
  };
}), X0 = /* @__PURE__ */ X("$ZodTransform", (e, t) => {
  Ie.init(e, t), e._zod.parse = (n, r) => {
    const i = t.transform(n.value, n);
    if (r.async)
      return (i instanceof Promise ? i : Promise.resolve(i)).then((o) => (n.value = o, n));
    if (i instanceof Promise)
      throw new mi();
    return n.value = i, n;
  };
});
function Wl(e, t) {
  return e.issues.length && t === void 0 ? { issues: [], value: void 0 } : e;
}
const H0 = /* @__PURE__ */ X("$ZodOptional", (e, t) => {
  Ie.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", be(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), be(e._zod, "pattern", () => {
    const n = t.innerType._zod.pattern;
    return n ? new RegExp(`^(${Ru(n.source)})?$`) : void 0;
  }), e._zod.parse = (n, r) => {
    if (t.innerType._zod.optin === "optional") {
      const i = t.innerType._zod.run(n, r);
      return i instanceof Promise ? i.then((a) => Wl(a, n.value)) : Wl(i, n.value);
    }
    return n.value === void 0 ? n : t.innerType._zod.run(n, r);
  };
}), V0 = /* @__PURE__ */ X("$ZodNullable", (e, t) => {
  Ie.init(e, t), be(e._zod, "optin", () => t.innerType._zod.optin), be(e._zod, "optout", () => t.innerType._zod.optout), be(e._zod, "pattern", () => {
    const n = t.innerType._zod.pattern;
    return n ? new RegExp(`^(${Ru(n.source)}|null)$`) : void 0;
  }), be(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (n, r) => n.value === null ? n : t.innerType._zod.run(n, r);
}), G0 = /* @__PURE__ */ X("$ZodDefault", (e, t) => {
  Ie.init(e, t), e._zod.optin = "optional", be(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => {
    if (n.value === void 0)
      return n.value = t.defaultValue, n;
    const i = t.innerType._zod.run(n, r);
    return i instanceof Promise ? i.then((a) => Il(a, t)) : Il(i, t);
  };
});
function Il(e, t) {
  return e.value === void 0 && (e.value = t.defaultValue), e;
}
const Y0 = /* @__PURE__ */ X("$ZodPrefault", (e, t) => {
  Ie.init(e, t), e._zod.optin = "optional", be(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => (n.value === void 0 && (n.value = t.defaultValue), t.innerType._zod.run(n, r));
}), K0 = /* @__PURE__ */ X("$ZodNonOptional", (e, t) => {
  Ie.init(e, t), be(e._zod, "values", () => {
    const n = t.innerType._zod.values;
    return n ? new Set([...n].filter((r) => r !== void 0)) : void 0;
  }), e._zod.parse = (n, r) => {
    const i = t.innerType._zod.run(n, r);
    return i instanceof Promise ? i.then((a) => Nl(a, e)) : Nl(i, e);
  };
});
function Nl(e, t) {
  return !e.issues.length && e.value === void 0 && e.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: e.value,
    inst: t
  }), e;
}
const J0 = /* @__PURE__ */ X("$ZodCatch", (e, t) => {
  Ie.init(e, t), be(e._zod, "optin", () => t.innerType._zod.optin), be(e._zod, "optout", () => t.innerType._zod.optout), be(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => {
    const i = t.innerType._zod.run(n, r);
    return i instanceof Promise ? i.then((a) => (n.value = a.value, a.issues.length && (n.value = t.catchValue({
      ...n,
      error: {
        issues: a.issues.map((o) => jn(o, r, qn()))
      },
      input: n.value
    }), n.issues = []), n)) : (n.value = i.value, i.issues.length && (n.value = t.catchValue({
      ...n,
      error: {
        issues: i.issues.map((a) => jn(a, r, qn()))
      },
      input: n.value
    }), n.issues = []), n);
  };
}), Q0 = /* @__PURE__ */ X("$ZodPipe", (e, t) => {
  Ie.init(e, t), be(e._zod, "values", () => t.in._zod.values), be(e._zod, "optin", () => t.in._zod.optin), be(e._zod, "optout", () => t.out._zod.optout), be(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (n, r) => {
    const i = t.in._zod.run(n, r);
    return i instanceof Promise ? i.then((a) => Ll(a, t, r)) : Ll(i, t, r);
  };
});
function Ll(e, t, n) {
  return e.issues.length ? e : t.out._zod.run({ value: e.value, issues: e.issues }, n);
}
const eD = /* @__PURE__ */ X("$ZodReadonly", (e, t) => {
  Ie.init(e, t), be(e._zod, "propValues", () => t.innerType._zod.propValues), be(e._zod, "values", () => t.innerType._zod.values), be(e._zod, "optin", () => t.innerType._zod.optin), be(e._zod, "optout", () => t.innerType._zod.optout), e._zod.parse = (n, r) => {
    const i = t.innerType._zod.run(n, r);
    return i instanceof Promise ? i.then(Ml) : Ml(i);
  };
});
function Ml(e) {
  return e.value = Object.freeze(e.value), e;
}
const tD = /* @__PURE__ */ X("$ZodCustom", (e, t) => {
  Vt.init(e, t), Ie.init(e, t), e._zod.parse = (n, r) => n, e._zod.check = (n) => {
    const r = n.value, i = t.fn(r);
    if (i instanceof Promise)
      return i.then((a) => $l(a, n, r, e));
    $l(i, n, r, e);
  };
});
function $l(e, t, n, r) {
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
    r._zod.def.params && (i.params = r._zod.def.params), t.issues.push(bi(i));
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
const ta = /* @__PURE__ */ rD();
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
function Pl(e, t) {
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
function tm(e, t) {
  return new n0({
    check: "max_length",
    ...ae(t),
    maximum: e
  });
}
function La(e, t) {
  return new r0({
    check: "min_length",
    ...ae(t),
    minimum: e
  });
}
function nm(e, t) {
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
function WD(e, t) {
  return new s0({
    check: "string_format",
    format: "includes",
    ...ae(t),
    includes: e
  });
}
function ID(e, t) {
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
function Ii(e) {
  return new l0({
    check: "overwrite",
    tx: e
  });
}
function LD(e) {
  return Ii((t) => t.normalize(e));
}
function MD() {
  return Ii((e) => e.trim());
}
function $D() {
  return Ii((e) => e.toLowerCase());
}
function PD() {
  return Ii((e) => e.toUpperCase());
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
      n.issues.push(bi(r, n.value, t._zod.def));
    else {
      const i = r;
      i.fatal && (i.continue = !1), i.code ?? (i.code = "custom"), i.input ?? (i.input = n.value), i.inst ?? (i.inst = t), i.continue ?? (i.continue = !t._zod.def.abort), n.issues.push(bi(i));
    }
  }, e(n.value, n)));
  return t;
}
function ZD(e, t) {
  const n = new Vt({
    check: "custom",
    ...ae(t)
  });
  return n._zod.check = e, n;
}
const XD = /* @__PURE__ */ X("ZodISODateTime", (e, t) => {
  U0.init(e, t), Te.init(e, t);
});
function HD(e) {
  return ED(XD, e);
}
const VD = /* @__PURE__ */ X("ZodISODate", (e, t) => {
  E0.init(e, t), Te.init(e, t);
});
function GD(e) {
  return AD(VD, e);
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
        e.issues.push(n), e.message = JSON.stringify(e.issues, uu, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (n) => {
        e.issues.push(...n), e.message = JSON.stringify(e.issues, uu, 2);
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
}, io = X("ZodError", ex, {
  Parent: Error
}), tx = /* @__PURE__ */ Cv(io), nx = /* @__PURE__ */ Fv(io), rx = /* @__PURE__ */ Gg(io), ix = /* @__PURE__ */ Yg(io), Me = /* @__PURE__ */ X("ZodType", (e, t) => (Ie.init(e, t), e.def = t, Object.defineProperty(e, "_def", { value: t }), e.check = (...n) => e.clone(
  {
    ...t,
    checks: [
      ...t.checks ?? [],
      ...n.map((r) => typeof r == "function" ? { _zod: { check: r, def: { check: "custom" }, onattach: [] } } : r)
    ]
  }
  // { parent: true }
), e.clone = (n, r) => nr(e, n, r), e.brand = () => e, e.register = (n, r) => (n.add(e, r), e), e.parse = (n, r) => tx(e, n, r, { callee: e.parse }), e.safeParse = (n, r) => rx(e, n, r), e.parseAsync = async (n, r) => nx(e, n, r, { callee: e.parseAsync }), e.safeParseAsync = async (n, r) => ix(e, n, r), e.spa = e.safeParseAsync, e.refine = (n, r) => e.check(Vx(n, r)), e.superRefine = (n) => e.check(Gx(n)), e.overwrite = (n) => e.check(Ii(n)), e.optional = () => Zl(e), e.nullable = () => Xl(e), e.nullish = () => Zl(Xl(e)), e.nonoptional = (n) => Px(e, n), e.array = () => Ax(e), e.or = (n) => Sx([e, n]), e.and = (n) => Bx(e, n), e.transform = (n) => Hl(e, Wx(n)), e.default = (n) => Lx(e, n), e.prefault = (n) => $x(e, n), e.catch = (n) => qx(e, n), e.pipe = (n) => Hl(e, n), e.readonly = () => Xx(e), e.describe = (n) => {
  const r = e.clone();
  return ta.add(r, { description: n }), r;
}, Object.defineProperty(e, "description", {
  get() {
    var n;
    return (n = ta.get(e)) == null ? void 0 : n.description;
  },
  configurable: !0
}), e.meta = (...n) => {
  if (n.length === 0)
    return ta.get(e);
  const r = e.clone();
  return ta.add(r, n[0]), r;
}, e.isOptional = () => e.safeParse(void 0).success, e.isNullable = () => e.safeParse(null).success, e)), rm = /* @__PURE__ */ X("_ZodString", (e, t) => {
  Wu.init(e, t), Me.init(e, t);
  const n = e._zod.bag;
  e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null, e.regex = (...r) => e.check(BD(...r)), e.includes = (...r) => e.check(WD(...r)), e.startsWith = (...r) => e.check(ID(...r)), e.endsWith = (...r) => e.check(ND(...r)), e.min = (...r) => e.check(La(...r)), e.max = (...r) => e.check(tm(...r)), e.length = (...r) => e.check(nm(...r)), e.nonempty = (...r) => e.check(La(1, ...r)), e.lowercase = (r) => e.check(RD(r)), e.uppercase = (r) => e.check(OD(r)), e.trim = () => e.check(MD()), e.normalize = (...r) => e.check(LD(...r)), e.toLowerCase = () => e.check($D()), e.toUpperCase = () => e.check(PD());
}), ax = /* @__PURE__ */ X("ZodString", (e, t) => {
  Wu.init(e, t), rm.init(e, t), e.email = (n) => e.check(aD(ox, n)), e.url = (n) => e.check(dD(cx, n)), e.jwt = (n) => e.check(UD(_x, n)), e.emoji = (n) => e.check(lD(sx, n)), e.guid = (n) => e.check(Pl(zl, n)), e.uuid = (n) => e.check(oD(na, n)), e.uuidv4 = (n) => e.check(cD(na, n)), e.uuidv6 = (n) => e.check(sD(na, n)), e.uuidv7 = (n) => e.check(uD(na, n)), e.nanoid = (n) => e.check(fD(ux, n)), e.guid = (n) => e.check(Pl(zl, n)), e.cuid = (n) => e.check(hD(dx, n)), e.cuid2 = (n) => e.check(pD(lx, n)), e.ulid = (n) => e.check(gD(fx, n)), e.base64 = (n) => e.check(_D(vx, n)), e.base64url = (n) => e.check(wD(Dx, n)), e.xid = (n) => e.check(mD(hx, n)), e.ksuid = (n) => e.check(bD(px, n)), e.ipv4 = (n) => e.check(yD(gx, n)), e.ipv6 = (n) => e.check(vD(mx, n)), e.cidrv4 = (n) => e.check(DD(bx, n)), e.cidrv6 = (n) => e.check(xD(yx, n)), e.e164 = (n) => e.check(TD(xx, n)), e.datetime = (n) => e.check(HD(n)), e.date = (n) => e.check(GD(n)), e.time = (n) => e.check(KD(n)), e.duration = (n) => e.check(QD(n));
});
function ei(e) {
  return iD(ax, e);
}
const Te = /* @__PURE__ */ X("ZodStringFormat", (e, t) => {
  we.init(e, t), rm.init(e, t);
}), ox = /* @__PURE__ */ X("ZodEmail", (e, t) => {
  m0.init(e, t), Te.init(e, t);
}), zl = /* @__PURE__ */ X("ZodGUID", (e, t) => {
  p0.init(e, t), Te.init(e, t);
}), na = /* @__PURE__ */ X("ZodUUID", (e, t) => {
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
  W0.init(e, t), Te.init(e, t);
}), xx = /* @__PURE__ */ X("ZodE164", (e, t) => {
  I0.init(e, t), Te.init(e, t);
}), _x = /* @__PURE__ */ X("ZodJWT", (e, t) => {
  L0.init(e, t), Te.init(e, t);
}), wx = /* @__PURE__ */ X("ZodUnknown", (e, t) => {
  M0.init(e, t), Me.init(e, t);
});
function ql() {
  return SD(wx);
}
const Tx = /* @__PURE__ */ X("ZodNever", (e, t) => {
  $0.init(e, t), Me.init(e, t);
});
function Ux(e) {
  return kD(Tx, e);
}
const Ex = /* @__PURE__ */ X("ZodArray", (e, t) => {
  P0.init(e, t), Me.init(e, t), e.element = t.element, e.min = (n, r) => e.check(La(n, r)), e.nonempty = (n) => e.check(La(1, n)), e.max = (n, r) => e.check(tm(n, r)), e.length = (n, r) => e.check(nm(n, r)), e.unwrap = () => e.element;
});
function Ax(e, t) {
  return zD(Ex, e, t);
}
const Cx = /* @__PURE__ */ X("ZodObject", (e, t) => {
  z0.init(e, t), Me.init(e, t), be(e, "shape", () => t.shape), e.keyof = () => Rx(Object.keys(e._zod.def.shape)), e.catchall = (n) => e.clone({ ...e._zod.def, catchall: n }), e.passthrough = () => e.clone({ ...e._zod.def, catchall: ql() }), e.loose = () => e.clone({ ...e._zod.def, catchall: ql() }), e.strict = () => e.clone({ ...e._zod.def, catchall: Ux() }), e.strip = () => e.clone({ ...e._zod.def, catchall: void 0 }), e.extend = (n) => _v(e, n), e.merge = (n) => wv(e, n), e.pick = (n) => Dv(e, n), e.omit = (n) => xv(e, n), e.partial = (...n) => Tv(im, e, n[0]), e.required = (...n) => Uv(am, e, n[0]);
});
function jl(e, t) {
  const n = {
    type: "object",
    get shape() {
      return tr(this, "shape", e ? mv(e) : {}), this.shape;
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
const fu = /* @__PURE__ */ X("ZodEnum", (e, t) => {
  Z0.init(e, t), Me.init(e, t), e.enum = t.entries, e.options = Object.values(t.entries);
  const n = new Set(Object.keys(t.entries));
  e.extract = (r, i) => {
    const a = {};
    for (const o of r)
      if (n.has(o))
        a[o] = t.entries[o];
      else
        throw new Error(`Key ${o} not found in enum`);
    return new fu({
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
    return new fu({
      ...t,
      checks: [],
      ...ae(i),
      entries: a
    });
  };
});
function Rx(e, t) {
  const n = Array.isArray(e) ? Object.fromEntries(e.map((r) => [r, r])) : e;
  return new fu({
    type: "enum",
    entries: n,
    ...ae(t)
  });
}
const Ox = /* @__PURE__ */ X("ZodTransform", (e, t) => {
  X0.init(e, t), Me.init(e, t), e._zod.parse = (n, r) => {
    n.addIssue = (a) => {
      if (typeof a == "string")
        n.issues.push(bi(a, n.value, t));
      else {
        const o = a;
        o.fatal && (o.continue = !1), o.code ?? (o.code = "custom"), o.input ?? (o.input = n.value), o.inst ?? (o.inst = e), n.issues.push(bi(o));
      }
    };
    const i = t.transform(n.value, n);
    return i instanceof Promise ? i.then((a) => (n.value = a, n)) : (n.value = i, n);
  };
});
function Wx(e) {
  return new Ox({
    type: "transform",
    transform: e
  });
}
const im = /* @__PURE__ */ X("ZodOptional", (e, t) => {
  H0.init(e, t), Me.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function Zl(e) {
  return new im({
    type: "optional",
    innerType: e
  });
}
const Ix = /* @__PURE__ */ X("ZodNullable", (e, t) => {
  V0.init(e, t), Me.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function Xl(e) {
  return new Ix({
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
      return typeof t == "function" ? t() : jg(t);
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
      return typeof t == "function" ? t() : jg(t);
    }
  });
}
const am = /* @__PURE__ */ X("ZodNonOptional", (e, t) => {
  K0.init(e, t), Me.init(e, t), e.unwrap = () => e._zod.def.innerType;
});
function Px(e, t) {
  return new am({
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
const Hx = /* @__PURE__ */ X("ZodCustom", (e, t) => {
  tD.init(e, t), Me.init(e, t);
});
function Vx(e, t = {}) {
  return qD(Hx, e, t);
}
function Gx(e) {
  return jD(e);
}
var ze = typeof globalThis < "u" && globalThis || typeof self < "u" && self || // eslint-disable-next-line no-undef
typeof global < "u" && global || {}, Qe = {
  searchParams: "URLSearchParams" in ze,
  iterable: "Symbol" in ze && "iterator" in Symbol,
  blob: "FileReader" in ze && "Blob" in ze && function() {
    try {
      return new Blob(), !0;
    } catch {
      return !1;
    }
  }(),
  formData: "FormData" in ze,
  arrayBuffer: "ArrayBuffer" in ze
};
function Yx(e) {
  return e && DataView.prototype.isPrototypeOf(e);
}
if (Qe.arrayBuffer)
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
function $r(e) {
  if (typeof e != "string" && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e) || e === "")
    throw new TypeError('Invalid character in header field name: "' + e + '"');
  return e.toLowerCase();
}
function Iu(e) {
  return typeof e != "string" && (e = String(e)), e;
}
function Nu(e) {
  var t = {
    next: function() {
      var n = e.shift();
      return { done: n === void 0, value: n };
    }
  };
  return Qe.iterable && (t[Symbol.iterator] = function() {
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
  e = $r(e), t = Iu(t);
  var n = this.map[e];
  this.map[e] = n ? n + ", " + t : t;
};
Oe.prototype.delete = function(e) {
  delete this.map[$r(e)];
};
Oe.prototype.get = function(e) {
  return e = $r(e), this.has(e) ? this.map[e] : null;
};
Oe.prototype.has = function(e) {
  return this.map.hasOwnProperty($r(e));
};
Oe.prototype.set = function(e, t) {
  this.map[$r(e)] = Iu(t);
};
Oe.prototype.forEach = function(e, t) {
  for (var n in this.map)
    this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this);
};
Oe.prototype.keys = function() {
  var e = [];
  return this.forEach(function(t, n) {
    e.push(n);
  }), Nu(e);
};
Oe.prototype.values = function() {
  var e = [];
  return this.forEach(function(t) {
    e.push(t);
  }), Nu(e);
};
Oe.prototype.entries = function() {
  var e = [];
  return this.forEach(function(t, n) {
    e.push([n, t]);
  }), Nu(e);
};
Qe.iterable && (Oe.prototype[Symbol.iterator] = Oe.prototype.entries);
function cc(e) {
  if (!e._noBody) {
    if (e.bodyUsed)
      return Promise.reject(new TypeError("Already read"));
    e.bodyUsed = !0;
  }
}
function om(e) {
  return new Promise(function(t, n) {
    e.onload = function() {
      t(e.result);
    }, e.onerror = function() {
      n(e.error);
    };
  });
}
function Qx(e) {
  var t = new FileReader(), n = om(t);
  return t.readAsArrayBuffer(e), n;
}
function e_(e) {
  var t = new FileReader(), n = om(t), r = /charset=([A-Za-z0-9_-]+)/.exec(e.type), i = r ? r[1] : "utf-8";
  return t.readAsText(e, i), n;
}
function t_(e) {
  for (var t = new Uint8Array(e), n = new Array(t.length), r = 0; r < t.length; r++)
    n[r] = String.fromCharCode(t[r]);
  return n.join("");
}
function Vl(e) {
  if (e.slice)
    return e.slice(0);
  var t = new Uint8Array(e.byteLength);
  return t.set(new Uint8Array(e)), t.buffer;
}
function cm() {
  return this.bodyUsed = !1, this._initBody = function(e) {
    this.bodyUsed = this.bodyUsed, this._bodyInit = e, e ? typeof e == "string" ? this._bodyText = e : Qe.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : Qe.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : Qe.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : Qe.arrayBuffer && Qe.blob && Yx(e) ? (this._bodyArrayBuffer = Vl(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : Qe.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || Jx(e)) ? this._bodyArrayBuffer = Vl(e) : this._bodyText = e = Object.prototype.toString.call(e) : (this._noBody = !0, this._bodyText = ""), this.headers.get("content-type") || (typeof e == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : Qe.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
  }, Qe.blob && (this.blob = function() {
    var e = cc(this);
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
      var e = cc(this);
      return e || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
        this._bodyArrayBuffer.buffer.slice(
          this._bodyArrayBuffer.byteOffset,
          this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
        )
      ) : Promise.resolve(this._bodyArrayBuffer));
    } else {
      if (Qe.blob)
        return this.blob().then(Qx);
      throw new Error("could not read as ArrayBuffer");
    }
  }, this.text = function() {
    var e = cc(this);
    if (e)
      return e;
    if (this._bodyBlob)
      return e_(this._bodyBlob);
    if (this._bodyArrayBuffer)
      return Promise.resolve(t_(this._bodyArrayBuffer));
    if (this._bodyFormData)
      throw new Error("could not read FormData body as text");
    return Promise.resolve(this._bodyText);
  }, Qe.formData && (this.formData = function() {
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
function Zn(e, t) {
  if (!(this instanceof Zn))
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
  t = t || {};
  var n = t.body;
  if (e instanceof Zn) {
    if (e.bodyUsed)
      throw new TypeError("Already read");
    this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new Oe(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, !n && e._bodyInit != null && (n = e._bodyInit, e.bodyUsed = !0);
  } else
    this.url = String(e);
  if (this.credentials = t.credentials || this.credentials || "same-origin", (t.headers || !this.headers) && (this.headers = new Oe(t.headers)), this.method = r_(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal || function() {
    if ("AbortController" in ze) {
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
Zn.prototype.clone = function() {
  return new Zn(this, { body: this._bodyInit });
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
cm.call(Zn.prototype);
function Xt(e, t) {
  if (!(this instanceof Xt))
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
  if (t || (t = {}), this.type = "default", this.status = t.status === void 0 ? 200 : t.status, this.status < 200 || this.status > 599)
    throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
  this.ok = this.status >= 200 && this.status < 300, this.statusText = t.statusText === void 0 ? "" : "" + t.statusText, this.headers = new Oe(t.headers), this.url = t.url || "", this._initBody(e);
}
cm.call(Xt.prototype);
Xt.prototype.clone = function() {
  return new Xt(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Oe(this.headers),
    url: this.url
  });
};
Xt.error = function() {
  var e = new Xt(null, { status: 200, statusText: "" });
  return e.ok = !1, e.status = 0, e.type = "error", e;
};
var o_ = [301, 302, 303, 307, 308];
Xt.redirect = function(e, t) {
  if (o_.indexOf(t) === -1)
    throw new RangeError("Invalid status code");
  return new Xt(null, { status: t, headers: { location: e } });
};
var In = ze.DOMException;
try {
  new In();
} catch {
  In = function(t, n) {
    this.message = t, this.name = n;
    var r = Error(t);
    this.stack = r.stack;
  }, In.prototype = Object.create(Error.prototype), In.prototype.constructor = In;
}
function sm(e, t) {
  return new Promise(function(n, r) {
    var i = new Zn(e, t);
    if (i.signal && i.signal.aborted)
      return r(new In("Aborted", "AbortError"));
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
        n(new Xt(d, s));
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
        r(new In("Aborted", "AbortError"));
      }, 0);
    };
    function c(s) {
      try {
        return s === "" && ze.location.href ? ze.location.href : s;
      } catch {
        return s;
      }
    }
    if (a.open(i.method, c(i.url), !0), i.credentials === "include" ? a.withCredentials = !0 : i.credentials === "omit" && (a.withCredentials = !1), "responseType" in a && (Qe.blob ? a.responseType = "blob" : Qe.arrayBuffer && (a.responseType = "arraybuffer")), t && typeof t.headers == "object" && !(t.headers instanceof Oe || ze.Headers && t.headers instanceof ze.Headers)) {
      var u = [];
      Object.getOwnPropertyNames(t.headers).forEach(function(s) {
        u.push($r(s)), a.setRequestHeader(s, Iu(t.headers[s]));
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
sm.polyfill = !0;
ze.fetch || (ze.fetch = sm, ze.Headers = Oe, ze.Request = Zn, ze.Response = Xt);
const um = "11434", dm = `http://127.0.0.1:${um}`, c_ = "0.5.17";
var s_ = Object.defineProperty, u_ = (e, t, n) => t in e ? s_(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, sc = (e, t, n) => (u_(e, typeof t != "symbol" ? t + "" : t, n), n);
class Lu extends Error {
  constructor(t, n) {
    super(t), this.error = t, this.status_code = n, this.name = "ResponseError", Error.captureStackTrace && Error.captureStackTrace(this, Lu);
  }
}
class d_ {
  constructor(t, n, r) {
    sc(this, "abortController"), sc(this, "itr"), sc(this, "doneCallback"), this.abortController = t, this.itr = n, this.doneCallback = r;
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
const Mu = async (e) => {
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
  throw new Lu(t, e.status);
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
const $u = async (e, t, n = {}) => {
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
}, Gl = async (e, t, n) => {
  const r = await $u(e, t, {
    headers: n == null ? void 0 : n.headers
  });
  return await Mu(r), r;
}, lr = async (e, t, n, r) => {
  const a = ((c) => c !== null && typeof c == "object" && !Array.isArray(c))(n) ? JSON.stringify(n) : n, o = await $u(e, t, {
    method: "POST",
    body: a,
    signal: r == null ? void 0 : r.signal,
    headers: r == null ? void 0 : r.headers
  });
  return await Mu(o), o;
}, h_ = async (e, t, n, r) => {
  const i = await $u(e, t, {
    method: "DELETE",
    body: JSON.stringify(n),
    headers: r == null ? void 0 : r.headers
  });
  return await Mu(i), i;
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
    return dm;
  let t = e.includes("://");
  e.startsWith(":") && (e = `http://127.0.0.1${e}`, t = !0), t || (e = `http://${e}`);
  const n = new URL(e);
  let r = n.port;
  r || (t ? r = n.protocol === "https:" ? "443" : "80" : r = um);
  let i = "";
  n.username && (i = n.username, n.password && (i += `:${n.password}`), i += "@");
  let a = `${n.protocol}//${i}${n.hostname}:${r}${n.pathname}`;
  return a.endsWith("/") && (a = a.slice(0, -1)), a;
};
var m_ = Object.defineProperty, b_ = (e, t, n) => t in e ? m_(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, uc = (e, t, n) => (b_(e, typeof t != "symbol" ? t + "" : t, n), n);
let lm = class {
  constructor(t) {
    uc(this, "config"), uc(this, "fetch"), uc(this, "ongoingStreamedRequests", []), this.config = {
      host: "",
      headers: t == null ? void 0 : t.headers
    }, t != null && t.proxy || (this.config.host = g_((t == null ? void 0 : t.host) ?? dm)), this.fetch = (t == null ? void 0 : t.fetch) ?? fetch;
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
      const a = new AbortController(), o = await lr(this.fetch, r, n, {
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
    return await (await lr(this.fetch, r, n, {
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
    return await lr(this.fetch, `${this.config.host}/api/copy`, { ...t }, {
      headers: this.config.headers
    }), { status: "success" };
  }
  /**
   * Lists the models on the server.
   * @returns {Promise<ListResponse>} - The response object.
   * @throws {Error} - If the response body is missing.
   */
  async list() {
    return await (await Gl(this.fetch, `${this.config.host}/api/tags`, {
      headers: this.config.headers
    })).json();
  }
  /**
   * Shows the metadata of a model. The request object should contain the name of the model.
   * @param request {ShowRequest} - The request object.
   * @returns {Promise<ShowResponse>} - The response object.
   */
  async show(t) {
    return await (await lr(this.fetch, `${this.config.host}/api/show`, {
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
    return await (await lr(this.fetch, `${this.config.host}/api/embed`, {
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
    return await (await lr(this.fetch, `${this.config.host}/api/embeddings`, {
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
    return await (await Gl(this.fetch, `${this.config.host}/api/ps`, {
      headers: this.config.headers
    })).json();
  }
};
new lm();
class y_ extends lm {
  async encodeImage(t) {
    if (typeof t != "string")
      return Buffer.from(t).toString("base64");
    try {
      if (Ng.existsSync(t)) {
        const n = await Cl.readFile(Al(t));
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
      return await Cl.access(t), !0;
    } catch {
      return !1;
    }
  }
  async create(t) {
    if (t.from && await this.fileExists(Al(t.from)))
      throw Error("Creating with a local path is not currently supported from ollama-js");
    return t.stream ? super.create(t) : super.create(t);
  }
}
const hu = new y_();
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
var Pu = { exports: {} };
function fm(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Et = {};
Et.getBooleanOption = (e, t) => {
  let n = !1;
  if (t in e && typeof (n = e[t]) != "boolean")
    throw new TypeError(`Expected the "${t}" option to be a boolean`);
  return n;
};
Et.cppdb = Symbol();
Et.inspect = Symbol.for("nodejs.util.inspect.custom");
const pu = { value: "SqliteError", writable: !0, enumerable: !1, configurable: !0 };
function Mn(e, t) {
  if (new.target !== Mn)
    return new Mn(e, t);
  if (typeof t != "string")
    throw new TypeError("Expected second argument to be a string");
  Error.call(this, e), pu.value = "" + e, Object.defineProperty(this, "message", pu), Error.captureStackTrace(this, Mn), this.code = t;
}
Object.setPrototypeOf(Mn, Error);
Object.setPrototypeOf(Mn.prototype, Error.prototype);
Object.defineProperty(Mn.prototype, "name", pu);
var hm = Mn, ra = { exports: {} }, dc, Yl;
function x_() {
  if (Yl) return dc;
  Yl = 1;
  var e = Lr.sep || "/";
  dc = t;
  function t(n) {
    if (typeof n != "string" || n.length <= 7 || n.substring(0, 7) != "file://")
      throw new TypeError("must pass in a file:// URI to convert to a file path");
    var r = decodeURI(n.substring(7)), i = r.indexOf("/"), a = r.substring(0, i), o = r.substring(i + 1);
    return a == "localhost" && (a = ""), a && (a = e + e + a), o = o.replace(/^(.+)\|/, "$1:"), e == "\\" && (o = o.replace(/\//g, "\\")), /^.+\:/.test(o) || (o = e + o), a + o;
  }
  return dc;
}
var Kl;
function __() {
  return Kl || (Kl = 1, function(e, t) {
    var n = Wi, r = Lr, i = x_(), a = r.join, o = r.dirname, c = n.accessSync && function(d) {
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
      typeof d == "string" ? d = { bindings: d } : d || (d = {}), Object.keys(u).map(function(f) {
        f in d || (d[f] = u[f]);
      }), d.module_root || (d.module_root = t.getRoot(t.getFileName())), r.extname(d.bindings) != ".node" && (d.bindings += ".node");
      for (var g = typeof __webpack_require__ == "function" ? __non_webpack_require__ : fm, l = [], p = 0, b = d.try.length, m, y, h; p < b; p++) {
        m = a.apply(
          null,
          d.try[p].map(function(f) {
            return d[f] || f;
          })
        ), l.push(m);
        try {
          return y = d.path ? g.resolve(m) : g(m), d.path || (y.path = m), y;
        } catch (f) {
          if (f.code !== "MODULE_NOT_FOUND" && f.code !== "QUALIFIED_PATH_RESOLUTION_FAILED" && !/not find/i.test(f.message))
            throw f;
        }
      }
      throw h = new Error(
        `Could not locate the bindings file. Tried:
` + l.map(function(f) {
          return d.arrow + f;
        }).join(`
`)
      ), h.tries = l, h;
    }
    e.exports = t = s, t.getFileName = function(g) {
      var l = Error.prepareStackTrace, p = Error.stackTraceLimit, b = {}, m;
      Error.stackTraceLimit = 10, Error.prepareStackTrace = function(h, f) {
        for (var v = 0, D = f.length; v < D; v++)
          if (m = f[v].getFileName(), m !== __filename)
            if (g) {
              if (m !== g)
                return;
            } else
              return;
      }, Error.captureStackTrace(b), b.stack, Error.prepareStackTrace = l, Error.stackTraceLimit = p;
      var y = "file://";
      return m.indexOf(y) === 0 && (m = i(m)), m;
    }, t.getRoot = function(g) {
      for (var l = o(g), p; ; ) {
        if (l === "." && (l = process.cwd()), c(a(l, "package.json")) || c(a(l, "node_modules")))
          return l;
        if (p === l)
          throw new Error(
            'Could not find module root given file: "' + g + '". Do you have a `package.json` file? '
          );
        p = l, l = a(l, "..");
      }
    };
  }(ra, ra.exports)), ra.exports;
}
var en = {}, Jl;
function w_() {
  if (Jl) return en;
  Jl = 1;
  const { cppdb: e } = Et;
  return en.prepare = function(n) {
    return this[e].prepare(n, this, !1);
  }, en.exec = function(n) {
    return this[e].exec(n), this;
  }, en.close = function() {
    return this[e].close(), this;
  }, en.loadExtension = function(...n) {
    return this[e].loadExtension(...n), this;
  }, en.defaultSafeIntegers = function(...n) {
    return this[e].defaultSafeIntegers(...n), this;
  }, en.unsafeMode = function(...n) {
    return this[e].unsafeMode(...n), this;
  }, en.getters = {
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
  }, en;
}
var lc, Ql;
function T_() {
  if (Ql) return lc;
  Ql = 1;
  const { cppdb: e } = Et, t = /* @__PURE__ */ new WeakMap();
  lc = function(a) {
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
  }, r = (i, a, o, { begin: c, commit: u, rollback: s, savepoint: d, release: g, rollbackTo: l }) => function() {
    let b, m, y;
    o.inTransaction ? (b = d, m = g, y = l) : (b = c, m = u, y = s), b.run();
    try {
      const h = i.call(a, this, arguments);
      if (h && typeof h.then == "function")
        throw new TypeError("Transaction function cannot return a promise");
      return m.run(), h;
    } catch (h) {
      throw o.inTransaction && (y.run(), y !== s && m.run()), h;
    }
  };
  return lc;
}
var fc, ef;
function U_() {
  if (ef) return fc;
  ef = 1;
  const { getBooleanOption: e, cppdb: t } = Et;
  return fc = function(r, i) {
    if (i == null && (i = {}), typeof r != "string") throw new TypeError("Expected first argument to be a string");
    if (typeof i != "object") throw new TypeError("Expected second argument to be an options object");
    const a = e(i, "simple"), o = this[t].prepare(`PRAGMA ${r}`, this, !0);
    return a ? o.pluck().get() : o.all();
  }, fc;
}
var hc, tf;
function E_() {
  if (tf) return hc;
  tf = 1;
  const e = Wi, t = Lr, { promisify: n } = to, { cppdb: r } = Et, i = n(e.access);
  hc = async function(c, u) {
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
      setImmediate(function l() {
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
          setImmediate(l);
        } catch (p) {
          o.close(), g(p);
        }
      });
    });
  };
  return hc;
}
var pc, nf;
function A_() {
  if (nf) return pc;
  nf = 1;
  const { cppdb: e } = Et;
  return pc = function(n) {
    if (n == null && (n = {}), typeof n != "object") throw new TypeError("Expected first argument to be an options object");
    const r = "attached" in n ? n.attached : "main";
    if (typeof r != "string") throw new TypeError('Expected the "attached" option to be a string');
    if (!r) throw new TypeError('The "attached" option cannot be an empty string');
    return this[e].serialize(r);
  }, pc;
}
var gc, rf;
function C_() {
  if (rf) return gc;
  rf = 1;
  const { getBooleanOption: e, cppdb: t } = Et;
  return gc = function(r, i, a) {
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
  }, gc;
}
var mc, af;
function F_() {
  if (af) return mc;
  af = 1;
  const { getBooleanOption: e, cppdb: t } = Et;
  mc = function(a, o) {
    if (typeof a != "string") throw new TypeError("Expected first argument to be a string");
    if (typeof o != "object" || o === null) throw new TypeError("Expected second argument to be an options object");
    if (!a) throw new TypeError("User-defined function name cannot be an empty string");
    const c = "start" in o ? o.start : null, u = n(o, "step", !0), s = n(o, "inverse", !1), d = n(o, "result", !1), g = "safeIntegers" in o ? +e(o, "safeIntegers") : 2, l = e(o, "deterministic"), p = e(o, "directOnly"), b = e(o, "varargs");
    let m = -1;
    if (!b && (m = Math.max(r(u), s ? r(s) : 0), m > 0 && (m -= 1), m > 100))
      throw new RangeError("User-defined functions cannot have more than 100 arguments");
    return this[t].aggregate(c, u, s, d, a, m, g, l, p), this;
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
  return mc;
}
var bc, of;
function S_() {
  if (of) return bc;
  of = 1;
  const { cppdb: e } = Et;
  bc = function(p, b) {
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
  function t(l) {
    return function(b, m, y, ...h) {
      const f = {
        module: b,
        database: m,
        table: y
      }, v = u.call(l, f, h);
      if (typeof v != "object" || v === null)
        throw new TypeError(`Virtual table module "${b}" did not return a table definition object`);
      return n(v, "returned", b);
    };
  }
  function n(l, p, b) {
    if (!c.call(l, "rows"))
      throw new TypeError(`Virtual table module "${b}" ${p} a table definition without a "rows" property`);
    if (!c.call(l, "columns"))
      throw new TypeError(`Virtual table module "${b}" ${p} a table definition without a "columns" property`);
    const m = l.rows;
    if (typeof m != "function" || Object.getPrototypeOf(m) !== s)
      throw new TypeError(`Virtual table module "${b}" ${p} a table definition with an invalid "rows" property (should be a generator function)`);
    let y = l.columns;
    if (!Array.isArray(y) || !(y = [...y]).every((x) => typeof x == "string"))
      throw new TypeError(`Virtual table module "${b}" ${p} a table definition with an invalid "columns" property (should be an array of strings)`);
    if (y.length !== new Set(y).size)
      throw new TypeError(`Virtual table module "${b}" ${p} a table definition with duplicate column names`);
    if (!y.length)
      throw new RangeError(`Virtual table module "${b}" ${p} a table definition with zero columns`);
    let h;
    if (c.call(l, "parameters")) {
      if (h = l.parameters, !Array.isArray(h) || !(h = [...h]).every((x) => typeof x == "string"))
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
    let f = 2;
    if (c.call(l, "safeIntegers")) {
      const x = l.safeIntegers;
      if (typeof x != "boolean")
        throw new TypeError(`Virtual table module "${b}" ${p} a table definition with an invalid "safeIntegers" property (should be a boolean)`);
      f = +x;
    }
    let v = !1;
    if (c.call(l, "directOnly") && (v = l.directOnly, typeof v != "boolean"))
      throw new TypeError(`Virtual table module "${b}" ${p} a table definition with an invalid "directOnly" property (should be a boolean)`);
    return [
      `CREATE TABLE x(${[
        ...h.map(d).map((x) => `${x} HIDDEN`),
        ...y.map(d)
      ].join(", ")});`,
      r(m, new Map(y.map((x, w) => [x, h.length + w])), b),
      h,
      f,
      v
    ];
  }
  function r(l, p, b) {
    return function* (...y) {
      const h = y.map((f) => Buffer.isBuffer(f) ? Buffer.from(f) : f);
      for (let f = 0; f < p.size; ++f)
        h.push(null);
      for (const f of l(...y))
        if (Array.isArray(f))
          i(f, h, p.size, b), yield h;
        else if (typeof f == "object" && f !== null)
          a(f, h, p, b), yield h;
        else
          throw new TypeError(`Virtual table module "${b}" yielded something that isn't a valid row object`);
    };
  }
  function i(l, p, b, m) {
    if (l.length !== b)
      throw new TypeError(`Virtual table module "${m}" yielded a row with an incorrect number of columns`);
    const y = p.length - b;
    for (let h = 0; h < b; ++h)
      p[h + y] = l[h];
  }
  function a(l, p, b, m) {
    let y = 0;
    for (const h of Object.keys(l)) {
      const f = b.get(h);
      if (f === void 0)
        throw new TypeError(`Virtual table module "${m}" yielded a row with an undeclared column "${h}"`);
      p[f] = l[h], y += 1;
    }
    if (y !== b.size)
      throw new TypeError(`Virtual table module "${m}" yielded a row with missing columns`);
  }
  function o({ length: l }) {
    if (!Number.isInteger(l) || l < 0)
      throw new TypeError("Expected function.length to be a positive integer");
    const p = [];
    for (let b = 0; b < l; ++b)
      p.push(`$${b + 1}`);
    return p;
  }
  const { hasOwnProperty: c } = Object.prototype, { apply: u } = Function.prototype, s = Object.getPrototypeOf(function* () {
  }), d = (l) => `"${l.replace(/"/g, '""')}"`, g = (l) => () => l;
  return bc;
}
var yc, cf;
function k_() {
  if (cf) return yc;
  cf = 1;
  const e = function() {
  };
  return yc = function(n, r) {
    return Object.assign(new e(), this);
  }, yc;
}
const B_ = Wi, sf = Lr, Aa = Et, R_ = hm;
let uf;
function Ye(e, t) {
  if (new.target == null)
    return new Ye(e, t);
  let n;
  if (Buffer.isBuffer(e) && (n = e, e = ":memory:"), e == null && (e = ""), t == null && (t = {}), typeof e != "string") throw new TypeError("Expected first argument to be a string");
  if (typeof t != "object") throw new TypeError("Expected second argument to be an options object");
  if ("readOnly" in t) throw new TypeError('Misspelled option "readOnly" should be "readonly"');
  if ("memory" in t) throw new TypeError('Option "memory" was removed in v7.0.0 (use ":memory:" filename instead)');
  const r = e.trim(), i = r === "" || r === ":memory:", a = Aa.getBooleanOption(t, "readonly"), o = Aa.getBooleanOption(t, "fileMustExist"), c = "timeout" in t ? t.timeout : 5e3, u = "verbose" in t ? t.verbose : null, s = "nativeBinding" in t ? t.nativeBinding : null;
  if (a && i && !n) throw new TypeError("In-memory/temporary databases cannot be readonly");
  if (!Number.isInteger(c) || c < 0) throw new TypeError('Expected the "timeout" option to be a positive integer');
  if (c > 2147483647) throw new RangeError('Option "timeout" cannot be greater than 2147483647');
  if (u != null && typeof u != "function") throw new TypeError('Expected the "verbose" option to be a function');
  if (s != null && typeof s != "string" && typeof s != "object") throw new TypeError('Expected the "nativeBinding" option to be a string or addon object');
  let d;
  if (s == null ? d = uf || (uf = __()("better_sqlite3.node")) : typeof s == "string" ? d = (typeof __non_webpack_require__ == "function" ? __non_webpack_require__ : fm)(sf.resolve(s).replace(/(\.node)?$/, ".node")) : d = s, d.isInitialized || (d.setErrorConstructor(R_), d.isInitialized = !0), !i && !B_.existsSync(sf.dirname(r)))
    throw new TypeError("Cannot open database because the directory does not exist");
  Object.defineProperties(this, {
    [Aa.cppdb]: { value: new d.Database(r, e, i, a, o, c, u || null, n || null) },
    ...rr.getters
  });
}
const rr = w_();
Ye.prototype.prepare = rr.prepare;
Ye.prototype.transaction = T_();
Ye.prototype.pragma = U_();
Ye.prototype.backup = E_();
Ye.prototype.serialize = A_();
Ye.prototype.function = C_();
Ye.prototype.aggregate = F_();
Ye.prototype.table = S_();
Ye.prototype.loadExtension = rr.loadExtension;
Ye.prototype.exec = rr.exec;
Ye.prototype.close = rr.close;
Ye.prototype.defaultSafeIntegers = rr.defaultSafeIntegers;
Ye.prototype.unsafeMode = rr.unsafeMode;
Ye.prototype[Aa.inspect] = k_();
var O_ = Ye;
Pu.exports = O_;
Pu.exports.SqliteError = hm;
var W_ = Pu.exports;
const I_ = /* @__PURE__ */ v_(W_);
let fr = null;
function Rt() {
  if (fr) return fr;
  const e = zn.getPath("userData"), t = ht.join(e, "data.sqlite3");
  return Ng.mkdirSync(ht.dirname(t), { recursive: !0 }), fr = new I_(t), fr.pragma("journal_mode = WAL"), N_(fr), fr;
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
  `);
}
function zu() {
  return Lg.randomUUID();
}
function pm(e) {
  const t = Lg.createHash("sha256");
  return t.update(e), t.digest("hex");
}
function L_(e, t, n) {
  const r = zu(), i = n ?? pm(t);
  return Rt().prepare(
    "INSERT INTO transcripts(id, filename, sha256, text) VALUES (?, ?, ?, ?)"
  ).run(r, e, i, t), r;
}
function gm(e) {
  return Rt().prepare("SELECT * FROM transcripts WHERE id = ?").get(e);
}
function M_(e, t, n) {
  const r = zu();
  return Rt().prepare(
    "INSERT INTO summaries(id, transcript_id, json, markdown) VALUES (?, ?, ?, ?)"
  ).run(r, e, JSON.stringify(t), n), r;
}
function mm() {
  return Rt().prepare("SELECT term, definition, aliases FROM glossary ORDER BY term ASC").all().map((t) => ({
    term: t.term,
    definition: t.definition,
    aliases: t.aliases ? String(t.aliases).split(",").map((n) => n.trim()).filter(Boolean) : []
  }));
}
function $_(e) {
  const t = (e.aliases ?? []).join(",");
  Rt().prepare(`INSERT INTO glossary(term, definition, aliases, updated_at)
    VALUES (@term, @definition, @aliases, CURRENT_TIMESTAMP)
    ON CONFLICT(term) DO UPDATE SET definition=excluded.definition, aliases=excluded.aliases, updated_at=CURRENT_TIMESTAMP
  `).run({ term: e.term, definition: e.definition, aliases: t });
}
function P_(e) {
  Rt().prepare("DELETE FROM glossary WHERE term = ?").run(e);
}
function bm() {
  return Rt().prepare("SELECT id, excerpt, target_json, notes FROM examples ORDER BY created_at DESC").all().map((t) => ({ id: t.id, excerpt: t.excerpt, target_json: JSON.parse(t.target_json), notes: t.notes }));
}
function z_(e) {
  const t = e.id ?? zu();
  return Rt().prepare("INSERT INTO examples(id, excerpt, target_json, notes) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET excerpt=excluded.excerpt, target_json=excluded.target_json, notes=excluded.notes").run(t, e.excerpt, JSON.stringify(e.target_json), e.notes ?? ""), t;
}
function q_(e) {
  Rt().prepare("DELETE FROM examples WHERE id = ?").run(e);
}
function j_(e) {
  const t = Rt().prepare("SELECT value FROM settings WHERE key = ?").get(e);
  return t == null ? void 0 : t.value;
}
function Z_(e, t) {
  Rt().prepare("INSERT INTO settings(key, value) VALUES(?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").run(e, t);
}
var Ot = {}, qu = "1.13.7", df = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || Function("return this")() || {}, ao = Array.prototype, ju = Object.prototype, lf = typeof Symbol < "u" ? Symbol.prototype : null, X_ = ao.push, Ni = ao.slice, yi = ju.toString, H_ = ju.hasOwnProperty, ym = typeof ArrayBuffer < "u", V_ = typeof DataView < "u", G_ = Array.isArray, ff = Object.keys, hf = Object.create, pf = ym && ArrayBuffer.isView, Y_ = isNaN, K_ = isFinite, vm = !{ toString: null }.propertyIsEnumerable("toString"), gf = [
  "valueOf",
  "isPrototypeOf",
  "toString",
  "propertyIsEnumerable",
  "hasOwnProperty",
  "toLocaleString"
], J_ = Math.pow(2, 53) - 1;
function tt(e, t) {
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
function Fn(e) {
  var t = typeof e;
  return t === "function" || t === "object" && !!e;
}
function Dm(e) {
  return e === null;
}
function Zu(e) {
  return e === void 0;
}
function Xu(e) {
  return e === !0 || e === !1 || yi.call(e) === "[object Boolean]";
}
function xm(e) {
  return !!(e && e.nodeType === 1);
}
function Ke(e) {
  var t = "[object " + e + "]";
  return function(n) {
    return yi.call(n) === t;
  };
}
const oo = Ke("String"), Hu = Ke("Number"), _m = Ke("Date"), wm = Ke("RegExp"), Tm = Ke("Error"), Vu = Ke("Symbol"), Gu = Ke("ArrayBuffer");
var Um = Ke("Function"), Q_ = df.document && df.document.childNodes;
typeof /./ != "function" && typeof Int8Array != "object" && typeof Q_ != "function" && (Um = function(e) {
  return typeof e == "function" || !1;
});
const Ge = Um, Em = Ke("Object");
var Am = V_ && (!/\[native code\]/.test(String(DataView)) || Em(new DataView(new ArrayBuffer(8)))), Yu = typeof Map < "u" && Em(/* @__PURE__ */ new Map()), ew = Ke("DataView");
function tw(e) {
  return e != null && Ge(e.getInt8) && Gu(e.buffer);
}
const vi = Am ? tw : ew, Sn = G_ || Ke("Array");
function kn(e, t) {
  return e != null && H_.call(e, t);
}
var gu = Ke("Arguments");
(function() {
  gu(arguments) || (gu = function(e) {
    return kn(e, "callee");
  });
})();
const co = gu;
function Cm(e) {
  return !Vu(e) && K_(e) && !isNaN(parseFloat(e));
}
function Ku(e) {
  return Hu(e) && Y_(e);
}
function Ju(e) {
  return function() {
    return e;
  };
}
function Fm(e) {
  return function(t) {
    var n = e(t);
    return typeof n == "number" && n >= 0 && n <= J_;
  };
}
function Sm(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
const Ma = Sm("byteLength"), nw = Fm(Ma);
var rw = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
function iw(e) {
  return pf ? pf(e) && !vi(e) : nw(e) && rw.test(yi.call(e));
}
const Qu = ym ? iw : Ju(!1), ot = Sm("length");
function aw(e) {
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
  t = aw(t);
  var n = gf.length, r = e.constructor, i = Ge(r) && r.prototype || ju, a = "constructor";
  for (kn(e, a) && !t.contains(a) && t.push(a); n--; )
    a = gf[n], a in e && e[a] !== i[a] && !t.contains(a) && t.push(a);
}
function We(e) {
  if (!Fn(e)) return [];
  if (ff) return ff(e);
  var t = [];
  for (var n in e) kn(e, n) && t.push(n);
  return vm && km(e, t), t;
}
function Bm(e) {
  if (e == null) return !0;
  var t = ot(e);
  return typeof t == "number" && (Sn(e) || oo(e) || co(e)) ? t === 0 : ot(We(e)) === 0;
}
function ed(e, t) {
  var n = We(t), r = n.length;
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
he.VERSION = qu;
he.prototype.value = function() {
  return this._wrapped;
};
he.prototype.valueOf = he.prototype.toJSON = he.prototype.value;
he.prototype.toString = function() {
  return String(this._wrapped);
};
function mf(e) {
  return new Uint8Array(
    e.buffer || e,
    e.byteOffset || 0,
    Ma(e)
  );
}
var bf = "[object DataView]";
function mu(e, t, n, r) {
  if (e === t) return e !== 0 || 1 / e === 1 / t;
  if (e == null || t == null) return !1;
  if (e !== e) return t !== t;
  var i = typeof e;
  return i !== "function" && i !== "object" && typeof t != "object" ? !1 : Rm(e, t, n, r);
}
function Rm(e, t, n, r) {
  e instanceof he && (e = e._wrapped), t instanceof he && (t = t._wrapped);
  var i = yi.call(e);
  if (i !== yi.call(t)) return !1;
  if (Am && i == "[object Object]" && vi(e)) {
    if (!vi(t)) return !1;
    i = bf;
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
      return lf.valueOf.call(e) === lf.valueOf.call(t);
    case "[object ArrayBuffer]":
    case bf:
      return Rm(mf(e), mf(t), n, r);
  }
  var a = i === "[object Array]";
  if (!a && Qu(e)) {
    var o = Ma(e);
    if (o !== Ma(t)) return !1;
    if (e.buffer === t.buffer && e.byteOffset === t.byteOffset) return !0;
    a = !0;
  }
  if (!a) {
    if (typeof e != "object" || typeof t != "object") return !1;
    var c = e.constructor, u = t.constructor;
    if (c !== u && !(Ge(c) && c instanceof c && Ge(u) && u instanceof u) && "constructor" in e && "constructor" in t)
      return !1;
  }
  n = n || [], r = r || [];
  for (var s = n.length; s--; )
    if (n[s] === e) return r[s] === t;
  if (n.push(e), r.push(t), a) {
    if (s = e.length, s !== t.length) return !1;
    for (; s--; )
      if (!mu(e[s], t[s], n, r)) return !1;
  } else {
    var d = We(e), g;
    if (s = d.length, We(t).length !== s) return !1;
    for (; s--; )
      if (g = d[s], !(kn(t, g) && mu(e[g], t[g], n, r))) return !1;
  }
  return n.pop(), r.pop(), !0;
}
function Om(e, t) {
  return mu(e, t);
}
function Pr(e) {
  if (!Fn(e)) return [];
  var t = [];
  for (var n in e) t.push(n);
  return vm && km(e, t), t;
}
function td(e) {
  var t = ot(e);
  return function(n) {
    if (n == null) return !1;
    var r = Pr(n);
    if (ot(r)) return !1;
    for (var i = 0; i < t; i++)
      if (!Ge(n[e[i]])) return !1;
    return e !== Nm || !Ge(n[nd]);
  };
}
var nd = "forEach", Wm = "has", rd = ["clear", "delete"], Im = ["get", Wm, "set"], ow = rd.concat(nd, Im), Nm = rd.concat(Im), cw = ["add"].concat(rd, nd, Wm);
const Lm = Yu ? td(ow) : Ke("Map"), Mm = Yu ? td(Nm) : Ke("WeakMap"), $m = Yu ? td(cw) : Ke("Set"), Pm = Ke("WeakSet");
function ir(e) {
  for (var t = We(e), n = t.length, r = Array(n), i = 0; i < n; i++)
    r[i] = e[t[i]];
  return r;
}
function zm(e) {
  for (var t = We(e), n = t.length, r = Array(n), i = 0; i < n; i++)
    r[i] = [t[i], e[t[i]]];
  return r;
}
function id(e) {
  for (var t = {}, n = We(e), r = 0, i = n.length; r < i; r++)
    t[e[n[r]]] = n[r];
  return t;
}
function Di(e) {
  var t = [];
  for (var n in e)
    Ge(e[n]) && t.push(n);
  return t.sort();
}
function ad(e, t) {
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
const od = ad(Pr), Sr = ad(We), cd = ad(Pr, !0);
function sw() {
  return function() {
  };
}
function qm(e) {
  if (!Fn(e)) return {};
  if (hf) return hf(e);
  var t = sw();
  t.prototype = e;
  var n = new t();
  return t.prototype = null, n;
}
function jm(e, t) {
  var n = qm(e);
  return t && Sr(n, t), n;
}
function Zm(e) {
  return Fn(e) ? Sn(e) ? e.slice() : od({}, e) : e;
}
function Xm(e, t) {
  return t(e), e;
}
function sd(e) {
  return Sn(e) ? e : [e];
}
he.toPath = sd;
function Li(e) {
  return he.toPath(e);
}
function ud(e, t) {
  for (var n = t.length, r = 0; r < n; r++) {
    if (e == null) return;
    e = e[t[r]];
  }
  return n ? e : void 0;
}
function dd(e, t, n) {
  var r = ud(e, Li(t));
  return Zu(r) ? n : r;
}
function Hm(e, t) {
  t = Li(t);
  for (var n = t.length, r = 0; r < n; r++) {
    var i = t[r];
    if (!kn(e, i)) return !1;
    e = e[i];
  }
  return !!n;
}
function so(e) {
  return e;
}
function Xn(e) {
  return e = Sr({}, e), function(t) {
    return ed(t, e);
  };
}
function uo(e) {
  return e = Li(e), function(t) {
    return ud(t, e);
  };
}
function Mi(e, t, n) {
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
function Vm(e, t, n) {
  return e == null ? so : Ge(e) ? Mi(e, t, n) : Fn(e) && !Sn(e) ? Xn(e) : uo(e);
}
function lo(e, t) {
  return Vm(e, t, 1 / 0);
}
he.iteratee = lo;
function st(e, t, n) {
  return he.iteratee !== lo ? he.iteratee(e, t) : Vm(e, t, n);
}
function Gm(e, t, n) {
  t = st(t, n);
  for (var r = We(e), i = r.length, a = {}, o = 0; o < i; o++) {
    var c = r[o];
    a[c] = t(e[c], c, e);
  }
  return a;
}
function ld() {
}
function Ym(e) {
  return e == null ? ld : function(t) {
    return dd(e, t);
  };
}
function Km(e, t, n) {
  var r = Array(Math.max(0, e));
  t = Mi(t, n, 1);
  for (var i = 0; i < e; i++) r[i] = t(i);
  return r;
}
function $a(e, t) {
  return t == null && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1));
}
const kr = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
};
function Jm(e) {
  var t = function(a) {
    return e[a];
  }, n = "(?:" + We(e).join("|") + ")", r = RegExp(n), i = RegExp(n, "g");
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
}, e2 = Jm(Qm), uw = id(Qm), t2 = Jm(uw), n2 = he.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};
var vc = /(.)^/, dw = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "\u2028": "u2028",
  "\u2029": "u2029"
}, lw = /\\|'|\r|\n|\u2028|\u2029/g;
function fw(e) {
  return "\\" + dw[e];
}
var hw = /^\s*(\w|\$)+\s*$/;
function r2(e, t, n) {
  !t && n && (t = n), t = cd({}, t, he.templateSettings);
  var r = RegExp([
    (t.escape || vc).source,
    (t.interpolate || vc).source,
    (t.evaluate || vc).source
  ].join("|") + "|$", "g"), i = 0, a = "__p+='";
  e.replace(r, function(s, d, g, l, p) {
    return a += e.slice(i, p).replace(lw, fw), i = p + s.length, d ? a += `'+
((__t=(` + d + `))==null?'':_.escape(__t))+
'` : g ? a += `'+
((__t=(` + g + `))==null?'':__t)+
'` : l && (a += `';
` + l + `
__p+='`), s;
  }), a += `';
`;
  var o = t.variable;
  if (o) {
    if (!hw.test(o)) throw new Error(
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
  t = Li(t);
  var r = t.length;
  if (!r)
    return Ge(n) ? n.call(e) : n;
  for (var i = 0; i < r; i++) {
    var a = e == null ? void 0 : e[t[i]];
    a === void 0 && (a = n, i = r), e = Ge(a) ? a.call(e) : a;
  }
  return e;
}
var pw = 0;
function a2(e) {
  var t = ++pw + "";
  return e ? e + t : t;
}
function o2(e) {
  var t = he(e);
  return t._chain = !0, t;
}
function c2(e, t, n, r, i) {
  if (!(r instanceof t)) return e.apply(n, i);
  var a = qm(e.prototype), o = e.apply(a, i);
  return Fn(o) ? o : a;
}
var ar = tt(function(e, t) {
  var n = ar.placeholder, r = function() {
    for (var i = 0, a = t.length, o = Array(a), c = 0; c < a; c++)
      o[c] = t[c] === n ? arguments[i++] : t[c];
    for (; i < arguments.length; ) o.push(arguments[i++]);
    return c2(e, r, this, this, o);
  };
  return r;
});
ar.placeholder = he;
const fd = tt(function(e, t, n) {
  if (!Ge(e)) throw new TypeError("Bind must be called on a function");
  var r = tt(function(i) {
    return c2(e, r, t, this, n.concat(i));
  });
  return r;
}), gt = Fm(ot);
function or(e, t, n, r) {
  if (r = r || [], !t && t !== 0)
    t = 1 / 0;
  else if (t <= 0)
    return r.concat(e);
  for (var i = r.length, a = 0, o = ot(e); a < o; a++) {
    var c = e[a];
    if (gt(c) && (Sn(c) || co(c)))
      if (t > 1)
        or(c, t - 1, n, r), i = r.length;
      else
        for (var u = 0, s = c.length; u < s; ) r[i++] = c[u++];
    else n || (r[i++] = c);
  }
  return r;
}
const s2 = tt(function(e, t) {
  t = or(t, !1, !1);
  var n = t.length;
  if (n < 1) throw new Error("bindAll must be passed function names");
  for (; n--; ) {
    var r = t[n];
    e[r] = fd(e[r], e);
  }
  return e;
});
function u2(e, t) {
  var n = function(r) {
    var i = n.cache, a = "" + (t ? t.apply(this, arguments) : r);
    return kn(i, a) || (i[a] = e.apply(this, arguments)), i[a];
  };
  return n.cache = {}, n;
}
const hd = tt(function(e, t, n) {
  return setTimeout(function() {
    return e.apply(null, n);
  }, t);
}), d2 = ar(hd, he, 1);
function l2(e, t, n) {
  var r, i, a, o, c = 0;
  n || (n = {});
  var u = function() {
    c = n.leading === !1 ? 0 : kr(), r = null, o = e.apply(i, a), r || (i = a = null);
  }, s = function() {
    var d = kr();
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
    var d = kr() - i;
    t > d ? r = setTimeout(u, t - d) : (r = null, n || (o = e.apply(c, a)), r || (a = c = null));
  }, s = tt(function(d) {
    return c = this, a = d, i = kr(), r || (r = setTimeout(u, t), n && (o = e.apply(c, a))), o;
  });
  return s.cancel = function() {
    clearTimeout(r), r = a = c = null;
  }, s;
}
function h2(e, t) {
  return ar(t, e);
}
function fo(e) {
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
function pd(e, t) {
  var n;
  return function() {
    return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = null), n;
  };
}
const m2 = ar(pd, 2);
function gd(e, t, n) {
  t = st(t, n);
  for (var r = We(e), i, a = 0, o = r.length; a < o; a++)
    if (i = r[a], t(e[i], i, e)) return i;
}
function b2(e) {
  return function(t, n, r) {
    n = st(n, r);
    for (var i = ot(t), a = e > 0 ? 0 : i - 1; a >= 0 && a < i; a += e)
      if (n(t[a], a, t)) return a;
    return -1;
  };
}
const ho = b2(1), md = b2(-1);
function bd(e, t, n, r) {
  n = st(n, r, 1);
  for (var i = n(t), a = 0, o = ot(e); a < o; ) {
    var c = Math.floor((a + o) / 2);
    n(e[c]) < i ? a = c + 1 : o = c;
  }
  return a;
}
function y2(e, t, n) {
  return function(r, i, a) {
    var o = 0, c = ot(r);
    if (typeof a == "number")
      e > 0 ? o = a >= 0 ? a : Math.max(a + c, o) : c = a >= 0 ? Math.min(a + 1, c) : a + c + 1;
    else if (n && a && c)
      return a = n(r, i), r[a] === i ? a : -1;
    if (i !== i)
      return a = t(Ni.call(r, o, c), Ku), a >= 0 ? a + o : -1;
    for (a = e > 0 ? o : c - 1; a >= 0 && a < c; a += e)
      if (r[a] === i) return a;
    return -1;
  };
}
const yd = y2(1, ho, bd), v2 = y2(-1, md);
function xi(e, t, n) {
  var r = gt(e) ? ho : gd, i = r(e, t, n);
  if (i !== void 0 && i !== -1) return e[i];
}
function D2(e, t) {
  return xi(e, Xn(t));
}
function Bt(e, t, n) {
  t = Mi(t, n);
  var r, i;
  if (gt(e))
    for (r = 0, i = e.length; r < i; r++)
      t(e[r], r, e);
  else {
    var a = We(e);
    for (r = 0, i = a.length; r < i; r++)
      t(e[a[r]], a[r], e);
  }
  return e;
}
function un(e, t, n) {
  t = st(t, n);
  for (var r = !gt(e) && We(e), i = (r || e).length, a = Array(i), o = 0; o < i; o++) {
    var c = r ? r[o] : o;
    a[o] = t(e[c], c, e);
  }
  return a;
}
function x2(e) {
  var t = function(n, r, i, a) {
    var o = !gt(n) && We(n), c = (o || n).length, u = e > 0 ? 0 : c - 1;
    for (a || (i = n[o ? o[u] : u], u += e); u >= 0 && u < c; u += e) {
      var s = o ? o[u] : u;
      i = r(i, n[s], s, n);
    }
    return i;
  };
  return function(n, r, i, a) {
    var o = arguments.length >= 3;
    return t(n, Mi(r, a, 4), i, o);
  };
}
const Ur = x2(1), Pa = x2(-1);
function An(e, t, n) {
  var r = [];
  return t = st(t, n), Bt(e, function(i, a, o) {
    t(i, a, o) && r.push(i);
  }), r;
}
function _2(e, t, n) {
  return An(e, fo(st(t)), n);
}
function za(e, t, n) {
  t = st(t, n);
  for (var r = !gt(e) && We(e), i = (r || e).length, a = 0; a < i; a++) {
    var o = r ? r[a] : a;
    if (!t(e[o], o, e)) return !1;
  }
  return !0;
}
function qa(e, t, n) {
  t = st(t, n);
  for (var r = !gt(e) && We(e), i = (r || e).length, a = 0; a < i; a++) {
    var o = r ? r[a] : a;
    if (t(e[o], o, e)) return !0;
  }
  return !1;
}
function xt(e, t, n, r) {
  return gt(e) || (e = ir(e)), (typeof n != "number" || r) && (n = 0), yd(e, t, n) >= 0;
}
const w2 = tt(function(e, t, n) {
  var r, i;
  return Ge(t) ? i = t : (t = Li(t), r = t.slice(0, -1), t = t[t.length - 1]), un(e, function(a) {
    var o = i;
    if (!o) {
      if (r && r.length && (a = ud(a, r)), a == null) return;
      o = a[t];
    }
    return o == null ? o : o.apply(a, n);
  });
});
function po(e, t) {
  return un(e, uo(t));
}
function T2(e, t) {
  return An(e, Xn(t));
}
function vd(e, t, n) {
  var r = -1 / 0, i = -1 / 0, a, o;
  if (t == null || typeof t == "number" && typeof e[0] != "object" && e != null) {
    e = gt(e) ? e : ir(e);
    for (var c = 0, u = e.length; c < u; c++)
      a = e[c], a != null && a > r && (r = a);
  } else
    t = st(t, n), Bt(e, function(s, d, g) {
      o = t(s, d, g), (o > i || o === -1 / 0 && r === -1 / 0) && (r = s, i = o);
    });
  return r;
}
function U2(e, t, n) {
  var r = 1 / 0, i = 1 / 0, a, o;
  if (t == null || typeof t == "number" && typeof e[0] != "object" && e != null) {
    e = gt(e) ? e : ir(e);
    for (var c = 0, u = e.length; c < u; c++)
      a = e[c], a != null && a < r && (r = a);
  } else
    t = st(t, n), Bt(e, function(s, d, g) {
      o = t(s, d, g), (o < i || o === 1 / 0 && r === 1 / 0) && (r = s, i = o);
    });
  return r;
}
var gw = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
function Dd(e) {
  return e ? Sn(e) ? Ni.call(e) : oo(e) ? e.match(gw) : gt(e) ? un(e, so) : ir(e) : [];
}
function xd(e, t, n) {
  if (t == null || n)
    return gt(e) || (e = ir(e)), e[$a(e.length - 1)];
  var r = Dd(e), i = ot(r);
  t = Math.max(Math.min(t, i), 0);
  for (var a = i - 1, o = 0; o < t; o++) {
    var c = $a(o, a), u = r[o];
    r[o] = r[c], r[c] = u;
  }
  return r.slice(0, t);
}
function E2(e) {
  return xd(e, 1 / 0);
}
function A2(e, t, n) {
  var r = 0;
  return t = st(t, n), po(un(e, function(i, a, o) {
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
function go(e, t) {
  return function(n, r, i) {
    var a = t ? [[], []] : {};
    return r = st(r, i), Bt(n, function(o, c) {
      var u = r(o, c, n);
      e(a, o, u);
    }), a;
  };
}
const C2 = go(function(e, t, n) {
  kn(e, n) ? e[n].push(t) : e[n] = [t];
}), F2 = go(function(e, t, n) {
  e[n] = t;
}), S2 = go(function(e, t, n) {
  kn(e, n) ? e[n]++ : e[n] = 1;
}), k2 = go(function(e, t, n) {
  e[n ? 0 : 1].push(t);
}, !0);
function B2(e) {
  return e == null ? 0 : gt(e) ? e.length : We(e).length;
}
function mw(e, t, n) {
  return t in n;
}
const _d = tt(function(e, t) {
  var n = {}, r = t[0];
  if (e == null) return n;
  Ge(r) ? (t.length > 1 && (r = Mi(r, t[1])), t = Pr(e)) : (r = mw, t = or(t, !1, !1), e = Object(e));
  for (var i = 0, a = t.length; i < a; i++) {
    var o = t[i], c = e[o];
    r(c, o, e) && (n[o] = c);
  }
  return n;
}), R2 = tt(function(e, t) {
  var n = t[0], r;
  return Ge(n) ? (n = fo(n), t.length > 1 && (r = t[1])) : (t = un(or(t, !1, !1), String), n = function(i, a) {
    return !xt(t, a);
  }), _d(e, n, r);
});
function wd(e, t, n) {
  return Ni.call(e, 0, Math.max(0, e.length - (t == null || n ? 1 : t)));
}
function Er(e, t, n) {
  return e == null || e.length < 1 ? t == null || n ? void 0 : [] : t == null || n ? e[0] : wd(e, e.length - t);
}
function $n(e, t, n) {
  return Ni.call(e, t == null || n ? 1 : t);
}
function O2(e, t, n) {
  return e == null || e.length < 1 ? t == null || n ? void 0 : [] : t == null || n ? e[e.length - 1] : $n(e, Math.max(0, e.length - t));
}
function W2(e) {
  return An(e, Boolean);
}
function I2(e, t) {
  return or(e, t, !1);
}
const Td = tt(function(e, t) {
  return t = or(t, !0, !0), An(e, function(n) {
    return !xt(t, n);
  });
}), N2 = tt(function(e, t) {
  return Td(e, t);
});
function _i(e, t, n, r) {
  Xu(t) || (r = n, n = t, t = !1), n != null && (n = st(n, r));
  for (var i = [], a = [], o = 0, c = ot(e); o < c; o++) {
    var u = e[o], s = n ? n(u, o, e) : u;
    t && !n ? ((!o || a !== s) && i.push(u), a = s) : n ? xt(a, s) || (a.push(s), i.push(u)) : xt(i, u) || i.push(u);
  }
  return i;
}
const L2 = tt(function(e) {
  return _i(or(e, !0, !0));
});
function M2(e) {
  for (var t = [], n = arguments.length, r = 0, i = ot(e); r < i; r++) {
    var a = e[r];
    if (!xt(t, a)) {
      var o;
      for (o = 1; o < n && xt(arguments[o], a); o++)
        ;
      o === n && t.push(a);
    }
  }
  return t;
}
function wi(e) {
  for (var t = e && vd(e, ot).length || 0, n = Array(t), r = 0; r < t; r++)
    n[r] = po(e, r);
  return n;
}
const $2 = tt(wi);
function P2(e, t) {
  for (var n = {}, r = 0, i = ot(e); r < i; r++)
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
    n.push(Ni.call(e, r, r += t));
  return n;
}
function Ud(e, t) {
  return e._chain ? he(t).chain() : t;
}
function Ed(e) {
  return Bt(Di(e), function(t) {
    var n = he[t] = e[t];
    he.prototype[t] = function() {
      var r = [this._wrapped];
      return X_.apply(r, arguments), Ud(this, n.apply(he, r));
    };
  }), he;
}
Bt(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
  var t = ao[e];
  he.prototype[e] = function() {
    var n = this._wrapped;
    return n != null && (t.apply(n, arguments), (e === "shift" || e === "splice") && n.length === 0 && delete n[0]), Ud(this, n);
  };
});
Bt(["concat", "join", "slice"], function(e) {
  var t = ao[e];
  he.prototype[e] = function() {
    var n = this._wrapped;
    return n != null && (n = t.apply(n, arguments)), Ud(this, n);
  };
});
const bw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VERSION: qu,
  after: g2,
  all: za,
  allKeys: Pr,
  any: qa,
  assign: Sr,
  before: pd,
  bind: fd,
  bindAll: s2,
  chain: o2,
  chunk: q2,
  clone: Zm,
  collect: un,
  compact: W2,
  compose: p2,
  constant: Ju,
  contains: xt,
  countBy: S2,
  create: jm,
  debounce: f2,
  default: he,
  defaults: cd,
  defer: d2,
  delay: hd,
  detect: xi,
  difference: Td,
  drop: $n,
  each: Bt,
  escape: e2,
  every: za,
  extend: od,
  extendOwn: Sr,
  filter: An,
  find: xi,
  findIndex: ho,
  findKey: gd,
  findLastIndex: md,
  findWhere: D2,
  first: Er,
  flatten: I2,
  foldl: Ur,
  foldr: Pa,
  forEach: Bt,
  functions: Di,
  get: dd,
  groupBy: C2,
  has: Hm,
  head: Er,
  identity: so,
  include: xt,
  includes: xt,
  indexBy: F2,
  indexOf: yd,
  initial: wd,
  inject: Ur,
  intersection: M2,
  invert: id,
  invoke: w2,
  isArguments: co,
  isArray: Sn,
  isArrayBuffer: Gu,
  isBoolean: Xu,
  isDataView: vi,
  isDate: _m,
  isElement: xm,
  isEmpty: Bm,
  isEqual: Om,
  isError: Tm,
  isFinite: Cm,
  isFunction: Ge,
  isMap: Lm,
  isMatch: ed,
  isNaN: Ku,
  isNull: Dm,
  isNumber: Hu,
  isObject: Fn,
  isRegExp: wm,
  isSet: $m,
  isString: oo,
  isSymbol: Vu,
  isTypedArray: Qu,
  isUndefined: Zu,
  isWeakMap: Mm,
  isWeakSet: Pm,
  iteratee: lo,
  keys: We,
  last: O2,
  lastIndexOf: v2,
  map: un,
  mapObject: Gm,
  matcher: Xn,
  matches: Xn,
  max: vd,
  memoize: u2,
  methods: Di,
  min: U2,
  mixin: Ed,
  negate: fo,
  noop: ld,
  now: kr,
  object: P2,
  omit: R2,
  once: m2,
  pairs: zm,
  partial: ar,
  partition: k2,
  pick: _d,
  pluck: po,
  property: uo,
  propertyOf: Ym,
  random: $a,
  range: z2,
  reduce: Ur,
  reduceRight: Pa,
  reject: _2,
  rest: $n,
  restArguments: tt,
  result: i2,
  sample: xd,
  select: An,
  shuffle: E2,
  size: B2,
  some: qa,
  sortBy: A2,
  sortedIndex: bd,
  tail: $n,
  take: Er,
  tap: Xm,
  template: r2,
  templateSettings: n2,
  throttle: l2,
  times: Km,
  toArray: Dd,
  toPath: sd,
  transpose: wi,
  unescape: t2,
  union: L2,
  uniq: _i,
  unique: _i,
  uniqueId: a2,
  unzip: wi,
  values: ir,
  where: T2,
  without: N2,
  wrap: h2,
  zip: $2
}, Symbol.toStringTag, { value: "Module" }));
var bu = Ed(bw);
bu._ = bu;
const yw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VERSION: qu,
  after: g2,
  all: za,
  allKeys: Pr,
  any: qa,
  assign: Sr,
  before: pd,
  bind: fd,
  bindAll: s2,
  chain: o2,
  chunk: q2,
  clone: Zm,
  collect: un,
  compact: W2,
  compose: p2,
  constant: Ju,
  contains: xt,
  countBy: S2,
  create: jm,
  debounce: f2,
  default: bu,
  defaults: cd,
  defer: d2,
  delay: hd,
  detect: xi,
  difference: Td,
  drop: $n,
  each: Bt,
  escape: e2,
  every: za,
  extend: od,
  extendOwn: Sr,
  filter: An,
  find: xi,
  findIndex: ho,
  findKey: gd,
  findLastIndex: md,
  findWhere: D2,
  first: Er,
  flatten: I2,
  foldl: Ur,
  foldr: Pa,
  forEach: Bt,
  functions: Di,
  get: dd,
  groupBy: C2,
  has: Hm,
  head: Er,
  identity: so,
  include: xt,
  includes: xt,
  indexBy: F2,
  indexOf: yd,
  initial: wd,
  inject: Ur,
  intersection: M2,
  invert: id,
  invoke: w2,
  isArguments: co,
  isArray: Sn,
  isArrayBuffer: Gu,
  isBoolean: Xu,
  isDataView: vi,
  isDate: _m,
  isElement: xm,
  isEmpty: Bm,
  isEqual: Om,
  isError: Tm,
  isFinite: Cm,
  isFunction: Ge,
  isMap: Lm,
  isMatch: ed,
  isNaN: Ku,
  isNull: Dm,
  isNumber: Hu,
  isObject: Fn,
  isRegExp: wm,
  isSet: $m,
  isString: oo,
  isSymbol: Vu,
  isTypedArray: Qu,
  isUndefined: Zu,
  isWeakMap: Mm,
  isWeakSet: Pm,
  iteratee: lo,
  keys: We,
  last: O2,
  lastIndexOf: v2,
  map: un,
  mapObject: Gm,
  matcher: Xn,
  matches: Xn,
  max: vd,
  memoize: u2,
  methods: Di,
  min: U2,
  mixin: Ed,
  negate: fo,
  noop: ld,
  now: kr,
  object: P2,
  omit: R2,
  once: m2,
  pairs: zm,
  partial: ar,
  partition: k2,
  pick: _d,
  pluck: po,
  property: uo,
  propertyOf: Ym,
  random: $a,
  range: z2,
  reduce: Ur,
  reduceRight: Pa,
  reject: _2,
  rest: $n,
  restArguments: tt,
  result: i2,
  sample: xd,
  select: An,
  shuffle: E2,
  size: B2,
  some: qa,
  sortBy: A2,
  sortedIndex: bd,
  tail: $n,
  take: Er,
  tap: Xm,
  template: r2,
  templateSettings: n2,
  throttle: l2,
  times: Km,
  toArray: Dd,
  toPath: sd,
  transpose: wi,
  unescape: t2,
  union: L2,
  uniq: _i,
  unique: _i,
  uniqueId: a2,
  unzip: wi,
  values: ir,
  where: T2,
  without: N2,
  wrap: h2,
  zip: $2
}, Symbol.toStringTag, { value: "Module" })), Se = /* @__PURE__ */ D_(yw);
var Ad = {}, $e = {}, j2 = { exports: {} }, ia = { exports: {} }, yf;
function zr() {
  if (yf) return ia.exports;
  yf = 1;
  var e = /* @__PURE__ */ function() {
    return this === void 0;
  }();
  if (e)
    ia.exports = {
      freeze: Object.freeze,
      defineProperty: Object.defineProperty,
      getDescriptor: Object.getOwnPropertyDescriptor,
      keys: Object.keys,
      names: Object.getOwnPropertyNames,
      getPrototypeOf: Object.getPrototypeOf,
      isArray: Array.isArray,
      isES5: e,
      propertyIsWritable: function(d, g) {
        var l = Object.getOwnPropertyDescriptor(d, g);
        return !!(!l || l.writable || l.set);
      }
    };
  else {
    var t = {}.hasOwnProperty, n = {}.toString, r = {}.constructor.prototype, i = function(d) {
      var g = [];
      for (var l in d)
        t.call(d, l) && g.push(l);
      return g;
    }, a = function(d, g) {
      return { value: d[g] };
    }, o = function(d, g, l) {
      return d[g] = l.value, d;
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
    ia.exports = {
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
  return ia.exports;
}
var Dc, vf;
function ye() {
  if (vf) return Dc;
  vf = 1;
  var e = zr(), t = typeof navigator > "u", n = { e: {} }, r, i = typeof self < "u" ? self : typeof window < "u" ? window : typeof re < "u" || re !== void 0 ? re : null;
  function a() {
    try {
      var k = r;
      return r = null, k.apply(this, arguments);
    } catch (z) {
      return n.e = z, n;
    }
  }
  function o(k) {
    return r = k, a;
  }
  var c = function(k, z) {
    var ee = {}.hasOwnProperty;
    function te() {
      this.constructor = k, this.constructor$ = z;
      for (var J in z.prototype)
        ee.call(z.prototype, J) && J.charAt(J.length - 1) !== "$" && (this[J + "$"] = z.prototype[J]);
    }
    return te.prototype = z.prototype, k.prototype = new te(), k.prototype;
  };
  function u(k) {
    return k == null || k === !0 || k === !1 || typeof k == "string" || typeof k == "number";
  }
  function s(k) {
    return typeof k == "function" || typeof k == "object" && k !== null;
  }
  function d(k) {
    return u(k) ? new Error(w(k)) : k;
  }
  function g(k, z) {
    var ee = k.length, te = new Array(ee + 1), J;
    for (J = 0; J < ee; ++J)
      te[J] = k[J];
    return te[J] = z, te;
  }
  function l(k, z, ee) {
    if (e.isES5) {
      var te = Object.getOwnPropertyDescriptor(k, z);
      if (te != null)
        return te.get == null && te.set == null ? te.value : ee;
    } else
      return {}.hasOwnProperty.call(k, z) ? k[z] : void 0;
  }
  function p(k, z, ee) {
    if (u(k)) return k;
    var te = {
      value: ee,
      configurable: !0,
      enumerable: !1,
      writable: !0
    };
    return e.defineProperty(k, z, te), k;
  }
  function b(k) {
    throw k;
  }
  var m = function() {
    var k = [
      Array.prototype,
      Object.prototype,
      Function.prototype
    ], z = function(J) {
      for (var U = 0; U < k.length; ++U)
        if (k[U] === J)
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
            var B = Z[K];
            if (!C[B]) {
              C[B] = !0;
              var M = Object.getOwnPropertyDescriptor(J, B);
              M != null && M.get == null && M.set == null && U.push(B);
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
            for (var Z = 0; Z < k.length; ++Z)
              if (te.call(k[Z], C))
                continue e;
            U.push(C);
          }
        return U;
      };
    }
  }(), y = /this\s*\.\s*\S+\s*=/;
  function h(k) {
    try {
      if (typeof k == "function") {
        var z = e.names(k.prototype), ee = e.isES5 && z.length > 1, te = z.length > 0 && !(z.length === 1 && z[0] === "constructor"), J = y.test(k + "") && e.names(k).length > 0;
        if (ee || te || J)
          return !0;
      }
      return !1;
    } catch {
      return !1;
    }
  }
  function f(k) {
    return k;
  }
  var v = /^[a-z$_][a-z$_0-9]*$/i;
  function D(k) {
    return v.test(k);
  }
  function x(k, z, ee) {
    for (var te = new Array(k), J = 0; J < k; ++J)
      te[J] = z + J + ee;
    return te;
  }
  function w(k) {
    try {
      return k + "";
    } catch {
      return "[no string representation]";
    }
  }
  function E(k) {
    return k !== null && typeof k == "object" && typeof k.message == "string" && typeof k.name == "string";
  }
  function S(k) {
    try {
      p(k, "isOperational", !0);
    } catch {
    }
  }
  function I(k) {
    return k == null ? !1 : k instanceof Error.__BluebirdErrorTypes__.OperationalError || k.isOperational === !0;
  }
  function q(k) {
    return E(k) && e.propertyIsWritable(k, "stack");
  }
  var $ = function() {
    return "stack" in new Error() ? function(k) {
      return q(k) ? k : new Error(w(k));
    } : function(k) {
      if (q(k)) return k;
      try {
        throw new Error(w(k));
      } catch (z) {
        return z;
      }
    };
  }();
  function R(k) {
    return {}.toString.call(k);
  }
  function P(k, z, ee) {
    for (var te = e.names(k), J = 0; J < te.length; ++J) {
      var U = te[J];
      if (ee(U))
        try {
          e.defineProperty(z, U, e.getDescriptor(k, U));
        } catch {
        }
    }
  }
  var G = function(k) {
    return e.isArray(k) ? k : null;
  };
  if (typeof Symbol < "u" && Symbol.iterator) {
    var Q = typeof Array.from == "function" ? function(k) {
      return Array.from(k);
    } : function(k) {
      for (var z = [], ee = k[Symbol.iterator](), te; !(te = ee.next()).done; )
        z.push(te.value);
      return z;
    };
    G = function(k) {
      return e.isArray(k) ? k : k != null && typeof k[Symbol.iterator] == "function" ? Q(k) : null;
    };
  }
  var A = typeof process < "u" && R(process).toLowerCase() === "[object process]", T = typeof process < "u" && typeof process.env < "u";
  function _(k) {
    return T ? process.env[k] : void 0;
  }
  function F() {
    if (typeof Promise == "function")
      try {
        var k = new Promise(function() {
        });
        if ({}.toString.call(k) === "[object Promise]")
          return Promise;
      } catch {
      }
  }
  function O(k, z) {
    return k.bind(z);
  }
  var L = {
    isClass: h,
    isIdentifier: D,
    inheritedDataKeys: m,
    getDataPropertyOrDefault: l,
    thrower: b,
    isArray: e.isArray,
    asArray: G,
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
    toFastProperties: f,
    filledRange: x,
    toString: w,
    canAttachTrace: q,
    ensureErrorObject: $,
    originatesFromRejection: I,
    markAsOriginatingFromRejection: S,
    classString: R,
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
    var k = process.versions.node.split(".").map(Number);
    return k[0] === 0 && k[1] > 10 || k[0] > 0;
  }(), L.isNode && L.toFastProperties(process);
  try {
    throw new Error();
  } catch (k) {
    L.lastLineError = k;
  }
  return Dc = L, Dc;
}
var aa = { exports: {} }, xc, Df;
function vw() {
  if (Df) return xc;
  Df = 1;
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
    var l = function() {
      s || (s = !0, d.classList.toggle("foo"));
    };
    return function(b) {
      var m = new MutationObserver(function() {
        m.disconnect(), b();
      });
      m.observe(c, u), l();
    };
  }() : typeof setImmediate < "u" ? t = function(c) {
    setImmediate(c);
  } : typeof setTimeout < "u" ? t = function(c) {
    setTimeout(c, 0);
  } : t = n;
  return xc = t, xc;
}
var _c, xf;
function Dw() {
  if (xf) return _c;
  xf = 1;
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
  }, _c = t, _c;
}
var _f;
function xw() {
  if (_f) return aa.exports;
  _f = 1;
  var e;
  try {
    throw new Error();
  } catch (u) {
    e = u;
  }
  var t = vw(), n = Dw(), r = ye();
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
  }, aa.exports = i, aa.exports.firstLineError = e, aa.exports;
}
var wc, wf;
function Cn() {
  if (wf) return wc;
  wf = 1;
  var e = zr(), t = e.freeze, n = ye(), r = n.inherits, i = n.notEnumerableProp;
  function a(h, f) {
    function v(D) {
      if (!(this instanceof v)) return new v(D);
      i(
        this,
        "message",
        typeof D == "string" ? D : f
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
  for (var l = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), p = 0; p < l.length; ++p)
    typeof Array.prototype[l[p]] == "function" && (g.prototype[l[p]] = Array.prototype[l[p]]);
  e.defineProperty(g.prototype, "length", {
    value: 0,
    configurable: !1,
    writable: !0,
    enumerable: !0
  }), g.prototype.isOperational = !0;
  var b = 0;
  g.prototype.toString = function() {
    var h = Array(b * 4 + 1).join(" "), f = `
` + h + `AggregateError of:
`;
    b++, h = Array(b * 4 + 1).join(" ");
    for (var v = 0; v < this.length; ++v) {
      for (var D = this[v] === this ? "[Circular AggregateError]" : this[v] + "", x = D.split(`
`), w = 0; w < x.length; ++w)
        x[w] = h + x[w];
      D = x.join(`
`), f += D + `
`;
    }
    return b--, f;
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
  })), wc = {
    Error,
    TypeError: o,
    RangeError: c,
    CancellationError: y.CancellationError,
    OperationalError: y.OperationalError,
    TimeoutError: y.TimeoutError,
    AggregateError: y.AggregateError,
    Warning: u
  }, wc;
}
var Tc, Tf;
function _w() {
  return Tf || (Tf = 1, Tc = function(e, t) {
    var n = ye(), r = n.errorObj, i = n.isObject;
    function a(g, l) {
      if (i(g)) {
        if (g instanceof e) return g;
        var p = c(g);
        if (p === r) {
          l && l._pushContext();
          var b = e.reject(p.e);
          return l && l._popContext(), b;
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
          return d(g, p, l);
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
      } catch (l) {
        return r.e = l, r;
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
    function d(g, l, p) {
      var b = new e(t), m = b;
      p && p._pushContext(), b._captureStackTrace(), p && p._popContext();
      var y = !0, h = n.tryCatch(l).call(g, f, v);
      y = !1, b && h === r && (b._rejectCallback(h.e, !0, !0), b = null);
      function f(D) {
        b && (b._resolveCallback(D), b = null);
      }
      function v(D) {
        b && (b._rejectCallback(D, y, !0), b = null);
      }
      return m;
    }
    return a;
  }), Tc;
}
var Uc, Uf;
function ww() {
  return Uf || (Uf = 1, Uc = function(e, t, n, r, i) {
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
        var l = g._bitField;
        if (this._values = g, l & 50397184)
          if (l & 33554432)
            g = g._value();
          else return l & 16777216 ? this._reject(g._reason()) : this._cancel();
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
      for (var d = this._promise, g = !1, l = null, p = 0; p < s; ++p) {
        var b = n(u[p], d);
        b instanceof e ? (b = b._target(), l = b._bitField) : l = null, g ? l !== null && b.suppressUnhandledRejections() : l !== null ? l & 50397184 ? l & 33554432 ? g = this._promiseFulfilled(b._value(), p) : l & 16777216 ? g = this._promiseRejected(b._reason(), p) : g = this._promiseCancelled(p) : (b._proxy(this, p), this._values[p] = b) : g = this._promiseFulfilled(b, p);
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
  }), Uc;
}
var Ec, Ef;
function Tw() {
  return Ef || (Ef = 1, Ec = function(e) {
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
  }), Ec;
}
var Ac, Af;
function Uw() {
  return Af || (Af = 1, Ac = function(e, t) {
    var n = e._getDomain, r = e._async, i = Cn().Warning, a = ye(), o = a.canAttachTrace, c, u, s = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/, d = /\((?:timers\.js):\d+:\d+\)/, g = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/, l = null, p = null, b = !1, m, y = !!(a.env("BLUEBIRD_DEBUG") != 0 && (a.env("BLUEBIRD_DEBUG") || a.env("NODE_ENV") === "development")), h = !!(a.env("BLUEBIRD_WARNINGS") != 0 && (y || a.env("BLUEBIRD_WARNINGS"))), f = !!(a.env("BLUEBIRD_LONG_STACK_TRACES") != 0 && (y || a.env("BLUEBIRD_LONG_STACK_TRACES"))), v = a.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 && (h || !!a.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
    e.prototype.suppressUnhandledRejections = function() {
      var W = this._target();
      W._bitField = W._bitField & -1048577 | 524288;
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
        var W = this._settledValue();
        this._setUnhandledRejectionIsNotified(), M(
          "unhandledRejection",
          u,
          W,
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
    }, e.prototype._warn = function(W, N, V) {
      return ee(W, N, V || this);
    }, e.onPossiblyUnhandledRejection = function(W) {
      var N = n();
      u = typeof W == "function" ? N === null ? W : a.domainBind(N, W) : void 0;
    }, e.onUnhandledRejectionHandled = function(W) {
      var N = n();
      c = typeof W == "function" ? N === null ? W : a.domainBind(N, W) : void 0;
    };
    var D = function() {
    };
    e.longStackTraces = function() {
      if (r.haveItemsQueued() && !ve.longStackTraces)
        throw new Error(`cannot enable long stack traces after promises have been created

    See http://goo.gl/MqrFmX
`);
      if (!ve.longStackTraces && oe()) {
        var W = e.prototype._captureStackTrace, N = e.prototype._attachExtraTrace;
        ve.longStackTraces = !0, D = function() {
          if (r.haveItemsQueued() && !ve.longStackTraces)
            throw new Error(`cannot enable long stack traces after promises have been created

    See http://goo.gl/MqrFmX
`);
          e.prototype._captureStackTrace = W, e.prototype._attachExtraTrace = N, t.deactivateLongStackTraces(), r.enableTrampoline(), ve.longStackTraces = !1;
        }, e.prototype._captureStackTrace = O, e.prototype._attachExtraTrace = L, t.activateLongStackTraces(), r.disableTrampolineIfNecessary();
      }
    }, e.hasLongStackTraces = function() {
      return ve.longStackTraces && oe();
    };
    var x = function() {
      try {
        if (typeof CustomEvent == "function") {
          var W = new CustomEvent("CustomEvent");
          return a.global.dispatchEvent(W), function(N, V) {
            var Y = new CustomEvent(N.toLowerCase(), {
              detail: V,
              cancelable: !0
            });
            return !a.global.dispatchEvent(Y);
          };
        } else if (typeof Event == "function") {
          var W = new Event("CustomEvent");
          return a.global.dispatchEvent(W), function(V, Y) {
            var ie = new Event(V.toLowerCase(), {
              cancelable: !0
            });
            return ie.detail = Y, !a.global.dispatchEvent(ie);
          };
        } else {
          var W = document.createEvent("CustomEvent");
          return W.initCustomEvent("testingtheevent", !1, !0, {}), a.global.dispatchEvent(W), function(V, Y) {
            var ie = document.createEvent("CustomEvent");
            return ie.initCustomEvent(
              V.toLowerCase(),
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
      } : a.global ? function(W) {
        var N = "on" + W.toLowerCase(), V = a.global[N];
        return V ? (V.apply(a.global, [].slice.call(arguments, 1)), !0) : !1;
      } : function() {
        return !1;
      };
    }();
    function E(W, N) {
      return { promise: N };
    }
    var S = {
      promiseCreated: E,
      promiseFulfilled: E,
      promiseRejected: E,
      promiseResolved: E,
      promiseCancelled: E,
      promiseChained: function(W, N, V) {
        return { promise: N, child: V };
      },
      warning: function(W, N) {
        return { warning: N };
      },
      unhandledRejection: function(W, N, V) {
        return { reason: N, promise: V };
      },
      rejectionHandled: E
    }, I = function(W) {
      var N = !1;
      try {
        N = w.apply(null, arguments);
      } catch (Y) {
        r.throwLater(Y), N = !0;
      }
      var V = !1;
      try {
        V = x(
          W,
          S[W].apply(null, arguments)
        );
      } catch (Y) {
        r.throwLater(Y), V = !0;
      }
      return V || N;
    };
    e.config = function(W) {
      if (W = Object(W), "longStackTraces" in W && (W.longStackTraces ? e.longStackTraces() : !W.longStackTraces && e.hasLongStackTraces() && D()), "warnings" in W) {
        var N = W.warnings;
        ve.warnings = !!N, v = ve.warnings, a.isObject(N) && "wForgottenReturn" in N && (v = !!N.wForgottenReturn);
      }
      if ("cancellation" in W && W.cancellation && !ve.cancellation) {
        if (r.haveItemsQueued())
          throw new Error(
            "cannot enable cancellation after promises are in use"
          );
        e.prototype._clearCancellationData = Q, e.prototype._propagateFrom = A, e.prototype._onCancel = P, e.prototype._setOnCancel = G, e.prototype._attachCancellationCallback = R, e.prototype._execute = $, _ = A, ve.cancellation = !0;
      }
      return "monitoring" in W && (W.monitoring && !ve.monitoring ? (ve.monitoring = !0, e.prototype._fireEvent = I) : !W.monitoring && ve.monitoring && (ve.monitoring = !1, e.prototype._fireEvent = q)), e;
    };
    function q() {
      return !1;
    }
    e.prototype._fireEvent = q, e.prototype._execute = function(W, N, V) {
      try {
        W(N, V);
      } catch (Y) {
        return Y;
      }
    }, e.prototype._onCancel = function() {
    }, e.prototype._setOnCancel = function(W) {
    }, e.prototype._attachCancellationCallback = function(W) {
    }, e.prototype._captureStackTrace = function() {
    }, e.prototype._attachExtraTrace = function() {
    }, e.prototype._clearCancellationData = function() {
    }, e.prototype._propagateFrom = function(W, N) {
    };
    function $(W, N, V) {
      var Y = this;
      try {
        W(N, V, function(ie) {
          if (typeof ie != "function")
            throw new TypeError("onCancel must be a function, got: " + a.toString(ie));
          Y._attachCancellationCallback(ie);
        });
      } catch (ie) {
        return ie;
      }
    }
    function R(W) {
      if (!this._isCancellable()) return this;
      var N = this._onCancel();
      N !== void 0 ? a.isArray(N) ? N.push(W) : this._setOnCancel([N, W]) : this._setOnCancel(W);
    }
    function P() {
      return this._onCancelField;
    }
    function G(W) {
      this._onCancelField = W;
    }
    function Q() {
      this._cancellationParent = void 0, this._onCancelField = void 0;
    }
    function A(W, N) {
      if (N & 1) {
        this._cancellationParent = W;
        var V = W._branchesRemainingToCancel;
        V === void 0 && (V = 0), W._branchesRemainingToCancel = V + 1;
      }
      N & 2 && W._isBound() && this._setBoundTo(W._boundTo);
    }
    function T(W, N) {
      N & 2 && W._isBound() && this._setBoundTo(W._boundTo);
    }
    var _ = T;
    function F() {
      var W = this._boundTo;
      return W !== void 0 && W instanceof e ? W.isFulfilled() ? W.value() : void 0 : W;
    }
    function O() {
      this._trace = new nt(this._peekContext());
    }
    function L(W, N) {
      if (o(W)) {
        var V = this._trace;
        if (V !== void 0 && N && (V = V._parent), V !== void 0)
          V.attachExtraTrace(W);
        else if (!W.__stackCleaned__) {
          var Y = K(W);
          a.notEnumerableProp(
            W,
            "stack",
            Y.message + `
` + Y.stack.join(`
`)
          ), a.notEnumerableProp(W, "__stackCleaned__", !0);
        }
      }
    }
    function k(W, N, V, Y, ie) {
      if (W === void 0 && N !== null && v) {
        if (ie !== void 0 && ie._returnedNonUndefined() || !(Y._bitField & 65535)) return;
        V && (V = V + " ");
        var Ee = "", ge = "";
        if (N._trace) {
          for (var ce = N._trace.stack.split(`
`), De = C(ce), ke = De.length - 1; ke >= 0; --ke) {
            var Jt = De[ke];
            if (!d.test(Jt)) {
              var Qt = Jt.match(g);
              Qt && (Ee = "at " + Qt[1] + ":" + Qt[2] + ":" + Qt[3] + " ");
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
        var nv = "a promise was created in a " + V + "handler " + Ee + "but was not returned from it, see http://goo.gl/rRqMUw" + ge;
        Y._warn(nv, !0, N);
      }
    }
    function z(W, N) {
      var V = W + " is deprecated and will be removed in a future version.";
      return N && (V += " Use " + N + " instead."), ee(V);
    }
    function ee(W, N, V) {
      if (ve.warnings) {
        var Y = new i(W), ie;
        if (N)
          V._attachExtraTrace(Y);
        else if (ve.longStackTraces && (ie = e._peekContext()))
          ie.attachExtraTrace(Y);
        else {
          var Ee = K(Y);
          Y.stack = Ee.message + `
` + Ee.stack.join(`
`);
        }
        I("warning", Y) || B(Y, "", !0);
      }
    }
    function te(W, N) {
      for (var V = 0; V < N.length - 1; ++V)
        N[V].push("From previous event:"), N[V] = N[V].join(`
`);
      return V < N.length && (N[V] = N[V].join(`
`)), W + `
` + N.join(`
`);
    }
    function J(W) {
      for (var N = 0; N < W.length; ++N)
        (W[N].length === 0 || N + 1 < W.length && W[N][0] === W[N + 1][0]) && (W.splice(N, 1), N--);
    }
    function U(W) {
      for (var N = W[0], V = 1; V < W.length; ++V) {
        for (var Y = W[V], ie = N.length - 1, Ee = N[ie], ge = -1, ce = Y.length - 1; ce >= 0; --ce)
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
    function C(W) {
      for (var N = [], V = 0; V < W.length; ++V) {
        var Y = W[V], ie = Y === "    (No stack trace)" || l.test(Y), Ee = ie && le(Y);
        ie && !Ee && (b && Y.charAt(0) !== " " && (Y = "    " + Y), N.push(Y));
      }
      return N;
    }
    function Z(W) {
      for (var N = W.stack.replace(/\s+$/g, "").split(`
`), V = 0; V < N.length; ++V) {
        var Y = N[V];
        if (Y === "    (No stack trace)" || l.test(Y))
          break;
      }
      return V > 0 && W.name != "SyntaxError" && (N = N.slice(V)), N;
    }
    function K(W) {
      var N = W.stack, V = W.toString();
      return N = typeof N == "string" && N.length > 0 ? Z(W) : ["    (No stack trace)"], {
        message: V,
        stack: W.name == "SyntaxError" ? N : C(N)
      };
    }
    function B(W, N, V) {
      if (typeof console < "u") {
        var Y;
        if (a.isObject(W)) {
          var ie = W.stack;
          Y = N + p(ie, W);
        } else
          Y = N + String(W);
        typeof m == "function" ? m(Y, V) : (typeof console.log == "function" || typeof console.log == "object") && console.log(Y);
      }
    }
    function M(W, N, V, Y) {
      var ie = !1;
      try {
        typeof N == "function" && (ie = !0, W === "rejectionHandled" ? N(Y) : N(V, Y));
      } catch (Ee) {
        r.throwLater(Ee);
      }
      W === "unhandledRejection" ? !I(W, V, Y) && !ie && B(V, "Unhandled rejection ") : I(W, Y);
    }
    function H(W) {
      var N;
      if (typeof W == "function")
        N = "[function " + (W.name || "anonymous") + "]";
      else {
        N = W && typeof W.toString == "function" ? W.toString() : a.toString(W);
        var V = /\[object [a-zA-Z0-9$_]+\]/;
        if (V.test(N))
          try {
            var Y = JSON.stringify(W);
            N = Y;
          } catch {
          }
        N.length === 0 && (N = "(empty array)");
      }
      return "(<" + ne(N) + ">, no stack trace)";
    }
    function ne(W) {
      var N = 41;
      return W.length < N ? W : W.substr(0, N - 3) + "...";
    }
    function oe() {
      return typeof dr == "function";
    }
    var le = function() {
      return !1;
    }, Ue = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
    function Ne(W) {
      var N = W.match(Ue);
      if (N)
        return {
          fileName: N[1],
          line: parseInt(N[2], 10)
        };
    }
    function Kt(W, N) {
      if (oe()) {
        for (var V = W.stack.split(`
`), Y = N.stack.split(`
`), ie = -1, Ee = -1, ge, ce, De = 0; De < V.length; ++De) {
          var ke = Ne(V[De]);
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
        ie < 0 || Ee < 0 || !ge || !ce || ge !== ce || ie >= Ee || (le = function(Jt) {
          if (s.test(Jt)) return !0;
          var Qt = Ne(Jt);
          return !!(Qt && Qt.fileName === ge && ie <= Qt.line && Qt.line <= Ee);
        });
      }
    }
    function nt(W) {
      this._parent = W, this._promisesCreated = 0;
      var N = this._length = 1 + (W === void 0 ? 0 : W._length);
      dr(this, nt), N > 32 && this.uncycle();
    }
    a.inherits(nt, Error), t.CapturedTrace = nt, nt.prototype.uncycle = function() {
      var W = this._length;
      if (!(W < 2)) {
        for (var N = [], V = {}, Y = 0, ie = this; ie !== void 0; ++Y)
          N.push(ie), ie = ie._parent;
        W = this._length = Y;
        for (var Y = W - 1; Y >= 0; --Y) {
          var Ee = N[Y].stack;
          V[Ee] === void 0 && (V[Ee] = Y);
        }
        for (var Y = 0; Y < W; ++Y) {
          var ge = N[Y].stack, ce = V[ge];
          if (ce !== void 0 && ce !== Y) {
            ce > 0 && (N[ce - 1]._parent = void 0, N[ce - 1]._length = 1), N[Y]._parent = void 0, N[Y]._length = 1;
            var De = Y > 0 ? N[Y - 1] : this;
            ce < W - 1 ? (De._parent = N[ce + 1], De._parent.uncycle(), De._length = De._parent._length + 1) : (De._parent = void 0, De._length = 1);
            for (var ke = De._length + 1, Jt = Y - 2; Jt >= 0; --Jt)
              N[Jt]._length = ke, ke++;
            return;
          }
        }
      }
    }, nt.prototype.attachExtraTrace = function(W) {
      if (!W.__stackCleaned__) {
        this.uncycle();
        for (var N = K(W), V = N.message, Y = [N.stack], ie = this; ie !== void 0; )
          Y.push(C(ie.stack.split(`
`))), ie = ie._parent;
        U(Y), J(Y), a.notEnumerableProp(W, "stack", te(V, Y)), a.notEnumerableProp(W, "__stackCleaned__", !0);
      }
    };
    var dr = function() {
      var N = /^\s*at\s*/, V = function(ge, ce) {
        return typeof ge == "string" ? ge : ce.name !== void 0 && ce.message !== void 0 ? ce.toString() : H(ce);
      };
      if (typeof Error.stackTraceLimit == "number" && typeof Error.captureStackTrace == "function") {
        Error.stackTraceLimit += 6, l = N, p = V;
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
        return l = /@/, p = V, b = !0, function(ce) {
          ce.stack = new Error().stack;
        };
      var Ee;
      try {
        throw new Error();
      } catch (ge) {
        Ee = "stack" in ge;
      }
      return !("stack" in ie) && Ee && typeof Error.stackTraceLimit == "number" ? (l = N, p = V, function(ce) {
        Error.stackTraceLimit += 6;
        try {
          throw new Error();
        } catch (De) {
          ce.stack = De.stack;
        }
        Error.stackTraceLimit -= 6;
      }) : (p = function(ge, ce) {
        return typeof ge == "string" ? ge : (typeof ce == "object" || typeof ce == "function") && ce.name !== void 0 && ce.message !== void 0 ? ce.toString() : H(ce);
      }, null);
    }();
    typeof console < "u" && typeof console.warn < "u" && (m = function(W) {
      console.warn(W);
    }, a.isNode && process.stderr.isTTY ? m = function(W, N) {
      var V = N ? "\x1B[33m" : "\x1B[31m";
      console.warn(V + W + `\x1B[0m
`);
    } : !a.isNode && typeof new Error().stack == "string" && (m = function(W, N) {
      console.warn(
        "%c" + W,
        N ? "color: darkorange" : "color: red"
      );
    }));
    var ve = {
      warnings: h,
      longStackTraces: !1,
      cancellation: !1,
      monitoring: !1
    };
    return f && e.longStackTraces(), {
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
      checkForgottenReturns: k,
      setBounds: Kt,
      warn: ee,
      deprecated: z,
      CapturedTrace: nt,
      fireDomEvent: x,
      fireGlobalEvent: w
    };
  }), Ac;
}
var Cc, Cf;
function Ew() {
  return Cf || (Cf = 1, Cc = function(e, t) {
    var n = ye(), r = e.CancellationError, i = n.errorObj;
    function a(g, l, p) {
      this.promise = g, this.type = l, this.handler = p, this.called = !1, this.cancelPromise = null;
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
    function c(g, l) {
      return g.cancelPromise != null ? (arguments.length > 1 ? g.cancelPromise._reject(l) : g.cancelPromise._cancel(), g.cancelPromise = null, !0) : !1;
    }
    function u() {
      return d.call(this, this.promise._target()._settledValue());
    }
    function s(g) {
      if (!c(this, g))
        return i.e = g, i;
    }
    function d(g) {
      var l = this.promise, p = this.handler;
      if (!this.called) {
        this.called = !0;
        var b = this.isFinallyHandler() ? p.call(l._boundValue()) : p.call(l._boundValue(), g);
        if (b !== void 0) {
          l._setReturnedNonUndefined();
          var m = t(b, l);
          if (m instanceof e) {
            if (this.cancelPromise != null)
              if (m._isCancelled()) {
                var y = new r("late cancellation observer");
                return l._attachExtraTrace(y), i.e = y, i;
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
      return l.isRejected() ? (c(this), i.e = g, i) : (c(this), g);
    }
    return e.prototype._passThrough = function(g, l, p, b) {
      return typeof g != "function" ? this.then() : this._then(
        p,
        b,
        void 0,
        new a(this, l, g),
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
  }), Cc;
}
var Fc, Ff;
function Aw() {
  return Ff || (Ff = 1, Fc = function(e) {
    var t = ye(), n = zr().keys, r = t.tryCatch, i = t.errorObj;
    function a(o, c, u) {
      return function(s) {
        var d = u._boundValue();
        e: for (var g = 0; g < o.length; ++g) {
          var l = o[g];
          if (l === Error || l != null && l.prototype instanceof Error) {
            if (s instanceof l)
              return r(c).call(d, s);
          } else if (typeof l == "function") {
            var p = r(l).call(d, s);
            if (p === i)
              return p;
            if (p)
              return r(c).call(d, s);
          } else if (t.isObject(s)) {
            for (var b = n(l), m = 0; m < b.length; ++m) {
              var y = b[m];
              if (l[y] != s[y])
                continue e;
            }
            return r(c).call(d, s);
          }
        }
        return e;
      };
    }
    return a;
  }), Fc;
}
var Sc, Sf;
function Z2() {
  if (Sf) return Sc;
  Sf = 1;
  var e = ye(), t = e.maybeWrapAsError, n = Cn(), r = n.OperationalError, i = zr();
  function a(s) {
    return s instanceof Error && i.getPrototypeOf(s) === Error.prototype;
  }
  var o = /^(?:name|message|stack|cause)$/;
  function c(s) {
    var d;
    if (a(s)) {
      d = new r(s), d.name = s.name, d.message = s.message, d.stack = s.stack;
      for (var g = i.keys(s), l = 0; l < g.length; ++l) {
        var p = g[l];
        o.test(p) || (d[p] = s[p]);
      }
      return d;
    }
    return e.markAsOriginatingFromRejection(s), s;
  }
  function u(s, d) {
    return function(g, l) {
      if (s !== null) {
        if (g) {
          var p = c(t(g));
          s._attachExtraTrace(p), s._reject(p);
        } else if (!d)
          s._fulfill(l);
        else {
          for (var b = arguments.length, m = new Array(Math.max(b - 1, 0)), y = 1; y < b; ++y)
            m[y - 1] = arguments[y];
          s._fulfill(m);
        }
        s = null;
      }
    };
  }
  return Sc = u, Sc;
}
var kc, kf;
function Cw() {
  return kf || (kf = 1, kc = function(e, t, n, r, i) {
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
      var l = u._popContext();
      return i.checkForgottenReturns(
        s,
        l,
        "Promise.try",
        u
      ), u._resolveFromSyncValue(s), u;
    }, e.prototype._resolveFromSyncValue = function(c) {
      c === a.errorObj ? this._rejectCallback(c.e, !1) : this._resolveCallback(c, !0);
    };
  }), kc;
}
var Bc, Bf;
function Fw() {
  return Bf || (Bf = 1, Bc = function(e, t, n, r) {
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
      var l = this._target();
      if (g._setBoundTo(d), d instanceof e) {
        var p = {
          promiseRejectionQueued: !1,
          promise: g,
          target: l,
          bindingPromise: d
        };
        l._then(t, o, void 0, g, p), d._then(
          c,
          u,
          void 0,
          g,
          p
        ), g._setOnCancel(d);
      } else
        g._resolveCallback(l);
      return g;
    }, e.prototype._setBoundTo = function(s) {
      s !== void 0 ? (this._bitField = this._bitField | 2097152, this._boundTo = s) : this._bitField = this._bitField & -2097153;
    }, e.prototype._isBound = function() {
      return (this._bitField & 2097152) === 2097152;
    }, e.bind = function(s, d) {
      return e.resolve(d).bind(s);
    };
  }), Bc;
}
var Rc, Rf;
function Sw() {
  return Rf || (Rf = 1, Rc = function(e, t, n, r) {
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
  }), Rc;
}
var Oc, Of;
function kw() {
  return Of || (Of = 1, Oc = function(e) {
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
  }), Oc;
}
var Wc, Wf;
function Bw() {
  return Wf || (Wf = 1, Wc = function(e) {
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
  }), Wc;
}
var Ic, If;
function Rw() {
  return If || (If = 1, Ic = function(e, t, n, r, i, a) {
    var o = ye(), c = o.canEvaluate, u = o.tryCatch, s = o.errorObj, d;
    if (c) {
      for (var g = function(f) {
        return new Function("value", "holder", `                             
	            'use strict';                                                    
	            holder.pIndex = value;                                           
	            holder.checkFulfillment(this);                                   
	            `.replace(/Index/g, f));
      }, l = function(f) {
        return new Function("promise", "holder", `                           
	            'use strict';                                                    
	            holder.pIndex = promise;                                         
	            `.replace(/Index/g, f));
      }, p = function(f) {
        for (var v = new Array(f), D = 0; D < v.length; ++D)
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
`), E = v.join(", "), S = "Holder$" + f, I = `return function(tryCatch, errorObj, Promise, async) {    
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
        return I = I.replace(/\[TheName\]/g, S).replace(/\[TheTotal\]/g, f).replace(/\[ThePassedArguments\]/g, E).replace(/\[TheProperties\]/g, x).replace(/\[CancellationCode\]/g, w), new Function("tryCatch", "errorObj", "Promise", "async", I)(u, s, e, i);
      }, b = [], m = [], y = [], h = 0; h < 8; ++h)
        b.push(p(h + 1)), m.push(g(h + 1)), y.push(l(h + 1));
      d = function(f) {
        this._reject(f);
      };
    }
    e.join = function() {
      var f = arguments.length - 1, v;
      if (f > 0 && typeof arguments[f] == "function" && (v = arguments[f], f <= 8 && c)) {
        var G = new e(r);
        G._captureStackTrace();
        for (var D = b[f - 1], x = new D(v), w = m, E = 0; E < f; ++E) {
          var S = n(arguments[E], G);
          if (S instanceof e) {
            S = S._target();
            var I = S._bitField;
            I & 50397184 ? I & 33554432 ? w[E].call(
              G,
              S._value(),
              x
            ) : I & 16777216 ? G._reject(S._reason()) : G._cancel() : (S._then(
              w[E],
              d,
              void 0,
              G,
              x
            ), y[E](S, x), x.asyncNeeded = !1);
          } else
            w[E].call(G, S, x);
        }
        if (!G._isFateSealed()) {
          if (x.asyncNeeded) {
            var q = a();
            q !== null && (x.fn = o.domainBind(q, x.fn));
          }
          G._setAsyncGuaranteed(), G._setOnCancel(x);
        }
        return G;
      }
      for (var $ = arguments.length, R = new Array($), P = 0; P < $; ++P)
        R[P] = arguments[P];
      v && R.pop();
      var G = new t(R).promise();
      return v !== void 0 ? G.spread(v) : G;
    };
  }), Ic;
}
var Nc, Nf;
function Ow() {
  return Nf || (Nf = 1, Nc = function(e, t, n, r, i, a) {
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
      var m = this._values, y = this.length(), h = this._preservedValues, f = this._limit;
      if (b < 0) {
        if (b = b * -1 - 1, m[b] = p, f >= 1 && (this._inFlight--, this._drainQueue(), this._isResolved()))
          return !0;
      } else {
        if (f >= 1 && this._inFlight >= f)
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
        var S = r(w, this._promise);
        if (S instanceof e) {
          S = S._target();
          var I = S._bitField;
          if (I & 50397184)
            if (I & 33554432)
              w = S._value();
            else return I & 16777216 ? (this._reject(S._reason()), !0) : (this._cancel(), !0);
          else return f >= 1 && this._inFlight++, m[b] = S, S._proxy(this, (b + 1) * -1), !1;
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
      for (var m = b.length, y = new Array(m), h = 0, f = 0; f < m; ++f)
        p[f] && (y[h++] = b[f]);
      y.length = h, this._resolve(y);
    }, g.prototype.preservedValues = function() {
      return this._preservedValues;
    };
    function l(p, b, m, y) {
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
      return l(this, p, b, null);
    }, e.map = function(p, b, m, y) {
      return l(p, b, m, y);
    };
  }), Nc;
}
var Lc, Lf;
function Ww() {
  if (Lf) return Lc;
  Lf = 1;
  var e = Object.create;
  if (e) {
    var t = e(null), n = e(null);
    t[" size"] = n[" size"] = 0;
  }
  return Lc = function(r) {
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
	        `.replace(/methodName/g, y))(l);
      }, d = function(y) {
        return new Function("obj", `                                             
	        'use strict';                                                        
	        return obj.propertyName;                                             
	        `.replace("propertyName", y));
      }, g = function(y, h, f) {
        var v = f[y];
        if (typeof v != "function") {
          if (!o(y))
            return null;
          if (v = h(y), f[y] = v, f[" size"]++, f[" size"] > 512) {
            for (var D = Object.keys(f), x = 0; x < 256; ++x) delete f[D[x]];
            f[" size"] = D.length - 256;
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
    function l(y, h) {
      var f;
      if (y != null && (f = y[h]), typeof f != "function") {
        var v = "Object " + i.classString(y) + " has no method '" + i.toString(h) + "'";
        throw new r.TypeError(v);
      }
      return f;
    }
    function p(y) {
      var h = this.pop(), f = l(y, h);
      return f.apply(y, this);
    }
    r.prototype.call = function(y) {
      for (var h = arguments.length, f = new Array(Math.max(h - 1, 0)), v = 1; v < h; ++v)
        f[v - 1] = arguments[v];
      if (a) {
        var D = c(y);
        if (D !== null)
          return this._then(
            D,
            void 0,
            void 0,
            f,
            void 0
          );
      }
      return f.push(y), this._then(p, void 0, void 0, f, void 0);
    };
    function b(y) {
      return y[this];
    }
    function m(y) {
      var h = +this;
      return h < 0 && (h = Math.max(0, h + y.length)), y[h];
    }
    r.prototype.get = function(y) {
      var h = typeof y == "number", f;
      if (h)
        f = m;
      else if (a) {
        var v = u(y);
        f = v !== null ? v : b;
      } else
        f = b;
      return this._then(f, void 0, void 0, y, void 0);
    };
  }, Lc;
}
var Mc, Mf;
function Iw() {
  return Mf || (Mf = 1, Mc = function(e, t, n, r, i, a) {
    var o = ye(), c = Cn().TypeError, u = ye().inherits, s = o.errorObj, d = o.tryCatch, g = {};
    function l(v) {
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
      function S() {
        if (x >= w) return E._fulfill();
        var I = p(v[x++]);
        if (I instanceof e && I._isDisposable()) {
          try {
            I = n(
              I._getDisposer().tryDispose(D),
              v.promise
            );
          } catch (q) {
            return l(q);
          }
          if (I instanceof e)
            return I._then(
              S,
              l,
              null,
              null,
              null
            );
        }
        S();
      }
      return S(), E;
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
    function f(v) {
      this.length = v, this.promise = null, this[v - 1] = null;
    }
    f.prototype._resultCancelled = function() {
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
      for (var E = new f(v), S = 0; S < v; ++S) {
        var I = x[S];
        if (m.isDisposer(I)) {
          var q = I;
          I = I.promise(), I._setDisposable(q);
        } else {
          var $ = n(I);
          $ instanceof e && (I = $._then(h, null, null, {
            resources: E,
            index: S
          }, void 0));
        }
        E[S] = I;
      }
      for (var R = new Array(E.length), S = 0; S < R.length; ++S)
        R[S] = e.resolve(E[S]).reflect();
      var P = e.all(R).then(function(Q) {
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
        G._pushContext(), D = d(D);
        var _ = w ? D.apply(void 0, Q) : D(Q), F = G._popContext();
        return a.checkForgottenReturns(
          _,
          F,
          "Promise.using",
          G
        ), _;
      }), G = P.lastly(function() {
        var Q = new e.PromiseInspection(P);
        return b(E, Q);
      });
      return E.promise = G, G._setOnCancel(E), G;
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
  }), Mc;
}
var $c, $f;
function Nw() {
  return $f || ($f = 1, $c = function(e, t, n) {
    var r = ye(), i = e.TimeoutError;
    function a(g) {
      this.handle = g;
    }
    a.prototype._resultCancelled = function() {
      clearTimeout(this.handle);
    };
    var o = function(g) {
      return c(+this).thenReturn(g);
    }, c = e.delay = function(g, l) {
      var p, b;
      return l !== void 0 ? (p = e.resolve(l)._then(o, null, null, g, void 0), n.cancellation() && l instanceof e && p._setOnCancel(l)) : (p = new e(t), b = setTimeout(function() {
        p._fulfill();
      }, +g), n.cancellation() && p._setOnCancel(new a(b)), p._captureStackTrace()), p._setAsyncGuaranteed(), p;
    };
    e.prototype.delay = function(g) {
      return c(g, this);
    };
    var u = function(g, l, p) {
      var b;
      typeof l != "string" ? l instanceof Error ? b = l : b = new i("operation timed out") : b = new i(l), r.markAsOriginatingFromRejection(b), g._attachExtraTrace(b), g._reject(b), p != null && p.cancel();
    };
    function s(g) {
      return clearTimeout(this.handle), g;
    }
    function d(g) {
      throw clearTimeout(this.handle), g;
    }
    e.prototype.timeout = function(g, l) {
      g = +g;
      var p, b, m = new a(setTimeout(function() {
        p.isPending() && u(p, l, b);
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
  }), $c;
}
var Pc, Pf;
function Lw() {
  return Pf || (Pf = 1, Pc = function(e, t, n, r, i, a) {
    var o = Cn(), c = o.TypeError, u = ye(), s = u.errorObj, d = u.tryCatch, g = [];
    function l(b, m, y) {
      for (var h = 0; h < m.length; ++h) {
        y._pushContext();
        var f = d(m[h])(b);
        if (y._popContext(), f === s) {
          y._pushContext();
          var v = e.reject(s.e);
          return y._popContext(), v;
        }
        var D = r(f, y);
        if (D instanceof e) return D;
      }
      return null;
    }
    function p(b, m, y, h) {
      if (a.cancellation()) {
        var f = new e(n), v = this._finallyPromise = new e(n);
        this._promise = f.lastly(function() {
          return v;
        }), f._captureStackTrace(), f._setOnCancel(this);
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
      if (!(h instanceof e) && (h = l(
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
      var f = h._bitField;
      f & 50397184 ? f & 33554432 ? e._async.invoke(
        this._promiseFulfilled,
        this,
        h._value()
      ) : f & 16777216 ? e._async.invoke(
        this._promiseRejected,
        this,
        h._reason()
      ) : this._promiseCancelled() : (this._yieldedPromise = h, h._proxy(this, null));
    }, e.coroutine = function(b, m) {
      if (typeof b != "function")
        throw new c(`generatorFunction must be a function

    See http://goo.gl/MqrFmX
`);
      var y = Object(m).yieldHandler, h = p, f = new Error().stack;
      return function() {
        var v = b.apply(this, arguments), D = new h(
          void 0,
          void 0,
          y,
          f
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
  }), Pc;
}
var zc, zf;
function Mw() {
  return zf || (zf = 1, zc = function(e) {
    var t = ye(), n = e._async, r = t.tryCatch, i = t.errorObj;
    function a(u, s) {
      var d = this;
      if (!t.isArray(u)) return o.call(d, u, s);
      var g = r(s).apply(d._boundValue(), [null].concat(u));
      g === i && n.throwLater(g.e);
    }
    function o(u, s) {
      var d = this, g = d._boundValue(), l = u === void 0 ? r(s).call(g, null) : r(s).call(g, null, u);
      l === i && n.throwLater(l.e);
    }
    function c(u, s) {
      var d = this;
      if (!u) {
        var g = new Error(u + "");
        g.cause = u, u = g;
      }
      var l = r(s).call(d._boundValue(), u);
      l === i && n.throwLater(l.e);
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
  }), zc;
}
var qc, qf;
function $w() {
  return qf || (qf = 1, qc = function(e, t) {
    var n = {}, r = ye(), i = Z2(), a = r.withAppended, o = r.maybeWrapAsError, c = r.canEvaluate, u = Cn().TypeError, s = "Async", d = { __isPromisified__: !0 }, g = [
      "arity",
      "length",
      "name",
      "arguments",
      "caller",
      "callee",
      "prototype",
      "__isPromisified__"
    ], l = new RegExp("^(?:" + g.join("|") + ")$"), p = function(P) {
      return r.isIdentifier(P) && P.charAt(0) !== "_" && P !== "constructor";
    };
    function b(P) {
      return !l.test(P);
    }
    function m(P) {
      try {
        return P.__isPromisified__ === !0;
      } catch {
        return !1;
      }
    }
    function y(P, G, Q) {
      var A = r.getDataPropertyOrDefault(
        P,
        G + Q,
        d
      );
      return A ? m(A) : !1;
    }
    function h(P, G, Q) {
      for (var A = 0; A < P.length; A += 2) {
        var T = P[A];
        if (Q.test(T)) {
          for (var _ = T.replace(Q, ""), F = 0; F < P.length; F += 2)
            if (P[F] === _)
              throw new u(`Cannot promisify an API that has normal methods with '%s'-suffix

    See http://goo.gl/MqrFmX
`.replace("%s", G));
        }
      }
    }
    function f(P, G, Q, A) {
      for (var T = r.inheritedDataKeys(P), _ = [], F = 0; F < T.length; ++F) {
        var O = T[F], L = P[O], k = A === p ? !0 : p(O);
        typeof L == "function" && !m(L) && !y(P, O, G) && A(O, L, P, k) && _.push(O, L);
      }
      return h(_, G, Q), _;
    }
    var v = function(P) {
      return P.replace(/([$])/, "\\$");
    }, D;
    {
      var x = function(P) {
        for (var G = [P], Q = Math.max(0, P - 1 - 3), A = P - 1; A >= Q; --A)
          G.push(A);
        for (var A = P + 1; A <= 3; ++A)
          G.push(A);
        return G;
      }, w = function(P) {
        return r.filledRange(P, "_arg", "");
      }, E = function(P) {
        return r.filledRange(
          Math.max(P, 3),
          "_arg",
          ""
        );
      }, S = function(P) {
        return typeof P.length == "number" ? Math.max(Math.min(P.length, 1024), 0) : 0;
      };
      D = function(P, G, Q, A, T, _) {
        var F = Math.max(0, S(A) - 1), O = x(F), L = typeof P == "string" || G === n;
        function k(J) {
          var U = w(J).join(", "), C = J > 0 ? ", " : "", Z;
          return L ? Z = `ret = callback.call(this, {{args}}, nodeback); break;
` : Z = G === void 0 ? `ret = callback({{args}}, nodeback); break;
` : `ret = callback.call(receiver, {{args}}, nodeback); break;
`, Z.replace("{{args}}", U).replace(", ", C);
        }
        function z() {
          for (var J = "", U = 0; U < O.length; ++U)
            J += "case " + O[U] + ":" + k(O[U]);
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
          G,
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
    function I(P, G, Q, A, T, _) {
      var F = /* @__PURE__ */ function() {
        return this;
      }(), O = P;
      typeof O == "string" && (P = A);
      function L() {
        var k = G;
        G === n && (k = this);
        var z = new e(t);
        z._captureStackTrace();
        var ee = typeof O == "string" && this !== F ? this[O] : P, te = i(z, _);
        try {
          ee.apply(k, a(arguments, te));
        } catch (J) {
          z._rejectCallback(o(J), !0, !0);
        }
        return z._isFateSealed() || z._setAsyncGuaranteed(), z;
      }
      return r.notEnumerableProp(L, "__isPromisified__", !0), L;
    }
    var q = c ? D : I;
    function $(P, G, Q, A, T) {
      for (var _ = new RegExp(v(G) + "$"), F = f(P, G, _, Q), O = 0, L = F.length; O < L; O += 2) {
        var k = F[O], z = F[O + 1], ee = k + G;
        if (A === q)
          P[ee] = q(k, n, k, z, G, T);
        else {
          var te = A(z, function() {
            return q(
              k,
              n,
              k,
              z,
              G,
              T
            );
          });
          r.notEnumerableProp(te, "__isPromisified__", !0), P[ee] = te;
        }
      }
      return r.toFastProperties(P), P;
    }
    function R(P, G, Q) {
      return q(
        P,
        G,
        void 0,
        P,
        null,
        Q
      );
    }
    e.promisify = function(P, G) {
      if (typeof P != "function")
        throw new u("expecting a function but got " + r.classString(P));
      if (m(P))
        return P;
      G = Object(G);
      var Q = G.context === void 0 ? n : G.context, A = !!G.multiArgs, T = R(P, Q, A);
      return r.copyDescriptors(P, T, b), T;
    }, e.promisifyAll = function(P, G) {
      if (typeof P != "function" && typeof P != "object")
        throw new u(`the target of promisifyAll must be an object or a function

    See http://goo.gl/MqrFmX
`);
      G = Object(G);
      var Q = !!G.multiArgs, A = G.suffix;
      typeof A != "string" && (A = s);
      var T = G.filter;
      typeof T != "function" && (T = p);
      var _ = G.promisifier;
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
  }), qc;
}
var jc, jf;
function Pw() {
  return jf || (jf = 1, jc = function(e, t, n, r) {
    var i = ye(), a = i.isObject, o = zr(), c;
    typeof Map == "function" && (c = Map);
    var u = /* @__PURE__ */ function() {
      var l = 0, p = 0;
      function b(m, y) {
        this[l] = m, this[l + p] = y, l++;
      }
      return function(y) {
        p = y.size, l = 0;
        var h = new Array(y.size * 2);
        return y.forEach(b, h), h;
      };
    }(), s = function(l) {
      for (var p = new c(), b = l.length / 2 | 0, m = 0; m < b; ++m) {
        var y = l[b + m], h = l[m];
        p.set(y, h);
      }
      return p;
    };
    function d(l) {
      var p = !1, b;
      if (c !== void 0 && l instanceof c)
        b = u(l), p = !0;
      else {
        var m = o.keys(l), y = m.length;
        b = new Array(y * 2);
        for (var h = 0; h < y; ++h) {
          var f = m[h];
          b[h] = l[f], b[h + y] = f;
        }
      }
      this.constructor$(b), this._isMap = p, this._init$(void 0, -3);
    }
    i.inherits(d, t), d.prototype._init = function() {
    }, d.prototype._promiseFulfilled = function(l, p) {
      this._values[p] = l;
      var b = ++this._totalResolved;
      if (b >= this._length) {
        var m;
        if (this._isMap)
          m = s(this._values);
        else {
          m = {};
          for (var y = this.length(), h = 0, f = this.length(); h < f; ++h)
            m[this._values[h + y]] = this._values[h];
        }
        return this._resolve(m), !0;
      }
      return !1;
    }, d.prototype.shouldCopyValues = function() {
      return !1;
    }, d.prototype.getActualLength = function(l) {
      return l >> 1;
    };
    function g(l) {
      var p, b = n(l);
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
    }, e.props = function(l) {
      return g(l);
    };
  }), jc;
}
var Zc, Zf;
function zw() {
  return Zf || (Zf = 1, Zc = function(e, t, n, r) {
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
      for (var g = d._fulfill, l = d._reject, p = 0, b = c.length; p < b; ++p) {
        var m = c[p];
        m === void 0 && !(p in c) || e.cast(m)._then(g, l, void 0, d, null);
      }
      return d;
    }
    e.race = function(c) {
      return o(c, void 0);
    }, e.prototype.race = function() {
      return o(this, void 0);
    };
  }), Zc;
}
var Xc, Xf;
function qw() {
  return Xf || (Xf = 1, Xc = function(e, t, n, r, i, a) {
    var o = e._getDomain, c = ye(), u = c.tryCatch;
    function s(b, m, y, h) {
      this.constructor$(b);
      var f = o();
      this._fn = f === null ? m : c.domainBind(f, m), y !== void 0 && (y = e.resolve(y), y._attachCancellationCallback(this)), this._initialValue = y, this._currentCancellable = null, h === i ? this._eachValues = Array(this._length) : h === 0 ? this._eachValues = null : this._eachValues = void 0, this._promise._captureStackTrace(), this._init$(void 0, -5);
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
          var f = {
            accum: null,
            value: b[y],
            index: y,
            length: h,
            array: this
          };
          m = m._then(l, void 0, void 0, f, void 0);
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
      var f = new s(b, m, y, h);
      return f.promise();
    }
    function l(b) {
      this.accum = b, this.array._gotAccum(b);
      var m = r(this.value, this.array._promise);
      return m instanceof e ? (this.array._currentCancellable = m, m._then(p, void 0, void 0, this, void 0)) : p.call(this, m);
    }
    function p(b) {
      var m = this.array, y = m._promise, h = u(m._fn);
      y._pushContext();
      var f;
      m._eachValues !== void 0 ? f = h.call(y._boundValue(), b, this.index, this.length) : f = h.call(
        y._boundValue(),
        this.accum,
        b,
        this.index,
        this.length
      ), f instanceof e && (m._currentCancellable = f);
      var v = y._popContext();
      return a.checkForgottenReturns(
        f,
        v,
        m._eachValues !== void 0 ? "Promise.each" : "Promise.reduce",
        y
      ), f;
    }
  }), Xc;
}
var Hc, Hf;
function jw() {
  return Hf || (Hf = 1, Hc = function(e, t, n) {
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
  }), Hc;
}
var Vc, Vf;
function Zw() {
  return Vf || (Vf = 1, Vc = function(e, t, n) {
    var r = ye(), i = Cn().RangeError, a = Cn().AggregateError, o = r.isArray, c = {};
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
      var l = new u(d), p = l.promise();
      return l.setHowMany(g), l.init(), p;
    }
    e.some = function(d, g) {
      return s(d, g);
    }, e.prototype.some = function(d) {
      return s(this, d);
    }, e._SomePromiseArray = u;
  }), Vc;
}
var Gc, Gf;
function Xw() {
  return Gf || (Gf = 1, Gc = function(e, t) {
    var n = e.map;
    e.prototype.filter = function(r, i) {
      return n(this, r, i, t);
    }, e.filter = function(r, i, a) {
      return n(r, i, a, t);
    };
  }), Gc;
}
var Yc, Yf;
function Hw() {
  return Yf || (Yf = 1, Yc = function(e, t) {
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
  }), Yc;
}
var Kc, Kf;
function Vw() {
  return Kf || (Kf = 1, Kc = function(e) {
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
  }), Kc;
}
(function(e) {
  e.exports = function() {
    var t = function() {
      return new l(`circular promise resolution chain

    See http://goo.gl/MqrFmX
`);
    }, n = function() {
      return new R.PromiseInspection(this._target());
    }, r = function(A) {
      return R.reject(new l(A));
    };
    function i() {
    }
    var a = {}, o = ye(), c;
    o.isNode ? c = function() {
      var A = process.domain;
      return A === void 0 && (A = null), A;
    } : c = function() {
      return null;
    }, o.notEnumerableProp(R, "_getDomain", c);
    var u = zr(), s = xw(), d = new s();
    u.defineProperty(R, "_async", { value: d });
    var g = Cn(), l = R.TypeError = g.TypeError;
    R.RangeError = g.RangeError;
    var p = R.CancellationError = g.CancellationError;
    R.TimeoutError = g.TimeoutError, R.OperationalError = g.OperationalError, R.RejectionError = g.OperationalError, R.AggregateError = g.AggregateError;
    var b = function() {
    }, m = {}, y = {}, h = _w()(R, b), f = ww()(
      R,
      b,
      h,
      r,
      i
    ), v = Tw()(R), D = v.create, x = Uw()(R, v);
    x.CapturedTrace;
    var w = Ew()(R, h), E = Aw()(y), S = Z2(), I = o.errorObj, q = o.tryCatch;
    function $(A, T) {
      if (typeof T != "function")
        throw new l("expecting a function but got " + o.classString(T));
      if (A.constructor !== R)
        throw new l(`the promise constructor cannot be invoked directly

    See http://goo.gl/MqrFmX
`);
    }
    function R(A) {
      this._bitField = 0, this._fulfillmentHandler0 = void 0, this._rejectionHandler0 = void 0, this._promise0 = void 0, this._receiver0 = void 0, A !== b && ($(this, A), this._resolveFromExecutor(A)), this._promiseCreated(), this._fireEvent("promiseCreated", this);
    }
    R.prototype.toString = function() {
      return "[object Promise]";
    }, R.prototype.caught = R.prototype.catch = function(A) {
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
    }, R.prototype.reflect = function() {
      return this._then(
        n,
        n,
        void 0,
        this,
        void 0
      );
    }, R.prototype.then = function(A, T) {
      if (x.warnings() && arguments.length > 0 && typeof A != "function" && typeof T != "function") {
        var _ = ".then() only accepts functions but was passed: " + o.classString(A);
        arguments.length > 1 && (_ += ", " + o.classString(T)), this._warn(_);
      }
      return this._then(A, T, void 0, void 0, void 0);
    }, R.prototype.done = function(A, T) {
      var _ = this._then(A, T, void 0, void 0, void 0);
      _._setIsFinal();
    }, R.prototype.spread = function(A) {
      return typeof A != "function" ? r("expecting a function but got " + o.classString(A)) : this.all()._then(A, void 0, void 0, m, void 0);
    }, R.prototype.toJSON = function() {
      var A = {
        isFulfilled: !1,
        isRejected: !1,
        fulfillmentValue: void 0,
        rejectionReason: void 0
      };
      return this.isFulfilled() ? (A.fulfillmentValue = this.value(), A.isFulfilled = !0) : this.isRejected() && (A.rejectionReason = this.reason(), A.isRejected = !0), A;
    }, R.prototype.all = function() {
      return arguments.length > 0 && this._warn(".all() was passed arguments but it does not take any"), new f(this).promise();
    }, R.prototype.error = function(A) {
      return this.caught(o.originatesFromRejection, A);
    }, R.getNewLibraryCopy = e.exports, R.is = function(A) {
      return A instanceof R;
    }, R.fromNode = R.fromCallback = function(A) {
      var T = new R(b);
      T._captureStackTrace();
      var _ = arguments.length > 1 ? !!Object(arguments[1]).multiArgs : !1, F = q(A)(S(T, _));
      return F === I && T._rejectCallback(F.e, !0), T._isFateSealed() || T._setAsyncGuaranteed(), T;
    }, R.all = function(A) {
      return new f(A).promise();
    }, R.cast = function(A) {
      var T = h(A);
      return T instanceof R || (T = new R(b), T._captureStackTrace(), T._setFulfilled(), T._rejectionHandler0 = A), T;
    }, R.resolve = R.fulfilled = R.cast, R.reject = R.rejected = function(A) {
      var T = new R(b);
      return T._captureStackTrace(), T._rejectCallback(A, !0), T;
    }, R.setScheduler = function(A) {
      if (typeof A != "function")
        throw new l("expecting a function but got " + o.classString(A));
      return d.setScheduler(A);
    }, R.prototype._then = function(A, T, _, F, O) {
      var L = O !== void 0, k = L ? O : new R(b), z = this._target(), ee = z._bitField;
      L || (k._propagateFrom(this, 3), k._captureStackTrace(), F === void 0 && this._bitField & 2097152 && (ee & 50397184 ? F = this._boundValue() : F = z === this ? void 0 : this._boundTo), this._fireEvent("promiseChained", this, k));
      var te = c();
      if (ee & 50397184) {
        var J, U, C = z._settlePromiseCtx;
        ee & 33554432 ? (U = z._rejectionHandler0, J = A) : ee & 16777216 ? (U = z._fulfillmentHandler0, J = T, z._unsetRejectionIsUnhandled()) : (C = z._settlePromiseLateCancellationObserver, U = new p("late cancellation observer"), z._attachExtraTrace(U), J = T), d.invoke(C, z, {
          handler: te === null ? J : typeof J == "function" && o.domainBind(te, J),
          promise: k,
          receiver: F,
          value: U
        });
      } else
        z._addCallbacks(A, T, k, F, te);
      return k;
    }, R.prototype._length = function() {
      return this._bitField & 65535;
    }, R.prototype._isFateSealed = function() {
      return (this._bitField & 117506048) !== 0;
    }, R.prototype._isFollowing = function() {
      return (this._bitField & 67108864) === 67108864;
    }, R.prototype._setLength = function(A) {
      this._bitField = this._bitField & -65536 | A & 65535;
    }, R.prototype._setFulfilled = function() {
      this._bitField = this._bitField | 33554432, this._fireEvent("promiseFulfilled", this);
    }, R.prototype._setRejected = function() {
      this._bitField = this._bitField | 16777216, this._fireEvent("promiseRejected", this);
    }, R.prototype._setFollowing = function() {
      this._bitField = this._bitField | 67108864, this._fireEvent("promiseResolved", this);
    }, R.prototype._setIsFinal = function() {
      this._bitField = this._bitField | 4194304;
    }, R.prototype._isFinal = function() {
      return (this._bitField & 4194304) > 0;
    }, R.prototype._unsetCancelled = function() {
      this._bitField = this._bitField & -65537;
    }, R.prototype._setCancelled = function() {
      this._bitField = this._bitField | 65536, this._fireEvent("promiseCancelled", this);
    }, R.prototype._setWillBeCancelled = function() {
      this._bitField = this._bitField | 8388608;
    }, R.prototype._setAsyncGuaranteed = function() {
      d.hasCustomScheduler() || (this._bitField = this._bitField | 134217728);
    }, R.prototype._receiverAt = function(A) {
      var T = A === 0 ? this._receiver0 : this[A * 4 - 4 + 3];
      if (T !== a)
        return T === void 0 && this._isBound() ? this._boundValue() : T;
    }, R.prototype._promiseAt = function(A) {
      return this[A * 4 - 4 + 2];
    }, R.prototype._fulfillmentHandlerAt = function(A) {
      return this[A * 4 - 4 + 0];
    }, R.prototype._rejectionHandlerAt = function(A) {
      return this[A * 4 - 4 + 1];
    }, R.prototype._boundValue = function() {
    }, R.prototype._migrateCallback0 = function(A) {
      A._bitField;
      var T = A._fulfillmentHandler0, _ = A._rejectionHandler0, F = A._promise0, O = A._receiverAt(0);
      O === void 0 && (O = a), this._addCallbacks(T, _, F, O, null);
    }, R.prototype._migrateCallbackAt = function(A, T) {
      var _ = A._fulfillmentHandlerAt(T), F = A._rejectionHandlerAt(T), O = A._promiseAt(T), L = A._receiverAt(T);
      L === void 0 && (L = a), this._addCallbacks(_, F, O, L, null);
    }, R.prototype._addCallbacks = function(A, T, _, F, O) {
      var L = this._length();
      if (L >= 65531 && (L = 0, this._setLength(0)), L === 0)
        this._promise0 = _, this._receiver0 = F, typeof A == "function" && (this._fulfillmentHandler0 = O === null ? A : o.domainBind(O, A)), typeof T == "function" && (this._rejectionHandler0 = O === null ? T : o.domainBind(O, T));
      else {
        var k = L * 4 - 4;
        this[k + 2] = _, this[k + 3] = F, typeof A == "function" && (this[k + 0] = O === null ? A : o.domainBind(O, A)), typeof T == "function" && (this[k + 1] = O === null ? T : o.domainBind(O, T));
      }
      return this._setLength(L + 1), L;
    }, R.prototype._proxy = function(A, T) {
      this._addCallbacks(void 0, void 0, T, A, null);
    }, R.prototype._resolveCallback = function(A, T) {
      if (!(this._bitField & 117506048)) {
        if (A === this)
          return this._rejectCallback(t(), !1);
        var _ = h(A, this);
        if (!(_ instanceof R)) return this._fulfill(A);
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
          for (var k = 1; k < L; ++k)
            F._migrateCallbackAt(this, k);
          this._setFollowing(), this._setLength(0), this._setFollowee(F);
        }
      }
    }, R.prototype._rejectCallback = function(A, T, _) {
      var F = o.ensureErrorObject(A), O = F === A;
      if (!O && !_ && x.warnings()) {
        var L = "a promise was rejected with a non-error: " + o.classString(A);
        this._warn(L, !0);
      }
      this._attachExtraTrace(F, T ? O : !1), this._reject(A);
    }, R.prototype._resolveFromExecutor = function(A) {
      var T = this;
      this._captureStackTrace(), this._pushContext();
      var _ = !0, F = this._execute(A, function(O) {
        T._resolveCallback(O);
      }, function(O) {
        T._rejectCallback(O, _);
      });
      _ = !1, this._popContext(), F !== void 0 && T._rejectCallback(F, !0);
    }, R.prototype._settlePromiseFromHandler = function(A, T, _, F) {
      var O = F._bitField;
      if (!(O & 65536)) {
        F._pushContext();
        var L;
        T === m ? !_ || typeof _.length != "number" ? (L = I, L.e = new l("cannot .spread() a non-array: " + o.classString(_))) : L = q(A).apply(this._boundValue(), _) : L = q(A).call(T, _);
        var k = F._popContext();
        O = F._bitField, !(O & 65536) && (L === y ? F._reject(_) : L === I ? F._rejectCallback(L.e, !1) : (x.checkForgottenReturns(L, k, "", F, this), F._resolveCallback(L)));
      }
    }, R.prototype._target = function() {
      for (var A = this; A._isFollowing(); ) A = A._followee();
      return A;
    }, R.prototype._followee = function() {
      return this._rejectionHandler0;
    }, R.prototype._setFollowee = function(A) {
      this._rejectionHandler0 = A;
    }, R.prototype._settlePromise = function(A, T, _, F) {
      var O = A instanceof R, L = this._bitField, k = (L & 134217728) !== 0;
      L & 65536 ? (O && A._invokeInternalOnCancel(), _ instanceof w && _.isFinallyHandler() ? (_.cancelPromise = A, q(T).call(_, F) === I && A._reject(I.e)) : T === n ? A._fulfill(n.call(_)) : _ instanceof i ? _._promiseCancelled(A) : O || A instanceof f ? A._cancel() : _.cancel()) : typeof T == "function" ? O ? (k && A._setAsyncGuaranteed(), this._settlePromiseFromHandler(T, _, F, A)) : T.call(_, F, A) : _ instanceof i ? _._isResolved() || (L & 33554432 ? _._promiseFulfilled(F, A) : _._promiseRejected(F, A)) : O && (k && A._setAsyncGuaranteed(), L & 33554432 ? A._fulfill(F) : A._reject(F));
    }, R.prototype._settlePromiseLateCancellationObserver = function(A) {
      var T = A.handler, _ = A.promise, F = A.receiver, O = A.value;
      typeof T == "function" ? _ instanceof R ? this._settlePromiseFromHandler(T, F, O, _) : T.call(F, O, _) : _ instanceof R && _._reject(O);
    }, R.prototype._settlePromiseCtx = function(A) {
      this._settlePromise(A.promise, A.handler, A.receiver, A.value);
    }, R.prototype._settlePromise0 = function(A, T, _) {
      var F = this._promise0, O = this._receiverAt(0);
      this._promise0 = void 0, this._receiver0 = void 0, this._settlePromise(F, A, O, T);
    }, R.prototype._clearCallbackDataAtIndex = function(A) {
      var T = A * 4 - 4;
      this[T + 2] = this[T + 3] = this[T + 0] = this[T + 1] = void 0;
    }, R.prototype._fulfill = function(A) {
      var T = this._bitField;
      if (!((T & 117506048) >>> 16)) {
        if (A === this) {
          var _ = t();
          return this._attachExtraTrace(_), this._reject(_);
        }
        this._setFulfilled(), this._rejectionHandler0 = A, (T & 65535) > 0 && (T & 134217728 ? this._settlePromises() : d.settlePromises(this));
      }
    }, R.prototype._reject = function(A) {
      var T = this._bitField;
      if (!((T & 117506048) >>> 16)) {
        if (this._setRejected(), this._fulfillmentHandler0 = A, this._isFinal())
          return d.fatalError(A, o.isNode);
        (T & 65535) > 0 ? d.settlePromises(this) : this._ensurePossibleRejectionHandled();
      }
    }, R.prototype._fulfillPromises = function(A, T) {
      for (var _ = 1; _ < A; _++) {
        var F = this._fulfillmentHandlerAt(_), O = this._promiseAt(_), L = this._receiverAt(_);
        this._clearCallbackDataAtIndex(_), this._settlePromise(O, F, L, T);
      }
    }, R.prototype._rejectPromises = function(A, T) {
      for (var _ = 1; _ < A; _++) {
        var F = this._rejectionHandlerAt(_), O = this._promiseAt(_), L = this._receiverAt(_);
        this._clearCallbackDataAtIndex(_), this._settlePromise(O, F, L, T);
      }
    }, R.prototype._settlePromises = function() {
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
    }, R.prototype._settledValue = function() {
      var A = this._bitField;
      if (A & 33554432)
        return this._rejectionHandler0;
      if (A & 16777216)
        return this._fulfillmentHandler0;
    };
    function P(A) {
      this.promise._resolveCallback(A);
    }
    function G(A) {
      this.promise._rejectCallback(A, !1);
    }
    R.defer = R.pending = function() {
      x.deprecated("Promise.defer", "new Promise");
      var A = new R(b);
      return {
        promise: A,
        resolve: P,
        reject: G
      };
    }, o.notEnumerableProp(
      R,
      "_makeSelfResolutionError",
      t
    ), Cw()(
      R,
      b,
      h,
      r,
      x
    ), Fw()(R, b, h, x), Sw()(R, f, r, x), kw()(R), Bw()(R), Rw()(
      R,
      f,
      h,
      b,
      d,
      c
    ), R.Promise = R, R.version = "3.4.7", Ow()(R, f, r, h, b, x), Ww()(R), Iw()(R, r, h, D, b, x), Nw()(R, b, x), Lw()(R, r, b, h, i, x), Mw()(R), $w()(R, b), Pw()(R, f, h, r), zw()(R, b, h, r), qw()(R, f, r, h, b, x), jw()(R, f, x), Zw()(R, f, r), Xw()(R, b), Hw()(R, b), Vw()(R), o.toFastProperties(R), o.toFastProperties(R.prototype);
    function Q(A) {
      var T = new R(b);
      T._fulfillmentHandler0 = A, T._rejectionHandler0 = A, T._promise0 = A, T._receiver0 = A;
    }
    return Q({ a: 1 }), Q({ b: 2 }), Q({ c: 3 }), Q(1), Q(function() {
    }), Q(void 0), Q(!1), Q(new R(b)), x.setBounds(s.firstLineError, o.lastLineError), R;
  };
})(j2);
var Gw = j2.exports, Yw = Se, ct = Gw();
$e.defer = Kw;
$e.when = ct.resolve;
$e.resolve = ct.resolve;
$e.all = ct.all;
$e.props = ct.props;
$e.reject = ct.reject;
$e.promisify = ct.promisify;
$e.mapSeries = ct.mapSeries;
$e.attempt = ct.attempt;
$e.nfcall = function(e) {
  var t = Array.prototype.slice.call(arguments, 1), n = ct.promisify(e);
  return n.apply(null, t);
};
ct.prototype.fail = ct.prototype.caught;
ct.prototype.also = function(e) {
  return this.then(function(t) {
    var n = Yw.extend({}, t, e(t));
    return ct.props(n);
  });
};
function Kw() {
  var e, t, n = new ct.Promise(function(r, i) {
    e = r, t = i;
  });
  return {
    resolve: e,
    reject: t,
    promise: n
  };
}
var se = {}, Jw = Se, Ze = se.types = {
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
function Qw(e, t) {
  return t = t || {}, {
    type: Ze.document,
    children: e,
    notes: t.notes || new mo({}),
    comments: t.comments || []
  };
}
function eT(e, t) {
  t = t || {};
  var n = t.indent || {};
  return {
    type: Ze.paragraph,
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
function tT(e, t) {
  return t = t || {}, {
    type: Ze.run,
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
function nT(e) {
  return {
    type: Ze.text,
    value: e
  };
}
function rT() {
  return {
    type: Ze.tab
  };
}
function iT(e) {
  return {
    type: Ze.checkbox,
    checked: e.checked
  };
}
function aT(e, t) {
  return {
    type: Ze.hyperlink,
    children: e,
    href: t.href,
    anchor: t.anchor,
    targetFrame: t.targetFrame
  };
}
function oT(e) {
  return {
    type: Ze.noteReference,
    noteType: e.noteType,
    noteId: e.noteId
  };
}
function mo(e) {
  this._notes = Jw.indexBy(e, function(t) {
    return H2(t.noteType, t.noteId);
  });
}
mo.prototype.resolve = function(e) {
  return this.findNoteByKey(H2(e.noteType, e.noteId));
};
mo.prototype.findNoteByKey = function(e) {
  return this._notes[e] || null;
};
function cT(e) {
  return {
    type: Ze.note,
    noteType: e.noteType,
    noteId: e.noteId,
    body: e.body
  };
}
function sT(e) {
  return {
    type: Ze.commentReference,
    commentId: e.commentId
  };
}
function uT(e) {
  return {
    type: Ze.comment,
    commentId: e.commentId,
    body: e.body,
    authorName: e.authorName,
    authorInitials: e.authorInitials
  };
}
function H2(e, t) {
  return e + "-" + t;
}
function dT(e) {
  return {
    type: Ze.image,
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
function lT(e, t) {
  return t = t || {}, {
    type: Ze.table,
    children: e,
    styleId: t.styleId || null,
    styleName: t.styleName || null
  };
}
function fT(e, t) {
  return t = t || {}, {
    type: Ze.tableRow,
    children: e,
    isHeader: t.isHeader || !1
  };
}
function hT(e, t) {
  return t = t || {}, {
    type: Ze.tableCell,
    children: e,
    colSpan: t.colSpan == null ? 1 : t.colSpan,
    rowSpan: t.rowSpan == null ? 1 : t.rowSpan
  };
}
function Cd(e) {
  return {
    type: Ze.break,
    breakType: e
  };
}
function pT(e) {
  return {
    type: Ze.bookmarkStart,
    name: e.name
  };
}
se.document = se.Document = Qw;
se.paragraph = se.Paragraph = eT;
se.run = se.Run = tT;
se.text = se.Text = nT;
se.tab = se.Tab = rT;
se.checkbox = se.Checkbox = iT;
se.Hyperlink = aT;
se.noteReference = se.NoteReference = oT;
se.Notes = mo;
se.Note = cT;
se.commentReference = sT;
se.comment = uT;
se.Image = dT;
se.Table = lT;
se.TableRow = fT;
se.TableCell = hT;
se.lineBreak = Cd("line");
se.pageBreak = Cd("page");
se.columnBreak = Cd("column");
se.BookmarkStart = pT;
se.verticalAlignment = X2;
var mt = {}, Ti = Se;
mt.Result = Ht;
mt.success = gT;
mt.warning = mT;
mt.error = bT;
function Ht(e, t) {
  this.value = e, this.messages = t || [];
}
Ht.prototype.map = function(e) {
  return new Ht(e(this.value), this.messages);
};
Ht.prototype.flatMap = function(e) {
  var t = e(this.value);
  return new Ht(t.value, Fd([this, t]));
};
Ht.prototype.flatMapThen = function(e) {
  var t = this;
  return e(this.value).then(function(n) {
    return new Ht(n.value, Fd([t, n]));
  });
};
Ht.combine = function(e) {
  var t = Ti.flatten(Ti.pluck(e, "value")), n = Fd(e);
  return new Ht(t, n);
};
function gT(e) {
  return new Ht(e, []);
}
function mT(e) {
  return {
    type: "warning",
    message: e
  };
}
function bT(e) {
  return {
    type: "error",
    message: e.message,
    error: e
  };
}
function Fd(e) {
  var t = [];
  return Ti.flatten(Ti.pluck(e, "messages"), !0).forEach(function(n) {
    yT(t, n) || t.push(n);
  }), t;
}
function yT(e, t) {
  return Ti.find(e, vT.bind(null, t)) !== void 0;
}
function vT(e, t) {
  return e.type === t.type && e.message === t.message;
}
var $i = {}, bo = {};
bo.byteLength = _T;
bo.toByteArray = TT;
bo.fromByteArray = AT;
var Pt = [], yt = [], DT = typeof Uint8Array < "u" ? Uint8Array : Array, Jc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var hr = 0, xT = Jc.length; hr < xT; ++hr)
  Pt[hr] = Jc[hr], yt[Jc.charCodeAt(hr)] = hr;
yt[45] = 62;
yt[95] = 63;
function V2(e) {
  var t = e.length;
  if (t % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var n = e.indexOf("=");
  n === -1 && (n = t);
  var r = n === t ? 0 : 4 - n % 4;
  return [n, r];
}
function _T(e) {
  var t = V2(e), n = t[0], r = t[1];
  return (n + r) * 3 / 4 - r;
}
function wT(e, t, n) {
  return (t + n) * 3 / 4 - n;
}
function TT(e) {
  var t, n = V2(e), r = n[0], i = n[1], a = new DT(wT(e, r, i)), o = 0, c = i > 0 ? r - 4 : r, u;
  for (u = 0; u < c; u += 4)
    t = yt[e.charCodeAt(u)] << 18 | yt[e.charCodeAt(u + 1)] << 12 | yt[e.charCodeAt(u + 2)] << 6 | yt[e.charCodeAt(u + 3)], a[o++] = t >> 16 & 255, a[o++] = t >> 8 & 255, a[o++] = t & 255;
  return i === 2 && (t = yt[e.charCodeAt(u)] << 2 | yt[e.charCodeAt(u + 1)] >> 4, a[o++] = t & 255), i === 1 && (t = yt[e.charCodeAt(u)] << 10 | yt[e.charCodeAt(u + 1)] << 4 | yt[e.charCodeAt(u + 2)] >> 2, a[o++] = t >> 8 & 255, a[o++] = t & 255), a;
}
function UT(e) {
  return Pt[e >> 18 & 63] + Pt[e >> 12 & 63] + Pt[e >> 6 & 63] + Pt[e & 63];
}
function ET(e, t, n) {
  for (var r, i = [], a = t; a < n; a += 3)
    r = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (e[a + 2] & 255), i.push(UT(r));
  return i.join("");
}
function AT(e) {
  for (var t, n = e.length, r = n % 3, i = [], a = 16383, o = 0, c = n - r; o < c; o += a)
    i.push(ET(e, o, o + a > c ? c : o + a));
  return r === 1 ? (t = e[n - 1], i.push(
    Pt[t >> 2] + Pt[t << 4 & 63] + "=="
  )) : r === 2 && (t = (e[n - 2] << 8) + e[n - 1], i.push(
    Pt[t >> 10] + Pt[t >> 4 & 63] + Pt[t << 2 & 63] + "="
  )), i.join("");
}
var qr = {}, Qc = {}, Be = {}, oa = { exports: {} }, ca = { exports: {} }, Jf;
function yo() {
  if (Jf) return ca.exports;
  Jf = 1, typeof process > "u" || !process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0 ? ca.exports = { nextTick: e } : ca.exports = process;
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
  return ca.exports;
}
var es, Qf;
function CT() {
  if (Qf) return es;
  Qf = 1;
  var e = {}.toString;
  return es = Array.isArray || function(t) {
    return e.call(t) == "[object Array]";
  }, es;
}
var ts, eh;
function G2() {
  return eh || (eh = 1, ts = Mg), ts;
}
var sa = { exports: {} }, th;
function vo() {
  return th || (th = 1, function(e, t) {
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
  }(sa, sa.exports)), sa.exports;
}
var Pe = {}, nh;
function Pi() {
  if (nh) return Pe;
  nh = 1;
  function e(m) {
    return Array.isArray ? Array.isArray(m) : b(m) === "[object Array]";
  }
  Pe.isArray = e;
  function t(m) {
    return typeof m == "boolean";
  }
  Pe.isBoolean = t;
  function n(m) {
    return m === null;
  }
  Pe.isNull = n;
  function r(m) {
    return m == null;
  }
  Pe.isNullOrUndefined = r;
  function i(m) {
    return typeof m == "number";
  }
  Pe.isNumber = i;
  function a(m) {
    return typeof m == "string";
  }
  Pe.isString = a;
  function o(m) {
    return typeof m == "symbol";
  }
  Pe.isSymbol = o;
  function c(m) {
    return m === void 0;
  }
  Pe.isUndefined = c;
  function u(m) {
    return b(m) === "[object RegExp]";
  }
  Pe.isRegExp = u;
  function s(m) {
    return typeof m == "object" && m !== null;
  }
  Pe.isObject = s;
  function d(m) {
    return b(m) === "[object Date]";
  }
  Pe.isDate = d;
  function g(m) {
    return b(m) === "[object Error]" || m instanceof Error;
  }
  Pe.isError = g;
  function l(m) {
    return typeof m == "function";
  }
  Pe.isFunction = l;
  function p(m) {
    return m === null || typeof m == "boolean" || typeof m == "number" || typeof m == "string" || typeof m == "symbol" || // ES6 symbol
    typeof m > "u";
  }
  Pe.isPrimitive = p, Pe.isBuffer = Buffer.isBuffer;
  function b(m) {
    return Object.prototype.toString.call(m);
  }
  return Pe;
}
var ua = { exports: {} }, da = { exports: {} }, rh;
function FT() {
  return rh || (rh = 1, typeof Object.create == "function" ? da.exports = function(t, n) {
    n && (t.super_ = n, t.prototype = Object.create(n.prototype, {
      constructor: {
        value: t,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : da.exports = function(t, n) {
    if (n) {
      t.super_ = n;
      var r = function() {
      };
      r.prototype = n.prototype, t.prototype = new r(), t.prototype.constructor = t;
    }
  }), da.exports;
}
var ih;
function zi() {
  if (ih) return ua.exports;
  ih = 1;
  try {
    var e = require("util");
    if (typeof e.inherits != "function") throw "";
    ua.exports = e.inherits;
  } catch {
    ua.exports = FT();
  }
  return ua.exports;
}
var ns = { exports: {} }, ah;
function ST() {
  return ah || (ah = 1, function(e) {
    function t(a, o) {
      if (!(a instanceof o))
        throw new TypeError("Cannot call a class as a function");
    }
    var n = vo().Buffer, r = to;
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
  }(ns)), ns.exports;
}
var rs, oh;
function Y2() {
  if (oh) return rs;
  oh = 1;
  var e = yo();
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
  return rs = {
    destroy: t,
    undestroy: n
  }, rs;
}
var is, ch;
function kT() {
  return ch || (ch = 1, is = to.deprecate), is;
}
var as, sh;
function K2() {
  if (sh) return as;
  sh = 1;
  var e = yo();
  as = m;
  function t(T) {
    var _ = this;
    this.next = null, this.entry = null, this.finish = function() {
      A(_, T);
    };
  }
  var n = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : e.nextTick, r;
  m.WritableState = p;
  var i = Object.create(Pi());
  i.inherits = zi();
  var a = {
    deprecate: kT()
  }, o = G2(), c = vo().Buffer, u = (typeof re < "u" ? re : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function s(T) {
    return c.from(T);
  }
  function d(T) {
    return c.isBuffer(T) || T instanceof u;
  }
  var g = Y2();
  i.inherits(m, o);
  function l() {
  }
  function p(T, _) {
    r = r || Br(), T = T || {};
    var F = _ instanceof r;
    this.objectMode = !!T.objectMode, F && (this.objectMode = this.objectMode || !!T.writableObjectMode);
    var O = T.highWaterMark, L = T.writableHighWaterMark, k = this.objectMode ? 16 : 16 * 1024;
    O || O === 0 ? this.highWaterMark = O : F && (L || L === 0) ? this.highWaterMark = L : this.highWaterMark = k, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
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
    if (r = r || Br(), !b.call(m, this) && !(this instanceof r))
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
    var L = !0, k = !1;
    return F === null ? k = new TypeError("May not write null values to stream") : typeof F != "string" && F !== void 0 && !_.objectMode && (k = new TypeError("Invalid non-string/buffer chunk")), k && (T.emit("error", k), e.nextTick(O, k), L = !1), L;
  }
  m.prototype.write = function(T, _, F) {
    var O = this._writableState, L = !1, k = !O.objectMode && d(T);
    return k && !c.isBuffer(T) && (T = s(T)), typeof _ == "function" && (F = _, _ = null), k ? _ = "buffer" : _ || (_ = O.defaultEncoding), typeof F != "function" && (F = l), O.ended ? y(this, F) : (k || h(this, O, T, F)) && (O.pendingcb++, L = v(this, O, k, T, _, F)), L;
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
  function f(T, _, F) {
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
  function v(T, _, F, O, L, k) {
    if (!F) {
      var z = f(_, O, L);
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
        callback: k,
        next: null
      }, J ? J.next = _.lastBufferedRequest : _.bufferedRequest = _.lastBufferedRequest, _.bufferedRequestCount += 1;
    } else
      D(T, _, !1, ee, O, L, k);
    return te;
  }
  function D(T, _, F, O, L, k, z) {
    _.writelen = O, _.writecb = z, _.writing = !0, _.sync = !0, F ? T._writev(L, _.onwrite) : T._write(L, k, _.onwrite), _.sync = !1;
  }
  function x(T, _, F, O, L) {
    --_.pendingcb, F ? (e.nextTick(L, O), e.nextTick(G, T, _), T._writableState.errorEmitted = !0, T.emit("error", O)) : (L(O), T._writableState.errorEmitted = !0, T.emit("error", O), G(T, _));
  }
  function w(T) {
    T.writing = !1, T.writecb = null, T.length -= T.writelen, T.writelen = 0;
  }
  function E(T, _) {
    var F = T._writableState, O = F.sync, L = F.writecb;
    if (w(F), _) x(T, F, O, _, L);
    else {
      var k = $(F);
      !k && !F.corked && !F.bufferProcessing && F.bufferedRequest && q(T, F), O ? n(S, T, F, k, L) : S(T, F, k, L);
    }
  }
  function S(T, _, F, O) {
    F || I(T, _), _.pendingcb--, O(), G(T, _);
  }
  function I(T, _) {
    _.length === 0 && _.needDrain && (_.needDrain = !1, T.emit("drain"));
  }
  function q(T, _) {
    _.bufferProcessing = !0;
    var F = _.bufferedRequest;
    if (T._writev && F && F.next) {
      var O = _.bufferedRequestCount, L = new Array(O), k = _.corkedRequestsFree;
      k.entry = F;
      for (var z = 0, ee = !0; F; )
        L[z] = F, F.isBuf || (ee = !1), F = F.next, z += 1;
      L.allBuffers = ee, D(T, _, !0, _.length, L, "", k.finish), _.pendingcb++, _.lastBufferedRequest = null, k.next ? (_.corkedRequestsFree = k.next, k.next = null) : _.corkedRequestsFree = new t(_), _.bufferedRequestCount = 0;
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
  function R(T, _) {
    T._final(function(F) {
      _.pendingcb--, F && T.emit("error", F), _.prefinished = !0, T.emit("prefinish"), G(T, _);
    });
  }
  function P(T, _) {
    !_.prefinished && !_.finalCalled && (typeof T._final == "function" ? (_.pendingcb++, _.finalCalled = !0, e.nextTick(R, T, _)) : (_.prefinished = !0, T.emit("prefinish")));
  }
  function G(T, _) {
    var F = $(_);
    return F && (P(T, _), _.pendingcb === 0 && (_.finished = !0, T.emit("finish"))), F;
  }
  function Q(T, _, F) {
    _.ending = !0, G(T, _), F && (_.finished ? e.nextTick(F) : T.once("finish", F)), _.ended = !0, T.writable = !1;
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
  }, as;
}
var os, uh;
function Br() {
  if (uh) return os;
  uh = 1;
  var e = yo(), t = Object.keys || function(g) {
    var l = [];
    for (var p in g)
      l.push(p);
    return l;
  };
  os = u;
  var n = Object.create(Pi());
  n.inherits = zi();
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
  }), u.prototype._destroy = function(g, l) {
    this.push(null), this.end(), e.nextTick(l, g);
  }, os;
}
var cs = {}, dh;
function lh() {
  if (dh) return cs;
  dh = 1;
  var e = vo().Buffer, t = e.isEncoding || function(h) {
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
    for (var f; ; )
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
          if (f) return;
          h = ("" + h).toLowerCase(), f = !0;
      }
  }
  function r(h) {
    var f = n(h);
    if (typeof f != "string" && (e.isEncoding === t || !t(h))) throw new Error("Unknown encoding: " + h);
    return f || h;
  }
  cs.StringDecoder = i;
  function i(h) {
    this.encoding = r(h);
    var f;
    switch (this.encoding) {
      case "utf16le":
        this.text = g, this.end = l, f = 4;
        break;
      case "utf8":
        this.fillLast = u, f = 4;
        break;
      case "base64":
        this.text = p, this.end = b, f = 3;
        break;
      default:
        this.write = m, this.end = y;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = e.allocUnsafe(f);
  }
  i.prototype.write = function(h) {
    if (h.length === 0) return "";
    var f, v;
    if (this.lastNeed) {
      if (f = this.fillLast(h), f === void 0) return "";
      v = this.lastNeed, this.lastNeed = 0;
    } else
      v = 0;
    return v < h.length ? f ? f + this.text(h, v) : this.text(h, v) : f || "";
  }, i.prototype.end = d, i.prototype.text = s, i.prototype.fillLast = function(h) {
    if (this.lastNeed <= h.length)
      return h.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    h.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, h.length), this.lastNeed -= h.length;
  };
  function a(h) {
    return h <= 127 ? 0 : h >> 5 === 6 ? 2 : h >> 4 === 14 ? 3 : h >> 3 === 30 ? 4 : h >> 6 === 2 ? -1 : -2;
  }
  function o(h, f, v) {
    var D = f.length - 1;
    if (D < v) return 0;
    var x = a(f[D]);
    return x >= 0 ? (x > 0 && (h.lastNeed = x - 1), x) : --D < v || x === -2 ? 0 : (x = a(f[D]), x >= 0 ? (x > 0 && (h.lastNeed = x - 2), x) : --D < v || x === -2 ? 0 : (x = a(f[D]), x >= 0 ? (x > 0 && (x === 2 ? x = 0 : h.lastNeed = x - 3), x) : 0));
  }
  function c(h, f, v) {
    if ((f[0] & 192) !== 128)
      return h.lastNeed = 0, "�";
    if (h.lastNeed > 1 && f.length > 1) {
      if ((f[1] & 192) !== 128)
        return h.lastNeed = 1, "�";
      if (h.lastNeed > 2 && f.length > 2 && (f[2] & 192) !== 128)
        return h.lastNeed = 2, "�";
    }
  }
  function u(h) {
    var f = this.lastTotal - this.lastNeed, v = c(this, h);
    if (v !== void 0) return v;
    if (this.lastNeed <= h.length)
      return h.copy(this.lastChar, f, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    h.copy(this.lastChar, f, 0, h.length), this.lastNeed -= h.length;
  }
  function s(h, f) {
    var v = o(this, h, f);
    if (!this.lastNeed) return h.toString("utf8", f);
    this.lastTotal = v;
    var D = h.length - (v - this.lastNeed);
    return h.copy(this.lastChar, 0, D), h.toString("utf8", f, D);
  }
  function d(h) {
    var f = h && h.length ? this.write(h) : "";
    return this.lastNeed ? f + "�" : f;
  }
  function g(h, f) {
    if ((h.length - f) % 2 === 0) {
      var v = h.toString("utf16le", f);
      if (v) {
        var D = v.charCodeAt(v.length - 1);
        if (D >= 55296 && D <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = h[h.length - 2], this.lastChar[1] = h[h.length - 1], v.slice(0, -1);
      }
      return v;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = h[h.length - 1], h.toString("utf16le", f, h.length - 1);
  }
  function l(h) {
    var f = h && h.length ? this.write(h) : "";
    if (this.lastNeed) {
      var v = this.lastTotal - this.lastNeed;
      return f + this.lastChar.toString("utf16le", 0, v);
    }
    return f;
  }
  function p(h, f) {
    var v = (h.length - f) % 3;
    return v === 0 ? h.toString("base64", f) : (this.lastNeed = 3 - v, this.lastTotal = 3, v === 1 ? this.lastChar[0] = h[h.length - 1] : (this.lastChar[0] = h[h.length - 2], this.lastChar[1] = h[h.length - 1]), h.toString("base64", f, h.length - v));
  }
  function b(h) {
    var f = h && h.length ? this.write(h) : "";
    return this.lastNeed ? f + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : f;
  }
  function m(h) {
    return h.toString(this.encoding);
  }
  function y(h) {
    return h && h.length ? this.write(h) : "";
  }
  return cs;
}
var ss, fh;
function J2() {
  if (fh) return ss;
  fh = 1;
  var e = yo();
  ss = f;
  var t = CT(), n;
  f.ReadableState = h, sv.EventEmitter;
  var r = function(U, C) {
    return U.listeners(C).length;
  }, i = G2(), a = vo().Buffer, o = (typeof re < "u" ? re : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function c(U) {
    return a.from(U);
  }
  function u(U) {
    return a.isBuffer(U) || U instanceof o;
  }
  var s = Object.create(Pi());
  s.inherits = zi();
  var d = to, g = void 0;
  d && d.debuglog ? g = d.debuglog("stream") : g = function() {
  };
  var l = ST(), p = Y2(), b;
  s.inherits(f, i);
  var m = ["error", "close", "destroy", "pause", "resume"];
  function y(U, C, Z) {
    if (typeof U.prependListener == "function") return U.prependListener(C, Z);
    !U._events || !U._events[C] ? U.on(C, Z) : t(U._events[C]) ? U._events[C].unshift(Z) : U._events[C] = [Z, U._events[C]];
  }
  function h(U, C) {
    n = n || Br(), U = U || {};
    var Z = C instanceof n;
    this.objectMode = !!U.objectMode, Z && (this.objectMode = this.objectMode || !!U.readableObjectMode);
    var K = U.highWaterMark, B = U.readableHighWaterMark, M = this.objectMode ? 16 : 16 * 1024;
    K || K === 0 ? this.highWaterMark = K : Z && (B || B === 0) ? this.highWaterMark = B : this.highWaterMark = M, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new l(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = U.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, U.encoding && (b || (b = lh().StringDecoder), this.decoder = new b(U.encoding), this.encoding = U.encoding);
  }
  function f(U) {
    if (n = n || Br(), !(this instanceof f)) return new f(U);
    this._readableState = new h(U, this), this.readable = !0, U && (typeof U.read == "function" && (this._read = U.read), typeof U.destroy == "function" && (this._destroy = U.destroy)), i.call(this);
  }
  Object.defineProperty(f.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(U) {
      this._readableState && (this._readableState.destroyed = U);
    }
  }), f.prototype.destroy = p.destroy, f.prototype._undestroy = p.undestroy, f.prototype._destroy = function(U, C) {
    this.push(null), C(U);
  }, f.prototype.push = function(U, C) {
    var Z = this._readableState, K;
    return Z.objectMode ? K = !0 : typeof U == "string" && (C = C || Z.defaultEncoding, C !== Z.encoding && (U = a.from(U, C), C = ""), K = !0), v(this, U, C, !1, K);
  }, f.prototype.unshift = function(U) {
    return v(this, U, null, !0, !1);
  };
  function v(U, C, Z, K, B) {
    var M = U._readableState;
    if (C === null)
      M.reading = !1, q(U, M);
    else {
      var H;
      B || (H = x(M, C)), H ? U.emit("error", H) : M.objectMode || C && C.length > 0 ? (typeof C != "string" && !M.objectMode && Object.getPrototypeOf(C) !== a.prototype && (C = c(C)), K ? M.endEmitted ? U.emit("error", new Error("stream.unshift() after end event")) : D(U, M, C, !0) : M.ended ? U.emit("error", new Error("stream.push() after EOF")) : (M.reading = !1, M.decoder && !Z ? (C = M.decoder.write(C), M.objectMode || C.length !== 0 ? D(U, M, C, !1) : P(U, M)) : D(U, M, C, !1))) : K || (M.reading = !1);
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
  f.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, f.prototype.setEncoding = function(U) {
    return b || (b = lh().StringDecoder), this._readableState.decoder = new b(U), this._readableState.encoding = U, this;
  };
  var E = 8388608;
  function S(U) {
    return U >= E ? U = E : (U--, U |= U >>> 1, U |= U >>> 2, U |= U >>> 4, U |= U >>> 8, U |= U >>> 16, U++), U;
  }
  function I(U, C) {
    return U <= 0 || C.length === 0 && C.ended ? 0 : C.objectMode ? 1 : U !== U ? C.flowing && C.length ? C.buffer.head.data.length : C.length : (U > C.highWaterMark && (C.highWaterMark = S(U)), U <= C.length ? U : C.ended ? C.length : (C.needReadable = !0, 0));
  }
  f.prototype.read = function(U) {
    g("read", U), U = parseInt(U, 10);
    var C = this._readableState, Z = U;
    if (U !== 0 && (C.emittedReadable = !1), U === 0 && C.needReadable && (C.length >= C.highWaterMark || C.ended))
      return g("read: emitReadable", C.length, C.ended), C.length === 0 && C.ended ? ee(this) : $(this), null;
    if (U = I(U, C), U === 0 && C.ended)
      return C.length === 0 && ee(this), null;
    var K = C.needReadable;
    g("need readable", K), (C.length === 0 || C.length - U < C.highWaterMark) && (K = !0, g("length less than watermark", K)), C.ended || C.reading ? (K = !1, g("reading or ended", K)) : K && (g("do read"), C.reading = !0, C.sync = !0, C.length === 0 && (C.needReadable = !0), this._read(C.highWaterMark), C.sync = !1, C.reading || (U = I(Z, C)));
    var B;
    return U > 0 ? B = O(U, C) : B = null, B === null ? (C.needReadable = !0, U = 0) : C.length -= U, C.length === 0 && (C.ended || (C.needReadable = !0), Z !== U && C.ended && ee(this)), B !== null && this.emit("data", B), B;
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
    C.needReadable = !1, C.emittedReadable || (g("emitReadable", C.flowing), C.emittedReadable = !0, C.sync ? e.nextTick(R, U) : R(U));
  }
  function R(U) {
    g("emit readable"), U.emit("readable"), F(U);
  }
  function P(U, C) {
    C.readingMore || (C.readingMore = !0, e.nextTick(G, U, C));
  }
  function G(U, C) {
    for (var Z = C.length; !C.reading && !C.flowing && !C.ended && C.length < C.highWaterMark && (g("maybeReadMore read 0"), U.read(0), Z !== C.length); )
      Z = C.length;
    C.readingMore = !1;
  }
  f.prototype._read = function(U) {
    this.emit("error", new Error("_read() is not implemented"));
  }, f.prototype.pipe = function(U, C) {
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
    var B = (!C || C.end !== !1) && U !== process.stdout && U !== process.stderr, M = B ? ne : W;
    K.endEmitted ? e.nextTick(M) : Z.once("end", M), U.on("unpipe", H);
    function H(N, V) {
      g("onunpipe"), N === Z && V && V.hasUnpiped === !1 && (V.hasUnpiped = !0, Ue());
    }
    function ne() {
      g("onend"), U.end();
    }
    var oe = Q(Z);
    U.on("drain", oe);
    var le = !1;
    function Ue() {
      g("cleanup"), U.removeListener("close", dr), U.removeListener("finish", ve), U.removeListener("drain", oe), U.removeListener("error", nt), U.removeListener("unpipe", H), Z.removeListener("end", ne), Z.removeListener("end", W), Z.removeListener("data", Kt), le = !0, K.awaitDrain && (!U._writableState || U._writableState.needDrain) && oe();
    }
    var Ne = !1;
    Z.on("data", Kt);
    function Kt(N) {
      g("ondata"), Ne = !1;
      var V = U.write(N);
      V === !1 && !Ne && ((K.pipesCount === 1 && K.pipes === U || K.pipesCount > 1 && J(K.pipes, U) !== -1) && !le && (g("false write response, pause", K.awaitDrain), K.awaitDrain++, Ne = !0), Z.pause());
    }
    function nt(N) {
      g("onerror", N), W(), U.removeListener("error", nt), r(U, "error") === 0 && U.emit("error", N);
    }
    y(U, "error", nt);
    function dr() {
      U.removeListener("finish", ve), W();
    }
    U.once("close", dr);
    function ve() {
      g("onfinish"), U.removeListener("close", dr), W();
    }
    U.once("finish", ve);
    function W() {
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
  f.prototype.unpipe = function(U) {
    var C = this._readableState, Z = { hasUnpiped: !1 };
    if (C.pipesCount === 0) return this;
    if (C.pipesCount === 1)
      return U && U !== C.pipes ? this : (U || (U = C.pipes), C.pipes = null, C.pipesCount = 0, C.flowing = !1, U && U.emit("unpipe", this, Z), this);
    if (!U) {
      var K = C.pipes, B = C.pipesCount;
      C.pipes = null, C.pipesCount = 0, C.flowing = !1;
      for (var M = 0; M < B; M++)
        K[M].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var H = J(C.pipes, U);
    return H === -1 ? this : (C.pipes.splice(H, 1), C.pipesCount -= 1, C.pipesCount === 1 && (C.pipes = C.pipes[0]), U.emit("unpipe", this, Z), this);
  }, f.prototype.on = function(U, C) {
    var Z = i.prototype.on.call(this, U, C);
    if (U === "data")
      this._readableState.flowing !== !1 && this.resume();
    else if (U === "readable") {
      var K = this._readableState;
      !K.endEmitted && !K.readableListening && (K.readableListening = K.needReadable = !0, K.emittedReadable = !1, K.reading ? K.length && $(this) : e.nextTick(A, this));
    }
    return Z;
  }, f.prototype.addListener = f.prototype.on;
  function A(U) {
    g("readable nexttick read 0"), U.read(0);
  }
  f.prototype.resume = function() {
    var U = this._readableState;
    return U.flowing || (g("resume"), U.flowing = !0, T(this, U)), this;
  };
  function T(U, C) {
    C.resumeScheduled || (C.resumeScheduled = !0, e.nextTick(_, U, C));
  }
  function _(U, C) {
    C.reading || (g("resume read 0"), U.read(0)), C.resumeScheduled = !1, C.awaitDrain = 0, U.emit("resume"), F(U), C.flowing && !C.reading && U.read(0);
  }
  f.prototype.pause = function() {
    return g("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (g("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
  };
  function F(U) {
    var C = U._readableState;
    for (g("flow", C.flowing); C.flowing && U.read() !== null; )
      ;
  }
  f.prototype.wrap = function(U) {
    var C = this, Z = this._readableState, K = !1;
    U.on("end", function() {
      if (g("wrapped end"), Z.decoder && !Z.ended) {
        var H = Z.decoder.end();
        H && H.length && C.push(H);
      }
      C.push(null);
    }), U.on("data", function(H) {
      if (g("wrapped data"), Z.decoder && (H = Z.decoder.write(H)), !(Z.objectMode && H == null) && !(!Z.objectMode && (!H || !H.length))) {
        var ne = C.push(H);
        ne || (K = !0, U.pause());
      }
    });
    for (var B in U)
      this[B] === void 0 && typeof U[B] == "function" && (this[B] = /* @__PURE__ */ function(H) {
        return function() {
          return U[H].apply(U, arguments);
        };
      }(B));
    for (var M = 0; M < m.length; M++)
      U.on(m[M], this.emit.bind(this, m[M]));
    return this._read = function(H) {
      g("wrapped _read", H), K && (K = !1, U.resume());
    }, this;
  }, Object.defineProperty(f.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), f._fromList = O;
  function O(U, C) {
    if (C.length === 0) return null;
    var Z;
    return C.objectMode ? Z = C.buffer.shift() : !U || U >= C.length ? (C.decoder ? Z = C.buffer.join("") : C.buffer.length === 1 ? Z = C.buffer.head.data : Z = C.buffer.concat(C.length), C.buffer.clear()) : Z = L(U, C.buffer, C.decoder), Z;
  }
  function L(U, C, Z) {
    var K;
    return U < C.head.data.length ? (K = C.head.data.slice(0, U), C.head.data = C.head.data.slice(U)) : U === C.head.data.length ? K = C.shift() : K = Z ? k(U, C) : z(U, C), K;
  }
  function k(U, C) {
    var Z = C.head, K = 1, B = Z.data;
    for (U -= B.length; Z = Z.next; ) {
      var M = Z.data, H = U > M.length ? M.length : U;
      if (H === M.length ? B += M : B += M.slice(0, U), U -= H, U === 0) {
        H === M.length ? (++K, Z.next ? C.head = Z.next : C.head = C.tail = null) : (C.head = Z, Z.data = M.slice(H));
        break;
      }
      ++K;
    }
    return C.length -= K, B;
  }
  function z(U, C) {
    var Z = a.allocUnsafe(U), K = C.head, B = 1;
    for (K.data.copy(Z), U -= K.data.length; K = K.next; ) {
      var M = K.data, H = U > M.length ? M.length : U;
      if (M.copy(Z, Z.length - U, 0, H), U -= H, U === 0) {
        H === M.length ? (++B, K.next ? C.head = K.next : C.head = C.tail = null) : (C.head = K, K.data = M.slice(H));
        break;
      }
      ++B;
    }
    return C.length -= B, Z;
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
  return ss;
}
var us, hh;
function Q2() {
  if (hh) return us;
  hh = 1, us = r;
  var e = Br(), t = Object.create(Pi());
  t.inherits = zi(), t.inherits(r, e);
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
  return us;
}
var ds, ph;
function BT() {
  if (ph) return ds;
  ph = 1, ds = n;
  var e = Q2(), t = Object.create(Pi());
  t.inherits = zi(), t.inherits(n, e);
  function n(r) {
    if (!(this instanceof n)) return new n(r);
    e.call(this, r);
  }
  return n.prototype._transform = function(r, i, a) {
    a(null, r);
  }, ds;
}
var gh;
function eb() {
  return gh || (gh = 1, function(e, t) {
    var n = Mg;
    process.env.READABLE_STREAM === "disable" && n ? (e.exports = n, t = e.exports = n.Readable, t.Readable = n.Readable, t.Writable = n.Writable, t.Duplex = n.Duplex, t.Transform = n.Transform, t.PassThrough = n.PassThrough, t.Stream = n) : (t = e.exports = J2(), t.Stream = n || t, t.Readable = t, t.Writable = K2(), t.Duplex = Br(), t.Transform = Q2(), t.PassThrough = BT());
  }(oa, oa.exports)), oa.exports;
}
var mh, la;
Be.base64 = !0;
Be.array = !0;
Be.string = !0;
Be.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u";
Be.nodebuffer = typeof Buffer < "u";
Be.uint8array = typeof Uint8Array < "u";
if (typeof ArrayBuffer > "u")
  la = Be.blob = !1;
else {
  var bh = new ArrayBuffer(0);
  try {
    la = Be.blob = new Blob([bh], {
      type: "application/zip"
    }).size === 0;
  } catch {
    try {
      var RT = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder, yh = new RT();
      yh.append(bh), la = Be.blob = yh.getBlob("application/zip").size === 0;
    } catch {
      la = Be.blob = !1;
    }
  }
}
try {
  mh = Be.nodestream = !!eb().Readable;
} catch {
  mh = Be.nodestream = !1;
}
var fa = {}, vh;
function tb() {
  if (vh) return fa;
  vh = 1;
  var e = Ae(), t = Be, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  return fa.encode = function(r) {
    for (var i = [], a, o, c, u, s, d, g, l = 0, p = r.length, b = p, m = e.getTypeOf(r) !== "string"; l < r.length; )
      b = p - l, m ? (a = r[l++], o = l < p ? r[l++] : 0, c = l < p ? r[l++] : 0) : (a = r.charCodeAt(l++), o = l < p ? r.charCodeAt(l++) : 0, c = l < p ? r.charCodeAt(l++) : 0), u = a >> 2, s = (a & 3) << 4 | o >> 4, d = b > 1 ? (o & 15) << 2 | c >> 6 : 64, g = b > 2 ? c & 63 : 64, i.push(n.charAt(u) + n.charAt(s) + n.charAt(d) + n.charAt(g));
    return i.join("");
  }, fa.decode = function(r) {
    var i, a, o, c, u, s, d, g = 0, l = 0, p = "data:";
    if (r.substr(0, p.length) === p)
      throw new Error("Invalid base64 input, it looks like a data url.");
    r = r.replace(/[^A-Za-z0-9+/=]/g, "");
    var b = r.length * 3 / 4;
    if (r.charAt(r.length - 1) === n.charAt(64) && b--, r.charAt(r.length - 2) === n.charAt(64) && b--, b % 1 !== 0)
      throw new Error("Invalid base64 input, bad content length.");
    var m;
    for (t.uint8array ? m = new Uint8Array(b | 0) : m = new Array(b | 0); g < r.length; )
      c = n.indexOf(r.charAt(g++)), u = n.indexOf(r.charAt(g++)), s = n.indexOf(r.charAt(g++)), d = n.indexOf(r.charAt(g++)), i = c << 2 | u >> 4, a = (u & 15) << 4 | s >> 2, o = (s & 3) << 6 | d, m[l++] = i, s !== 64 && (m[l++] = a), d !== 64 && (m[l++] = o);
    return m;
  }, fa;
}
var Do = {
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
}, ls, Dh;
function OT() {
  if (Dh) return ls;
  Dh = 1;
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
    for (var d, g, l = c.length; l; ) {
      for (g = c, c = [], d = -1; ++d < l; )
        g[d]();
      l = c.length;
    }
    o = !1;
  }
  ls = s;
  function s(d) {
    c.push(d) === 1 && !o && t();
  }
  return ls;
}
var fs, xh;
function WT() {
  if (xh) return fs;
  xh = 1;
  var e = OT();
  function t() {
  }
  var n = {}, r = ["REJECTED"], i = ["FULFILLED"], a = ["PENDING"];
  if (!process.browser)
    var o = ["UNHANDLED"];
  fs = c;
  function c(h) {
    if (typeof h != "function")
      throw new TypeError("resolver must be a function");
    this.state = a, this.queue = [], this.outcome = void 0, process.browser || (this.handled = o), h !== t && g(this, h);
  }
  c.prototype.finally = function(h) {
    if (typeof h != "function")
      return this;
    var f = this.constructor;
    return this.then(v, D);
    function v(x) {
      function w() {
        return x;
      }
      return f.resolve(h()).then(w);
    }
    function D(x) {
      function w() {
        throw x;
      }
      return f.resolve(h()).then(w);
    }
  }, c.prototype.catch = function(h) {
    return this.then(null, h);
  }, c.prototype.then = function(h, f) {
    if (typeof h != "function" && this.state === i || typeof f != "function" && this.state === r)
      return this;
    var v = new this.constructor(t);
    if (process.browser || this.handled === o && (this.handled = null), this.state !== a) {
      var D = this.state === i ? h : f;
      s(v, D, this.outcome);
    } else
      this.queue.push(new u(v, h, f));
    return v;
  };
  function u(h, f, v) {
    this.promise = h, typeof f == "function" && (this.onFulfilled = f, this.callFulfilled = this.otherCallFulfilled), typeof v == "function" && (this.onRejected = v, this.callRejected = this.otherCallRejected);
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
  function s(h, f, v) {
    e(function() {
      var D;
      try {
        D = f(v);
      } catch (x) {
        return n.reject(h, x);
      }
      D === h ? n.reject(h, new TypeError("Cannot resolve promise with itself")) : n.resolve(h, D);
    });
  }
  n.resolve = function(h, f) {
    var v = l(d, f);
    if (v.status === "error")
      return n.reject(h, v.value);
    var D = v.value;
    if (D)
      g(h, D);
    else {
      h.state = i, h.outcome = f;
      for (var x = -1, w = h.queue.length; ++x < w; )
        h.queue[x].callFulfilled(f);
    }
    return h;
  }, n.reject = function(h, f) {
    h.state = r, h.outcome = f, process.browser || h.handled === o && e(function() {
      h.handled === o && process.emit("unhandledRejection", f, h);
    });
    for (var v = -1, D = h.queue.length; ++v < D; )
      h.queue[v].callRejected(f);
    return h;
  };
  function d(h) {
    var f = h && h.then;
    if (h && (typeof h == "object" || typeof h == "function") && typeof f == "function")
      return function() {
        f.apply(h, arguments);
      };
  }
  function g(h, f) {
    var v = !1;
    function D(S) {
      v || (v = !0, n.reject(h, S));
    }
    function x(S) {
      v || (v = !0, n.resolve(h, S));
    }
    function w() {
      f(x, D);
    }
    var E = l(w);
    E.status === "error" && D(E.value);
  }
  function l(h, f) {
    var v = {};
    try {
      v.value = h(f), v.status = "success";
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
    var f = new this(t);
    return n.reject(f, h);
  }
  c.all = m;
  function m(h) {
    var f = this;
    if (Object.prototype.toString.call(h) !== "[object Array]")
      return this.reject(new TypeError("must be an array"));
    var v = h.length, D = !1;
    if (!v)
      return this.resolve([]);
    for (var x = new Array(v), w = 0, E = -1, S = new this(t); ++E < v; )
      I(h[E], E);
    return S;
    function I(q, $) {
      f.resolve(q).then(R, function(P) {
        D || (D = !0, n.reject(S, P));
      });
      function R(P) {
        x[$] = P, ++w === v && !D && (D = !0, n.resolve(S, x));
      }
    }
  }
  c.race = y;
  function y(h) {
    var f = this;
    if (Object.prototype.toString.call(h) !== "[object Array]")
      return this.reject(new TypeError("must be an array"));
    var v = h.length, D = !1;
    if (!v)
      return this.resolve([]);
    for (var x = -1, w = new this(t); ++x < v; )
      E(h[x]);
    return w;
    function E(S) {
      f.resolve(S).then(function(I) {
        D || (D = !0, n.resolve(w, I));
      }, function(I) {
        D || (D = !0, n.reject(w, I));
      });
    }
  }
  return fs;
}
var yu = null;
typeof Promise < "u" ? yu = Promise : yu = WT();
var qi = {
  Promise: yu
};
(function(e, t) {
  if (e.setImmediate)
    return;
  var n = 1, r = {}, i = !1, a = e.document, o;
  function c(f) {
    typeof f != "function" && (f = new Function("" + f));
    for (var v = new Array(arguments.length - 1), D = 0; D < v.length; D++)
      v[D] = arguments[D + 1];
    var x = { callback: f, args: v };
    return r[n] = x, o(n), n++;
  }
  function u(f) {
    delete r[f];
  }
  function s(f) {
    var v = f.callback, D = f.args;
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
  function d(f) {
    if (i)
      setTimeout(d, 0, f);
    else {
      var v = r[f];
      if (v) {
        i = !0;
        try {
          s(v);
        } finally {
          u(f), i = !1;
        }
      }
    }
  }
  function g() {
    o = function(f) {
      process.nextTick(function() {
        d(f);
      });
    };
  }
  function l() {
    if (e.postMessage && !e.importScripts) {
      var f = !0, v = e.onmessage;
      return e.onmessage = function() {
        f = !1;
      }, e.postMessage("", "*"), e.onmessage = v, f;
    }
  }
  function p() {
    var f = "setImmediate$" + Math.random() + "$", v = function(D) {
      D.source === e && typeof D.data == "string" && D.data.indexOf(f) === 0 && d(+D.data.slice(f.length));
    };
    e.addEventListener ? e.addEventListener("message", v, !1) : e.attachEvent("onmessage", v), o = function(D) {
      e.postMessage(f + D, "*");
    };
  }
  function b() {
    var f = new MessageChannel();
    f.port1.onmessage = function(v) {
      var D = v.data;
      d(D);
    }, o = function(v) {
      f.port2.postMessage(v);
    };
  }
  function m() {
    var f = a.documentElement;
    o = function(v) {
      var D = a.createElement("script");
      D.onreadystatechange = function() {
        d(v), D.onreadystatechange = null, f.removeChild(D), D = null;
      }, f.appendChild(D);
    };
  }
  function y() {
    o = function(f) {
      setTimeout(d, 0, f);
    };
  }
  var h = Object.getPrototypeOf && Object.getPrototypeOf(e);
  h = h && h.setTimeout ? h : e, {}.toString.call(e.process) === "[object process]" ? g() : l() ? p() : e.MessageChannel ? b() : a && "onreadystatechange" in a.createElement("script") ? m() : y(), h.setImmediate = c, h.clearImmediate = u;
})(typeof self > "u" ? re : self);
var _h;
function Ae() {
  return _h || (_h = 1, function(e) {
    var t = Be, n = tb(), r = Do, i = qi;
    function a(l) {
      var p = null;
      return t.uint8array ? p = new Uint8Array(l.length) : p = new Array(l.length), c(l, p);
    }
    e.newBlob = function(l, p) {
      e.checkSupport("blob");
      try {
        return new Blob([l], {
          type: p
        });
      } catch {
        try {
          var b = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder, m = new b();
          return m.append(l), m.getBlob(p);
        } catch {
          throw new Error("Bug : can't construct the Blob.");
        }
      }
    };
    function o(l) {
      return l;
    }
    function c(l, p) {
      for (var b = 0; b < l.length; ++b)
        p[b] = l.charCodeAt(b) & 255;
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
      stringifyByChunk: function(l, p, b) {
        var m = [], y = 0, h = l.length;
        if (h <= b)
          return String.fromCharCode.apply(null, l);
        for (; y < h; )
          p === "array" || p === "nodebuffer" ? m.push(String.fromCharCode.apply(null, l.slice(y, Math.min(y + b, h)))) : m.push(String.fromCharCode.apply(null, l.subarray(y, Math.min(y + b, h)))), y += b;
        return m.join("");
      },
      /**
       * Call String.fromCharCode on every item in the array.
       * This is the naive implementation, which generate A LOT of intermediate string.
       * This should be used when everything else fail.
       * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
       * @return {String} the result.
       */
      stringifyByChar: function(l) {
        for (var p = "", b = 0; b < l.length; b++)
          p += String.fromCharCode(l[b]);
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
    function s(l) {
      var p = 65536, b = e.getTypeOf(l), m = !0;
      if (b === "uint8array" ? m = u.applyCanBeUsed.uint8array : b === "nodebuffer" && (m = u.applyCanBeUsed.nodebuffer), m)
        for (; p > 1; )
          try {
            return u.stringifyByChunk(l, b, p);
          } catch {
            p = Math.floor(p / 2);
          }
      return u.stringifyByChar(l);
    }
    e.applyFromCharCode = s;
    function d(l, p) {
      for (var b = 0; b < l.length; b++)
        p[b] = l[b];
      return p;
    }
    var g = {};
    g.string = {
      string: o,
      array: function(l) {
        return c(l, new Array(l.length));
      },
      arraybuffer: function(l) {
        return g.string.uint8array(l).buffer;
      },
      uint8array: function(l) {
        return c(l, new Uint8Array(l.length));
      },
      nodebuffer: function(l) {
        return c(l, r.allocBuffer(l.length));
      }
    }, g.array = {
      string: s,
      array: o,
      arraybuffer: function(l) {
        return new Uint8Array(l).buffer;
      },
      uint8array: function(l) {
        return new Uint8Array(l);
      },
      nodebuffer: function(l) {
        return r.newBufferFrom(l);
      }
    }, g.arraybuffer = {
      string: function(l) {
        return s(new Uint8Array(l));
      },
      array: function(l) {
        return d(new Uint8Array(l), new Array(l.byteLength));
      },
      arraybuffer: o,
      uint8array: function(l) {
        return new Uint8Array(l);
      },
      nodebuffer: function(l) {
        return r.newBufferFrom(new Uint8Array(l));
      }
    }, g.uint8array = {
      string: s,
      array: function(l) {
        return d(l, new Array(l.length));
      },
      arraybuffer: function(l) {
        return l.buffer;
      },
      uint8array: o,
      nodebuffer: function(l) {
        return r.newBufferFrom(l);
      }
    }, g.nodebuffer = {
      string: s,
      array: function(l) {
        return d(l, new Array(l.length));
      },
      arraybuffer: function(l) {
        return g.nodebuffer.uint8array(l).buffer;
      },
      uint8array: function(l) {
        return d(l, new Uint8Array(l.length));
      },
      nodebuffer: o
    }, e.transformTo = function(l, p) {
      if (p || (p = ""), !l)
        return p;
      e.checkSupport(l);
      var b = e.getTypeOf(p), m = g[b][l](p);
      return m;
    }, e.resolve = function(l) {
      for (var p = l.split("/"), b = [], m = 0; m < p.length; m++) {
        var y = p[m];
        y === "." || y === "" && m !== 0 && m !== p.length - 1 || (y === ".." ? b.pop() : b.push(y));
      }
      return b.join("/");
    }, e.getTypeOf = function(l) {
      if (typeof l == "string")
        return "string";
      if (Object.prototype.toString.call(l) === "[object Array]")
        return "array";
      if (t.nodebuffer && r.isBuffer(l))
        return "nodebuffer";
      if (t.uint8array && l instanceof Uint8Array)
        return "uint8array";
      if (t.arraybuffer && l instanceof ArrayBuffer)
        return "arraybuffer";
    }, e.checkSupport = function(l) {
      var p = t[l.toLowerCase()];
      if (!p)
        throw new Error(l + " is not supported by this platform");
    }, e.MAX_VALUE_16BITS = 65535, e.MAX_VALUE_32BITS = -1, e.pretty = function(l) {
      var p = "", b, m;
      for (m = 0; m < (l || "").length; m++)
        b = l.charCodeAt(m), p += "\\x" + (b < 16 ? "0" : "") + b.toString(16).toUpperCase();
      return p;
    }, e.delay = function(l, p, b) {
      setImmediate(function() {
        l.apply(b || null, p || []);
      });
    }, e.inherits = function(l, p) {
      var b = function() {
      };
      b.prototype = p.prototype, l.prototype = new b();
    }, e.extend = function() {
      var l = {}, p, b;
      for (p = 0; p < arguments.length; p++)
        for (b in arguments[p])
          Object.prototype.hasOwnProperty.call(arguments[p], b) && typeof l[b] > "u" && (l[b] = arguments[p][b]);
      return l;
    }, e.prepareContent = function(l, p, b, m, y) {
      var h = i.Promise.resolve(p).then(function(f) {
        var v = t.blob && (f instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(f)) !== -1);
        return v && typeof FileReader < "u" ? new i.Promise(function(D, x) {
          var w = new FileReader();
          w.onload = function(E) {
            D(E.target.result);
          }, w.onerror = function(E) {
            x(E.target.error);
          }, w.readAsArrayBuffer(f);
        }) : f;
      });
      return h.then(function(f) {
        var v = e.getTypeOf(f);
        return v ? (v === "arraybuffer" ? f = e.transformTo("uint8array", f) : v === "string" && (y ? f = n.decode(f) : b && m !== !0 && (f = a(f))), f) : i.Promise.reject(
          new Error("Can't read the data of '" + l + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?")
        );
      });
    };
  }(Qc)), Qc;
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
var At = nb;
(function(e) {
  for (var t = Ae(), n = Be, r = Do, i = At, a = new Array(256), o = 0; o < 256; o++)
    a[o] = o >= 252 ? 6 : o >= 248 ? 5 : o >= 240 ? 4 : o >= 224 ? 3 : o >= 192 ? 2 : 1;
  a[254] = a[254] = 1;
  var c = function(l) {
    var p, b, m, y, h, f = l.length, v = 0;
    for (y = 0; y < f; y++)
      b = l.charCodeAt(y), (b & 64512) === 55296 && y + 1 < f && (m = l.charCodeAt(y + 1), (m & 64512) === 56320 && (b = 65536 + (b - 55296 << 10) + (m - 56320), y++)), v += b < 128 ? 1 : b < 2048 ? 2 : b < 65536 ? 3 : 4;
    for (n.uint8array ? p = new Uint8Array(v) : p = new Array(v), h = 0, y = 0; h < v; y++)
      b = l.charCodeAt(y), (b & 64512) === 55296 && y + 1 < f && (m = l.charCodeAt(y + 1), (m & 64512) === 56320 && (b = 65536 + (b - 55296 << 10) + (m - 56320), y++)), b < 128 ? p[h++] = b : b < 2048 ? (p[h++] = 192 | b >>> 6, p[h++] = 128 | b & 63) : b < 65536 ? (p[h++] = 224 | b >>> 12, p[h++] = 128 | b >>> 6 & 63, p[h++] = 128 | b & 63) : (p[h++] = 240 | b >>> 18, p[h++] = 128 | b >>> 12 & 63, p[h++] = 128 | b >>> 6 & 63, p[h++] = 128 | b & 63);
    return p;
  }, u = function(l, p) {
    var b;
    for (p = p || l.length, p > l.length && (p = l.length), b = p - 1; b >= 0 && (l[b] & 192) === 128; )
      b--;
    return b < 0 || b === 0 ? p : b + a[l[b]] > p ? b : p;
  }, s = function(l) {
    var p, b, m, y, h = l.length, f = new Array(h * 2);
    for (b = 0, p = 0; p < h; ) {
      if (m = l[p++], m < 128) {
        f[b++] = m;
        continue;
      }
      if (y = a[m], y > 4) {
        f[b++] = 65533, p += y - 1;
        continue;
      }
      for (m &= y === 2 ? 31 : y === 3 ? 15 : 7; y > 1 && p < h; )
        m = m << 6 | l[p++] & 63, y--;
      if (y > 1) {
        f[b++] = 65533;
        continue;
      }
      m < 65536 ? f[b++] = m : (m -= 65536, f[b++] = 55296 | m >> 10 & 1023, f[b++] = 56320 | m & 1023);
    }
    return f.length !== b && (f.subarray ? f = f.subarray(0, b) : f.length = b), t.applyFromCharCode(f);
  };
  e.utf8encode = function(p) {
    return n.nodebuffer ? r.newBufferFrom(p, "utf-8") : c(p);
  }, e.utf8decode = function(p) {
    return n.nodebuffer ? t.transformTo("nodebuffer", p).toString("utf-8") : (p = t.transformTo(n.uint8array ? "uint8array" : "array", p), s(p));
  };
  function d() {
    i.call(this, "utf-8 decode"), this.leftOver = null;
  }
  t.inherits(d, i), d.prototype.processChunk = function(l) {
    var p = t.transformTo(n.uint8array ? "uint8array" : "array", l.data);
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
      meta: l.meta
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
  t.inherits(g, i), g.prototype.processChunk = function(l) {
    this.push({
      data: e.utf8encode(l.data),
      meta: l.meta
    });
  }, e.Utf8EncodeWorker = g;
})(qr);
var rb = At, ib = Ae();
function Sd(e) {
  rb.call(this, "ConvertWorker to " + e), this.destType = e;
}
ib.inherits(Sd, rb);
Sd.prototype.processChunk = function(e) {
  this.push({
    data: ib.transformTo(this.destType, e.data),
    meta: e.meta
  });
};
var IT = Sd, hs, wh;
function NT() {
  if (wh) return hs;
  wh = 1;
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
  }, hs = n, hs;
}
var Pn = Ae(), LT = IT, MT = At, $T = tb(), PT = Be, zT = qi, ab = null;
if (PT.nodestream)
  try {
    ab = NT();
  } catch {
  }
function qT(e, t, n) {
  switch (e) {
    case "blob":
      return Pn.newBlob(Pn.transformTo("arraybuffer", t), n);
    case "base64":
      return $T.encode(t);
    default:
      return Pn.transformTo(e, t);
  }
}
function jT(e, t) {
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
function ZT(e, t) {
  return new zT.Promise(function(n, r) {
    var i = [], a = e._internalType, o = e._outputType, c = e._mimeType;
    e.on("data", function(u, s) {
      i.push(u), t && t(s);
    }).on("error", function(u) {
      i = [], r(u);
    }).on("end", function() {
      try {
        var u = qT(o, jT(a, i), c);
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
    this._internalType = r, this._outputType = t, this._mimeType = n, Pn.checkSupport(r), this._worker = e.pipe(new LT(r)), e.lock();
  } catch (i) {
    this._worker = new MT("error"), this._worker.error(i);
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
    return ZT(this, e);
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
      Pn.delay(t, arguments, n);
    }), this;
  },
  /**
   * Resume the flow of chunks.
   * @return {StreamHelper} the current helper.
   */
  resume: function() {
    return Pn.delay(this._worker.resume, [], this._worker), this;
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
    if (Pn.checkSupport("nodestream"), this._outputType !== "nodebuffer")
      throw new Error(this._outputType + " is not supported by this method");
    return new ab(this, {
      objectMode: this._outputType !== "nodebuffer"
    }, e);
  }
};
var cb = ob, Ct = {};
Ct.base64 = !1;
Ct.binary = !1;
Ct.dir = !1;
Ct.createFolders = !0;
Ct.date = null;
Ct.compression = null;
Ct.compressionOptions = null;
Ct.comment = null;
Ct.unixPermissions = null;
Ct.dosPermissions = null;
var xo = Ae(), _o = At, XT = 16 * 1024;
function jr(e) {
  _o.call(this, "DataWorker");
  var t = this;
  this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, e.then(function(n) {
    t.dataIsReady = !0, t.data = n, t.max = n && n.length || 0, t.type = xo.getTypeOf(n), t.isPaused || t._tickAndRepeat();
  }, function(n) {
    t.error(n);
  });
}
xo.inherits(jr, _o);
jr.prototype.cleanUp = function() {
  _o.prototype.cleanUp.call(this), this.data = null;
};
jr.prototype.resume = function() {
  return _o.prototype.resume.call(this) ? (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, xo.delay(this._tickAndRepeat, [], this)), !0) : !1;
};
jr.prototype._tickAndRepeat = function() {
  this._tickScheduled = !1, !(this.isPaused || this.isFinished) && (this._tick(), this.isFinished || (xo.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
};
jr.prototype._tick = function() {
  if (this.isPaused || this.isFinished)
    return !1;
  var e = XT, t = null, n = Math.min(this.max, this.index + e);
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
var sb = jr, HT = Ae();
function VT() {
  for (var e, t = [], n = 0; n < 256; n++) {
    e = n;
    for (var r = 0; r < 8; r++)
      e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
    t[n] = e;
  }
  return t;
}
var ub = VT();
function GT(e, t, n, r) {
  var i = ub, a = r + n;
  e = e ^ -1;
  for (var o = r; o < a; o++)
    e = e >>> 8 ^ i[(e ^ t[o]) & 255];
  return e ^ -1;
}
function YT(e, t, n, r) {
  var i = ub, a = r + n;
  e = e ^ -1;
  for (var o = r; o < a; o++)
    e = e >>> 8 ^ i[(e ^ t.charCodeAt(o)) & 255];
  return e ^ -1;
}
var kd = function(t, n) {
  if (typeof t > "u" || !t.length)
    return 0;
  var r = HT.getTypeOf(t) !== "string";
  return r ? GT(n | 0, t, t.length, 0) : YT(n | 0, t, t.length, 0);
}, db = At, KT = kd, JT = Ae();
function Bd() {
  db.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
}
JT.inherits(Bd, db);
Bd.prototype.processChunk = function(e) {
  this.streamInfo.crc32 = KT(e.data, this.streamInfo.crc32 || 0), this.push(e);
};
var lb = Bd, QT = Ae(), Rd = At;
function Od(e) {
  Rd.call(this, "DataLengthProbe for " + e), this.propName = e, this.withStreamInfo(e, 0);
}
QT.inherits(Od, Rd);
Od.prototype.processChunk = function(e) {
  if (e) {
    var t = this.streamInfo[this.propName] || 0;
    this.streamInfo[this.propName] = t + e.data.length;
  }
  Rd.prototype.processChunk.call(this, e);
};
var eU = Od, Th = qi, Uh = sb, tU = lb, vu = eU;
function Wd(e, t, n, r, i) {
  this.compressedSize = e, this.uncompressedSize = t, this.crc32 = n, this.compression = r, this.compressedContent = i;
}
Wd.prototype = {
  /**
   * Create a worker to get the uncompressed content.
   * @return {GenericWorker} the worker.
   */
  getContentWorker: function() {
    var e = new Uh(Th.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new vu("data_length")), t = this;
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
    return new Uh(Th.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
  }
};
Wd.createWorkerFrom = function(e, t, n) {
  return e.pipe(new tU()).pipe(new vu("uncompressedSize")).pipe(t.compressWorker(n)).pipe(new vu("compressedSize")).withStreamInfo("compression", t);
};
var Id = Wd, nU = cb, rU = sb, ps = qr, gs = Id, Eh = At, Nd = function(e, t, n) {
  this.name = e, this.dir = n.dir, this.date = n.date, this.comment = n.comment, this.unixPermissions = n.unixPermissions, this.dosPermissions = n.dosPermissions, this._data = t, this._dataBinary = n.binary, this.options = {
    compression: n.compression,
    compressionOptions: n.compressionOptions
  };
};
Nd.prototype = {
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
      i && !r && (t = t.pipe(new ps.Utf8EncodeWorker())), !i && r && (t = t.pipe(new ps.Utf8DecodeWorker()));
    } catch (a) {
      t = new Eh("error"), t.error(a);
    }
    return new nU(t, n, "");
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
    if (this._data instanceof gs && this._data.compression.magic === e.magic)
      return this._data.getCompressedWorker();
    var n = this._decompressWorker();
    return this._dataBinary || (n = n.pipe(new ps.Utf8EncodeWorker())), gs.createWorkerFrom(n, e, t);
  },
  /**
   * Return a worker for the decompressed content.
   * @private
   * @return Worker the worker.
   */
  _decompressWorker: function() {
    return this._data instanceof gs ? this._data.getContentWorker() : this._data instanceof Eh ? this._data : new rU(this._data);
  }
};
var Ah = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], iU = function() {
  throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
};
for (var ms = 0; ms < Ah.length; ms++)
  Nd.prototype[Ah[ms]] = iU;
var aU = Nd, fb = {}, wo = {}, To = {}, fn = {};
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
})(fn);
var ji = {}, Gt = {}, Zr = {}, oU = fn, cU = 4, Ch = 0, Fh = 1, sU = 2;
function Xr(e) {
  for (var t = e.length; --t >= 0; )
    e[t] = 0;
}
var uU = 0, hb = 1, dU = 2, lU = 3, fU = 258, Ld = 29, Zi = 256, Ui = Zi + 1 + Ld, Ar = 30, Md = 19, pb = 2 * Ui + 1, Nn = 15, bs = 16, hU = 7, $d = 256, gb = 16, mb = 17, bb = 18, Du = (
  /* extra bits for each length code */
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
), Ca = (
  /* extra bits for each distance code */
  [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
), pU = (
  /* extra bits for each bit length code */
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
), yb = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], gU = 512, cn = new Array((Ui + 2) * 2);
Xr(cn);
var di = new Array(Ar * 2);
Xr(di);
var Ei = new Array(gU);
Xr(Ei);
var Ai = new Array(fU - lU + 1);
Xr(Ai);
var Pd = new Array(Ld);
Xr(Pd);
var ja = new Array(Ar);
Xr(ja);
function ys(e, t, n, r, i) {
  this.static_tree = e, this.extra_bits = t, this.extra_base = n, this.elems = r, this.max_length = i, this.has_stree = e && e.length;
}
var vb, Db, xb;
function vs(e, t) {
  this.dyn_tree = e, this.max_code = 0, this.stat_desc = t;
}
function _b(e) {
  return e < 256 ? Ei[e] : Ei[256 + (e >>> 7)];
}
function Ci(e, t) {
  e.pending_buf[e.pending++] = t & 255, e.pending_buf[e.pending++] = t >>> 8 & 255;
}
function at(e, t, n) {
  e.bi_valid > bs - n ? (e.bi_buf |= t << e.bi_valid & 65535, Ci(e, e.bi_buf), e.bi_buf = t >> bs - e.bi_valid, e.bi_valid += n - bs) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += n);
}
function zt(e, t, n) {
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
function mU(e) {
  e.bi_valid === 16 ? (Ci(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = e.bi_buf & 255, e.bi_buf >>= 8, e.bi_valid -= 8);
}
function bU(e, t) {
  var n = t.dyn_tree, r = t.max_code, i = t.stat_desc.static_tree, a = t.stat_desc.has_stree, o = t.stat_desc.extra_bits, c = t.stat_desc.extra_base, u = t.stat_desc.max_length, s, d, g, l, p, b, m = 0;
  for (l = 0; l <= Nn; l++)
    e.bl_count[l] = 0;
  for (n[e.heap[e.heap_max] * 2 + 1] = 0, s = e.heap_max + 1; s < pb; s++)
    d = e.heap[s], l = n[n[d * 2 + 1] * 2 + 1] + 1, l > u && (l = u, m++), n[d * 2 + 1] = l, !(d > r) && (e.bl_count[l]++, p = 0, d >= c && (p = o[d - c]), b = n[d * 2], e.opt_len += b * (l + p), a && (e.static_len += b * (i[d * 2 + 1] + p)));
  if (m !== 0) {
    do {
      for (l = u - 1; e.bl_count[l] === 0; )
        l--;
      e.bl_count[l]--, e.bl_count[l + 1] += 2, e.bl_count[u]--, m -= 2;
    } while (m > 0);
    for (l = u; l !== 0; l--)
      for (d = e.bl_count[l]; d !== 0; )
        g = e.heap[--s], !(g > r) && (n[g * 2 + 1] !== l && (e.opt_len += (l - n[g * 2 + 1]) * n[g * 2], n[g * 2 + 1] = l), d--);
  }
}
function Tb(e, t, n) {
  var r = new Array(Nn + 1), i = 0, a, o;
  for (a = 1; a <= Nn; a++)
    r[a] = i = i + n[a - 1] << 1;
  for (o = 0; o <= t; o++) {
    var c = e[o * 2 + 1];
    c !== 0 && (e[o * 2] = wb(r[c]++, c));
  }
}
function yU() {
  var e, t, n, r, i, a = new Array(Nn + 1);
  for (n = 0, r = 0; r < Ld - 1; r++)
    for (Pd[r] = n, e = 0; e < 1 << Du[r]; e++)
      Ai[n++] = r;
  for (Ai[n - 1] = r, i = 0, r = 0; r < 16; r++)
    for (ja[r] = i, e = 0; e < 1 << Ca[r]; e++)
      Ei[i++] = r;
  for (i >>= 7; r < Ar; r++)
    for (ja[r] = i << 7, e = 0; e < 1 << Ca[r] - 7; e++)
      Ei[256 + i++] = r;
  for (t = 0; t <= Nn; t++)
    a[t] = 0;
  for (e = 0; e <= 143; )
    cn[e * 2 + 1] = 8, e++, a[8]++;
  for (; e <= 255; )
    cn[e * 2 + 1] = 9, e++, a[9]++;
  for (; e <= 279; )
    cn[e * 2 + 1] = 7, e++, a[7]++;
  for (; e <= 287; )
    cn[e * 2 + 1] = 8, e++, a[8]++;
  for (Tb(cn, Ui + 1, a), e = 0; e < Ar; e++)
    di[e * 2 + 1] = 5, di[e * 2] = wb(e, 5);
  vb = new ys(cn, Du, Zi + 1, Ui, Nn), Db = new ys(di, Ca, 0, Ar, Nn), xb = new ys(new Array(0), pU, 0, Md, hU);
}
function Ub(e) {
  var t;
  for (t = 0; t < Ui; t++)
    e.dyn_ltree[t * 2] = 0;
  for (t = 0; t < Ar; t++)
    e.dyn_dtree[t * 2] = 0;
  for (t = 0; t < Md; t++)
    e.bl_tree[t * 2] = 0;
  e.dyn_ltree[$d * 2] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0;
}
function Eb(e) {
  e.bi_valid > 8 ? Ci(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
}
function vU(e, t, n, r) {
  Eb(e), Ci(e, n), Ci(e, ~n), oU.arraySet(e.pending_buf, e.window, t, n, e.pending), e.pending += n;
}
function Sh(e, t, n, r) {
  var i = t * 2, a = n * 2;
  return e[i] < e[a] || e[i] === e[a] && r[t] <= r[n];
}
function Ds(e, t, n) {
  for (var r = e.heap[n], i = n << 1; i <= e.heap_len && (i < e.heap_len && Sh(t, e.heap[i + 1], e.heap[i], e.depth) && i++, !Sh(t, r, e.heap[i], e.depth)); )
    e.heap[n] = e.heap[i], n = i, i <<= 1;
  e.heap[n] = r;
}
function kh(e, t, n) {
  var r, i, a = 0, o, c;
  if (e.last_lit !== 0)
    do
      r = e.pending_buf[e.d_buf + a * 2] << 8 | e.pending_buf[e.d_buf + a * 2 + 1], i = e.pending_buf[e.l_buf + a], a++, r === 0 ? zt(e, i, t) : (o = Ai[i], zt(e, o + Zi + 1, t), c = Du[o], c !== 0 && (i -= Pd[o], at(e, i, c)), r--, o = _b(r), zt(e, o, n), c = Ca[o], c !== 0 && (r -= ja[o], at(e, r, c)));
    while (a < e.last_lit);
  zt(e, $d, t);
}
function xu(e, t) {
  var n = t.dyn_tree, r = t.stat_desc.static_tree, i = t.stat_desc.has_stree, a = t.stat_desc.elems, o, c, u = -1, s;
  for (e.heap_len = 0, e.heap_max = pb, o = 0; o < a; o++)
    n[o * 2] !== 0 ? (e.heap[++e.heap_len] = u = o, e.depth[o] = 0) : n[o * 2 + 1] = 0;
  for (; e.heap_len < 2; )
    s = e.heap[++e.heap_len] = u < 2 ? ++u : 0, n[s * 2] = 1, e.depth[s] = 0, e.opt_len--, i && (e.static_len -= r[s * 2 + 1]);
  for (t.max_code = u, o = e.heap_len >> 1; o >= 1; o--)
    Ds(e, n, o);
  s = a;
  do
    o = e.heap[
      1
      /*SMALLEST*/
    ], e.heap[
      1
      /*SMALLEST*/
    ] = e.heap[e.heap_len--], Ds(
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
    ] = s++, Ds(
      e,
      n,
      1
      /*SMALLEST*/
    );
  while (e.heap_len >= 2);
  e.heap[--e.heap_max] = e.heap[
    1
    /*SMALLEST*/
  ], bU(e, t), Tb(n, u, e.bl_count);
}
function Bh(e, t, n) {
  var r, i = -1, a, o = t[0 * 2 + 1], c = 0, u = 7, s = 4;
  for (o === 0 && (u = 138, s = 3), t[(n + 1) * 2 + 1] = 65535, r = 0; r <= n; r++)
    a = o, o = t[(r + 1) * 2 + 1], !(++c < u && a === o) && (c < s ? e.bl_tree[a * 2] += c : a !== 0 ? (a !== i && e.bl_tree[a * 2]++, e.bl_tree[gb * 2]++) : c <= 10 ? e.bl_tree[mb * 2]++ : e.bl_tree[bb * 2]++, c = 0, i = a, o === 0 ? (u = 138, s = 3) : a === o ? (u = 6, s = 3) : (u = 7, s = 4));
}
function Rh(e, t, n) {
  var r, i = -1, a, o = t[0 * 2 + 1], c = 0, u = 7, s = 4;
  for (o === 0 && (u = 138, s = 3), r = 0; r <= n; r++)
    if (a = o, o = t[(r + 1) * 2 + 1], !(++c < u && a === o)) {
      if (c < s)
        do
          zt(e, a, e.bl_tree);
        while (--c !== 0);
      else a !== 0 ? (a !== i && (zt(e, a, e.bl_tree), c--), zt(e, gb, e.bl_tree), at(e, c - 3, 2)) : c <= 10 ? (zt(e, mb, e.bl_tree), at(e, c - 3, 3)) : (zt(e, bb, e.bl_tree), at(e, c - 11, 7));
      c = 0, i = a, o === 0 ? (u = 138, s = 3) : a === o ? (u = 6, s = 3) : (u = 7, s = 4);
    }
}
function DU(e) {
  var t;
  for (Bh(e, e.dyn_ltree, e.l_desc.max_code), Bh(e, e.dyn_dtree, e.d_desc.max_code), xu(e, e.bl_desc), t = Md - 1; t >= 3 && e.bl_tree[yb[t] * 2 + 1] === 0; t--)
    ;
  return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t;
}
function xU(e, t, n, r) {
  var i;
  for (at(e, t - 257, 5), at(e, n - 1, 5), at(e, r - 4, 4), i = 0; i < r; i++)
    at(e, e.bl_tree[yb[i] * 2 + 1], 3);
  Rh(e, e.dyn_ltree, t - 1), Rh(e, e.dyn_dtree, n - 1);
}
function _U(e) {
  var t = 4093624447, n;
  for (n = 0; n <= 31; n++, t >>>= 1)
    if (t & 1 && e.dyn_ltree[n * 2] !== 0)
      return Ch;
  if (e.dyn_ltree[9 * 2] !== 0 || e.dyn_ltree[10 * 2] !== 0 || e.dyn_ltree[13 * 2] !== 0)
    return Fh;
  for (n = 32; n < Zi; n++)
    if (e.dyn_ltree[n * 2] !== 0)
      return Fh;
  return Ch;
}
var Oh = !1;
function wU(e) {
  Oh || (yU(), Oh = !0), e.l_desc = new vs(e.dyn_ltree, vb), e.d_desc = new vs(e.dyn_dtree, Db), e.bl_desc = new vs(e.bl_tree, xb), e.bi_buf = 0, e.bi_valid = 0, Ub(e);
}
function Ab(e, t, n, r) {
  at(e, (uU << 1) + (r ? 1 : 0), 3), vU(e, t, n);
}
function TU(e) {
  at(e, hb << 1, 3), zt(e, $d, cn), mU(e);
}
function UU(e, t, n, r) {
  var i, a, o = 0;
  e.level > 0 ? (e.strm.data_type === sU && (e.strm.data_type = _U(e)), xu(e, e.l_desc), xu(e, e.d_desc), o = DU(e), i = e.opt_len + 3 + 7 >>> 3, a = e.static_len + 3 + 7 >>> 3, a <= i && (i = a)) : i = a = n + 5, n + 4 <= i && t !== -1 ? Ab(e, t, n, r) : e.strategy === cU || a === i ? (at(e, (hb << 1) + (r ? 1 : 0), 3), kh(e, cn, di)) : (at(e, (dU << 1) + (r ? 1 : 0), 3), xU(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, o + 1), kh(e, e.dyn_ltree, e.dyn_dtree)), Ub(e), r && Eb(e);
}
function EU(e, t, n) {
  return e.pending_buf[e.d_buf + e.last_lit * 2] = t >>> 8 & 255, e.pending_buf[e.d_buf + e.last_lit * 2 + 1] = t & 255, e.pending_buf[e.l_buf + e.last_lit] = n & 255, e.last_lit++, t === 0 ? e.dyn_ltree[n * 2]++ : (e.matches++, t--, e.dyn_ltree[(Ai[n] + Zi + 1) * 2]++, e.dyn_dtree[_b(t) * 2]++), e.last_lit === e.lit_bufsize - 1;
}
Zr._tr_init = wU;
Zr._tr_stored_block = Ab;
Zr._tr_flush_block = UU;
Zr._tr_tally = EU;
Zr._tr_align = TU;
function AU(e, t, n, r) {
  for (var i = e & 65535 | 0, a = e >>> 16 & 65535 | 0, o = 0; n !== 0; ) {
    o = n > 2e3 ? 2e3 : n, n -= o;
    do
      i = i + t[r++] | 0, a = a + i | 0;
    while (--o);
    i %= 65521, a %= 65521;
  }
  return i | a << 16 | 0;
}
var Cb = AU;
function CU() {
  for (var e, t = [], n = 0; n < 256; n++) {
    e = n;
    for (var r = 0; r < 8; r++)
      e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
    t[n] = e;
  }
  return t;
}
var FU = CU();
function SU(e, t, n, r) {
  var i = FU, a = r + n;
  e ^= -1;
  for (var o = r; o < a; o++)
    e = e >>> 8 ^ i[(e ^ t[o]) & 255];
  return e ^ -1;
}
var Fb = SU, zd = {
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
}, et = fn, _t = Zr, Sb = Cb, vn = Fb, kU = zd, cr = 0, BU = 1, RU = 3, Un = 4, Wh = 5, qt = 0, Ih = 1, wt = -2, OU = -3, xs = -5, WU = -1, IU = 1, ha = 2, NU = 3, LU = 4, MU = 0, $U = 2, Uo = 8, PU = 9, zU = 15, qU = 8, jU = 29, ZU = 256, _u = ZU + 1 + jU, XU = 30, HU = 19, VU = 2 * _u + 1, GU = 15, de = 3, wn = 258, St = wn + de + 1, YU = 32, Eo = 42, wu = 69, Fa = 73, Sa = 91, ka = 103, Ln = 113, oi = 666, Re = 1, Xi = 2, Hn = 3, Hr = 4, KU = 3;
function Tn(e, t) {
  return e.msg = kU[t], t;
}
function Nh(e) {
  return (e << 1) - (e > 4 ? 9 : 0);
}
function _n(e) {
  for (var t = e.length; --t >= 0; )
    e[t] = 0;
}
function Dn(e) {
  var t = e.state, n = t.pending;
  n > e.avail_out && (n = e.avail_out), n !== 0 && (et.arraySet(e.output, t.pending_buf, t.pending_out, n, e.next_out), e.next_out += n, t.pending_out += n, e.total_out += n, e.avail_out -= n, t.pending -= n, t.pending === 0 && (t.pending_out = 0));
}
function qe(e, t) {
  _t._tr_flush_block(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, Dn(e.strm);
}
function fe(e, t) {
  e.pending_buf[e.pending++] = t;
}
function ti(e, t) {
  e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = t & 255;
}
function JU(e, t, n, r) {
  var i = e.avail_in;
  return i > r && (i = r), i === 0 ? 0 : (e.avail_in -= i, et.arraySet(t, e.input, e.next_in, i, n), e.state.wrap === 1 ? e.adler = Sb(e.adler, t, i, n) : e.state.wrap === 2 && (e.adler = vn(e.adler, t, i, n)), e.next_in += i, e.total_in += i, i);
}
function kb(e, t) {
  var n = e.max_chain_length, r = e.strstart, i, a, o = e.prev_length, c = e.nice_match, u = e.strstart > e.w_size - St ? e.strstart - (e.w_size - St) : 0, s = e.window, d = e.w_mask, g = e.prev, l = e.strstart + wn, p = s[r + o - 1], b = s[r + o];
  e.prev_length >= e.good_match && (n >>= 2), c > e.lookahead && (c = e.lookahead);
  do
    if (i = t, !(s[i + o] !== b || s[i + o - 1] !== p || s[i] !== s[r] || s[++i] !== s[r + 1])) {
      r += 2, i++;
      do
        ;
      while (s[++r] === s[++i] && s[++r] === s[++i] && s[++r] === s[++i] && s[++r] === s[++i] && s[++r] === s[++i] && s[++r] === s[++i] && s[++r] === s[++i] && s[++r] === s[++i] && r < l);
      if (a = wn - (l - r), r = l - wn, a > o) {
        if (e.match_start = t, o = a, a >= c)
          break;
        p = s[r + o - 1], b = s[r + o];
      }
    }
  while ((t = g[t & d]) > u && --n !== 0);
  return o <= e.lookahead ? o : e.lookahead;
}
function Vn(e) {
  var t = e.w_size, n, r, i, a, o;
  do {
    if (a = e.window_size - e.lookahead - e.strstart, e.strstart >= t + (t - St)) {
      et.arraySet(e.window, e.window, t, t, 0), e.match_start -= t, e.strstart -= t, e.block_start -= t, r = e.hash_size, n = r;
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
    if (r = JU(e.strm, e.window, e.strstart + e.lookahead, a), e.lookahead += r, e.lookahead + e.insert >= de)
      for (o = e.strstart - e.insert, e.ins_h = e.window[o], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + de - 1]) & e.hash_mask, e.prev[o & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = o, o++, e.insert--, !(e.lookahead + e.insert < de)); )
        ;
  } while (e.lookahead < St && e.strm.avail_in !== 0);
}
function QU(e, t) {
  var n = 65535;
  for (n > e.pending_buf_size - 5 && (n = e.pending_buf_size - 5); ; ) {
    if (e.lookahead <= 1) {
      if (Vn(e), e.lookahead === 0 && t === cr)
        return Re;
      if (e.lookahead === 0)
        break;
    }
    e.strstart += e.lookahead, e.lookahead = 0;
    var r = e.block_start + n;
    if ((e.strstart === 0 || e.strstart >= r) && (e.lookahead = e.strstart - r, e.strstart = r, qe(e, !1), e.strm.avail_out === 0) || e.strstart - e.block_start >= e.w_size - St && (qe(e, !1), e.strm.avail_out === 0))
      return Re;
  }
  return e.insert = 0, t === Un ? (qe(e, !0), e.strm.avail_out === 0 ? Hn : Hr) : (e.strstart > e.block_start && (qe(e, !1), e.strm.avail_out === 0), Re);
}
function _s(e, t) {
  for (var n, r; ; ) {
    if (e.lookahead < St) {
      if (Vn(e), e.lookahead < St && t === cr)
        return Re;
      if (e.lookahead === 0)
        break;
    }
    if (n = 0, e.lookahead >= de && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + de - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), n !== 0 && e.strstart - n <= e.w_size - St && (e.match_length = kb(e, n)), e.match_length >= de)
      if (r = _t._tr_tally(e, e.strstart - e.match_start, e.match_length - de), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= de) {
        e.match_length--;
        do
          e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + de - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart;
        while (--e.match_length !== 0);
        e.strstart++;
      } else
        e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
    else
      r = _t._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
    if (r && (qe(e, !1), e.strm.avail_out === 0))
      return Re;
  }
  return e.insert = e.strstart < de - 1 ? e.strstart : de - 1, t === Un ? (qe(e, !0), e.strm.avail_out === 0 ? Hn : Hr) : e.last_lit && (qe(e, !1), e.strm.avail_out === 0) ? Re : Xi;
}
function pr(e, t) {
  for (var n, r, i; ; ) {
    if (e.lookahead < St) {
      if (Vn(e), e.lookahead < St && t === cr)
        return Re;
      if (e.lookahead === 0)
        break;
    }
    if (n = 0, e.lookahead >= de && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + de - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = de - 1, n !== 0 && e.prev_length < e.max_lazy_match && e.strstart - n <= e.w_size - St && (e.match_length = kb(e, n), e.match_length <= 5 && (e.strategy === IU || e.match_length === de && e.strstart - e.match_start > 4096) && (e.match_length = de - 1)), e.prev_length >= de && e.match_length <= e.prev_length) {
      i = e.strstart + e.lookahead - de, r = _t._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - de), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
      do
        ++e.strstart <= i && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + de - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart);
      while (--e.prev_length !== 0);
      if (e.match_available = 0, e.match_length = de - 1, e.strstart++, r && (qe(e, !1), e.strm.avail_out === 0))
        return Re;
    } else if (e.match_available) {
      if (r = _t._tr_tally(e, 0, e.window[e.strstart - 1]), r && qe(e, !1), e.strstart++, e.lookahead--, e.strm.avail_out === 0)
        return Re;
    } else
      e.match_available = 1, e.strstart++, e.lookahead--;
  }
  return e.match_available && (r = _t._tr_tally(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < de - 1 ? e.strstart : de - 1, t === Un ? (qe(e, !0), e.strm.avail_out === 0 ? Hn : Hr) : e.last_lit && (qe(e, !1), e.strm.avail_out === 0) ? Re : Xi;
}
function eE(e, t) {
  for (var n, r, i, a, o = e.window; ; ) {
    if (e.lookahead <= wn) {
      if (Vn(e), e.lookahead <= wn && t === cr)
        return Re;
      if (e.lookahead === 0)
        break;
    }
    if (e.match_length = 0, e.lookahead >= de && e.strstart > 0 && (i = e.strstart - 1, r = o[i], r === o[++i] && r === o[++i] && r === o[++i])) {
      a = e.strstart + wn;
      do
        ;
      while (r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && i < a);
      e.match_length = wn - (a - i), e.match_length > e.lookahead && (e.match_length = e.lookahead);
    }
    if (e.match_length >= de ? (n = _t._tr_tally(e, 1, e.match_length - de), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (n = _t._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), n && (qe(e, !1), e.strm.avail_out === 0))
      return Re;
  }
  return e.insert = 0, t === Un ? (qe(e, !0), e.strm.avail_out === 0 ? Hn : Hr) : e.last_lit && (qe(e, !1), e.strm.avail_out === 0) ? Re : Xi;
}
function tE(e, t) {
  for (var n; ; ) {
    if (e.lookahead === 0 && (Vn(e), e.lookahead === 0)) {
      if (t === cr)
        return Re;
      break;
    }
    if (e.match_length = 0, n = _t._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, n && (qe(e, !1), e.strm.avail_out === 0))
      return Re;
  }
  return e.insert = 0, t === Un ? (qe(e, !0), e.strm.avail_out === 0 ? Hn : Hr) : e.last_lit && (qe(e, !1), e.strm.avail_out === 0) ? Re : Xi;
}
function Mt(e, t, n, r, i) {
  this.good_length = e, this.max_lazy = t, this.nice_length = n, this.max_chain = r, this.func = i;
}
var xr;
xr = [
  /*      good lazy nice chain */
  new Mt(0, 0, 0, 0, QU),
  /* 0 store only */
  new Mt(4, 4, 8, 4, _s),
  /* 1 max speed, no lazy matches */
  new Mt(4, 5, 16, 8, _s),
  /* 2 */
  new Mt(4, 6, 32, 32, _s),
  /* 3 */
  new Mt(4, 4, 16, 16, pr),
  /* 4 lazy matches */
  new Mt(8, 16, 32, 32, pr),
  /* 5 */
  new Mt(8, 16, 128, 128, pr),
  /* 6 */
  new Mt(8, 32, 128, 256, pr),
  /* 7 */
  new Mt(32, 128, 258, 1024, pr),
  /* 8 */
  new Mt(32, 258, 258, 4096, pr)
  /* 9 max compression */
];
function nE(e) {
  e.window_size = 2 * e.w_size, _n(e.head), e.max_lazy_match = xr[e.level].max_lazy, e.good_match = xr[e.level].good_length, e.nice_match = xr[e.level].nice_length, e.max_chain_length = xr[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = de - 1, e.match_available = 0, e.ins_h = 0;
}
function rE() {
  this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = Uo, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new et.Buf16(VU * 2), this.dyn_dtree = new et.Buf16((2 * XU + 1) * 2), this.bl_tree = new et.Buf16((2 * HU + 1) * 2), _n(this.dyn_ltree), _n(this.dyn_dtree), _n(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new et.Buf16(GU + 1), this.heap = new et.Buf16(2 * _u + 1), _n(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new et.Buf16(2 * _u + 1), _n(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
}
function Bb(e) {
  var t;
  return !e || !e.state ? Tn(e, wt) : (e.total_in = e.total_out = 0, e.data_type = $U, t = e.state, t.pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap ? Eo : Ln, e.adler = t.wrap === 2 ? 0 : 1, t.last_flush = cr, _t._tr_init(t), qt);
}
function Rb(e) {
  var t = Bb(e);
  return t === qt && nE(e.state), t;
}
function iE(e, t) {
  return !e || !e.state || e.state.wrap !== 2 ? wt : (e.state.gzhead = t, qt);
}
function Ob(e, t, n, r, i, a) {
  if (!e)
    return wt;
  var o = 1;
  if (t === WU && (t = 6), r < 0 ? (o = 0, r = -r) : r > 15 && (o = 2, r -= 16), i < 1 || i > PU || n !== Uo || r < 8 || r > 15 || t < 0 || t > 9 || a < 0 || a > LU)
    return Tn(e, wt);
  r === 8 && (r = 9);
  var c = new rE();
  return e.state = c, c.strm = e, c.wrap = o, c.gzhead = null, c.w_bits = r, c.w_size = 1 << c.w_bits, c.w_mask = c.w_size - 1, c.hash_bits = i + 7, c.hash_size = 1 << c.hash_bits, c.hash_mask = c.hash_size - 1, c.hash_shift = ~~((c.hash_bits + de - 1) / de), c.window = new et.Buf8(c.w_size * 2), c.head = new et.Buf16(c.hash_size), c.prev = new et.Buf16(c.w_size), c.lit_bufsize = 1 << i + 6, c.pending_buf_size = c.lit_bufsize * 4, c.pending_buf = new et.Buf8(c.pending_buf_size), c.d_buf = 1 * c.lit_bufsize, c.l_buf = 3 * c.lit_bufsize, c.level = t, c.strategy = a, c.method = n, Rb(e);
}
function aE(e, t) {
  return Ob(e, t, Uo, zU, qU, MU);
}
function oE(e, t) {
  var n, r, i, a;
  if (!e || !e.state || t > Wh || t < 0)
    return e ? Tn(e, wt) : wt;
  if (r = e.state, !e.output || !e.input && e.avail_in !== 0 || r.status === oi && t !== Un)
    return Tn(e, e.avail_out === 0 ? xs : wt);
  if (r.strm = e, n = r.last_flush, r.last_flush = t, r.status === Eo)
    if (r.wrap === 2)
      e.adler = 0, fe(r, 31), fe(r, 139), fe(r, 8), r.gzhead ? (fe(
        r,
        (r.gzhead.text ? 1 : 0) + (r.gzhead.hcrc ? 2 : 0) + (r.gzhead.extra ? 4 : 0) + (r.gzhead.name ? 8 : 0) + (r.gzhead.comment ? 16 : 0)
      ), fe(r, r.gzhead.time & 255), fe(r, r.gzhead.time >> 8 & 255), fe(r, r.gzhead.time >> 16 & 255), fe(r, r.gzhead.time >> 24 & 255), fe(r, r.level === 9 ? 2 : r.strategy >= ha || r.level < 2 ? 4 : 0), fe(r, r.gzhead.os & 255), r.gzhead.extra && r.gzhead.extra.length && (fe(r, r.gzhead.extra.length & 255), fe(r, r.gzhead.extra.length >> 8 & 255)), r.gzhead.hcrc && (e.adler = vn(e.adler, r.pending_buf, r.pending, 0)), r.gzindex = 0, r.status = wu) : (fe(r, 0), fe(r, 0), fe(r, 0), fe(r, 0), fe(r, 0), fe(r, r.level === 9 ? 2 : r.strategy >= ha || r.level < 2 ? 4 : 0), fe(r, KU), r.status = Ln);
    else {
      var o = Uo + (r.w_bits - 8 << 4) << 8, c = -1;
      r.strategy >= ha || r.level < 2 ? c = 0 : r.level < 6 ? c = 1 : r.level === 6 ? c = 2 : c = 3, o |= c << 6, r.strstart !== 0 && (o |= YU), o += 31 - o % 31, r.status = Ln, ti(r, o), r.strstart !== 0 && (ti(r, e.adler >>> 16), ti(r, e.adler & 65535)), e.adler = 1;
    }
  if (r.status === wu)
    if (r.gzhead.extra) {
      for (i = r.pending; r.gzindex < (r.gzhead.extra.length & 65535) && !(r.pending === r.pending_buf_size && (r.gzhead.hcrc && r.pending > i && (e.adler = vn(e.adler, r.pending_buf, r.pending - i, i)), Dn(e), i = r.pending, r.pending === r.pending_buf_size)); )
        fe(r, r.gzhead.extra[r.gzindex] & 255), r.gzindex++;
      r.gzhead.hcrc && r.pending > i && (e.adler = vn(e.adler, r.pending_buf, r.pending - i, i)), r.gzindex === r.gzhead.extra.length && (r.gzindex = 0, r.status = Fa);
    } else
      r.status = Fa;
  if (r.status === Fa)
    if (r.gzhead.name) {
      i = r.pending;
      do {
        if (r.pending === r.pending_buf_size && (r.gzhead.hcrc && r.pending > i && (e.adler = vn(e.adler, r.pending_buf, r.pending - i, i)), Dn(e), i = r.pending, r.pending === r.pending_buf_size)) {
          a = 1;
          break;
        }
        r.gzindex < r.gzhead.name.length ? a = r.gzhead.name.charCodeAt(r.gzindex++) & 255 : a = 0, fe(r, a);
      } while (a !== 0);
      r.gzhead.hcrc && r.pending > i && (e.adler = vn(e.adler, r.pending_buf, r.pending - i, i)), a === 0 && (r.gzindex = 0, r.status = Sa);
    } else
      r.status = Sa;
  if (r.status === Sa)
    if (r.gzhead.comment) {
      i = r.pending;
      do {
        if (r.pending === r.pending_buf_size && (r.gzhead.hcrc && r.pending > i && (e.adler = vn(e.adler, r.pending_buf, r.pending - i, i)), Dn(e), i = r.pending, r.pending === r.pending_buf_size)) {
          a = 1;
          break;
        }
        r.gzindex < r.gzhead.comment.length ? a = r.gzhead.comment.charCodeAt(r.gzindex++) & 255 : a = 0, fe(r, a);
      } while (a !== 0);
      r.gzhead.hcrc && r.pending > i && (e.adler = vn(e.adler, r.pending_buf, r.pending - i, i)), a === 0 && (r.status = ka);
    } else
      r.status = ka;
  if (r.status === ka && (r.gzhead.hcrc ? (r.pending + 2 > r.pending_buf_size && Dn(e), r.pending + 2 <= r.pending_buf_size && (fe(r, e.adler & 255), fe(r, e.adler >> 8 & 255), e.adler = 0, r.status = Ln)) : r.status = Ln), r.pending !== 0) {
    if (Dn(e), e.avail_out === 0)
      return r.last_flush = -1, qt;
  } else if (e.avail_in === 0 && Nh(t) <= Nh(n) && t !== Un)
    return Tn(e, xs);
  if (r.status === oi && e.avail_in !== 0)
    return Tn(e, xs);
  if (e.avail_in !== 0 || r.lookahead !== 0 || t !== cr && r.status !== oi) {
    var u = r.strategy === ha ? tE(r, t) : r.strategy === NU ? eE(r, t) : xr[r.level].func(r, t);
    if ((u === Hn || u === Hr) && (r.status = oi), u === Re || u === Hn)
      return e.avail_out === 0 && (r.last_flush = -1), qt;
    if (u === Xi && (t === BU ? _t._tr_align(r) : t !== Wh && (_t._tr_stored_block(r, 0, 0, !1), t === RU && (_n(r.head), r.lookahead === 0 && (r.strstart = 0, r.block_start = 0, r.insert = 0))), Dn(e), e.avail_out === 0))
      return r.last_flush = -1, qt;
  }
  return t !== Un ? qt : r.wrap <= 0 ? Ih : (r.wrap === 2 ? (fe(r, e.adler & 255), fe(r, e.adler >> 8 & 255), fe(r, e.adler >> 16 & 255), fe(r, e.adler >> 24 & 255), fe(r, e.total_in & 255), fe(r, e.total_in >> 8 & 255), fe(r, e.total_in >> 16 & 255), fe(r, e.total_in >> 24 & 255)) : (ti(r, e.adler >>> 16), ti(r, e.adler & 65535)), Dn(e), r.wrap > 0 && (r.wrap = -r.wrap), r.pending !== 0 ? qt : Ih);
}
function cE(e) {
  var t;
  return !e || !e.state ? wt : (t = e.state.status, t !== Eo && t !== wu && t !== Fa && t !== Sa && t !== ka && t !== Ln && t !== oi ? Tn(e, wt) : (e.state = null, t === Ln ? Tn(e, OU) : qt));
}
function sE(e, t) {
  var n = t.length, r, i, a, o, c, u, s, d;
  if (!e || !e.state || (r = e.state, o = r.wrap, o === 2 || o === 1 && r.status !== Eo || r.lookahead))
    return wt;
  for (o === 1 && (e.adler = Sb(e.adler, t, n, 0)), r.wrap = 0, n >= r.w_size && (o === 0 && (_n(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0), d = new et.Buf8(r.w_size), et.arraySet(d, t, n - r.w_size, r.w_size, 0), t = d, n = r.w_size), c = e.avail_in, u = e.next_in, s = e.input, e.avail_in = n, e.next_in = 0, e.input = t, Vn(r); r.lookahead >= de; ) {
    i = r.strstart, a = r.lookahead - (de - 1);
    do
      r.ins_h = (r.ins_h << r.hash_shift ^ r.window[i + de - 1]) & r.hash_mask, r.prev[i & r.w_mask] = r.head[r.ins_h], r.head[r.ins_h] = i, i++;
    while (--a);
    r.strstart = i, r.lookahead = de - 1, Vn(r);
  }
  return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = de - 1, r.match_available = 0, e.next_in = u, e.input = s, e.avail_in = c, r.wrap = o, qt;
}
Gt.deflateInit = aE;
Gt.deflateInit2 = Ob;
Gt.deflateReset = Rb;
Gt.deflateResetKeep = Bb;
Gt.deflateSetHeader = iE;
Gt.deflate = oE;
Gt.deflateEnd = cE;
Gt.deflateSetDictionary = sE;
Gt.deflateInfo = "pako deflate (from Nodeca project)";
var sr = {}, Ao = fn, Wb = !0, Ib = !0;
try {
  String.fromCharCode.apply(null, [0]);
} catch {
  Wb = !1;
}
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  Ib = !1;
}
var Fi = new Ao.Buf8(256);
for (var gn = 0; gn < 256; gn++)
  Fi[gn] = gn >= 252 ? 6 : gn >= 248 ? 5 : gn >= 240 ? 4 : gn >= 224 ? 3 : gn >= 192 ? 2 : 1;
Fi[254] = Fi[254] = 1;
sr.string2buf = function(e) {
  var t, n, r, i, a, o = e.length, c = 0;
  for (i = 0; i < o; i++)
    n = e.charCodeAt(i), (n & 64512) === 55296 && i + 1 < o && (r = e.charCodeAt(i + 1), (r & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++)), c += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
  for (t = new Ao.Buf8(c), a = 0, i = 0; a < c; i++)
    n = e.charCodeAt(i), (n & 64512) === 55296 && i + 1 < o && (r = e.charCodeAt(i + 1), (r & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++)), n < 128 ? t[a++] = n : n < 2048 ? (t[a++] = 192 | n >>> 6, t[a++] = 128 | n & 63) : n < 65536 ? (t[a++] = 224 | n >>> 12, t[a++] = 128 | n >>> 6 & 63, t[a++] = 128 | n & 63) : (t[a++] = 240 | n >>> 18, t[a++] = 128 | n >>> 12 & 63, t[a++] = 128 | n >>> 6 & 63, t[a++] = 128 | n & 63);
  return t;
};
function Nb(e, t) {
  if (t < 65534 && (e.subarray && Ib || !e.subarray && Wb))
    return String.fromCharCode.apply(null, Ao.shrinkBuf(e, t));
  for (var n = "", r = 0; r < t; r++)
    n += String.fromCharCode(e[r]);
  return n;
}
sr.buf2binstring = function(e) {
  return Nb(e, e.length);
};
sr.binstring2buf = function(e) {
  for (var t = new Ao.Buf8(e.length), n = 0, r = t.length; n < r; n++)
    t[n] = e.charCodeAt(n);
  return t;
};
sr.buf2string = function(e, t) {
  var n, r, i, a, o = t || e.length, c = new Array(o * 2);
  for (r = 0, n = 0; n < o; ) {
    if (i = e[n++], i < 128) {
      c[r++] = i;
      continue;
    }
    if (a = Fi[i], a > 4) {
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
sr.utf8border = function(e, t) {
  var n;
  for (t = t || e.length, t > e.length && (t = e.length), n = t - 1; n >= 0 && (e[n] & 192) === 128; )
    n--;
  return n < 0 || n === 0 ? t : n + Fi[e[n]] > t ? n : t;
};
function uE() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var Lb = uE, li = Gt, fi = fn, Tu = sr, Uu = zd, dE = Lb, Mb = Object.prototype.toString, lE = 0, ws = 4, Cr = 0, Lh = 1, Mh = 2, fE = -1, hE = 0, pE = 8;
function Gn(e) {
  if (!(this instanceof Gn)) return new Gn(e);
  this.options = fi.assign({
    level: fE,
    method: pE,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: hE,
    to: ""
  }, e || {});
  var t = this.options;
  t.raw && t.windowBits > 0 ? t.windowBits = -t.windowBits : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new dE(), this.strm.avail_out = 0;
  var n = li.deflateInit2(
    this.strm,
    t.level,
    t.method,
    t.windowBits,
    t.memLevel,
    t.strategy
  );
  if (n !== Cr)
    throw new Error(Uu[n]);
  if (t.header && li.deflateSetHeader(this.strm, t.header), t.dictionary) {
    var r;
    if (typeof t.dictionary == "string" ? r = Tu.string2buf(t.dictionary) : Mb.call(t.dictionary) === "[object ArrayBuffer]" ? r = new Uint8Array(t.dictionary) : r = t.dictionary, n = li.deflateSetDictionary(this.strm, r), n !== Cr)
      throw new Error(Uu[n]);
    this._dict_set = !0;
  }
}
Gn.prototype.push = function(e, t) {
  var n = this.strm, r = this.options.chunkSize, i, a;
  if (this.ended)
    return !1;
  a = t === ~~t ? t : t === !0 ? ws : lE, typeof e == "string" ? n.input = Tu.string2buf(e) : Mb.call(e) === "[object ArrayBuffer]" ? n.input = new Uint8Array(e) : n.input = e, n.next_in = 0, n.avail_in = n.input.length;
  do {
    if (n.avail_out === 0 && (n.output = new fi.Buf8(r), n.next_out = 0, n.avail_out = r), i = li.deflate(n, a), i !== Lh && i !== Cr)
      return this.onEnd(i), this.ended = !0, !1;
    (n.avail_out === 0 || n.avail_in === 0 && (a === ws || a === Mh)) && (this.options.to === "string" ? this.onData(Tu.buf2binstring(fi.shrinkBuf(n.output, n.next_out))) : this.onData(fi.shrinkBuf(n.output, n.next_out)));
  } while ((n.avail_in > 0 || n.avail_out === 0) && i !== Lh);
  return a === ws ? (i = li.deflateEnd(this.strm), this.onEnd(i), this.ended = !0, i === Cr) : (a === Mh && (this.onEnd(Cr), n.avail_out = 0), !0);
};
Gn.prototype.onData = function(e) {
  this.chunks.push(e);
};
Gn.prototype.onEnd = function(e) {
  e === Cr && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = fi.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
function qd(e, t) {
  var n = new Gn(t);
  if (n.push(e, !0), n.err)
    throw n.msg || Uu[n.err];
  return n.result;
}
function gE(e, t) {
  return t = t || {}, t.raw = !0, qd(e, t);
}
function mE(e, t) {
  return t = t || {}, t.gzip = !0, qd(e, t);
}
ji.Deflate = Gn;
ji.deflate = qd;
ji.deflateRaw = gE;
ji.gzip = mE;
var Hi = {}, Wt = {}, pa = 30, bE = 12, yE = function(t, n) {
  var r, i, a, o, c, u, s, d, g, l, p, b, m, y, h, f, v, D, x, w, E, S, I, q, $;
  r = t.state, i = t.next_in, q = t.input, a = i + (t.avail_in - 5), o = t.next_out, $ = t.output, c = o - (n - t.avail_out), u = o + (t.avail_out - 257), s = r.dmax, d = r.wsize, g = r.whave, l = r.wnext, p = r.window, b = r.hold, m = r.bits, y = r.lencode, h = r.distcode, f = (1 << r.lenbits) - 1, v = (1 << r.distbits) - 1;
  e:
    do {
      m < 15 && (b += q[i++] << m, m += 8, b += q[i++] << m, m += 8), D = y[b & f];
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
                    t.msg = "invalid distance too far back", r.mode = pa;
                    break e;
                  }
                  if (b >>>= x, m -= x, x = o - c, E > x) {
                    if (x = E - x, x > g && r.sane) {
                      t.msg = "invalid distance too far back", r.mode = pa;
                      break e;
                    }
                    if (S = 0, I = p, l === 0) {
                      if (S += d - x, x < w) {
                        w -= x;
                        do
                          $[o++] = p[S++];
                        while (--x);
                        S = o - E, I = $;
                      }
                    } else if (l < x) {
                      if (S += d + l - x, x -= l, x < w) {
                        w -= x;
                        do
                          $[o++] = p[S++];
                        while (--x);
                        if (S = 0, l < w) {
                          x = l, w -= x;
                          do
                            $[o++] = p[S++];
                          while (--x);
                          S = o - E, I = $;
                        }
                      }
                    } else if (S += l - x, x < w) {
                      w -= x;
                      do
                        $[o++] = p[S++];
                      while (--x);
                      S = o - E, I = $;
                    }
                    for (; w > 2; )
                      $[o++] = I[S++], $[o++] = I[S++], $[o++] = I[S++], w -= 3;
                    w && ($[o++] = I[S++], w > 1 && ($[o++] = I[S++]));
                  } else {
                    S = o - E;
                    do
                      $[o++] = $[S++], $[o++] = $[S++], $[o++] = $[S++], w -= 3;
                    while (w > 2);
                    w && ($[o++] = $[S++], w > 1 && ($[o++] = $[S++]));
                  }
                } else if (x & 64) {
                  t.msg = "invalid distance code", r.mode = pa;
                  break e;
                } else {
                  D = h[(D & 65535) + (b & (1 << x) - 1)];
                  continue n;
                }
                break;
              }
          } else if (x & 64)
            if (x & 32) {
              r.mode = bE;
              break e;
            } else {
              t.msg = "invalid literal/length code", r.mode = pa;
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
}, $h = fn, gr = 15, Ph = 852, zh = 592, qh = 0, Ts = 1, jh = 2, vE = [
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
], DE = [
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
], xE = [
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
], _E = [
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
], wE = function(t, n, r, i, a, o, c, u) {
  var s = u.bits, d = 0, g = 0, l = 0, p = 0, b = 0, m = 0, y = 0, h = 0, f = 0, v = 0, D, x, w, E, S, I = null, q = 0, $, R = new $h.Buf16(gr + 1), P = new $h.Buf16(gr + 1), G = null, Q = 0, A, T, _;
  for (d = 0; d <= gr; d++)
    R[d] = 0;
  for (g = 0; g < i; g++)
    R[n[r + g]]++;
  for (b = s, p = gr; p >= 1 && R[p] === 0; p--)
    ;
  if (b > p && (b = p), p === 0)
    return a[o++] = 1 << 24 | 64 << 16 | 0, a[o++] = 1 << 24 | 64 << 16 | 0, u.bits = 1, 0;
  for (l = 1; l < p && R[l] === 0; l++)
    ;
  for (b < l && (b = l), h = 1, d = 1; d <= gr; d++)
    if (h <<= 1, h -= R[d], h < 0)
      return -1;
  if (h > 0 && (t === qh || p !== 1))
    return -1;
  for (P[1] = 0, d = 1; d < gr; d++)
    P[d + 1] = P[d] + R[d];
  for (g = 0; g < i; g++)
    n[r + g] !== 0 && (c[P[n[r + g]]++] = g);
  if (t === qh ? (I = G = c, $ = 19) : t === Ts ? (I = vE, q -= 257, G = DE, Q -= 257, $ = 256) : (I = xE, G = _E, $ = -1), v = 0, g = 0, d = l, S = o, m = b, y = 0, w = -1, f = 1 << b, E = f - 1, t === Ts && f > Ph || t === jh && f > zh)
    return 1;
  for (; ; ) {
    A = d - y, c[g] < $ ? (T = 0, _ = c[g]) : c[g] > $ ? (T = G[Q + c[g]], _ = I[q + c[g]]) : (T = 96, _ = 0), D = 1 << d - y, x = 1 << m, l = x;
    do
      x -= D, a[S + (v >> y) + x] = A << 24 | T << 16 | _ | 0;
    while (x !== 0);
    for (D = 1 << d - 1; v & D; )
      D >>= 1;
    if (D !== 0 ? (v &= D - 1, v += D) : v = 0, g++, --R[d] === 0) {
      if (d === p)
        break;
      d = n[r + c[g]];
    }
    if (d > b && (v & E) !== w) {
      for (y === 0 && (y = b), S += l, m = d - y, h = 1 << m; m + y < p && (h -= R[m + y], !(h <= 0)); )
        m++, h <<= 1;
      if (f += 1 << m, t === Ts && f > Ph || t === jh && f > zh)
        return 1;
      w = v & E, a[w] = b << 24 | m << 16 | S - o | 0;
    }
  }
  return v !== 0 && (a[S + v] = d - y << 24 | 64 << 16 | 0), u.bits = b, 0;
}, pt = fn, Eu = Cb, $t = Fb, TE = yE, hi = wE, UE = 0, $b = 1, Pb = 2, Zh = 4, EE = 5, ga = 6, Yn = 0, AE = 1, CE = 2, Ut = -2, zb = -3, qb = -4, FE = -5, Xh = 8, jb = 1, Hh = 2, Vh = 3, Gh = 4, Yh = 5, Kh = 6, Jh = 7, Qh = 8, ep = 9, tp = 10, Za = 11, tn = 12, Us = 13, np = 14, Es = 15, rp = 16, ip = 17, ap = 18, op = 19, ma = 20, ba = 21, cp = 22, sp = 23, up = 24, dp = 25, lp = 26, As = 27, fp = 28, hp = 29, xe = 30, Zb = 31, SE = 32, kE = 852, BE = 592, RE = 15, OE = RE;
function pp(e) {
  return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((e & 65280) << 8) + ((e & 255) << 24);
}
function WE() {
  this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new pt.Buf16(320), this.work = new pt.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
function Xb(e) {
  var t;
  return !e || !e.state ? Ut : (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = t.wrap & 1), t.mode = jb, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new pt.Buf32(kE), t.distcode = t.distdyn = new pt.Buf32(BE), t.sane = 1, t.back = -1, Yn);
}
function Hb(e) {
  var t;
  return !e || !e.state ? Ut : (t = e.state, t.wsize = 0, t.whave = 0, t.wnext = 0, Xb(e));
}
function Vb(e, t) {
  var n, r;
  return !e || !e.state || (r = e.state, t < 0 ? (n = 0, t = -t) : (n = (t >> 4) + 1, t < 48 && (t &= 15)), t && (t < 8 || t > 15)) ? Ut : (r.window !== null && r.wbits !== t && (r.window = null), r.wrap = n, r.wbits = t, Hb(e));
}
function Gb(e, t) {
  var n, r;
  return e ? (r = new WE(), e.state = r, r.window = null, n = Vb(e, t), n !== Yn && (e.state = null), n) : Ut;
}
function IE(e) {
  return Gb(e, OE);
}
var gp = !0, Cs, Fs;
function NE(e) {
  if (gp) {
    var t;
    for (Cs = new pt.Buf32(512), Fs = new pt.Buf32(32), t = 0; t < 144; )
      e.lens[t++] = 8;
    for (; t < 256; )
      e.lens[t++] = 9;
    for (; t < 280; )
      e.lens[t++] = 7;
    for (; t < 288; )
      e.lens[t++] = 8;
    for (hi($b, e.lens, 0, 288, Cs, 0, e.work, { bits: 9 }), t = 0; t < 32; )
      e.lens[t++] = 5;
    hi(Pb, e.lens, 0, 32, Fs, 0, e.work, { bits: 5 }), gp = !1;
  }
  e.lencode = Cs, e.lenbits = 9, e.distcode = Fs, e.distbits = 5;
}
function Yb(e, t, n, r) {
  var i, a = e.state;
  return a.window === null && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new pt.Buf8(a.wsize)), r >= a.wsize ? (pt.arraySet(a.window, t, n - a.wsize, a.wsize, 0), a.wnext = 0, a.whave = a.wsize) : (i = a.wsize - a.wnext, i > r && (i = r), pt.arraySet(a.window, t, n - r, i, a.wnext), r -= i, r ? (pt.arraySet(a.window, t, n - r, r, 0), a.wnext = r, a.whave = a.wsize) : (a.wnext += i, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += i))), 0;
}
function LE(e, t) {
  var n, r, i, a, o, c, u, s, d, g, l, p, b, m, y = 0, h, f, v, D, x, w, E, S, I = new pt.Buf8(4), q, $, R = (
    /* permutation of code lengths */
    [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
  );
  if (!e || !e.state || !e.output || !e.input && e.avail_in !== 0)
    return Ut;
  n = e.state, n.mode === tn && (n.mode = Us), o = e.next_out, i = e.output, u = e.avail_out, a = e.next_in, r = e.input, c = e.avail_in, s = n.hold, d = n.bits, g = c, l = u, S = Yn;
  e:
    for (; ; )
      switch (n.mode) {
        case jb:
          if (n.wrap === 0) {
            n.mode = Us;
            break;
          }
          for (; d < 16; ) {
            if (c === 0)
              break e;
            c--, s += r[a++] << d, d += 8;
          }
          if (n.wrap & 2 && s === 35615) {
            n.check = 0, I[0] = s & 255, I[1] = s >>> 8 & 255, n.check = $t(n.check, I, 2, 0), s = 0, d = 0, n.mode = Hh;
            break;
          }
          if (n.flags = 0, n.head && (n.head.done = !1), !(n.wrap & 1) || /* check if zlib header allowed */
          (((s & 255) << 8) + (s >> 8)) % 31) {
            e.msg = "incorrect header check", n.mode = xe;
            break;
          }
          if ((s & 15) !== Xh) {
            e.msg = "unknown compression method", n.mode = xe;
            break;
          }
          if (s >>>= 4, d -= 4, E = (s & 15) + 8, n.wbits === 0)
            n.wbits = E;
          else if (E > n.wbits) {
            e.msg = "invalid window size", n.mode = xe;
            break;
          }
          n.dmax = 1 << E, e.adler = n.check = 1, n.mode = s & 512 ? tp : tn, s = 0, d = 0;
          break;
        case Hh:
          for (; d < 16; ) {
            if (c === 0)
              break e;
            c--, s += r[a++] << d, d += 8;
          }
          if (n.flags = s, (n.flags & 255) !== Xh) {
            e.msg = "unknown compression method", n.mode = xe;
            break;
          }
          if (n.flags & 57344) {
            e.msg = "unknown header flags set", n.mode = xe;
            break;
          }
          n.head && (n.head.text = s >> 8 & 1), n.flags & 512 && (I[0] = s & 255, I[1] = s >>> 8 & 255, n.check = $t(n.check, I, 2, 0)), s = 0, d = 0, n.mode = Vh;
        case Vh:
          for (; d < 32; ) {
            if (c === 0)
              break e;
            c--, s += r[a++] << d, d += 8;
          }
          n.head && (n.head.time = s), n.flags & 512 && (I[0] = s & 255, I[1] = s >>> 8 & 255, I[2] = s >>> 16 & 255, I[3] = s >>> 24 & 255, n.check = $t(n.check, I, 4, 0)), s = 0, d = 0, n.mode = Gh;
        case Gh:
          for (; d < 16; ) {
            if (c === 0)
              break e;
            c--, s += r[a++] << d, d += 8;
          }
          n.head && (n.head.xflags = s & 255, n.head.os = s >> 8), n.flags & 512 && (I[0] = s & 255, I[1] = s >>> 8 & 255, n.check = $t(n.check, I, 2, 0)), s = 0, d = 0, n.mode = Yh;
        case Yh:
          if (n.flags & 1024) {
            for (; d < 16; ) {
              if (c === 0)
                break e;
              c--, s += r[a++] << d, d += 8;
            }
            n.length = s, n.head && (n.head.extra_len = s), n.flags & 512 && (I[0] = s & 255, I[1] = s >>> 8 & 255, n.check = $t(n.check, I, 2, 0)), s = 0, d = 0;
          } else n.head && (n.head.extra = null);
          n.mode = Kh;
        case Kh:
          if (n.flags & 1024 && (p = n.length, p > c && (p = c), p && (n.head && (E = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Array(n.head.extra_len)), pt.arraySet(
            n.head.extra,
            r,
            a,
            // extra field is limited to 65536 bytes
            // - no need for additional size check
            p,
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            E
          )), n.flags & 512 && (n.check = $t(n.check, r, p, a)), c -= p, a += p, n.length -= p), n.length))
            break e;
          n.length = 0, n.mode = Jh;
        case Jh:
          if (n.flags & 2048) {
            if (c === 0)
              break e;
            p = 0;
            do
              E = r[a + p++], n.head && E && n.length < 65536 && (n.head.name += String.fromCharCode(E));
            while (E && p < c);
            if (n.flags & 512 && (n.check = $t(n.check, r, p, a)), c -= p, a += p, E)
              break e;
          } else n.head && (n.head.name = null);
          n.length = 0, n.mode = Qh;
        case Qh:
          if (n.flags & 4096) {
            if (c === 0)
              break e;
            p = 0;
            do
              E = r[a + p++], n.head && E && n.length < 65536 && (n.head.comment += String.fromCharCode(E));
            while (E && p < c);
            if (n.flags & 512 && (n.check = $t(n.check, r, p, a)), c -= p, a += p, E)
              break e;
          } else n.head && (n.head.comment = null);
          n.mode = ep;
        case ep:
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
          n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), e.adler = n.check = 0, n.mode = tn;
          break;
        case tp:
          for (; d < 32; ) {
            if (c === 0)
              break e;
            c--, s += r[a++] << d, d += 8;
          }
          e.adler = n.check = pp(s), s = 0, d = 0, n.mode = Za;
        case Za:
          if (n.havedict === 0)
            return e.next_out = o, e.avail_out = u, e.next_in = a, e.avail_in = c, n.hold = s, n.bits = d, CE;
          e.adler = n.check = 1, n.mode = tn;
        case tn:
          if (t === EE || t === ga)
            break e;
        case Us:
          if (n.last) {
            s >>>= d & 7, d -= d & 7, n.mode = As;
            break;
          }
          for (; d < 3; ) {
            if (c === 0)
              break e;
            c--, s += r[a++] << d, d += 8;
          }
          switch (n.last = s & 1, s >>>= 1, d -= 1, s & 3) {
            case 0:
              n.mode = np;
              break;
            case 1:
              if (NE(n), n.mode = ma, t === ga) {
                s >>>= 2, d -= 2;
                break e;
              }
              break;
            case 2:
              n.mode = ip;
              break;
            case 3:
              e.msg = "invalid block type", n.mode = xe;
          }
          s >>>= 2, d -= 2;
          break;
        case np:
          for (s >>>= d & 7, d -= d & 7; d < 32; ) {
            if (c === 0)
              break e;
            c--, s += r[a++] << d, d += 8;
          }
          if ((s & 65535) !== (s >>> 16 ^ 65535)) {
            e.msg = "invalid stored block lengths", n.mode = xe;
            break;
          }
          if (n.length = s & 65535, s = 0, d = 0, n.mode = Es, t === ga)
            break e;
        case Es:
          n.mode = rp;
        case rp:
          if (p = n.length, p) {
            if (p > c && (p = c), p > u && (p = u), p === 0)
              break e;
            pt.arraySet(i, r, a, p, o), c -= p, a += p, u -= p, o += p, n.length -= p;
            break;
          }
          n.mode = tn;
          break;
        case ip:
          for (; d < 14; ) {
            if (c === 0)
              break e;
            c--, s += r[a++] << d, d += 8;
          }
          if (n.nlen = (s & 31) + 257, s >>>= 5, d -= 5, n.ndist = (s & 31) + 1, s >>>= 5, d -= 5, n.ncode = (s & 15) + 4, s >>>= 4, d -= 4, n.nlen > 286 || n.ndist > 30) {
            e.msg = "too many length or distance symbols", n.mode = xe;
            break;
          }
          n.have = 0, n.mode = ap;
        case ap:
          for (; n.have < n.ncode; ) {
            for (; d < 3; ) {
              if (c === 0)
                break e;
              c--, s += r[a++] << d, d += 8;
            }
            n.lens[R[n.have++]] = s & 7, s >>>= 3, d -= 3;
          }
          for (; n.have < 19; )
            n.lens[R[n.have++]] = 0;
          if (n.lencode = n.lendyn, n.lenbits = 7, q = { bits: n.lenbits }, S = hi(UE, n.lens, 0, 19, n.lencode, 0, n.work, q), n.lenbits = q.bits, S) {
            e.msg = "invalid code lengths set", n.mode = xe;
            break;
          }
          n.have = 0, n.mode = op;
        case op:
          for (; n.have < n.nlen + n.ndist; ) {
            for (; y = n.lencode[s & (1 << n.lenbits) - 1], h = y >>> 24, f = y >>> 16 & 255, v = y & 65535, !(h <= d); ) {
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
          if (n.lenbits = 9, q = { bits: n.lenbits }, S = hi($b, n.lens, 0, n.nlen, n.lencode, 0, n.work, q), n.lenbits = q.bits, S) {
            e.msg = "invalid literal/lengths set", n.mode = xe;
            break;
          }
          if (n.distbits = 6, n.distcode = n.distdyn, q = { bits: n.distbits }, S = hi(Pb, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, q), n.distbits = q.bits, S) {
            e.msg = "invalid distances set", n.mode = xe;
            break;
          }
          if (n.mode = ma, t === ga)
            break e;
        case ma:
          n.mode = ba;
        case ba:
          if (c >= 6 && u >= 258) {
            e.next_out = o, e.avail_out = u, e.next_in = a, e.avail_in = c, n.hold = s, n.bits = d, TE(e, l), o = e.next_out, i = e.output, u = e.avail_out, a = e.next_in, r = e.input, c = e.avail_in, s = n.hold, d = n.bits, n.mode === tn && (n.back = -1);
            break;
          }
          for (n.back = 0; y = n.lencode[s & (1 << n.lenbits) - 1], h = y >>> 24, f = y >>> 16 & 255, v = y & 65535, !(h <= d); ) {
            if (c === 0)
              break e;
            c--, s += r[a++] << d, d += 8;
          }
          if (f && !(f & 240)) {
            for (D = h, x = f, w = v; y = n.lencode[w + ((s & (1 << D + x) - 1) >> D)], h = y >>> 24, f = y >>> 16 & 255, v = y & 65535, !(D + h <= d); ) {
              if (c === 0)
                break e;
              c--, s += r[a++] << d, d += 8;
            }
            s >>>= D, d -= D, n.back += D;
          }
          if (s >>>= h, d -= h, n.back += h, n.length = v, f === 0) {
            n.mode = lp;
            break;
          }
          if (f & 32) {
            n.back = -1, n.mode = tn;
            break;
          }
          if (f & 64) {
            e.msg = "invalid literal/length code", n.mode = xe;
            break;
          }
          n.extra = f & 15, n.mode = cp;
        case cp:
          if (n.extra) {
            for ($ = n.extra; d < $; ) {
              if (c === 0)
                break e;
              c--, s += r[a++] << d, d += 8;
            }
            n.length += s & (1 << n.extra) - 1, s >>>= n.extra, d -= n.extra, n.back += n.extra;
          }
          n.was = n.length, n.mode = sp;
        case sp:
          for (; y = n.distcode[s & (1 << n.distbits) - 1], h = y >>> 24, f = y >>> 16 & 255, v = y & 65535, !(h <= d); ) {
            if (c === 0)
              break e;
            c--, s += r[a++] << d, d += 8;
          }
          if (!(f & 240)) {
            for (D = h, x = f, w = v; y = n.distcode[w + ((s & (1 << D + x) - 1) >> D)], h = y >>> 24, f = y >>> 16 & 255, v = y & 65535, !(D + h <= d); ) {
              if (c === 0)
                break e;
              c--, s += r[a++] << d, d += 8;
            }
            s >>>= D, d -= D, n.back += D;
          }
          if (s >>>= h, d -= h, n.back += h, f & 64) {
            e.msg = "invalid distance code", n.mode = xe;
            break;
          }
          n.offset = v, n.extra = f & 15, n.mode = up;
        case up:
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
          n.mode = dp;
        case dp:
          if (u === 0)
            break e;
          if (p = l - u, n.offset > p) {
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
          n.length === 0 && (n.mode = ba);
          break;
        case lp:
          if (u === 0)
            break e;
          i[o++] = n.length, u--, n.mode = ba;
          break;
        case As:
          if (n.wrap) {
            for (; d < 32; ) {
              if (c === 0)
                break e;
              c--, s |= r[a++] << d, d += 8;
            }
            if (l -= u, e.total_out += l, n.total += l, l && (e.adler = n.check = /*UPDATE(state.check, put - _out, _out);*/
            n.flags ? $t(n.check, i, l, o - l) : Eu(n.check, i, l, o - l)), l = u, (n.flags ? s : pp(s)) !== n.check) {
              e.msg = "incorrect data check", n.mode = xe;
              break;
            }
            s = 0, d = 0;
          }
          n.mode = fp;
        case fp:
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
          n.mode = hp;
        case hp:
          S = AE;
          break e;
        case xe:
          S = zb;
          break e;
        case Zb:
          return qb;
        case SE:
        default:
          return Ut;
      }
  return e.next_out = o, e.avail_out = u, e.next_in = a, e.avail_in = c, n.hold = s, n.bits = d, (n.wsize || l !== e.avail_out && n.mode < xe && (n.mode < As || t !== Zh)) && Yb(e, e.output, e.next_out, l - e.avail_out), g -= e.avail_in, l -= e.avail_out, e.total_in += g, e.total_out += l, n.total += l, n.wrap && l && (e.adler = n.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
  n.flags ? $t(n.check, i, l, e.next_out - l) : Eu(n.check, i, l, e.next_out - l)), e.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === tn ? 128 : 0) + (n.mode === ma || n.mode === Es ? 256 : 0), (g === 0 && l === 0 || t === Zh) && S === Yn && (S = FE), S;
}
function ME(e) {
  if (!e || !e.state)
    return Ut;
  var t = e.state;
  return t.window && (t.window = null), e.state = null, Yn;
}
function $E(e, t) {
  var n;
  return !e || !e.state || (n = e.state, !(n.wrap & 2)) ? Ut : (n.head = t, t.done = !1, Yn);
}
function PE(e, t) {
  var n = t.length, r, i, a;
  return !e || !e.state || (r = e.state, r.wrap !== 0 && r.mode !== Za) ? Ut : r.mode === Za && (i = 1, i = Eu(i, t, n, 0), i !== r.check) ? zb : (a = Yb(e, t, n, n), a ? (r.mode = Zb, qb) : (r.havedict = 1, Yn));
}
Wt.inflateReset = Hb;
Wt.inflateReset2 = Vb;
Wt.inflateResetKeep = Xb;
Wt.inflateInit = IE;
Wt.inflateInit2 = Gb;
Wt.inflate = LE;
Wt.inflateEnd = ME;
Wt.inflateGetHeader = $E;
Wt.inflateSetDictionary = PE;
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
function zE() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var qE = zE, Fr = Wt, pi = fn, Ba = sr, Ce = Kb, Au = zd, jE = Lb, ZE = qE, Jb = Object.prototype.toString;
function Kn(e) {
  if (!(this instanceof Kn)) return new Kn(e);
  this.options = pi.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ""
  }, e || {});
  var t = this.options;
  t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, t.windowBits === 0 && (t.windowBits = -15)), t.windowBits >= 0 && t.windowBits < 16 && !(e && e.windowBits) && (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && (t.windowBits & 15 || (t.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new jE(), this.strm.avail_out = 0;
  var n = Fr.inflateInit2(
    this.strm,
    t.windowBits
  );
  if (n !== Ce.Z_OK)
    throw new Error(Au[n]);
  if (this.header = new ZE(), Fr.inflateGetHeader(this.strm, this.header), t.dictionary && (typeof t.dictionary == "string" ? t.dictionary = Ba.string2buf(t.dictionary) : Jb.call(t.dictionary) === "[object ArrayBuffer]" && (t.dictionary = new Uint8Array(t.dictionary)), t.raw && (n = Fr.inflateSetDictionary(this.strm, t.dictionary), n !== Ce.Z_OK)))
    throw new Error(Au[n]);
}
Kn.prototype.push = function(e, t) {
  var n = this.strm, r = this.options.chunkSize, i = this.options.dictionary, a, o, c, u, s, d = !1;
  if (this.ended)
    return !1;
  o = t === ~~t ? t : t === !0 ? Ce.Z_FINISH : Ce.Z_NO_FLUSH, typeof e == "string" ? n.input = Ba.binstring2buf(e) : Jb.call(e) === "[object ArrayBuffer]" ? n.input = new Uint8Array(e) : n.input = e, n.next_in = 0, n.avail_in = n.input.length;
  do {
    if (n.avail_out === 0 && (n.output = new pi.Buf8(r), n.next_out = 0, n.avail_out = r), a = Fr.inflate(n, Ce.Z_NO_FLUSH), a === Ce.Z_NEED_DICT && i && (a = Fr.inflateSetDictionary(this.strm, i)), a === Ce.Z_BUF_ERROR && d === !0 && (a = Ce.Z_OK, d = !1), a !== Ce.Z_STREAM_END && a !== Ce.Z_OK)
      return this.onEnd(a), this.ended = !0, !1;
    n.next_out && (n.avail_out === 0 || a === Ce.Z_STREAM_END || n.avail_in === 0 && (o === Ce.Z_FINISH || o === Ce.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (c = Ba.utf8border(n.output, n.next_out), u = n.next_out - c, s = Ba.buf2string(n.output, c), n.next_out = u, n.avail_out = r - u, u && pi.arraySet(n.output, n.output, c, u, 0), this.onData(s)) : this.onData(pi.shrinkBuf(n.output, n.next_out))), n.avail_in === 0 && n.avail_out === 0 && (d = !0);
  } while ((n.avail_in > 0 || n.avail_out === 0) && a !== Ce.Z_STREAM_END);
  return a === Ce.Z_STREAM_END && (o = Ce.Z_FINISH), o === Ce.Z_FINISH ? (a = Fr.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, a === Ce.Z_OK) : (o === Ce.Z_SYNC_FLUSH && (this.onEnd(Ce.Z_OK), n.avail_out = 0), !0);
};
Kn.prototype.onData = function(e) {
  this.chunks.push(e);
};
Kn.prototype.onEnd = function(e) {
  e === Ce.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = pi.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
function jd(e, t) {
  var n = new Kn(t);
  if (n.push(e, !0), n.err)
    throw n.msg || Au[n.err];
  return n.result;
}
function XE(e, t) {
  return t = t || {}, t.raw = !0, jd(e, t);
}
Hi.Inflate = Kn;
Hi.inflate = jd;
Hi.inflateRaw = XE;
Hi.ungzip = jd;
var HE = fn.assign, VE = ji, GE = Hi, YE = Kb, Qb = {};
HE(Qb, VE, GE, YE);
var KE = Qb, JE = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", QE = KE, ey = Ae(), Co = At, e3 = JE ? "uint8array" : "array";
To.magic = "\b\0";
function ur(e, t) {
  Co.call(this, "FlateWorker/" + e), this._pako = null, this._pakoAction = e, this._pakoOptions = t, this.meta = {};
}
ey.inherits(ur, Co);
ur.prototype.processChunk = function(e) {
  this.meta = e.meta, this._pako === null && this._createPako(), this._pako.push(ey.transformTo(e3, e.data), !1);
};
ur.prototype.flush = function() {
  Co.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
};
ur.prototype.cleanUp = function() {
  Co.prototype.cleanUp.call(this), this._pako = null;
};
ur.prototype._createPako = function() {
  this._pako = new QE[this._pakoAction]({
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
To.compressWorker = function(e) {
  return new ur("Deflate", e);
};
To.uncompressWorker = function() {
  return new ur("Inflate", {});
};
var mp = At;
wo.STORE = {
  magic: "\0\0",
  compressWorker: function() {
    return new mp("STORE compression");
  },
  uncompressWorker: function() {
    return new mp("STORE decompression");
  }
};
wo.DEFLATE = To;
var Bn = {};
Bn.LOCAL_FILE_HEADER = "PK";
Bn.CENTRAL_FILE_HEADER = "PK";
Bn.CENTRAL_DIRECTORY_END = "PK";
Bn.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07";
Bn.ZIP64_CENTRAL_DIRECTORY_END = "PK";
Bn.DATA_DESCRIPTOR = "PK\x07\b";
var _r = Ae(), Vr = At, Ss = qr, bp = kd, Xa = Bn, me = function(e, t) {
  var n = "", r;
  for (r = 0; r < t; r++)
    n += String.fromCharCode(e & 255), e = e >>> 8;
  return n;
}, t3 = function(e, t) {
  var n = e;
  return e || (n = t ? 16893 : 33204), (n & 65535) << 16;
}, n3 = function(e) {
  return (e || 0) & 63;
}, ty = function(e, t, n, r, i, a) {
  var o = e.file, c = e.compression, u = a !== Ss.utf8encode, s = _r.transformTo("string", a(o.name)), d = _r.transformTo("string", Ss.utf8encode(o.name)), g = o.comment, l = _r.transformTo("string", a(g)), p = _r.transformTo("string", Ss.utf8encode(g)), b = d.length !== o.name.length, m = p.length !== g.length, y, h, f = "", v = "", D = "", x = o.dir, w = o.date, E = {
    crc32: 0,
    compressedSize: 0,
    uncompressedSize: 0
  };
  (!t || n) && (E.crc32 = e.crc32, E.compressedSize = e.compressedSize, E.uncompressedSize = e.uncompressedSize);
  var S = 0;
  t && (S |= 8), !u && (b || m) && (S |= 2048);
  var I = 0, q = 0;
  x && (I |= 16), i === "UNIX" ? (q = 798, I |= t3(o.unixPermissions, x)) : (q = 20, I |= n3(o.dosPermissions)), y = w.getUTCHours(), y = y << 6, y = y | w.getUTCMinutes(), y = y << 5, y = y | w.getUTCSeconds() / 2, h = w.getUTCFullYear() - 1980, h = h << 4, h = h | w.getUTCMonth() + 1, h = h << 5, h = h | w.getUTCDate(), b && (v = // Version
  me(1, 1) + // NameCRC32
  me(bp(s), 4) + // UnicodeName
  d, f += // Info-ZIP Unicode Path Extra Field
  "up" + // size
  me(v.length, 2) + // content
  v), m && (D = // Version
  me(1, 1) + // CommentCRC32
  me(bp(l), 4) + // UnicodeName
  p, f += // Info-ZIP Unicode Path Extra Field
  "uc" + // size
  me(D.length, 2) + // content
  D);
  var $ = "";
  $ += `
\0`, $ += me(S, 2), $ += c.magic, $ += me(y, 2), $ += me(h, 2), $ += me(E.crc32, 4), $ += me(E.compressedSize, 4), $ += me(E.uncompressedSize, 4), $ += me(s.length, 2), $ += me(f.length, 2);
  var R = Xa.LOCAL_FILE_HEADER + $ + s + f, P = Xa.CENTRAL_FILE_HEADER + // version made by (00: DOS)
  me(q, 2) + // file header (common to file and central directory)
  $ + // file comment length
  me(l.length, 2) + // disk number start
  "\0\0\0\0" + // external file attributes
  me(I, 4) + // relative offset of local header
  me(r, 4) + // file name
  s + // extra field
  f + // file comment
  l;
  return {
    fileRecord: R,
    dirRecord: P
  };
}, r3 = function(e, t, n, r, i) {
  var a = "", o = _r.transformTo("string", i(r));
  return a = Xa.CENTRAL_DIRECTORY_END + // number of this disk
  "\0\0\0\0" + // total number of entries in the central directory on this disk
  me(e, 2) + // total number of entries in the central directory
  me(e, 2) + // size of the central directory   4 bytes
  me(t, 4) + // offset of start of central directory with respect to the starting disk number
  me(n, 4) + // .ZIP file comment length
  me(o.length, 2) + // .ZIP file comment
  o, a;
}, i3 = function(e) {
  var t = "";
  return t = Xa.DATA_DESCRIPTOR + // crc-32                          4 bytes
  me(e.crc32, 4) + // compressed size                 4 bytes
  me(e.compressedSize, 4) + // uncompressed size               4 bytes
  me(e.uncompressedSize, 4), t;
};
function It(e, t, n, r) {
  Vr.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t, this.zipPlatform = n, this.encodeFileName = r, this.streamFiles = e, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
}
_r.inherits(It, Vr);
It.prototype.push = function(e) {
  var t = e.meta.percent || 0, n = this.entriesCount, r = this._sources.length;
  this.accumulate ? this.contentBuffer.push(e) : (this.bytesWritten += e.data.length, Vr.prototype.push.call(this, {
    data: e.data,
    meta: {
      currentFile: this.currentFile,
      percent: n ? (t + 100 * (n - r - 1)) / n : 100
    }
  }));
};
It.prototype.openedSource = function(e) {
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
It.prototype.closedSource = function(e) {
  this.accumulate = !1;
  var t = this.streamFiles && !e.file.dir, n = ty(e, t, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
  if (this.dirRecords.push(n.dirRecord), t)
    this.push({
      data: i3(e),
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
It.prototype.flush = function() {
  for (var e = this.bytesWritten, t = 0; t < this.dirRecords.length; t++)
    this.push({
      data: this.dirRecords[t],
      meta: { percent: 100 }
    });
  var n = this.bytesWritten - e, r = r3(this.dirRecords.length, n, e, this.zipComment, this.encodeFileName);
  this.push({
    data: r,
    meta: { percent: 100 }
  });
};
It.prototype.prepareNextSource = function() {
  this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
};
It.prototype.registerPrevious = function(e) {
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
It.prototype.resume = function() {
  if (!Vr.prototype.resume.call(this))
    return !1;
  if (!this.previous && this._sources.length)
    return this.prepareNextSource(), !0;
  if (!this.previous && !this._sources.length && !this.generatedError)
    return this.end(), !0;
};
It.prototype.error = function(e) {
  var t = this._sources;
  if (!Vr.prototype.error.call(this, e))
    return !1;
  for (var n = 0; n < t.length; n++)
    try {
      t[n].error(e);
    } catch {
    }
  return !0;
};
It.prototype.lock = function() {
  Vr.prototype.lock.call(this);
  for (var e = this._sources, t = 0; t < e.length; t++)
    e[t].lock();
};
var a3 = It, o3 = wo, c3 = a3, s3 = function(e, t) {
  var n = e || t, r = o3[n];
  if (!r)
    throw new Error(n + " is not a valid compression method !");
  return r;
};
fb.generateWorker = function(e, t, n) {
  var r = new c3(t.streamFiles, n, t.platform, t.encodeFileName), i = 0;
  try {
    e.forEach(function(a, o) {
      i++;
      var c = s3(o.options.compression, t.compression), u = o.options.compressionOptions || t.compressionOptions || {}, s = o.dir, d = o.date;
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
var u3 = Ae(), Fo = At;
function Vi(e, t) {
  Fo.call(this, "Nodejs stream input adapter for " + e), this._upstreamEnded = !1, this._bindStream(t);
}
u3.inherits(Vi, Fo);
Vi.prototype._bindStream = function(e) {
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
Vi.prototype.pause = function() {
  return Fo.prototype.pause.call(this) ? (this._stream.pause(), !0) : !1;
};
Vi.prototype.resume = function() {
  return Fo.prototype.resume.call(this) ? (this._upstreamEnded ? this.end() : this._stream.resume(), !0) : !1;
};
var d3 = Vi, l3 = qr, gi = Ae(), ny = At, f3 = cb, ry = Ct, yp = Id, h3 = aU, p3 = fb, vp = Do, g3 = d3, iy = function(e, t, n) {
  var r = gi.getTypeOf(t), i, a = gi.extend(n || {}, ry);
  a.date = a.date || /* @__PURE__ */ new Date(), a.compression !== null && (a.compression = a.compression.toUpperCase()), typeof a.unixPermissions == "string" && (a.unixPermissions = parseInt(a.unixPermissions, 8)), a.unixPermissions && a.unixPermissions & 16384 && (a.dir = !0), a.dosPermissions && a.dosPermissions & 16 && (a.dir = !0), a.dir && (e = ay(e)), a.createFolders && (i = m3(e)) && oy.call(this, i, !0);
  var o = r === "string" && a.binary === !1 && a.base64 === !1;
  (!n || typeof n.binary > "u") && (a.binary = !o);
  var c = t instanceof yp && t.uncompressedSize === 0;
  (c || a.dir || !t || t.length === 0) && (a.base64 = !1, a.binary = !0, t = "", a.compression = "STORE", r = "string");
  var u = null;
  t instanceof yp || t instanceof ny ? u = t : vp.isNode && vp.isStream(t) ? u = new g3(e, t) : u = gi.prepareContent(e, t, a.binary, a.optimizedBinaryString, a.base64);
  var s = new h3(e, u, a);
  this.files[e] = s;
}, m3 = function(e) {
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
function Dp(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}
var b3 = {
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
      if (Dp(e)) {
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
    if (Dp(e))
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
      if (n = gi.extend(e || {}, {
        streamFiles: !1,
        compression: "STORE",
        compressionOptions: null,
        type: "",
        platform: "DOS",
        comment: null,
        mimeType: "application/zip",
        encodeFileName: l3.utf8encode
      }), n.type = n.type.toLowerCase(), n.compression = n.compression.toUpperCase(), n.type === "binarystring" && (n.type = "string"), !n.type)
        throw new Error("No output type specified.");
      gi.checkSupport(n.type), (n.platform === "darwin" || n.platform === "freebsd" || n.platform === "linux" || n.platform === "sunos") && (n.platform = "UNIX"), n.platform === "win32" && (n.platform = "DOS");
      var r = n.comment || this.comment || "";
      t = p3.generateWorker(this, n, r);
    } catch (i) {
      t = new ny("error"), t.error(i);
    }
    return new f3(t, n.type || "string", n.mimeType);
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
}, y3 = b3, v3 = Ae();
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
    return v3.transformTo("string", this.readData(e));
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
var sy = cy, uy = sy, D3 = Ae();
function Gr(e) {
  uy.call(this, e);
  for (var t = 0; t < this.data.length; t++)
    e[t] = e[t] & 255;
}
D3.inherits(Gr, uy);
Gr.prototype.byteAt = function(e) {
  return this.data[this.zero + e];
};
Gr.prototype.lastIndexOfSignature = function(e) {
  for (var t = e.charCodeAt(0), n = e.charCodeAt(1), r = e.charCodeAt(2), i = e.charCodeAt(3), a = this.length - 4; a >= 0; --a)
    if (this.data[a] === t && this.data[a + 1] === n && this.data[a + 2] === r && this.data[a + 3] === i)
      return a - this.zero;
  return -1;
};
Gr.prototype.readAndCheckSignature = function(e) {
  var t = e.charCodeAt(0), n = e.charCodeAt(1), r = e.charCodeAt(2), i = e.charCodeAt(3), a = this.readData(4);
  return t === a[0] && n === a[1] && r === a[2] && i === a[3];
};
Gr.prototype.readData = function(e) {
  if (this.checkOffset(e), e === 0)
    return [];
  var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
  return this.index += e, t;
};
var dy = Gr, ly = sy, x3 = Ae();
function Yr(e) {
  ly.call(this, e);
}
x3.inherits(Yr, ly);
Yr.prototype.byteAt = function(e) {
  return this.data.charCodeAt(this.zero + e);
};
Yr.prototype.lastIndexOfSignature = function(e) {
  return this.data.lastIndexOf(e) - this.zero;
};
Yr.prototype.readAndCheckSignature = function(e) {
  var t = this.readData(4);
  return e === t;
};
Yr.prototype.readData = function(e) {
  this.checkOffset(e);
  var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
  return this.index += e, t;
};
var _3 = Yr, fy = dy, w3 = Ae();
function Zd(e) {
  fy.call(this, e);
}
w3.inherits(Zd, fy);
Zd.prototype.readData = function(e) {
  if (this.checkOffset(e), e === 0)
    return new Uint8Array(0);
  var t = this.data.subarray(this.zero + this.index, this.zero + this.index + e);
  return this.index += e, t;
};
var hy = Zd, py = hy, T3 = Ae();
function Xd(e) {
  py.call(this, e);
}
T3.inherits(Xd, py);
Xd.prototype.readData = function(e) {
  this.checkOffset(e);
  var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
  return this.index += e, t;
};
var U3 = Xd, ya = Ae(), xp = Be, E3 = dy, A3 = _3, C3 = U3, F3 = hy, gy = function(e) {
  var t = ya.getTypeOf(e);
  return ya.checkSupport(t), t === "string" && !xp.uint8array ? new A3(e) : t === "nodebuffer" ? new C3(e) : xp.uint8array ? new F3(ya.transformTo("uint8array", e)) : new E3(ya.transformTo("array", e));
}, ks = gy, mn = Ae(), S3 = Id, _p = kd, va = qr, Da = wo, k3 = Be, B3 = 0, R3 = 3, O3 = function(e) {
  for (var t in Da)
    if (Object.prototype.hasOwnProperty.call(Da, t) && Da[t].magic === e)
      return Da[t];
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
    if (t = O3(this.compressionMethod), t === null)
      throw new Error("Corrupted zip : compression " + mn.pretty(this.compressionMethod) + " unknown (inner file : " + mn.transformTo("string", this.fileName) + ")");
    this.decompressed = new S3(this.compressedSize, this.uncompressedSize, this.crc32, t, e.readData(this.compressedSize));
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
    this.dir = !!(this.externalFileAttributes & 16), e === B3 && (this.dosPermissions = this.externalFileAttributes & 63), e === R3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), !this.dir && this.fileNameStr.slice(-1) === "/" && (this.dir = !0);
  },
  /**
   * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
   * @param {DataReader} reader the reader to use.
   */
  parseZIP64ExtraField: function() {
    if (this.extraFields[1]) {
      var e = ks(this.extraFields[1].value);
      this.uncompressedSize === mn.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)), this.compressedSize === mn.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)), this.localHeaderOffset === mn.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)), this.diskNumberStart === mn.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4));
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
    var e = k3.uint8array ? "uint8array" : "array";
    if (this.useUTF8())
      this.fileNameStr = va.utf8decode(this.fileName), this.fileCommentStr = va.utf8decode(this.fileComment);
    else {
      var t = this.findExtraFieldUnicodePath();
      if (t !== null)
        this.fileNameStr = t;
      else {
        var n = mn.transformTo(e, this.fileName);
        this.fileNameStr = this.loadOptions.decodeFileName(n);
      }
      var r = this.findExtraFieldUnicodeComment();
      if (r !== null)
        this.fileCommentStr = r;
      else {
        var i = mn.transformTo(e, this.fileComment);
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
      var t = ks(e.value);
      return t.readInt(1) !== 1 || _p(this.fileName) !== t.readInt(4) ? null : va.utf8decode(t.readData(e.length - 5));
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
      var t = ks(e.value);
      return t.readInt(1) !== 1 || _p(this.fileComment) !== t.readInt(4) ? null : va.utf8decode(t.readData(e.length - 5));
    }
    return null;
  }
};
var W3 = my, I3 = gy, nn = Ae(), Ft = Bn, N3 = W3, L3 = Be;
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
      throw new Error("Corrupted zip or bug: unexpected signature (" + nn.pretty(t) + ", expected " + nn.pretty(e) + ")");
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
    var e = this.reader.readData(this.zipCommentLength), t = L3.uint8array ? "uint8array" : "array", n = nn.transformTo(t, e);
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
      t = this.files[e], this.reader.setIndex(t.localHeaderOffset), this.checkSignature(Ft.LOCAL_FILE_HEADER), t.readLocalPart(this.reader), t.handleUTF8(), t.processAttributes();
  },
  /**
   * Read the central directory.
   */
  readCentralDir: function() {
    var e;
    for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(Ft.CENTRAL_FILE_HEADER); )
      e = new N3({
        zip64: this.zip64
      }, this.loadOptions), e.readCentralPart(this.reader), this.files.push(e);
    if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0)
      throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
  },
  /**
   * Read the end of central directory.
   */
  readEndOfCentral: function() {
    var e = this.reader.lastIndexOfSignature(Ft.CENTRAL_DIRECTORY_END);
    if (e < 0) {
      var t = !this.isSignature(0, Ft.LOCAL_FILE_HEADER);
      throw t ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
    }
    this.reader.setIndex(e);
    var n = e;
    if (this.checkSignature(Ft.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === nn.MAX_VALUE_16BITS || this.diskWithCentralDirStart === nn.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === nn.MAX_VALUE_16BITS || this.centralDirRecords === nn.MAX_VALUE_16BITS || this.centralDirSize === nn.MAX_VALUE_32BITS || this.centralDirOffset === nn.MAX_VALUE_32BITS) {
      if (this.zip64 = !0, e = this.reader.lastIndexOfSignature(Ft.ZIP64_CENTRAL_DIRECTORY_LOCATOR), e < 0)
        throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
      if (this.reader.setIndex(e), this.checkSignature(Ft.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, Ft.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(Ft.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0))
        throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
      this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(Ft.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
    }
    var r = this.centralDirOffset + this.centralDirSize;
    this.zip64 && (r += 20, r += 12 + this.zip64EndOfCentralSize);
    var i = n - r;
    if (i > 0)
      this.isSignature(n, Ft.CENTRAL_FILE_HEADER) || (this.reader.zero = i);
    else if (i < 0)
      throw new Error("Corrupted zip: missing " + Math.abs(i) + " bytes.");
  },
  prepareReader: function(e) {
    this.reader = I3(e);
  },
  /**
   * Read a zip file and create ZipEntries.
   * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
   */
  load: function(e) {
    this.prepareReader(e), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
  }
};
var M3 = by, Bs = Ae(), Ra = qi, $3 = qr, P3 = M3, z3 = lb, wp = Do;
function q3(e) {
  return new Ra.Promise(function(t, n) {
    var r = e.decompressed.getContentWorker().pipe(new z3());
    r.on("error", function(i) {
      n(i);
    }).on("end", function() {
      r.streamInfo.crc32 !== e.decompressed.crc32 ? n(new Error("Corrupted zip : CRC32 mismatch")) : t();
    }).resume();
  });
}
var j3 = function(e, t) {
  var n = this;
  return t = Bs.extend(t || {}, {
    base64: !1,
    checkCRC32: !1,
    optimizedBinaryString: !1,
    createFolders: !1,
    decodeFileName: $3.utf8decode
  }), wp.isNode && wp.isStream(e) ? Ra.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : Bs.prepareContent("the loaded zip file", e, !0, t.optimizedBinaryString, t.base64).then(function(r) {
    var i = new P3(t);
    return i.load(r), i;
  }).then(function(i) {
    var a = [Ra.Promise.resolve(i)], o = i.files;
    if (t.checkCRC32)
      for (var c = 0; c < o.length; c++)
        a.push(q3(o[c]));
    return Ra.Promise.all(a);
  }).then(function(i) {
    for (var a = i.shift(), o = a.files, c = 0; c < o.length; c++) {
      var u = o[c], s = u.fileNameStr, d = Bs.resolve(u.fileNameStr);
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
function Tt() {
  if (!(this instanceof Tt))
    return new Tt();
  if (arguments.length)
    throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
  this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
    var e = new Tt();
    for (var t in this)
      typeof this[t] != "function" && (e[t] = this[t]);
    return e;
  };
}
Tt.prototype = y3;
Tt.prototype.loadAsync = j3;
Tt.support = Be;
Tt.defaults = Ct;
Tt.version = "3.10.1";
Tt.loadAsync = function(e, t) {
  return new Tt().loadAsync(e, t);
};
Tt.external = qi;
var Z3 = Tt, X3 = bo, H3 = Z3;
$i.openArrayBuffer = V3;
$i.splitPath = G3;
$i.joinPath = Y3;
function V3(e) {
  return H3.loadAsync(e).then(function(t) {
    function n(o) {
      return t.file(o) !== null;
    }
    function r(o, c) {
      return t.file(o).async("uint8array").then(function(u) {
        if (c === "base64")
          return X3.fromByteArray(u);
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
function G3(e) {
  var t = e.lastIndexOf("/");
  return t === -1 ? { dirname: "", basename: e } : {
    dirname: e.substring(0, t),
    basename: e.substring(t + 1)
  };
}
function Y3() {
  var e = Array.prototype.filter.call(arguments, function(n) {
    return n;
  }), t = [];
  return e.forEach(function(n) {
    /^\//.test(n) ? t = [n] : t.push(n);
  }), t.join("/");
}
var Hd = {}, hn = {}, Kr = {}, So = Se;
Kr.Element = Jr;
Kr.element = function(e, t, n) {
  return new Jr(e, t, n);
};
Kr.text = function(e) {
  return {
    type: "text",
    value: e
  };
};
var yy = Kr.emptyElement = {
  first: function() {
    return null;
  },
  firstOrEmpty: function() {
    return yy;
  },
  attributes: {},
  children: []
};
function Jr(e, t, n) {
  this.type = "element", this.name = e, this.attributes = t || {}, this.children = n || [];
}
Jr.prototype.first = function(e) {
  return So.find(this.children, function(t) {
    return t.name === e;
  });
};
Jr.prototype.firstOrEmpty = function(e) {
  return this.first(e) || yy;
};
Jr.prototype.getElementsByTagName = function(e) {
  var t = So.filter(this.children, function(n) {
    return n.name === e;
  });
  return vy(t);
};
Jr.prototype.text = function() {
  if (this.children.length === 0)
    return "";
  if (this.children.length !== 1 || this.children[0].type !== "text")
    throw new Error("Not implemented");
  return this.children[0].value;
};
var K3 = {
  getElementsByTagName: function(e) {
    return vy(So.flatten(this.map(function(t) {
      return t.getElementsByTagName(e);
    }, !0)));
  }
};
function vy(e) {
  return So.extend(e, K3);
}
var Dy = {}, Vd = {}, ko = {}, Yt = {}, pn = {};
function J3(e, t, n) {
  if (n === void 0 && (n = Array.prototype), e && typeof n.find == "function")
    return n.find.call(e, t);
  for (var r = 0; r < e.length; r++)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      var i = e[r];
      if (t.call(void 0, i, r, e))
        return i;
    }
}
function Gd(e, t) {
  return t === void 0 && (t = Object), t && typeof t.freeze == "function" ? t.freeze(e) : e;
}
function Q3(e, t) {
  if (e === null || typeof e != "object")
    throw new TypeError("target is not an object");
  for (var n in t)
    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
  return e;
}
var xy = Gd({
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
}), _y = Gd({
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
pn.assign = Q3;
pn.find = J3;
pn.freeze = Gd;
pn.MIME_TYPE = xy;
pn.NAMESPACE = _y;
var wy = pn, jt = wy.find, Si = wy.NAMESPACE;
function e8(e) {
  return e !== "";
}
function t8(e) {
  return e ? e.split(/[\t\n\f\r ]+/).filter(e8) : [];
}
function n8(e, t) {
  return e.hasOwnProperty(t) || (e[t] = !0), e;
}
function Tp(e) {
  if (!e) return [];
  var t = t8(e);
  return Object.keys(t.reduce(n8, {}));
}
function r8(e) {
  return function(t) {
    return e && e.indexOf(t) !== -1;
  };
}
function Gi(e, t) {
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
}
function ut(e, t) {
  var n = e.prototype;
  if (!(n instanceof t)) {
    let r = function() {
    };
    r.prototype = t.prototype, r = new r(), Gi(n, r), e.prototype = n = r;
  }
  n.constructor != e && (typeof e != "function" && console.error("unknown Class:" + e), n.constructor = e);
}
var dt = {}, kt = dt.ELEMENT_NODE = 1, Rr = dt.ATTRIBUTE_NODE = 2, Ha = dt.TEXT_NODE = 3, Ty = dt.CDATA_SECTION_NODE = 4, Uy = dt.ENTITY_REFERENCE_NODE = 5, i8 = dt.ENTITY_NODE = 6, Ey = dt.PROCESSING_INSTRUCTION_NODE = 7, Ay = dt.COMMENT_NODE = 8, Cy = dt.DOCUMENT_NODE = 9, Fy = dt.DOCUMENT_TYPE_NODE = 10, dn = dt.DOCUMENT_FRAGMENT_NODE = 11, a8 = dt.NOTATION_NODE = 12, Je = {}, Le = {};
Je.INDEX_SIZE_ERR = (Le[1] = "Index size error", 1);
Je.DOMSTRING_SIZE_ERR = (Le[2] = "DOMString size error", 2);
var it = Je.HIERARCHY_REQUEST_ERR = (Le[3] = "Hierarchy request error", 3);
Je.WRONG_DOCUMENT_ERR = (Le[4] = "Wrong document", 4);
Je.INVALID_CHARACTER_ERR = (Le[5] = "Invalid character", 5);
Je.NO_DATA_ALLOWED_ERR = (Le[6] = "No data allowed", 6);
Je.NO_MODIFICATION_ALLOWED_ERR = (Le[7] = "No modification allowed", 7);
var Sy = Je.NOT_FOUND_ERR = (Le[8] = "Not found", 8);
Je.NOT_SUPPORTED_ERR = (Le[9] = "Not supported", 9);
var Up = Je.INUSE_ATTRIBUTE_ERR = (Le[10] = "Attribute in use", 10);
Je.INVALID_STATE_ERR = (Le[11] = "Invalid state", 11);
Je.SYNTAX_ERR = (Le[12] = "Syntax error", 12);
Je.INVALID_MODIFICATION_ERR = (Le[13] = "Invalid modification", 13);
Je.NAMESPACE_ERR = (Le[14] = "Invalid namespace", 14);
Je.INVALID_ACCESS_ERR = (Le[15] = "Invalid access", 15);
function Fe(e, t) {
  if (t instanceof Error)
    var n = t;
  else
    n = this, Error.call(this, Le[e]), this.message = Le[e], Error.captureStackTrace && Error.captureStackTrace(this, Fe);
  return n.code = e, t && (this.message = this.message + ": " + t), n;
}
Fe.prototype = Error.prototype;
Gi(Je, Fe);
function sn() {
}
sn.prototype = {
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
      wr(this[r], n, e, t);
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
function Or(e, t) {
  this._node = e, this._refresh = t, Yd(this);
}
function Yd(e) {
  var t = e._node._inc || e._node.ownerDocument._inc;
  if (e._inc !== t) {
    var n = e._refresh(e._node);
    if (zy(e, "length", n.length), !e.$$length || n.length < e.$$length)
      for (var r = n.length; r in e; r++)
        Object.prototype.hasOwnProperty.call(e, r) && delete e[r];
    Gi(n, e), e._inc = t;
  }
}
Or.prototype.item = function(e) {
  return Yd(this), this[e] || null;
};
ut(Or, sn);
function Va() {
}
function ky(e, t) {
  for (var n = e.length; n--; )
    if (e[n] === t)
      return n;
}
function Ep(e, t, n, r) {
  if (r ? t[ky(t, r)] = n : t[t.length++] = n, e) {
    n.ownerElement = e;
    var i = e.ownerDocument;
    i && (r && Oy(i, e, r), o8(i, e, n));
  }
}
function Ap(e, t, n) {
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
Va.prototype = {
  length: 0,
  item: sn.prototype.item,
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
      throw new Fe(Up);
    var n = this.getNamedItem(e.nodeName);
    return Ep(this._ownerElement, this, e, n), n;
  },
  /* returns Node */
  setNamedItemNS: function(e) {
    var t = e.ownerElement, n;
    if (t && t != this._ownerElement)
      throw new Fe(Up);
    return n = this.getNamedItemNS(e.namespaceURI, e.localName), Ep(this._ownerElement, this, e, n), n;
  },
  /* returns Node */
  removeNamedItem: function(e) {
    var t = this.getNamedItem(e);
    return Ap(this._ownerElement, this, t), t;
  },
  // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
  //for level2
  removeNamedItemNS: function(e, t) {
    var n = this.getNamedItemNS(e, t);
    return Ap(this._ownerElement, this, n), n;
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
    var r = new Yi();
    if (r.implementation = this, r.childNodes = new sn(), r.doctype = n || null, n && r.appendChild(n), t) {
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
    var r = new Bo();
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
    return Ga(this, e, t);
  },
  replaceChild: function(e, t) {
    Ga(this, e, t, Iy), t && this.removeChild(t);
  },
  removeChild: function(e) {
    return Wy(this, e);
  },
  appendChild: function(e) {
    return this.insertBefore(e, null);
  },
  hasChildNodes: function() {
    return this.firstChild != null;
  },
  cloneNode: function(e) {
    return Cu(this.ownerDocument || this, this, e);
  },
  // Modified in DOM Level 2:
  normalize: function() {
    for (var e = this.firstChild; e; ) {
      var t = e.nextSibling;
      t && t.nodeType == Ha && e.nodeType == Ha ? (this.removeChild(t), e.appendData(t.data)) : (e.normalize(), e = t);
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
      t = t.nodeType == Rr ? t.ownerDocument : t.parentNode;
    }
    return null;
  },
  // Introduced in DOM Level 3:
  lookupNamespaceURI: function(e) {
    for (var t = this; t; ) {
      var n = t._nsMap;
      if (n && Object.prototype.hasOwnProperty.call(n, e))
        return n[e];
      t = t.nodeType == Rr ? t.ownerDocument : t.parentNode;
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
Gi(dt, pe);
Gi(dt, pe.prototype);
function ki(e, t) {
  if (t(e))
    return !0;
  if (e = e.firstChild)
    do
      if (ki(e, t))
        return !0;
    while (e = e.nextSibling);
}
function Yi() {
  this.ownerDocument = this;
}
function o8(e, t, n) {
  e && e._inc++;
  var r = n.namespaceURI;
  r === Si.XMLNS && (t._nsMap[n.prefix ? n.localName : ""] = n.value);
}
function Oy(e, t, n, r) {
  e && e._inc++;
  var i = n.namespaceURI;
  i === Si.XMLNS && delete t._nsMap[n.prefix ? n.localName : ""];
}
function Kd(e, t, n) {
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
function Wy(e, t) {
  var n = t.previousSibling, r = t.nextSibling;
  return n ? n.nextSibling = r : e.firstChild = r, r ? r.previousSibling = n : e.lastChild = n, t.parentNode = null, t.previousSibling = null, t.nextSibling = null, Kd(e.ownerDocument, e), t;
}
function c8(e) {
  return e && (e.nodeType === pe.DOCUMENT_NODE || e.nodeType === pe.DOCUMENT_FRAGMENT_NODE || e.nodeType === pe.ELEMENT_NODE);
}
function s8(e) {
  return e && (Zt(e) || Jd(e) || ln(e) || e.nodeType === pe.DOCUMENT_FRAGMENT_NODE || e.nodeType === pe.COMMENT_NODE || e.nodeType === pe.PROCESSING_INSTRUCTION_NODE);
}
function ln(e) {
  return e && e.nodeType === pe.DOCUMENT_TYPE_NODE;
}
function Zt(e) {
  return e && e.nodeType === pe.ELEMENT_NODE;
}
function Jd(e) {
  return e && e.nodeType === pe.TEXT_NODE;
}
function Cp(e, t) {
  var n = e.childNodes || [];
  if (jt(n, Zt) || ln(t))
    return !1;
  var r = jt(n, ln);
  return !(t && r && n.indexOf(r) > n.indexOf(t));
}
function Fp(e, t) {
  var n = e.childNodes || [];
  function r(a) {
    return Zt(a) && a !== t;
  }
  if (jt(n, r))
    return !1;
  var i = jt(n, ln);
  return !(t && i && n.indexOf(i) > n.indexOf(t));
}
function u8(e, t, n) {
  if (!c8(e))
    throw new Fe(it, "Unexpected parent node type " + e.nodeType);
  if (n && n.parentNode !== e)
    throw new Fe(Sy, "child not in parent");
  if (
    // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
    !s8(t) || // 5. If either `node` is a Text node and `parent` is a document,
    // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
    // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
    // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
    ln(t) && e.nodeType !== pe.DOCUMENT_NODE
  )
    throw new Fe(
      it,
      "Unexpected node type " + t.nodeType + " for parent node type " + e.nodeType
    );
}
function d8(e, t, n) {
  var r = e.childNodes || [], i = t.childNodes || [];
  if (t.nodeType === pe.DOCUMENT_FRAGMENT_NODE) {
    var a = i.filter(Zt);
    if (a.length > 1 || jt(i, Jd))
      throw new Fe(it, "More than one element or text in fragment");
    if (a.length === 1 && !Cp(e, n))
      throw new Fe(it, "Element in fragment can not be inserted before doctype");
  }
  if (Zt(t) && !Cp(e, n))
    throw new Fe(it, "Only one element can be added and only after doctype");
  if (ln(t)) {
    if (jt(r, ln))
      throw new Fe(it, "Only one doctype is allowed");
    var o = jt(r, Zt);
    if (n && r.indexOf(o) < r.indexOf(n))
      throw new Fe(it, "Doctype can only be inserted before an element");
    if (!n && o)
      throw new Fe(it, "Doctype can not be appended since element is present");
  }
}
function Iy(e, t, n) {
  var r = e.childNodes || [], i = t.childNodes || [];
  if (t.nodeType === pe.DOCUMENT_FRAGMENT_NODE) {
    var a = i.filter(Zt);
    if (a.length > 1 || jt(i, Jd))
      throw new Fe(it, "More than one element or text in fragment");
    if (a.length === 1 && !Fp(e, n))
      throw new Fe(it, "Element in fragment can not be inserted before doctype");
  }
  if (Zt(t) && !Fp(e, n))
    throw new Fe(it, "Only one element can be added and only after doctype");
  if (ln(t)) {
    if (jt(r, function(u) {
      return ln(u) && u !== n;
    }))
      throw new Fe(it, "Only one doctype is allowed");
    var o = jt(r, Zt);
    if (n && r.indexOf(o) < r.indexOf(n))
      throw new Fe(it, "Doctype can only be inserted before an element");
  }
}
function Ga(e, t, n, r) {
  u8(e, t, n), e.nodeType === pe.DOCUMENT_NODE && (r || d8)(e, t, n);
  var i = t.parentNode;
  if (i && i.removeChild(t), t.nodeType === dn) {
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
  return Kd(e.ownerDocument || e, e), t.nodeType == dn && (t.firstChild = t.lastChild = null), t;
}
function l8(e, t) {
  return t.parentNode && t.parentNode.removeChild(t), t.parentNode = e, t.previousSibling = e.lastChild, t.nextSibling = null, t.previousSibling ? t.previousSibling.nextSibling = t : e.firstChild = t, e.lastChild = t, Kd(e.ownerDocument, e, t), t;
}
Yi.prototype = {
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
    if (e.nodeType == dn) {
      for (var n = e.firstChild; n; ) {
        var r = n.nextSibling;
        this.insertBefore(n, t), n = r;
      }
      return e;
    }
    return Ga(this, e, t), e.ownerDocument = this, this.documentElement === null && e.nodeType === kt && (this.documentElement = e), e;
  },
  removeChild: function(e) {
    return this.documentElement == e && (this.documentElement = null), Wy(this, e);
  },
  replaceChild: function(e, t) {
    Ga(this, e, t, Iy), e.ownerDocument = this, t && this.removeChild(t), Zt(e) && (this.documentElement = e);
  },
  // Introduced in DOM Level 2:
  importNode: function(e, t) {
    return Py(this, e, t);
  },
  // Introduced in DOM Level 2:
  getElementById: function(e) {
    var t = null;
    return ki(this.documentElement, function(n) {
      if (n.nodeType == kt && n.getAttribute("id") == e)
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
    var t = Tp(e);
    return new Or(this, function(n) {
      var r = [];
      return t.length > 0 && ki(n.documentElement, function(i) {
        if (i !== n && i.nodeType === kt) {
          var a = i.getAttribute("class");
          if (a) {
            var o = e === a;
            if (!o) {
              var c = Tp(a);
              o = t.every(r8(c));
            }
            o && r.push(i);
          }
        }
      }), r;
    });
  },
  //document factory method:
  createElement: function(e) {
    var t = new Jn();
    t.ownerDocument = this, t.nodeName = e, t.tagName = e, t.localName = e, t.childNodes = new sn();
    var n = t.attributes = new Va();
    return n._ownerElement = t, t;
  },
  createDocumentFragment: function() {
    var e = new Ro();
    return e.ownerDocument = this, e.childNodes = new sn(), e;
  },
  createTextNode: function(e) {
    var t = new Qd();
    return t.ownerDocument = this, t.appendData(e), t;
  },
  createComment: function(e) {
    var t = new el();
    return t.ownerDocument = this, t.appendData(e), t;
  },
  createCDATASection: function(e) {
    var t = new tl();
    return t.ownerDocument = this, t.appendData(e), t;
  },
  createProcessingInstruction: function(e, t) {
    var n = new rl();
    return n.ownerDocument = this, n.tagName = n.nodeName = n.target = e, n.nodeValue = n.data = t, n;
  },
  createAttribute: function(e) {
    var t = new Ya();
    return t.ownerDocument = this, t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, t;
  },
  createEntityReference: function(e) {
    var t = new nl();
    return t.ownerDocument = this, t.nodeName = e, t;
  },
  // Introduced in DOM Level 2:
  createElementNS: function(e, t) {
    var n = new Jn(), r = t.split(":"), i = n.attributes = new Va();
    return n.childNodes = new sn(), n.ownerDocument = this, n.nodeName = t, n.tagName = t, n.namespaceURI = e, r.length == 2 ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, i._ownerElement = n, n;
  },
  // Introduced in DOM Level 2:
  createAttributeNS: function(e, t) {
    var n = new Ya(), r = t.split(":");
    return n.ownerDocument = this, n.nodeName = t, n.name = t, n.namespaceURI = e, n.specified = !0, r.length == 2 ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, n;
  }
};
ut(Yi, pe);
function Jn() {
  this._nsMap = {};
}
Jn.prototype = {
  nodeType: kt,
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
    return e.nodeType === dn ? this.insertBefore(e, null) : l8(this, e);
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
    return new Or(this, function(t) {
      var n = [];
      return ki(t, function(r) {
        r !== t && r.nodeType == kt && (e === "*" || r.tagName == e) && n.push(r);
      }), n;
    });
  },
  getElementsByTagNameNS: function(e, t) {
    return new Or(this, function(n) {
      var r = [];
      return ki(n, function(i) {
        i !== n && i.nodeType === kt && (e === "*" || i.namespaceURI === e) && (t === "*" || i.localName == t) && r.push(i);
      }), r;
    });
  }
};
Yi.prototype.getElementsByTagName = Jn.prototype.getElementsByTagName;
Yi.prototype.getElementsByTagNameNS = Jn.prototype.getElementsByTagNameNS;
ut(Jn, pe);
function Ya() {
}
Ya.prototype.nodeType = Rr;
ut(Ya, pe);
function Ki() {
}
Ki.prototype = {
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
ut(Ki, pe);
function Qd() {
}
Qd.prototype = {
  nodeName: "#text",
  nodeType: Ha,
  splitText: function(e) {
    var t = this.data, n = t.substring(e);
    t = t.substring(0, e), this.data = this.nodeValue = t, this.length = t.length;
    var r = this.ownerDocument.createTextNode(n);
    return this.parentNode && this.parentNode.insertBefore(r, this.nextSibling), r;
  }
};
ut(Qd, Ki);
function el() {
}
el.prototype = {
  nodeName: "#comment",
  nodeType: Ay
};
ut(el, Ki);
function tl() {
}
tl.prototype = {
  nodeName: "#cdata-section",
  nodeType: Ty
};
ut(tl, Ki);
function Bo() {
}
Bo.prototype.nodeType = Fy;
ut(Bo, pe);
function Ny() {
}
Ny.prototype.nodeType = a8;
ut(Ny, pe);
function Ly() {
}
Ly.prototype.nodeType = i8;
ut(Ly, pe);
function nl() {
}
nl.prototype.nodeType = Uy;
ut(nl, pe);
function Ro() {
}
Ro.prototype.nodeName = "#document-fragment";
Ro.prototype.nodeType = dn;
ut(Ro, pe);
function rl() {
}
rl.prototype.nodeType = Ey;
ut(rl, pe);
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
  return wr(this, n, e, t, o), n.join("");
}
function Sp(e, t, n) {
  var r = e.prefix || "", i = e.namespaceURI;
  if (!i || r === "xml" && i === Si.XML || i === Si.XMLNS)
    return !1;
  for (var a = n.length; a--; ) {
    var o = n[a];
    if (o.prefix === r)
      return o.namespace !== i;
  }
  return !0;
}
function Rs(e, t, n) {
  e.push(" ", t, '="', n.replace(/[<>&"\t\n\r]/g, Ry), '"');
}
function wr(e, t, n, r, i) {
  if (i || (i = []), r)
    if (e = r(e), e) {
      if (typeof e == "string") {
        t.push(e);
        return;
      }
    } else
      return;
  switch (e.nodeType) {
    case kt:
      var a = e.attributes, o = a.length, h = e.firstChild, c = e.tagName;
      n = Si.isHTML(e.namespaceURI) || n;
      var u = c;
      if (!n && !e.prefix && e.namespaceURI) {
        for (var s, d = 0; d < a.length; d++)
          if (a.item(d).name === "xmlns") {
            s = a.item(d).value;
            break;
          }
        if (!s)
          for (var g = i.length - 1; g >= 0; g--) {
            var l = i[g];
            if (l.prefix === "" && l.namespace === e.namespaceURI) {
              s = l.namespace;
              break;
            }
          }
        if (s !== e.namespaceURI)
          for (var g = i.length - 1; g >= 0; g--) {
            var l = i[g];
            if (l.namespace === e.namespaceURI) {
              l.prefix && (u = l.prefix + ":" + c);
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
        if (Sp(b, n, i)) {
          var m = b.prefix || "", y = b.namespaceURI;
          Rs(t, m ? "xmlns:" + m : "xmlns", y), i.push({ prefix: m, namespace: y });
        }
        wr(b, t, n, r, i);
      }
      if (c === u && Sp(e, n, i)) {
        var m = e.prefix || "", y = e.namespaceURI;
        Rs(t, m ? "xmlns:" + m : "xmlns", y), i.push({ prefix: m, namespace: y });
      }
      if (h || n && !/^(?:meta|link|img|br|hr|input)$/i.test(c)) {
        if (t.push(">"), n && /^script$/i.test(c))
          for (; h; )
            h.data ? t.push(h.data) : wr(h, t, n, r, i.slice()), h = h.nextSibling;
        else
          for (; h; )
            wr(h, t, n, r, i.slice()), h = h.nextSibling;
        t.push("</", u, ">");
      } else
        t.push("/>");
      return;
    case Cy:
    case dn:
      for (var h = e.firstChild; h; )
        wr(h, t, n, r, i.slice()), h = h.nextSibling;
      return;
    case Rr:
      return Rs(t, e.name, e.value);
    case Ha:
      return t.push(
        e.data.replace(/[<&>]/g, Ry)
      );
    case Ty:
      return t.push("<![CDATA[", e.data, "]]>");
    case Ay:
      return t.push("<!--", e.data, "-->");
    case Fy:
      var f = e.publicId, v = e.systemId;
      if (t.push("<!DOCTYPE ", e.name), f)
        t.push(" PUBLIC ", f), v && v != "." && t.push(" ", v), t.push(">");
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
    case kt:
      r = t.cloneNode(!1), r.ownerDocument = e;
    case dn:
      break;
    case Rr:
      n = !0;
      break;
  }
  if (r || (r = t.cloneNode(!1)), r.ownerDocument = e, r.parentNode = null, n)
    for (var i = t.firstChild; i; )
      r.appendChild(Py(e, i, n)), i = i.nextSibling;
  return r;
}
function Cu(e, t, n) {
  var r = new t.constructor();
  for (var i in t)
    if (Object.prototype.hasOwnProperty.call(t, i)) {
      var a = t[i];
      typeof a != "object" && a != r[i] && (r[i] = a);
    }
  switch (t.childNodes && (r.childNodes = new sn()), r.ownerDocument = e, r.nodeType) {
    case kt:
      var o = t.attributes, c = r.attributes = new Va(), u = o.length;
      c._ownerElement = r;
      for (var s = 0; s < u; s++)
        r.setAttributeNode(Cu(e, o.item(s), !0));
      break;
    case Rr:
      n = !0;
  }
  if (n)
    for (var d = t.firstChild; d; )
      r.appendChild(Cu(e, d, n)), d = d.nextSibling;
  return r;
}
function zy(e, t, n) {
  e[t] = n;
}
try {
  if (Object.defineProperty) {
    let e = function(t) {
      switch (t.nodeType) {
        case kt:
        case dn:
          var n = [];
          for (t = t.firstChild; t; )
            t.nodeType !== 7 && t.nodeType !== 8 && n.push(e(t)), t = t.nextSibling;
          return n.join("");
        default:
          return t.nodeValue;
      }
    };
    Object.defineProperty(Or.prototype, "length", {
      get: function() {
        return Yd(this), this.$$length;
      }
    }), Object.defineProperty(pe.prototype, "textContent", {
      get: function() {
        return e(this);
      },
      set: function(t) {
        switch (this.nodeType) {
          case kt:
          case dn:
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
Yt.DocumentType = Bo;
Yt.DOMException = Fe;
Yt.DOMImplementation = By;
Yt.Element = Jn;
Yt.Node = pe;
Yt.NodeList = sn;
Yt.XMLSerializer = My;
var Oo = {}, qy = {};
(function(e) {
  var t = pn.freeze;
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
var il = {}, Bi = pn.NAMESPACE, Fu = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, kp = new RegExp("[\\-\\.0-9" + Fu.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"), Bp = new RegExp("^" + Fu.source + kp.source + "*(?::" + Fu.source + kp.source + "*)?$"), ni = 0, bn = 1, mr = 2, ri = 3, br = 4, yr = 5, ii = 6, xa = 7;
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
    r.startDocument(), Zy(t, t = {}), f8(
      e,
      t,
      n,
      r,
      this.errorHandler
    ), r.endDocument();
  }
};
function f8(e, t, n, r, i) {
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
      l && u(m), r.characters(T, 0, A - m), m = A;
    }
  }
  function u(A, T) {
    for (; A >= d && (T = g.exec(e)); )
      s = T.index, d = s + T[0].length, l.lineNumber++;
    l.columnNumber = A - s + 1;
  }
  for (var s = 0, d = 0, g = /.*(?:\r\n?|\n)|.*$/g, l = r.locator, p = [{ currentNSMap: t }], b = {}, m = 0; ; ) {
    try {
      var y = e.indexOf("<", m);
      if (y < 0) {
        if (!e.substr(m).match(/^\s*$/)) {
          var h = r.doc, f = h.createTextNode(e.substr(m));
          h.appendChild(f), r.currentElement = f;
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
              for (var S in x)
                Object.prototype.hasOwnProperty.call(x, S) && r.endPrefixMapping(S);
            w || i.fatalError("end tag name: " + v + " is not match the current start tagName:" + D.tagName);
          } else
            p.push(D);
          $++;
          break;
        case "?":
          l && u(y), $ = b8(e, y, r);
          break;
        case "!":
          l && u(y), $ = m8(e, y, r, i);
          break;
        default:
          l && u(y);
          var I = new Xy(), q = p[p.length - 1].currentNSMap, $ = h8(e, y, I, q, o, i), R = I.length;
          if (!I.closed && g8(e, $, I.tagName, b) && (I.closed = !0, n.nbsp || i.warning("unclosed xml attribute")), l && R) {
            for (var P = Rp(l, {}), G = 0; G < R; G++) {
              var Q = I[G];
              u(Q.offset), Q.locator = Rp(l, {});
            }
            r.locator = P, Op(I, r, q) && p.push(I), r.locator = l;
          } else
            Op(I, r, q) && p.push(I);
          Bi.isHTML(I.uri) && !I.closed ? $ = p8(e, $, I.tagName, o, r) : $++;
      }
    } catch (A) {
      if (A instanceof Wr)
        throw A;
      i.error("element parse error: " + A), $ = -1;
    }
    $ > m ? m = $ : c(Math.max(y, m) + 1);
  }
}
function Rp(e, t) {
  return t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t;
}
function h8(e, t, n, r, i, a) {
  function o(l, p, b) {
    n.attributeNames.hasOwnProperty(l) && a.fatalError("Attribute " + l + " redefined"), n.addValue(
      l,
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
        if (d === bn)
          c = e.slice(t, s), d = ri;
        else if (d === mr)
          d = ri;
        else
          throw new Error("attribute equal must after attrName");
        break;
      case "'":
      case '"':
        if (d === ri || d === bn)
          if (d === bn && (a.warning('attribute value must after "="'), c = e.slice(t, s)), t = s + 1, s = e.indexOf(g, t), s > 0)
            u = e.slice(t, s), o(c, u, t - 1), d = yr;
          else
            throw new Error("attribute value no end '" + g + "' match");
        else if (d == br)
          u = e.slice(t, s), o(c, u, t), a.warning('attribute "' + c + '" missed start quot(' + g + ")!!"), t = s + 1, d = yr;
        else
          throw new Error('attribute value must after "="');
        break;
      case "/":
        switch (d) {
          case ni:
            n.setTagName(e.slice(t, s));
          case yr:
          case ii:
          case xa:
            d = xa, n.closed = !0;
          case br:
          case bn:
            break;
          case mr:
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
          case yr:
          case ii:
          case xa:
            break;
          case br:
          case bn:
            u = e.slice(t, s), u.slice(-1) === "/" && (n.closed = !0, u = u.slice(0, -1));
          case mr:
            d === mr && (u = c), d == br ? (a.warning('attribute "' + u + '" missed quot(")!'), o(c, u, t)) : ((!Bi.isHTML(r[""]) || !u.match(/^(?:disabled|checked|selected)$/i)) && a.warning('attribute "' + u + '" missed value!! "' + u + '" instead!!'), o(u, u, t));
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
            case bn:
              c = e.slice(t, s), d = mr;
              break;
            case br:
              var u = e.slice(t, s);
              a.warning('attribute "' + u + '" missed quot(")!!'), o(c, u, t);
            case yr:
              d = ii;
              break;
          }
        else
          switch (d) {
            case mr:
              n.tagName, (!Bi.isHTML(r[""]) || !c.match(/^(?:disabled|checked|selected)$/i)) && a.warning('attribute "' + c + '" missed value!! "' + c + '" instead2!!'), o(c, c, t), t = s, d = bn;
              break;
            case yr:
              a.warning('attribute space is required"' + c + '"!!');
            case ii:
              d = bn, t = s;
              break;
            case ri:
              d = br, t = s;
              break;
            case xa:
              throw new Error("elements closed character '/' and '>' must be connected to");
          }
    }
    s++;
  }
}
function Op(e, t, n) {
  for (var r = e.tagName, i = null, g = e.length; g--; ) {
    var a = e[g], o = a.qName, c = a.value, l = o.indexOf(":");
    if (l > 0)
      var u = a.prefix = o.slice(0, l), s = o.slice(l + 1), d = u === "xmlns" && s;
    else
      s = o, u = null, d = o === "xmlns" && "";
    a.localName = s, d !== !1 && (i == null && (i = {}, Zy(n, n = {})), n[d] = i[d] = c, a.uri = Bi.XMLNS, t.startPrefixMapping(d, c));
  }
  for (var g = e.length; g--; ) {
    a = e[g];
    var u = a.prefix;
    u && (u === "xml" && (a.uri = Bi.XML), u !== "xmlns" && (a.uri = n[u || ""]));
  }
  var l = r.indexOf(":");
  l > 0 ? (u = e.prefix = r.slice(0, l), s = e.localName = r.slice(l + 1)) : (u = null, s = e.localName = r);
  var p = e.uri = n[u || ""];
  if (t.startElement(p, s, r, e), e.closed) {
    if (t.endElement(p, s, r), i)
      for (u in i)
        Object.prototype.hasOwnProperty.call(i, u) && t.endPrefixMapping(u);
  } else
    return e.currentNSMap = n, e.localNSMap = i, !0;
}
function p8(e, t, n, r, i) {
  if (/^(?:script|textarea)$/i.test(n)) {
    var a = e.indexOf("</" + n + ">", t), o = e.substring(t + 1, a);
    if (/[&<]/.test(o))
      return /^script$/i.test(n) ? (i.characters(o, 0, o.length), a) : (o = o.replace(/&#?\w+;/g, r), i.characters(o, 0, o.length), a);
  }
  return t + 1;
}
function g8(e, t, n, r) {
  var i = r[n];
  return i == null && (i = e.lastIndexOf("</" + n + ">"), i < t && (i = e.lastIndexOf("</" + n)), r[n] = i), i < t;
}
function Zy(e, t) {
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
}
function m8(e, t, n, r) {
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
      var o = y8(e, t), c = o.length;
      if (c > 1 && /!doctype/i.test(o[0][0])) {
        var u = o[1][0], s = !1, d = !1;
        c > 3 && (/^public$/i.test(o[2][0]) ? (s = o[3][0], d = c > 4 && o[4][0]) : /^system$/i.test(o[2][0]) && (d = o[3][0]));
        var g = o[c - 1];
        return n.startDTD(u, s, d), n.endDTD(), g.index + g[0].length;
      }
  }
  return -1;
}
function b8(e, t, n) {
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
    if (!Bp.test(e))
      throw new Error("invalid tagName:" + e);
    this.tagName = e;
  },
  addValue: function(e, t, n) {
    if (!Bp.test(e))
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
function y8(e, t) {
  var n, r = [], i = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
  for (i.lastIndex = t, i.exec(e); n = i.exec(e); )
    if (r.push(n), n[1]) return r;
}
il.XMLReader = jy;
il.ParseError = Wr;
var v8 = pn, D8 = Yt, Wp = qy, Hy = il, x8 = D8.DOMImplementation, Ip = v8.NAMESPACE, _8 = Hy.ParseError, w8 = Hy.XMLReader;
function Vy(e) {
  return e.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028]/g, `
`);
}
function Gy(e) {
  this.options = e || { locator: {} };
}
Gy.prototype.parseFromString = function(e, t) {
  var n = this.options, r = new w8(), i = n.domBuilder || new Ji(), a = n.errorHandler, o = n.locator, c = n.xmlns || {}, u = /\/x?html?$/.test(t), s = u ? Wp.HTML_ENTITIES : Wp.XML_ENTITIES;
  o && i.setDocumentLocator(o), r.errorHandler = T8(a, i, o), r.domBuilder = n.domBuilder || i, u && (c[""] = Ip.HTML), c.xml = c.xml || Ip.XML;
  var d = n.normalizeLineEndings || Vy;
  return e && typeof e == "string" ? r.parse(
    d(e),
    c,
    s
  ) : r.errorHandler.error("invalid doc source"), i.doc;
};
function T8(e, t, n) {
  if (!e) {
    if (t instanceof Ji)
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
      c("[xmldom " + o + "]	" + u + Su(n));
    } || function() {
    };
  }
  return a("warning"), a("error"), a("fatalError"), r;
}
function Ji() {
  this.cdata = !1;
}
function vr(e, t) {
  t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber;
}
Ji.prototype = {
  startDocument: function() {
    this.doc = new x8().createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId);
  },
  startElement: function(e, t, n, r) {
    var i = this.doc, a = i.createElementNS(e, n || t), o = r.length;
    _a(this, a), this.currentElement = a, this.locator && vr(this.locator, a);
    for (var c = 0; c < o; c++) {
      var e = r.getURI(c), u = r.getValue(c), n = r.getQName(c), s = i.createAttributeNS(e, n);
      this.locator && vr(r.getLocator(c), s), s.value = s.nodeValue = u, a.setAttributeNode(s);
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
    this.locator && vr(this.locator, n), _a(this, n);
  },
  ignorableWhitespace: function(e, t, n) {
  },
  characters: function(e, t, n) {
    if (e = Np.apply(this, arguments), e) {
      if (this.cdata)
        var r = this.doc.createCDATASection(e);
      else
        var r = this.doc.createTextNode(e);
      this.currentElement ? this.currentElement.appendChild(r) : /^\s*$/.test(e) && this.doc.appendChild(r), this.locator && vr(this.locator, r);
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
    e = Np.apply(this, arguments);
    var r = this.doc.createComment(e);
    this.locator && vr(this.locator, r), _a(this, r);
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
      this.locator && vr(this.locator, i), _a(this, i), this.doc.doctype = i;
    }
  },
  /**
   * @see org.xml.sax.ErrorHandler
   * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
   */
  warning: function(e) {
    console.warn("[xmldom warning]	" + e, Su(this.locator));
  },
  error: function(e) {
    console.error("[xmldom error]	" + e, Su(this.locator));
  },
  fatalError: function(e) {
    throw new _8(e, this.locator);
  }
};
function Su(e) {
  if (e)
    return `
@` + (e.systemId || "") + "#[line:" + e.lineNumber + ",col:" + e.columnNumber + "]";
}
function Np(e, t, n) {
  return typeof e == "string" ? e.substr(t, n) : e.length >= t + n || t ? new java.lang.String(e, t, n) + "" : e;
}
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(e) {
  Ji.prototype[e] = function() {
    return null;
  };
});
function _a(e, t) {
  e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t);
}
Oo.__DOMHandler = Ji;
Oo.normalizeLineEndings = Vy;
Oo.DOMParser = Gy;
var Yy = Yt;
ko.DOMImplementation = Yy.DOMImplementation;
ko.XMLSerializer = Yy.XMLSerializer;
ko.DOMParser = Oo.DOMParser;
var U8 = ko, E8 = Yt;
function A8(e) {
  var t = null, n = new U8.DOMParser({
    errorHandler: function(i, a) {
      t = { level: i, message: a };
    }
  }), r = n.parseFromString(e);
  if (t === null)
    return r;
  throw new Error(t.level + ": " + t.message);
}
Vd.parseFromString = A8;
Vd.Node = E8.Node;
var Os = $e, Lp = Se, Ky = Vd, Jy = Kr, C8 = Jy.Element;
Dy.readString = F8;
var Mp = Ky.Node;
function F8(e, t) {
  t = t || {};
  try {
    var n = Ky.parseFromString(e, "text/xml");
  } catch (o) {
    return Os.reject(o);
  }
  if (n.documentElement.tagName === "parsererror")
    return Os.resolve(new Error(n.documentElement.textContent));
  function r(o) {
    switch (o.nodeType) {
      case Mp.ELEMENT_NODE:
        return i(o);
      case Mp.TEXT_NODE:
        return Jy.text(o.nodeValue);
    }
  }
  function i(o) {
    var c = a(o), u = [];
    Lp.forEach(o.childNodes, function(d) {
      var g = r(d);
      g && u.push(g);
    });
    var s = {};
    return Lp.forEach(o.attributes, function(d) {
      s[a(d)] = d.value;
    }), new C8(c, s, u);
  }
  function a(o) {
    if (o.namespaceURI) {
      var c = t[o.namespaceURI], u;
      return c ? u = c + ":" : u = "{" + o.namespaceURI + "}", u + o.localName;
    } else
      return o.localName;
  }
  return Os.resolve(r(n.documentElement));
}
var Qy = {}, ci = {}, rn = {}, $p;
function Rn() {
  return $p || ($p = 1, (function() {
    var e, t, n, r, i, a, o, c = [].slice, u = {}.hasOwnProperty;
    e = function() {
      var s, d, g, l, p, b;
      if (b = arguments[0], p = 2 <= arguments.length ? c.call(arguments, 1) : [], i(Object.assign))
        Object.assign.apply(null, arguments);
      else
        for (s = 0, g = p.length; s < g; s++)
          if (l = p[s], l != null)
            for (d in l)
              u.call(l, d) && (b[d] = l[d]);
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
    }, rn.assign = e, rn.isFunction = i, rn.isObject = a, rn.isArray = n, rn.isEmpty = r, rn.isPlainObject = o, rn.getValue = t;
  }).call(re)), rn;
}
var Ws = { exports: {} }, Is = { exports: {} }, Ns = { exports: {} }, Ls = { exports: {} }, Pp;
function e1() {
  return Pp || (Pp = 1, (function() {
    Ls.exports = function() {
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
  }).call(re)), Ls.exports;
}
var zp;
function Wo() {
  return zp || (zp = 1, (function() {
    var e, t, n, r, i, a, o = function(u, s) {
      for (var d in s)
        c.call(s, d) && (u[d] = s[d]);
      function g() {
        this.constructor = u;
      }
      return g.prototype = s.prototype, u.prototype = new g(), u.__super__ = s.prototype, u;
    }, c = {}.hasOwnProperty;
    a = Rn(), i = a.isObject, r = a.isFunction, n = a.getValue, t = lt(), e = e1(), Ns.exports = function(u) {
      o(s, u);
      function s(d, g, l) {
        if (s.__super__.constructor.call(this, d), g == null)
          throw new Error("Missing element name. " + this.debugInfo());
        this.name = this.stringify.eleName(g), this.attributes = {}, l != null && this.attribute(l), d.isDocument && (this.isRoot = !0, this.documentObject = d, d.rootObject = this);
      }
      return s.prototype.clone = function() {
        var d, g, l, p;
        l = Object.create(this), l.isRoot && (l.documentObject = null), l.attributes = {}, p = this.attributes;
        for (g in p)
          c.call(p, g) && (d = p[g], l.attributes[g] = d.clone());
        return l.children = [], this.children.forEach(function(b) {
          var m;
          return m = b.clone(), m.parent = l, l.children.push(m);
        }), l;
      }, s.prototype.attribute = function(d, g) {
        var l, p;
        if (d != null && (d = n(d)), i(d))
          for (l in d)
            c.call(d, l) && (p = d[l], this.attribute(l, p));
        else
          r(g) && (g = g.apply()), (!this.options.skipNullAttributes || g != null) && (this.attributes[d] = new e(this, d, g));
        return this;
      }, s.prototype.removeAttribute = function(d) {
        var g, l, p;
        if (d == null)
          throw new Error("Missing attribute name. " + this.debugInfo());
        if (d = n(d), Array.isArray(d))
          for (l = 0, p = d.length; l < p; l++)
            g = d[l], delete this.attributes[g];
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
  }).call(re)), Ns.exports;
}
var Ms = { exports: {} }, qp;
function Io() {
  return qp || (qp = 1, (function() {
    var e, t = function(r, i) {
      for (var a in i)
        n.call(i, a) && (r[a] = i[a]);
      function o() {
        this.constructor = r;
      }
      return o.prototype = i.prototype, r.prototype = new o(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = lt(), Ms.exports = function(r) {
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
  }).call(re)), Ms.exports;
}
var $s = { exports: {} }, jp;
function No() {
  return jp || (jp = 1, (function() {
    var e, t = function(r, i) {
      for (var a in i)
        n.call(i, a) && (r[a] = i[a]);
      function o() {
        this.constructor = r;
      }
      return o.prototype = i.prototype, r.prototype = new o(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = lt(), $s.exports = function(r) {
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
  }).call(re)), $s.exports;
}
var Ps = { exports: {} }, Zp;
function Lo() {
  return Zp || (Zp = 1, (function() {
    var e, t, n = function(i, a) {
      for (var o in a)
        r.call(a, o) && (i[o] = a[o]);
      function c() {
        this.constructor = i;
      }
      return c.prototype = a.prototype, i.prototype = new c(), i.__super__ = a.prototype, i;
    }, r = {}.hasOwnProperty;
    t = Rn().isObject, e = lt(), Ps.exports = function(i) {
      n(a, i);
      function a(o, c, u, s) {
        var d;
        a.__super__.constructor.call(this, o), t(c) && (d = c, c = d.version, u = d.encoding, s = d.standalone), c || (c = "1.0"), this.version = this.stringify.xmlVersion(c), u != null && (this.encoding = this.stringify.xmlEncoding(u)), s != null && (this.standalone = this.stringify.xmlStandalone(s));
      }
      return a.prototype.toString = function(o) {
        return this.options.writer.set(o).declaration(this);
      }, a;
    }(e);
  }).call(re)), Ps.exports;
}
var zs = { exports: {} }, qs = { exports: {} }, Xp;
function Mo() {
  return Xp || (Xp = 1, (function() {
    var e, t = function(r, i) {
      for (var a in i)
        n.call(i, a) && (r[a] = i[a]);
      function o() {
        this.constructor = r;
      }
      return o.prototype = i.prototype, r.prototype = new o(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = lt(), qs.exports = function(r) {
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
  }).call(re)), qs.exports;
}
var js = { exports: {} }, Hp;
function $o() {
  return Hp || (Hp = 1, (function() {
    var e, t, n = function(i, a) {
      for (var o in a)
        r.call(a, o) && (i[o] = a[o]);
      function c() {
        this.constructor = i;
      }
      return c.prototype = a.prototype, i.prototype = new c(), i.__super__ = a.prototype, i;
    }, r = {}.hasOwnProperty;
    t = Rn().isObject, e = lt(), js.exports = function(i) {
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
  }).call(re)), js.exports;
}
var Zs = { exports: {} }, Vp;
function Po() {
  return Vp || (Vp = 1, (function() {
    var e, t = function(r, i) {
      for (var a in i)
        n.call(i, a) && (r[a] = i[a]);
      function o() {
        this.constructor = r;
      }
      return o.prototype = i.prototype, r.prototype = new o(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = lt(), Zs.exports = function(r) {
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
  }).call(re)), Zs.exports;
}
var Xs = { exports: {} }, Gp;
function zo() {
  return Gp || (Gp = 1, (function() {
    var e, t = function(r, i) {
      for (var a in i)
        n.call(i, a) && (r[a] = i[a]);
      function o() {
        this.constructor = r;
      }
      return o.prototype = i.prototype, r.prototype = new o(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = lt(), Xs.exports = function(r) {
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
  }).call(re)), Xs.exports;
}
var Yp;
function qo() {
  return Yp || (Yp = 1, (function() {
    var e, t, n, r, i, a, o = function(u, s) {
      for (var d in s)
        c.call(s, d) && (u[d] = s[d]);
      function g() {
        this.constructor = u;
      }
      return g.prototype = s.prototype, u.prototype = new g(), u.__super__ = s.prototype, u;
    }, c = {}.hasOwnProperty;
    a = Rn().isObject, i = lt(), e = Mo(), n = $o(), t = Po(), r = zo(), zs.exports = function(u) {
      o(s, u);
      function s(d, g, l) {
        var p, b;
        s.__super__.constructor.call(this, d), this.name = "!DOCTYPE", this.documentObject = d, a(g) && (p = g, g = p.pubID, l = p.sysID), l == null && (b = [g, l], l = b[0], g = b[1]), g != null && (this.pubID = this.stringify.dtdPubID(g)), l != null && (this.sysID = this.stringify.dtdSysID(l));
      }
      return s.prototype.element = function(d, g) {
        var l;
        return l = new t(this, d, g), this.children.push(l), this;
      }, s.prototype.attList = function(d, g, l, p, b) {
        var m;
        return m = new e(this, d, g, l, p, b), this.children.push(m), this;
      }, s.prototype.entity = function(d, g) {
        var l;
        return l = new n(this, !1, d, g), this.children.push(l), this;
      }, s.prototype.pEntity = function(d, g) {
        var l;
        return l = new n(this, !0, d, g), this.children.push(l), this;
      }, s.prototype.notation = function(d, g) {
        var l;
        return l = new r(this, d, g), this.children.push(l), this;
      }, s.prototype.toString = function(d) {
        return this.options.writer.set(d).docType(this);
      }, s.prototype.ele = function(d, g) {
        return this.element(d, g);
      }, s.prototype.att = function(d, g, l, p, b) {
        return this.attList(d, g, l, p, b);
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
  }).call(re)), zs.exports;
}
var Hs = { exports: {} }, Kp;
function jo() {
  return Kp || (Kp = 1, (function() {
    var e, t = function(r, i) {
      for (var a in i)
        n.call(i, a) && (r[a] = i[a]);
      function o() {
        this.constructor = r;
      }
      return o.prototype = i.prototype, r.prototype = new o(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = lt(), Hs.exports = function(r) {
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
  }).call(re)), Hs.exports;
}
var Vs = { exports: {} }, Jp;
function Zo() {
  return Jp || (Jp = 1, (function() {
    var e, t = function(r, i) {
      for (var a in i)
        n.call(i, a) && (r[a] = i[a]);
      function o() {
        this.constructor = r;
      }
      return o.prototype = i.prototype, r.prototype = new o(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = lt(), Vs.exports = function(r) {
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
  }).call(re)), Vs.exports;
}
var Gs = { exports: {} }, Qp;
function Xo() {
  return Qp || (Qp = 1, (function() {
    var e, t = function(r, i) {
      for (var a in i)
        n.call(i, a) && (r[a] = i[a]);
      function o() {
        this.constructor = r;
      }
      return o.prototype = i.prototype, r.prototype = new o(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = lt(), Gs.exports = function(r) {
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
  }).call(re)), Gs.exports;
}
var Ys = { exports: {} }, eg;
function al() {
  return eg || (eg = 1, (function() {
    var e, t = function(r, i) {
      for (var a in i)
        n.call(i, a) && (r[a] = i[a]);
      function o() {
        this.constructor = r;
      }
      return o.prototype = i.prototype, r.prototype = new o(), r.__super__ = i.prototype, r;
    }, n = {}.hasOwnProperty;
    e = lt(), Ys.exports = function(r) {
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
  }).call(re)), Ys.exports;
}
var tg;
function lt() {
  return tg || (tg = 1, (function() {
    var e, t, n, r, i, a, o, c, u, s, d, g, l, p, b = {}.hasOwnProperty;
    p = Rn(), l = p.isObject, g = p.isFunction, d = p.isEmpty, s = p.getValue, a = null, e = null, t = null, n = null, r = null, c = null, u = null, o = null, i = null, Is.exports = function() {
      function m(y) {
        this.parent = y, this.parent && (this.options = this.parent.options, this.stringify = this.parent.stringify), this.children = [], a || (a = Wo(), e = Io(), t = No(), n = Lo(), r = qo(), c = jo(), u = Zo(), o = Xo(), i = al());
      }
      return m.prototype.element = function(y, h, f) {
        var v, D, x, w, E, S, I, q, $, R, P;
        if (S = null, h === null && f == null && ($ = [{}, null], h = $[0], f = $[1]), h == null && (h = {}), h = s(h), l(h) || (R = [h, f], f = R[0], h = R[1]), y != null && (y = s(y)), Array.isArray(y))
          for (x = 0, I = y.length; x < I; x++)
            D = y[x], S = this.element(D);
        else if (g(y))
          S = this.element(y.apply());
        else if (l(y)) {
          for (E in y)
            if (b.call(y, E))
              if (P = y[E], g(P) && (P = P.apply()), l(P) && d(P) && (P = null), !this.options.ignoreDecorators && this.stringify.convertAttKey && E.indexOf(this.stringify.convertAttKey) === 0)
                S = this.attribute(E.substr(this.stringify.convertAttKey.length), P);
              else if (!this.options.separateArrayItems && Array.isArray(P))
                for (w = 0, q = P.length; w < q; w++)
                  D = P[w], v = {}, v[E] = D, S = this.element(v);
              else l(P) ? (S = this.element(E), S.element(P)) : S = this.element(E, P);
        } else this.options.skipNullNodes && f === null ? S = this.dummy() : !this.options.ignoreDecorators && this.stringify.convertTextKey && y.indexOf(this.stringify.convertTextKey) === 0 ? S = this.text(f) : !this.options.ignoreDecorators && this.stringify.convertCDataKey && y.indexOf(this.stringify.convertCDataKey) === 0 ? S = this.cdata(f) : !this.options.ignoreDecorators && this.stringify.convertCommentKey && y.indexOf(this.stringify.convertCommentKey) === 0 ? S = this.comment(f) : !this.options.ignoreDecorators && this.stringify.convertRawKey && y.indexOf(this.stringify.convertRawKey) === 0 ? S = this.raw(f) : !this.options.ignoreDecorators && this.stringify.convertPIKey && y.indexOf(this.stringify.convertPIKey) === 0 ? S = this.instruction(y.substr(this.stringify.convertPIKey.length), f) : S = this.node(y, h, f);
        if (S == null)
          throw new Error("Could not create any elements with: " + y + ". " + this.debugInfo());
        return S;
      }, m.prototype.insertBefore = function(y, h, f) {
        var v, D, x;
        if (this.isRoot)
          throw new Error("Cannot insert elements at root level. " + this.debugInfo(y));
        return D = this.parent.children.indexOf(this), x = this.parent.children.splice(D), v = this.parent.element(y, h, f), Array.prototype.push.apply(this.parent.children, x), v;
      }, m.prototype.insertAfter = function(y, h, f) {
        var v, D, x;
        if (this.isRoot)
          throw new Error("Cannot insert elements at root level. " + this.debugInfo(y));
        return D = this.parent.children.indexOf(this), x = this.parent.children.splice(D + 1), v = this.parent.element(y, h, f), Array.prototype.push.apply(this.parent.children, x), v;
      }, m.prototype.remove = function() {
        var y;
        if (this.isRoot)
          throw new Error("Cannot remove the root element. " + this.debugInfo());
        return y = this.parent.children.indexOf(this), [].splice.apply(this.parent.children, [y, y - y + 1].concat([])), this.parent;
      }, m.prototype.node = function(y, h, f) {
        var v, D;
        return y != null && (y = s(y)), h || (h = {}), h = s(h), l(h) || (D = [h, f], f = D[0], h = D[1]), v = new a(this, y, h), f != null && v.text(f), this.children.push(v), v;
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
        var h, f;
        return h = this.parent.children.indexOf(this), f = this.parent.children.splice(h), this.parent.comment(y), Array.prototype.push.apply(this.parent.children, f), this;
      }, m.prototype.commentAfter = function(y) {
        var h, f;
        return h = this.parent.children.indexOf(this), f = this.parent.children.splice(h + 1), this.parent.comment(y), Array.prototype.push.apply(this.parent.children, f), this;
      }, m.prototype.raw = function(y) {
        var h;
        return h = new c(this, y), this.children.push(h), this;
      }, m.prototype.dummy = function() {
        var y;
        return y = new i(this), this.children.push(y), y;
      }, m.prototype.instruction = function(y, h) {
        var f, v, D, x, w;
        if (y != null && (y = s(y)), h != null && (h = s(h)), Array.isArray(y))
          for (x = 0, w = y.length; x < w; x++)
            f = y[x], this.instruction(f);
        else if (l(y))
          for (f in y)
            b.call(y, f) && (v = y[f], this.instruction(f, v));
        else
          g(h) && (h = h.apply()), D = new o(this, y, h), this.children.push(D);
        return this;
      }, m.prototype.instructionBefore = function(y, h) {
        var f, v;
        return f = this.parent.children.indexOf(this), v = this.parent.children.splice(f), this.parent.instruction(y, h), Array.prototype.push.apply(this.parent.children, v), this;
      }, m.prototype.instructionAfter = function(y, h) {
        var f, v;
        return f = this.parent.children.indexOf(this), v = this.parent.children.splice(f + 1), this.parent.instruction(y, h), Array.prototype.push.apply(this.parent.children, v), this;
      }, m.prototype.declaration = function(y, h, f) {
        var v, D;
        return v = this.document(), D = new n(v, y, h, f), v.children[0] instanceof n ? v.children[0] = D : v.children.unshift(D), v.root() || v;
      }, m.prototype.doctype = function(y, h) {
        var f, v, D, x, w, E, S, I, q, $;
        for (v = this.document(), D = new r(v, y, h), q = v.children, x = w = 0, S = q.length; w < S; x = ++w)
          if (f = q[x], f instanceof r)
            return v.children[x] = D, D;
        for ($ = v.children, x = E = 0, I = $.length; E < I; x = ++E)
          if (f = $[x], f.isRoot)
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
        var h, f;
        return y = y || this.name, y == null && !((h = this.parent) != null && h.name) ? "" : y == null ? "parent: <" + this.parent.name + ">" : (f = this.parent) != null && f.name ? "node: <" + y + ">, parent: <" + this.parent.name + ">" : "node: <" + y + ">";
      }, m.prototype.ele = function(y, h, f) {
        return this.element(y, h, f);
      }, m.prototype.nod = function(y, h, f) {
        return this.node(y, h, f);
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
      }, m.prototype.dec = function(y, h, f) {
        return this.declaration(y, h, f);
      }, m.prototype.dtd = function(y, h) {
        return this.doctype(y, h);
      }, m.prototype.e = function(y, h, f) {
        return this.element(y, h, f);
      }, m.prototype.n = function(y, h, f) {
        return this.node(y, h, f);
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
  }).call(re)), Is.exports;
}
var Ks = { exports: {} }, ng;
function t1() {
  return ng || (ng = 1, (function() {
    var e = function(n, r) {
      return function() {
        return n.apply(r, arguments);
      };
    }, t = {}.hasOwnProperty;
    Ks.exports = function() {
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
  }).call(re)), Ks.exports;
}
var Js = { exports: {} }, Qs = { exports: {} }, rg;
function n1() {
  return rg || (rg = 1, (function() {
    var e = {}.hasOwnProperty;
    Qs.exports = function() {
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
  }).call(re)), Qs.exports;
}
var ig;
function ol() {
  return ig || (ig = 1, (function() {
    var e, t, n, r, i, a, o, c, u, s, d, g, l, p, b = function(y, h) {
      for (var f in h)
        m.call(h, f) && (y[f] = h[f]);
      function v() {
        this.constructor = y;
      }
      return v.prototype = h.prototype, y.prototype = new v(), y.__super__ = h.prototype, y;
    }, m = {}.hasOwnProperty;
    o = Lo(), c = qo(), e = Io(), t = No(), s = Wo(), g = jo(), l = Zo(), d = Xo(), u = al(), n = Mo(), r = Po(), i = $o(), a = zo(), p = n1(), Js.exports = function(y) {
      b(h, y);
      function h(f) {
        h.__super__.constructor.call(this, f);
      }
      return h.prototype.document = function(f) {
        var v, D, x, w, E;
        for (this.textispresent = !1, w = "", E = f.children, D = 0, x = E.length; D < x; D++)
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
      }, h.prototype.attribute = function(f) {
        return " " + f.name + '="' + f.value + '"';
      }, h.prototype.cdata = function(f, v) {
        return this.space(v) + "<![CDATA[" + f.text + "]]>" + this.newline;
      }, h.prototype.comment = function(f, v) {
        return this.space(v) + "<!-- " + f.text + " -->" + this.newline;
      }, h.prototype.declaration = function(f, v) {
        var D;
        return D = this.space(v), D += '<?xml version="' + f.version + '"', f.encoding != null && (D += ' encoding="' + f.encoding + '"'), f.standalone != null && (D += ' standalone="' + f.standalone + '"'), D += this.spacebeforeslash + "?>", D += this.newline, D;
      }, h.prototype.docType = function(f, v) {
        var D, x, w, E, S;
        if (v || (v = 0), E = this.space(v), E += "<!DOCTYPE " + f.root().name, f.pubID && f.sysID ? E += ' PUBLIC "' + f.pubID + '" "' + f.sysID + '"' : f.sysID && (E += ' SYSTEM "' + f.sysID + '"'), f.children.length > 0) {
          for (E += " [", E += this.newline, S = f.children, x = 0, w = S.length; x < w; x++)
            D = S[x], E += (function() {
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
      }, h.prototype.element = function(f, v) {
        var D, x, w, E, S, I, q, $, R, P, G, Q, A;
        v || (v = 0), A = !1, this.textispresent ? (this.newline = "", this.pretty = !1) : (this.newline = this.newlinedefault, this.pretty = this.prettydefault), Q = this.space(v), $ = "", $ += Q + "<" + f.name, R = f.attributes;
        for (q in R)
          m.call(R, q) && (D = R[q], $ += this.attribute(D));
        if (f.children.length === 0 || f.children.every(function(T) {
          return T.value === "";
        }))
          this.allowEmpty ? $ += "></" + f.name + ">" + this.newline : $ += this.spacebeforeslash + "/>" + this.newline;
        else if (this.pretty && f.children.length === 1 && f.children[0].value != null)
          $ += ">", $ += f.children[0].value, $ += "</" + f.name + ">" + this.newline;
        else {
          if (this.dontprettytextnodes) {
            for (P = f.children, w = 0, S = P.length; w < S; w++)
              if (x = P[w], x.value != null) {
                this.textispresent++, A = !0;
                break;
              }
          }
          for (this.textispresent && (this.newline = "", this.pretty = !1, Q = this.space(v)), $ += ">" + this.newline, G = f.children, E = 0, I = G.length; E < I; E++)
            x = G[E], $ += (function() {
              switch (!1) {
                case !(x instanceof e):
                  return this.cdata(x, v + 1);
                case !(x instanceof t):
                  return this.comment(x, v + 1);
                case !(x instanceof s):
                  return this.element(x, v + 1);
                case !(x instanceof g):
                  return this.raw(x, v + 1);
                case !(x instanceof l):
                  return this.text(x, v + 1);
                case !(x instanceof d):
                  return this.processingInstruction(x, v + 1);
                case !(x instanceof u):
                  return "";
                default:
                  throw new Error("Unknown XML node type: " + x.constructor.name);
              }
            }).call(this);
          A && this.textispresent--, this.textispresent || (this.newline = this.newlinedefault, this.pretty = this.prettydefault), $ += Q + "</" + f.name + ">" + this.newline;
        }
        return $;
      }, h.prototype.processingInstruction = function(f, v) {
        var D;
        return D = this.space(v) + "<?" + f.target, f.value && (D += " " + f.value), D += this.spacebeforeslash + "?>" + this.newline, D;
      }, h.prototype.raw = function(f, v) {
        return this.space(v) + f.value + this.newline;
      }, h.prototype.text = function(f, v) {
        return this.space(v) + f.value + this.newline;
      }, h.prototype.dtdAttList = function(f, v) {
        var D;
        return D = this.space(v) + "<!ATTLIST " + f.elementName + " " + f.attributeName + " " + f.attributeType, f.defaultValueType !== "#DEFAULT" && (D += " " + f.defaultValueType), f.defaultValue && (D += ' "' + f.defaultValue + '"'), D += this.spacebeforeslash + ">" + this.newline, D;
      }, h.prototype.dtdElement = function(f, v) {
        return this.space(v) + "<!ELEMENT " + f.name + " " + f.value + this.spacebeforeslash + ">" + this.newline;
      }, h.prototype.dtdEntity = function(f, v) {
        var D;
        return D = this.space(v) + "<!ENTITY", f.pe && (D += " %"), D += " " + f.name, f.value ? D += ' "' + f.value + '"' : (f.pubID && f.sysID ? D += ' PUBLIC "' + f.pubID + '" "' + f.sysID + '"' : f.sysID && (D += ' SYSTEM "' + f.sysID + '"'), f.nData && (D += " NDATA " + f.nData)), D += this.spacebeforeslash + ">" + this.newline, D;
      }, h.prototype.dtdNotation = function(f, v) {
        var D;
        return D = this.space(v) + "<!NOTATION " + f.name, f.pubID && f.sysID ? D += ' PUBLIC "' + f.pubID + '" "' + f.sysID + '"' : f.pubID ? D += ' PUBLIC "' + f.pubID + '"' : f.sysID && (D += ' SYSTEM "' + f.sysID + '"'), D += this.spacebeforeslash + ">" + this.newline, D;
      }, h.prototype.openNode = function(f, v) {
        var D, x, w, E;
        if (v || (v = 0), f instanceof s) {
          w = this.space(v) + "<" + f.name, E = f.attributes;
          for (x in E)
            m.call(E, x) && (D = E[x], w += this.attribute(D));
          return w += (f.children ? ">" : "/>") + this.newline, w;
        } else
          return w = this.space(v) + "<!DOCTYPE " + f.rootNodeName, f.pubID && f.sysID ? w += ' PUBLIC "' + f.pubID + '" "' + f.sysID + '"' : f.sysID && (w += ' SYSTEM "' + f.sysID + '"'), w += (f.children ? " [" : ">") + this.newline, w;
      }, h.prototype.closeNode = function(f, v) {
        switch (v || (v = 0), !1) {
          case !(f instanceof s):
            return this.space(v) + "</" + f.name + ">" + this.newline;
          case !(f instanceof c):
            return this.space(v) + "]>" + this.newline;
        }
      }, h;
    }(p);
  }).call(re)), Js.exports;
}
var ag;
function S8() {
  return ag || (ag = 1, (function() {
    var e, t, n, r, i = function(o, c) {
      for (var u in c)
        a.call(c, u) && (o[u] = c[u]);
      function s() {
        this.constructor = o;
      }
      return s.prototype = c.prototype, o.prototype = new s(), o.__super__ = c.prototype, o;
    }, a = {}.hasOwnProperty;
    r = Rn().isPlainObject, e = lt(), n = t1(), t = ol(), Ws.exports = function(o) {
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
  }).call(re)), Ws.exports;
}
var eu = { exports: {} }, og;
function k8() {
  return og || (og = 1, (function() {
    var e, t, n, r, i, a, o, c, u, s, d, g, l, p, b, m, y, h, f, v, D = {}.hasOwnProperty;
    v = Rn(), h = v.isObject, y = v.isFunction, f = v.isPlainObject, m = v.getValue, s = Wo(), t = Io(), n = No(), g = jo(), b = Zo(), d = Xo(), c = Lo(), u = qo(), r = Mo(), a = $o(), i = Po(), o = zo(), e = e1(), p = t1(), l = ol(), eu.exports = function() {
      function x(w, E, S) {
        var I;
        this.name = "?xml", w || (w = {}), w.writer ? f(w.writer) && (I = w.writer, w.writer = new l(I)) : w.writer = new l(w), this.options = w, this.writer = w.writer, this.stringify = new p(w), this.onDataCallback = E || function() {
        }, this.onEndCallback = S || function() {
        }, this.currentNode = null, this.currentLevel = -1, this.openTags = {}, this.documentStarted = !1, this.documentCompleted = !1, this.root = null;
      }
      return x.prototype.node = function(w, E, S) {
        var I, q;
        if (w == null)
          throw new Error("Missing node name.");
        if (this.root && this.currentLevel === -1)
          throw new Error("Document can only have one root node. " + this.debugInfo(w));
        return this.openCurrent(), w = m(w), E === null && S == null && (I = [{}, null], E = I[0], S = I[1]), E == null && (E = {}), E = m(E), h(E) || (q = [E, S], S = q[0], E = q[1]), this.currentNode = new s(this, w, E), this.currentNode.children = !1, this.currentLevel++, this.openTags[this.currentLevel] = this.currentNode, S != null && this.text(S), this;
      }, x.prototype.element = function(w, E, S) {
        return this.currentNode && this.currentNode instanceof u ? this.dtdElement.apply(this, arguments) : this.node(w, E, S);
      }, x.prototype.attribute = function(w, E) {
        var S, I;
        if (!this.currentNode || this.currentNode.children)
          throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(w));
        if (w != null && (w = m(w)), h(w))
          for (S in w)
            D.call(w, S) && (I = w[S], this.attribute(S, I));
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
        var S, I, q, $, R;
        if (this.openCurrent(), w != null && (w = m(w)), E != null && (E = m(E)), Array.isArray(w))
          for (S = 0, $ = w.length; S < $; S++)
            I = w[S], this.instruction(I);
        else if (h(w))
          for (I in w)
            D.call(w, I) && (q = w[I], this.instruction(I, q));
        else
          y(E) && (E = E.apply()), R = new d(this, w, E), this.onData(this.writer.processingInstruction(R, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      }, x.prototype.declaration = function(w, E, S) {
        var I;
        if (this.openCurrent(), this.documentStarted)
          throw new Error("declaration() must be the first node.");
        return I = new c(this, w, E, S), this.onData(this.writer.declaration(I, this.currentLevel + 1), this.currentLevel + 1), this;
      }, x.prototype.doctype = function(w, E, S) {
        if (this.openCurrent(), w == null)
          throw new Error("Missing root node name.");
        if (this.root)
          throw new Error("dtd() must come before the root node.");
        return this.currentNode = new u(this, E, S), this.currentNode.rootNodeName = w, this.currentNode.children = !1, this.currentLevel++, this.openTags[this.currentLevel] = this.currentNode, this;
      }, x.prototype.dtdElement = function(w, E) {
        var S;
        return this.openCurrent(), S = new i(this, w, E), this.onData(this.writer.dtdElement(S, this.currentLevel + 1), this.currentLevel + 1), this;
      }, x.prototype.attList = function(w, E, S, I, q) {
        var $;
        return this.openCurrent(), $ = new r(this, w, E, S, I, q), this.onData(this.writer.dtdAttList($, this.currentLevel + 1), this.currentLevel + 1), this;
      }, x.prototype.entity = function(w, E) {
        var S;
        return this.openCurrent(), S = new a(this, !1, w, E), this.onData(this.writer.dtdEntity(S, this.currentLevel + 1), this.currentLevel + 1), this;
      }, x.prototype.pEntity = function(w, E) {
        var S;
        return this.openCurrent(), S = new a(this, !0, w, E), this.onData(this.writer.dtdEntity(S, this.currentLevel + 1), this.currentLevel + 1), this;
      }, x.prototype.notation = function(w, E) {
        var S;
        return this.openCurrent(), S = new o(this, w, E), this.onData(this.writer.dtdNotation(S, this.currentLevel + 1), this.currentLevel + 1), this;
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
      }, x.prototype.nod = function(w, E, S) {
        return this.node(w, E, S);
      }, x.prototype.txt = function(w) {
        return this.text(w);
      }, x.prototype.dat = function(w) {
        return this.cdata(w);
      }, x.prototype.com = function(w) {
        return this.comment(w);
      }, x.prototype.ins = function(w, E) {
        return this.instruction(w, E);
      }, x.prototype.dec = function(w, E, S) {
        return this.declaration(w, E, S);
      }, x.prototype.dtd = function(w, E, S) {
        return this.doctype(w, E, S);
      }, x.prototype.e = function(w, E, S) {
        return this.element(w, E, S);
      }, x.prototype.n = function(w, E, S) {
        return this.node(w, E, S);
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
  }).call(re)), eu.exports;
}
var tu = { exports: {} }, cg;
function B8() {
  return cg || (cg = 1, (function() {
    var e, t, n, r, i, a, o, c, u, s, d, g, l, p, b = function(y, h) {
      for (var f in h)
        m.call(h, f) && (y[f] = h[f]);
      function v() {
        this.constructor = y;
      }
      return v.prototype = h.prototype, y.prototype = new v(), y.__super__ = h.prototype, y;
    }, m = {}.hasOwnProperty;
    o = Lo(), c = qo(), e = Io(), t = No(), s = Wo(), g = jo(), l = Zo(), d = Xo(), u = al(), n = Mo(), r = Po(), i = $o(), a = zo(), p = n1(), tu.exports = function(y) {
      b(h, y);
      function h(f, v) {
        h.__super__.constructor.call(this, v), this.stream = f;
      }
      return h.prototype.document = function(f) {
        var v, D, x, w, E, S, I, q;
        for (S = f.children, D = 0, w = S.length; D < w; D++)
          v = S[D], v.isLastRootNode = !1;
        for (f.children[f.children.length - 1].isLastRootNode = !0, I = f.children, q = [], x = 0, E = I.length; x < E; x++)
          if (v = I[x], !(v instanceof u))
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
      }, h.prototype.attribute = function(f) {
        return this.stream.write(" " + f.name + '="' + f.value + '"');
      }, h.prototype.cdata = function(f, v) {
        return this.stream.write(this.space(v) + "<![CDATA[" + f.text + "]]>" + this.endline(f));
      }, h.prototype.comment = function(f, v) {
        return this.stream.write(this.space(v) + "<!-- " + f.text + " -->" + this.endline(f));
      }, h.prototype.declaration = function(f, v) {
        return this.stream.write(this.space(v)), this.stream.write('<?xml version="' + f.version + '"'), f.encoding != null && this.stream.write(' encoding="' + f.encoding + '"'), f.standalone != null && this.stream.write(' standalone="' + f.standalone + '"'), this.stream.write(this.spacebeforeslash + "?>"), this.stream.write(this.endline(f));
      }, h.prototype.docType = function(f, v) {
        var D, x, w, E;
        if (v || (v = 0), this.stream.write(this.space(v)), this.stream.write("<!DOCTYPE " + f.root().name), f.pubID && f.sysID ? this.stream.write(' PUBLIC "' + f.pubID + '" "' + f.sysID + '"') : f.sysID && this.stream.write(' SYSTEM "' + f.sysID + '"'), f.children.length > 0) {
          for (this.stream.write(" ["), this.stream.write(this.endline(f)), E = f.children, x = 0, w = E.length; x < w; x++)
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
        return this.stream.write(this.spacebeforeslash + ">"), this.stream.write(this.endline(f));
      }, h.prototype.element = function(f, v) {
        var D, x, w, E, S, I, q, $;
        v || (v = 0), $ = this.space(v), this.stream.write($ + "<" + f.name), I = f.attributes;
        for (S in I)
          m.call(I, S) && (D = I[S], this.attribute(D));
        if (f.children.length === 0 || f.children.every(function(R) {
          return R.value === "";
        }))
          this.allowEmpty ? this.stream.write("></" + f.name + ">") : this.stream.write(this.spacebeforeslash + "/>");
        else if (this.pretty && f.children.length === 1 && f.children[0].value != null)
          this.stream.write(">"), this.stream.write(f.children[0].value), this.stream.write("</" + f.name + ">");
        else {
          for (this.stream.write(">" + this.newline), q = f.children, w = 0, E = q.length; w < E; w++)
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
              case !(x instanceof l):
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
          this.stream.write($ + "</" + f.name + ">");
        }
        return this.stream.write(this.endline(f));
      }, h.prototype.processingInstruction = function(f, v) {
        return this.stream.write(this.space(v) + "<?" + f.target), f.value && this.stream.write(" " + f.value), this.stream.write(this.spacebeforeslash + "?>" + this.endline(f));
      }, h.prototype.raw = function(f, v) {
        return this.stream.write(this.space(v) + f.value + this.endline(f));
      }, h.prototype.text = function(f, v) {
        return this.stream.write(this.space(v) + f.value + this.endline(f));
      }, h.prototype.dtdAttList = function(f, v) {
        return this.stream.write(this.space(v) + "<!ATTLIST " + f.elementName + " " + f.attributeName + " " + f.attributeType), f.defaultValueType !== "#DEFAULT" && this.stream.write(" " + f.defaultValueType), f.defaultValue && this.stream.write(' "' + f.defaultValue + '"'), this.stream.write(this.spacebeforeslash + ">" + this.endline(f));
      }, h.prototype.dtdElement = function(f, v) {
        return this.stream.write(this.space(v) + "<!ELEMENT " + f.name + " " + f.value), this.stream.write(this.spacebeforeslash + ">" + this.endline(f));
      }, h.prototype.dtdEntity = function(f, v) {
        return this.stream.write(this.space(v) + "<!ENTITY"), f.pe && this.stream.write(" %"), this.stream.write(" " + f.name), f.value ? this.stream.write(' "' + f.value + '"') : (f.pubID && f.sysID ? this.stream.write(' PUBLIC "' + f.pubID + '" "' + f.sysID + '"') : f.sysID && this.stream.write(' SYSTEM "' + f.sysID + '"'), f.nData && this.stream.write(" NDATA " + f.nData)), this.stream.write(this.spacebeforeslash + ">" + this.endline(f));
      }, h.prototype.dtdNotation = function(f, v) {
        return this.stream.write(this.space(v) + "<!NOTATION " + f.name), f.pubID && f.sysID ? this.stream.write(' PUBLIC "' + f.pubID + '" "' + f.sysID + '"') : f.pubID ? this.stream.write(' PUBLIC "' + f.pubID + '"') : f.sysID && this.stream.write(' SYSTEM "' + f.sysID + '"'), this.stream.write(this.spacebeforeslash + ">" + this.endline(f));
      }, h.prototype.endline = function(f) {
        return f.isLastRootNode ? "" : this.newline;
      }, h;
    }(p);
  }).call(re)), tu.exports;
}
(function() {
  var e, t, n, r, i, a, o;
  o = Rn(), i = o.assign, a = o.isFunction, e = S8(), t = k8(), r = ol(), n = B8(), ci.create = function(c, u, s, d) {
    var g, l;
    if (c == null)
      throw new Error("Root element needs a name.");
    return d = i({}, u, s, d), g = new e(d), l = g.element(c), d.headless || (g.declaration(d), (d.pubID != null || d.sysID != null) && g.doctype(d)), l;
  }, ci.begin = function(c, u, s) {
    var d;
    return a(c) && (d = [c, u], u = d[0], s = d[1], c = {}), u ? new t(c, u, s) : new e(c);
  }, ci.stringWriter = function(c) {
    return new r(c);
  }, ci.streamWriter = function(c, u) {
    return new n(c, u);
  };
}).call(re);
var sg = Se, R8 = ci;
Qy.writeString = O8;
function O8(e, t) {
  var n = sg.invert(t), r = {
    element: a,
    text: W8
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
    var s = R8.create(o(u.name), {
      version: "1.0",
      encoding: "UTF-8",
      standalone: !0
    });
    return sg.forEach(t, function(d, g) {
      var l = "xmlns" + (g === "" ? "" : ":" + g);
      s.attribute(l, d);
    }), u.children.forEach(function(d) {
      i(s, d);
    }), s.end();
  }
  return c(e);
}
function W8(e, t) {
  e.text(t.value);
}
var Ho = Kr;
hn.Element = Ho.Element;
hn.element = Ho.element;
hn.emptyElement = Ho.emptyElement;
hn.text = Ho.text;
hn.readString = Dy.readString;
hn.writeString = Qy.writeString;
var I8 = Se, N8 = $e, L8 = hn;
Hd.read = r1;
Hd.readXmlFromZipFile = $8;
var M8 = {
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
  return L8.readString(e, M8).then(function(t) {
    return i1(t)[0];
  });
}
function $8(e, t) {
  return e.exists(t) ? e.read(t, "utf-8").then(P8).then(r1) : N8.resolve(null);
}
function P8(e) {
  return e.replace(/^\uFEFF/g, "");
}
function i1(e) {
  return e.type === "element" ? e.name === "mc:AlternateContent" ? e.firstOrEmpty("mc:Fallback").children : (e.children = I8.flatten(e.children.map(i1, !0)), [e]) : [e];
}
var cl = {}, En = {}, sl = {};
Object.defineProperty(sl, "__esModule", { value: !0 });
var z8 = [
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
sl.default = z8;
var q8 = re && re.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(En, "__esModule", { value: !0 });
En.hex = En.dec = En.codePoint = void 0;
var j8 = q8(sl), a1 = {}, Z8 = String.fromCodePoint ? String.fromCodePoint : G8;
for (var nu = 0, ug = j8.default; nu < ug.length; nu++) {
  var ru = ug[nu], dg = parseInt(ru["Unicode dec"], 10), X8 = {
    codePoint: dg,
    string: Z8(dg)
  };
  a1[ru["Typeface name"].toUpperCase() + "_" + ru["Dingbat dec"]] = X8;
}
function ul(e, t) {
  return a1[e.toUpperCase() + "_" + t];
}
En.codePoint = ul;
function H8(e, t) {
  return ul(e, parseInt(t, 10));
}
En.dec = H8;
function V8(e, t) {
  return ul(e, parseInt(t, 16));
}
En.hex = V8;
function G8(e) {
  if (e <= 65535)
    return String.fromCharCode(e);
  var t = Math.floor((e - 65536) / 1024) + 55296, n = (e - 65536) % 1024 + 56320;
  return String.fromCharCode(t, n);
}
var On = {}, lg = Se;
On.paragraph = Y8;
On.run = K8;
On._elements = o1;
On._elementsOfType = dl;
On.getDescendantsOfType = J8;
On.getDescendants = c1;
function Y8(e) {
  return dl("paragraph", e);
}
function K8(e) {
  return dl("run", e);
}
function dl(e, t) {
  return o1(function(n) {
    return n.type === e ? t(n) : n;
  });
}
function o1(e) {
  return function t(n) {
    if (n.children) {
      var r = lg.map(n.children, t);
      n = lg.extend(n, { children: r });
    }
    return e(n);
  };
}
function J8(e, t) {
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
var ll = {};
ll.uriToZipEntryName = Q8;
ll.replaceFragment = eA;
function Q8(e, t) {
  return t.charAt(0) === "/" ? t.substr(1) : e + "/" + t;
}
function eA(e, t) {
  var n = e.indexOf("#");
  return n !== -1 && (e = e.substring(0, n)), e + "#" + t;
}
cl.createBodyReader = rA;
cl._readNumberingProperties = d1;
var fg = En, Dt = Se, _e = se, u1 = mt.Result, an = mt.warning, tA = hn, nA = On, hg = ll;
function rA(e) {
  return {
    readXmlElement: function(t) {
      return new pg(e).readXmlElement(t);
    },
    readXmlElements: function(t) {
      return new pg(e).readXmlElements(t);
    }
  };
}
function pg(e) {
  var t = [], n = [], r = [], i = e.relationships, a = e.contentTypes, o = e.docxFile, c = e.files, u = e.numbering, s = e.styles;
  function d(B) {
    var M = B.map(g);
    return gg(M);
  }
  function g(B) {
    if (B.type === "element") {
      var M = A[B.name];
      if (M)
        return M(B);
      if (!Object.prototype.hasOwnProperty.call(aA, B.name)) {
        var H = an("An unrecognised element was ignored: " + B.name);
        return ai([H]);
      }
    }
    return Dr();
  }
  function l(B) {
    return v(B).map(function(M) {
      return {
        type: "paragraphProperties",
        styleId: M.styleId,
        styleName: M.name,
        alignment: B.firstOrEmpty("w:jc").attributes["w:val"],
        numbering: d1(M.styleId, B.firstOrEmpty("w:numPr"), u),
        indent: p(B.firstOrEmpty("w:ind"))
      };
    });
  }
  function p(B) {
    return {
      start: B.attributes["w:start"] || B.attributes["w:left"],
      end: B.attributes["w:end"] || B.attributes["w:right"],
      firstLine: B.attributes["w:firstLine"],
      hanging: B.attributes["w:hanging"]
    };
  }
  function b(B) {
    return D(B).map(function(M) {
      var H = B.firstOrEmpty("w:sz").attributes["w:val"], ne = /^[0-9]+$/.test(H) ? parseInt(H, 10) / 2 : null;
      return {
        type: "runProperties",
        styleId: M.styleId,
        styleName: M.name,
        verticalAlignment: B.firstOrEmpty("w:vertAlign").attributes["w:val"],
        font: B.firstOrEmpty("w:rFonts").attributes["w:ascii"],
        fontSize: ne,
        isBold: y(B.first("w:b")),
        isUnderline: m(B.first("w:u")),
        isItalic: y(B.first("w:i")),
        isStrikethrough: y(B.first("w:strike")),
        isAllCaps: y(B.first("w:caps")),
        isSmallCaps: y(B.first("w:smallCaps")),
        highlight: f(B.firstOrEmpty("w:highlight").attributes["w:val"])
      };
    });
  }
  function m(B) {
    if (B) {
      var M = B.attributes["w:val"];
      return M !== void 0 && M !== "false" && M !== "0" && M !== "none";
    } else
      return !1;
  }
  function y(B) {
    if (B) {
      var M = B.attributes["w:val"];
      return M !== "false" && M !== "0";
    } else
      return !1;
  }
  function h(B) {
    return B !== "false" && B !== "0";
  }
  function f(B) {
    return !B || B === "none" ? null : B;
  }
  function v(B) {
    return w(B, "w:pStyle", "Paragraph", s.findParagraphStyleById);
  }
  function D(B) {
    return w(B, "w:rStyle", "Run", s.findCharacterStyleById);
  }
  function x(B) {
    return w(B, "w:tblStyle", "Table", s.findTableStyleById);
  }
  function w(B, M, H, ne) {
    var oe = [], le = B.first(M), Ue = null, Ne = null;
    if (le && (Ue = le.attributes["w:val"], Ue)) {
      var Kt = ne(Ue);
      Kt ? Ne = Kt.name : oe.push(K(H, Ue));
    }
    return wa({ styleId: Ue, name: Ne }, oe);
  }
  function E(B) {
    var M = B.attributes["w:fldCharType"];
    if (M === "begin")
      t.push({ type: "begin", fldChar: B }), n = [];
    else if (M === "end") {
      var H = t.pop();
      if (H.type === "begin" && (H = I(H)), H.type === "checkbox")
        return ft(_e.checkbox({
          checked: H.checked
        }));
    } else if (M === "separate") {
      var ne = t.pop(), oe = I(ne);
      t.push(oe);
    }
    return Dr();
  }
  function S() {
    var B = Dt.last(t.filter(function(M) {
      return M.type === "hyperlink";
    }));
    return B ? B.options : null;
  }
  function I(B) {
    return q(
      n.join(""),
      B.type === "begin" ? B.fldChar : tA.emptyElement
    );
  }
  function q(B, M) {
    var H = /\s*HYPERLINK "(.*)"/.exec(B);
    if (H)
      return { type: "hyperlink", options: { href: H[1] } };
    var ne = /\s*HYPERLINK\s+\\l\s+"(.*)"/.exec(B);
    if (ne)
      return { type: "hyperlink", options: { anchor: ne[1] } };
    var oe = /\s*FORMCHECKBOX\s*/.exec(B);
    if (oe) {
      var le = M.firstOrEmpty("w:ffData").firstOrEmpty("w:checkBox"), Ue = le.first("w:checked"), Ne = Ue == null ? y(le.first("w:default")) : y(Ue);
      return { type: "checkbox", checked: Ne };
    }
    return { type: "unknown" };
  }
  function $(B) {
    return n.push(B.text()), Dr();
  }
  function R(B) {
    var M = B.attributes["w:font"], H = B.attributes["w:char"], ne = fg.hex(M, H);
    return ne == null && /^F0..$/.test(H) && (ne = fg.hex(M, H.substring(2))), ne == null ? ai([an(
      "A w:sym element with an unsupported character was ignored: char " + H + " in font " + M
    )]) : ft(new _e.Text(ne.string));
  }
  function P(B) {
    return function(M) {
      var H = M.attributes["w:id"];
      return ft(new _e.NoteReference({
        noteType: B,
        noteId: H
      }));
    };
  }
  function G(B) {
    return ft(_e.commentReference({
      commentId: B.attributes["w:id"]
    }));
  }
  function Q(B) {
    return d(B.children);
  }
  var A = {
    "w:p": function(B) {
      var M = B.firstOrEmpty("w:pPr"), H = !!M.firstOrEmpty("w:rPr").first("w:del");
      if (H)
        return B.children.forEach(function(oe) {
          r.push(oe);
        }), Dr();
      var ne = B.children;
      return r.length > 0 && (ne = r.concat(ne), r = []), je.map(
        l(M),
        d(ne),
        function(oe, le) {
          return new _e.Paragraph(le, oe);
        }
      ).insertExtra();
    },
    "w:r": function(B) {
      return je.map(
        b(B.firstOrEmpty("w:rPr")),
        d(B.children),
        function(M, H) {
          var ne = S();
          return ne !== null && (H = [new _e.Hyperlink(H, ne)]), new _e.Run(H, M);
        }
      );
    },
    "w:fldChar": E,
    "w:instrText": $,
    "w:t": function(B) {
      return ft(new _e.Text(B.text()));
    },
    "w:tab": function(B) {
      return ft(new _e.Tab());
    },
    "w:noBreakHyphen": function() {
      return ft(new _e.Text("‑"));
    },
    "w:softHyphen": function(B) {
      return ft(new _e.Text("­"));
    },
    "w:sym": R,
    "w:hyperlink": function(B) {
      var M = B.attributes["r:id"], H = B.attributes["w:anchor"];
      return d(B.children).map(function(ne) {
        function oe(Ue) {
          var Ne = B.attributes["w:tgtFrame"] || null;
          return new _e.Hyperlink(
            ne,
            Dt.extend({ targetFrame: Ne }, Ue)
          );
        }
        if (M) {
          var le = i.findTargetByRelationshipId(M);
          return H && (le = hg.replaceFragment(le, H)), oe({ href: le });
        } else return H ? oe({ anchor: H }) : ne;
      });
    },
    "w:tbl": T,
    "w:tr": F,
    "w:tc": O,
    "w:footnoteReference": P("footnote"),
    "w:endnoteReference": P("endnote"),
    "w:commentReference": G,
    "w:br": function(B) {
      var M = B.attributes["w:type"];
      return M == null || M === "textWrapping" ? ft(_e.lineBreak) : M === "page" ? ft(_e.pageBreak) : M === "column" ? ft(_e.columnBreak) : ai([an("Unsupported break type: " + M)]);
    },
    "w:bookmarkStart": function(B) {
      var M = B.attributes["w:name"];
      return M === "_GoBack" ? Dr() : ft(new _e.BookmarkStart({ name: M }));
    },
    "mc:AlternateContent": function(B) {
      return Q(B.firstOrEmpty("mc:Fallback"));
    },
    "w:sdt": function(B) {
      var M = d(B.firstOrEmpty("w:sdtContent").children);
      return M.map(function(H) {
        var ne = B.firstOrEmpty("w:sdtPr").first("wordml:checkbox");
        if (ne) {
          var oe = ne.first("wordml:checked"), le = !!oe && h(
            oe.attributes["wordml:val"]
          ), Ue = _e.checkbox({
            checked: le
          }), Ne = !1, Kt = H.map(nA._elementsOfType(
            _e.types.text,
            function(nt) {
              return nt.value.length > 0 && !Ne ? (Ne = !0, Ue) : nt;
            }
          ));
          return Ne ? Kt : Ue;
        } else
          return H;
      });
    },
    "w:ins": Q,
    "w:object": Q,
    "w:smartTag": Q,
    "w:drawing": Q,
    "w:pict": function(B) {
      return Q(B).toExtra();
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
  function T(B) {
    var M = _(B.firstOrEmpty("w:tblPr"));
    return d(B.children).flatMap(k).flatMap(function(H) {
      return M.map(function(ne) {
        return _e.Table(H, ne);
      });
    });
  }
  function _(B) {
    return x(B).map(function(M) {
      return {
        styleId: M.styleId,
        styleName: M.name
      };
    });
  }
  function F(B) {
    var M = B.firstOrEmpty("w:trPr"), H = !!M.first("w:del");
    if (H)
      return Dr();
    var ne = !!M.first("w:tblHeader");
    return d(B.children).map(function(oe) {
      return _e.TableRow(oe, { isHeader: ne });
    });
  }
  function O(B) {
    return d(B.children).map(function(M) {
      var H = B.firstOrEmpty("w:tcPr"), ne = H.firstOrEmpty("w:gridSpan").attributes["w:val"], oe = ne ? parseInt(ne, 10) : 1, le = _e.TableCell(M, { colSpan: oe });
      return le._vMerge = L(H), le;
    });
  }
  function L(B) {
    var M = B.first("w:vMerge");
    if (M) {
      var H = M.attributes["w:val"];
      return H === "continue" || !H;
    } else
      return null;
  }
  function k(B) {
    var M = Dt.any(B, function(oe) {
      return oe.type !== _e.types.tableRow;
    });
    if (M)
      return wa(B, [an(
        "unexpected non-row element in table, cell merging may be incorrect"
      )]);
    var H = Dt.any(B, function(oe) {
      return Dt.any(oe.children, function(le) {
        return le.type !== _e.types.tableCell;
      });
    });
    if (H)
      return wa(B, [an(
        "unexpected non-cell element in table row, cell merging may be incorrect"
      )]);
    var ne = {};
    return B.forEach(function(oe) {
      var le = 0;
      oe.children.forEach(function(Ue) {
        Ue._vMerge && ne[le] ? ne[le].rowSpan++ : (ne[le] = Ue, Ue._vMerge = !1), le += Ue.colSpan;
      });
    }), B.forEach(function(oe) {
      oe.children = oe.children.filter(function(le) {
        return !le._vMerge;
      }), oe.children.forEach(function(le) {
        delete le._vMerge;
      });
    }), ft(B);
  }
  function z(B) {
    var M = B.getElementsByTagName("a:graphic").getElementsByTagName("a:graphicData").getElementsByTagName("pic:pic").getElementsByTagName("pic:blipFill").getElementsByTagName("a:blip");
    return gg(M.map(ee.bind(null, B)));
  }
  function ee(B, M) {
    var H = B.first("wp:docPr").attributes, ne = te(H.descr) ? H.title : H.descr, oe = J(M);
    return oe === null ? ai([an("Could not find image file for a:blip element")]) : Z(oe, ne);
  }
  function te(B) {
    return B == null || /^\s*$/.test(B);
  }
  function J(B) {
    var M = B.attributes["r:embed"], H = B.attributes["r:link"];
    if (M)
      return C(M);
    if (H) {
      var ne = i.findTargetByRelationshipId(H);
      return {
        path: ne,
        read: c.read.bind(c, ne)
      };
    } else
      return null;
  }
  function U(B) {
    var M = B.attributes["r:id"];
    return M ? Z(
      C(M),
      B.attributes["o:title"]
    ) : ai([an("A v:imagedata element without a relationship ID was ignored")]);
  }
  function C(B) {
    var M = hg.uriToZipEntryName("word", i.findTargetByRelationshipId(B));
    return {
      path: M,
      read: o.read.bind(o, M)
    };
  }
  function Z(B, M) {
    var H = a.findContentType(B.path), ne = _e.Image({
      readImage: B.read,
      altText: M,
      contentType: H
    }), oe = iA[H] ? [] : an("Image of type " + H + " is unlikely to display in web browsers");
    return wa(ne, oe);
  }
  function K(B, M) {
    return an(
      B + " style with ID " + M + " was referenced but not defined in the document"
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
var iA = {
  "image/png": !0,
  "image/gif": !0,
  "image/jpeg": !0,
  "image/svg+xml": !0,
  "image/tiff": !0
}, aA = {
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
  return new je(null, null, e);
}
function Dr() {
  return new je(null);
}
function ft(e) {
  return new je(e);
}
function wa(e, t) {
  return new je(e, null, t);
}
function je(e, t, n) {
  this.value = e || [], this.extra = t || [], this._result = new u1({
    element: this.value,
    extra: t
  }, n), this.messages = this._result.messages;
}
je.prototype.toExtra = function() {
  return new je(null, Vo(this.extra, this.value), this.messages);
};
je.prototype.insertExtra = function() {
  var e = this.extra;
  return e && e.length ? new je(Vo(this.value, e), null, this.messages) : this;
};
je.prototype.map = function(e) {
  var t = this._result.map(function(n) {
    return e(n.element);
  });
  return new je(t.value, this.extra, t.messages);
};
je.prototype.flatMap = function(e) {
  var t = this._result.flatMap(function(n) {
    return e(n.element)._result;
  });
  return new je(t.value.element, Vo(this.extra, t.value.extra), t.messages);
};
je.map = function(e, t, n) {
  return new je(
    n(e.value, t.value),
    Vo(e.extra, t.extra),
    e.messages.concat(t.messages)
  );
};
function gg(e) {
  var t = u1.combine(Dt.pluck(e, "_result"));
  return new je(
    Dt.flatten(Dt.pluck(t.value, "element")),
    Dt.filter(Dt.flatten(Dt.pluck(t.value, "extra")), oA),
    t.messages
  );
}
function Vo(e, t) {
  return Dt.flatten([e, t]);
}
function oA(e) {
  return e;
}
var l1 = {};
l1.DocumentXmlReader = uA;
var cA = se, sA = mt.Result;
function uA(e) {
  var t = e.bodyReader;
  function n(r) {
    var i = r.first("w:body");
    if (i == null)
      throw new Error("Could not find the body element: are you sure this is a docx file?");
    var a = t.readXmlElements(i.children).map(function(o) {
      return new cA.Document(o, {
        notes: e.notes,
        comments: e.comments
      });
    });
    return new sA(a.value, a.messages);
  }
  return {
    convertXmlToDocument: n
  };
}
var Go = {};
Go.readRelationships = dA;
Go.defaultValue = new fl([]);
Go.Relationships = fl;
function dA(e) {
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
  }), new fl(t);
}
function fl(e) {
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
var hl = {};
hl.readContentTypesFromXml = fA;
var lA = {
  png: "png",
  gif: "gif",
  jpeg: "jpeg",
  jpg: "jpeg",
  tif: "tiff",
  tiff: "tiff",
  bmp: "bmp"
};
hl.defaultContentTypes = f1({}, {});
function fA(e) {
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
      var o = lA[a.toLowerCase()];
      return o ? "image/" + o : null;
    }
  };
}
var Yo = {}, Ta = Se;
Yo.readNumberingXml = hA;
Yo.Numbering = pl;
Yo.defaultNumbering = new pl({}, {});
function pl(e, t, n) {
  var r = Ta.flatten(Ta.values(t).map(function(c) {
    return Ta.values(c.levels);
  })), i = Ta.indexBy(
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
function hA(e, t) {
  if (!t || !t.styles)
    throw new Error("styles is missing");
  var n = pA(e), r = mA(e);
  return new pl(r, n, t.styles);
}
function pA(e) {
  var t = {};
  return e.getElementsByTagName("w:abstractNum").forEach(function(n) {
    var r = n.attributes["w:abstractNumId"];
    t[r] = gA(n);
  }), t;
}
function gA(e) {
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
function mA(e) {
  var t = {};
  return e.getElementsByTagName("w:num").forEach(function(n) {
    var r = n.attributes["w:numId"], i = n.first("w:abstractNumId").attributes["w:val"];
    t[r] = { abstractNumId: i };
  }), t;
}
var Ko = {};
Ko.readStylesXml = bA;
Ko.Styles = Ri;
Ko.defaultStyles = new Ri({}, {});
function Ri(e, t, n, r) {
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
Ri.EMPTY = new Ri({}, {}, {}, {});
function bA(e) {
  var t = {}, n = {}, r = {}, i = {}, a = {
    paragraph: t,
    character: n,
    table: r
  };
  return e.getElementsByTagName("w:style").forEach(function(o) {
    var c = yA(o);
    if (c.type === "numbering")
      i[c.styleId] = DA(o);
    else {
      var u = a[c.type];
      u && (u[c.styleId] = c);
    }
  }), new Ri(t, n, r, i);
}
function yA(e) {
  var t = e.attributes["w:type"], n = e.attributes["w:styleId"], r = vA(e);
  return { type: t, styleId: n, name: r };
}
function vA(e) {
  var t = e.first("w:name");
  return t ? t.attributes["w:val"] : null;
}
function DA(e) {
  var t = e.firstOrEmpty("w:pPr").firstOrEmpty("w:numPr").firstOrEmpty("w:numId").attributes["w:val"];
  return { numId: t };
}
var gl = {}, xA = se, _A = mt.Result;
gl.createFootnotesReader = h1.bind(re, "footnote");
gl.createEndnotesReader = h1.bind(re, "endnote");
function h1(e, t) {
  function n(a) {
    return _A.combine(a.getElementsByTagName("w:" + e).filter(r).map(i));
  }
  function r(a) {
    var o = a.attributes["w:type"];
    return o !== "continuationSeparator" && o !== "separator";
  }
  function i(a) {
    var o = a.attributes["w:id"];
    return t.readXmlElements(a.children).map(function(c) {
      return xA.Note({ noteType: e, noteId: o, body: c });
    });
  }
  return n;
}
var p1 = {}, wA = se, TA = mt.Result;
function UA(e) {
  function t(r) {
    return TA.combine(r.getElementsByTagName("w:comment").map(n));
  }
  function n(r) {
    var i = r.attributes["w:id"];
    function a(o) {
      return (r.attributes[o] || "").trim() || null;
    }
    return e.readXmlElements(r.children).map(function(o) {
      return wA.comment({
        commentId: i,
        body: o,
        authorName: a("w:author"),
        authorInitials: a("w:initials")
      });
    });
  }
  return t;
}
p1.createCommentsReader = UA;
var ml = {}, Jo = { exports: {} };
function g1(e) {
  return e.charAt(0) === "/";
}
function m1(e) {
  var t = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/, n = t.exec(e), r = n[1] || "", i = !!(r && r.charAt(1) !== ":");
  return !!(n[2] || i);
}
Jo.exports = process.platform === "win32" ? m1 : g1;
Jo.exports.posix = g1;
Jo.exports.win32 = m1;
var EA = Jo.exports, mg = Wi, AA = dv, CA = lv, FA = Lr.dirname, SA = Lr.resolve, kA = EA, si = $e;
ml.Files = bl;
ml.uriToPath = b1;
function bl(e) {
  function t(r, i) {
    return n(r).then(function(a) {
      return RA(a, i).caught(function(o) {
        var c = "could not open external image: '" + r + "' (document directory: '" + e + `')
` + o.message;
        return si.reject(new Error(c));
      });
    });
  }
  function n(r) {
    var i = b1(r);
    return kA(i) ? si.resolve(i) : e ? si.resolve(SA(e, i)) : si.reject(new Error("could not find external image '" + r + "', path of input document is unknown"));
  }
  return {
    read: t
  };
}
function BA(e) {
  return new bl(FA(e));
}
bl.relativeToFile = BA;
var RA = si.promisify(mg.readFile.bind(mg));
function b1(e, t) {
  t || (t = CA.platform());
  var n = AA.parse(e);
  if (OA(n) || WA(n)) {
    var r = decodeURIComponent(n.path);
    return t === "win32" && /^\/[a-z]:/i.test(r) ? r.slice(1) : r;
  } else
    throw new Error("Could not convert URI to path: " + e);
}
function OA(e) {
  return e.protocol === "file:" && (!e.host || e.host === "localhost");
}
function WA(e) {
  return !e.protocol && !e.host;
}
Ad.read = PA;
Ad._findPartPaths = v1;
var IA = $e, NA = se, iu = mt.Result, Ka = $i, y1 = Hd.readXmlFromZipFile, LA = cl.createBodyReader, MA = l1.DocumentXmlReader, Ir = Go, bg = hl, yg = Yo, vg = Ko, Dg = gl, $A = p1, xg = ml.Files;
function PA(e, t) {
  return t = t || {}, IA.props({
    contentTypes: qA(e),
    partPaths: v1(e),
    docxFile: e,
    files: t.path ? xg.relativeToFile(t.path) : new xg(null)
  }).also(function(n) {
    return {
      styles: ZA(e, n.partPaths.styles)
    };
  }).also(function(n) {
    return {
      numbering: jA(e, n.partPaths.numbering, n.styles)
    };
  }).also(function(n) {
    return {
      footnotes: Ua(n.partPaths.footnotes, n, function(r, i) {
        return i ? Dg.createFootnotesReader(r)(i) : new iu([]);
      }),
      endnotes: Ua(n.partPaths.endnotes, n, function(r, i) {
        return i ? Dg.createEndnotesReader(r)(i) : new iu([]);
      }),
      comments: Ua(n.partPaths.comments, n, function(r, i) {
        return i ? $A.createCommentsReader(r)(i) : new iu([]);
      })
    };
  }).also(function(n) {
    return {
      notes: n.footnotes.flatMap(function(r) {
        return n.endnotes.map(function(i) {
          return new NA.Notes(r.concat(i));
        });
      })
    };
  }).then(function(n) {
    return Ua(n.partPaths.mainDocument, n, function(r, i) {
      return n.notes.flatMap(function(a) {
        return n.comments.flatMap(function(o) {
          var c = new MA({
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
  return XA(e).then(function(t) {
    var n = _g({
      docxFile: e,
      relationships: t,
      relationshipType: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
      basePath: "",
      fallbackPath: "word/document.xml"
    });
    if (!e.exists(n))
      throw new Error("Could not find main document part. Are you sure this is a valid .docx file?");
    return Qr({
      filename: D1(n),
      readElement: Ir.readRelationships,
      defaultValue: Ir.defaultValue
    })(e).then(function(r) {
      function i(a) {
        return _g({
          docxFile: e,
          relationships: r,
          relationshipType: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/" + a,
          basePath: Ka.splitPath(n).dirname,
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
function _g(e) {
  var t = e.docxFile, n = e.relationships, r = e.relationshipType, i = e.basePath, a = e.fallbackPath, o = n.findTargetsByType(r), c = o.map(function(s) {
    return zA(Ka.joinPath(i, s), "/");
  }), u = c.filter(function(s) {
    return t.exists(s);
  });
  return u.length === 0 ? a : u[0];
}
function zA(e, t) {
  return e.substring(0, t.length) === t ? e.substring(t.length) : e;
}
function Qr(e) {
  return function(t) {
    return y1(t, e.filename).then(function(n) {
      return n ? e.readElement(n) : e.defaultValue;
    });
  };
}
function Ua(e, t, n) {
  var r = Qr({
    filename: D1(e),
    readElement: Ir.readRelationships,
    defaultValue: Ir.defaultValue
  });
  return r(t.docxFile).then(function(i) {
    var a = new LA({
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
  var t = Ka.splitPath(e);
  return Ka.joinPath(t.dirname, "_rels", t.basename + ".rels");
}
var qA = Qr({
  filename: "[Content_Types].xml",
  readElement: bg.readContentTypesFromXml,
  defaultValue: bg.defaultContentTypes
});
function jA(e, t, n) {
  return Qr({
    filename: t,
    readElement: function(r) {
      return yg.readNumberingXml(r, { styles: n });
    },
    defaultValue: yg.defaultNumbering
  })(e);
}
function ZA(e, t) {
  return Qr({
    filename: t,
    readElement: vg.readStylesXml,
    defaultValue: vg.defaultStyles
  })(e);
}
var XA = Qr({
  filename: "_rels/.rels",
  readElement: Ir.readRelationships,
  defaultValue: Ir.defaultValue
}), yl = {}, HA = Se, VA = $e, Oi = hn;
yl.writeStyleMap = YA;
yl.readStyleMap = QA;
var GA = "http://schemas.zwobble.org/mammoth/style-map", Ja = "mammoth/style-map", x1 = "/" + Ja;
function YA(e, t) {
  return e.write(Ja, t), KA(e).then(function() {
    return JA(e);
  });
}
function KA(e) {
  var t = "word/_rels/document.xml.rels", n = "http://schemas.openxmlformats.org/package/2006/relationships", r = "{" + n + "}Relationship";
  return e.read(t, "utf8").then(Oi.readString).then(function(i) {
    var a = i.children;
    _1(a, r, "Id", {
      Id: "rMammothStyleMap",
      Type: GA,
      Target: x1
    });
    var o = { "": n };
    return e.write(t, Oi.writeString(i, o));
  });
}
function JA(e) {
  var t = "[Content_Types].xml", n = "http://schemas.openxmlformats.org/package/2006/content-types", r = "{" + n + "}Override";
  return e.read(t, "utf8").then(Oi.readString).then(function(i) {
    var a = i.children;
    _1(a, r, "PartName", {
      PartName: x1,
      ContentType: "text/prs.mammoth.style-map"
    });
    var o = { "": n };
    return e.write(t, Oi.writeString(i, o));
  });
}
function _1(e, t, n, r) {
  var i = HA.find(e, function(a) {
    return a.name === t && a.attributes[n] === r[n];
  });
  i ? i.attributes = r : e.push(Oi.element(t, r));
}
function QA(e) {
  return e.exists(Ja) ? e.read(Ja, "utf8") : VA.resolve(null);
}
var vl = {}, Wn = {}, on = {}, yn = {}, wg;
function w1() {
  if (wg) return yn;
  wg = 1;
  var e = ec();
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
  yn.freshElement = n, yn.nonFreshElement = t, yn.elementWithTag = r, yn.text = i, yn.forceWrite = a;
  var o = {
    br: !0,
    hr: !0,
    img: !0,
    input: !0
  };
  function c(u) {
    return u.children.length === 0 && o[u.tag.tagName];
  }
  return yn.isVoidElement = c, yn;
}
var au, Tg;
function eC() {
  if (Tg) return au;
  Tg = 1;
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
    y.type === "element" && !y.tag.fresh && h && h.type === "element" && y.tag.matchesElement(h.tag) ? (y.tag.separator && u(h.children, t.text(y.tag.separator)), y.children.forEach(function(f) {
      u(h.children, f);
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
    forceWrite: l
  };
  function l(m) {
    return [m];
  }
  function p(m) {
    var y = s(m.children);
    return y.length === 0 && !t.isVoidElement(m) ? [] : [t.elementWithTag(m.tag, y)];
  }
  function b(m) {
    return m.value.length === 0 ? [] : [m];
  }
  return au = n, au;
}
var Ug;
function Qo() {
  if (Ug) return on;
  Ug = 1;
  var e = w1();
  on.freshElement = e.freshElement, on.nonFreshElement = e.nonFreshElement, on.elementWithTag = e.elementWithTag, on.text = e.text, on.forceWrite = e.forceWrite, on.simplify = eC();
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
  return on.write = t, on;
}
var Eg;
function ec() {
  if (Eg) return Wn;
  Eg = 1;
  var e = Se, t = Qo();
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
var Dl = {};
(function(e) {
  var t = Se, n = $e, r = Qo();
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
})(Dl);
var T1 = {}, U1 = {}, E1 = Se;
U1.writer = tC;
function tC(e) {
  return e = e || {}, e.prettyPrint ? nC() : A1();
}
var Ea = {
  div: !0,
  p: !0,
  ul: !0,
  li: !0
};
function nC() {
  var e = 0, t = "  ", n = [], r = !0, i = !1, a = A1();
  function o(b, m) {
    Ea[b] && l(), n.push(b), a.open(b, m), Ea[b] && e++, r = !1;
  }
  function c(b) {
    Ea[b] && (e--, l()), n.pop(), a.close(b);
  }
  function u(b) {
    g();
    var m = p() ? b : b.replace(`
`, `
` + t);
    a.text(m);
  }
  function s(b, m) {
    l(), a.selfClosing(b, m);
  }
  function d() {
    return n.length === 0 || Ea[n[n.length - 1]];
  }
  function g() {
    i || (l(), i = !0);
  }
  function l() {
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
      return " " + d + '="' + iC(s) + '"';
    }).join("");
  }
  function a(u) {
    e.push(rC(u));
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
function rC(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function iC(e) {
  return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var C1 = {}, aC = Se;
function Ag(e) {
  return Qa(e, e);
}
function Qa(e, t) {
  return function() {
    return { start: e, end: t };
  };
}
function oC(e) {
  var t = e.href || "";
  return t ? {
    start: "[",
    end: "](" + t + ")",
    anchorPosition: "before"
  } : {};
}
function cC(e) {
  var t = e.src || "", n = e.alt || "";
  return t || n ? { start: "![" + n + "](" + t + ")" } : {};
}
function Cg(e) {
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
function sC(e, t, n) {
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
  p: Qa("", `

`),
  br: Qa("", `  
`),
  ul: Cg({ isOrdered: !1 }),
  ol: Cg({ isOrdered: !0 }),
  li: sC,
  strong: Ag("__"),
  em: Ag("*"),
  a: oC,
  img: cC
};
(function() {
  for (var e = 1; e <= 6; e++)
    F1["h" + e] = Qa(S1("#", e) + " ", `

`);
})();
function S1(e, t) {
  return new Array(t + 1).join(e);
}
function uC() {
  var e = [], t = [], n = null, r = {};
  function i(d, g) {
    g = g || {};
    var l = F1[d] || function() {
      return {};
    }, p = l(g, n, r);
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
    var l = aC.isFunction(g.end) ? g.end() : g.end;
    e.push(l || "");
  }
  function c(d, g) {
    i(d, g), o();
  }
  function u(d) {
    e.push(dC(d));
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
C1.writer = uC;
function dC(e) {
  return e.replace(/\\/g, "\\\\").replace(/([\`\*_\{\}\[\]\(\)\#\+\-\.\!])/g, "\\$1");
}
var lC = U1, fC = C1;
T1.writer = hC;
function hC(e) {
  return e = e || {}, e.outputFormat === "markdown" ? fC.writer() : lC.writer(e);
}
var xn = Se, Fg = $e, Oa = se, bt = ec(), ku = mt, pC = Dl, ue = Qo(), gC = T1;
vl.DocumentConverter = mC;
function mC(e) {
  return {
    convertToHtml: function(t) {
      var n = xn.indexBy(
        t.type === Oa.types.document ? t.comments : [],
        "commentId"
      ), r = new bC(e, n);
      return r.convertToHtml(t);
    }
  };
}
function bC(e, t) {
  var n = 1, r = [], i = [];
  e = xn.extend({ ignoreEmptyParagraphs: !0 }, e);
  var a = e.idPrefix === void 0 ? "" : e.idPrefix, o = e.ignoreEmptyParagraphs, c = bt.topLevelElement("p"), u = e.styleMap || [];
  function s(_) {
    var F = [], O = g(_, F, {}), L = [];
    k1(O, function(z) {
      z.type === "deferred" && L.push(z);
    });
    var k = {};
    return Fg.mapSeries(L, function(z) {
      return z.value().then(function(ee) {
        k[z.id] = ee;
      });
    }).then(function() {
      function z(te) {
        return ou(te, function(J) {
          return J.type === "deferred" ? k[J.id] : J.children ? [
            xn.extend({}, J, {
              children: z(J.children)
            })
          ] : [J];
        });
      }
      var ee = gC.writer({
        prettyPrint: e.prettyPrint,
        outputFormat: e.outputFormat
      });
      return ue.write(ee, ue.simplify(z(O))), new ku.Result(ee.asString(), F);
    });
  }
  function d(_, F, O) {
    return ou(_, function(L) {
      return g(L, F, O);
    });
  }
  function g(_, F, O) {
    if (!O)
      throw new Error("options not set");
    var L = T[_.type];
    return L ? L(_, F, O) : [];
  }
  function l(_, F, O) {
    return p(_, F).wrap(function() {
      var L = d(_.children, F, O);
      return o ? L : [ue.forceWrite].concat(L);
    });
  }
  function p(_, F) {
    var O = h(_);
    return O ? O.to : (_.styleId && F.push(Sg("paragraph", _)), c);
  }
  function b(_, F, O) {
    var L = function() {
      return d(_.children, F, O);
    }, k = [];
    if (_.highlight !== null) {
      var z = y({ type: "highlight", color: _.highlight });
      z && k.push(z);
    }
    _.isSmallCaps && k.push(m("smallCaps")), _.isAllCaps && k.push(m("allCaps")), _.isStrikethrough && k.push(m("strikethrough", "s")), _.isUnderline && k.push(m("underline")), _.verticalAlignment === Oa.verticalAlignment.subscript && k.push(bt.element("sub", {}, { fresh: !1 })), _.verticalAlignment === Oa.verticalAlignment.superscript && k.push(bt.element("sup", {}, { fresh: !1 })), _.isItalic && k.push(m("italic", "em")), _.isBold && k.push(m("bold", "strong"));
    var ee = bt.empty, te = h(_);
    return te ? ee = te.to : _.styleId && F.push(Sg("run", _)), k.push(ee), k.forEach(function(J) {
      L = J.wrap.bind(J, L);
    }), L();
  }
  function m(_, F) {
    var O = y({ type: _ });
    return O || (F ? bt.element(F, {}, { fresh: !1 }) : bt.empty);
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
  function f(_) {
    return function(F, O) {
      return Fg.attempt(function() {
        return _(F, O);
      }).caught(function(L) {
        return O.push(ku.error(L)), [];
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
  var S = bt.elements([
    bt.element("table", {}, { fresh: !0 })
  ]);
  function I(_, F, O) {
    return y(_, S).wrap(function() {
      return q(_, F, O);
    });
  }
  function q(_, F, O) {
    var L = xn.findIndex(_.children, function(te) {
      return !te.type === Oa.types.tableRow || !te.isHeader;
    });
    L === -1 && (L = _.children.length);
    var k;
    if (L === 0)
      k = d(
        _.children,
        F,
        xn.extend({}, O, { isTableHeader: !1 })
      );
    else {
      var z = d(
        _.children.slice(0, L),
        F,
        xn.extend({}, O, { isTableHeader: !0 })
      ), ee = d(
        _.children.slice(L),
        F,
        xn.extend({}, O, { isTableHeader: !1 })
      );
      k = [
        ue.freshElement("thead", {}, z),
        ue.freshElement("tbody", {}, ee)
      ];
    }
    return [ue.forceWrite].concat(k);
  }
  function $(_, F, O) {
    var L = d(_.children, F, O);
    return [
      ue.freshElement("tr", {}, [ue.forceWrite].concat(L))
    ];
  }
  function R(_, F, O) {
    var L = O.isTableHeader ? "th" : "td", k = d(_.children, F, O), z = {};
    return _.colSpan !== 1 && (z.colspan = _.colSpan.toString()), _.rowSpan !== 1 && (z.rowspan = _.rowSpan.toString()), [
      ue.freshElement(L, z, [ue.forceWrite].concat(k))
    ];
  }
  function P(_, F, O) {
    return y(_, bt.ignore).wrap(function() {
      var L = t[_.commentId], k = i.length + 1, z = "[" + DC(L) + k + "]";
      return i.push({ label: z, comment: L }), [
        ue.freshElement("a", {
          href: "#" + x("comment", _.commentId),
          id: w("comment", _.commentId)
        }, [ue.text(z)])
      ];
    });
  }
  function G(_, F, O) {
    var L = _.label, k = _.comment, z = d(k.body, F, O).concat([
      ue.nonFreshElement("p", {}, [
        ue.text(" "),
        ue.freshElement("a", { href: "#" + w("comment", k.commentId) }, [
          ue.text("↑")
        ])
      ])
    ]);
    return [
      ue.freshElement(
        "dt",
        { id: x("comment", k.commentId) },
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
    return F ? F.to : _.breakType === "line" ? bt.topLevelElement("br") : bt.empty;
  }
  var T = {
    document: function(_, F, O) {
      var L = d(_.children, F, O), k = r.map(function(ee) {
        return _.notes.resolve(ee);
      }), z = d(k, F, O);
      return L.concat([
        ue.freshElement("ol", {}, z),
        ue.freshElement("dl", {}, ou(i, function(ee) {
          return G(ee, F, O);
        }))
      ]);
    },
    paragraph: l,
    run: b,
    text: function(_, F, O) {
      return [ue.text(_.value)];
    },
    tab: function(_, F, O) {
      return [ue.text("	")];
    },
    hyperlink: function(_, F, O) {
      var L = _.anchor ? "#" + E(_.anchor) : _.href, k = { href: L };
      _.targetFrame != null && (k.target = _.targetFrame);
      var z = d(_.children, F, O);
      return [ue.nonFreshElement("a", k, z)];
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
      var L = d(_.body, F, O), k = ue.elementWithTag(bt.element("p", {}, { fresh: !1 }), [
        ue.text(" "),
        ue.freshElement("a", { href: "#" + D(_) }, [ue.text("↑")])
      ]), z = L.concat([k]);
      return ue.freshElement("li", { id: v(_) }, z);
    },
    commentReference: P,
    comment: G,
    image: vC(f(e.convertImage || pC.dataUri)),
    table: I,
    tableRow: $,
    tableCell: R,
    break: Q
  };
  return {
    convertToHtml: s
  };
}
var yC = 1;
function vC(e) {
  return function(t, n, r) {
    return [
      {
        type: "deferred",
        id: yC++,
        value: function() {
          return e(t, n, r);
        }
      }
    ];
  };
}
function Sg(e, t) {
  return ku.warning(
    "Unrecognised " + e + " style: '" + t.styleName + "' (Style ID: " + t.styleId + ")"
  );
}
function ou(e, t) {
  return xn.flatten(e.map(t), !0);
}
function k1(e, t) {
  e.forEach(function(n) {
    t(n), n.children && k1(n.children, t);
  });
}
var DC = vl.commentAuthorLabel = function(t) {
  return t.authorInitials || "";
}, B1 = {}, xC = se;
function R1(e) {
  if (e.type === "text")
    return e.value;
  if (e.type === xC.types.tab)
    return "	";
  var t = e.type === "paragraph" ? `

` : "";
  return (e.children || []).map(R1).join("") + t;
}
B1.convertElementToRawText = R1;
var tc = {}, Nt = {}, O1 = {}, W1 = { exports: {} }, Nr = W1.exports = function(e, t) {
  this._tokens = e, this._startIndex = t || 0;
};
Nr.prototype.head = function() {
  return this._tokens[this._startIndex];
};
Nr.prototype.tail = function(e) {
  return new Nr(this._tokens, this._startIndex + 1);
};
Nr.prototype.toArray = function() {
  return this._tokens.slice(this._startIndex);
};
Nr.prototype.end = function() {
  return this._tokens[this._tokens.length - 1];
};
Nr.prototype.to = function(e) {
  var t = this.head().source, n = e.head() || e.end();
  return t.to(n.source);
};
var _C = W1.exports, wC = _C;
O1.Parser = function(e) {
  var t = function(n, r) {
    return n(new wC(r));
  };
  return {
    parseTokens: t
  };
};
var xl = {}, I1 = {};
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
})(I1);
var _l = {
  failure: function(e, t) {
    if (e.length < 1)
      throw new Error("Failure must have errors");
    return new Ve({
      status: "failure",
      remaining: t,
      errors: e
    });
  },
  error: function(e, t) {
    if (e.length < 1)
      throw new Error("Failure must have errors");
    return new Ve({
      status: "error",
      remaining: t,
      errors: e
    });
  },
  success: function(e, t, n) {
    return new Ve({
      status: "success",
      value: e,
      source: n,
      remaining: t,
      errors: []
    });
  },
  cut: function(e) {
    return new Ve({
      status: "cut",
      remaining: e,
      errors: []
    });
  }
}, Ve = function(e) {
  this._value = e.value, this._status = e.status, this._hasValue = e.value !== void 0, this._remaining = e.remaining, this._source = e.source, this._errors = e.errors;
};
Ve.prototype.map = function(e) {
  return this._hasValue ? new Ve({
    value: e(this._value, this._source),
    status: this._status,
    remaining: this._remaining,
    source: this._source,
    errors: this._errors
  }) : this;
};
Ve.prototype.changeRemaining = function(e) {
  return new Ve({
    value: this._value,
    status: this._status,
    remaining: e,
    source: this._source,
    errors: this._errors
  });
};
Ve.prototype.isSuccess = function() {
  return this._status === "success" || this._status === "cut";
};
Ve.prototype.isFailure = function() {
  return this._status === "failure";
};
Ve.prototype.isError = function() {
  return this._status === "error";
};
Ve.prototype.isCut = function() {
  return this._status === "cut";
};
Ve.prototype.value = function() {
  return this._value;
};
Ve.prototype.remaining = function() {
  return this._remaining;
};
Ve.prototype.source = function() {
  return this._source;
};
Ve.prototype.errors = function() {
  return this._errors;
};
var wl = {};
wl.error = function(e) {
  return new nc(e);
};
var nc = function(e) {
  this.expected = e.expected, this.actual = e.actual, this._location = e.location;
};
nc.prototype.describe = function() {
  var e = this._location ? this._location.describe() + `:
` : "";
  return e + "Expected " + this.expected + `
but got ` + this.actual;
};
nc.prototype.lineNumber = function() {
  return this._location.lineNumber();
};
nc.prototype.characterNumber = function() {
  return this._location.characterNumber();
};
var N1 = {};
N1.fromArray = function(e) {
  var t = 0, n = function() {
    return t < e.length;
  };
  return new Qn({
    hasNext: n,
    next: function() {
      if (n())
        return e[t++];
      throw new Error("No more elements");
    }
  });
};
var Qn = function(e) {
  this._iterator = e;
};
Qn.prototype.map = function(e) {
  var t = this._iterator;
  return new Qn({
    hasNext: function() {
      return t.hasNext();
    },
    next: function() {
      return e(t.next());
    }
  });
};
Qn.prototype.filter = function(e) {
  var t = this._iterator, n = !1, r = !1, i, a = function() {
    if (!n)
      for (n = !0, r = !1; t.hasNext() && !r; )
        i = t.next(), r = e(i);
  };
  return new Qn({
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
Qn.prototype.first = function() {
  var e = this._iterator;
  return this._iterator.hasNext() ? e.next() : null;
};
Qn.prototype.toArray = function() {
  for (var e = []; this._iterator.hasNext(); )
    e.push(this._iterator.next());
  return e;
};
(function(e) {
  var t = Se, n = I1, r = _l, i = wl, a = N1;
  e.token = function(l, p) {
    var b = p !== void 0;
    return function(m) {
      var y = m.head();
      if (y && y.name === l && (!b || y.value === p))
        return r.success(y.value, m.tail(), y.source);
      var h = d({ name: l, value: p });
      return g(m, h);
    };
  }, e.tokenOfType = function(l) {
    return e.token(l);
  }, e.firstOf = function(l, p) {
    return t.isArray(p) || (p = Array.prototype.slice.call(arguments, 1)), function(b) {
      return a.fromArray(p).map(function(m) {
        return m(b);
      }).filter(function(m) {
        return m.isSuccess() || m.isError();
      }).first() || g(b, l);
    };
  }, e.then = function(l, p) {
    return function(b) {
      var m = l(b);
      return m.map || console.log(m), m.map(p);
    };
  }, e.sequence = function() {
    var l = Array.prototype.slice.call(arguments, 0), p = function(m) {
      var y = t.foldl(l, function(f, v) {
        var D = f.result, x = f.hasCut;
        if (!D.isSuccess())
          return { result: D, hasCut: x };
        var w = v(D.remaining());
        if (w.isCut())
          return { result: D, hasCut: !0 };
        if (w.isSuccess()) {
          var E;
          v.isCaptured ? E = D.value().withValue(v, w.value()) : E = D.value();
          var S = w.remaining(), I = m.to(S);
          return {
            result: r.success(E, S, I),
            hasCut: x
          };
        } else return x ? { result: r.error(w.errors(), w.remaining()), hasCut: x } : { result: w, hasCut: x };
      }, { result: r.success(new o(), m), hasCut: !1 }).result, h = m.to(y.remaining());
      return y.map(function(f) {
        return f.withValue(e.sequence.source, h);
      });
    };
    p.head = function() {
      var m = t.find(l, b);
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
  var o = function(l, p) {
    this._values = l || {}, this._valuesArray = p || [];
  };
  o.prototype.withValue = function(l, p) {
    if (l.captureName && l.captureName in this._values)
      throw new Error('Cannot add second value for capture "' + l.captureName + '"');
    var b = t.clone(this._values);
    b[l.captureName] = p;
    var m = this._valuesArray.concat([p]);
    return new o(b, m);
  }, o.prototype.get = function(l) {
    if (l.captureName in this._values)
      return this._values[l.captureName];
    throw new Error('No value for capture "' + l.captureName + '"');
  }, o.prototype.toArray = function() {
    return this._valuesArray;
  }, e.sequence.capture = function(l, p) {
    var b = function() {
      return l.apply(this, arguments);
    };
    return b.captureName = p, b.isCaptured = !0, b;
  }, e.sequence.extract = function(l) {
    return function(p) {
      return p.get(l);
    };
  }, e.sequence.applyValues = function(l) {
    var p = Array.prototype.slice.call(arguments, 1);
    return function(b) {
      var m = p.map(function(y) {
        return b.get(y);
      });
      return l.apply(this, m);
    };
  }, e.sequence.source = {
    captureName: "☃source☃"
  }, e.sequence.cut = function() {
    return function(l) {
      return r.cut(l);
    };
  }, e.optional = function(l) {
    return function(p) {
      var b = l(p);
      return b.isSuccess() ? b.map(n.some) : b.isFailure() ? r.success(n.none, p) : b;
    };
  }, e.zeroOrMoreWithSeparator = function(l, p) {
    return s(l, p, !1);
  }, e.oneOrMoreWithSeparator = function(l, p) {
    return s(l, p, !0);
  };
  var c = e.zeroOrMore = function(l) {
    return function(p) {
      for (var b = [], m; (m = l(p)) && m.isSuccess(); )
        p = m.remaining(), b.push(m.value());
      return m.isError() ? m : r.success(b, p);
    };
  };
  e.oneOrMore = function(l) {
    return e.oneOrMoreWithSeparator(l, u);
  };
  function u(l) {
    return r.success(null, l);
  }
  var s = function(l, p, b) {
    return function(m) {
      var y = l(m);
      if (y.isSuccess()) {
        var h = e.sequence.capture(l, "main"), f = c(e.then(
          e.sequence(p, h),
          e.sequence.extract(h)
        )), v = f(y.remaining());
        return r.success([y.value()].concat(v.value()), v.remaining());
      } else return b || y.isError() ? y : r.success([], m);
    };
  };
  e.leftAssociative = function(l, p, b) {
    var m;
    b ? m = [{ func: b, rule: p }] : m = p, m = m.map(function(h) {
      return e.then(h.rule, function(f) {
        return function(v, D) {
          return h.func(v, f, D);
        };
      });
    });
    var y = e.firstOf.apply(null, ["rules"].concat(m));
    return function(h) {
      var f = h, v = l(h);
      if (!v.isSuccess())
        return v;
      for (var D = y(v.remaining()); D.isSuccess(); ) {
        var x = D.remaining(), w = f.to(D.remaining()), E = D.value();
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
  }, e.nonConsuming = function(l) {
    return function(p) {
      return l(p).changeRemaining(p);
    };
  };
  var d = function(l) {
    return l.value ? l.name + ' "' + l.value + '"' : l.name;
  };
  function g(l, p) {
    var b, m = l.head();
    return m ? b = i.error({
      expected: p,
      actual: d(m),
      location: m.source
    }) : b = i.error({
      expected: p,
      actual: "end of tokens"
    }), r.failure([b], l);
  }
})(xl);
var L1 = { exports: {} };
L1.exports = function(e, t) {
  var n = {
    asString: function() {
      return e;
    },
    range: function(r, i) {
      return new er(e, t, r, i);
    }
  };
  return n;
};
var er = function(e, t, n, r) {
  this._string = e, this._description = t, this._startIndex = n, this._endIndex = r;
};
er.prototype.to = function(e) {
  return new er(this._string, this._description, this._startIndex, e._endIndex);
};
er.prototype.describe = function() {
  var e = this._position(), t = this._description ? this._description + `
` : "";
  return t + "Line number: " + e.lineNumber + `
Character number: ` + e.characterNumber;
};
er.prototype.lineNumber = function() {
  return this._position().lineNumber;
};
er.prototype.characterNumber = function() {
  return this._position().characterNumber;
};
er.prototype._position = function() {
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
  var t = xl, n = _l;
  e.parser = function(a, o, c) {
    var u = {
      rule: l,
      leftAssociative: p,
      rightAssociative: b
    }, s = new r(c.map(g)), d = t.firstOf(a, o);
    function g(h) {
      return {
        name: h.name,
        rule: i(h.ruleBuilder.bind(null, u))
      };
    }
    function l() {
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
    function y(h, f) {
      var v = d(f);
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
      for (var l, p; ; )
        if (l = d(g.remaining()), l.isSuccess())
          p = g.source().to(l.source()), g = n.success(
            l.value()(g.value(), p),
            l.remaining(),
            p
          );
        else return l.isFailure() ? g : l;
    }
    function d(g) {
      return t.firstOf("infix", a.map(function(l) {
        return l.rule;
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
          var l = d(g);
          return l.map(function(p) {
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
var z1 = {}, cu = $1, TC = M1;
z1.RegexTokeniser = UC;
function UC(e) {
  e = e.map(function(i) {
    return {
      name: i.name,
      regex: new RegExp(i.regex.source, "g")
    };
  });
  function t(i, a) {
    for (var o = new TC(i, a), c = 0, u = []; c < i.length; ) {
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
          var d = s[1], l = new cu(
            e[c].name,
            d,
            o.range(a, g)
          );
          return { token: l, endIndex: g };
        }
      }
    }
    var g = a + 1, l = new cu(
      "unrecognisedCharacter",
      i.substring(a, g),
      o.range(a, g)
    );
    return { token: l, endIndex: g };
  }
  function r(i, a) {
    return new cu(
      "end",
      null,
      a.range(i.length, i.length)
    );
  }
  return {
    tokenise: t
  };
}
Nt.Parser = O1.Parser;
Nt.rules = xl;
Nt.errors = wl;
Nt.results = _l;
Nt.StringSource = M1;
Nt.Token = $1;
Nt.bottomUp = P1;
Nt.RegexTokeniser = z1.RegexTokeniser;
Nt.rule = function(e) {
  var t;
  return function(n) {
    return t || (t = e()), t(n);
  };
};
var Xe = {};
Xe.paragraph = EC;
Xe.run = AC;
Xe.table = CC;
Xe.bold = new Lt("bold");
Xe.italic = new Lt("italic");
Xe.underline = new Lt("underline");
Xe.strikethrough = new Lt("strikethrough");
Xe.allCaps = new Lt("allCaps");
Xe.smallCaps = new Lt("smallCaps");
Xe.highlight = FC;
Xe.commentReference = new Lt("commentReference");
Xe.lineBreak = new rc({ breakType: "line" });
Xe.pageBreak = new rc({ breakType: "page" });
Xe.columnBreak = new rc({ breakType: "column" });
Xe.equalTo = kC;
Xe.startsWith = BC;
function EC(e) {
  return new Lt("paragraph", e);
}
function AC(e) {
  return new Lt("run", e);
}
function CC(e) {
  return new Lt("table", e);
}
function FC(e) {
  return new q1(e);
}
function Lt(e, t) {
  t = t || {}, this._elementType = e, this._styleId = t.styleId, this._styleName = t.styleName, t.list && (this._listIndex = t.list.levelIndex, this._listIsOrdered = t.list.isOrdered);
}
Lt.prototype.matches = function(e) {
  return e.type === this._elementType && (this._styleId === void 0 || e.styleId === this._styleId) && (this._styleName === void 0 || e.styleName && this._styleName.operator(this._styleName.operand, e.styleName)) && (this._listIndex === void 0 || SC(e, this._listIndex, this._listIsOrdered)) && (this._breakType === void 0 || this._breakType === e.breakType);
};
function q1(e) {
  e = e || {}, this._color = e.color;
}
q1.prototype.matches = function(e) {
  return e.type === "highlight" && (this._color === void 0 || e.color === this._color);
};
function rc(e) {
  e = e || {}, this._breakType = e.breakType;
}
rc.prototype.matches = function(e) {
  return e.type === "break" && (this._breakType === void 0 || e.breakType === this._breakType);
};
function SC(e, t, n) {
  return e.numbering && e.numbering.level == t && e.numbering.isOrdered == n;
}
function kC(e) {
  return {
    operator: RC,
    operand: e
  };
}
function BC(e) {
  return {
    operator: OC,
    operand: e
  };
}
function RC(e, t) {
  return e.toUpperCase() === t.toUpperCase();
}
function OC(e, t) {
  return t.toUpperCase().indexOf(e.toUpperCase()) === 0;
}
var j1 = {}, WC = Nt, IC = WC.RegexTokeniser;
j1.tokenise = NC;
var kg = "'((?:\\\\.|[^'])*)";
function NC(e) {
  var t = "(?:[a-zA-Z\\-_]|\\\\.)", n = new IC([
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
    { name: "string", regex: new RegExp(kg + "'") },
    { name: "unterminated-string", regex: new RegExp(kg) },
    { name: "integer", regex: /([0-9]+)/ },
    { name: "choice", regex: /\|/ },
    { name: "bang", regex: /(!)/ }
  ]);
  return n.tokenise(e);
}
var LC = Se, j = Nt, He = Xe, Wa = ec(), MC = j1.tokenise, su = mt;
tc.readHtmlPath = qC;
tc.readDocumentMatcher = zC;
tc.readStyle = $C;
function $C(e) {
  return Tl(KC, e);
}
function PC() {
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
      to: t.valueOrElse(Wa.empty)
    };
  });
}
function zC(e) {
  return Tl(Z1(), e);
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
    j.rules.sequence.capture(ic)
  ).map(function(w) {
    return { styleId: w };
  }), o = j.rules.firstOf(
    "style name matcher",
    j.rules.then(
      j.rules.sequence(
        j.rules.tokenOfType("equals"),
        j.rules.sequence.cut(),
        j.rules.sequence.capture(Tr)
      ).head(),
      function(w) {
        return { styleName: He.equalTo(w) };
      }
    ),
    j.rules.then(
      j.rules.sequence(
        j.rules.tokenOfType("startsWith"),
        j.rules.sequence.cut(),
        j.rules.sequence.capture(Tr)
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
    e.capture(jC),
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
    ), S = j.rules.zeroOrMore(E);
    return j.rules.then(S, function(I) {
      var q = {};
      return I.forEach(function($) {
        LC.extend(q, $);
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
  }), l = e(
    j.rules.token("identifier", "table"),
    e.capture(d([
      a,
      c
    ]))
  ).map(function(w) {
    return He.table(w);
  }), p = t("b", He.bold), b = t("i", He.italic), m = t("u", He.underline), y = t("strike", He.strikethrough), h = t("all-caps", He.allCaps), f = t("small-caps", He.smallCaps), v = e(
    j.rules.token("identifier", "highlight"),
    j.rules.sequence.capture(j.rules.optional(j.rules.sequence(
      j.rules.tokenOfType("open-square-bracket"),
      j.rules.sequence.cut(),
      j.rules.token("identifier", "color"),
      j.rules.tokenOfType("equals"),
      j.rules.sequence.capture(Tr),
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
    e.capture(Tr),
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
    l,
    p,
    b,
    m,
    y,
    h,
    f,
    v,
    D,
    x
  );
}
function qC(e) {
  return Tl(X1(), e);
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
      e(Tr),
      j.rules.tokenOfType("close-paren")
    ).head()),
    function(o) {
      return o.valueOrElse("");
    }
  ), i = j.rules.oneOrMoreWithSeparator(
    ic,
    j.rules.tokenOfType("choice")
  ), a = j.rules.sequence(
    e(i),
    e(j.rules.zeroOrMore(VC)),
    e(n),
    e(r)
  ).map(function(o, c, u, s) {
    var d = {}, g = {};
    return c.forEach(function(l) {
      l.append && d[l.name] ? d[l.name] += " " + l.value : d[l.name] = l.value;
    }), u && (g.fresh = !0), s && (g.separator = s), Wa.element(o, d, g);
  });
  return j.rules.firstOf(
    "html path",
    j.rules.then(j.rules.tokenOfType("bang"), function() {
      return Wa.ignore;
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
      Wa.elements
    )
  );
}
var ic = j.rules.then(
  j.rules.tokenOfType("identifier"),
  H1
), jC = j.rules.tokenOfType("integer"), Tr = j.rules.then(
  j.rules.tokenOfType("string"),
  H1
), ZC = {
  n: `
`,
  r: "\r",
  t: "	"
};
function H1(e) {
  return e.replace(/\\(.)/g, function(t, n) {
    return ZC[n] || n;
  });
}
var XC = j.rules.sequence(
  j.rules.tokenOfType("open-square-bracket"),
  j.rules.sequence.cut(),
  j.rules.sequence.capture(ic),
  j.rules.tokenOfType("equals"),
  j.rules.sequence.capture(Tr),
  j.rules.tokenOfType("close-square-bracket")
).map(function(e, t) {
  return { name: e, value: t, append: !1 };
}), HC = j.rules.sequence(
  j.rules.tokenOfType("dot"),
  j.rules.sequence.cut(),
  j.rules.sequence.capture(ic)
).map(function(e) {
  return { name: "class", value: e, append: !0 };
}), VC = j.rules.firstOf(
  "attribute or class",
  XC,
  HC
);
function Tl(e, t) {
  var n = MC(t), r = j.Parser(), i = r.parseTokens(e, n);
  return i.isSuccess() ? su.success(i.value()) : new su.Result(null, [su.warning(GC(t, i))]);
}
function GC(e, t) {
  return "Did not understand this style mapping, so ignored it: " + e + `
` + t.errors().map(YC).join(`
`);
}
function YC(e) {
  return "Error was at character number " + e.characterNumber() + ": Expected " + e.expected + " but got " + e.actual;
}
var KC = PC(), ac = {};
ac.readOptions = eF;
var V1 = Se, JC = ac._defaultStyleMap = [
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
], QC = ac._standardOptions = {
  transformDocument: tF,
  includeDefaultStyleMap: !0,
  includeEmbeddedStyleMap: !0
};
function eF(e) {
  return e = e || {}, V1.extend({}, QC, e, {
    customStyleMap: Bg(e.styleMap),
    readStyleMap: function() {
      var t = this.customStyleMap;
      return this.includeEmbeddedStyleMap && (t = t.concat(Bg(this.embeddedStyleMap))), this.includeDefaultStyleMap && (t = t.concat(JC)), t;
    }
  });
}
function Bg(e) {
  return e ? V1.isString(e) ? e.split(`
`).map(function(t) {
    return t.trim();
  }).filter(function(t) {
    return t !== "" && t.charAt(0) !== "#";
  }) : e : [];
}
function tF(e) {
  return e;
}
var G1 = {}, nF = Wi, Ia = $e, Rg = $i;
G1.openZip = iF;
var rF = Ia.promisify(nF.readFile);
function iF(e) {
  return e.path ? rF(e.path).then(Rg.openArrayBuffer) : e.buffer ? Ia.resolve(Rg.openArrayBuffer(e.buffer)) : e.file ? Ia.resolve(e.file) : Ia.reject(new Error("Could not find file in options"));
}
var Y1 = {}, aF = ec(), oF = Qo();
Y1.element = cF;
function cF(e) {
  return function(t) {
    return oF.elementWithTag(aF.element(e), [t]);
  };
}
var sF = Se, K1 = Ad, Ul = yl, uF = vl.DocumentConverter, dF = B1.convertElementToRawText, lF = tc.readStyle, fF = ac.readOptions, oc = G1, hF = mt.Result;
Ot.convertToHtml = pF;
Ot.convertToMarkdown = gF;
Ot.convert = El;
Ot.extractRawText = vF;
Ot.images = Dl;
Ot.transforms = On;
Ot.underline = Y1;
Ot.embedStyleMap = DF;
Ot.readEmbeddedStyleMap = mF;
function pF(e, t) {
  return El(e, t);
}
function gF(e, t) {
  var n = Object.create(t || {});
  return n.outputFormat = "markdown", El(e, n);
}
function El(e, t) {
  return t = fF(t), oc.openZip(e).tap(function(n) {
    return Ul.readStyleMap(n).then(function(r) {
      t.embeddedStyleMap = r;
    });
  }).then(function(n) {
    return K1.read(n, e).then(function(r) {
      return r.map(t.transformDocument);
    }).then(function(r) {
      return bF(r, t);
    });
  });
}
function mF(e) {
  return oc.openZip(e).then(Ul.readStyleMap);
}
function bF(e, t) {
  var n = yF(t.readStyleMap()), r = sF.extend({}, t, {
    styleMap: n.value
  }), i = new uF(r);
  return e.flatMapThen(function(a) {
    return n.flatMapThen(function(o) {
      return i.convertToHtml(a);
    });
  });
}
function yF(e) {
  return hF.combine((e || []).map(lF)).map(function(t) {
    return t.filter(function(n) {
      return !!n;
    });
  });
}
function vF(e) {
  return oc.openZip(e).then(K1.read).then(function(t) {
    return t.map(dF);
  });
}
function DF(e, t) {
  return oc.openZip(e).tap(function(n) {
    return Ul.writeStyleMap(n, t);
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
Ot.styleMapping = function() {
  throw new Error(`Use a raw string instead of mammoth.styleMapping e.g. "p[style-name='Title'] => h1" instead of mammoth.styleMapping("p[style-name='Title'] => h1")`);
};
async function Og(e) {
  const t = ht.extname(e).toLowerCase(), n = ht.basename(e), r = await cv.readFile(e);
  let i = "";
  t === ".txt" || t === ".md" ? i = r.toString("utf8") : t === ".docx" ? i = (await Ot.extractRawText({ buffer: r })).value : t === ".vtt" ? i = r.toString("utf8").split(`
`).filter((o) => !/^\d{2}:\d{2}:\d{2}\.\d{3}/.test(o) && !/^WEBVTT/.test(o) && o.trim() !== "").join(`
`) : t === ".srt" ? i = r.toString("utf8").split(/\r?\n/).filter((u) => {
    const s = u.trim();
    return !(!s || /^\d+$/.test(s) || /-->/.test(s));
  }).join(`
`) : i = r.toString("utf8");
  const a = pm(r);
  return L_(n, i, a);
}
const xF = {
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
async function _F(e, t) {
  var D, x, w, E;
  const { transcriptId: n, model: r } = e, i = gm(n);
  if (!i) throw new Error("Transcript not found");
  const a = mm(), o = bm(), c = a.slice(0, 20), u = o.slice(0, 2).map((S) => ({ ...S, excerpt: S.excerpt.slice(0, 1e3) })), s = r ?? "llama3.1:8b-instruct-q4_K_M";
  await TF();
  const d = UF(i.text, 1200), g = [], l = d.length;
  let p = 0;
  for (const S of d) {
    p += 1, console.log(`[summarize] chunk ${p}/${l} starting (${Math.min(S.length, 80)} chars preview: ${S.slice(0, 80).replace(/\n/g, " ")}...)`);
    const I = "You are an offline summarizer. Output STRICT JSON only that matches the given JSON Schema.", q = [
      "Verified glossary (authoritative terms and definitions):",
      JSON.stringify(c),
      "",
      "Few-shot examples (may guide style):",
      JSON.stringify(u),
      "",
      "Transcript chunk:",
      `<<<${S}>>>`,
      "",
      "Task:",
      "- Fill every possible field in the schema based only on the chunk.",
      '- If unknown, use "" or [].',
      "JSON Schema:",
      JSON.stringify(xF)
    ].join(`
`), $ = await hu.chat({
      model: s,
      messages: [
        { role: "system", content: I },
        { role: "user", content: q }
      ],
      // @ts-ignore
      format: "json",
      stream: !1,
      options: { temperature: 0.2 }
    });
    try {
      const R = ((D = $.message) == null ? void 0 : D.content) ?? "{}", P = JSON.parse(R);
      g.push(P), console.log(`[summarize] chunk ${p}/${l} parsed OK: keys=${Object.keys(P).join(",")}`);
    } catch {
      g.push({ key_takeaways: [], topics: [] }), console.warn(`[summarize] chunk ${p}/${l} parse failed; added empty result`);
    }
    (x = t == null ? void 0 : t.onProgress) == null || x.call(t, Math.round(p / l * 80));
  }
  const b = wF(g), m = "You are a precise technical editor.", y = [
    "Using the merged facts below (JSON), write a clear, concise markdown summary (3–7 bullets for key takeaways, short intro, optional notes for cautions/contraindications if present). No hallucinations.",
    "Facts JSON:",
    JSON.stringify(b)
  ].join(`
`);
  (w = t == null ? void 0 : t.onProgress) == null || w.call(t, 90);
  const f = (await hu.chat({ model: s, messages: [
    { role: "system", content: m },
    { role: "user", content: y }
  ], stream: !1, options: { temperature: 0.2 } })).message.content, v = M_(n, b, f);
  return (E = t == null ? void 0 : t.onProgress) == null || E.call(t, 100), { summaryId: v, merged: b, markdown: f };
}
function wF(e) {
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
async function TF(e) {
  return async (t) => Math.ceil(t.length / 4);
}
function UF(e, t, n) {
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
function EF(e) {
  Wg || (Wg = !0, rt.handle("ingest.openFilePicker", async () => {
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
      const a = await Og(i);
      r.push(a);
    }
    return r;
  }), rt.handle("ingest.fromDrop", async (t, n) => Og(n)), rt.handle("summarize.run", async (t, n) => {
    const r = jl({ transcriptId: ei().min(1), model: ei().optional() }), { transcriptId: i, model: a } = r.parse(n), o = e();
    return _F({ transcriptId: i, model: a }, { onProgress: (u) => {
      o == null || o.webContents.send("summarize.progress", u);
    } });
  }), rt.handle("privacy.status", async () => ({
    allowedHosts: pv(process.env.VITE_DEV_SERVER_URL),
    blockedRequests: fv()
  })), rt.handle("clipboard.copy", async (t, n) => (av.writeText(n), !0)), rt.handle("glossary.list", async () => mm()), rt.handle("glossary.upsert", async (t, n) => ($_(n), !0)), rt.handle("glossary.remove", async (t, n) => (P_(n), !0)), rt.handle("examples.list", async () => bm()), rt.handle("examples.upsert", async (t, n) => z_(n)), rt.handle("examples.remove", async (t, n) => (q_(n), !0)), rt.handle("settings.get", async (t, n) => j_(n)), rt.handle("settings.set", async (t, n) => (Z_(n.key, n.value), !0)), rt.handle("chat.ask", async (t, n) => {
    const r = jl({ transcriptId: ei(), message: ei().min(1), model: ei().optional() }), { transcriptId: i, message: a, model: o } = r.parse(n), c = gm(i);
    if (!c) return { answer: "" };
    const u = o ?? "llama3.1:8b-instruct-q4_K_M", s = 'You are a helpful assistant. Answer strictly and only based on the provided transcript excerpts. If the answer is not contained, reply: "I do not know based on the transcript."', d = /* @__PURE__ */ new Set(["the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "with", "as", "is", "are", "was", "were", "be", "by", "that", "this", "it", "at", "from", "we", "you", "they", "he", "she"]), g = (f) => f.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean).filter((v) => !d.has(v)), l = new Set(g(a)), b = c.text.split(/\n{2,}/).map((f) => f.trim()).filter(Boolean).map((f, v) => {
      const D = new Set(g(f));
      let x = 0;
      for (const w of l) D.has(w) && (x += 1);
      return { idx: v, p: f, score: x };
    });
    b.sort((f, v) => v.score - f.score);
    const y = [
      "Relevant transcript excerpts (do not infer beyond these):",
      ...b.slice(0, 5).map((f) => f.p.slice(0, 1200)).map((f, v) => `Excerpt ${v + 1}:
${f}`),
      "",
      `Question: ${a}`
    ].join(`
`);
    return { answer: (await hu.chat({ model: u, messages: [{ role: "system", content: s }, { role: "user", content: y }], stream: !1, options: { temperature: 0.1, num_ctx: 8192 } })).message.content };
  }));
}
const J1 = ht.dirname(ov(import.meta.url));
process.env.APP_ROOT = ht.join(J1, "..");
const eo = process.env.VITE_DEV_SERVER_URL, zF = ht.join(process.env.APP_ROOT, "dist-electron"), Q1 = ht.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = eo ? ht.join(process.env.APP_ROOT, "public") : Q1;
let vt;
function ev() {
  const e = !zn.isPackaged;
  if (vt = new Ig({
    icon: ht.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: eo ? ht.join(process.env.APP_ROOT, "electron", "preload.cjs") : ht.join(J1, "preload.mjs"),
      contextIsolation: !0,
      sandbox: !e,
      // relax sandbox in dev to avoid blank screen issues with Vite
      nodeIntegration: !1
    }
  }), vt.webContents.on("did-finish-load", () => {
    vt == null || vt.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), e) {
    const t = eo ?? "http://127.0.0.1:5173";
    vt.loadURL(t), vt.webContents.openDevTools({ mode: "detach" });
  } else
    vt.loadFile(ht.join(Q1, "index.html"));
}
zn.on("window-all-closed", () => {
  process.platform !== "darwin" && (zn.quit(), vt = null);
});
zn.on("activate", () => {
  Ig.getAllWindows().length === 0 && ev();
});
zn.whenReady().then(() => {
  if (EF(() => vt), ev(), vt) {
    const e = zn.isPackaged ? void 0 : eo ?? "http://127.0.0.1:5173";
    hv(vt, e);
  }
});
export {
  zF as MAIN_DIST,
  Q1 as RENDERER_DIST,
  eo as VITE_DEV_SERVER_URL
};
