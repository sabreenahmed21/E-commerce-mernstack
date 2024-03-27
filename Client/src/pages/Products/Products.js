// @ts-nocheck
import {
  Box,
  Stack,
  Typography,
  useTheme,
  ToggleButton,
  ToggleButtonGroup,
  CardActions,
  CardContent,
  CardMedia,
  Card,
} from "@mui/material";
import { useState } from "react";
import { useGetproductByNameQuery } from "../../services/Jsonserverapi.js";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard.js";
const allproducts = "products";
const mencategory = "products?category=men";
const womencategory = "products?category=women";
const items = [
  { title: "all products", value: allproducts, aria: "left aligned" },
  { title: "men category", value: mencategory, aria: "centered" },
  { title: "women category", value: womencategory, aria: "right aligned" },
];

export default function Products() {
  const handleValue = (event, newValue) => {
    setMyDate(newValue);
  };
  const theme = useTheme();

  const [myData, setMyDate] = useState(allproducts);
  const { data, isLoading, error, isError } = useGetproductByNameQuery(myData);
  console.log(data);
  return (
    <Box sx={{ mt: "40px", mb: "40px", gap: "15px" }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        gap={2}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.primary,
              textTransform: "capitalize",
              fontWeight: 600,
            }}
          >
            selected products
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 300, textTransform: "capitalize" }}
          >
            all our new barrivals in a exclusive brand selection
          </Typography>
        </Box>
        <ToggleButtonGroup
          value={myData}
          sx={{
            ".Mui-selected": {
              backgroundColor: "transparent !important",
              color: "#CCA752 !important",
              border: "1px solid #CCA752 !important",
            },
            gap: 1,
          }}
          exclusive
          onChange={handleValue}
          aria-label="text Value"
        >
          {items.map((item) => {
            return (
              <ToggleButton
                value={item.value}
                aria-label={item.aria}
                sx={{
                  color: theme.palette.text.primary,
                  textTransform: "capitalize",
                  fontWeight: 500,
                  fontSize: { xs: "11px", sm: "16px" },
                  letterSpacing: { xs: "1.1px", sm: "0.2px" },
                }}
                className="toggleButton"
                key={item.value}
              >
                {item.title}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </Stack>
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
        {!isLoading ? (
          data?.products.map((item, id) => {
            return (
              <Link
                to={`/product/${item._id}`}
                style={{ textDecoration: "none" }}
              >
                <ProductCard item={item} id={id} />
              </Link>
            );
          })
        ) : (
          <>
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
              <Card sx={{ maxWidth: { xs: 322 }, minWidth: { xs: 255, sm: 264 }, height: '415px'}}>
                <CardMedia
                  sx={{
                    height: 200,
                    width: "100%",
                  }}
                  className="skeleton"
                  image=""
                />
                <CardContent>
                  <Stack
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Box
                      className="skeleton"
                      width={"40%"}
                      height={"20px"}
                    ></Box>
                    <Box
                      className="skeleton"
                      width={"70%"}
                      height={"40px"}
                    ></Box>
                  </Stack>
                  <Box
                    className="skeleton"
                    width={"50%"}
                    height={"20px"}
                    marginTop={"10px"}
                  ></Box>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" , p:2}}>
                  <Box className="skeleton" height={"20px"} sx={{width: '-webkit-fill-available'}}></Box>
                </CardActions>
              </Card>
            </Stack>
          </>
        )}
        {isError && <Box>{error.message}</Box>}
      </Stack>
    </Box>
  );
}
