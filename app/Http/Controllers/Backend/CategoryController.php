<?php
namespace App\Http\Controllers\Backend;

use App\CategoryModel;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Controllers\BackendController;

class CategoryController extends BackendController
{
    /**
     * 分类列表
     */
    public function index(Request $request,$id_category=0)
    {
        $category_model = new categoryModel();
        $params = $categories = [];
        CategoryModel::getAllCategories($categories);

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $request = $request->all();
            $params['where']             = ['category_name'=>$request['keywords']];
        } else {
            $params['where']             = ['id_parent_category'=>intval($id_category)];
            $params['orderBy']['column'] = 'sort';
            $params['orderBy']['order']  = 'desc';
        }

        $pagination = $category_model->pagination($params);

        $this->labels_del = ['id_category','short_description','description','meta_title','meta_keywords','meta_description'];
        $data = [
            'id_category'      => $id_category,
            'categories'       => $categories,
            'category_list'    => $pagination,
            'category_columns' => $this->setFormLabels($category_model,$this->labels_del),
        ];

        return view('admin.category.index',$data);
    }

    /**
     * 新增分类
     */
    public function create(Request $request)
    {
        $category_model = new CategoryModel();

        $categories = [];
        $category_model->getAllCategories($categories);

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {

            $request = $request->all();
            $time = date('Y-m-d H:i:s',time());
            $category_create_data = [
                'category_name'      => $request['category_name'],
                'short_description'  => $request['short_description'],
                'description'        => $request['description'],
                'meta_title'         => $request['meta_title'],
                'meta_keywords'      => $request['meta_keywords'],
                'meta_description'   => $request['meta_description'],
                'category_images'    => $request['category_images'],
                'category_link'      => $request['category_link'],
                'id_parent_category' => intval($request['id_parent_category']),
                'level'              => $this->getCategoryLevel($request['id_parent_category']),
                'active'             => $request['active'],
                'create_time'        => $time,
                'update_time'        => $time,
                'sort'               => $request['sort'],
            ];

            $condition = ['category_name'=>$request['category_name']];

            $is_exists = $category_model->readOneByCondition($condition);

            if ($is_exists !== null)
                return redirect('admin/category-create');

            $category = $category_model->add($category_create_data);

            if ($category !== false)
                return redirect('admin/category');
            else
                return redirect('admin/category-create');


        }

        $data = [
            'categories'       => $categories,
            'category_columns' => $this->setFormLabels($category_model,['id_category','create_time','update_time','level']),
        ];

        return view('admin.category.create',$data);
    }

    /**
     * 更改属性
     * @param $id_category
     */
    public function update(Request $request,$id_category)
    {
        $category_model = new categoryModel();
        $category_detail_model = new CategoryDetailModel();

        $category_list = [];
        $category_model->getAllCategories($category_list);

        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $request = $request->all();
            $time = date('Y-m-d H:i:s',time());
            $category_update = [
                'category_images' => $request['category_images'],
                'category_link'   => $request['category_link'],
                'active'          => $request['active'],
                'update_time'     => $time,
                'sort'            => $request['sort'],
            ];
            $id_category = $category_model->upd(intval($id_category),$category_update);
            $id_category = intval($id_category);
            if ($id_category > 0)
            {
                $category_detail_update = [
                    'id_category'       => $id_category,
                    'category_name'     => $request['category_name'],
                    'short_description' => $request['short_description'],
                    'description'       => $request['description'],
                    'meta_title'        => $request['meta_title'],
                    'meta_keywords'     => $request['meta_keywords'],
                    'meta_description'  => $request['meta_description'],
                ];

                $id_category = $category_detail_model->upd(0,$category_detail_update);

                if (intval($id_category) > 0)
                    return redirect("admin/category");
            }
            return redirect("admin/category-modify/{$id_category}");

        }

        $this->labels_del = ['id_category'];
        $category_detail_columns = $this->setFormLabels($category_detail_model,$this->labels_del);

        $this->labels_del = ['id_category','id_parent_category','level','update_time','create_time'];
        $category_columns = $this->setFormLabels($category_model,$this->labels_del);

        $data = [
            'category'=>$category_model->readOne($id_category,'categoryDetail'),
            'category_columns'=>array_merge($category_detail_columns,$category_columns),
            'category_detail_columns'=>$category_detail_columns,
            'category_list'=>$category_list,
        ];

        return view('admin.category.update',$data);
    }

    /**
     * 查看属性
     * @param $id_category
     */
    public function view($id_category)
    {
        $category_model        = new categoryModel();
        $category_columns      = $this->setFormLabels($category_model);
        $categories = [];
        CategoryModel::getAllCategories($categories);

        $data = [
            'category'=>$category_model->readOneById($id_category),
            'categories'=>$categories,
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

    public function getCategoryLevel($id_parent_category)
    {
        if ($id_parent_category == 0)
            return 1;
        $category_model = new CategoryModel();
        $category = $category_model->readOneByCondition(['id_parent_category'=>$id_parent_category]);
        return intval($category['level'])+1;
    }
}
