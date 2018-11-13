import { useContext } from "react";
import { RactorContext } from "./context";
import { System } from "ractor";

export function useSystem(): System {
  const { system } = useContext(RactorContext)
  return system
}