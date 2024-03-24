// @ts-nocheck
import { Button, Divider, InputBase, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  flexGrow: 0.4,
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: "260px",
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(3),
    width: "300px",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

export default function SearchComponent() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery("(min-width:769px)");
  const [query, setQuery] = useState("");
  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.trim().length > 0) {
      navigate(`/search/${query}`);
      setQuery("");
    }
  };
  return (
    <Search
      sx={{
        display: "flex",
        borderRadius: "5px",
        flexGrow: "0.4",
        minWidth: isLargeScreen ? "300px" : "90vw",
        backgroundColor: theme.palette.grey[50],
      }}
    >
      <SearchIconWrapper>
        <MdSearch sx={{ color: "#777", [theme.breakpoints.up("sm")]:{size:'large'} }} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={searchQueryHandler}
      />
      <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ borderColor: theme.palette.grey[400] }}
            />
      <Button
        onClick={() => searchQueryHandler({ key: "Enter" })}
        sx={{
          color: theme.palette.secondary.main,
          fontWeight: 600,
          [theme.breakpoints.up("sm")]: {
            px: "43px",
            fontSize: "large",
          },
        }}
      >
        Search
      </Button>
    </Search>
  );
}
