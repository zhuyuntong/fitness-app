'use client'

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { 
  ChevronLeft, Activity, Clock, Gauge, Camera, 
  CheckCircle2, AlertCircle, ChevronDown, ChevronUp,
  Trophy, Target, Play, Rewind, FastForward, Volume2, Medal, Zap, Star, Dumbbell, Calendar, Pause, RotateCcw
} from 'lucide-react'
import Link from "next/link"
import { useRouter, useSearchParams } from 'next/navigation'
import AROverlay from "./ar-overlay"
import ExercisePostureTips from "./exercise-posture-tips"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WearableIntegration from "./wearable-integration"
import CommunityBoard from "./community-board"
// import VirtualCoach from "./virtual-coach"
// import PostureChallenges from "./posture-challenges"
// import VideoPlayback from "./video-playback"
// import PersonalizedWorkoutPlan from "./personalized-workout-plan"
// import GamificationWidget from "./gamification-widget"
// import { cn } from "@/lib/utils"

// Add type for feedback messages
type FeedbackMessage = {
  type: 'warning' | 'success' | 'info';
  message: string;
}

// Add status type
type PostureStatus = 'good' | 'needsImprovement';

// Function to determine posture status
const getPostureStatus = (angle: number, threshold: number): PostureStatus => {
  return angle <= threshold ? 'good' : 'needsImprovement';
};

// Update the grid display with dynamic status
const PostureAngleCard = ({ 
  label, 
  angle, 
  threshold 
}: { 
  label: string; 
  angle: number; 
  threshold: number; 
}) => {
  const status = getPostureStatus(angle, threshold);
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="text-sm font-medium">{label}</div>
      <div className="text-2xl font-bold">{angle}°</div>
      <div className={`text-sm ${
        status === 'good' ? 'text-green-500' : 'text-yellow-500'
      }`}>
        {status === 'good' ? 'Good' : 'Needs Improvement'}
      </div>
    </div>
  );
};

