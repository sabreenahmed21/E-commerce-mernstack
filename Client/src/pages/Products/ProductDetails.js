import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./Product.css";
import { Pagination } from "swiper/modules";
import {
  Box,
  Button,
  Container,
  Input,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useGetproductByNameQuery } from "../../services/Jsonserverapi";
import { useParams } from "react-router-dom";
import Review from "./Review";

export default function ProductDetails() {
  const { productId } = useParams();
  const { data, isLoading, isError } = useGetproductByNameQuery(
    `product/${productId}`
  );
  return (
    <Container sx={{ py: 4 }}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {data && (
        <Stack direction={"row"} gap={2}>
          <Swiper
            loop={true}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            modules={[Pagination]}
            className="product-slider swiper"
          >
            {data.product.images.map((image, idx) => (
              <SwiperSlide className="swiper-slide product-slide" key={idx}>
                <img src={image.url} alt={image.url} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Box sx={{ flexBasis: "100%" }}>
            <Box className="detailsBlock-1">
              <Typography variant="body1" color="initial">
                {data.product.title}
              </Typography>
            </Box>
            <Box className="detailsBlock-2">
              <Typography variant="body1" color="initial">
                ({data.product.numOfReviews} Reviews)
              </Typography>
              <Rating name="read-only" value={data.product.rating} />
            </Box>
            <Box className="detailsBlock-3">
              <Typography variant="body1" color="initial">
                $ {data.product.price}
                <Box className="detailsBlock-3-1">
                  <Box className="detailsBlock-3-1-1">
                    <Button>-</Button>
                    <Input value={1} type="number" />
                    <Button>+</Button>
                  </Box>
                  <Button>add to cart</Button>
                </Box>
                <Box className="detailsBlock-3-2">
                  <Typography variant="body1">
                    Status:{" "}
                    <b className={data.product.stock < 1 ? "red" : "green"}>
                      {data.product.stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </Typography>
                </Box>
              </Typography>
            </Box>
            <Box className="detailsBlock-4">
              <Typography variant="body1" color="initial">
                Description: {data.product.description}
              </Typography>
            </Box>
            <Button className="submitReview">Submit Review</Button>
            {data.product.reviews && data.product.reviews[0] ? (
              <Box className="reviews">
                {data.product.reviews.map( (review) => <Review review={review}/> )}
              </Box>
            ) : (
              "No Reviews"
            )}
          </Box>
        </Stack>
      )}
    </Container>
  );
}
