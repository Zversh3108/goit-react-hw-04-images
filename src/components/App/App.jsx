import React, { useState, useEffect } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { Error } from '../Error/Error';
import GalleryApiServise from '../../services/api-servise';
import css from './App.module.css';

const apiService = new GalleryApiServise();

export function App() {
  const [searchWord, setSearchWord] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageURL, setSelectedImageURL] = useState('');
  const [selectedImageTags, setSelectedImageTags] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleFormSubmit = word => {
    setSearchWord(word);
  
    setCurrentPage(1); // Скидаємо поточну сторінку до першої при новому пошуковому запиті
  };

  const toggleModal = (largeImageURL, tags) => {
    setSelectedImageURL(largeImageURL);
    setSelectedImageTags(tags);
    setShowModal(!showModal);
  };
  useEffect(() => {
    if (!searchWord) {
      return;
    }

    setLoading(true);
    setError(null);
    setShowButton(false);
    apiService
      .fetchPhotos(searchWord, currentPage)
      .then(imagesData => {
        const perPage = apiService.options.get('per_page');
        const hasMoreImages = imagesData.total > perPage * apiService.page;
        setShowButton(hasMoreImages && imagesData.hits.length >= perPage);
        setImages(prevImages => [...prevImages, ...imagesData.hits]);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchWord, currentPage]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    //Юзер робить новий запит тому очищуємо стан Images
    if (searchWord) {
      setImages([]);
    }
  }, [searchWord]);
  const hasImages = images.length > 0;
  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {loading && <Loader />}
      {error ? (
        <Error>{error.message}</Error>
      ) : (
        hasImages && (
          <>
            <ImageGallery images={images} toggleModal={toggleModal} />
            {showButton && <Button onClick={handleLoadMore} />}
            {showModal && (
              <Modal
                imageURL={selectedImageURL}
                tags={selectedImageTags}
                onClose={toggleModal}
              />
            )}
          </>
        )
      )}
    </div>
  );
}
