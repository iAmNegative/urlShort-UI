import { useState } from 'react';
import axios from 'axios';
import './components/UrlShortener.css'; // Import the CSS file

export default function UrlShortener() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const handleShorten = async () => {
        if (!originalUrl) return;
        try {
            const response = await axios.post('https://urlshort-teuc.onrender.com/shorten', originalUrl, {
                headers: { 'Content-Type': 'text/plain' }
            });
            setShortUrl(response.data);
        } catch (error) {
            alert('Failed to shorten URL. Please try again.');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        alert('URL copied to clipboard!');
    };

    return (
        <div className="container">
            <div className="card">
                <h1 className="title">🔗 URL Shortener</h1>
                <input
                    type="text"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    placeholder="Enter your URL here"
                    className="input"
                />
                <button onClick={handleShorten} className="button">
                    Shorten URL
                </button>

                {shortUrl && (
                    <div className="result">
                        <p>Shortened URL:</p>
                        <div className="short-url">
                            <a
                                href={shortUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {shortUrl}
                            </a>
                            <button className="copy-btn" onClick={handleCopy}>
                                📋 Copy
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
