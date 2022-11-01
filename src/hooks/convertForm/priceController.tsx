import { ReactNode } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useOrderPlacingError } from "../useOrderPlacingError";
import { ConvertContext, ConvertFormProps } from "./context";

type ConvertPriceRenderProps = {
  render: (state: {
    field: ControllerRenderProps<ConvertFormProps, "price"> & {
      toMarket?: string;
      hasError?: boolean;
    };
  }) => React.ReactElement;

  renderErrorComponent?: (message?: string) => ReactNode;
};

export const ConvertPriceController = ({
  render,
  renderErrorComponent,
}: ConvertPriceRenderProps) => {
  const { toMarket, fromAmount, fromAsset } = ConvertContext.useWatch();

  const { t } = useTranslation();

  const { getPriceError } = useOrderPlacingError();

  const { errors } = ConvertContext.useFormState();

  const canThrowError =
    errors["price"] && fromAmount !== null && fromAmount !== undefined;

  return (
    <>
      <ConvertContext.Controller
        name="price"
        rules={{
          validate: {
            amount: (value) => {
              if (!value) {
                return t("enterPrice");
              }
              return getPriceError({
                price: Number(value),
                symbol: toMarket,
              });
            },
          },
        }}
        render={({ field: { onChange, value, ...rest } }) => {
          return render({
            field: {
              value: value,
              toMarket: fromAsset
                ? toMarket
                    ?.toLowerCase()
                    ?.replace(fromAsset.toLowerCase(), "")
                    .toUpperCase()
                : "",
              hasError: value ? !!errors.price : false,
              onChange: (value) => {
                onChange(value ? value : "");
              },
              ...rest,
            },
          });
        }}
      />
      {renderErrorComponent &&
        renderErrorComponent?.(canThrowError ? errors["price"]?.message : "")}
    </>
  );
};
