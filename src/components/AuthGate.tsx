import { FormEvent, ReactNode, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

type AuthGateProps = {
  children: ReactNode;
};

export function AuthGate({ children }: AuthGateProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Enter an email and password.");
      return;
    }

    if (isSignUpMode) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      setMessage("Account created. Check your email if confirmation is required, then sign in.");
      setIsSignUpMode(false);
      setPassword("");
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  if (isLoading) {
    return (
      <main className="auth-gate-shell">
        <section className="auth-gate-card">
          <p className="auth-gate-description">Loading Lane preview...</p>
        </section>
      </main>
    );
  }

  if (session) {
    return (
      <>
        <button className="auth-gate-signout-button" onClick={handleSignOut}>
          Sign out
        </button>
        {children}
      </>
    );
  }

  return (
    <main className="auth-gate-shell">
      <section className="auth-gate-card" aria-labelledby="auth-gate-title">
        <div className="auth-gate-kicker">Lane Preview</div>

        <h1 id="auth-gate-title" className="auth-gate-title">
          {isSignUpMode ? "Create preview account" : "Sign in to Lane preview"}
        </h1>

        <p className="auth-gate-description">
          This public Lane prototype is protected with temporary preview login.
        </p>

        <form className="auth-gate-form" onSubmit={handleSubmit}>
          <label className="auth-gate-label" htmlFor="auth-email">
            Email
          </label>
          <input
            id="auth-email"
            className="auth-gate-input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
          />

          <label className="auth-gate-label" htmlFor="auth-password">
            Password
          </label>
          <input
            id="auth-password"
            className="auth-gate-input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={isSignUpMode ? "new-password" : "current-password"}
            placeholder="Enter password"
          />

          {error ? <p className="auth-gate-error">{error}</p> : null}
          {message ? <p className="auth-gate-message">{message}</p> : null}

          <button className="auth-gate-button" type="submit">
            {isSignUpMode ? "Create account" : "Sign in"}
          </button>
        </form>

        <button
          className="auth-gate-secondary-button"
          type="button"
          onClick={() => {
            setIsSignUpMode((current) => !current);
            setError("");
            setMessage("");
          }}
        >
          {isSignUpMode ? "Already have access? Sign in" : "Need preview access? Create account"}
        </button>

        <p className="auth-gate-note">
          Preview auth only. This is not Lane&apos;s final account system.
        </p>
      </section>
    </main>
  );
}