import 'package:flutter/material.dart';

/// Runtime counterpart to the OKLCH source tokens in `/tokens.css`.
abstract final class AppColors {
  static const paper = Color(0xFF07100B);
  static const paper2 = Color(0xFF0D1811);
  static const paper3 = Color(0xFF15251A);
  static const ink = Color(0xFFF0F8F2);
  static const ink2 = Color(0xFFD1DDD3);
  static const rule = Color(0xFF223A2A);
  static const rule2 = Color(0xFF365943);
  static const muted = Color(0xFF85948A);
  static const neutral = Color(0xFFAFBCB2);
  static const accent = Color(0xFF79FF92);
  static const accentSoft = Color(0xFF123D20);
  static const accentInk = Color(0xFF07110A);
  static const focus = Color(0xFFB8FFC4);
  static const error = Color(0xFFFF737B);
  static const errorContainer = Color(0xFF42161B);
  static const warning = Color(0xFFFFC45B);
  static const warningContainer = Color(0xFF3B2A0D);
  static const info = Color(0xFF63CEF5);
  static const infoContainer = Color(0xFF0D3140);
}

abstract final class AppSpacing {
  static const xxs = 4.0;
  static const xs = 8.0;
  static const sm = 12.0;
  static const md = 16.0;
  static const page = 20.0;
  static const lg = 24.0;
  static const section = 32.0;
  static const xl = 48.0;
}

abstract final class AppRadii {
  static const small = 10.0;
  static const input = 12.0;
  static const card = 16.0;
  static const hero = 24.0;
  static const pill = 999.0;
}

abstract final class AppDurations {
  static const micro = Duration(milliseconds: 120);
  static const short = Duration(milliseconds: 220);
  static const long = Duration(milliseconds: 420);
}

abstract final class AppShadows {
  static const card = [
    BoxShadow(color: Color(0x4D000000), blurRadius: 24, offset: Offset(0, 8)),
  ];
}
