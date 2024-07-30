const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: req.query.q,
        key: process.env.YOUTUBE_API_KEY,
        type: 'video'
      }
    });

    const videos = response.data.items.map(item => {
      return {
        title: item.snippet.title,
        description: item.snippet.description,
        videoId: item.id.videoId
      };
    });

    let html = '<h1>Search Results</h1>';
    videos.forEach(video => {
      html += `
        <div>
          <h2>${video.title}</h2>
          <p>${video.description}</p>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.videoId}" frameborder="0" allowfullscreen></iframe>
        </div>
      `;
    });

    res.send(html);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

module.exports = router;