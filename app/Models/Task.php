<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    const STATUS_BACKLOG = 'backlog';
    const STATUS_TODO = 'todo';
    const STATUS_IN_PROGRESS = 'in_progress';
    const STATUS_IN_REVIEW = 'in_review';
    const STATUS_DONE = 'done';

    protected $fillable = [
        'name',
        'description',
        'project_id',
        'workspace_id',
        'assignee_id',
        'status',
        'due_date',
        'priority',
        'position',
    ];

    protected $casts = [
        'due_date' => 'datetime',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assignee_id');
    }

    public static function getStatuses()
    {
        return [
            self::STATUS_BACKLOG,
            self::STATUS_TODO,
            self::STATUS_IN_PROGRESS,
            self::STATUS_IN_REVIEW,
            self::STATUS_DONE,
        ];
    }
}
