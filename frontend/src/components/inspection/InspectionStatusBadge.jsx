import React from 'react';
import { CheckCircle2, AlertOctagon, Clock, XCircle, CheckCheck, Edit3 } from 'lucide-react';

/**
 * InspectionStatusBadge
 * Formats prediction classes, processing statuses, and supervisor review states
 * with industrial dark theme styling matching the visual reference console.
 */
export default function InspectionStatusBadge({ type = 'class', value }) {
  if (!value) return null;

  const normalized = String(value).toLowerCase().trim();

  // 1. Predicted Class: Normal vs Defective
  if (type === 'class') {
    if (normalized === 'normal') {
      return (
        <span
          className="badge d-inline-flex align-items-center gap-1 px-2 py-1"
          style={{
            backgroundColor: 'rgba(34, 197, 94, 0.15)',
            color: '#4ade80',
            border: '1px solid #166534',
            fontWeight: 600,
            fontSize: '0.78rem'
          }}
        >
          <CheckCircle2 size={13} strokeWidth={2.5} />
          <span>Normal</span>
        </span>
      );
    }
    if (normalized === 'defective') {
      return (
        <span
          className="badge d-inline-flex align-items-center gap-1 px-2 py-1"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            color: '#f87171',
            border: '1px solid #7f1d1d',
            fontWeight: 600,
            fontSize: '0.78rem'
          }}
        >
          <AlertOctagon size={13} strokeWidth={2.5} />
          <span>Defective</span>
        </span>
      );
    }
    return <span className="badge bg-light text-muted border">{value}</span>;
  }

  // 2. Processing Status: Queued, Processing, Completed, Failed
  if (type === 'processing') {
    if (normalized === 'completed') {
      return (
        <span
          className="badge d-inline-flex align-items-center gap-1 px-2 py-1"
          style={{
            backgroundColor: 'rgba(34, 197, 94, 0.15)',
            color: '#4ade80',
            border: '1px solid #166534',
            fontSize: '0.75rem',
            fontWeight: 500
          }}
        >
          <CheckCircle2 size={12} strokeWidth={2.5} />
          <span>Completed</span>
        </span>
      );
    }
    if (normalized === 'processing') {
      return (
        <span
          className="badge d-inline-flex align-items-center gap-1 px-2 py-1"
          style={{
            backgroundColor: 'rgba(245, 158, 11, 0.15)',
            color: '#fbbf24',
            border: '1px solid #78350f',
            fontSize: '0.75rem',
            fontWeight: 500
          }}
        >
          <span className="spinner-border spinner-border-sm" style={{ width: 10, height: 10 }} />
          <span>Processing</span>
        </span>
      );
    }
    if (normalized === 'queued') {
      return (
        <span
          className="badge d-inline-flex align-items-center gap-1 px-2 py-1"
          style={{
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            color: '#7dd3fc',
            border: '1px solid #0369a1',
            fontSize: '0.75rem',
            fontWeight: 500
          }}
        >
          <Clock size={12} strokeWidth={2.5} />
          <span>Queued</span>
        </span>
      );
    }
    if (normalized === 'failed') {
      return (
        <span
          className="badge d-inline-flex align-items-center gap-1 px-2 py-1"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            color: '#f87171',
            border: '1px solid #7f1d1d',
            fontSize: '0.75rem',
            fontWeight: 500
          }}
        >
          <XCircle size={12} strokeWidth={2.5} />
          <span>Failed</span>
        </span>
      );
    }
    return <span className="badge bg-light text-muted border">{value}</span>;
  }

  // 3. Supervisor Review Status: pending, confirmed, corrected
  if (type === 'review') {
    if (normalized === 'confirmed') {
      return (
        <span
          className="badge d-inline-flex align-items-center gap-1 px-2 py-1"
          style={{
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            color: '#7dd3fc',
            border: '1px solid #0369a1',
            fontSize: '0.75rem',
            fontWeight: 500
          }}
        >
          <CheckCheck size={12} strokeWidth={2.5} />
          <span>Confirmed</span>
        </span>
      );
    }
    if (normalized === 'corrected') {
      return (
        <span
          className="badge d-inline-flex align-items-center gap-1 px-2 py-1"
          style={{
            backgroundColor: 'rgba(217, 70, 239, 0.15)',
            color: '#e879f9',
            border: '1px solid #86198f',
            fontSize: '0.75rem',
            fontWeight: 500
          }}
        >
          <Edit3 size={12} strokeWidth={2.5} />
          <span>Corrected</span>
        </span>
      );
    }
    // Default or pending
    return (
      <span
        className="badge d-inline-flex align-items-center gap-1 px-2 py-1"
        style={{
          backgroundColor: 'rgba(245, 158, 11, 0.15)',
          color: '#fbbf24',
          border: '1px solid #78350f',
          fontSize: '0.75rem',
          fontWeight: 500
        }}
      >
        <Clock size={12} />
        <span>Pending Review</span>
      </span>
    );
  }

  return <span className="badge bg-light text-muted border">{value}</span>;
}
