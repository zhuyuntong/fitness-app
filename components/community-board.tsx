import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, ThumbsUp, Send } from 'lucide-react'
import { Input } from "@/components/ui/input"

interface Post {
  id: number
  author: string
  content: string
  likes: number
}

export default function CommunityBoard() {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, author: "JohnDoe", content: "Just completed a 30-day posture challenge!", likes: 15 },
    { id: 2, author: "FitnessGuru", content: "Top 3 exercises for better posture: Planks, Cat-Cow, and Bird Dog", likes: 23 },
    { id: 3, author: "PosturePro", content: "Remember: Good posture is not just about looking good, it's about feeling good too!", likes: 42 },
  ])
  const [newPost, setNewPost] = useState("")

  const addPost = () => {
    if (newPost.trim()) {
      setPosts([
        { id: posts.length + 1, author: "You", content: newPost, likes: 0 },
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          Community Board
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input 
              placeholder="Share your thoughts..." 
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <Button onClick={addPost}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          {posts.map(post => (
            <div key={post.id} className="bg-gray-100 p-3 rounded">
              <p className="font-semibold">{post.author}</p>
              <p className="text-sm mb-2">{post.content}</p>
              <Button variant="ghost" size="sm" onClick={() => likePost(post.id)}>
                <ThumbsUp className="w-4 h-4 mr-1" />
                {post.likes}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}