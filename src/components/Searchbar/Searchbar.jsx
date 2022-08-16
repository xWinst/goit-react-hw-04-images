import PropTypes from 'prop-types';
import s from './Searchbar.module.css';
import search from '../../images/search.svg';
import load from '../../images/loading.svg';

export default function Searchbar({ onSubmit, status }) {
    return (
        <header className={s.searchbar}>
            <form className={s.searchForm} onSubmit={onSubmit}>
                <button type="submit" className={s.button}>
                    {status === 'newSearch' ? (
                        <img className={s.load} src={load} alt="loading" />
                    ) : (
                        <img className={s.icon} src={search} alt="search" />
                    )}
                </button>

                <input
                    className={s.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
};
