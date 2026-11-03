import React from 'react';
import { FolderSearch } from 'lucide-react';

export default function EmptyState({
  title = 'No records found',
  description = 'There are no items matching your criteria.',
  icon: Icon = FolderSearch,
  actionButton = null
}) {
  return (
    <div
      className="text-center p-5 border border-dashed rounded-3 my-3"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)'
      }}
    >
      <div
        className="d-inline-flex p-3 rounded-circle mb-3"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          color: 'var(--text-muted)',
          border: '1px solid var(--border-color)'
        }}
      >
        <Icon size={32} />
      </div>
      <h6 className="fw-semibold text-white mb-1">{title}</h6>
      <p className="text-muted small mb-3 max-w-sm mx-auto">{description}</p>
      {actionButton}
    </div>
  );
}
