interface FormItemProps {
  id?: number;
  /** 用于判断是`新增`还是`修改` */
  title: string;
  carouselName: string;
  carouselDesc: string;
  position: string;
  readonly: boolean;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
