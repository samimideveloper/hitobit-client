import { ReactNode } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { useOrderPlacingError } from "../useOrderPlacingError";
import { ConvertContext, ConvertFormProps } from "./context";
import { useErrorContext } from "./provider";

type ConvertPriceRenderProps = {
  render: (state: {
    field: ControllerRenderProps<ConvertFormProps, "price"> & {
      fromAsset?: string;
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

  const { getPriceError } = useOrderPlacingError();

  const errorMessages = useErrorContext();

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
                if (typeof errorMessages.REQUIRED === "function") {
                  return errorMessages.REQUIRED();
                }
                return errorMessages.REQUIRED;
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
              fromAsset: fromAsset,
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
