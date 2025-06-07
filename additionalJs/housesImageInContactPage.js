const isWebsiteUsedByMobileDevice = () =>
  /Mobi|Android|Windows Phone|iPhone|iPad|iPod/i.test(navigator.userAgent);

const homeScreenHousesPictureElementStyle =
  document.getElementById('contact-page-home').style;

if (isWebsiteUsedByMobileDevice()) {
  homeScreenHousesPictureElementStyle.backgroundImage = `url(\"friendlyTourAssets/seven-rila-lakes-how-to-get-to-1025x682.jpeg\")`;
}
