import { memo } from "react";
import styled from "styled-components";
import { rawList } from "../../utils/style";
import PropTypes from "prop-types";
import Item from "../../components/social-list/Item";

const List = styled.ul`
  ${rawList}

  display: flex;
`;

const SocialList = ({ list }) => {
  return (
    <List>
      {list.map((item) => (
        <Item key={item.name} item={item} />
      ))}
    </List>
  );
};

SocialList.propTypes = {
  list: PropTypes.array,
};

export default memo(SocialList);
