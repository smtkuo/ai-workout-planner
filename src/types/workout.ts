export interface WorkoutPlan {
    goal: string;
    fitness_level: string;
    preferences: string[];
    health_conditions: string[];
    schedule: {
      days_per_week: number;
      session_duration: number;
    };
    plan_duration_weeks: number;
    lang: string;
  }
  
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
  
  export interface WorkoutResponse {
    result: {
      goal: string;
      fitness_level: string;
      total_weeks: number;
      schedule: {
        days_per_week: number;
        session_duration: number;
      };
      exercises: DayExercises[];
    };
  }
  
  export interface ApiExample {
    request: any;
    response: any;
  }
  
  export interface Examples {
    [key: string]: ApiExample;
  }