import styled from "styled-components";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Home() {
  const [session, loading] = useSession();

  return (
    <>
      {session ? (
        <button onClick={signOut}>signout</button>
      ) : (
        <button onClick={signIn}>signin</button>
      )}
    </>
  );
}
