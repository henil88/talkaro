import React, { useState, useCallback } from "react";
import RegisterOutlet from "../../../layouts/RegisterOutlet";
import EmailPhone from "./EmailPhone";
import Verification from "./Verification";
import AccountDetails from "./AccountDetails";

interface StageControlProps {
  stage: number;
  goToPreviousStage: () => void;
  goToNextStage: () => void;
}

const StageComponents: { [key: number]: React.FC<StageControlProps> } = {
  0: EmailPhone,
  1: Verification,
  2: AccountDetails,
};

const MAX_STAGE = Object.keys(StageComponents).length - 1;

const Register: React.FC = () => {
  const [stage, setStage] = useState(0);

  const goToPreviousStage = useCallback(() => {
    setStage((prevStage) => Math.max(0, prevStage - 1));
  }, []);

  const goToNextStage = useCallback(() => {
    setStage((prevStage) => Math.min(MAX_STAGE, prevStage + 1));
  }, []);

  const CurrentStageComponent = StageComponents[stage];

  if (!CurrentStageComponent) {
    return (
      <RegisterOutlet>
        <div>Error: Invalid Stage</div>
      </RegisterOutlet>
    );
  }

  return (
    <RegisterOutlet>
      <CurrentStageComponent
        stage={stage}
        goToPreviousStage={goToPreviousStage}
        goToNextStage={goToNextStage}
      />
    </RegisterOutlet>
  );
};

export default Register;
