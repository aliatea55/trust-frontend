import React from "react";
import { Box, Typography } from "@mui/material";

export default function TopBar() {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "100%",
        height: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        px: 2,
        direction: "rtl",
        fontSize: "14px",
        color: "#212529",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <Typography variant="body2">
        أهلاً بك في ترست فلسطين
      </Typography>
    </Box>
  );
}
