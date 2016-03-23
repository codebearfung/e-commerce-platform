<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Console\IlluminateCaster;
use Illuminate\Routing\Controller;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class BackendController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    const SEPERATOR = ';';

    protected $labels_del = [];
    protected $labels_add = [];

    //查询条件数组
    protected $condition  = [];

    public function __construct()
    {
        session_start();
    }

    /**
     * 获取表单标签
     * @param Illuminate\Database\Eloquent\Model $model
     * @param array $labelsAdd
     * @param array $labelsDel
     * @return array|bool
     */
    protected function setFormLabels($model,$labels_del=[],$labels_add=[],$add_after = true)
    {
        if (!is_object($model))
            return false;

        $columns = $model->getTableColumns();

        if (!empty($labels_add) && is_array($labels_add))
        {
            if ($add_after == false)
                $columns = array_merge($labels_add,$columns);
            else
                $columns = array_merge($columns,$labels_add);


        }

        if (!empty($labels_del) && is_array($labels_del))
        {
            foreach($columns as $key => $column)
            {
                if (in_array($key, $labels_del))
                    unset($columns[$key]);
            }
        }

        return $columns;
    }
}
