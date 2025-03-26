import React from "react";
import HeroSection from "../components/HeroSection";
import Header from "../components/Header";
import Main from "../components/Main";
import ServicesCarousel from '../components/ServicesCarousel';
import About from '../components/About';
import Carousel from "../components/Carousel";

export default function Home() {
    return (

    <div>
        <Header/>
        <HeroSection />
        <Main />
        <ServicesCarousel />
        <About />
        <Carousel />
    </div>
    );
}
