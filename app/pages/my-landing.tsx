import {
  Container,
  Typography,
  Card,
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import Link from "next/link";
import React from "react";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          A seriously high converting landing page
        </Typography>
        <Link href="/">
          <Button variant="contained" color="primary">
            Go to the home page
          </Button>
        </Link>
      </Box>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="primary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Container>
  );
}
