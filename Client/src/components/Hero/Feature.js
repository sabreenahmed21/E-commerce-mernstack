// @ts-nocheck
import {
  Box,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  MdAccessTime,
  MdOutlineLocalShipping,
  MdOutlineMonetizationOn,
  MdOutlinePayments,
} from "react-icons/md";

export default function Grid() {
  const theme = useTheme();
  return (
    <Box sx={{bgcolor:"#fff"}}>
      <Stack
        direction={"row"}
        sx={{
          alignItems: "center",
          flexWrap: "wrap",
          padding: "25px 10px",
          gap: "52px",
          [theme.breakpoints.down("sm")]: { gap: "60px" },
          backgroundColor: theme.palette.background.alt,
        }}
        divider={
          useMediaQuery("(min-width:992px)") ? (
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ borderColor: theme.palette.grey[400] }}
            />
          ) : null
        }
      >
        <Icondata
          icon={<MdOutlineLocalShipping fontSize="xx-large" />}
          title="Fast Delivery"
          subtitle="Start from $10"
        />
        <Icondata
          icon={<MdOutlineMonetizationOn fontSize="xx-large" />}
          title="Money Guarantee"
          subtitle="7 Days Back"
        />
        <Icondata
          icon={<MdAccessTime fontSize="xx-large" />}
          title="365 Days"
          subtitle="For free return"
        />
        <Icondata
          icon={<MdOutlinePayments fontSize="xx-large" />}
          title="Payment"
          subtitle="Secure system"
        />
      </Stack>
    </Box>
  );
}

const Icondata = ({ icon, title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: "10px" }}
    >
      {icon}
      <Box>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, color: theme.palette.text.light }}
        >
          {title}
        </Typography>
        <Typography
          variant="span"
          sx={{
            fontWeight: 500,
            color: theme.palette.grey[600],
            fontSize: "13px",
            letterspacing: "1px"
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};
