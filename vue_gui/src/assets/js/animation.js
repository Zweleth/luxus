import store from '@/store'


let perfumes = this.$store.state.perfumes;
let shift = (100/3)*(perfumes.length);
let animation = `
@keyframes slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(${shift}vw);
    }
  }
`
use(store);
