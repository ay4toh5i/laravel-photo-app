<?php

namespace Tests\Feature;

use App\Photo;
use App\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PhotoSubmitApiTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
    }

    /**
     * @test
     */
    public function should_be_able_to_upload_file()
    {
        // S3ではなくテスト用のストレージを使用する
        // -> storage/framework/testing
        Storage::fake('s3');

        $response = $this->actingAs($this->user)
            ->json('POST', route('photo.create'),[
                // ダミーファイルを作成して送信
                'photo' => UploadedFile::fake()->image('photo.jpg'),
            ]);

        // レスポンスが201(CREATED)であること
        $response->assertStatus(201);


        $photo = Photo::first();

        // 写真のIDが12桁のランダムな文字列であること
        $this->assertRegExp('/^[0-9a-zA-Z-_]{12}$/', $photo->id);

        // DBに挿入されたファイル名のファイルがストレージに保存されていること
        Storage::cloud()->assertExists($photo->filename);
    }

    /**
     * @test
     */
    public function should_not_store_file_when_db_error()
    {
        // DBエラーを起こす
        Schema::drop('photos');

        Storage::fake('s3');

        $response = $this->actingAs($this->user)
            ->json('POST', route('photo.create'), [
                'photo' => UploadedFile::fake()->image('photo.jpg'),
            ]);

        // レスポンスが500(INTERNAL SERVER ERROR)であること
        $response->assertStatus(500);

        // ストレージにファイルが保存されていないこと
        $this->assertEquals(0, count(Storage::cloud()->files()));
    }

    /**
     * @test
     */
    public function should_not_insert_to_db_when_file_store_error()
    {
        // ストレージをモックして保存時にエラーを起こさせる
        Storage::shouldReceive('cloud')
            ->once()
            ->andReturnNull();

        $response = $this->actingAs($this->user)
            ->json('POST', route('photo.create'), [
                'photo' => UploadedFile::fake()->image('photo.jpg'),
            ]);

        $response->assertStatus(500);

        // データベースに何も挿入されていないこと
        $this->assertEmpty(Photo::all());
    }
}
