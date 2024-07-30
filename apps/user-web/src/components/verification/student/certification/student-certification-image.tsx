'use client';

import FileIcon from '@icons/file.svg';
import { cn } from '@swifty/shared-lib';
import { Button } from '@swifty/ui';
import Image from 'next/image';
import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

type Props = {
  onChange?: (file: File) => void;
};

export default function StudentCertificationImage({ onChange }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const imageUpload = () => {
    inputRef.current?.click();
  };

  const form = useFormContext();

  useWatch({
    control: form.control,
    name: 'image',
  });

  const imageError = form.formState.errors['image'];

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange?.(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise<void>((resolve) => {
        reader.onload = () => {
          setImagePreview(reader.result as string); // 파일의 컨텐츠
          resolve();
        };
      });
    }
  };

  return (
    <section className="flex flex-col gap-2.5">
      <div
        onClick={imageUpload}
        className={cn(
          'dark:bg-swifty-color-800 bg-swifty-color-200 rounded-xl flex justify-center items-center w-full min-h-[315px] relative',
          imageError && 'border border-destructive shadow-input-error',
        )}
      >
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="preview"
            fill={true}
            className="object-cover rounded-xl"
          />
        )}
        {!imagePreview && (
          <div className="flex flex-col justify-center items-center gap-2.5">
            <FileIcon />
            <h3 className="text-10 font-medium text-center">
              하단 버튼을 눌러<br></br> JPG 파일을 업로드 해주세요
            </h3>
          </div>
        )}
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          ref={inputRef}
          onChange={handleImage}
          className="hidden"
        />
      </div>
      <Button block variant="white" onClick={imageUpload} type="button">
        인증 이미지 업로드
      </Button>
    </section>
  );
}
