<?php
namespace App\Http\Controllers\Backend;

use App\CategoryDetailModel;
use App\CategoryModel;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\BackendController;

class CategoryController extends BackendController
{
    /**
     * 分类列表
     */
    public function index(Request $request)
    {
        $category_model = new categoryModel();

        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $request = $request->all();
            $where = [
                'category_name'=>$request['keywords'],
            ];
            $pagination = $category_model->pagination($where);
        }
        else
            $pagination = $category_model->pagination();

        $this->labels_del = ['id_category','id_category_detail'];
        $this->labels_add = ['category_name'=>'分类名'];

        $data = [
            'category_list'=>$pagination,
            'category_columns'=>$this->setFormLabels($category_model,$this->labels_del,$this->labels_add,false),
        ];

        return view('admin.category.index',$data);
    }

    /**
     * 新增分类
     */
    public function create(Request $request)
    {
        $category_model = new CategoryModel();
        $category_detail_model = new CategoryDetailModel();
        $category_list = [];
        $category_model->getAllCategories($category_list);
        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $request = $request->all();
            $time = date('Y-m-d H:i:s',time());
            $data = [
                'category_name'=>$request['category_name'],
                'category_type'=>intval($request['category_type']),
                'active'        =>$request['active'],
                'create_time'   =>$time,
                'update_time'   =>$time,
                'sort'          =>$request['sort'],
            ];

            if ($category_model->readOneByCondition(['category_name'=>$request['category_name']]))
                return redirect('admin/category-create');

            $category = $category_model->add($data);

            $id_category  = intval($category->id_category);



            return redirect('admin/category-create');
        }

        $this->labels_del = ['id_category','id_category_detail','create_time','update_time'];
        $this->labels_add = ['category_name'=>'分类名','category_images'=>'分类图片','category_link'=>'分类链接'];
        $category_columns = $this->setFormLabels($category_model,$this->labels_del,$this->labels_add,false);

        $this->labels_del = ['id_category'];
        $category_detail_columns = $this->setFormLabels($category_detail_model,$this->labels_del);
        $data = [
            'category_columns'=>array_merge($category_detail_columns,$category_columns),
            'category_list'=>$category_list,
        ];

        return view('admin.category.create',$data);
    }

    /**
     * 更改属性
     * @param $id_category
     */
    public function update(Request $request,$id_category)
    {
        $category_model       = new categoryModel();
        $category_type_model  = new categoryTypeModel();
        $category_value_model = new categoryValueModel();

        $category_values = '';
        $category_value_list = $category_model::find($id_category)->categoryValues;

        foreach($category_value_list as $category_value)
            $category_values .= $category_value['category_value'].parent::SEPERATOR;
        $category_values = rtrim($category_values,';');
        $category_columns = $this->setFormLabels($category_model,['id_category','create_time','update_time'],['category_value'=>'属性值']);

        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $request = $request->all();
            $time = date('Y-m-d H:i:s',time());
            $data = [
                'category_name'=>$request['category_name'],
                'category_type'=>$request['category_type'],
                'active'        =>$request['active'],
                'update_time'   =>$time,
                'sort'          =>$request['sort'],
            ];

            $id_category = intval($id_category);

            if (strpos($request['category_value'],parent::SEPERATOR))
            {
                $is_updated = $category_model->modify($id_category,$data);

                if ($is_updated === true)
                {
                    foreach($category_value_list as $category_value)
                    {
                        $category_value->destroy($category_value['id_category_value']);
                    }

                    $category_values = explode(parent::SEPERATOR,$request['category_value']);
                    foreach ($category_values as $value)
                    {
                        $value_insert = [
                            'id_category'=>$id_category,
                            'category_value'=>$value
                        ];
                        $category_value_model->add($value_insert);
                    }

                    return redirect('admin/category');
                }
            }

            return redirect("admin/category-update/{$id_category}");

        }

        $data = [
            'category'=>$category_model->readOne($id_category),
            'category_types'=>$category_type_model->readAll(),
            'category_values'=>$category_values,
            'category_columns'=>$category_columns,
        ];

        return view('admin.category.update',$data);
    }

    /**
     * 查看属性
     * @param $id_category
     */
    public function view($id_category)
    {
        $category_model = new categoryModel();
        $category_type_model = new categoryTypeModel;

        $category_values = categoryModel::find($id_category)->categoryValues->toArray();
        $category_columns = $this->setFormLabels($category_model,['id_category'],['category_value'=>'属性值']);

        $data = [
            'category'=>$category_model->readOne($id_category),
            'category_types'=>$category_type_model->readAll(),
            'category_values'=>$category_values,
            'category_columns'=>$category_columns,
        ];
        return view('admin.category.view',$data);
    }

    /**
     * 删除属性
     */
    public function delete(Request $request)
    {
        $id_category = $request->input('id_category');

        if (empty($id_category))
            echo 'false';
        else
        {
            $category_model = new categoryModel;
            $result = $category_model->del(intval($id_category));
            echo $result ? json_encode(['result' => 1]) : json_encode(['result' => 0, 'msg' => 'delete it fail!!!']);
        }

        exit;
    }
}
