import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../../interfaces/usuario.interface';
import { DbService } from '../../services/db/db.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { ESTADOS_USUARIO } from '../../config/EstadosUsuario';
import { NoRetirementCreditDialogComponent } from '../../dialogs/no-retirement-credit-dialog/no-retirement-credit-dialog.component';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit, OnDestroy {


  @ViewChild('paginator') paginator: MatPaginator;
  public dataSource: MatTableDataSource<IUser> = new MatTableDataSource<IUser>();
  public displayedColumns = ['Id',
    'Nombres', 'Apellidos', 'Estado',
    'Cedula', 'Celular', 'CelularFijo', 'Ciudad',
    'Correo', 'TipoVehiculo', 'PlacaVehiculo', 'Rol',
    'Acciones'];
  private sub: Subscription;
  public resultsLength: number = 0;
  public Usuarios: IUser[];
  public AllUsuarios: IUser[];
  public inputFilter: FormControl;
  public EU = ESTADOS_USUARIO;
  public subs: Subscription[] = [];
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dbService: DbService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadData();
    this.loadFilter();
  }

  loadFilter(): any {
    this.inputFilter = this.formBuilder.control(null);
    this.subs.push(
      this.inputFilter.valueChanges
        .debounceTime(500)
        .distinctUntilChanged()
        .subscribe((val: string) => {
          this.dataSource.filter = val.trim().toLowerCase();
        }))
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  loadData(): void {
    this.subs.push(this.dbService.listUsers()
      .subscribe((res: IUser[]) => {
        this.AllUsuarios = this.Usuarios = res;
        this.instanceTable();
      }));
  }

  onUpdate(user: IUser) {
    this.router.navigateByUrl(`/dashboard/Usuarios/${user.$key}/Actualizar`);
  }

  instanceTable(): void {
    this.dataSource.data = this.Usuarios.filter((user: IUser) => {
      if (user.$key != this.authService.userState.uid) return user
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSizeOptions = [15, 20 , 30];
  }

  onClickNoRetirementCredit(user: IUser) {
    console.log('opening Dialog para creditos de no retiro del usuario', user)
    let dialogRef = this.dialog.open(NoRetirementCreditDialogComponent, {
      width: '300px',
      data: { user }
    });

    this.subs.push(dialogRef.afterClosed()
      .subscribe(res => {
        if (res) {
          this.snackBar.open('Creditos de NO Retiro aumentados exitosamente', 'Ok', {
            verticalPosition: 'top',
            duration: 3000
          });
        }
      }))

  }

}
