import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import './index.css';

import { PDFDocument } from 'pdf-lib';

const LoadPDFFile = async (name: string) => {
    const arrayBuffer = await fetch(`assets/${name}`).then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    return pdfDoc;
}

async function mergePDFDocuments(documents: any) {
	const mergedPdf = await PDFDocument.create();
	for (let document of documents) {
		const copiedPages = await mergedPdf.copyPages(document, document.getPageIndices());
		copiedPages.forEach((page) => mergedPdf.addPage(page));    
	}
	
	return await mergedPdf.save();
}

const MergeAndDownloadPDF = async () => {
    const pdfDoc = await LoadPDFFile('sample.pdf');
    const pdfDoc2 = await LoadPDFFile('sample2.pdf');
    const pbyte = await mergePDFDocuments([pdfDoc, pdfDoc2]);
    var blob = new Blob([pbyte], {type: "application/pdf"});
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "myFileName.pdf";
    link.click();
};

const initMap = async () => {
    const esriMap = new Map({
        basemap: 'streets'
    })
    const mapViewProperties = {
        container: 'mapViewDiv',
        center: [0.1278, 51.5074],
        zoom: 8,
        map: esriMap
    };

    const mapView = new MapView(mapViewProperties);

    await mapView.when();
}

window.addEventListener('DOMContentLoaded', (event) => {
    initMap();
    const btn = document.querySelector("#mergePDF");
    btn.addEventListener('click', () => MergeAndDownloadPDF());
});