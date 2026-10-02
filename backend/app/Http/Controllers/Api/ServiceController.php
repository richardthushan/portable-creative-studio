<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;

class ServiceController extends Controller
{
    public function index(): JsonResponse
    {
        $services = Service::with([
            'prices' => function ($query) {
                $query->where('is_active', true);
            }
        ])
        ->where('is_active', true)
        ->orderBy('display_order')
        ->get();

        return response()->json([
            'success' => true,
            'data' => $services,
            'message' => null,
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $service = Service::with([
            'prices' => function ($query) {
                $query->where('is_active', true);
            }
        ])
        ->where('slug', $slug)
        ->where('is_active', true)
        ->first();

        if (!$service) {
            return response()->json([
                'success' => false,
                'data' => null,
                'message' => 'Service not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $service,
            'message' => null,
        ]);
    }
}