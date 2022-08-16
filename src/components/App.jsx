import { useState, useEffect } from 'react';
import { Searchbar, ImageGallery, Button, Modal } from '../components';
import delivery from '../js/delivery';

const App = () => {
    const [images, setImages] = useState([]);
    const [status, setStatus] = useState('');
    const [isModalShow, setIsModalShow] = useState(false);
    const [modalUrl, setModalUrl] = useState('');

    useEffect(() => {
        if (delivery.page > 2)
            window.scrollBy({
                top: window.innerHeight - 245,
                behavior: 'smooth',
            });
    }, [images]);

    const handleSubmit = event => {
        event.preventDefault();
        if (delivery.query !== event.target[1].value.trim()) {
            delivery.query = event.target[1].value.trim();
            renderGallery();
            event.target[1].value = '';
        }
    };

    const renderGallery = async () => {
        if (delivery.page === 1) {
            setStatus('newSearch');
            setImages([]);
        } else setStatus('loading');
        try {
            const data = await delivery.fetch();
            setStatus(data.isEnd ? 'endGallery' : 'endLoading');
            setImages(state => [...state, ...data.hits]);
            !data.total && setStatus('noImages');
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const toggleModal = (url = '') => {
        setIsModalShow(state => !state);
        setModalUrl(url);
    };

    return (
        <div className="app">
            <Searchbar onSubmit={handleSubmit} status={status} />
            <ImageGallery images={images} onClick={toggleModal} />
            <Button onClick={renderGallery} status={status} />
            {isModalShow && (
                <Modal onClose={toggleModal}>
                    <img src={modalUrl} alt={modalUrl} />
                </Modal>
            )}
        </div>
    );
};

export default App;
