import { useState } from "react";

export const useEmiCalculator = () => {
  const [emi, setEmi] = useState(0);
  const [schedule, setSchedule] = useState([]);

  const calculateEMI = (P, annualRate, years) => {
    const R = annualRate / 12 / 100;
    const N = years * 12;

    if (R === 0) {
      const flatEmi = P / N;
      const flatPrincipal = flatEmi;
      const newSchedule = Array.from({ length: N }, (_, i) => ({
        month: i + 1,
        principal: flatPrincipal,
        interest: 0,
        balance: P - flatPrincipal * (i + 1),
      }));
      setEmi(flatEmi);
      setSchedule(newSchedule);
      return;
    }

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(emiValue);

    let balance = P;
    const newSchedule = [];

    for (let i = 1; i <= N; i++) {
      const interest = balance * R;
      const principal = emiValue - interest;
      balance -= principal;

      newSchedule.push({
        month: i,
        principal,
        interest,
        balance: balance > 0 ? balance : 0,
      });
    }

    setSchedule(newSchedule);
  };

  return { emi, schedule, calculateEMI };
};
