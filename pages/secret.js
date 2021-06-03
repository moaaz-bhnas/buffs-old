import { useSession } from "next-auth/client";
import { memo, useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div``;

const Secret = () => {
  const [session, loading] = useSession();
  const [content, setContent] = useState("");

  useEffect(
    async function fetchData() {
      const res = await fetch("/api/secret");
      const json = await res.json();

      if (json.content) {
        setContent(json.content);
      }
    },
    [session]
  );

  if (typeof window !== "undefined" && loading) return null;

  return <Container>{session ? content : "sign in first"}</Container>;
};

export default memo(Secret);
