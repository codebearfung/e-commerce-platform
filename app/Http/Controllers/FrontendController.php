<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class FrontendController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected static $template = 'default.';

    public function render($blade_name,$data=[])
    {
        $template = self::$template.$blade_name;

        if (empty($data))
            return view($template);
        else
            return view($template,$data);
    }
}
