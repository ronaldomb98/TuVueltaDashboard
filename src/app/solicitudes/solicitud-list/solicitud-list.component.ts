import { Component, OnInit, ViewChild } from '@angular/core';
import { DbService } from '../../services/db/db.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Solicitud } from '../../interfaces/solicitud.interface';

@Component({
  selector: 'app-solicitud-list',
  templateUrl: './solicitud-list.component.html',
  styleUrls: ['./solicitud-list.component.css']
})
export class SolicitudListComponent implements OnInit {

  displayedColumns = ['Fecha', 'Nombres', 'Apellidos', 'Celular', 'Telefono', 'PagoConTarjeta', 'Distancia', 'puntoInicio', 'puntoFinal', 'Estado'];
  
  public dataSource: MatTableDataSource<any>;
  
  resultsLength = 0;
  
  public solicitudes;
  
  @ViewChild('paginator') paginator: MatPaginator;
  
  constructor(
    public dbService: DbService
  ) { }

  ngAfterViewInit() {
    
  }

  ngOnInit() {
    this.dbService.listSolicitudes().subscribe(res => {
      this.solicitudes = res;
      this.instanceTable();
    })
  }

  sortData(event){
    console.log(event)
    switch (event.active) {
      case 'key':
          this.sortByDirection('key', event.direction)
        break;
    
      default:
        break;
    }
  }

  instanceTable(){
    this.dataSource = new MatTableDataSource<any>(this.solicitudes)
    this.dataSource.paginator = this.paginator;
      
    this.dataSource.paginator.pageSizeOptions = [5, 10, 20];
    this.resultsLength = this.solicitudes.length;
  }

  sortByDirection(key, direction){
    
    switch (direction) {
      case 'asc':
      console.log("sorting by key asc")
          this.solicitudes = this.solicitudes.sort((a,b) => {
            return a.key - b.key
          })
          this.instanceTable();
        break;
      case 'desc':
      console.log("sorting by key desc")
          this.solicitudes = this.solicitudes.sort((a,b) => {
            return  b.key-a.key
          })
          this.instanceTable();
        break;
    
      default:
        break;
    }
  }

}

