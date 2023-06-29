import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export function ImageGalleryItem(props) {
  const onImageItemClick = () => {
    const { largeImageURL, tags } = props.image;
    props.onClick(largeImageURL, tags);
  };

  const { webformatURL, tags } = props.image;
  return (
    <li onClick={onImageItemClick} className={css['ImageGalleryItem']}>
      <img
        className={css['ImageGalleryItem-image']}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
