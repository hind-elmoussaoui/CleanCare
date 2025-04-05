import React from "react";
import HeroSection from "../../components/CleanCare/HeroSection";
import Header from "../../components/CleanCare/Header";
import Main from "../../components/CleanCare/Main";
import ServicesCarousel from '../../components/CleanCare/ServicesCarousel';
import About from '../../components/CleanCare/About';
import Carousel from "../../components/CleanCare/Carousel";

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
