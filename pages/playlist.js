import React, { useState, useEffect } from 'react';
import { recentlyPlayed } from '../lib/spotify';

const Playlist = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    recentlyPlayed()
      .then((res) => {
        setData(res.data)
      })
  })

  return (
    <h1>placeholder</h1>
  )
}

export default Playlist;