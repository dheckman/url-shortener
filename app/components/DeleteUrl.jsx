import React from 'react';
import styles from '../src/DeleteUrl.module.scss';
import { Icon } from 'semantic-ui-react';

const DeleteUrl = (props) => {
  const { handleDelete } = props;

  return (
    <div className={styles.item}>
      <Icon
        name="trash alternate outline"
        size="large"
        onClick={handleDelete}
      />
    </div>
  );
};

export default DeleteUrl;