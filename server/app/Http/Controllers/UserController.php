<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request) {
        $attributes = $request->validate([
            'name' => 'required|min:3|max:14',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed'
        ]);

        $user = User::create($attributes);

        $token = $user->createToken('jwt')->plainTextToken;
        
        return response()->json([
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function login(Request $request){
        $attributes = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $attributes['email'])->first();

        if(!Auth::attempt($attributes, true)){
            return response([
                'msg' => 'Invalid Credentials'
            ], 401);
        }
        
        $token = $user->createToken('jwt')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function logout() {
        auth()->user()->tokens()->delete();
        return response()->json([
            'message' => 'Logged Out Successfully'
        ], 200);
    }

    public function me(Request $request) {
        return $request->user();
    }
}
