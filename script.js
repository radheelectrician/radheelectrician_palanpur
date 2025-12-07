// small interactive effects: parallax on mouse, gentle auto-tilt for hero card
(function(){
  const card = document.querySelector('.card');
  const scene = document.querySelector('.scene');

  // gentle auto-tilt animation
  let angle = 0;
  function autoTilt(){
    angle += 0.12;
    card.style.transform = `rotateY(${Math.sin(angle)*6}deg) rotateX(${Math.cos(angle)*3}deg)`;
    requestAnimationFrame(autoTilt);
  }
  requestAnimationFrame(autoTilt);

  // parallax follow pointer (mobile safe: only small effect)
  function onMove(e){
    const rect = scene.getBoundingClientRect();
    const x = ( (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left) / rect.width - 0.5;
    const y = ( (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top) / rect.height - 0.5;
    const rx = y * 8;
    const ry = x * -12;
    card.style.transform = `rotateY(${ry}deg) rotateX(${rx}deg)`;
  }

  function onLeave(){
    card.style.transform = '';
  }

  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, {passive:true});
  window.addEventListener('mouseleave', onLeave);
  window.addEventListener('touchend', onLeave);

  // tiny accessibility: focusable phone links show ring
  document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach(a=>{
    a.addEventListener('focus',()=> a.classList.add('focus'));
    a.addEventListener('blur',()=> a.classList.remove('focus'));
  });
})();