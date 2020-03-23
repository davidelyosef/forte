import{Component, OnInit, ViewChild, ElementRef}from '@angular/core';import{Admin}from 'src/app/models/admin';import{AdminService}from 'src/app/services/admin.service';import{Router}from '@angular/router';import{Store}from '@ngrx/store';import{savedUser}from 'src/app/store/actions';import * as sha1 from 'sha1';@Component({selector: 'app-admin', templateUrl: './admin.component.html', styleUrls: ['./admin.component.scss']})export class AdminComponent implements OnInit{public admins: Admin[]; public username: string=""; public password: string=""; public connectedUser: Admin; @ViewChild('alert',{static: false}) alert: ElementRef; constructor(private adminService: AdminService, private router: Router, private store: Store<any>){}ngOnInit(){this.adminService.getAdmins().subscribe(admins=>{this.admins=admins;}, err=> console.error(err));}public login(): void{let connected=false; this.admins.map(user=>{if (user.username===this.username && user.password===sha1(this.password)){connected=true; this.connectedUser=user; this.router.navigateByUrl("/forte_great_admin_panel1");}}); if (connected){this.alert.nativeElement.style.visibility='none'; this.store.dispatch(savedUser({theAdminUser: this.connectedUser}));}else{this.alert.nativeElement.style.visibility='visible';}}}