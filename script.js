let main = getComputedStyle(document.documentElement).getPropertyValue('--main')

function colorChange() {
  
  if (localStorage.getItem('theme') === 'adaptative') {

    document.documentElement.style.setProperty('--main', getComputedStyle(document.documentElement).getPropertyValue(main));

  } else if (localStorage.getItem('theme') === 'dark') {

    document.documentElement.style.setProperty('--main', getComputedStyle(document.documentElement).getPropertyValue('--cards'));

  }

}