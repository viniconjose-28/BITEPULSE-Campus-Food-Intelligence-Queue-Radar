package com.bitepulse.app.data.dao

import androidx.room.*
import com.bitepulse.app.data.entity.FoodItemEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface FoodItemDao {
    @Query("SELECT * FROM food_items ORDER BY recentOrdersCount DESC")
    fun getAllFoodItems(): Flow<List<FoodItemEntity>>

    @Query("SELECT * FROM food_items WHERE isTrending = 1 ORDER BY trendingRank ASC")
    fun getTrendingFoods(): Flow<List<FoodItemEntity>>

    @Query("SELECT * FROM food_items WHERE isFoodRescue = 1")
    fun getFoodRescueItems(): Flow<List<FoodItemEntity>>

    @Query("SELECT * FROM food_items WHERE price <= :budget ORDER BY price ASC")
    fun getFoodsUnderBudget(budget: Double): Flow<List<FoodItemEntity>>

    @Query("SELECT * FROM food_items WHERE preparationTimeMin <= :minutes ORDER BY preparationTimeMin ASC")
    fun getFoodsForTimeAttack(minutes: Int): Flow<List<FoodItemEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(items: List<FoodItemEntity>)
}
