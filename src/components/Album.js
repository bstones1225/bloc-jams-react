import React, { Component } from 'react';
import albumData from './../data/albums';
import './Album.css';
import PlayerBar from './PlayerBar';


class Album extends Component {
  constructor(props) {
   super(props);
   const album = albumData.find( album => {
    return album.slug === this.props.match.params.slug
    });

  this.state = {
    album: album,
    currentSong: album.songs[0],
    currentTime: 0,
    duration: album.songs[0].duration,
    isPlaying: false,
    currentVolume: 0.0,
    isMouseInside:null
  };
    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
 }

 componentDidMount() {
   this.eventListeners = {
     timeupdate: e => {
       this.setState({ currentTime: this.audioElement.currentTime });
     },
     durationchange: e => {
       this.setState({ duration: this.audioElement.duration });
     }

  };
   this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
   this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
}

 componentWillUnmount() {
   this.audioElement.src = null;
   this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
   this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);

}

 play() {
   this.audioElement.play();
   this.setState({ isPlaying: true });
    }

 pause() {
     this.audioElement.pause();
     this.setState({ isPlaying: false });
    }

 setSong(song) {
     this.audioElement.src = song.audioSrc;
     this.setState({ currentSong: song });
    }

  handleSongClick(song) {
     const isSameSong = this.state.currentSong === song;
     if (this.state.isPlaying && isSameSong) {
       this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }
  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }
  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length-1, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }
  handleTimeChange(e) {
     const newTime = this.audioElement.duration * e.target.value;
     this.audioElement.currentTime = newTime;
     this.setState({ currentTime: newTime });
   }
  handleVolumeChange(e) {
     const newVolume = e.target.value;
     this.audioElement.volume = newVolume;
     this.setState({ currentVolume: newVolume });
    }
  formatTime(time) {
     var minutes = Math.floor(time / 60);
     var seconds = Math.round(time - minutes * 60);
     if (seconds < 10) {
       return minutes + ": 0" + seconds
   } else {
       return minutes + ":" + seconds
   }
 }



  mouseEnter = (song) => {
    this.setState({ isMouseInside: song });
  }
  mouseLeave = (song) => {
    this.setState({ isMouseInside: song });
  }

getSongIcon(song,index){
if (song === this.state.isMouseInside) {
  if (song === this.state.currentSong && this.state.isPlaying) {
    return (<span className = "ion-md-pause"></span>);}
  else {return (<span className ="ion-md-play"></span>);}
}
else {
if (song === this.state.currentSong) {
return (<span className = "ion-md-play"></span>);
} else {
return (index+1)
}
}
}


   render() {
     return (

    <section className="album">

       <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <h6 id="release-info">{this.state.album.releaseInfo}</h6>
          </div>

      <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
          {this.state.album.songs.map((song, index) =>(
            <tr key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.mouseEnter(song)} onMouseLeave={() => this.mouseLeave(song)}>
            <td id>{this.getSongIcon(song,index)}  </td>
            <td className="title">{song.title}</td>
            <td>{this.formatTime(song.duration)}</td>
            </tr>
          ))}
          </tbody>
      </table>


          <PlayerBar
            isPlaying={this.state.isPlaying}
            currentSong={this.state.currentSong}
            currentTime={this.audioElement.currentTime}
            duration={this.audioElement.duration}
            currentVolume={this.audioElement.currentVolume}
            handleSongClick={() => this.handleSongClick(this.state.currentSong)}
            handlePrevClick={() => this.handlePrevClick()}
            handleNextClick={() => this.handleNextClick()}
            handleTimeChange={(e) => this.handleTimeChange(e)}
            handleVolumeChange={(e) => this.handleVolumeChange(e)}
            formatTime={(time) => this.formatTime(time)}
          />
  </section>


     );
   }
 }
export default Album;
