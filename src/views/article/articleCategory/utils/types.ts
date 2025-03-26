interface FormItemProps {
  id?: number;
  /** 用于判断是`新增`还是`修改` */
  categoryName: string;
  categoryPic: string;
  categoryDesc: string;
  showCategory: number;
  categorySort: number;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
