import React from 'react';
import styles from '../src/App.module.scss';
import UrlShortener from '../components/UrlShortener';
import UrlList from '../components/UrlList';
import fetch from '../lib/fetch';
import ErrorBoundary from './ErrorBoundary';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlList: [],
    };
  }

  componentDidMount = async () => {
    this.populateUrlList();
  }

  populateUrlList = async () => {
    try {
      const urlList = await fetch.get('http://api.bely.me/links')
      this.setState({
        urlList
      })
    } catch (error) {
      this.setState({
        error: "Failed to load. Please reload the page.",
      })
    }
  }

  updateUrlValue = (attribute, value) => {
    this.setState({
      [attribute]: value,
    });
  }

  createShortUrl = async (e) => {
    e.preventDefault();
    const { urlToCreate, slug } = this.state;
    if (urlToCreate) {
      try {
        const newUrl = await fetch.create('http://api.bely.me/links', {
          url: urlToCreate,
          slug,
        })
        this.setState(prevState => ({
          urlToCreate: '',
          slug: '',
          urlList: [...prevState.urlList, newUrl]
        }))
      } catch (error) {
        error.text().then((errorMessage) => {
          this.setState({
            error: errorMessage
          })
        })
      }
    }
  }

  handleDelete = async (slug) => {
    const { urlList } = this.state;
    window.confirm('Are you sure you want to delete this url?');
    await fetch.remove(`http://api.bely.me/links/${slug}`)
    const updatedUrlList = urlList.filter((url) => url.slug !== slug);
    this.setState({
      urlList: updatedUrlList,
    });
  }

  render() {
    const { urlToCreate, urlList, error } = this.state;
    const errorText = error ? error : '';
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.header_content}>
            <a href="https://goldbelly.com" className={styles.logo_link}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 26.1" role="img" aria-labelledby="do2gnytnnu4whpot1gsehtojtlrl348" className={styles.logo}><title id="do2gnytnnu4whpot1gsehtojtlrl348">Goldbelly</title><path d="M98.21 8.93c-1.73-.36-3.4-.68-4.96-.95a2.14 2.14 0 00-.88.02l-.04-.01a2.12 2.12 0 00-.89-.36c-1.36-.24-2.74-.48-4.11-.7-.03-.01-.05-.03-.05-.07l.23-1.56a2.26 2.26 0 00-1.9-2.57c-1.67-.25-3.36-.49-5.04-.7l-.29-.02c-.15 0-.3.02-.45.05l-.04-.01a2.27 2.27 0 00-.82-.27c-1.68-.2-3.38-.39-5.07-.56l-.22-.01a2.27 2.27 0 00-2.24 2.05l-.21 2.15c0 .04-.05.07-.09.04a8.77 8.77 0 00-4.13-1.25l-.63-.02c-2.16 0-4.04.74-5.4 1.99-.03.02-.06.02-.08-.01a6.22 6.22 0 00-4.81-2.52h-.23l-.45.02c-.03 0-.06-.02-.06-.06l.02-1.29A2.26 2.26 0 0053.12 0h-5.04c-.28 0-.56.05-.81.15h-.04c-.23-.08-.5-.13-.76-.13-1.69.02-3.41.06-5.08.12a2.25 2.25 0 00-2.18 2.31l.04 1.32c0 .03-.03.06-.06.06h-.15l-.35.01a6.41 6.41 0 00-3.36 1.14c-.04.03-.09 0-.09-.04l-.16-2.24A2.25 2.25 0 0032.84.61l-.16.01c-1.68.11-3.39.25-5.07.41a2.26 2.26 0 00-2.04 2.45l.24 2.6c0 .05-.05.08-.09.05-.97-.65-1.46-1.01-2.83-.81-1.26.18-1.82 1.25-2.23 1.35-.36.08-1.15-.93-2.88-.58-1.08.22-1.58.72-2.28 1.46-.03.03-.07.03-.09 0a2.26 2.26 0 00-2.09-.82c-1.58.24-3.18.51-4.76.78-.3.04-.56.14-.79.28h-.04a7.62 7.62 0 00-2.78.13 6.45 6.45 0 00-4.79 7.7 6.57 6.57 0 002.42 3.97c.02.02.03.04.02.06a4.39 4.39 0 00-.16 2.39c.22 1.1 1.19 3.64 5.37 3.64.78 0 1.66-.09 2.63-.26 2.63-.47 4.38-1.37 5.51-2.82.33-.43.61-.86.8-1.37.23-.65.38-1.28.46-1.97l.07-.58c.02-.13-.01-.3.06-.41.11-.18.37.05.48.13.53.43 1.11.79 1.69 1.13a6.1 6.1 0 001.73.72c.31.07.63.1.95.09a5.4 5.4 0 003.79-1.96c.2-.21.47-.65.63-.89.08-.12.15-.13.23 0 .08.12.2.34.3.47a2.25 2.25 0 002.77.81 4.41 4.41 0 013.13-.3 2.25 2.25 0 002.58-.88c.02-.03.05-.03.08-.02a6 6 0 003.2.92l.3-.01a6.38 6.38 0 002.13-.48c.24.08.52.13.78.13 1.69-.05 3.21-.09 4.58-.11.24 0 .47-.05.69-.12h.03c.23.08.49.12.74.12l2.17-.02 2.38.02c.27 0 .55-.05.8-.14h.04c.66.26 1.37.41 2.1.44h.18c1.78 0 3.41-.75 4.62-2.11.02-.03.06-.03.09 0 .17.19.35.37.55.55a8.98 8.98 0 005.38 2.1 14.57 14.57 0 004.38-.25l.05.01c.34.29.77.47 1.22.52a249.97 249.97 0 014.97.54c.13 0 .26-.01.39-.04l.04.01c.23.12.49.21.76.24 1.43.18 2.87.38 4.31.59.03 0 .05.03.05.05a4.35 4.35 0 001.53 2.95c1.06.93 2.63 1.56 4.8 1.95.89.16 1.69.24 2.43.24 3.73 0 6.05-2.05 6.9-6.11l1.65-7.99a2.23 2.23 0 00-1.73-2.64z" fill="#fff"></path><path d="M13.64 9.07c-1.57.24-3.15.5-4.71.78l.18 1.01a4.3 4.3 0 00-3.32-.68l-.31.06a4.2 4.2 0 00-3.11 5.07 4.24 4.24 0 004.03 3.52c-1.36.7-1.97 1.79-1.74 2.9.28 1.36 1.64 2.3 5.39 1.62 4.01-.72 5.41-2.52 4.85-6.21l-1.26-8.07zm-6.51 5.69c-.15-.81.23-1.59 1.01-1.75l.05-.01a1.4 1.4 0 011.52 1.27c.15.85-.26 1.63-1.03 1.76-.76.15-1.39-.44-1.55-1.27zm2.64 5.95a.82.82 0 01-1.03-.76c-.23-1.28 1.56-1.76 1.56-1.76l.22 1.28c.14.72-.17 1.14-.75 1.24zM27.81 3.4l1.22 13.46c1.58-.14 3.17-.27 4.75-.38L32.84 3c-1.68.11-3.36.24-5.03.4zm13.65-.87l.15 4.77a3.61 3.61 0 00-2.8-1.08c-2.68.12-4.39 2.55-4.2 5.32.19 2.78 2.02 4.96 4.49 4.85a3.95 3.95 0 002.96-1.6l.04 1.24c1.52-.05 3.05-.09 4.58-.11l-.19-13.51c-1.68.02-3.36.06-5.03.12zm-.66 10.31c-.83.03-1.43-.67-1.47-1.57-.04-.9.5-1.66 1.35-1.69.85-.03 1.45.7 1.48 1.58.02.92-.53 1.65-1.36 1.68zm15.21-6.81a3.95 3.95 0 00-2.96 1.17l.07-4.81h-5.04l.07 13.54c1.53-.03 3.05-.02 4.58 0v-1.24a3.9 3.9 0 002.99 1.54c2.49.07 4.27-2.15 4.41-4.95.14-2.8-1.52-5.16-4.12-5.25zm-2.03 6.68c-.83-.02-1.39-.76-1.38-1.65.01-.89.59-1.62 1.44-1.6.85.01 1.41.78 1.38 1.66-.02.89-.6 1.6-1.44 1.59zm12.88-6.13c-3.03-.21-5.69 1.6-5.82 4.64-.16 3.53 2.43 5.31 5.62 5.55 1.43.12 2.87.01 4.27-.33-.07-.93-.16-1.85-.24-2.78-.86.21-1.76.29-2.64.24-1.28-.1-2.3-.39-2.67-1.24 2.11.14 4.21.3 6.29.5.82-3.4-.48-6.26-4.81-6.58zm-1.47 3.9c.2-.68.64-1.23 1.41-1.19.77.04 1.07.67 1.11 1.37l-2.52-.18zm8.3-6.88l-1.34 13.45c1.59.16 3.17.33 4.75.52l1.62-13.42a297 297 0 00-5.03-.55zm6.6.8l-1.72 13.41c1.58.2 3.15.42 4.73.66l2-13.37c-1.67-.26-3.34-.49-5.01-.7zm12.58 5.92l-.96 5.16a.9.9 0 11-1.76-.32c.29-1.74.59-3.47.9-5.19-1.64-.29-3.27-.57-4.91-.82l-.91 5.8c-.23 1.47.52 2.52 2.17 2.93-1.45.22-2.34 1.01-2.51 2.09-.22 1.38.73 2.73 4.47 3.39 4.02.73 5.97-.45 6.74-4.12l1.65-7.99a167.5 167.5 0 00-4.88-.93zm-1.79 9.58c-.11.59-.41 1-1.1.88l-.16-.03a.76.76 0 01-.48-.96c.21-1.26 1.97-1.18 1.97-1.18l-.23 1.29zM26.02 8.11a3.01 3.01 0 00-2.33-.61 3.11 3.11 0 00-2.49 2.14 3.01 3.01 0 00-2.98-1.29c-.83.13-1.56.59-2.06 1.29-.5.7-.58 1.39-.45 2.25a4.4 4.4 0 001.12 2.44c.31.43.74.71 1.44 1.29a23 23 0 002.32 1.74c.7.43 1.18.99 1.89.86.72-.14 1.33-1.01 1.73-1.56.69-.93 1.34-1.79 1.98-2.76a5.38 5.38 0 00.92-3.91 2.62 2.62 0 00-1.09-1.88z"></path></svg>
            </a>
            <h1 className={styles.subheading}>url shortener</h1>
          </div>
        </header>
        <div className={styles.url_shortener_wrapper}>
          <UrlShortener
            updateUrlValue={this.updateUrlValue}
            createShortUrl={this.createShortUrl}
            urlToCreate={urlToCreate}
           />
        </div>
        <ul className={styles.url_list}>
          <p className={styles.error}>{errorText}</p>
          {(
            urlList.map((url) => (
              <ErrorBoundary errorMessage={error}>
                <UrlList
                  url={url.url}
                  slug={url.slug}
                  shortUrl={url.short_url}
                  handleDelete={this.handleDelete}
                />
              </ErrorBoundary>
            ))
          )}
        </ul>
      </div>
    );
  };
}

export default App;
