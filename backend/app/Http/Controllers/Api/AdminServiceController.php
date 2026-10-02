<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminServiceController extends Controller
{
    public function index()
    {
        $services = Service::with('prices')
            ->orderBy('display_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $services,
            'message' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:services,slug'],
            'short_description' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:100'],
            'service_type' => ['required', 'in:ai,studio'],
            'is_ai_available' => ['boolean'],
            'is_worker_available' => ['boolean'],
            'is_active' => ['boolean'],
            'display_order' => ['nullable', 'integer'],
        ]);

        $service = Service::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Service created successfully.',
            'data' => $service,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('services', 'slug')->ignore($service->id),
            ],
            'short_description' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:100'],
            'service_type' => ['required', 'in:ai,studio'],
            'is_ai_available' => ['boolean'],
            'is_worker_available' => ['boolean'],
            'is_active' => ['boolean'],
            'display_order' => ['nullable', 'integer'],
        ]);

        $service->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Service updated successfully.',
            'data' => $service,
        ]);
    }

    public function toggleStatus($id)
    {
        $service = Service::findOrFail($id);

        $service->is_active = !$service->is_active;
        $service->save();

        return response()->json([
            'success' => true,
            'message' => 'Service status updated successfully.',
            'data' => $service,
        ]);
    }
}