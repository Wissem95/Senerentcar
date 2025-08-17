<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param string ...$roles
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (!auth()->check()) {
            return response()->json([
                'message' => 'Non authentifié',
                'error' => 'unauthenticated'
            ], 401);
        }

        $user = auth()->user();
        
        // Check if user has any of the required roles
        if (empty($roles) || $user->hasAnyRole($roles)) {
            return $next($request);
        }

        return response()->json([
            'message' => 'Accès refusé. Rôle requis: ' . implode(' ou ', $roles),
            'error' => 'insufficient_role'
        ], 403);
    }
}
