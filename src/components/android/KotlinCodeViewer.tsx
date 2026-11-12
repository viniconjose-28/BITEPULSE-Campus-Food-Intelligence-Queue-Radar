import React from 'react';
import { Copy, Check, FileCode, Folder, ChevronRight } from 'lucide-react';

interface KotlinFile {
  path: string;
  name: string;
  package: string;
  code: string;
}

export const KOTLIN_FILES: KotlinFile[] = [
  {
    name: 'MainActivity.kt',
    path: 'app/src/main/java/com/bitepulse/app/MainActivity.kt',
    package: 'com.bitepulse.app',
    code: `package com.bitepulse.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.bitepulse.app.navigation.BitePulseNavGraph
import com.bitepulse.app.ui.theme.BitePulseTheme

/**
 * BitePulse - Campus Food Intelligence & Queue Radar
 * MAD Assignment 4 & 5 - Main Activity Entry Point
 */
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            BitePulseTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    BitePulseNavGraph()
                }
            }
        }
    }
}`,
  },
  {
    name: 'Theme.kt',
    path: 'app/src/main/java/com/bitepulse/app/ui/theme/Theme.kt',
    package: 'com.bitepulse.app.ui.theme',
    code: `package com.bitepulse.app.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

// Warm Premium Campus Food Identity (Strictly No Blue/Cyan)
val WarmCream = Color(0xFFFFF8EF)
val Terracotta = Color(0xFFD95F39)
val BurntOrange = Color(0xFFF28C28)
val DarkEspresso = Color(0xFF2B211C)
val WarmTaupe = Color(0xFF7A6A60)
val SageOlive = Color(0xFF7A8B5A)
val SoftPeach = Color(0xFFF6D7C8)
val FreshGreen = Color(0xFF5F8A52)

private val BitePulseColorScheme = lightColorScheme(
    primary = Terracotta,
    onPrimary = Color.White,
    secondary = BurntOrange,
    onSecondary = Color.White,
    background = WarmCream,
    onBackground = DarkEspresso,
    surface = Color.White,
    onSurface = DarkEspresso,
    tertiary = SageOlive,
    outline = SoftPeach
)

@Composable
fun BitePulseTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = BitePulseColorScheme,
        typography = Typography,
        content = content
    )
}`,
  },
  {
    name: 'BitePulseDatabase.kt',
    path: 'app/src/main/java/com/bitepulse/app/data/database/BitePulseDatabase.kt',
    package: 'com.bitepulse.app.data.database',
    code: `package com.bitepulse.app.data.database

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.bitepulse.app.data.dao.FoodItemDao
import com.bitepulse.app.data.dao.OrderDao
import com.bitepulse.app.data.entity.FoodItemEntity
import com.bitepulse.app.data.entity.OrderEntity

/**
 * Local-First Room Database for Offline Operation
 */
@Database(
    entities = [FoodItemEntity::class, OrderEntity::class],
    version = 1,
    exportSchema = false
)
abstract class BitePulseDatabase : RoomDatabase() {
    abstract fun foodItemDao(): FoodItemDao
    abstract fun orderDao(): OrderDao

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
}`,
  },
  {
    name: 'FoodItemDao.kt',
    path: 'app/src/main/java/com/bitepulse/app/data/dao/FoodItemDao.kt',
    package: 'com.bitepulse.app.data.dao',
    code: `package com.bitepulse.app.data.dao

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
}`,
  },
  {
    name: 'HomeViewModel.kt',
    path: 'app/src/main/java/com/bitepulse/app/viewmodel/HomeViewModel.kt',
    package: 'com.bitepulse.app.viewmodel',
    code: `package com.bitepulse.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bitepulse.app.data.repository.FoodRepository
import com.bitepulse.app.models.CampusPulseState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/**
 * MVVM Architecture: HomeViewModel holding Reactive UI State
 */
class HomeViewModel(private val repository: FoodRepository) : ViewModel() {

    private val _pulseState = MutableStateFlow(
        CampusPulseState(
            crowdLevel = "CALM",
            estimatedWaitMin = 4,
            bestTimeToOrder = "Now"
        )
    )
    val pulseState: StateFlow<CampusPulseState> = _pulseState.asStateFlow()

    val trendingFoods = repository.getTrendingFoods()
    val foodRescueDeals = repository.getFoodRescueItems()

    fun filterByTimeAttack(minutes: Int) {
        viewModelScope.launch {
            repository.getTimeAttackRecommendations(minutes)
        }
    }

    fun filterByBudget(maxPrice: Double) {
        viewModelScope.launch {
            repository.getBudgetRecommendations(maxPrice)
        }
    }
}`,
  },
  {
    name: 'AndroidManifest.xml',
    path: 'app/src/main/AndroidManifest.xml',
    package: 'android',
    code: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.bitepulse.app">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.VIBRATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.BitePulse">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:label="@string/app_name"
            android:theme="@style/Theme.BitePulse">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`,
  },
];

export const KotlinCodeViewer: React.FC = () => {
  const [activeFile, setActiveFile] = React.useState<KotlinFile>(KOTLIN_FILES[0]);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col space-y-4 text-[#FFF8EF] select-text">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#3D312B] gap-3">
        <div>
          <span className="text-xs font-bold text-[#D95F39] uppercase tracking-wider">
            Android Architecture (MVVM + Room + Jetpack Compose)
          </span>
          <h2 className="text-xl font-black text-[#FFF8EF] font-['Cabinet_Grotesk']">
            Kotlin Source Code Repository
          </h2>
          <p className="text-xs text-[#A39389]">
            Full production Android codebase structured for direct Android Studio import.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="px-3.5 py-1.5 rounded-xl bg-[#D95F39] text-[#FFF8EF] font-bold text-xs flex items-center gap-1.5 hover:bg-[#BF4C29] transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Code Copied!' : 'Copy Active File'}</span>
        </button>
      </div>

      {/* File Explorer layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Sidebar list */}
        <div className="md:col-span-1 bg-[#1A1412] p-2.5 rounded-xl border border-[#3D312B] space-y-1">
          <span className="text-[10px] font-extrabold text-[#7A6A60] uppercase px-2 py-1 block">
            Project Tree
          </span>
          {KOTLIN_FILES.map((file) => (
            <button
              key={file.name}
              onClick={() => setActiveFile(file)}
              className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-mono flex items-center gap-2 transition-colors ${
                activeFile.name === file.name
                  ? 'bg-[#D95F39] text-white font-bold'
                  : 'text-[#A39389] hover:bg-[#2B211C] hover:text-[#FFF8EF]'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{file.name}</span>
            </button>
          ))}
        </div>

        {/* Code View Canvas */}
        <div className="md:col-span-3 bg-[#1A1412] rounded-xl border border-[#3D312B] overflow-hidden flex flex-col">
          <div className="bg-[#241A17] px-4 py-2 border-b border-[#3D312B] flex items-center justify-between text-xs text-[#A39389]">
            <span className="font-mono text-[11px] truncate">{activeFile.path}</span>
            <span className="text-[10px] bg-[#3D312B] px-2 py-0.5 rounded text-[#FFF8EF]">
              Kotlin
            </span>
          </div>

          <pre className="p-4 font-mono text-xs text-[#E6DCD5] overflow-x-auto leading-relaxed max-h-[620px] select-all">
            <code>{activeFile.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
