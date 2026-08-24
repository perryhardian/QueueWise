import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/network/dio_provider.dart';
import '../models/business_model.dart';

final businessRemoteDataSourceProvider = Provider<BusinessRemoteDataSource>((ref) => BusinessRemoteDataSource(ref.watch(dioProvider)));
class BusinessRemoteDataSource { const BusinessRemoteDataSource(this._dio); final Dio _dio;
  Future<List<BusinessCategoryModel>> getCategories() async { final res = await _dio.get<List<dynamic>>('/businesses/categories'); return res.data!.map((e) => BusinessCategoryModel.fromJson(e as Map<String,dynamic>)).toList(); }
  Future<List<BusinessModel>> getBusinesses({String? search, String? category, String? queueLength}) async { final res = await _dio.get<List<dynamic>>('/businesses', queryParameters: {if(search!=null&&search.isNotEmpty)'search':search, if(category!=null&&category.isNotEmpty)'category':category, if(queueLength!=null&&queueLength.isNotEmpty)'queueLength':queueLength}); return res.data!.map((e) => BusinessModel.fromJson(e as Map<String,dynamic>)).toList(); }
  Future<List<BusinessModel>> getNearbyBusinesses() async { final res = await _dio.get<List<dynamic>>('/businesses/nearby'); return res.data!.map((e) => BusinessModel.fromJson(e as Map<String,dynamic>)).toList(); }
  Future<BusinessModel> getBusiness(String id) async { final res = await _dio.get<Map<String,dynamic>>('/businesses/$id'); return BusinessModel.fromJson(res.data!); }
}