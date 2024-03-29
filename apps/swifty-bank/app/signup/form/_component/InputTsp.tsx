import { motion } from "framer-motion";
import { Select } from "@swifty/ui";
import { Dispatch, SetStateAction } from "react";
import telecomServiceProvider from "@/signup/form/_lib/constants/tsp";
import { inputMotion } from "../motion";
import { SignupStage } from "@/signup/form/_lib/validate/isActiveButton";

interface InputTspProps {
  className: string;
  stage: number;
  telecomProvider: string;
  setTelecomProvider: Dispatch<SetStateAction<string>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: () => void;
}

function InputTsp({
  className,
  stage,
  telecomProvider,
  setTelecomProvider,
  handleChange,
  onSelect,
}: InputTspProps) {
  return (
    <motion.div
      key="통신사"
      className={className}
      initial={inputMotion.initial}
      animate={{
        opacity: stage >= SignupStage["통신사"] ? 1 : 0,
      }}
      transition={inputMotion.transition}
    >
      <Select
        label="통신사"
        options={telecomServiceProvider}
        placeholder="통신사"
        value={telecomProvider}
        setvalue={setTelecomProvider}
        optionLabel={"통신사를 선택해주세요"}
        onChange={handleChange}
        onSelect={onSelect}
      />
    </motion.div>
  );
}

export default InputTsp;
