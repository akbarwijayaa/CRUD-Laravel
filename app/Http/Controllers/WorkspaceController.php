<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWorkspaceRequest;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Workspace;
use Illuminate\Http\Request;

class WorkspaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $workspaces = Workspace::all();
        
        $firstWorkspace = $workspaces->first();
        return redirect()->route('workspaces.show', $firstWorkspace);

        if ($workspaces->isEmpty() or $workspaces === null or !$firstWorkspace) {
            return redirect()->route('workspaces.create');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('workspaces/create');
    }

    /**
     * Store a newly created resource in storage.
     */
public function store(StoreWorkspaceRequest $request)
    {
        $validatedData = $request->validated();

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('workspace_images', 'public');
        }

        $workspace = Workspace::create([
            'name' => $validatedData['name'],
            'imageUrl' => $imagePath,
        ]);

        return redirect()->route('workspaces.show', $workspace)->with('success', 'Workspace created successfully!');
    }
    /**
     * Display the specified resource.
     */
    public function show(Workspace $workspace)
    {
        $allWorkspaces = Workspace::all();
        
        $tasks = collect();
        $projects = collect();
        $members = collect();
        
        try {
            $tasks = $workspace->tasks()->with(['project', 'assignee'])->latest()->get();
        } catch (\Exception $e) {
        }
        
        try {
            $projects = $workspace->projects()->with('owner')->latest()->get();
        } catch (\Exception $e) {
        }
        
        try {
            $members = $workspace->members()->get();
        } catch (\Exception $e) {
        }

        $analytics = [
            'total_tasks' => $tasks->count(),
            'total_projects' => $projects->count(),
            'total_members' => $members->count(),
        ];

        return Inertia::render('workspaces', [
            'workspace' => $workspace,
            'workspaces' => [
                'all' => $allWorkspaces,
                'current' => $workspace,
            ],
            'analytics' => $analytics,
            'tasks' => [
                'documents' => $tasks,
                'total' => $tasks->count(),
            ],
            'projects' => [
                'documents' => $projects,
                'total' => $projects->count(),
            ],
            'members' => [
                'documents' => $members,
                'total' => $members->count(),
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
    public function update(Request $request, Workspace $workspace)
    {
        if ($request->wantsJson()) {
            $request->validate([
                'name' => 'required|string|max:255',
                'imageUrl' => 'nullable|file|image|max:1024',
            ]);
            
            try {
                $updateData = [
                    'name' => $request->input('name'),
                ];
                
                if ($request->hasFile('imageUrl')) {
                    if ($workspace->imageUrl) {
                        $oldImagePath = storage_path('app/public/' . $workspace->imageUrl);
                        if (file_exists($oldImagePath)) {
                            unlink($oldImagePath);
                        }
                    }
                    
                    $imagePath = $request->file('imageUrl')->store('workspace_images', 'public');
                    $updateData['imageUrl'] = $imagePath;
                }
                
                $workspace->update($updateData);
                
                $workspace->refresh();
                
                return response()->json([
                    'success' => true,
                    'message' => 'Workspace updated successfully',
                    'data' => $workspace->load('owner', 'members')->toArray()
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update workspace: ' . $e->getMessage()
                ], 500);
            }
        }
        
        return redirect()->back()->with('error', 'Not implemented for form submissions');
    }

    /**
     * Show workspace settings.
     */
    public function settings(Workspace $workspace)
    {
        $allWorkspaces = Workspace::all();
        
        $tasks = collect();
        $projects = collect();
        $members = collect();
        
        try {
            $tasks = $workspace->tasks()->with(['project', 'assignee'])->latest()->get();
        } catch (\Exception $e) {
        }
        
        try {
            $projects = $workspace->projects()->with('owner')->latest()->get();
        } catch (\Exception $e) {
        }
        
        try {
            $members = $workspace->members()->get();
        } catch (\Exception $e) {
        }

        return Inertia::render('workspaces/settings', [
            'workspace' => $workspace,
            'workspaces' => [
                'all' => $allWorkspaces,
                'current' => $workspace,
            ],
            'projects' => [
                'documents' => $projects,
                'total' => $projects->count(),
            ],
        ]);
    }
    
    /**
     * Show workspace members.
     */
    public function members(Workspace $workspace)
    {
        $members = collect();
        
        try {
            $members = $workspace->members()->get();
        } catch (\Exception $e) {
        }

        if (request()->wantsJson()) {
            return response()->json([
                'data' => [
                    'documents' => $members,
                    'total' => $members->count()
                ]
            ]);
        }

        $allWorkspaces = Workspace::all();
        
    
        $tasks = collect();
        $projects = collect();
        
        try {
            $tasks = $workspace->tasks()->with(['project', 'assignee'])->latest()->get();
        } catch (\Exception $e) {

        }
        
        try {
            $projects = $workspace->projects()->with('owner')->latest()->get();
        } catch (\Exception $e) {

        }

        return Inertia::render('workspaces/members', [
            'workspace' => $workspace,
            'workspaces' => [
                'all' => $allWorkspaces,
                'current' => $workspace,
            ],
            'members' => [
                'documents' => $members,
                'total' => $members->count(),
            ],
            'projects' => [
                'documents' => $projects,
                'total' => $projects->count(),
            ],
        ]);
    }

    /**
     * Generate or reset invite code for workspace
     */
    public function generateInviteCode(Workspace $workspace)
    {
        $inviteCode = $workspace->generateInviteCode();
        
        if (request()->wantsJson()) {
            return response()->json([
                'success' => true,
                'invite_code' => $inviteCode,
                'invite_link' => url("/workspaces/{$workspace->id}/join/{$inviteCode}")
            ]);
        }
        
        return redirect()->back()->with('success', 'Invite code generated successfully!');
    }
    
    /**
     * Reset invite code for workspace
     */
    public function resetInviteCode(Workspace $workspace)
    {
        $inviteCode = $workspace->resetInviteCode();
        
        if (request()->wantsJson()) {
            return response()->json([
                'success' => true,
                'invite_code' => $inviteCode,
                'invite_link' => url("/workspaces/{$workspace->id}/join/{$inviteCode}")
            ]);
        }
        
        return redirect()->back()->with('success', 'Invite code reset successfully!');
    }
    
    /**
     * Show join workspace page
     */
    public function showJoinPage(Workspace $workspace, string $inviteCode)
    {
        if ($workspace->invite_code !== $inviteCode) {
            abort(404, 'Invalid invite code');
        }
        
        if ($workspace->members()->where('user_id', auth()->id())->exists()) {
            return redirect()->route('workspaces.show', $workspace)
                ->with('info', 'You are already a member of this workspace.');
        }
        
        return Inertia::render('workspaces/join', [
            'workspace' => $workspace,
            'inviteCode' => $inviteCode
        ]);
    }
    
    /**
     * Join workspace via invite code
     */
    public function joinWorkspace(Workspace $workspace, Request $request)
    {
        $request->validate([
            'inviteCode' => 'required|string'
        ]);
        
        $inviteCode = $request->input('inviteCode');
        
        if ($workspace->invite_code !== $inviteCode) {
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid invite code'
                ], 400);
            }
            return redirect()->back()->withErrors(['inviteCode' => 'Invalid invite code']);
        }
        
        if ($workspace->members()->where('user_id', auth()->id())->exists()) {
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'You are already a member of this workspace'
                ], 400);
            }
            return redirect()->route('workspaces.show', $workspace)
                ->with('info', 'You are already a member of this workspace.');
        }
        
        $workspace->members()->attach(auth()->id());
        
        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Successfully joined workspace',
                'workspace' => $workspace
            ]);
        }
        
        return redirect()->route('workspaces.show', $workspace)
            ->with('success', 'Successfully joined workspace!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workspace $workspace)
    {
        if (!auth()->check()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }
        
        if (request()->wantsJson()) {
            try {
    
                if ($workspace->imageUrl) {
                    $imagePath = storage_path('app/public/' . $workspace->imageUrl);
                    if (file_exists($imagePath)) {
                        unlink($imagePath);
                    }
                }
                
    
                $workspace->delete();
                
    
                $remainingWorkspaces = Workspace::count();
                
                return response()->json([
                    'success' => true,
                    'message' => 'Workspace deleted successfully',
                    'redirect' => $remainingWorkspaces === 0 ? '/workspaces/create' : '/'
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to delete workspace: ' . $e->getMessage()
                ], 500);
            }
        }
        
        try {

            if ($workspace->imageUrl) {
                $imagePath = storage_path('app/public/' . $workspace->imageUrl);
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }
            

            $workspace->delete();
            
            return redirect()->route('workspaces')->with('success', 'Workspace deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete workspace: ' . $e->getMessage());
        }
    }
}
