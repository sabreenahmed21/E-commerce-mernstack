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
    <Card sx={{ maxWidth: { xs: 322 }, minWidth: { sm: 264 } }} key={id}>
      <CardMedia
        sx={{
          height: 250,
          ":hover": { scale: "1.1", transition: "0.35s" },
        }}
        image={item.images[0].url}
        title="t-shirt"
      />
      <CardContent>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="subtitle1" component="p">
            ${" " + item.price}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
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
          }}
        >
          <MdAddShoppingCart fontSize="small" />
          add to cart
        </Button>
        <Rating
          name="read-only"
          value={item.rating}
          readOnly
          precision={0.5}
          sx={{ fontSize: "1.4rem" }}
        />
      </CardActions>
    </Card>
  );
}
