//@ts-nocheck
/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 6
 */

export type AccountStatus = "Block" | "OK";

export type AccountType =
  | "SPOT"
  | "MARGIN"
  | "FUTURES"
  | "LEVERAGED"
  | "TRD_GRP_002";

export interface AddPostActionInternalDepositEPayRequestRequestVM {
  ePayRequestClientUniqueId?: string;
  postActionNature?: PostActionNature;
  postActionStatus?: PostActionStatus;
}

export interface AddPostActionPlaceMarketBuyOrderRequestVM {
  marketSymbol?: string;
  marketType?: MarketType;
  postActionNature?: PostActionNature;
  postActionStatus?: PostActionStatus;
  /** - Format: double */
  quoteQuantity?: number;
}

export interface AddPostActionResponseVM {
  /** - Format: uuid */
  postActionUniqueId?: string;
}

export interface AddressBookAddRequestVM {
  address?: string;
  addressType?: AddressType;
  currencySymbol?: string;
  /** - Format: int32 */
  globalWalletProviderId?: number;
  label?: string;
  moneyNetworkSymbol?: string;
  otherGlobalWalletProvider?: string;
  tagId?: string;
  whiteStatus?: boolean;
}

export interface AddressBookResponseVM {
  address?: string;
  addressType?: AddressType;
  currencySymbol?: string;
  globalWalletProviderName?: string;
  /** - Format: int64 */
  id?: number;
  label?: string;
  moneyNetworkSymbol?: string;
  tagId?: string;
  whiteStatus?: boolean;
}

export type AddressType = "Standard" | "Universal";

export interface AggregationResultResponseVM {
  /** - Format: int32 */
  count?: number;
  /** - Format: double */
  sum?: number;
}

export interface ApiKeyAddRequestVM {
  apiKeyTrustedAddresses?: ApiKeyTrustedAddressAddRequestVM[];
  apiScopes?: ApiKeyScopeAddRequestVM[];
  label?: string;
}

export interface ApiKeyAddResponseVM {
  /** - Format: int64 */
  id?: number;
  key?: string;
  secret?: string;
}

export interface ApiKeyListResponseVM {
  apiKeys?: ApiKeyResponseVM[];
  /** - Format: int64 */
  totalCount?: number;
}

export interface ApiKeyResponseVM {
  apiKeyTrustedAddresses?: ApiKeyTrustedAddressResponseVM[];
  apiScopes?: ApiKeyScopeResponseVM[];
  /** - Format: int64 */
  id?: number;
  key?: string;
  label?: string;
}

export interface ApiKeyScopeAddRequestVM {
  scope?: string;
}

export interface ApiKeyScopeResponseVM {
  scope?: string;
}

export interface ApiKeyTrustedAddressAddRequestVM {
  trustedAddress?: string;
}

export interface ApiKeyTrustedAddressResponseVM {
  trustedAddress?: string;
}

export interface ApiKeyUpdateRequestVM {
  apiKeyTrustedAddresses?: ApiKeyTrustedAddressAddRequestVM[];
  apiScopes?: ApiKeyScopeAddRequestVM[];
  /** - Format: int64 */
  id?: number;
  isActive?: boolean;
  label?: string;
}

export interface ApiScopeResponseVM {
  displayName?: string;
  /** - Format: uuid */
  id?: string;
  name?: string;
}

export type AppListOrderStatus = "EXECUTING" | "ALL_DONE" | "REJECT";

export type AppListStatusType = "RESPONSE" | "EXEC_STARTED" | "ALL_DONE";

export type AppOrderSide = "BUY" | "SELL";

export type AppOrderSourceType =
  | "Trade"
  | "InstantBuy"
  | "InstantSell"
  | "Convert";

export type AppOrderStatus =
  | "NEW"
  | "PARTIALLY_FILLED"
  | "FILLED"
  | "CANCELED"
  | "PENDING_CANCEL"
  | "REJECTED"
  | "EXPIRED"
  | "NEW_INSURANCE"
  | "NEW_ADL";

export type AppOrderType =
  | "LIMIT"
  | "MARKET"
  | "STOP_LOSS"
  | "STOP_LOSS_LIMIT"
  | "TAKE_PROFIT"
  | "TAKE_PROFIT_LIMIT"
  | "LIMIT_MAKER";

export type AppTimeInForce =
  | "GTC"
  | "IOC"
  | "FOK"
  | "GoodTillCrossing"
  | "GoodTillExpiredOrCanceled";

export interface BanksResponseVM {
  /** - Format: int32 */
  id?: number;
  logoAddress?: string;
  name?: string;
}

export interface BasePostActionInfoResponseVM {
  /** - Format: date-time */
  doneDate?: string;
  postActionNature?: PostActionNature;
  postActionStatus?: PostActionStatus;
}

export interface BlockchainAddressResponseVM {
  /** - Format: double */
  amount?: number;
  blockchainAddress?: string;
  /** - Format: int64 */
  domainWalletMoneyNetworkId?: number;
  /** - Format: int32 */
  moneyNetworkId?: number;
  /** - Format: double */
  paidAmount?: number;
  symbol?: string;
}

export interface BlockchainDepositInfoResponseVM {
  /** - Format: int32 */
  moneyNetworkId?: number;
  txId?: string;
}

export type BusinessShareType =
  | "Person"
  | "PrivateStock"
  | "PublicStock"
  | "Limited"
  | "GeneralPartnership"
  | "Institute"
  | "Cooperative";

export interface CancelAllOrdersRequestVM {
  symbol?: string;
}

export interface CancelOcoOrderRequestVM {
  listClientOrderId?: string;
  newClientOrderId?: string;
  /** - Format: int64 */
  orderListId?: number;
  symbol?: string;
}

export interface CancelOcoOrderResponseVM {
  contingencyType?: string;
  listClientOrderId?: string;
  listOrderStatus?: AppListOrderStatus;
  listStatusType?: AppListStatusType;
  /** - Format: int64 */
  orderListId?: number;
  orderReports?: OrderResultInfoResponseVM[];
  orders?: OrderMinimalInfoResponseVM[];
  symbol?: string;
  /** - Format: date-time */
  transactionTime?: string;
}

export interface CancelOrderRequestVM {
  newClientOrderId?: string;
  /** - Format: int64 */
  orderId?: number;
  origClientOrderId?: string;
  symbol?: string;
}

export interface CancelOrderResponseVM {
  baseCurrencySymbol?: string;
  clientOrderId?: string;
  /** - Format: double */
  cummulativeQuoteQty?: number;
  /** - Format: double */
  executedQty?: number;
  /** - Format: int64 */
  orderId?: number;
  /** - Format: int64 */
  orderListId?: number;
  /** - Format: double */
  origQty?: number;
  /** - Format: double */
  origQuoteOrderQty?: number;
  /** - Format: double */
  price?: number;
  quoteCurrencySymbol?: string;
  side?: AppOrderSide;
  status?: AppOrderStatus;
  /** - Format: double */
  stopPrice?: number;
  symbol?: string;
  timeInForce?: AppTimeInForce;
  /** - Format: date-time */
  transactTime?: string;
  type?: AppOrderType;
}

export interface ChangeEmailRequestVM {
  email?: string;
  emailOtpCode?: string;
  emailOtpToken?: string;
  newEmailOtpCode?: string;
  newEmailOtpToken?: string;
  totpCode?: string;
}

export interface ChangePasswordRequestVM {
  currentPassword?: string;
  password?: string;
}

export interface ChangeTwoFactorRequestVM {
  otpCode?: string;
  otpToken?: string;
  totpCode?: string;
}

export interface CityResponseVM {
  /** - Format: int32 */
  id?: number;
  /** - Format: int32 */
  provinceId?: number;
  title?: string;
}

export type ComissionType = "Percentage" | "Fixed";

export interface CommissionPolicyResponseVM {
  commissionType?: ComissionType;
  commissionTypeDisplay?: string;
  currencySymbol?: string;
  /** - Format: double */
  fixedValue?: number;
  logicalActionType?: LogicalActionType;
  logicalActionTypeDisplay?: string;
  /** - Format: double */
  maxValue?: number;
  moneyNetworkSymbol?: string;
  /** - Format: double */
  percent?: number;
}

export interface CountryResponseVM {
  /** - Format: int32 */
  id?: number;
  title?: string;
}

export interface CreateChargeRequestRequestVM {
  /** - Format: double */
  amount?: number;
  clientUniqueId?: string;
  /** - Format: uuid */
  postActionUniqueId?: string;
  redirectType?: RedirectType;
  redirectUrl?: string;
  userWalletCurrencySymbol?: string;
  userWalletNumber?: string;
}

export interface CreateDivideIpgRequestRequestVM {
  /** - Format: double */
  amount?: number;
  blockMoney?: boolean;
  canPayViaWallet?: boolean;
  clientUniqueId?: string;
  customData?: EpayRequestCustomDataRequestVM[];
  description?: string;
  divideShareInfo?: DivideEpayRequestShareInfoRequestVM[];
  getCommissionFromPayer?: boolean;
  pluginName?: string;
  redirectUrl?: string;
  userWalletCurrencySymbol?: string;
  userWalletNumber?: string;
}

export interface CreateDivideLinkRequestRequestVM {
  /** - Format: double */
  amount?: number;
  /** - Format: uuid */
  assignedToUserId?: string;
  audiences?: EPayRequestAudienceRequestVM[];
  blockMoney?: boolean;
  clientUniqueId?: string;
  customData?: EpayRequestCustomDataRequestVM[];
  description?: string;
  divideShareInfo?: DivideEpayRequestShareInfoRequestVM[];
  /** - Format: int32 */
  expireDays?: number;
  getCommissionFromPayer?: boolean;
  isAutoConfirm?: boolean;
  notifyAudience?: boolean;
  pluginName?: string;
  redirectType?: RedirectType;
  redirectUrl?: string;
  userWalletCurrencySymbol?: string;
  userWalletNumber?: string;
}

export interface CreateIpgRequestRequestVM {
  /** - Format: double */
  amount?: number;
  canPayViaWallet?: boolean;
  clientUniqueId?: string;
  customData?: EpayRequestCustomDataRequestVM[];
  description?: string;
  getCommissionFromPayer?: boolean;
  payViaOtherCurrency?: boolean;
  pluginName?: string;
  redirectUrl?: string;
  userWalletCurrencySymbol?: string;
  userWalletNumber?: string;
}

