import { Currency } from '../types';

export function formatCurrency(amount: number, currency: Currency = 'USD'): string {
  if (currency === 'USD') {
    return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return '₹' + amount.toLocaleString('en-IN');
}

export function formatProductPrice(
  priceINR: number,
  priceUSD: number | undefined,
  currency: Currency = 'USD'
): string {
  if (currency === 'USD') {
    const val = priceUSD !== undefined ? priceUSD : priceINR / 83.0;
    return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return '₹' + priceINR.toLocaleString('en-IN');
}


export function formatDate(dateString?: string): string {
  if (!dateString) {
    return new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  return dateString;
}

export function maskIMEI(imei: string): string {
  if (!imei || imei.length < 8) return imei;
  return imei.slice(0, 4) + ' •••• •••• ' + imei.slice(-4);
}
