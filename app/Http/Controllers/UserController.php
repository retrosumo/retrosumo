<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function update(Request $request)
    {
        // Validate
        $data = $this->validate($request, [
            'name' => 'required|min:4',
            'avatar' => 'nullable|image',
        ]);

        // Get current
        $user = $request->user();

        // Update user
        $user->name = $request->name;

        if($request->hasFile('avatar')) {
            $avatar = $request->avatar;
            $location = "images/avatars/users/$user->id";

            $user->avatar_path = $avatar->store($location, "public", "public");
        }

        $user->save();

        // Return updated user
        return $user;
    }
}
