<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;

class AttributeModel extends BaseModel
{
    protected $table = 'attribute';
    protected $fillable = [
        'id_attribute',
        'attribute_name',
        'attribute_type',
        'active',
        'create_time',
        'update_time',
        'sort',
    ];
    protected $primaryKey = 'id_attribute';
    public    $timestamps = false;

    const WITHATTRIBUTEVALUE           = 'App\AttributeValueModel';
    const WITHATTRIBUTEVALUELOCATEKEY  = 'id_attribute';
    const WITHATTRIBUTEVALUEFOREIGNKEY = 'id_attribute';

    public function attributeValues()
    {
        return $this->hasMany(self::WITHATTRIBUTEVALUE,self::WITHATTRIBUTEVALUEFOREIGNKEY,self::WITHATTRIBUTEVALUELOCATEKEY);
    }

    public function getTableColumns()
    {
        $columns = [
            'id_attribute'=>'属性ID',
            'attribute_name'=>'属性名',
            'attribute_type'=>'属性类型',
            'active'=>'激活',
            'create_time'=>'创建时间',
            'update_time'=>'更新时间',
            'sort'=>'排序值'
        ];

        $parent_columns = parent::getTableColumns();

        return array_merge($parent_columns,$columns);
    }
}