export default function WorkoutDetails() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const workoutType = searchParams.get('type') || 'Full Body'
  const selectedTime = searchParams.get('time') || '10'
  const selectedIntensity = searchParams.get('intensity') || 'Medium'

  // New state for posture monitoring
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [postureScore, setPostureScore] = useState(70)
  const [neckAngle, setNeckAngle] = useState(12)
  const [backAngle, setBackAngle] = useState(8)
  const [feedbackMessages, setFeedbackMessages] = useState<FeedbackMessage[]>([
    { type: 'success', message: 'Great job! Your back angle is perfect.' },
    { type: 'warning', message: 'Try to keep your neck slightly more upright.' },
    { type: 'info', message: 'You\'ve maintained good posture for 5 minutes!' },
  ])

  // Add new state variables after the existing ones
  const [voiceGuidanceEnabled, setVoiceGuidanceEnabled] = useState(false)
  const [neckAngleThreshold, setNeckAngleThreshold] = useState(15)
  const [backAngleThreshold, setBackAngleThreshold] = useState(10)
  const [arOverlayEnabled, setArOverlayEnabled] = useState(false)
  // const [timeInGoodPosture, setTimeInGoodPosture] = useState(0)
  const speechSynthesis = useRef<SpeechSynthesis | null>(null)

  const exercisesByType = {
    'Full Body': [
      { name: "Bench Press", sets: 4 },
      { name: "Shoulder", sets: 4 },
      { name: "Back", sets: 4 },
    ],
    'HIIT': [
      { name: "Burpees", sets: 4 },
      { name: "High Knees", sets: 4 },
      { name: "Mountain Climber", sets: 4 },
    ],
    'Cardio': [
      { name: "Running", sets: 4 },
      { name: "Jump Rope", sets: 4 },
      { name: "Jumping Jack", sets: 4 },
    ],
    'Stretching': [
      { name: "Ballistic", sets: 4 },
      { name: "Passive", sets: 4 },
      { name: "Active", sets: 4 },
    ],
  }

  const currentExercises = exercisesByType[workoutType as keyof typeof exercisesByType]

  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const seekForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10
    }
  }

  const seekBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10
    }
  }

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring)
    // In a real implementation, this would initialize camera and ML model
  }

  const handleExerciseClick = (exerciseName: string) => {
    router.push(`/video-library?exercise=${encodeURIComponent(exerciseName)}`)
  }

  // New function to add feedback messages
  // const addFeedbackMessage = (type: 'success' | 'warning' | 'info', message: string) => {
  //   setFeedbackMessages(prev => [{type, message}, ...prev].slice(0, 4))
  // }

  // Initialize speechSynthesis after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      speechSynthesis.current = window.speechSynthesis
    }
  }, [])

  // Wrap speakFeedback in useCallback
  const speakFeedback = useCallback((message: string) => {
    if (voiceGuidanceEnabled && speechSynthesis.current) {
      const utterance = new SpeechSynthesisUtterance(message);
      speechSynthesis.current.speak(utterance);
    }
  }, [voiceGuidanceEnabled]);

  // Enhanced feedback generation
  const updateFeedback = useCallback((neck: number, back: number) => {
    const newMessages: FeedbackMessage[] = [];
    
    // Posture-specific feedback
    if (neck > neckAngleThreshold) {
      newMessages.push({ 
        type: 'warning', 
        message: neck > neckAngleThreshold + 5 
          ? 'Your neck is significantly tilted. Try to align it with your spine.' 
          : 'Try to keep your neck slightly more upright.' 
      });
    }
    
    if (back > backAngleThreshold) {
      newMessages.push({ 
        type: 'warning', 
        message: back > backAngleThreshold + 5 
          ? 'Your back needs significant adjustment. Focus on straightening it.' 
          : 'Please maintain a straighter back position.' 
      });
    }

    // Milestone and encouragement messages
    if (neck <= neckAngleThreshold && back <= backAngleThreshold) {
      newMessages.push({ type: 'success', message: 'Great job! Your posture is perfect.' });
    }

    // Add milestone messages periodically
    if (Math.random() < 0.1) { // 10% chance each update
      newMessages.push({ 
        type: 'info', 
        message: 'Remember: Take short breaks every 30 minutes!' 
      });
    }

    // Calculate score
    const score = Math.round(Math.max(0, 100 - (neck + back) * 2));
    setPostureScore(Math.min(100, score));
    
    setFeedbackMessages(prev => [...newMessages, ...prev].slice(0, 4));
  }, [neckAngleThreshold, backAngleThreshold]);

  // More realistic angle updates
  const updatePostureAngles = () => {
    setNeckAngle(prev => {
      const change = (Math.random() - 0.5) * 1.5; // Smaller, more realistic changes
      const newValue = prev + change;
      return Number(Math.min(Math.max(0, newValue), 30).toFixed(1)); // Clamp between 0-30
    });
    
    setBackAngle(prev => {
      const change = (Math.random() - 0.5) * 1.5;
      const newValue = prev + change;
      return Number(Math.min(Math.max(0, newValue), 30).toFixed(1));
    });
  };

  // Update useEffect with updateFeedback dependency
  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        updatePostureAngles();
        updateFeedback(neckAngle, backAngle);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isMonitoring, neckAngle, backAngle, updateFeedback]);

  // Update voice guidance effect with speakFeedback dependency
  useEffect(() => {
    if (isMonitoring && voiceGuidanceEnabled && speechSynthesis.current) {
      const interval = setInterval(() => {
        if (neckAngle > neckAngleThreshold) {
          speakFeedback("Please adjust your neck position");
        }
        if (backAngle > backAngleThreshold) {
          speakFeedback("Remember to maintain a straight back");
        }
        if (neckAngle <= neckAngleThreshold && backAngle <= backAngleThreshold) {
          speakFeedback("Great job maintaining good posture");
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isMonitoring, voiceGuidanceEnabled, neckAngle, backAngle, neckAngleThreshold, backAngleThreshold, speakFeedback]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-md mx-auto p-4 space-y-6">
        <header className="flex items-center mb-6">
          <Link href="/available-equipment" className="mr-4">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">{workoutType}</h1>
        </header>

        {/* Live monitoring overlay */}
        {isMonitoring && (
          <div className="fixed top-0 left-0 right-0 bg-black/10 backdrop-blur-sm p-4 z-10">
            <div className="max-w-md mx-auto">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold">Live Posture Feedback</h2>
                    <div className="flex items-center space-x-2">
                      {postureScore > 70 ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                      )}
                      <span className="font-bold">{postureScore}%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Neck Angle</span>
                      <span className={neckAngle < 15 ? "text-green-500" : "text-yellow-500"}>
                        {neckAngle}°
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Back Angle</span>
                      <span className={backAngle < 10 ? "text-green-500" : "text-yellow-500"}>
                        {backAngle}°
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        <Tabs defaultValue="workout" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="workout">Workout</TabsTrigger>
            <TabsTrigger value="posture" className="flex items-center gap-1">
              Posture
              <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="workout" className="space-y-6">
            {/* Workout time and intensity indicators */}
            <div className="flex space-x-4">
              <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm">
                <Clock className="mr-2 h-4 w-4" />
                {selectedTime}.00 mins
              </div>
              <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm">
                <Gauge className="mr-2 h-4 w-4" />
                {selectedIntensity} Intensity
              </div>
            </div>

            {/* Exercise list */}
            <div className="space-y-6">
              {currentExercises.map((exercise, index) => (
                <button 
                  key={index} 
                  className="w-full flex items-center space-x-4"
                  onClick={() => handleExerciseClick(exercise.name)}
                >
                  <div className="w-12 h-12 bg-black rounded-full flex-shrink-0" />
                  <div className="text-left">
                    <h2 className="font-semibold text-lg">{exercise.name}</h2>
                    <p className="text-gray-500">Sets {exercise.sets}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Exercise posture tips */}
            <ExercisePostureTips exercise={currentExercises[0].name} />

            {/* Wearable Integration */}
            <WearableIntegration />

            {/* Posture Monitoring Card */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center justify-between w-full"
                >
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <div className="flex items-center space-x-2">
                      <h2 className="font-semibold">Posture Monitoring</h2>
                      <svg className="w-5 h-5 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>

                {isExpanded && (
                  <div className="space-y-4">
                    <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      {!isMonitoring && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Camera className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      {isMonitoring && arOverlayEnabled && (
                        <AROverlay 
                          neckAngle={neckAngle} 
                          backAngle={backAngle}
                          neckThreshold={neckAngleThreshold}
                          backThreshold={backAngleThreshold}
                        />
                      )}
                    </div>
                    
                    {/* Add voice guidance and AR controls */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Voice Guidance</span>
                        <Switch
                          checked={voiceGuidanceEnabled}
                          onCheckedChange={setVoiceGuidanceEnabled}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">AR Overlay</span>
                        <Switch
                          checked={arOverlayEnabled}
                          onCheckedChange={setArOverlayEnabled}
                        />
                      </div>
                    </div>

                    {/* Add angle thresholds */}
                    <div className="space-y-2">
                      <span className="text-sm font-medium">Neck Angle Threshold ({neckAngleThreshold}°)</span>
                      <Slider
                        min={5}
                        max={25}
                        step={1}
                        value={[neckAngleThreshold]}
                        onValueChange={(value) => setNeckAngleThreshold(value[0])}
                      />
                      <p className="text-xs text-muted-foreground">
                        Recommended: 10-15 degrees
                      </p>
                      
                      <span className="text-sm font-medium">Back Angle Threshold ({backAngleThreshold}°)</span>
                      <Slider
                        min={5}
                        max={20}
                        step={1}
                        value={[backAngleThreshold]}
                        onValueChange={(value) => setBackAngleThreshold(value[0])}
                      />
                      <p className="text-xs text-muted-foreground">
                        Recommended: 8-12 degrees
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Overall Posture Score</span>
                        <span className="text-sm font-bold">{postureScore}%</span>
                      </div>
                      <Progress value={postureScore} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <PostureAngleCard 
                        label="Neck Angle" 
                        angle={neckAngle} 
                        threshold={neckAngleThreshold} 
                      />
                      <PostureAngleCard 
                        label="Back Angle" 
                        angle={backAngle} 
                        threshold={backAngleThreshold} 
                      />
                    </div>

                    <Button 
                      onClick={toggleMonitoring}
                      className="w-full font-bold text-lg"
                      variant={isMonitoring ? "destructive" : "default"}
                    >
                      {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
                    </Button>

                    <div className="flex items-center gap-2 text-muted-foreground mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <p className="text-sm">
                        {isMonitoring 
                          ? "Press stop to end monitoring your posture"
                          : "Press start to begin monitoring your posture"
                        }
                      </p>
                    </div>

                    {isMonitoring && (
                      <div className="mt-4">
                        <h3 className="font-semibold mb-2">Real-time Feedback</h3>
                        <div className="h-32 overflow-y-auto bg-gray-50 rounded-lg p-3 space-y-2">
                          {feedbackMessages.map((msg, index) => (
                            <p key={index} className="text-sm">
                              <span className={`font-medium ${
                                msg.type === 'success' ? 'text-green-500' :
                                msg.type === 'warning' ? 'text-yellow-500' :
                                'text-blue-500'
                              }`}>
                                {msg.type === 'success' ? 'Great job!' :
                                 msg.type === 'warning' ? 'Tip:' :
                                 'Info:'}
                              </span>
                              {' '}{msg.message}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posture" className="space-y-6">
            {/* Workout Playback */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Workout Playback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg mb-4 relative">
                  <video 
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    src="/placeholder-workout-video.mp4"
                  />
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <Button variant="ghost" size="icon" className="h-12 w-12" onClick={togglePlay}>
                        <Play className="h-8 w-8" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Duration</span>
                    <span className="font-medium">15:30</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="icon" onClick={seekBackward}>
                      <Rewind className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={togglePlay}>
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={restartVideo}>
                      <RotateCcw className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={seekForward}>
                      <FastForward className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Volume2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personalized Workout Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5" />
                  Personalized Workout Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Plan:</p>
                      <p className="font-medium">Posture Improvement Plan</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Duration:</p>
                      <p className="font-medium">4 weeks</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Focus:</p>
                      <p className="font-medium">Core strength and flexibility</p>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Full Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posture Challenges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Active Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Perfect Posture Week</p>
                      <span className="text-sm text-green-500">57%</span>
                    </div>
                    <Progress value={57} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      Maintain good posture for 7 days straight
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Core Strength Builder</p>
                      <span className="text-sm text-yellow-500">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      Complete 50 core exercises this week
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Flexibility Master</p>
                      <span className="text-sm text-green-500">80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      Do 15 minutes of stretching daily for 5 days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posture Master (Gamification) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Posture Master
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Level 8</p>
                      <p className="text-sm text-muted-foreground">70 / 80 points</p>
                    </div>
                    <Trophy className="h-6 w-6 text-yellow-500" />
                  </div>
                  <Progress value={87.5} className="h-2" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <Medal className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-sm text-center">Perfect Week</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <Zap className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-sm text-center">Quick Learner</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <Star className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-sm text-center">Top Form</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community">
            <CommunityBoard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}