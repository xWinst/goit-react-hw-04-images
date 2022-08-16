import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components';

export default function ImageGallery({ images, onClick }) {
    if (images.length > 0) {
        return (
            <ul className={s.gallery}>
                {images.map(({ id, webformatURL, largeImageURL }) => (
                    <ImageGalleryItem
                        key={id}
                        url={webformatURL}
                        modalUrl={largeImageURL}
                        onClick={onClick}
                    />
                ))}
            </ul>
        );
    }
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
        })
    ).isRequired,
    onClick: PropTypes.func.isRequired,
};