export interface CreateLinkRequestRequestVM {
  /** - Format: double */
  amount?: number;
  assignedToAnonymous?: string;
  /** - Format: uuid */
  assignedToUserId?: string;
  audiences?: EPayRequestAudienceRequestVM[];
  clientUniqueId?: string;
  customData?: EpayRequestCustomDataRequestVM[];
  description?: string;
  /** - Format: int32 */
  expireDays?: number;
  getCommissionFromPayer?: boolean;
  isAutoConfirm?: boolean;
  notifyAudience?: boolean;
  payViaOtherCurrency?: boolean;
  pluginKey?: string;
  redirectType?: RedirectType;
  redirectUrl?: string;
  userWalletCurrencySymbol?: string;
  userWalletNumber?: string;
}

export interface CreatePosRequestRequestVM {
  /** - Format: double */
  amount?: number;
  clientUniqueId?: string;
  customData?: EpayRequestCustomDataRequestVM[];
  description?: string;
  getCommissionFromPayer?: boolean;
  pluginKey?: string;
  redirectType?: RedirectType;
  redirectUrl?: string;
  userWalletCurrencySymbol?: string;
  userWalletNumber?: string;
}

export interface CreateSettlementRequestVM {
  /** - Format: double */
  amount?: number;
  description?: string;
  /** - Format: int64 */
  userBankId?: number;
}

export interface CreateUserBankDetailRequestVM {
  accountNo?: string;
  /** - Format: int32 */
  bankId?: number;
  businessShareType?: BusinessShareType;
  cardNumber?: string;
  documents?: DocumentRequestVM[];
  firstName?: string;
  lastName?: string;
  name?: string;
  nationalCode?: string;
  shebaNo?: string;
}

export interface CreateUserBankRequestVM {
  accountNo?: string;
  /** - Format: int32 */
  bankId?: number;
  cardNumber?: string;
  name?: string;
  shebaNo?: string;
}

export interface CreateUserWalletRequestVM {
  currencySymbol?: string;
  getCommissionFromPayer?: boolean;
  /** - Format: int32 */
  userBankId?: number;
  walletName?: string;
}

export interface CreateWithdrawRequestUserWalletResponseVM {
  /** - Format: int64 */
  id?: number;
}

export interface CurrencyResponseVM {
  canBuy?: boolean;
  canCharge?: boolean;
  canDeposit?: boolean;
  canSettlement?: boolean;
  canTrade?: boolean;
  canWithdraw?: boolean;
  currencyType?: CurrencyType;
  /** - Format: int32 */
  decimalDigits?: number;
  enabled?: boolean;
  isDefaultCrypto?: boolean;
  isDefaultFiat?: boolean;
  logoAddress?: string;
  name?: string;
  specialTips?: string;
  symbol?: string;
}

export type CurrencyType = "Fiat" | "Crypto";

export interface DeleteAuthV1PrivateUsertrusteddeviceQueryParams {
  /** - Format: int64 */
  id?: number;
}

export interface DeleteAuthV1ProtectApikeyQueryParams {
  /** - Format: int64 */
  id?: number;
}

export interface DeleteEngagementV1PrivateNotificationClearallQueryParams {
  type?: NotificationTypes;
}

export interface DepositTransactionHistoryListResponseVM {
  /** - Format: int64 */
  count?: number;
  list?: DepositTransactionHistoryResponseVM[];
}

export interface DepositTransactionHistoryResponseVM {
  address?: string;
  addressTag?: string;
  /** - Format: date-time */
  createDate?: string;
  currencySymbol?: string;
  /** - Format: int64 */
  id?: number;
  moneyNetworkSymbol?: string;
  status?: TransactionHistoryStatus;
  transferAmount?: string;
  transferType?: TransferType;
  txId?: string;
  /** - Format: uuid */
  userId?: string;
  walletType?: UserWalletType;
}

export interface DivideEpayRequestShareInfoRequestVM {
  /** - Format: double */
  dividerAmount?: number;
  /** - Format: double */
  userAmount?: number;
  userApiKey?: string;
  userEmail?: string;
  userMobile?: string;
  userShareNumber?: string;
}

export type DocumentContentType =
  | "Other"
  | "UserBankVerification"
  | "IdentityCard"
  | "BusinessStatute"
  | "BusinessLatestChangesAnnouncement"
  | "BusinessOwnersIdentityCards"
  | "BusinessOwnersBirthCertificates";

export interface DocumentFileRequestVM {
  fileType?: DocumentType;
  /** - Format: uuid */
  fileUniqueId?: string;
}

export interface DocumentRequestVM {
  documentContentType?: DocumentContentType;
  /** - Format: uuid */
  fileUniqueId?: string;
}

export type DocumentType =
  | "Unknown"
  | "NationalCard"
  | "BirthCertificate"
  | "Passport"
  | "VerificationLetter";

export interface DomainCurrencyClassResponseVM {
  /** - Format: int32 */
  domainId?: number;
  /** - Format: double */
  feeRate?: number;
  /** - Format: int32 */
  id?: number;
  name?: string;
}

export interface DomainCurrencyResponseVM {
  domainMoneyNetworks?: DomainMoneyNetworkResponseVM[];
  name?: string;
  symbol?: string;
  type?: CurrencyType;
}

export interface DomainMoneyNetworkResponseVM {
  /** - Format: double */
  depositFee?: number;
  /** - Format: double */
  maximumWithdraw?: number;
  /** - Format: double */
  minimumWithdraw?: number;
  name?: string;
  symbol?: string;
  /** - Format: double */
  withdrawFee?: number;
}

export interface DomainSettingVM {
  defaultCryptoCurrencySymbol?: string;
  defaultFiatCurrencySymbol?: string;
  /** - Format: double */
  minimumValueForHideSmallBalance?: number;
}

export interface DomainTraderLevelResponseVM {
  /** - Format: double */
  cryptoMakerFeePercent?: number;
  /** - Format: double */
  cryptoTakerFeePercent?: number;
  /** - Format: double */
  fiatMakerFeePercent?: number;
  /** - Format: double */
  fiatTakerFeePercent?: number;
  /** - Format: int32 */
  levelIndex?: number;
  name?: string;
  /** - Format: double */
  tradeDefaultCryptoVolumeFrom?: number;
  /** - Format: double */
  tradeDefaultCryptoVolumeTo?: number;
}

export interface EPayRequestAudienceRequestVM {
  contact?: string;
  contactType?: UserIdentifierType;
  fullName?: string;
}

export interface EPayRequestAudienceResponseVM {
  contact?: string;
  contactType?: UserIdentifierType;
  fullName?: string;
}

export interface EPayRequestReceiptInfoResponseVM {
  /** - Format: double */
  amount?: number;
  blockchainDepositInfos?: BlockchainDepositInfoResponseVM[];
  cardNumber?: string;
  currencySymbol?: string;
  description?: string;
  epayRequestGatewayType?: EpayRequestGatewayType;
  epayRequestStatus?: EpayRequestStatus;
  epayRequestType?: EpayRequestType;
  /** - Format: date-time */
  payDate?: string;
  payTo?: UserWalletInfoResponseVM[];
  payViaOtherCurrency?: boolean;
  /** - Format: double */
  payerAmount?: number;
  payerCurrencySymbol?: string;
  referenceNumber?: string;
}

export interface EPayRequestSingleResponseVM {
  /** - Format: double */
  amount?: number;
  /** - Format: uuid */
  assignedToUserId?: string;
  assignedUserDisplayName?: string;
  audiences?: EPayRequestAudienceResponseVM[];
  /** - Format: date-time */
  createDate?: string;
  currencySymbol?: string;
  customDatas?: EpayRequestCustomDataResponseVM[];
  description?: string;
  epayRequestActualState?: EpayRequestActualState;
  epayRequestType?: EpayRequestType;
  /** - Format: date-time */
  expireDate?: string;
  /** - Format: int64 */
  id?: number;
  ownerDisplayName?: string;
  /** - Format: date-time */
  payDate?: string;
  payerDisplayName?: string;
  /** - Format: double */
  requestedAmount?: number;
  token?: string;
}

export interface EpayPayWithWalletRequestVM {
  description?: string;
  token?: string;
  walletNumber?: string;
}

export type EpayRequestActualState =
  | "Initiated"
  | "Paid"
  | "Cancelled"
  | "Expired";

export interface EpayRequestCountResponseVM {
  epayRequestActualState?: EpayRequestActualState;
  /** - Format: int64 */
  totalCount?: number;
}

export interface EpayRequestCustomDataInfoResponseVM {
  fieldType?: FieldDisplayType;
  isEditable?: boolean;
  key?: string;
  listValues?: string;
  value?: string;
}

export interface EpayRequestCustomDataRequestVM {
  key?: string;
  value?: string;
}

export interface EpayRequestCustomDataResponseVM {
  key?: string;
  value?: string;
}

export type EpayRequestGatewayType = "RialShaparak" | "BlockchainAddress";

export interface EpayRequestInfoResponseVM {
  /** - Format: double */
  amount?: number;
  assignedToAnonymous?: string;
  /** - Format: uuid */
  assignedToUserId?: string;
  assignedUserDisplayName?: string;
  audiences?: EPayRequestAudienceResponseVM[];
  cardNumber?: string;
  clientUniqueId?: string;
  /** - Format: double */
  commissionAmount?: number;
  /** - Format: date-time */
  createDate?: string;
  currencySymbol?: string;
  description?: string;
  epayRequestCustomDataInfos?: EpayRequestCustomDataInfoResponseVM[];
  epayRequestGatewayType?: EpayRequestGatewayType;
  epayRequestType?: EpayRequestType;
  /** - Format: date-time */
  expireDate?: string;
  getComissionFromPayer?: boolean;
  /** - Format: date-time */
  payDate?: string;
  payTo?: UserWalletInfoResponseVM[];
  payViaOtherCurrency?: boolean;
  /** - Format: double */
  payerAmount?: number;
  payerCurrencySymbol?: string;
  payerDisplayName?: string;
  pluginKey?: string;
  postActionInfo?: BasePostActionInfoResponseVM;
  referenceNumber?: string;
  /** - Format: double */
  requestedAmount?: number;
  status?: EpayRequestActualState;
  token?: string;
  /** - Format: int64 */
  voucherId?: number;
}

