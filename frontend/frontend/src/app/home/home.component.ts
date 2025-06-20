import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  map!: google.maps.Map;
  routePolyline!: google.maps.Polyline;
  selectedDestination: string | null = null; // To store selected destination

  searchMarker!: google.maps.Marker | null;
  markers: Array<{
    position: google.maps.LatLngLiteral;
    label: string;
    description: string;
  }> = [];
  infoWindow!: google.maps.InfoWindow;
  weatherApiKey = '581ef0fb2e564f60b43112424232303'; // Replace with your actual API key
  weatherApiUrl = 'http://api.weatherapi.com/v1/current.json';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Define the source and destination locations
  source = { lat: 11.321576, lng: 75.93439 }; // Fixed source
  destinations = [
    { name: 'MBH Bus Stand', lat: 11.3171350, lng: 75.9377611 },
    { name: 'Open Reading Room', lat: 11.319611, lng: 75.933965 },
    { name: 'LH Gym', lat: 11.318003, lng: 75.931157 },
    { name: 'East Campus', lat: 11.322865, lng: 75.937424 },
    { name: 'Volleyball Ground', lat: 11.320451, lng: 75.933737 },
  ];

  // Predefined waypoints for destinations
  waypointPaths: { [key: string]: google.maps.LatLngLiteral[] } = {

    'MBH Bus Stand': [
      this.source,
      { lat: 11.3214207, lng: 75.934114 },
      { lat: 11.320909, lng: 75.933612 },
      { lat: 11.319957, lng: 75.932775 },
      { lat: 11.319669, lng: 75.935412 },
      { lat: 11.319586, lng: 75.936635 },
      { lat: 11.319122, lng: 75.938111 },
      { lat: 11.317199, lng: 75.937557 },
    ],
    'Open Reading Room': [
      this.source,
      { lat: 11.3214207, lng: 75.934114 },
      { lat: 11.320909, lng: 75.933612 },
      { lat: 11.319957, lng: 75.932775 },
      { lat: 11.319829, lng: 75.933995 },
      { lat: 11.319611, lng: 75.933965 },
      { lat: 11.319312, lng: 75.933955 },
    ],
    'LH Gym': [
      this.source,
      { lat: 11.3214207, lng: 75.934114 },
      { lat: 11.320909, lng: 75.933612 },
      { lat: 11.319957, lng: 75.932775 },
      { lat: 11.319814, lng: 75.932134 },
      { lat: 11.319308, lng: 75.932084 },
      { lat: 11.318709, lng: 75.931003 },
      { lat: 11.318618, lng: 75.930942 },
      { lat: 11.318488, lng: 75.930946 },
      { lat: 11.318386, lng: 75.930975 },
      { lat: 11.318200, lng: 75.931073 },
      { lat: 11.318003, lng: 75.931157 },
    ],
    'East Campus': [
      this.source,
      { lat: 11.3214866, lng: 75.934518 },
      { lat: 11.321512, lng: 75.934588 },
      { lat: 11.321585, lng: 75.934671 },
      { lat: 11.321481, lng: 75.934845 },
      { lat: 11.321653, lng: 75.934998 },
      { lat: 11.321690, lng: 75.935068 },
      { lat: 11.321917, lng: 75.935272 },
      { lat: 11.322132, lng: 75.935460 },
      { lat: 11.322347, lng: 75.935579 },
      { lat: 11.322661, lng: 75.935829 },
      { lat: 11.322728, lng: 75.935930 },
      { lat: 11.322879, lng: 75.936432 },
      { lat: 11.323139, lng: 75.936995 },
      { lat: 11.323239, lng: 75.937212 },
      { lat: 11.322865, lng: 75.937424 },
    ],
    'Volleyball Ground': [
      this.source,
      { lat: 11.321432, lng: 75.934107 },
      { lat: 11.320877, lng: 75.933612 },
      { lat: 11.320447, lng: 75.933189 },
      { lat: 11.320461, lng: 75.933715 },
      { lat: 11.320451, lng: 75.933737 },
    
    ],
  };

  ngAfterViewInit(): void {
    this.initMap();
  }

  onLogout(): void {
    this.authService.logout(); // Call the logout method from AuthService
  }

  private initMap(): void {
    const centerCoordinates = { lat: 11.32139, lng: 75.93561 };

    // Initialize the map
    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 17,
        center: centerCoordinates,
      }
    );

    // Initialize the polyline
    this.routePolyline = new google.maps.Polyline({
      path: [],
      strokeColor: '#007bff',
      strokeOpacity: 1.0,
      strokeWeight: 4,
    });

    // Add source marker
    new google.maps.Marker({
      position: this.source,
      map: this.map,
      title: 'Source',
    });

    // Add the polyline to the map
    this.routePolyline.setMap(this.map);

    // Initialize custom markers
    this.initCustomMarkers();

    // Add the custom markers
    this.addCustomMarkers();

    // Initialize InfoWindow
    this.infoWindow = new google.maps.InfoWindow();
  }

  onDestinationChange(event: Event): void {
    const target = event.target as HTMLSelectElement; // Assert the type
    this.selectedDestination = target.value; // Safely store selected destination
  }

  findRoute(): void {
    if (!this.selectedDestination) {
      alert('Please select a destination.');
      return;
    }

    // Get the waypoints for the selected destination
    const waypoints = this.waypointPaths[this.selectedDestination];

    if (waypoints) {
      // Set the path for the polyline
      this.routePolyline.setPath(waypoints);

      // Adjust map bounds to fit the route
      const bounds = new google.maps.LatLngBounds();
      waypoints.forEach((point) => bounds.extend(point));
      this.map.fitBounds(bounds);
    }

  }

  resetRoute(): void {
    // Remove the polyline path from the map
    if (this.routePolyline) {
      this.routePolyline.setPath([]); // Clear the polyline path
    }
  
    // Reset map center and zoom to initial state
    const initialCenter = { lat: 11.32139, lng: 75.93561 }; // Replace with your initial center coordinates
    this.map.setCenter(initialCenter);
    this.map.setZoom(17); // Set the zoom level to the default value
  
    // Optionally, reset the dropdown and selected destination
    const dropdown = document.getElementById('destination-select') as HTMLSelectElement;
    if (dropdown) {
      dropdown.value = ''; // Reset the dropdown to the default option
    }
    this.selectedDestination = ''; // Clear the selected destination
  }
  

  private initCustomMarkers(): void {
    this.markers = [
      {
        position: { lat: 11.32139, lng: 75.93561 },
        label: 'A',
        description: 'Main Building',
      },
      {
        position: { lat: 11.316823, lng: 75.937981 },
        label: 'B',
        description: 'MBH-Veg Mess 1',
      },
      {
        position: { lat: 11.31682, lng: 75.938034 },
        label: 'C',
        description: 'MBH Non-Veg Mess 2',
      },
      {
        position: { lat: 11.315858, lng: 75.938177 },
        label: 'D',
        description: 'Nit Canara Bank',
      },
      {
        position: { lat: 11.318127, lng: 75.936911 },
        label: 'E',
        description: 'Sports Complex',
      },
      {
        position: { lat: 11.319312, lng: 75.933955 },
        label: 'F',
        description: 'Open Reading Room',
      },
      {
        position: { lat: 11.3189, lng: 75.933525 },
        label: 'G',
        description: 'TBI',
      },
      {
        position: { lat: 11.31671, lng: 75.930972 },
        label: 'H',
        description: 'MLH',
      },
      {
        position: { lat: 11.317444, lng: 75.930384 },
        label: 'I',
        description: 'Ladies Hostel (LH)',
      },
      {
        position: { lat: 11.317437, lng: 75.930929 },
        label: 'J',
        description: 'LH Laundry',
      },
      {
        position: { lat: 11.317698, lng: 75.931352 },
        label: 'K',
        description: 'LH Canteen',
      },
      {
        position: { lat: 11.317143, lng: 75.938427 },
        label: 'L',
        description: 'Badminton Court',
      },
      {
        position: { lat: 11.317163, lng: 75.936862 },
        label: 'M',
        description: 'Old MBH',
      },
      {
        position: { lat: 11.317333, lng: 75.937057 },
        label: 'N',
        description: 'Old MBH Mess',
      },
      {
        position: { lat: 11.319082, lng: 75.93811 },
        label: 'O',
        description: 'MBH Entrance',
      },
      {
        position: { lat: 11.319785, lng: 75.932117 },
        label: 'P',
        description: 'West Campus',
      },
      {
        position: { lat: 11.31789, lng: 75.93119 },
        label: 'Q',
        description: 'LH Gym',
      },
      {
        position: { lat: 11.319717, lng: 75.931899 },
        label: 'L',
        description: 'NITC Bus Stand',
      },
      {
        position: { lat: 11.317136, lng: 75.937768 },
        label: 'M',
        description: 'MBH Bus Stand',
      },
      {
        position: { lat: 11.321506, lng: 75.934156 },
        label: 'l',
        description: 'Central Circle',
      },
      {
        position: { lat: 11.321969, lng: 75.933 },
        label: 'O',
        description: 'Lecture Hall',
      },
      {
        position: { lat: 11.321576, lng: 75.93439 },
        label: 'P',
        description: 'CSED NITC',
      },
      {
        position: { lat: 11.320451, lng: 75.933737 },
        label: 'Q',
        description: 'Volleyball Ground',
      },
      {
        position: { lat: 11.321352, lng: 75.933496 },
        label: 'R',
        description: 'Basketball Court',
      },
      {
        position: { lat: 11.320054, lng: 75.934983 },
        label: 'S',
        description: 'PG1 Hostel',
      },
      {
        position: { lat: 11.320406, lng: 75.935797 },
        label: 'T',
        description: "B-Men's Hostel",
      },
      {
        position: { lat: 11.320604, lng: 75.93503 },
        label: 'U',
        description: "A-Men's Hostel",
      },
      {
        position: { lat: 11.31966, lng: 75.938083 },
        label: 'V',
        description: "E-Men's Hostel",
      },
      {
        position: { lat: 11.321397, lng: 75.937132 },
        label: 'W',
        description: 'G-Hostel (ladies)',
      },
      {
        position: { lat: 11.321019, lng: 75.936981 },
        label: 'X',
        description: 'Avenue Area',
      },
      {
        position: { lat: 11.322865, lng: 75.937424 },
        label: 'Y',
        description: 'East Campus',
      },
      {
        position: { lat: 11.321038, lng: 75.935042 },
        label: 'Z',
        description: 'Bus Garage',
      },
    ];
  }

  private addCustomMarkers(): void {
    this.markers.forEach((marker) => {
      const mapMarker = new google.maps.Marker({
        position: marker.position,
        map: this.map,
        title: marker.description,
      });

      // Add click event listener to show InfoWindow
      mapMarker.addListener('click', () => {
        this.fetchWeather(marker.position, marker.description, mapMarker);
      });
    });
  }

  private fetchWeather(
    position: google.maps.LatLngLiteral,
    description: string,
    mapMarker: google.maps.Marker
  ): void {
    const query = `${position.lat},${position.lng}`;
    const url = `${this.weatherApiUrl}?key=${this.weatherApiKey}&q=${query}`;

    this.http.get<any>(url).subscribe(
      (response) => {
        const location = response.location.name;
        const temperature = response.current.temp_c;
        const condition = response.current.condition.text;
        const icon = response.current.condition.icon;

        const infoContent = `
          <div>
            <h3>${description}</h3>
            <p><strong>Weather:</strong> ${condition}</p>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <img src="${icon}" alt="Weather Icon" style="width: 50px; height: 50px;" />
          </div>
        `;

        this.infoWindow.setContent(infoContent);
        this.infoWindow.open(this.map, mapMarker);
      },
      (error) => {
        console.error('Error fetching weather data', error);

        const errorContent = `
          <div>
            <h3>${description}</h3>
            <p><strong>Weather data unavailable.</strong></p>
          </div>
        `;
        this.infoWindow.setContent(errorContent);
        this.infoWindow.open(this.map, mapMarker);
      }
    );
  }
  

  searchLocation(): void {
    const input = document.getElementById('search-box') as HTMLInputElement;
    const searchQuery = input.value.toLowerCase().trim();
  
    const marker = this.markers.find((m) =>
      m.description.toLowerCase() === searchQuery
    );
  
    if (marker) {
      this.map.setCenter(marker.position);
      this.map.setZoom(16);
  
      if (this.searchMarker) {
        this.searchMarker.setPosition(marker.position);
      } else {
        this.searchMarker = new google.maps.Marker({
          position: marker.position,
          map: this.map,
          title: marker.description,
        });
      }
  
      this.fetchWeather(marker.position, marker.description, this.searchMarker);
    } else {
      alert('Location not found!');
    }
  }
  
}
