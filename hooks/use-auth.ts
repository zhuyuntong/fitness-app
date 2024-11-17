import { useState} from 'react'

interface User {
  name: string
  email: string
  image?: string
}

const DEFAULT_USER: User = {
  name: "John Zhu",
  email: "kakava@umich.edu",
  image: undefined // 如果有头像图片可以在这里添加URL
}

export function useAuth() {
  const [user] = useState<User>(DEFAULT_USER) // 直接使用默认用户

  const logout = () => {
    window.location.href = '/'
  }

  return { user, logout }
} 