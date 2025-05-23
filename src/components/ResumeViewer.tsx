import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Download, FileText, ZoomIn, ZoomOut } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
//done
const ResumeViewer = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resumePdfUrl = "/resume.pdf";

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
    setError(null);
    toast.success("Resume loaded successfully", {
      description: `${numPages} pages available for viewing`,
      position: "top-center",
    });
  }

  function onDocumentLoadError(error: Error) {
    console.error("PDF load error:", error);
    setError("Failed to load the PDF file. Please try again later.");
    setIsLoading(false);
    toast.error("Failed to load PDF", {
      description: "There was an issue loading the resume file.",
    });
  }

  function changePage(offset: number) {
    setPageNumber(prev => {
      if (numPages) {
        const nextPage = prev + offset;
        return Math.max(1, Math.min(numPages, nextPage));
      }
      return prev;
    });
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function zoomIn() {
    setScale(prev => Math.min(2.5, prev + 0.2));
  }

  function zoomOut() {
    setScale(prev => Math.max(0.8, prev - 0.2));
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePdfUrl;
    link.download = 'resume.pdf';
    link.click();
    toast.success("Resume download started");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Professional Resume</h2>
          <p className="text-gray-500">Scroll through or download the complete resume PDF.</p>
        </div>
        <Button onClick={handleDownload} className="mt-4 md:mt-0 bg-blue-600 text-white hover:bg-blue-700">
          <Download className="w-4 h-4 mr-2" /> Download PDF
        </Button>
      </div>

      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <ScrollArea className="h-[600px] bg-white">
            <div className="flex justify-center p-4">
              <Document
                file={resumePdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
              >
                <Page pageNumber={pageNumber} scale={scale} />
              </Document>
            </div>
          </ScrollArea>

          <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-2">
              <Button size="sm" onClick={zoomOut} variant="outline">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button size="sm" onClick={zoomIn} variant="outline">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <span className="text-sm text-gray-600">Zoom: {Math.round(scale * 100)}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" onClick={previousPage} disabled={pageNumber <= 1} variant="outline">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Badge className="text-gray-700 bg-gray-100 border border-gray-300">
                {pageNumber} / {numPages || '?'}
              </Badge>
              <Button size="sm" onClick={nextPage} disabled={numPages !== null && pageNumber >= numPages} variant="outline">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeViewer;
