import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiConfig {
  const ApiConfig._();

  static String get baseUrl => dotenv.env['API_BASE_URL'] ?? 'http://localhost:3000/api';
  static String get socketUrl => dotenv.env['SOCKET_URL'] ?? 'http://localhost:3000';
}