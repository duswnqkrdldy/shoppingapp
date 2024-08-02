import { Box, Typography } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
      flexDirection="column"
    >
      <Typography variant="h4">페이지를 찾을 수 없습니다.</Typography>
    </Box>
  );
};

export default NotFoundPage;
