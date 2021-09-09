import { useSession } from "next-auth/client";
import { memo } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import Avatar from "../../components/avatar/Avatar";

const activeStyle = css`
  border: 2px solid ${({ theme }) => theme.border.dark};
`;

const Container = styled.div`
  ${({ active }) => active && activeStyle}
  display: flex;
  border-radius: 50%;
`;

const AccountAvatar = ({ active = false }) => {
  const [session] = useSession();

  const user = session && session.user;

  return (
    <Container active={active}>
      <Avatar className="header__avatar" image={user.image} size={22} />
    </Container>
  );
};

AccountAvatar.propTypes = {
  active: PropTypes.bool,
};

export default memo(AccountAvatar);
