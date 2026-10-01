import type { User } from "../types";
import { currentUser as seedUser } from "../data/user";
import { storage } from "./storage";

export interface Session {
  token: string;
  user: User;
  expiresAt: number; // ms epoch
}

const TOKEN_KEY = "session";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function fakeToken(userId: string) {
  return `demo.${btoa(userId)}.${Date.now()}`;
}

function makeSession(user: User): Session {
  return {
    token: fakeToken(user.id),
    user,
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  };
}

export const auth = {
  async login(email: string, password: string): Promise<Session> {
    await delay(280);
    if (!email.trim() || !password.trim()) {
      throw new Error("Email and password are required.");
    }
    if (password.length < 4) {
      throw new Error("Password must be at least 4 characters (demo).");
    }
    // Any email works; the seed user gets seeded data
    const user: User = { ...seedUser, email };
    const session = makeSession(user);
    storage.set(TOKEN_KEY, session);
    return session;
  },

  async signup(
    firstName: string,
    email: string,
    password: string
  ): Promise<Session> {
    await delay(320);
    if (!firstName.trim()) throw new Error("First name is required.");
    if (!email.includes("@")) throw new Error("Enter a valid email.");
    if (password.length < 6)
      throw new Error("Password must be at least 6 characters.");
    const user: User = {
      ...seedUser,
      id: `u_${Date.now()}`,
      firstName,
      lastName: "",
      email,
      avatarInitials: firstName[0]?.toUpperCase() ?? "U",
      streak: 0,
    };
    const session = makeSession(user);
    storage.set(TOKEN_KEY, session);
    return session;
  },

  async logout(): Promise<void> {
    await delay(80);
    storage.remove(TOKEN_KEY);
  },

  getSession(): Session | null {
    const s = storage.get<Session | null>(TOKEN_KEY, null);
    if (!s) return null;
    if (s.expiresAt < Date.now()) {
      storage.remove(TOKEN_KEY);
      return null;
    }
    return s;
  },
};
