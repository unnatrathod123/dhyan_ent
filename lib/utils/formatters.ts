export function formatCurrency(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
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
