'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { BrandLogo } from '@/components/ui/BrandLogo';

const demoCredentials = {
  email: 'admin@drivengroup.com',
  password: 'DrivenAdmin123!',
};

const showDemoCredentials = process.env.NODE_ENV !== 'production';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fillDemoCredentials = () => {
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);
    setError('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setError('Las credenciales no son válidas. Verifica los datos e intenta nuevamente.');
        return;
      }

      router.replace('/admin');
      router.refresh();
    } catch {
      setError('No fue posible iniciar sesión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell flex min-h-screen items-center justify-center bg-[#f8f8f8] px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-10 flex justify-center">
          <Link href="/" aria-label="Driven Group">
            <BrandLogo className="w-32" />
          </Link>
        </div>

        <div className="rounded-2xl border border-light-gray bg-white p-6 shadow-sm sm:p-8">
          <p className="editorial-label text-gray">PLATAFORMA PRIVADA</p>
          <h1 className="mt-3 text-3xl font-semibold text-black">Gestión de propiedades</h1>
          <p className="mt-3 text-sm leading-6 text-dark-gray">
            Inicia sesión para administrar el inventario, las galerías y las consultas recibidas.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-black">Correo electrónico</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-light-gray bg-white px-4 py-3 text-black placeholder-gray outline-none transition-colors focus:border-black disabled:opacity-50"
                placeholder="admin@drivengroup.com"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-black">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-light-gray bg-white px-4 py-3 text-black placeholder-gray outline-none transition-colors focus:border-black disabled:opacity-50"
                placeholder="••••••••••••"
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-black px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Ingresando…' : 'Ingresar al panel'}
            </button>
          </form>

          {showDemoCredentials && (
            <div className="mt-6 rounded-xl border border-light-gray bg-[#f8f8f8] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold tracking-[0.14em] text-gray">ACCESO DE PRUEBA</p>
                <button type="button" onClick={fillDemoCredentials} className="text-xs font-semibold text-black underline underline-offset-4">
                  Usar datos
                </button>
              </div>
              <p className="mt-3 text-xs text-dark-gray">Correo: <span className="font-mono text-black">{demoCredentials.email}</span></p>
              <p className="mt-1 text-xs text-dark-gray">Contraseña: <span className="font-mono text-black">{demoCredentials.password}</span></p>
            </div>
          )}
        </div>

        <p className="mt-8 text-center text-xs text-gray">© {new Date().getFullYear()} Driven Group. Todos los derechos reservados.</p>
      </div>
    </div>
  );
}
