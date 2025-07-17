<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GendhelController;
use App\Http\Controllers\WorkspaceController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ProjectController;
use App\Http\Middleware\EnsureWorkspaceExists;


Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('workspaces');
    }
    return Inertia::render('home');
})->name('home');


Route::middleware(['auth'])->controller(GendhelController::class)->group(function () {
    Route::get('gendhel', 'index');

    Route::get('gendhel/{gendhelId}', function ($gendhelId) {
        return Inertia::render('gendhel', [
            'gendhelId' => $gendhelId,
        ]);
    })->name('gendhel');
});


Route::middleware(['auth', 'verified'])->controller(WorkspaceController::class)->group(function () {
    Route::get('workspaces', 'index')->name('workspaces')->middleware(EnsureWorkspaceExists::class);
    Route::get('workspaces/create', 'create')->name('workspaces.create');
    Route::post('workspaces', 'store')->name('workspaces.store');
    Route::get('workspaces/{workspace}', 'show')->name('workspaces.show')->middleware(EnsureWorkspaceExists::class);
    Route::get('/workspaces/{workspace}/settings', 'settings')->name('workspaces.settings')->middleware(EnsureWorkspaceExists::class);
    Route::post('/workspaces/{workspace}/generate-invite-code', 'generateInviteCode')->name('workspaces.generate-invite-code');
    Route::post('/workspaces/{workspace}/reset-invite-code', 'resetInviteCode')->name('workspaces.reset-invite-code');
    Route::get('/workspaces/{workspace}/join/{inviteCode}', 'showJoinPage')->name('workspaces.join');
    Route::post('/workspaces/{workspace}/join', 'joinWorkspace')->name('workspaces.join.post');
});


Route::middleware(['auth', 'verified'])->controller(TaskController::class)->group(function () {
    Route::get('/workspaces/{workspace}/tasks', 'index')->name('tasks.index')->middleware(EnsureWorkspaceExists::class);
    Route::post('/workspaces/{workspace}/tasks', 'store')->name('tasks.store')->middleware(EnsureWorkspaceExists::class);
    Route::get('/workspaces/{workspace}/tasks/{task}', 'show')->name('tasks.show')->middleware(EnsureWorkspaceExists::class);
});


Route::middleware(['auth', 'verified'])->controller(TaskController::class)->group(function () {
    Route::put('/api/tasks/bulk-update', 'bulkUpdate')->name('tasks.bulk-update');
    Route::get('/api/tasks/{task}', 'apiShow')->name('tasks.api.show');
    Route::put('/api/tasks/{task}', 'apiUpdate')->name('tasks.api.update');
    Route::delete('/api/tasks/{task}', 'apiDestroy')->name('tasks.api.destroy');
});


Route::middleware(['auth', 'verified'])->controller(ProjectController::class)->group(function () {
    Route::get('/workspaces/{workspace}/projects', 'index')->name('projects.index')->middleware(EnsureWorkspaceExists::class);
    Route::post('/workspaces/{workspace}/projects', 'store')->name('projects.store')->middleware(EnsureWorkspaceExists::class);
    Route::get('/workspaces/{workspace}/projects/{project}', 'show')->name('projects.show')->middleware(EnsureWorkspaceExists::class);
});


Route::middleware(['auth', 'verified'])->controller(WorkspaceController::class)->group(function () {
    Route::get('/workspaces/{workspace}/members', 'members')->name('members.index')->middleware(EnsureWorkspaceExists::class);
});

Route::middleware(['auth', 'verified'])->controller(WorkspaceController::class)->group(function () {
    Route::put('/api/workspaces/{workspace}', 'update')->name('workspaces.api.update');
    Route::delete('/api/workspaces/{workspace}', 'destroy')->name('workspaces.api.destroy');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';