export interface EpayRequestListResponseVM {
  /** - Format: int64 */
  count?: number;
  list?: EPayRequestSingleResponseVM[];
}

export type EpayRequestOwnerType = "CreatedByMe" | "AssignedToMe";

export interface EpayRequestResponseVM {
  paymentLink?: string;
  token?: string;
}

export type EpayRequestStatus =
  | "Pending"
  | "Paid"
  | "Cancelled"
  | "Expired"
  | "PartiallyPaid"
  | "PartiallyPaidThenCancelled"
  | "PartiallyPaidThenExpired";

export type EpayRequestType =
  | "Link"
  | "POS"
  | "DivideIpg"
  | "DivideIpgWithBlock"
  | "Charge"
  | "IPG"
  | "DivideLink"
  | "DivideLinkWithBlock";

export interface ExceptionDetails {
  field?: string;
  message?: string;
  /** - Format: int32 */
  statusCode?: number;
}

export type FieldDisplayType =
  | "String"
  | "Text"
  | "Currency"
  | "Integer"
  | "Float"
  | "Boolean"
  | "List";

export interface FindUserWalletResponseVM {
  currencySymbol?: string;
  /** - Format: uuid */
  profileImageFileUniqueId?: string;
  userDisplayName?: string;
  walletNumber?: string;
}

export interface ForgotPasswordRequestVM {
  otpCode?: string;
  password?: string;
  phoneNumber?: string;
  secureToken?: string;
  totpCode?: string;
}

export interface GetAnalyticsV1PrivateResellercommissionhistoryActiveusercountQueryParams {
  /** - Format: date-time */
  endDate?: string;
  /** - Format: date-time */
  startDate?: string;
}

export interface GetAnalyticsV1PrivateResellercommissionhistoryNewusercountQueryParams {
  /** - Format: date-time */
  endDate?: string;
  /** - Format: date-time */
  startDate?: string;
}

export interface GetAnalyticsV1PrivateResellercommissionhistoryTotalincomeQueryParams {
  /** - Format: date-time */
  endDate?: string;
  /** - Format: date-time */
  startDate?: string;
}

export interface GetAnalyticsV1PrivateResellercommissionhistoryTransactioncountQueryParams {
  /** - Format: date-time */
  endDate?: string;
  /** - Format: date-time */
  startDate?: string;
}

export interface GetAnalyticsV1PrivateSecurityactivityListQueryParams {
  /** - Format: int32 */
  page?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: date-time */
  startDate?: string;
  status?: SecurityStatus;
}

export interface GetAnalyticsV1PrivateTradereferralcommissionhistoryCommissionrebateListQueryParams {
  /** - Format: date-time */
  endDate?: string;
  /** - Format: int32 */
  pageNo?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: int64 */
  referralProgramId?: number;
  /** - Format: date-time */
  startDate?: string;
}

export interface GetAnalyticsV1PrivateTradereferralcommissionhistoryReferralhistoryQueryParams {
  /** - Format: int32 */
  pageNo?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: int64 */
  referralProgramId?: number;
}

export interface GetAnalyticsV1PrivateTradereferralcommissionhistoryReferralkickbackListQueryParams {
  /** - Format: date-time */
  endDate?: string;
  /** - Format: int32 */
  pageNo?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: int64 */
  referralProgramId?: number;
  /** - Format: date-time */
  startDate?: string;
}

export interface GetAnalyticsV1PrivateUserloginhistoryListQueryParams {
  /** - Format: int32 */
  pageNumber?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: date-time */
  startDate?: string;
  status?: LoginStatus;
}

export interface GetAuthV1PrivateApikeyListQueryParams {
  /** - Format: int32 */
  page?: number;
  /** - Format: int32 */
  pageSize?: number;
}

export interface GetAuthV1PrivateApikeyQueryParams {
  /** - Format: int64 */
  id?: number;
}

export interface GetAuthV1PrivateUsertrusteddeviceListQueryParams {
  /** - Format: int32 */
  Page?: number;
  /** - Format: int32 */
  PageSize?: number;
}

export interface GetAuthV1PrivateUsertrusteddeviceLoginhistoryListQueryParams {
  DeviceId?: string;
  /** - Format: int32 */
  Page?: number;
  /** - Format: int32 */
  PageSize?: number;
}

export interface GetAuthV1PublicAuthIsphonenumberregisteredQueryParams {
  phoneNumber?: string;
}

export interface GetBaseinfoV1PublicCityListQueryParams {
  active?: boolean;
  /** - Format: int32 */
  provinceId?: number;
}

export interface GetBaseinfoV1PublicCountryAllQueryParams {
  active?: boolean;
}

export interface GetBaseinfoV1PublicProvinceListQueryParams {
  active?: boolean;
  /** - Format: int32 */
  countryId?: number;
}

export interface GetCapitalV1PrivateDepositListQueryParams {
  currencySymbol?: string;
  /** - Format: date-time */
  endTime?: string;
  /** - Format: int32 */
  pageNumber?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: date-time */
  startTime?: string;
  txId?: string;
}

export interface GetCapitalV1PrivatePosListQueryParams {
  currencySymbol?: string;
  /** - Format: date-time */
  endTime?: string;
  /** - Format: int32 */
  pageNumber?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: date-time */
  startTime?: string;
}

export interface GetCapitalV1PrivateSettlementListQueryParams {
  currencySymbol?: string;
  /** - Format: date-time */
  endTime?: string;
  /** - Format: int32 */
  pageNumber?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: date-time */
  startTime?: string;
}

export interface GetCapitalV1PrivateWithdrawDetailQueryParams {
  /** - Format: int64 */
  id?: number;
}

export interface GetCapitalV1PrivateWithdrawInfoQueryParams {
  /** - Format: int64 */
  id?: number;
}

export interface GetCapitalV1PrivateWithdrawListQueryParams {
  currencySymbol?: string;
  /** - Format: date-time */
  endTime?: string;
  /** - Format: int32 */
  pageNumber?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: date-time */
  startTime?: string;
  txId?: string;
}

export interface GetDomaincurrencyfeerateV1PublicBydomaincurrencyclassidQueryParams {
  /** - Format: int32 */
  domainCurrencyClassId?: number;
}

export interface GetDomaincurrencyfeerateV1PublicBydomainidQueryParams {
  /** - Format: int32 */
  domainId?: number;
}

export interface GetEngagementV1PrivateNotificationQueryParams {
  /** - Format: date-time */
  endDate?: string;
  notificationType?: NotificationTypes;
  /** - Format: int32 */
  pageNo?: number;
  /** - Format: int32 */
  pageSize?: number;
  read?: boolean;
  /** - Format: date-time */
  startDate?: string;
}

export interface GetExchangeV1PrivateAllorderlistQueryParams {
  /** - Format: date-time */
  endTime?: string;
  /** - Format: int64 */
  fromId?: number;
  /** - Format: int32 */
  limit?: number;
  /** - Format: date-time */
  startTime?: string;
}

export interface GetExchangeV1PrivateAllordersQueryParams {
  baseCurrencySymbol?: string;
  /** - Format: date-time */
  endTime?: string;
  /** - Format: int64 */
  orderId?: number;
  orderSide?: AppOrderSide;
  orderSourceType?: AppOrderSourceType;
  /** - Format: int32 */
  pageNo?: number;
  /** - Format: int32 */
  pageSize?: number;
  quoteCurrencySymbol?: string;
  /** - Format: date-time */
  startTime?: string;
  symbol?: string;
}

export interface GetExchangeV1PrivateAlltradesQueryParams {
  baseCurrencySymbol?: string;
  commissionCurrencySymbol?: string;
  /** - Format: date-time */
  endTime?: string;
  /** - Format: int64 */
  orderId?: number;
  orderSourceType?: AppOrderSourceType;
  /** - Format: int32 */
  pageNo?: number;
  /** - Format: int32 */
  pageSize?: number;
  quoteCurrencySymbol?: string;
  side?: AppOrderSide;
  /** - Format: date-time */
  startTime?: string;
  symbol?: string;
}

export interface GetExchangeV1PrivateOpenocoorderlistQueryParams {
  request?: OpenOcoOrdersRequestVM;
}

export interface GetExchangeV1PrivateOpenordersQueryParams {
  orderSourceType?: AppOrderSourceType;
  symbol?: string;
}

export interface GetExchangeV1PrivateOrderQueryParams {
  /** - Format: int64 */
  orderId?: number;
  origClientOrderId?: string;
  symbol?: string;
}

export interface GetExchangeV1PrivateOrderlistQueryParams {
  /** - Format: int64 */
  orderListId?: number;
  origClientOrderId?: string;
}

export interface GetExchangeV1PublicDepthQueryParams {
  /** - Format: int32 */
  limit?: number;
  symbol?: string;
}

export interface GetExchangeV1PublicKlinesQueryParams {
  /** - Format: date-time */
  endTime?: string;
  interval?: KLineInterval;
  /** - Format: int32 */
  limit?: number;
  /** - Format: date-time */
  startTime?: string;
  symbol?: string;
}

export interface GetExchangeV1PublicMarketsQueryParams {
  symbol?: string;
  symbols?: string[];
}

export interface GetExchangeV1PublicTicker24hrQueryParams {
  symbol?: string;
}

export interface GetExchangeV1PublicTradesQueryParams {
  /** - Format: int32 */
  limit?: number;
  symbol?: string;
}

export interface GetOcoOrderResponseVM {
  contingencyType?: string;
  listClientOrderId?: string;
  listOrderStatus?: AppListOrderStatus;
  listStatusType?: AppListStatusType;
  /** - Format: int64 */
  orderListId?: number;
  orders?: OrderMinimalInfoResponseVM[];
  symbol?: string;
  /** - Format: date-time */
  transactionTime?: string;
}

export interface GetPartyV1PrivateFavoritemarketQueryParams {
  marketType?: MarketType;
}

export interface GetPartyV1PrivateNotificationAllQueryParams {
  notificationType?: HitoBitNotificationType;
  /** - Format: int32 */
  page?: number;
  /** - Format: int32 */
  pageSize?: number;
  readed?: boolean;
}

export interface GetPartyV1PrivatePluginListQueryParams {
  scenarioKey?: string;
}

export interface GetPartyV1PrivateUserByuserreferralprogramidQueryParams {
  /** - Format: int64 */
  userReferralProgramId?: number;
}

