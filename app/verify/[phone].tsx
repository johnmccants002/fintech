import { useLocalSearchParams } from "expo-router";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const { phone, signin } = useLocalSearchParams<{
    phone: string;
    signin: string;
  }>();
  return <></>;
};

export default Page;
