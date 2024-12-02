import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function RemoveBg() {
  const [image, setImage] = useState<File | null>(null);
  const [bgRemove, setBgRemove] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  const handleRemoveBackground = async () => {
    const apiUrl = "http://10.0.1.47:5000/remove-bg"; // Flask API URL

    const formData = new FormData();
    if (image) {
      formData.append("image", image, image.name);

      try {
        const res = await fetch(apiUrl, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error("Failed to process the image");
        }

        const blob = await res.blob();
        const imageUrl: string = URL.createObjectURL(blob);
        setBgRemove(imageUrl);

        // Neon glow effect (optional for canvas)
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          const canvas = canvasRef.current;
          const ctx = canvas!.getContext("2d");

          if (canvas && ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Outer neon stroke
            ctx.filter = "none";
            ctx.lineWidth = 10; // Width of neon outline
            ctx.strokeStyle = "cyan"; // Neon blue color
            ctx.shadowBlur = 20; // Glow intensity
            ctx.shadowColor = "cyan"; // Glow color
            ctx.drawImage(img, 0, 0, img.width, img.height);
            ctx.stroke();
          }
        };
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleNavigateToIdPage = () => {
    if (bgRemove) {
      navigate("/generate-id", { state: { processedImage: bgRemove } });
    }
  };

  return (
    <div className="container">
      <h1 className="mb-4">Image Background Remover with Redirect</h1>
      <div className="input-file mb-4">
        <label htmlFor="userImg" className="info_text">
          Select a File
        </label>
        <input
          type="file"
          id="userImg"
          className="form-control-file"
          onChange={(e) => setImage(e.target.files![0])}
          required
        />
      </div>
      <div className="d-flex mb-4">
        {image && (
          <div className="image-preview mr-2">
            <img src={URL.createObjectURL(image)} alt="Original" />
          </div>
        )}
        {bgRemove && (
          <div className="image-preview">
            <canvas ref={canvasRef}></canvas>
          </div>
        )}
      </div>
      {bgRemove && (
        <div className="mb-4">
          <button className="btn btn-secondary" onClick={handleNavigateToIdPage}>
            Generate ID Card
          </button>
        </div>
      )}
      <div>
        <button
          type="button"
          onClick={handleRemoveBackground}
          className="btn btn-primary"
        >
          Remove Background
        </button>
      </div>
    </div>
  );
}