export interface GetPartyV1PublicPluginQueryParams {
  pluginKey?: string;
}

export interface GetPaymentV1PrivateEpayrequestCommissionQueryParams {
  /** - Format: double */
  amount?: number;
  moneyNetworkSymbol?: string;
  walletNumber?: string;
}

export interface GetPaymentV1PrivateEpayrequestCountFrommeQueryParams {
  /** - Format: date-time */
  endDate?: string;
  pluginKey?: string;
  /** - Format: date-time */
  startDate?: string;
}

export interface GetPaymentV1PrivateEpayrequestCountQueryParams {
  /** - Format: date-time */
  endDate?: string;
  pluginKey?: string;
  /** - Format: date-time */
  startDate?: string;
  walletNumber?: string;
}

export interface GetPaymentV1PrivateEpayrequestInfoClientuniqueidQueryParams {
  clientUniqueId?: string;
}

export interface GetPaymentV1PrivateEpayrequestListFrommeQueryParams {
  /** - Format: date-time */
  endDate?: string;
  epayRequestActualStates?: EpayRequestActualState[];
  /** - Format: int32 */
  pageNo?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: date-time */
  startDate?: string;
}

export interface GetPaymentV1PrivateEpayrequestListQueryParams {
  assignedToUserIds?: string[];
  /** - Format: date-time */
  endDate?: string;
  epayRequestActualStates?: EpayRequestActualState[];
  ownerType?: EpayRequestOwnerType;
  /** - Format: int32 */
  pageNo?: number;
  /** - Format: int32 */
  pageSize?: number;
  pluginKey?: string;
  pluginProperties?: PluginPropertyRequestVM[];
  /** - Format: date-time */
  startDate?: string;
  walletNumbers?: string[];
}

export interface GetPaymentV1PrivateEpayrequestPluginCountQueryParams {
  /** - Format: date-time */
  endDate?: string;
  pluginKey?: string;
  pluginPropertyKey?: string;
  pluginPropertyValue?: string;
  /** - Format: date-time */
  startDate?: string;
  walletNumber?: string;
}

export interface GetPaymentV1PublicEpayrequestGetblockchainaddressQueryParams {
  /** - Format: int32 */
  currencyId?: number;
  /** - Format: int64 */
  ePayRequestId?: number;
  /** - Format: int32 */
  moneyNetworkId?: number;
}

export interface GetPaymentV1PublicEpayrequestInfoTokenQueryParams {
  token?: string;
}

export interface GetPaymentV1PublicEpayrequestReceiptinfoClientuniqueidQueryParams {
  clientUniqueId?: string;
}

export interface GetPaymentV1PublicEpayrequestReceiptinfoTokenQueryParams {
  token?: string;
}

export interface GetSettlementV1PrivateAddressbookQueryParams {
  /** - Format: int64 */
  id?: number;
}

export interface GetSettlementV1PrivateCommissionQueryParams {
  /** - Format: double */
  amount?: number;
  moneyNetworkSymbol?: string;
  walletNumber?: string;
}

export interface GetSettlementV1PrivateCountQueryParams {
  /** - Format: int32 */
  fromMonth?: number;
  /** - Format: int32 */
  fromYear?: number;
  isAuto?: boolean;
  /** - Format: int32 */
  month?: number;
  status?: SettlementRequestStatus;
  /** - Format: int32 */
  takeDays?: number;
  /** - Format: int32 */
  takeMonths?: number;
  /** - Format: int32 */
  takeYears?: number;
  /** - Format: int32 */
  toMonth?: number;
  /** - Format: int32 */
  toYear?: number;
  /** - Format: int64 */
  userBankId?: number;
  walletNumber?: string;
  /** - Format: int32 */
  year?: number;
}

export interface GetSettlementV1PrivateListQueryParams {
  /** - Format: date-time */
  EndDate?: string;
  IsAuto?: boolean;
  /** - Format: double */
  MaximumAmount?: number;
  /** - Format: double */
  MinimumAmount?: number;
  /** - Format: int32 */
  PageNo?: number;
  /** - Format: int32 */
  PageSize?: number;
  /** - Format: date-time */
  StartDate?: string;
  States?: SettlementRequestStatus[];
  UserBankIds?: number[];
  WalletNumbers?: string[];
}

export interface GetSettlementV1PrivateQueryParams {
  /** - Format: int64 */
  settelmentRequestId?: number;
}

export interface GetSettlementV1PrivateReportQueryParams {
  /** - Format: int32 */
  fromMonth?: number;
  /** - Format: int32 */
  fromYear?: number;
  isAuto?: boolean;
  /** - Format: int32 */
  month?: number;
  status?: SettlementRequestStatus;
  /** - Format: int32 */
  takeDays?: number;
  /** - Format: int32 */
  takeMonths?: number;
  /** - Format: int32 */
  takeYears?: number;
  /** - Format: int32 */
  toMonth?: number;
  /** - Format: int32 */
  toYear?: number;
  /** - Format: int64 */
  userBankId?: number;
  walletNumber?: string;
  /** - Format: int32 */
  year?: number;
}

export interface GetSettlementV1PrivateSubuserQueryParams {
  /** - Format: int64 */
  ConnectionId?: number;
  /** - Format: date-time */
  EndDate?: string;
  IsAuto?: boolean;
  /** - Format: double */
  MaximumAmount?: number;
  /** - Format: double */
  MinimumAmount?: number;
  /** - Format: int32 */
  PageNo?: number;
  /** - Format: int32 */
  PageSize?: number;
  /** - Format: date-time */
  StartDate?: string;
  States?: SettlementRequestStatus[];
  UserBankIds?: number[];
  WalletNumbers?: string[];
}

export interface GetStorageV1PrivateFileDownloadQueryParams {
  /** - Format: uuid */
  fileUniqueId?: string;
}

export interface GetWalletV1PrivateGrouptransferCommissionQueryParams {
  /** - Format: double */
  amount?: number;
  moneyNetworkSymbol?: string;
  walletNumber?: string;
}

export interface GetWalletV1PrivateInternalwithdrawInfoQueryParams {
  /** - Format: int64 */
  internalWithdrawId?: number;
}

export interface GetWalletV1PrivateQueryParams {
  walletNumber?: string;
}

export interface GetWalletV1PrivateSubuserAllQueryParams {
  walletNumber?: string;
}

export interface GetWalletV1PrivateSubuserAssignableQueryParams {
  walletNumber?: string;
}

export interface GetWalletV1PrivateTransferCommissionQueryParams {
  /** - Format: double */
  amount?: number;
  moneyNetworkSymbol?: string;
  walletNumber?: string;
}

export interface GetWalletV1PrivateUserassetSpotDefaultQueryParams {
  symbol?: string;
}

export interface GetWalletV1PrivateUserbankStatusQueryParams {
  accountNo?: string;
}

export interface GetWalletV1PublicFindQueryParams {
  currencySymbol?: string;
  /** - Format: int64 */
  customerNumber?: number;
  email?: string;
  phoneNumber?: string;
  walletNumber?: string;
}

export interface GetWithdrawRequestUserWalletItemResponseVM {
  /** - Format: date-time */
  createDate?: string;
  currencySymbol?: string;
  destinationBlockchainAddress?: string;
  moneyNetworkSymbol?: string;
  /** - Format: double */
  requestAmount?: number;
  /** - Format: uuid */
  submitUniqueId?: string;
  withdrawRequestStatus?: WithdrawRequestStatus;
}

export interface GlobalWalletProviderResponseVM {
  globalWalletProviderType?: GlobalWalletProviderType;
  /** - Format: int32 */
  id?: number;
  name?: string;
}

export type GlobalWalletProviderType = "Exchange" | "Wallet";

export type GrantType =
  | "Password"
  | "RefreshToken"
  | "Otp"
  | "MFA"
  | "Implicit"
  | "Hybrid"
  | "AuthorizationCode"
  | "ClientCredentials"
  | "DeviceFlow";

export interface GroupTransferMoneyRequestVM {
  description?: string;
  targets?: GroupTransferMoneyTargetRequestVM[];
  walletNumber?: string;
}

export interface GroupTransferMoneyTargetRequestVM {
  /** - Format: double */
  amount?: number;
  description?: string;
  identifier?: string;
}

export interface GroupTransferResponseVM {
  /** - Format: double */
  amount?: number;
  /** - Format: date-time */
  createDate?: string;
  description?: string;
  targets?: GroupTransferTargetInfoResponseVM[];
  userDisplayName?: string;
  /** - Format: int64 */
  voucherId?: number;
  walletName?: string;
}

export interface GroupTransferTargetInfoResponseVM {
  /** - Format: int64 */
  accountId?: number;
  /** - Format: double */
  amount?: number;
  /** - Format: int32 */
  currencyId?: number;
  description?: string;
  /** - Format: int32 */
  domainId?: number;
  userDisplayName?: string;
  /** - Format: uuid */
  userId?: string;
  userPhoneNumber?: string;
  walletName?: string;
  walletNumber?: string;
}

export type HitoBitNotificationType =
  | "Activities"
  | "TradeNotification"
  | "HitoBitNews"
  | "SystemMessages";

export interface HitoBitSymbolFilter {
  filterType?: SymbolFilterType;
}

export type IdentificationLevel =
  | "None"
  | "Zero"
  | "One"
  | "Two"
  | "Three"
  | "Four";

export interface IdentificationLevelGuideResponseVM {
  cryptoDepositAbility?: boolean;
  cryptoTradeAbility?: boolean;
  cryptoWithdrawAbility?: boolean;
  /** - Format: double */
  dailyCryptoWithdrawAmount?: number;
  /** - Format: double */
  dailyFiatDepositAmount?: number;
  /** - Format: double */
  dailyFiatWithdrawAmount?: number;
  fiatDepositAbility?: boolean;
  fiatTradeAbility?: boolean;
  fiatWithdrawAbility?: boolean;
  level?: IdentificationLevel;
  unlimitedFiatDepositAbility?: boolean;
  userBasedCryptoWithdrawAbility?: boolean;
  userBasedFiatWithdrawAbility?: boolean;
}

export type IdentificationLevelRequestStatus = "Pending" | "Confirm" | "Reject";

