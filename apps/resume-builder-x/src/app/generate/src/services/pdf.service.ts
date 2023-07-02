/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

@Injectable({
    providedIn: 'root',
})
export class PdfService {
    constructor() {
        (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
    }
    generatePdf(htmlContent: string) {
        const html = htmlToPdfmake(htmlContent);
        const documentDefinition = { content: html };
        pdfMake.createPdf(documentDefinition).open();
    }
}
