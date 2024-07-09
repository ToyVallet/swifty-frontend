const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,3})(\d{0,4})(\d{0,4})$/);

  if (match) {
    return [match[1], match[2], match[3]].filter(Boolean).join('-');
  }

  return value;
};

export default formatPhoneNumber;
