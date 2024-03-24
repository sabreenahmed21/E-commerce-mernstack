import { Fab, Zoom, useScrollTrigger } from "@mui/material";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

export default function ScrollToTop() {
  return (
    <Zoom in={useScrollTrigger()}>
      <Fab
        sx={{
          ":hover": { backgroundColor: "#cca75273", color: "#fff" },
          backgroundColor: "#CCA752",
          color: "#fff",
          zIndex:1,
          position:'fixed',
          bottom:'40px',
          right: '10px',
        }}
        size="medium"
        onClick={() => {
          window.scrollTo(0,0);
        }}
      >
        <MdKeyboardDoubleArrowUp />
      </Fab>
    </Zoom>
  );
}
