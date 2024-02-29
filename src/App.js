import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

function App() {
  const [songName, setSongName] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    setSongName(event.target.value);
  };

  const handleSearch = async () => {
    if (!songName) {
      setErrorMessage('Please enter a song name.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get('https://spotify81.p.rapidapi.com/download_track', {
        params: {
          q: songName,
          onlyLinks: '1'
        },
        headers: {
          'X-RapidAPI-Key': '89a70ee230msh5cd3e527f447396p19d58cjsnab0cbda29d4e',
          'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
        }
      });
      if (response.data && response.data.length > 0) {
        setDownloadLink(response.data[0].url);
      } else {
        setErrorMessage('No download link found for the given song name.');
      }
    } catch (error) {
      console.error('Error fetching download link:', error);
      setErrorMessage('Error fetching download link. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Music Downloader</h1>
      <div className="input-container">
        <input
          type="text"
          value={songName}
          onChange={handleChange}
          placeholder="Enter song name"
        />
        <button onClick={handleSearch} disabled={isLoading}>Search</button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {isLoading && <p>Loading...</p>}
      {downloadLink && (
        <div className="result-container">
          <p>Download Link: {downloadLink}</p>
          <a href={downloadLink} className="button" target="_blank" rel="noopener noreferrer">Download</a>
        </div>
      )}
    </div>
  );
}

export default App;
