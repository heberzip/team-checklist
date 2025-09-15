export const ztBtn = {
  base: 'flex items-center px-6 py-2 rounded-sm font-medium transition-colors h-full max-h-[36px]',
  variants: {
    'zt-primary': 'bg-primary-500 text-white hover:bg-primary-600',
    'zt-secondary':
      'bg-default text-secondary-700 hover:bg-secondary-600 hover:text-white',
    'zt-success': 'bg-success   text-white hover:bg-success-600',
    'zt-error': 'bg-error     text-white hover:bg-error-600',
    'zt-warning': 'bg-warning   text-white hover:bg-warning-600',
    'zt-info': 'bg-info      text-white hover:bg-info-600',
    'zt-neutral': 'bg-neutral-600 text-white hover:bg-neutral-700',
    'zt-disabled':
      'bg-neutral-200 text-neutral cursor-not-allowed hover:bg-neutral-200 hover:text-neutral',
  } as const,
} as const;

export const ztIconBtn = {
  base: 'p-2 bg-transparent font-bold transition-colors duration-200 hover:shadow-sm max-w-[32px] max-h-[32px]',
  rounded: {
    base: 'rounded-full',
    variants: {
      'zt-primary':
        'text-primary-600 hover:bg-primary-600 hover:text-primary-100 hover:shadow-primary-300',
      'zt-secondary':
        'text-secondary-600 hover:bg-secondary-600 hover:text-secondary-100 hover:shadow-secondary-300',
      'zt-success':
        'text-success-600 hover:bg-success-600 hover:text-success-100 hover:shadow-success-300',
      'zt-error':
        'text-error-600 hover:bg-error-600 hover:text-error-100 hover:shadow-error-300',
      'zt-warning':
        'text-warning-600 hover:bg-warning-600 hover:text-warning-100 hover:shadow-warning-300',
      'zt-info':
        'text-info-600 hover:bg-info-600 hover:text-info-100 hover:shadow-info-300',
      'zt-neutral':
        'text-neutral-600 hover:bg-neutral-600 hover:text-neutral-100 hover:shadow-neutral-300',
      'zt-disabled':
        'bg-neutral-200 text-neutral-400 shadow-none cursor-not-allowed hover:bg-neutral-200 hover:text-neutral-400 hover:shadow-none',
    } as const,
  },
  square: {
    base: 'rounded-sm',
    variants: {
      'zt-primary':
        'text-primary-600 hover:bg-primary-600 hover:text-primary-100 hover:shadow-primary-300',
      'zt-secondary':
        'text-secondary-600 hover:bg-secondary-600 hover:text-secondary-100 hover:shadow-secondary-300',
      'zt-success':
        'text-success-600 hover:bg-success-600 hover:text-success-100 hover:shadow-success-300',
      'zt-error':
        'text-error-600 hover:bg-error-600 hover:text-error-100 hover:shadow-error-300',
      'zt-warning':
        'text-warning-600 hover:bg-warning-600 hover:text-warning-100 hover:shadow-warning-300',
      'zt-info':
        'text-info-600 hover:bg-info-600 hover:text-info-100 hover:shadow-info-300',
      'zt-neutral':
        'text-neutral-600 hover:bg-neutral-600 hover:text-neutral-100 hover:shadow-neutral-300',
      'zt-disabled':
        'bg-neutral-200 text-neutral-400 shadow-none cursor-not-allowed hover:bg-neutral-200 hover:text-neutral-400 hover:shadow-none',
    } as const,
  },
} as const;
