import React, { useState } from 'react';
import { QrCode, Download, Share2, Copy, Check } from 'lucide-react';

const QRCodeGenerator = () => {
  const [copied, setCopied] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('vcard');
  const [qrImageUrl, setQrImageUrl] = useState('');

  const portfolioUrl = "https://ebukas.com";
  const profileData = {
    name: "David Chukwuebuka Achibiri",
    title: "Full Stack Developer",
    email: "davidachibiri8@gmail.com",
    phone: "+234 904 714 4503",
    website: portfolioUrl
  };

  const qrFormats = [
    {
      id: 'vcard',
      label: 'Contact Card (vCard)',
      description: 'Complete contact information',
      data: `BEGIN:VCARD
VERSION:3.0
FN:${profileData.name}
TITLE:${profileData.title}
EMAIL:${profileData.email}
TEL:${profileData.phone}
URL:${profileData.website}
END:VCARD`
    },
    {
      id: 'url',
      label: 'Portfolio Website',
      description: 'Direct link to portfolio',
      data: portfolioUrl
    },
    {
      id: 'email',
      label: 'Email Contact',
      description: 'Quick email composition',
      data: `mailto:${profileData.email}?subject=Hello ${profileData.name}`
    }
  ];

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const generateQRCodeUrl = (data) => {
    const encodedData = encodeURIComponent(data);
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedData}&bgcolor=ffffff&color=000000&margin=10&format=png&ecc=M`;
  };

  React.useEffect(() => {
    const selectedQR = qrFormats.find(format => format.id === selectedFormat);
    if (selectedQR) {
      setQrImageUrl(generateQRCodeUrl(selectedQR.data));
    }
  }, [selectedFormat]);

  const selectedQR = qrFormats.find(format => format.id === selectedFormat);

  const handleDownload = () => {
    if (qrImageUrl) {
      const link = document.createElement('a');
      link.href = qrImageUrl;
      link.download = `qrcode-${selectedFormat}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (navigator.share && qrImageUrl) {
      try {
        await navigator.share({
          title: `${selectedQR?.label} QR Code`,
          text: 'Check out my QR code',
          url: qrImageUrl
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.015]" 
             style={{
               backgroundImage: `radial-gradient(circle, black 1px, transparent 1px)`,
               backgroundSize: '32px 32px'
             }}>
        </div>
        
        {/* Large geometric shapes */}
        <div className="absolute -top-24 -right-24 w-64 h-64 border border-gray-50 rotate-45"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-25 opacity-30"></div>
        
        {/* Code fragments */}
        <div className="absolute top-32 left-8 text-gray-100 font-mono text-sm select-none rotate-90 origin-left">
          export const qrGenerator = true;
        </div>
        <div className="absolute bottom-48 right-16 text-blue-50 font-mono text-xs select-none">
          // scan to connect
        </div>
        <div className="absolute top-1/2 left-4 text-gray-100 font-mono text-xs select-none">
          {'<QR/>'}
        </div>
        
        {/* Thin lines */}
        <div className="absolute top-1/4 right-0 w-32 h-px bg-gray-100"></div>
        <div className="absolute bottom-1/3 left-0 w-24 h-px bg-blue-100"></div>
        <div className="absolute top-3/4 left-1/4 w-px h-16 bg-gray-100"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 border border-blue-600 text-blue-600 text-sm mb-6">
            QR CODE GENERATOR
          </div>
          
          <h1 className="text-5xl font-light text-black mb-4 tracking-tight">
            Professional QR Codes
          </h1>
          
          <p className="text-xl text-gray-600 max-w-lg mx-auto">
            Generate QR codes for quick access to your professional information
          </p>
        </div>

        {/* Format Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {qrFormats.map((format) => (
            <div 
              key={format.id}
              className={`border p-8 cursor-pointer transition-all duration-200 hover:border-black ${
                selectedFormat === format.id ? 'border-black bg-gray-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedFormat(format.id)}
            >
              <div className="text-center">
                <QrCode className={`w-12 h-12 mx-auto mb-4 ${
                  selectedFormat === format.id ? 'text-black' : 'text-gray-400'
                }`} />
                <h3 className="text-xl font-light text-black mb-2">{format.label}</h3>
                <p className="text-gray-600">{format.description}</p>
                {selectedFormat === format.id && (
                  <div className="mt-4 inline-block px-3 py-1 bg-black text-white text-xs uppercase tracking-wide">
                    SELECTED
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="border border-gray-200 bg-white mb-16">
          <div className="grid md:grid-cols-2">
            {/* QR Code Display */}
            <div className="p-8 border-r border-gray-200">
              <h2 className="text-2xl font-light text-black mb-6 border-b border-gray-100 pb-2">
                {selectedQR?.label}
              </h2>
              
              <div className="bg-white p-6 border border-gray-100 inline-block mb-6">
                {qrImageUrl ? (
                  <img 
                    src={qrImageUrl}
                    alt="QR Code"
                    className="w-64 h-64 mx-auto"
                  />
                ) : (
                  <div className="w-64 h-64 flex items-center justify-center bg-gray-50">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                  </div>
                )}
              </div>
              
              <p className="text-gray-600 mb-6">
                {selectedQR?.description}
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  className="inline-flex items-center px-6 py-3 bg-black text-white hover:bg-gray-900 transition-colors"
                  onClick={handleDownload}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download QR Code
                </button>
                <button 
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-black hover:border-black transition-colors"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share QR Code
                </button>
              </div>
            </div>

            {/* Data Preview */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light text-black border-b border-gray-100 pb-2">QR Code Data</h2>
                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-black hover:border-black transition-colors"
                  onClick={() => handleCopy(selectedQR?.data || '')}
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  <span className="ml-2">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              
              <div className="bg-gray-50 border border-gray-100 p-4 mb-6 font-mono">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap break-all overflow-auto max-h-48">
                  {selectedQR?.data}
                </pre>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500 uppercase text-sm tracking-wide">Format</span>
                  <span className="text-black font-mono">{selectedQR?.id.toUpperCase()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500 uppercase text-sm tracking-wide">Size</span>
                  <span className="text-black">300×300 pixels</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500 uppercase text-sm tracking-wide">Error Correction</span>
                  <span className="text-black">Medium (15%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="border border-gray-200 bg-white">
          <div className="p-8">
            <h2 className="text-2xl font-light text-black mb-8 border-b border-gray-100 pb-2">How to Use</h2>
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-light">1</span>
                </div>
                <h3 className="text-xl font-light text-black mb-3">Select Format</h3>
                <p className="text-gray-600">Choose the type of information you want to encode in your QR code</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-light">2</span>
                </div>
                <h3 className="text-xl font-light text-black mb-3">Download</h3>
                <p className="text-gray-600">Save the generated QR code image to your device for printing or sharing</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-light">3</span>
                </div>
                <h3 className="text-xl font-light text-black mb-3">Share</h3>
                <p className="text-gray-600">Print on business cards, add to email signatures, or share digitally</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="inline-block px-4 py-2 border border-gray-300 text-gray-500 text-xs uppercase tracking-wide">
            Powered by QRServer API
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;