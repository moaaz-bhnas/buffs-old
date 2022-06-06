import { memo, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { rawButton, rawList } from "../../utils/style";
import ItemComment from "./ItemComment";
import ItemLike from "./ItemLike";
import ItemSend from "./ItemSend";
import PropTypes from "prop-types";

const Bar = styled.div``;

const List = styled.ul`
  ${rawList}

  margin-top: -.7rem;
  /* margin-bottom: 0.3rem; // To cancel button paddings effect */
  display: flex;

  > li {
    flex: 1 0;
  }
`;

const Likers = styled.p`
  margin-top: 0;
`;

const Button = styled.button`
  ${rawButton}
  color: ${({ theme }) => theme.text.grey};

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const ReactionBar = ({
  toggleLiker,
  likers,
  likersObjects,
  liked,
  showLikers,
}) => {
  const numOfLikers = likers.length;
  return (
    <Bar>
      {numOfLikers > 0 && (
        <Likers>
          <Button
            type="button"
            onClick={showLikers}
            aria-label="show likers"
            aria-expanded={numOfLikers > 0}
            aria-pressed={numOfLikers > 0}
          >
            {numOfLikers} like{numOfLikers > 1 ? "s" : ""}
          </Button>
        </Likers>
      )}

      <List>
        <ItemLike toggleLiker={toggleLiker} liked={liked} />
        {/* <ItemComment />
        <ItemSend /> */}
      </List>
    </Bar>
  );
};

ReactionBar.propTypes = {
  toggleLiker: PropTypes.func,
  likers: PropTypes.array,
  likersObjects: PropTypes.array,
  liked: PropTypes.bool,
  showLikers: PropTypes.func,
};

export default memo(ReactionBar);
