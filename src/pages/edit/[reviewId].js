import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Layout from "../../containers/layout/Layout";

const EditReview = () => {
  return (
    <Layout returnable returnableTitle="Edit Review">
      Edit
    </Layout>
  );
};

EditReview.propTypes = {};

export default memo(EditReview);
