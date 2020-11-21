import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  status: string;
}

export default function SplashScreen({ status }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <p>...</p>
      <p>{t(status)}</p>
    </>
  );
}
