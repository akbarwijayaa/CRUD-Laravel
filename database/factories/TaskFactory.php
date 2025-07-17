<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\Project;
use App\Models\Workspace;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph,
            'project_id' => Project::factory(),
            'workspace_id' => Workspace::factory(),
            'assignee_id' => User::factory(),
            'status' => $this->faker->randomElement(Task::getStatuses()),
            'due_date' => $this->faker->optional()->dateTimeBetween('now', '+1 month'),
            'priority' => $this->faker->randomElement(['low', 'medium', 'high']),
            'position' => $this->faker->numberBetween(1, 100),
        ];
    }
}
