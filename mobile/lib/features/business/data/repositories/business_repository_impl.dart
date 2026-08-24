import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../domain/entities/business.dart';
import '../../domain/repositories/business_repository.dart';
import '../datasources/business_remote_data_source.dart';
final businessRepositoryProvider = Provider<BusinessRepository>((ref) => BusinessRepositoryImpl(ref.watch(businessRemoteDataSourceProvider)));
class BusinessRepositoryImpl implements BusinessRepository { const BusinessRepositoryImpl(this.remote); final BusinessRemoteDataSource remote; @override Future<List<BusinessCategory>> getCategories()=>remote.getCategories(); @override Future<List<Business>> getBusinesses({String? search,String? category,String? queueLength})=>remote.getBusinesses(search: search, category: category, queueLength: queueLength); @override Future<List<Business>> getNearbyBusinesses()=>remote.getNearbyBusinesses(); @override Future<Business> getBusiness(String id)=>remote.getBusiness(id); }