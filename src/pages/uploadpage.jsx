import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Controls from "../components/Controls";
import { useReport } from "../context/ReportContext";

export default function UploadPage() {
  const navigate = useNavigate();
  const { setReport } = useReport();

  const [apiUrl] = useState(
    "https://gradstreet-rho.vercel.app/reports/generate"
  );

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [statusIsError, setStatusIsError] = useState(false);

  async function handleGenerate(file) {
    if (!file) {
      setStatusIsError(true);
      setStatusMsg("Please select an Excel file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setStatusIsError(false);
    setStatusMsg("Uploading workbook...");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }

      setStatusMsg("Generating report...");

      const json = await response.json();

      setReport(json);

      setStatusMsg("Report generated successfully.");

      navigate("/report");
    } catch (err) {
      console.error(err);

      setStatusIsError(true);

      setStatusMsg(
        err.message || "Failed to generate report."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="upload-container">
      <Controls
        onGenerate={handleGenerate}
        loading={loading}
        statusMsg={statusMsg}
        statusIsError={statusIsError}
      />
    </div>
  );
}