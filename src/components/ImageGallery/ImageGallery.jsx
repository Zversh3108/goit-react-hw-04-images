import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageFalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export function ImageGallery({ images, toggleModal }) {
  return (
    <div className={css.Container}>
      <ul className={css.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onClick={toggleModal}
          />
        ))}
      </ul>
    </div>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
