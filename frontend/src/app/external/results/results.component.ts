import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { DropDownListComponent } from 'smart-webcomponents-angular/dropdownlist';
import { Phone } from 'src/app/phone.model';
import { NotificationService } from 'src/app/services/notification.service';
import { SearchService } from 'src/app/services/search.service';
import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})



export class ResultsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dropdownlist', { read: DropDownListComponent, static: false }) dropdownlist: DropDownListComponent;

  public bankCtrl: FormControl = new FormControl();
  public bankFilterCtrl: FormControl = new FormControl();
  // phone: Phone;
  phone = new Phone();
  result: number;
  titulo: string;

  memorias_ram = [{id:2,value:'2GB'}, {id:3,value: '3GB'},{id:4,value: '4GB'},{id:6,value: '6GB'},{id:8,value: '8GB'}];
  capacidades = [{id:12,value:'12GB'}, {id:24,value: '24GB'},{id:48,value: '48GB'},{id:64,value: '64GB'},{id:128,value: '128GB'}];
  conditions = [{id:1,value:'Novo'}, {id:0,value: 'Usado'}];
  opcoes = [{id:1,value:'Sim'}, {id:0,value: 'Não'}];
  marcas = ['Apple', 'Motorola', 'Samsung', 'Xiaomi'];
  dicionario_completo = [{marcat:'Apple',modelot:'IPHONE 11',linhat:'iPhone',processadort:'A13 Bionic com Neural Engine de terceira gerac...'},{marcat:'Apple',modelot:'IPHONE 11',
  linhat:'iPhone',processadort:'Apple A12 Bionic'},{marcat:'Apple',modelot:'IPHONE 11',linhat:'iPhone',processadort:'Apple A13 Bionic'},{marcat:'Apple',modelot:'IPHONE 7',linhat:'iPhone',processadort:'Apple A10 Fusion'},{marcat:'Apple',modelot:'IPHONE 8',linhat:'iPhone',processadort:'Apple A11 Bionic'},{marcat:'Xiaomi',modelot:'REDMI NOTE 8',linhat:'Redmi',processadort:'Snapdragon 665'},{marcat:'Xiaomi',modelot:'REDMI NOTE 9',linhat:'Redmi',processadort:'MediaTek Helio G85'},{marcat:'Apple',modelot:'IPHONE 6S',linhat:'iPhone',
  processadort:'Apple A9'},{marcat:'Xiaomi',modelot:'REDMI NOTE 10',linhat:'Redmi',processadort:'Snapdragon 678'},{marcat:'Apple',modelot:'IPHONE 8 PLUS',linhat:'iPhone',processadort:'Apple A11 Bionic'},{marcat:'Apple',modelot:'IPHONE 7 PLUS',linhat:'iPhone',processadort:'Apple A10 Fusion'},{marcat:'Apple',modelot:'IPHONE XR',linhat:'iPhone',processadort:'Apple A12 Bionic'},{marcat:'Apple',modelot:'IPHONE X',linhat:'iPhone',processadort:'Apple A11 Bionic'},{marcat:'Apple',modelot:'IPHONE 11',linhat:'iPhone',processadort:'Apple A13 Bionic'},{marcat:'Xiaomi',modelot:'REDMI NOTE 9S',linhat:'Redmi',processadort:'Snapdragon 720G'},{marcat:'Apple',modelot:'IPHONE 6',linhat:'iPhone',processadort:'Apple A8'},{marcat:'Xiaomi',modelot:'REDMI 9A',linhat:'Redmi',processadort:'MediaTek Helio G25'},{marcat:'Xiaomi',modelot:'REDMI 9',linhat:'Redmi',processadort:'MediaTek Helio G80'},{marcat:'Xiaomi',modelot:'REDMI NOTE 8 PRO',linhat:'Redmi',processadort:'MediaTek Helio G90T'},{marcat:'Apple',modelot:'IPHONE 5S',linhat:'iPhone',processadort:'Apple A7'},{marcat:'Apple',modelot:'IPHONE SE',linhat:'iPhone',
  processadort:'Apple A9'},{marcat:'Apple',modelot:'IPHONE XS',linhat:'iPhone',processadort:'Apple A12 Bionic'},{marcat:'Samsung',modelot:'GALAXY A10S',linhat:'Galaxy A',processadort:'MediaTek MT6762 Helio P22'},{marcat:'Apple',modelot:'IPHONE XS MAX',linhat:'iPhone',processadort:'Apple A12 Bionic'},{marcat:'Samsung',modelot:'GALAXY A01',linhat:'Galaxy A',processadort:'Snapdragon 439'},{marcat:'Apple',modelot:'IPHONE 11 PRO MAX',linhat:'iPhone',processadort:'Apple A13 Bionic'},{marcat:'Xiaomi',modelot:'REDMI 9C',linhat:'Redmi',processadort:'MediaTek Helio G35'},{marcat:'Xiaomi',modelot:'REDMI 9T',linhat:'Redmi',processadort:'Snapdragon 662'},{marcat:'Apple',modelot:'IPHONE 6S PLUS',linhat:'iPhone',
  processadort:'Apple A9'},{marcat:'Xiaomi',modelot:'MI 9',linhat:'Mi',processadort:'Snapdragon 855'},{marcat:'Motorola',modelot:'MOTO G5S',linhat:'Moto G',processadort:'Snapdragon 430'},{marcat:'Samsung',modelot:'GALAXY A01',linhat:'Galaxy A',processadort:'Mediatek MT6739'},{marcat:'Motorola',modelot:'MOTO G8 PLAY',linhat:'Moto G',processadort:'MediaTek MT6771 Helio P70M'},{marcat:'Xiaomi',modelot:'REDMI NOTE 7',linhat:'Redmi',processadort:'Snapdragon 660'},{marcat:'Samsung',modelot:'GALAXY A51',linhat:'Galaxy A',processadort:'Exynos 9611'},{marcat:'Xiaomi',modelot:'REDMI 8A',linhat:'Redmi',processadort:'Snapdragon 439'},{marcat:'Apple',modelot:'IPHONE 11 PRO',linhat:'iPhone',processadort:'Apple A13 Bionic'},{marcat:'Motorola',modelot:'MOTO G7 PLAY',linhat:'Moto G',processadort:'Snapdragon 632'},{marcat:'Samsung',modelot:'GALAXY A11',linhat:'Galaxy A',processadort:'Snapdragon 450'},{marcat:'Motorola',modelot:'MOTO E 6S',linhat:'Moto E',processadort:'MediaTek MT6762 Helio P22'},{marcat:'Xiaomi',modelot:'MI 9T',linhat:'Mi',processadort:'Snapdragon 730'},
  {marcat:'Samsung',modelot:'GALAXY A71',linhat:'Galaxy A',processadort:'Snapdragon 730'},{marcat:'Samsung',modelot:'GALAXY A21S',linhat:'Galaxy A',processadort:'Exynos 850'},{marcat:'Xiaomi',modelot:'MI A3',linhat:'Mi',processadort:'Snapdragon 665'},{marcat:'Samsung',modelot:'GALAXY A31',linhat:'Galaxy A',processadort:'MediaTek MT6768 Helio P65'},{marcat:'Apple',modelot:'IPHONE 6S PLUS',linhat:'iPhone',processadort:'Apple A8'},{marcat:'Xiaomi',modelot:'MI 10T',linhat:'Mi',processadort:'Snapdragon 865'},{marcat:'Xiaomi',
  modelot:'REDMI 9',linhat:'Redmi',processadort:'MediaTek Helio G35'},{marcat:'Xiaomi',modelot:'REDMI NOTE 9',linhat:'Redmi',processadort:'Snapdragon 720G'},{marcat:'Xiaomi',modelot:'MI 9T PRO',linhat:'Mi',processadort:'Snapdragon 855'},{marcat:'Motorola',modelot:'MOTO Z2 PLAY',linhat:'Moto Z',processadort:'Snapdragon 626'},{marcat:'Xiaomi',modelot:'REDMI 9I',linhat:'Redmi',processadort:'MediaTek Helio G25'},{marcat:'Xiaomi',modelot:'REDMI NOTE 9 PRO MAX',linhat:'Redmi',processadort:'MediaTek Dimensity 800U'},{marcat:'Motorola',modelot:'MOTO G6',linhat:'Moto G',processadort:'Snapdragon 450'},{marcat:'Xiaomi',modelot:'MI NOTE 10',linhat:'Mi',processadort:'Snapdragon 730G'},{marcat:'Motorola',modelot:'G9 PLAY DUAL SIM',linhat:'Moto G',processadort:'Snapdragon 662'},{marcat:'Motorola',modelot:'MOTO G5',linhat:'Moto G',processadort:'Snapdragon 430'},{marcat:'Motorola',modelot:'MOTO G6 PLAY',linhat:'Moto G',processadort:'Snapdragon 430'},{marcat:'Motorola',modelot:'MOTO G8 POWER',linhat:'Moto G',processadort:'Snapdragon 665'},{marcat:'Motorola',modelot:'ONE VISION',linhat:'One',processadort:'Exynos 9609'},{marcat:'Samsung',modelot:'GALAXY J7 PRIME',linhat:'Galaxy J',processadort:'Exynos 7870'},{marcat:'Samsung',modelot:'GALAXY A50',linhat:'Galaxy A',
  processadort:'Exynos 9610'},{marcat:'Samsung',modelot:'GALAXY A30S',linhat:'Galaxy A',processadort:'Exynos 7904'},{marcat:'Samsung',modelot:'GALAXY A12',linhat:'Galaxy A',processadort:'MediaTek MT6765 Helio P35'},{marcat:'Motorola',modelot:'MOTO G7 POWER',linhat:'Moto G',processadort:'Snapdragon 632'},{marcat:'Samsung',modelot:'GALAXY S20+',linhat:'Galaxy S',processadort:'Exynos 990'},{marcat:'Xiaomi',modelot:'MI 9 SE',linhat:'Mi',processadort:'Snapdragon 712'},{marcat:'Motorola',modelot:'MOTO G5 PLUS',linhat:'Moto G',processadort:'Snapdragon 625'},{marcat:'Motorola',modelot:'ONE',linhat:'One',processadort:'Snapdragon 625'},{marcat:'Apple',modelot:'IPHONE SE',linhat:'iPhone',processadort:'Apple A13 Bionic'},{marcat:'Samsung',modelot:'GALAXY J5',linhat:'Galaxy J',processadort:'Snapdragon 410'},{marcat:'Samsung',modelot:'GALAXY A10',linhat:'Galaxy A',processadort:'Exynos 7884'},{marcat:'Samsung',modelot:'GALAXY S20',linhat:'Galaxy S',processadort:'Exynos 990'},{marcat:'Samsung',modelot:'GALAXY A30',linhat:'Galaxy A',processadort:'Exynos 7904'},{marcat:'Xiaomi',modelot:'REDMI NOTE 9 PRO MAX',linhat:'Redmi',processadort:'Snapdragon 720G'},{marcat:'Motorola',modelot:'MOTO E5',linhat:'Moto E',processadort:'Snapdragon 425'},{marcat:'Motorola',
  modelot:'MOTO G5S PLUS',linhat:'Moto G',processadort:'Snapdragon 625'},{marcat:'Samsung',modelot:'GALAXY A20',linhat:'Galaxy A',processadort:'Exynos 7884'},{marcat:'Motorola',modelot:'MOTO G6 PLUS',linhat:'Moto G',processadort:'Snapdragon 630'},{marcat:'Motorola',modelot:'MOTO Z3 FORCE',linhat:'Moto Z',processadort:'Snapdragon 626'},{marcat:'Motorola',modelot:'MOTO E7 PLUS',linhat:'Moto E',processadort:'Snapdragon 460'},{marcat:'Motorola',modelot:'G8 POWER LITE',linhat:'Moto G',processadort:'MediaTek MT6765 Helio P35'},{marcat:'Apple',modelot:'IPHONE 5',linhat:'iPhone',processadort:'Apple A6'},{marcat:'Motorola',modelot:'MOTO E6S',linhat:'Moto E',processadort:'MediaTek MT6762 Helio P22'},{marcat:'Motorola',modelot:'ONE ACTION',linhat:'One',processadort:'Exynos 9609'},{marcat:'Xiaomi',modelot:'MI 11',linhat:'Mi',processadort:'Snapdragon 888'},{marcat:'Xiaomi',modelot:'REDMI 7A',linhat:'Redmi',processadort:'Snapdragon 439'},{marcat:'Motorola',modelot:'MOTO G7 PLUS',linhat:'Moto G',processadort:'Snapdragon 636'},{marcat:'Samsung',modelot:'GALAXY S8+',linhat:'Galaxy S',
  processadort:'Exynos 8895'},{marcat:'Xiaomi',modelot:'REDMI 9 PRIME',linhat:'Redmi',processadort:'MediaTek Helio G80'},{marcat:'Samsung',modelot:'GALAXY A70',linhat:'Galaxy A',processadort:'Snapdragon 675'},{marcat:'Xiaomi',modelot:'MI 9 LITE',linhat:'Mi',processadort:'Snapdragon 710'},{marcat:'Motorola',modelot:'MOTO G8',linhat:'Moto G',processadort:'Snapdragon 665'},{marcat:'Motorola',modelot:'MOTO Z3 PLAY',linhat:'Moto Z',processadort:'Snapdragon 636'},{marcat:'Xiaomi',modelot:'REDMI 8',linhat:'Redmi',processadort:'Snapdragon 439'},{marcat:'Motorola',modelot:'G9 PLUS DUAL SIM',linhat:'Moto G',processadort:'Snapdragon 730G'},{marcat:'Motorola',modelot:'MOTO G4',linhat:'Moto G',processadort:'Snapdragon 617'},{marcat:'Samsung',modelot:'GALAXY A7',linhat:'Galaxy A',processadort:'Exynos 7885'},{marcat:'Xiaomi',modelot:'MI 10T PRO',linhat:'Mi',processadort:'Snapdragon 865'},{marcat:'Motorola',modelot:'MOTO E6 PLUS',linhat:'Moto E',processadort:'MediaTek MT6762 Helio P22'},{marcat:'Motorola',modelot:'MOTO ONE',linhat:'One',processadort:'Snapdragon 625'},{marcat:'Motorola',modelot:'MOTO E6 PLAY',linhat:'Moto E',processadort:'MediaTek MT6739'},{marcat:'Motorola',modelot:'MOTO G30',linhat:'Moto G',
  processadort:'Snapdragon 662'},{marcat:'Motorola',modelot:'MOTO G7',linhat:'Moto G',processadort:'Snapdragon 632'},{marcat:'Xiaomi',modelot:'MI 10T LITE',linhat:'Mi',processadort:'Snapdragon 750G'},{marcat:'Motorola',modelot:'MOTO G9 PLAY',linhat:'Moto G',processadort:'Snapdragon 662'},{marcat:'Motorola',modelot:'MOTOROLA ONE FUSION',linhat:'One',processadort:'Snapdragon 710'},{marcat:'Motorola',modelot:'ONE MACRO',linhat:'One',processadort:'MediaTek MT6771 Helio P70'},{marcat:'Samsung',modelot:'GALAXY GRAN PRIME',linhat:'Galaxy Grand',processadort:'Snapdragon 410'},{marcat:'Samsung',modelot:'GALAXY A02S',linhat:'Galaxy',processadort:'Snapdragon 450'},{marcat:'Samsung',modelot:'GALAXY A12',linhat:'Galaxy',processadort:'MediaTek MT6765 Helio P35'},{marcat:'Samsung',modelot:'GALAXY J6+ DUOS',linhat:'Galaxy J',processadort:'Snapdragon 425'},{marcat:'Samsung',modelot:'GALAXY A52',linhat:'Galaxy A',processadort:'Snapdragon 720G'},{marcat:'Samsung',modelot:'GALAXY A02',linhat:'Galaxy A',processadort:'MediaTek MT6739W'},{marcat:'Samsung',modelot:'GALAXY A72',
  linhat:'Galaxy A',processadort:'Snapdragon 720G'},{marcat:'Samsung',modelot:'GALAXY J5 PRO',linhat:'Galaxy J',processadort:'Exynos 7870'},{marcat:'Motorola',modelot:'MOTO X4',linhat:'Moto X',processadort:'Snapdragon 630'},{marcat:'Apple',modelot:'IPHONE 5C',linhat:'iPhone',processadort:'Apple A6'},{marcat:'Samsung',modelot:'GALAXY S6',linhat:'Galaxy S',processadort:'Exynos 7420'},{marcat:'Samsung',modelot:'GALAXY J8 DUOS',linhat:'Galaxy J',processadort:'Snapdragon 450'},{marcat:'Motorola',modelot:'MOTO G9 POWER',linhat:'Moto G',processadort:'Snapdragon 662'},{marcat:'Samsung',modelot:'GALAXY A8',linhat:'Galaxy A',processadort:'Exynos 7885'},{marcat:'Motorola',modelot:'MOTO Z PLAY',linhat:'Moto Z',processadort:'Snapdragon 625'},{marcat:'Samsung',modelot:'GALAXY J7 PRO DUOS',linhat:'Galaxy J',processadort:'Exynos 7870'},{marcat:'Xiaomi',modelot:'MI 11 LITE',linhat:'Mi',processadort:'Snapdragon 732G'},
  {marcat:'Motorola',modelot:'MOTO E5 PLAY',linhat:'Moto E',processadort:'Snapdragon 425'},{marcat:'Motorola',modelot:'MOTO E7',linhat:'Moto E',processadort:'MediaTek Helio G25'},{marcat:'Samsung',modelot:'GALAXY A5',linhat:'Galaxy A',processadort:'Exynos 7880'},{marcat:'Samsung',modelot:'GALAXY J4',linhat:'Galaxy J',processadort:'Exynos 7570'},{marcat:'Samsung',modelot:'GALAXY J5 PRIME',linhat:'Galaxy J',processadort:'Exynos 7570'},{marcat:'Samsung',modelot:'GALAXY A32',linhat:'Galaxy A',processadort:'MediaTek Helio G80'},{marcat:'Samsung',modelot:'GALAXY J7',linhat:'Galaxy J',processadort:'Exynos 7580'},{marcat:'Apple',modelot:'IPHONE 6S',linhat:'iPhone',processadort:'Dual-Core 1.8 Ghz'},{marcat:'Motorola',modelot:'MOTO G10',linhat:'Moto G',processadort:'Snapdragon 460'},{marcat:'Motorola',modelot:'MOTO G8 PLUS',linhat:'Moto G',processadort:'Snapdragon 665'},{marcat:'Samsung',modelot:'GALAXY A20',linhat:'Galaxy A',processadort:'Snapdragon 450'},{marcat:'Samsung',modelot:'GALAXY J8',linhat:'Galaxy J',processadort:'Snapdragon 450'},{marcat:'Samsung',modelot:'GALAXY A10S',
  linhat:'Galaxy',processadort:'MediaTek MT6762 Helio P22'},{marcat:'Samsung',modelot:'GALAXY A31',linhat:'Galaxy',processadort:'MediaTek MT6768 Helio P65'},{marcat:'Motorola',modelot:'MOTO G8 POWER',linhat:'Moto G',processadort:'MediaTek MT6765 Helio P35'},{marcat:'Motorola',modelot:'MOTO G10',linhat:'Moto',processadort:'Snapdragon 460'},{marcat:'Motorola',modelot:'MOTO G5 PLUS',linhat:'Moto G',processadort:'Snapdragon 765 5G'},{marcat:'Samsung',modelot:'GALAXY A02',linhat:'Galaxy',processadort:'MediaTek MT6739W'},{marcat:'Samsung',modelot:'GALAXY A02S',
  linhat:'Galaxy A',processadort:'Snapdragon 450'},{marcat:'Samsung',modelot:'GALAXY A7',linhat:'Galaxy A',processadort:'Exynos 7880'}];
  dicionario_filtrado = [];

  linhas = ['Black Shark','E','Galaxy','Galaxy A','Galaxy J','Galaxy M','Galaxy Note','Galaxy S','Galaxy Z','iPhone','iPhone SE','Mi',
  'Moto C','Moto E','Moto Edge','Moto G','Moto G100','Nexus','Note','One','Poco','Redmi','SE','Series 3','Space Gray'];
  modelos = ['iPhone 6','iPhone 7','iPhone 8','iPhone 11','iPhone 12','iPhone SE (2nd Generation)','Redmi 6','Mi 6','iPhone 11 Pro Max','Mi 10','Galaxy S21 Ultra',
  'Mi 10 Pro','Galaxy S21 Plus','Mi 10 Ultra','Mi 10i','iPhone 12 Mini','Mi 10S','iPhone 12 Pro','iPhone 12 Pro Max','Galaxy S21','Redmi 10X Pro','Mi 11 Lite',
  'Mi 11 Litw','Nexus 6','Moto G8','Mi 2S','Mi 3S','Moto G100','Mi 5S','Redmi 6 Pro','Redmi Note 9','Redmi 6A','Galaxy A72','Galaxy 21 Ultra','Moto G8700','Redmi 7A',
  'Galaxy A52','Galaxy A32','Mi 8','Galaxy S6 Edge','Galaxy S6','Redmi 8A','Redmi 8A Pro','Mi 9','Galaxy A31','Redmi Note 9 Pro','Moto C A1000','Galaxy A10S',
  'Redmi 9AT','Redmi 9C','Redmi 9i','Redmi 9S','Galaxy A02S','Galaxy XCover Pro','Galaxy S20','Moto A1210','iPhone 5S','Moto A300','MI 9T','Galaxy Note 20 Ultra',
  'Moto A388','Galaxy S9','iPhone 6 Plus','Redmi 9T','Moto G6 Plus','iPhone 6S','Galaxy A51','Galaxy S10','Galaxy Note 20','Redmi Note 9T','Mi A1','Galaxy S9+',
  'Galaxy J7','Galaxy Noite 4','iPhone 6S Plus','Galaxy A10s','Galaxy A6+','Black Shark 2','Black Shark 2 Pro','Galaxy A8+','Black Shark 3S','Galaxy Z Fold 2',
  'Galaxy A01','Black Shark 4','Galaxy A12','Atrix','Galaxy J7 Prime','Atrix TV','Mi CC9','Poco X3','Galaxy A71','Moto C','Poco F3','Galaxy A10','Galaxy A7 (2018)',
  'Galaxy A11','Galaxy J6+','Galaxy S20 FE','Moto C385','Moto C650','Galaxy S20+','Galaxy S8+','Redmi K20 Pro','Samsung A52','Redmi K30 Pro','Redmi K40','Galaxy S21+',
  'iPhone 7 Plus','Galaxy A02','Galaxy J5','Galaxy J7 Pro','Galaxy S7 Edge','Galaxy A21S','Galaxy A5','Galaxy A9','Redmi Note 7','Galaxy Note 5','Redmi 9','Redmi M3',
  'Mi 3 Max','Mi 10T','Moto E2','Mi 10T Lite','Moto E4','Galaxy A7','Moto E4 Plus','Galaxy Note 9','Galaxy S20 Ultra','Galaxy S8 Plus','Galaxy J1 Mini','Moto E5','Mi 11',
  'Moto E5 Play','Mi 9 SE','Galaxy Note10 Plus','Moto E6 Play','Galaxy J4 Plus','Mi 9T','Mi 9T Pro','Moto E6 Plus','Moto E6i','Galaxy A','Moto E6s','Galaxy A8','Mi A2',
  'Galaxy S10 Lite','Galaxy S10e','iPhone 8 Plus','Galaxy S8','Moto E7','Moto E7 Plus','Moto Edge','Mi A3','Moto Edge+','Mi 3 Mix','Galaxy Note 3','Mi Note 10','Galaxy S5',
  'EX128','MI 6','Moto G1','Moto G2','Galaxy A32 Duos','Galaxy A7 2018','Galaxy M31','Galaxy Z Flip','Moto G3','Mi Mix 18k','Mi Mix 2','Galaxy J5 Prime','Galaxy J6','Moto G5',
  'Galaxy Note','Galaxy A02s','Moto G5 Plus','Moto G Fast','iPhone SE','G Play','Moto G Pro','Mi Mix 3','Moto G Stylus','Iphone 7','Moto G Turbo','Moto G10','Note 9 Pro',
  'Galaxy A70','Galaxy Note 8','Galaxy J4','Moto G10 Power','Galaxy J9','Galaxy J7 Metal','Galaxy M11','Galaxy S10+','Iphone 8','Note 10','iPhone XS','Moto G30','Note 10 Pro',
  'Moto G4','Redmi Note 10 Pro','Redmi Note 10 Pro Max','Redmi Note 10S','iPhone 11 Pro','Moto G4 Play','Moto G4 Plus','Redmi Note 6 Pro','Redmi Note 7 Pro','Mi Note 9','Moto G5s',
  'iPhone 11 Pro Max','Galaxy Note 10','Moto G5s Plus','Note 9S Pro','Poco C3','Moto G6','Moto G6 Play','Poco F1','Galaxy S9 Plus','Moto G60','Moto G7','Moto G7 Play','Moto G7 Plus',
  'Moto G7 Power','Poco F2 Pro','Moto G8 Play','Moto G8 Power','Moto G9','Moto G9 Play','Moto G9 Plus','Moto G9 Power','Lenovo K10 Note','Moto M','Moto Maxx','Moto E6I','Moto E',
  'POCO F3 5G','Moto E6S','Poco F3 5G','Moto 7','Moto E7 Power','Motorola One Fusion','Moto G 9 Play','Poco M3','Poco X2','Poco X3 Pro','Redmi Pro','Redmi Note 10','Redmi 10x',
  'Redmi 9A','Galaxy A31S','Redmi Note 8 Pro','Redmi Note 8T','Galaxy Note 10 Plus','Redmi Note 6','Galaxy Note 10 Lite','Redmi Note 8','Redmi Note 9S','Galaxy S10 Plus','Redmi S2',
  'Redmi 9 Prime','Cubot P40','Redmi Note 8  Pro','iPhone X','iPhone XR','Moto G20','Moto G 5G','Moto One','Moto One Action','Moto One Edge','Moto One Vision',
  'Moto Z','moto z play 2','Moto Z2 Force','Moto Z2 Play','Moto z3 play','Moto G Plus','Moto G 6','Moto One Hyper','iPhone 10','iPhone 12 Mi','iPhone 3G','iPhone 3GS','iPhone 4',
  'iPhone 4s','iPhone 5','iPhone 5c','iPhone 5s','iPhone 7S','iPhone Se','iPhone XS Max','iPhone 12 Pro Mini','Moto E Vision','Galaxy A706','Motorola One Action','Motorola One Macro',
  'Motorola One Vision','Motorola One Fusion Plus','One Fusion+','Motorola Macro Dual','Motorola One Vision Plus','Motorola One Zoom','Moto P30','Moto RAZR','Moto RAZR I','Moto RAZR V3',
  'Moto S5','One Edge','Moto Turbo','Moto X','Moto X Force','Moto X Play','Moto X Style','Moto Z3 Play','Motorola One','Motorola Razr','Moto G8 Plus','Motorola One Hyper',
  'Moto G8 Power Lite','Moto G 60','Moto Z Play','Moto Z Power','Moto Z Style','Moto Z3 Force','Moto Z3'];
  modelos_processador = ['Apple A13 Bionic'];

  searchText = new Subject();
  public modelosFiltrados: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  protected _onDestroy = new Subject<void>();
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  constructor(private SearchService: SearchService, private router: Router, private NotificationServe: NotificationService) {

    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state) {
      this.phone = this.router.getCurrentNavigation().extras.state.phone;
      this.result = this.router.getCurrentNavigation().extras.state.result;
      this.titulo = this.phone.Marca + " " + this.phone.Linha + " " +
      this.phone.memoria_ram + " " + this.phone.memoria_interna + " " + this.phone.condition
    }
    else {
      this.phone = new Phone();
    }

  }

  ngOnInit(): void {
    this.bankCtrl.setValue(this.modelos[10]);
    this.modelosFiltrados.next(this.modelos.slice());
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarModelos();
      });
  }
  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.modelosFiltrados
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a, b) => a && b && a.id === b.id;
      });
  }

  protected filtrarModelos() {
    if (!this.modelos) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.modelosFiltrados.next(this.dicionario_filtrado.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.modelosFiltrados.next(
      this.dicionario_filtrado.filter(modelo => modelo.modelot.toLowerCase().indexOf(search) > -1)
    );
  }

  onSubmit(): void {
    console.log(this.phone)
    // this.titulo = "Apple iPhone iPhone SE Apple A13 Bionic 128GB 3GB";
    this.SearchService.search(this.phone)
      .subscribe(ret => {
        this.result = ret.PRECO;
        this.titulo = this.phone.Marca + " " + this.phone.Linha + " " +
          this.phone.memoria_ram + "GB " + this.phone.memoria_interna + "GB " + this.phone.condition
      }, error => {
        this.NotificationServe.showError(error.message, "Erro!");
      });
  }

  metodo(marca_selecionada){
    this.dicionario_filtrado = this.dicionario_completo.filter((c) => {
      return c.marcat == marca_selecionada
      // ? c:null
    })
    this.filtrarModelos()
  }
}
