const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);

  if (match) {
    return [match[1], match[2], match[3]].filter(Boolean).join('-');
  }

  return value;
};

export default formatPhoneNumber;
