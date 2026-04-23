import React, { useState, useEffect } from "react";
import { supabase } from "../services/api";

function TestPrices() {
  const [prices, setPrices] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ test_name: "", current_price: "", old_price: "", discount: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId !== null) {
        const { data, error } = await supabase
          .from("test_prices")
          .update({ ...form, updated_at: new Date().toISOString() })
          .eq("id", editId)
          .select()
          .single();
        if (error) throw error;
        setPrices(prices.map((p) => (p.id === editId ? data : p)));
        setEditId(null);
      } else {
        const { data, error } = await supabase
          .from("test_prices")
          .insert({ ...form, updated_at: new Date().toISOString() })
          .select()
          .single();
        if (error) throw error;
        setPrices([...prices, data]);
      }
      setForm({ test_name: "", current_price: "", old_price: "", discount: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Failed to save test price", err);
      alert(err.message || "Failed to save test price");
    }
  };

  const handleEdit = (item) => {
    setForm({
      test_name: item.test_name,
      current_price: item.current_price,
      old_price: item.old_price || "",
      discount: item.discount || "",
    });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this test price?")) {
      try {
        const { error } = await supabase.from("test_prices").delete().eq("id", id);
        if (error) throw error;
        setPrices(prices.filter((p) => p.id !== id));
      } catch (err) {
        console.error("Failed to delete", err);
        alert("Failed to delete test price");
      }
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">💰 Test Prices</h1>
      <p className="admin-page-subtitle">
        Set test prices here. These prices will automatically appear on the public website test cards.
      </p>

      {/* Toolbar */}
      <div className="admin-toolbar">
        <input
          type="text"
          className="admin-search"
          placeholder="🔍 Search by test name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setForm({ test_name: "", current_price: "", old_price: "", discount: "" });
          }}
        >
          {showForm ? "✕ Cancel" : "+ Add Price"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-grid">
            <div className="admin-field">
              <label>Test Name *</label>
              <input
                required
                value={form.test_name}
                onChange={(e) => setForm({ ...form, test_name: e.target.value })}
                placeholder="e.g. Complete Blood Count"
              />
            </div>
            <div className="admin-field">
              <label>Current Price (₹) *</label>
              <input
                required
                value={form.current_price}
                onChange={(e) => setForm({ ...form, current_price: e.target.value })}
                placeholder="e.g. 499"
              />
            </div>
            <div className="admin-field">
              <label>Old Price (₹)</label>
              <input
                value={form.old_price}
                onChange={(e) => setForm({ ...form, old_price: e.target.value })}
                placeholder="e.g. 999"
              />
            </div>
            <div className="admin-field">
              <label>Discount Text</label>
              <input
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: e.target.value })}
                placeholder="e.g. UPTO 50% OFF"
              />
            </div>
          </div>
          <button className="admin-btn admin-btn-primary" type="submit">
            {editId !== null ? "Update Price" : "Save Price"}
          </button>
        </form>
      )}

      {/* Table */}
      {loading ? (
        <div className="admin-loading">Loading test prices…</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Test Name</th>
                <th>Current Price</th>
                <th>Old Price</th>
                <th>Discount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
                    No test prices found. Click "+ Add Price" to set your first test price.
                  </td>
                </tr>
              ) : (
                filtered.map((item, i) => (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td style={{ fontWeight: 600 }}>{item.test_name}</td>
                    <td style={{ color: "#1a73e8", fontWeight: 700 }}>₹{item.current_price}</td>
                    <td style={{ textDecoration: "line-through", color: "#999" }}>
                      {item.old_price ? `₹${item.old_price}` : "—"}
                    </td>
                    <td>
                      {item.discount ? (
                        <span className="admin-badge badge-warning">{item.discount}</span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>
                      <button className="admin-btn-sm admin-btn-edit" onClick={() => handleEdit(item)}>
                        Edit
                      </button>
                      <button className="admin-btn-sm admin-btn-delete" onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </td>
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
