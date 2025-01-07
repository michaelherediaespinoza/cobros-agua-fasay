declare module 'html-to-pdfmake' {
    function htmlToPdfmake(html: string, options?: any): any;
    export = htmlToPdfmake;
  }


  // Definición para pdfmake
declare module 'pdfmake/build/pdfmake' {
    const pdfMake: any;
    export = pdfMake;
  }
  
  declare module 'pdfmake/build/vfs_fonts' {
    const pdfFonts: any;
    export = pdfFonts;
  }