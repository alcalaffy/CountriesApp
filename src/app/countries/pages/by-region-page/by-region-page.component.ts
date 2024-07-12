import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.interface';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent implements OnInit{
  constructor(private countryService:CountriesService){}
  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countryService.cacheStore.byRegion.region;
  }
  public countries:Country[]=[];
  public regions:Region []=['Americas','Africa','Asia','Oceania','Europe'];
  public selectedRegion!:Region;

  searchByRegion(term:Region):void{
    this.selectedRegion=term;
    this.countryService.searchRegion(term).subscribe(
      countries=>{
        this.countries=countries;
      }
    );
  }
}
