import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ url, modalUrl, onClick }) {
    return (
        <li className={s.galleryItem}>
            <img
                className={s.galleryItemImage}
                src={url}
                alt={url}
                onClick={() => onClick(modalUrl)}
            />
        </li>
    );
}

ImageGalleryItem.propTypes = {
    url: PropTypes.string.isRequired,
    modalUrl: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};
