interface FormItemProps {
  id?: number;
  carouselItemId?: number;
  /** 用于判断是`新增`还是`修改` */
  title: string;
  carouselName: string;
  carouselDesc: string;
  position: string;
  jumpType: string | number;
  keyWord: string;
  imageUrl: string;
  readonly: boolean;
}
interface FormProps {
  formInline: Partial<FormItemProps>;
}

export type { FormItemProps, FormProps };
