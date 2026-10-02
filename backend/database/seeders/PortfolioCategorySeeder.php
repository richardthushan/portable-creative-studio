<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PortfolioCategory;

class PortfolioCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Photography',
                'slug' => 'photography',
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Photo Editing',
                'slug' => 'photo-editing',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Graphic Design',
                'slug' => 'graphic-design',
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Albums',
                'slug' => 'albums',
                'display_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Branding',
                'slug' => 'branding',
                'display_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            PortfolioCategory::updateOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}