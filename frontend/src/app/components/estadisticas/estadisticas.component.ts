import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { Medio } from 'src/app/models/medio';
import { Rol } from 'src/app/models/rol';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { AreaService } from 'src/app/services/area.service';
import { RolService } from 'src/app/services/rol.service';
import { Color, ScaleType,LegendPosition } from '@swimlane/ngx-charts';
import { MedioService } from 'src/app/services/medio.service';

interface datos{
  "name":string,
  "value":number
}

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  roles:Array<Rol>= new Array<Rol>();
  anuncios:Array<Anuncio>= new Array<Anuncio>();
  areas:Array<Area>= new Array<Area>();
  medios:Array<Medio>= new Array<Medio>();

  cantidadDatos:Array<number>= new Array<number>();
  nombres:Array<string>= new Array<string>();

  habilitar:boolean=false;
  rangoInicial:Date= new Date();
  rangoFinal:Date=new Date();
  //---------------------------------------------
  resultado:datos[]=[];
  resultArea:datos[]=[]; 
  resultMedio:datos[]=[];
  resultRol:datos[]=[]; 
  resultMes:datos[]=[];
  resultAnio:datos[]=[];
  resultPeriodo:datos[]=[];

  view: [number,number] = [1500, 600]; //tamaño del grafico
  label:string="";
  anunciosPorRol:boolean=false;//controlan la visibilidad de los graficos
  anunciosPorArea:boolean=true;
  anunciosPorMedio:boolean=false;
  anunciosPorMes:boolean=false;
  anunciosPorAnio:boolean=false;
  anunciosPorPeriodo:boolean=false;
  //---------------------------------------------
  // opciones para grafica de rosca
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  colorScheme: Color = {
      name: 'myScheme',
      selectable: true,
      group: ScaleType.Linear,
      domain: ['#5AA454', '#E44D25', '#C7B42C', '#7aa3e5', '#a8385d', '#aae3f5','#A10A28','#CFC0BB','#AAAAAA'],
  };
  // domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  // domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']

  // opciones para grafica de barra
  showXAxis = true;
  showYAxis = true;
  gradientBar = false;
  showLegendBar = true;
  showXAxisLabel = true;
  xAxisLabel = this.label;
  showYAxisLabel = true;
  yAxisLabel = 'Anuncios realizados';

  // opciones para grafica de torta
  gradiente: boolean = true;
  isDoughnut1: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;


  constructor(private anuncioService:AnuncioService,
    private rolService:RolService,
    private areaService:AreaService,
    private medioService:MedioService) { 
    this.cantidadDatos= new Array<number>();
    this.nombres= new Array<string>();
    this.cargarAreas();
    this.cargarRoles();
    this.cargarAnuncios();
    this.cargarMedios();
    
  }

  async cargarRoles(){
    this.rolService.getRoles().subscribe(
      result=>{
        console.log(result);
        result.forEach((irol:any) => {
          var rol = new Rol();
          Object.assign(rol,irol);
          this.roles.push(rol); 
        });  
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  async cargarAnuncios(){
    this.anuncioService.getAnuncios().subscribe(
      result=>{
        result.forEach((item:any) => {
          var anuncio= new Anuncio();
          Object.assign(anuncio,item);
          this.anuncios.push(anuncio);
        });
        this.obtenerAnunciosPorArea();
      },error=>{
        console.log(error.msg);
      }
    )
  }

  async cargarAreas(){
    this.areaService.getAreas().subscribe(
      result=>{
        result.forEach((item:any) => {
          var area= new Area();
          Object.assign(area,item);
          this.areas.push(area);
        });
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  async cargarMedios(){
    this.medioService.getMedios().subscribe(
      result=>{
        result.forEach((item:any) => {
          var medio= new Medio();
          Object.assign(medio,item);
          this.medios.push(medio);
        });
      },
      error=>{
        console.log(error.msg);
      }
    )
  }

  obtenerAnunciosPorArea(){
    this.habilitar=false;
    this.anunciosPorRol=false;
    this.anunciosPorArea=true;
    this.anunciosPorMedio=false;
    this.anunciosPorMes=false;
    this.anunciosPorAnio=false;
    this.resultArea=[];
    this.resultado=[];
    this.label="Area";
    this.nombres= new Array<string>();
    var c=0;
    this.areas.forEach((item:Area)=>{
      this.nombres.push(item.nombreArea);
    })
    for(let i=0;i<this.nombres.length;i++){
      c=0;
      for(let j=0;j<this.anuncios.length;j++){
        if(this.anuncios[j].area.nombreArea==this.nombres[i])
          c++;
      }
      this.cantidadDatos.push(c);
      this.resultado.push({"name":this.nombres[i],"value":c});
      this.resultArea=this.resultado;
    }
  }  

  obtenerAnunciosPorRoles(){
    this.habilitar=false;
    this.anunciosPorRol=true;
    this.anunciosPorArea=false;
    this.anunciosPorMedio=false;
    this.anunciosPorMes=false;
    this.anunciosPorAnio=false;
    this.anunciosPorPeriodo=false;
    this.label="Roles";
    this.resultRol=[];
    this.resultado=[];
    this.nombres= new Array<string>();
    var c=0;
    this.roles.forEach((item:Rol)=>{
      this.nombres.push(item.nombreRol);
      
    })
    console.log(this.nombres);
    for(let i=0;i<this.nombres.length;i++){
      c=0;
      for(let j=0;j<this.anuncios.length;j++){
        for(let k=0;k<this.anuncios[j].destinatario.length;k++){
          if(this.anuncios[j].destinatario[k].nombreRol==this.nombres[i])
            c++;
          }
      }
      this.cantidadDatos.push(c);
      this.resultado.push({"name":this.nombres[i],"value":c});
      this.resultRol=this.resultado;
      console.log(this.resultRol);
    }
  }  

  obtenerAnunciosPorMedios(){
    this.habilitar=false;
    this.anunciosPorRol=false;
    this.anunciosPorArea=false;
    this.anunciosPorMedio=true;
    this.anunciosPorMes=false;
    this.anunciosPorAnio=false;
    this.anunciosPorPeriodo=false;
    this.label="Medios";
    this.resultMedio=[];
    this.resultado=[];
    this.nombres= new Array<string>();
    var c=0;
    this.medios.forEach((item:Medio)=>{
      this.nombres.push(item.nombreMedio);
    })
    console.log(this.nombres);
    for(let i=0;i<this.nombres.length;i++){
      c=0;
      for(let j=0;j<this.anuncios.length;j++){
        for(let k=0;k<this.anuncios[j].mediosDePublicacion.length;k++){
          if(this.anuncios[j].mediosDePublicacion[k].nombreMedio==this.nombres[i])
            c++;
          }
      }
      this.cantidadDatos.push(c);
      this.resultado.push({"name":this.nombres[i],"value":c});
      this.resultMedio=this.resultado;
      console.log(this.resultMedio);
    }
  }  
 
  obtenerAnunciosPorMes(){
    this.habilitar=false;
    this.anunciosPorRol=false;
    this.anunciosPorArea=false;
    this.anunciosPorMedio=false;
    this.anunciosPorMes=true;
    this.anunciosPorAnio=false;
    this.anunciosPorPeriodo=false;
    this.label="Mes";
    this.resultMes=[];
    this.resultado=[];
    var pos=0;
    var c=0;
    this.resultado=[{name:"Enero",value:0},{name:"Febrero",value:0},{name:"Marzo",value:0},{name:"Abril",value:0},{name:"Mayo",value:0},
                    {name:"Junio",value:0},{name:"Julio",value:0},{name:"Agosto",value:0},{name:"Septiembre",value:0},{name:"Octubre",value:0},
                    {name:"Noviembre",value:0},{name:"Diciembre",value:0}];
    for(let i=1;i<=this.resultado.length;i++){
      c=0;
      for(let j=0;j<this.anuncios.length;j++){
        if(new Date(this.anuncios[j].fechaEntrega).getMonth()+1==i)
          c++;  
      }
      this.resultado[pos].value=c;
      pos++;
    }
    this.resultMes=this.resultado;
    console.log(this.resultado);
  }

  obtenerAnunciosPorAnio(){
    this.habilitar=false;
    this.anunciosPorRol=false;
    this.anunciosPorArea=false;
    this.anunciosPorMedio=false;
    this.anunciosPorMes=false;
    this.anunciosPorAnio=true;
    this.anunciosPorPeriodo=false;
    this.label="Año";
    this.resultAnio=[];
    this.resultado=[];
    var pos=0;
    var c=0;
    var anio=2010;
    for(let i=2010;i<2023;i++){
      this.resultado.push({name:i.toString(),value:0});
    }
    
    for(let i=1;i<=this.resultado.length;i++){
      c=0;
      for(let j=0;j<this.anuncios.length;j++){
        if(new Date(this.anuncios[j].fechaEntrega).getFullYear()==anio)
          c++;  
      }
      this.resultado[pos].value=c;
      pos++;
      anio++;
    }
    this.resultAnio=this.resultado;
    console.log(this.resultado);
  }

  obtenerAnunciosPorPeriodo(){
    this.anunciosPorRol=false;
    this.anunciosPorArea=false;
    this.anunciosPorMedio=false;
    this.anunciosPorMes=false;
    this.anunciosPorAnio=false;
    this.anunciosPorPeriodo=true;
    this.label="Periodo";
    this.resultPeriodo=[];
    this.resultado=[];
    var c=0;
    this.nombres= new Array<string>();
    this.areas.forEach((item:Area)=>{
      this.nombres.push(item.nombreArea);
    })

    for(let i=0;i<this.nombres.length;i++){
      c=0;
      for(let j=0;j<this.anuncios.length;j++){
        if(this.anuncios[j].area.nombreArea==this.nombres[i] &&
          ((this.anuncios[j].fechaEntrega<this.rangoFinal) && 
          (this.anuncios[j].fechaEntrega>this.rangoInicial)))
          c++;
      }
      this.cantidadDatos.push(c);
      this.resultado.push({"name":this.nombres[i],"value":c});
      this.resultPeriodo=this.resultado;
    }
    console.log(this.resultado);
  }
  habilitarFormPeriodo(){
    this.habilitar=true;
  }
  
  //Evento para grafica de torta
  onSelectPie(data:datos): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  //Evento para grafica de torta
  onActivatePie(data:datos): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  //Evento para grafica de torta
  onDeactivatePie(data:datos): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  //Evento para grafica de barra
  onSelectBar(event:datos) {
    console.log('Deactivate', JSON.parse(JSON.stringify(event)));
  }

  ngOnInit(): void {}
}

