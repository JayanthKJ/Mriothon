import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

export default function CitationCard({ citation, onOpenPdf }) {
  if (!citation) return null;

  const docId = citation.document_id ?? citation.doc_id ?? citation.id;
  const docTitle = citation.document_title || citation.title || citation.name || 'Technical Manual';
  const rev = citation.revision || citation.rev || 'Rev 1.0';
  const pageNum = Math.max(1, Number(citation.page_number || citation.page || citation.page_no || 1));
  const snippet = citation.snippet || citation.text || citation.excerpt || '';
  const pdfUrl = citation.pdf_url || citation.url || null;

  const handleClick = () => {
    onOpenPdf({
      document_id: docId,
      document_title: docTitle,
      revision: rev,
      page_number: pageNum,
      pdf_url: pdfUrl
    });
  };

  return (
    <div
      onClick={handleClick}
      className="card card-industrial p-2 mb-2 border text-start cursor-pointer transition hover-shadow"
      style={{
        cursor: 'pointer',
        maxWidth: '480px',
        backgroundColor: 'var(--bg-surface-elevated)',
        borderColor: 'var(--border-color)'
      }}
      title={`Open ${docTitle} at page ${pageNum}`}
    >
      <div className="d-flex align-items-center justify-content-between mb-1">
        <div className="d-flex align-items-center gap-1 fw-semibold small" style={{ color: '#f59e0b' }}>
          <BookOpen size={14} />
          <span className="text-truncate" style={{ maxWidth: '280px' }}>
            {docTitle}
          </span>
        </div>
        <div className="d-flex align-items-center gap-1">
          {rev && (
            <span className="badge bg-dark text-muted border px-1" style={{ fontSize: '0.68rem' }}>
              {rev}
            </span>
          )}
          <span
            className="badge"
            style={{
              fontSize: '0.72rem',
              backgroundColor: '#f59e0b',
              color: '#0d0e11',
              fontWeight: 600
            }}
          >
            Page {pageNum}
          </span>
          <ExternalLink size={12} className="text-muted ms-1" />
        </div>
      </div>

      {snippet && (
        <p className="text-muted mb-0 font-monospace small" style={{ fontSize: '0.75rem', lineHeight: '1.25' }}>
          "{snippet}"
        </p>
      )}
    </div>
  );
}
