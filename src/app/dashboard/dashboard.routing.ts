import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { SolicitudComponent } from '../solicitudes/solicitud/solicitud.component';
import { SolicitudFormComponent } from '../solicitudes/solicitud-form/solicitud-form.component';
import { SolicitudListComponent } from '../solicitudes/solicitud-list/solicitud-list.component';
import { ParametrosComponent } from '../parametros/parametros/parametros.component';
import { CiudadesComponent } from '../parametros/ciudades/ciudades.component';
import { TarifasComponent } from '../parametros/tarifas/tarifas.component';
import { GananciasComponent } from '../parametros/ganancias/ganancias.component';
import { EstadosDomiciliosComponent } from '../parametros/estados-domicilios/estados-domicilios.component';
import { EquipamientoComponent } from '../parametros/equipamiento/equipamiento.component';
import { ReglasActivosComponent } from '../parametros/reglas-activos/reglas-activos.component';
import { ReasignacionComponent } from '../solicitudes/reasignaciones/reasignacion/reasignacion.component';
import { ReportesComponent } from '../reportes/reportes/reportes.component';
import { ReporteClientesServiciosComponent } from '../reportes/reporte-clientes/reporte-clientes-servicios/reporte-clientes-servicios.component';
import { MensajeriaComponent } from '../mensajeria/mensajeria/mensajeria.component';
import { MensajeriaFormComponent } from '../mensajeria/mensajeria-form/mensajeria-form.component';
import { ConfigGlobalComponent } from '../parametros/config-global/config-global.component';
import { UsuariosComponent } from '../usuarios/usuarios/usuarios.component';
import { UsuarioFormComponent } from '../usuarios/usuario-form/usuario-form.component';
import { UsuariosListComponent } from '../usuarios/usuarios-list/usuarios-list.component';
import { SeguimientoActivosComponent } from '../usuarios/seguimiento-activos/seguimiento-activos.component';

import { EstadodecuentaComponent } from '../usuarios/estadodecuenta/estadodecuenta.component';
import { TransaccionesComponent } from '../solicitudes/transacciones/transacciones.component';

export const DashboardRoutes: Routes = [
    {

        path: '',
        children: [
            {
                path: 'dashboard',
                children: [
                    {
                        path: '',
                        redirectTo: 'inicio',
                        pathMatch: 'full'
                    },
                    {
                        path: 'inicio',
                        component: DashboardComponent
                    },
                    {
                        path: 'solicitud',
                        component: SolicitudComponent,
                        children: [
                            {
                                path: '',
                                component: SolicitudListComponent
                            },
                            {
                                path: 'lista',
                                redirectTo: '',
                                pathMatch: 'full'
                            },
                            {
                                path: 'nueva',
                                component: SolicitudFormComponent
                            },
                            {
                                path: 'hacer-reasignacion',
                                component: ReasignacionComponent
                            },
                            {
                                path: ':id',
                                children: [
                                    {
                                        path:'',
                                        redirectTo: 'transacciones',
                                        pathMatch: 'full'
                                    },
                                    {
                                        path: 'transacciones',
                                        component: TransaccionesComponent
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        path: 'parametros',
                        component: ParametrosComponent,
                        children: [
                            {
                                path: 'Configuracion-global',
                                component: ConfigGlobalComponent
                            },
                            {
                                path: '',
                                redirectTo: 'ciudad',
                                pathMatch: 'full'
                            },
                            {
                                path: 'ciudad',
                                component: CiudadesComponent
                            },
                            {
                                path: 'tarifas',
                                component: TarifasComponent
                            },
                            {
                                path: 'Ganacias',
                                component: GananciasComponent
                            },
                            {
                                path: 'Estados-Domicilios',
                                component: EstadosDomiciliosComponent
                            },
                            {
                                path: 'Equipamiento',
                                component: EquipamientoComponent
                            },
                            {
                                path: 'Reglas-activo',
                                component: ReglasActivosComponent
                            }
                        ]
                    },
                    {
                        path: 'Usuarios',
                        component: UsuariosComponent,
                        children: [
                            {
                                path: '',
                                component: UsuariosListComponent
                            },
                            {
                                path: 'lista',
                                redirectTo: '',
                                pathMatch: 'full'
                            },
                            {
                                path: 'seguimiento-activos',
                                component: SeguimientoActivosComponent
                            },
                            {
                                path: 'nuevo',
                                component: UsuarioFormComponent,
                                outlet: 'nuevo-usuario'
                            },
                            {
                                path: ':id',
                                children: [
                                    {
                                        path: '',
                                        redirectTo: 'Actualizar',
                                        pathMatch: 'full'
                                    },
                                    {
                                        path: 'Actualizar',
                                        component: UsuarioFormComponent
                                    },
                                    {
                                        path: 'Estadodecuenta',
                                        component: EstadodecuentaComponent
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        path: 'reportes',
                        component: ReportesComponent,
                        children: [
                            {
                                path: '',
                                redirectTo: 'clientes-servicios',
                                pathMatch: 'full'
                            },
                            {
                                path: 'clientes-servicios',
                                component: ReporteClientesServiciosComponent
                            }
                        ]
                    },
                    {
                        path: 'mensajeria',
                        component: MensajeriaComponent,
                        children: [
                            {
                                path: '',
                                redirectTo: 'nuevo',
                                pathMatch: 'full'
                            },
                            {
                                path: 'nuevo',
                                component: MensajeriaFormComponent
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
