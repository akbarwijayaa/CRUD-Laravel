<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TestModel extends Model
{
    protected $table = 'tests';
    protected $fillable = [
        'id',
        'format',
    ];
}
