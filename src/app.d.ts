// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Session, User } from "better-auth";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: User | null;
      session: Session | null;
    }
    // interface PageData {}
    // interface PageState {}
    interface Platform {
      env: {
        DB: D1Database;
        BETTER_AUTH_SECRET?: string;
        BETTER_AUTH_URL?: string;
      };
    }
  }
}

export {};
