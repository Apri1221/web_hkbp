<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ResponseJSON;
use App\Jemaat;
use Illuminate\Http\Request;
use Revolution\Google\Sheets\Facades\Sheets;

// php artisan vendor:publish --provider="PulkitJalan\Google\GoogleServiceProvider" --tag="config"
// Copied File [\vendor\pulkitjalan\google-apiclient\config\google.php] To [\config\google.php]

class JemaatController extends Controller
{
    use ResponseJSON;

    private function compareData($fullHeader, $specifiedHeader)
    {
        $properties = [];
        foreach ($specifiedHeader as $value) {
            if (!in_array($value, $fullHeader)) {
                array_push($properties, $value); // notify that properties didnt available
            }
        }
        return $properties;
    }

    private function getSpreadsheet($spreadsheetID, $sheetID) {
        return Sheets::spreadsheet($spreadsheetID)
            ->sheet($sheetID)
            ->get();
    }

    private function unusedData($user, $header, $posts) {
        if ($user != 'admin') {
            $specified_head = [ // spesific our header
                'Kode Keluarga',
                'Marga',
                'Nama',
                'Jenis Kelamin',
                'Hubungan',
                'Tanggal Lahir'
            ];
        } else $specified_head = $header;

        // error handling
        $status = implode(", ", $this->compareData($header, $specified_head));
        if ($status) {
            return response()->json("Ada kesalahan pada parameter {$status}", 404);
        }

        foreach ($posts as $value) {
            $value['Nama'] = $value['Marga'] . ', ' . $value['Nama'];
            foreach ($header as $item) {
                if (!in_array($item, $specified_head) || $item == 'Marga') {
                    unset($value[$item]); // remove header that we dont want
                }
            }
        }
        return $posts;
    }

    // API endpoint accessing listdata
    public function getList()
    {
        $jemaat = Jemaat::orderBy('distrik', 'ASC')->get();
        return response()->json($jemaat, 200);
    }

    public function getJemaat(Request $request, $sektor, $user, $dataCategory = 'default')
    {
        // define query selector
        $query = $request->all();

        // safe detect if query exist, default of relation is Kepala Keluarga
        $relation = isset($query['relation']) ? $query['relation'] : 'Kepala Keluarga';
        $familyID = isset($query['familyID']) ? $query['familyID'] : null;

        $jemaat = Jemaat::where(['sektor' => $sektor])->first();

        $spreadsheetID = $jemaat->url_sheet;
        $sheetID = $jemaat->id_sheet;
        $sheets = $this->getSpreadsheet($spreadsheetID, $sheetID);

        $header = $sheets->pull(0); // index 0 is key, bunch of header

        // must be choice, if need relation / need family
        switch ($dataCategory) {
            case $dataCategory == 'Hubungan':
                $posts = Sheets::collection($header, $sheets)->where('Hubungan', $relation)->all();
                break;
            case $dataCategory == 'Keluarga':
                $posts = Sheets::collection($header, $sheets)->where('Kode Keluarga', $familyID)->all();
                break;
            default:
                $posts = Sheets::collection($header, $sheets)->all();
        }

        $posts = array_values($posts);
        $posts = $this->unusedData($user, $header, $posts);

        return $this->sendingData($posts);
    }

    // method for CRUD data
    public function updateList(Request $request, $id)
    {
        $jemaat = Jemaat::findOrFail($id);
        $input = $request->all();

        // this is we make cause url_sheet and id_sheet is guarded in Model
        $jemaat->url_sheet = $request->url_sheet;
        $jemaat->id_sheet = $request->id_sheet;

        // save that input into that object
        $jemaat->fill($input)->save();
        // update timestamp data
        $jemaat->touch();

        return back();
    }

    public function storeList(Request $request)
    {
        $jemaat = new Jemaat();
        $input = $request->all();
        $jemaat->url_sheet = $request->url_sheet;
        $jemaat->id_sheet = $request->id_sheet;
        $jemaat->fill($input)->save();
        $jemaat->touch();

        // if ($jemaat) {
            // return redirect()->route('home');
        return back();
    }


    public function destroyList($id)
    {
        $jemaat = Jemaat::findOrFail($id);
        $jemaat->delete();
        if ($jemaat) {
            return back();
        } else {
            // should print error view
            return back();
        }
    }
}
