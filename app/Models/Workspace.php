<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Workspace extends Model
{


    protected $fillable = [
        'name',
        'imageUrl',
        'description',
        'owner_id',
        'invite_code',
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

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'workspace_user');
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Generate a unique invite code for this workspace
     */
    public function generateInviteCode(): string
    {
        do {
            $code = \Str::random(8);
        } while (self::where('invite_code', $code)->exists());
        
        $this->invite_code = $code;
        $this->save();
        
        return $code;
    }

    /**
     * Reset the invite code for this workspace
     */
    public function resetInviteCode(): string
    {
        return $this->generateInviteCode();
    }
}
