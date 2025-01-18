import dynamic from 'next/dynamic'

const WorkoutPlannerAPI = dynamic(
  () => import('@/components/workout-planner/workout-planner-api'),
  { ssr: false }
)

export default function Home() {
  return (
    <main>
      <WorkoutPlannerAPI />
    </main>
  )
}