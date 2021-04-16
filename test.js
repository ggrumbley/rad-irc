if (typeof window === 'undefined') {
  console.log('FUCK OFF');
} else {
  console.log('I like cats');
  window.$ = document.querySelectorAll.bind(document);
}
