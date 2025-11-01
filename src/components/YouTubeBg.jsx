import React, { useEffect, useRef } from 'react';

export default function YouTubeBg({ id, className = '', style = {}, title = '' }){
  const ref = useRef(null);
  useEffect(() => {}, []);
  const src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&modestbranding=1&rel=0&showinfo=0`;
  return (
    <div className={className} style={{position: 'relative', overflow: 'hidden', width: '100%', height: '100%', ...style}} aria-hidden="true">
      <iframe
        title={title || 'background-video'}
        ref={ref}
        src={src}
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        style={{position:'absolute', top:0, left:0, width:'100%', height:'100%', border:0, pointerEvents:'none'}}
      />
    </div>
  );
}