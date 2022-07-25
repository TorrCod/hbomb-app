import Footer from "../../Footer/Footer";
import ClassicteeSection from "./Component/ClassicSection/ClassicteeSection";
import CollectionSection from "./Component/CollectionSection/CollectionSection";
import ModelSection from "./Component/ModelSection/ModelSection";
import OfferSection from "./Component/OfferSection/OfferSection";
import './Home.css';


function Home() {
    return ( 
        <>
            <header>
                <ModelSection/>
            </header>
            <OfferSection/>
            <CollectionSection/>
            <ClassicteeSection/>
            <Footer/>
        </> 
    );
}

export default Home;