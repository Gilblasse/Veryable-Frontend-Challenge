import { Stack, Typography } from "@mui/material";
import OpsTable from "./OpsTable";

export default function Home() {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
      spacing={4}
    >
      <Typography variant="h1">Hello World</Typography>

      <OpsTable />
    </Stack>
  );
}
