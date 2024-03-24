import { Box, Container, Stack, useTheme } from "@mui/material";

export default function Footer() {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          bgcolor: theme.palette.secondary.main,
          color: "#fff",
          py: 2
        }}
      >
        <Container>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            footer
          </Stack>
        </Container>
      </Box>
    </>
  );
}
