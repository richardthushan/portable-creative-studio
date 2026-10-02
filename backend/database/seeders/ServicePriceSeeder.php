<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;
use App\Models\ServicePrice;

class ServicePriceSeeder extends Seeder
{
    public function run(): void
    {
        $aiService = Service::where('slug', 'ai-photo-editing')->first();

        if ($aiService) {
            ServicePrice::updateOrCreate(
                [
                    'service_id' => $aiService->id,
                    'pricing_type' => 'trial'
                ],
                [
                    'amount' => 0,
                    'currency' => 'LKR',
                    'billing_interval' => 'month',
                    'label' => 'First month free',
                    'is_confirmed' => true,
                    'is_active' => true,
                ]
            );

            ServicePrice::updateOrCreate(
                [
                    'service_id' => $aiService->id,
                    'pricing_type' => 'subscription'
                ],
                [
                    'amount' => 2000,
                    'currency' => 'LKR',
                    'billing_interval' => 'month',
                    'label' => 'LKR 2,000/month after trial',
                    'is_confirmed' => true,
                    'is_active' => true,
                ]
            );
        }

        $albumService = Service::where('slug', 'album-design')->first();

        if ($albumService) {
            ServicePrice::updateOrCreate(
                [
                    'service_id' => $albumService->id,
                    'pricing_type' => 'per_page'
                ],
                [
                    'amount' => 250,
                    'currency' => 'LKR',
                    'billing_interval' => null,
                    'label' => 'LKR 250/page',
                    'is_confirmed' => true,
                    'is_active' => true,
                ]
            );
        }
    }
}