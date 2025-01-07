import React from 'react';
import styles from './ImageModal.module.css';

interface ImageModalProps {
    imageUrl: string;
    altText: string;
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, altText, onClose }) => {
    return (
        <div className={styles.fullscreenModal} onClick={onClose}>
            <div className={styles.fullscreenImageContainer} onClick={(e) => e.stopPropagation()}>
                <img src={imageUrl} alt={altText} className={styles.fullscreenImage} />
                <button className={styles.closeButton} onClick={onClose}>x</button>
            </div>
        </div>
    );
};

export default ImageModal;
