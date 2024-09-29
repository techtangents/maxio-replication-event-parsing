# Maxio TS SDK Bug Replication

This repo demonstrates a bug where the Maxio Advanced Billing TS SDK isn't correctly parsing Events from the API.

To reproduce, run the following, substituting in the api key and subdomain from your environment:

```bash
npm i
APIKEY=MY_API_KEY SUBDOMAIN=MY_SUBDOMAIN npm run tsx main.ts
```

The error is something like this:

```
ResponseValidationError: The response did not match the response schema.

> Issue #1

Could not match against any acceptable type.

Given value: {"product_id":5604023,"account_transaction_id":null}
Type: 'object'
Expected type: 'Nullable<OneOf<Object<{previousProductId,newProductId,...}> | Object<{previousSubscriptionState,newSubscriptionState,...}> | Object<{productId,accountTransactionId,...}> | Object<{refundId,gatewayTransactionId,productId,...}> | Object<{previousAllocation,newAllocation,componentId,componentHandle,memo,allocationId,allocatedQuantity,...}> | Object<{previousUnitBalance,newUnitBalance,usageQuantity,componentId,componentHandle,memo,...}> | Object<{previousUnitBalance,previousOverageUnitBalance,newUnitBalance,newOverageUnitBalance,usageQuantity,overageUsageQuantity,componentId,componentHandle,memo,allocationDetails,...}> | Object<{dunner,currentStep,nextStep,...}> | Object<{uid,number,role,dueDate,issueDate,paidDate,dueAmount,paidAmount,taxAmount,refundAmount,totalAmount,statusAmount,productName,consolidationLevel,lineItems,...}> | Object<{cancellationState,cancelsAt,...}> | Object<{reason,currentAccountBalanceInCents,prepaymentAccountBalanceInCents,currentUsageAmountInCents,...}> | Object<{uid,number,role,deliveryDate,createdAt,dueAmount,paidAmount,taxAmount,totalAmount,productName,lineItems,...}> | Object<{subscriptionGroup,customer,...}> | Object<{subscriptionGroup,customer,...}> | Object<{reason,serviceCreditAccountBalanceInCents,serviceCreditBalanceChangeInCents,currencyCode,atTime,...}> | Object<{reason,prepaymentAccountBalanceInCents,prepaymentBalanceChangeInCents,currencyCode,...}> | Object<{previousValue,currentValue,...}> | Object<{itemId,itemType,itemHandle,itemName,previousPricePoint,currentPricePoint,...}> | Object<{eventType,metafieldName,metafieldId,oldValue,newValue,resourceType,resourceId,...}>>>'
Path: 0 › event › event_specific_data

```

The issue appears to be in the parsing of the `event_specific_data` property of the returned events - possibly
the `null` value of `account_transaction_id`.