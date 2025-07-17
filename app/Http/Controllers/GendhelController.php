<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GendhelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // if (!auth()->check()) {
        //     return redirect()->route('login');
        // }
        $user = \App\Models\User::all();
        return Inertia::render('gendhel', [
            'users' => $user,
        ]);

        // $workspaces = \App\Models\Workspace::all();
        // if (!$workspaces) {
        //     return redirect()->route('gendhel')->with('error', 'Workspace not found');
        // }
        // return Inertia::render('gendhel', [
        //     'workspaces' => $workspaces,
        // ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
