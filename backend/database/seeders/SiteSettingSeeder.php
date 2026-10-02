<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SiteSetting;

class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'business_name' => 'Portable Creative Studio',
            'tagline' => 'Limitless Creativity. Anytime Anywhere.',
            'phone' => '0755866297',
            'whatsapp_number' => '94755866297',
            'email' => 'hello@portablecreative.studio',
            'address' => 'Matale, Sri Lanka',
            'facebook_url' => '',
            'instagram_url' => '',
            'tiktok_url' => '',
            'youtube_url' => '',
            'ai_trial_text' => 'First month free',
            'ai_monthly_price' => '2000',
            'currency' => 'LKR',
            'album_page_price' => '250',
        ];

        foreach ($settings as $key => $value) {
            SiteSetting::updateOrCreate(
                ['key' => $key],
                [
                    'value' => $value,
                    'type' => 'string',
                ]
            );
        }
    }
}