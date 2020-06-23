<?php

use Illuminate\Database\Seeder;

use App\Tag;
class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $mydate = '23-01-2016';
        $y = 1;
        $tags = array("Senang", 
        "Sedih", 
        "Lucu",
        "Bingung", 
        "Lupa",
        "Malas",
         "Banget");

        for($i = 1; $i < 7; $i++){
            Tag::create([
                'tag_name' => "" .$tags[$i],
            ]);
        }
    }
}