export type IdentityStatus =
  | "None"
  | "WatingForCheck"
  | "Checking"
  | "EditingRequired"
  | "Approved"
  | "Rejected";

export interface InternalWithdrawResponseVM {
  /** - Format: double */
  amount?: number;
  /** - Format: double */
  comission?: number;
  /** - Format: date-time */
  createDate?: string;
  /** - Format: int32 */
  currencyId?: number;
  currencySymbol?: string;
  /** - Format: int32 */
  domainId?: number;
  /** - Format: int64 */
  epayRequestId?: number;
  paidToUserDisplayName?: string;
  /** - Format: uuid */
  paidToUserId?: string;
  /** - Format: int64 */
  paidToUserWalletId?: number;
  paidToUserWalletName?: string;
  paidToUserWalletNumber?: string;
  /** - Format: uuid */
  userId?: string;
  /** - Format: int64 */
  userWalletId?: number;
  userWalletName?: string;
  userWalletNumber?: string;
  /** - Format: int64 */
  voucherId?: number;
  /** - Format: int64 */
  withdrawRequestUserWalletId?: number;
}

export type KLineInterval =
  | "OneMinute"
  | "ThreeMinutes"
  | "FiveMinutes"
  | "FifteenMinutes"
  | "ThirtyMinutes"
  | "OneHour"
  | "TwoHour"
  | "FourHour"
  | "SixHour"
  | "EightHour"
  | "TwelveHour"
  | "OneDay"
  | "ThreeDay"
  | "OneWeek"
  | "OneMonth";

export interface KlineDataResponseVM {
  /** - Format: double */
  baseVolume?: number;
  /** - Format: double */
  close?: number;
  /** - Format: date-time */
  closeTime?: string;
  /** - Format: double */
  high?: number;
  /** - Format: double */
  ignore?: number;
  /** - Format: double */
  low?: number;
  /** - Format: double */
  open?: number;
  /** - Format: date-time */
  openTime?: string;
  /** - Format: double */
  quoteVolume?: number;
  /** - Format: double */
  takerBuyBaseVolume?: number;
  /** - Format: double */
  takerBuyQuoteVolume?: number;
  /** - Format: int64 */
  tradeCount?: number;
}

export type LogicalActionType =
  | "EpayRequest"
  | "TransferMoney"
  | "WalletCharge"
  | "ServiceBill"
  | "ServiceMobileCharge"
  | "POS"
  | "ShareAndBlockRequest"
  | "ShareRequest"
  | "Settlement"
  | "GroupTransferMoney"
  | "UnblockMoney"
  | "Gift"
  | "TaxiFarePayment"
  | "Withdraw"
  | "IPG"
  | "InternalTrade"
  | "ResellerIncome"
  | "PspTransaction"
  | "ExternalTrade"
  | "ExternalManualTrade";

export interface LoginModelRequestVM {
  clientId?: string;
  clientSecret?: string;
  grantType?: GrantType;
  otpCode?: string;
  otpToken?: string;
  password?: string;
  refreshToken?: string;
  totpCode?: string;
  username?: string;
}

export type LoginStatus = "Completed" | "Failed";

export interface MarketRateLimitRsponseVM {
  interval?: RateLimitInterval;
  /** - Format: int32 */
  intervalNumber?: number;
  /** - Format: int32 */
  limit?: number;
  type?: RateLimitType;
}

export interface MarketResponseVM {
  exchangeFilters?: any[];
  rateLimits?: MarketRateLimitRsponseVM[];
  /** - Format: date-time */
  serverTime?: string;
  symbols?: MarketSymbolResponseVM[];
  timeZone?: string;
}

export interface MarketSymbolResponseVM {
  baseAsset?: string;
  /** - Format: int32 */
  baseAssetPrecision?: number;
  /** - Format: int32 */
  baseCommissionPrecision?: number;
  filters?: HitoBitSymbolFilter[];
  iceBergAllowed?: boolean;
  isMarginTradingAllowed?: boolean;
  isSpotTradingAllowed?: boolean;
  name?: string;
  ocoAllowed?: boolean;
  orderTypes?: AppOrderType[];
  permissions?: AccountType[];
  quoteAsset?: string;
  /** - Format: int32 */
  quoteAssetPrecision?: number;
  /** - Format: int32 */
  quoteCommissionPrecision?: number;
  quoteOrderQuantityMarketAllowed?: boolean;
  status?: SymbolStatus;
}

export interface MarketTickerPriceResponseVM {
  /** - Format: double */
  askPrice?: number;
  /** - Format: double */
  askQuantity?: number;
  baseCurrencySymbol?: string;
  /** - Format: double */
  baseVolume?: number;
  /** - Format: double */
  bidPrice?: number;
  /** - Format: double */
  bidQuantity?: number;
  /** - Format: date-time */
  closeTime?: string;
  /** - Format: int64 */
  firstTradeId?: number;
  /** - Format: double */
  highPrice?: number;
  isHighlight?: boolean;
  /** - Format: date-time */
  lastMarketInfoChangeDate?: string;
  /** - Format: double */
  lastPrice?: number;
  /** - Format: double */
  lastQuantity?: number;
  /** - Format: int64 */
  lastTradeId?: number;
  /** - Format: double */
  lowPrice?: number;
  /** - Format: double */
  openPrice?: number;
  /** - Format: date-time */
  openTime?: string;
  /** - Format: double */
  prevDayClosePrice?: number;
  /** - Format: double */
  priceChange?: number;
  /** - Format: double */
  priceChangePercent?: number;
  quoteCurrencySymbol?: string;
  /** - Format: double */
  quoteVolume?: number;
  smartTradeEngine?: boolean;
  symbol?: string;
  /** - Format: date-time */
  symbolPublicOfferingDate?: string;
  /** - Format: double */
  totalTrades?: number;
  /** - Format: double */
  weightedAveragePrice?: number;
}

export type MarketType = "Spot" | "Futures";

export interface MoneyNetworkResponseVM {
  addressRegex?: string;
  addressUrl?: string;
  /** - Format: int32 */
  estimatedArrivalTime?: number;
  isTag?: boolean;
  memoRegex?: string;
  name?: string;
  symbol?: string;
  txUrl?: string;
}

export interface NewEmailRequestVM {
  email?: string;
  emailOtpCode?: string;
  emailOtpToken?: string;
  mobileOtpCode?: string;
  mobileOtpToken?: string;
  totpCode?: string;
}

export interface Notification2ListResponseVM {
  /** - Format: int64 */
  count?: number;
  list?: Notification2ResponseVM[];
}

export interface Notification2ResponseVM {
  /** - Format: date-time */
  createDate?: string;
  /** - Format: int64 */
  id?: number;
  level?: NotificationLevel;
  message?: string;
  read?: boolean;
  /** - Format: date-time */
  readDate?: string;
  subject?: string;
  type?: NotificationTypes;
  /** - Format: uuid */
  userId?: string;
}

export interface NotificationCountByTypeResponseVM {
  /** - Format: int64 */
  count?: number;
  notificationType?: NotificationTypes;
}

export type NotificationLevel =
  | "Unknown"
  | "Default"
  | "Success"
  | "Info"
  | "Warning"
  | "Danger";

export interface NotificationListResponseVM {
  /** - Format: int64 */
  count?: number;
  notifications?: NotificationResponseVM[];
}

export type NotificationModelType =
  | "Default"
  | "EPayRequestUnpaid"
  | "EPayRequestPaid"
  | "UserIdentityUnknown"
  | "UserIdentityApproved"
  | "UserIdentityRejected"
  | "UpgradeToBusinessApproved"
  | "UpgradeToBusinessRejected"
  | "UserBankApproved"
  | "UserBankRejected"
  | "SubUserConnectionCreated"
  | "SubUserInvitationRejected"
  | "SubUserInvitationSent"
  | "MoneyDeposit"
  | "MoneyWithdrawal"
  | "SubUserDisconnectedByBusiness"
  | "SubUserDisconnectedBySubUser"
  | "Activities"
  | "TradeNotification"
  | "HitoBitNews"
  | "SystemMessages";

export interface NotificationResponseVM {
  closeable?: boolean;
  /** - Format: date-time */
  createTimeUtc?: string;
  data?: string;
  dataId?: string;
  dismissible?: boolean;
  /** - Format: int32 */
  id?: number;
  /** - Format: date-time */
  lastFetchTimeUtc?: string;
  level?: NotificationLevel;
  readed?: boolean;
  text?: string;
  title?: string;
  type?: NotificationModelType;
}

export type NotificationTypes = "Activity" | "Trade" | "News" | "System";

export interface NotificationTypesReadCountResponseVM {
  /** - Format: int32 */
  count?: number;
  notificationModelType?: HitoBitNotificationType;
}

export interface OcoOrderResultInfoResponseVM {
  contingencyType?: string;
  listClientOrderId?: string;
  listOrderStatus?: AppListOrderStatus;
  listStatusType?: AppListStatusType;
  /** - Format: int64 */
  orderListId?: number;
  orders?: OrderMinimalInfoResponseVM[];
  symbol?: string;
  /** - Format: date-time */
  transactionTime?: string;
}

export type OpenOcoOrdersRequestVM = { [x in string | number]: any };

export interface OrderAckInfoResponseVM {
  clientOrderId?: string;
  /** - Format: int64 */
  orderId?: number;
  /** - Format: int64 */
  orderListId?: number;
  symbol?: string;
  /** - Format: date-time */
  transactTime?: string;
}

export interface OrderBookResponseVM {
  asks?: number[][];
  bids?: number[][];
  /** - Format: int64 */
  firstUpdateId?: number;
  /** - Format: int64 */
  lastUpdateId?: number;
  /** - Format: int64 */
  lastUpdateIdStream?: number;
  symbol?: string;
  /** - Format: date-time */
  transactionTime?: string;
}

export interface OrderFullInfoResponseVM {
  baseCurrencySymbol?: string;
  clientOrderId?: string;
  /** - Format: double */
  cummulativeQuoteQty?: number;
  /** - Format: double */
  executedQty?: number;
  fills?: OrderTradeResponseVM[];
  /** - Format: int64 */
  orderId?: number;
  /** - Format: int64 */
  orderListId?: number;
  /** - Format: double */
  origQty?: number;
  /** - Format: double */
  origQuoteOrderQty?: number;
  /** - Format: double */
  price?: number;
  quoteCurrencySymbol?: string;
  side?: AppOrderSide;
  status?: AppOrderStatus;
  /** - Format: double */
  stopPrice?: number;
  symbol?: string;
  timeInForce?: AppTimeInForce;
  /** - Format: date-time */
  transactTime?: string;
  type?: AppOrderType;
}

