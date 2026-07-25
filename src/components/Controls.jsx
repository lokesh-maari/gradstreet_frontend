import { useState } from "react";

export default function Controls({
  onGenerate,
  loading,
  statusMsg,
  statusIsError,
}) {
  const [file, setFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="upload-page">

      <div className="upload-card">

        <div className="brand-logo">
          <h1>GRADSTREET</h1>
          <p>College Assessment Report Generator</p>
        </div>

        <h2 className="title">
          Upload Assessment Workbook
        </h2>

        <p className="subtitle">
          Upload your Excel workbook to generate a professional assessment report.
        </p>

        <label
          className="drop-zone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >

          <input
            type="file"
            accept=".xlsx,.xlsm"
            hidden
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <div className="upload-icon">
            ☁️
          </div>

          <h3>
            Drag & Drop Excel File
          </h3>

          <span>
            or Click to Browse
          </span>

        </label>

        {file && (
          <div className="selected-file">
            📄 {file.name}
          </div>
        )}

        <button
          className="generate-btn"
          disabled={loading}
          onClick={() => onGenerate(file)}
        >
          {loading ? "Generating..." : "Generate Report"}
        </button>

        {statusMsg && (
          <div
            className={
              statusIsError
                ? "status error"
                : "status success"
            }
          >
            {statusMsg}
          </div>
        )}

      </div>

    </div>
  );
}