<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestWorkspaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Workspace::create([
            'name' => 'Default Workspace',
            'imageUrl' => 'https://example.com/default-workspace-image.png',
        ]);
    }
}
