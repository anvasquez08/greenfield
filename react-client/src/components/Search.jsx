import React from 'react';
import axios from 'axios';

class Search extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			destination_address: '',
			results: [],
			favorites: []
		}
		this.fetchClosestPlaces = this.fetchClosestPlaces.bind(this)
		this.handleAddressState = this.handleAddressState.bind(this)
	}

	fetchClosestPlaces(){
		let params = {
			address: this.state.destination_address,
			newPrefs: this.props.location.prefs,
			savedPrefs: this.props.location.savedPrefs
		}

		axios.post('/places', {params: params})
		.then((response) => {
			console.log(response.data)
			let dataResults = [
		  [
		    { distance: '0.4 mi',
		      travel_time: '4 mins',
		      type: 'bank',
		      place_lat: 40.7501328,
		      place_long: -73.97649899999999,
		      category_icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/bank_dollar-71.png',
		      google_id: 'ChIJY9UK5gNZwokR60pPEpS1WKE',
		      place_name: 'Chase Bank',
		      rating: 3,
		      place_address: '355 Lexington Ave, New York',
		      thumbnail: '<a href="https://maps.google.com/maps/contrib/100338243655446815049/photos">Chase Bank</a>',
		      price_level: '' },
		    { distance: '0.5 mi',
		      travel_time: '5 mins',
		      type: 'bank',
		      place_lat: 40.749611,
		      place_long: -73.974712,
		      category_icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/bank_dollar-71.png',
		      google_id: 'ChIJt5cK5gNZwokR4S9PcCtCTcQ',
		      place_name: 'Chase Bank',
		      rating: 4.5,
		      place_address: '633 3rd Ave, New York',
		      thumbnail: '<a href="https://maps.google.com/maps/contrib/107222874427432551066/photos">Christopher N Flores</a>',
		      price_level: '' }
		  ],
		  [
		    { distance: '0.3 mi',
		      travel_time: '3 mins',
		      type: 'supermarket',
		      place_lat: 40.7522358,
		      place_long: -73.9756911,
		      category_icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png',
		      google_id: 'ChIJnaciOAJZwokR2eQCKWId9B8',
		      place_name: 'Eli Zabar\'s',
		      rating: 1,
		      place_address: '89 East 42nd Street, New York',
		      thumbnail: '<a href="https://maps.google.com/maps/contrib/101941738990436117323/photos">Gregory Weiss</a>',
		      price_level: '' },
		    { distance: '0.7 mi',
		      travel_time: '6 mins',
		      type: 'supermarket',
		      place_lat: 40.74663890000001,
		      place_long: -73.977746,
		      category_icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png',
		      google_id: 'ChIJw7VKFwRZwokRVJgwZnK-eEY',
		      place_name: 'D\'Agostino',
		      rating: 3.2,
		      place_address: '528 3rd Avenue, New York',
		      thumbnail: '<a href="https://maps.google.com/maps/contrib/114435253726526221846/photos">Dijon Davantes</a>',
		      price_level: '' }
		  ]
		];

			let resultObj = {};
			let address = this.state.destination_address;
			let faves =[];

			// iterate through results to sort place type
			dataResults.forEach(resultObj => {
				resultObj.forEach(singleResult => {
					if( !resultObj[singleResult.type] ) {
						resultObj[singleResult.type] = [singleResult]
					} else {
						resultObj[singleResult.type].push(singleResult)
					}
				})
			})

			// push key value pair into faves array 
			for (let key in resultObj) {
				faves.push(key)
			}

			// set state with result values
			let sortedResultObj = {
				 destination_address: address, 
				 faves: faves
			}


			this.setState({
				results: [sortedResultObj]
	      })	

			})

		.catch((err) => console.log('error in fetching places', err))
	}





	handleAddressState(event) {
		this.setState({
			destination_address: event.target.value
		})
	}

	render() {
		
		return (
			<div>
			<pre>{this.state.destination_address}</pre>
				<h4>Search Component</h4>
				<input type="text"
							 value={this.state.destination_address}
							 onChange={this.handleAddressState}/>
				<button onClick={() => this.fetchClosestPlaces() }>Search</button>	 
				<div>Results</div>
				<li>
					
				</li>
		     
			</div>
		)
	}
}
export default Search;



// {
// 						this.state.results.map( (result, idx) => {
// 							return result.map( (object, idx) => {
// 								return (
// 								  <ul>
// 								   		{object.type} 
// 								   		{object.category_icon} 
// 								   		object.thumbnail
// 								  </ul>
// 								)
// 							})
// 						})
// 					}


