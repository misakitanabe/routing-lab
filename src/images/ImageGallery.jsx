import "./ImageGallery.css";
import { ImageUploadForm } from "./ImageUploadForm";

export function ImageGallery(props) {
    return (
        <>
            <h2>Image Gallery</h2>
            <h3><ImageUploadForm authToken={props.authToken} /></h3>
            {props.isLoading && "Loading..."}
            <div className="ImageGallery">
                {props.imageElements}
            </div>
        </>
    );
}
