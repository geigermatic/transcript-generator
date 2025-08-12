import { d as c, r as R, i as L } from "./main-j8VjxkVx.js";
async function O(t, n) {
  const o = n.split(/\n{2,}/).map((e) => e.trim()).filter(Boolean), r = c().prepare("INSERT INTO agent_paragraphs(id, transcript_id, idx, text) VALUES (?, ?, ?, ?)");
  return c().prepare("DELETE FROM agent_paragraphs WHERE transcript_id = ?").run(t), o.forEach((e, p) => r.run(R(), t, p, e)), o;
}
async function T(t, n, o = "nomic-embed-text", r) {
  var d;
  c().prepare("DELETE FROM embeddings_agent WHERE kind = 'paragraph' AND ref_id IN (SELECT id FROM agent_paragraphs WHERE transcript_id = ?)").run(t);
  const p = c().prepare("SELECT id, text FROM agent_paragraphs WHERE transcript_id = ? ORDER BY idx ASC").all(t);
  let h = 0;
  for (const l of p) {
    const s = await L.embed({ model: o, input: l.text }), E = ((d = s == null ? void 0 : s.embeddings) == null ? void 0 : d[0]) || (s == null ? void 0 : s.embedding) || [];
    c().prepare("INSERT INTO embeddings_agent(id, kind, ref_id, vector) VALUES (?, ?, ?, ?)").run(R(), "paragraph", l.id, Buffer.from(new Float32Array(E).buffer)), h += 1, r == null || r(h, p.length);
  }
}
function S(t, n) {
  let o = 0, r = 0, i = 0;
  for (let e = 0; e < t.length; e++)
    o += t[e] * n[e], r += t[e] * t[e], i += n[e] * n[e];
  return r && i ? o / (Math.sqrt(r) * Math.sqrt(i)) : 0;
}
function v(t, n, o = 10, r) {
  const i = /* @__PURE__ */ new Set(["the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "with", "as", "is", "are", "was", "were", "be", "by", "that", "this", "it", "at", "from", "we", "you", "they", "he", "she"]), e = (a) => a.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean).filter((f) => !i.has(f)), p = new Set(e(n)), h = c().prepare('SELECT p.id, p.idx, p.text, e.vector FROM agent_paragraphs p LEFT JOIN embeddings_agent e ON e.ref_id = p.id WHERE p.transcript_id = ? AND (e.kind IS NULL OR e.kind = "paragraph") ORDER BY p.idx ASC').all(t), d = r ? new Float32Array(new Float32Array(r)) : void 0, l = n.toLowerCase(), s = l.replace(/[-_]/g, " "), E = h.map((a) => {
    const f = new Set(e(a.text));
    let m = 0;
    for (const g of p) f.has(g) && (m += 1);
    let u = 0;
    if (a.vector && d) {
      const g = new Float32Array(a.vector.buffer, a.vector.byteOffset, a.vector.length / 4);
      u = S(g, d);
    }
    const w = a.text.toLowerCase(), _ = w.includes(l) || w.includes(s) ? 5 : 0, b = 0.6 * m + 0.4 * u + _;
    return { ...a, score: b };
  });
  return E.sort((a, f) => f.score - a.score), E.slice(0, o);
}
export {
  S as cosineSim,
  T as embedParagraphs,
  v as hybridRetrieve,
  O as splitParagraphs
};
