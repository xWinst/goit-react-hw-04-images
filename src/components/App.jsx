import React from 'react';
import { Searchbar, ImageGallery, Button, Modal } from '../components';
import delivery from '../js/delivery';

export class App extends React.Component {
    state = {
        images: [],
        status: '',
        isModalShow: false,
        modalUrl: '',
    };

    componentDidUpdate(prevProps, prevState) {
        if (delivery.page > 2 && prevState.images !== this.state.images)
            window.scrollBy({
                top: window.innerHeight - 245,
                behavior: 'smooth',
            });
    }

    handleSubmit = event => {
        event.preventDefault();
        if (delivery.query !== event.target[1].value.trim()) {
            delivery.query = event.target[1].value.trim();
            this.renderGallery();
            event.target[1].value = '';
        }
    };

    renderGallery = async () => {
        if (delivery.page === 1) {
            this.setState({ status: 'newSearch', images: [] });
        } else this.setState({ status: 'loading' });
        try {
            const data = await delivery.fetch();
            this.setState(prevState => ({
                images: [...prevState.images, ...data.hits],
                status: data.isEnd ? 'endGallery' : 'endLoading',
            }));
            !data.total && this.setState({ status: 'noImages' });
        } catch (error) {
            console.log('error: ', error);
        }
    };

    toggleModal = (url = '') => {
        this.setState(prevState => ({
            isModalShow: !prevState.isModalShow,
            modalUrl: url,
        }));
    };

    render() {
        const { images, status, isModalShow, modalUrl } = this.state;
        return (
            <div className="app">
                <Searchbar onSubmit={this.handleSubmit} status={status} />
                <ImageGallery images={images} onClick={this.toggleModal} />
                <Button onClick={this.renderGallery} status={status} />
                {isModalShow && (
                    <Modal onClose={this.toggleModal}>
                        <img src={modalUrl} alt={modalUrl} />
                    </Modal>
                )}
            </div>
        );
    }
}
