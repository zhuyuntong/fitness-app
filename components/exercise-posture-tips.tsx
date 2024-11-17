interface ExercisePostureTipsProps {
    exercise: string
  }
  
  export default function ExercisePostureTips({ exercise }: ExercisePostureTipsProps) {
    const tips: Record<string, string[]> = {
      "Bench Press": [
        "Keep your back flat against the bench",
        "Maintain proper grip width",
        "Control the bar path",
      ],
      "Shoulder": [
        "Keep your core engaged",
        "Maintain neutral spine",
        "Control the movement",
      ],
      "Back": [
        "Maintain proper form throughout",
        "Keep your core tight",
        "Focus on muscle engagement",
      ],
      // ... add more exercises as needed
    }
  
    // If no tips exist for this exercise, return default tips
    const defaultTips = [
      "Maintain proper form",
      "Keep your core engaged",
      "Breathe steadily",
    ]
  
    const exerciseTips = tips[exercise] || defaultTips
  
    return (
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Posture Tips for {exercise}</h3>
        <ul className="list-disc pl-5 space-y-1">
          {exerciseTips.map((tip, index) => (
            <li key={index} className="text-sm">{tip}</li>
          ))}
        </ul>
      </div>
    )
  }