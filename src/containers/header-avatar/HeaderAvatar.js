import { useSession } from "next-auth/client";
import Image from "next/image";
import { memo } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import Avatar from "../../components/avatar/Avatar";

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

const HeaderAvatar = ({ active = false }) => {
  const [session] = useSession();

  const { user } = session;

  return (
    <Container active={active}>
      <Avatar className="header__avatar" image={user.image} size={22} />
    </Container>
  );
};

HeaderAvatar.propTypes = {
  active: PropTypes.bool,
};

export default memo(HeaderAvatar);
