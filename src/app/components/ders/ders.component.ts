import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../services/common/http-client.service';

@Component({
  selector: 'app-ders',
  templateUrl: './ders.component.html',
  styleUrl: './ders.component.scss'
})
export class DersComponent implements OnInit { 
  
  constructor(private httpClient : HttpClientService) {

  }

  ngOnInit(): void {
    
  }

}
