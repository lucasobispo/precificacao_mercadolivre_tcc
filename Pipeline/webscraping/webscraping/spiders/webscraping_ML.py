import scrapy


class MySpider(scrapy.Spider):
    name = "webscraping_ML"

    
    def start_requests(self):
        with open("links.html", "r") as page:
            urls_str = page.read()
            urls_str_r = urls_str.replace(']','').replace('[','')
            urls = urls_str_r.replace('\'','').replace(' ','').split(",")
            page.close()
            # print(urls)

        # urls = ['https://sp.olx.com.br/sao-paulo-e-regiao/celulares/s8-812876341', 
        #         'https://sp.olx.com.br/sao-paulo-e-regiao/celulares/bateria-s8-plus-s8-812743106', 
        #         'https://sp.olx.com.br/sao-paulo-e-regiao/celulares/s8-samsung-813586620', 
        #         'https://sp.olx.com.br/sao-paulo-e-regiao/celulares/kit-samsung-galaxy-s8-s8-plus-813291447',
        #     ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)    
    
    def parse(self, response):
        caracteristica_name = response.xpath("//th[@class='andes-table__header andes-table__header--left ui-vpp-striped-specs__row__column ui-vpp-striped-specs__row__column--id']/text()")
        caracteristica_value = response.xpath("//span[@class='andes-table__column--value']/text()")
        names = caracteristica_name.getall()
        values = caracteristica_value.getall()

        
        descricao = response.xpath("//p[@class='ui-pdp-description__content']/text()")


        caracteristicas_all = zip(names, values)
        
        print(list(caracteristicas_all))
        print(descricao.getall())
        print(names)
        # camera_px = response.xpath("//h1[@class='ui-pdp-color--BLACK ui-pdp-size--XSMALL ui-pdp-family--SEMIBOLD']/text()")
        # preco = response.xpath("//h2[@class='sc-1wimjbb-0 JzEH sc-ifAKCX cmFKIN']/text()")
        # lista_imagem = response.xpath("//div[@class='sc-28oze1-5 bQbWAr']/img/@src")
        # descricao = response.xpath("//span[@class='sc-1sj3nln-1 eOSweo sc-ifAKCX cmFKIN']/text()")

        # html = ""        
        # html += f"[Titulo = {titulo.get()}, Preco = {preco.get()}, Lista_imagem = {lista_imagem.getall()}, Descricao = {descricao.get()}]\n"

        # html += f"[Titulo = {titulo.get()}, Preco = {preco.get()}, Lista_imagem = {lista_imagem.getall()}, Descricao = {descricao.get()}]\n"

        # with open("anuncios.html", "a") as page:
        #     page.write(html)
        #     page.close()






