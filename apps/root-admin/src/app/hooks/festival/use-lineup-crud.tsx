"use client";

import { useCallback } from "react";
import type { UploadFile } from "antd";

type FieldType = {
  title: string;
  description: string;
  performanceTime: string;
  newFile: UploadFile;
};

export default function useLineupCRUD() {

  const createLineup = useCallback(async (values: FieldType) => {
  }, []);

  const deleteLineup = useCallback(async (id: string) => {
  }, []);

  return {
    createLineup,
    // updateLineup,
    deleteLineup
  };
}