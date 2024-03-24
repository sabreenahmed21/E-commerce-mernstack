// @ts-nocheck
import {
  Box,
  Stack,
  Typography,
  Link,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
import banner from "../../assets/banner-17.jpg";
import banner2 from "../../assets/banner-16.jpg";
import banner3 from "../../assets/banner-15.jpg";
import banner4 from "../../assets/banner-25.jpg";

import Feature from "./Feature.js"

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./Slider.css";
import { Pagination } from "swiper/modules";
const mySlider = [
  { text: "men", link: banner3, discount: "40%" },
  { text: "women", link: banner4, discount: "30%" },
];

export default function Hero() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery("(min-width:900px)");
  return (
    <>
    <Box
      sx={{
        display: isLargeScreen ? "grid" : "flex",
        gridTemplateColumns: isLargeScreen ? "3fr 1fr" : "none",
        alignItems: "center",
        justifyContent: "center",
        p: "30px 0",
        gap: 2,
      }}
    >
      <Swiper
        loop={true}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Pagination]}
        className="general-slider swiper"
      >
        {mySlider.map((item, index) => {
          return (
            <SwiperSlide className="swiper-slide general-slide" key={index}>
              <img src={item.link} alt="img" />
              <Stack
                sx={{
                  [theme.breakpoints.up("sm")]: {
                    position: "absolute",
                    top: "50% ",
                    transform: "translateY(-50%)",
                    left: " 10%",
                    textAlign: "start",
                  },
                  [theme.breakpoints.down("sm")]: {
                    pt: 4,
                    pb: 6,
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.main,
                    fontSize: "25px",
                    textTransform: "uppercase",
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "20px",
                    },
                  }}
                >
                  lifestyle collection
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "50px",
                    fontWeight: "700",
                    color: theme.palette.text.main,
                    lineHeight: "65px",
                    textTransform: "uppercase",
                    letterSpacing: "3px",
                    mb: 1,
                    mt: 1,
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "38px",
                      fontWeight: "600",
                      lineHeight: "50px",
                      mb: "5px",
                      mt: "4px",
                    },
                  }}
                >
                  {item.text}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: theme.palette.text.main,
                    lineHeight: "30px",
                    textTransform: "uppercase",
                    fontSize: "30px",
                    fontWeight: "600",
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "25px",
                    },
                  }}
                >
                  sale up to{" "}
                  <Typography
                    variant="span"
                    sx={{
                      color: theme.palette.text.yellow,
                    }}
                  >
                    {item.discount} off
                  </Typography>
                </Typography>
                <Typography
                  variant="span"
                  sx={{
                    color: theme.palette.text.main,
                    fontSize: "18px",
                    textTransform: "capitalize",
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "16px",
                    },
                  }}
                >
                  get free shipping on orders over $99.00
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    width: "50%",
                    mt: 3,
                    textTransform: "capitalize",
                    backgroundColor: theme.palette.text.main,
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "26px",
                    boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                    borderRadius: "0px",
                    py: "15px",
                    "&:hover": {
                      backgroundColor: "#1b263be8",
                      boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                    },
                    [theme.breakpoints.down("sm")]: {
                      mx: "auto",
                      py: "10px",
                    },
                  }}
                >
                  <Link href="#" underline="none" sx={{ color: "#fff" }}>
                    shop now
                  </Link>
                </Button>
              </Stack>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Box sx={{ position: "relative" }}>
          <img
            src={banner}
            alt="banner"
            width="280px"
            height="239"
            className="objectFit"
          />
          <Stack
            sx={{
              position: "absolute",
              top: "50% ",
              transform: "translateY(-50%)",
              left: " 10%",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.grey[700],
                fontSize: "18px",
                textTransform: "uppercase",
              }}
            >
              new arrivals
            </Typography>
            <Typography
              variant="h6"
              color="initial"
              sx={{ mt: 1, lineHeight: "16px", textTransform: "uppercase" }}
            >
              summer
            </Typography>
            <Typography
              variant="h6"
              color="initial"
              sx={{ mt: 1, lineHeight: "16px", textTransform: "uppercase" }}
            >
              sale 20% off
            </Typography>
            <Link
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "#283445",
                transition: "0.2s",
                "&:hover": { color: theme.palette.text.yellow },
                mt: 1,
              }}
              href="#"
              underline="none"
            >
              <Typography variant="span">shop now </Typography>
              <IoIosArrowForward fontSize="16px" />
            </Link>
          </Stack>
        </Box>
        <Box sx={{ position: "relative" }}>
          <img
            src={banner2}
            alt="banner"
            width="280px"
            height="239"
            className="objectFit"
          />
          <Stack
            sx={{
              position: "absolute",
              top: "50% ",
              transform: "translateY(-50%)",
              left: " 10%",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.grey[700],
                fontSize: "18px",
                textTransform: "uppercase",
              }}
            >
              gamming 4k
            </Typography>
            <Typography
              variant="h6"
              color="initial"
              sx={{ mt: 1, lineHeight: "16px", textTransform: "uppercase" }}
            >
              desktops &
            </Typography>
            <Typography
              variant="h6"
              color="initial"
              sx={{ mt: 1, lineHeight: "16px", textTransform: "uppercase" }}
            >
              laptops
            </Typography>
            <Link
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "#283445",
                transition: "0.2s",
                "&:hover": { color: theme.palette.text.yellow },
                mt: 1,
              }}
              href="#"
              underline="none"
            >
              <Typography variant="span">shop now </Typography>
              <IoIosArrowForward fontSize="16px" />
            </Link>
          </Stack>
        </Box>
      </Box>
    </Box>
    <Feature />
    </>
  );
}
