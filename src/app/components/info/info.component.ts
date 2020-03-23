import{Component, OnInit, ViewChild, ElementRef}from '@angular/core';import{InfoService}from 'src/app/services/info.service';import{Info}from 'src/app/models/info';import{myApp}from '../../exports';import{NgbModal, ModalDismissReasons}from '@ng-bootstrap/ng-bootstrap';import{SubscribeService}from 'src/app/services/subscribe.service';import{Subscribe}from 'src/app/models/subscribe';import{Title}from '@angular/platform-browser';@Component({selector: 'app-info', templateUrl: './info.component.html', styleUrls: ['./info.component.scss']})export class InfoComponent implements OnInit{@ViewChild('loading',{static: false}) loading: ElementRef; @ViewChild('info',{static: false}) info: ElementRef; @ViewChild('map',{static: false}) map: ElementRef; @ViewChild('forte',{static: false}) forte: ElementRef; public loaded: string='block'; public subBtn: string='block'; public information: Info; public imgSrc: string; public readmore: boolean=false; public closeResult: string; public class: string='block'; public subClass: string='none'; public alert: string='none'; public emptyAlert: string='none'; public nameAlert: string='none'; public newSubscribe: Subscribe={name: "", email: ""}; constructor(private infoService: InfoService, private modalService: NgbModal, private subService: SubscribeService, private title: Title){title.setTitle("Information | Forte Gallery");}ngOnInit(){this.infoService.getInfo() .subscribe(info=>{this.information=info[0]; this.imgSrc=myApp.url + '/assets/info/' + this.information.img;}, err=> console.error(err.message));}public readMoreContent(): void{this.readmore=!this.readmore;}public open(content){this.class=this.subBtn='block'; this.hideModalBodies(); this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title'}).result.then((result)=>{this.closeResult=`Closed with: ${result}`;}, (reason)=>{this.closeResult=`Dismissed ${this.getDismissReason(reason)}`;});}private getDismissReason(reason: any): string{if (reason===ModalDismissReasons.ESC){return 'by pressing ESC';}else if (reason===ModalDismissReasons.BACKDROP_CLICK){return 'by clicking on a backdrop';}else{return `with: ${reason}`;}}public addSUbscription(): void{this.hideModalBodies(); const regex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; if (regex.test(this.newSubscribe.email) && this.newSubscribe.name.length > 0){this.newSubscribe.email=this.newSubscribe.email.toLowerCase(); this.class='none'; this.subClass='block'; this.subBtn='none'; this.subService.addSubscription(this.newSubscribe).subscribe(); setTimeout(()=> this.modalService.dismissAll(), 1000); this.newSubscribe={name: "", email: ""}}else if (this.newSubscribe.name==='') this.nameAlert='block'; else if (this.newSubscribe.email==='') this.emptyAlert='block'; else this.alert='block';}private hideModalBodies(): void{this.emptyAlert=this.alert=this.subClass=this.nameAlert='none';}}