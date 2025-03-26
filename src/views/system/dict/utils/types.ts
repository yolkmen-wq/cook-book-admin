interface FormItemProps {
  dictName: string;
  dictType: string;
  status: number;
  remark: string;
  readonly: boolean;
}

interface FormItemProps2 {
  dictLabel: string;
  dictValue: string;
  dictCode: string;
  status: number;
  readonly: boolean;
}

interface FormProps {
  formInline: FormItemProps;
}

interface FormProps2 {
  formInline: FormItemProps2;
}

export type { FormItemProps, FormItemProps2, FormProps, FormProps2 };
