<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PermissionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param string ...$permissions
     */
    public function handle(Request $request, Closure $next, ...$permissions): Response
    {
        if (!auth()->check()) {
            return response()->json([
                'message' => 'Non authentifié',
                'error' => 'unauthenticated'
            ], 401);
        }

        $user = auth()->user();
        
        // Check if user has any of the required permissions
        if (empty($permissions) || $user->hasAnyPermission($permissions)) {
            return $next($request);
        }

        return response()->json([
            'message' => 'Accès refusé. Permission requise: ' . implode(' ou ', $permissions),
            'error' => 'insufficient_permission'
        ], 403);
    }
}
