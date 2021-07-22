import { useSession } from "next-auth/client";
import Image from "next/image";
import { memo } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const activeStyle = css`
  padding: 0.1em;
  border: 1px solid ${({ theme }) => theme.border.dark};
`;

const Container = styled.div`
  ${({ active }) => active && activeStyle}
  display: flex;
  border-radius: 50%;

  .header__avatar {
    border-radius: 50%;
  }
`;

const Avatar = ({ active = false }) => {
  const [session, loading] = useSession();

  const { user } = session;

  return (
    <Container active={active}>
      <Image
        className="header__avatar"
        src={user.image}
        alt="Buffs logo"
        width={22}
        height={22}
        layout="fixed"
        quality={100}
        priority={true}
      />
    </Container>
  );
};

Avatar.propTypes = {
  active: PropTypes.bool,
};

export default memo(Avatar);
