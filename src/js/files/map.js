
if (document.querySelector('#map')) {
	mapAdd();
	function mapAdd() {
		let tag = document.createElement('script');
		tag.src = "https://api-maps.yandex.ru/v3/?apikey=0aa2f6b6-353d-4a10-bb62-97763a975ef4&lang=ru_RU";
		let firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		tag.onload = () => initMap();
	}

	async function initMap() {
		await ymaps3.ready;

		const { YMap, YMapDefaultSchemeLayer, YMapMarker, YMapDefaultFeaturesLayer } = ymaps3;

		// Иницилиазируем карту
		const map = new YMap(document.getElementById('map'), {
			location: {
				center: [92.91686085352818, 56.036527113797185],
				zoom: 17
			}
		});

		// Добавляем слой для отображения схематической карты
		map.addChild(new YMapDefaultSchemeLayer());
		// Добавляем слой объектов (чтобы работали маркеры)
		const featureLayer = new YMapDefaultFeaturesLayer();
		map.addChild(featureLayer);


		const markerElement = document.createElement('img');
		markerElement.src = 'img/icons/map-marker.svg'
		markerElement.style.cssText = `transform: translate(-19px, -53px);width: 43px;height: 57px;`

		const marker = new YMapMarker({ coordinates: [92.91686085352818, 56.036527113797185], }, markerElement);

		map.addChild(marker);
	}

}