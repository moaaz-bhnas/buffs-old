import { memo } from "react";
import styled from "styled-components";
import { rawList } from "../../utils/style";

const List = styled.ul`
  ${rawList}
`;

const SocialList = () => {
  return <List>Enter</List>;
};

export default memo(SocialList);
