import { useState, useActionState } from "react";

export function ImageUploadForm({ authToken }) {
    const [dataUrl, setDataUrl] = useState("");

    const [result, submitAction, isPending] = useActionState(
        async (previousState, formData) => {
            const image = formData.get("image");
            const name = formData.get("name");

            // TODO: FIX FORMDATA LOOK AT CHATGPT
            console.log(formData);
            console.log(`image: ${image}`);
            console.log(`name: ${name}`);

            if (!name || !image) {
                return {
                    type: "error",
                    message: `Please input both name and image`,
                };
            }

            try {
                const response = await fetch("/api/images", {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Authorization": `Bearer ${authToken}`,
                    }
                });
                if (!response.ok) {
                    // Handle HTTP 400 bad upload, HTTP 401 Unauthorized, etc...
                    return {
                        type: "error",
                        message: `Client error`,
                    };
                }
                return {
                    type: "success",
                    message: `Successfully uploaded image!`,
                };
            } catch (error) { // Network error
                console.error(error);
                // Return an error message...
                return {
                    type: "error",
                    message: `Something went wrong`,
                };
            }

            // console.log(`submitResult: ${submitResult}`);

            // return response;
        },
    );

    async function handleImageUpload(e) {
        console.log("inside image upload handelr");
        const inputElement = e.target;
        const fileObj = inputElement.files[0];
        try {
            const url = await readAsDataURL(fileObj);
            setDataUrl(url);
        } catch (err) {
            console.error(err);
        }

    }

    function readAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result);
            fr.onerror = (err) => reject(err);
            fr.readAsDataURL(file);
        });
    }

    return (
        <form action={submitAction} disabled={isPending}>
            <div>
                <label>
                    Choose image to upload: 
                    <input
                        name="image"
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={handleImageUpload}
                    />
                </label>
            </div>
            
            <div>
                <label>
                    <span>Image title: </span>
                    <input name="name" />
                </label>
            </div>

            <div> {/* Preview img element */}
                <img style={{maxWidth: "20em"}} src={dataUrl} alt="" />
            </div>

            {result && (
                <p style={{ color: result.type === "error" ? 'red' : 'black' }}>
                    {result.message}
                </p>
            )}
            <button disabled={isPending}>Confirm upload</button>
        </form>
    );
}
