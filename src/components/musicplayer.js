import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { db, firebase, storage } from '../static/js/firebase'

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      play: false,
      currentTime: 0,
    }
    this.audio = React.createRef()
    this.timeline = React.createRef()
    this.handle = React.createRef()
    this.volume = React.createRef()
    this.handle__volume = React.createRef()
    this.mouseUp = this.mouseUp.bind(this)
    this.mouseMove = this.mouseMove.bind(this)
    this.mouseDown = this.mouseDown.bind(this)
    this.volumeMove = this.volumeMove.bind(this)
    this.mouseUpVolume = this.mouseUpVolume.bind(this)
    this.mouseDownVolume = this.mouseDownVolume.bind(this)
  }
  componentDidMount() {
    let audio = this.audio.current
    let timeline = this.timeline.current
    let timelineLeft = timeline.getBoundingClientRect()
    audio.addEventListener("timeupdate", () => {
      let ratio = audio.currentTime / audio.duration;
      let position = (timeline.offsetWidth * ratio) + timelineLeft.left;
      this.positionHandle(position);
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          currentTime: Math.floor(audio.currentTime),
        }
        return newState
      })
    });
    audio.addEventListener("ended", () => {
      if (this.props.ended) {
        this.props.ended();
      }
    });
  }
  render() {
    let audio = this.audio.current
    if (audio == null) {
      return (
        <div className='musicplayer'>
          <audio src='https://firebasestorage.googleapis.com/v0/b/wowmusic-310c5.appspot.com/o/mp3%2F%E9%82%A3%E5%A5%B3%E5%AD%A9%E5%B0%8D%E6%88%91%E8%AA%AA?alt=media&token=330c3824-9bbc-4f05-a876-2904f4666121' ref={this.audio} />
          <div className='now-playing-bar'>
            <div className='now-playing-bar__left'>
              <div className='container'>
                <div className='album'>
                  <img src="https://i.scdn.co/image/ab67616d000048513d0ffcf6ee624625158fa352" />
                </div>
                <div className='song-inform'>
                  <div className='name'>太陽</div>
                  <div className='singer'>邱振哲</div>
                </div>
                <div className='like-btn'>
                  <i className="far fa-heart"></i>
                </div>
              </div>
            </div>
            <div className='now-playing-bar__center'>
              <div className='container'>
                <div className='player-controls__btns'>
                  <div><i className="fas fa-random"></i></div>
                  <div><i className="fas fa-step-backward"></i></div>
                  <div onClick={this.play.bind(this)}><i className={!this.state.play ? "far fa-play-circle" : "far fa-pause-circle"}></i></div>
                  <div><i className="fas fa-step-forward"></i></div>
                  <div><i className="fas fa-retweet"></i></div>
                </div>
                <div className='playback-bar'>
                  <div className='progress-time'>0:00</div>
                  <div className='progress-bar'>
                    <div className='container'>
                      <div className='timeline' onClick={this.mouseMove} ref={this.timeline}>
                        <div className='handle' onMouseDown={this.mouseDown} ref={this.handle}></div>
                      </div>
                      {/* <button></button> */}
                    </div>
                  </div>
                  <div className='song-length'>4:22</div>
                </div>
              </div>
            </div>
            <div className='now-playing-bar__right'>
              <div className='container'>
                <div className='waiting-list'>
                  <Link to='/musicqueue'>
                    <i className="fas fa-bars"></i>
                  </Link>
                </div>
                <div className='volume-bar'>
                  <div className='volume-btn'>
                    <i className="fas fa-volume-up"></i>
                  </div>
                  <div className='progress-bar'>
                    <div className='container'>
                      <div className='volume' onClick={this.volumeMove} ref={this.volume}>
                        <div className='handle__volume' onMouseDown={this.mouseDownVolume} ref={this.handle__volume}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    else {
      let { currentTime, duration } = this.state
      if (currentTime === 0) {
        currentTime = '0:00'
      }
      else if (currentTime < 10) {
        currentTime = '0:0' + currentTime
      }
      else if (currentTime >= 10 && currentTime < 60) {
        currentTime = '0:' + currentTime
      }
      else {
        let seconds = Math.floor(currentTime % 60)
        if (seconds < 10) seconds = '0' + seconds
        currentTime = Math.floor(currentTime / 60).toString() + ':' + seconds
      }
      return (
        <div className='musicplayer'>
          <audio src='https://firebasestorage.googleapis.com/v0/b/wowmusic-310c5.appspot.com/o/mp3%2F%E9%82%A3%E5%A5%B3%E5%AD%A9%E5%B0%8D%E6%88%91%E8%AA%AA?alt=media&token=330c3824-9bbc-4f05-a876-2904f4666121' ref={this.audio} />
          <div className='now-playing-bar'>
            <div className='now-playing-bar__left'>
              <div className='container'>
                <div className='album'>
                  <img src="https://i.scdn.co/image/ab67616d000048513d0ffcf6ee624625158fa352" />
                </div>
                <div className='song-inform'>
                  <div className='name'>太陽</div>
                  <div className='singer'>邱振哲</div>
                </div>
                <div className='like-btn'>
                  <i className="far fa-heart"></i>
                </div>
              </div>
            </div>
            <div className='now-playing-bar__center'>
              <div className='container'>
                <div className='player-controls__btns'>
                  <div><i className="fas fa-random"></i></div>
                  <div><i className="fas fa-step-backward"></i></div>
                  <div onClick={this.play.bind(this)}><i className={!this.state.play ? "far fa-play-circle" : "far fa-pause-circle"}></i></div>
                  <div><i className="fas fa-step-forward"></i></div>
                  <div><i className="fas fa-retweet"></i></div>
                </div>
                <div className='playback-bar'>
                  <div className='progress-time'>{currentTime}</div>
                  <div className='progress-bar'>
                    <div className='container'>
                      <div className='timeline' onClick={this.mouseMove} ref={this.timeline}>
                        <div className='handle' onMouseDown={this.mouseDown} ref={this.handle}></div>
                      </div>
                      {/* <button></button> */}
                    </div>
                  </div>
                  <div className='song-length'>4:22</div>
                </div>
              </div>
            </div>
            <div className='now-playing-bar__right'>
              <div className='container'>
                <div className='waiting-list'>
                  <Link to='/musicqueue'>
                    <i className="fas fa-bars"></i>
                  </Link>
                </div>
                <div className='volume-bar'>
                  <div className='volume-btn'>
                    <i className="fas fa-volume-up"></i>
                  </div>
                  <div className='progress-bar'>
                    <div className='container'>
                      <div className='volume' onClick={this.volumeMove} ref={this.volume}>
                        <div className='handle__volume' onMouseDown={this.mouseDownVolume} ref={this.handle__volume}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  play() {
    let audio = this.audio.current
    if (this.state.play) {
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          play: false
        }
        return newState
      })
      audio.pause()
    } else {
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          play: true
        }
        return newState
      })
      audio.play()
    }
  }
  positionHandle(position) {
    let timeline = this.timeline.current
    let timelineLeft = timeline.getBoundingClientRect()
    let handle = this.handle.current
    let timelineWidth = timeline.offsetWidth - handle.offsetWidth
    let handleLeft = position - timelineLeft.left
    if (handleLeft > 0 && handleLeft <= timelineWidth) {
      handle.style.marginLeft = handleLeft + 'px'
    }
    if (handleLeft < 0) {
      handle.style.marginLeft = '0px'
    }
    if (handleLeft > timelineWidth) {
      handle.style.marginLeft = timelineWidth + 'px'
    }
  }
  volumeHandle(position) {
    let volume = this.volume.current
    let volumeLeft = volume.getBoundingClientRect()
    let handle__volume = this.handle__volume.current
    let volumeWidth = volume.offsetWidth - handle__volume.offsetWidth
    let handle__volumeLeft = position - volumeLeft.left
    
    if (handle__volumeLeft > 0 && handle__volumeLeft <= volumeWidth) {
      handle__volume.style.marginRight = (volumeWidth - handle__volumeLeft + 12) + 'px'
    }
    if (handle__volumeLeft < 0) {
      handle__volume.style.marginRight = volumeWidth + 'px'
    }
    if (handle__volumeLeft > volumeWidth) {
      handle__volume.style.marginRight = '0px'
    }
  }
  volumeMove(e) {
    let audio = this.audio.current
    let volume = this.volume.current
    let volumeLeft = volume.getBoundingClientRect()

    this.volumeHandle(e.pageX)
    let sound = ((e.pageX - volumeLeft.left) / volume.offsetWidth).toFixed(1)
    if (sound <= 1) {
      audio.volume = sound
    }
    else {
      audio.volume = 1
    }
  }
  mouseMove(e) {
    let audio = this.audio.current
    let timeline = this.timeline.current
    let timelineLeft = timeline.getBoundingClientRect()
    
    this.positionHandle(e.pageX)
    audio.currentTime = ((e.pageX - timelineLeft.left) / timeline.offsetWidth) * audio.duration
  }
  mouseUp(e) {
    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mouseup', this.mouseUp);
  };
  mouseDown(e) {
    window.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('mouseup', this.mouseUp);
  };
  mouseUpVolume(e) {
    window.removeEventListener('mousemove', this.volumeMove);
    window.removeEventListener('mouseup', this.mouseUpVolume);
  }
  mouseDownVolume(e) {
    window.addEventListener('mousemove', this.volumeMove);
    window.addEventListener('mouseup', this.mouseUpVolume);
  }
}

export default MusicPlayer
