import { postPaymentV1PrivateEpayrequestCharge } from "hitobit-services";
import { useMutation } from "react-query";
import { v4 as uuid } from "uuid";

/**
 * @example
 *   const { onCharge, isChargeLoading, chargeError } = useCharge();
 *
 *   onCharge({
 *     postActionUniqueId,
 *     chargeAmount,
 *     walletNumber,
 *     postActionClientUniqueId: clientUniqueId,
 *   });
 */
const useCharge = ({
  getAfterPayRedirectUri,
  redirectToPayLink,
}: {
  getAfterPayRedirectUri: (clientUniqueId: string) => string;
  redirectToPayLink: (paymentLink: string) => string;
}) => {
  const {
    mutate: onCharge,
    isLoading: isChargeLoading,
    error: chargeError,
  } = useMutation(
    async ({
      chargeAmount,
      walletNumber,
      postActionClientUniqueId,
      postActionUniqueId,
    }: {
      chargeAmount: number;
      walletNumber: string;
      postActionClientUniqueId?: string;
      postActionUniqueId?: string;
    }) => {
      const chargeClientUniqueId = uuid();

      const { paymentLink } = await postPaymentV1PrivateEpayrequestCharge({
        postActionUniqueId,
        amount: chargeAmount,
        redirectType: "Redirect",
        userWalletNumber: walletNumber,
        clientUniqueId: chargeClientUniqueId,
        redirectUrl: getAfterPayRedirectUri(
          postActionClientUniqueId || chargeClientUniqueId,
        ),
      });

      if (paymentLink) {
        redirectToPayLink(paymentLink);
      }
    },
  );

  return {
    onCharge,
    isChargeLoading,
    chargeError,
  };
};

export { useCharge };
