<?php

namespace Tests\Feature;

use Tests\TestCase;
use Laravel\Passport\Passport;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PostsTest extends TestCase
{
    use RefreshDatabase;

    private const SAMPLE_POST = [
        'text' => 'This is a sample post.',
    ];

    /**
     * @test
     */
    public function anyoneCanViewAListOfPosts()
    {
        factory('App\Post', 5)->create();

        $response = $this->json('GET', '/api/posts');

        $response->assertStatus(200)
            ->assertJsonCount(5, 'data');
    }

    /**
     * @test
     */
    public function loggedInUserCanCreateANewPost()
    {
        $user = factory('App\User')->create();

        Passport::actingAs($user);

        $response = $this->json('POST', '/api/posts', self::SAMPLE_POST);

        $response->assertStatus(201)
            ->assertJsonFragment(['name' => $user->name]);

        $this->assertDatabaseHas('posts', self::SAMPLE_POST);
    }

    /**
     * @test
     */
    public function userCanOnlyUpdateTheirOwnPosts()
    {
        // Test that I can update my own post
        $user = factory('App\User')->create();

        Passport::actingAs($user);

        $ownPost = factory('App\Post')->create([
            'user_id' => $user->id,
        ]);

        $response = $this->json('PUT', "/api/posts/{$ownPost->id}", [
            'text' => 'Updated Text',
        ]);

        $response->assertStatus(200);

        // Check that it returns the user name
        $response->assertJsonFragment([
            'name' => $ownPost->user->name,
        ]);

        // Test that I can't update other users' posts
        $otherUserPost = factory('App\Post')->create();

        $response = $this->json('PUT', "/api/posts/{$otherUserPost->id}", [
            'text' => 'Updated Text',
        ]);

        $response->assertStatus(403);
    }

    /**
     * @test
     */
    public function userCanOnlyDeleteTheirOwnPosts()
    {
        // Test that I can delete my own post
        $user = factory('App\User')->create();

        Passport::actingAs($user);

        $ownPost = factory('App\Post')->create([
            'user_id' => $user->id,
        ]);

        $response = $this->json('DELETE', "/api/posts/{$ownPost->id}");

        $response->assertStatus(204);

        // Test that I can't delete other users' posts
        $otherUserPost = factory('App\Post')->create();

        $response = $this->json('DELETE', "/api/posts/{$otherUserPost->id}");

        $response->assertStatus(403);
    }

    /**
     * @test
     */
    public function guestUserCannotCreateANewPost()
    {
        $response = $this->json('POST', '/api/posts', self::SAMPLE_POST);

        $response->assertStatus(401);
    }

    /**
     * @test
     */
    public function postsListReturnsUserRelationship()
    {
        $post = factory('App\Post')->create();

        $response = $this->json('GET', '/api/posts');

        $response->assertJsonFragment([
            'name' => $post->user->name,
        ]);
    }
}
