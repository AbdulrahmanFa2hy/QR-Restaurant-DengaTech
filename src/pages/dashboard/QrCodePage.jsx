import React, { useState, useRef, useEffect } from "react";
import QRCode from "react-qr-code";
import QRCodeLib from "qrcode";
import { Download, Share2, Copy, RefreshCw } from "lucide-react";
import { useParams } from "react-router-dom";
import CustomButton from "../../components/common/CustomButton";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantByID,
  resetData,
} from "../../store/slices/restaurantSlice";

const QrCodePage = () => {
  const [domain] = useState("https://qr.dengatech.com");
  const [qrSize] = useState(256);
  const [isLoading, setIsLoading] = useState(false);
  const { restaurantId } = useParams();
  const qrRef = useRef(null);
  const { data } = useSelector((state) => state.restaurant);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurantByID(restaurantId));
    return () => {
      dispatch(resetData(restaurantId));
    };
  }, [dispatch, restaurantId]);

  // Generate QR Code URL
  const generateQrUrl = () => {
    return `${domain}/restaurant/${data?.slug}`;
  };

  // Download as SVG
  const downloadSVG = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (svg) {
      // Clone the SVG to avoid modifying the original
      const clonedSvg = svg.cloneNode(true);

      // Set explicit dimensions
      clonedSvg.setAttribute("width", qrSize);
      clonedSvg.setAttribute("height", qrSize);
      clonedSvg.setAttribute("viewBox", `0 0 ${qrSize} ${qrSize}`);

      const svgData = new XMLSerializer().serializeToString(clonedSvg);
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const svgUrl = URL.createObjectURL(svgBlob);

      const downloadLink = document.createElement("a");
      downloadLink.href = svgUrl;
      downloadLink.download = `restaurant-${restaurantId}-qr.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    } else {
      toast.error("لم يتم العثور على QR Code. يرجى المحاولة مرة أخرى.");
    }
  };

  // Download as PNG
  const downloadPNG = async () => {
    setIsLoading(true);
    const qrUrl = generateQrUrl();

    // Generate QR code as data URL
    const dataUrl = await QRCodeLib.toDataURL(qrUrl, {
      width: qrSize,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    // Create download link
    const link = document.createElement("a");
    link.download = `restaurant-${restaurantId}-qr.png`;
    link.href = dataUrl;
    link.click();

    setIsLoading(false);
  };

  // Copy URL to clipboard
  const copyUrl = async () => {
    await navigator.clipboard.writeText(generateQrUrl());
    // Success message is handled by centralized success handler
  };

  // Share URL
  const shareUrl = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "QR Code للمطعم",
        text: `QR Code للمطعم رقم ${restaurantId}`,
        url: generateQrUrl(),
      });
    } else {
      copyUrl();
    }
  };

  return (
    <div className="p-3 sm:p-4">
      {/* Header */}
      <div className="mb-6 sm:mb-8 mt-4 sm:mt-0">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-thirdColor-800 mb-2">
          QR Code للمطعم
        </h1>
        <p className="text-sm sm:text-base text-thirdColor-600">
          إنشاء وتحميل QR Code للمنيو
        </p>
      </div>

      {/* QR Code Display */}
      <div className="bg-white rounded-2xl shadow-lg border border-thirdColor-200 p-3 py-6 sm:py-14 sm:p-8 max-w-4xl mx-auto">
        <div className="text-center">
          {/* QR Code Container */}
          <div
            ref={qrRef}
            className="inline-block p-6 bg-white border-2 border-thirdColor-200 rounded-2xl shadow-lg"
          >
            <QRCode
              value={generateQrUrl()}
              size={qrSize}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              viewBox={`0 0 ${qrSize} ${qrSize}`}
            />
          </div>

          {/* Restaurant Menu Link */}
          <div
            className="mt-6 p-4 bg-thirdColor-50 rounded-xl border border-thirdColor-200"
            onClick={copyUrl}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono text-thirdColor-800 break-all">
                  {generateQrUrl()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-10">
          <CustomButton
            onClick={downloadSVG}
            variant="primary"
            size="md"
            className="flex items-center justify-center w-[45%] sm:w-40"
          >
            <span>تحميل SVG</span>
            <Download className="w-5 h-5" />
          </CustomButton>

          <CustomButton
            onClick={downloadPNG}
            disabled={isLoading}
            loading={isLoading}
            loadingText="جاري التحميل..."
            variant="secondary"
            size="md"
            className="flex items-center justify-center w-[45%] sm:w-40"
          >
            <span>تحميل PNG</span>
            <Download className="w-5 h-5" />
          </CustomButton>

          <CustomButton
            onClick={copyUrl}
            variant="secondary"
            size="md"
            className="flex items-center justify-center w-[45%] sm:w-40"
          >
            <span>نسخ الرابط</span>
            <Copy className="w-5 h-5" />
          </CustomButton>

          <CustomButton
            onClick={shareUrl}
            variant="primary"
            size="md"
            className="flex items-center justify-center w-[45%] sm:w-40"
          >
            <span>مشاركة</span>
            <Share2 className="w-5 h-5" />
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default QrCodePage;
