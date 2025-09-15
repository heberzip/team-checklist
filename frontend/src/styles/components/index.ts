import { ztBtn, ztIconBtn } from './ui/p-button';
import { ztToast } from './ui/p-toast';
import { ztDialog, DialogSize } from './ui/p-dialog';

export const components = {
  ztBtn,
  ztIconBtn,
  ztToast,
  ztDialog,
} as const;

export type types = {
  DialogSize: DialogSize;
};

export { pDialogSty } from './ui/p-dialog';
