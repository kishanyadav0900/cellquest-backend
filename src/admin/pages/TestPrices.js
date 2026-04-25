import React, { useState, useEffect } from "react";
import { supabase } from "../services/api";

function TestPrices() {
  const [prices, setPrices] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ current_price: "", old_price: "", discount: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("test_prices")
        .select("*")
        .order("test_name", { ascending: true });
      if (error) throw error;
      setPrices(data || []);
    } catch (err) {
      console.error("Failed to load test prices", err);
    }
    setLoading(false);
  };

  const filtered = prices.filter((p) =>
    p.test_name.toLowerCase().includes(search.toLowerCase())
  );

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditForm({
      current_price: item.current_price,
      old_price: item.old_price || "",
      discount: item.discount || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ current_price: "", old_price: "", discount: "" });
  };

  const saveEdit = async (id) => {
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from("test_prices")
        .update({
          current_price: editForm.current_price,
          old_price: editForm.old_price,
          discount: editForm.discount,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      setPrices(prices.map((p) => (p.id === id ? data : p)));
      setEditingId(null);
    } catch (err) {
      console.error("Failed to save", err);
      alert("Failed to save price");
    }
    setSaving(false);
  };

  // Inline styles for the polished UI
  const styles = {
    editBtn: {
      background: "linear-gradient(135deg, #5a8a1a 0%, #6a9a2a 100%)",
      color: "#fff",
      border: "none",
      padding: "6px 18px",
      borderRadius: "20px",
      fontSize: "0.8rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s ease",
      boxShadow: "0 2px 8px rgba(90, 138, 26, 0.3)",
      letterSpacing: "0.3px",
    },
    saveBtn: {
      background: "linear-gradient(135deg, #6a9a2a 0%, #8ab43a 100%)",
      color: "#fff",
      border: "none",
      padding: "6px 18px",
      borderRadius: "20px",
      fontSize: "0.8rem",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.2s ease",
      boxShadow: "0 2px 8px rgba(90, 138, 26, 0.3)",
      marginRight: "6px",
    },
    cancelBtn: {
      background: "transparent",
      color: "#F87154",
      border: "1px solid #F87154",
      padding: "5px 14px",
      borderRadius: "20px",
      fontSize: "0.8rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    editInput: {
      padding: "6px 10px",
      borderRadius: "8px",
      border: "2px solid #6a9a2a",
      background: "rgba(90, 138, 26, 0.08)",
      color: "#fff",
      fontSize: "0.85rem",
      fontWeight: 600,
      outline: "none",
      transition: "border-color 0.2s ease",
    },
    editInputSmall: {
      padding: "6px 10px",
      borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.15)",
      background: "rgba(255,255,255,0.05)",
      color: "#E7F1A8",
      fontSize: "0.85rem",
      outline: "none",
      transition: "border-color 0.2s ease",
    },
    editingRow: {
      background: "rgba(90, 138, 26, 0.08)",
      borderLeft: "3px solid #6a9a2a",
    },
    badge: {
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: "12px",
      fontSize: "0.7rem",
      fontWeight: 700,
      letterSpacing: "0.5px",
    },
  };

  return (
    <div>
      <h1 className="admin-page-title">💰 Test Prices</h1>
      <p className="admin-page-subtitle">
        All {prices.length} tests from the website are listed below. Edit the price or discount for any test — changes will reflect on the public website instantly.
      </p>

      {/* Search */}
      <div className="admin-toolbar">
        <input
          type="text"
          className="admin-search"
          placeholder="🔍 Search by test name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span style={{ color: "#8892b0", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
          Showing {filtered.length} of {prices.length} tests
        </span>
      </div>

      {/* Table */}
      {loading ? (
        <div className="admin-loading">Loading test prices…</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: "40px" }}>#</th>
                <th>Test Name</th>
                <th style={{ width: "140px" }}>Current Price</th>
                <th style={{ width: "130px" }}>Old Price</th>
                <th style={{ width: "170px" }}>Discount</th>
                <th style={{ width: "160px", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "#555" }}>
                    No tests matching "{search}"
                  </td>
                </tr>
              ) : (
                filtered.map((item, i) => {
                  const isEditing = editingId === item.id;
                  return (
                    <tr key={item.id} style={isEditing ? styles.editingRow : {}}>
                      <td style={{ color: "#556" }}>{i + 1}</td>
                      <td style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                        {item.test_name}
                        {isEditing && (
                          <div style={{ fontSize: "0.7rem", color: "#6a9a2a", marginTop: "2px", fontWeight: 400 }}>
                            ✏️ Editing…
                          </div>
                        )}
                      </td>

                      {isEditing ? (
                        <>
                          <td>
                            <input
                              type="text"
                              value={editForm.current_price}
                              onChange={(e) => setEditForm({ ...editForm, current_price: e.target.value })}
                              style={{ ...styles.editInput, width: "100px" }}
                              autoFocus
                              placeholder="₹ Price"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={editForm.old_price}
                              onChange={(e) => setEditForm({ ...editForm, old_price: e.target.value })}
                              style={{ ...styles.editInputSmall, width: "95px" }}
                              placeholder="₹ Old"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={editForm.discount}
                              onChange={(e) => setEditForm({ ...editForm, discount: e.target.value })}
                              style={{ ...styles.editInputSmall, width: "140px" }}
                              placeholder="e.g. 70% OFF"
                            />
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <button
                              style={styles.saveBtn}
                              onClick={() => saveEdit(item.id)}
                              disabled={saving}
                              onMouseOver={(e) => { e.target.style.transform = "scale(1.05)"; }}
                              onMouseOut={(e) => { e.target.style.transform = "scale(1)"; }}
                            >
                              {saving ? "Saving…" : "✓ Save"}
                            </button>
                            <button
                              style={styles.cancelBtn}
                              onClick={cancelEdit}
                              onMouseOver={(e) => { e.target.style.background = "rgba(255,107,107,0.1)"; }}
                              onMouseOut={(e) => { e.target.style.background = "transparent"; }}
                            >
                              ✕
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td style={{ color: "#E7F1A8", fontWeight: 700, fontSize: "0.95rem" }}>₹{item.current_price}</td>
                          <td style={{ textDecoration: "line-through", color: "#555" }}>
                            {item.old_price ? `₹${item.old_price}` : "—"}
                          </td>
                          <td>
                            {item.discount ? (
                              <span style={{
                                ...styles.badge,
                                background: "linear-gradient(135deg, #F87154 0%, #fa8a6a 100%)",
                                color: "#fff",
                              }}>
                                {item.discount}
                              </span>
                            ) : (
                              <span style={{ color: "#444" }}>—</span>
                            )}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <button
                              style={styles.editBtn}
                              onClick={() => startEdit(item)}
                              onMouseOver={(e) => { e.target.style.transform = "scale(1.08)"; e.target.style.boxShadow = "0 4px 15px rgba(90, 138, 26, 0.5)"; }}
                              onMouseOut={(e) => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 2px 8px rgba(90, 138, 26, 0.3)"; }}
                            >
                              ✎ Edit
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TestPrices;
