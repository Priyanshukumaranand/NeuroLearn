const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }

  res.send(`
    <h1>Welcome ${req.user.name}</h1>
    <img src="${req.user.avatar}" alt="Avatar">
    <p>Email: ${req.user.email}</p>
    <a href="/logout">Logout</a>
    <form action="/profile/search" method="get">
      <input type="text" name="q" placeholder="Search for videos">
      <button type="submit">Search</button>
    </form>
  `);
});

router.get('/search', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: req.query.q,
        key: process.env.YOUTUBE_API_KEY,
        type: 'video',
        maxResults: 3
      }
    });

    const videos = response.data.items.map(item => {
      return {
        title: item.snippet.title,
        description: item.snippet.description,
        videoId: item.id.videoId
      };
    });

    let html = `
      <h1>Welcome ${req.user.name}</h1>
      <img src="${req.user.avatar}" alt="Avatar">
      <p>Email: ${req.user.email}</p>
      <a href="/logout">Logout</a>
      <form action="/profile/search" method="get">
        <input type="text" name="q" placeholder="Search for videos">
        <button type="submit">Search</button>
      </form>
      <h2>Search Results</h2>
    `;

    videos.forEach(video => {
      html += `
        <div>
          <h3>${video.title}</h3>
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