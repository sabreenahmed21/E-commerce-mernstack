import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { MdAddShoppingCart } from "react-icons/md";

export default function ProductCard({ item, id }) {
  const theme = useTheme();
  return (
    <Card
      sx={{ maxWidth: { xs: 322 }, minWidth: { xs: 255, sm: 264 }, height: '415px'}}
      key={id}
    >
      <CardMedia
        sx={{
          height: 200,
          backgroundSize: "contain",
          ":hover": { scale: "1", transition: "0.35s" },
        }}
        image={item.images[0].url}
        title={item.title}
      />
      <CardContent p={2}>
        <Stack alignItems={"center"} justifyContent={"space-between"}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontSize: "1rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              color:theme.palette.text.main,
              height:'43px',
              [theme.breakpoints.down('sm')]: {
                maxWidth:'223px'
              }
            }}
          >
            {item.title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{ fontWeight: 700, lineHeight: 2, fontSize: "1.2rem" , color:theme.palette.text.main}}
          >
            ${" " + item.price}
          </Typography>
          <Rating
            name="read-only"
            value={item.rating}
            readOnly
            precision={0.5}
            sx={{ fontSize: "1.2rem"}}
          />
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" , p:2  }}>
        <Button
          size="large"
          sx={{
            textTransform: "capitalize",
            gap: "4px",
            fontWeight: 600,
            padding: "7px",
            color: theme.palette.text.main,
            backgroundColor: "#fff",
            borderColor: theme.palette.text.main,
            borderStyle: "solid",
            borderWidth: "1.5px",
            ":hover": {
              backgroundColor: theme.palette.text.main,
              color: "#fff",
              transition: "all  0.5s  ease-in-out",
            },
            width: '-webkit-fill-available'
          }}
        >
          <MdAddShoppingCart fontSize="small" />
          add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
