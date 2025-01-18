export interface Exercise {
  name: string;
  duration: string;
  repetitions: string;
  sets: string;
  equipment: string;
}

export interface DayExercises {
  day: string;
  exercises: Exercise[];
}

export interface Schedule {
  days_per_week: number;
  session_duration: number;
}

export interface WorkoutPlan {
  goal: string;
  fitness_level: string;
  total_weeks: number;
  schedule: Schedule;
  exercises: DayExercises[];
  seo_title: string;
  seo_content: string;
  seo_keywords: string;
}

export interface WorkoutResponse {
  result: WorkoutPlan;
  cacheTime: number;
}

export interface ExerciseDetails {
  exercise_name: string;
  description: string;
  primary_muscles: string[];
  secondary_muscles: string[];
  equipment_needed: string[];
  instructions: string[];
  seo_title: string;
  seo_content: string;
  seo_keywords: string;
}

export interface ExerciseResponse {
  result: ExerciseDetails;
  cacheTime: number;
}

export interface MealSuggestion {
  name: string;
  ingredients: string[];
  calories: number;
}

export interface MealPlan {
  meal: string;
  suggestions: MealSuggestion[];
}

export interface Macronutrients {
  carbohydrates: string;
  proteins: string;
  fats: string;
}

export interface NutritionPlan {
  exercise_name: string;
  description: string;
  goal: string;
  calories_per_day: number;
  macronutrients: Macronutrients;
  meal_suggestions: MealPlan[];
  seo_title: string;
  seo_content: string;
  seo_keywords: string;
}

export interface NutritionResponse {
  result: NutritionPlan;
  cacheTime: number;
}

export interface FoodItem {
  name: string;
  portion_size: string;
  calories: string;
  protein: string;
  carbs: string;
  fats: string;
}

export interface MealAnalysis {
  meal_type: string;
  balance_score: string;
  protein_ratio: string;
  carb_ratio: string;
  fat_ratio: string;
}

export interface DietaryFlags {
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  allergens: string[];
}

export interface HealthInsights {
  meal_balance: string;
  positive_aspects: string[];
  improvement_areas: string[];
  suggestions: string[];
}

export interface FoodAnalysis {
  foods_identified: FoodItem[];
  total_nutrition: {
    total_calories: string;
    total_protein: string;
    total_carbs: string;
    total_fats: string;
    fiber: string;
    vitamins_minerals: string[];
  };
  meal_analysis: MealAnalysis;
  dietary_flags: DietaryFlags;
  health_insights: HealthInsights;
}

export interface FoodResponse {
  result: FoodAnalysis;
  cacheTime: number;
}