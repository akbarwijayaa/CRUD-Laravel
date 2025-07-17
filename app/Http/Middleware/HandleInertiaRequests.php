<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;


class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        // Ambil data user, jika ada
        $user = $request->user();

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ] : null,
            ],
            // ✅ Data workspace dipindahkan ke level atas, tidak di dalam 'auth'
            'workspaces' => [
                // ✅ Query dibuat lebih ringan, hanya ambil id dan nama untuk dropdown
                'all' => $user ? $user->workspaces()->select('workspaces.id', 'workspaces.name')->get() : [],
                'current' => $user ? $user->currentWorkspace : null,
                ],

            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error'   => fn () => $request->session()->get('error'),
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],

        ]);
    }
}