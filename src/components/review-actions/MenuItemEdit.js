import { memo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import { Button, Item, itemStyles, ItemText } from "./style";
import styled from "styled-components";
import { mediaQueries, rawLink } from "../../utils/style";

const EditButton = styled(Button)`
  @media screen and (max-width: ${mediaQueries.main}) {
    display: none;
  }
`;

const EditLink = styled.a`
  ${rawLink}
  ${itemStyles}

  display: none;

  @media screen and (max-width: ${mediaQueries.main}) {
    display: flex;
  }
`;

const ItemContent = () => (
  <>
    <Image
      src="/images/edit.svg"
      alt=""
      width={20}
      height={20}
      layout="fixed"
      quality={100}
    />
    <ItemText>Edit review</ItemText>
  </>
);

const MenuItem = ({ reviewId, active, onClick }) => {
  const itemRef = useRef(null);

  useEffect(
    function focusIfActive() {
      if (active) {
        itemRef.current.focus();
      }
    },
    [active]
  );

  return (
    <Item role="none">
      <EditButton
        role="menuitem"
        onClick={onClick}
        tabIndex={active ? 0 : -1}
        ref={itemRef}
      >
        <ItemContent />
      </EditButton>
      <Link passHref href={`/edit/${reviewId}`}>
        <EditLink>
          <ItemContent />
        </EditLink>
      </Link>
    </Item>
  );
};

MenuItem.propTypes = {
  reviewId: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default memo(MenuItem);
