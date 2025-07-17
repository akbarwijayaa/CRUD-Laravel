<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Workspace $workspace)
    {
        $projects = $workspace->projects()->with('owner')->latest()->get();
        
        return response()->json([
            'data' => [
                'documents' => $projects,
                'total' => $projects->count()
            ]
        ]);
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
    public function store(Request $request, Workspace $workspace)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'imageUrl' => 'nullable|image|mimes:jpg,jpeg,png,svg|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('imageUrl')) {
            $imagePath = $request->file('imageUrl')->store('project_images', 'public');
        }

        $project = $workspace->projects()->create([
            'name' => $validatedData['name'],
            'imageUrl' => $imagePath,
            'owner_id' => Auth::id(),
        ]);

        return redirect()->route('workspaces.show', $workspace)->with('success', 'Project created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Workspace $workspace, Project $project)
    {
        $allWorkspaces = Workspace::all();
        $projects = $workspace->projects()->with('owner')->latest()->get();
        
        $tasks = collect();
        try {
            $tasks = $project->tasks()->with(['assignee', 'project'])->latest()->get();
        } catch (\Exception $e) {
        }
        
        return \Inertia\Inertia::render('projects/show', [
            'project' => $project,
            'workspace' => $workspace,
            'workspaces' => [
                'all' => $allWorkspaces,
                'current' => $workspace,
            ],
            'projects' => [
                'documents' => $projects,
                'total' => $projects->count(),
            ],
            'tasks' => [
                'documents' => $tasks,
                'total' => $tasks->count(),
            ],
        ]);
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
