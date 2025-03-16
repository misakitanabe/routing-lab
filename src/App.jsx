import { Routes, Route, Link } from "react-router";
import { useState } from "react";
import { MainLayout } from "./MainLayout.jsx";
import { Homepage } from "./Homepage.jsx";
import { AccountSettings } from "./AccountSettings.jsx";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { RegisterPage } from "./auth/RegisterPage.jsx";
import { LoginPage } from "./auth/LoginPage.jsx";
import { useImageFetching } from "./images/useImageFetching.js"
import { ProtectedRoute } from "./auth/ProtectedRoute.jsx";

function App() {
    const [userName, setUserName] = useState("");
    const [authToken, setAuthToken] = useState("");
    const { isLoading, fetchedImages } = useImageFetching("", authToken);

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
                <Route 
                    path="" 
                    element={<ProtectedRoute authToken={authToken} >
                        <Homepage userName={userName} />
                    </ProtectedRoute>} 
                />
                <Route 
                    path="account" 
                    element={<ProtectedRoute authToken={authToken} >
                        <AccountSettings setUserName={setUserName} />
                    </ProtectedRoute>} 
                />
                <Route 
                    path="register" 
                    element={<RegisterPage setAuthToken={setAuthToken}  />} 
                />
                <Route 
                    path="login" 
                    element={<LoginPage setAuthToken={setAuthToken} />} 
                />
                <Route 
                    path="images" 
                    element={
                    // <ProtectedRoute authToken={authToken} >
                        <ImageGallery isLoading={isLoading} imageElements={imageElements} authToken={authToken} />
                    // </ProtectedRoute>
                    } 
                />
                <Route 
                    path="images/:imageId" 
                    element={<ProtectedRoute authToken={authToken} >
                        <ImageDetails authToken={authToken} />
                    </ProtectedRoute>} 
                />
                {/* <Route path="account" element={<AccountSettings setUserName={setUserName} />} /> */}
                {/* <Route path="register" element={<RegisterPage  setAuthToken={setAuthToken}  />} /> */}
                {/* <Route path="login" element={<LoginPage setAuthToken={setAuthToken} />} /> */}
                {/* <Route path="images" element={<ImageGallery isLoading={isLoading} imageElements={imageElements} />} /> */}
                {/* <Route path="images/:imageId" element={<ImageDetails />} /> */}
            </Route>
        </Routes>
    );
}

export default App
