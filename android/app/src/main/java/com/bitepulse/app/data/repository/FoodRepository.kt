package com.bitepulse.app.data.repository

import com.bitepulse.app.data.dao.FoodItemDao
import com.bitepulse.app.data.entity.FoodItemEntity
import kotlinx.coroutines.flow.Flow

class FoodRepository(private val foodItemDao: FoodItemDao) {
    val allFoodItems: Flow<List<FoodItemEntity>> = foodItemDao.getAllFoodItems()

    fun getFoodsByCategory(category: String): Flow<List<FoodItemEntity>> =
        foodItemDao.getFoodsByCategory(category)

    suspend fun insertAll(items: List<FoodItemEntity>) =
        foodItemDao.insertAll(items)

    suspend fun toggleFavorite(id: String, isFav: Boolean) =
        foodItemDao.updateFavorite(id, isFav)
}
