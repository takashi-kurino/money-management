
'use client';

import { useUser } from '../hooks/useUserName';
import Link from "next/link";

type User = {
  username: string;
};

export default function UserName() {

  const { user, loading, error } = useUser() as {
    user: User | null;
    loading: boolean;
    error: string | null;
  };

  if (loading) return(
    <div className="flex items-center space-x-4">
      loading
    </div>
  )

  return (
    <div>
      {error && <p><Link href="/login">login</Link></p>}
      {user ? (
        <div>
          <p><Link href="/settings">{user.username}</Link></p>
        </div>
      ) : (
        !error && <p><Link href="/login">login</Link></p>
      )}
      
    </div>
  )
}