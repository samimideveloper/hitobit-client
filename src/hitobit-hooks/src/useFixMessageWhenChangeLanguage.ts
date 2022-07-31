import { useTranslation } from "hitobit-modules";
import { Context, useContext, useEffect } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormReturn,
  UseFormTrigger,
} from "react-hook-form";

export const useFixMessageWhenChangeLanguage = <T extends FieldValues>(
  context: Context<UseFormReturn<T, object>>,
) => {
  const { i18n } = useTranslation();
  const {
    trigger,
    formState: { errors },
  } = useContext(context);

  useEffect(() => {
    if (Object.keys(errors || {}).length !== 0) {
      trigger(Object.keys(errors || {}) as Path<T>[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, i18n.language]);
};

export const useDirtyFields = <T extends FieldValues>(
  trigger: UseFormTrigger<T>,
  errors: FieldErrors<T>,
) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (Object.keys(errors || {}).length !== 0) {
      trigger(Object.keys(errors || {}) as Path<T>[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, i18n.language]);
};
