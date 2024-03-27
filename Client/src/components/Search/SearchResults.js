import React, { useEffect, useState } from "react";
import { useGetproductByNameQuery } from "../../services/Jsonserverapi";
import {
  Box,
  Pagination,
  Slider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../../pages/Products/ProductCard";

export default function SearchResults() {
  const { query } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 2000]);
  const { data, isLoading, isError } = useGetproductByNameQuery(
    `products?keyword=${query}&page=${currentPage}}`
  );
  const [totalPages, setTotalPages] = useState(1);
  console.log(data);
  useEffect(() => {
    if (data && data.totalProductsCount && data.resultPerPage) {
      const pages = Math.ceil(data.totalProductsCount / data.resultPerPage);
      setTotalPages(pages);
    }
  }, [data, currentPage]);

  const theme = useTheme();

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handlePriceRangeChange = (event, priceRange) => {
    setPrice(priceRange);
  };

  return (
    <>
      {isLoading && (
        <Typography variant="body1" color="initial">
          "loading................."
        </Typography>
      )}
      {isError && (
        <Typography variant="body1" color="error">
          "Error fetching data."
        </Typography>
      )}
      {!isLoading && (
        <Stack
          mt="32px"
          direction={"row"}
          justifyContent={{ xs: "center", sm: "left" }}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={3}
          sx={{
            [theme.breakpoints.up("sm")]: {
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
            },
            [theme.breakpoints.up("md")]: {
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
            },
            [theme.breakpoints.up("lg")]: {
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
            },
          }}
        >
          {data?.products.length > 0 ? (
            <>
              <Box>
                {`Search ${
                  data?.totalProductsCount > 1 ? "results" : "result"
                } of '${query}'`}
              </Box>
              {data?.products.map((item) => (
                <Link key={item._id} to={`/product/${item._id}`}>
                  <ProductCard item={item} />
                </Link>
              ))}
              {totalPages > 1 && (
                <Pagination
                  page={currentPage}
                  count={totalPages}
                  onChange={handlePageChange}
                />
              )}
              <Box sx={{ width: "300px" }}>
                <Typography variant="body1" color="initial">
                  price
                </Typography>
                <Slider
                  getAriaLabel={() => "price range"}
                  value={price}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                />
              </Box>
            </>
          ) : (
            <>
              <Typography variant="body1" color="initial">
                Sorry, Results not found!
              </Typography>
            </>
          )}
        </Stack>
      )}
    </>
  );
}
