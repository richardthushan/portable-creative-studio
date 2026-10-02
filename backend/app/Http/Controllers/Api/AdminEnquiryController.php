<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactEnquiry;
use Illuminate\Http\Request;

class AdminEnquiryController extends Controller
{
    public function index()
    {
        $enquiries = ContactEnquiry::with('service')
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $enquiries,
            'message' => null,
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => ['required', 'in:new,contacted,completed'],
        ]);

        $enquiry = ContactEnquiry::findOrFail($id);

        $enquiry->status = $request->status;
        $enquiry->save();

        return response()->json([
            'success' => true,
            'message' => 'Enquiry status updated successfully.',
            'data' => $enquiry,
        ]);
    }
}