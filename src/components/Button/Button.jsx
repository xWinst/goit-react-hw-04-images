import PropTypes from 'prop-types';
import s from './Button.module.css';
import icon from '../../images/loading.svg';

export default function Button({ onClick, status }) {
    if (status === '') return;
    if (status === 'endGallery')
        return (
            <div className={s.container}>
                We're sorry, but you've reached the end of search results.
            </div>
        );

    if (status === 'noImages')
        return (
            <div className={s.noResults}>
                Sorry, there are no images matching your search query. Please
                try again.
            </div>
        );

    return (
        <button className={s.button} type="button" onClick={onClick}>
            {status === 'loading' && (
                <>
                    <img className={s.icon} src={icon} alt="" />
                    <span>Loading...</span>
                </>
            )}
            {status === 'endLoading' && <span>Load more</span>}
        </button>
    );
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
};
