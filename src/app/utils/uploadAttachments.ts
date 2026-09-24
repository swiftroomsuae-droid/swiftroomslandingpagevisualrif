// Uploads each attached file to LeadOptimizer Media Storage via the main
// website's /api/upload (which holds the CRM token), and returns one entry per
// file for the lead: "name — https://…" on success, or the name marked as
// failed so the lead is never lost. 4 MB per file (Vercel request limit).

const UPLOAD_URL =
  (import.meta.env.VITE_UPLOAD_ENDPOINT as string | undefined) || 'https://swiftrooms.ae/api/upload';

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export async function uploadAttachments(files: File[]): Promise<string[]> {
  return Promise.all(
    files.map(async (file, i) => {
      const label = `${i + 1}) ${file.name}`;
      try {
        const form = new FormData();
        form.append('file', file);
        const res = await fetch(UPLOAD_URL, { method: 'POST', body: form });
        if (!res.ok) throw new Error(`upload ${res.status}`);
        const { url } = (await res.json()) as { url?: string };
        if (!url) throw new Error('no url');
        return `${label} — ${url}`;
      } catch (err) {
        console.error('[LeadForm] attachment upload failed:', file.name, err);
        return `${label} (upload failed — please request from customer)`;
      }
    }),
  );
}
