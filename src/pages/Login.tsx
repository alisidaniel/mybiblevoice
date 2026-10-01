import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Icon } from "../components/ui/Icon";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";

  const [email, setEmail] = useState("sarah@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back."
      subtitle="Your verse for today is already waiting."
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
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
          autoComplete="current-password"
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
          {loading ? "Signing in…" : "Sign in"}
          {!loading && <Icon name="arrow-right" size={14} />}
        </button>

        <div className="mt-1 text-center text-[12.5px] text-zinc-500 dark:text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
          >
            Create one
          </Link>
        </div>

        <div className="mt-2 rounded-lg border border-dashed border-zinc-300 p-3 text-[11.5px] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <strong className="font-semibold">Demo mode:</strong> any email and a
          password of 4+ characters works. Defaults are pre-filled.
        </div>
      </form>
    </AuthShell>
  );
}

// ─── shared shell + field ────────────────────────────────────────────
// (also used by Signup.tsx)

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen bg-[#FAFAFA] text-zinc-900 lg:grid-cols-2 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Left: form */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-10 flex items-center gap-2.5">
            <div className="grid h-7 w-7 place-items-center rounded-[7px] bg-zinc-900 text-[13px] font-bold text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
              M
            </div>
            <span className="text-[15px] font-semibold tracking-tight">
              MyBibleVoice
            </span>
          </Link>
          <h1 className="mb-1.5 font-serif text-[34px] leading-tight tracking-tight">
            {title}
          </h1>
          <p className="mb-8 text-[13.5px] text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
          {children}
        </div>
      </div>

      {/* Right: quote panel */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#1A1A1D] via-[#0A0A0A] to-[#050505] lg:flex lg:items-center lg:justify-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
          }}
        />
        <div className="relative z-10 max-w-md px-12 text-center">
          <p className="font-serif text-[28px] leading-tight tracking-tight text-zinc-50">
            "Your word is a lamp to my feet and a light to my path."
          </p>
          <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/40">
            Psalm 119:105
          </p>
        </div>
      </div>
    </div>
  );
}

export function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11.5px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
      />
    </label>
  );
}