
const scrollTop = (element: HTMLElement | null) => {
  if (!element) {
    return
  }
  const TopscrollTo = function () {
    if(window.scrollY!=0) {
      setTimeout(function() {
        window.scrollTo(0,window.scrollY-30);
        TopscrollTo();
      }, 5);
    }
  }
  return {
    init: () => element.addEventListener('click', TopscrollTo),
    clear: () => element.removeEventListener('click', TopscrollTo)
  }
};
export default scrollTop
