const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash api
const count = 10;
const apiKey = 'RLT0tZocz7ZUop-40IbnZ-STD0v1gsgTEkWY9AKQF50';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
const imageLoaded = () => {
  console.log('image loaded', imagesLoaded + 1);
  imagesLoaded += 1;
  // loader.hidden = false; // me: show loader when loading
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log('ready = ', ready);
  }
};

// helper function to set attributes of the img's element
const setAttributes = (element, attributes) => {
  Object.entries(attributes).forEach((pair) => {
    const attribute = pair[0];
    const value = pair[1];
    element.setAttribute(attribute, value);
  });
};

// Create Elements For Links & Photos, Add to DOM
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log('total images: ', totalImages);
  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    const itemAttributes = {
      href: photo.links.html,
      target: '_blank',
    };
    const img = document.createElement('img');
    const imgAttributes = {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    };

    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    setAttributes(item, itemAttributes);
    setAttributes(img, imgAttributes);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Get photos from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
};

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
    ready = false;
  }
});

getPhotos();
