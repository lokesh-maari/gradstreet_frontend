import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Poster from "../components/Poster";
import { useReport } from "../context/ReportContext";

export default function ReportPage() {
  const { report } = useReport();
  const posterRef = useRef(null);
  const navigate = useNavigate();

  async function capturePoster() {
  return await html2canvas(posterRef.current, {
    scale: window.devicePixelRatio || 2,
    useCORS: true,
    allowTaint: false,
    backgroundColor: "#ffffff",
    logging: false,
    imageTimeout: 0,
    scrollX: 0,
    scrollY: -window.scrollY,
  });
}

  async function downloadPNG() {
  try {
    const canvas = await capturePoster();

    const fileName = (
      report?.college
        ? report.college.toUpperCase().replace(/\s+/g, "_")
        : "REPORT"
    );

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);

      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

      if (isIOS) {
        // Safari doesn't reliably support download attribute.
        window.open(url, "_blank");
      } else {
        const link = document.createElement("a");
        link.href = url;
        link.download = `${fileName}.png`;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  } catch (err) {
    console.error(err);
  }
}

  async function downloadPDF() {
    try {
      const canvas = await capturePoster();

      const img = canvas.toDataURL("image/jpeg", 1);

      const pdfWidth = 210;

      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });

      pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);

      const fileName = (
        report?.college
          ? report.college.toUpperCase().replace(/\s+/g, "_")
          : "REPORT"
      );

      pdf.save(`${fileName}.pdf`);
    } catch (err) {
      console.error(err);
    }
  }

  if (!report) {
    return (
      <div className="loading-page">
        <div className="spinner"></div>

        <h2>Generating Report...</h2>

        <p>
          Please wait while your assessment report is being prepared.
        </p>
      </div>
    );
  }

  return (
    <div className="report-page">

      <div className="report-header">

        <div>

          <h1>Assessment Report</h1>

          <p>
            Your report has been generated successfully.
          </p>

        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          Upload Another File
        </button>

      </div>

      <div className="poster-container">

        <Poster
          ref={posterRef}
          report={report}
        />

      </div>

      <div className="download-section">

        <h2>
          Download Report
        </h2>

        <p>
          Export your report in your preferred format.
        </p>

        <div className="download-buttons">

          <button
            className="pdf-btn"
            onClick={downloadPDF}
          >
            📄 Download PDF
          </button>

          <button
            className="png-btn"
            onClick={downloadPNG}
          >
            🖼 Download PNG
          </button>

        </div>

      </div>

    </div>
  );
}