export type DialogSize = 'sm' | 'md' | 'lg';

export const ztDialog = {
  root: 'rounded-lg flex shadow-xl ring-1 ring-black/5 bg-primary-600 text-surface-700',
  mask: 'backdrop-blur-sm bg-black/50',
  content:
    'flex flex-col gap-8 p-10 min-w-[500px] max-h-[90vh] overflow-y-auto',
  header: 'flex items-center gap-3 px-4 py-3 border-b border-surface-200',
  title: 'text-base font-semibold',
  close: 'ml-auto grid place-items-center w-8 h-8 rounded-md hover:bg-black/10',
  footer: 'flex items-center gap-2 px-4 py-2 border-t border-surface-200',
  sizes: {
    sm: 'w-[360px] max-w-[95vw]',
    md: 'w-[560px] md:w-[720px] max-w-[95vw]',
    lg: 'w-[960px] max-w-[95vw]',
  },
} as const;

export function pDialogSty(size: DialogSize = 'md') {
  return {
    root: `${ztDialog.root} ${ztDialog.sizes[size]}`,
    mask: ztDialog.mask,
    content: ztDialog.content,
    header: ztDialog.header,
    title: ztDialog.title,
    close: ztDialog.close,
    footer: ztDialog.footer,
  };
}
