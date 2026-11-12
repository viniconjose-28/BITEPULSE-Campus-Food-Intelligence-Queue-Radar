package com.bitepulse.app.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bitepulse.app.data.entity.FoodItemEntity
import com.bitepulse.app.data.repository.FoodRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class BitePulseUiState(
    val foods: List<FoodItemEntity> = emptyList(),
    val selectedCategory: String = "All",
    val isLoading: Boolean = false,
    val cartCount: Int = 0,
    val bitePoints: Int = 420
)

class BitePulseViewModel(private val repository: FoodRepository) : ViewModel() {
    private val _uiState = MutableStateFlow(BitePulseUiState())
    val uiState: StateFlow<BitePulseUiState> = _uiState.asStateFlow()

    init {
        viewModelScope.launch {
            repository.allFoodItems.collect { foodList ->
                _uiState.value = _uiState.value.copy(foods = foodList)
            }
        }
    }

    fun selectCategory(category: String) {
        _uiState.value = _uiState.value.copy(selectedCategory = category)
    }

    fun toggleFavorite(id: String, current: Boolean) {
        viewModelScope.launch {
            repository.toggleFavorite(id, !current)
        }
    }
}
