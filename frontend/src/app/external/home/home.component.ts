import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DropDownListComponent } from 'smart-webcomponents-angular/dropdownlist';
import { Phone } from 'src/app/phone.model';
import { NotificationService } from 'src/app/services/notification.service';
import { SearchService } from 'src/app/services/search.service';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { startWith, map, takeUntil, take } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dropdownlist', { read: DropDownListComponent, static: false }) dropdownlist: DropDownListComponent;
  constructor(private SearchService: SearchService, private router: Router, private NotificationServe: NotificationService) { }

  public bankCtrl: FormControl = new FormControl();
  public bankFilterCtrl: FormControl = new FormControl();
  // public filteredBanks: ReplaySubject<> = new ReplaySubject<>(1);

  // memoria_interna: number;
  // memoria_ram: number;
  // quantidade_sims: number;
  // ano_lancamento: number;
  // marca_renomeado_upper: string;	---> MODELO
  // condition: string;
  // Linha: string;
  // Marca: string;

  phone: Phone = new Phone();
  capacidades = [12,24,48,64,128];
  capacidades_foto = ['12GB','24GB','48GB','64GB'];
  memorias_ram = [2,3,4,6,8];
  memorias_ram_foto = ['2GB','3GB','4GB','6GB'];
  sims = [1,2];
  anos = [2017,2018,2019,2020,2021];
  conditions = ['new', 'used'];
  conditions_foto = ['Novo', 'Usado'];
  marcas = ['Apple', 'Motorola', 'Samsung', 'Xiaomi'];
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

  searchText = new Subject();
  public modelosFiltrados: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  protected _onDestroy = new Subject<void>();
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

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
        this.singleSelect.compareWith = (a,b) => a && b && a.id === b.id;
      });
  }

  protected filtrarModelos() {
    if (!this.modelos) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.modelosFiltrados.next(this.modelos.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.modelosFiltrados.next(
      this.modelos.filter(modelo => modelo.toLowerCase().indexOf(search) > -1)
    );
  }

  onSubmit(): void {

    this.SearchService.search(this.phone)
      .subscribe(ret => {
        this.router.navigateByUrl('/results', { state: { phone: this.phone, result: ret.PRECO } });
      }, error => {
        this.NotificationServe.showError(error.message, "Erro!");
      });
  }

}


