<?php

namespace App;

use DB;
use Illuminate\Database\Eloquent\Model;

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
        $data = $className::create($data)->toArray();
        return $data ? $data : false;
    }

    /**
     * 更新数据
     */
    public function upd($id,$where,$withRelation='')
    {
        $builder = $this->newQuery();
        if ($withRelation!='')
            $builder->with($withRelation);
        if (!empty($id))
            $builder->find($id);

        $data = $builder->update($where);

        return $data ? $data : false;
    }

    /**
     * 查询所有数据
     */
    public function readAll($where = [],$withRelation = '')
    {
        $builder = $this->newQuery();
        if ($withRelation != '')
            $builder->with($withRelation);
        if (!empty($where))
            $builder->where($where);
        $data = $builder->get()->toArray();

        return is_null($data) ? NULL : $data;
    }

    /**
     * 根据id查询单条数据
     * @param  integer       $id           查询ID
     * @param  string        $withRelation 关联表
     * @return array|boolean $data         查询结果
     */
    public function readOneById($id,$withRelation = '')
    {
        $builder = $this->newQuery();

        if ($withRelation != '')
            $builder->with($withRelation);

        if (!empty($id))
            $builder->find($id);

        $data = $builder->first()->toArray();

        return $data ? $data : false;
    }

    /**
     * 根据条件查询单条数据
     * @param  array         $where        查询条件
     * @param  string        $withRelation 关联表
     * @return array|boolean               查询结果
     */
    public function readOneByCondition($where=[],$withRelation = '')
    {
        $builder = $this->newQuery();

        if (!empty($where))
            $builder->where($where);

        if ($withRelation != '')
            $builder->with($withRelation);

        $data = $builder->first();

        return is_null($data) ? NULL : $data->toArray();
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
    public function pagination($params=[],$pageNums=2)
    {
        $builder = $this->newQuery();

        if (!empty($params['with']))
            $builder = $this->with($params['with']);

        if (!empty($params['where']))
            $builder = $builder->where($params['where']);

        if (!empty($params['orderBy']))
        {
            $builder = $builder->orderBy($params['orderBy']['column'], $params['orderBy']['order']);
        }

        $pagination = $builder->paginate($pageNums);

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