export interface OrderMinimalInfoResponseVM {
  clientOrderId?: string;
  /** - Format: int64 */
  orderId?: number;
  symbol?: string;
}

export type OrderResponseType = "ACK" | "RESULT" | "FULL";

export interface OrderResultInfoListResponseVM {
  /** - Format: int64 */
  count?: number;
  list?: OrderResultInfoResponseVM[];
}

export interface OrderResultInfoResponseVM {
  baseCurrencySymbol?: string;
  clientOrderId?: string;
  /** - Format: double */
  cummulativeQuoteQty?: number;
  /** - Format: double */
  executedQty?: number;
  /** - Format: int64 */
  orderId?: number;
  /** - Format: int64 */
  orderListId?: number;
  /** - Format: double */
  origQty?: number;
  /** - Format: double */
  origQuoteOrderQty?: number;
  /** - Format: double */
  price?: number;
  quoteCurrencySymbol?: string;
  side?: AppOrderSide;
  status?: AppOrderStatus;
  /** - Format: double */
  stopPrice?: number;
  symbol?: string;
  timeInForce?: AppTimeInForce;
  /** - Format: date-time */
  transactTime?: string;
  type?: AppOrderType;
}

export interface OrderTradeResponseVM {
  /** - Format: double */
  commission?: number;
  commissionAsset?: string;
  /** - Format: double */
  price?: number;
  /** - Format: double */
  qty?: number;
  /** - Format: int64 */
  tradeId?: number;
}

export interface POSTransactionHistoryListResponseVM {
  /** - Format: int64 */
  count?: number;
  list?: POSTransactionHistoryResponseVM[];
}

export interface POSTransactionHistoryResponseVM {
  /** - Format: date-time */
  createDate?: string;
  currencySymbol?: string;
  description?: string;
  /** - Format: int64 */
  id?: number;
  moneyNetworkSymbol?: string;
  transferAmount?: string;
  transferType?: TransferType;
  /** - Format: uuid */
  userId?: string;
  userWalletAccountNumber?: string;
  walletType?: UserWalletType;
}

export interface PayerCurrencyRequestVM {
  /** - Format: int32 */
  currencyId?: number;
  /** - Format: int32 */
  moneyNetworkId?: number;
  token?: string;
}

export interface PermissionRequestVM {
  /** - Format: int64 */
  connectionId?: number;
  isEnabled?: boolean;
  permissionType?: SubUserPermissionType;
  walletNumber?: string;
}

export interface PlaceOcoOrderRequestVM {
  limitClientOrderId?: string;
  /** - Format: double */
  limitIcebergQty?: number;
  listClientOrderId?: string;
  newOrderRespType?: OrderResponseType;
  /** - Format: double */
  price?: number;
  /** - Format: double */
  quantity?: number;
  side?: AppOrderSide;
  stopClientOrderId?: string;
  /** - Format: double */
  stopIcebergQty?: number;
  /** - Format: double */
  stopLimitPrice?: number;
  stopLimitTimeInForce?: AppTimeInForce;
  /** - Format: double */
  stopPrice?: number;
  symbol?: string;
  /** - Format: int64 */
  trailingDelta?: number;
}

export interface PlaceOrderRequestVM {
  /** - Format: double */
  icebergQty?: number;
  newClientOrderId?: string;
  orderResponseType?: OrderResponseType;
  orderSourceType?: AppOrderSourceType;
  /** - Format: double */
  price?: number;
  /** - Format: double */
  quantity?: number;
  /** - Format: double */
  quoteOrderQty?: number;
  side?: AppOrderSide;
  /** - Format: double */
  stopPrice?: number;
  symbol?: string;
  timeInForce?: AppTimeInForce;
  type?: AppOrderType;
}

export type PlatformType =
  | "Unknown"
  | "Server"
  | "Android"
  | "iOS"
  | "Device"
  | "Browser"
  | "PWA"
  | "Web"
  | "Windows"
  | "Linux"
  | "macOS"
  | "Desktop";

export interface PluginInfoResponseVM {
  amountCalculationExpression?: string;
  /** - Format: int32 */
  id?: number;
  /** - Format: uuid */
  logoFileUniqueId?: string;
  name?: string;
  pluginProperties?: PluginPropertyResponseVM[];
}

export interface PluginPropertyRequestVM {
  key?: string;
  value?: string;
}

export interface PluginPropertyResponseVM {
  description?: string;
  fieldType?: FieldDisplayType;
  isCreatable?: boolean;
  isListable?: boolean;
  isRequired?: boolean;
  isSearchable?: boolean;
  listValues?: string;
  name?: string;
  /** - Format: int32 */
  order?: number;
  title?: string;
}

export type PostActionNature =
  | "EPayRequest"
  | "PlaceMarketBuyOrder"
  | "TaskCenter";

export type PostActionStatus = "Initiate" | "Success" | "Fail";

export interface PostAuthV1PrivateAuthEmailSendcodeQueryParams {
  email?: string;
}

export interface PostAuthV1PrivateAuthPhonecallSendcodeQueryParams {
  phoneNumber?: string;
}

export interface PostAuthV1PublicAuthChecktwofactorisenableQueryParams {
  phoneNumber?: string;
}

export interface PostAuthV1PublicAuthGetcodeQueryParams {
  phoneNumber?: string;
}

export interface PostPaymentV1PrivateEpayrequestUnblockQueryParams {
  /** - Format: int64 */
  ePayRequestId?: number;
}

export interface PostPaymentV1PublicEpayrequestSmsResendQueryParams {
  token?: string;
}

export interface PreferenceUserSettingRequestVM {
  activities?: boolean;
  autoBorrowRepayForMargin?: boolean;
  limitOrder?: boolean;
  marketOrder?: boolean;
  stopLimitOrder?: boolean;
  systemMessages?: boolean;
  tradeNotification?: boolean;
}

export interface ProvinceResponseVM {
  /** - Format: int32 */
  countryId?: number;
  /** - Format: int32 */
  id?: number;
  title?: string;
}

export type PurposeType =
  | "None"
  | "Login"
  | "ForgotPassword"
  | "ChangePassword"
  | "EnableMFA"
  | "DisableMFA"
  | "CreateApiKey"
  | "EditApiKey"
  | "DeleteApiKey"
  | "AddWhiteAdress"
  | "DeleteWhiteAdress"
  | "Withdraw"
  | "Register"
  | "PhoneCode"
  | "NewEmail"
  | "Email";

export interface PutEngagementV1PrivateNotificationReadallQueryParams {
  type?: NotificationTypes;
}

export interface PutPaymentV1PublicEpayrequestCancelQueryParams {
  token?: string;
}

export interface PutWalletV1PrivateUserreferralprogramDefaultQueryParams {
  /** - Format: int64 */
  userReferralProgramId?: number;
}

export interface PuzzleModelResponseVM {
  backgroundImage?: string;
  id?: string;
  missingPieceImage?: string;
  /** - Format: int32 */
  y?: number;
}

export interface PuzzleSubmissionRequestVM {
  id?: string;
  /** - Format: int32 */
  x?: number;
}

export interface QrCodeResponseVM {
  authenticatorKey?: string;
  qrCodeUrl?: string;
}

export type RateLimitInterval = "Second" | "Minute" | "Day";

export type RateLimitType = "REQUEST_WEIGHT" | "ORDERS" | "RAW_REQUESTS";

export interface RecentTradeResponseVM {
  /** - Format: double */
  baseQuantity?: number;
  buyerIsMaker?: boolean;
  isBestMatch?: boolean;
  /** - Format: int64 */
  orderId?: number;
  /** - Format: double */
  price?: number;
  /** - Format: double */
  quoteQuantity?: number;
  smartTradeEngine?: boolean;
  /** - Format: date-time */
  tradeTime?: string;
}

export type RedirectType = "None" | "Redirect" | "RedirectWithPost";

export interface RegisterRequestVM {
  password?: string;
  phoneNumber?: string;
  /** - Format: int64 */
  referralProgramCode?: number;
}

export interface RegisterResponseVM {
  token?: string;
  /** - Format: uuid */
  userId?: string;
}

export interface RemoveEmailRequestVM {
  emailOtpCode?: string;
  emailOtpToken?: string;
  mobileOtpCode?: string;
  mobileOtpToken?: string;
  totpCode?: string;
}

export interface ReportResultResponseVM {
  /** - Format: int32 */
  count?: number;
  /** - Format: int32 */
  day?: number;
  dayName?: string;
  /** - Format: int32 */
  dayOfWeek?: number;
  /** - Format: int32 */
  key?: number;
  label?: string;
  /** - Format: int32 */
  month?: number;
  monthName?: string;
  /** - Format: double */
  sum?: number;
  /** - Format: int32 */
  year?: number;
  yearShort?: string;
}

export interface Response400 {
  errors?: ExceptionDetails[];
  message?: string;
}

export interface Response500 {
  errors?: ExceptionDetails[];
  message?: string;
}

export interface RevokeTokenRequestVM {
  /** - Format: uuid */
  clientId?: string;
  clientSecret?: string;
  revokeTokenHint?: string;
  token?: string;
}

export interface SecurityActivityListVM {
  /** - Format: int64 */
  count?: number;
  list?: SecurityActivityVM[];
}

export type SecurityActivityType =
  | "Login"
  | "ChangePassword"
  | "EnableToFA"
  | "DisableToFA"
  | "NewDevice"
  | "EnabledGoogleAuthentication"
  | "DisbaledGoogleAuthentication";

export interface SecurityActivityVM {
  activity?: SecurityActivityType;
  /** - Format: date-time */
  createDate?: string;
  /** - Format: int64 */
  id?: number;
  ipAddress?: string;
  platform?: string;
  status?: SecurityStatus;
  /** - Format: uuid */
  userId?: string;
}

export type SecurityStatus = "Completed" | "Failed";

export interface SettlementExcelResponseVM {
  accountName?: string;
  accountNumber?: string;
  automaticSettlement?: boolean;
  /** - Format: double */
  commissionAmount?: number;
  /** - Format: date-time */
  createDate?: string;
  /** - Format: double */
  requestAmount?: number;
  status?: SettlementRequestStatus;
  statusDisplay?: string;
  /** - Format: int64 */
  userWalletId?: number;
}

