<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Arr;

use Revolution\Google\Sheets\Facades\Sheets;

// php artisan vendor:publish --provider="PulkitJalan\Google\GoogleServiceProvider" --tag="config"
// Copied File [\vendor\pulkitjalan\google-apiclient\config\google.php] To [\config\google.php]

class DataController extends Controller
{
    function console_log($data)
    {
        echo '<script>';
        echo 'console.log(' . json_encode($data) . ')';
        echo '</script>';
    }

    private function compareData($fullHeader, $specifiedHeader){
        $properties = [];
        foreach ($specifiedHeader as $key => $value) {
            if(!in_array($value, $fullHeader)){
                array_push($properties, $value); // notify that properties didnt avaible
            }
        }
        return $properties;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $spreadsheetID = config('sheets.post_spreadsheet_id');
        $sheetID = config('sheets.post_sheet_id');
        $sheets = Sheets::spreadsheet($spreadsheetID)
                        ->sheet($sheetID)
                        ->get();

        $header = $sheets->pull(0); // index 0 is key, this all of header
        $posts = Sheets::collection($header, $sheets)->all();
        $posts = array_values($posts);

        $specified_head = [ // spesific header
            'Nama',
            'Tempat Lahir',
            'Tanggal Lahir',
            'Jenis Kelamin',
            'Status'
        ];

        $status = implode(", ",$this->compareData($header, $specified_head));
        if($status){
            return response()->json("Ada kesalahan pada parameter {$status}", 404);
        }

        foreach ($posts as $key => $value) {
            foreach ($header as $item){
                if(!in_array($item, $specified_head)){
                    unset($value[$item]); // remove properties that we dont want
                }
            }
        }

        if ($request->is('api/*')) {
            return response()->json($posts, 200);
        } else {
            // kegunaan compact adalah mempassing beberapa variabel sekaligus
            return view('welcome')->with(compact('posts', 'header'));
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
