<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request, Workspace $workspace)
    {
        $tasks = Task::where('workspace_id', $workspace->id)
            ->with('project', 'assignee')
            ->when($request->query('search'), function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->when($request->query('status'), function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($request->query('projectId'), function ($query, $projectId) {
                $query->where('project_id', $projectId);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $allWorkspaces = Workspace::all();
        $projects = $workspace->projects()->with('owner')->latest()->get();
        
        return Inertia::render('tasks/index', [
            'tasks' => $tasks,
            'filters' => $request->only(['search', 'status', 'projectId']),
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Workspace $workspace)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'projectId' => 'nullable|exists:projects,id',
            'assigneeId' => 'nullable|exists:users,id',
            'status' => 'required|in:backlog,todo,in_progress,in_review,done',
            'description' => 'nullable|string',
            'dueDate' => 'nullable|date',
        ]);

        $task = $workspace->tasks()->create([
            'name' => $validatedData['name'],
            'project_id' => $validatedData['projectId'] ?? null,
            'assignee_id' => $validatedData['assigneeId'] ?? null,
            'status' => $validatedData['status'],
            'description' => $validatedData['description'] ?? null,
            'due_date' => $validatedData['dueDate'] ?? null,
        ]);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'task' => $task->load('project', 'assignee'),
                'message' => 'Task created successfully!'
            ]);
        }

        return redirect()->route('workspaces.show', $workspace)->with('success', 'Task created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Workspace $workspace, Task $task)
    {
        return redirect()->route('workspaces.show', $workspace);
    }

    /**
     * Bulk update tasks for drag and drop operations
     */
    public function bulkUpdate(Request $request)
    {
        $request->validate([
            'tasks' => 'required|array',
            'tasks.*.status' => 'required|string|in:backlog,todo,in_progress,in_review,done',
            'tasks.*.position' => 'required|integer',
        ]);
        
        foreach ($request->input('tasks', []) as $index => $task) {
            if (!isset($task['$id']) || empty($task['$id'])) {
                return response()->json([
                    'success' => false,
                    'message' => "Task at index {$index} is missing required \$id field"
                ], 422);
            }
            
            if (!is_numeric($task['$id'])) {
                return response()->json([
                    'success' => false,
                    'message' => "Task at index {$index} has invalid \$id field: {$task['$id']}"
                ], 422);
            }
        }
        
        $tasks = $request->input('tasks', []);

        try {
            foreach ($tasks as $taskData) {
                if (!isset($taskData['$id'])) {
                    continue;
                }
                
                $taskId = intval($taskData['$id']);
                
                $task = Task::find($taskId);
                if ($task) {
                    $task->update([
                        'status' => $taskData['status'],
                        'position' => $taskData['position'],
                    ]);
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Tasks updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update tasks: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
    * Show the task in API format.
    */
    public function apiShow($taskId)
    {
        $task = Task::with('project', 'assignee')
            ->findOrFail($taskId);
        
        return response()->json($task);
    }

    /**
    * Update the task in API format.
    */
    public function apiUpdate(Request $request, $taskId)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'projectId' => 'nullable|exists:projects,id',
            'assigneeId' => 'nullable|exists:users,id',
            'status' => 'required|in:backlog,todo,in_progress,in_review,done',
            'description' => 'nullable|string',
            'dueDate' => 'nullable|date',
        ]);
        
        $task = Task::findOrFail($taskId);
        $task->update([
            'name' => $validatedData['name'],
            'project_id' => $validatedData['projectId'] ?? null,
            'assignee_id' => $validatedData['assigneeId'] ?? null,
            'status' => $validatedData['status'],
            'description' => $validatedData['description'] ?? null,
            'due_date' => $validatedData['dueDate'] ?? null,
        ]);
        
        return response()->json([
            'success' => true,
            'task' => $task->load('project', 'assignee'),
            'message' => 'Task updated successfully!'
        ]);
    }

    /**
    * Delete the task in API format.
    */
    public function apiDestroy($taskId)
    {
        $task = Task::findOrFail($taskId);
        $task->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Task deleted successfully!'
        ]);
    }
}
