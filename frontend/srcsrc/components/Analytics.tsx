'use client';

import { useEffect } from 'react';
import { initGA } from '@/lib/gtag';

export default function Analytics() {
  useEffect(() => {
    initGA();
  }, []);

  return null;
}