export interface SettlementFilterRequestVM {
  /** - Format: date-time */
  endDate?: string;
  isAuto?: boolean;
  /** - Format: double */
  maximumAmount?: number;
  /** - Format: double */
  minimumAmount?: number;
  /** - Format: int32 */
  pageNo?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: date-time */
  startDate?: string;
  states?: SettlementRequestStatus[];
  userBankIds?: number[];
  walletNumbers?: string[];
}

export interface SettlementRequestInfoListResponseVM {
  settlementRequests?: SettlementRequestInfoResponseVM[];
  /** - Format: int64 */
  totalCount?: number;
}

export interface SettlementRequestInfoResponseVM {
  /** - Format: double */
  amount?: number;
  /** - Format: int32 */
  bankId?: number;
  bankLogoAddress?: string;
  bankName?: string;
  /** - Format: double */
  commissionAmount?: number;
  /** - Format: date-time */
  createDateUtc?: string;
  creatorUserDisplayName?: string;
  /** - Format: uuid */
  creatorUserId?: string;
  currencySymbol?: string;
  description?: string;
  /** - Format: int64 */
  id?: number;
  isAuto?: boolean;
  /** - Format: uuid */
  ownerUserId?: string;
  status?: SettlementRequestStatus;
  userBankFirstName?: string;
  /** - Format: int64 */
  userBankId?: number;
  userBankLastName?: string;
  userBankName?: string;
  userBankNumber?: string;
  userBankShebaNumber?: string;
  userDisplayName?: string;
  /** - Format: int64 */
  userWalletId?: number;
  /** - Format: int64 */
  voucherId?: number;
  walletName?: string;
  walletNumber?: string;
}

export type SettlementRequestStatus =
  | "Pending"
  | "Paid"
  | "PayCommandCreatedPendingForPay";

export interface SettlementTransactionHistoryListResponseVM {
  /** - Format: int64 */
  count?: number;
  list?: SettlementTransactionHistoryResponseVM[];
}

export interface SettlementTransactionHistoryResponseVM {
  /** - Format: date-time */
  createDate?: string;
  currencySymbol?: string;
  description?: string;
  /** - Format: int64 */
  id?: number;
  moneyNetworkSymbol?: string;
  status?: WithdrawRequestStatus;
  /** - Format: double */
  transactionFee?: number;
  transferAmount?: string;
  transferType?: TransferType;
  /** - Format: uuid */
  userId?: string;
  userWalletAccountNumber?: string;
  walletType?: UserWalletType;
}

export type SubUserPermissionType =
  | "Default"
  | "CanReceiveMoney"
  | "CanSeeEpayRequests"
  | "CanTransferMoney"
  | "CanSeeTransactions"
  | "CanRequestSettlement"
  | "CanChargeAccount"
  | "CanSeeSettlementRequests"
  | "CanGroupTransferMoney"
  | "CanAssistantsCreatesEpayRequest";

export interface SubuserAccessRequestVM {
  /** - Format: int64 */
  connectionId?: number;
  walletNumber?: string;
}

export type SymbolFilterType =
  | "UNKNOWN"
  | "PRICE_FILTER"
  | "PERCENT_PRICE"
  | "LOT_SIZE"
  | "MARKET_LOT_SIZE"
  | "MIN_NOTIONAL"
  | "MAX_NUM_ORDERS"
  | "MAX_NUM_ALGO_ORDERS"
  | "ICEBERG_PARTS"
  | "MAX_POSITION";

export type SymbolStatus =
  | "PRE_TRADING"
  | "PENDING_TRADING"
  | "TRADING"
  | "POST_TRADING"
  | "END_OF_DAY"
  | "HALT"
  | "AUCTION_MATCH"
  | "BREAK"
  | "CLOSE"
  | "PRE_DELIVERING"
  | "DELIVERING"
  | "PRE_SETTLE"
  | "SETTLING";

export interface TodayTotalWithdrawResponseVM {
  /** - Format: double */
  maxDailyWithdraw?: number;
  symbol?: string;
  /** - Format: double */
  todayWithdraw?: number;
}

export interface TokenResponseVM {
  accessToken?: string;
  errorDescription?: string;
  /** - Format: int32 */
  expiresIn?: number;
  identityToken?: string;
  refreshToken?: string;
  tokenType?: string;
}

export interface TradeReferralCommissionHistoryListResponseVM {
  /** - Format: int64 */
  count?: number;
  list?: TradeReferralCommissionHistoryResponseVM[];
}

export interface TradeReferralCommissionHistoryResponseVM {
  /** - Format: double */
  commissionAmount?: number;
  /** - Format: int32 */
  commissionCurrencyId?: number;
  commissionCurrencySymbol?: string;
  /** - Format: date-time */
  createDate?: string;
  /** - Format: int32 */
  domainId?: number;
  /** - Format: int64 */
  id?: number;
  /** - Format: int64 */
  orderId?: number;
  /** - Format: uuid */
  orderUserId?: string;
  /** - Format: int64 */
  referralProgramId?: number;
  /** - Format: date-time */
  transactionDate?: string;
  type?: TradeReferralCommissionType;
  /** - Format: uuid */
  userId?: string;
}

export interface TradeReferralCommissionRankingResponseVM {
  /** - Format: double */
  amount?: number;
  currencySymbol?: string;
  userName?: string;
}

export type TradeReferralCommissionType =
  | "CommissionRebate"
  | "ReferralKickback";

export interface TradeReferralHistoryListResponseVM {
  /** - Format: int64 */
  count?: number;
  list?: TradeReferralHistoryResponseVM[];
}

export interface TradeReferralHistoryResponseVM {
  account?: string;
  /** - Format: double */
  defaultCryptoAmount?: number;
  /** - Format: double */
  defaultFiatAmount?: number;
  /** - Format: date-time */
  signedUpAt?: string;
  symbol?: string;
  traded?: boolean;
}

export interface TradeResponseVM {
  /** - Format: double */
  commission?: number;
  commissionCurrencySymbol?: string;
  /** - Format: int64 */
  orderId?: number;
  /** - Format: double */
  price?: number;
  /** - Format: double */
  quantity?: number;
  /** - Format: double */
  quoteQuantity?: number;
  side?: AppOrderSide;
  symbol?: string;
  /** - Format: date-time */
  tradeDate?: string;
}

export interface TradeResposneListVM {
  /** - Format: int64 */
  count?: number;
  list?: TradeResponseVM[];
}

export interface TransactionHistoryDetailResponseVM {
  /** - Format: date-time */
  createDate?: string;
  currencySymbol?: string;
  destinationBlockchainAddress?: string;
  /** - Format: date-time */
  doneDate?: string;
  /** - Format: date-time */
  processDate?: string;
  /** - Format: double */
  requestAmount?: number;
  status?: TransactionHistoryStatus;
}

export type TransactionHistoryStatus =
  | "Pending"
  | "Processing"
  | "Completed"
  | "Failed";

export interface TransferMoneyRequestVM {
  /** - Format: double */
  amount?: number;
  description?: string;
  targetIdentifier?: string;
  targetWalletNumber?: string;
  walletNumber?: string;
}

export interface TransferMoneyResponseVM {
  /** - Format: int64 */
  internalDepositId?: number;
  /** - Format: int64 */
  internalWithdrawId?: number;
  /** - Format: int64 */
  voucherId?: number;
}

export type TransferType = "Offchain" | "Onchain";

export interface UpdateEpayRequestAssignedUserRequestVM {
  /** - Format: uuid */
  assignedToUserId?: string;
  token?: string;
}

export interface UpdateEpayRequestCustomDataRequestVM {
  customDatas?: EpayRequestCustomDataRequestVM[];
  token?: string;
}

export interface UpdateFavoriteMarketRequestVM {
  marketSymbol?: string;
  marketType?: MarketType;
}

export interface UpdateUserWalletRequestVM {
  automaticSettlement?: boolean;
  getComissionFromPayer?: boolean;
  isActive?: boolean;
  name?: string;
  notificationEnabled?: boolean;
  /** - Format: int32 */
  userBankId?: number;
  walletNumber?: string;
}

export interface UserAssetResponseVM {
  /** - Format: double */
  availableRemain?: number;
  /** - Format: double */
  inUseRemain?: number;
  symbol?: string;
  /** - Format: double */
  totalRemain?: number;
  walletName?: string;
  walletNumber?: string;
}

export interface UserBankResponseVM {
  accountNo?: string;
  bankAccountStatus?: IdentityStatus;
  /** - Format: int32 */
  bankId?: number;
  /** - Format: date-time */
  createDate?: string;
  firstName?: string;
  /** - Format: int64 */
  id?: number;
  isVisible?: boolean;
  /** - Format: date-time */
  lastChangeStatusDate?: string;
  lastName?: string;
  name?: string;
  nationalCode?: string;
  rejectCauseDescription?: string;
  shebaNo?: string;
  userBankIdentityType?: BusinessShareType;
  /** - Format: uuid */
  userId?: string;
}

export interface UserBasicInfoRequestVM {
  basicInfoToken?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  /** - Format: uuid */
  userId?: string;
}

export interface UserCurrencyResponseVM {
  /** - Format: double */
  availableRemain?: number;
  canBuy?: boolean;
  canCharge?: boolean;
  canDeposit?: boolean;
  canSettlement?: boolean;
  canTrade?: boolean;
  canWithdraw?: boolean;
  /** - Format: int32 */
  decimalDigits?: number;
  enabled?: boolean;
  /** - Format: double */
  inUseRemain?: number;
  logoAddress?: string;
  name?: string;
  specialTips?: string;
  symbol?: string;
  /** - Format: double */
  totalRemain?: number;
  type?: CurrencyType;
  userMoneyNetworks?: UserMoneyNetworkResponseVM[];
}

export interface UserDepositAddressRequestVM {
  currencySymbol?: string;
  moneyNetworkSymbol?: string;
}

export interface UserDepositAddressResponseVM {
  address?: string;
  tag?: string;
}

export interface UserExistResponseVM {
  twoFactorEnabled?: boolean;
}

