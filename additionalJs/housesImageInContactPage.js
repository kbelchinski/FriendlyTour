const isWebsiteUsedByMobileDevice = () =>
  /Mobi|Android|Windows Phone|iPhone|iPad|iPod/i.test(navigator.userAgent);

const homeScreenHousesPictureElementStyle =
  document.getElementById('contact-page-home').style;

if (isWebsiteUsedByMobileDevice()) {
  homeScreenHousesPictureElementStyle.backgroundImage = `url(\"friendlyTourAssets/rila_lakes_gorica_merged.png\")`;
}
