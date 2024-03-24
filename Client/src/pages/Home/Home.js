import React from "react";
import { Container } from "@mui/material";

import Hero from "../../components/Hero/Hero.js";
import Products from "../../pages/Products/Products.js";
import ScrollToTop from "../../components/Hero/ScrollToTop.js";
import Footer from "../../pages/Footer/Footer.js";



export default function Home() {
  return (
    <>
      <Container>
        <Hero />
        <Products />
        <ScrollToTop />
      </Container>
      <Footer />
    </>
  );
}
