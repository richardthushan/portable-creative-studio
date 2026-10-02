<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PortfolioItem;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\PortfolioCategory;
use Illuminate\Support\Str;

class AdminPortfolioController extends Controller
{
    public function index()
    {
        $items = PortfolioItem::with('category')
            ->orderBy('display_order')
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $items,
            'message' => null,
        ]);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'portfolio_category_id' => [
            'required',
            'exists:portfolio_categories,id'
        ],
        'title' => ['required', 'string', 'max:255'],
        'slug' => [
            'required',
            'string',
            'max:255',
            'unique:portfolio_items,slug'
        ],
        'description' => ['nullable', 'string'],

        'image' => [
            'nullable',
            'image',
            'mimes:jpg,jpeg,png,webp',
            'max:10240'
        ],

        'is_featured' => ['nullable', 'boolean'],
        'is_published' => ['nullable', 'boolean'],
        'display_order' => ['nullable', 'integer'],
    ]);

    if ($request->hasFile('image')) {

        $folder = public_path('uploads/portfolio');

        if (!file_exists($folder)) {
            mkdir($folder, 0777, true);
        }

        $image = $request->file('image');

        $fileName =
            time() .
            '_' .
            Str::random(10) .
            '.' .
            $image->getClientOriginalExtension();

        $image->move($folder, $fileName);

        $validated['image_path'] =
            'uploads/portfolio/' . $fileName;

        $validated['thumbnail_path'] =
            'uploads/portfolio/' . $fileName;
    }

    unset($validated['image']);

    $item = PortfolioItem::create($validated);

    return response()->json([
        'success' => true,
        'message' => 'Portfolio item created successfully.',
        'data' => $item->load('category'),
    ], 201);
}

    public function update(Request $request, $id)
    {
        $item = PortfolioItem::findOrFail($id);

        $validated = $request->validate([
            'portfolio_category_id' => [
                'required',
                'exists:portfolio_categories,id'
            ],
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('portfolio_items', 'slug')->ignore($item->id)
            ],
            'description' => ['nullable', 'string'],
            'image_path' => ['nullable', 'string'],
            'thumbnail_path' => ['nullable', 'string'],
            'is_featured' => ['boolean'],
            'is_published' => ['boolean'],
            'display_order' => ['nullable', 'integer'],
        ]);

        $item->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Portfolio item updated successfully.',
            'data' => $item->load('category'),
        ]);
    }

    public function togglePublish($id)
    {
        $item = PortfolioItem::findOrFail($id);

        $item->is_published = !$item->is_published;
        $item->save();

        return response()->json([
            'success' => true,
            'message' => 'Portfolio publish status updated successfully.',
            'data' => $item->load('category'),
        ]);
    }

    public function categories()
    {
        $categories = PortfolioCategory::where('is_active', true)
            ->orderBy('display_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
            'message' => null,
        ]);
    }
}