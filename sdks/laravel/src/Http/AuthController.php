<?php

namespace TrustPort\Identity\Http;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use TrustPort\Identity\Client;
use TrustPort\Identity\TrustPortException;

/**
 * Web login for Laravel apps: GET /auth/trustport/login -> TrustPort -> GET /auth/trustport/callback.
 * Map the claims to your user by setting config('trustport.user_resolver') to a callable (claims array => Authenticatable).
 */
class AuthController extends Controller
{
    public function login(Request $request, Client $client)
    {
        $auth = $client->createAuthorizationRequest();
        $request->session()->put('trustport.pending', $auth);
        return redirect()->away($auth['url']);
    }

    public function callback(Request $request, Client $client)
    {
        $pending = $request->session()->pull('trustport.pending');
        if (!$pending) {
            abort(400, 'No sign-in in progress');
        }
        try {
            $result = $client->handleCallback($request->query(), $pending);
        } catch (TrustPortException $e) {
            abort(400, 'Sign-in failed: ' . $e->errorCode);
        }
        $request->session()->put('trustport.id_token', $result['tokens']['id_token'] ?? null);
        $request->session()->put('trustport.claims', $result['claims']);
        $resolver = config('trustport.user_resolver');
        if ($resolver) {
            Auth::login(call_user_func($resolver, $result['claims'], $result['tokens']));
            $request->session()->regenerate();
        }
        return redirect()->intended(config('trustport.home', '/'));
    }

    public function logout(Request $request, Client $client)
    {
        $idToken = $request->session()->get('trustport.id_token');
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        $url = $client->logoutUrl($idToken, url('/'));
        return $url ? redirect()->away($url) : redirect('/');
    }
}
