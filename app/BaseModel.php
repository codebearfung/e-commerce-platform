<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class BaseModel extends Model
{
    public $timestamps = false;

    /**
     * 新增数据
     * @param $data
     * @return $data
     */
    public function add($data)
    {
        if (!is_array($data))
            return false;
        $className = $this->getClassName();
        $data = $className::create($data);
        return $data ? $data : false;
    }

    /**
     * 更新数据
     */
    public function modify($id,$where)
    {
        $className = $this->getClassName();
        $data = $className::find($id)->update($where);
        return $data ? $data : false;
    }

    /**
     * 查询所有数据
     */
    public function readAll()
    {
        $className = $this->getClassName();
        $data = $className::all()->toArray();
        return $data ? $data : false;
    }

    /**
     * 查询单条数据
     * @param  integer $id   查询ID
     * @return array   $data 查询结果
     */
    public function readOne($id)
    {
        $className = $this->getClassName();

        $data = $className::find($id)->toArray();

        return $data ? $data : false;
    }

    public function readOneByCondition($condition)
    {
        $className = $this->getClassName();
        $data = $className::where($condition)->first();
        return $data ? $data : false;
    }

    /**
     * 删除数据
     * @param  integer|array $id
     * @return boolean       $result
     */
    public function del($id)
    {
        $className = $this->getClassName();
        $result = $className::destroy($id);
        return $result ? true : false;
    }

    /**
     * pagination
     */
    public function pagination($where='',$pageNums=2)
    {
        $className = $this->getClassName();
        if (!empty($where))
            $pagination = $className::where($where)->orderBy('sort','desc')->paginate($pageNums);
        else
            $pagination = $className::orderBy('sort','desc')->paginate($pageNums);

        return $pagination ? $pagination : false;
    }

    protected function getTableColumns()
    {
        $table_columns = DB::select("describe {$this->table}");
        $columns = [];
        foreach($table_columns as $table_column)
            $columns[$table_column->Field] = str_replace('_',' ',$table_column->Field);
        return $columns ? $columns : false;
    }

    protected function getClassName()
    {
        return get_class($this);
    }
}
