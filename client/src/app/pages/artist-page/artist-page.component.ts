import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get('id');
    this.spotifyService.getArtist(this.artistId).then(artistData => {
        this.artist = artistData;
    });
    this.spotifyService.getTopTracksForArtist(this.artistId).then(trackData => {
      this.topTracks = trackData;
    });
    this.spotifyService.getAlbumsForArtist(this.artistId).then(albumData => {
      this.albums = albumData;
    });
    this.spotifyService.getRelatedArtists(this.artistId).then(relatedArtistsData => {
      this.relatedArtists = relatedArtistsData;
    });
  }

}