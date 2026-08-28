/* Hallmark · pre-emit critique: P4 H5 E4 S5 R5 V4
 * Hallmark · genre: modern-minimal · macrostructure: Workbench
 * design-system: design.md · designed-as-app · enrichment: none
 */
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'app_tokens.dart';

class AppTheme {
  const AppTheme._();

  static ThemeData get light {
    final baseTheme = ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
    );
    final bodyTheme = GoogleFonts.ibmPlexSansTextTheme(baseTheme.textTheme);
    final textTheme = bodyTheme
        .copyWith(
          displayLarge: _display(bodyTheme.displayLarge, 54),
          displayMedium: _display(bodyTheme.displayMedium, 44),
          displaySmall: _display(bodyTheme.displaySmall, 36),
          headlineLarge: _display(bodyTheme.headlineLarge, 32),
          headlineMedium: _display(bodyTheme.headlineMedium, 28),
          headlineSmall: _display(bodyTheme.headlineSmall, 24),
          titleLarge: _display(bodyTheme.titleLarge, 20),
          titleMedium: bodyTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
          titleSmall: bodyTheme.titleSmall?.copyWith(
            fontWeight: FontWeight.w600,
          ),
          labelLarge: bodyTheme.labelLarge?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        )
        .apply(bodyColor: AppColors.ink, displayColor: AppColors.ink);

    final colorScheme =
        ColorScheme.fromSeed(
          seedColor: AppColors.accent,
          brightness: Brightness.light,
        ).copyWith(
          primary: AppColors.accent,
          onPrimary: AppColors.accentInk,
          primaryContainer: AppColors.accentSoft,
          onPrimaryContainer: AppColors.ink,
          secondary: AppColors.ink2,
          onSecondary: AppColors.accentInk,
          secondaryContainer: AppColors.paper3,
          onSecondaryContainer: AppColors.ink,
          tertiary: AppColors.warning,
          tertiaryContainer: AppColors.warningContainer,
          onTertiaryContainer: AppColors.ink,
          error: AppColors.error,
          errorContainer: AppColors.errorContainer,
          onErrorContainer: AppColors.ink,
          surface: AppColors.paper,
          onSurface: AppColors.ink,
          surfaceContainerLowest: AppColors.paper,
          surfaceContainerLow: AppColors.paper2,
          surfaceContainer: AppColors.paper2,
          surfaceContainerHigh: AppColors.paper3,
          surfaceContainerHighest: AppColors.paper3,
          onSurfaceVariant: AppColors.neutral,
          outline: AppColors.rule2,
          outlineVariant: AppColors.rule,
        );

    return baseTheme.copyWith(
      colorScheme: colorScheme,
      textTheme: textTheme,
      scaffoldBackgroundColor: AppColors.paper,
      canvasColor: AppColors.paper,
      splashFactory: InkSparkle.splashFactory,
      appBarTheme: AppBarTheme(
        centerTitle: false,
        elevation: 0,
        scrolledUnderElevation: 0,
        backgroundColor: AppColors.paper,
        foregroundColor: AppColors.ink,
        titleTextStyle: textTheme.titleLarge,
      ),
      cardTheme: CardThemeData(
        elevation: 0,
        margin: EdgeInsets.zero,
        color: AppColors.paper2,
        surfaceTintColor: Colors.transparent,
        shape: RoundedRectangleBorder(
          side: const BorderSide(color: AppColors.rule),
          borderRadius: BorderRadius.circular(AppRadii.card),
        ),
      ),
      navigationBarTheme: NavigationBarThemeData(
        height: 72,
        elevation: 0,
        backgroundColor: AppColors.paper,
        surfaceTintColor: Colors.transparent,
        indicatorColor: AppColors.accentSoft,
        iconTheme: WidgetStateProperty.resolveWith(
          (states) => IconThemeData(
            color: states.contains(WidgetState.selected)
                ? AppColors.accent
                : AppColors.neutral,
          ),
        ),
        labelTextStyle: WidgetStateProperty.resolveWith(
          (states) => textTheme.labelSmall?.copyWith(
            color: states.contains(WidgetState.selected)
                ? AppColors.ink
                : AppColors.neutral,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          minimumSize: const Size.fromHeight(52),
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.page),
          textStyle: textTheme.labelLarge,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(AppRadii.input),
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          minimumSize: const Size.fromHeight(52),
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.page),
          foregroundColor: AppColors.ink,
          side: const BorderSide(color: AppColors.rule2),
          textStyle: textTheme.labelLarge,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(AppRadii.input),
          ),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          minimumSize: const Size(48, 48),
          foregroundColor: AppColors.accent,
          textStyle: textTheme.labelLarge,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(AppRadii.input),
          ),
        ),
      ),
      iconButtonTheme: IconButtonThemeData(
        style: IconButton.styleFrom(
          minimumSize: const Size(48, 48),
          foregroundColor: AppColors.ink2,
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.paper,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.md,
          vertical: AppSpacing.md,
        ),
        hintStyle: textTheme.bodyMedium?.copyWith(color: AppColors.muted),
        helperStyle: textTheme.bodySmall?.copyWith(color: AppColors.muted),
        errorStyle: textTheme.bodySmall?.copyWith(color: AppColors.error),
        border: _inputBorder(AppColors.rule),
        enabledBorder: _inputBorder(AppColors.rule),
        focusedBorder: _inputBorder(AppColors.ink2),
        errorBorder: _inputBorder(AppColors.error),
        focusedErrorBorder: _inputBorder(AppColors.error),
        disabledBorder: _inputBorder(AppColors.rule),
      ),
      chipTheme: ChipThemeData(
        side: const BorderSide(color: AppColors.rule),
        backgroundColor: AppColors.paper,
        selectedColor: AppColors.accentSoft,
        labelStyle: textTheme.labelMedium,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadii.pill),
        ),
      ),
      dividerTheme: const DividerThemeData(
        color: AppColors.rule,
        thickness: 1,
        space: 1,
      ),
      snackBarTheme: SnackBarThemeData(
        behavior: SnackBarBehavior.floating,
        backgroundColor: AppColors.ink,
        contentTextStyle: textTheme.bodyMedium?.copyWith(
          color: AppColors.accentInk,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadii.input),
        ),
      ),
      dialogTheme: DialogThemeData(
        backgroundColor: AppColors.paper,
        surfaceTintColor: Colors.transparent,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadii.hero),
        ),
      ),
      progressIndicatorTheme: const ProgressIndicatorThemeData(
        color: AppColors.accent,
      ),
    );
  }

  static TextStyle? _display(TextStyle? base, double size) {
    return GoogleFonts.bricolageGrotesque(
      textStyle: base,
      fontSize: size,
      height: 1.12,
      letterSpacing: -0.6,
      fontWeight: FontWeight.w700,
    );
  }

  static OutlineInputBorder _inputBorder(Color color) {
    return OutlineInputBorder(
      borderSide: BorderSide(color: color),
      borderRadius: BorderRadius.circular(AppRadii.input),
    );
  }
}
