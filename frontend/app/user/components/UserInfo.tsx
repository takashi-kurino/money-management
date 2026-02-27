
'use client';

import { useUser } from '../hooks/useUserInfo';
import { Skeleton } from '@/components/ui/skeleton'

type User = {
  id: string;
  username: string;
  email: string;
  fast_name: string;
  last_name: string;
};

export default function UserInfo() {

  const { user, loading, error } = useUser() as {
    user: User | null;
    loading: boolean;
    error: string | null;
  };

  if (loading) return(
    <div className="flex items-center space-x-4">
      {/* <Skeleton className="h-12 w-12 rounded-full" /> */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )

  if (error) return(
    <p>再ログインしてください</p>
  )

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user ? (
        <div>
          <p>ユーザー: {user.username}</p>
          <p>メール:{user.email}</p>
          <p>first_name:{user.fast_name}</p>
          <p>last_name:{user.last_name}</p>
        </div>
      ) : (
        !error && <p>読み込み中...</p>
      )}
      
    </div>
  )
}