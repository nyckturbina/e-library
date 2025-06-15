import { Loan } from "@/models/loan";
import { useState } from "react";

export enum LoanProviderType {
  BACKEND = "Backend",
  MOCK = "Mock"
}

export default function useTable() {
  const [loans, setLoansState] = useState<Loan[]>([]);
  const [loanProviderType, setLoanProviderType] = useState<LoanProviderType>(
    LoanProviderType.MOCK
  );

  const getLoans = () => {
    return loans;
  };

  const setLoans = (newLoans: Loan[]) => {
    setLoansState(newLoans);
  };

  return { getLoans, setLoans, loanProviderType, setLoanProviderType };
}
