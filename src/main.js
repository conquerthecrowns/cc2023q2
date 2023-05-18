import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'

console.log('Connected')

// Smooth Scrolling //
function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical', // vertical, horizontal
    gestureDirection: 'vertical', // vertical, horizontal, both
    smooth: true,
    mouseMultiplier: 0.6,
    smoothTouch: false,
    touchMultiplier: 1.5,
    infinite: false,
  })
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
}
initSmoothScroll()

// Check if loader has been loaded before
if (sessionStorage.getItem('visited') !== null) {
  document.querySelector('.intro').remove()
}
sessionStorage.setItem('visited', 'true')

// Stagger each rider //
const race = gsap.timeline({
  paused: true,
})
race.to('.choquer-race_item', {
  duration: () => gsap.utils.random(1, 12),
  x: '75vw',
  stagger: {
    amount: 1,
    ease: 'power1.inOut',
    from: 'random',
    onComplete: function () {
      gsap.to(this.targets()[0], { opacity: 0 })
    },
  },
})

// Trigger the race //
document.querySelector('.choquer-race_start').onclick = function () {
  race.play()
}
document.querySelector('.choquer-race_restart').onclick = function () {
  window.location.reload()
}
