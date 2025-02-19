import "./ImageGallery.css";

export function ImageGallery(props) {
    return (
        <>
            <h2>Image Gallery</h2>
            {props.isLoading && "Loading..."}
            <div className="ImageGallery">
                {props.imageElements}
            </div>
        </>
    );
}
