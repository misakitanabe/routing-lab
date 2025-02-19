import { Routes, Route, Link } from "react-router";
import { useState } from "react";
import { MainLayout } from "./MainLayout.jsx";
import { Homepage } from "./Homepage.jsx";
import { AccountSettings } from "./AccountSettings.jsx";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { useImageFetching } from "./images/useImageFetching.js"

function App() {
    const [userName, setUserName] = useState("");
    const { isLoading, fetchedImages } = useImageFetching("");

    const imageElements = fetchedImages.map((image) => (
        <div key={image.id} className="ImageGallery-photo-container">
            <Link to={"/images/" + image.id}>
                <img src={image.src} alt={image.name}/>
            </Link>
        </div>
    ));

    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Homepage userName={userName} />} />
                <Route path="account" element={<AccountSettings setUserName={setUserName} />} />
                <Route path="images" element={<ImageGallery isLoading={isLoading} imageElements={imageElements} />} />
                <Route path="images/:imageId" element={<ImageDetails />} />
            </Route>
        </Routes>
    );
}

export default App
