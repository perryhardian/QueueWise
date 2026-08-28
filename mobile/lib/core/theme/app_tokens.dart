import 'package:flutter/material.dart';

/// Runtime counterpart to the OKLCH source tokens in `/tokens.css`.
abstract final class AppColors {
  static const paper = Color(0xFFF2F9F4);
  static const paper2 = Color(0xFFE8F1EA);
  static const paper3 = Color(0xFFD8E5DC);
  static const ink = Color(0xFF121B15);
  static const ink2 = Color(0xFF323E36);
  static const rule = Color(0xFFC2CEC5);
  static const rule2 = Color(0xFF99A99E);
  static const muted = Color(0xFF5F6D63);
  static const neutral = Color(0xFF435147);
  static const accent = Color(0xFF007E4B);
  static const accentSoft = Color(0xFFD9F2E4);
  static const accentInk = Color(0xFFF4FAF6);
  static const focus = Color(0xFF009D57);
  static const error = Color(0xFFCC272E);
  static const errorContainer = Color(0xFFFFE3DF);
  static const warning = Color(0xFFD79628);
  static const warningContainer = Color(0xFFFDECD5);
  static const info = Color(0xFF0E84B7);
  static const infoContainer = Color(0xFFDFF2FD);
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
    BoxShadow(color: Color(0x0D121B15), blurRadius: 12, offset: Offset(0, 4)),
  ];
}
