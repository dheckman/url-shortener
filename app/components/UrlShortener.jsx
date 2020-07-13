import React from 'react';
import styles from '../src/UrlShortener.module.scss';

const UrlShortener = (props) => {
  const { updateUrlValue, createShortUrl  } = props;

  return (
    <div className={styles.form_wrapper}>
      <div className={styles.form}>
        <input
          placeholder="enter url (e.g., www.foodisthebest.com)"
          type="text"
          name="url"
          className={styles.input}
          id="url"
          aria-labelledby="UrlShortener_submit"
          onChange={event => updateUrlValue('urlToCreate', event.target.value)}
        />
        <input
          placeholder="slug"
          type="text"
          name="slug"
          className={styles.slug_input}
          id="slug"
          aria-labelledby="UrlShortener_submit"
          onChange={event => updateUrlValue('slug', event.target.value)}
        />
        <button
          className={styles.button}
          id="UrlShortener_submit"
          type="submit"
          onClick={(e) => (createShortUrl(e))}
        >
          Generate url
        </button>
      </div>
    </div>
  );
};

export default UrlShortener;
