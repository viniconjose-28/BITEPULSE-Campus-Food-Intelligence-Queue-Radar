package com.bitepulse.app.ui.navigation

sealed class Screen(val route: String, val title: String) {
    object Home : Screen("home", "Home")
    object Radar : Screen("radar", "Radar")
    object Order : Screen("order", "Order")
    object Rewards : Screen("rewards", "Rewards")
    object Passport : Screen("passport", "Passport")
    object Tracker : Screen("tracker/{orderId}", "Order Tracker") {
        fun createRoute(orderId: String) = "tracker/$orderId"
    }
}
