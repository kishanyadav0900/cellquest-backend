import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

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
      // role may be null for accounts created before RBAC was added → treat as admin
      const role = data.role || "admin";
      return { token: btoa(`admin:${data.email}:${Date.now()}`), role };
    },
    getCredentials: async () => {
      enforceSession();
      const { data, error } = await supabase.from("admin_users").select("email, role").single();
      if (error) throw new Error(error.message);
      return data;
    },
    getAllUsers: async () => {
      enforceSession();
      const { data, error } = await supabase.from("admin_users").select("id, email, role").order("id", { ascending: true });
      if (error) throw new Error(error.message);
      return data;
    },
    createUser: async (user) => {
      enforceSession();
      const { data, error } = await supabase.from("admin_users").insert(user).select().single();
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
  // Legacy — kept for backward compat
  tests: {
    getAll: async () => {
      const { data, error } = await supabase.from("test_prices").select("*").order("id", { ascending: true });
      if (error) throw new Error(error.message);
      return data;
    },
    create: async (test) => {
      enforceSession();
      const { data, error } = await supabase.from("test_prices").insert(test).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    update: async (test) => {
      enforceSession();
      const { data, error } = await supabase.from("test_prices").update(test).eq("id", test.id).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    delete: async (id) => {
      enforceSession();
      const { error } = await supabase.from("test_prices").delete().eq("id", id);
      if (error) throw new Error(error.message);
      return true;
    },
  },

  // ═══════════════ NEW: Lab Catalog (Tests → Profiles → Packages) ═══════════════

  labTests: {
    getAll: async () => {
      const { data, error } = await supabase.from("tests").select("*").order("name", { ascending: true });
      if (error) throw new Error(error.message);
      return data;
    },
    create: async (test) => {
      enforceSession();
      const { data, error } = await supabase.from("tests").insert(test).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    update: async (test) => {
      enforceSession();
      const { id, ...rest } = test;
      const { data, error } = await supabase.from("tests").update(rest).eq("id", id).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    delete: async (id) => {
      enforceSession();
      const { error } = await supabase.from("tests").delete().eq("id", id);
      if (error) throw new Error(error.message);
      return true;
    },
  },

  profiles: {
    getAll: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*, profile_tests(test_id, tests(*))")
        .order("name", { ascending: true });
      if (error) throw new Error(error.message);
      return data;
    },
    create: async (profile) => {
      enforceSession();
      const { testIds, ...rest } = profile;
      const { data, error } = await supabase.from("profiles").insert(rest).select().single();
      if (error) throw new Error(error.message);
      if (testIds && testIds.length > 0) {
        const links = testIds.map(tid => ({ profile_id: data.id, test_id: tid }));
        await supabase.from("profile_tests").insert(links);
      }
      return data;
    },
    update: async (profile) => {
      enforceSession();
      const { id, testIds, ...rest } = profile;
      const { data, error } = await supabase.from("profiles").update(rest).eq("id", id).select().single();
      if (error) throw new Error(error.message);
      if (testIds !== undefined) {
        await supabase.from("profile_tests").delete().eq("profile_id", id);
        if (testIds.length > 0) {
          const links = testIds.map(tid => ({ profile_id: id, test_id: tid }));
          await supabase.from("profile_tests").insert(links);
        }
      }
      return data;
    },
    delete: async (id) => {
      enforceSession();
      const { error } = await supabase.from("profiles").delete().eq("id", id);
      if (error) throw new Error(error.message);
      return true;
    },
  },

  packages: {
    getAll: async () => {
      const { data, error } = await supabase
        .from("packages")
        .select("*, package_profiles(profile_id, profiles(*, profile_tests(test_id, tests(*))))")
        .order("name", { ascending: true });
      if (error) throw new Error(error.message);
      return data;
    },
    create: async (pkg) => {
      enforceSession();
      const { profileIds, ...rest } = pkg;
      const { data, error } = await supabase.from("packages").insert(rest).select().single();
      if (error) throw new Error(error.message);
      if (profileIds && profileIds.length > 0) {
        const links = profileIds.map(pid => ({ package_id: data.id, profile_id: pid }));
        await supabase.from("package_profiles").insert(links);
      }
      return data;
    },
    update: async (pkg) => {
      enforceSession();
      const { id, profileIds, ...rest } = pkg;
      const { data, error } = await supabase.from("packages").update(rest).eq("id", id).select().single();
      if (error) throw new Error(error.message);
      if (profileIds !== undefined) {
        await supabase.from("package_profiles").delete().eq("package_id", id);
        if (profileIds.length > 0) {
          const links = profileIds.map(pid => ({ package_id: id, profile_id: pid }));
          await supabase.from("package_profiles").insert(links);
        }
      }
      return data;
    },
    delete: async (id) => {
      enforceSession();
      const { error } = await supabase.from("packages").delete().eq("id", id);
      if (error) throw new Error(error.message);
      return true;
    },
  },
};
