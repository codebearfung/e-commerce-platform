<?php
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/
define('ROUTESEPERATOR','\\');
define('FRONTEND','Frontend'.ROUTESEPERATOR);
define('BACKEND','Backend'.ROUTESEPERATOR);

Route::group(['middleware' => ['web']], function () {
	/*
	|--------------------------------------------------------------------------
	| Frontend Routes File
	|--------------------------------------------------------------------------
	|
	| Here is where you will register all of the routes in an application.
	| It's a breeze. Simply tell Laravel the URIs it should respond to
	| and give it the controller to call when that URI is requested.
	|
	*/

	Route::get('/',FRONTEND.'HomeController@index');


	/*
	|--------------------------------------------------------------------------
	| Backend Routes File
	|--------------------------------------------------------------------------
	|
	| Here is where you will register all of the routes in an application.
	| It's a breeze. Simply tell Laravel the URIs it should respond to
	| and give it the controller to call when that URI is requested.
	|
	*/

	Route::get('admin/login',BACKEND.'AdminController@login');
	Route::get('admin',BACKEND.'AdminController@index');
	Route::post('admin/valid',BACKEND.'AdminController@valid');
	Route::post('admin/logout',BACKEND.'AdminController@logout');

	/**
	 * Attribute Management
	 */
	Route::get('admin/attribute',BACKEND.'AttributeController@index');
	Route::match(['get','post'],'admin/attribute-create',BACKEND.'AttributeController@create');
	Route::match(['get','post'],'admin/attribute-update/{id_attribute}',BACKEND.'AttributeController@update')->where('id_attribute','[0-9]+');
	Route::get('admin/attribute-view/{id_attribute}',BACKEND.'AttributeController@view')->where('id_attribute','[0-9]+');
	Route::post('admin/attribute-delete',BACKEND.'AttributeController@delete');
	Route::post('admin/attribute-search',BACKEND.'AttributeController@index');

	/**
	 * Product Management
	 */
	Route::get('admin/product',BACKEND.'ProductController@index');
	Route::match(['get','post'],'admin/product-create',BACKEND.'ProductController@create');

	/**
	 * Category Management
	 */
	Route::get('admin/category',BACKEND.'CategoryController@index');
	Route::match(['get','post'],'admin/category-create',BACKEND.'CategoryController@create');
	Route::match(['get','post'],'admin/category-update/{id_category}',BACKEND.'CategoryController@update')->where('id_category','[0-9]+');
	Route::get('admin/category-view/{id_category}',BACKEND.'CategoryController@view')->where('id_category','[0-9]+');
	Route::post('admin/category-delete',BACKEND.'CategoryController@delete');
	Route::post('admin/category-search',BACKEND.'CategoryController@index');

	/**
	 * Order Management
	 */
	Route::get('admin/order',BACKEND.'OrderController@index');

	/**
	 * Shipping Management
	 */
	Route::get('admin/shipping',BACKEND.'ShippingController@index');

	/**
	 * Payment Management
	 */
	Route::get('admin/payment',BACKEND.'PaymentController@index');

	/**
	 * System Management
	 */
	Route::get('admin/system-modify-password',BACKEND.'SystemController@systemModifyPassword');
});
