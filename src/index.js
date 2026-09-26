import timer from './modules/timer';
import menu from './modules/menu';
import modal from './modules/modal';
import validation from './modules/validation';
import tabs from './modules/tabs';
import slider from './modules/slider';

timer('22 october 2026');
menu();
modal();
validation();
tabs();

slider({
  containerId: 'all-progects', // default: 'slider'
  slideClass: 'portfolio-item', // default: 'slide'
  activeSlideClass: 'portfolio-item-active', // default: 'slide-active'
  dotsContainer: 'portfolio-dots', // default: 'dots'
  //dotClass: 'dot', // default: 'dot'
  //activeDotClass: 'dot-active', // default: 'dot-active'
  btnClass: 'portfolio-btn', // default: 'arrows'
  // prevBtnId: 'arrow-left', // default: 'arrow-left'
  // nextBtnId: 'arrow-right', // default: 'arrow-right'
  timeInterval: 1000,
});