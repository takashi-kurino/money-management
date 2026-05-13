
import Link from "next/link";
import { getUserName } from "../actions";

export default async function UserName() {

  const user = await getUserName();

  return (
    <div>
      {user ? (
        <div>
          <p>{user}</p>
        </div>
      ) : (
        <p><Link href="/login">login</Link></p>
      )}
      
    </div>
  )
}