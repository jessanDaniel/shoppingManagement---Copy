import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/products";

function Paginate({ page }) {
  const dispatch = useDispatch();

  const { numberOfPages } = useSelector((state) => state.products);

  useEffect(() => {
    if (page) dispatch(getProducts(page));
  }, [page]);

  const classes = useStyles();
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
      )}
    />
  );
}

export default Paginate;
