<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PortfolioItem;
use Illuminate\Http\JsonResponse;

class PortfolioController extends Controller
{
    public function index(): JsonResponse
    {
        $items = PortfolioItem::with('category')
            ->where('is_published', true)
            ->orderBy('display_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $items,
            'message' => null,
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $item = PortfolioItem::with('category')
            ->where('slug', $slug)
            ->where('is_published', true)
            ->first();

        if (!$item) {
            return response()->json([
                'success' => false,
                'data' => null,
                'message' => 'Portfolio item not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $item,
            'message' => null,
        ]);
    }
}