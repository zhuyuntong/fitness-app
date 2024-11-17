// 'use client'

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { Home, Activity, Smartphone, ChevronLeft, Trophy, Target, Clock, Calendar, ChevronRight } from 'lucide-react'
// import Link from "next/link"
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// // Simulated data for the chart
// const postureData = [
//   { date: '2023-06-01', score: 65 },
//   { date: '2023-06-08', score: 68 },
//   { date: '2023-06-15', score: 72 },
//   { date: '2023-06-22', score: 75 },
//   { date: '2023-06-29', score: 80 },
//   { date: '2023-07-06', score: 82 },
//   { date: '2023-07-13', score: 85 },
// ]

// export default function PostureDashboard() {
//   const [currentPostureScore, setCurrentPostureScore] = useState(85)
//   const [postureGoal, setPostureGoal] = useState(90)
//   const [timeInGoodPosture, setTimeInGoodPosture] = useState(7200) // in seconds

//   const formatTime = (seconds: number) => {
//     const hours = Math.floor(seconds / 3600)
//     const minutes = Math.floor((seconds % 3600) / 60)
//     return `${hours}h ${minutes}m`
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-14 items-center">
//           <Link href="/dashboard" className="mr-4">
//             <ChevronLeft className="h-6 w-6" />
//           </Link>
//           <h1 className="text-xl font-semibold">Posture Health</h1>
//         </div>
//       </header>

//       <main className="container max-w-md mx-auto p-4 space-y-6">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Current Posture Score</CardTitle>
//             <Trophy className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{currentPostureScore}%</div>
//             <Progress
//               value={(currentPostureScore / postureGoal) * 100}
//               className="h-2 mt-2"
//             />
//             <p className="text-xs text-muted-foreground mt-2">
//               {postureGoal - currentPostureScore}% to reach your goal
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Posture Trend</CardTitle>
//             <Calendar className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="h-[200px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={postureData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="score" stroke="#8884d8" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="grid grid-cols-2 gap-4">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Posture Goal</CardTitle>
//               <Target className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{postureGoal}%</div>
//               <p className="text-xs text-muted-foreground mt-2">
//                 Adjust in settings
//               </p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Good Posture Time</CardTitle>
//               <Clock className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{formatTime(timeInGoodPosture)}</div>
//               <p className="text-xs text-muted-foreground mt-2">
//                 This week
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Recent Workouts</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {['Yoga', 'Strength Training', 'Stretching'].map((workout, index) => (
//                 <div key={index} className="flex justify-between items-center">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
//                       <Activity className="h-5 w-5 text-primary" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium">{workout}</p>
//                       <p className="text-xs text-muted-foreground">2 days ago</p>
//                     </div>
//                   </div>
//                   <ChevronRight className="h-5 w-5 text-muted-foreground" />
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         <div className="flex space-x-4">
//           <Button className="flex-1">Start Monitoring</Button>
//           <Button variant="outline" className="flex-1">View Tips</Button>
//         </div>

//         <nav className="fixed bottom-0 left-0 right-0 border-t bg-background">
//           <div className="container max-w-md mx-auto">
//             <div className="grid grid-cols-3 py-2">
//               <Link 
//                 href="/home"
//                 className="flex flex-col items-center justify-center py-2 text-muted-foreground hover:text-primary"
//               >
//                 <Home className="h-6 w-6" />
//                 <span className="text-xs">Home</span>
//               </Link>
//               <Link 
//                 href="/activity"
//                 className="flex flex-col items-center justify-center py-2 text-muted-foreground hover:text-primary"
//               >
//                 <Activity className="h-6 w-6" />
//                 <span className="text-xs">Activity</span>
//               </Link>
//               <Link 
//                 href="/posture"
//                 className="flex flex-col items-center justify-center py-2 text-primary"
//               >
//                 <Smartphone className="h-6 w-6" />
//                 <span className="text-xs">Posture</span>
//               </Link>
//             </div>
//           </div>
//         </nav>
//       </main>
//     </div>
//   )
// }