<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Workspace;

class EnsureWorkspaceExists
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->routeIs('workspaces.create') || $request->routeIs('workspaces.store')) {
            return $next($request);
        }
        
        if (Workspace::count() === 0) {
            return redirect()->route('workspaces.create');
        }
        
        return $next($request);
    }
}
