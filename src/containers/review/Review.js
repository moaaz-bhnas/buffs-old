import { AnimateSharedLayout } from "framer-motion";
import { memo, useState } from "react";
import Modal from "../../components/review/Modal";
import Input from "../../components/review/Input";

const Review = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <AnimateSharedLayout>
      {expanded ? (
        <Modal expanded={expanded} setExpanded={setExpanded} />
      ) : (
        <Input setExpanded={setExpanded} layoutId="review__input" />
      )}
    </AnimateSharedLayout>
  );
};

export default memo(Review);
