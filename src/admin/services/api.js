import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rfpqwypgpminypfukarq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmcHF3eXBncG1pbnlwZnVrYXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NzUwOTIsImV4cCI6MjA5MjQ1MTA5Mn0.7gncRErAR362iG1WZBUK1R0lQ8waaJbRgFkPWxJ6cNQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// We still check localStorage for basic session bridging in the demo/admin
const enforceSession = () => {
  if (!localStorage.getItem("admin-token")) {
    window.location.href = "/admin/login";
    throw new Error("Unauthorized");
  }
};

export const api = {
  auth: {
    login: async (credentials) => {
      // For this implementation, we query our own `admin_users` table directly.
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", credentials.email)
        .eq("password_hash", credentials.password)
        .single();
      
      if (error || !data) throw new Error("Invalid email or password");
      return { token: btoa(`admin:${Date.now()}`) };
    },
    getCredentials: async () => {
      enforceSession();
      const { data, error } = await supabase.from("admin_users").select("email").single();
      if (error) throw new Error(error.message);
      return data;
    },
    updateCredentials: async ({ currentPassword, email, newPassword }) => {
      enforceSession();
      // First verify old password
      const { data: current } = await supabase.from("admin_users").select("*").single();
      if (!current || current.password_hash !== currentPassword) {
        throw new Error("Current password incorrect.");
      }
      
      // Update
      const { error } = await supabase
        .from("admin_users")
        .update({ email, password_hash: newPassword })
        .eq("id", current.id);
        
      if (error) throw new Error(error.message);
      return true;
    },
  },
  dashboard: {
    getStats: async () => {
      enforceSession();
      
      const { count: doctors } = await supabase.from("doctors").select("*", { count: "exact", head: true });
      const { count: patients } = await supabase.from("patients").select("*", { count: "exact", head: true });
      
      // We need appointments to count today/pending
      const { data: apts } = await supabase.from("appointments").select("date, status");
      
      const today = new Date().toISOString().split("T")[0];
      const todayBookings = apts ? apts.filter(a => a.date === today).length : 0;
      const pendingReports = apts ? apts.filter(a => a.status === "Pending").length : 0;
      
      return {
        doctors: doctors || 0,
        patients: patients || 0,
        appointments: apts ? apts.length : 0,
        todayBookings,
        pendingReports
      };
    },
  },
  doctors: {
    getAll: async () => {
      enforceSession();
      const { data, error } = await supabase.from("doctors").select("*").order("id", { ascending: true });
      if (error) throw new Error(error.message);
      return data;
    },
    create: async (doc) => {
      enforceSession();
      const payload = { ...doc, status: "Active", joined: new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" }) };
      const { data, error } = await supabase.from("doctors").insert(payload).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    update: async (doc) => {
      enforceSession();
      const { data, error } = await supabase.from("doctors").update(doc).eq("id", doc.id).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    delete: async (id) => {
      enforceSession();
      const { error } = await supabase.from("doctors").delete().eq("id", id);
      if (error) throw new Error(error.message);
      return true;
    },
  },
  patients: {
    getAll: async () => {
      enforceSession();
      const { data, error } = await supabase.from("patients").select("*").order("id", { ascending: true });
      if (error) throw new Error(error.message);
      return data;
    },
    create: async (pat) => {
      enforceSession();
      const payload = { ...pat, status: "Pending", date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) };
      const { data, error } = await supabase.from("patients").insert(payload).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    update: async (pat) => {
      enforceSession();
      const { data, error } = await supabase.from("patients").update(pat).eq("id", pat.id).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    delete: async (id) => {
      enforceSession();
      const { error } = await supabase.from("patients").delete().eq("id", id);
      if (error) throw new Error(error.message);
      return true;
    },
  },
  appointments: {
    getAll: async () => {
      enforceSession();
      const { data, error } = await supabase.from("appointments").select("*").order("id", { ascending: true });
      if (error) throw new Error(error.message);
      return data;
    },
    create: async (apt) => {
      enforceSession();
      const payload = { ...apt, status: "Pending" };
      const { data, error } = await supabase.from("appointments").insert(payload).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    update: async (apt) => {
      enforceSession();
      const { data, error } = await supabase.from("appointments").update(apt).eq("id", apt.id).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    delete: async (id) => {
      enforceSession();
      const { error } = await supabase.from("appointments").delete().eq("id", id);
      if (error) throw new Error(error.message);
      return true;
    },
  },
};
