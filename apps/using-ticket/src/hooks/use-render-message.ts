'use client';

import type { ErrorMessage, Message } from '@type';
import { MESSAGE } from '@util';
import { useState } from 'react';

export default function useRenderMessage() {
  const [errorMessage, setErrorMessage] = useState<null | ErrorMessage>(null);
  const [message, setMessage] = useState<Message>(MESSAGE[0]);
  const renderMessage = () => errorMessage || message;
  const resetErrorMessage = () => setErrorMessage(null);

  const makeErrorMessage = (text: ErrorMessage) => {
    setErrorMessage(text);
  };
  const makeSucessMessage = (text: Message) => {
    setMessage(text);
  };
  return {
    renderMessage,
    resetErrorMessage,
    makeErrorMessage,
    makeSucessMessage,
  };
}
