import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  url: string = "http://localhost:5000"; ///colocar o IP

  constructor(private http: HttpClient) { }

  corsHeaders = new HttpHeaders({
    'Cache-Control': 'no-cache',
    // 'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Accept': 'application/json',
  });

  search(object: any): Observable<any> {
    console.log(object);

    var object1 = {
      "Peso":199.0,
      "Linha_1":0,
      "Linha_ALCATEL, A3 XL MAX, 32GB, 3GB RAM, ORIGINAL, 9008N":0,
      "Linha_Amazfit A1969":0,
      "Linha_Amazifit":0,
      "Linha_Armor Series":0,
      "Linha_Black Shark":0,
      "Linha_Canvas Select Plus":0,
      "Linha_D20":0,
      "Linha_DGP":0,
      "Linha_DUOS":0,
      "Linha_Edge":0,
      "Linha_Encok":0,
      "Linha_FONES":0,
      "Linha_Fone Ouvido":0,
      "Linha_GD18":0,
      "Linha_Galaxy":0,
      "Linha_Galaxy - Galaxy S9 - Galaxy S9 Usado - Celular Usado":0,
      "Linha_Galaxy A":0,
      "Linha_Galaxy A71":0,
      "Linha_Galaxy J":0,
      "Linha_Galaxy M":0,
      "Linha_Galaxy Note":0,
      "Linha_Galaxy S":0,
      "Linha_Galaxy Z":0,
      "Linha_Gear":0,
      "Linha_Iphone 8":0,
      "Linha_Iwo W46":0,
      "Linha_K Series":0,
      "Linha_Lumia":0,
      "Linha_MS45":0,
      "Linha_Mate Series":0,
      "Linha_Mi":0,
      "Linha_Mobi":0,
      "Linha_Moto":0,
      "Linha_Moto C":0,
      "Linha_Moto E":0,
      "Linha_Moto G":0,
      "Linha_Moto X":0,
      "Linha_Moto Z":0,
      "Linha_Moto Z3":0,
      "Linha_Mototrbo":0,
      "Linha_One":0,
      "Linha_POCO M3":0,
      "Linha_POCOPHONE":0,
      "Linha_PRO":0,
      "Linha_Poco":0,
      "Linha_Pocophone":0,
      "Linha_Pro":0,
      "Linha_Profissional":0,
      "Linha_RAZR":0,
      "Linha_Redmi":1,
      "Linha_SE":0,
      "Linha_Series 2":0,
      "Linha_Series 3":0,
      "Linha_Series 4":0,
      "Linha_Series 5":0,
      "Linha_Series 6":0,
      "Linha_Sim":0,
      "Linha_Spartan":0,
      "Linha_Top de linha":0,
      "Linha_Twist":0,
      "Linha_V":0,
      "Linha_Watch":0,
      "Linha_Xiaomi":0,
      "Linha_Xperia":0,
      "Linha_ZenFone":0,
      "Linha_iPhone":0,
      "Linha_x27":0,
      "Linha_xiaomi":0,
      "Marca_Apple":0,
      "Marca_Motorola":0,
      "Marca_Samsung":0,
      "Marca_Xiaomi":1,
      "Modelo de GPU_Adreno 304":0,
      "Modelo de GPU_Adreno 305":0,
      "Modelo de GPU_Adreno 306":0,
      "Modelo de GPU_Adreno 308":0,
      "Modelo de GPU_Adreno 330":0,
      "Modelo de GPU_Adreno 405":0,
      "Modelo de GPU_Adreno 418":0,
      "Modelo de GPU_Adreno 505":0,
      "Modelo de GPU_Adreno 506":0,
      "Modelo de GPU_Adreno 508":0,
      "Modelo de GPU_Adreno 509":0,
      "Modelo de GPU_Adreno 512":0,
      "Modelo de GPU_Adreno 540":0,
      "Modelo de GPU_Adreno 610":0,
      "Modelo de GPU_Adreno 612":0,
      "Modelo de GPU_Adreno 616":0,
      "Modelo de GPU_Adreno 618":0,
      "Modelo de GPU_Adreno 619":0,
      "Modelo de GPU_Adreno 619L":0,
      "Modelo de GPU_Adreno 620":0,
      "Modelo de GPU_Adreno 630":0,
      "Modelo de GPU_Adreno 640":0,
      "Modelo de GPU_Adreno 650":0,
      "Modelo de GPU_Adreno 660":0,
      "Modelo de GPU_Adreno A618":0,
      "Modelo de GPU_Apple GPU":0,
      "Modelo de GPU_Apple GPU MP4":0,
      "Modelo de GPU_IMG GE8320":0,
      "Modelo de GPU_Mali-400":0,
      "Modelo de GPU_Mali-400 MP2":0,
      "Modelo de GPU_Mali-400 MP4":0,
      "Modelo de GPU_Mali-450 MP4":0,
      "Modelo de GPU_Mali-G51 MP4":0,
      "Modelo de GPU_Mali-G52":0,
      "Modelo de GPU_Mali-G52 MC2":1,
      "Modelo de GPU_Mali-G71 MP2":0,
      "Modelo de GPU_Mali-G71 MP20":0,
      "Modelo de GPU_Mali-G72 MP18":0,
      "Modelo de GPU_Mali-G72 MP3":0,
      "Modelo de GPU_Mali-G76 MC4":0,
      "Modelo de GPU_Mali-G76 MP10":0,
      "Modelo de GPU_Mali-G76 MP16":0,
      "Modelo de GPU_Mali-G77 MP11":0,
      "Modelo de GPU_Mali-T720":0,
      "Modelo de GPU_Mali-T720 MP1":0,
      "Modelo de GPU_Mali-T720 MP2":0,
      "Modelo de GPU_Mali-T760 MP8":0,
      "Modelo de GPU_Mali-T820 MP1":0,
      "Modelo de GPU_Mali-T830 MP1":0,
      "Modelo de GPU_Mali-T830 MP2":0,
      "Modelo de GPU_Mali-T860 MP2":0,
      "Modelo de GPU_Mali-T880 MP2":0,
      "Modelo de GPU_Mali-T880 MP4":0,
      "Modelo de GPU_PowerVR G6430":0,
      "Modelo de GPU_PowerVR GE8100":0,
      "Modelo de GPU_PowerVR GE8320":0,
      "Modelo de GPU_PowerVR GT7600":0,
      "Modelo de GPU_PowerVR MBX Lite":0,
      "Modelo de GPU_PowerVR SGX543 MP2":0,
      "Modelo de GPU_PowerVR SGX543 MP3":0,
      "Modelo de GPU_PowerVR SGX544":0,
      "Modelo de GPU_PowerVR SGX544 MP2":0,
      "Modelo de GPU_PowerVR Series7XT Plus":0,
      "Modelo de GPU_Vivante GC7000UL":0,
      "Modelo_10":0,
      "Modelo_10 Dual SIM":0,
      "Modelo_10 Lite":0,
      "Modelo_10T 5G":0,
      "Modelo_10T Lite 5G":0,
      "Modelo_10T Pro 5G":0,
      "Modelo_10X 4G":0,
      "Modelo_11":0,
      "Modelo_11 pro":0,
      "Modelo_5":0,
      "Modelo_5 Plus":0,
      "Modelo_6s":0,
      "Modelo_7":0,
      "Modelo_7 Plus":0,
      "Modelo_8":0,
      "Modelo_8 Lite":0,
      "Modelo_8 Plus":0,
      "Modelo_8 Pro":0,
      "Modelo_8050E":0,
      "Modelo_8A":0,
      "Modelo_9":0,
      "Modelo_9 (Global)":0,
      "Modelo_9 (India)":0,
      "Modelo_9 India":0,
      "Modelo_9 Lite":0,
      "Modelo_9 Power":0,
      "Modelo_9 Prime":0,
      "Modelo_9 SE":0,
      "Modelo_9 Transparent Edition":0,
      "Modelo_9A":0,
      "Modelo_9C":0,
      "Modelo_9T":0,
      "Modelo_9T Pro":0,
      "Modelo_9i":0,
      "Modelo_9s":0,
      "Modelo_A01 Duos":0,
      "Modelo_A10 Duos":0,
      "Modelo_A10s Duos":0,
      "Modelo_A11":0,
      "Modelo_A11 Duos":0,
      "Modelo_A12":0,
      "Modelo_A12 Duos":0,
      "Modelo_A2":0,
      "Modelo_A2 Lite":0,
      "Modelo_A20":0,
      "Modelo_A20 Duos":0,
      "Modelo_A20s":0,
      "Modelo_A20s Duos":0,
      "Modelo_A21":0,
      "Modelo_A21 Duos":0,
      "Modelo_A21s":0,
      "Modelo_A21s Duos":0,
      "Modelo_A3":0,
      "Modelo_A30":0,
      "Modelo_A30 Duos":0,
      "Modelo_A30s":0,
      "Modelo_A30s Duos":0,
      "Modelo_A31":0,
      "Modelo_A31 Duos":0,
      "Modelo_A5 (2017) Duos":0,
      "Modelo_A50":0,
      "Modelo_A50 Duos":0,
      "Modelo_A50s":0,
      "Modelo_A51":0,
      "Modelo_A51 5G Duos":0,
      "Modelo_A51 Duos":0,
      "Modelo_A6+ Duos":0,
      "Modelo_A7 (2018) Duos":0,
      "Modelo_A7 Duos":0,
      "Modelo_A70":0,
      "Modelo_A70 Duos":0,
      "Modelo_A71":0,
      "Modelo_A71 5G Duos":0,
      "Modelo_A71 Duos":0,
      "Modelo_A8 (2018) Duos":0,
      "Modelo_A8 Duos":0,
      "Modelo_A8+ Duos":0,
      "Modelo_A80":0,
      "Modelo_A80 Duos":0,
      "Modelo_A80 rose":0,
      "Modelo_A9 (2018)":0,
      "Modelo_A920":0,
      "Modelo_Acclaim SCH-R880":0,
      "Modelo_AirPods Pro":0,
      "Modelo_Apple watch 4 40mm":0,
      "Modelo_Black Shark":0,
      "Modelo_Black Shark 3":0,
      "Modelo_C Plus Dual SIM":0,
      "Modelo_D20":0,
      "Modelo_DEP 450 Anal\u00f3gico":0,
      "Modelo_DGM 8000":0,
      "Modelo_E4 Plus Dual SIM":0,
      "Modelo_E5 Dual SIM":0,
      "Modelo_E6 Plus":0,
      "Modelo_E6s (2020) Dual SIM":0,
      "Modelo_E7 Dual SIM":0,
      "Modelo_E7 Plus":0,
      "Modelo_E7 Plus Dual SIM":0,
      "Modelo_EP450 EM200":0,
      "Modelo_Edge":0,
      "Modelo_Edge Dual SIM":0,
      "Modelo_Edge+":0,
      "Modelo_F1":0,
      "Modelo_Fold":0,
      "Modelo_G 5G":0,
      "Modelo_G4 Play Dual SIM":0,
      "Modelo_G4 Plus Dual SIM":0,
      "Modelo_G5 Dual SIM":0,
      "Modelo_G5S Dual SIM":0,
      "Modelo_G5S Plus Dual SIM":0,
      "Modelo_G6":0,
      "Modelo_G6 Dual SIM":0,
      "Modelo_G6 Plus":0,
      "Modelo_G7":0,
      "Modelo_G7 Dual SIM":0,
      "Modelo_G7 Play":0,
      "Modelo_G7 Plus Dual SIM":0,
      "Modelo_G7 Power Dual SIM":0,
      "Modelo_G8":0,
      "Modelo_G8 Dual SIM":0,
      "Modelo_G8 Play":0,
      "Modelo_G8 Plus":0,
      "Modelo_G8 Plus Dual SIM":0,
      "Modelo_G8 Power":0,
      "Modelo_G8 Power Dual SIM":0,
      "Modelo_G8 Power Lite":0,
      "Modelo_G8 Power Lite Dual SIM":0,
      "Modelo_G9 Dual SIM":0,
      "Modelo_G9 Play":0,
      "Modelo_G9 Play Dual SIM":0,
      "Modelo_G9 Plus":0,
      "Modelo_G9 Plus Dual SIM":0,
      "Modelo_G9 Power":0,
      "Modelo_G9 Power Dual SIM":0,
      "Modelo_GALAXY":0,
      "Modelo_GTR":0,
      "Modelo_GTR 2":0,
      "Modelo_GTR 2E":0,
      "Modelo_GTS 2 A1969":0,
      "Modelo_Galaxy A12":0,
      "Modelo_Galaxy S10":0,
      "Modelo_Galaxy S10+":0,
      "Modelo_Galaxy S20":0,
      "Modelo_Galaxy S20 Plus":0,
      "Modelo_Galaxy S9":0,
      "Modelo_I PHONE 7 128 gb":0,
      "Modelo_IPhone 11 64g":0,
      "Modelo_J6 TV":0,
      "Modelo_J6+ Duos":0,
      "Modelo_J7 Prime 2 TV":0,
      "Modelo_J7 Pro Duos":0,
      "Modelo_J8":0,
      "Modelo_J8 Duos":0,
      "Modelo_K20":0,
      "Modelo_K30":0,
      "Modelo_M10 Duos":0,
      "Modelo_M21s":0,
      "Modelo_M30 Duos":0,
      "Modelo_M31":0,
      "Modelo_M51":0,
      "Modelo_MGD83BZ\/A":0,
      "Modelo_MGD93BZ\/A":0,
      "Modelo_MHDK3BR\/A":0,
      "Modelo_MHDQ3BR\/A":0,
      "Modelo_Mi 10 Coral Green":0,
      "Modelo_Mi 8 lite":0,
      "Modelo_Mi 9 t pro":0,
      "Modelo_Mix 2S":0,
      "Modelo_Mix 3":0,
      "Modelo_Mix 3 5G":0,
      "Modelo_Moto G8 Branco prism":0,
      "Modelo_Moto G9 Play":0,
      "Modelo_Moto one macro":0,
      "Modelo_Motorola G8":0,
      "Modelo_Nike 5 cel e gps":0,
      "Modelo_Nike+":0,
      "Modelo_Normal":0,
      "Modelo_Note 10":0,
      "Modelo_Note 10 Lite":0,
      "Modelo_Note 10 Pro":0,
      "Modelo_Note 5":0,
      "Modelo_Note 7 (48 Mpx)":0,
      "Modelo_Note 8":0,
      "Modelo_Note 8 Pro":0,
      "Modelo_Note 8T":0,
      "Modelo_Note 9":1,
      "Modelo_Note 9 4G":0,
      "Modelo_Note 9 Pro (48 Mpx)":0,
      "Modelo_Note 9 Pro (64 Mpx)":0,
      "Modelo_Note 9 Pro Max":0,
      "Modelo_Note 9 pro":0,
      "Modelo_Note 9S":0,
      "Modelo_Note 9T":0,
      "Modelo_Note S10 Lite":0,
      "Modelo_Note10":0,
      "Modelo_Note10 Duos":0,
      "Modelo_Note10 Lite":0,
      "Modelo_Note10 Lite Duos":0,
      "Modelo_Note10+":0,
      "Modelo_Note10+ 5G Duos":0,
      "Modelo_Note10+ Duos":0,
      "Modelo_Note20":0,
      "Modelo_Note20 5G Duos":0,
      "Modelo_Note20 Ultra":0,
      "Modelo_Note20 Ultra 5G":0,
      "Modelo_Note20 Ultra 5G Duos":0,
      "Modelo_Note8":0,
      "Modelo_Note8 Duos":0,
      "Modelo_Note9":0,
      "Modelo_Note9 Duos":0,
      "Modelo_One Action":0,
      "Modelo_One Action Dual SIM":0,
      "Modelo_One Dual SIM":0,
      "Modelo_One Fusion":0,
      "Modelo_One Fusion Dual SIM":0,
      "Modelo_One Fusion+ Dual SIM":0,
      "Modelo_One Hyper":0,
      "Modelo_One Hyper Dual SIM":0,
      "Modelo_One Macro Dual SIM":0,
      "Modelo_One Vision":0,
      "Modelo_One Vision Dual SIM":0,
      "Modelo_One Zoom":0,
      "Modelo_PRO5150 IS":0,
      "Modelo_Play":0,
      "Modelo_Poco C3":0,
      "Modelo_Poco F1":0,
      "Modelo_Poco F2 Pro":0,
      "Modelo_Poco M3":0,
      "Modelo_Poco X3":0,
      "Modelo_Poco X3 NFC":0,
      "Modelo_Pocophone F1":0,
      "Modelo_Pro (Helio X20)":0,
      "Modelo_RAZR 2019":0,
      "Modelo_RAZR D1 Dual SIM":0,
      "Modelo_Redmi 9":0,
      "Modelo_S10":0,
      "Modelo_S10 Duos":0,
      "Modelo_S10 Lite":0,
      "Modelo_S10 Lite Duos":0,
      "Modelo_S10+":0,
      "Modelo_S10+ Duos":0,
      "Modelo_S10e":0,
      "Modelo_S10e Duos":0,
      "Modelo_S2":0,
      "Modelo_S20":0,
      "Modelo_S20 Duos":0,
      "Modelo_S20 FE":0,
      "Modelo_S20 FE 5G":0,
      "Modelo_S20 FE Duos":0,
      "Modelo_S20 Ultra":0,
      "Modelo_S20 Ultra 5G":0,
      "Modelo_S20 Ultra Duos":0,
      "Modelo_S20+":0,
      "Modelo_S20+ 5G BTS Edition Duos":0,
      "Modelo_S20+ 5G Duos":0,
      "Modelo_S20+ 5G Enterprise Edition":0,
      "Modelo_S20+ BTS Edition Duos":0,
      "Modelo_S20+ Duos":0,
      "Modelo_S21 5G Duos":0,
      "Modelo_S21+ 5G":0,
      "Modelo_S3 Classic":0,
      "Modelo_S7":0,
      "Modelo_S7 Duos":0,
      "Modelo_S7 Edge":0,
      "Modelo_S8":0,
      "Modelo_S8 Duos":0,
      "Modelo_S8+":0,
      "Modelo_S8+ Duos":0,
      "Modelo_S9":0,
      "Modelo_S9 Duos":0,
      "Modelo_S9 Duos - Galaxy S9 Usado":0,
      "Modelo_S9+":0,
      "Modelo_S9+ Duos":0,
      "Modelo_SAMSUNG A11":0,
      "Modelo_SM-A015MZKSZTO":0,
      "Modelo_SM-A125MZBSZTO":0,
      "Modelo_SM-A125MZRSZTO":0,
      "Modelo_SM-A715":0,
      "Modelo_SM-G975F":0,
      "Modelo_Smartphone":0,
      "Modelo_Tela 6":0,
      "Modelo_V3 D&G":0,
      "Modelo_Watch":0,
      "Modelo_Watch (Bluetooth)":0,
      "Modelo_Watch (GPS + Cellular)":0,
      "Modelo_Watch (GPS)":0,
      "Modelo_Watch Active 2":0,
      "Modelo_Watch Nike":0,
      "Modelo_Watch SE":0,
      "Modelo_Watch3":0,
      "Modelo_X":0,
      "Modelo_X Play":0,
      "Modelo_X4 Dual SIM":0,
      "Modelo_XCover Pro":0,
      "Modelo_XS MAX":0,
      "Modelo_XT 2010-1":0,
      "Modelo_XT2091":0,
      "Modelo_Xcover":0,
      "Modelo_Xt2041":0,
      "Modelo_Z Flip":0,
      "Modelo_Z Fold2":0,
      "Modelo_Z2 Force Dual SIM":0,
      "Modelo_Z2 Play Dual SIM":0,
      "Modelo_Z2 Play GamePad Edition":0,
      "Modelo_Z3 Play":0,
      "Modelo_Z3 Play Dual SIM":0,
      "Modelo_Z3 Play Power Pack & DTV Edition":0,
      "Modelo_iPhone":0,
      "Modelo_iPhone 11":0,
      "Modelo_iPhone 11 Pro":0,
      "Modelo_iPhone 11 Pro Max":0,
      "Modelo_iPhone 12":0,
      "Modelo_iPhone 12 Pro":0,
      "Modelo_iPhone 12 Pro Max":0,
      "Modelo_iPhone 12 mini":0,
      "Modelo_iPhone 4":0,
      "Modelo_iPhone 4s":0,
      "Modelo_iPhone 5":0,
      "Modelo_iPhone 6":0,
      "Modelo_iPhone 6 Plus":0,
      "Modelo_iPhone 6s":0,
      "Modelo_iPhone 6s Plus":0,
      "Modelo_iPhone 7":0,
      "Modelo_iPhone 7 32g":0,
      "Modelo_iPhone 7 Plus":0,
      "Modelo_iPhone 7 Plus 128g":0,
      "Modelo_iPhone 8":0,
      "Modelo_iPhone 8 Plus":0,
      "Modelo_iPhone SE":0,
      "Modelo_iPhone SE (2nd Generation)":0,
      "Modelo_iPhone X":0,
      "Modelo_iPhone XR":0,
      "Modelo_iPhone XS":0,
      "Modelo_iPhone XS Dual SIM":0,
      "Modelo_iPhone XS Max":0,
      "Modelo_iPhone XS Max 256 GG":0,
      "Modelo_iPhone XS gold":0,
      "Modelo_pro max":0,
      "Modelo_serie 5":0,
      "Modelo do processador_2.7Ghz + 2.3Ghz + 1.9Ghz":0,
      "Modelo do processador_2.7Ghz + 2.3Ghz + 1.9Ghz Quad-Core":0,
      "Modelo do processador_Apple A10 Fusion":0,
      "Modelo do processador_Apple A11 Bionic":0,
      "Modelo do processador_Apple A12 Bionic":0,
      "Modelo do processador_Apple A13 Bionic":0,
      "Modelo do processador_Apple A14 Bionic":0,
      "Modelo do processador_Apple A5":0,
      "Modelo do processador_Apple A6":0,
      "Modelo do processador_Apple A7":0,
      "Modelo do processador_Apple A8":0,
      "Modelo do processador_Apple A9":0,
      "Modelo do processador_Exynos 3470":0,
      "Modelo do processador_Exynos 7570":0,
      "Modelo do processador_Exynos 7580":0,
      "Modelo do processador_Exynos 7870":0,
      "Modelo do processador_Exynos 7880":0,
      "Modelo do processador_Exynos 7884":0,
      "Modelo do processador_Exynos 7885":0,
      "Modelo do processador_Exynos 7904":0,
      "Modelo do processador_Exynos 850":0,
      "Modelo do processador_Exynos 8895":0,
      "Modelo do processador_Exynos 9609":0,
      "Modelo do processador_Exynos 9610":0,
      "Modelo do processador_Exynos 9611":0,
      "Modelo do processador_Exynos 9810":0,
      "Modelo do processador_Exynos 9820":0,
      "Modelo do processador_Exynos 9825":0,
      "Modelo do processador_Exynos 990":0,
      "Modelo do processador_HiSilicon Kirin 980":0,
      "Modelo do processador_Marvell ARMADA PXA1908":0,
      "Modelo do processador_MediaTek Helio G25":0,
      "Modelo do processador_MediaTek Helio G35":0,
      "Modelo do processador_MediaTek Helio G80":0,
      "Modelo do processador_MediaTek Helio G85":1,
      "Modelo do processador_MediaTek Helio G90T":0,
      "Modelo do processador_MediaTek MT6261D":0,
      "Modelo do processador_MediaTek MT6572M":0,
      "Modelo do processador_MediaTek MT6589":0,
      "Modelo do processador_MediaTek MT6592T":0,
      "Modelo do processador_MediaTek MT6737":0,
      "Modelo do processador_MediaTek MT6737M":0,
      "Modelo do processador_MediaTek MT6737T":0,
      "Modelo do processador_MediaTek MT6750":0,
      "Modelo do processador_MediaTek MT6755S Helio P18":0,
      "Modelo do processador_MediaTek MT6761 Helio A22":0,
      "Modelo do processador_MediaTek MT6762 Helio P22":0,
      "Modelo do processador_MediaTek MT6765 Helio P35":0,
      "Modelo do processador_MediaTek MT6768 Helio P65":0,
      "Modelo do processador_MediaTek MT6771 Helio P60":0,
      "Modelo do processador_MediaTek MT6771 Helio P70":0,
      "Modelo do processador_MediaTek MT6771 Helio P70M":0,
      "Modelo do processador_MediaTek MT6797 Helio X20":0,
      "Modelo do processador_MediaTek MT8321":0,
      "Modelo do processador_Mediatek MT6739":0,
      "Modelo do processador_Mediatek MT6765 Helio P35":0,
      "Modelo do processador_Octa-Core (2.73 GHz":0,
      "Modelo do processador_Octa-core (2.8 GHz + 1.7 GHz)":0,
      "Modelo do processador_Octa-core (4x2.0 GHz & 4x1.8 GHz)":0,
      "Modelo do processador_Qualcomm SM8250 Snapdragon 865":0,
      "Modelo do processador_Qualcomm SM8250 Snapdragon 865 (7 nm+)":0,
      "Modelo do processador_Samsung S5L8900":0,
      "Modelo do processador_Snapdragon 210":0,
      "Modelo do processador_Snapdragon 215":0,
      "Modelo do processador_Snapdragon 400":0,
      "Modelo do processador_Snapdragon 410":0,
      "Modelo do processador_Snapdragon 425":0,
      "Modelo do processador_Snapdragon 430":0,
      "Modelo do processador_Snapdragon 439":0,
      "Modelo do processador_Snapdragon 450":0,
      "Modelo do processador_Snapdragon 460":0,
      "Modelo do processador_Snapdragon 615":0,
      "Modelo do processador_Snapdragon 617":0,
      "Modelo do processador_Snapdragon 625":0,
      "Modelo do processador_Snapdragon 626":0,
      "Modelo do processador_Snapdragon 630":0,
      "Modelo do processador_Snapdragon 632":0,
      "Modelo do processador_Snapdragon 636":0,
      "Modelo do processador_Snapdragon 660":0,
      "Modelo do processador_Snapdragon 662":0,
      "Modelo do processador_Snapdragon 665":0,
      "Modelo do processador_Snapdragon 675":0,
      "Modelo do processador_Snapdragon 690":0,
      "Modelo do processador_Snapdragon 710":0,
      "Modelo do processador_Snapdragon 712":0,
      "Modelo do processador_Snapdragon 720G":0,
      "Modelo do processador_Snapdragon 730":0,
      "Modelo do processador_Snapdragon 730G":0,
      "Modelo do processador_Snapdragon 732G":0,
      "Modelo do processador_Snapdragon 750G":0,
      "Modelo do processador_Snapdragon 765G":0,
      "Modelo do processador_Snapdragon 801":0,
      "Modelo do processador_Snapdragon 835":0,
      "Modelo do processador_Snapdragon 845":0,
      "Modelo do processador_Snapdragon 855":0,
      "Modelo do processador_Snapdragon 855+":0,
      "Modelo do processador_Snapdragon 865":0,
      "Modelo do processador_Snapdragon 865+":0,
      "Modelo do processador_Snapdragon 888":0,
      "Modelo do processador_Snapdragon SiP 1":0,
      "Modelo do processador_Spreadtrum SC7731E":0,
      "Modelo do processador_Spreadtrum SC9830":0,
      "Modelo do processador_Unisoc SC7731E":0,
      "address.state_id_BR-AC":0,
      "address.state_id_BR-AL":0,
      "address.state_id_BR-AM":0,
      "address.state_id_BR-BA":0,
      "address.state_id_BR-CE":0,
      "address.state_id_BR-DF":0,
      "address.state_id_BR-ES":0,
      "address.state_id_BR-GO":0,
      "address.state_id_BR-MA":0,
      "address.state_id_BR-MG":0,
      "address.state_id_BR-MS":0,
      "address.state_id_BR-MT":0,
      "address.state_id_BR-PA":0,
      "address.state_id_BR-PB":0,
      "address.state_id_BR-PE":0,
      "address.state_id_BR-PI":0,
      "address.state_id_BR-PR":0,
      "address.state_id_BR-RJ":0,
      "address.state_id_BR-RN":0,
      "address.state_id_BR-RO":0,
      "address.state_id_BR-RR":0,
      "address.state_id_BR-RS":0,
      "address.state_id_BR-SC":0,
      "address.state_id_BR-SE":0,
      "address.state_id_BR-SP":1,
      "address.state_id_BR-TO":0,
      "condition_new":1,
      "condition_used":0
   }
    return this.http.post(this.url + '/predict', object1, {headers:this.corsHeaders})
      .pipe(
        catchError(this.handleError)
      );

  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    console.log(errorMessage);
    return throwError(error.error);

  }
}
