package com.bitepulse.app.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "food_items")
data class FoodItemEntity(
    @PrimaryKey val id: String,
    val name: String,
    val description: String,
    val price: Double,
    val originalPrice: Double? = null,
    val category: String,
    val outletId: String,
    val outletName: String,
    val preparationTimeMin: Int,
    val isVegetarian: Boolean,
    val spiceLevel: String,
    val isTrending: Boolean,
    val trendingRank: Int? = null,
    val recentOrdersCount: Int = 0,
    val isFoodRescue: Boolean = false,
    val caloriesKcal: Int = 0
)
