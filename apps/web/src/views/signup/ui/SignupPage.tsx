'use client';

import { useState } from 'react';

import {
  type DefaultProfileImage,
  type TermsAgreements,
} from '@/entities/user';

import ProfileSetupStep from './ProfileSetupStep';
import TermsStep from './TermsStep';

type Step = 'terms' | 'profile';

type SignupPageProps = {
  defaultImages: DefaultProfileImage[];
};

export default function SignupPage({ defaultImages }: SignupPageProps) {
  const [step, setStep] = useState<Step>('terms');
  const [termsAgreements, setTermsAgreements] = useState<TermsAgreements>({
    isOver14: false,
    service: false,
    privacy: false,
    geolocation: false,
  });

  if (step === 'terms') {
    return (
      <TermsStep
        onNext={(agreements) => {
          setTermsAgreements(agreements);
          setStep('profile');
        }}
      />
    );
  }

  return (
    <ProfileSetupStep
      defaultImages={defaultImages}
      termsAgreements={termsAgreements}
      onBack={() => setStep('terms')}
    />
  );
}
