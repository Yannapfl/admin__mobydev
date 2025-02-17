import { UploadImageWindow } from "../../../../components/UploadImageWindow/UploadImageWindow";
import wastebasket from '../../../../assets/icons/wastebasket.svg'
import { useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';

export default function MediaSection({ tempProject, setTempProject, setIsFilledSection }) {
    const [coverImageInput, setCoverImageInput] = useState(tempProject.media.coverImage || '');
    const [screenShotsInput, setScreenShotsInput] = useState(tempProject.media.screenShots || []);
  
    const handleAddScreenshots = (newScreenshot) => {
        if (newScreenshot) {
            const screenObj = { image: newScreenshot, id: Date.now() };
            setScreenShotsInput(prev => [...prev, screenObj]);
            setTempProject(prev => ({
                ...prev,
                media: {
                    ...prev.media,
                    screenShots: [...(prev.media.screenShots || []), screenObj]
                }
            }));
        }
    };
    
    const handleRemoveScreenshot = (indexToRemove) => {
        setScreenShotsInput((prevScreenshots) => {
            const updatedScreens = prevScreenshots.filter((screenshot) => screenshot.id !== indexToRemove);
            setTempProject((prev) => ({
                ...prev,
                media: {
                    ...prev.media,
                    screenShots: updatedScreens
                }
            }));
            return updatedScreens; 
        });
    };

    const handleCoverImageChange = (image) => {
        setCoverImageInput(image);
        setTempProject((prev) => ({
            ...prev,
            media: {
                ...prev.media,
                coverImage: image,
            },
        }));
    };

    const checkIfFilled = useCallback(() => {
        const isFilled = coverImageInput && screenShotsInput.length > 0;
        setIsFilledSection(isFilled);
    }, [coverImageInput, screenShotsInput, setIsFilledSection]);
    
    useEffect(() => {
        checkIfFilled();
    }, [checkIfFilled]);


    return (
        <div className="section-cover-image-block">
        <div className={`coverage-block ${coverImageInput ? "filled" : ""}`}>
            <h1>Обложка</h1>
            <h4 className="mb-16">Рекомендуется использовать картинки размером не менее 375×550px</h4>
            {coverImageInput !== '' ? (
                <div className="cover-img-preview">
                    <div className="cover-img-preview-contaiiner">
                        <img src={coverImageInput} alt="preview" />
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
                                <img src={screenshotObj.image} alt="screenShot" />
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
    tempProject: PropTypes.shape({
        media: PropTypes.shape({
            coverImage: PropTypes.string,
            screenShots: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    image: PropTypes.string,
                })
            ),
        }).isRequired,
    }).isRequired,
    setTempProject: PropTypes.func.isRequired,
    setIsFilledSection: PropTypes.func.isRequired,
};