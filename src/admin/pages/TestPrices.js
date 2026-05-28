import React, { useState, useEffect } from "react";
import { api } from "../services/api";

const EMOJI_ICONS = ['🧪','🩸','💉','🔬','💊','☀️','🫀','🦴','🧬','🔎','📋','📦','🫁','🧠','🦷','👁️','👂','👃','👅','💧','🦋','🧍','🩺','🦠','⚕️'];
const ICONS8_ICONS = ['icons8:liver', 'icons8:kidney', 'icons8:stomach', 'icons8:heart-with-pulse', 'icons8:lungs', 'icons8:brain', 'icons8:test-tube', 'icons8:syringe', 'icons8:microscope', 'icons8:pill', 'icons8:stethoscope', 'icons8:caduceus', 'icons8:dna-helix', 'icons8:medical-doctor'];
const LOCAL_ICONS = ['local:1', 'local:2', 'local:3', 'local:4', 'local:5', 'local:6', 'local:7', 'local:8', 'local:9'];
const ICONS = [...EMOJI_ICONS, ...ICONS8_ICONS, ...LOCAL_ICONS];
const FASTING_OPTS = ['No Fasting Required','8 hrs Fasting Required','10 hrs Fasting Required','12 hrs Fasting Required','10-12 hrs Fasting Required'];
const REC_OPTS = ['Everyone','Male','Female','Pregnant Women','Senior Citizens'];

const renderIcon = (iconStr) => {
  if (!iconStr) return null;
  if (iconStr.startsWith("icons8:")) {
    const name = iconStr.replace("icons8:", "");
    return <img src={`https://img.icons8.com/color/48/${name}.png`} alt={name} style={{ width: "1.2em", height: "1.2em", verticalAlign: "middle" }} />;
  }
  if (iconStr.startsWith("local:")) {
    const name = iconStr.replace("local:", "");
    return <img src={`/icons/${name}.png`} alt={name} style={{ width: "1.2em", height: "1.2em", verticalAlign: "middle" }} />;
  }
  if (iconStr.startsWith("google:")) {
    return <span className="material-symbols-outlined" style={{ fontSize: "inherit", verticalAlign: "middle" }}>{iconStr.replace("google:", "")}</span>;
  }
  return <span style={{ verticalAlign: "middle" }}>{iconStr}</span>;
};

