import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { memo } from "react";
import styled from "styled-components";
import { rawButton } from "../../utils/style";

const StyledButton = styled.button`
  ${rawButton}

  width: 3rem;
  height: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.75rem;
`;

const Button = () => {
  const router = useRouter();

  return (
    <StyledButton
      type="button"
      aria-label="go back"
      onClick={() => {
        router.back();
      }}
    >
      <Image
        src="/images/return.svg"
        alt="go back"
        width={20}
        height={20}
        layout="fixed"
        quality={100}
        priority={true}
      />
    </StyledButton>
  );
};

export default memo(Button);
