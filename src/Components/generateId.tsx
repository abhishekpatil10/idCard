import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import idBackgroundTemplate from "../assets/idBg.png"; // Import the ID card background template

export default function GenerateId() {
  const location = useLocation();
  const { processedImage } = location.state || {}; // Retrieve the processed image from state

  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 300, // Default width
    height: 500, // Default height
  });

  useEffect(() => {
    // Load the background image to get its natural dimensions
    const img = new Image();
    img.src = idBackgroundTemplate;
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, []);

  if (!processedImage) {
    return <p>No image available. Please go back and upload an image.</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: `${dimensions.width}px`, // Set to the background image's natural width
          height: `${dimensions.height}px`, // Set to the background image's natural height
          borderRadius: "15px",
          position: "relative",
          overflow: "hidden",
          backgroundImage: `url(${idBackgroundTemplate})`, // Use imported image
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          textAlign: "center",
          color: "#fff",
          maxHeight: "650px",
          maxWidth: "370px",
        }}
      >
        {/* Neon Profile Image */}
        <div
          style={{
            position: "absolute",
            top: "10%", // Adjust as per the ID card design
            left: "50%",
            transform: "translateX(-50%)",
            width: "400px",
            height: "450px",
            borderRadius: "10%", // Keep circular shape if desired
            overflow: "hidden",
            boxShadow: "0 0 20px cyan", // Neon glow effect
          }}
        >
          <img
            src={processedImage}
            alt="Processed"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10%", // Match neon shape
              boxShadow: "0 0 15px cyan", // Neon effect directly on the image
            }}
          />
        </div>

        {/* User Details */}
        <div
          style={{
            position: "absolute",
            bottom: "10%", // Adjust as per the ID card design
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            padding: "15px",
            borderRadius: "15px",
          }}
        >
          <h3>John Doe</h3>
          <p>Software Engineer</p>
          <p>Employee ID: 123456</p>
        </div>
      </div>
    </div>
  );
}
