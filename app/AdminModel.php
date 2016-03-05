<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdminModel extends Model
{
    protected $table      = 'admin';
    public    $timestamps = false;

    public static function hasExists($array)
    {
    	if (!is_array($array))
    	{
    		return false;
    	}

    	$hasExists = self::where($array)->first();

    	if (null !== $hasExists)
    		return true;
    	else
    		return null;

    }
}
