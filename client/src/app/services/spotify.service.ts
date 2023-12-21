import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    //Note: toPromise() is a deprecated function that will be removed in the future.
    //It's possible to do the assignment using lastValueFrom, but we recommend using toPromise() for now as we haven't
    //yet talked about Observables. https://indepth.dev/posts/1287/rxjs-heads-up-topromise-is-being-deprecated
    return lastValueFrom(this.http.get(this.expressBaseUrl + endpoint)).then((response) => {
      return response;
    }, (err) => {
      //console.log("Error with sending request");
      return err;
    });
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    const searchEndpoint = '/search/' + category + '/' + encodeURIComponent(resource);

    return this.sendRequestToExpress(searchEndpoint).then((data) => {

      //console.log(data);
      let resourceDataArray: ResourceData[] = [];
  
      switch (category) {
        case 'artist':
          resourceDataArray = data.artists.items.map((artist) => new ArtistData(artist));
          break;
  
        case 'track':
          resourceDataArray = data.tracks.items.map((track) => new TrackData(track));
          break;
  
        case 'album':
          resourceDataArray = data.albums.items.map((album) => new AlbumData(album));
          break;
  
        default:
          break;
      }

      return resourceDataArray;
    })
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.

    const artistEndpoint = '/artist/' + encodeURIComponent(artistId);
    return this.sendRequestToExpress(artistEndpoint).then((data) => {
      return new ArtistData(data);
    });
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    const relArtistEndpoint = '/artist-related-artists/' + encodeURIComponent(artistId);

    return this.sendRequestToExpress(relArtistEndpoint).then((data) => {
      let relArtistArray: ArtistData[] = [];
      relArtistArray = data.artists.items.map((artist) => new ArtistData(artist));
      return relArtistArray;
     });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    const topTracksEndpoint = '/artist-top-tracks/' + encodeURIComponent(artistId);
    return this.sendRequestToExpress(topTracksEndpoint).then((data) => {
      let topTracksArray: TrackData[] = [];
      topTracksArray = data.tracks.items.map((track) => new TrackData(track));
      return topTracksArray;
     });
    
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    const albumsEndpoint = '/artist-albums/' + encodeURIComponent(artistId);
    return this.sendRequestToExpress(albumsEndpoint).then((data) => {
      let albumsArray: AlbumData[] = data.albums.items.map((album) => new AlbumData(album));
      return albumsArray;
     });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    const albumEndpoint = '/album/' + encodeURIComponent(albumId);
    return this.sendRequestToExpress(albumEndpoint).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    const tracksEndpoint = '/album-tracks/' + encodeURIComponent(albumId);
    return this.sendRequestToExpress(tracksEndpoint).then((data) => {
      let tracksArray: TrackData[] = data.tracks.items.map((track) => new TrackData(track));
      return tracksArray;
     });
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    const trackEndpoint = '/track/' + encodeURIComponent(trackId);
    return this.sendRequestToExpress(trackEndpoint).then((data) => {
      return new TrackData(data);
    });
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    const featsEndpoint = '/track-audio-features/' + encodeURIComponent(trackId);
    return this.sendRequestToExpress(featsEndpoint).then((data) => {
      let featsArray: TrackFeature[] = TrackFeature.FeatureTypes.map((feature) => new TrackFeature(feature, data[feature]));
      return featsArray;
     });
  }
}
