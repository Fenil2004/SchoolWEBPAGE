import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { ShieldAlert, Loader2 } from 'lucide-react';

export default function GoogleLoginButton({ onSuccess, onError }) {
  const router = useRouter();
  const buttonRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '1081373752538-sampleclientid.apps.googleusercontent.com';

  useEffect(() => {
    // Load Google Identity Services script dynamically
    const scriptId = 'google-gsi-client-script';
    let script = document.getElementById(scriptId);

    const initializeGoogleButton = () => {
      if (window.google?.accounts?.id && buttonRef.current) {
        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCredentialResponse,
            auto_select: false,
          });

          window.google.accounts.id.renderButton(buttonRef.current, {
            theme: 'outline',
            size: 'large',
            type: 'standard',
            shape: 'pill',
            text: 'signin_with',
            logo_alignment: 'left',
            width: 320,
          });
        } catch (err) {
          console.error('Google ID initialization error:', err);
        }
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleButton;
      document.body.appendChild(script);
    } else {
      initializeGoogleButton();
    }
  }, [clientId]);

  const handleCredentialResponse = async (response) => {
    if (!response.credential) {
      setErrorMsg('Google login failed. No credential returned.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          credential: response.credential,
        }),
      });

      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (onSuccess) {
          onSuccess(data);
        } else {
          await router.push('/admin/dashboard');
        }
      } else {
        const message = data.message || 'Google Login failed. Email may not be whitelisted.';
        setErrorMsg(message);
        if (onError) onError(message);
      }
    } catch (err) {
      console.error('Google Auth Handler Error:', err);
      const message = 'An error occurred during Google authentication. Please try again.';
      setErrorMsg(message);
      if (onError) onError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-3 my-2">
      {errorMsg && (
        <div className="w-full bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center gap-2 py-2 text-xs font-bold text-[#0082AD]">
          <Loader2 className="w-4 h-4 animate-spin text-[#0082AD]" />
          Verifying Whitelisted Google Account...
        </div>
      ) : (
        <div ref={buttonRef} className="w-full flex justify-center min-h-[44px]" />
      )}
    </div>
  );
}
