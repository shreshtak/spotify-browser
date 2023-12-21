import { Component, OnInit, Input } from '@angular/core';
import { TrackData } from '../../data/track-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})
export class TrackListComponent implements OnInit {
	@Input() tracks:TrackData[];
	@Input() hideArtist:boolean = false;
	@Input() hideAlbum:boolean = false;
  trackId:string;


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.trackId = this.route.snapshot.paramMap.get('id');
  }

}
