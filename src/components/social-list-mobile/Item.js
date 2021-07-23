import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { rawLink } from "../../utils/style";
import Link from "next/link";

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
  const { name, Icon, path } = item;

  return (
    <StyledItem>
      <Link passHref href={path}>
        <StyledLink aria-label={name}>
          <Icon />
        </StyledLink>
      </Link>
    </StyledItem>
  );
};

Item.propTypes = {
  item: PropTypes.object,
};

export default memo(Item);
