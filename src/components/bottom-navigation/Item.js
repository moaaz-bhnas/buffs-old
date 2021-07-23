import { memo, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { rawLink } from "../../utils/style";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

const StyledItem = styled.li`
  margin-left: 0.5rem;

  .svg {
    width: 1.375rem;
  }
`;

const StyledLink = styled.a`
  ${rawLink}

  padding: 0;
  width: 3rem;
  height: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = ({ item }) => {
  const { pathname } = useRouter();
  const { name, ActiveIcon, InactiveIcon, path } = item;

  const active = pathname === path;

  return (
    <StyledItem>
      <Link passHref href={path}>
        <StyledLink aria-label={name}>
          {active ? <ActiveIcon active /> : <InactiveIcon />}
        </StyledLink>
      </Link>
    </StyledItem>
  );
};

Item.propTypes = {
  item: PropTypes.object,
};

export default memo(Item);
