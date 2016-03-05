<?php
namespace App\Http\Controllers\Backend;

use App\AttributeModel;
use App\AttributeTypeModel;
use App\AttributeValueModel;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\BackendController;

class AttributeController extends BackendController
{
    /**
     * 属性列表
     */
    public function index(Request $request)
    {
        $attribute_model = new AttributeModel();
        $attribute_type_model = new AttributeTypeModel();

        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $request = $request->all();
            $where = [
                'attribute_name'=>$request['keywords'],
            ];
            $pagination = $attribute_model->pagination($where);
        }
        else
            $pagination = $attribute_model->pagination();

        $data = [
            'attribute_list'=>$pagination,
            'attribute_types'=>$attribute_type_model->readAll(),
            'attribute_columns'=>$this->setFormLabels($attribute_model,['id_attribute','deleted_at']),
        ];

        return view('admin.attribute.index',$data);
    }

    /**
     * 新增属性
     */
    public function create(Request $request)
    {
        $attribute_model       = new AttributeModel();
        $attribute_type_model  = new AttributeTypeModel();
        $attribute_value_model = new AttributeValueModel();

        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $request = $request->all();
            $time = date('Y-m-d H:i:s',time());
            $data = [
                'attribute_name'=>$request['attribute_name'],
                'attribute_type'=>intval($request['attribute_type']),
                'active'        =>$request['active'],
                'create_time'   =>$time,
                'update_time'   =>$time,
                'sort'          =>$request['sort'],
            ];

            if ($attribute_model->readOneByCondition(['attribute_name'=>$request['attribute_name']]))
                return redirect('admin/attribute-create');

            $attribute = $attribute_model->add($data);

            $id_attribute  = intval($attribute->id_attribute);

            if ($id_attribute > 0)
            {
                if (empty($request['attribute_value']))
                    return redirect('admin/attribute');

                if (strpos($request['attribute_value'],parent::SEPERATOR))
                {
                    $attribute_values = explode(parent::SEPERATOR,$request['attribute_value']);
                    foreach ($attribute_values as $attribute_value)
                    {
                        $attribute_value_insert = [
                            'id_attribute'=>$id_attribute,
                            'attribute_value'=>$attribute_value
                        ];
                        $attribute_value_model->add($attribute_value_insert);
                    }
                    return redirect('admin/attribute');
                }
            }

            return redirect('admin/attribute-add');
        }

        $data = [
            'attribute_columns'=>$this->setFormLabels($attribute_model,['id_attribute','create_time','update_time'],['attribute_value'=>'属性值']),
            'attribute_types'=>$attribute_type_model->readAll(),
        ];

        return view('admin.attribute.create',$data);
    }

    /**
     * 更改属性
     * @param $id_attribute
     */
    public function update(Request $request,$id_attribute)
    {
        $attribute_model       = new AttributeModel();
        $attribute_type_model  = new AttributeTypeModel();
        $attribute_value_model = new AttributeValueModel();

        $attribute_values = '';
        $attribute_value_list = $attribute_model::find($id_attribute)->attributeValues;

        foreach($attribute_value_list as $attribute_value)
            $attribute_values .= $attribute_value['attribute_value'].parent::SEPERATOR;
        $attribute_values = rtrim($attribute_values,';');
        $attribute_columns = $this->setFormLabels($attribute_model,['id_attribute','create_time','update_time'],['attribute_value'=>'属性值']);

        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $request = $request->all();
            $time = date('Y-m-d H:i:s',time());
            $data = [
                'attribute_name'=>$request['attribute_name'],
                'attribute_type'=>$request['attribute_type'],
                'active'        =>$request['active'],
                'update_time'   =>$time,
                'sort'          =>$request['sort'],
            ];

            $id_attribute = intval($id_attribute);

            if (strpos($request['attribute_value'],parent::SEPERATOR))
            {
                $is_updated = $attribute_model->modify($id_attribute,$data);

                if ($is_updated === true)
                {
                    foreach($attribute_value_list as $attribute_value)
                    {
                        $attribute_value->destroy($attribute_value['id_attribute_value']);
                    }

                    $attribute_values = explode(parent::SEPERATOR,$request['attribute_value']);
                    foreach ($attribute_values as $value)
                    {
                        $value_insert = [
                            'id_attribute'=>$id_attribute,
                            'attribute_value'=>$value
                        ];
                        $attribute_value_model->add($value_insert);
                    }

                    return redirect('admin/attribute');
                }
            }

            return redirect("admin/attribute-update/{$id_attribute}");

        }

        $data = [
            'attribute'=>$attribute_model->readOne($id_attribute),
            'attribute_types'=>$attribute_type_model->readAll(),
            'attribute_values'=>$attribute_values,
            'attribute_columns'=>$attribute_columns,
        ];

        return view('admin.attribute.update',$data);
    }

    /**
     * 查看属性
     * @param $id_attribute
     */
    public function view($id_attribute)
    {
        $attribute_model = new AttributeModel();
        $attribute_type_model = new AttributeTypeModel;

        $attribute_values = AttributeModel::find($id_attribute)->attributeValues->toArray();
        $attribute_columns = $this->setFormLabels($attribute_model,['id_attribute'],['attribute_value'=>'属性值']);

        $data = [
            'attribute'=>$attribute_model->readOne($id_attribute),
            'attribute_types'=>$attribute_type_model->readAll(),
            'attribute_values'=>$attribute_values,
            'attribute_columns'=>$attribute_columns,
        ];
        return view('admin.attribute.view',$data);
    }

    /**
     * 删除属性
     */
    public function delete(Request $request)
    {
        $id_attribute = $request->input('id_attribute');

        if (empty($id_attribute))
            echo 'false';
        else
        {
            $attribute_model = new AttributeModel;
            $result = $attribute_model->del(intval($id_attribute));
            echo $result ? json_encode(['result' => 1]) : json_encode(['result' => 0, 'msg' => 'delete it fail!!!']);
        }

        exit;
    }
}
