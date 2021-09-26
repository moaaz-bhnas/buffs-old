import { memo, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { rawButton, rawList } from "../../utils/style";
import ItemComment from "./ItemComment";
import ItemLove from "./ItemLove";
import ItemSend from "./ItemSend";
import PropTypes from "prop-types";

const Bar = styled.div``;

const List = styled.ul`
  ${rawList}

  margin-top: -.7rem;
  margin-bottom: 0.3rem; // To cancel button paddings effect
  display: flex;

  > li {
    flex: 1 0;
  }
`;

const Lovers = styled.p`
  margin-top: 0;
`;

const Button = styled.button`
  ${rawButton}
  color: ${({ theme }) => theme.text.grey};
`;

const ReactionBar = ({
  toggleLover,
  lovers,
  loversObjects,
  loved,
  showLovers,
}) => {
  const numOfLovers = lovers.length;
  return (
    <Bar>
      {numOfLovers > 0 && (
        <Lovers>
          <Button
            type="button"
            onClick={showLovers}
            aria-label="show likers"
            aria-expanded={loversObjects.length}
            aria-pressed={loversObjects.length}
          >
            {numOfLovers} like{numOfLovers > 1 ? "s" : ""}
          </Button>
        </Lovers>
      )}

      <List>
        <ItemLove toggleLover={toggleLover} loved={loved} />
        <ItemComment />
        <ItemSend />
      </List>
    </Bar>
  );
};

ReactionBar.propTypes = {
  toggleLover: PropTypes.func,
  lovers: PropTypes.array,
  loversObjects: PropTypes.array,
  loved: PropTypes.bool,
  showLovers: PropTypes.func,
};

export default memo(ReactionBar);
