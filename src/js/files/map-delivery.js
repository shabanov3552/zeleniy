
if (document.querySelector('#map-delivery')) {
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

		const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapFeature } = ymaps3;

		const map = new YMap(document.getElementById('map-delivery'), {
			location: {
				center: [92.91686085352818, 56.036527113797185],
				zoom: 14,
			}
		});

		map.addChild(new YMapDefaultSchemeLayer());
		map.addChild(new YMapDefaultFeaturesLayer());

		const coord1 = [[92.90349984505978, 56.04685236148998], [92.90907883981075, 56.043477509423646], [92.89193415978754, 56.03482884862353], [92.8928997550329, 56.0416878768428], [92.90349984505978, 56.04685236148998]];
		const coord2 = [[92.90277028420773, 56.04025851309843], [92.90875697472896, 56.036636819883064], [92.9087247882208, 56.03372360171427], [92.89144063332881, 56.03372960857682], [92.89193415978754, 56.03476277497326], [92.90277028420773, 56.04025851309843]];
		const coord3 = [[92.91492605546324, 56.03974801316128], [92.91983986237852, 56.03676295423893], [92.91985059121457, 56.03382571825039], [92.90875697472896, 56.03374162229917], [92.90879989007323, 56.03664282629035], [92.91492605546324, 56.03974801316128]];
		const zonesCoord = [coord1, coord2, coord3]

		const deliveryZone = new YMapFeature({
			geometry: {
				type: 'Polygon',
				coordinates: zonesCoord
			},
			properties: {
				hintContent: 'Зона доставки'
			},
			style: {
				stroke: [{ width: 0, color: 'none' }],
				fill: '#75c28b'
			}
		});
		map.addChild(deliveryZone);
	}
}