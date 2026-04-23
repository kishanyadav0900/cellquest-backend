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
        <span style={{ color: "#8892b0", fontSize: "0.85rem" }}>
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
                <th style={{ width: "130px" }}>Current Price</th>
                <th style={{ width: "130px" }}>Old Price</th>
                <th style={{ width: "160px" }}>Discount</th>
                <th style={{ width: "130px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
                    No tests matching "{search}"
                  </td>
                </tr>
              ) : (
                filtered.map((item, i) => (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td style={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.test_name}</td>

                    {editingId === item.id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            value={editForm.current_price}
                            onChange={(e) => setEditForm({ ...editForm, current_price: e.target.value })}
                            style={{ width: "90px", padding: "4px 8px", borderRadius: "6px", border: "1px solid #4fc3f7", background: "#1a1f3a", color: "#fff", fontSize: "0.85rem" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editForm.old_price}
                            onChange={(e) => setEditForm({ ...editForm, old_price: e.target.value })}
                            style={{ width: "90px", padding: "4px 8px", borderRadius: "6px", border: "1px solid #555", background: "#1a1f3a", color: "#fff", fontSize: "0.85rem" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editForm.discount}
                            onChange={(e) => setEditForm({ ...editForm, discount: e.target.value })}
                            style={{ width: "130px", padding: "4px 8px", borderRadius: "6px", border: "1px solid #555", background: "#1a1f3a", color: "#fff", fontSize: "0.85rem" }}
                            placeholder="e.g. 70% OFF"
                          />
                        </td>
                        <td>
                          <button
                            className="admin-btn-sm admin-btn-edit"
                            onClick={() => saveEdit(item.id)}
                            disabled={saving}
                            style={{ marginRight: "4px" }}
                          >
                            {saving ? "…" : "Save"}
                          </button>
                          <button className="admin-btn-sm admin-btn-delete" onClick={cancelEdit}>
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ color: "#4fc3f7", fontWeight: 700, fontSize: "0.95rem" }}>₹{item.current_price}</td>
                        <td style={{ textDecoration: "line-through", color: "#666" }}>
                          {item.old_price ? `₹${item.old_price}` : "—"}
                        </td>
                        <td>
                          {item.discount ? (
                            <span className="admin-badge badge-warning">{item.discount}</span>
                          ) : (
                            <span style={{ color: "#555" }}>—</span>
                          )}
                        </td>
                        <td>
                          <button className="admin-btn-sm admin-btn-edit" onClick={() => startEdit(item)}>
                            Edit
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TestPrices;