export interface UserIdentificationLevelOneRequestVM {
  /** - Format: date-time */
  birthDate?: string;
  nationalCardFile?: DocumentFileRequestVM;
  nationalCode?: string;
  userBankAdd?: CreateUserBankRequestVM;
}

export interface UserIdentificationLevelThreeRequestVM {
  file?: DocumentFileRequestVM;
}

export interface UserIdentificationLevelTwoRequestVM {
  address?: string;
  authenticationSelfieFile?: DocumentFileRequestVM;
  /** - Format: int32 */
  cityId?: number;
  /** - Format: int32 */
  countryId?: number;
  phoneNumber?: string;
  phoneOtpCode?: string;
  phoneOtpToken?: string;
  postalCode?: string;
  /** - Format: int32 */
  provinceId?: number;
}

export type UserIdentifierType =
  | "Default"
  | "PhoneNumber"
  | "Email"
  | "CustomerNumber"
  | "AccountNumber";

export interface UserInfoVM {
  currentLevel?: IdentificationLevel;
  /** - Format: int64 */
  customerNumber?: number;
  displayName?: string;
  /** - Format: int32 */
  domainId?: number;
  email?: string;
  hasPendingRequest?: boolean;
  /** - Format: uuid */
  id?: string;
  identityStatus?: IdentityStatus;
  isBusinessUser?: boolean;
  /** - Format: date-time */
  limitAccessEnd?: string;
  nextLevel?: IdentificationLevel;
  nextLevelStatus?: IdentificationLevelRequestStatus;
  pendingRequestDescription?: string;
  phoneNumber?: string;
  /** - Format: uuid */
  profileImageFileUniqueId?: string;
  userName?: string;
  userStatus?: UserStatus;
  userType?: UserType;
}

export interface UserLoginHistoryDetailsVM {
  /** - Format: int64 */
  customerId?: number;
  email?: string;
  ip?: string;
  /** - Format: date-time */
  lastLoginDateTime?: string;
  phoneNumber?: string;
}

export interface UserLoginHistoryListVM {
  /** - Format: int64 */
  count?: number;
  list?: UserLoginHistoryVM[];
}

export interface UserLoginHistoryVM {
  browserName?: string;
  deviceId?: string;
  failedDescription?: string;
  /** - Format: int64 */
  id?: number;
  ip?: string;
  location?: string;
  /** - Format: date-time */
  loginDateTime?: string;
  platform?: string;
  status?: LoginStatus;
  userName?: string;
}

export interface UserMinimalResponseVM {
  /** - Format: int64 */
  connectionId?: number;
  displayName?: string;
  phoneNumber?: string;
  positionTitle?: string;
  /** - Format: uuid */
  profileImageFileUniqueId?: string;
  /** - Format: uuid */
  userId?: string;
}

export interface UserMoneyNetworkResponseVM {
  addressRegex?: string;
  addressUrl?: string;
  contractAddress?: string;
  contractType?: string;
  depositDescription?: string;
  depositEnabled?: boolean;
  /** - Format: int32 */
  estimatedArrivalTime?: number;
  isDefault?: boolean;
  isTag?: boolean;
  /** - Format: double */
  maximumWithdraw?: number;
  memoRegex?: string;
  /** - Format: int32 */
  minConfirmations?: number;
  /** - Format: double */
  minimumWithdraw?: number;
  name?: string;
  settlementEnabled?: boolean;
  specialTips?: string;
  symbol?: string;
  txUrl?: string;
  /** - Format: int32 */
  unlockConfirm?: number;
  withdrawDescription?: string;
  withdrawEnabled?: boolean;
  /** - Format: double */
  withdrawFee?: number;
}

export interface UserPluginResponseVM {
  amountCalculationExpression?: string;
  config?: string;
  /** - Format: int32 */
  id?: number;
  isActive?: boolean;
  key?: string;
  /** - Format: uuid */
  logoFileUniqueId?: string;
  name?: string;
  properties?: PluginPropertyResponseVM[];
}

export interface UserPluginTogggleRequestVM {
  config?: string;
  isActive?: boolean;
  pluginKey?: string;
}

export interface UserReferralInfoVM {
  email?: string;
  /** - Format: uuid */
  id?: string;
  phoneNumber?: string;
  userName?: string;
}

export interface UserReferralProgramAddVM {
  description?: string;
  /** - Format: double */
  inviteePercent?: number;
  isDefault?: boolean;
  name?: string;
  /** - Format: double */
  referralPercent?: number;
}

export interface UserReferralProgramVM {
  description?: string;
  /** - Format: int32 */
  friendsCount?: number;
  /** - Format: int64 */
  id?: number;
  /** - Format: double */
  inviteePercent?: number;
  isDefault?: boolean;
  name?: string;
  /** - Format: double */
  referralPercent?: number;
  /** - Format: uuid */
  userId?: string;
}

export interface UserSettingPreferenseResponseVM {
  activities?: boolean;
  autoBorrowRepayForMargin?: boolean;
  limitOrder?: boolean;
  marketOrder?: boolean;
  stopLimitOrder?: boolean;
  systemMessages?: boolean;
  tradeNotification?: boolean;
}

export type UserStatus =
  | "None"
  | "NotVerified"
  | "VerifiedButNotCompleted"
  | "Active"
  | "TemporaryBlocked"
  | "AutoPasswordGenerated";

export interface UserStatusResponseVM {
  email?: string;
  emailConfirmed?: boolean;
  phoneNumberConfirmed?: boolean;
  twoFactorEnabled?: boolean;
}

export interface UserTotalReferralProgramVM {
  /** - Format: double */
  defaultCryptoAmount?: number;
  /** - Format: double */
  defaultFiatAmount?: number;
  /** - Format: int32 */
  friendsCount?: number;
}

export interface UserTraderLevelResponseVM {
  /** - Format: double */
  cryptoMakerFeePercent?: number;
  /** - Format: double */
  cryptoTakerFeePercent?: number;
  /** - Format: double */
  fiatMakerFeePercent?: number;
  /** - Format: double */
  fiatTakerFeePercent?: number;
  /** - Format: int32 */
  levelIndex?: number;
  name?: string;
}

export interface UserTrustedDeviceListResponseVM {
  /** - Format: int64 */
  count?: number;
  list?: UserTrustedDeviceResponseVM[];
}

export interface UserTrustedDeviceResponseVM {
  /** - Format: date-time */
  createDate?: string;
  deviceId?: string;
  hardwareType?: string;
  /** - Format: int64 */
  id?: number;
  ipAddress?: string;
  osName?: string;
  osVersion?: string;
  softwareName?: string;
  userAgent?: string;
  /** - Format: uuid */
  userId?: string;
}

export type UserType = "Person" | "Organization";

export interface UserWalletDisplayDetailResponseVM {
  accountStatus?: AccountStatus;
  actionPolicies?: CommissionPolicyResponseVM[];
  automaticSettlement?: boolean;
  getComissionFromPayer?: boolean;
  intermediatePayUserBankAccountNumber?: string;
  /** - Format: int64 */
  intermediatePayUserBankId?: number;
  intermediatePayUserBankName?: string;
  intermediatePayUserBankShebaNumber?: string;
  isActive?: boolean;
  notificationEnabled?: boolean;
  /** - Format: int32 */
  permittedSubuserCount?: number;
  userWalletType?: UserWalletType;
  walletName?: string;
  walletNumber?: string;
}

export interface UserWalletDisplayResponseVM {
  accountStatus?: AccountStatus;
  automaticSettlement?: boolean;
  /** - Format: double */
  availableRemain?: number;
  getComissionFromPayer?: boolean;
  /** - Format: double */
  inUseRemain?: number;
  intermediatePayUserBankAccountNumber?: string;
  /** - Format: int64 */
  intermediatePayUserBankId?: number;
  intermediatePayUserBankName?: string;
  intermediatePayUserBankShebaNumber?: string;
  isActive?: boolean;
  name?: string;
  number?: string;
  /** - Format: int32 */
  relatedUserWalletIndex?: number;
  symbol?: string;
  /** - Format: double */
  totalRemain?: number;
  userWalletType?: UserWalletType;
}

export interface UserWalletInfoResponseVM {
  displayName?: string;
  userName?: string;
  userWalletNumber?: string;
}

export interface UserWalletResponseVM {
  accountStatus?: AccountStatus;
  automaticSettlement?: boolean;
  /** - Format: int32 */
  currencyId?: number;
  /** - Format: int64 */
  directPayUserBankId?: number;
  getComissionFromPayer?: boolean;
  /** - Format: int64 */
  intermediatePayUserBankId?: number;
  isActive?: boolean;
  name?: string;
  /** - Format: int32 */
  relatedUserWalletIndex?: number;
  /** - Format: int32 */
  scanCount?: number;
  userNotificationEnabled?: boolean;
  userWalletType?: UserWalletType;
  walletNumber?: string;
}

export type UserWalletType = "Spot" | "InstantCredit";

export interface VerifySecureRequestVM {
  otpCode?: string;
  otpToken?: string;
  phoneNumber?: string;
  totpCode?: string;
}

export interface VerifyUserPhoneNumberRequestVM {
  token?: string;
  /** - Format: uuid */
  userId?: string;
  verifyCode?: string;
}

export interface WalletDepositAddressRequestVM {
  moneyNetworkSymbol?: string;
  walletNumber?: string;
}

export type WithdrawRequestStatus =
  | "Pending"
  | "Processing"
  | "WithdrawCompletedWaitingForDeposit"
  | "Completed"
  | "Failed";

export interface WithdrawRequestUserWalletCreateRequestVM {
  address?: string;
  /** - Format: double */
  amount?: number;
  currencySymbol?: string;
  moneyNetworkSymbol?: string;
  tagId?: string;
}

export interface WithdrawTransactionHistoryListResponseVM {
  /** - Format: int64 */
  count?: number;
  list?: WithdrawTransactionHistoryResponseVM[];
}

export interface WithdrawTransactionHistoryResponseVM {
  address?: string;
  addressTag?: string;
  /** - Format: date-time */
  createDate?: string;
  currencySymbol?: string;
  /** - Format: int64 */
  id?: number;
  moneyNetworkSymbol?: string;
  status?: TransactionHistoryStatus;
  transactionFee?: string;
  transferAmount?: string;
  transferType?: TransferType;
  txId?: string;
  /** - Format: uuid */
  userId?: string;
  walletType?: UserWalletType;
}
