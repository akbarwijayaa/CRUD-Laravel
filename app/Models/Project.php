<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'name',
        'description',
        'workspace_id',
        'owner_id',
        'status',
        'imageUrl',
    ];

    /**
     * The accessors to append to the model's array form.
     */
    protected $appends = ['image_url_full'];

    /**
     * Get the full image URL.
     * Convert relative path to full URL if needed.
     */
    public function getImageUrlFullAttribute()
    {
        $value = $this->attributes['imageUrl'] ?? null;
        
        if (empty($value)) {
            return null;
        }
        
        if (filter_var($value, FILTER_VALIDATE_URL)) {
            return $value;
        }
        
        return asset('storage/' . $value);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