function TestPrices() {
  const [tab, setTab] = useState("tests");
  const [tests, setTests] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);

  const role = localStorage.getItem("admin-role") || (localStorage.getItem("admin-token") ? "admin" : "viewer");
  const isAdmin = role === "admin";

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [t, p, pk] = await Promise.all([api.labTests.getAll(), api.profiles.getAll(), api.packages.getAll()]);
      setTests(t || []);
      setProfiles(p || []);
      setPackages(pk || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };
  const resetForm = () => { setForm({}); setSelectedIds([]); setEditingId(null); setShowForm(false); };

  const toggleId = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // ── SAVE ──
  const handleSave = async (e) => {
    e.preventDefault();
    if (!isAdmin) return alert("Admin access required.");
    setSaving(true);
    try {
      if (tab === "tests") {
        if (editingId) { await api.labTests.update({ id: editingId, ...form }); flash("✅ Test updated!"); }
        else { await api.labTests.create(form); flash("✅ Test added!"); }
      } else if (tab === "profiles") {
        const payload = { ...form, testIds: selectedIds };
        if (editingId) { await api.profiles.update({ id: editingId, ...payload }); flash("✅ Profile updated!"); }
        else { await api.profiles.create(payload); flash("✅ Profile created!"); }
      } else {
        const payload = { ...form, profileIds: selectedIds };
        if (editingId) { await api.packages.update({ id: editingId, ...payload }); flash("✅ Package updated!"); }
        else { await api.packages.create(payload); flash("✅ Package created!"); }
      }
      await fetchAll();
      resetForm();
    } catch (e) { alert("Save failed: " + e.message); }
    setSaving(false);
  };

  const handleDelete = async (type, id, name) => {
    if (!isAdmin) return alert("Admin access required.");
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      if (type === "tests") await api.labTests.delete(id);
      else if (type === "profiles") await api.profiles.delete(id);
      else await api.packages.delete(id);
      await fetchAll();
      flash("🗑️ Deleted.");
    } catch (e) { alert("Delete failed."); }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    if (tab === "tests") {
      setForm({ name: item.name, description: item.description || "", icon: item.icon || "🧪", current_price: item.current_price, old_price: item.old_price || "", discount: item.discount || "", fasting_rule: item.fasting_rule || "No Fasting Required", report_time: item.report_time || "Same Day", recommended_for: item.recommended_for || "Everyone", category: item.category || "" });
    } else if (tab === "profiles") {
      setForm({ name: item.name, description: item.description || "", icon: item.icon || "📋", current_price: item.current_price, old_price: item.old_price || "", discount: item.discount || "", fasting_rule: item.fasting_rule || "No Fasting Required", report_time: item.report_time || "Same Day", recommended_for: item.recommended_for || "Everyone" });
      setSelectedIds((item.profile_tests || []).map(pt => pt.test_id));
    } else {
      setForm({ name: item.name, description: item.description || "", icon: item.icon || "📦", current_price: item.current_price, old_price: item.old_price || "", discount: item.discount || "", fasting_rule: item.fasting_rule || "No Fasting Required", report_time: item.report_time || "Same Day", recommended_for: item.recommended_for || "Everyone" });
      setSelectedIds((item.package_profiles || []).map(pp => pp.profile_id));
    }
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startAdd = () => {
    resetForm();
    if (tab === "tests") setForm({ name: "", description: "", icon: "🧪", current_price: "", old_price: "", discount: "", fasting_rule: "No Fasting Required", report_time: "Same Day", recommended_for: "Everyone", category: "" });
    else if (tab === "profiles") setForm({ name: "", description: "", icon: "📋", current_price: "", old_price: "", discount: "", fasting_rule: "No Fasting Required", report_time: "Same Day", recommended_for: "Everyone" });
    else setForm({ name: "", description: "", icon: "📦", current_price: "", old_price: "", discount: "", fasting_rule: "No Fasting Required", report_time: "Same Day", recommended_for: "Everyone" });
    setShowForm(true);
  };

  // ── Filter ──
  const filtered = (list) => list.filter(x => (x.name || "").toLowerCase().includes(search.toLowerCase()));

  // ── Styles ──
  const tabStyle = (active) => ({ padding: "10px 24px", borderRadius: "10px 10px 0 0", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "14px", transition: "all 0.2s", background: active ? "rgba(90,138,26,0.2)" : "transparent", color: active ? "#E7F1A8" : "#64748b", borderBottom: active ? "2px solid #6a9a2a" : "2px solid transparent" });
  const badgeS = (bg, color, border) => ({ display: "inline-block", padding: "2px 10px", borderRadius: "12px", fontSize: "0.7rem", fontWeight: 700, background: bg, color, border: `1px solid ${border}` });
  const btnEdit = { background: "rgba(90,138,26,0.2)", color: "#E7F1A8", border: "1px solid rgba(90,138,26,0.3)", padding: "5px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, cursor: "pointer", marginRight: "6px" };
  const btnDel = { background: "rgba(198,40,40,0.15)", color: "#fca5a5", border: "1px solid rgba(198,40,40,0.3)", padding: "5px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, cursor: "pointer" };

  const handlePriceChange = (field, value) => {
    let newForm = { ...form, [field]: value };
    const curr = parseFloat(field === 'current_price' ? value : form.current_price);
    const old = parseFloat(field === 'old_price' ? value : form.old_price);
    if (!isNaN(curr) && !isNaN(old) && old > curr) {
      newForm.discount = Math.round(((old - curr) / old) * 100) + "% OFF";
    } else if (field === 'old_price' || field === 'current_price') {
      newForm.discount = "";
    }
    setForm(newForm);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
        <div>
          <h1 className="admin-page-title">🔬 Lab Catalog</h1>
          <p className="admin-page-subtitle">Manage individual tests, profiles (groups of tests), and packages (groups of profiles).</p>
        </div>
        {isAdmin && !showForm && (
          <button className="admin-btn admin-btn-primary" style={{ marginTop: "4px" }} onClick={startAdd}>
            + Add New {tab === "tests" ? "Test" : tab === "profiles" ? "Profile" : "Package"}
          </button>
        )}
      </div>

      {msg && (<div style={{ background: "rgba(46,125,50,0.15)", border: "1px solid rgba(46,125,50,0.3)", color: "#E7F1A8", padding: "12px 18px", borderRadius: "10px", marginBottom: "16px", fontSize: "14px", fontWeight: 500 }}>{msg}</div>)}

      {/* Tab Bar */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(46,125,50,0.15)", marginBottom: "24px" }}>
        <button style={tabStyle(tab === "tests")} onClick={() => { setTab("tests"); resetForm(); setSearch(""); }}>🧪 Tests</button>
        <button style={tabStyle(tab === "profiles")} onClick={() => { setTab("profiles"); resetForm(); setSearch(""); }}>📋 Profiles</button>
        <button style={tabStyle(tab === "packages")} onClick={() => { setTab("packages"); resetForm(); setSearch(""); }}>📦 Packages</button>
      </div>

      {/* ═══ FORM ═══ */}
      {showForm && (
        <div className="admin-card" style={{ marginBottom: "24px", border: "1px solid rgba(90,138,26,0.3)", background: "rgba(10,18,5,0.6)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div className="admin-chart-title" style={{ marginBottom: 0 }}>
              {editingId ? `✏️ Edit ${tab === "tests" ? "Test" : tab === "profiles" ? "Profile" : "Package"}` : `✨ Add New ${tab === "tests" ? "Test" : tab === "profiles" ? "Profile" : "Package"}`}
            </div>
            {editingId && <span style={{ fontSize: "12px", background: "rgba(99,102,241,0.15)", color: "#a5b4fc", padding: "4px 12px", borderRadius: "20px" }}>Editing</span>}
          </div>
          <form onSubmit={handleSave}>
            {/* Row 1: Name, Icon, Description */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr auto 2fr", gap: "14px", marginBottom: "14px" }}>
              <div className="sf-field">
                <label>Name *</label>
                <input className="admin-input" required value={form.name || ""} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={tab === "tests" ? "e.g. CBC" : tab === "profiles" ? "e.g. Thyroid Profile" : "e.g. CellQ Premium"} />
              </div>
              <div className="sf-field">
                <label>Icon</label>
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", width: "220px" }}>
                  {ICONS.map(ic => (
                    <button type="button" key={ic} onClick={() => setForm({ ...form, icon: ic })} style={{ width: "32px", height: "32px", borderRadius: "8px", border: form.icon === ic ? "2px solid #6a9a2a" : "1px solid rgba(255,255,255,0.1)", background: form.icon === ic ? "rgba(90,138,26,0.3)" : "rgba(255,255,255,0.05)", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{renderIcon(ic)}</button>
                  ))}
                </div>
              </div>
              <div className="sf-field">
                <label>Description</label>
                <textarea className="admin-input" style={{ resize: "vertical", minHeight: "80px" }} value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Short description for Know More section" />
              </div>
            </div>

            {/* Row 2: Prices */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div className="sf-field"><label>Current Price (₹) *</label><input className="admin-input" type="number" required value={form.current_price || ""} onChange={e => handlePriceChange("current_price", e.target.value)} placeholder="e.g. 499" /></div>
              <div className="sf-field"><label>Old Price (₹)</label><input className="admin-input" type="number" value={form.old_price || ""} onChange={e => handlePriceChange("old_price", e.target.value)} placeholder="e.g. 1499" /></div>
              <div className="sf-field"><label>Discount Label</label><input className="admin-input" value={form.discount || ""} onChange={e => setForm({ ...form, discount: e.target.value })} placeholder="e.g. 70% OFF" /></div>
            </div>

            {/* Row 3: Details */}
            <div style={{ display: "grid", gridTemplateColumns: tab === "tests" ? "1fr 1fr 1fr 1fr" : "1fr 1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div className="sf-field"><label>Report Time</label><input className="admin-input" value={form.report_time || ""} onChange={e => setForm({ ...form, report_time: e.target.value })} placeholder="e.g. Same Day" /></div>
              <div className="sf-field"><label>Fasting</label>
                <select className="admin-input" value={form.fasting_rule || "No Fasting Required"} onChange={e => setForm({ ...form, fasting_rule: e.target.value })}>
                  {FASTING_OPTS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="sf-field"><label>Recommended For</label>
                <select className="admin-input" value={form.recommended_for || "Everyone"} onChange={e => setForm({ ...form, recommended_for: e.target.value })}>
                  {REC_OPTS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              {tab === "tests" && (
                <div className="sf-field"><label>Category</label><input className="admin-input" value={form.category || ""} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g. Hematology" /></div>
              )}
            </div>

            {/* Multi-select for Profiles/Packages */}
            {tab === "profiles" && (
              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: "8px", display: "block" }}>Select Tests to Include ({selectedIds.length} selected)</label>
                <div style={{ maxHeight: "200px", overflowY: "auto", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "8px" }}>
                  {tests.map(t => (
                    <label key={t.id} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 8px", borderRadius: "6px", cursor: "pointer", background: selectedIds.includes(t.id) ? "rgba(90,138,26,0.15)" : "transparent", marginBottom: "2px" }}>
                      <input type="checkbox" checked={selectedIds.includes(t.id)} onChange={() => toggleId(t.id)} style={{ accentColor: "#6a9a2a" }} />
                      <span style={{ fontSize: "14px" }}>{renderIcon(t.icon)} {t.name}</span>
                      <span style={{ marginLeft: "auto", fontSize: "11px", color: "#64748b" }}>₹{t.current_price}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {tab === "packages" && (
              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: "8px", display: "block" }}>Select Profiles to Include ({selectedIds.length} selected)</label>
                <div style={{ maxHeight: "200px", overflowY: "auto", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "8px" }}>
                  {profiles.map(p => (
                    <label key={p.id} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 8px", borderRadius: "6px", cursor: "pointer", background: selectedIds.includes(p.id) ? "rgba(90,138,26,0.15)" : "transparent", marginBottom: "2px" }}>
                      <input type="checkbox" checked={selectedIds.includes(p.id)} onChange={() => toggleId(p.id)} style={{ accentColor: "#6a9a2a" }} />
                      <span style={{ fontSize: "14px" }}>{renderIcon(p.icon)} {p.name}</span>
                      <span style={{ marginLeft: "auto", fontSize: "11px", color: "#64748b" }}>{(p.profile_tests || []).length} tests · ₹{p.current_price}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: "12px" }}>
              <button type="submit" className="admin-btn admin-btn-primary" disabled={saving} style={{ minWidth: "140px" }}>{saving ? "Saving..." : editingId ? "Update" : "Add"}</button>
              <button type="button" className="admin-btn admin-btn-danger" onClick={resetForm}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="admin-toolbar">
        <input type="text" className="admin-search" placeholder="🔍 Search…" value={search} onChange={e => setSearch(e.target.value)} />
        <span style={{ color: "#8892b0", fontSize: "0.85rem" }}>
          {tab === "tests" ? `${filtered(tests).length} tests` : tab === "profiles" ? `${filtered(profiles).length} profiles` : `${filtered(packages).length} packages`}
        </span>
      </div>

      {loading ? <div className="admin-loading">Loading…</div> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                {tab === "tests" && <th>Category</th>}
                {tab !== "tests" && <th>Includes</th>}
                <th>Pricing</th>
                <th>Details</th>
                {isAdmin && <th style={{ textAlign: "center" }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {/* ── TESTS TAB ── */}
              {tab === "tests" && filtered(tests).map(item => (
                <tr key={item.id}>
                  <td style={{ fontSize: "20px", textAlign: "center", width: "40px" }}>{renderIcon(item.icon)}</td>
                  <td style={{ fontWeight: 600 }}>{item.name}<br /><span style={{ fontSize: "0.75rem", color: "#64748b" }}>{item.description}</span></td>
                  <td><span style={badgeS("rgba(37,99,235,0.2)", "#93c5fd", "rgba(37,99,235,0.3)")}>{item.category || "—"}</span></td>
                  <td>
                    <div style={{ color: "#E7F1A8", fontWeight: 700 }}>₹{item.current_price}</div>
                    {item.old_price && <div style={{ fontSize: "0.75rem", textDecoration: "line-through", color: "#475569" }}>₹{item.old_price}</div>}
                    {item.discount && <div style={{ fontSize: "0.7rem", color: "#fb923c" }}>{item.discount}</div>}
                  </td>
                  <td style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.8 }}>
                    <div>🕒 {item.report_time}</div><div>🩸 {item.fasting_rule}</div>
                  </td>
                  {isAdmin && (
                    <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                      <button style={btnEdit} onClick={() => startEdit(item)}>✏️ Edit</button>
                      <button style={btnDel} onClick={() => handleDelete("tests", item.id, item.name)}>🗑️</button>
                    </td>
                  )}
                </tr>
              ))}

              {/* ── PROFILES TAB ── */}
              {tab === "profiles" && filtered(profiles).map(item => {
                const pts = (item.profile_tests || []).map(pt => pt.tests).filter(Boolean);
                return (
                  <tr key={item.id}>
                    <td style={{ fontSize: "20px", textAlign: "center", width: "40px" }}>{renderIcon(item.icon)}</td>
                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                    <td style={{ maxWidth: "280px" }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                        {pts.map(t => (
                          <span key={t.id} style={{ background: "rgba(255,255,255,0.07)", color: "#94a3b8", padding: "2px 8px", borderRadius: "6px", fontSize: "0.7rem" }}>
                            {renderIcon(t.icon)} {t.name}
                          </span>
                        ))}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "4px" }}>{pts.length} tests</div>
                    </td>
                    <td>
                      <div style={{ color: "#E7F1A8", fontWeight: 700 }}>₹{item.current_price}</div>
                      {item.old_price && <div style={{ fontSize: "0.75rem", textDecoration: "line-through", color: "#475569" }}>₹{item.old_price}</div>}
                      {item.discount && <div style={{ fontSize: "0.7rem", color: "#fb923c" }}>{item.discount}</div>}
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.8 }}>
                      <div>🕒 {item.report_time}</div><div>🩸 {item.fasting_rule}</div>
                    </td>
                    {isAdmin && (
                      <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                        <button style={btnEdit} onClick={() => startEdit(item)}>✏️ Edit</button>
                        <button style={btnDel} onClick={() => handleDelete("profiles", item.id, item.name)}>🗑️</button>
                      </td>
                    )}
                  </tr>
                );
              })}

              {/* ── PACKAGES TAB ── */}
              {tab === "packages" && filtered(packages).map(item => {
                const pps = (item.package_profiles || []).map(pp => pp.profiles).filter(Boolean);
                return (
                  <tr key={item.id}>
                    <td style={{ fontSize: "20px", textAlign: "center", width: "40px" }}>{renderIcon(item.icon)}</td>
                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                    <td style={{ maxWidth: "320px" }}>
                      {pps.map(prof => (
                        <div key={prof.id} style={{ marginBottom: "6px" }}>
                          <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#c084fc", marginBottom: "2px" }}>{renderIcon(prof.icon)} {prof.name}</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "3px", paddingLeft: "12px" }}>
                            {(prof.profile_tests || []).map(pt => pt.tests).filter(Boolean).map(t => (
                              <span key={t.id} style={{ background: "rgba(255,255,255,0.05)", color: "#94a3b8", padding: "1px 6px", borderRadius: "4px", fontSize: "0.65rem" }}>{renderIcon(t.icon)} {t.name}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div style={{ fontSize: "0.7rem", color: "#64748b" }}>{pps.length} profiles</div>
                    </td>
                    <td>
                      <div style={{ color: "#E7F1A8", fontWeight: 700 }}>₹{item.current_price}</div>
                      {item.old_price && <div style={{ fontSize: "0.75rem", textDecoration: "line-through", color: "#475569" }}>₹{item.old_price}</div>}
                      {item.discount && <div style={{ fontSize: "0.7rem", color: "#fb923c" }}>{item.discount}</div>}
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.8 }}>
                      <div>🕒 {item.report_time}</div><div>🩸 {item.fasting_rule}</div>
                    </td>
                    {isAdmin && (
                      <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                        <button style={btnEdit} onClick={() => startEdit(item)}>✏️ Edit</button>
                        <button style={btnDel} onClick={() => handleDelete("packages", item.id, item.name)}>🗑️</button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .sf-field { display: flex; flex-direction: column; gap: 7px; }
        .sf-field label { font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.7px; }
        @media (max-width: 768px) {
          div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default TestPrices;
