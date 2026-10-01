import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
  } from "react";
  import { auth, type Session } from "../services/auth";
  
  interface AuthContextValue {
    session: Session | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (firstName: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
  }
  
  const AuthContext = createContext<AuthContextValue | null>(null);
  
  export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      setSession(auth.getSession());
      setLoading(false);
    }, []);
  
    const login = useCallback(async (email: string, password: string) => {
      const s = await auth.login(email, password);
      setSession(s);
    }, []);
  
    const signup = useCallback(
      async (firstName: string, email: string, password: string) => {
        const s = await auth.signup(firstName, email, password);
        setSession(s);
      },
      []
    );
  
    const logout = useCallback(async () => {
      await auth.logout();
      setSession(null);
    }, []);
  
    const value = useMemo<AuthContextValue>(
      () => ({
        session,
        isAuthenticated: !!session,
        loading,
        login,
        signup,
        logout,
      }),
      [session, loading, login, signup, logout]
    );
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }
  
  export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
  }