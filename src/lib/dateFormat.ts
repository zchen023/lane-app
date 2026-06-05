const readableDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

export function formatReadableDate(value: string | null | undefined) {
  if (!value) {
    return '—';
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return '—';
  }

  return readableDateFormatter.format(parsedDate);
}
