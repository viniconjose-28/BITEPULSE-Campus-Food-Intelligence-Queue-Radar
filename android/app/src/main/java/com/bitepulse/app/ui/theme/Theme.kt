package com.bitepulse.app.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val BitePulseColorScheme = darkColorScheme(
    primary = NeonGreenPrimary,
    onPrimary = BgPrimary,
    secondary = NeonGreenSecondary,
    onSecondary = BgPrimary,
    background = BgPrimary,
    onBackground = TextPrimary,
    surface = CardBg,
    onSurface = TextPrimary,
    surfaceVariant = CardElevated,
    onSurfaceVariant = TextSecondary,
    tertiary = DarkGreen,
    error = ErrorRed,
    onError = TextPrimary
)

@Composable
fun BitePulseTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = BitePulseColorScheme,
        content = content
    )
}
