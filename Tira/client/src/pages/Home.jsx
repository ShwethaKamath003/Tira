import React from "react"
import Carousel from "./Carousel";
import Navbar from "../Navbar";
import ProductRow from "./ProductRow";
import HeroCarousel from "./HeroCarousel"
import Banner from "./Banner";
function Home()
{
    return(
        <>
        <Navbar/>
        <Carousel/>
        <ProductRow/>
        <HeroCarousel/>
        <Banner/>
        </>
    )
}
export default Home