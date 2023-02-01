<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\Exceptions\JWTAuthException;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $user = User::where('email', $request['email'])->first();
        if ($user) {
            $response['status'] = 0;
            $response['message'] = 'email already existe';
            $response['code'] = 404;
        } else {
            $user = User::create([
                'name' => $request['name'],
                'email' => $request['email'],
                'password' => bcrypt($request['password']),
            ]);
            $response['status'] = 1;
            $response['message'] = 'register success';
            $response['code'] = 200;
        }
        return response()->json($response);
    }


    public function login(Request $request)
    {
        $credentiala = $request->only('email','password');

        try {
            if (!JWTAuth::attempt($credentiala)){

                $response['status'] = 0;
                $response['code'] = 401;
                $response['data'] = null;
                $response['message'] = 'email or password incorrect';
                return response()->json($response);
            };
        }catch(JWTException $e) {

            $response['code'] = 500;
            $response['data'] = null;
            $response['message'] = 'email or password incorrect';
            return response()->json($response);
        };
        $user = auth()->user();
        $data['token'] = auth()->claims([
            'email' => $user->email,
            'user_id' => $user->id
        ])->attempt($credentiala);
        $response['status'] = 1;
        $response['code'] = 200;
        $response['data'] = $data;
        $response['message'] = 'login successful';
        return response()->json($response);
    }
}
