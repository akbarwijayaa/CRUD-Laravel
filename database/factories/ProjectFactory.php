<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\Workspace;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->catchPhrase,
            'description' => $this->faker->paragraph,
            'workspace_id' => Workspace::factory(),
            'owner_id' => User::factory(),
            'status' => $this->faker->randomElement(['active', 'completed', 'on_hold']),
            'imageUrl' => $this->faker->imageUrl(200, 200, 'business'),
        ];
    }
}
