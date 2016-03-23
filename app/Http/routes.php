<?php

define('ROUTESEPERATOR','\\');
define('FRONTEND','Frontend'.ROUTESEPERATOR);
define('BACKEND','Backend'.ROUTESEPERATOR);


Route::group(['middleware' => ['web']], function () {
	/*
	|--------------------------------------------------------------------------
	| Frontend Routes File
	|--------------------------------------------------------------------------
	*/
	Route::get('/',FRONTEND.'HomeController@index');
	Route::get('/category/{id_category}',FRONTEND.'CategoryController@index')->where('id_category','[0-9]+');
	Route::get('/customer',FRONTEND.'CustomerController@index');
	Route::get('/customer/login',FRONTEND.'CustomerController@login');
	Route::match(['get','post'],'/customer/register',FRONTEND.'CustomerController@register');
	Route::get('/customer/regSuccess',FRONTEND.'CustomerController@regSuccess');
	Route::post('/customer/findCellphone/{cellphone}',FRONTEND.'CustomerController@findCellphone');
	Route::get('/product/cart',FRONTEND.'ProductController@cart');

	Route::get('admin/login',BACKEND.'AdminController@login');
	Route::post('admin/valid',BACKEND.'AdminController@valid');
	Route::post('admin/logout',BACKEND.'AdminController@logout');
});

Route::group(['middleware' => ['backend']], function () {

	/*
	|--------------------------------------------------------------------------
	| Backend Routes File
	|--------------------------------------------------------------------------
	*/

	Route::get('admin',BACKEND.'AdminController@index');

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
	Route::match(['get','post'],'admin/product-update/{id_product}',BACKEND.'ProductController@update')->where('id_product','[0-9]+');
	Route::get('admin/product-view/{id_product}',BACKEND.'ProductController@view')->where('id_product','[0-9]+');
	Route::post('admin/product-delete',BACKEND.'ProductController@delete');

	/**
	 * Category Management
	 */
	Route::get('admin/category/{id_category?}',BACKEND.'CategoryController@index')->where('id_category','[0-9]+');
	Route::match(['get','post'],'admin/category-create',BACKEND.'CategoryController@create');
	Route::match(['get','post'],'admin/category-modify/{id_category}',BACKEND.'CategoryController@update')->where('id_category','[0-9]+');
	Route::get('admin/category-view/{id_category}',BACKEND.'CategoryController@view')->where('id_category','[0-9]+');
	Route::post('admin/category-delete',BACKEND.'CategoryController@delete');
	Route::post('admin/category-search',BACKEND.'CategoryController@index');

	/**
	 * Order Management
	 */
	Route::get('admin/order',BACKEND.'OrderController@index');

	/**
	 * Customer Management
	 */
	Route::get('admin/customer',BACKEND.'CustomerController@index');
	Route::match(['get','post'],'admin/customer-create',BACKEND.'CustomerController@create');
	Route::match(['get','post'],'admin/customer-update/{id_customer}',BACKEND.'CustomerController@update')->where('id_customer','[0-9]+');
	Route::get('admin/customer-view/{id_customer}',BACKEND.'CustomerController@view')->where('id_customer','[0-9]+');
	Route::post('admin/customer-delete',BACKEND.'CustomerController@delete');
	Route::post('admin/customer-search',BACKEND.'CustomerController@index');

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
