import { useState, useEffect } from "react";
import api from "./api";

export default function useProjectImages(movieId) {
  const [imageUrl, setImageUrl] = useState("/default-image.jpg");
  const [screenshots, setScreenshots] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    const fetchImages = async () => {
      try {
        const response = await api.get(`/movies/${movieId}/images`);
        const { imageSrc, screenshots } = response.data.result;

        setImageUrl(imageSrc ? imageSrc : "../assets/images/projects/screen2.png");

        if (screenshots?.length) {
          setScreenshots(screenshots.map((screenshot) => screenshot));
        } else {
          setScreenshots([]);
        }
      } catch (error) {
        console.error("Ошибка загрузки изображений", error);
        setImageUrl("../assets/images/projects/screen2.png");
        setScreenshots([]);
      }
    };

    fetchImages();
  }, [movieId]);

  return { imageUrl, screenshots };
}
