import { Typography } from "@mui/material";

export default function About({}) {
  return (
    <section>
      <Typography
        variant="h4"
        noWrap
        sx={{
          fontWeight: 700,
          color: "var(--mui-palette-primary-main)",
          textDecoration: "none",
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}>
        About{" "}
      </Typography>
    </section>
  );
}
