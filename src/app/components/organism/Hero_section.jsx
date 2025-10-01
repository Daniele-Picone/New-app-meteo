import NewsSection from "../molecules/News";
import OroscopoSection from "../molecules/Oroscopo";
import MeteoSection from "../molecules/Meteo";
import './Hero_section.css'




export default function HeroSection(){

    return(

       <div className="heroSection" >

           <NewsSection/>
           <MeteoSection/>
           <OroscopoSection/>

       </div> 
    )
} 