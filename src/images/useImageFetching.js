import { useEffect, useState } from "react";

// const IMAGES = [
//     {
//         id: "0",
//         src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg",
//         name: "Blue merle herding sheep"
//     },
//     {
//         id: "1",
//         src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Huskiesatrest.jpg/2560px-Huskiesatrest.jpg",
//         name: "Huskies"
//     },
//     {
//         id: "2",
//         src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Taka_Shiba.jpg",
//         name: "Shiba"
//     },
//     {
//         id: "3",
//         src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/2560px-Felis_catus-cat_on_snow.jpg",
//         name: "Tabby cat"
//     },
//     {
//         id: "4",
//         src: "https://upload.wikimedia.org/wikipedia/commons/8/84/Male_and_female_chicken_sitting_together.jpg",
//         name: "Chickens"
//     }
// ];

/**
 * Fetches images on component mount.  Returns an object with two properties: isLoading and fetchedImages, which will be
 * an array of ImageData
 *
 * @param imageId {string} the image ID to fetch, or all of them if empty string
 * @param delay {number} the number of milliseconds fetching will take
 * @returns {{isLoading: boolean, fetchedImages: ImageData[]}} fetch state and data
 */
export function useImageFetching(imageId, authToken, delay=1000) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedImages, setFetchedImages] = useState([]);
    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await fetch(`/api/images`, {
                    headers: {
                        "Authorization": `Bearer ${authToken}`,
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                let images = await response.json();
                images = images.map(({_id, ...rest}) => ({
                    ...rest,
                    id: _id,
                }));
                setFetchedImages(images);
                // if (imageId === "") {
                //     setFetchedImages(images);
                // } else {
                //     setFetchedImages(images.filter((image) => image.id === imageId));
                // }
                setIsLoading(false);
            } catch (err) {
                console.error(err);
            }
        }
        fetchImages();
    }, [imageId, authToken]);

    return { isLoading, fetchedImages };
}
