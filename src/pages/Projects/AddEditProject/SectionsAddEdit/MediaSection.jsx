import { UploadImageWindow } from "../../../../components/UploadImageWindow/UploadImageWindow";
import wastebasket from '../../../../assets/icons/wastebasket.svg'
import { useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import api from "../../../../utils/api";

export default function MediaSection({ tempProject, setTempProject, setIsFilledSection, mode }) {
    const [imageUrl, setImageUrl] = useState(tempProject.images?.imageSrc || '');
    const [screenshots, setScreenshots] = useState(tempProject.images?.screenshots.map((url, index) => ({ screenSrc: url, id: index + 1 })));
    const [screenShotsInput, setScreenShotsInput] = useState(screenshots || []);
    const [loading, setLoading] = useState(true);
    console.log(tempProject)
  
  useEffect(() => { 
    if (mode !== 'edit' || !tempProject?.images) {
      setLoading(false);
      return;
    }

      const fetchImages = async () => {
        try {
          setLoading(true);
          const { imageSrc, screenshots } = tempProject.images || {};
          setImageUrl(imageSrc ? `${api.defaults.baseURL}/${imageSrc}` : '');
  
          if (screenshots?.length) {
            const screenshotUrls = screenshots.map((screenshot) => `${api.defaults.baseURL}/${screenshot}`);
            setScreenshots(screenshotUrls);
            setScreenShotsInput(screenshotUrls.map((url, index) => ({ screenSrc: url, id: index + 1 })));
          }
        } catch (error) {
          console.error("Ошибка загрузки изображений:", error);
        } finally {
          setLoading(false);
        }
      };
  
     fetchImages();
    }, [tempProject?.images, mode]);

    const checkIfFilled = useCallback(() => {
      setIsFilledSection(Boolean(imageUrl && screenShotsInput.length > 0));
    }, [imageUrl, screenShotsInput, setIsFilledSection]);
 
    useEffect(() => {
      checkIfFilled();
    }, [checkIfFilled]);
  
    const handleAddScreenshots = (newScreenshot) => {
      if (!newScreenshot) return;
    
      setScreenShotsInput((prev) => {
        const updatedScreens = [...prev, { screenSrc: newScreenshot, id: prev.length + 1 }];
        setTempProject((prev) => ({
          ...prev,
          images: {
            ...prev.images,
            screenshots: updatedScreens.map((s) => s.screenSrc),
          }
        }));
        return updatedScreens;
      });
    };
  
    const handleRemoveScreenshot = (idToRemove) => {
      setScreenShotsInput((prev) => {
        const updatedScreens = prev.filter((screenshot) => screenshot.id !== idToRemove);
        setTempProject((prev) => ({
          ...prev,
          images: {
            ...prev.images,
            screenshots: updatedScreens.map((s) => s.screenSrc),
          }
        }));
        return updatedScreens;
      });
    };
  
    const handleCoverImageChange = (image) => {
      setImageUrl(image);
      setTempProject((prev) => ({
        ...prev,
        images: {
          ...prev.images,
          imageSrc: image,
        }
      }));
    };
  
    if (loading) return <div>Загрузка...</div>;

    return (
        <div className="section-cover-image-block">
        <div className={`coverage-block ${imageUrl ? "filled" : ""}`}>
            <h1>Обложка</h1>
            <h4 className="mb-16">Рекомендуется использовать картинки размером не менее 375×550px</h4>
            {imageUrl ? (
                <div className="cover-img-preview">
                    <div className="cover-img-preview-contaiiner">
                        <img src={imageUrl} alt="preview" />
                        <button 
                            type="button"
                            className="btn-img cover-image-remove-img-button"
                            onClick={() => handleCoverImageChange('')}
                        >
                            <img src={wastebasket} alt="wastebasket" />
                        </button>
                    </div>
                </div>
            ) : (
                <UploadImageWindow onImageUpload={handleCoverImageChange} />
            )}
        </div>
        <div className="project-info-line"></div>
        <div className="screenshots-block">
            <h1 className={`coverage-block ${screenShotsInput.length === 0 ? "" : "filled"}`}>Скриншоты</h1>
            <h4 className="mb-16">Рекомендуется использовать картинки размером не менее 400×226px</h4>
            <UploadImageWindow onImageUpload={handleAddScreenshots} />
            {screenShotsInput.length > 0 && (
                <div className="grid-block-screenshots-upload">
                    {screenShotsInput.map((screenshotObj) => (
                        <div className="screenshot-preview-upload mb-16" key={screenshotObj.id}>
                            <div className="screen-img-preview-contaiiner">
                                <img src={screenshotObj.screenSrc} alt="screenShot" />
                                <button 
                                    type="button"
                                    className="btn-img cover-image-remove-img-button"
                                    onClick={() => handleRemoveScreenshot(screenshotObj.id)}
                                >
                                    <img src={wastebasket} alt="wastebasket" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
    )
}

MediaSection.propTypes = {
  mode: PropTypes.string,
  tempProject: PropTypes.shape({
    images: PropTypes.shape({
      imageSrc: PropTypes.string,
      screenshots: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
    setTempProject: PropTypes.func.isRequired,
    setIsFilledSection: PropTypes.func.isRequired,
};