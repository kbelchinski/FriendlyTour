const isWebsiteUsedByMobileDevice = () =>
  /Mobi|Android|Windows Phone|iPhone|iPad|iPod/i.test(navigator.userAgent);

const homeScreenHousesPictureElementStyle =
  document.getElementById('home-picture').style;

if (isWebsiteUsedByMobileDevice()) {
  homeScreenHousesPictureElementStyle.backgroundImage = `url(\"assets/img/mediGuestHoudeMergerVertically.jpg\")`;
}
