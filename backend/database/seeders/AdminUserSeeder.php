<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $password = env('ADMIN_PASSWORD');

        if (!$password) {
            throw new \RuntimeException(
                'ADMIN_PASSWORD is not set in .env'
            );
        }

        User::updateOrCreate(
            [
                'email' => 'graphicsportable@gmail.com',
            ],
            [
                'name' => 'Admin',
                'password' => Hash::make($password),
                'role' => 'admin',
            ]
        );
    }
}