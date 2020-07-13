import React from 'react';
import styles from '../src/UrlList.module.scss';
import DeleteUrl from './DeleteUrl';

const UrlList = (props) => {
  const { url, slug, shortUrl, handleDelete } = props;

  return (
    <div className={styles.item}>
      <li>
        <p>
          <span className={styles.original_url}>Original Url: </span>
          {url}
        </p>
        <p>
          <span className={styles.short_url}>Short Url: </span>
          {shortUrl}
        </p>
        <p>
          <span className={styles.slug}>Slug: </span>
          {slug}
        </p>
      </li>
      <span className={styles.delete}>
        <DeleteUrl
          handleDelete={() => (handleDelete(slug))}
         />
      </span>
    </div>
  );
};

export default UrlList;
