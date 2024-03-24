import { Box, Button, Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Profle() {
  return (
    <Container>
      <Box
        my={5}
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          gap: 5,
          flexDirection: "column",
        }}
      >
        <Link to={"/deleteAccount"}>
          <Button variant="outlined">Delete your account</Button>
        </Link>
        <Link to={"/updateAccount"}>
          <Button variant="outlined">update your account</Button>
        </Link>
      </Box>
    </Container>
  );
}
