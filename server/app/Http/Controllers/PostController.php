<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index () {
        $posts = Post::latest()->paginate(10);

        return response()->json(
            $posts
        );
    }

    public function show(Post $post) {
        return response()->json($post);
    }

    public function store(Request $request) {
        $attributes = $request->validate([
            'title' => 'required|min:4',
            'slug' => 'required|min:4',
            'body' => 'required',
            'image' => 'required|image'
        ]);

        $imagePath = $request->file('image')->store('/images');
        $attributes['image'] = $imagePath;

        $post = request()->user()->posts()->create($attributes);

        return response()->json([
            'ok' => true,
            'post' => $post
        ]);
    }

    public function search(Request $request) {
        $queryData = $request->input('q');

        $posts = Post::where('title', 'like', '%'.$queryData.'%')->paginate(10);
        return response()->json($posts);
    }

    public function update(Post $post, Request $request){
        $attributes = $request->validate([
            'title' => 'required',
            'slug' => 'required',
            'body' => 'required',
            'image' => 'required|image'
        ]);

        if(request()->user()->id != $post->user->id) {
            return response()->json([
                'msg' => 'no permission'
            ], 400);
        }

        $post->update($attributes);
        return response()->json([
            'ok' => true,
            'post' => $post
        ]);
    }

    public function destroy(Post $post){

        if(request()->user()->id != $post->user->id){
            return response()->json([
                'msg' => 'no permission'
            ], 400);
        }

        $status = $post->delete();

        if(!$status){
            return [
                'msg' => 'Post Could Not be deleted'
            ];
        }

        return response()->json([
            'msg' => 'Delete successfully'
        ]);
    }
}
