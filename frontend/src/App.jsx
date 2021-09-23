import { Logo } from './cmps/Logo.jsx';

export const App = () => {

  return (
    <div className="App">
      <Logo />

      <div className="player-container">
        <iframe frameBorder="0"
          allowFullScreen="1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="YouTube video player"
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/CHekNnySAfM?autoplay=1&amp;mute=0&amp;controls=0&amp;origin=https%3A%2F%2Fca-beatbox.herokuapp.com&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=3"
          id="widget4"></iframe>
      </div>

      <a>Based on your recent listening</a>
    </div>

  );
}


