'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, ThumbsUp, Send, Search, Flame, Clock, TrendingUp, User } from 'lucide-react'

interface Post {
  id: number
  author: string
  content: string
  likes: number
  comments: number
  timestamp: string
  topic: string
}

export default function EnhancedCommunitySection() {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, author: "JohnDoe", content: "Just completed a 30-day posture challenge!", likes: 15, comments: 3, timestamp: "2h ago", topic: "Challenge" },
    { id: 2, author: "FitnessGuru", content: "Top 3 exercises for better posture: Planks, Cat-Cow, and Bird Dog", likes: 23, comments: 5, timestamp: "4h ago", topic: "Tips" },
    { id: 3, author: "PosturePro", content: "Remember: Good posture is not just about looking good, it's about feeling good too!", likes: 42, comments: 7, timestamp: "1d ago", topic: "Motivation" },
    { id: 4, author: "BackPainWarrior", content: "How I overcame chronic back pain with daily stretching routines", likes: 38, comments: 12, timestamp: "2d ago", topic: "Success Story" },
    { id: 5, author: "ErgoExpert", content: "Ergonomic desk setup tips for better posture during long work hours", likes: 29, comments: 8, timestamp: "3d ago", topic: "Workplace" },
  ])
  const [newPost, setNewPost] = useState("")
  const [sortOption, setSortOption] = useState("hot")
  const [searchQuery, setSearchQuery] = useState("")

  const addPost = () => {
    if (newPost.trim()) {
      setPosts([
        { 
          id: posts.length + 1, 
          author: "You", 
          content: newPost, 
          likes: 0, 
          comments: 0, 
          timestamp: "Just now", 
          topic: "General"
        },
        ...posts
      ])
      setNewPost("")
    }
  }

  const likePost = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  const sortPosts = (posts: Post[]) => {
    switch (sortOption) {
      case "hot":
        return [...posts].sort((a, b) => b.likes + b.comments - (a.likes + a.comments))
      case "newest":
        return [...posts].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      case "oldest":
        return [...posts].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      case "mostVotes":
        return [...posts].sort((a, b) => b.likes - a.likes)
      default:
        return posts
    }
  }

  const filteredPosts = sortPosts(posts.filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.topic.toLowerCase().includes(searchQuery.toLowerCase())
  ))

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <MessageCircle className="w-6 h-6 mr-2" />
          LockedIN Community
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input 
              placeholder="Share your thoughts..." 
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={addPost}>
              <Send className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search topics or comments" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hot">
                  <div className="flex items-center">
                    <Flame className="w-4 h-4 mr-2" />
                    Hot
                  </div>
                </SelectItem>
                <SelectItem value="newest">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Newest
                  </div>
                </SelectItem>
                <SelectItem value="oldest">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Oldest
                  </div>
                </SelectItem>
                <SelectItem value="mostVotes">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Most Votes
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredPosts.map(post => (
            <Card key={post.id} className="bg-muted">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <User className="w-6 h-6 mr-2" />
                    <span className="font-semibold">{post.author}</span>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="rounded-full px-3 py-1 bg-primary/10 hover:bg-primary/20 text-xs"
                  >
                    {post.topic}
                  </Badge>
                </div>
                <p className="text-sm mb-2">{post.content}</p>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" onClick={() => likePost(post.id)}>
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {post.likes}
                    </Button>
                    <span className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.comments}
                    </span>
                  </div>
                  <span>{post.timestamp}</span>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" className="w-full">
            View All Posts
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}