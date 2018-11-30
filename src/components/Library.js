import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Library.css';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
     super(props);
     this.state = {albums: albumData};
   }

   render() {
    return (
      <section className='library'>
      {
        this.state.albums.map( (album, index) =>
        <div className="albums">
          <Link to={`/album/${album.slug}`} key={index}>
            <img src={album.albumCover} alt={album.title} />
            <div className="albumInfo">{album.title}</div>
            <div className="albumInfo">{album.artist}</div>
            <div className="albumInfo">{album.songs.length} songs</div>
          </Link>
        </div>
   )
 }

      </section>
    );
   }
 }
export default Library;
