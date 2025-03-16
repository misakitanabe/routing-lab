import { useImageFetching } from "./useImageFetching.js";
import { useParams } from 'react-router';

export function ImageDetails({ authToken }) {
    const { imageId } = useParams();
    const { isLoading, fetchedImages } = useImageFetching(imageId, authToken, 500);
    
    if (isLoading) {
        return "Loading...";
    }
    const imageData = fetchedImages.filter((image) => image.id === imageId)[0];
    if (!imageData) {
        return <h2>Image not found</h2>;
    }

    return (
        <>
            <h2>{imageData.name}</h2>
            <img className="ImageDetails-img" src={imageData.src} alt={imageData.name} />
        </>
    )
}
