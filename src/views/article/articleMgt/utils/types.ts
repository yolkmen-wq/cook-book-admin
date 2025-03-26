interface FormItemProps {
  id?: number;
  /** 用于判断是`新增`还是`修改` */
  title: string;
  higherDeptOptions: Record<string, unknown>[];
  cover: string;
  category: string;
  tags: string[];
  content: string;
  author: string;
  status: number;
  readonly: boolean;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
