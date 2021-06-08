import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DropDownListComponent } from 'smart-webcomponents-angular/dropdownlist';
import { Phone } from 'src/app/phone.model';
import { NotificationService } from 'src/app/services/notification.service';
import { SearchService } from 'src/app/services/search.service';
import { Observable, pipe, ReplaySubject, Subject } from 'rxjs';
import { startWith, map, takeUntil, take } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
// import { PipeTransform } from '.pipe.component';


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

  phone: Phone = new Phone();

  memorias_ram = [{ id: 2, value: '2GB' }, { id: 3, value: '3GB' }, { id: 4, value: '4GB' }, { id: 6, value: '6GB' }, { id: 8, value: '8GB' }];
  capacidades = [{ id: 12, value: '12GB' }, { id: 24, value: '24GB' }, { id: 32, value: '32GB' }, { id: 48, value: '48GB' }, { id: 64, value: '64GB' }, { id: 128, value: '128GB' }];
  conditions = [{ id: 1, value: 'Novo' }, { id: 0, value: 'Usado' }];
  opcoes = [{ id: 1, value: 'Sim' }, { id: 0, value: 'Não' }];
  marcas = ['Apple', 'Motorola', 'Samsung', 'Xiaomi'];

  dicfiltrado_modelos = [{modelot:"Selecione uma linha"}];
  dicfiltrado_linhas = [{linhat:"Selecione uma marca"}];
  dicfiltrado_processador = [{processadort:"Selecione um modelo"}];

  dicionario_modelo = [{linhat:'Moto G',modelot:'G8 POWER LITE'},{linhat:'Moto G',modelot:'G9 PLAY DUAL SIM'},{linhat:'Moto G',modelot:'G9 PLUS DUAL SIM'},
  {linhat:'Galaxy A',modelot:'Galaxy A01'},{linhat:'Galaxy A',modelot:'Galaxy A02'},{linhat:'Galaxy',modelot:'Galaxy A02'},{linhat:'Galaxy',modelot:'Galaxy A02S'},
  {linhat:'Galaxy A',modelot:'Galaxy A02S'},{linhat:'Galaxy A',modelot:'Galaxy A10'},{linhat:'Galaxy A',modelot:'Galaxy A10S'},{linhat:'Galaxy',modelot:'Galaxy A10S'},
  {linhat:'Galaxy A',modelot:'Galaxy A11'},{linhat:'Galaxy A',modelot:'Galaxy A12'},{linhat:'Galaxy',modelot:'Galaxy A12'},{linhat:'Galaxy A',modelot:'Galaxy A20'},
  {linhat:'Galaxy A',modelot:'Galaxy A21S'},{linhat:'Galaxy A',modelot:'Galaxy A30'},{linhat:'Galaxy A',modelot:'Galaxy A30S'},{linhat:'Galaxy A',modelot:'Galaxy A31'},
  {linhat:'Galaxy',modelot:'Galaxy A31'},{linhat:'Galaxy A',modelot:'Galaxy A32'},{linhat:'Galaxy A',modelot:'Galaxy A5'},{linhat:'Galaxy A',modelot:'Galaxy A50'},
  {linhat:'Galaxy A',modelot:'Galaxy A51'},{linhat:'Galaxy A',modelot:'Galaxy A52'},{linhat:'Galaxy A',modelot:'Galaxy A7'},{linhat:'Galaxy A',modelot:'Galaxy A70'},
  {linhat:'Galaxy A',modelot:'Galaxy A71'},{linhat:'Galaxy A',modelot:'Galaxy A72'},{linhat:'Galaxy A',modelot:'Galaxy A8'},{linhat:'Galaxy Grand',modelot:'Galaxy GRAN PRIME'},
  {linhat:'Galaxy J',modelot:'Galaxy J4'},{linhat:'Galaxy J',modelot:'Galaxy J5'},{linhat:'Galaxy J',modelot:'Galaxy J5 PRIME'},{linhat:'Galaxy J',modelot:'Galaxy J5 PRO'},
  {linhat:'Galaxy J',modelot:'Galaxy J6+ DUOS'},{linhat:'Galaxy J',modelot:'Galaxy J7'},{linhat:'Galaxy J',modelot:'Galaxy J7 PRIME'},{linhat:'Galaxy J',modelot:'Galaxy J7 PRO DUOS'},
  {linhat:'Galaxy J',modelot:'Galaxy J8'},{linhat:'Galaxy J',modelot:'Galaxy J8 DUOS'},{linhat:'Galaxy S',modelot:'Galaxy S20'},{linhat:'Galaxy S',modelot:'Galaxy S20+'},
  {linhat:'Galaxy S',modelot:'Galaxy S6'},{linhat:'Galaxy S',modelot:'Galaxy S8+'},{linhat:'iPhone',modelot:'iPhone 11'},{linhat:'iPhone',modelot:'iPhone 11 PRO'},
  {linhat:'iPhone',modelot:'iPhone 11 PRO MAX'},{linhat:'iPhone',modelot:'iPhone 5'},{linhat:'iPhone',modelot:'iPhone 5C'},{linhat:'iPhone',modelot:'iPhone 5S'},
  {linhat:'iPhone',modelot:'iPhone 6'},{linhat:'iPhone',modelot:'iPhone 6S'},{linhat:'iPhone',modelot:'iPhone 6S PLUS'},{linhat:'iPhone',modelot:'iPhone 7'},
  {linhat:'iPhone',modelot:'iPhone 7 PLUS'},{linhat:'iPhone',modelot:'iPhone 8'},{linhat:'iPhone',modelot:'iPhone 8 PLUS'},{linhat:'iPhone',modelot:'iPhone SE'},
  {linhat:'iPhone',modelot:'iPhone X'},{linhat:'iPhone',modelot:'iPhone XR'},{linhat:'iPhone',modelot:'iPhone XS'},{linhat:'iPhone',modelot:'iPhone XS MAX'},
  {linhat:'Linha',modelot:'marca_renomeada_upper'},{linhat:'Mi',modelot:'MI 10T'},{linhat:'Mi',modelot:'MI 10T LITE'},{linhat:'Mi',modelot:'MI 10T PRO'},
  {linhat:'Mi',modelot:'MI 11'},{linhat:'Mi',modelot:'MI 11 LITE'},{linhat:'Mi',modelot:'MI 9'},{linhat:'Mi',modelot:'MI 9 LITE'},{linhat:'Mi',modelot:'MI 9 SE'},
  {linhat:'Mi',modelot:'MI 9T'},{linhat:'Mi',modelot:'MI 9T PRO'},{linhat:'Mi',modelot:'MI A3'},{linhat:'Mi',modelot:'MI NOTE 10'},{linhat:'Moto E',modelot:'Moto E 6S'},
  {linhat:'Moto E',modelot:'Moto E5'},{linhat:'Moto E',modelot:'Moto E5 PLAY'},{linhat:'Moto E',modelot:'Moto E6 PLAY'},{linhat:'Moto E',modelot:'Moto E6 PLUS'},
  {linhat:'Moto E',modelot:'Moto E6S'},{linhat:'Moto E',modelot:'Moto E7'},{linhat:'Moto E',modelot:'Moto E7 PLUS'},{linhat:'Moto G',modelot:'Moto G10'},
  {linhat:'Moto',modelot:'Moto G10'},{linhat:'Moto G',modelot:'Moto G30'},{linhat:'Moto G',modelot:'Moto G4'},{linhat:'Moto G',modelot:'Moto G5'},{linhat:'Moto G',modelot:'Moto G5 PLUS'},
  {linhat:'Moto G',modelot:'Moto G5S'},{linhat:'Moto G',modelot:'Moto G5S PLUS'},{linhat:'Moto G',modelot:'Moto G6'},{linhat:'Moto G',modelot:'Moto G6 PLAY'},
  {linhat:'Moto G',modelot:'Moto G6 PLUS'},{linhat:'Moto G',modelot:'Moto G7'},{linhat:'Moto G',modelot:'Moto G7 PLAY'},{linhat:'Moto G',modelot:'Moto G7 PLUS'},
  {linhat:'Moto G',modelot:'Moto G7 POWER'},{linhat:'Moto G',modelot:'Moto G8'},{linhat:'Moto G',modelot:'Moto G8 PLAY'},{linhat:'Moto G',modelot:'Moto G8 PLUS'},
  {linhat:'Moto G',modelot:'Moto G8 POWER'},{linhat:'Moto G',modelot:'Moto G9 PLAY'},{linhat:'Moto G',modelot:'Moto G9 POWER'},{linhat:'One',modelot:'Moto ONE'},
  {linhat:'Moto X',modelot:'Moto X4'},{linhat:'Moto Z',modelot:'Moto Z PLAY'},{linhat:'Moto Z',modelot:'Moto Z2 PLAY'},{linhat:'Moto Z',modelot:'Moto Z3 FORCE'},
  {linhat:'Moto Z',modelot:'Moto Z3 PLAY'},{linhat:'One',modelot:'Motorola ONE FUSION'},{linhat:'One',modelot:'ONE'},{linhat:'One',modelot:'ONE ACTION'},{linhat:'One',modelot:'One Macro'},
  {linhat:'One',modelot:'ONE VISION'},{linhat:'Redmi',modelot:'Redmi 7A'},{linhat:'Redmi',modelot:'Redmi 8'},{linhat:'Redmi',modelot:'Redmi 8A'},{linhat:'Redmi',modelot:'Redmi 9'},
  {linhat:'Redmi',modelot:'Redmi 9 PRIME'},{linhat:'Redmi',modelot:'Redmi 9A'},{linhat:'Redmi',modelot:'Redmi 9C'},{linhat:'Redmi',modelot:'Redmi 9I'},{linhat:'Redmi',modelot:'Redmi 9T'},
  {linhat:'Redmi',modelot:'Redmi NOTE 10'},{linhat:'Redmi',modelot:'Redmi NOTE 7'},{linhat:'Redmi',modelot:'Redmi NOTE 8'},{linhat:'Redmi',modelot:'Redmi NOTE 8 PRO'},
  {linhat:'Redmi',modelot:'Redmi NOTE 9'},{linhat:'Redmi',modelot:'Redmi NOTE 9 PRO MAX'},{linhat:'Redmi',modelot:'Redmi NOTE 9S'}];
  dicionario_linhas = [{marcat:'Samsung',linhat:'Galaxy'},{marcat:'Samsung',linhat:'Galaxy A'},{marcat:'Samsung',linhat:'Galaxy Grand'},
  {marcat:'Samsung',linhat:'Galaxy J'},{marcat:'Samsung',linhat:'Galaxy S'},{marcat:'Apple',linhat:'iPhone'},{marcat:'Xiaomi',linhat:'Mi'},
  {marcat:'Motorola',linhat:'Moto'},{marcat:'Motorola',linhat:'Moto E'},{marcat:'Motorola',linhat:'Moto G'},{marcat:'Motorola',linhat:'Moto X'},
  {marcat:'Motorola',linhat:'Moto Z'},{marcat:'Motorola',linhat:'One'},{marcat:'Xiaomi',linhat:'Redmi'}];
  dicionario_processador = [{modelot:'iPhone 7',processadort:'Apple A10 Fusion'},
  {modelot:'iPhone 7 PLUS',processadort:'Apple A10 Fusion'},{modelot:'iPhone 8',processadort:'Apple A11 Bionic'},{modelot:'iPhone 8 PLUS',processadort:'Apple A11 Bionic'},
  {modelot:'iPhone X',processadort:'Apple A11 Bionic'},{modelot:'iPhone 11',processadort:'Apple A12 Bionic'},{modelot:'iPhone XR',processadort:'Apple A12 Bionic'},
  {modelot:'iPhone XS',processadort:'Apple A12 Bionic'},{modelot:'iPhone XS MAX',processadort:'Apple A12 Bionic'},{modelot:'iPhone 11',processadort:'Apple A13 Bionic'},
  {modelot:'iPhone 11 PRO MAX',processadort:'Apple A13 Bionic'},{modelot:'iPhone 11 PRO',processadort:'Apple A13 Bionic'},{modelot:'iPhone SE',processadort:'Apple A13 Bionic'},
  {modelot:'iPhone 5',processadort:'Apple A6'},{modelot:'iPhone 5C',processadort:'Apple A6'},{modelot:'iPhone 5S',processadort:'Apple A7'},{modelot:'iPhone 6',processadort:'Apple A8'},
  {modelot:'iPhone 6S PLUS',processadort:'Apple A8'},{modelot:'iPhone 6S',processadort:'Apple A9'},{modelot:'iPhone SE',processadort:'Apple A9'},{modelot:'iPhone 6S PLUS',processadort:'Apple A9'},
  {modelot:'iPhone 6S',processadort:'Dual-Core 1.8 Ghz'},{modelot:'Galaxy S6',processadort:'Exynos 7420'},{modelot:'Galaxy J4',processadort:'Exynos 7570'},{modelot:'Galaxy J5 PRIME',processadort:'Exynos 7570'},
  {modelot:'Galaxy J7',processadort:'Exynos 7580'},{modelot:'Galaxy J7 PRIME',processadort:'Exynos 7870'},{modelot:'Galaxy J5 PRO',processadort:'Exynos 7870'},{modelot:'Galaxy J7 PRO DUOS',processadort:'Exynos 7870'},
  {modelot:'Galaxy A5',processadort:'Exynos 7880'},{modelot:'Galaxy A7',processadort:'Exynos 7880'},{modelot:'Galaxy A10',processadort:'Exynos 7884'},{modelot:'Galaxy A20',processadort:'Exynos 7884'},
  {modelot:'Galaxy A7',processadort:'Exynos 7885'},{modelot:'Galaxy A8',processadort:'Exynos 7885'},{modelot:'Galaxy A30S',processadort:'Exynos 7904'},{modelot:'Galaxy A30',processadort:'Exynos 7904'},
  {modelot:'Galaxy A21S',processadort:'Exynos 850'},{modelot:'Galaxy S8+',processadort:'Exynos 8895'},{modelot:'ONE VISION',processadort:'Exynos 9609'},{modelot:'ONE ACTION',processadort:'Exynos 9609'},
  {modelot:'Galaxy A50',processadort:'Exynos 9610'},{modelot:'Galaxy A51',processadort:'Exynos 9611'},{modelot:'Galaxy S20+',processadort:'Exynos 990'},{modelot:'Galaxy S20',processadort:'Exynos 990'},
  {modelot:'Redmi NOTE 9 PRO MAX',processadort:'MediaTek Dimensity 800U'},{modelot:'Redmi 9A',processadort:'MediaTek Helio G25'},{modelot:'Redmi 9I',processadort:'MediaTek Helio G25'},
  {modelot:'Moto E7',processadort:'MediaTek Helio G25'},{modelot:'Redmi 9C',processadort:'MediaTek Helio G35'},{modelot:'Redmi 9',processadort:'MediaTek Helio G35'},{modelot:'Redmi 9',processadort:'MediaTek Helio G80'},
  {modelot:'Redmi 9 PRIME',processadort:'MediaTek Helio G80'},{modelot:'Galaxy A32',processadort:'MediaTek Helio G80'},{modelot:'Redmi NOTE 9',processadort:'MediaTek Helio G85'},
  {modelot:'Redmi NOTE 8 PRO',processadort:'MediaTek Helio G90T'},{modelot:'Galaxy A01',processadort:'Mediatek MT6739'},{modelot:'Moto E6 PLAY',processadort:'MediaTek MT6739'},
  {modelot:'Galaxy A02',processadort:'MediaTek MT6739W'},{modelot:'Galaxy A10S',processadort:'MediaTek MT6762 Helio P22'},{modelot:'Moto E 6S',processadort:'MediaTek MT6762 Helio P22'},
  {modelot:'Moto E6S',processadort:'MediaTek MT6762 Helio P22'},{modelot:'Moto E6 PLUS',processadort:'MediaTek MT6762 Helio P22'},{modelot:'Galaxy A12',processadort:'MediaTek MT6765 Helio P35'},
  {modelot:'G8 POWER LITE',processadort:'MediaTek MT6765 Helio P35'},{modelot:'Moto G8 POWER',processadort:'MediaTek MT6765 Helio P35'},{modelot:'Galaxy A31',processadort:'MediaTek MT6768 Helio P65'},
  {modelot:'One Macro',processadort:'MediaTek MT6771 Helio P70'},{modelot:'Moto G8 PLAY',processadort:'MediaTek MT6771 Helio P70M'},{modelot:'Galaxy J5',processadort:'Snapdragon 410'},
  {modelot:'Galaxy GRAN PRIME',processadort:'Snapdragon 410'},{modelot:'Moto E5',processadort:'Snapdragon 425'},{modelot:'Galaxy J6+ DUOS',processadort:'Snapdragon 425'},
  {modelot:'Moto E5 PLAY',processadort:'Snapdragon 425'},{modelot:'Moto G5S',processadort:'Snapdragon 430'},{modelot:'Moto G5',processadort:'Snapdragon 430'},
  {modelot:'Moto G6 PLAY',processadort:'Snapdragon 430'},{modelot:'Galaxy A01',processadort:'Snapdragon 439'},{modelot:'Redmi 8A',processadort:'Snapdragon 439'},
  {modelot:'Redmi 7A',processadort:'Snapdragon 439'},{modelot:'Redmi 8',processadort:'Snapdragon 439'},{modelot:'Galaxy A11',processadort:'Snapdragon 450'},
  {modelot:'Moto G6',processadort:'Snapdragon 450'},{modelot:'Galaxy A02S',processadort:'Snapdragon 450'},{modelot:'Galaxy J8 DUOS',processadort:'Snapdragon 450'},
  {modelot:'Galaxy A20',processadort:'Snapdragon 450'},{modelot:'Galaxy J8',processadort:'Snapdragon 450'},{modelot:'Moto E7 PLUS',processadort:'Snapdragon 460'},
  {modelot:'Moto G10',processadort:'Snapdragon 460'},{modelot:'Moto G4',processadort:'Snapdragon 617'},{modelot:'Moto G5 PLUS',processadort:'Snapdragon 625'},
  {modelot:'ONE',processadort:'Snapdragon 625'},{modelot:'Moto G5S PLUS',processadort:'Snapdragon 625'},{modelot:'Moto ONE',processadort:'Snapdragon 625'},
  {modelot:'Moto Z PLAY',processadort:'Snapdragon 625'},{modelot:'Moto Z2 PLAY',processadort:'Snapdragon 626'},{modelot:'Moto Z3 FORCE',processadort:'Snapdragon 626'},
  {modelot:'Moto G6 PLUS',processadort:'Snapdragon 630'},{modelot:'Moto X4',processadort:'Snapdragon 630'},{modelot:'Moto G7 PLAY',processadort:'Snapdragon 632'},
  {modelot:'Moto G7 POWER',processadort:'Snapdragon 632'},{modelot:'Moto G7',processadort:'Snapdragon 632'},{modelot:'Moto G7 PLUS',processadort:'Snapdragon 636'},
  {modelot:'Moto Z3 PLAY',processadort:'Snapdragon 636'},{modelot:'Redmi NOTE 7',processadort:'Snapdragon 660'},{modelot:'Redmi 9T',processadort:'Snapdragon 662'},
  {modelot:'G9 PLAY DUAL SIM',processadort:'Snapdragon 662'},{modelot:'Moto G30',processadort:'Snapdragon 662'},{modelot:'Moto G9 PLAY',processadort:'Snapdragon 662'},
  {modelot:'Moto G9 POWER',processadort:'Snapdragon 662'},{modelot:'Redmi NOTE 8',processadort:'Snapdragon 665'},{modelot:'MI A3',processadort:'Snapdragon 665'},
  {modelot:'Moto G8 POWER',processadort:'Snapdragon 665'},{modelot:'Moto G8',processadort:'Snapdragon 665'},{modelot:'Moto G8 PLUS',processadort:'Snapdragon 665'},
  {modelot:'Galaxy A70',processadort:'Snapdragon 675'},{modelot:'Redmi NOTE 10',processadort:'Snapdragon 678'},{modelot:'MI 9 LITE',processadort:'Snapdragon 710'},
  {modelot:'Motorola ONE FUSION',processadort:'Snapdragon 710'},{modelot:'MI 9 SE',processadort:'Snapdragon 712'},{modelot:'Redmi NOTE 9S',processadort:'Snapdragon 720G'},
  {modelot:'Redmi NOTE 9',processadort:'Snapdragon 720G'},{modelot:'Redmi NOTE 9 PRO MAX',processadort:'Snapdragon 720G'},{modelot:'Galaxy A52',processadort:'Snapdragon 720G'},
  {modelot:'Galaxy A72',processadort:'Snapdragon 720G'},{modelot:'MI 9T',processadort:'Snapdragon 730'},{modelot:'Galaxy A71',processadort:'Snapdragon 730'},
  {modelot:'MI NOTE 10',processadort:'Snapdragon 730G'},{modelot:'G9 PLUS DUAL SIM',processadort:'Snapdragon 730G'},{modelot:'MI 11 LITE',processadort:'Snapdragon 732G'},
  {modelot:'MI 10T LITE',processadort:'Snapdragon 750G'},{modelot:'Moto G5 PLUS',processadort:'Snapdragon 765 5G'},{modelot:'MI 9',processadort:'Snapdragon 855'},
  {modelot:'MI 9T PRO',processadort:'Snapdragon 855'},{modelot:'MI 10T',processadort:'Snapdragon 865'},{modelot:'MI 10T PRO',processadort:'Snapdragon 865'},
  {modelot:'MI 11',processadort:'Snapdragon 888'}];

  searchText = new Subject();
  public modelosFiltrados: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  protected _onDestroy = new Subject<void>();
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  ngOnInit(): void {
    // this.bankCtrl.setValue(this.dicfiltrado_modelos[10]);
    // this.modelosFiltrados.next(this.dicfiltrado_modelos.slice());
    // this.bankFilterCtrl.valueChanges
    //   .pipe(takeUntil(this._onDestroy))
    //   .subscribe(() => {
    //     this.filtrarModelos();
    //   });
  }
  ngAfterViewInit() {
    // this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  // protected setInitialValue() {
  //   // this.modelosFiltrados
  //   //   .pipe(take(1), takeUntil(this._onDestroy))
  //   //   .subscribe(() => {
  //   //     this.singleSelect.compareWith = (a, b) => a && b && a.id === b.id;
  //   //   });
  // }

  // protected filtrarModelos() {
  //   if (!this.dicfiltrado_modelos) {
  //     return;
  //   }
  //   // get the search keyword
  //   let search = this.bankFilterCtrl.value;
  //   if (!search) {
  //     this.modelosFiltrados.next(this.dicfiltrado_modelos.slice());
  //     return;
  //   } else {
  //     search = search.toLowerCase();
  //   }
  //   // filter the banks
  //   this.modelosFiltrados.next(
  //     this.dicfiltrado_modelos.filter(modelo => modelo.modelot.toLowerCase().indexOf(search) > -1)
  //   );
  // }

  onSubmit(): void {
    console.log(this.phone);
    this.SearchService.search(this.phone)
      .subscribe(ret => {
        this.router.navigateByUrl('/results', { state: { phone: this.phone, result: ret.PRECO } });
      }, error => {
        this.NotificationServe.showError(error.message, "Erro!");
      });
  }

  filtro_para_linha(marca_selecionada) {
    this.dicfiltrado_linhas = this.dicionario_linhas.filter((c) => {
      return c.marcat == marca_selecionada
    })
  }

  filtro_para_modelo(linha_selecionada) {
    this.dicfiltrado_modelos = this.dicionario_modelo.filter((c) => {
      return c.linhat == linha_selecionada
    })
    // this.filtrarModelos()
  }

  filtro_para_processador(modelo_selecionado) {
    this.dicfiltrado_processador = this.dicionario_processador.filter((c) => {
      return c.modelot == modelo_selecionado
    })
  }

}


