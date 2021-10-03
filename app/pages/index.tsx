import { Container, Typography, Box, Button } from "@material-ui/core";
import Link from "next/link";
import React from "react";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js Example
        </Typography>
        <Link href="/about">
          <Button variant="contained" color="primary">
            Go to the about page
          </Button>
        </Link>
        <Link href="/my-landing">
          <Button variant="contained" color="secondary">
            Go to the landing page
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
