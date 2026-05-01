import React, { useState, useEffect } from "react";
import { api } from "../services/api";

// Category list matching frontend
const CATEGORIES = [
  "Individual", "Package"
];

const DEFAULT_FORM = {
  test_name: "",
  type: "Test",
  tags: "",
  current_price: "",
  old_price: "",
  discount: "",
  included_tests: "",
  fasting_rule: "No Fasting Required",
  report_time: "12 Hours",
  test_count: "1",
  recommended_for: "Everyone"
};

function TestPrices() {
  const [tab, setTab] = useState("catalog"); // "catalog" | "prices"
  const [tests, setTests] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [form, setForm] = useState(DEFAULT_FORM);

  // For inline price editing
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [priceForm, setPriceForm] = useState({ test_name: "", current_price: "", old_price: "", discount: "" });

  // If admin-role not stored (old session before role-saving), fallback to admin when token exists
  const _storedRole = localStorage.getItem("admin-role");
  const _hasToken   = !!localStorage.getItem("admin-token");
  const currentRole = _storedRole || (_hasToken ? "admin" : "viewer");

  useEffect(() => { fetchTests(); }, []);

  const fetchTests = async () => {
    setLoading(true);
    try {
      const data = await api.tests.getAll();
      setTests(data || []);
    } catch (err) {
      console.error("Failed to load tests", err);
    }
    setLoading(false);
  };

  const flash = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // ─── Catalog tab (full test management) ───
  const catalogTests = tests.filter(t =>
    t.test_name.toLowerCase().includes(search.toLowerCase()) ||
    (t.tags && t.tags.toLowerCase().includes(search.toLowerCase()))
  );

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      test_name: item.test_name,
      type: item.type || "Test",
      tags: item.tags || "",
      current_price: item.current_price || "",
      old_price: item.old_price || "",
      discount: item.discount || "",
      included_tests: item.included_tests || "",
      fasting_rule: item.fasting_rule || "No Fasting Required",
      report_time: item.report_time || "12 Hours",
      test_count: item.test_count || "1",
      recommended_for: item.recommended_for || "Everyone"
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(DEFAULT_FORM);
    setShowForm(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (currentRole !== "admin") return alert("You need admin access to make changes.");
    setSaving(true);
    try {
      if (editingId) {
        await api.tests.update({ id: editingId, ...form });
        flash("✅ Test updated successfully!");
      } else {
        await api.tests.create(form);
        flash("✅ New test added! It will appear on the website.");
      }
      await fetchTests();
      cancelEdit();
    } catch (err) {
      alert("Failed to save. Please try again.");
    }
    setSaving(false);
  };

  const handleDelete = async (id, name) => {
    if (currentRole !== "admin") return alert("You need admin access to delete.");
    if (!window.confirm(`Delete "${name}"? This will remove it from the website.`)) return;
    try {
      await api.tests.delete(id);
      await fetchTests();
      flash("🗑️ Test deleted.");
    } catch (err) {
      alert("Failed to delete.");
    }
  };

  // ─── Price override tab ───
  const startEditPrice = (item) => {
    setEditingPriceId(item.id);
    setPriceForm({
      test_name: item.test_name,
      current_price: item.current_price || "",
      old_price: item.old_price || "",
      discount: item.discount || ""
    });
  };

  const savePrice = async (id) => {
    if (currentRole !== "admin") return alert("You need admin access.");
    try {
      await api.tests.update({ id, ...priceForm });
      setEditingPriceId(null);
      await fetchTests();
      flash("✅ Price updated!");
    } catch (err) {
      alert("Failed to update price.");
    }
  };

  const priceTests = tests.filter(t =>
    t.test_name.toLowerCase().includes(search.toLowerCase())
  );

  // ─── Styles ───
  const tabStyle = (active) => ({
    padding: "10px 24px",
    borderRadius: "10px 10px 0 0",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "14px",
    transition: "all 0.2s",
    background: active ? "rgba(90, 138, 26, 0.2)" : "transparent",
    color: active ? "#E7F1A8" : "#64748b",
    borderBottom: active ? "2px solid #6a9a2a" : "2px solid transparent",
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
        <div>
          <h1 className="admin-page-title">🔬 Test Catalog</h1>
          <p className="admin-page-subtitle">
            Add new tests/packages that appear on the website, or update prices for existing ones.
          </p>
        </div>
        {currentRole === "admin" && tab === "catalog" && !showForm && (
          <button
            className="admin-btn admin-btn-primary"
            style={{ marginTop: "4px" }}
            onClick={() => { setShowForm(true); setEditingId(null); setForm(DEFAULT_FORM); }}
          >
            + Add New Test
          </button>
        )}
      </div>

      {/* Success banner */}
      {successMsg && (
        <div style={{
          background: "rgba(46,125,50,0.15)", border: "1px solid rgba(46,125,50,0.3)",
          color: "#E7F1A8", padding: "12px 18px", borderRadius: "10px", marginBottom: "16px",
          fontSize: "14px", fontWeight: 500
        }}>
          {successMsg}
        </div>
      )}

      {/* Tab Bar */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(46,125,50,0.15)", marginBottom: "24px" }}>
        <button style={tabStyle(tab === "catalog")} onClick={() => { setTab("catalog"); setShowForm(false); cancelEdit(); setSearch(""); }}>
          📦 Manage Tests & Packages
        </button>
        <button style={tabStyle(tab === "prices")} onClick={() => { setTab("prices"); setSearch(""); }}>
          💰 Edit Prices & Discounts
        </button>
      </div>

      {/* ═══════════════ CATALOG TAB ═══════════════ */}
      {tab === "catalog" && (
        <>
          {/* Add / Edit Form */}
          {showForm && (
            <div className="admin-card" style={{ marginBottom: "24px", border: "1px solid rgba(90, 138, 26, 0.3)", background: "rgba(10,18,5,0.6)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <div className="admin-chart-title" style={{ marginBottom: 0 }}>
                  {editingId ? "✏️ Edit Test / Package" : "✨ Add New Test / Package"}
                </div>
                {editingId && (
                  <span style={{ fontSize: "12px", background: "rgba(99,102,241,0.15)", color: "#a5b4fc", padding: "4px 12px", borderRadius: "20px" }}>
                    Editing existing entry
                  </span>
                )}
              </div>
              <form onSubmit={handleSave}>
                {/* Row 1: Name, Type, Category Tags */}
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 2fr", gap: "14px", marginBottom: "14px" }}>
                  <div className="sf-field">
                    <label>Test / Package Name *</label>
                    <input className="admin-input" type="text" value={form.test_name}
                      onChange={e => setForm({ ...form, test_name: e.target.value })}
                      placeholder="e.g. Full Blood Count" required />
                  </div>
                  <div className="sf-field">
                    <label>Type</label>
                    <select className="admin-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                      <option value="Test">Test</option>
                      <option value="Package">Package</option>
                    </select>
                  </div>
                  <div className="sf-field">
                    <label>Category Tags (where it appears on website) *</label>
                    <select className="admin-input" value={form.tags}
                      onChange={e => setForm({ ...form, tags: e.target.value })}>
                      <option value="">— Select Category —</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      <option value="custom">Custom (type below)</option>
                    </select>
                    {form.tags === "custom" && (
                      <input className="admin-input" style={{ marginTop: "8px" }} type="text"
                        placeholder="Type custom tags, comma separated"
                        onChange={e => setForm({ ...form, tags: e.target.value })} />
                    )}
                  </div>
                </div>

                {/* Row 2: Prices */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                  <div className="sf-field">
                    <label>Current Price (₹) *</label>
                    <input className="admin-input" type="number" value={form.current_price}
                      onChange={e => setForm({ ...form, current_price: e.target.value })}
                      placeholder="e.g. 499" required />
                  </div>
                  <div className="sf-field">
                    <label>Original / Old Price (₹)</label>
                    <input className="admin-input" type="number" value={form.old_price}
                      onChange={e => setForm({ ...form, old_price: e.target.value })}
                      placeholder="e.g. 1499 (shown as strikethrough)" />
                  </div>
                  <div className="sf-field">
                    <label>Discount Label</label>
                    <input className="admin-input" type="text" value={form.discount}
                      onChange={e => setForm({ ...form, discount: e.target.value })}
                      placeholder="e.g. UPTO 70% OFF" />
                  </div>
                </div>

                {/* Row 3: Test Details */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                  <div className="sf-field">
                    <label>Number of Sub-Tests</label>
                    <input className="admin-input" type="text" value={form.test_count}
                      onChange={e => setForm({ ...form, test_count: e.target.value })}
                      placeholder="e.g. 72" />
                  </div>
                  <div className="sf-field">
                    <label>Report Delivery Time</label>
                    <input className="admin-input" type="text" value={form.report_time}
                      onChange={e => setForm({ ...form, report_time: e.target.value })}
                      placeholder="e.g. 12 Hours" />
                  </div>
                  <div className="sf-field">
                    <label>Fasting Requirement</label>
                    <select className="admin-input" value={form.fasting_rule} onChange={e => setForm({ ...form, fasting_rule: e.target.value })}>
                      <option>No Fasting Required</option>
                      <option>8 hrs Fasting Required</option>
                      <option>10 hrs Fasting Required</option>
                      <option>12 hrs Fasting Required</option>
                      <option>10-12 hrs Fasting Required</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Recommended + Included Tests */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "14px", marginBottom: "20px" }}>
                  <div className="sf-field">
                    <label>Recommended For</label>
                    <select className="admin-input" value={form.recommended_for} onChange={e => setForm({ ...form, recommended_for: e.target.value })}>
                      <option>Everyone</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Pregnant Women</option>
                      <option>Senior Citizens</option>
                    </select>
                  </div>
                  <div className="sf-field">
                    <label>Included Tests (short description shown on card)</label>
                    <input className="admin-input" type="text" value={form.included_tests}
                      onChange={e => setForm({ ...form, included_tests: e.target.value })}
                      placeholder="Cholesterol-Total, Blood Glucose Fasting, Iron, Serum... (shown as a preview)" />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px" }}>
                  <button type="submit" className="admin-btn admin-btn-primary" disabled={saving} style={{ minWidth: "140px" }}>
                    {saving ? "Saving..." : editingId ? "Update Test" : "Add to Website"}
                  </button>
                  <button type="button" className="admin-btn admin-btn-danger" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Search + Count */}
          <div className="admin-toolbar">
            <input type="text" className="admin-search" placeholder="🔍 Search by name or category tag…"
              value={search} onChange={e => setSearch(e.target.value)} />
            <span style={{ color: "#8892b0", fontSize: "0.85rem" }}>
              {catalogTests.length} test{catalogTests.length !== 1 ? "s" : ""} in catalog
            </span>
          </div>

          {loading ? (
            <div className="admin-loading">Loading catalog…</div>
          ) : catalogTests.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
              <p>No tests found. {currentRole === "admin" ? "Click \"+ Add New Test\" to get started!" : "No tests have been added yet."}</p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Name</th>
                    <th>Pricing</th>
                    <th>Details</th>
                    {currentRole === "admin" && <th style={{ textAlign: "center" }}>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {catalogTests.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div style={{ marginBottom: "5px" }}>
                          <span style={{
                            display: "inline-block", padding: "2px 10px", borderRadius: "12px", fontSize: "0.7rem",
                            fontWeight: 700, background: item.type === "Package" ? "rgba(147,51,234,0.2)" : "rgba(37,99,235,0.2)",
                            color: item.type === "Package" ? "#c084fc" : "#93c5fd",
                            border: `1px solid ${item.type === "Package" ? "rgba(147,51,234,0.3)" : "rgba(37,99,235,0.3)"}`
                          }}>
                            {item.type || "Test"}
                          </span>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                          {(item.tags || "").split(",").filter(Boolean).map((t, i) => (
                            <span key={i} style={{
                              background: "rgba(255,255,255,0.07)", color: "#94a3b8",
                              padding: "2px 8px", borderRadius: "6px", fontSize: "0.7rem"
                            }}>{t.trim()}</span>
                          ))}
                        </div>
                      </td>
                      <td style={{ fontWeight: 600, maxWidth: "240px", lineHeight: 1.4 }}>{item.test_name}</td>
                      <td>
                        <div style={{ color: "#E7F1A8", fontWeight: 700, fontSize: "1rem" }}>₹{item.current_price}</div>
                        {item.old_price && <div style={{ fontSize: "0.75rem", textDecoration: "line-through", color: "#475569" }}>₹{item.old_price}</div>}
                        {item.discount && <div style={{ fontSize: "0.7rem", color: "#fb923c", marginTop: "2px" }}>{item.discount}</div>}
                      </td>
                      <td style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.8 }}>
                        <div>🕒 {item.report_time || "—"}</div>
                        <div>🩸 {item.fasting_rule || "—"}</div>
                        <div>🔬 {item.test_count || "1"} tests</div>
                      </td>
                      {currentRole === "admin" && (
                        <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                          <button
                            style={{ background: "rgba(90,138,26,0.2)", color: "#E7F1A8", border: "1px solid rgba(90,138,26,0.3)", padding: "5px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, cursor: "pointer", marginRight: "6px" }}
                            onClick={() => startEdit(item)}
                          >✏️ Edit</button>
                          <button
                            style={{ background: "rgba(198,40,40,0.15)", color: "#fca5a5", border: "1px solid rgba(198,40,40,0.3)", padding: "5px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                            onClick={() => handleDelete(item.id, item.test_name)}
                          >🗑️ Delete</button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* ═══════════════ PRICES TAB ═══════════════ */}
      {tab === "prices" && (
        <>
          <div style={{ marginBottom: "18px", padding: "12px 16px", background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: "10px", fontSize: "13px", color: "#93c5fd" }}>
            ℹ️ These prices apply to both DB-managed tests above. Editing here will update what's shown on the website in real time.
          </div>

          <div className="admin-toolbar">
            <input type="text" className="admin-search" placeholder="🔍 Search tests…"
              value={search} onChange={e => setSearch(e.target.value)} />
            <span style={{ color: "#8892b0", fontSize: "0.85rem" }}>{priceTests.length} entries</span>
          </div>

          {loading ? (
            <div className="admin-loading">Loading…</div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Test Name</th>
                    <th>Category</th>
                    <th>Current Price</th>
                    <th>Original Price</th>
                    <th>Discount Label</th>
                    {currentRole === "admin" && <th style={{ textAlign: "center" }}>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {priceTests.map(item => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 600, maxWidth: "220px" }}>{item.test_name}</td>
                      <td>
                        {(item.tags || "").split(",").filter(Boolean).map((t, i) => (
                          <span key={i} style={{ background: "rgba(255,255,255,0.07)", color: "#94a3b8", padding: "2px 8px", borderRadius: "6px", fontSize: "0.7rem", marginRight: "4px" }}>
                            {t.trim()}
                          </span>
                        ))}
                      </td>
                      {editingPriceId === item.id ? (
                        <>
                          <td><input className="admin-input" type="number" value={priceForm.current_price}
                            onChange={e => setPriceForm({ ...priceForm, current_price: e.target.value })} style={{ width: "100px" }} /></td>
                          <td><input className="admin-input" type="number" value={priceForm.old_price}
                            onChange={e => setPriceForm({ ...priceForm, old_price: e.target.value })} style={{ width: "100px" }} /></td>
                          <td><input className="admin-input" type="text" value={priceForm.discount}
                            onChange={e => setPriceForm({ ...priceForm, discount: e.target.value })} style={{ width: "140px" }}
                            placeholder="e.g. UPTO 70% OFF" /></td>
                          {currentRole === "admin" && (
                            <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                              <button
                                style={{ background: "linear-gradient(135deg, #5a8a1a, #6a9a2a)", color: "#fff", border: "none", padding: "5px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, cursor: "pointer", marginRight: "6px" }}
                                onClick={() => savePrice(item.id)}
                              >💾 Save</button>
                              <button
                                style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)", padding: "5px 14px", borderRadius: "8px", fontSize: "12px", cursor: "pointer" }}
                                onClick={() => setEditingPriceId(null)}
                              >Cancel</button>
                            </td>
                          )}
                        </>
                      ) : (
                        <>
                          <td style={{ color: "#E7F1A8", fontWeight: 700 }}>₹{item.current_price}</td>
                          <td style={{ color: "#475569", textDecoration: "line-through" }}>{item.old_price ? `₹${item.old_price}` : "—"}</td>
                          <td style={{ color: "#fb923c" }}>{item.discount || "—"}</td>
                          {currentRole === "admin" && (
                            <td style={{ textAlign: "center" }}>
                              <button
                                style={{ background: "rgba(90,138,26,0.2)", color: "#E7F1A8", border: "1px solid rgba(90,138,26,0.3)", padding: "5px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                                onClick={() => startEditPrice(item)}
                              >✏️ Edit Price</button>
                            </td>
                          )}
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <style>{`
        .sf-field { display: flex; flex-direction: column; gap: 7px; }
        .sf-field label { font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.7px; }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 2fr 1fr 2fr"],
          div[style*="grid-template-columns: 1fr 1fr 1fr"],
          div[style*="grid-template-columns: 1fr 2fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default TestPrices;
