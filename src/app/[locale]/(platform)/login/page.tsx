'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { BrandLogo } from '@/components/ui/BrandLogo';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setError('Credenciales inválidas');
        setLoading(false);
        return;
      }

      // Redirect to admin dashboard
      router.push('/admin');
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Link href="/" aria-label="Driven Group">
            <BrandLogo className="w-32" />
          </Link>
        </div>

        {/* Form */}
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-black mb-2">Admin Access</h1>
          <p className="text-dark-gray text-sm mb-8">Ingresa tus credenciales para acceder al panel administrativo</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 bg-white border border-light-gray rounded-lg text-black placeholder-gray focus:outline-none focus:border-black transition-colors disabled:opacity-50"
                placeholder="admin@drivengroup.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-black mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 bg-white border border-light-gray rounded-lg text-black placeholder-gray focus:outline-none focus:border-black transition-colors disabled:opacity-50"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-black/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-light-gray/50 rounded-lg border border-light-gray">
            <p className="text-xs font-semibold text-gray mb-2">DEMO CREDENTIALS</p>
            <p className="text-xs text-dark-gray">
              Email: <span className="font-mono">admin@drivengroup.com</span>
            </p>
            <p className="text-xs text-dark-gray">
              Password: <span className="font-mono">DrivenAdmin123!</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-light-gray text-center">
          <p className="text-xs text-gray">
            © {new Date().getFullYear()} Driven Group. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
