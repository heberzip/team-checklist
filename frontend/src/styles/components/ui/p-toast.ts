export const ztToast = {
  root: 'pointer-events-none',

  rootMessages: '[&_.p-toast-message]:pointer-events-auto',
  message: {
    base: 'rounded-md shadow-md flex gap-3 px-4 py-2 min-w-70',
    icon: 'my-auto text-[25px] mr-3',
    text: 'flex-1',
    close:
      'ml-auto p-2 grid place-items-center w-8 h-8 rounded-full hover:bg-black/10',
    variants: {
      success: 'bg-success-600 text-white',
      info: 'bg-info-600 text-white',
      warn: 'bg-warning-600 text-white',
      error: 'bg-error-600 text-white',
      secondary: 'bg-secondary-600 text-white',
      contrast: 'bg-neutral-600 text-white',
    } as const,
  },
} as const;
