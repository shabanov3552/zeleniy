
if (document.querySelector('#map')) {
	mapAdd();
	function mapAdd() {
		let tag = document.createElement('script');
		tag.src = "https://api-maps.yandex.ru/2.1/?apikey=0aa2f6b6-353d-4a10-bb62-97763a975ef4&lang=ru_RU";
		let firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
	setTimeout(function () {

		ymaps.ready(init);

		function init() {
			var myMap = new ymaps.Map("map", {
				center: [56.066525, 92.961439],
				zoom: 16,
				controls: ['zoomControl'],
			});
			let addresFirst = new ymaps.Placemark([56.066525, 92.961439], {}, {
				iconLayout: 'default#imageWithContent',
				iconImageHref: '@img/icons/map-marker.svg',
				iconImageSize: [92, 57],
				iconImageOffset: [-30, -60],
				iconContentOffset: [0, 0],
			});
			myMap.geoObjects.add(addresFirst);
			myMap.behaviors.disable('scrollZoom');
		}

	}, 1000);
}
