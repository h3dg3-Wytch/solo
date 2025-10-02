'use client'
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";



export default function Reset() {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const supabase = createClient();
  // add way to protect user here

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password updated successfully.");
      setNewPassword("");
    }

    setLoading(false);
  };

  return (
<div>
   <form
      onSubmit={handleChangePassword}
      className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-md border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        New Password
      </label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none mb-4 text-gray-800"
        required
        minLength={6}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-center text-gray-700">{message}</p>
      )}
    </form>
    </div>
  );
}
