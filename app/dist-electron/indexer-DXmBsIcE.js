import { d, r as m, i as u } from "./main-Cslh3szS.js";
async function b(r, i) {
  const n = i.split(/\n{2,}/).map((t) => t.trim()).filter(Boolean), a = d().prepare("INSERT INTO agent_paragraphs(id, transcript_id, idx, text) VALUES (?, ?, ?, ?)");
  return d().prepare("DELETE FROM agent_paragraphs WHERE transcript_id = ?").run(r), n.forEach((t, p) => a.run(m(), r, p, t)), n;
}
async function S(r, i, n = "nomic-embed-text", a) {
  var c;
  d().prepare("DELETE FROM embeddings_agent WHERE kind = 'paragraph' AND ref_id IN (SELECT id FROM agent_paragraphs WHERE transcript_id = ?)").run(r);
  const p = d().prepare("SELECT id, text FROM agent_paragraphs WHERE transcript_id = ? ORDER BY idx ASC").all(r);
  let f = 0;
  for (const l of p) {
    const e = await u.embed({ model: n, input: l.text }), s = ((c = e == null ? void 0 : e.embeddings) == null ? void 0 : c[0]) || (e == null ? void 0 : e.embedding) || [];
    d().prepare("INSERT INTO embeddings_agent(id, kind, ref_id, vector) VALUES (?, ?, ?, ?)").run(m(), "paragraph", l.id, Buffer.from(new Float32Array(s).buffer)), f += 1, a == null || a(f, p.length);
  }
}
function w(r, i) {
  let n = 0, a = 0, o = 0;
  for (let t = 0; t < r.length; t++)
    n += r[t] * i[t], a += r[t] * r[t], o += i[t] * i[t];
  return a && o ? n / (Math.sqrt(a) * Math.sqrt(o)) : 0;
}
function O(r, i, n = 5, a) {
  const o = /* @__PURE__ */ new Set(["the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "with", "as", "is", "are", "was", "were", "be", "by", "that", "this", "it", "at", "from", "we", "you", "they", "he", "she"]), t = (e) => e.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean).filter((s) => !o.has(s)), p = new Set(t(i)), f = d().prepare('SELECT p.id, p.idx, p.text, e.vector FROM agent_paragraphs p LEFT JOIN embeddings_agent e ON e.ref_id = p.id WHERE p.transcript_id = ? AND (e.kind IS NULL OR e.kind = "paragraph") ORDER BY p.idx ASC').all(r), c = a ? new Float32Array(new Float32Array(a)) : void 0, l = f.map((e) => {
    const s = new Set(t(e.text));
    let h = 0;
    for (const E of p) s.has(E) && (h += 1);
    let g = 0;
    if (e.vector && c) {
      const E = new Float32Array(e.vector.buffer, e.vector.byteOffset, e.vector.length / 4);
      g = w(E, c);
    }
    const R = 0.4 * h + 0.6 * g;
    return { ...e, score: R };
  });
  return l.sort((e, s) => s.score - e.score), l.slice(0, n);
}
export {
  w as cosineSim,
  S as embedParagraphs,
  O as hybridRetrieve,
  b as splitParagraphs
};
