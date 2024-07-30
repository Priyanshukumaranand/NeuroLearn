const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }

  res.send(`
    <img src="${req.user.avatar}" alt="Avatar">
    <p>Email: ${req.user.email}</p>
    <a href="/quizzes">Quizzes</a>
    <a href="/courses">Courses</a>
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
    const searchResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: req.query.q,
        key: process.env.YOUTUBE_API_KEY,
        type: 'video',
        maxResults: 3
      }
    });

    const videoIds = searchResponse.data.items.map(item => item.id.videoId).join(',');

    const statsResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'statistics',
        id: videoIds,
        key: process.env.YOUTUBE_API_KEY
      }
    });

    const videos = searchResponse.data.items.map(item => {
      const stats = statsResponse.data.items.find(stat => stat.id === item.id.videoId);
      // console.log(stats);
      return {
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.default.url,
        likes: stats.statistics.likeCount,
        dislikes: stats.statistics.dislikeCount,
        views: stats.statistics.viewCount,
        Comments: stats.statistics.commentCount,
      };
    });

    let html = `
      <img src="${req.user.avatar}" alt="Avatar">
      <p>Email: ${req.user.email}</p>
      <a href="/quizzes">Quizzes</a>
      <a href="/courses">Courses</a>
      <a href="/logout">Logout</a>
      <form action="/profile/search" method="get">
        <input type="text" name="q" placeholder="Search for videos">
        <button type="submit">Search</button>
      </form>
      <h2>Search Results:</h2>
    `;

    videos.forEach(video => {
      html += `
        <div>
          <h3>${video.title}</h3>
          <p>Likes: ${video.likes}</p>
          <p>Views: ${video.views}</p>
          <p>Comment: ${video.Comments}</p>
          <p>${video.description}</p>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.videoId}" frameborder="0" allowfullscreen></iframe>
        </div>
      `;
    });

    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;