'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Dumbbell, 
  Salad, 
  Key, 
  FileJson, 
  Camera,
  ListChecks,
  Loader2,
  Code,
  Terminal
} from 'lucide-react';

type TabType = 'workout' | 'exercise' | 'nutrition' | 'custom' | 'food';

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "tr", name: "Türkçe" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "ru", name: "Русский" },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "ar", name: "العربية" },
  { code: "hi", name: "हिन्दी" },
  { code: "bn", name: "বাংলা" },
  { code: "nl", name: "Nederlands" },
  { code: "pl", name: "Polski" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "th", name: "ไทย" },
  { code: "id", name: "Bahasa Indonesia" },
  { code: "ms", name: "Bahasa Melayu" },
  { code: "fa", name: "فارسی" },
  { code: "he", name: "עברית" },
  { code: "el", name: "Ελληνικά" },
  { code: "sv", name: "Svenska" },
  { code: "da", name: "Dansk" },
  { code: "fi", name: "Suomi" },
  { code: "no", name: "Norsk" },
  { code: "cs", name: "Čeština" },
  { code: "hu", name: "Magyar" },
  { code: "ro", name: "Română" }
];

const LanguageSelect = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
  <div className="space-y-2">
    <Label>Language</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const WorkoutPlanResponse = ({ response }: { response: any }) => {
  if (!response?.result) return null;
  const { result } = response;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{result.seo_title}</CardTitle>
        <CardDescription>{result.seo_content}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Goal</div>
              <div className="font-semibold">{result.goal}</div>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Fitness Level</div>
              <div className="font-semibold">{result.fitness_level}</div>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Days/Week</div>
              <div className="font-semibold">{result.schedule.days_per_week}</div>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Duration</div>
              <div className="font-semibold">{result.schedule.session_duration} min</div>
            </div>
          </div>

          {/* Workout Schedule */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Workout Schedule</h3>
            <div className="grid gap-4">
              {result.exercises.map((day: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-base">{day.day}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {day.exercises.map((exercise: any, exIndex: number) => (
                        <div key={exIndex} className="flex items-start space-x-4 p-4 bg-secondary/20 rounded-lg">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                            {exIndex + 1}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="font-medium">{exercise.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {exercise.sets} sets • {exercise.repetitions} reps • {exercise.duration}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Equipment: {exercise.equipment}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ExerciseDetailsResponse = ({ response }: { response: any }) => {
  if (!response?.result) return null;
  const { result } = response;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{result.exercise_name}</CardTitle>
        <CardDescription>{result.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Muscles Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Primary Muscles</h4>
              <div className="flex flex-wrap gap-2">
                {result.primary_muscles.map((muscle: string, index: number) => (
                  <div key={index} className="bg-primary/10 px-3 py-1 rounded-full text-sm">
                    {muscle}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Secondary Muscles</h4>
              <div className="flex flex-wrap gap-2">
                {result.secondary_muscles.map((muscle: string, index: number) => (
                  <div key={index} className="bg-secondary/20 px-3 py-1 rounded-full text-sm">
                    {muscle}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Equipment Section */}
          <div className="space-y-2">
            <h4 className="font-medium">Equipment Needed</h4>
            <div className="flex flex-wrap gap-2">
              {result.equipment_needed.map((equipment: string, index: number) => (
                <div key={index} className="bg-accent/20 px-3 py-1 rounded-full text-sm">
                  {equipment}
                </div>
              ))}
            </div>
          </div>

          {/* Instructions Section */}
          <div className="space-y-2">
            <h4 className="font-medium">Instructions</h4>
            <div className="space-y-2">
              {result.instructions.map((instruction: string, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <p className="text-sm">{instruction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const NutritionAdviceResponse = ({ response }: { response: any }) => {
  if (!response?.result) return null;
  const { result } = response;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Nutrition Plan</CardTitle>
        <CardDescription>{result.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Calories & Macros */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Daily Calories</div>
              <div className="font-semibold">{result.calories_per_day} kcal</div>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Carbs</div>
              <div className="font-semibold">{result.macronutrients.carbohydrates}</div>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Protein</div>
              <div className="font-semibold">{result.macronutrients.proteins}</div>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Fats</div>
              <div className="font-semibold">{result.macronutrients.fats}</div>
            </div>
          </div>

          {/* Meal Suggestions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Meal Suggestions</h3>
            <div className="grid gap-4">
              {result.meal_suggestions.map((meal: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-base">{meal.meal}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {meal.suggestions.map((suggestion: any, sugIndex: number) => (
                        <div key={sugIndex} className="p-4 bg-secondary/20 rounded-lg space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="font-medium">{suggestion.name}</div>
                            <div className="text-sm bg-primary/20 px-2 py-1 rounded">
                              {suggestion.calories} kcal
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {suggestion.ingredients.map((ingredient: string, ingIndex: number) => (
                              <div key={ingIndex} className="text-sm bg-accent/20 px-2 py-1 rounded">
                                {ingredient}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FoodAnalysisResponse = ({ response }: { response: any }) => {
  if (!response?.result) return null;
  const { result } = response;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Food Analysis Results</CardTitle>
        <CardDescription>Detailed nutritional breakdown of your meal</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Identified Foods */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Foods Identified</h3>
            {result.foods_identified.map((food: any, index: number) => (
              <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">{food.name}</div>
                  <div className="text-sm bg-primary/20 px-2 py-1 rounded">
                    {food.portion_size}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-sm">
                    <div className="text-muted-foreground">Calories</div>
                    <div>{food.calories}</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-muted-foreground">Protein</div>
                    <div>{food.protein}</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-muted-foreground">Carbs</div>
                    <div>{food.carbs}</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-muted-foreground">Fats</div>
                    <div>{food.fats}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Meal Analysis */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Meal Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Balance Score</span>
                    <span className="font-semibold">{result.meal_analysis.balance_score}/10</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-primary/10 p-2 rounded">
                      <div className="text-muted-foreground">Protein</div>
                      <div>{result.meal_analysis.protein_ratio}</div>
                    </div>
                    <div className="bg-primary/10 p-2 rounded">
                      <div className="text-muted-foreground">Carbs</div>
                      <div>{result.meal_analysis.carb_ratio}</div>
                    </div>
                    <div className="bg-primary/10 p-2 rounded">
                      <div className="text-muted-foreground">Fat</div>
                      <div>{result.meal_analysis.fat_ratio}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Dietary Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(result.dietary_flags)
                      .filter(([key]) => key.startsWith('is_'))
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className={`px-2 py-1 rounded text-sm ${
                            value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {key.replace('is_', '').replace('_', ' ')}
                        </div>
                      ))}
                  </div>
                  {result.dietary_flags.allergens && (
                    <div className="mt-2">
                      <div className="text-sm text-muted-foreground mb-1">Allergens:</div>
                      <div className="flex flex-wrap gap-1">
                        {result.dietary_flags.allergens.map((allergen: string, index: number) => (
                          <div key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                            {allergen}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Health Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Health Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">{result.health_insights.meal_balance}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Positive Aspects</h4>
                    <div className="space-y-1">
                      {result.health_insights.positive_aspects.map((aspect: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span>{aspect}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Areas for Improvement</h4>
                    <div className="space-y-1">
                      {result.health_insights.improvement_areas.map((area: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-red-500" />
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

const CustomPlanResponse = ({ response }: { response: any }) => {
  if (!response?.result) return null;
  const { result } = response;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{result.seo_title}</CardTitle>
        <CardDescription>{result.seo_content}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Goal</div>
              <div className="font-semibold">{result.goal}</div>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Fitness Level</div>
              <div className="font-semibold">{result.fitness_level}</div>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Days/Week</div>
              <div className="font-semibold">{result.schedule.days_per_week}</div>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Duration</div>
              <div className="font-semibold">{result.schedule.session_duration} min</div>
            </div>
          </div>

          {/* Custom Goals */}
          <div className="space-y-2">
            <h4 className="font-medium">Custom Goals</h4>
            <div className="flex flex-wrap gap-2">
              {result.custom_goals.map((goal: string, index: number) => (
                <div key={index} className="bg-accent/20 px-3 py-1 rounded-full text-sm">
                  {goal}
                </div>
              ))}
            </div>
          </div>

          {/* Workout Schedule */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Weekly Schedule</h3>
            <div className="grid gap-4">
              {result.exercises.map((day: any, index: number) => (
                <Card key={index} className="relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      {day.day}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {day.exercises.map((exercise: any, exIndex: number) => (
                        <div key={exIndex} className="flex items-start space-x-4 p-4 bg-secondary/20 rounded-lg">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                            {exIndex + 1}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="font-medium">{exercise.name}</div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                              {exercise.sets !== "1" && (
                                <div className="bg-background/50 px-2 py-1 rounded">
                                  <span className="text-muted-foreground">Sets:</span> {exercise.sets}
                                </div>
                              )}
                              {exercise.repetitions !== "N/A" && (
                                <div className="bg-background/50 px-2 py-1 rounded">
                                  <span className="text-muted-foreground">Reps:</span> {exercise.repetitions}
                                </div>
                              )}
                              <div className="bg-background/50 px-2 py-1 rounded">
                                <span className="text-muted-foreground">Time:</span> {exercise.duration}
                              </div>
                              {exercise.equipment !== "None" && (
                                <div className="bg-background/50 px-2 py-1 rounded">
                                  <span className="text-muted-foreground">Equipment:</span> {exercise.equipment}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* SEO Keywords */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {result.seo_keywords.split(', ').map((keyword: string, index: number) => (
                <div key={index} className="bg-muted px-2 py-1 rounded text-sm">
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const WorkoutPlannerAPI = () => {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('workout');
  const [workoutPreferences, setWorkoutPreferences] = useState<string[]>([]);
  const [workoutResponse, setWorkoutResponse] = useState<any>(null);
  const [goal, setGoal] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState('4');
  const [sessionDuration, setSessionDuration] = useState('60');

  const [exerciseName, setExerciseName] = useState('');
  const [exerciseResponse, setExerciseResponse] = useState<any>(null);
  
  const [nutritionGoal, setNutritionGoal] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [nutritionResponse, setNutritionResponse] = useState<any>(null);

  const [customGoal, setCustomGoal] = useState('');
  const [customFitnessLevel, setCustomFitnessLevel] = useState('');
  const [customPreferences, setCustomPreferences] = useState<string[]>([]);
  const [healthConditions, setHealthConditions] = useState('');
  const [customDaysPerWeek, setCustomDaysPerWeek] = useState('5');
  const [customSessionDuration, setCustomSessionDuration] = useState('45');
  const [planDurationWeeks, setPlanDurationWeeks] = useState('6');
  const [customGoals, setCustomGoals] = useState('');
  const [customResponse, setCustomResponse] = useState<any>(null);

  const [foodImageUrl, setFoodImageUrl] = useState('');
  const [foodResponse, setFoodResponse] = useState<any>(null);

  const [workoutLang, setWorkoutLang] = useState('en');
  const [exerciseLang, setExerciseLang] = useState('en');
  const [nutritionLang, setNutritionLang] = useState('en');
  const [customLang, setCustomLang] = useState('en');
  const [foodLang, setFoodLang] = useState('en');

  const handleTabChange = (value: string) => {
    setActiveTab(value as TabType);
  };

  const togglePreference = (preference: string) => {
    setWorkoutPreferences(prev => 
      prev.includes(preference)
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  const handleGenerateWorkoutPlan = async () => {
    if (!apiKey) {
      alert('Please enter your API key first');
      return;
    }

    setLoading(true);
    try {
      const requestData = {
        goal: goal,
        fitness_level: fitnessLevel,
        preferences: workoutPreferences,
        health_conditions: ["None"],
        schedule: {
          days_per_week: parseInt(daysPerWeek),
          session_duration: parseInt(sessionDuration)
        },
        plan_duration_weeks: 4,
        lang: workoutLang
      };

      const response = await fetch(
        'https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com/generateWorkoutPlan?noqueue=1',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com'
          },
          body: JSON.stringify(requestData)
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      setWorkoutResponse(data);
    } catch (error) {
      console.error('Error generating workout plan:', error);
      alert('Error generating workout plan. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleExerciseDetails = async () => {
    if (!apiKey || !exerciseName) {
      alert('Please enter your API key and exercise name');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        'https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com/exerciseDetails?noqueue=1',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com'
          },
          body: JSON.stringify({
            exercise_name: exerciseName,
            lang: exerciseLang
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      setExerciseResponse(data);
    } catch (error) {
      console.error('Error getting exercise details:', error);
      alert('Error getting exercise details. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNutritionAdvice = async () => {
    if (!apiKey) {
      alert('Please enter your API key first');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        'https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com/nutritionAdvice?noqueue=1',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com'
          },
          body: JSON.stringify({
            goal: nutritionGoal,
            dietary_restrictions: dietaryRestrictions,
            current_weight: parseInt(currentWeight),
            target_weight: parseInt(targetWeight),
            daily_activity_level: activityLevel,
            lang: nutritionLang
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      setNutritionResponse(data);
    } catch (error) {
      console.error('Error getting nutrition advice:', error);
      alert('Error getting nutrition advice. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomPlan = async () => {
    if (!apiKey) {
      alert('Please enter your API key first');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        'https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com/customWorkoutPlan?noqueue=1',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com'
          },
          body: JSON.stringify({
            goal: customGoal,
            fitness_level: customFitnessLevel,
            preferences: customPreferences,
            health_conditions: [healthConditions],
            schedule: {
              days_per_week: parseInt(customDaysPerWeek),
              session_duration: parseInt(customSessionDuration)
            },
            plan_duration_weeks: parseInt(planDurationWeeks),
            custom_goals: customGoals.split(',').map(g => g.trim()),
            lang: customLang
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      setCustomResponse(data);
    } catch (error) {
      console.error('Error getting custom plan:', error);
      alert('Error getting custom plan. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFoodAnalysis = async () => {
    if (!apiKey || !foodImageUrl) {
      alert('Please enter your API key and image URL');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com/analyzeFoodPlate?noqueue=1&imageUrl=${encodeURIComponent(foodImageUrl)}&lang=${foodLang}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      setFoodResponse(data);
    } catch (error) {
      console.error('Error analyzing food:', error);
      alert('Error analyzing food. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Example requests and responses
  const examples: Record<TabType, {
    request: any;
    response: any;
  }> = {
    workout: {
      request: {
        goal: "Build muscle",
        fitness_level: "Intermediate",
        preferences: ["Weight training", "Cardio"],
        health_conditions: ["None"],
        schedule: {
          days_per_week: 4,
          session_duration: 60
        },
        plan_duration_weeks: 4,
        lang: "en"
      },
      response: {
        result: {
          goal: "Build muscle",
          fitness_level: "Intermediate",
          total_weeks: 4,
          schedule: {
            days_per_week: 4,
            session_duration: 60
          },
          exercises: [
            {
              day: "Monday",
              exercises: [
                {
                  name: "Bench Press",
                  duration: "15 minutes",
                  repetitions: "8-12",
                  sets: "4",
                  equipment: "Barbell"
                }
              ]
            }
          ]
        }
      }
    },
    exercise: {
      request: {
        exercise_name: "Bench Press",
        lang: "en"
      },
      response: {
        result: {
          exercise_name: "Bench Press",
          description: "The bench press is a popular weightlifting exercise...",
          primary_muscles: ["Pectoralis Major", "Triceps Brachii"],
          secondary_muscles: ["Deltoids", "Serratus Anterior"],
          equipment_needed: ["Barbell", "Weight Plates", "Bench"],
          instructions: [
            "Step 1: Lie flat on a bench...",
            "Step 2: Grip the barbell..."
          ]
        }
      }
    },
    nutrition: {
      request: {
        goal: "Lose weight",
        dietary_restrictions: ["Vegetarian"],
        current_weight: 80,
        target_weight: 70,
        daily_activity_level: "Moderate",
        lang: "en"
      },
      response: {
        result: {
          calories_per_day: 1800,
          macronutrients: {
            carbohydrates: "50%",
            proteins: "30%",
            fats: "20%"
          },
          meal_suggestions: [
            {
              meal: "Breakfast",
              suggestions: [
                {
                  name: "Spinach and Feta Omelette",
                  ingredients: ["2 eggs", "spinach", "feta cheese"],
                  calories: 350
                }
              ]
            }
          ]
        }
      }
    },
    custom: {
      request: {
        goal: "Improve overall fitness",
        fitness_level: "Intermediate",
        preferences: ["HIIT", "Yoga"],
        health_conditions: ["Lower back pain"],
        schedule: {
          days_per_week: 5,
          session_duration: 45
        },
        plan_duration_weeks: 6,
        custom_goals: ["Increase flexibility", "Improve core strength"],
        lang: "en"
      },
      response: {
        result: {
          goal: "Improve overall fitness",
          custom_goals: ["Increase flexibility", "Improve core strength"],
          fitness_level: "Intermediate",
          total_weeks: 6,
          schedule: {
            days_per_week: 5,
            session_duration: 45
          },
          exercises: [
            {
              day: "Monday",
              exercises: [
                {
                  name: "HIIT Circuit",
                  duration: "30 minutes",
                  repetitions: "AMRAP",
                  sets: "3",
                  equipment: "None"
                }
              ]
            }
          ]
        }
      }
    },
    food: {
      request: {
        image: "file or URL",
        lang: "en"
      },
      response: {
        result: {
          foods_identified: [
            {
              name: "Cheeseburger",
              portion_size: "1 burger",
              calories: "300",
              protein: "12g",
              carbs: "30g",
              fats: "15g"
            }
          ],
          total_nutrition: {
            total_calories: "300",
            total_protein: "12g",
            total_carbs: "30g",
            total_fats: "15g",
            fiber: "1g",
            vitamins_minerals: ["Calcium", "Iron", "Vitamin A"]
          },
          meal_analysis: {
            meal_type: "lunch",
            balance_score: "5",
            protein_ratio: "16%",
            carb_ratio: "40%",
            fat_ratio: "44%"
          }
        }
      }
    }
  };

  const renderExampleSection = () => (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Example Request
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-sm">
            {JSON.stringify(examples[activeTab].request, null, 2)}
          </pre>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Example Response
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-sm">
            {JSON.stringify(examples[activeTab].response, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* API Key Header */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-6 w-6" />
            API Authentication
          </CardTitle>
          <CardDescription>
            Enter your RapidAPI key to access the Workout Planner API
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Input
            type="password"
            placeholder="Enter your RapidAPI key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1"
          />
          <Button 
            variant="outline"
            onClick={() => window.open('https://rapidapi.com/ltdbilgisam/api/ai-workout-planner-exercise-fitness-nutrition-guide', '_blank')}
          >
            Get API Key
          </Button>
        </CardContent>
      </Card>

      {/* API Endpoints */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="workout" className="flex gap-2">
            <Dumbbell className="h-5 w-5" />
            Workout
          </TabsTrigger>
          <TabsTrigger value="exercise" className="flex gap-2">
            <ListChecks className="h-4 w-4" />
            Exercise Details
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="flex gap-2">
            <Salad className="h-4 w-4" />
            Nutrition
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex gap-2">
            <FileJson className="h-4 w-4" />
            Custom Plan
          </TabsTrigger>
          <TabsTrigger value="food" className="flex gap-2">
            <Camera className="h-4 w-4" />
            Food Analysis
          </TabsTrigger>
        </TabsList>

        {/* Workout Plan Tab */}
        <TabsContent value="workout">
          <Card>
            <CardHeader>
              <CardTitle>Generate Workout Plan</CardTitle>
              <CardDescription>Create a personalized workout plan based on your goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <LanguageSelect value={workoutLang} onChange={setWorkoutLang} />
                <div className="space-y-2">
                  <Label>Goal</Label>
                  <Select value={goal} onValueChange={setGoal}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Build muscle">Build Muscle</SelectItem>
                      <SelectItem value="Lose weight">Lose Weight</SelectItem>
                      <SelectItem value="Improve fitness">Improve Fitness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Fitness Level</Label>
                  <Select value={fitnessLevel} onValueChange={setFitnessLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Days per Week</Label>
                  <Input 
                    type="number" 
                    min="1" 
                    max="7" 
                    value={daysPerWeek}
                    onChange={(e) => setDaysPerWeek(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Session Duration (minutes)</Label>
                  <Input 
                    type="number" 
                    min="15" 
                    max="120" 
                    value={sessionDuration}
                    onChange={(e) => setSessionDuration(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preferences</Label>
                <div className="flex gap-2">
                  <Button 
                    variant={workoutPreferences.includes("Weight training") ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => togglePreference("Weight training")}
                  >
                    Weight Training
                  </Button>
                  <Button 
                    variant={workoutPreferences.includes("Cardio") ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => togglePreference("Cardio")}
                  >
                    Cardio
                  </Button>
                  <Button 
                    variant={workoutPreferences.includes("HIIT") ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => togglePreference("HIIT")}
                  >
                    HIIT
                  </Button>
                </div>
              </div>

              <Button 
                className="w-full" 
                onClick={handleGenerateWorkoutPlan}
                disabled={loading || !apiKey}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Generating Plan...
                  </>
                ) : "Generate Plan"}
              </Button>
            </CardContent>
          </Card>

          {workoutResponse ? (
            <WorkoutPlanResponse response={workoutResponse} />
          ) : renderExampleSection()}
        </TabsContent>

        {/* Exercise Details Tab */}
        <TabsContent value="exercise">
          <Card>
            <CardHeader>
              <CardTitle>Exercise Details</CardTitle>
              <CardDescription>Get detailed information about specific exercises</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <LanguageSelect value={exerciseLang} onChange={setExerciseLang} />
              <div className="space-y-2">
                <Label>Exercise Name</Label>
                <Input 
                  placeholder="Enter exercise name (e.g., Bench Press)" 
                  value={exerciseName}
                  onChange={(e) => setExerciseName(e.target.value)}
                />
              </div>
              <Button 
                className="w-full"
                onClick={handleExerciseDetails}
                disabled={loading || !apiKey}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Getting Details...
                  </>
                ) : "Get Details"}
              </Button>
            </CardContent>
          </Card>

          {exerciseResponse ? (
            <ExerciseDetailsResponse response={exerciseResponse} />
          ) : renderExampleSection()}
        </TabsContent>

        {/* Nutrition Tab */}
        <TabsContent value="nutrition">
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Advice</CardTitle>
              <CardDescription>Get personalized nutrition recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <LanguageSelect value={nutritionLang} onChange={setNutritionLang} />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Goal</Label>
                  <Select value={nutritionGoal} onValueChange={setNutritionGoal}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lose weight">Lose Weight</SelectItem>
                      <SelectItem value="Gain weight">Gain Weight</SelectItem>
                      <SelectItem value="Maintain weight">Maintain Weight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Dietary Restrictions</Label>
                  <Select 
                    value={dietaryRestrictions[0]} 
                    onValueChange={(value) => setDietaryRestrictions([value])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select restrictions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="Vegan">Vegan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Current Weight (kg)</Label>
                  <Input 
                    type="number" 
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Target Weight (kg)</Label>
                  <Input 
                    type="number" 
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Activity Level</Label>
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sedentary">Sedentary</SelectItem>
                      <SelectItem value="Light">Light Activity</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="Active">Very Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button 
                className="w-full"
                onClick={handleNutritionAdvice}
                disabled={loading || !apiKey}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Getting Nutrition Plan...
                  </>
                ) : "Get Nutrition Plan"}
              </Button>
            </CardContent>
          </Card>

          {nutritionResponse ? (
            <NutritionAdviceResponse response={nutritionResponse} />
          ) : renderExampleSection()}
        </TabsContent>

        {/* Custom Plan Tab */}
        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Custom Workout Plan</CardTitle>
              <CardDescription>Create a highly customized workout plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <LanguageSelect value={customLang} onChange={setCustomLang} />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Goal</Label>
                  <Select value={customGoal} onValueChange={setCustomGoal}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Improve overall fitness">Improve Overall Fitness</SelectItem>
                      <SelectItem value="Build strength">Build Strength</SelectItem>
                      <SelectItem value="Increase endurance">Increase Endurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Fitness Level</Label>
                  <Select value={customFitnessLevel} onValueChange={setCustomFitnessLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Days per Week</Label>
                  <Input 
                    type="number" 
                    min="1" 
                    max="7" 
                    value={customDaysPerWeek}
                    onChange={(e) => setCustomDaysPerWeek(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Session Duration (minutes)</Label>
                  <Input 
                    type="number" 
                    min="15" 
                    max="120" 
                    value={customSessionDuration}
                    onChange={(e) => setCustomSessionDuration(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Plan Duration (weeks)</Label>
                  <Input 
                    type="number" 
                    min="1" 
                    max="12" 
                    value={planDurationWeeks}
                    onChange={(e) => setPlanDurationWeeks(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Custom Goals (comma-separated)</Label>
                <Input 
                  placeholder="E.g., Increase flexibility, Improve core strength"
                  value={customGoals}
                  onChange={(e) => setCustomGoals(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Health Conditions</Label>
                <Input 
                  placeholder="E.g., Lower back pain"
                  value={healthConditions}
                  onChange={(e) => setHealthConditions(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Preferences</Label>
                <div className="flex gap-2">
                  <Button 
                    variant={customPreferences.includes("HIIT") ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setCustomPreferences(prev => 
                      prev.includes("HIIT") ? prev.filter(p => p !== "HIIT") : [...prev, "HIIT"]
                    )}
                  >
                    HIIT
                  </Button>
                  <Button 
                    variant={customPreferences.includes("Yoga") ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setCustomPreferences(prev => 
                      prev.includes("Yoga") ? prev.filter(p => p !== "Yoga") : [...prev, "Yoga"]
                    )}
                  >
                    Yoga
                  </Button>
                </div>
              </div>
              <Button 
                className="w-full"
                onClick={handleCustomPlan}
                disabled={loading || !apiKey}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Creating Custom Plan...
                  </>
                ) : "Create Custom Plan"}
              </Button>
            </CardContent>
          </Card>

          {customResponse ? (
            <CustomPlanResponse response={customResponse} />
          ) : renderExampleSection()}
        </TabsContent>

        {/* Food Analysis Tab */}
        <TabsContent value="food">
          <Card>
            <CardHeader>
              <CardTitle>Analyze Food Plate</CardTitle>
              <CardDescription>Upload an image of your meal for analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <LanguageSelect value={foodLang} onChange={setFoodLang} />
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input 
                  placeholder="Enter image URL"
                  value={foodImageUrl}
                  onChange={(e) => setFoodImageUrl(e.target.value)}
                />
              </div>
              <Button 
                className="w-full"
                onClick={handleFoodAnalysis}
                disabled={loading || !apiKey || !foodImageUrl}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Analyzing Food...
                  </>
                ) : "Analyze Food"}
              </Button>
            </CardContent>
          </Card>

          {foodResponse ? (
            <FoodAnalysisResponse response={foodResponse} />
          ) : renderExampleSection()}
        </TabsContent>
      </Tabs>

      {/* API Documentation Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>Base URL: https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Endpoints</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-100 rounded-lg">
                  <p className="font-mono text-sm">POST /generateWorkoutPlan</p>
                  <p className="text-sm text-gray-600 mt-1">Generate a personalized workout plan</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <p className="font-mono text-sm">POST /exerciseDetails</p>
                  <p className="text-sm text-gray-600 mt-1">Get detailed exercise information</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <p className="font-mono text-sm">POST /nutritionAdvice</p>
                  <p className="text-sm text-gray-600 mt-1">Get nutrition recommendations</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <p className="font-mono text-sm">POST /customWorkoutPlan</p>
                  <p className="text-sm text-gray-600 mt-1">Create a custom workout plan</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <p className="font-mono text-sm">POST /analyzeFoodPlate</p>
                  <p className="text-sm text-gray-600 mt-1">Analyze food plate nutrition</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Common Headers</h3>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm">
{`{
  "Content-Type": "application/json",
  "X-RapidAPI-Key": "your-api-key-here"
}`}
              </pre>
            </div>

            <Alert>
              <AlertDescription>
                All endpoints support the 'lang' parameter for multilingual responses (e.g., "en", "tr")
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutPlannerAPI;