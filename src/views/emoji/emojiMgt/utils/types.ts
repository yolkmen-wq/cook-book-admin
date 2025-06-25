interface FormItemProps {
  id?: number;
  /** 用于判断是`新增`还是`修改` */
  title: string;
  url: string;
  name: string;
  categoryId: number;
  unicode?: string;
  status: number;
  readonly?: boolean;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
