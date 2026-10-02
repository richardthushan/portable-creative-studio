<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'name' => 'AI Photo Editing',
                'slug' => 'ai-photo-editing',
                'short_description' => 'Fast, consistent photo enhancement using AI.',
                'description' => 'AI-powered photo editing with consistent results and modern creative workflows.',
                'icon' => 'wand-sparkles',
                'service_type' => 'ai',
                'is_ai_available' => true,
                'is_worker_available' => false,
                'is_active' => true,
                'display_order' => 1,
            ],
            [
                'name' => 'Professional Photo Editing',
                'slug' => 'professional-photo-editing',
                'short_description' => 'Professional retouching, colour correction and detailed editing.',
                'description' => 'Human-led professional photo editing for portraits, events and creative projects.',
                'icon' => 'camera',
                'service_type' => 'studio',
                'is_ai_available' => false,
                'is_worker_available' => true,
                'is_active' => true,
                'display_order' => 2,
            ],
            [
                'name' => 'Graphic Design',
                'slug' => 'graphic-design',
                'short_description' => 'Creative designs for digital and print use.',
                'description' => 'Professional graphic design for posters, flyers, business cards, social media and more.',
                'icon' => 'pen-tool',
                'service_type' => 'studio',
                'is_ai_available' => false,
                'is_worker_available' => true,
                'is_active' => true,
                'display_order' => 3,
            ],
            [
                'name' => 'Invitation Design',
                'slug' => 'invitation-design',
                'short_description' => 'Custom invitations for weddings, birthdays and special events.',
                'description' => 'Premium invitation designs created based on your event style and requirements.',
                'icon' => 'sparkles',
                'service_type' => 'studio',
                'is_ai_available' => false,
                'is_worker_available' => true,
                'is_active' => true,
                'display_order' => 4,
            ],
            [
                'name' => 'Album Design',
                'slug' => 'album-design',
                'short_description' => 'Professional album layouts designed page by page.',
                'description' => 'Creative and professional album designs for weddings, birthdays and other events.',
                'icon' => 'layers',
                'service_type' => 'studio',
                'is_ai_available' => false,
                'is_worker_available' => true,
                'is_active' => true,
                'display_order' => 5,
            ],
            [
                'name' => 'Branding & Social Media Design',
                'slug' => 'branding-social-media-design',
                'short_description' => 'Brand identity and social media creative support.',
                'description' => 'Logo, branding and social media designs created to build a consistent visual identity.',
                'icon' => 'palette',
                'service_type' => 'studio',
                'is_ai_available' => false,
                'is_worker_available' => true,
                'is_active' => true,
                'display_order' => 6,
            ],
            [
                'name' => 'Printing Support',
                'slug' => 'printing-support',
                'short_description' => 'Print-ready designs and printing support.',
                'description' => 'Printing support for albums, photo frames, stickers, labels, business cards and more.',
                'icon' => 'printer',
                'service_type' => 'studio',
                'is_ai_available' => false,
                'is_worker_available' => true,
                'is_active' => true,
                'display_order' => 7,
            ],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(
                ['slug' => $service['slug']],
                $service
            );
        }
    }
}