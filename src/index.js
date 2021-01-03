const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';
document.addEventListener('DOMContentLoaded', () => {
  elementListener('#dog-image-container', imgUrl, 'div');
  elementListener('#dog-breeds', breedUrl, 'li');
  dropDownOption('all');
  dropListener();
});

const elementListener = (targetID, URL, newElement) => {
  const target = document.querySelector(targetID);
  fetch(URL)
    .then( (response) => response.json() )
    .then( (data) => showData(target, data.message, newElement) );
}

const showData = (target, data, element) => {
  if (element === 'div') {
    handleDiv(target, data, element);
  }
  if (element === 'li') {
    handleList(target, data, element);
  }
}
const handleDiv = (target, data, element) => {
  data.forEach(dogImage => {
    let dogContainer = document.createElement(element);
    target.appendChild(dogContainer);
    dogContainer.innerHTML = `<img src="${dogImage}" height="200" width="200">`;
  }) 
}

const handleList = (target, data, element) => {
  for (const [key, value] of Object.entries(data)) {
    let dogList = document.createElement(element);
    dogList.innerText = key;
    target.appendChild(dogList);
    if (value.length > 0) {
      value.forEach(value => handleSubList(dogList, value, element) )
    }
    listChildListener(dogList);
  }
}

const handleSubList = (target, data, element) => {
  let subListNode = document.createElement('ul');
  let dogSubList = document.createElement(element);
  dogSubList.innerText = data;
  target.appendChild(subListNode); 
  subListNode.appendChild(dogSubList); 
}

const listChildListener = (child) => {
  child.addEventListener('click', () => {
    colorSwitch(child);
  })
}

let clicked = false;
const colorSwitch = (node) => {
  console.log('asdfsf')
  clicked = !clicked;
  if (clicked) {
    node.style.color = 'blue';
  } else {
    node.style.color = 'black';
  }
}

const dropListener = () => {
  const dropDown = document.querySelector('#breed-dropdown');
  dropDown.addEventListener('change', (event) => {
    listFilter(event.target.value);
  });
}

const listFilter = (value) => {  
  const children = document.querySelector('#dog-breeds').children;
  for (child of children) {
    if (child.innerHTML.charAt(0) === value || value === 'all') {
      child.style.display = 'block';
    } else {
      child.style.display = 'none';
    }
  }
}

const dropDownOption = (value) => {
  const dropDown = document.querySelector('#breed-dropdown');
  const option = document.createElement('option');
  option.innerText = value;
  option.value = value;
  dropDown.appendChild(option);
} 