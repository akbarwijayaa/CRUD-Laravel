<?php

namespace Database\Factories;

use App\Models\Workspace;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class WorkspaceFactory extends Factory
{
    protected $model = Workspace::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->company . ' Workspace',
            'description' => $this->faker->sentence,
            'imageUrl' => $this->faker->imageUrl(200, 200, 'business'),
            'owner_id' => User::factory(),
        ];
    }
}
