package com.bitepulse.app.data.database

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.bitepulse.app.data.dao.FoodItemDao
import com.bitepulse.app.data.entity.FoodItemEntity

@Database(
    entities = [FoodItemEntity::class],
    version = 1,
    exportSchema = false
)
abstract class BitePulseDatabase : RoomDatabase() {
    abstract fun foodItemDao(): FoodItemDao

    companion object {
        @Volatile
        private var INSTANCE: BitePulseDatabase? = null

        fun getDatabase(context: Context): BitePulseDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    BitePulseDatabase::class.java,
                    "bitepulse_database"
                )
                .fallbackToDestructiveMigration()
                .build()
                INSTANCE = instance
                instance
            }
        }
    }
}
