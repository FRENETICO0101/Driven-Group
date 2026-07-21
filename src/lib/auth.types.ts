import type { User } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name?: string;
    role: 'ADMIN' | 'AGENT' | 'VIEWER';
  }

  interface Session {
    user: User & {
      id: string;
      role: 'ADMIN' | 'AGENT' | 'VIEWER';
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'ADMIN' | 'AGENT' | 'VIEWER';
  }
}
