import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthShell, Field } from "./Login";
import { Icon } from "../components/ui/Icon";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signup(firstName, email, password);
      navigate("/onboarding", { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Begin your daily walk."
      subtitle="A verse, a reflection, and a story — shaped for you."
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Field
          label="First name"
          value={firstName}
          onChange={setFirstName}
          autoComplete="given-name"
        />
        <Field
          label="Email"
          value={email}
          onChange={setEmail}
          type="email"
          autoComplete="email"
        />
        <Field
          label="Password"
          value={password}
          onChange={setPassword}
          type="password"
          autoComplete="new-password"
        />

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12.5px] text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-[13.5px] font-medium text-zinc-50 transition-opacity hover:opacity-90 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
        >
          {loading ? "Creating account…" : "Create account"}
          {!loading && <Icon name="arrow-right" size={14} />}
        </button>

        <div className="mt-1 text-center text-[12.5px] text-zinc-500 dark:text-zinc-400">
          Already have one?{" "}
          <Link
            to="/login"
            className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
          >
            Sign in
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}